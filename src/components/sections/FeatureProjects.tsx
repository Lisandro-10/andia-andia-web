import { getProjectThumbnailUrl } from '@/lib/cdn'
import Image from 'next/image'
import Link from 'next/link'
import { getBlurDataURL } from '@/lib/generated/blur-placeholders'

const FALLBACK_BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAnSURBVHgB7coxAQAACMOwgaL5d4Ir4EBSELshzpV0UNNBTQc1HdR0AKt6AwnwkFE3AAAAAElFTkSuQmCC'

const featuredProjects = [
  {
    slug: 'casa-vl',
    name: 'Casa VL',
    image: getProjectThumbnailUrl('casa-vl'),
  },
  {
    slug: 'casa-fdm',
    name: 'Casa FDM',
    image: getProjectThumbnailUrl('casa-fdm'),
  },
  {
    slug: 'casa-aa',
    name: 'Casa AA',
    image: getProjectThumbnailUrl('casa-aa'),
  },
  {
    slug: 'casa-ga',
    name: 'Casa GA',
    image: getProjectThumbnailUrl('casa-ga'),
  },
  {
    slug: 'bendita-piedra',
    name: 'Bendita Piedra',
    image: getProjectThumbnailUrl('bendita-piedra'),
  },
]

export function FeaturedProjects() {
  return (
    <section className="bg-gray-darker py-10 md:py-20 lg:py-24">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl font-normal text-white opacity-80 mb-5 mt-24">
            Proyectos Destacados
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="space-y-4">
          {/* First Row - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredProjects.slice(0, 3).map((project) => (
              <Link
                key={project.slug}
                href={`/proyectos/${project.slug}`}
                className="group relative block overflow-hidden"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover will-change-transform transition-transform duration-500 ease-out scale-100 group-hover:scale-[1.03]"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL(project.image) || FALLBACK_BLUR}
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/10" />
                </div>
                <div className="absolute top-0 left-0 p-4 md:p-6 lg:p-10 z-10">
                  <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-normal border-b-2 border-transparent group-hover:border-white transition-colors duration-300 ease-out inline-block pb-2">
                    {project.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Second Row - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredProjects.slice(3, 5).map((project) => (
              <Link
                key={project.slug}
                href={`/proyectos/${project.slug}`}
                className="group relative block overflow-hidden"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover will-change-transform transition-transform duration-500 ease-out scale-100 group-hover:scale-[1.03]"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL(project.image) || FALLBACK_BLUR}
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/10" />
                </div>
                <div className="absolute top-0 left-0 p-4 md:p-6 lg:p-10 z-10">
                  <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-normal border-b-2 border-transparent group-hover:border-white transition-colors duration-300 ease-out inline-block pb-2">
                    {project.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}