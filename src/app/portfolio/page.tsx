import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { getAllProjects, croquis } from '@/lib/projects'
import { PortfolioContent } from '@/components/portfolio/PortfolioContent'
import { getBackgroundUrl } from '@/lib/cdn'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Portfolio de Proyectos Arquitectónicos | Andia Andia Mendoza',
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
    title: 'Portfolio de Proyectos | Andia Andia Arquitectura',
    description: 'Descubre nuestros proyectos de arquitectura e ingeniería en Mendoza',
    images: ['/og-portfolio.jpg'],
    type: 'website',
  },
  alternates: {
    canonical: 'https://estudioandia.com/portfolio',
  },
}

export default async function PortfolioPage() {
  // Datos cargados en build time (SSG)
  const allProjects = await getAllProjects()

  return (
    <>
      <main className="min-h-screen">
        {/* Header */}
        <header className="relative md:h-[35vh] h-[38vh] flex items-end pb-8">
          <Image
            src={getBackgroundUrl('portfolio-hero.webp')}
            alt="Hero portfolio"
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
        </header>

        {/* Content con filtrado client-side */}
        <Suspense fallback={<PortfolioSkeleton />}>
          <PortfolioContent allProjects={allProjects} croquisProjects={croquis} />
        </Suspense>

        <section className="py-12 md:py-16 lg:py-20">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              {/* Main CTA */}
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

              {/* Divider */}
              <div className="w-20 h-0.5 bg-primary mx-auto"></div>

              {/* Related Links */}
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
      </main>
    </>
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
