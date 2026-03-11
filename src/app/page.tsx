import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { FeaturedProjects } from '@/components/sections/FeatureProjects'
import { CroquisGallery } from '@/components/sections/CroquisGallery'
import { FAQ } from '@/components/sections/FAQ'
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué servicios ofrece el Estudio Andia Andia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ofrecemos diseño arquitectónico, proyecto ejecutivo, ingeniería estructural y dirección de obra para viviendas unifamiliares, complejos residenciales y desarrollos inmobiliarios en Mendoza.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo lleva el diseño de una vivienda?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El tiempo varía según la complejidad del proyecto. En general, la etapa de diseño y proyecto ejecutivo de una vivienda unifamiliar toma entre 2 y 4 meses. Consultanos para una estimación personalizada.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En qué zonas de Mendoza trabajan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trabajamos en toda la provincia de Mendoza, con especial presencia en Guaymallén, Capital, Godoy Cruz, Las Heras y Luján de Cuyo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo inicio el proceso con el estudio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El primer paso es una consulta inicial donde evaluamos tu proyecto, necesidades y presupuesto. Podés contactarnos por WhatsApp o completar el formulario de contacto para coordinar una reunión sin cargo.',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <About />
      <Services />
      <FeaturedProjects />
      <CroquisGallery />
      <FAQ />
      <ContactForm />
    </>
  )
}