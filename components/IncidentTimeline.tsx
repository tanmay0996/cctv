"use client";

import { useEffect, useState, useRef } from "react";
import { Camera, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

interface Incident {
  id: string;
  type: string;
  tsStart: string;
  tsEnd: string;
  camera: { name: string };
  resolved: boolean;
}

const PIXELS_PER_HOUR = 60;
const TOTAL_WIDTH = PIXELS_PER_HOUR * 24;
const HOURS = Array.from({ length: 25 }, (_, i) => i);

export default function IncidentTimeline() {
  console.log("⚡️ IncidentTimeline mounted");

  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [nowOffset, setNowOffset] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("03:12:37");
  const [currentDate] = useState("25-July-2025");
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const rulerRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("→ Fetching incidents...");
    // Mock data for demonstration
    const mockIncidents: Incident[] = [
      {
        id: "1",
        type: "Gun Threat",
        tsStart: "2025-06-15T02:30:00Z",
        tsEnd: "2025-06-15T02:45:00Z",
        camera: { name: "Camera-01" },
        resolved: false
      },
      {
        id: "2",
        type: "Unauthorised Access",
        tsStart: "2025-06-15T08:15:00Z",
        tsEnd: "2025-06-15T08:30:00Z",
        camera: { name: "Camera-02" },
        resolved: false
      },
      {
        id: "3",
        type: "Face Recognised",
        tsStart: "2025-06-15T14:20:00Z",
        tsEnd: "2025-06-15T14:25:00Z",
        camera: { name: "Camera-01" },
        resolved: true
      },
      {
        id: "4",
        type: "Traffic Congestion",
        tsStart: "2025-06-15T18:45:00Z",
        tsEnd: "2025-06-15T19:15:00Z",
        camera: { name: "Camera-03" },
        resolved: false
      }
    ];
    setIncidents(mockIncidents);

    const updateScrubber = () => {
      if (!isDragging) {
        const d = new Date();
        const mins = d.getHours() * 60 + d.getMinutes();
        const offset = (mins / 60) * PIXELS_PER_HOUR;
        setNowOffset(offset);
        console.log("🔸 Scrubber at minutes:", mins, "offset:", offset);
        
        const timeStr = d.toTimeString().slice(0, 8);
        setCurrentTime(timeStr);
      }
    };
    updateScrubber();
    const iv = setInterval(updateScrubber, 60_000);
    return () => clearInterval(iv);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!rulerRef.current || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const svgRect = rulerRef.current.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const clampedX = Math.max(0, Math.min(x, containerRect.width));
    
    setIsDragging(true);
    setDragOffset(clampedX);
    setNowOffset(clampedX);
    
    // Update time based on drag position
    const hours = (clampedX / containerRect.width) * 24;
    const totalMinutes = hours * 60;
    const h = Math.floor(totalMinutes / 60);
    const m = Math.floor(totalMinutes % 60);
    const s = Math.floor((totalMinutes % 1) * 60);
    setCurrentTime(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging || !rulerRef.current || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const svgRect = rulerRef.current.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const clampedX = Math.max(0, Math.min(x, containerRect.width));
    
    setDragOffset(clampedX);
    setNowOffset(clampedX);
    
    // Update time based on drag position
    const hours = (clampedX / containerRect.width) * 24;
    const totalMinutes = hours * 60;
    const h = Math.floor(totalMinutes / 60);
    const m = Math.floor(totalMinutes % 60);
    const s = Math.floor((totalMinutes % 1) * 60);
    setCurrentTime(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
  };

  const handleMouseUp = () => {
    if (!containerRef.current) return;
    
    setIsDragging(false);
    // Snap to nearest 5-minute mark
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const snapInterval = (5 / 60) * (containerWidth / 24); // 5 minutes in pixels
    const snappedOffset = Math.round(nowOffset / snapInterval) * snapInterval;
    setNowOffset(snappedOffset);
    setDragOffset(snappedOffset);
    
    // Update time to snapped position
    const hours = (snappedOffset / containerWidth) * 24;
    const totalMinutes = hours * 60;
    const h = Math.floor(totalMinutes / 60);
    const m = Math.floor(totalMinutes % 60);
    setCurrentTime(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:00`);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !rulerRef.current || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const svgRect = rulerRef.current.getBoundingClientRect();
      const x = e.clientX - svgRect.left;
      const clampedX = Math.max(0, Math.min(x, containerRect.width));
      
      setDragOffset(clampedX);
      setNowOffset(clampedX);
      
      const hours = (clampedX / containerRect.width) * 24;
      const totalMinutes = hours * 60;
      const h = Math.floor(totalMinutes / 60);
      const m = Math.floor(totalMinutes % 60);
      const s = Math.floor((totalMinutes % 1) * 60);
      setCurrentTime(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, nowOffset]);

  console.log("Rendering timeline with", incidents.length, "incidents");

  const getOffset = (iso: string, containerWidth: number) => {
    const d = new Date(iso);
    return ((d.getHours() * 60 + d.getMinutes()) / (24 * 60)) * containerWidth;
  };

  const cameras = Array.from(new Set(incidents.map(i => i.camera.name)));

  const getIncidentColor = (type: string) => {
    switch (type) {
      case "Gun Threat":
        return "bg-red-900/20 text-red-400 border border-red-800/30";
      case "Unauthorised Access":
        return "bg-amber-900/20 text-amber-400 border border-amber-800/30";
      case "Face Recognised":
        return "bg-blue-900/20 text-blue-400 border border-blue-800/30";
      case "Traffic Congestion":
        return "bg-emerald-900/20 text-emerald-400 border border-emerald-800/30";
      default:
        return "bg-gray-900/20 text-gray-400 border border-gray-800/30";
    }
  };

  // Function to get appropriate display text based on available width
  const getDisplayText = (type: string, availableWidth: number) => {
    // Always try to show full name on desktop, abbreviate only on mobile if needed
    const isMobile = window.innerWidth < 640;
    
    if (!isMobile) {
      // On desktop, always show full name
      return type;
    }
    
    // On mobile, check if we have enough space for full name
    const charWidth = 6;
    const maxChars = Math.floor((availableWidth - 16) / charWidth); // -16 for padding
    
    if (type.length <= maxChars) {
      return type;
    }
    
    // Mobile abbreviations only when really needed
    const abbreviations: Record<string, string> = {
      "Gun Threat": "Gun Threat",
      "Unauthorised Access": "Unauth Access",
      "Face Recognised": "Face Recog",
      "Traffic Congestion": "Traffic"
    };
    
    const abbrev = abbreviations[type] || type;
    return abbrev.length <= maxChars ? abbrev : type.substring(0, maxChars);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Video Controls Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 hover:bg-gray-800 rounded"
          >
            {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          <button className="p-2 hover:bg-gray-800 rounded">
            <SkipBack className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded">
            <SkipForward className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <div className="text-xs sm:text-sm font-mono">
            {currentTime}({currentDate})
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="text-xs sm:text-sm">1x</div>
          <button className="p-2 hover:bg-gray-800 rounded">
            <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* SVG Ruler */}
      <div className="bg-gray-900 border-b border-gray-700 overflow-hidden" ref={containerRef}>
        <div className="w-full relative">
          <svg
            ref={rulerRef}
            width="100%"
            height="60"
            className="cursor-pointer select-none w-full"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            viewBox={`0 0 ${TOTAL_WIDTH} 60`}
            preserveAspectRatio="none"
          >
            {/* Background */}
            <rect width={TOTAL_WIDTH} height="60" fill="#1f2937" />
            
            {/* Hour markers and labels */}
            {HOURS.map(h => (
              <g key={h}>
                {/* Major tick */}
                <line
                  x1={h * PIXELS_PER_HOUR}
                  y1="0"
                  x2={h * PIXELS_PER_HOUR}
                  y2="20"
                  stroke="#6b7280"
                  strokeWidth="1"
                />
                {/* Hour label */}
                <text
                  x={h * PIXELS_PER_HOUR}
                  y="35"
                  fill="#9ca3af"
                  fontSize="10"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {h.toString().padStart(2, "0")}:00
                </text>
                
                {/* 15-minute minor ticks */}
                {[15, 30, 45].map(min => (
                  <line
                    key={`${h}-${min}`}
                    x1={h * PIXELS_PER_HOUR + (min / 60) * PIXELS_PER_HOUR}
                    y1="0"
                    x2={h * PIXELS_PER_HOUR + (min / 60) * PIXELS_PER_HOUR}
                    y2="10"
                    stroke="#4b5563"
                    strokeWidth="1"
                  />
                ))}
              </g>
            ))}
            
            {/* Incident markers */}
            {incidents.map(inc => {
              const startOffset = getOffset(inc.tsStart, TOTAL_WIDTH);
              const endOffset = getOffset(inc.tsEnd, TOTAL_WIDTH);
              const width = Math.max(endOffset - startOffset, 8);
              
              let color = "#6b7280";
              switch (inc.type) {
                case "Gun Threat":
                  color = "#f87171";
                  break;
                case "Unauthorised Access":
                  color = "#fbbf24";
                  break;
                case "Face Recognised":
                  color = "#60a5fa";
                  break;
                case "Traffic Congestion":
                  color = "#34d399";
                  break;
              }
              
              return (
                <g key={inc.id}>
                  <rect
                    x={startOffset}
                    y="45"
                    width={width}
                    height="8"
                    fill={color}
                    opacity={inc.resolved ? 0.5 : 1}
                    rx="2"
                  />
                  <title>{`${inc.type} - ${inc.camera.name}`}</title>
                </g>
              );
            })}
            
            {/* Current time scrubber */}
            <g>
              <line
                x1={nowOffset * (TOTAL_WIDTH / (containerRef.current?.getBoundingClientRect().width || TOTAL_WIDTH))}
                y1="0"
                x2={nowOffset * (TOTAL_WIDTH / (containerRef.current?.getBoundingClientRect().width || TOTAL_WIDTH))}
                y2="60"
                stroke="#fbbf24"
                strokeWidth="2"
              />
              <polygon
                points={`${nowOffset * (TOTAL_WIDTH / (containerRef.current?.getBoundingClientRect().width || TOTAL_WIDTH))-4},0 ${nowOffset * (TOTAL_WIDTH / (containerRef.current?.getBoundingClientRect().width || TOTAL_WIDTH))+4},0 ${nowOffset * (TOTAL_WIDTH / (containerRef.current?.getBoundingClientRect().width || TOTAL_WIDTH))},8`}
                fill="#fbbf24"
              />
              <circle
                cx={nowOffset * (TOTAL_WIDTH / (containerRef.current?.getBoundingClientRect().width || TOTAL_WIDTH))}
                cy="30"
                r="6"
                fill="#fbbf24"
                stroke="#1f2937"
                strokeWidth="2"
                className="cursor-grab active:cursor-grabbing"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="border-l border-r border-b border-gray-700 bg-black">
        {/* Camera List Header */}
        <div className="px-4 py-3 border-b border-gray-700 bg-black">
          <h3 className="text-sm font-medium text-gray-300">Camera List</h3>
        </div>
        
        <div className="overflow-hidden">
          <div className="w-full">
            {/* Time Ruler */}
            <div className="relative h-12 border-b border-gray-700 bg-black">
              <div className="absolute top-0 left-0 w-24 sm:w-32 h-full bg-black border-r border-gray-700 z-10"></div>
              <div className="absolute top-0 left-24 sm:left-32 right-0 flex">
                {HOURS.map(h => (
                  <div key={h} className="relative flex-1 h-full border-r border-gray-600 last:border-r-0">
                    <div className="absolute top-0 left-0 h-3 border-l border-gray-500"></div>
                    <div className="absolute bottom-1 left-2 text-xs text-gray-400 font-mono">
                      {h.toString().padStart(2, "0")}:00
                    </div>
                  </div>
                ))}
              </div>
              {/* Current time scrubber */}
              <div
                className="absolute top-0 h-full border-l-2 border-yellow-400 z-20"
                style={{ left: `calc(${(24 + 8) / 16 * 100}% + ${(nowOffset / (containerRef.current?.getBoundingClientRect().width || 1)) * (100 - (24 + 8) / 16 * 100)}%)` }}
              >
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 rotate-45"></div>
              </div>
            </div>

            {/* Camera Rows */}
            {cameras.map((cam, index) => (
              <div key={cam} className="relative flex items-center h-20 sm:h-17 border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                <div className="w-24 sm:w-32 flex-shrink-0 px-2 sm:px-2.5 text-gray-200 font-medium flex items-center gap-1 sm:gap-2 border-r border-gray-700 bg-gray-900">
                  <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span className="text-xs sm:text-sm">Camera - {String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="relative flex-1 h-full">
                  {incidents.filter(i => i.camera.name === cam).map(inc => {
                    const containerWidth = containerRef.current?.getBoundingClientRect().width || 1;
                    const timelineWidth = containerWidth - (window.innerWidth < 640 ? 96 : 128);
                    const left = `${(getOffset(inc.tsStart, timelineWidth) / timelineWidth) * 100}%`;
                    const widthPercent = Math.max(((getOffset(inc.tsEnd, timelineWidth) - getOffset(inc.tsStart, timelineWidth)) / timelineWidth) * 100, 15);
                    const width = `${widthPercent}%`;
                    const colorClass = getIncidentColor(inc.type);
                    
                    // Calculate available width in pixels for text
                    const availableWidthPx = (widthPercent / 100) * timelineWidth;
                    const displayText = getDisplayText(inc.type, availableWidthPx);
                    
                    return (
                      <div
                        key={inc.id}
                        className={`absolute top-3 sm:top-4 h-14 sm:h-8 px-3 sm:px-4 flex items-center text-sm sm:text-base font-medium rounded-2xl shadow-sm ${colorClass} ${inc.resolved ? "opacity-60" : "opacity-100"} hover:opacity-80 transition-all cursor-pointer`}
                        style={{ left, width, minWidth: '120px' }}
                        title={`${inc.type} - ${inc.camera.name}`}
                      >
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis font-medium">
                          {displayText}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}