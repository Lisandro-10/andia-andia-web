import Link from 'next/link'
import Image from 'next/image'
import { getProjectsByCategoryFromManifest } from '@/lib/manifest'
import type { Project } from '@/types'

interface RelatedProjectsProps {
  currentSlug: string
  category: Project['category']
}

export async function RelatedProjects({ currentSlug, category }: RelatedProjectsProps) {
  // Croquis are portfolio-only images — no project pages to link to
  if (category === 'croquis') return null

  const categoryProjects = await getProjectsByCategoryFromManifest(category)
  const related = categoryProjects.filter((p) => p.slug !== currentSlug).slice(0, 3)

  if (!related.length) return null

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-32 border-t border-gray-dark/20">
      <h2 className="text-xl font-light text-white mb-8">Proyectos relacionados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {related.map((project) => (
          <Link
            key={project.slug}
            href={`/proyectos/${project.slug}`}
            className="group block"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={`${project.name} - Proyecto de arquitectura en Mendoza`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <p className="text-white text-sm mt-3 group-hover:text-primary transition-colors duration-200">
              {project.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
