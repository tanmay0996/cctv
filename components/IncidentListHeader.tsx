import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid'

export default function IncidentListHeader({
  count,
  resolvedCount,
}: {
  count: number
  resolvedCount: number
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="flex items-center gap-2 text-text-primary text-xl font-semibold">
        {/* “Unresolved” gets the warning/exclamation */}
        <ExclamationTriangleIcon className="h-6 w-6 text-badge-red" />
        {count} Unresolved
      </h2>
      <button className="flex items-center gap-1 bg-bg-dark px-3 py-1 rounded-full text-text-secondary text-xs hover:text-text-primary">
        {/* “Resolved” shows a check circle */}
        <CheckCircleIcon className="h-4 w-4 text-green-400" />
        <span className="text-gold"> {resolvedCount} Resolved</span>
      </button>
    </div>
  )
}
