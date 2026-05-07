import { Calendar, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export type EventCardProps = {
  title: string;
  date: string;
  time: string;
  format: string;
  className?: string;
};

export function EventCard({ title, date, time, format, className }: EventCardProps) {
  const isOnline = format.toLowerCase().includes('online');

  return (
    <div
      className={cn(
        'rounded-xl border border-[rgba(145,82,255,0.1)] bg-gradient-to-br from-white to-[#FAF8FF] px-4 py-4 shadow-sm',
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h4 className="font-lora text-[1rem] font-semibold text-[#1A1033]">{title}</h4>
        <span
          className={cn(
            'rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide',
            isOnline
              ? 'bg-amber-100 text-amber-900'
              : 'bg-[#F5F0FF] text-[#7339E0]'
          )}
        >
          {isOnline ? 'Online' : format}
        </span>
      </div>
      <div className="mt-3 space-y-1.5 text-[0.82rem] text-[#5C5275]">
        <p className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#9152FF]" aria-hidden />
          <span>{date}</span>
        </p>
        <p className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#9152FF]" aria-hidden />
          <span>{time}</span>
        </p>
        {!isOnline ? (
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#9152FF]" aria-hidden />
            <span>{format}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
