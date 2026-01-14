'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { getBlurDataURL } from '@/lib/generated/blur-placeholders'

// Placeholder genérico para imágenes sin blur data
const FALLBACK_BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAnSURBVHgB7coxAQAACMOwgaL5d4Ir4EBSELshzpV0UNNBTQc1HdR0AKt6AwnwkFE3AAAAAElFTkSuQmCC'

interface ImageGalleryProps {
  images: string[]
  projectName: string
}

// Tipo para ViewerJS (evitar import estático)
type ViewerInstance = {
  destroy: () => void
  show: () => void
}

export function ImageGallery({ images, projectName }: ImageGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<ViewerInstance | null>(null)
  const viewerLoadedRef = useRef(false)

  // Función para cargar ViewerJS dinámicamente
  const loadViewer = useCallback(async () => {
    if (viewerLoadedRef.current || !galleryRef.current) return

    try {
      // Cargar CSS dinámicamente
      if (!document.querySelector('link[href*="viewer.css"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.11.6/viewer.min.css'
        document.head.appendChild(link)
        // Esperar a que el CSS cargue
        await new Promise((resolve) => {
          link.onload = resolve
          link.onerror = resolve // Continuar aunque falle
        })
      }

      // Dynamic import de ViewerJS
      const ViewerModule = await import('viewerjs')
      const Viewer = ViewerModule.default

      if (galleryRef.current && !viewerRef.current) {
        viewerRef.current = new Viewer(galleryRef.current, {
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
        viewerLoadedRef.current = true
      }
    } catch (error) {
      console.error('Error loading ViewerJS:', error)
    }
  }, [])

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [])

  // Handler para click en imagen - carga viewer si no está cargado
  const handleImageClick = useCallback(async () => {
    if (!viewerLoadedRef.current) {
      await loadViewer()
    }
    // El viewer se activará automáticamente con el click
  }, [loadViewer])

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
          onClick={handleImageClick}
        >
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
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={image}
                        alt={`${projectName} - Imagen ${globalIndex}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        loading={isAboveFold ? 'eager' : 'lazy'}
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
