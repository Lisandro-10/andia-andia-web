'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Project } from '@/types'
import { PortfolioGrid } from './PortfolioGrid'
import Link from 'next/link'

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
    if (activeCategory === 'croquis') {
      return croquisProjects
    }
    if (activeCategory === 'all') {
      return allProjects.filter(p => p.category !== 'croquis')
    }
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
        <div className="flex flex-wrap gap-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleFilter(cat.value)}
              className={`px-4 py-3 text-white md:text-lg font-normal transition-all duration-400 ${
                activeCategory === cat.value
                  ? 'bg-gray-darker'
                  : 'bg-orange hover:bg-gray-darker'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <PortfolioGrid projects={filteredProjects} />
    </>
  )
}
