'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/hooks/useLanguage';

const glossary: { term: string; en: string; de: string }[] = [
  {
    term: 'FLINTA*',
    en: 'Female, Lesbian, Inter, Non-binary, Trans and Agender — the asterisk signals openness beyond the binary.',
    de: 'Frauen, Lesben, Inter, Nicht-binäre, Trans und Agender — das * steht für Offenheit jenseits der Binärkeit.',
  },
  {
    term: 'BIPoC',
    en: 'Black, Indigenous and People of Colour — centres racialised experiences and resistance to racism.',
    de: 'Black, Indigenous and People of Colour — rückt rassifizierte Erfahrungen und Widerstand gegen Rassismus in den Mittelpunkt.',
  },
  {
    term: 'M*oC',
    en: 'Mädchen* of Colour — girls and FLINTA* of Colour; the asterisk includes non-binary identities.',
    de: 'Mädchen* of Colour — das * schließt nicht-binäre Identitäten ein.',
  },
  { term: 'MEP Program', en: 'Mentoring & Empowerment Program — workshops, mentoring, peer exchange.', de: 'Mentoring- & Empowerment-Programm.' },
];

export function LandingKnowledge() {
  const { isDe } = useLanguage();
  const [glossaryOpen, setGlossaryOpen] = useState<{ term: string; en: string; de: string } | null>(null);

  return (
    <section id="knowledge" className="bg-[#F2EEFF] px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">{isDe ? 'Informationsplattform' : 'Information Platform'}</p>
        <h2 className="mb-3 max-w-[720px] font-lora text-[clamp(2rem,3vw,2.6rem)] font-bold leading-tight tracking-tight text-[#1A1033]">
          {isDe ? (
            <>Wissen, <em className="font-normal not-italic text-[#9152FF]">Ressourcen &amp; Lernen</em></>
          ) : (
            <>Knowledge, <em className="font-normal not-italic text-[#9152FF]">resources &amp; learning</em></>
          )}
        </h2>
        <p className="mb-8 max-w-[680px] text-[0.97rem] text-[#6B5F8A]">
          {isDe
            ? 'Eine wachsende, lebendige Wissensbasis mit multimodalen Inhalten - Text, Video, Infografiken und Beispielgeschichten - in verstaendlicher Sprache auf Deutsch und Englisch.'
            : 'A growing, living resource hub with multimodal content - text, video, infographics, and example stories - in accessible language in both German and English.'}
        </p>

        <div className="mt-12 rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-[#F5F0FF] p-8">
          <h4 className="font-lora text-xl font-bold text-[#1A1033]">📖 {isDe ? 'Glossar - Zentrale Begriffe' : 'Glossary - Key Terms'}</h4>
          <p className="mb-4 mt-1 text-[0.85rem] text-[#6B5F8A]">{isDe ? 'Tippen Sie einen Begriff fuer eine kurze Definition (EN + DE).' : 'Tap a term for a short definition (EN + DE).'}</p>
          <div className="flex flex-wrap gap-2">
            {glossary.map((g) => (
              <button
                key={g.term}
                type="button"
                onClick={() => setGlossaryOpen(g)}
                className="rounded-xl border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white px-4 py-2 text-[0.83rem] font-semibold text-[#9152FF] transition hover:bg-[#9152FF] hover:text-white"
              >
                {g.term}
              </button>
            ))}
            <a
              href="/glossary"
              className="rounded-xl border-[1.5px] border-dashed border-[#9152FF]/40 px-4 py-2 text-[0.83rem] font-semibold text-[#6B5F8A] hover:text-[#9152FF]"
            >
              {isDe ? 'Vollstaendiges Glossar →' : 'Full glossary →'}
            </a>
          </div>
          {glossaryOpen && (
            <div className="relative mt-6 rounded-[18px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-6 shadow-md">
              <button
                type="button"
                className="absolute right-3 top-3 text-[#6B5F8A] hover:text-[#1A1033]"
                aria-label="Close"
                onClick={() => setGlossaryOpen(null)}
              >
                ✕
              </button>
              <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#9152FF]">{glossaryOpen.term}</p>
              <p className="text-[0.9rem] leading-relaxed text-[#1A1033]">{glossaryOpen.en}</p>
              <p className="mt-3 border-t border-[rgba(145,82,255,0.15)] pt-3 text-[0.85rem] italic leading-relaxed text-[#6B5F8A]">
                🇩🇪 {glossaryOpen.de}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col flex-wrap items-start justify-between gap-4 rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-8 sm:flex-row sm:items-center">
          <div>
            <strong className="block text-[0.95rem] text-[#1A1033]">{isDe ? 'Wie hilfreich war dieser Bereich?' : 'How helpful was this section?'}</strong>
            <p className="text-[0.9rem] font-medium text-[#6B5F8A]">{isDe ? 'Ihr Feedback hilft uns bei der Verbesserung. Antworten sind anonym.' : 'Your feedback helps us improve. Responses are anonymous.'}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full border-[1.5px] border-[rgba(145,82,255,0.15)] px-4 py-2 text-[0.83rem] font-semibold text-[#6B5F8A] hover:border-[#6BAA8A] hover:bg-[rgba(107,170,138,0.15)] hover:text-[#3d7a5c]"
            >
              {isDe ? '👍 Hilfreich' : '👍 Helpful'}
            </button>
            <button
              type="button"
              className="rounded-full border-[1.5px] border-[rgba(145,82,255,0.15)] px-4 py-2 text-[0.83rem] font-semibold text-[#6B5F8A] hover:border-[#9152FF] hover:bg-[#F5F0FF] hover:text-[#9152FF]"
            >
              {isDe ? '👎 Nicht hilfreich' : '👎 Not helpful'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
