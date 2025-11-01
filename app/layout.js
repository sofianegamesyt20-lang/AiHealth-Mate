import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'HealthMate AI - Understand Your Symptoms',
  description: 'AI-powered symptom analysis and health guidance',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
            <div className="flex items-center justify-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="HealthMate AI Logo"
                  width={240}
                  height={240}
                  priority
                  className="object-contain"
                />
              </Link>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}

