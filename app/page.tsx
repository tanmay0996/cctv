import Navbar from '@/components/Navbar'
import IncidentPlayer from '@/components/IncidentPlayer'
import IncidentList from '@/components/IncidentList'

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 flex gap-6 p-6 bg-bg-dark">
        <div className="flex-1 overflow-auto">
          <IncidentPlayer />
        </div>
        <div className="w-1/3 overflow-auto">
          <IncidentList />
        </div>
      </main>
    </div>
  )
}
