'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

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

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'government' | 'private'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchColleges()
  }, [typeFilter])

  const fetchColleges = async () => {
    setLoading(true)
    let query = supabase.from('colleges').select('*')
    
    if (typeFilter !== 'all') {
      query = query.eq('type', typeFilter)
    }
    
    const { data, error } = await query.order('rating', { ascending: false })
    
    if (error) {
      console.error('Error:', error)
    } else {
      setColleges(data || [])
    }
    setLoading(false)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    let query = supabase.from('colleges').select('*')
    
    if (searchTerm.trim()) {
      query = query.ilike('name', `%${searchTerm}%`)
    }
    
    if (typeFilter !== 'all') {
      query = query.eq('type', typeFilter)
    }
    
    const { data, error } = await query.order('rating', { ascending: false })
    
    if (error) {
      console.error('Error:', error)
    } else {
      setColleges(data || [])
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <header className="p-4 md:p-6 border-b border-surface-light dark:border-surface-dark">
        <nav className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-xl md:text-2xl font-bold">
            India's <span className="text-primary-dark">Best</span>
          </a>
          <div className="flex items-center space-x-4">
            <a href="/scholarships" className="text-sm font-medium hover:text-primary-dark transition-colors">Scholarships</a>
            <a href="/auth/login" className="bg-surface-light dark:bg-surface-dark px-4 py-2 rounded-full text-sm font-semibold shadow-md">
              Login
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text slide-in">Find Your Perfect College</h1>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6 glass-effect p-4 rounded-xl fade-in">
            <input
              type="search"
              placeholder="Search colleges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark"
            />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as 'all' | 'government' | 'private')}
              className="px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600"
            >
              <option value="all">All Types</option>
              <option value="government">Government</option>
              <option value="private">Private</option>
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105 pulse-glow"
            >
              Search
            </button>
          </form>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto"></div>
            <p className="mt-4 text-text-muted-light dark:text-text-muted-dark">Loading colleges...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college, index) => (
              <div key={college.id} className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-lg card-hover-glow slide-in" style={{animationDelay: `${index * 0.1}s`}}>
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
                
                <p className="text-sm mb-4 line-clamp-3">{college.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Courses:</p>
                  <div className="flex flex-wrap gap-1">
                    {college.courses.slice(0, 3).map((course, index) => (
                      <span key={index} className="px-2 py-1 bg-primary-dark/20 text-xs rounded-full">
                        {course}
                      </span>
                    ))}
                    {college.courses.length > 3 && (
                      <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded-full">
                        +{college.courses.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-110 ${
                    college.type === 'government' 
                      ? 'bg-primary-dark text-black' 
                      : 'bg-secondary text-white'
                  }`}>
                    {college.type}
                  </span>
                  <span className="text-lg font-bold">₹{college.fees.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && colleges.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-text-muted-light dark:text-text-muted-dark mb-4">school</span>
            <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark">Try adjusting your search criteria</p>
          </div>
        )}
      </main>
    </div>
  )
}