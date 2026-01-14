import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin, MapPin } from 'lucide-react'
import { getLayoutUrl } from '@/lib/cdn'

export function Footer() {
  const socialLinks = [
    {
      href: 'https://www.linkedin.com/in/andia-andia-171a98251/',
      Icon: Linkedin,
      label: 'LinkedIn',
      hoverColor: 'hover:text-[#0a66c2]',
    },
    {
      href: 'https://www.instagram.com/andia.andia_arq/',
      Icon: Instagram,
      label: 'Instagram',
      hoverColor: 'hover:text-[#e95950]',
    },
    {
      href: 'https://www.facebook.com/profile.php?id=100063653724645',
      Icon: Facebook,
      label: 'Facebook',
      hoverColor: 'hover:text-[#3b5998]',
    },
    {
      href: 'https://goo.gl/maps/kq2Cc1Ydc1KNaXfy9',
      Icon: MapPin,
      label: 'Ubicación',
      hoverColor: 'hover:text-[#0f9d58]',
    },
  ]

  const sitemapLinks = [
    { href: '#services', label: 'Servicios' },
    { href: '/portfolio', label: 'Proyectos' },
    { href: '#contact', label: 'Contacto' },
  ]

  return (
    <footer id="footer" className="bg-gray-darker py-12 px-4">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Section - Logo & Social Links */}
          <div className="flex flex-col items-center lg:items-start space-y-6">
            {/* Logo especial - reemplaza este div con tu imagen */}
            <div className="w-32 h-32 rounded-lg">
              <Image 
                src={getLayoutUrl('andia-logo-pie-vertical.png')}
                alt="Logo Estudio Andia" 
                width={128} 
                height={128}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Social Links */}
            <ul className="flex gap-4">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-dark transition-colors duration-200 ${social.hoverColor}`}
                    aria-label={social.label}
                  >
                    <social.Icon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Sitemap & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center lg:text-left">
            {/* Sitemap Column */}
            <div>
              <ul className="space-y-2">
                {sitemapLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-dark text-sm hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <address className="not-italic text-gray-dark text-sm space-y-2">
                <p>Mendoza, Argentina</p>
                <p>
                  <a 
                    href="tel:+5492612345678" 
                    className="hover:text-primary transition-colors duration-200"
                  >
                    +54 9 261 234 5678
                  </a>
                </p>
                <p>
                  <a 
                    href="mailto:info@andiaestudio.com"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    info@andiaestudio.com
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-dark/20 text-center">
          <p className="text-gray-dark text-xs">
            © {new Date().getFullYear()} ESTUDIO ANDIA ANDIA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}