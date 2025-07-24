import { ArrowRightIcon, ShieldExclamationIcon, LockClosedIcon, UserCircleIcon } from '@heroicons/react/24/outline'

const TYPE_BADGES: Record<string, string> = {
  'Gun Threat':         'bg-badge-red/20 text-badge-red',
  'Unauthorised Access':'bg-badge-yellow/20 text-badge-yellow',
  'Face Recognised':    'bg-badge-blue/20 text-badge-blue',
}

const TYPE_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'Gun Threat':         ShieldExclamationIcon,
  'Unauthorised Access':LockClosedIcon,
  'Face Recognised':    UserCircleIcon,
}

export default function IncidentCard({
  incident,
  onResolve,
  resolving,
}: {
  incident: any
  onResolve: (id: string) => void
  resolving?: boolean
}) {
  const { id, type, tsStart, tsEnd, thumbnailUrl, camera } = incident
  const badge = TYPE_BADGES[type] || 'bg-text-secondary/20 text-text-secondary'
  const Icon = TYPE_ICONS[type]

  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-lg bg-bg-dark transition-opacity duration-500 ${
        resolving ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <img src={thumbnailUrl} className="w-24 h-16 object-cover rounded" />
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-current" />}
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badge}`}>
            {type}
          </span>
        </div>
        <div className="text-text-primary font-medium">{camera.name}</div>
        <div className="text-text-secondary text-sm">
          {new Date(tsStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} –
          {new Date(tsEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      <button
        onClick={() => onResolve(id)}
        className="flex items-center gap-1 text-gold font-semibold text-sm"
      >
        Resolve <ArrowRightIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
