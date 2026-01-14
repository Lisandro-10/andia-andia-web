import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { ProjectHero } from '@/components/ui/ProjectHero'
import { ImageGallery } from '@/components/ui/ImageGallery'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

// Enhanced metadata with SEO optimization
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
    }
  }

  // Category-specific keywords
  const categoryKeywords = {
    vivienda: ['vivienda unifamiliar', 'casa', 'diseño residencial'],
    complejos: ['complejo residencial', 'desarrollo habitacional', 'múltiples unidades'],
    inmobiliario: ['desarrollo inmobiliario', 'proyecto inmobiliario', 'inversión inmobiliaria'],
    croquis: ['croquis arquitectónico', 'boceto', 'diseño conceptual'],
  }

  return {
    title: `${project.name} - Proyecto de Arquitectura en Mendoza`,
    description: `${project.description} Diseño arquitectónico por Andia Andia en Mendoza, Argentina. ${project.category === 'vivienda' ? 'Vivienda unifamiliar de alta calidad.' : project.category === 'complejos' ? 'Complejo residencial moderno.' : 'Desarrollo inmobiliario profesional.'}`,
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

export async function generateStaticParams() {
  const projects = await getAllProjects()
  
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug)

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
    image: [project.heroImage, ...project.gallery],
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
  }

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

      <main className="min-h-screen">
        {/* Hero Section */}
        <ProjectHero name={project.name} heroImage={project.heroImage} />

        {/* Gallery or Description */}
        {hasGallery ? (
          <ImageGallery images={project.gallery} projectName={project.name} />
        ) : (
          <section className="bg-gray-light-2 py-12 md:py-16 lg:py-20">
            <div className="section-container text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-6 md:mb-8">
                {project.name}
              </h2>
              <p className="text-base md:text-lg text-gray-dark max-w-3xl mx-auto">
                {project.description}
              </p>
            </div>
          </section>
        )}
      </main>
    </>
  )
}