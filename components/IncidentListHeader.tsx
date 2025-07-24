import { AlertCircle } from "lucide-react"
export default function IncidentListHeader({ count, resolvedCount }: { count: number; resolvedCount: number }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <AlertCircle size={20} className="text-danger" />
        {count} Unresolved Incidents
      </h2>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 bg-accent/10 text-accent text-xs px-2 py-1 rounded">
          + {resolvedCount} Resolved Incidents
        </button>
      </div>
    </div>
  );
}
