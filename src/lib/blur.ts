import { getBlurDataURL } from '@/lib/generated/blur-placeholders'

// Placeholder genérico para imágenes sin blur data
const FALLBACK_BLUR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAnSURBVHgB7coxAQAACMOwgaL5d4Ir4EBSELshzpV0UNNBTQc1HdR0AKt6AwnwkFE3AAAAAElFTkSuQmCC'

/**
 * Blur placeholder pre-generado de una imagen, o uno genérico si no existe
 * @param path - Ruta relativa o URL completa del CDN
 */
export function getBlurOrFallback(path: string): string {
  return getBlurDataURL(path) || FALLBACK_BLUR
}
