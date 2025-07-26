import React from 'react';

export default function IncidentPlayer() {
  return (
    <div className="bg-surface rounded p-2 space-y-1 relative max-h-[550px] h-full flex flex-col">
      {/* Top badge */}
      <div className="absolute top-1 left-1 bg-bg-dark/80 text-text-secondary text-xs px-1 py-0.5 rounded z-10">
        11/7/2025 — 03:12
      </div>

      {/* Video frame: fixed height */}
      <div className="relative w-full h-[100%] rounded overflow-hidden bg-black">
        <img src="/thumbnails/thumb1.jpeg" className="object-cover w-full h-full" />

        {/* Bottom‑right thumbnails - even tinier */}
        <div className="absolute bottom-1 right-1 flex space-x-1">
          <img
            src="/thumbnails/thumb2.jpeg"
            className="w-40 h-25 object-cover rounded-sm"
          />
          <img
            src="/thumbnails/thumb3.jpeg"
            className="w-40 h-25 object-cover rounded-sm"
          />
        </div>
      </div>

      {/* Controls bar */}
      {/* <div className="bg-bg-dark rounded px-2 py-1 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1">
          <button className="text-text-secondary hover:text-white text-xs">⏮️</button>
          <button className="text-white bg-gold px-1 py-0.5 rounded text-xs">▶️</button>
          <button className="text-text-secondary hover:text-white text-xs">⏭️</button>
          <button className="text-text-secondary hover:text-white text-xs">🔊</button>
        </div>
        <div className="flex items-center space-x-1 text-text-secondary text-xs">
          <span>Cam-01</span>
          <span>1x</span>
        </div>
      </div> */}
    </div>
  );
}
