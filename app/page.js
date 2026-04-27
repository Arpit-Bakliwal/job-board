export default function HomePage() {
    return (
        <div className="space-y-16">

            {/* Hero */}
            <section className="text-center py-16 space-y-6">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                    Find Your Next
                    <span className="text-blue-600"> Dream Job</span>
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                    Browse hundreds of opportunities from top companies.
                    Track your applications in one place.
                </p>
                <div className="flex gap-4 justify-center">
                    <a
                        href="/jobs"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                    >
                        Browse Jobs
                    </a>
                    <a
                        href="https://jobtracker-client.onrender.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3 rounded-xl transition-colors"
                    >
                        Track Applications
                    </a>
                </div>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-3 gap-6">
                {[
                    { label: 'Jobs Posted', value: '500+' },
                    { label: 'Companies', value: '100+' },
                    { label: 'Placements', value: '1000+' },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-2xl border border-gray-200 p-6 text-center"
                    >
                        <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                        <p className="text-gray-500 mt-1">{stat.label}</p>
                    </div>
                ))}
            </section>

            {/* Features */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 text-center">
                    Why JobBoard?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        {
                            icon: '🎯',
                            title: 'Curated Listings',
                            desc: 'Hand picked opportunities from top companies'
                        },
                        {
                            icon: '📊',
                            title: 'Track Applications',
                            desc: 'Never lose track of where you applied'
                        },
                        {
                            icon: '🤖',
                            title: 'AI Powered',
                            desc: 'Analyze job fit and improve your resume with AI'
                        },
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="bg-white rounded-2xl border border-gray-200 p-6 space-y-2"
                        >
                            <span className="text-3xl">{feature.icon}</span>
                            <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                            <p className="text-sm text-gray-500">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}