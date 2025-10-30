'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center glass-effect rounded-2xl p-8 slide-in">
          <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
          <h1 className="text-2xl font-bold gradient-text mb-2">Message Sent!</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark">We'll get back to you soon.</p>
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
            <a href="/about" className="text-sm font-medium hover:text-primary-dark transition-colors">About</a>
            <a href="/auth/login" className="bg-surface-light dark:bg-surface-dark px-4 py-2 rounded-full text-sm font-semibold shadow-md">
              Login
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text slide-in mb-4">Contact Us</h1>
            <p className="text-text-muted-light dark:text-text-muted-dark fade-in">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="glass-effect rounded-xl p-8 slide-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark transition-all resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-dark text-black py-3 rounded-lg font-semibold hover:bg-primary transition-all duration-300 hover:scale-105 pulse-glow"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center glass-effect rounded-xl p-6 slide-in" style={{animationDelay: '0.1s'}}>
              <span className="material-symbols-outlined text-3xl text-blue-500 mb-3">email</span>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark">support@indiasbest.com</p>
            </div>
            <div className="text-center glass-effect rounded-xl p-6 slide-in" style={{animationDelay: '0.2s'}}>
              <span className="material-symbols-outlined text-3xl text-green-500 mb-3">phone</span>
              <h3 className="font-bold mb-2">Phone</h3>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark">+91 98765 43210</p>
            </div>
            <div className="text-center glass-effect rounded-xl p-6 slide-in" style={{animationDelay: '0.3s'}}>
              <span className="material-symbols-outlined text-3xl text-purple-500 mb-3">schedule</span>
              <h3 className="font-bold mb-2">Hours</h3>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Mon-Fri 9AM-6PM</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}