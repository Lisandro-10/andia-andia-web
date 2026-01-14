import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { getAllProjects, croquis } from '@/lib/projects'
import { PortfolioContent } from '@/components/portfolio/PortfolioContent'
import { getBackgroundUrl } from '@/lib/cdn'

export const metadata: Metadata = {
  title: 'Portfolio de Proyectos Arquitectónicos | Andia Andia Mendoza',
  description:
    'Explora nuestro portfolio de proyectos de arquitectura en Mendoza: viviendas unifamiliares, complejos residenciales, desarrollos inmobiliarios y croquis. Más de 25 años diseñando espacios únicos en Argentina.',
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
    // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuánto tiempo toma diseñar una vivienda en Mendoza?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El proceso de diseño arquitectónico completo, desde el concepto inicial hasta los planos ejecutivos, suele tomar entre 2 y 4 meses, dependiendo de la complejidad del proyecto y los requerimientos específicos del cliente.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Trabajan en toda la provincia de Mendoza?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, realizamos proyectos arquitectónicos en toda la provincia de Mendoza, incluyendo Capital, Luján de Cuyo, Maipú, Godoy Cruz y departamentos del Valle de Uco.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué servicios incluye el estudio de arquitectura?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nuestro servicio integral incluye: relevamiento del terreno, diseño conceptual, anteproyecto, proyecto ejecutivo completo, planos municipales, cómputos y presupuestos, dirección técnica de obra y asesoramiento en la selección de materiales y tecnologías constructivas.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Realizan proyectos de arquitectura sustentable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, Guillermo Andia es especialista en desarrollo sustentable en el hábitat humano. Implementamos criterios de eficiencia energética, aprovechamiento de recursos naturales y diseño bioclimático adaptado al clima de Mendoza.',
        },
      },
    ],
  }

  // Datos cargados en build time (SSG)
  const allProjects = await getAllProjects()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
          <div className="z-10 section-container w-full">
            <div className="border-b-3 border-primary-dark pb-4 text-white">
              <h2 className="text-3xl md:text-4xl font-normal">Portfolio de Proyectos</h2>
            </div>
          </div>
        </header>

        {/* Content con filtrado client-side */}
        <Suspense fallback={<PortfolioSkeleton />}>
          <PortfolioContent allProjects={allProjects} croquisProjects={croquis} />
        </Suspense>

                {/* FAQ Section */}
        {/* <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-light mb-8 md:mb-12 text-center">
                Preguntas Frecuentes
              </h2>
              
              <dl className="space-y-6 md:space-y-8">
                <div>
                  <dt className="text-lg md:text-xl font-medium mb-2 text-black">
                    ¿Cuánto tiempo toma diseñar una vivienda en Mendoza?
                  </dt>
                  <dd className="text-base md:text-lg text-gray-dark leading-relaxed">
                    El proceso de diseño arquitectónico completo, desde el concepto inicial hasta 
                    los planos ejecutivos, suele tomar entre 2 y 4 meses, dependiendo de la 
                    complejidad del proyecto y los requerimientos específicos del cliente.
                  </dd>
                </div>

                <div>
                  <dt className="text-lg md:text-xl font-medium mb-2 text-black">
                    ¿Trabajan en toda la provincia de Mendoza?
                  </dt>
                  <dd className="text-base md:text-lg text-gray-dark leading-relaxed">
                    Sí, realizamos proyectos arquitectónicos en toda la provincia de Mendoza, 
                    incluyendo Capital, Luján de Cuyo, Maipú, Godoy Cruz y departamentos del 
                    Valle de Uco.
                  </dd>
                </div>

                <div>
                  <dt className="text-lg md:text-xl font-medium mb-2 text-black">
                    ¿Qué servicios incluye el estudio de arquitectura?
                  </dt>
                  <dd className="text-base md:text-lg text-gray-dark leading-relaxed">
                    Nuestro servicio integral incluye: relevamiento del terreno, diseño conceptual, 
                    anteproyecto, proyecto ejecutivo completo, planos municipales, cómputos y 
                    presupuestos, dirección técnica de obra y asesoramiento en la selección de 
                    materiales y tecnologías constructivas.
                  </dd>
                </div>

                <div>
                  <dt className="text-lg md:text-xl font-medium mb-2 text-black">
                    ¿Realizan proyectos de arquitectura sustentable?
                  </dt>
                  <dd className="text-base md:text-lg text-gray-dark leading-relaxed">
                    Sí, Guillermo Andia es especialista en desarrollo sustentable en el hábitat 
                    humano. Implementamos criterios de eficiencia energética, aprovechamiento de 
                    recursos naturales y diseño bioclimático adaptado al clima de Mendoza.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-gray-darker">
          <div className="section-container text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl md:text-3xl font-light text-white">
                ¿Tenés un proyecto en mente?
              </h2>
              <p className="text-base md:text-lg text-gray-dark">
                Consultanos sin compromiso. Evaluamos tu proyecto y te asesoramos 
                para convertir tus ideas en realidad.
              </p>
              <a
                href="https://wa.me/5492615371582"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-6 md:px-8 py-3 md:py-4 rounded-full transition-colors duration-300 text-base md:text-lg"
              >
                Contactar por WhatsApp
              </a>
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
