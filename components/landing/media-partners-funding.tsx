'use client';

import Image from 'next/image';
import { Play, Users, Target } from 'lucide-react';
import { FundingBanner } from '@/components/partners/FundingBanner';
import styles from './media-partners-funding.module.css';

const partners = [
  {
    name: 'Freie Universität Berlin',
    role: 'Projektleitung & Forschung',
    description: 'Gesamtkoordination, wissenschaftliche Leitung und Evaluation des Projekts unter Prof. Dr. Claudia Calvano.',
    logo: '/Projektpartner Logos/FU Berlin logo.png',
    alt: 'Freie Universität Berlin Logo',
  },
  {
    name: 'Stiftung SPI',
    role: 'MEP-Entwicklung',
    description: 'Praxisorientierte Entwicklung und Umsetzung des Mentoring- und Empowerment-Programms unter M.A. Celiana Kiefer.',
    logo: '/Projektpartner Logos/Stiftung SPI Logo.png',
    alt: 'Stiftung SPI Logo',
  },
  {
    name: 'Universität Duisburg-Essen',
    role: 'Digitale Plattform',
    description: 'Partizipative Entwicklung der digitalen Storytelling-Plattform unter Prof. Dr. Hannes Rothe.',
    logo: '/Projektpartner Logos/UDE_Logo.png',
    alt: 'Universität Duisburg-Essen Logo',
  },
];

export function MediaPartnersFunding() {
  return (
    <>
      <section className={styles.videoSection}>
        <div className={styles.inner}>
          <div className={styles.centerHeader}>
            <h2>Projekt Building Bridges erklärt</h2>
            <p>
              Erfahren Sie mehr über unser interdisziplinäres Forschungsprojekt zur Förderung von Mädchen und FLINTA* of Colour in
              akademischen Laufbahnen.
            </p>
          </div>

          <div className={styles.videoCard}>
            <div className={styles.videoFrame}>
              <iframe
                className={styles.videoIframe}
                src="https://www.youtube-nocookie.com/embed/txvwXWRwxyI"
                title="Erklärvideo: Building Bridges"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <div className={styles.videoMeta}>
              <p>Entdecken Sie die Vision und Ziele des Building Bridges Projekts</p>
              <div className={styles.metaRow}>
                <span>
                  <Play size={15} /> Projektübersicht
                </span>
                <span>
                  <Users size={15} /> Mentoring-Programme
                </span>
                <span>
                  <Target size={15} /> Forschungsziele
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className={styles.partnerSection}>
        <div className={styles.inner}>
          <div className={styles.centerHeader}>
            <h2>Projektpartner</h2>
            <p>Eine starke Allianz aus Universitäten, Stiftungen und Community-Organisationen</p>
          </div>

          <div className={styles.partnerGrid}>
            {partners.map((partner) => (
              <article key={partner.name} className={styles.partnerCard}>
                <div className={styles.partnerLogoWrap}>
                  <div className={styles.partnerLogoBox}>
                    <Image src={partner.logo} alt={partner.alt} fill className={styles.partnerLogo} />
                  </div>
                </div>
                <h3>{partner.name}</h3>
                <p className={styles.partnerRole}>{partner.role}</p>
                <p className={styles.partnerDescription}>{partner.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FundingBanner
        heading="Gefördert durch"
        logos={[
          { src: '/BMBF/LOGO%20Kit_BMBFSFJ/BMBFSFJ_gefoerdert_vom_deutsch_Web.svg', alt: 'BMBFSFJ – Gefördert vom (deutsch)', width: 220, height: 70, scale: 0.95 },
          { src: '/BMBF/EBF-Publikations-Kit/BG-EBF_Wortmarke.svg', alt: 'Rahmenprogramm Empirische Bildungsforschung – Wortmarke', width: 220, height: 70, scale: 0.9 },
          { src: '/BMBF/image copy 3.png', alt: 'EU-Flagge – Europäische Union', width: 220, height: 70, scale: 0.6 },
        ]}
      />
    </>
  );
}
