export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
      <header className="p-4 md:p-6 border-b border-surface-light dark:border-surface-dark">
        <nav className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-xl md:text-2xl font-bold">
            India's <span className="text-primary-dark">Best</span>
          </a>
          <div className="flex items-center space-x-4">
            <a href="/colleges" className="text-sm font-medium hover:text-primary-dark transition-colors">Colleges</a>
            <a href="/scholarships" className="text-sm font-medium hover:text-primary-dark transition-colors">Scholarships</a>
            <a href="/auth/login" className="bg-surface-light dark:bg-surface-dark px-4 py-2 rounded-full text-sm font-semibold shadow-md">
              Login
            </a>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text slide-in mb-4">About India's Best</h1>
            <p className="text-xl text-text-muted-light dark:text-text-muted-dark fade-in">
              Empowering students to find their perfect educational path
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="glass-effect rounded-xl p-8 slide-in">
              <span className="material-symbols-outlined text-4xl text-primary-dark mb-4">school</span>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-text-muted-light dark:text-text-muted-dark">
                To democratize access to quality education by providing comprehensive information about colleges, 
                scholarships, and educational opportunities across India.
              </p>
            </div>

            <div className="glass-effect rounded-xl p-8 slide-in" style={{animationDelay: '0.1s'}}>
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">visibility</span>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-text-muted-light dark:text-text-muted-dark">
                To become India's most trusted platform for educational guidance, helping millions of students 
                make informed decisions about their future.
              </p>
            </div>
          </div>

          <div className="glass-effect rounded-xl p-8 mb-12 slide-in" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl font-bold gradient-text mb-6 text-center">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <span className="material-symbols-outlined text-3xl text-blue-500 mb-3">search</span>
                <h3 className="text-xl font-bold mb-2">Smart Search</h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Advanced search and filtering to find colleges that match your criteria
                </p>
              </div>
              <div className="text-center">
                <span className="material-symbols-outlined text-3xl text-green-500 mb-3">compare</span>
                <h3 className="text-xl font-bold mb-2">College Comparison</h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Side-by-side comparison of colleges to help you make the right choice
                </p>
              </div>
              <div className="text-center">
                <span className="material-symbols-outlined text-3xl text-purple-500 mb-3">payments</span>
                <h3 className="text-xl font-bold mb-2">Scholarship Database</h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Comprehensive database of scholarships and financial aid opportunities
                </p>
              </div>
            </div>
          </div>

          <div className="text-center glass-effect rounded-xl p-8 slide-in" style={{animationDelay: '0.3s'}}>
            <h2 className="text-3xl font-bold gradient-text mb-4">Join Thousands of Students</h2>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
              Start your educational journey with India's Best today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/auth/signup" className="bg-primary-dark text-black px-8 py-3 rounded-lg font-semibold hover:bg-primary transition-all duration-300 hover:scale-105 pulse-glow">
                Get Started
              </a>
              <a href="/colleges" className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all">
                Browse Colleges
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}