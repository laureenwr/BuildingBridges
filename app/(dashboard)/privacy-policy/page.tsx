'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useLanguage } from '@/lib/hooks/useLanguage';

export default function PrivacyPolicyPage() {
  const { isDe } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="mb-12 text-center font-lora text-4xl font-bold text-[#1A1033]">{isDe ? 'Datenschutzrichtlinie' : 'Privacy Policy'}</h1>
      
      <Card className="mb-8 border-[rgba(145,82,255,0.15)] shadow-[0_8px_32px_rgba(145,82,255,0.13)]">
        <CardContent className="prose max-w-none p-6 prose-headings:font-lora prose-headings:text-[#1A1033] prose-p:text-[#6B5F8A] prose-li:text-[#6B5F8A]">
          <h2 className="text-2xl font-semibold text-[#8c52ff] mb-4">{isDe ? '1. Verantwortliche Stelle' : '1. Responsible entity'}</h2>
          <p>
            {isDe
              ? 'Betreiber der Living-Plattform im Rahmen des Projekts "Building Bridges" sind die Freie Universitaet Berlin, Stiftung SPI und Universitaet Duisburg-Essen.'
              : 'The operators of the living platform within the "Building Bridges" project are Freie University Berlin, SPI Foundation, and the University of Duisburg-Essen.'}
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">{isDe ? '2. Datenerhebung & -verarbeitung' : '2. Data collection & processing'}</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>{isDe ? 'Erhebung ausschliesslich der fuer die Plattformteilnahme erforderlichen Daten' : 'Collection only of data required for platform participation'}</li>
            <li>{isDe ? 'Beitraege werden anonymisiert gespeichert' : 'Contributions are stored in anonymized form'}</li>
            <li>{isDe ? 'Freiwillig angegebene personenbezogene Daten werden getrennt behandelt' : 'Voluntarily provided personal data is processed separately'}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">{isDe ? '3. Zweck der Datenverarbeitung' : '3. Purpose of processing'}</h3>
          <p>
            {isDe ? 'Die Daten werden ausschliesslich verwendet fuer:' : 'Data is used exclusively for:'}
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>{isDe ? 'Wissenschaftliche Zwecke' : 'Scientific purposes'}</li>
            <li>{isDe ? 'Evaluation der Plattform' : 'Platform evaluation'}</li>
            <li>{isDe ? 'Optimierung des Angebots' : 'Improvement of the service'}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">{isDe ? '4. Anonymisierung & Rueckschluesse' : '4. Anonymization & re-identification risk'}</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>{isDe ? 'Speicherung der Beitraege in anonymisierter Form' : 'Contributions are stored in anonymized form'}</li>
            <li>{isDe ? 'Geteilte Detailinformationen koennen potenziell Rueckschluesse ermoeglichen' : 'Shared details may still allow potential re-identification'}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">{isDe ? '5. Datenweitergabe' : '5. Data sharing'}</h3>
          <p>
            {isDe
              ? 'Keine Weitergabe an Dritte; Datenverarbeitung erfolgt intern und ausschliesslich innerhalb des Projektkontexts.'
              : 'No sharing with third parties; data processing is internal and limited to the project context.'}
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">{isDe ? '6. Speicherdauer & Loeschung' : '6. Retention & deletion'}</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>{isDe ? 'Speicherung der Daten fuer die Projektdauer bzw. bis zum Widerruf der Einwilligung' : 'Data is retained for project duration or until consent is withdrawn'}</li>
            <li>{isDe ? 'Nutzer*innen koennen jederzeit die Loeschung ihrer Daten verlangen' : 'Users can request deletion of their data at any time'}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">{isDe ? '7. Rechte der Nutzer*innen' : '7. User rights'}</h3>
          <p>
            {isDe ? 'Gemaess geltender Datenschutzgesetze haben Sie das Recht auf:' : 'Under applicable data protection laws, you have the right to:'}
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>{isDe ? 'Auskunft' : 'Access'}</li>
            <li>{isDe ? 'Berichtigung' : 'Rectification'}</li>
            <li>{isDe ? 'Loeschung' : 'Erasure'}</li>
            <li>{isDe ? 'Einschraenkung der Verarbeitung' : 'Restriction of processing'}</li>
            <li>{isDe ? 'Widerspruch' : 'Objection'}</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">{isDe ? '8. Sicherheitsmassnahmen' : '8. Security measures'}</h3>
          <p>
            {isDe
              ? 'Wir implementieren angemessene technische und organisatorische Massnahmen zum Schutz Ihrer Daten.'
              : 'We implement appropriate technical and organizational measures to protect your data.'}
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">{isDe ? '9. Kontakt' : '9. Contact'}</h3>
          <p>{isDe ? 'Bei Fragen oder Anliegen zum Datenschutz koennen Sie sich an uns wenden:' : 'For questions or concerns regarding privacy, please contact us:'}</p>
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