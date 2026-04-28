import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="text-center py-24 space-y-4">
            <p className="text-6xl font-bold text-gray-200">404</p>
            <h2 className="text-xl font-semibold text-gray-900">
                Page Not Found
            </h2>
            <p className="text-gray-500 text-sm">
                The page you're looking for doesn't exist.
            </p>
            <Link
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
                Go Home
            </Link>
        </div>
    )
};