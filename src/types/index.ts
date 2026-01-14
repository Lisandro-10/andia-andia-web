export interface Project {
  slug: string
  name: string
  category: 'vivienda' | 'inmobiliario' | 'complejos' | 'croquis'
  description: string
  heroImage: string
  thumbnail: string
  gallery: string[]
  featured?: boolean
}