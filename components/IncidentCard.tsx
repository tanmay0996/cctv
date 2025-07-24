import { ChevronRight } from "lucide-react";

const TYPE_BADGES: Record<string, string> = {
  "Gun Threat":     "bg-danger/20 text-danger",
  "Unauthorised Access": "bg-warning/20 text-warning",
  "Face Recognised": "bg-info/20 text-info",
};

export default function IncidentCard({
  incident,
  onResolve,
}: {
  incident: any;
    onResolve: (id: string) => void;  
}) {
  const { id, type, tsStart, tsEnd, thumbnailUrl, camera } = incident;
  const badge = TYPE_BADGES[type] || "bg-textSecondary/20 text-textSecondary";

  return (
    <div className="flex items-center gap-3 bg-background/50 p-3 rounded hover:bg-background/30 transition">
      <img src={thumbnailUrl} className="w-20 h-16 object-cover rounded" />
      <div className="flex-1">
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${badge}`}>
          {type}
        </span>
        <div className="text-sm text-textPrimary mt-1">{camera.name}</div>
        <div className="text-xs text-textSecondary">
          {new Date(tsStart).toLocaleTimeString()} – {new Date(tsEnd).toLocaleTimeString()}
        </div>
      </div>
      <button
        onClick={() => onResolve(id)}
        className="flex items-center gap-1 text-accent text-sm font-medium"
      >
        Resolve <ChevronRight size={16} />
      </button>
    </div>
  );
}
