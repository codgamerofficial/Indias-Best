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

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<College[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate wishlist data - in real app, fetch from user's saved colleges
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    // Mock data - in real app, fetch user's saved colleges
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .limit(3)

    if (error) {
      console.error('Error:', error)
    } else {
      setWishlist(data || [])
    }
    setLoading(false)
  }

  const removeFromWishlist = (collegeId: string) => {
    setWishlist(wishlist.filter(college => college.id !== collegeId))
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <header className="p-4 md:p-6 border-b border-surface-light dark:border-surface-dark">
        <nav className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-xl md:text-2xl font-bold">
            India's <span className="text-primary-dark">Best</span>
          </a>
          <div className="flex items-center space-x-4">
            <a href="/dashboard" className="text-sm font-medium hover:text-primary-dark transition-colors">Dashboard</a>
            <a href="/auth/login" className="bg-surface-light dark:bg-surface-dark px-4 py-2 rounded-full text-sm font-semibold shadow-md">
              Login
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text slide-in mb-4">My Wishlist</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark fade-in">
            Colleges you've saved for later
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto"></div>
            <p className="mt-4 text-text-muted-light dark:text-text-muted-dark">Loading wishlist...</p>
          </div>
        ) : wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((college, index) => (
              <div key={college.id} className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-lg card-hover-glow slide-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{college.name}</h3>
                  <button
                    onClick={() => removeFromWishlist(college.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                </div>
                
                <p className="text-text-muted-light dark:text-text-muted-dark mb-2 flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                  {college.location}
                </p>
                
                <p className="text-sm mb-4 line-clamp-2">{college.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    college.type === 'government' 
                      ? 'bg-primary-dark text-black' 
                      : 'bg-secondary text-white'
                  }`}>
                    {college.type}
                  </span>
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                    <span className="ml-1 text-sm">{college.rating}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`/colleges/${college.id}`}
                    className="flex-1 bg-primary-dark text-black py-2 px-4 rounded-lg font-semibold hover:bg-primary transition-all text-center"
                  >
                    View Details
                  </a>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-all">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-text-muted-light dark:text-text-muted-dark mb-4">favorite_border</span>
            <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
              Start adding colleges you're interested in
            </p>
            <a href="/colleges" className="bg-primary-dark text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary transition-all">
              Browse Colleges
            </a>
          </div>
        )}
      </main>
    </div>
  )
}