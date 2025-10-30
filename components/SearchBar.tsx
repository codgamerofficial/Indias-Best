'use client'

import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export default function SearchBar({ onSearch, placeholder = "Search...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-dark transition-all"
      />
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">
        search
      </span>
    </form>
  )
}