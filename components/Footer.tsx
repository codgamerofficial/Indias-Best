export default function Footer() {
  return (
    <footer className="border-t border-surface-light dark:border-surface-dark mt-16 bg-surface-light dark:bg-surface-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              India's <span className="text-primary-dark">Best</span>
            </h3>
            <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
              Empowering students to find their perfect educational path across India.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <a href="/colleges" className="block text-text-muted-light dark:text-text-muted-dark hover:text-primary-dark transition-colors">Colleges</a>
              <a href="/scholarships" className="block text-text-muted-light dark:text-text-muted-dark hover:text-primary-dark transition-colors">Scholarships</a>
              <a href="/compare" className="block text-text-muted-light dark:text-text-muted-dark hover:text-primary-dark transition-colors">Compare</a>
              <a href="/search" className="block text-text-muted-light dark:text-text-muted-dark hover:text-primary-dark transition-colors">Search</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <div className="space-y-2 text-sm">
              <a href="/about" className="block text-text-muted-light dark:text-text-muted-dark hover:text-primary-dark transition-colors">About Us</a>
              <a href="/contact" className="block text-text-muted-light dark:text-text-muted-dark hover:text-primary-dark transition-colors">Contact</a>
              <a href="#" className="block text-text-muted-light dark:text-text-muted-dark hover:text-primary-dark transition-colors">Help Center</a>
              <a href="#" className="block text-text-muted-light dark:text-text-muted-dark hover:text-primary-dark transition-colors">Privacy Policy</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex space-x-3">
              <a href="#" className="text-text-muted-light dark:text-text-muted-dark hover:text-primary-dark transition-colors">
                <span className="material-symbols-outlined">facebook</span>
              </a>
              <a href="#" className="text-text-muted-light dark:text-text-muted-dark hover:text-primary-dark transition-colors">
                <span className="material-symbols-outlined">twitter</span>
              </a>
              <a href="#" className="text-text-muted-light dark:text-text-muted-dark hover:text-primary-dark transition-colors">
                <span className="material-symbols-outlined">instagram</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-300 dark:border-gray-600 mt-8 pt-6 text-center text-sm text-text-muted-light dark:text-text-muted-dark">
          © 2024 India's Best. All rights reserved.
        </div>
      </div>
    </footer>
  )
}