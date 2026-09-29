'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/hooks/useLanguage';

const glossary: { term: string; en: string; de: string }[] = [
  {
    term: 'FLINTA*',
    en: 'FLINTA* stands for Female, Lesbian, Inter, Non-binary, Trans and Agender. The asterisk shows that other gender identities are included too.',
    de: 'FLINTA* steht für Frauen, Lesben, Inter, Nichtbinäre, Trans und Agender. Das Sternchen zeigt, dass weitere Geschlechtsidentitäten dazugehören.',
  },
  {
    term: 'BIPoC',
    en: 'BIPoC stands for Black, Indigenous and People of Colour. The term centres racialised experiences and resistance to racism.',
    de: 'BIPoC steht für Black, Indigenous and People of Colour. Der Begriff rückt rassifizierte Erfahrungen und Widerstand gegen Rassismus in den Mittelpunkt.',
  },
  {
    term: 'M*oC',
    en: 'M*oC stands for Mädchen* of Colour: girls and FLINTA* of Colour. The asterisk includes identities beyond the binary.',
    de: 'M*oC steht für Mädchen* of Colour: Mädchen und FLINTA* of Colour. Das Sternchen schließt Identitäten jenseits der Binarität ein.',
  },
  {
    term: 'MEP Program',
    en: 'MEP is the Mentoring and Empowerment Program: workshops, mentoring and peer exchange.',
    de: 'MEP ist das Mentoring und Empowerment Programm: Workshops, Mentoring und Austausch unter Gleichen.',
  },
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
            <>Wissen, <em className="font-normal not-italic text-[#9152FF]">Ressourcen & Lernen</em></>
          ) : (
            <>Knowledge, <em className="font-normal not-italic text-[#9152FF]">resources & learning</em></>
          )}
        </h2>
        <p className="mb-8 max-w-[680px] text-[0.97rem] text-[#6B5F8A]">
          {isDe
            ? 'Eine wachsende Wissensplattform mit multimodalen Inhalten: Texten, Videos, Infografiken und Beispielgeschichten, in verständlicher Sprache auf Deutsch und Englisch.'
            : 'A growing, living resource hub with multimodal content: text, video, infographics, and example stories, in accessible language in both German and English.'}
        </p>

        <div className="mt-12 rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-[#F5F0FF] p-8">
          <h4 className="font-lora text-xl font-bold text-[#1A1033]">📖 {isDe ? 'Glossar: zentrale Begriffe' : 'Glossary: key terms'}</h4>
          <p className="mb-4 mt-1 text-[0.85rem] text-[#6B5F8A]">{isDe ? 'Tippe auf einen Begriff für eine kurze Definition.' : 'Tap a term for a short definition.'}</p>
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
              {isDe ? 'Zum vollständigen Glossar →' : 'Full glossary →'}
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
              <p className="text-[0.9rem] leading-relaxed text-[#1A1033]">{isDe ? glossaryOpen.de : glossaryOpen.en}</p>
              {!isDe && (
                <p className="mt-3 border-t border-[rgba(145,82,255,0.15)] pt-3 text-[0.85rem] italic leading-relaxed text-[#6B5F8A]">
                  🇩🇪 {glossaryOpen.de}
                </p>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
