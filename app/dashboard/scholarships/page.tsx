'use client'

import { useState } from 'react'
import Header from '@/components/Header'

interface ScholarshipApplication {
  id: string
  title: string
  amount: number
  status: 'applied' | 'approved' | 'rejected' | 'pending'
  appliedDate: string
  deadline: string
  provider: string
}

export default function DashboardScholarshipsPage() {
  const [applications, setApplications] = useState<ScholarshipApplication[]>([
    {
      id: '1',
      title: 'Merit Scholarship for Engineering',
      amount: 100000,
      status: 'approved',
      appliedDate: '2024-01-10',
      deadline: '2024-06-30',
      provider: 'Government of India'
    },
    {
      id: '2',
      title: 'Women in STEM Scholarship',
      amount: 75000,
      status: 'pending',
      appliedDate: '2024-01-15',
      deadline: '2024-07-15',
      provider: 'Tech Foundation'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500'
      case 'rejected': return 'bg-red-500'
      case 'pending': return 'bg-yellow-500'
      default: return 'bg-blue-500'
    }
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text slide-in mb-4">My Scholarships</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark fade-in">
            Track your scholarship applications and awards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {applications.map((app, index) => (
            <div key={app.id} className="glass-effect rounded-xl p-6 slide-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{app.title}</h3>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-sm">{app.provider}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="material-symbols-outlined text-green-500 text-sm mr-2">payments</span>
                  <span className="text-lg font-bold">₹{app.amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted-light dark:text-text-muted-dark">Applied:</span>
                  <span>{new Date(app.appliedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted-light dark:text-text-muted-dark">Deadline:</span>
                  <span>{new Date(app.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-primary-dark text-black py-2 rounded-lg font-semibold hover:bg-primary transition-all">
                  View Details
                </button>
                {app.status === 'approved' && (
                  <button className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition-all">
                    Download Award
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/scholarships"
            className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all"
          >
            Browse More Scholarships
          </a>
        </div>

        {applications.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-text-muted-light dark:text-text-muted-dark mb-4">payments</span>
            <h3 className="text-xl font-semibold mb-2">No scholarship applications</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
              Start applying for scholarships to fund your education
            </p>
            <a href="/scholarships" className="bg-primary-dark text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary transition-all">
              Browse Scholarships
            </a>
          </div>
        )}
      </main>
    </div>
  )
}