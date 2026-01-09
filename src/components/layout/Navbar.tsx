'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const [isSticky, setIsSticky] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: '-1px 0px 0px 0px',
      }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/#about', label: 'Nosotros' },
    { href: '/#contact', label: 'Contacto' },
  ]

  const isHomePage = pathname === '/'

  return (
    <>
      <div ref={observerTarget} className="absolute top-0 h-1 w-full" />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSticky
            ? 'bg-primary-dark/90 backdrop-blur-sm shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="relative z-50">
              <Image
                src="/resources/img/andia-logo-pie-vertical.png"
                alt="ANDIA ANDIA"
                width={isSticky ? 60 : 100}
                height={isSticky ? 60 : 100}
                className="transition-all duration-300"
                priority
              />
            </Link>

            <ul className="hidden md:flex items-center gap-8 lg:gap-10 mt-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm lg:text-base uppercase font-normal transition-all duration-200 pb-1.5 border-b-3 ${
                      pathname === link.href
                        ? 'border-primary-dark text-white'
                        : isHomePage
                        ? 'border-transparent text-white hover:border-primary-dark'
                        : isSticky
                        ? 'border-transparent text-black hover:border-black'
                        : 'border-transparent text-black hover:border-primary-dark'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 p-2 text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden fixed inset-0 bg-primary-dark/95 backdrop-blur-sm transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ul className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-2xl uppercase font-normal transition-colors ${
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-white hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}