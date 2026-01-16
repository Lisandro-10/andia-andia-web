import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
  weight: ['300', '400', '500'], // Reducido: solo pesos utilizados en el proyecto
})

export const metadata: Metadata = {
  metadataBase: new URL('https://estudioandia.com'),
  title: {
    default: 'Andia Andia | Arquitectura e Ingeniería en Mendoza',
    template: '%s | Andia Andia',
  },
  description:
    'Estudio de arquitectura e ingeniería en Mendoza, Argentina. Diseño de viviendas unifamiliares, complejos residenciales y desarrollos inmobiliarios con enfoque en calidad arquitectónica.',
  keywords: ['arquitectura', 'Mendoza', 'Argentina', 'diseño', 'viviendas', 'Andia'],
  authors: [{ name: 'Lisandro Andia' }],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://estudioandia.com',
    siteName: 'Andia Andia',
    title: 'Andia Andia | Arquitectura e Ingeniería en Mendoza',
    description: 'Estudio de arquitectura e ingeniería en Mendoza especializado en viviendas y desarrollos inmobiliarios.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Andia Andia Arquitectura e Ingeniería',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andia Andia | Arquitectura e Ingeniería en Mendoza',
    description: 'Estudio de arquitectura e ingeniería en Mendoza especializado en viviendas y desarrollos inmobiliarios.',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["ArchitectsOffice", "LocalBusiness"],
              "@id": "https://estudioandia.com/#organization",
              "name": "Andia Andia Arquitectura e Ingeniería",
              "legalName": "Lisandro Andia - Arquitecto",
              "description": "Estudio de arquitectura e ingeniería en Mendoza, Argentina. Especializado en diseño de viviendas unifamiliares, complejos residenciales y desarrollos inmobiliarios de alta calidad.",
              "url": "https://estudioandia.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://estudioandia.com/logo.png",
                "width": "600",
                "height": "200"
              },
              "image": [
                "https://estudioandia.com/og-image.jpg",
                "https://d1yl86jsjqb7lc.cloudfront.net/hero-home.jpg"
              ],
              "telephone": "+54 9 261-537-1582",
              "email": "andiaarquing@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Pierandrei 245",
                "addressLocality": "Villa Nueva",
                "addressRegion": "Mendoza",
                "postalCode": "5521",
                "addressCountry": "AR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-32.90897018430761",
                "longitude": "-68.79175798302947"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Guaymallén",
                  "containedIn": {
                    "@type": "State",
                    "name": "Mendoza"
                  }
                },
                {
                  "@type": "State",
                  "name": "Mendoza"
                }
              ],
              "sameAs": [
                "https://www.instagram.com/andia.andia_arq/",
                "https://www.facebook.com/profile.php?id=100063653724645"
              ],
              "founders": [
                {
                  "@type": "Person",
                  "name": "Marcelo Andia",
                  "jobTitle": "Arquitecto"
                },
                {
                  "@type": "Person",
                  "name": "Guillermo Andia",
                  "jobTitle": "Ingeniero en Construcciones"
                }
              ],
              "foundingDate": "1998",
              "knowsAbout": [
                "Arquitectura Residencial",
                "Diseño de Viviendas",
                "Complejos Residenciales",
                "Desarrollos Inmobiliarios",
                "Diseño Arquitectónico",
                "Ingeniería Estructural"
              ],
              "inLanguage": "es-AR"
            })
          }
        }
        />
      </head>

      <body className="font-sans antialiased bg-white text-black">
        <Header />
        <main>{children}</main>
        <Analytics />
        <Footer />
        <FloatingWhatsApp 
          phoneNumber="5492615371582"
        />
      </body>
    </html>
  )
}