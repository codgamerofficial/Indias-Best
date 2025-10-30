'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'

interface Application {
  id: string
  collegeName: string
  course: string
  status: 'pending' | 'accepted' | 'rejected' | 'waitlisted'
  appliedDate: string
  deadline: string
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      collegeName: 'IIT Delhi',
      course: 'Computer Science',
      status: 'pending',
      appliedDate: '2024-01-15',
      deadline: '2024-03-30'
    },
    {
      id: '2',
      collegeName: 'IIM Ahmedabad',
      course: 'MBA',
      status: 'accepted',
      appliedDate: '2024-01-10',
      deadline: '2024-02-28'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-500'
      case 'rejected': return 'bg-red-500'
      case 'waitlisted': return 'bg-yellow-500'
      default: return 'bg-blue-500'
    }
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text slide-in mb-4">My Applications</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark fade-in">
            Track your college application status
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {applications.map((app, index) => (
            <div key={app.id} className="glass-effect rounded-xl p-6 slide-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{app.collegeName}</h3>
                  <p className="text-text-muted-light dark:text-text-muted-dark">{app.course}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Applied:</span>
                  <span className="text-sm">{new Date(app.appliedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Deadline:</span>
                  <span className="text-sm">{new Date(app.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-primary-dark text-black py-2 rounded-lg font-semibold hover:bg-primary transition-all">
                  View Details
                </button>
                <button className="bg-secondary text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-all">
                  Withdraw
                </button>
              </div>
            </div>
          ))}
        </div>

        {applications.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-text-muted-light dark:text-text-muted-dark mb-4">description</span>
            <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
              Start applying to colleges to track your progress here
            </p>
            <a href="/colleges" className="bg-primary-dark text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary transition-all">
              Browse Colleges
            </a>
          </div>
        )}
      </main>
    </div>
  )
}