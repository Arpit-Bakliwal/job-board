import Link from 'next/link'
import { notFound } from 'next/navigation'
import StatusBadge from '../../components/StatusBadge'

// ISR — revalidate every 5 minutes
export const revalidate = 300

// Generate Metadata dynamically 
// Next.js calls this to set page title/description per job
export async function generateMetadata({ params }) {
    const {id} = await params;
    const job = await getJob(id);

    if (!job) {
        return { title: 'Job Not Found' };
    }

    return {
        title: `${job.title} at ${job.company} — JobBoard`,
        description: `${job.title} position at ${job.company}${job.location ? ` in ${job.location}` : ''}`,
    };
}

// Data Fetching
async function getJob(id) {
    try {
        const res = await fetch(
            `${process.env.BACKEND_URL}/api/v1/jobs/public/${id}`,
            { next: { revalidate: 300 } }
        )

        if (!res.ok) return null

        const data = await res.json()
        return data.data || null

    } catch (error) {
        console.error('Failed to fetch job:', error)
        return null
    }
}

// Page Component
export default async function JobDetailPage({ params }) {
    const { id } = await params;
    const job = await getJob(id);

    // notFound() — shows Next.js 404 page
    if (!job) notFound();

    return (
        <div className="max-w-2xl mx-auto space-y-6">

            {/* Back button */}
            <Link
                href="/jobs"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
            >
                ← Back to Jobs
            </Link>

            {/* Job header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {job.title}
                        </h1>
                        <p className="text-blue-600 font-medium mt-1">
                            {job.company}
                        </p>
                    </div>
                    <StatusBadge status={job.status} />
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    {job.location && (
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">
                                Location
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                                📍 {job.location}
                            </p>
                        </div>
                    )}
                    {job.salary && (
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">
                                Salary
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                                💰 {job.salary}
                            </p>
                        </div>
                    )}
                    {job.appliedAt && (
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">
                                Applied
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                                📅 {new Date(job.appliedAt).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>
                    )}
                    {job.createdAt && (
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">
                                Posted
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                                🗓️ {new Date(job.createdAt).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>
                    )}
                </div>

                {/* Notes */}
                {job.notes && (
                    <div className="pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                            Notes
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {job.notes}
                        </p>
                    </div>
                )}

                {/* Apply button */}
                {job.jobUrl && (
                    <div className="pt-4 border-t border-gray-100">
                        <a
                            href={job.jobUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
                        >
                            Apply Now →
                        </a>
                    </div>
                )}
            </div>

            {/* Track CTA */}
            <div className="bg-blue-50 rounded-2xl p-6 text-center space-y-3">
                <h2 className="font-semibold text-gray-900">
                    Applied to this job?
                </h2>
                <p className="text-sm text-gray-500">
                    Track your application status with JobTracker
                </p>
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm"
                >
                    Start Tracking Free →
                </a>
            </div>

        </div>
    )
}