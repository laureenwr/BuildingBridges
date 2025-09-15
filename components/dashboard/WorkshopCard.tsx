'use client';

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

type Workshop = {
  id: number;
  title: string;
  description?: string | null;
  startsAt?: string | Date | null;
  location?: string | null;
  capacity?: number | null;
  meetingUrl?: string | null;
  materialsUrl?: string | null;
};

export function WorkshopCard({ w }: { w: Workshop }) {
  const dateStr = w.startsAt ? new Date(w.startsAt).toLocaleString('de-DE') : 'tba';
  return (
    <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-900">{w.title}</CardTitle>
        {w.description && (
          <p className="text-sm text-gray-600 line-clamp-3">{w.description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-gray-700">
        <div className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-purple-600" />{dateStr}</div>
        <div className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-purple-600" />{w.location || 'tba'}</div>
        <div className="flex gap-3 pt-2">
          {w.meetingUrl && (
            <Link href={w.meetingUrl} target="_blank" className="inline-flex items-center text-purple-600 hover:underline">
              <LinkIcon className="h-4 w-4 mr-1" /> Meeting
            </Link>
          )}
          {w.materialsUrl && (
            <Link href={w.materialsUrl} target="_blank" className="inline-flex items-center text-purple-600 hover:underline">
              <LinkIcon className="h-4 w-4 mr-1" /> Materialien
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


