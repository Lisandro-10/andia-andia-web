const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || ''

/**
 * Convierte una ruta relativa en una URL completa de S3/CDN
 * @param path - Ruta relativa (ej: 'projects/casa-ga/hero.webp')
 * @returns URL completa de S3/CDN
 */
export function getCDNUrl(path: string): string {
  // Si ya es una URL completa, retornarla sin modificar
  console.log(path)
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  
  // Remover slash inicial si existe
  const cleanPath = path.startsWith('/') ? "/" + path : path;
  
  // Si no hay CDN_URL configurado, retornar la ruta original
  if (!CDN_URL) {
    return `/${cleanPath}`
  }
  
  return `${CDN_URL}/${cleanPath}`
}

/**
 * Alias del helper principal para mayor legibilidad
 */
export const cdnUrl = getCDNUrl

/**
 * Helper específico para imágenes de proyectos
 * @param slug - Slug del proyecto
 * @param filename - Nombre del archivo
 * @returns URL completa
 */
export function getProjectImageUrl(slug: string, filename: string): string {
  return getCDNUrl(`projects/${slug}/gallery/${filename}`)
}

/**
 * Helper para imágenes específicas en la galería de un proyecto
 * @param slug - Slug del proyecto
 * @param imageName - Nombre de la imagen (con extensión)
 * @returns URL completa
 */
export function getProjectGalleryImageUrl(slug: string, imageName: string): string {
  return getCDNUrl(`projects/${slug}/gallery/${imageName}`)
}

/**
 * Genera un array con las URLs de todas las imágenes de la galería de un proyecto
 * @param slug - Slug del proyecto
 * @param count - Cantidad de imágenes en la galería
 * @param prefix - Prefijo de los nombres de archivo (opcional, por defecto 'image-')
 * @param extension - Extensión de los archivos (opcional, por defecto '.webp')
 * @returns Array de URLs de las imágenes
 */
export function getAllProjectGalleryImages(
  slug: string, 
  count: number, 
  prefix: string = 'image-', 
  extension: string = '.webp'
): string[] {
  return Array.from({ length: count }, (_, i) => 
    getProjectGalleryImageUrl(slug, `${prefix}${i + 1}${extension}`)
  )
}

/**
 * Helper para thumbnail de proyecto
 * @param slug - Slug del proyecto
 * @returns URL completa
 */
export function getProjectThumbnailUrl(slug: string): string {
  return getCDNUrl(`projects/${slug}/thumbnail`)
}

/**
 * Helper para imágenes de background
 * @param filename - Nombre del archivo
 * @returns URL completa
 */
export function getBackgroundUrl(filename: string): string {
  return getCDNUrl(`backgrounds/${filename}`)
}

/**
 * Helper para imágenes de layout (logos, etc)
 * @param filename - Nombre del archivo
 * @returns URL completa
 */
export function getLayoutUrl(filename: string): string {
  return getCDNUrl(`layout/${filename}`)
}

/**
 * Helper para croquis
 * @param filename - Nombre del archivo
 * @returns URL completa
 */
export function getCroquisUrl(filename: string): string {
  return getCDNUrl(`croquis/${filename}`)
}

