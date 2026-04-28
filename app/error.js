'use client'  // ← Error components MUST be client components
              // because they use onClick and browser APIs

import { useEffect } from 'react'

export default function JobsError({ error, reset }) {
    useEffect(() => {
        // Log error to monitoring service
        console.error('Jobs page error:', error)
    }, [error])

    return (
        <div className="text-center py-16 space-y-4">
            <p className="text-5xl">⚠️</p>
            <h2 className="text-xl font-semibold text-gray-900">
                Something went wrong
            </h2>
            <p className="text-gray-500 text-sm">
                Failed to load jobs. Please try again.
            </p>
            <button
                onClick={reset}  // reset() — retries the failed component
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
                Try Again
            </button>
        </div>
    )
}