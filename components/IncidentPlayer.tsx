export default function IncidentPlayer() {
  return (
    <div className="bg-surface rounded-2xl p-4 space-y-4 relative">
      {/* Top badge */}
      <div className="absolute mt-2 ml-2 bg-bg-dark/80 text-text-secondary text-xs px-2 py-1 rounded">
        11/7/2025 — 03:12:37
      </div>

      {/* Video frame */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
        <img src="/thumbnails/thumb1.jpeg" className="object-cover w-full h-full" />

        {/* Bottom‑right thumbnails */}
        <div className="absolute bottom-2 right-2 flex space-x-2">
          <img
            src="/thumbnails/thumb2.jpeg"
            className="w-40 h-20 object-cover rounded"
          />
          <img
            src="/thumbnails/thumb3.jpeg"
            className="w-40 h-20 object-cover rounded"
          />
        </div>
      </div>

      {/* Controls bar */}
      <div className="bg-bg-dark rounded-lg p-2 flex items-center space-x-4">
        <button className="text-text-secondary hover:text-white">⏮️</button>
        <button className="text-text-secondary hover:text-white">🔊</button>
        <button className="text-white bg-gold p-2 rounded-full">▶️</button>
        <button className="text-text-secondary hover:text-white">⏭️</button>
        <span className="text-text-secondary text-xs">03:12:37 (15‑Jun‑2025)</span>
        <span className="ml-auto text-text-secondary text-xs">1x</span>
        <button className="text-text-secondary hover:text-white">⏳</button>
      </div>
    </div>
)
}
