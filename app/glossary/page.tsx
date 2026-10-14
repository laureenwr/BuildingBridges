'use client';

import { useEffect, useState } from 'react';
import { GLOSSARY_TERMS } from '@/lib/content/glossary';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { cn } from '@/lib/utils';

export default function GlossaryPage() {
  const { isDe } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && GLOSSARY_TERMS.some((term) => term.id === hash)) {
      setActiveId(hash);
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const openTerm = (id: string) => {
    setActiveId(id);
    const node = document.getElementById(id);
    node?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <main className="min-h-screen bg-[#F2EEFF]">
      <div className="mx-auto max-w-[1280px] px-6 py-24 sm:px-10">
        <div className="mb-10 text-center">
          <p className="text-[0.74rem] font-bold uppercase tracking-[0.12em] text-[#8A5CE6]">
            {isDe ? 'Wissensplattform' : 'Knowledge'}
          </p>
          <h1 className="mt-2 font-lora text-[clamp(2rem,3.2vw,2.9rem)] font-bold text-[#1A1033]">
            {isDe ? 'Glossar' : 'Glossary'}
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-[0.98rem] leading-relaxed text-[#62557F]">
            {isDe
              ? 'Wichtige Begriffe aus dem Building-Bridges-Projekt. Tippe auf einen Begriff oder lies die vollständigen Erklärungen darunter. Die Sprache folgt dem EN/DE-Schalter oben.'
              : 'Key terms used in the Building Bridges project. Tap a term or read the full explanations below. Language follows the EN/DE toggle in the header.'}
          </p>
        </div>

        <div className="rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-[#F5F0FF] p-6 sm:p-8">
          <h2 className="font-lora text-xl font-bold text-[#1A1033]">
            {isDe ? '📖 Zentrale Begriffe' : '📖 Key terms'}
          </h2>
          <p className="mb-4 mt-1 text-[0.85rem] text-[#6B5F8A]">
            {isDe ? 'Tippe auf einen Begriff, um zur Erklärung zu springen.' : 'Tap a term to jump to its explanation.'}
          </p>
          <div className="flex flex-wrap gap-2">
            {GLOSSARY_TERMS.map((term) => {
              const label = isDe ? term.termDe : term.termEn;
              const selected = activeId === term.id;
              return (
                <button
                  key={term.id}
                  type="button"
                  onClick={() => openTerm(term.id)}
                  className={cn(
                    'rounded-xl border-[1.5px] px-4 py-2 text-[0.83rem] font-semibold transition',
                    selected
                      ? 'border-[#9152FF] bg-[#9152FF] text-white'
                      : 'border-[rgba(145,82,255,0.15)] bg-white text-[#9152FF] hover:bg-[#9152FF] hover:text-white'
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {GLOSSARY_TERMS.map((term) => {
            const selected = activeId === term.id;
            return (
              <article
                key={term.id}
                id={term.id}
                className={cn(
                  'scroll-mt-28 rounded-[24px] border-[1.5px] bg-white p-6 shadow-[0_8px_32px_rgba(145,82,255,0.08)] sm:p-8',
                  selected
                    ? 'border-[#9152FF] ring-2 ring-[#9152FF]/20'
                    : 'border-[rgba(145,82,255,0.15)]'
                )}
              >
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#9152FF]">
                  {isDe ? term.termDe : term.termEn}
                </p>
                {term.termEn !== term.termDe ? (
                  <p className="mt-1 text-[0.8rem] text-[#9A8CB3]">{isDe ? term.termEn : term.termDe}</p>
                ) : null}
                <p className="mt-3 text-[0.98rem] leading-relaxed text-[#1A1033]">{isDe ? term.de : term.en}</p>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
