'use client'

import { useState } from 'react'
import Header from '@/components/Header'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    dateOfBirth: '2000-01-15',
    address: 'New Delhi, India',
    education: 'Class 12 - Science',
    interests: ['Computer Science', 'Engineering', 'Technology']
  })

  const [editing, setEditing] = useState(false)

  const handleSave = () => {
    setEditing(false)
    // Save to database
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text slide-in mb-4">My Profile</h1>
            <p className="text-text-muted-light dark:text-text-muted-dark fade-in">
              Manage your personal information
            </p>
          </div>

          <div className="glass-effect rounded-xl p-8 slide-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Personal Information</h2>
              <button
                onClick={() => editing ? handleSave() : setEditing(true)}
                className="bg-primary-dark text-black px-4 py-2 rounded-lg font-semibold hover:bg-primary transition-all"
              >
                {editing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    disabled={!editing}
                    className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 opacity-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    disabled={!editing}
                    className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                    disabled={!editing}
                    className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <textarea
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  disabled={!editing}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark transition-all disabled:opacity-50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Current Education</label>
                <input
                  type="text"
                  value={profile.education}
                  onChange={(e) => setProfile({...profile, education: e.target.value})}
                  disabled={!editing}
                  className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark transition-all disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Interests</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile.interests.map((interest, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-dark/20 rounded-full text-sm flex items-center gap-2">
                      {interest}
                      {editing && (
                        <button
                          onClick={() => {
                            const newInterests = profile.interests.filter((_, i) => i !== index)
                            setProfile({...profile, interests: newInterests})
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {editing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add new interest"
                      className="flex-1 px-3 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement
                          if (input.value.trim()) {
                            setProfile({...profile, interests: [...profile.interests, input.value.trim()]})
                            input.value = ''
                          }
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement
                        if (input.value.trim()) {
                          setProfile({...profile, interests: [...profile.interests, input.value.trim()]})
                          input.value = ''
                        }
                      }}
                      className="bg-primary-dark text-black px-3 py-2 rounded-lg text-sm font-semibold hover:bg-primary transition-all"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>

            {editing && (
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => window.location.href = '/dashboard/settings'}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                >
                  Account Settings
                </button>
              </div>
            )}

            {!editing && (
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => window.location.href = '/dashboard/settings'}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                >
                  Account Settings
                </button>
                <button
                  onClick={() => window.location.href = '/dashboard/notifications'}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all"
                >
                  Notifications
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}