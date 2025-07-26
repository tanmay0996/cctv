import React from 'react';
import Navbar from '@/components/Navbar';
import IncidentPlayer from '@/components/IncidentPlayer';
import IncidentTimeline from '@/components/IncidentTimeline';
import IncidentList from '@/components/IncidentList';

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <main className="flex flex-col flex-1 gap-4 p-4 bg-black">
        {/* Top: exactly 33% of the viewport height, with internal scrolling */}
        <div className="flex lg:flex-row flex-col gap-4 h-[55vh] min-h-0">
          {/* Player: 65% width, fills full height */}
          <div className="basis-[65%] h-full overflow-hidden">
            <IncidentPlayer />
          </div>

          {/* List: 35% width, fills full height and scrolls internally */}
          <div className="basis-[35%] h-full overflow-y-auto min-h-0 scrollbar-hidden">
            <IncidentList />
          </div>
        </div>

        {/* Timeline: fixed 6 rem tall, never shrinks */}
        <div className="h-24 flex-shrink-0">
          <IncidentTimeline />
        </div>
      </main>
    </div>
  );
}
