import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { listProjectsFromManifest, listCroquisAsProjects } from '@/lib/manifest'
import { PortfolioContent } from '@/components/portfolio/PortfolioContent'
import { getBackgroundUrl } from '@/lib/cdn'
import Link from 'next/link'

export const revalidate = 300

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { category?: string }
}): Promise<Metadata> {
  const isFiltered = Boolean(searchParams.category)

  return {
    title: 'Portfolio de Proyectos Arquitectónicos | Estudio Andia Andia Mendoza',
    description:
      'Portfolio de arquitectura en Mendoza: viviendas, complejos residenciales y desarrollos. +25 años diseñando espacios únicos en Argentina.',
    keywords: [
      'portfolio arquitectura Mendoza',
      'proyectos arquitectónicos Mendoza',
      'obras arquitectura Mendoza',
      'diseños arquitectura Mendoza',
      'viviendas diseñadas Mendoza',
      'trabajos arquitecto Mendoza',
      'realizaciones arquitectónicas',
    ],
    openGraph: {
      url: 'https://estudioandia.com/portfolio',
      title: 'Portfolio de Proyectos | Estudio Andia Andia',
      description: 'Descubre nuestros proyectos de arquitectura e ingeniería en Mendoza',
      images: [
        {
          url: '/og-portfolio.jpg',
          alt: 'Portfolio de proyectos de arquitectura - Estudio Andia Andia',
        },
      ],
      type: 'website',
    },
    alternates: {
      canonical: 'https://estudioandia.com/portfolio',
    },
    // Prevent category filter URLs from being indexed as separate pages
    robots: isFiltered
      ? { index: false, follow: true }
      : { index: true, follow: true },
  }
}

export default async function PortfolioPage() {
  const [allProjects, croquisProjects] = await Promise.all([
    listProjectsFromManifest(),
    listCroquisAsProjects(),
  ])

  return (
    <div className="min-h-screen">
      {/* Hero — using div instead of header to avoid conflicting landmark with layout */}
      <div className="relative md:h-[35vh] h-[38vh] flex items-end pb-8">
        <Image
          src={getBackgroundUrl('portfolio-hero.webp')}
          alt="Portfolio de proyectos arquitectónicos - Estudio Andia Andia Mendoza"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="z-10 px-4 sm:px-6 lg:px-32 w-full">
          <div className="border-b-3 border-primary-dark pb-4 text-white">
            <h1 className="text-3xl md:text-4xl font-normal">Portfolio de Proyectos</h1>
          </div>
        </div>
      </div>

      {/* Content with client-side filtering */}
      <Suspense fallback={<PortfolioSkeleton />}>
        <PortfolioContent allProjects={allProjects} croquisProjects={croquisProjects} />
      </Suspense>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-light text-white">
                ¿Buscás un Arquitecto en Mendoza?
              </h2>
              <p className="text-base md:text-lg text-gray-light">
                Evaluamos tu proyecto y te asesoramos para convertir tus ideas en realidad.
              </p>

              <a
                href="https://wa.me/5492615371582?text=Hola! Me interesa consultar sobre..."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-6 md:px-8 py-3 md:py-4 transition-colors duration-300 text-base md:text-lg font-medium"
              >
                Contactar por WhatsApp
              </a>
            </div>

            <div className="w-20 h-0.5 bg-primary mx-auto"></div>

            <div className="space-y-4">
              <p className="text-sm md:text-base text-gray-light uppercase tracking-wider">
                Conocé más sobre nosotros
              </p>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                <Link
                  href="/#services"
                  className="text-white hover:text-primary transition-colors text-base md:text-lg"
                >
                  Nuestros Servicios
                </Link>
                <Link
                  href="/#about"
                  className="text-white hover:text-primary transition-colors text-base md:text-lg"
                >
                  Sobre Nosotros
                </Link>
                <Link
                  href="/#contact"
                  className="text-white hover:text-primary transition-colors text-base md:text-lg"
                >
                  Contacto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
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
