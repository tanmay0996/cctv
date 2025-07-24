"use client";
import { useEffect, useState } from "react";
import IncidentListHeader from "./IncidentListHeader";
import IncidentCard from "./IncidentCard";

type Camera = { name: string; location: string };
type Incident = {
  id: string;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  camera: Camera;
  resolved: boolean;
};

export default function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/incidents?resolved=false")
      .then((r) => r.json())
      .then((data: Incident[]) => {
        setIncidents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10 text-textSecondary">Loading…</div>;
  if (!incidents.length) return <div className="text-center py-10 text-textSecondary">No incidents.</div>;

  const unresolved = incidents.filter((i) => !i.resolved).length;
  // backend still stores resolved from seed, you can fetch resolved count if you like

  return (
    <div className="bg-surface rounded-lg p-4 flex flex-col h-full">
      <IncidentListHeader count={unresolved} resolvedCount={4 /*static or dynamic*/} />
      <div className="overflow-auto space-y-2">
        {incidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} onResolve={() => {}} />
        ))}
      </div>
    </div>
  );
}
