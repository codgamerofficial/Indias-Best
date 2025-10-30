export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center px-4 font-display">
      <div className="text-center max-w-md">
        <div className="glass-effect rounded-2xl p-8 slide-in">
          <span className="material-symbols-outlined text-8xl text-primary-dark mb-4">search_off</span>
          <h1 className="text-4xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="bg-primary-dark text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary transition-all text-center"
            >
              Go Home
            </a>
            <a
              href="/colleges"
              className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all text-center"
            >
              Browse Colleges
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}