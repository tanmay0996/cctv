import Navbar from '@/components/Navbar'
import IncidentPlayer from '@/components/IncidentPlayer'
import IncidentTimeline from '@/components/IncidentTimeline'
import IncidentList from '@/components/IncidentList'

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 flex lg:flex-row flex-col gap-6 p-6 bg-bg-dark">
        {/* Left: Player + Timeline */}
        <div className="flex-1 flex flex-col overflow-auto">
          <IncidentPlayer />
          <IncidentTimeline />
        </div>
        {/* Right: Incident List */}
        <div className="w-full lg:w-1/3 overflow-auto">
          <IncidentList />
        </div>
      </main>
    </div>
  )
}