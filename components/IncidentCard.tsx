import React from 'react'
import { ArrowRight, ShieldAlert, Lock, UserCheck2, Camera, Clock } from 'lucide-react'

const TYPE_BADGES: Record<string, string> = {
  'Gun Threat':         'bg-red-900/30 text-red-300 border border-red-700/40',
  'Unauthorised Access':'bg-amber-900/30 text-amber-300 border border-amber-700/40',
  'Face Recognised':    'bg-emerald-900/30 text-emerald-300 border border-emerald-700/40',}

const TYPE_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'Gun Threat': ShieldAlert,
  'Unauthorised Access': Lock,
  'Face Recognised': UserCheck2,
}

// Placeholder URL from placehold.co
const PLACEHOLDER_URL = 'https://placehold.co/240x160/1E1E1E/D9D9D9/png?text=CCTV+Feed'

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
  const badge = TYPE_BADGES[type] ?? 'bg-[#D9D9D9] text-[#1C1917]'
  const Icon = TYPE_ICONS[type]

  const formatTime = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  return (
    <div
      className={`flex items-center gap-4 p-4 bg-[#1C1917] rounded-lg border border-[#1E1E1E] hover:border-[#FFCC00]/30 transition-all duration-300 ${
        resolving ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {/* Thumbnail Image */}
      <div className="flex-shrink-0">
        <img
          src={thumbnailUrl || PLACEHOLDER_URL}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = PLACEHOLDER_URL
          }}
          alt="CCTV footage"
          className="w-20 h-14 object-cover rounded"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 min-w-0">
        {/* Type Badge */}
        <div className="flex items-center gap-2 mb-2">
          {Icon && <Icon className="h-4 w-4 text-[#FFCC00]" />}
          <span className={`px-2 py-1 rounded text-xs font-semibold ${badge}`}>
            {type}
          </span>
        </div>

        {/* Camera Name */}
        <div className="flex items-center gap-2 mb-1">
          <Camera className="h-4 w-4 text-[#D9D9D9]" />
          <span className="text-[#FFFFFF] font-medium text-sm">
            {camera.name || 'Unknown Camera'}
          </span>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#D9D9D9]" />
          <span className="text-[#D9D9D9] text-sm">
            {tsStart && tsEnd ? (
              `${formatTime(tsStart)} - ${formatTime(tsEnd)} on ${formatDate(tsStart)}`
            ) : (
              'Time not available'
            )}
          </span>
        </div>
      </div>

      {/* Resolve Button */}
      <div className="flex-shrink-0">
        <button
          onClick={() => onResolve(id)}
          disabled={!id}
          className="flex items-center gap-2 px-4 py-2 bg-[#FFCC00] hover:bg-[#FFCC00]/90 disabled:bg-[#D9D9D9] disabled:cursor-not-allowed text-[#1C1917] font-semibold text-sm rounded transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100"
        >
          Resolve
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}