'use client'

import { useState } from 'react'
import Header from '@/components/Header'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: string
  read: boolean
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Application Status Update',
      message: 'Your application to IIT Delhi has been reviewed',
      type: 'info',
      timestamp: '2024-01-20T10:30:00Z',
      read: false
    },
    {
      id: '2',
      title: 'Scholarship Deadline Reminder',
      message: 'Merit Scholarship deadline is approaching in 5 days',
      type: 'warning',
      timestamp: '2024-01-19T14:15:00Z',
      read: false
    },
    {
      id: '3',
      title: 'Application Accepted',
      message: 'Congratulations! Your application to IIM Ahmedabad has been accepted',
      type: 'success',
      timestamp: '2024-01-18T09:00:00Z',
      read: true
    }
  ])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return 'check_circle'
      case 'warning': return 'warning'
      case 'error': return 'error'
      default: return 'info'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-500'
      case 'warning': return 'text-yellow-500'
      case 'error': return 'text-red-500'
      default: return 'text-blue-500'
    }
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text slide-in mb-4">Notifications</h1>
              <p className="text-text-muted-light dark:text-text-muted-dark fade-in">
                Stay updated with your applications and opportunities
              </p>
            </div>
            <button
              onClick={markAllAsRead}
              className="bg-primary-dark text-black px-4 py-2 rounded-lg font-semibold hover:bg-primary transition-all"
            >
              Mark All Read
            </button>
          </div>

          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`glass-effect rounded-xl p-6 slide-in cursor-pointer transition-all hover:scale-[1.02] ${
                  !notification.read ? 'border-l-4 border-primary-dark' : ''
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  <span className={`material-symbols-outlined text-2xl ${getTypeColor(notification.type)}`}>
                    {getTypeIcon(notification.type)}
                  </span>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold">{notification.title}</h3>
                      {!notification.read && (
                        <span className="w-3 h-3 bg-primary-dark rounded-full"></span>
                      )}
                    </div>
                    
                    <p className="text-text-muted-light dark:text-text-muted-dark mb-3">
                      {notification.message}
                    </p>
                    
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-text-muted-light dark:text-text-muted-dark mb-4">notifications_none</span>
              <h3 className="text-xl font-semibold mb-2">No notifications</h3>
              <p className="text-text-muted-light dark:text-text-muted-dark">
                You're all caught up! New notifications will appear here.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}