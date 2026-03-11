import Link from 'next/link'
import Image from 'next/image'
import { getLayoutUrl } from '@/lib/cdn'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
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
          <h1 className="text-6xl md:text-8xl font-light text-primary mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-normal mb-4">
            Página no encontrada
          </h2>
          <p className="text-lg text-gray-dark mb-8">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full transition-colors duration-300"
            >
              Ir al inicio
            </Link>
            <Link
              href="/portfolio"
              className="inline-block hover:bg-primary-light hover:text-white text-primary border-2 border-primary-light px-8 py-3 rounded-full transition-colors duration-300"
            >
              Ver proyectos
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}