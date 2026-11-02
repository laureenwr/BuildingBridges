'use client';

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { cn } from '@/lib/utils';

type PhaseStatus = 'done' | 'current' | 'upcoming';

const PHASES = [
  { startMonth: 0, endMonth: 12 },
  { startMonth: 12, endMonth: 24 },
  { startMonth: 24, endMonth: 36 },
] as const;

function projectMonthProgress(now = new Date()) {
  return (now.getFullYear() - 2024) * 12 + (now.getMonth() - 8) + (now.getDate() - 1) / 30;
}

function phaseStatus(month: number, startMonth: number, endMonth: number): PhaseStatus {
  if (month >= endMonth) return 'done';
  if (month < startMonth) return 'upcoming';
  return 'current';
}

function centerY(el: HTMLElement, root: HTMLElement) {
  const elBox = el.getBoundingClientRect();
  const rootBox = root.getBoundingClientRect();
  return elBox.top - rootBox.top + elBox.height / 2;
}

export function LandingProjectProgress() {
  const { isDe } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState<number | null>(null);
  const [marker, setMarker] = useState({ top: 0, visible: false });

  const month = useMemo(() => projectMonthProgress(), []);

  const copy = {
    title: isDe ? 'Projektverlauf' : 'Project timeline',
    lead: isDe
      ? 'Building Bridges läuft 36 Monate von September 2024 bis August 2027.'
      : 'Building Bridges runs for 36 months from September 2024 to August 2027',
    today: isDe ? 'Heute' : 'Today',
    done: isDe ? 'Abgeschlossen' : 'Done',
    upcoming: isDe ? 'Demnächst' : 'Coming up',
    here: (n: number) =>
      isDe ? `Wir sind hier · Monat ${n} von 12` : `We are here · Month ${n} of 12`,
    phases: [
      {
        phase: isDe ? 'Phase 1' : 'Phase 1',
        period: isDe ? 'Sep. 2024 – Aug. 2025' : 'Sep 2024 - Aug 2025',
        heading: isDe ? 'Projektstart und MEP-Entwicklung' : 'Project launch & MEP development',
        body: isDe
          ? 'Entwicklung des Mentoring-Programms und erste Teilnehmenden-Kohorte'
          : 'Development of the mentoring program and first participant cohort',
      },
      {
        phase: isDe ? 'Phase 2' : 'Phase 2',
        heading: isDe ? 'Volle Umsetzung und Forschung' : 'Full implementation & research',
        period: isDe ? 'Sep. 2025 – Aug. 2026' : 'Sep 2025 - Aug 2026',
        body: isDe
          ? 'Vollständige Durchführung aller Programme und intensive Datenerhebung'
          : 'Full delivery of all programs and intensive data collection',
      },
      {
        phase: isDe ? 'Phase 3' : 'Phase 3',
        period: isDe ? 'Sep. 2026 – Aug. 2027' : 'Sep 2026 - Aug 2027',
        heading: isDe ? 'Evaluation und Nachhaltigkeit' : 'Evaluation & sustainability',
        body: isDe
          ? 'Projektevaluation, Verbreitung und Nachhaltigkeitsstrategie'
          : 'Project evaluation, dissemination, and sustainability strategy',
      },
    ],
  };

  const rows = copy.phases.map((phase, index) => {
    const status = phaseStatus(month, PHASES[index].startMonth, PHASES[index].endMonth);
    const pill =
      status === 'done'
        ? copy.done
        : status === 'current'
          ? copy.here(Math.floor(month - PHASES[index].startMonth) + 1)
          : copy.upcoming;
    return { ...phase, status, pill };
  });

  const currentIndex = rows.findIndex((row) => row.status === 'current');

  const layout = useCallback(() => {
    const root = timelineRef.current;
    if (!root) return;

    const height = root.offsetHeight;
    const ys = rows.map((_, index) => {
      const row = rowRefs.current[index];
      const dot = row?.querySelector<HTMLElement>('[data-timeline-dot]');
      return dot ? centerY(dot, root) : (height / 4) * (index + 1);
    });

    const points: Array<[number, number]> = [
      [0, 0],
      [6, ys[0] ?? 0],
      [18, ys[1] ?? height / 2],
      [30, ys[2] ?? height],
      [36, height],
    ];
    const t = Math.max(0, Math.min(36, month));
    let y = height;
    for (let k = 0; k < 4; k += 1) {
      const start = points[k];
      const end = points[k + 1];
      if (t <= end[0]) {
        y = start[1] + ((end[1] - start[1]) * (t - start[0])) / (end[0] - start[0]);
        break;
      }
    }

    setMarker({ top: y, visible: month > 0 && month < 36 });
  }, [month, rows.length]);

  useLayoutEffect(() => {
    if (currentIndex >= 0) setActive(currentIndex);
  }, [currentIndex]);

  useLayoutEffect(() => {
    layout();
    const onResize = () => layout();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [layout, isDe]);

  return (
    <section
      id="project-progress"
      className="flex min-h-[calc(100dvh-70px)] scroll-mt-[70px] items-center bg-[#F2EEFF] px-6 py-[clamp(0.75rem,3.5vh,3rem)] sm:px-10"
    >
      <div className="mx-auto w-full max-w-[56rem]">
        <div className="mb-[clamp(0.6rem,3vh,2.5rem)] text-center">
          <h2 className="mb-[clamp(0.3rem,1.5vh,1rem)] font-lora text-[clamp(1.5rem,2.8vw,2.2rem)] font-bold tracking-tight text-[#1A1033]">
            {copy.title}
          </h2>
          <p className="mx-auto max-w-3xl font-primary text-base leading-relaxed text-[#6B5F8A]">{copy.lead}</p>
        </div>

        <div ref={timelineRef} className="relative">
          <div
            className="absolute bottom-0 top-0 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#9152FF]/35 to-[#7339E0]/35 max-md:left-[1.1rem] md:left-1/2"
            aria-hidden
          />
          <div
            className="absolute w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#9152FF] to-[#7339E0] transition-[height] duration-[1400ms] ease-out motion-reduce:transition-none max-md:left-[1.1rem] md:left-1/2"
            style={{ height: marker.visible ? marker.top : 0 }}
            aria-hidden
          />
          <div
            className={cn(
              'absolute z-[2] h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-amber-400 shadow-[0_4px_10px_rgba(26,16,51,0.18)] transition-[top] duration-[1400ms] ease-out motion-reduce:transition-none max-md:left-[1.1rem] md:left-1/2',
              marker.visible ? 'block' : 'hidden'
            )}
            style={{ top: marker.top }}
            aria-hidden
          >
            <span className="absolute left-6 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-amber-400 px-2.5 py-0.5 font-primary text-[0.72rem] font-semibold text-[#1A1033] md:inline">
              {copy.today}
            </span>
          </div>

          {rows.map((row, index) => {
            const reverse = index === 1;
            const isActive = active === index;

            return (
              <div
                key={row.heading}
                ref={(node) => {
                  rowRefs.current[index] = node;
                }}
                className={cn(
                  'relative mb-[clamp(0.5rem,2.4vh,1.75rem)] flex items-center last:mb-0 max-md:flex-col max-md:items-stretch max-md:pl-10',
                  reverse && 'md:flex-row-reverse'
                )}
              >
                <div
                  className={cn(
                    'w-full md:w-5/12',
                    reverse ? 'md:pl-8 md:text-left' : 'md:pr-8 md:text-right'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    className={cn(
                      'w-full rounded-[24px] border bg-white px-5 py-[clamp(0.6rem,1.8vh,1.25rem)] text-left shadow-[0_8px_30px_rgba(145,82,255,0.08)] transition duration-200 motion-reduce:transition-none',
                      row.status === 'current' || isActive
                        ? 'border-2 border-[#9152FF] shadow-[0_16px_30px_rgba(145,82,255,0.18)]'
                        : 'border-[rgba(145,82,255,0.15)] hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(145,82,255,0.14)]',
                      isActive && '-translate-y-1',
                      reverse ? 'md:text-left' : 'md:text-right'
                    )}
                  >
                    <div
                      className={cn(
                        'mb-1 flex items-center gap-2 font-primary text-[0.85rem] font-medium text-[#9152FF]',
                        reverse ? 'md:justify-start' : 'md:justify-end'
                      )}
                    >
                      <span>{row.phase}</span>
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold',
                          row.status === 'current' && 'bg-amber-400 text-[#1A1033]',
                          row.status === 'done' && 'bg-[#F5F0FF] text-[#7339E0]',
                          row.status === 'upcoming' && 'bg-[#F2EEFF] text-[#6B5F8A]'
                        )}
                      >
                        {row.pill}
                      </span>
                    </div>
                    <p className="mb-1 font-primary text-[0.8rem] text-[#6B5F8A]">{row.period}</p>
                    <h3 className="mb-1 font-lora text-base font-bold text-[#1A1033]">{row.heading}</h3>
                    <p className="font-primary text-[0.82rem] leading-relaxed text-[#6B5F8A]">{row.body}</p>
                  </button>
                </div>

                <div className="relative z-[1] flex w-full justify-center max-md:absolute max-md:left-[0.225rem] max-md:top-1/2 max-md:w-auto max-md:-translate-y-1/2 md:w-2/12">
                  <button
                    type="button"
                    data-timeline-dot
                    aria-pressed={isActive}
                    aria-label={`${row.phase}, ${row.heading}, ${row.pill}`}
                    onClick={() => setActive(index)}
                    className={cn(
                      'relative h-7 w-7 rounded-full border-[3px] shadow-[0_0_0_4px_#fff,0_8px_14px_rgba(26,16,51,0.12)] transition duration-200 motion-reduce:transition-none',
                      'hover:scale-110 hover:shadow-[0_0_0_4px_#fff,0_0_0_8px_rgba(145,82,255,0.25)]',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A1033]',
                      isActive && 'scale-125 shadow-[0_0_0_4px_#fff,0_0_0_9px_rgba(145,82,255,0.3)]',
                      row.status === 'done' && 'border-[#9152FF] bg-[#9152FF]',
                      row.status === 'current' && 'border-white bg-gradient-to-br from-[#9152FF] to-[#7339E0]',
                      row.status === 'upcoming' && 'border-[#9152FF] bg-white'
                    )}
                  >
                    {row.status === 'done' ? (
                      <span
                        className="absolute left-1/2 top-[46%] h-3 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-white"
                        aria-hidden
                      />
                    ) : null}
                    {row.status === 'current' ? (
                      <>
                        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" aria-hidden />
                        <span
                          className="absolute -inset-[9px] rounded-full border-2 border-[#9152FF] motion-safe:animate-[bbProgressRing_2.2s_ease-out_infinite]"
                          aria-hidden
                        />
                      </>
                    ) : null}
                  </button>
                </div>

                <div className="hidden w-5/12 md:block" aria-hidden />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes bbProgressRing {
          0% { transform: scale(0.7); opacity: 0.9; }
          100% { transform: scale(1.35); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
