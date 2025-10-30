export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-dark/20"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-dark border-t-transparent absolute top-0 left-0"></div>
      </div>
      <span className="ml-4 text-text-muted-light dark:text-text-muted-dark animate-pulse">Loading...</span>
    </div>
  )
}