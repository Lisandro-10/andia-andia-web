import type { Variants, Transition } from 'framer-motion'

// Duraciones en segundos
export const duration = {
  fast: 0.15,
  base: 0.3,
  slow: 0.5,
} as const

// Easings
export const ease = {
  out: [0.0, 0.0, 0.2, 1],
  inOut: [0.4, 0.0, 0.2, 1],
} as const

// Transiciones reutilizables
export const transition = {
  fast: { duration: duration.fast, ease: ease.out } satisfies Transition,
  base: { duration: duration.base, ease: ease.out } satisfies Transition,
  slow: { duration: duration.slow, ease: ease.out } satisfies Transition,
} as const

// Hero y bloques grandes: fade + slide sutil
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transition.slow },
}

// Items de grid/lista: solo fade, sin y — evita agitación visual en stagger
export const staggerItem: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.base },
}

// Contenedor de stagger — delayChildren corto, stagger ajustado para grids grandes
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

// Stagger más lento para listas cortas (filtros, nav links)
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
}

// Configuración de viewport para whileInView
export const viewportOnce = { once: true, margin: '-60px' }
