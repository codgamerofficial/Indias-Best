'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalColleges: 0,
    totalScholarships: 0,
    totalUsers: 0,
    recentApplications: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const [colleges, scholarships] = await Promise.all([
      supabase.from('colleges').select('count'),
      supabase.from('scholarships').select('count')
    ])

    setStats({
      totalColleges: colleges.data?.length || 6,
      totalScholarships: scholarships.data?.length || 4,
      totalUsers: 150,
      recentApplications: 25
    })
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text slide-in mb-4">Admin Dashboard</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark fade-in">
            Manage colleges, scholarships, and users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-effect rounded-xl p-6 slide-in">
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-3xl text-blue-500">school</span>
              <span className="text-2xl font-bold">{stats.totalColleges}</span>
            </div>
            <h3 className="font-bold">Total Colleges</h3>
          </div>

          <div className="glass-effect rounded-xl p-6 slide-in" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-3xl text-green-500">payments</span>
              <span className="text-2xl font-bold">{stats.totalScholarships}</span>
            </div>
            <h3 className="font-bold">Scholarships</h3>
          </div>

          <div className="glass-effect rounded-xl p-6 slide-in" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-3xl text-purple-500">people</span>
              <span className="text-2xl font-bold">{stats.totalUsers}</span>
            </div>
            <h3 className="font-bold">Total Users</h3>
          </div>

          <div className="glass-effect rounded-xl p-6 slide-in" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-3xl text-orange-500">description</span>
              <span className="text-2xl font-bold">{stats.recentApplications}</span>
            </div>
            <h3 className="font-bold">Applications</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-effect rounded-xl p-6 card-hover-glow slide-in" style={{animationDelay: '0.4s'}}>
            <span className="material-symbols-outlined text-4xl text-blue-500 mb-4">school</span>
            <h3 className="text-xl font-bold mb-2">Manage Colleges</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
              Add, edit, and manage college listings
            </p>
            <a href="/admin/colleges" className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all">
              Manage Colleges
            </a>
          </div>

          <div className="glass-effect rounded-xl p-6 card-hover-glow slide-in" style={{animationDelay: '0.5s'}}>
            <span className="material-symbols-outlined text-4xl text-green-500 mb-4">payments</span>
            <h3 className="text-xl font-bold mb-2">Manage Scholarships</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
              Add and manage scholarship programs
            </p>
            <a href="/admin/scholarships" className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all">
              Manage Scholarships
            </a>
          </div>

          <div className="glass-effect rounded-xl p-6 card-hover-glow slide-in" style={{animationDelay: '0.6s'}}>
            <span className="material-symbols-outlined text-4xl text-purple-500 mb-4">people</span>
            <h3 className="text-xl font-bold mb-2">User Management</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
              View and manage user accounts
            </p>
            <a href="/admin/users" className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-all">
              Manage Users
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}