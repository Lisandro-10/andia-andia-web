/**
 * Dominio canónico del sitio. Es fijo (no depende del entorno) para que
 * canonicals, sitemap y JSON-LD nunca apunten a localhost o a un preview.
 */
export const SITE_URL = 'https://estudioandia.com'

/** ID de la entidad Organization del JSON-LD, referenciado desde otros schemas */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`

/**
 * Convierte una ruta del sitio en URL absoluta
 * @param path - Ruta relativa (ej: '/portfolio')
 */
export function absoluteUrl(path = '/'): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
