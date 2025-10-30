'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="glass-effect rounded-2xl p-8">
          <span className="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
          <h1 className="text-2xl font-bold gradient-text mb-4">Something went wrong!</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
            We encountered an unexpected error. Please try again.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="bg-primary-dark text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary transition-all"
            >
              Try Again
            </button>
            <a
              href="/"
              className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all text-center"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}