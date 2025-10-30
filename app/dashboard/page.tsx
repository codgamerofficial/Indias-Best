'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  full_name: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUser({
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || ''
        })
      }
    } catch (error) {
      console.error('Auth error:', error)
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center glass-effect rounded-2xl p-8">
          <h1 className="text-2xl font-bold gradient-text mb-4">Please Login</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
            You need to be logged in to access the dashboard.
          </p>
          <a href="/auth/login" className="bg-primary-dark text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary transition-all">
            Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
      <header className="p-4 md:p-6 border-b border-surface-light dark:border-surface-dark">
        <nav className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-xl md:text-2xl font-bold">
            India's <span className="text-primary-dark">Best</span>
          </a>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Welcome, {user?.full_name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text slide-in mb-4">Dashboard</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark fade-in">
            Manage your educational journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="glass-effect rounded-xl p-6 card-hover-glow slide-in">
            <span className="material-symbols-outlined text-4xl text-primary-dark mb-4">school</span>
            <h3 className="text-xl font-bold mb-2">My Applications</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
              Track your college applications
            </p>
            <a href="/dashboard/applications" className="bg-primary-dark text-black px-4 py-2 rounded-lg font-semibold hover:bg-primary transition-all">
              View Applications
            </a>
          </div>

          <div className="glass-effect rounded-xl p-6 card-hover-glow slide-in" style={{animationDelay: '0.1s'}}>
            <span className="material-symbols-outlined text-4xl text-green-500 mb-4">payments</span>
            <h3 className="text-xl font-bold mb-2">Scholarships</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
              Applied and saved scholarships
            </p>
            <a href="/dashboard/scholarships" className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all">
              View Scholarships
            </a>
          </div>

          <div className="glass-effect rounded-xl p-6 card-hover-glow slide-in" style={{animationDelay: '0.2s'}}>
            <span className="material-symbols-outlined text-4xl text-blue-500 mb-4">favorite</span>
            <h3 className="text-xl font-bold mb-2">Wishlist</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
              Your saved colleges and courses
            </p>
            <a href="/wishlist" className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all">
              View Wishlist
            </a>
          </div>

          <div className="glass-effect rounded-xl p-6 card-hover-glow slide-in" style={{animationDelay: '0.3s'}}>
            <span className="material-symbols-outlined text-4xl text-purple-500 mb-4">person</span>
            <h3 className="text-xl font-bold mb-2">Profile</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
              Update your personal information
            </p>
            <a href="/dashboard/profile" className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-all">
              Edit Profile
            </a>
          </div>

          <div className="glass-effect rounded-xl p-6 card-hover-glow slide-in" style={{animationDelay: '0.4s'}}>
            <span className="material-symbols-outlined text-4xl text-orange-500 mb-4">notifications</span>
            <h3 className="text-xl font-bold mb-2">Notifications</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
              Important updates and alerts
            </p>
            <a href="/dashboard/notifications" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all">
              View Notifications
            </a>
          </div>

          <div className="glass-effect rounded-xl p-6 card-hover-glow slide-in" style={{animationDelay: '0.5s'}}>
            <span className="material-symbols-outlined text-4xl text-red-500 mb-4">analytics</span>
            <h3 className="text-xl font-bold mb-2">Progress</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
              Track your application progress
            </p>
            <a href="/dashboard/progress" className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all">
              View Progress
            </a>
          </div>

          <div className="glass-effect rounded-xl p-6 card-hover-glow slide-in" style={{animationDelay: '0.6s'}}>
            <span className="material-symbols-outlined text-4xl text-gray-500 mb-4">settings</span>
            <h3 className="text-xl font-bold mb-2">Settings</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
              Customize your preferences
            </p>
            <a href="/dashboard/settings" className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-all">
              Manage Settings
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}