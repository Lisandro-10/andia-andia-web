import { getCDNUrl } from '@/lib/cdn'
import Image from 'next/image'
import { getBlurDataURL } from '@/lib/generated/blur-placeholders'

const FALLBACK_BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAnSURBVHgB7coxAQAACMOwgaL5d4Ir4EBSELshzpV0UNNBTQc1HdR0AKt6AwnwkFE3AAAAAElFTkSuQmCC'

export function About() {
  return (
    <section id="about" className="relative bg-gray-darker group">
      <div className="section-container pr-0 flex flex-col lg:flex-row lg:min-h-screen">
        {/* Text Column */}
        <div className="w-full lg:w-1/2 py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 flex items-center">
          <div className="space-y-6 w-full">
            {/* Animated Line */}
            <div className="w-1/4 h-4 bg-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-8" />

            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
              ESTUDIO DE ARQUITECTURA E INGENIERÍA
            </h1>

            <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-light opacity-30 mt-12">
              MENDOZA - ARGENTINA
            </h2>

            <div className="space-y-6 mt-12">
              <p className="text-white text-base md:text-lg lg:text-xl font-light leading-relaxed">
                Desde 1998 el arquitecto Marcelo Andia, graduado en la
                Universidad de Mendoza y el ingeniero Guillermo Andia, ingeniero
                en construcciones especialista en desarrollo sustentable en el
                hábitat humano, continúan el legado familiar.
              </p>

              <p className="text-white text-base md:text-lg lg:text-xl font-light leading-relaxed">
                Poniendo en valor la simpleza de las formas, el juego de
                volumetrías abstractas, el expresivo uso de materiales al natural
                y el carácter funcional - racional de sus espacios, definen el
                lenguaje arquitectónico atemporal de sus obras.
              </p>
            </div>
          </div>
        </div>

        {/* Image Column - Full height on desktop */}
        <div className="w-full lg:w-1/2 relative h-[400px] md:h-[600px] lg:h-auto">
          <Image
            src={getCDNUrl("layout/about.webp")}
            alt="Marcelo y Guillermo Andia"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={getBlurDataURL("layout/about.webp") || FALLBACK_BLUR}
          />
        </div>
      </div>
    </section>
  )
}