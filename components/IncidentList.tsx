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
  const [resolvingIds, setResolvingIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Fetch unresolved incidents
  useEffect(() => {
    fetch("/api/incidents?resolved=false")
      .then((r) => r.json())
      .then((data: Incident[]) => {
        setIncidents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Handler for clicking “Resolve”
  const handleResolve = (id: string) => {
    // 1) Mark as resolving (triggers fade-out)
    setResolvingIds((prev) => new Set(prev).add(id));

    // 2) Wait for fade duration, then remove from list
    setTimeout(() => {
      setIncidents((prev) => prev.filter((i) => i.id !== id));
      setResolvingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 500); // match your CSS transition-duration

    // 3) Fire‑and‑forget API call
    fetch(`/api/incidents/${id}/resolve`, { method: "PATCH" }).catch(() => {
      // (optional) handle rollback or show error
      console.error("Failed to resolve incident", id);
    });
  };

  if (loading)
    return (
      <div className="text-center py-10 text-text-secondary">Loading…</div>
    );
  if (!incidents.length)
    return (
      <div className="text-center py-10 text-text-secondary">
        No incidents.
      </div>
    );

  const unresolved = incidents.length;

  return (
    <div className="bg-surface rounded-lg p-4 flex flex-col h-full">
      <IncidentListHeader count={unresolved} resolvedCount={4 /* or dynamic */} />
      <div className="overflow-auto space-y-2">
        {incidents.map((incident) => (
          <IncidentCard
            key={incident.id}
            incident={incident}
            onResolve={handleResolve}
            resolving={resolvingIds.has(incident.id)}
          />
        ))}
      </div>
    </div>
  );
}
