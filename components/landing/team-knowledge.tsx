'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import styles from './team-knowledge.module.css';

type KnowledgeTab = 'mental-health' | 'barriers' | 'resilience' | 'mep';

type GlossaryTerm = {
  term: string;
  en: string;
  de: string;
};

const teamGroups = [
  {
    id: 'TP1',
    title: 'Free University of Berlin - Scientific Coordination & Research',
    subtitle: 'Project management and scientific evaluation',
    members: [
      { name: 'Univ.-Prof. Dr. Claudia Calvano', role: 'Project Lead & Sub-project Management 1', photo: '/team/Claudia.png' },
      { name: 'M.Sc. Susanne Birnkammer', role: 'Research Assistant & Doctoral Candidate', photo: '/Susane.webp' },
      { name: 'Dr. rer. medic. Felicia Boma Lazaridou', role: 'Research Assistant (Externally Funded)', photo: '/Felicia.webp' },
    ],
  },
  {
    id: 'TP2',
    title: 'SPI Foundation - Mentoring & Empowerment Program',
    subtitle: 'Practice-oriented MEP development and implementation',
    members: [
      { name: 'MA Celiana Kiefer', role: 'MEP Program Lead · Sub-project Management 2', photo: '/Celiana.webp' },
      { name: 'Dilara Yildirim', role: 'Student Assistant', photo: '/Deli.jpg' },
    ],
  },
  {
    id: 'TP3',
    title: 'University of Duisburg-Essen - Digital Platform & Research',
    subtitle: 'Participatory platform development',
    members: [
      { name: 'Prof. Dr. Hannes Rothe', role: 'Project Management Digital Platform (TP3)', photo: '/Hannes.webp' },
      { name: 'M.Sc. Elias Jelinek', role: 'Research Associate (TP3)', photo: '/Elias.webp' },
      { name: 'M.Sc. Laureen Warikoru', role: 'Research Associate (TP3)', photo: '/Laureen.webp' },
    ],
  },
];

const knowledgeContent: Record<KnowledgeTab, { title: string; text: string }[]> = {
  'mental-health': [
    {
      title: 'Mental Health in the Psychosocial Field',
      text: 'Research-based insights on mental health challenges, protective factors, and participation in higher education.',
    },
    {
      title: 'Stressors in Studying',
      text: 'Overview of specific stressors experienced during school-to-university transitions and psychosocial studies.',
    },
    {
      title: 'Coping Strategies',
      text: 'Community-based and evidence-informed practices for managing pressure and maintaining wellbeing.',
    },
  ],
  barriers: [
    {
      title: 'Structural Barriers in Education',
      text: 'Systemic barriers affecting educational pathways for BIPoC girls and FLINTA*.',
    },
    {
      title: 'Experiences of Discrimination',
      text: 'Context-sensitive examples and findings on everyday and institutional discrimination.',
    },
    {
      title: 'Intersectionality & Identity',
      text: 'How overlapping identities interact and shape educational experiences.',
    },
  ],
  resilience: [
    {
      title: 'Protective Factors',
      text: 'Individual, social, and structural resources that improve resilience and wellbeing.',
    },
    {
      title: 'Strengths & Resources',
      text: 'Community-sourced strengths and practices that support academic success.',
    },
    {
      title: 'Success Stories',
      text: 'Inspiring educational pathways from participants and role models of colour.',
    },
  ],
  mep: [
    {
      title: 'About the MEP Program',
      text: 'Program structure, goals, and participation model for mentoring and empowerment.',
    },
    {
      title: 'Workshops & Activities',
      text: 'Overview of workshop formats including self-care, skills training, and networking.',
    },
    {
      title: 'Sign In / Login',
      text: 'Participants and mentors can access private dashboard spaces and storytelling tools.',
    },
  ],
};

const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'FLINTA*',
    en: 'FLINTA* stands for Female, Lesbian, Inter, Non-binary, Trans and Agender.',
    de: 'FLINTA* steht fur Frauen, Lesben, Intergeschlechtliche, Nicht-binare, Trans und Agender-Personen.',
  },
  {
    term: 'BIPoC',
    en: 'BIPoC stands for Black, Indigenous and People of Colour.',
    de: 'BIPoC steht fur Black, Indigenous und People of Colour.',
  },
  {
    term: 'Intersectionality',
    en: 'Intersectionality describes how identity dimensions overlap and shape lived experiences.',
    de: 'Intersektionalitat beschreibt, wie sich Identitatsmerkmale uberlagern und Erfahrungen pragen.',
  },
  {
    term: 'Empowerment',
    en: 'Empowerment is the process of strengthening self-determination, confidence, and collective agency.',
    de: 'Empowerment bezeichnet die Starkung von Selbstbestimmung, Selbstvertrauen und kollektiver Handlungsfahigkeit.',
  },
];

export function TeamKnowledge() {
  const [activeTab, setActiveTab] = useState<KnowledgeTab>('mental-health');
  const [activeTerm, setActiveTerm] = useState<GlossaryTerm | null>(null);

  const cards = useMemo(() => knowledgeContent[activeTab], [activeTab]);

  return (
    <>
      <section id="team" className={styles.team}>
        <div className={styles.inner}>
          <div className={styles.eyebrow}>Project Team</div>
          <h2 className={styles.title}>Meet the people behind Building Bridges</h2>
          <p className={styles.lead}>Three partner institutions - one shared mission.</p>

          {teamGroups.map((group) => (
            <article key={group.id} className={styles.group}>
              <div className={styles.groupHeader}>
                <span className={styles.badge}>{group.id}</span>
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.subtitle}</p>
                </div>
              </div>
              <div className={styles.memberGrid}>
                {group.members.map((member) => (
                  <div key={member.name} className={styles.memberCard}>
                    {member.photo ? (
                      <div className={styles.avatarImageWrap}>
                        <Image
                          src={member.photo}
                          alt={member.name}
                          width={84}
                          height={84}
                          className={styles.avatarImage}
                        />
                      </div>
                    ) : (
                      <div className={styles.avatar}>{member.name.charAt(0)}</div>
                    )}
                    <h4>{member.name}</h4>
                    <p>{member.role}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="knowledge" className={styles.knowledge}>
        <div className={styles.inner}>
          <div className={styles.eyebrowDark}>Information Platform</div>
          <h2 className={styles.titleDark}>Knowledge, resources and learning</h2>
          <p className={styles.leadDark}>
            A growing, living resource hub with multimodal content in accessible language in both German and English.
          </p>

          <div className={styles.tabs}>
            <button className={activeTab === 'mental-health' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('mental-health')}>
              Mental Health
            </button>
            <button className={activeTab === 'barriers' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('barriers')}>
              Barriers & Discrimination
            </button>
            <button className={activeTab === 'resilience' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('resilience')}>
              Resilience
            </button>
            <button className={activeTab === 'mep' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('mep')}>
              MEP Program
            </button>
          </div>

          <div className={styles.knowledgeGrid}>
            {cards.map((card) => (
              <article key={card.title} className={styles.kCard}>
                <h4>{card.title}</h4>
                <p>{card.text}</p>
              </article>
            ))}
          </div>

          <div className={styles.glossary}>
            <h3>Glossary - Key Terms Explained</h3>
            <div className={styles.termList}>
              {glossaryTerms.map((term) => (
                <button key={term.term} className={styles.term} onClick={() => setActiveTerm(term)}>
                  {term.term}
                </button>
              ))}
            </div>

            {activeTerm && (
              <div className={styles.popup}>
                <button className={styles.close} onClick={() => setActiveTerm(null)}>
                  x
                </button>
                <div className={styles.popupLabel}>{activeTerm.term}</div>
                <p>{activeTerm.en}</p>
                <p className={styles.popupDe}>DE: {activeTerm.de}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
