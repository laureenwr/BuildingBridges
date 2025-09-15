"use client";

import { useEffect, useState } from 'react';
import { WorkshopCard } from '@/components/dashboard/WorkshopCard';

async function fetchWorkshops() {
  try {
    const res = await fetch('/api/workshops', { cache: 'no-store' });
    if (!res.ok) return [] as any[];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [] as any[];
  }
}

export function MentorDashboard() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  useEffect(() => {
    fetchWorkshops().then(setWorkshops).catch(() => setWorkshops([]));
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Meine Workshops</h1>
      </div>
      {workshops.length === 0 ? (
        <div className="text-gray-600">Noch keine Workshops verfügbar.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workshops.map((w) => (
            <WorkshopCard key={w.id} w={w} />
          ))}
        </div>
      )}
    </div>
  );
}