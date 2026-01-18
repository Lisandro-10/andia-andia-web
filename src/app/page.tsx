import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { FeaturedProjects } from '@/components/sections/FeatureProjects'
import { CroquisGallery } from '@/components/sections/CroquisGallery'
import { ContactForm } from '@/components/sections/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Andia Andia - Estudio de Arquitectura en Mendoza',
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
  alternates: {
    canonical: 'https://estudioandia.com/',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <FeaturedProjects />
      <CroquisGallery />
      <ContactForm />
    </>
  )
}