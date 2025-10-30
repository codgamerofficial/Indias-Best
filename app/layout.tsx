import './globals.css'
import AuthProvider from '@/components/AuthProvider'

export const metadata = {
  title: "India's Best | Find Your Future College",
  description: 'Find the perfect college or course in India. Your future starts here.',
  keywords: 'colleges, education, scholarships, India, university, courses, admission',
  authors: [{ name: "India's Best Team" }],

  manifest: '/manifest.json',
  robots: 'index, follow',
  openGraph: {
    title: "India's Best | Find Your Future College",
    description: 'Find the perfect college or course in India. Your future starts here.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: "India's Best | Find Your Future College",
    description: 'Find the perfect college or course in India. Your future starts here.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="font-display">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}