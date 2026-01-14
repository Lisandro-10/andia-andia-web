import Link from 'next/link'
import { Facebook, Instagram, Linkedin, MapPin, MessageCircle } from 'lucide-react'

export function Footer() {
  const socialLinks = [
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
      href: 'https://wa.link/32jy4r',
      Icon: MessageCircle,
      label: 'WhatsApp',
      hoverColor: 'hover:text-[#00f379]',
    },
    {
      href: 'https://www.linkedin.com/in/andia-andia-171a98251/',
      Icon: Linkedin,
      label: 'LinkedIn',
      hoverColor: 'hover:text-[#0a66c2]',
    },
    {
      href: 'https://goo.gl/maps/kq2Cc1Ydc1KNaXfy9',
      Icon: MapPin,
      label: 'Ubicación',
      hoverColor: 'hover:text-[#0f9d58]',
    },
  ]

  return (
    <footer id="footer" className="bg-gray-darker py-12 px-4">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="md:w-1/3">
            <ul className="flex justify-center md:justify-start gap-6">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-dark text-2xl transition-colors duration-200 ${social.hoverColor}`}
                    aria-label={social.label}
                  >
                    <social.Icon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-2/3 text-center md:text-right">
            <p className="text-gray-dark text-sm leading-relaxed">
              © {new Date().getFullYear()} ESTUDIO ANDIA ANDIA. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}