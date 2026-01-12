'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getLayoutUrl } from '@/lib/cdn'

export default function Error({
  reset,
}: {
  reset: () => void
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="section-container text-center py-16">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src={getLayoutUrl('logo-horizontal.png')}
              alt="ANDIA ANDIA"
              width={300}
              height={75}
              className="mx-auto opacity-50"
            />
          </div>

          {/* Error Message */}
          <h1 className="text-5xl md:text-7xl font-light text-primary mb-4">
            Error
          </h1>
          <h2 className="text-2xl md:text-3xl font-normal text-black mb-4">
            Algo salió mal
          </h2>
          <p className="text-lg text-gray-dark mb-8">
            Ocurrió un error inesperado. Por favor, intenta nuevamente o regresa
            al inicio.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full transition-colors duration-300"
            >
              Reintentar
            </button>
            <Link
              href="/"
              className="inline-block bg-white hover:bg-primary-light text-primary border-2 border-primary-light px-8 py-3 rounded-full transition-colors duration-300"
            >
              Ir al inicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
