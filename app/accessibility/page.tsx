'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/hooks/useLanguage';

export default function AccessibilityPage() {
  const { isDe } = useLanguage();

  return (
    <section className="min-h-screen bg-[#F2EEFF] py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="mb-8 text-center font-lora text-4xl font-bold text-[#1A1033]">
          {isDe ? 'Barrierefreiheit' : 'Accessibility'}
        </h1>

        <div className="rounded-[24px] border border-[rgba(145,82,255,0.15)] bg-white p-8 shadow-[0_8px_32px_rgba(145,82,255,0.13)]">
          <div className="prose max-w-none prose-headings:font-lora prose-headings:text-[#1A1033] prose-p:text-[#6B5F8A] prose-li:text-[#6B5F8A] prose-a:text-[#9152FF]">
            <h2>{isDe ? '1. Unser Anspruch' : '1. Our promise'}</h2>
            <p>
              {isDe
                ? 'Building Bridges soll für möglichst viele Menschen nutzbar sein – unabhängig von Behinderung, Hilfsmitteln oder der Art, wie du die Website bedienst. Wir arbeiten daran, Inhalte, Navigation und Sprache so zu gestalten, dass du dich hier zurechtfindest.'
                : 'Building Bridges should be usable for as many people as possible, including if you use assistive technology or navigate in a different way. We work to make content, navigation, and language so that you can find your way here.'}
            </p>

            <h2>{isDe ? '2. Ziel' : '2. Goal'}</h2>
            <p>
              {isDe
                ? 'Unser Ziel ist die Konformität mit den Web Content Accessibility Guidelines (WCAG) 2.1 auf Stufe AA.'
                : 'Our goal is conformance with the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA.'}
            </p>

            <h2>{isDe ? '3. Aktueller Stand' : '3. Current status'}</h2>
            <p>[TO BE CONFIRMED]</p>

            <h2>{isDe ? '4. Bekannte Barrieren' : '4. Known barriers'}</h2>
            <p>[TO BE CONFIRMED]</p>

            <h2>{isDe ? '5. Wie wir geprüft haben' : '5. How this was checked'}</h2>
            <p>[TO BE CONFIRMED]</p>

            <h2>{isDe ? '6. Feedback' : '6. Feedback'}</h2>
            <p>
              {isDe
                ? 'Wenn du auf eine Barriere stößt, sag uns bitte Bescheid. Wir nehmen Hinweise ernst und versuchen, sie zu beheben.'
                : 'If you run into a barrier, please tell us. We take reports seriously and will try to fix them.'}
            </p>
            <p>
              {isDe ? (
                <>
                  Du kannst uns über das{' '}
                  <Link href="/contact">Kontaktformular</Link> schreiben.
                </>
              ) : (
                <>
                  You can write to us via the <Link href="/contact">contact form</Link>.
                </>
              )}
            </p>
            <p>
              {isDe ? 'E-Mail für Barrierefreiheit' : 'Accessibility email'}: [TO BE CONFIRMED]
            </p>

            <h2>{isDe ? '7. Beschwerden' : '7. Complaints'}</h2>
            <p>
              {isDe
                ? 'Wenn du mit unserer Antwort nicht zufrieden bist, kannst du dich an die zuständige Stelle wenden:'
                : 'If you are not satisfied with our response, you can contact the responsible complaints body:'}
            </p>
            <p>[TO BE CONFIRMED]</p>
          </div>
        </div>
      </div>
    </section>
  );
}
