import type { Metadata } from 'next'
import { ContactForm } from '@/components/sections/ContactForm'
import { FaMapPin, FaEnvelope, FaWhatsapp } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Contacto | Estudio Andia Andia',
  description:
    'Contactá al Estudio Andia Andia en Mendoza. Consultá tu proyecto de arquitectura: viviendas, complejos residenciales o desarrollos inmobiliarios. Respondemos sin cargo.',
  keywords: [
    'contacto arquitecto Mendoza',
    'consulta arquitectura Mendoza',
    'estudio arquitectura contacto',
    'Andia Andia contacto',
  ],
  alternates: {
    canonical: 'https://estudioandia.com/contacto',
  },
}

const contactDetails = [
  {
    Icon: FaWhatsapp,
    label: 'WhatsApp',
    value: '+54 9 261 537 1582',
    href: 'https://wa.me/5492615371582?text=Hola! Me interesa consultar sobre...',
  },
  {
    Icon: FaEnvelope,
    label: 'Email',
    value: 'andiaarquing@gmail.com',
    href: 'mailto:andiaarquing@gmail.com',
  },
  {
    Icon: FaMapPin,
    label: 'Ubicación',
    value: 'Mendoza, Argentina',
    href: 'https://goo.gl/maps/kq2Cc1Ydc1KNaXfy9',
  },
]

export default function ContactoPage() {
  return (
    <div className="min-h-screen pt-24">
      {/* Page header */}
      <div className="px-4 sm:px-6 lg:px-32 pb-12 border-b border-gray-dark/20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light text-white mb-4">Contacto</h1>
          <p className="text-gray-light text-base md:text-lg">
            Estamos disponibles para escuchar tu proyecto y asesorarte sin cargo.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-32 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Contact details */}
          <aside>
            <h2 className="text-lg font-light text-white mb-8 uppercase tracking-widest text-sm">
              Datos de contacto
            </h2>
            <address className="not-italic space-y-6">
              {contactDetails.map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <Icon className="text-primary mt-0.5 shrink-0 h-4 w-4" aria-hidden="true" />
                  <div>
                    <p className="text-gray-dark text-xs uppercase tracking-widest mb-1">
                      {label}
                    </p>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-white text-sm hover:text-primary transition-colors duration-200"
                    >
                      {value}
                    </a>
                  </div>
                </div>
              ))}
            </address>
          </aside>

          {/* Form — spans 2 columns */}
          <div className="lg:col-span-2">
            <ContactForm variant="inline" />
          </div>
        </div>
      </div>
    </div>
  )
}
