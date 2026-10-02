import { getCDNUrl, getLayoutUrl } from '@/lib/cdn'
import Image from 'next/image'
import { getBlurOrFallback } from '@/lib/blur'
import { HeroContent } from './HeroContent'

export function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getCDNUrl("backgrounds/home.webp")}
          alt="Estudio de arquitectura y construcción en Mendoza - Diseño de viviendas modernas"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
          placeholder="blur"
          blurDataURL={getBlurOrFallback("backgrounds/home.webp")}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
      </div>

      {/* Hero Content */}
      <HeroContent>
        <div className="max-w-4xl mx-auto">
          <Image
            src={getLayoutUrl("logo-horizontal.png")}
            alt="Logo de Andia Andia - Estudio de arquitectura en Mendoza"
            width={600}
            height={150}
            priority
            className="w-full max-w-md md:max-w-xl lg:max-w-2xl mx-auto h-auto"
            placeholder="blur"
            blurDataURL={getBlurOrFallback("layout/logo-horizontal.png")}
          />
        </div>
      </HeroContent>
    </section>
  )
}