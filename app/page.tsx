import Navbar from "@/components/Navbar";
import IncidentPlayer from "@/components/IncidentPlayer";
import IncidentList from "@/components/IncidentList";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 flex gap-6">
        <div className="flex-1"><IncidentPlayer /></div>
        <div className="w-1/3"><IncidentList /></div>
      </main>
    </div>
  );
}
