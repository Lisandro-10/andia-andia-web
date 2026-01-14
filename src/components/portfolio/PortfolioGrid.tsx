import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types'
import { getBlurDataURL } from '@/lib/generated/blur-placeholders'

const FALLBACK_BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAnSURBVHgB7coxAQAACMOwgaL5d4Ir4EBSELshzpV0UNNBTQc1HdR0AKt6AwnwkFE3AAAAAElFTkSuQmCC'

interface PortfolioGridProps {
  projects: Project[]
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  return (
    <div className="bg-gray-darker section-container py-8">
      <div className="flex flex-wrap justify-start">
        {projects.map((project) => {
          const isCroquis = project.category === 'croquis'
          
          const content = (
            <div className="relative aspect-square">
              {/* Overlay - solo para NO croquis */}
              {!isCroquis && (
                <div className="absolute inset-0 bg-orange opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10" />
              )}
              
              {/* Image */}
              <Image
                src={project.thumbnail}
                alt={project.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-cover ${
                  !isCroquis && 'transition-opacity duration-300 group-hover:opacity-60'
                }`}
                placeholder="blur"
                blurDataURL={getBlurDataURL(project.thumbnail) || FALLBACK_BLUR}
              />
              
              {/* Title - solo para NO croquis */}
              {!isCroquis && (
                <div className="absolute top-[5%] left-[80%] group-hover:left-[5%] transition-all duration-300 z-20">
                  <p className="text-white text-xl md:text-2xl font-medium uppercase border-b-2 border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.name}
                  </p>
                </div>
              )}
            </div>
          )
          
          return (
            <div
              key={project.slug}
              className="w-full sm:w-1/2 lg:w-1/3 p-2"
            >
              {isCroquis ? (
                <div className="relative block overflow-hidden">
                  {content}
                </div>
              ) : (
                <Link
                  href={`/proyectos/${project.slug}`}
                  className="group relative block overflow-hidden"
                >
                  {content}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}