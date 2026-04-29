'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import type { TeamMember } from '@/lib/content/team';
import { useLanguage } from '@/lib/hooks/useLanguage';

const bioOverrides: Record<string, { de: string; en: string }> = {
  'claudia-calvano': {
    de: 'Claudia studierte Psychologie an den Unis in Tuebingen, Oslo und Potsdam und absolvierte parallel zur Promotion ihre Ausbildung als Psychotherapeutin fuer Kinder und Jugendliche. Seit 2007 lebt und arbeitet sie in Berlin bzw. Potsdam und ist seit 2023 an der Freien Universitaet Berlin, wo sie neben Forschung und Lehre auch in der Praxis taetig ist. Schwerpunkte ihrer Arbeit sind die psychische Gesundheit von Kindern und Jugendlichen und ihren Eltern, mit besonderem Blick auf marginalisierte Gruppen sowie die Entwicklung diversitaetssensibler Empowerment- und Psychotherapieansaetze in einem partizipativen Rahmen.',
    en: 'Claudia studied psychology at universities in Tuebingen, Oslo, and Potsdam, and completed her training as a child and adolescent psychotherapist alongside her doctoral work. Since 2007, she has lived and worked in Berlin and Potsdam, and since 2023 she has been at Freie University Berlin, where she is active in both research/teaching and practice. Her work focuses on the mental health of children, adolescents, and their parents, with a special emphasis on marginalized groups and on developing diversity-sensitive empowerment and psychotherapy approaches in participatory settings.',
  },
  'celiana-kiefer': {
    de: 'Sie hat Soziale Arbeit studiert, im Master mit dem Forschungsschwerpunkt Kulturelle Bildung, und ist seit mehreren Jahren in der Maedchen*arbeit taetig - unter anderem durch die vorherige Leitung von MAEDEA (Maedchen*zentrum fuer Empowerment und Feminismus in Berlin) sowie durch ehrenamtliche Vorstandsarbeit in der Bundesarbeitsgemeinschaft Maedchen*politik. Aktuell befindet sie sich in Ausbildung zur systemischen Beratung. Ihre Themen sind Maedchen*arbeit und -politik, Empowerment, Rassismus, Feminismus, Intersektionalitaet, Queerness und diverse Beziehungsformen. Sie positioniert sich als Schwarze Person, queer und Arbeiterinnenkind.',
    en: 'She studied Social Work, with a master-level research focus on cultural education, and has worked in girls* empowerment for several years - including previously leading MAEDEA (Girls* Center for Empowerment and Feminism in Berlin) and serving in voluntary board work in the Federal Working Group for Girls* Policy. She is currently training in systemic counseling. Her topics include girls* work and policy, empowerment, racism, feminism, intersectionality, queerness, and diverse relationship models. She positions herself as a Black person, queer, and from a working-class background.',
  },
  'sumera-sajid': {
    de: 'Masterstudentin in Web & Data Science an der Universitaet Koblenz. Urspruenglich aus Gilgit, Pakistan. Sie wirkt an der Building Bridges Plattform mit und legt den Fokus auf User Experience, Storytelling und inklusives digitales Design. Ihre Arbeit verbindet datengetriebenes Denken mit nutzerzentrierter Gestaltung, um zugaengliche und sinnvolle digitale Erfahrungen zu schaffen. Besonders interessiert sie sich dafuer, wie Technologie Communities staerken, vielfaeltige Stimmen sichtbar machen und inklusive Raeume fuer Lernen und Austausch schaffen kann.',
    en: "Master's student in Web & Data Science at the University of Koblenz. Originally from Gilgit, Pakistan. Contributing to the Building Bridges platform with a focus on user experience, storytelling, and inclusive digital design. Her work brings together data-driven thinking and user-centered design to support accessible and meaningful digital experiences. She is particularly interested in how technology can empower communities, amplify diverse voices, and create inclusive spaces for learning and exchange.",
  },
  'hannes-rothe': {
    de: 'Professor und Inhaber des Lehrstuhls fuer Sustainability and Innovation in Digital Ecosystems an der Universitaet Duisburg-Essen sowie Leiter von Place Beyond Bytes. Seine Arbeitsschwerpunkte in der Lehre sind digitale Innovation, Entrepreneurship und maschinelles Lernen. Seine Forschung bewegt sich an der Schnittstelle von digitaler Innovation und Entrepreneurship, Management digitaler Oekosysteme sowie der Organisation von Daten und Wissen.',
    en: 'Professor and Chair of Sustainability and Innovation in Digital Ecosystems at the University of Duisburg-Essen, and head of the Place Beyond Bytes. His work focuses on teaching Digital Innovation, Entrepreneurship, and Machine Learning. His research explores the intersection of digital innovation and entrepreneurship, the management of digital ecosystems, and the organization of data and knowledge.',
  },
  'daniel-courtney': {
    de: 'Wissenschaftlicher Mitarbeiter an der Universitaet Duisburg-Essen am Lehrstuhl fuer Sustainability and Innovation in Digital Ecosystems. Er arbeitet in Projekten wie Building Bridges und "EHDS for All" mit. Mit einem Hintergrund in Human-Computer Interaction und Psychologie konzentriert sich seine Arbeit auf User Experience, Human-Centered Design sowie die Interaktion zwischen Menschen und digitalen Technologien. Seine Forschungsinteressen umfassen UX-Design und -Forschung, Human Factors sowie Verhaltenswissenschaften.',
    en: 'Research Associate at the University of Duisburg-Essen, working at the Chair of Sustainability and Innovation in Digital Ecosystems. He contributes to projects such as Building Bridges and "EHDS for All." With a background in Human-Computer Interaction and Psychology, his work focuses on user experience, human-centered design, and the interaction between people and digital technologies. His research interests include UX design and research, human factors, and behavioral science.',
  },
  'laureen-warikoru': {
    de: 'Wissenschaftliche Mitarbeiterin an der Universitaet Duisburg-Essen am Lehrstuhl fuer Sustainability and Innovation in Digital Ecosystems. Ihre Arbeitsschwerpunkte liegen in Human-Computer Interaction, kognitiver Psychologie und Verhaltenswissenschaften. Sie interessiert sich besonders dafuer zu verstehen, wie Menschen mit digitalen Systemen interagieren und wie diese Erfahrungen intuitiver und nutzerzentrierter gestaltet werden koennen.',
    en: 'Research Associate at the University of Duisburg-Essen, working at the Chair of Sustainability and Innovation in Digital Ecosystems. Her work focuses on Human-Computer Interaction, cognitive psychology, and behavioral science, with an interest in understanding how people interact with digital systems and how these experiences can be designed in a more intuitive and user-centered way.',
  },
};

const roleOverrides: Record<string, { de: string; en: string }> = {
  'claudia-calvano': {
    de: 'Verbundleitung und Leitung Teilprojekt 1',
    en: 'Consortium Lead and Head of Subproject 1',
  },
  'celiana-kiefer': {
    de: 'Teilprojektleitung von Teilprojekt 2 „Ment2Power" (Mentoringprogramm)',
    en: 'Lead of Subproject 2 "Ment2Power" (Mentoring Program)',
  },
  'susanne-birnkammer': {
    de: 'Wissenschaftliche Mitarbeiterin, Doktorandin',
    en: 'Research Associate, Doctoral Candidate',
  },
  'felicia-boma-lazaridou': {
    de: 'Wissenschaftliche Mitarbeiterin (Drittmittelprojekt)',
    en: 'Research Associate (Third-party Funded Project)',
  },
  'esther-kipnis': {
    de: 'Studentische Hilfskraft im Teilprojekt 1',
    en: 'Student Research Assistant in Subproject 1',
  },
  'dilara-yildirim': {
    de: 'Studentische Hilfskraft',
    en: 'Student Research Assistant',
  },
  'hannes-rothe': {
    de: 'Projektleitung Digitale Plattform (TP3), Lehrstuhlinhaber',
    en: 'Lead of Digital Platform (TP3), Chair Holder',
  },
  'daniel-courtney': {
    de: 'Wissenschaftlicher Mitarbeiter (TP3)',
    en: 'Research Associate (TP3)',
  },
  'laureen-warikoru': {
    de: 'Wissenschaftliche Mitarbeiterin (TP3)',
    en: 'Research Associate (TP3)',
  },
  'sumera-sajid': {
    de: 'Studentische Hilfskraft (TP3)',
    en: 'Research Assistant (TP3)',
  },
};

const orgOverrides: Record<string, { de: string; en: string }> = {
  'Universität Duisburg-Essen': {
    de: 'Universität Duisburg-Essen',
    en: 'University of Duisburg-Essen',
  },
  'Freie Universität Berlin': {
    de: 'Freie Universität Berlin',
    en: 'Freie University of Berlin',
  },
};

export function PersonProfile({ m }: { m: TeamMember }) {
  const { isDe } = useLanguage();
  const bioText = bioOverrides[m.slug]
    ? (isDe ? bioOverrides[m.slug].de : bioOverrides[m.slug].en)
    : m.bio;
  const roleText = roleOverrides[m.slug]
    ? (isDe ? roleOverrides[m.slug].de : roleOverrides[m.slug].en)
    : m.role;
  const orgText = orgOverrides[m.org]
    ? (isDe ? orgOverrides[m.org].de : orgOverrides[m.org].en)
    : m.org;

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <Card className="p-6 md:col-span-1">
            <div className="w-full aspect-square relative mb-4 bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
              <Image src={m.image} alt={m.name || `${m.firstName} ${m.lastName}`} fill className="object-cover" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{m.name || `${m.firstName} ${m.lastName}`}</h1>
            {m.degree && <p className="text-sm text-gray-500 mb-2">{m.degree}</p>}
            <p className="text-purple-700 font-medium">{roleText}</p>
            <p className="text-gray-600">{orgText}</p>
          </Card>

          <div className="md:col-span-2 space-y-6">
            {bioText ? (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-3">{isDe ? 'Bio' : 'Bio'}</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{bioText}</p>
              </Card>
            ) : null}

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">{isDe ? 'Kontakt' : 'Contact'}</h2>
              <ul className="text-gray-700 space-y-1">
                <li>
                  {isDe ? 'E-Mail' : 'Email'}: {m.email ? (
                    <a className="text-blue-700 hover:underline" href={`mailto:${m.email}`}>{m.email}</a>
                  ) : '—'}
                </li>
                {m.phone && (
                  <li>
                    {isDe ? 'Telefon' : 'Phone'}: <a className="text-blue-700 hover:underline" href={`tel:${m.phone}`}>{m.phone}</a>
                  </li>
                )}
                {m.room && <li>{isDe ? 'Raum' : 'Room'}: {m.room}</li>}
                {m.address && <li>{isDe ? 'Adresse' : 'Address'}: {m.address}</li>}
                {m.links?.length ? (
                  <li className="pt-2">
                    {isDe ? 'Weiterfuehrende Links' : 'Related links'}:
                    <ul className="list-disc list-inside text-blue-700">
                      {m.links.map((l) => (
                        <li key={l.url}><a className="hover:underline" href={l.url} target="_blank" rel="noreferrer">{l.label}</a></li>
                      ))}
                    </ul>
                  </li>
                ) : null}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

