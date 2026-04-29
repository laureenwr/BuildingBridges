'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useLanguage } from '@/lib/hooks/useLanguage';

export default function TermsOfServicePage() {
  const { isDe } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="mb-12 text-center font-lora text-4xl font-bold text-[#1A1033]">{isDe ? 'Nutzungsbedingungen' : 'Terms of Service'}</h1>
      
      <Card className="mb-8 border-[rgba(145,82,255,0.15)] shadow-[0_8px_32px_rgba(145,82,255,0.13)]">
        <CardContent className="prose max-w-none p-6 prose-headings:font-lora prose-headings:text-[#1A1033] prose-p:text-[#6B5F8A] prose-li:text-[#6B5F8A]">
          <h2 className="text-2xl font-semibold text-[#8c52ff] mb-4">{isDe ? '1. Plattformzweck' : '1. Platform purpose'}</h2>
          <p>
            {isDe
              ? 'Building Bridges ist eine Austausch- und Vernetzungsplattform, die das Teilen von Erfahrungsberichten, Perspektiven und Loesungsansaetzen ermoeglicht. Die Plattform wird von der Freien Universitaet Berlin in Zusammenarbeit mit der Stiftung SPI und der Universitaet Duisburg-Essen betrieben.'
              : 'Building Bridges is an exchange and networking platform that enables sharing experiences, perspectives, and solutions. The platform is operated by Freie University Berlin in cooperation with SPI Foundation and the University of Duisburg-Essen.'}
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">{isDe ? '2. Teilnahmebedingungen' : '2. Participation terms'}</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>{isDe ? 'Die Teilnahme ist freiwillig und kann jederzeit ohne Nachteile beendet werden' : 'Participation is voluntary and can be ended at any time without disadvantages'}</li>
            <li>{isDe ? 'Nutzer*innen entscheiden eigenverantwortlich ueber die geteilten Inhalte' : 'Users are responsible for what they choose to share'}</li>
            <li>{isDe ? 'Die Plattform richtet sich an Maedchen und FLINTA of Color im Alter von 16-18 Jahren' : 'The platform is intended for girls and FLINTA of Color aged 16-18'}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">{isDe ? '3. Anonymitaet & Inhalte' : '3. Anonymity & content'}</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>{isDe ? 'Beitraege werden anonymisiert gespeichert' : 'Contributions are stored in anonymized form'}</li>
            <li>{isDe ? 'Detailangaben koennen dennoch Rueckschluesse auf Identitaeten ermoeglichen' : 'Details may still allow inferences about identities'}</li>
            <li>{isDe ? 'Nutzer*innen sind fuer ihre eingestellten Inhalte selbst verantwortlich' : 'Users are responsible for the content they submit'}</li>
            <li>{isDe ? 'Rechtswidrige, diskriminierende oder beleidigende Inhalte sind verboten' : 'Illegal, discriminatory, or abusive content is prohibited'}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">{isDe ? '4. Lizenz & Nutzung' : '4. License & usage'}</h3>
          <p>
            {isDe
              ? 'Mit dem Einstellen von Beitraegen erteilen Nutzer*innen der Plattform ein nicht-exklusives, weltweites und unbefristetes Nutzungsrecht zur Verwendung, Speicherung und Verarbeitung, vorrangig fuer wissenschaftliche Zwecke und zur Optimierung der Plattform.'
              : 'By submitting contributions, users grant the platform a non-exclusive, worldwide, and unlimited right to use, store, and process content, primarily for scientific purposes and platform improvement.'}
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">{isDe ? '5. Moderation & Unterstuetzung' : '5. Moderation & support'}</h3>
          <p>
            {isDe
              ? 'Ein geschultes Moderationsteam ueberwacht die Inhalte und bietet bei emotional belastenden Situationen Unterstuetzung an.'
              : 'A trained moderation team monitors content and provides support in emotionally challenging situations.'}
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">{isDe ? '6. Haftungsausschluss' : '6. Disclaimer'}</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>{isDe ? 'Die Betreiber haften nicht fuer Fehler, Vollstaendigkeit oder Aktualitaet der Inhalte' : 'Operators are not liable for errors, completeness, or timeliness of content'}</li>
            <li>{isDe ? 'Die Nutzung der Plattform erfolgt auf eigenes Risiko' : 'Use of the platform is at your own risk'}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">{isDe ? '7. Aenderungsvorbehalt' : '7. Right to changes'}</h3>
          <p>
            {isDe
              ? 'Die Betreiber behalten sich das Recht vor, die Nutzungsbedingungen jederzeit anzupassen. Aenderungen werden den Nutzer*innen in geeigneter Weise bekanntgegeben.'
              : 'The operators reserve the right to update these terms at any time. Changes will be communicated to users in an appropriate manner.'}
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">{isDe ? '8. Kontakt' : '8. Contact'}</h3>
          <p>{isDe ? 'Bei Fragen oder Anliegen koennen Sie sich an uns wenden:' : 'For questions or concerns, please contact us:'}</p>
          <p className="mb-1">{isDe ? 'Kontakt' : 'Contact'}: Team Building Bridges</p>
          <p className="mb-1">{isDe ? 'E-Mail' : 'Email'}: team@buildingbridges.de</p>
        </CardContent>
      </Card>

      <div className="text-center mt-12">
        <Link href="/sign-up">
          <Button className="inline-flex items-center justify-center rounded-full bg-[#9152FF] px-8 py-4 text-white shadow-[0_8px_24px_rgba(145,82,255,0.35)] transition hover:-translate-y-px hover:bg-[#7339E0]">
            {isDe ? 'Jetzt Teilnehmen' : 'Join now'}
          </Button>
        </Link>
      </div>
    </div>
  );
} 