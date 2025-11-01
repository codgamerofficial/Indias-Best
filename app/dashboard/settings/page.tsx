'use client'

import { useState } from 'react'
import Header from '@/components/Header'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
      applicationUpdates: true,
      scholarshipAlerts: true,
      deadlineReminders: true
    },
    privacy: {
      profileVisibility: 'private',
      showEmail: false,
      showPhone: false,
      dataSharing: false
    },
    preferences: {
      theme: 'dark',
      language: 'en',
      currency: 'INR',
      timezone: 'Asia/Kolkata'
    }
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }))
  }

  const handlePrivacyChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value }
    }))
  }

  const handlePreferenceChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value }
    }))
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text slide-in mb-4">Settings</h1>
            <p className="text-text-muted-light dark:text-text-muted-dark fade-in">
              Customize your experience and privacy preferences
            </p>
          </div>

          <div className="space-y-8">
            {/* Notifications */}
            <div className="glass-effect rounded-xl p-6 slide-in">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="material-symbols-outlined text-blue-500 mr-3">notifications</span>
                Notifications
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Email Notifications</h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.email}
                      onChange={(e) => handleNotificationChange('email', e.target.checked)}
                      className="sr-only peer"
                      aria-label="Enable email notifications"
                      title="Enable email notifications"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-dark/20 dark:peer-focus:ring-primary-dark/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-dark"></div>
                  </label>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Application Updates</h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Get notified about application status changes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.applicationUpdates}
                      onChange={(e) => handleNotificationChange('applicationUpdates', e.target.checked)}
                      className="sr-only peer"
                      aria-label="Enable application updates notifications"
                      title="Enable application updates notifications"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-dark/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-dark"></div>
                  </label>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Scholarship Alerts</h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Receive alerts for new scholarships</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.scholarshipAlerts}
                      onChange={(e) => handleNotificationChange('scholarshipAlerts', e.target.checked)}
                      className="sr-only peer"
                      aria-label="Enable scholarship alerts"
                      title="Enable scholarship alerts"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-dark/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-dark"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div className="glass-effect rounded-xl p-6 slide-in" style={{animationDelay: '0.1s'}}>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="material-symbols-outlined text-green-500 mr-3">security</span>
                Privacy & Security
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Profile Visibility</label>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Show Email Address</h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Make your email visible to others</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy.showEmail}
                      onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                      className="sr-only peer"
                      aria-label="Show email address to others"
                      title="Show email address to others"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-dark/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-dark"></div>
                  </label>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Data Sharing</h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Allow anonymous usage analytics</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy.dataSharing}
                      onChange={(e) => handlePrivacyChange('dataSharing', e.target.checked)}
                      className="sr-only peer"
                      aria-label="Allow anonymous data sharing"
                      title="Allow anonymous data sharing"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-dark/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-dark"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="glass-effect rounded-xl p-6 slide-in" style={{animationDelay: '0.2s'}}>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="material-symbols-outlined text-purple-500 mr-3">tune</span>
                Preferences
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2">Theme</label>
                  <select
                    value={settings.preferences.theme}
                    onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-2">Language</label>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="bn">Bengali</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-2">Currency</label>
                  <select
                    value={settings.preferences.currency}
                    onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark"
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-2">Timezone</label>
                  <select
                    value={settings.preferences.timezone}
                    onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark"
                  >
                    <option value="Asia/Kolkata">India Standard Time</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="glass-effect rounded-xl p-6 slide-in" style={{animationDelay: '0.3s'}}>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="material-symbols-outlined text-red-500 mr-3">manage_accounts</span>
                Account Management
              </h2>
              
              <div className="space-y-4">
                <button className="w-full md:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all">
                  Change Password
                </button>
                <button className="w-full md:w-auto bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-all ml-0 md:ml-4">
                  Export Data
                </button>
                <button className="w-full md:w-auto bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all ml-0 md:ml-4">
                  Delete Account
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="bg-primary-dark text-black px-8 py-3 rounded-lg font-semibold hover:bg-primary transition-all duration-300 hover:scale-105 pulse-glow">
                Save All Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}