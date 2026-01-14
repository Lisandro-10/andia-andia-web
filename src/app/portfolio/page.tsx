import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { getAllProjects, croquis } from '@/lib/projects'
import { PortfolioContent } from '@/components/portfolio/PortfolioContent'
import { getBackgroundUrl } from '@/lib/cdn'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Proyectos de arquitectura - viviendas, complejos residenciales y desarrollos inmobiliarios',
}

export default async function PortfolioPage() {
  // Datos cargados en build time (SSG)
  const allProjects = await getAllProjects()

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="relative md:h-[30vh] h-[27vh] flex items-end pb-8">
        <Image
          src={getBackgroundUrl('portfolio-hero.webp')}
          alt="Hero portfolio"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="z-10 section-container w-full">
          <div className="border-b-3 border-primary-dark pb-4 text-white">
            <h3 className="text-lg md:text-xl font-light mb-2">Nuestros</h3>
            <h2 className="text-3xl md:text-4xl font-normal">Proyectos</h2>
          </div>
        </div>
      </header>

      {/* Content con filtrado client-side */}
      <Suspense fallback={<PortfolioSkeleton />}>
        <PortfolioContent allProjects={allProjects} croquisProjects={croquis} />
      </Suspense>
    </main>
  )
}

function PortfolioSkeleton() {
  return (
    <div className="section-container py-8">
      <div className="flex justify-center py-8">
        <div className="h-12 w-96 bg-gray-light animate-pulse rounded" />
      </div>
      <div className="flex flex-wrap justify-start">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-full sm:w-1/2 lg:w-1/3 p-2">
            <div className="aspect-square bg-gray-light animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
