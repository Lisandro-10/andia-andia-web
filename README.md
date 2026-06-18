# Andia Andia — Sitio web

Sitio web del Estudio de Arquitectura e Ingeniería Andia Andia, Mendoza.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19 · TypeScript 6 · Tailwind CSS 3 |
| Animaciones | Motion 12 |
| Imágenes | AWS S3 + CloudFront (CDN) |
| Analytics | Vercel Analytics |
| Deploy | Vercel |

## Requisitos

- Node 20 (ver `.nvmrc`)
- Variables de entorno en `.env.local` (ver sección siguiente)

## Variables de entorno

```env
NEXT_PUBLIC_CDN_URL=       # URL base del CDN (CloudFront)
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
AWS_CLOUDFRONT_DISTRIBUTION_ID=
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts de build

```bash
npm run build    # Build de producción
npm run lint     # ESLint (flat config)
```

## Arquitectura de contenidos

El sitio consume un `manifest.json` alojado en el CDN que describe los proyectos, galería de croquis y fondos. No hay CMS ni base de datos.

```
CDN (CloudFront/S3)
 └── /data/manifest.json   ← fuente de verdad de los proyectos
 └── /projects/**          ← imágenes de proyectos
 └── /croquis/**           ← bocetos
```

El manifest se puede regenerar y publicar desde los scripts de `scripts/` (no incluidos en el repo).

## Lambda

`lambda/generate-manifest/` contiene la función AWS Lambda que regenera el `manifest.json` en S3 cuando se sube contenido nuevo.
