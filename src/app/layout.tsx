import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
  weight: ['300', '400', '500'], // Reducido: solo pesos utilizados en el proyecto
})

export const metadata: Metadata = {
  metadataBase: new URL('https://estudioandia.com'),
  title: {
    default: 'Andia Estudio | Arquitectura en Mendoza',
    template: '%s | Andia Estudio',
  },
  description:
    'Estudio de arquitectura en Mendoza, Argentina. Diseño de viviendas unifamiliares, complejos residenciales y desarrollos inmobiliarios con enfoque en calidad arquitectónica.',
  keywords: ['arquitectura', 'Mendoza', 'Argentina', 'diseño', 'viviendas', 'Andia'],
  authors: [{ name: 'Lisandro Andia' }],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://estudioandia.com',
    siteName: 'Andia Estudio',
    title: 'Andia Estudio | Arquitectura en Mendoza',
    description: 'Estudio de arquitectura en Mendoza especializado en viviendas y desarrollos inmobiliarios.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Andia Estudio Arquitectura',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andia Estudio | Arquitectura en Mendoza',
    description: 'Estudio de arquitectura en Mendoza especializado en viviendas y desarrollos inmobiliarios.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={workSans.variable}>
      <head>
        <link
          rel="preconnect"
          href="https://d1yl86jsjqb7lc.cloudfront.net"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://d1yl86jsjqb7lc.cloudfront.net"
        />
      </head>
      <body className="font-sans antialiased bg-white text-black">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}