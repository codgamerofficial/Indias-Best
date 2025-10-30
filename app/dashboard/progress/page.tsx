'use client'

import Header from '@/components/Header'

export default function ProgressPage() {
  const progressData = {
    applications: { completed: 3, total: 5 },
    scholarships: { completed: 2, total: 4 },
    documents: { completed: 8, total: 10 },
    interviews: { completed: 1, total: 2 }
  }

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100)
  }

  const milestones = [
    { title: 'Profile Setup', completed: true, date: '2024-01-10' },
    { title: 'First Application', completed: true, date: '2024-01-15' },
    { title: 'Document Upload', completed: true, date: '2024-01-18' },
    { title: 'Scholarship Application', completed: false, date: null },
    { title: 'Interview Preparation', completed: false, date: null }
  ]

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text slide-in mb-4">My Progress</h1>
            <p className="text-text-muted-light dark:text-text-muted-dark fade-in">
              Track your application journey and achievements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-effect rounded-xl p-6 slide-in">
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-3xl text-blue-500">description</span>
                <span className="text-2xl font-bold">{progressData.applications.completed}/{progressData.applications.total}</span>
              </div>
              <h3 className="font-bold mb-2">Applications</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage(progressData.applications.completed, progressData.applications.total)}%` }}
                ></div>
              </div>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-2">
                {getProgressPercentage(progressData.applications.completed, progressData.applications.total)}% Complete
              </p>
            </div>

            <div className="glass-effect rounded-xl p-6 slide-in" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-3xl text-green-500">payments</span>
                <span className="text-2xl font-bold">{progressData.scholarships.completed}/{progressData.scholarships.total}</span>
              </div>
              <h3 className="font-bold mb-2">Scholarships</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage(progressData.scholarships.completed, progressData.scholarships.total)}%` }}
                ></div>
              </div>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-2">
                {getProgressPercentage(progressData.scholarships.completed, progressData.scholarships.total)}% Complete
              </p>
            </div>

            <div className="glass-effect rounded-xl p-6 slide-in" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-3xl text-purple-500">folder</span>
                <span className="text-2xl font-bold">{progressData.documents.completed}/{progressData.documents.total}</span>
              </div>
              <h3 className="font-bold mb-2">Documents</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage(progressData.documents.completed, progressData.documents.total)}%` }}
                ></div>
              </div>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-2">
                {getProgressPercentage(progressData.documents.completed, progressData.documents.total)}% Complete
              </p>
            </div>

            <div className="glass-effect rounded-xl p-6 slide-in" style={{animationDelay: '0.3s'}}>
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-3xl text-orange-500">mic</span>
                <span className="text-2xl font-bold">{progressData.interviews.completed}/{progressData.interviews.total}</span>
              </div>
              <h3 className="font-bold mb-2">Interviews</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage(progressData.interviews.completed, progressData.interviews.total)}%` }}
                ></div>
              </div>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-2">
                {getProgressPercentage(progressData.interviews.completed, progressData.interviews.total)}% Complete
              </p>
            </div>
          </div>

          <div className="glass-effect rounded-xl p-8 slide-in" style={{animationDelay: '0.4s'}}>
            <h2 className="text-2xl font-bold mb-6">Journey Milestones</h2>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    milestone.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    {milestone.completed ? (
                      <span className="material-symbols-outlined text-white text-sm">check</span>
                    ) : (
                      <span className="w-3 h-3 bg-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${milestone.completed ? '' : 'text-text-muted-light dark:text-text-muted-dark'}`}>
                      {milestone.title}
                    </h3>
                    {milestone.date && (
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                        Completed on {new Date(milestone.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}