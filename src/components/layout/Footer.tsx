import Link from 'next/link'

export function Footer() {
  const socialLinks = [
    {
      href: 'https://www.instagram.com/andia.andia_arq/',
      icon: 'fa-instagram',
      label: 'Instagram',
      hoverColor: 'hover:text-[#e95950]',
    },
    {
      href: 'https://www.facebook.com/profile.php?id=100063653724645',
      icon: 'fa-facebook-f',
      label: 'Facebook',
      hoverColor: 'hover:text-[#3b5998]',
    },
    {
      href: 'https://wa.link/32jy4r',
      icon: 'fa-whatsapp',
      label: 'WhatsApp',
      hoverColor: 'hover:text-[#00f379]',
    },
    {
      href: 'https://www.linkedin.com/in/andia-andia-171a98251/',
      icon: 'fa-linkedin',
      label: 'LinkedIn',
      hoverColor: 'hover:text-[#0a66c2]',
    },
    {
      href: 'https://goo.gl/maps/kq2Cc1Ydc1KNaXfy9',
      icon: 'fa-location-dot',
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
                    <i className={`fa-brands ${social.icon}`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-2/3 text-center md:text-right">
            <p className="text-gray-dark text-sm leading-relaxed">
              This webpage has been created for business purposes by{' '}
              <Link
                href="https://www.linkedin.com/in/lisandro-andia-3b46aa23a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:border-b hover:border-orange transition-all"
              >
                Lisandro Andia
              </Link>{' '}
              and{' '}
              <Link
                href="#"
                className="text-white hover:border-b hover:border-orange transition-all"
              >
                Nahid Akhter
              </Link>
              .
              <br />
              Any attempt of using anything from it, will have consequences.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}