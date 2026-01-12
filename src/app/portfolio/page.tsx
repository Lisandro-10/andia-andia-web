import type { Metadata } from 'next'
import { getAllProjects, getProjectsByCategory, croquis } from '@/lib/projects'
import { PortfolioFilter } from '@/components/portfolio/PortfolioFilter'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Proyectos de arquitectura - viviendas, complejos residenciales y desarrollos inmobiliarios',
}

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const category = searchParams.category || 'all'
  
  let displayProjects
  if (category === 'croquis') {
    displayProjects = croquis
  } else if (category === 'all') {
    displayProjects = await getAllProjects()
    // Excluir croquis de "all"
    displayProjects = displayProjects.filter(p => p.category !== 'croquis')
  } else {
    displayProjects = await getProjectsByCategory(category)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="md:h-[30vh] h-[27vh] bg-[url('/layout/port-back.webp')] bg-cover bg-center bg-no-repeat flex items-end pb-8">
        <div className="section-container w-full">
          <div className="border-b-3 border-primary-dark pb-4">
            <h3 className="text-lg md:text-xl font-light mb-2">Nuestros</h3>
            <h2 className="text-3xl md:text-4xl font-normal">Proyectos</h2>
          </div>
        </div>
      </header>

      {/* Filter */}
      <PortfolioFilter />

      {/* Grid */}
      <PortfolioGrid projects={displayProjects} />
    </main>
  )
}