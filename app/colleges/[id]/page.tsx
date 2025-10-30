'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'

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

export default function CollegeDetailPage() {
  const [college, setCollege] = useState<College | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      fetchCollege(params.id as string)
    }
  }, [params.id])

  const fetchCollege = async (id: string) => {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error:', error)
    } else {
      setCollege(data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark"></div>
      </div>
    )
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">College not found</h1>
          <a href="/colleges" className="text-primary-dark hover:underline">Back to colleges</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <header className="p-4 md:p-6 border-b border-surface-light dark:border-surface-dark">
        <nav className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-xl md:text-2xl font-bold">
            India's <span className="text-primary-dark">Best</span>
          </a>
          <div className="flex items-center space-x-4">
            <a href="/colleges" className="text-sm font-medium hover:text-primary-dark transition-colors">Back to Colleges</a>
            <a href="/auth/login" className="bg-surface-light dark:bg-surface-dark px-4 py-2 rounded-full text-sm font-semibold shadow-md">
              Login
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl p-8 slide-in">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">{college.name}</h1>
                <p className="text-text-muted-light dark:text-text-muted-dark flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                  {college.location}
                </p>
              </div>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-yellow-500 mr-1">star</span>
                <span className="text-xl font-bold">{college.rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-text-muted-light dark:text-text-muted-dark mb-6">{college.description}</p>
                
                <h3 className="text-xl font-bold mb-4">Available Courses</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {college.courses.map((course, index) => (
                    <div key={index} className="bg-primary-dark/10 rounded-lg p-3 text-center">
                      <span className="font-semibold">{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Quick Info</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Type</span>
                      <div className="mt-1">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          college.type === 'government' 
                            ? 'bg-primary-dark text-black' 
                            : 'bg-secondary text-white'
                        }`}>
                          {college.type}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Annual Fees</span>
                      <p className="text-2xl font-bold text-primary-dark">₹{college.fees.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Rating</span>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`material-symbols-outlined text-sm ${
                            i < Math.floor(college.rating) ? 'text-yellow-500' : 'text-gray-300'
                          }`}>
                            star
                          </span>
                        ))}
                        <span className="ml-2 text-sm">({college.rating}/5)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-primary-dark text-black py-3 rounded-lg font-semibold hover:bg-primary transition-all duration-300 hover:scale-105 pulse-glow">
                    Apply Now
                  </button>
                  <a href="/wishlist" className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all text-center block">
                    Add to Wishlist
                  </a>
                  <a href="/compare" className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all text-center block">
                    Compare
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}