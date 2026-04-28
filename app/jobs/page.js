import Link from 'next/link'
import StatusBadge from '../components/StatusBadge'
import JobSearch from '../components/JobSearch'

export const revalidate = 60

export const metadata = {
    title: 'Browse Jobs — JobBoard',
    description: 'Find your next opportunity',
}

async function getJobs(search = '', status = '') {
    const params = new URLSearchParams({
        limit: 20,
        page: 1,
        ...(search && { search }),
        ...(status && { status }),
    });

    // Artificial delay — remove after testing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const res = await fetch(
        `${process.env.BACKEND_URL}/api/v1/jobs/public?${params}`,
        { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error(`Failed: ${res.status}`);

    const data = await res.json();
    return data.data?.jobs || [];
}

// searchParams — from URL query string
export default async function JobsPage({ searchParams }) {
    const { search = '', status = '' } = await searchParams
    const jobs = await getJobs(search, status)

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Browse Jobs
                </h1>
                <p className="text-gray-500 mt-1">
                    {jobs.length} opportunities available
                </p>
            </div>

            {/* Search — Client Component */}
            <JobSearch
                defaultSearch={search}
                defaultStatus={status}
            />

            {/* Jobs list */}
            {jobs.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <p className="text-4xl mb-3">🔍</p>
                    <p>No jobs found. Try a different search.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {jobs.map((job) => (
                        <Link
                            key={job.id}
                            href={`/jobs/${job.id}`}
                            className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h2 className="text-base font-semibold text-gray-900">
                                            {job.title}
                                        </h2>
                                        <StatusBadge status={job.status} />
                                    </div>
                                    <p className="text-blue-600 font-medium text-sm mt-0.5">
                                        {job.company}
                                    </p>
                                    <div className="flex gap-4 mt-2 text-sm text-gray-500 flex-wrap">
                                        {job.location && <span>📍 {job.location}</span>}
                                        {job.salary && <span>💰 {job.salary}</span>}
                                        {job.appliedAt && (
                                            <span>
                                                📅 {new Date(job.appliedAt).toLocaleDateString('en-IN', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <span className="text-gray-300 text-xl shrink-0">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}