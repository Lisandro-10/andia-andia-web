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

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
    }
  }

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.name,
      description: project.description,
      images: [project.heroImage],
    },
  }
}

// Generate static params for all projects
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

  // Si es un croquis, no tiene galería
  const hasGallery = project.gallery && project.gallery.length > 0

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <ProjectHero name={project.name} heroImage={project.heroImage} />

      {/* Gallery Section */}
      {hasGallery ? (
        <ImageGallery images={project.gallery} projectName={project.name} />
      ) : (
        <section className="bg-gray-light-2 py-16 md:py-20 lg:py-24">
          <div className="section-container text-center">
            <h2 className="section-heading mb-8">{project.name}</h2>
            <p className="text-lg text-gray-dark">{project.description}</p>
          </div>
        </section>
      )}
    </main>
  )
}