export default function IncidentPlayer() {
  return (
    <div className="bg-surface rounded-lg p-4 flex flex-col gap-4">
      {/* timestamp badge */}
      <div className="self-start bg-background px-2 py-1 text-xs rounded text-textSecondary">
        11/7/2025 — 03:12:37
      </div>

      {/* main video frame */}
      <div className="relative aspect-video bg-black rounded">
        <img
          src="/thumbnails/thumb1.jpeg"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* mini thumbnails */}
      <div className="flex gap-2">
        <img src="/thumbnails/thumb2.jpeg" className="w-1/2 h-24 object-cover rounded" />
        <img src="/thumbnails/thumb3.jpeg" className="w-1/2 h-24 object-cover rounded" />
      </div>
    </div>
  );
}
