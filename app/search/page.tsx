'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useSearchParams } from 'next/navigation'

interface College {
  id: string
  name: string
  type: 'government' | 'private'
  location: string
  description: string
  rating: number
  fees: number
  courses: string[]
}

export default function SearchPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get('q') || ''
    const type = searchParams.get('type') || ''
    setSearchTerm(query)
    performSearch(query, type)
  }, [searchParams])

  const performSearch = async (query: string, type: string) => {
    setLoading(true)
    let supabaseQuery = supabase.from('colleges').select('*')

    if (query) {
      supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,location.ilike.%${query}%,description.ilike.%${query}%`)
    }

    if (type && (type === 'government' || type === 'private')) {
      supabaseQuery = supabaseQuery.eq('type', type)
    }

    const { data, error } = await supabaseQuery.order('rating', { ascending: false })

    if (error) {
      console.error('Error:', error)
    } else {
      setColleges(data || [])
    }
    setLoading(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const url = new URL(window.location.href)
    url.searchParams.set('q', searchTerm)
    window.history.pushState({}, '', url.toString())
    performSearch(searchTerm, searchParams.get('type') || '')
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <header className="p-4 md:p-6 border-b border-surface-light dark:border-surface-dark">
        <nav className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-xl md:text-2xl font-bold">
            India's <span className="text-primary-dark">Best</span>
          </a>
          <div className="flex items-center space-x-4">
            <a href="/colleges" className="text-sm font-medium hover:text-primary-dark transition-colors">Colleges</a>
            <a href="/scholarships" className="text-sm font-medium hover:text-primary-dark transition-colors">Scholarships</a>
            <a href="/auth/login" className="bg-surface-light dark:bg-surface-dark px-4 py-2 rounded-full text-sm font-semibold shadow-md">
              Login
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto glass-effect rounded-full p-2 fade-in">
            <div className="relative">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search colleges, courses, locations..."
                className="w-full pl-12 pr-28 py-4 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-transparent focus:ring-2 focus:ring-primary-dark transition-all"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
                search
              </span>
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105 pulse-glow"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold gradient-text mb-2">
            Search Results {searchParams.get('q') && `for "${searchParams.get('q')}"`}
          </h1>
          <p className="text-text-muted-light dark:text-text-muted-dark">
            {loading ? 'Searching...' : `Found ${colleges.length} colleges`}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto"></div>
            <p className="mt-4 text-text-muted-light dark:text-text-muted-dark">Searching colleges...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college, index) => (
              <a
                key={college.id}
                href={`/colleges/${college.id}`}
                className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-lg card-hover-glow slide-in block"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{college.name}</h3>
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                    <span className="ml-1 text-sm font-semibold">{college.rating}</span>
                  </div>
                </div>
                
                <p className="text-text-muted-light dark:text-text-muted-dark mb-2 flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                  {college.location}
                </p>
                
                <p className="text-sm mb-4 line-clamp-2">{college.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    college.type === 'government' 
                      ? 'bg-primary-dark text-black' 
                      : 'bg-secondary text-white'
                  }`}>
                    {college.type}
                  </span>
                  <span className="text-lg font-bold">₹{college.fees.toLocaleString()}</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {!loading && colleges.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-text-muted-light dark:text-text-muted-dark mb-4">search_off</span>
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
              Try different keywords or browse all colleges
            </p>
            <a href="/colleges" className="bg-primary-dark text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary transition-all">
              Browse All Colleges
            </a>
          </div>
        )}
      </main>
    </div>
  )
}