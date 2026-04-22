'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Project } from '@/types'
import { PortfolioGrid } from './PortfolioGrid'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainerSlow, staggerItem } from '@/lib/motion'

const categories = [
  { value: 'all', label: 'Todas' },
  { value: 'vivienda', label: 'Viviendas Unifamiliares' },
  { value: 'inmobiliario', label: 'Desarrollos Inmobiliarios' },
  { value: 'complejos', label: 'Complejos Residenciales' },
  { value: 'croquis', label: 'Croquis' },
]

interface PortfolioContentProps {
  allProjects: Project[]
  croquisProjects: Project[]
}

const validCategoryValues = new Set(categories.map(c => c.value))

export function PortfolioContent({ allProjects, croquisProjects }: PortfolioContentProps) {
  const searchParams = useSearchParams()
  const raw = searchParams.get('category') || 'all'
  const categoryParam = validCategoryValues.has(raw) ? raw : 'all'
  const [activeCategory, setActiveCategory] = useState(categoryParam)

  useEffect(() => {
    setActiveCategory(categoryParam)
  }, [categoryParam])

  const filteredProjects = (() => {
    if (activeCategory === 'croquis') return croquisProjects
    if (activeCategory === 'all') return allProjects.filter(p => p.category !== 'croquis')
    return allProjects.filter(p => p.category === activeCategory)
  })()

  function handleFilter(category: string) {
    setActiveCategory(category)
    const params = new URLSearchParams(searchParams.toString())
    if (category === 'all') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    const query = params.toString()
    window.history.pushState(null, '', query ? `/portfolio?${query}` : '/portfolio')
  }

  return (
    <>
      <nav className="section-container py-3" aria-label="Breadcrumb">
        <div className="flex items-center text-sm text-gray-light">
          <Link href="/" className="hover:text-primary transition-colors">
            Inicio
          </Link>
          <span className="mx-2 text-primary">/</span>
          <span className="text-white">Portfolio</span>
        </div>
      </nav>

      {/* Filter */}
      <div className="flex justify-center py-8">
        <motion.div
          className="flex flex-wrap gap-0"
          variants={staggerContainerSlow}
          initial="hidden"
          animate="visible"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.value}
              variants={staggerItem}
              onClick={() => handleFilter(cat.value)}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-3 text-white md:text-lg font-normal transition-colors duration-300 ${
                activeCategory === cat.value
                  ? 'bg-gray-darker'
                  : 'bg-orange hover:bg-gray-darker'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Grid — min-height evita el brinco de layout al filtrar */}
      <div style={{ minHeight: '60vh' }}>
        <AnimatePresence mode="wait">
          <PortfolioGrid key={activeCategory} projects={filteredProjects} />
        </AnimatePresence>
      </div>
    </>
  )
}
