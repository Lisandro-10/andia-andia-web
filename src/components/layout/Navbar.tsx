'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLayoutUrl } from '@/lib/cdn'
import { getBlurDataURL } from '@/lib/generated/blur-placeholders'

const FALLBACK_BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAnSURBVHgB7coxAQAACMOwgaL5d4Ir4EBSELshzpV0UNNBTQc1HdR0AKt6AwnwkFE3AAAAAElFTkSuQmCC'

export function Navbar() {
  const [isSticky, setIsSticky] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

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

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/#about', label: 'Nosotros' },
    { href: '/#contact', label: 'Contacto' },
  ]

  const isHomePage = pathname === '/'

  const mobileMenu = (
    <div
      className={`md:hidden fixed inset-0 z-40 bg-primary-dark/95 backdrop-blur-sm transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
      }`}
    >
      <ul className="flex flex-col items-center justify-center h-full gap-8">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
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
  )

  return (
    <>
      <div ref={observerTarget} className="absolute top-0 h-1 w-full" />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSticky
            ? 'backdrop-blur-sm shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-32">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="relative z-50">
              <div>
                <Image
                  src={getLayoutUrl('logo-navbar.png')}
                  alt="ANDIA ANDIA"
                  width={60}
                  height={60}
                  priority
                  placeholder="blur"
                  blurDataURL={getBlurDataURL('layout/logo-navbar.png') || FALLBACK_BLUR}
                />
              </div>
            </Link>

            <ul className="hidden md:flex items-center gap-8 lg:gap-10 mt-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm lg:text-base text-white uppercase font-normal transition-all duration-200 pb-1.5 border-b-3 ${
                      pathname === link.href
                        ? 'border-primary-dark'
                        : isHomePage
                        ? 'border-transparent hover:border-primary-dark'
                        : isSticky
                        ? 'border-transparent text-white hover:border-primary-dark'
                        : 'border-transparent text-white hover:border-primary-dark'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 p-2 focus:outline-none text-white"
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

      </nav>

      {mounted ? createPortal(mobileMenu, document.body) : null}
    </>
  )
}