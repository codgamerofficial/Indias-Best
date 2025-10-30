export default function Loading() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-dark/20"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-dark border-t-transparent absolute top-0 left-0"></div>
        </div>
        <p className="mt-4 text-text-muted-light dark:text-text-muted-dark animate-pulse">Loading...</p>
      </div>
    </div>
  )
}