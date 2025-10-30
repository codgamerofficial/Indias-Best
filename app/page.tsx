'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchColleges()
  }, [])

  const fetchColleges = async () => {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .limit(6)

    if (error) {
      console.error('Error fetching colleges:', error)
    } else {
      setColleges(data || [])
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    
    window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`
  }

  return (
    <div className="relative min-h-screen overflow-hidden font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="absolute inset-0 hero-bg"></div>
      <div className="absolute inset-0 bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        <Header />
      </div>

      <main className="relative z-10">
        <section className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-tight mb-6 slide-in">
            <span className="gradient-text">Discover</span> Your Path to Success
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-text-muted-light dark:text-text-muted-dark mb-10 fade-in">
            Find the perfect college or course in India. Your future starts here.
          </p>
          
          <div className="max-w-2xl mx-auto mb-16 fade-in">
            <form className="relative glass-effect rounded-full p-2" onSubmit={handleSearch}>
              <input 
                className="w-full pl-12 pr-28 py-4 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-transparent focus:ring-2 focus:ring-primary-dark focus:border-primary-dark shadow-lg transition-all text-text-light dark:text-text-dark placeholder-text-muted-light dark:placeholder-text-muted-dark" 
                placeholder="Search for colleges, courses, or exams..."
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">search</span>
              </div>
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105 pulse-glow" 
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative col-span-1 md:col-span-2 p-8 rounded-xl bg-surface-light dark:bg-surface-dark shadow-xl overflow-hidden card-hover-glow slide-in">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary-dark/10 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex flex-col h-full">
                <span className="material-symbols-outlined text-4xl text-primary-dark mb-4">school</span>
                <h3 className="text-2xl font-bold mb-2 text-text-light dark:text-text-dark">Government Colleges</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark mb-6">Explore top-tier public institutions and secure your future with a government-backed education.</p>
                <a className="mt-auto inline-flex items-center font-semibold text-primary-dark hover:underline" href="/search?type=government">
                  Explore Now <span className="material-symbols-outlined ml-1">arrow_forward</span>
                </a>
              </div>
            </div>
            
            <div className="relative p-8 rounded-xl bg-surface-light dark:bg-surface-dark shadow-xl overflow-hidden card-hover-glow card-hover-glow-red slide-in">
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex flex-col h-full">
                <span className="material-symbols-outlined text-4xl text-secondary mb-4">business_center</span>
                <h3 className="text-2xl font-bold mb-2 text-text-light dark:text-text-dark">Private Colleges</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark mb-6">Discover premier private universities with cutting-edge facilities and diverse programs.</p>
                <a className="mt-auto inline-flex items-center font-semibold text-secondary hover:underline" href="/search?type=private">
                  View Listings <span className="material-symbols-outlined ml-1">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>

          {colleges.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Featured Colleges</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colleges.map((college, index) => (
                  <div key={college.id} className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-lg card-hover-glow slide-in" style={{animationDelay: `${index * 0.1}s`}}>
                    <h3 className="text-xl font-bold mb-2">{college.name}</h3>
                    <p className="text-text-muted-light dark:text-text-muted-dark mb-2">{college.location}</p>
                    <p className="text-sm mb-4">{college.description}</p>
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
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}