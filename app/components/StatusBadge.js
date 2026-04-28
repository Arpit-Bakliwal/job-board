const STATUS_STYLES = {
    APPLIED:      'bg-blue-100 text-blue-700',
    SCREENING:    'bg-purple-100 text-purple-700',
    INTERVIEW:    'bg-yellow-100 text-yellow-700',
    OFFER:        'bg-green-100 text-green-700',
    REJECTED:     'bg-red-100 text-red-700',
    WITHDRAWN:    'bg-gray-100 text-gray-700',
}

export default function StatusBadge({ status }) {
    return (
        <span className={`
            px-2.5 py-1 rounded-full text-xs font-semibold
            ${STATUS_STYLES[status] || 'bg-gray-100 text-gray-700'}
        `}>
            {status}
        </span>
    )
}