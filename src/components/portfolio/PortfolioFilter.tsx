'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { categories } from '@/lib/projects'

export function PortfolioFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  function handleFilter(category: string) {
    const params = new URLSearchParams(searchParams.toString())
    
    if (category === 'all') {
      params.delete('category')
    } else {
      params.set('category', category)
    }

    const query = params.toString()
    router.push(query ? `/portfolio?${query}` : '/portfolio')
  }

  return (
    <div className="flex justify-center py-8">
      <div className="flex flex-wrap gap-0">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleFilter(cat.value)}
            className={`px-4 py-3 text-base md:text-lg font-normal transition-all duration-400 ${
              activeCategory === cat.value
                ? 'bg-white text-orange'
                : 'bg-orange text-white hover:bg-white hover:text-orange'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  )
}