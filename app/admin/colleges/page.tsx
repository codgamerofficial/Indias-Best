'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'

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

export default function AdminCollegesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingCollege, setEditingCollege] = useState<College | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'government' as 'government' | 'private',
    location: '',
    description: '',
    rating: 0,
    fees: 0,
    courses: ''
  })

  useEffect(() => {
    fetchColleges()
  }, [])

  const fetchColleges = async () => {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setColleges(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const collegeData = {
      ...formData,
      courses: formData.courses.split(',').map(c => c.trim())
    }

    if (editingCollege) {
      const { error } = await supabase
        .from('colleges')
        .update(collegeData)
        .eq('id', editingCollege.id)
    } else {
      const { error } = await supabase
        .from('colleges')
        .insert([collegeData])
    }

    setShowForm(false)
    setEditingCollege(null)
    setFormData({ name: '', type: 'government', location: '', description: '', rating: 0, fees: 0, courses: '' })
    fetchColleges()
  }

  const handleEdit = (college: College) => {
    setEditingCollege(college)
    setFormData({
      name: college.name,
      type: college.type,
      location: college.location,
      description: college.description,
      rating: college.rating,
      fees: college.fees,
      courses: college.courses.join(', ')
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this college?')) {
      await supabase.from('colleges').delete().eq('id', id)
      fetchColleges()
    }
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Manage Colleges</h1>
            <p className="text-text-muted-light dark:text-text-muted-dark">
              Add, edit, and manage college listings
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary-dark text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary transition-all"
          >
            Add College
          </button>
        </div>

        {showForm && (
          <div className="glass-effect rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {editingCollege ? 'Edit College' : 'Add New College'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="College Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600"
                  required
                />
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as 'government' | 'private'})}
                  className="px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600"
                >
                  <option value="government">Government</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600"
                rows={3}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Rating (0-5)"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                  className="px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600"
                  min="0"
                  max="5"
                  step="0.1"
                />
                <input
                  type="number"
                  placeholder="Annual Fees"
                  value={formData.fees}
                  onChange={(e) => setFormData({...formData, fees: parseInt(e.target.value)})}
                  className="px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Courses (comma separated)"
                value={formData.courses}
                onChange={(e) => setFormData({...formData, courses: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600"
                required
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all"
                >
                  {editingCollege ? 'Update' : 'Add'} College
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingCollege(null)
                    setFormData({ name: '', type: 'government', location: '', description: '', rating: 0, fees: 0, courses: '' })
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {colleges.map((college) => (
            <div key={college.id} className="glass-effect rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{college.name}</h3>
                  <p className="text-text-muted-light dark:text-text-muted-dark">{college.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  college.type === 'government' ? 'bg-primary-dark text-black' : 'bg-secondary text-white'
                }`}>
                  {college.type}
                </span>
              </div>
              <p className="text-sm mb-4 line-clamp-2">{college.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">₹{college.fees.toLocaleString()}</span>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                  <span className="ml-1 text-sm">{college.rating}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(college)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(college.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}