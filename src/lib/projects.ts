import { Project } from '@/types'

export const projects: Project[] = [
  // Viviendas Unifamiliares
  {
    slug: 'casa-ga',
    name: 'Casa GA',
    category: 'vivienda',
    description: 'Vivienda unifamiliar en Mendoza',
    heroImage: '/projects/casa-ga/hero.webp',
    thumbnail: '/projects/casa-ga/thumbnail.webp',
    gallery: Array.from({ length: 45 }, (_, i) => `/projects/casa-ga/gallery/GA-${i + 1}.webp`),
    featured: true,
  },
  {
    slug: 'casa-vl',
    name: 'Casa VL',
    category: 'vivienda',
    description: 'Casa Atelier',
    heroImage: '/projects/casa-vl/hero.webp',
    thumbnail: '/projects/casa-vl/thumbnail.webp',
    gallery: Array.from({ length: 25 }, (_, i) => `/projects/casa-vl/gallery/VL-${i + 1}.webp`),
    featured: true,
  },
  {
    slug: 'bendita-piedra',
    name: 'Bendita Piedra',
    category: 'vivienda',
    description: 'Vivienda unifamiliar',
    heroImage: '/projects/bendita-piedra/hero.webp',
    thumbnail: '/projects/bendita-piedra/thumbnail.webp',
    gallery: Array.from({ length: 22 }, (_, i) => `/projects/bendita-piedra/gallery/BP-${i + 1}.webp`),
    featured: true,
  },
  {
    slug: 'casa-bc',
    name: 'Casa BC',
    category: 'vivienda',
    description: 'Vivienda unifamiliar',
    heroImage: '/projects/casa-bc/hero.webp',
    thumbnail: '/projects/casa-bc/thumbnail.webp',
    gallery: Array.from({ length: 10 }, (_, i) => `/projects/casa-bc/gallery/BAC-${i + 1}.webp`),
  },
  {
    slug: 'casa-sm',
    name: 'Casa SM',
    category: 'vivienda',
    description: 'Vivienda unifamiliar',
    heroImage: '/projects/casa-sm/hero.webp',
    thumbnail: '/projects/casa-sm/thumbnail.webp',
    gallery: Array.from({ length: 8 }, (_, i) => `/projects/casa-sm/gallery/SM-${i + 1}.webp`),
  },
  {
    slug: 'casa-frm',
    name: 'Casa FRM',
    category: 'vivienda',
    description: 'Vivienda unifamiliar',
    heroImage: '/projects/casa-frm/hero.webp',
    thumbnail: '/projects/casa-frm/thumbnail.webp',
    gallery: Array.from({ length: 10 }, (_, i) => `/projects/casa-frm/gallery/FM-${i + 1}.webp`),
  },
  {
    slug: 'casa-fdm',
    name: 'Casa FDM',
    category: 'vivienda',
    description: 'Vivienda unifamiliar',
    heroImage: '/projects/casa-fdm/hero.webp',
    thumbnail: '/projects/casa-fdm/thumbnail.webp',
    gallery: Array.from({ length: 21 }, (_, i) => `/projects/casa-fdm/gallery/FDM-${i + 1}.webp`),
    featured: true,
  },
  {
    slug: 'casa-ha',
    name: 'Casa HA',
    category: 'vivienda',
    description: 'Vivienda unifamiliar',
    heroImage: '/projects/casa-ha/hero.webp',
    thumbnail: '/projects/casa-ha/thumbnail.webp',
    gallery: Array.from({ length: 8 }, (_, i) => `/projects/casa-ha/gallery/HA-${i + 1}.webp`),
  },
  {
    slug: 'casa-pr',
    name: 'Casa PR',
    category: 'vivienda',
    description: 'Vivienda unifamiliar',
    heroImage: '/projects/casa-pr/hero.webp',
    thumbnail: '/projects/casa-pr/thumbnail.webp',
    gallery: Array.from({ length: 6 }, (_, i) => `/projects/casa-pr/gallery/PER-${i + 1}.webp`),
  },
  {
    slug: 'proyecto-mz',
    name: 'Proyecto MZ',
    category: 'vivienda',
    description: 'Vivienda unifamiliar',
    heroImage: '/projects/proyecto-mz/hero.webp',
    thumbnail: '/projects/proyecto-mz/thumbnail.webp',
    gallery: Array.from({ length: 10 }, (_, i) => `/projects/proyecto-mz/gallery/MAN-${i + 1}.webp`),
  },
  {
    slug: 'casa-am',
    name: 'Casa AM',
    category: 'vivienda',
    description: 'Vivienda unifamiliar',
    heroImage: '/projects/casa-am/hero.webp',
    thumbnail: '/projects/casa-am/thumbnail.webp',
    gallery: Array.from({ length: 13 }, (_, i) => `/projects/casa-am/gallery/AM-${i + 1}.webp`),
  },
  {
    slug: 'casa-al',
    name: 'Casa AL',
    category: 'vivienda',
    description: 'Vivienda unifamiliar',
    heroImage: '/projects/casa-al/hero.webp',
    thumbnail: '/projects/casa-al/thumbnail.webp',
    gallery: Array.from({ length: 4 }, (_, i) => `/projects/casa-al/gallery/AL-${i + 1}.webp`),
  },
  {
    slug: 'casa-na',
    name: 'Casa NA',
    category: 'vivienda',
    description: 'Vivienda unifamiliar',
    heroImage: '/projects/casa-na/hero.webp',
    thumbnail: '/projects/casa-na/thumbnail.webp',
    gallery: Array.from({ length: 33 }, (_, i) => `/projects/casa-na/gallery/NA-${i + 1}.webp`),
  },
  {
    slug: 'casa-pm',
    name: 'Casa PM',
    category: 'vivienda',
    description: 'Vivienda unifamiliar',
    heroImage: '/projects/casa-pm/hero.webp',
    thumbnail: '/projects/casa-pm/thumbnail.webp',
    gallery: Array.from({ length: 39 }, (_, i) => `/projects/casa-pm/gallery/PM-${i + 1}.webp`),
  },
  {
    slug: 'casa-gp',
    name: 'Casa GP',
    category: 'vivienda',
    description: 'Vivienda unifamiliar',
    heroImage: '/projects/casa-gp/hero.webp',
    thumbnail: '/projects/casa-gp/thumbnail.webp',
    gallery: Array.from({ length: 4 }, (_, i) => `/projects/casa-gp/gallery/POT-${i + 1}.webp`),
  },
  {
    slug: 'casa-cp',
    name: 'Casa CP',
    category: 'vivienda',
    description: 'Vivienda unifamiliar',
    heroImage: '/projects/casa-cp/hero.webp',
    thumbnail: '/projects/casa-cp/thumbnail.webp',
    gallery: Array.from({ length: 6 }, (_, i) => `/projects/casa-cp/gallery/CAMP-${i + 1}.webp`),
  },
  {
    slug: 'casa-aa',
    name: 'Casa AA',
    category: 'vivienda',
    description: 'Vivienda unifamiliar',
    heroImage: '/projects/casa-aa/hero.webp',
    thumbnail: '/projects/casa-aa/thumbnail.webp',
    gallery: Array.from({ length: 11 }, (_, i) => `/projects/casa-aa/gallery/AA-${i + 1}.webp`),
    featured: true,
  },

  // Complejos Residenciales
  {
    slug: 'edificio-catalan',
    name: 'Edificio Catalan',
    category: 'complejos',
    description: 'Complejo residencial',
    heroImage: '/projects/edificio-catalan/hero.webp',
    thumbnail: '/projects/edificio-catalan/thumbnail.webp',
    gallery: Array.from({ length: 11 }, (_, i) => `/projects/edificio-catalan/gallery/CAT-${i + 1}.webp`),
  },
  {
    slug: 'deptos-urquiza',
    name: 'Deptos Urquiza',
    category: 'complejos',
    description: 'Complejo residencial',
    heroImage: '/projects/deptos-urquiza/hero.webp',
    thumbnail: '/projects/deptos-urquiza/thumbnail.webp',
    gallery: Array.from({ length: 24 }, (_, i) => `/projects/deptos-urquiza/gallery/DeptUrq-${i + 1}.webp`),
  },
  {
    slug: 'piedra-escondida',
    name: 'Piedra Escondida',
    category: 'complejos',
    description: 'Complejo residencial',
    heroImage: '/projects/piedra-escondida/hero.webp',
    thumbnail: '/projects/piedra-escondida/thumbnail.webp',
    gallery: Array.from({ length: 13 }, (_, i) => `/projects/piedra-escondida/gallery/PE-${i + 1}.webp`),
  },
  {
    slug: 'via-pergola',
    name: 'Vía Pérgola',
    category: 'complejos',
    description: 'Complejo residencial',
    heroImage: '/projects/via-pergola/hero.webp',
    thumbnail: '/projects/via-pergola/thumbnail.webp',
    gallery: Array.from({ length: 10 }, (_, i) => `/projects/via-pergola/gallery/ViaP-${i + 1}.webp`),
  },

  // Desarrollos Inmobiliarios
  {
    slug: 'la-bajada',
    name: 'La Bajada',
    category: 'inmobiliario',
    description: 'Desarrollo inmobiliario',
    heroImage: '/projects/la-bajada/hero.webp',
    thumbnail: '/projects/la-bajada/thumbnail.webp',
    gallery: Array.from({ length: 28 }, (_, i) => `/projects/la-bajada/gallery/BAJADAMALL-${i + 1}.webp`),
  },
]

export const croquis = Array.from({ length: 18 }, (_, i) => ({
  slug: `croquis-${i + 1}`,
  name: `Croquis ${i + 1}`,
  category: 'croquis' as const,
  description: 'Boceto arquitectónico',
  heroImage: `/croquis/croquis-${i + 1}.png`,
  thumbnail: `/croquis/croquis-${i + 1}.png`,
  gallery: [],
}))

const allProjects = [...projects, ...croquis]

export async function getAllProjects(): Promise<Project[]> {
  return allProjects
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return allProjects.find((p) => p.slug === slug)
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  if (category === 'all') return projects
  return projects.filter((p) => p.category === category)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return projects.filter((p) => p.featured)
}

export const categories = [
  { value: 'all', label: 'Todas' },
  { value: 'vivienda', label: 'Viviendas Unifamiliares' },
  { value: 'inmobiliario', label: 'Desarrollos Inmobiliarios' },
  { value: 'complejos', label: 'Complejos Residenciales' },
  { value: 'croquis', label: 'Croquis' },
]