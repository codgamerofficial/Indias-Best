'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Scholarship {
  id: string
  title: string
  description: string
  amount: number
  eligibility: string
  deadline: string
  provider: string
}

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchScholarships()
  }, [])

  const fetchScholarships = async () => {
    const { data, error } = await supabase
      .from('scholarships')
      .select('*')
      .order('deadline', { ascending: true })

    if (error) {
      console.error('Error:', error)
    } else {
      setScholarships(data || [])
    }
    setLoading(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isDeadlineNear = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays > 0
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
            <a href="/auth/login" className="bg-surface-light dark:bg-surface-dark px-4 py-2 rounded-full text-sm font-semibold shadow-md">
              Login
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text slide-in">Available Scholarships</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark fade-in">
            Discover financial aid opportunities to support your education journey
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto"></div>
            <p className="mt-4 text-text-muted-light dark:text-text-muted-dark">Loading scholarships...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {scholarships.map((scholarship, index) => (
              <div key={scholarship.id} className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-lg card-hover-glow slide-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{scholarship.title}</h3>
                  {isDeadlineNear(scholarship.deadline) && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full animate-pulse">
                      Deadline Soon
                    </span>
                  )}
                </div>
                
                <p className="text-sm mb-4">{scholarship.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-green-500 text-sm mr-2">payments</span>
                    <span className="font-semibold">₹{scholarship.amount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="material-symbols-outlined text-blue-500 text-sm mr-2 mt-0.5">person</span>
                    <div>
                      <p className="text-sm font-semibold">Eligibility:</p>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{scholarship.eligibility}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-orange-500 text-sm mr-2">schedule</span>
                    <div>
                      <span className="text-sm font-semibold">Deadline: </span>
                      <span className="text-sm">{formatDate(scholarship.deadline)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-purple-500 text-sm mr-2">business</span>
                    <span className="text-sm">{scholarship.provider}</span>
                  </div>
                </div>
                
                <button className="w-full bg-primary-dark text-black py-2 rounded-lg font-semibold hover:bg-primary transition-all duration-300 hover:scale-105 pulse-glow">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && scholarships.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-text-muted-light dark:text-text-muted-dark mb-4">school</span>
            <h3 className="text-xl font-semibold mb-2">No scholarships available</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark">Check back later for new opportunities</p>
          </div>
        )}
      </main>
    </div>
  )
}