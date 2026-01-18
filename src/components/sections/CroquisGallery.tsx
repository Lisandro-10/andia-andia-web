import { getCroquisUrl } from '@/lib/cdn'
import Image from 'next/image'
import Link from 'next/link'
import { getBlurDataURL } from '@/lib/generated/blur-placeholders'

const FALLBACK_BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAnSURBVHgB7coxAQAACMOwgaL5d4Ir4EBSELshzpV0UNNBTQc1HdR0AKt6AwnwkFE3AAAAAElFTkSuQmCC'

const croquis = [
  getCroquisUrl('croquis-19.png'),
  getCroquisUrl('croquis-20.png'),
]

export function CroquisGallery() {
  return (
    <section className="bg-gray-darker py-8 md:py-12 lg:py-16">
      <div className="section-container flex flex-col lg:flex-row gap-8 lg:gap-0 items-center lg:items-stretch">
        {/* Images Column */}
        <div className="w-full lg:w-1/2 px-4 lg:px-0">
          <div className="flex flex-col gap-4 w-full h-full overflow-hidden">
            {croquis.map((image, index) => (
              <div
                key={index}
                className="relative w-full aspect-[16/9] lg:aspect-auto lg:flex-1"
              >
                <Image
                  src={image}
                  alt={`Croquis arquitectónico ${index + 1} - Boceto conceptual del estudio Andia`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={getBlurDataURL(image) || FALLBACK_BLUR}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Text Column */}
        <div className="w-full lg:w-1/2 px-4 lg:px-8 flex flex-col justify-center space-y-6">
          <div className="w-1/4 h-4 bg-primary-light" />

          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-light">
            &quot;EL CROQUIS&quot;
          </h2>

          <h2 className="text-white text-xl md:text-2xl font-light opacity-30">
            Nuestra representación y concepción de nuestros proyectos
            arquitectónicos
          </h2>

          <p className="text-white text-base md:text-lg font-light leading-relaxed mt-8">
            Explora nuestra colección de croquis, bocetos iniciales y conceptos
            creativos. Estas imágenes representan el punto de partida de cada
            proyecto, donde las ideas toman forma y se desarrollan los
            fundamentos conceptuales. Sumérgete en el proceso creativo detrás de
            nuestra arquitectura y descubre cómo transformamos la inspiración en
            diseño concreto.
          </p>

          <div className="pt-4">
            <Link
              href="/portfolio?category=croquis"
              className="inline-block hover:bg-primary-light text-white border-2 border-primary-light px-8 py-3 rounded-full transition-colors duration-300"
            >
              Ver más
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}