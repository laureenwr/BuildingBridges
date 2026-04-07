'use client';

import Link from 'next/link';
import styles from './home-about-program.module.css';

const goals = [
  {
    icon: '📋',
    title: 'Developing an MEP Program',
    description:
      'Empowering BIPoC girls and FLINTA* through a needs-based, intersectionality-sensitive mentoring program.',
  },
  {
    icon: '🎓',
    title: 'Promoting Academic Careers',
    description:
      'Promoting academic careers in the psychosocial field and strengthening the resources of M*oC for the path into science.',
  },
  {
    icon: '⭐',
    title: 'Creating Role Models',
    description:
      'Integration of mentors and role models of colour to highlight successful educational biographies and empowerment.',
  },
  {
    icon: '🌐',
    title: 'Digital Platform',
    description:
      'Creation of a participatory digital platform for context-sensitive storytelling and sustainable peer-to-peer exchange.',
  },
  {
    icon: '🔍',
    title: 'Research Barriers',
    description:
      'Investigation of experiences of discrimination and barriers and conditions for increased participation in academic settings.',
  },
  {
    icon: '💪',
    title: 'Strengthening Resilience',
    description:
      'Strengthening resilience and performance potential through the identification and activation of individual talents and resources.',
  },
];

export function HomeAboutProgram() {
  return (
    <>
      <section id="home" className={styles.home}>
        <div className={`${styles.heroBlob} ${styles.heroBlobOne}`} />
        <div className={`${styles.heroBlob} ${styles.heroBlobTwo}`} />
        <div className={styles.homeInner}>
          <div>
            <div className={styles.badge}>Research Project 2024-2027 · Berlin · Duisburg-Essen</div>
            <h1 className={styles.title}>
              Mentoring and empowerment for girls and <em>FLINTA* of Colour</em>
            </h1>
            <p className={styles.subtext}>
              An interdisciplinary research and development project to empower girls and FLINTA* of color from the 10th grade onwards to
              participate in higher education and academic careers in the psychosocial field.
            </p>
            <div className={styles.actions}>
              <Link href="/sign-up" className={styles.btnPrimary}>
                Register Now
              </Link>
              <a href="#about" className={styles.btnSecondary}>
                Discover the Project
              </a>
            </div>
            <div className={styles.stats}>
              <div>
                <div className={styles.statNum}>36</div>
                <div className={styles.statLabel}>Months project duration</div>
              </div>
              <div>
                <div className={styles.statNum}>3</div>
                <div className={styles.statLabel}>Universities involved</div>
              </div>
              <div>
                <div className={styles.statNum}>10+</div>
                <div className={styles.statLabel}>Network partners</div>
              </div>
            </div>
          </div>
          <div className={styles.visual}>
            <div className={styles.cardStack}>
              <div className={styles.storyCardPrimary}>
                <div className={styles.cardTag}>Dream Without Limits</div>
                <div className={styles.cardTitle}>Claim Your Space</div>
                <div className={styles.cardQuote}>
                  Your voice and perspective are essential to the academic world. We provide the tools to help you take your seat at the table.
                </div>
              </div>
              <div className={styles.storyCardSecondary}>
                <div className={styles.cardTag}>Lead the Change</div>
                <div className={styles.cardTitle}>Build Your Future</div>
                <div className={styles.cardQuote}>
                  Turn your aspirations into a roadmap. Whether it is higher education or a psychosocial career, your journey starts here.
                </div>
              </div>
              <div className={styles.storyCardTertiary}>
                <div className={styles.cardTag}>Own Your Narrative</div>
                <div className={styles.cardTitle}>Stronger Together</div>
                <div className={styles.cardQuote}>
                  Empowerment is not a solo mission. Join a community of FLINTA* of Colour breaking barriers and building bridges.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className={styles.about}>
        <div className={styles.aboutInner}>
          <div>
            <div className={styles.sectionEyebrow}>About the Project</div>
            <h2 className={styles.sectionTitle}>
              Building <em>bridges</em> to academic futures
            </h2>
            <p className={styles.aboutText}>
              Building Bridges is a 36-month interdisciplinary research and development project that empowers and mentors girls and FLINTA* of
              colour from the 10th grade onwards. The project is carried out by the Free University of Berlin, the SPI Foundation, and the
              University of Duisburg-Essen.
            </p>
            <p className={styles.aboutText}>
              The project is scientifically monitored by the Free University of Berlin, assessing experiences of discrimination, mental health,
              stressors, resources, and academic participation through interviews and questionnaires.
            </p>
          </div>
          <div className={styles.aboutCards}>
            <div className={styles.statGrid}>
              <div className={styles.statBox}>
                <div className={styles.statBoxNum}>36</div>
                <div className={styles.statBoxLabel}>Months project duration</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statBoxNum}>3</div>
                <div className={styles.statBoxLabel}>Universities involved</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statBoxNum}>10+</div>
                <div className={styles.statBoxLabel}>Network partners</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statBoxNum}>2027</div>
                <div className={styles.statBoxLabel}>Project end date</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="program" className={styles.program}>
        <div className={styles.programInner}>
          <div className={styles.sectionEyebrowDark}>Project Goals</div>
          <h2 className={styles.sectionTitleDark}>Our main goals are to promote and empower</h2>
          <div className={styles.goalGrid}>
            {goals.map((goal) => (
              <article key={goal.title} className={styles.goalCard}>
                <div className={styles.goalIcon}>{goal.icon}</div>
                <h3>{goal.title}</h3>
                <p>{goal.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
