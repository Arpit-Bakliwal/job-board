'use client'  // ← must be client — uses useState, useRouter

import { useState, useTransition } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const JOB_STATUSES = [
    'APPLIED', 'SCREENING', 'INTERVIEW',
    'OFFER', 'REJECTED', 'WITHDRAWN'
]

export default function JobSearch({ defaultSearch = '', defaultStatus = '' }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()

    const [search, setSearch] = useState(defaultSearch)
    const [status, setStatus] = useState(defaultStatus)

    // Update URL params — triggers server re-fetch
    const handleSearch = (newSearch, newStatus) => {
        const params = new URLSearchParams()
        if (newSearch) params.set('search', newSearch)
        if (newStatus) params.set('status', newStatus)

        // startTransition — marks navigation as non-urgent
        // loading.js shows while server fetches new results
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
        })
    }

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearch(value)

        // Debounce — wait 500ms before updating URL
        clearTimeout(window._searchTimeout)
        window._searchTimeout = setTimeout(() => {
            handleSearch(value, status)
        }, 500)
    }

    const handleStatusChange = (e) => {
        const value = e.target.value
        setStatus(value)
        handleSearch(search, value)
    }

    const handleClear = () => {
        setSearch('')
        setStatus('')
        router.push(pathname)
    }

    return (
        <div className="flex gap-3 flex-wrap">
            {/* Search input */}
            <div className="relative flex-1 min-w-[200px]">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search company or role..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {isPending && (
                    <div className="absolute right-3 top-2.5">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </div>

            {/* Status filter */}
            <select
                value={status}
                onChange={handleStatusChange}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Statuses</option>
                {JOB_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>

            {/* Clear button */}
            {(search || status) && (
                <button
                    onClick={handleClear}
                    className="px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Clear
                </button>
            )}
        </div>
    )
}