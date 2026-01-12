'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'

interface ImageGalleryProps {
  images: string[]
  projectName: string
}

export function ImageGallery({ images, projectName }: ImageGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (galleryRef.current && images.length > 0) {
      const viewer = new Viewer(galleryRef.current, {
        inline: false,
        button: false,
        navbar: false,
        title: true,
        toolbar: true,
        tooltip: false,
        movable: false,
        zoomable: true,
        rotatable: false,
        scalable: false,
        transition: false,
        fullscreen: true,
        keyboard: false,
      })

      return () => {
        viewer.destroy()
      }
    }
  }, [images])

  // Distribuir imágenes en 3 columnas para mantener el layout original
  const distributeImages = () => {
    const columns: string[][] = [[], [], []]
    images.forEach((img, index) => {
      columns[index % 3].push(img)
    })
    return columns
  }

  const columns = distributeImages()

  return (
    <section className="bg-gray-light-2 py-16 md:py-20 lg:py-24">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-heading">GALERÍA</h2>
        </div>

        {/* Gallery Grid - Masonry Layout */}
        <div
          ref={galleryRef}
          className="flex flex-col md:flex-row justify-center items-start gap-2"
        >
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="w-full md:flex-[0_0_45%] lg:flex-[0_0_32%] flex flex-col gap-2"
            >
              {column.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className="relative w-full overflow-hidden cursor-pointer group"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image}
                      alt={`${projectName} - Imagen ${columnIndex * Math.ceil(images.length / 3) + imageIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      loading={imageIndex < 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}