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

export default function ComparePage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [selectedColleges, setSelectedColleges] = useState<College[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchColleges()
  }, [])

  const fetchColleges = async () => {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .order('rating', { ascending: false })

    if (error) {
      console.error('Error:', error)
    } else {
      setColleges(data || [])
    }
  }

  const addToComparison = (college: College) => {
    if (selectedColleges.length < 3 && !selectedColleges.find(c => c.id === college.id)) {
      setSelectedColleges([...selectedColleges, college])
    }
  }

  const removeFromComparison = (collegeId: string) => {
    setSelectedColleges(selectedColleges.filter(c => c.id !== collegeId))
  }

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedColleges.find(c => c.id === college.id)
  )

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
          <h1 className="text-3xl md:text-4xl font-bold gradient-text slide-in mb-4">Compare Colleges</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark fade-in">
            Select up to 3 colleges to compare side by side
          </p>
        </div>

        {selectedColleges.length > 0 && (
          <div className="mb-8 glass-effect rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Comparison ({selectedColleges.length}/3)</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="text-left p-3 border-b border-gray-300 dark:border-gray-600">Feature</th>
                    {selectedColleges.map(college => (
                      <th key={college.id} className="text-left p-3 border-b border-gray-300 dark:border-gray-600 min-w-[200px]">
                        <div className="flex justify-between items-center">
                          <span className="font-bold">{college.name}</span>
                          <button
                            onClick={() => removeFromComparison(college.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 font-semibold">Type</td>
                    {selectedColleges.map(college => (
                      <td key={college.id} className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          college.type === 'government' ? 'bg-primary-dark text-black' : 'bg-secondary text-white'
                        }`}>
                          {college.type}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-surface-light/50 dark:bg-surface-dark/50">
                    <td className="p-3 font-semibold">Location</td>
                    {selectedColleges.map(college => (
                      <td key={college.id} className="p-3">{college.location}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Rating</td>
                    {selectedColleges.map(college => (
                      <td key={college.id} className="p-3">
                        <div className="flex items-center">
                          <span className="material-symbols-outlined text-yellow-500 text-sm mr-1">star</span>
                          {college.rating}/5
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-surface-light/50 dark:bg-surface-dark/50">
                    <td className="p-3 font-semibold">Annual Fees</td>
                    {selectedColleges.map(college => (
                      <td key={college.id} className="p-3 font-bold text-primary-dark">₹{college.fees.toLocaleString()}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mb-6">
          <input
            type="search"
            placeholder="Search colleges to add..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.slice(0, 12).map((college, index) => (
            <div key={college.id} className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-lg card-hover-glow slide-in" style={{animationDelay: `${index * 0.1}s`}}>
              <h3 className="text-xl font-bold mb-2">{college.name}</h3>
              <p className="text-text-muted-light dark:text-text-muted-dark mb-2">{college.location}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">₹{college.fees.toLocaleString()}</span>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                  <span className="ml-1 text-sm">{college.rating}</span>
                </div>
              </div>
              <button
                onClick={() => addToComparison(college)}
                disabled={selectedColleges.length >= 3}
                className="w-full bg-primary-dark text-black py-2 rounded-lg font-semibold hover:bg-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedColleges.length >= 3 ? 'Max 3 colleges' : 'Add to Compare'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}