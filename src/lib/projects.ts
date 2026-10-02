import type { Project } from '@/types'

type Category = Project['category']

interface CategoryInfo {
  /** Etiqueta plural para filtros */
  label: string
  /** Nombre singular, usado en alt text */
  singular: string
  /** Frase agregada a la meta description del proyecto */
  description: string
  /** Valor de `genre` en el schema CreativeWork */
  genre: string
  keywords: string[]
}

/** Fuente única de textos por categoría (el orden define el orden de los filtros) */
export const CATEGORIES = {
  vivienda: {
    label: 'Viviendas Unifamiliares',
    singular: 'Vivienda unifamiliar',
    description: 'Vivienda unifamiliar de alta calidad.',
    genre: 'Arquitectura Residencial',
    keywords: ['vivienda unifamiliar', 'casa', 'diseño residencial'],
  },
  inmobiliario: {
    label: 'Desarrollos Inmobiliarios',
    singular: 'Desarrollo inmobiliario',
    description: 'Desarrollo inmobiliario profesional.',
    genre: 'Desarrollo Inmobiliario',
    keywords: ['desarrollo inmobiliario', 'proyecto inmobiliario', 'inversión inmobiliaria'],
  },
  complejos: {
    label: 'Complejos Residenciales',
    singular: 'Complejo residencial',
    description: 'Complejo residencial moderno.',
    genre: 'Complejo Residencial',
    keywords: ['complejo residencial', 'desarrollo habitacional', 'múltiples unidades'],
  },
  croquis: {
    label: 'Croquis',
    singular: 'Croquis arquitectónico',
    description: 'Croquis y boceto arquitectónico conceptual.',
    genre: 'Croquis Arquitectónico',
    keywords: ['croquis arquitectónico', 'boceto', 'diseño conceptual'],
  },
} satisfies Record<Category, CategoryInfo>

type AltSource = Pick<Project, 'name' | 'category' | 'location'>

/**
 * Alt text descriptivo para la imagen principal de un proyecto (thumbnail, hero, OpenGraph).
 * Describe tipo y ubicación en vez de repetir solo el nombre, que ya suele estar visible.
 * Ej: "Vivienda unifamiliar en Chacras de Coria - Casa GA, Estudio Andia Andia"
 */
export function projectImageAlt(project: AltSource): string {
  if (project.category === 'croquis') {
    return `${project.name} - Boceto conceptual del Estudio Andia Andia`
  }
  const { singular } = CATEGORIES[project.category]
  return `${singular} en ${project.location ?? 'Mendoza'} - ${project.name}, Estudio Andia Andia`
}

/**
 * Alt text para una foto de la galería de un proyecto
 * Ej: "Casa GA, vivienda unifamiliar en Mendoza - Foto 3"
 */
export function galleryImageAlt(project: AltSource, index: number): string {
  const singular = CATEGORIES[project.category].singular.toLowerCase()
  return `${project.name}, ${singular} en ${project.location ?? 'Mendoza'} - Foto ${index}`
}
