import { z } from 'zod'
import { getCDNUrl } from './cdn'
import type { Project } from '@/types'

const ManifestProjectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.enum(['vivienda', 'inmobiliario', 'complejos']),
  featured: z.boolean().optional(),
  year: z.number().optional(),
  location: z.string().optional(),
  surface: z.string().optional(),
  hero: z.string(),
  thumbnail: z.string(),
  gallery: z.array(z.string()),
})

const ManifestSchema = z.object({
  version: z.number().optional(),
  projects: z.array(ManifestProjectSchema),
  croquis: z.array(z.string()).optional().default([]),
  featured_croquis: z.array(z.string()).optional().default([]),
  backgrounds: z.record(z.string()).optional().default({}),
})

type Manifest = z.infer<typeof ManifestSchema>

export async function getManifest(): Promise<Manifest> {
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL
  if (!cdnUrl) throw new Error('NEXT_PUBLIC_CDN_URL is not set')

  const res = await fetch(`${cdnUrl}/data/manifest.json`, {
    next: { revalidate: 300 },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch manifest: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()
  const parsed = ManifestSchema.safeParse(json)

  if (!parsed.success) {
    throw new Error(`Invalid manifest schema: ${parsed.error.message}`)
  }

  return parsed.data
}

function manifestProjectToProject(p: z.infer<typeof ManifestProjectSchema>): Project {
  return {
    slug: p.slug,
    name: p.name,
    description: p.description,
    category: p.category,
    featured: p.featured,
    year: p.year,
    location: p.location,
    surface: p.surface,
    heroImage: getCDNUrl(p.hero),
    thumbnail: getCDNUrl(p.thumbnail),
    gallery: p.gallery.map(getCDNUrl),
  }
}

export async function listProjectsFromManifest(): Promise<Project[]> {
  const manifest = await getManifest()
  return manifest.projects.map(manifestProjectToProject)
}

export async function getProjectFromManifest(slug: string): Promise<Project | undefined> {
  const manifest = await getManifest()
  const found = manifest.projects.find((p) => p.slug === slug)
  return found ? manifestProjectToProject(found) : undefined
}

export async function getCroquisFromManifest(): Promise<string[]> {
  const manifest = await getManifest()
  return manifest.croquis.map(getCDNUrl)
}

export async function getFeaturedCroquisFromManifest(): Promise<string[]> {
  const manifest = await getManifest()
  console.log(manifest.featured_croquis)
  const source = manifest.featured_croquis.length
    ? manifest.featured_croquis
    : manifest.croquis.slice(0, 2)
  return source.map(getCDNUrl)
}

export async function getBackgroundFromManifest(key: string): Promise<string | undefined> {
  const manifest = await getManifest()
  const path = manifest.backgrounds[key]
  return path ? getCDNUrl(path) : undefined
}

export async function getProjectsByCategoryFromManifest(category: string): Promise<Project[]> {
  const projects = await listProjectsFromManifest()
  if (category === 'all') return projects
  return projects.filter((p) => p.category === category)
}

export async function listCroquisAsProjects(): Promise<Project[]> {
  const manifest = await getManifest()
  return manifest.croquis.map((path, i) => {
    const url = getCDNUrl(path)
    return {
      slug: `croquis-${i + 1}`,
      name: `Croquis ${i + 1}`,
      category: 'croquis' as const,
      description: 'Boceto arquitectónico',
      heroImage: url,
      thumbnail: url,
      gallery: [],
      featured: false,
    }
  })
}
