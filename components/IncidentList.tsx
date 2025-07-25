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

  useEffect(() => {
    fetch("/api/incidents") // fetch ALL incidents now
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
      setIncidents((prev) =>
        prev.map((i) => (i.id === id ? { ...i, resolved: true } : i))
      );
      setResolvingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 500); // match CSS transition-duration

    // 3) Fire‑and‑forget API call
    fetch(`/api/incidents/${id}/resolve`, { method: "PATCH" }).catch(() => {
      console.error("Failed to resolve incident", id);
    });
  };

  if (loading)
    return (
      <div className="text-center py-10 text-text-secondary">Loading…</div>
    );

  const unresolvedIncidents = incidents.filter((i) => !i.resolved);
  const resolvedIncidents = incidents.filter((i) => i.resolved);

  if (!unresolvedIncidents.length)
    return (
      <div className="text-center py-10 text-text-secondary">
        No incidents.
      </div>
    );

  return (
    <div className="bg-surface rounded-lg p-4 flex flex-col h-full">
      <IncidentListHeader
        count={unresolvedIncidents.length}
        resolvedCount={resolvedIncidents.length}
      />
      <div className="overflow-auto space-y-2">
        {unresolvedIncidents.map((incident) => (
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
