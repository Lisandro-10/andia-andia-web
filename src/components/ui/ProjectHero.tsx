import Image from 'next/image'

interface ProjectHeroProps {
  name: string
  heroImage: string
}

export function ProjectHero({ name, heroImage }: ProjectHeroProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt={name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
      </div>

      {/* Project Name */}
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-normal uppercase tracking-wide">
          {name}
        </h1>
      </div>
    </section>
  )
}