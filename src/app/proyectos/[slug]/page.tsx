import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { listProjectsFromManifest, getProjectFromManifest } from '@/lib/manifest'
import { ProjectHero } from '@/components/ui/ProjectHero'
import { ImageGallery } from '@/components/ui/ImageGallery'
import { RelatedProjects } from '@/components/ui/RelatedProjects'

export const revalidate = 300

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export const dynamicParams = true

export async function generateStaticParams() {
  const projects = await listProjectsFromManifest()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectFromManifest(params.slug)

  if (!project) {
    return { title: 'Proyecto no encontrado' }
  }

  const categoryKeywords = {
    vivienda: ['vivienda unifamiliar', 'casa', 'diseño residencial'],
    complejos: ['complejo residencial', 'desarrollo habitacional', 'múltiples unidades'],
    inmobiliario: ['desarrollo inmobiliario', 'proyecto inmobiliario', 'inversión inmobiliaria'],
    croquis: ['croquis arquitectónico', 'boceto', 'diseño conceptual'],
  }

  const categoryLabel =
    project.category === 'vivienda'
      ? 'Vivienda unifamiliar de alta calidad.'
      : project.category === 'complejos'
      ? 'Complejo residencial moderno.'
      : project.category === 'inmobiliario'
      ? 'Desarrollo inmobiliario profesional.'
      : 'Croquis y boceto arquitectónico conceptual.'

  return {
    title: `${project.name} - Proyecto de Arquitectura en Mendoza`,
    description: `${project.description} Diseño arquitectónico por Andia Andia en Mendoza, Argentina. ${categoryLabel}`,
    keywords: [
      project.name,
      'arquitectura Mendoza',
      'proyecto arquitectónico Mendoza',
      ...categoryKeywords[project.category],
      'diseño arquitectónico',
      'Andia Andia',
      'arquitectura contemporánea',
    ],
    openGraph: {
      title: `${project.name} | Andia Andia Arquitectura e Ingeniería`,
      description: project.description,
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 630,
          alt: `${project.name} - Proyecto de arquitectura en Mendoza por Andia Andia`,
        },
      ],
      type: 'article',
      locale: 'es_AR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} | Andia Andia Arquitectura e Ingeniería`,
      description: project.description,
      images: [project.heroImage],
    },
    alternates: {
      canonical: `https://estudioandia.com/proyectos/${project.slug}`,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectFromManifest(params.slug)

  if (!project) {
    notFound()
  }

  const hasGallery = project.gallery && project.gallery.length > 0

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://estudioandia.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolio',
        item: 'https://estudioandia.com/portfolio',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.name,
        item: `https://estudioandia.com/proyectos/${project.slug}`,
      },
    ],
  }

  // CreativeWork Schema
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `https://estudioandia.com/proyectos/${project.slug}#creativework`,
    name: project.name,
    description: project.description,
    image: [project.heroImage, ...project.gallery.slice(0, 5)],
    creator: {
      '@type': 'Organization',
      '@id': 'https://estudioandia.com/#organization',
    },
    genre:
      project.category === 'vivienda'
        ? 'Arquitectura Residencial'
        : project.category === 'complejos'
        ? 'Complejo Residencial'
        : project.category === 'inmobiliario'
        ? 'Desarrollo Inmobiliario'
        : 'Croquis Arquitectónico',
    inLanguage: 'es-AR',
    ...(project.year && { dateCreated: String(project.year) }),
    ...(project.location && {
      locationCreated: { '@type': 'Place', name: project.location },
    }),
  }

  const hasMetadata = project.year || project.location || project.surface

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      <article className="min-h-screen">
        {/* Hero */}
        <ProjectHero name={project.name} heroImage={project.heroImage} />

        {/* Project info — indexable text content */}
        <section className="pt-10 px-4 sm:px-6 lg:px-32">
          <div className="max-w-4xl">
            {/* Visible breadcrumb */}
            <nav aria-label="Breadcrumb" className="text-sm text-gray-dark mb-8">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden="true" className="text-primary">/</li>
                <li>
                  <Link href="/portfolio" className="hover:text-primary transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li aria-hidden="true" className="text-primary">/</li>
                <li className="text-white" aria-current="page">
                  {project.name}
                </li>
              </ol>
            </nav>

            <h2 className="text-xl font-light text-white mb-4">Sobre el Proyecto</h2>
            <p className="text-gray-light leading-relaxed">{project.description}</p>

            {/* Metadata — renders once year/location/surface are added to projects.ts */}
            {hasMetadata && (
              <dl className="flex flex-col gap-4 mt-8 border-t border-gray-dark/20 pt-8">
                {project.year && (
                  <div className="flex gap-8">
                    <dt className="text-gray-dark uppercase tracking-widest text-xs w-24 shrink-0 pt-0.5">
                      Año
                    </dt>
                    <dd className="text-white text-sm">{project.year}</dd>
                  </div>
                )}
                {project.location && (
                  <div className="flex gap-8">
                    <dt className="text-gray-dark uppercase tracking-widest text-xs w-24 shrink-0 pt-0.5">
                      Ubicación
                    </dt>
                    <dd className="text-white text-sm">{project.location}</dd>
                  </div>
                )}
                {project.surface && (
                  <div className="flex gap-8">
                    <dt className="text-gray-dark uppercase tracking-widest text-xs w-24 shrink-0 pt-0.5">
                      Superficie
                    </dt>
                    <dd className="text-white text-sm">{project.surface}</dd>
                  </div>
                )}
              </dl>
            )}
          </div>
        </section>

        {/* Gallery */}
        {hasGallery && (
          <section aria-label={`Galería de imágenes - ${project.name}`}>
            <h2 className="sr-only">Galería de imágenes</h2>
            <ImageGallery images={project.gallery} projectName={project.name} />
          </section>
        )}

        {/* Related projects from same category */}
        <RelatedProjects currentSlug={project.slug} category={project.category} />

        {/* Back link */}
        <div className="py-8 px-4 sm:px-6 lg:px-32 border-t border-gray-dark/20">
          <Link
            href="/portfolio"
            className="text-gray-dark hover:text-primary transition-colors text-sm"
          >
            ← Volver al Portfolio
          </Link>
        </div>
      </article>
    </>
  )
}
