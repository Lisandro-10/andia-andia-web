/**
 * Lambda: generate-manifest
 *
 * Trigger: S3 ObjectCreated / ObjectRemoved en estudioandia-web-assets
 *   - Prefix: projects/
 *   - Prefix: croquis/
 *   - Prefix: backgrounds/
 *
 * Env vars (configurar en la consola):
 *   BUCKET_NAME              estudioandia-web-assets
 *   CLOUDFRONT_DISTRIBUTION_ID  E38WTUHP7WVEQQ
 *
 * Permisos IAM necesarios (ver pasos de configuración):
 *   s3:ListBucket, s3:GetObject, s3:PutObject
 *   cloudfront:CreateInvalidation
 */

import {
  S3Client,
  ListObjectsV2Command,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from '@aws-sdk/client-cloudfront'

const REGION = process.env.AWS_REGION ?? 'us-east-2'
const BUCKET = process.env.BUCKET_NAME
const DISTRIBUTION_ID = process.env.CLOUDFRONT_DISTRIBUTION_ID

const s3 = new S3Client({ region: REGION })
const cf = new CloudFrontClient({ region: 'us-east-1' }) // CloudFront API is always us-east-1

// ─── helpers ──────────────────────────────────────────────────────────────────

async function listAllKeys(prefix) {
  const keys = []
  let continuationToken

  do {
    const res = await s3.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      })
    )
    for (const obj of res.Contents ?? []) {
      if (obj.Key) keys.push(obj.Key)
    }
    continuationToken = res.NextContinuationToken
  } while (continuationToken)

  return keys
}

function slugToName(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function sortByNumber(keys) {
  return [...keys].sort((a, b) => {
    const nA = parseInt(a.match(/(\d+)\.\w+$/)?.[1] ?? '0')
    const nB = parseInt(b.match(/(\d+)\.\w+$/)?.[1] ?? '0')
    return nA - nB
  })
}

// ─── manifest builder ─────────────────────────────────────────────────────────

async function buildManifest() {
  const [projectKeys, croquisKeys, bgKeys] = await Promise.all([
    listAllKeys('projects/'),
    listAllKeys('croquis/'),
    listAllKeys('backgrounds/'),
  ])

  // Skip the manifest itself if it ends up listed
  const filteredProjectKeys = projectKeys.filter((k) => !k.startsWith('data/'))

  // Group by slug
  const bySlug = new Map()

  for (const key of filteredProjectKeys) {
    const parts = key.split('/')
    if (parts.length < 3) continue
    const slug = parts[1]

    if (!bySlug.has(slug)) bySlug.set(slug, { gallery: [] })
    const entry = bySlug.get(slug)

    if (parts[2] === 'hero.webp') entry.hero = key
    else if (parts[2] === 'thumbnail.webp') entry.thumbnail = key
    else if (parts[2] === 'gallery' && parts[3]) entry.gallery.push(key)
  }

  const projects = []

  for (const [slug, files] of bySlug) {
    if (!files.hero || !files.thumbnail) {
      console.warn(`[manifest] ${slug}: missing hero or thumbnail — skipping`)
      continue
    }

    files.gallery = sortByNumber(files.gallery)

    projects.push({
      slug,
      name: slugToName(slug),
      description: '',
      category: 'vivienda', // editar manualmente según el proyecto
      hero: files.hero,
      thumbnail: files.thumbnail,
      gallery: files.gallery,
    })
  }

  projects.sort((a, b) => a.slug.localeCompare(b.slug))

  const croquis = sortByNumber(
    croquisKeys.filter((k) => /\.(png|webp|jpg)$/i.test(k))
  )

  const backgrounds = {}
  for (const key of bgKeys) {
    const filename = key.split('/').pop()
    const name = filename.replace(/\.[^.]+$/, '').replace(/-hero$/, '')
    backgrounds[name] = key
  }

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    projects,
    croquis,
    backgrounds,
  }
}

// ─── handler ──────────────────────────────────────────────────────────────────

export const handler = async (event) => {
  const triggeringKey = event.Records?.[0]?.s3?.object?.key ?? ''
  console.log('[manifest] Triggered by S3 event:', triggeringKey)

  // Ignore writes to data/ to avoid infinite loop
  if (triggeringKey.startsWith('data/')) {
    console.log('[manifest] Skipping — triggered by own manifest write')
    return { statusCode: 200, body: 'skipped' }
  }

  if (!BUCKET) throw new Error('BUCKET_NAME env var is not set')
  if (!DISTRIBUTION_ID) throw new Error('CLOUDFRONT_DISTRIBUTION_ID env var is not set')

  const manifest = await buildManifest()

  console.log(`[manifest] Built: ${manifest.projects.length} projects, ${manifest.croquis.length} croquis`)

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: 'data/manifest.json',
      Body: JSON.stringify(manifest, null, 2),
      ContentType: 'application/json',
      CacheControl: 'max-age=300, must-revalidate',
    })
  )

  console.log('[manifest] Uploaded to S3: data/manifest.json')

  await cf.send(
    new CreateInvalidationCommand({
      DistributionId: DISTRIBUTION_ID,
      InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: { Quantity: 1, Items: ['/data/manifest.json'] },
      },
    })
  )

  console.log('[manifest] CloudFront invalidation sent')

  return { statusCode: 200, body: 'manifest updated' }
}
