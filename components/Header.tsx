'use client'

import { useAuth } from './AuthProvider'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  showNav?: boolean
}

export default function Header({ showNav = true }: HeaderProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <header className="p-4 md:p-6 border-b border-surface-light dark:border-surface-dark">
      <nav className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl md:text-2xl font-bold">
          India's <span className="text-primary-dark">Best</span>
        </a>
        
        {showNav && (
          <div className="flex items-center space-x-4">
            <a href="/colleges" className="hidden md:inline text-sm font-medium hover:text-primary-dark transition-colors">
              Colleges
            </a>
            <a href="/scholarships" className="hidden md:inline text-sm font-medium hover:text-primary-dark transition-colors">
              Scholarships
            </a>
            <a href="/compare" className="hidden md:inline text-sm font-medium hover:text-primary-dark transition-colors">
              Compare
            </a>
            
            {!loading && (
              user ? (
                <div className="flex items-center space-x-3">
                  <a href="/dashboard" className="text-sm font-medium hover:text-primary-dark transition-colors">
                    Dashboard
                  </a>
                  <button
                    onClick={handleLogout}
                    className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <a href="/auth/login" className="text-sm font-medium hover:text-primary-dark transition-colors">
                    Login
                  </a>
                  <a href="/auth/signup" className="bg-primary-dark text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary transition-colors">
                    Sign Up
                  </a>
                </div>
              )
            )}
          </div>
        )}
      </nav>
    </header>
  )
}