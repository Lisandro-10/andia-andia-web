'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@/types'
import { staggerContainer, staggerItem } from '@/lib/motion'

interface PortfolioGridProps {
  projects: Project[]
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  return (
    <div className="section-container py-8">
      <motion.div
        className="flex flex-wrap justify-start"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
      >
        {projects.map((project) => {
          const isCroquis = project.category === 'croquis'

          const content = (
            <div className="relative aspect-square">
              {!isCroquis && (
                <div className="absolute inset-0 bg-orange opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10" />
              )}
              <Image
                src={project.thumbnail}
                alt={project.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-cover ${
                  !isCroquis && 'transition-opacity duration-300 group-hover:opacity-60'
                }`}
                loading="lazy"
              />
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
            <motion.div
              key={project.slug}
              variants={staggerItem}
              className="w-full sm:w-1/2 lg:w-1/3 p-2"
              whileHover={!isCroquis ? { y: -4 } : undefined}
              whileTap={!isCroquis ? { scale: 0.98 } : undefined}
              transition={{ duration: 0.2, ease: [0.0, 0.0, 0.2, 1] }}
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
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
