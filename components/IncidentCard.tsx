import React from 'react'
import { ArrowRight, ShieldAlert, Lock, UserCheck2 } from 'lucide-react'

const TYPE_BADGES: Record<string, string> = {
  'Gun Threat':         'bg-red-900/20 text-red-400 border border-red-800/30',
  'Unauthorised Access':'bg-amber-900/20 text-amber-400 border border-amber-800/30',
  'Face Recognised':    'bg-blue-900/20 text-blue-400 border border-blue-800/30',
}

const TYPE_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'Gun Threat': ShieldAlert,
  'Unauthorised Access': Lock,
  'Face Recognised': UserCheck2,
}

// Placeholder URL from placehold.co
const PLACEHOLDER_URL = 'https://placehold.co/240x160/111111/777777/png?text=CCTV+Camera'

export default function IncidentCard({
  incident = {},
  onResolve = () => {},
  resolving,
}: {
  incident?: any
  onResolve?: (id: string) => void
  resolving?: boolean
}) {
  const { id, type, tsStart, tsEnd, thumbnailUrl, camera = {} } = incident
  const badge = TYPE_BADGES[type] ?? 'bg-gray-800/20 text-gray-400 border border-gray-700/30'
  const Icon = TYPE_ICONS[type]

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl bg-black shadow-sm border border-gray-800 hover:shadow-lg hover:border-gray-700 transition-all duration-300 ${
        resolving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Thumbnail Image Placeholder */}
      <img
  src={thumbnailUrl || PLACEHOLDER_URL}
  onError={(e) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = PLACEHOLDER_URL
  }}
  alt="CCTV footage"
  className="w-24 h-16 object-cover rounded-lg"
/>


      {/* Content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-gray-400" />}
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${badge}`}>
            {type}
          </span>
        </div>
        <div className="text-gray-100 font-semibold text-base">{camera.name || 'Unknown Camera'}</div>
        <div className="text-gray-400 text-sm">
          {tsStart && tsEnd ? (
            <>
              {new Date(tsStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} –{' '}
              {new Date(tsEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </>
          ) : (
            'Time not available'
          )}
        </div>
      </div>

      {/* Resolve Button */}
      <div className="flex-shrink-0">
        <button
          onClick={() => onResolve(id)}
          disabled={!id}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-medium text-sm rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95 disabled:hover:scale-100"
        >
          Resolve
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
