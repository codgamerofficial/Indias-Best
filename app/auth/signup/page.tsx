'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/auth/login'), 2000)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="glass-effect rounded-2xl p-8 slide-in">
            <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
            <h1 className="text-2xl font-bold gradient-text mb-2">Account Created!</h1>
            <p className="text-text-muted-light dark:text-text-muted-dark">
              Please check your email to verify your account.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="glass-effect rounded-2xl p-8 slide-in">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold gradient-text mb-2">Create Account</h1>
            <p className="text-text-muted-light dark:text-text-muted-dark">Join India's Best today</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark transition-all"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-500 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-dark text-black py-3 rounded-lg font-semibold hover:bg-primary transition-all duration-300 hover:scale-105 pulse-glow disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-muted-light dark:text-text-muted-dark">
              Already have an account?{' '}
              <a href="/auth/login" className="text-primary-dark hover:underline font-semibold">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}