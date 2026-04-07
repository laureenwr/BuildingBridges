'use client';

import { useState } from 'react';
import styles from './story-events-contact.module.css';

const upcomingEvents = [
  { date: 'Wednesday, January 14, 2026 · 6:00 PM · Online', title: 'Online introductions to mentors', type: 'Networking & Exchange' },
  { date: 'January - November 2026', title: 'Individual Mentoring', type: 'Mentoring' },
  { date: 'March 2026', title: 'Mentoring Workshop II - Johanna Eck', type: 'Workshop' },
  { date: 'April 2026', title: 'Self Care I', type: 'Self-care' },
  { date: 'Saturday, April 25, 2026 · All day', title: 'Mentoring Workshop II - Vision', type: 'Vision & Goals' },
  { date: 'Friday, May 15, 2026', title: 'Self Care II', type: 'Self-care' },
];

const completedEvents = [
  { date: 'Friday, June 20-22, 2025', title: 'Basic Training Group I' },
  { date: 'Wednesday, October 8, 2025 · 1-4 PM', title: 'Introductory Workshop with Johanna Eck' },
  { date: 'Saturday, November 22, 2025', title: 'Opening Event' },
];

export function StoryEventsContact() {
  const [showPast, setShowPast] = useState(false);

  return (
    <>
      <section id="storytelling" className={styles.story}>
        <div className={styles.inner}>
          <div className={styles.eyebrow}>Story Creation Tool - TP3</div>
          <h2 className={styles.title}>A co-creative space for your story</h2>
          <p className={styles.lead}>
            A guided digital storytelling workflow where participants choose what to share, how to publish, and whether AI support is used.
          </p>

          <div className={styles.storyGrid}>
            <article className={styles.storyCard}>
              <h3>Story Creation Steps</h3>
              <ol>
                <li>Choose your story type</li>
                <li>Set the context</li>
                <li>Share your experience</li>
                <li>Add your empowerment message</li>
                <li>Choose how to publish</li>
              </ol>
            </article>

            <article className={styles.storyCard}>
              <h3>You are always in control</h3>
              <ul>
                <li>Privacy by default (draft first)</li>
                <li>Skip any sensitive step</li>
                <li>Decide whether to publish</li>
                <li>AI support is optional</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="events" className={styles.events}>
        <div className={styles.inner}>
          <div className={styles.eyebrowDark}>Training & Events</div>
          <h2 className={styles.titleDark}>Workshops and program activities</h2>
          <p className={styles.leadDark}>Upcoming dates for workshops, mentoring, networking, and project activities.</p>

          <div className={styles.eventGrid}>
            {upcomingEvents.map((event) => (
              <article key={`${event.date}-${event.title}`} className={styles.eventCard}>
                <span className={styles.eventType}>{event.type}</span>
                <h3>{event.title}</h3>
                <p>{event.date}</p>
              </article>
            ))}
          </div>

          <button className={styles.togglePast} onClick={() => setShowPast((prev) => !prev)}>
            {showPast ? 'Hide past workshops' : 'View past workshops'}
          </button>

          {showPast && (
            <div className={styles.pastGrid}>
              {completedEvents.map((event) => (
                <article key={`${event.date}-${event.title}`} className={styles.pastCard}>
                  <h4>{event.title}</h4>
                  <p>{event.date}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="register" className={styles.register}>
        <div className={styles.innerRegister}>
          <div>
            <h2>Become part of Building Bridges</h2>
            <p>
              Whether as a participant, mentor, or cooperation partner, we build bridges towards a more inclusive academic future together.
            </p>
          </div>
          <div className={styles.registerCards}>
            <a href="/sign-up" className={styles.regCard}>
              <strong>For Participants</strong>
              <span>Girls and FLINTA* of Colour from 10th grade onwards</span>
            </a>
            <a href="/sign-up" className={styles.regCard}>
              <strong>For Mentors</strong>
              <span>Students and role models of colour</span>
            </a>
            <a href="/contact" className={styles.regCard}>
              <strong>For Partners</strong>
              <span>Schools, organizations, and institutions</span>
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className={styles.contact}>
        <div className={styles.innerContact}>
          <div>
            <div className={styles.eyebrowDark}>Contact</div>
            <h2 className={styles.titleDark}>Get in touch</h2>
            <p className={styles.leadDark}>Do you have questions about the project? We look forward to hearing from you.</p>
            <div className={styles.contactBlocks}>
              <div className={styles.contactBlock}>
                <h4>Project Management - Free University of Berlin (TP1)</h4>
                <p>claudia.calvano@fu-berlin.de</p>
              </div>
              <div className={styles.contactBlock}>
                <h4>SPI Foundation - MEP Program (TP2)</h4>
                <p>celiana.kiefer@spi-berlin.de</p>
              </div>
              <div className={styles.contactBlock}>
                <h4>University of Duisburg-Essen - Digital Platform (TP3)</h4>
                <p>hannes.rothe@uni-due.de</p>
              </div>
            </div>
          </div>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <h3>Send a Message</h3>
            <div className={styles.formRow}>
              <input placeholder="First name" />
              <input placeholder="Last name" />
            </div>
            <input placeholder="Email address" type="email" />
            <input placeholder="Institution / Organization" />
            <select defaultValue="">
              <option value="" disabled>
                Select a topic
              </option>
              <option>General Inquiry</option>
              <option>Participation / Registration</option>
              <option>Mentoring Program (MEP)</option>
              <option>Research Collaboration</option>
              <option>Digital Platform / Story Tool</option>
            </select>
            <textarea placeholder="Your message..." rows={5} />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </>
  );
}
