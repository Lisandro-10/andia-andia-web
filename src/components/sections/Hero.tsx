import { getCDNUrl, getLayoutUrl } from '@/lib/cdn'
import Image from 'next/image'
import { getBlurDataURL } from '@/lib/generated/blur-placeholders'

const FALLBACK_BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAnSURBVHgB7coxAQAACMOwgaL5d4Ir4EBSELshzpV0UNNBTQc1HdR0AKt6AwnwkFE3AAAAAElFTkSuQmCC'

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
          alt="" // Imagen decorativa
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
          placeholder="blur"
          blurDataURL={getBlurDataURL("backgrounds/home.webp") || FALLBACK_BLUR}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <Image
            src={getLayoutUrl("logo-horizontal.png")}
            alt="ANDIA ANDIA"
            width={600}
            height={150}
            priority
            className="w-full max-w-md md:max-w-xl lg:max-w-2xl mx-auto h-auto"
            placeholder="blur"
            blurDataURL={getBlurDataURL("layout/logo-horizontal.png") || FALLBACK_BLUR}
          />
        </div>
      </div>
    </section>
  )
}