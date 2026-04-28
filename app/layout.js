import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Job Board — Find Your Next Role',
    description: 'Browse the latest job opportunities',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* Navbar */}
                <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                    <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                        <a href="/" className="text-xl font-bold text-blue-600">
                            JobBoard
                        </a>
                        <div className="flex items-center gap-4">
                            <a
                                href="/jobs"
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                Browse Jobs
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                            >
                                Track Applications
                            </a>
                        </div>
                    </div>
                </nav>

                {/* Page content */}
                <main className="max-w-5xl mx-auto px-4 py-8">
                    {children}
                </main>

                {/* Footer */}
                <footer className="border-t border-gray-200 mt-12">
                    <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
                        © 2026 JobBoard. Built with Next.js.
                    </div>
                </footer>
            </body>
        </html>
    )
}