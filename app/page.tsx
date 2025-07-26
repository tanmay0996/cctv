"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import IncidentPlayer from "@/components/IncidentPlayer";
import IncidentTimeline from "@/components/IncidentTimeline";
import IncidentList from "@/components/IncidentList";

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />

      <main className="flex flex-col flex-1 gap-4 p-2 sm:p-4 bg-black">
        {/* Top section: column on mobile, row on md+ */}
        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[60vh] min-h-0">
          {/* Player (full-width mobile, 2/3 on md+) */}
          <div className="w-full md:w-2/3 h-64 md:h-full overflow-hidden rounded-lg">
            <IncidentPlayer />
          </div>

          {/* List (full-width mobile, 1/3 on md+) */}
          <div className="w-full md:w-1/3 h-64 md:h-full min-h-0 overflow-y-auto scrollbar-hidden rounded-lg">
            <IncidentList />
          </div>
        </div>

        {/* Timeline (auto height on mobile, fixed on md+) */}
        <div className="h-20 md:h-24 flex-shrink-0">
          <IncidentTimeline />
        </div>
      </main>
    </div>
  );
}
