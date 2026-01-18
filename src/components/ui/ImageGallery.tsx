'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import { getBlurDataURL } from '@/lib/generated/blur-placeholders'

// Placeholder genérico para imágenes sin blur data
const FALLBACK_BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAnSURBVHgB7coxAQAACMOwgaL5d4Ir4EBSELshzpV0UNNBTQc1HdR0AKt6AwnwkFE3AAAAAElFTkSuQmCC'

interface ImageGalleryProps {
  images: string[]
  projectName: string
}

export function ImageGallery({ images, projectName }: ImageGalleryProps) {
  const [open, setOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  // Distribuir imágenes en 3 columnas para mantener el layout original
  const distributeImages = () => {
    const columns: string[][] = [[], [], []]
    images.forEach((img, index) => {
      columns[index % 3].push(img)
    })
    return columns
  }

  const columns = distributeImages()

  // Preparar slides para el lightbox
  const slides = images.map((src) => ({ src }))

  // Handler para abrir lightbox con la imagen clickeada
  const handleImageClick = (imageUrl: string) => {
    const index = images.indexOf(imageUrl)
    setPhotoIndex(index)
    setOpen(true)
  }

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-heading">GALERÍA</h2>
        </div>

        {/* Gallery Grid - Masonry Layout */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-2">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="w-full md:flex-[0_0_45%] lg:flex-[0_0_32%] flex flex-col gap-2"
            >
              {column.map((image, imageIndex) => {
                const blurDataURL = getBlurDataURL(image) || FALLBACK_BLUR
                const globalIndex = columnIndex * Math.ceil(images.length / 3) + imageIndex + 1
                // Las primeras 6 imágenes visibles (2 por columna) se cargan eager
                const isAboveFold = columnIndex < 3 && imageIndex < 2

                return (
                  <div
                    key={imageIndex}
                    className="relative w-full overflow-hidden cursor-pointer group"
                    onClick={() => handleImageClick(image)}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={image}
                        alt={`${projectName} - Imagen ${globalIndex}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                        loading={isAboveFold ? 'eager' : 'lazy'}
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                      />
                      {/* Overlay hover */}
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={photoIndex}
        slides={slides}
        plugins={[Counter]}
        counter={{
          container: { style: { top: 0, left: 0, right: 0 } },
        }}
        carousel={{
          finite: images.length <= 1,
        }}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
          closeOnPullUp: false,
        }}
        toolbar={{
          buttons: [],
        }}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
          },
        }}
        render={{
          buttonPrev: images.length > 1 ? undefined : () => null,
          buttonNext: images.length > 1 ? undefined : () => null,
        }}
      />
    </section>
  )
}