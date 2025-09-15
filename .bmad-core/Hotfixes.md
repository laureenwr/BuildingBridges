# Hotfixes → Project Plan

This plan operationalizes the listed hotfixes into actionable milestones, tasks, and acceptance criteria. It prioritizes stability (auth), compliance (BMBF/ESF Plus), and visible UX fixes, then delivers dashboard roles and workshop flows, and finally content creation tooling by November.

## Milestones & Timeline

1. Critical UX/Access Hotfixes (Immediate)
2. Compliance & Content Pages (Week 1)
3. Dashboard Roles & Workshops (Weeks 1–3)
4. Storytelling & Content Generation (by November)

## 1) Critical UX/Access Hotfixes (Immediate)

- [ ] Fix login robustness and user management
  - Harden edge cases; ensure reliable session handling; improve error states
  - Acceptance: All auth flows pass manual tests; no regressions; logged errors < 1% of logins

- [ ] Correct landing page button styles/text contrast
  - "Jetzt anmelden" text purple on appropriate background; "Kontakt aufnehmen" text visible (no white on white)
  - Also fix "workshops ansehen" button under Activity
  - Acceptance: All buttons meet WCAG AA contrast; hover/focus states consistent

- [ ] Make explainer video playable on landing page
  - Ensure asset loads, controls available, poster image set, fallback provided
  - Acceptance: Works in Chrome/Firefox/Safari; respects reduced motion

- [ ] Remove placeholder content under Activity
  - Replace with actual copy or hide section until content is ready
  - Acceptance: No placeholders visible

Dependencies: None; can run in parallel. Owner: FE lead. QA: Accessibility and cross-browser.

## 2) Compliance & Content Pages (Week 1)

- [ ] Implement BMBF/ESF Plus publicity guidelines
  - Use assets from `public/BMBF/`; ensure correct logo usage, placements, and attributions
  - Acceptance: Visuals match guideline PDF; internal review sign-off

- [ ] Partners page with correct partners, logos, descriptions
  - Collect missing logos; optimize assets (SVG/PNG); responsive layout
  - Acceptance: All listed partners present with accessible alt text and accurate descriptions

- [ ] Team page
  - Standardize fields (role, org, contact, bio); add provided entries (FU Berlin, SPI, UDE)
  - Acceptance: Team data renders consistently on mobile/desktop; no PII beyond approved fields

Dependencies: Branding assets and content. Owner: Content + FE.

## 3) Dashboard Roles & Workshops (Weeks 1–3)

- [ ] Public visibility for Activity/Workshops pages (adjust protection)
  - Update middleware/route guards to allow read-only public access
  - Acceptance: Pages viewable logged-out; authenticated features remain protected

- [ ] Workshops domain model and APIs
  - Define schema (workshops, sessions, enrollment); migrations via Drizzle; CRUD API
  - Acceptance: API e2e tested; DB constraints validated

- [ ] Admin dashboard
  - Manage workshops (CRUD), users (mentors/students), enrollments; role-based access
  - Acceptance: Admin can fully manage data; permission tests pass

- [ ] Mentor dashboard
  - Edit workshops they own; update schedules; capacity; materials
  - Acceptance: Mentors only see/edit owned workshops

- [ ] Student flows
  - Browse workshops; enroll/unenroll; see enrolled list
  - Acceptance: Enrollment state persists; conflict handling present

- [ ] Public workshop listing
  - Surface upcoming workshops on site; detail page per workshop
  - Acceptance: SEO-friendly pages; pagination/performance acceptable

Dependencies: Auth roles, DB migrations. Owner: Full-stack.

## 4) Storytelling & Content Generation (by November)

- [ ] Content generation pipeline
  - Integrate GPT API (or alternative) for content ideation (e.g., social posts)
  - Acceptance: Admin can draft content; outputs logged and editable

- [ ] Role model personas
  - Structure mentor self-presentation; persona schema; display on site
  - Acceptance: Persona cards render; mentors can manage their profiles

- [ ] Research assistant requirements document
  - Capture responsibilities around content/personas/workshops support
  - Acceptance: Approved spec shared internally

Dependencies: None. Owner: PM + FE + BE.

## Global Non-Functional Requirements

- Accessibility: WCAG AA contrast, focus states, keyboard navigation
- Performance: Respect `prefers-reduced-motion`; optimize media; Core Web Vitals thresholds
- Security: Preserve RBAC; avoid exposing protected data with public visibility changes
- QA: Cross-browser (Chrome/Firefox/Safari), device sizes

---
Original notes (reference)

9) Fix Login and make it more robust. 
cover all test cases and have better user management 


1) create a partners Page with the correct partners, logos and descriptions- 

2) michellanious tasks. Everythiing should be working and funtional. 

3) Buttons on landing page like "Jetzt anmelden" needs to have purple text and down below the I think it's the same button "Kontakt aufnehmen" also has white text on a white button which is the text not visible. under activity the "workshops ansehen" 


4) Kannst du noch meinen Namen eintragen unter Verbundpartner als Teilprojektleitung von TP2 analog zu Claudia und Hannes? Habe M.A., aber das muss nicht erwähnt werden. Mein Name reicht.


4) add a team Page with

Project Lead: FU berlin.
Klinische Kinder- und Jugendpsychologie und -psychotherapie und Hochschulambulanz für Kinder- und Jugendlichenpsychotherapie
Professorin
Leitung

AdresseHabelschwerdter Allee 45
Raum JK27/229
14195 Berlin
SekretariatMiriam Haldin
Telefon+49 30 838 585 70
Fax030 838 4 585 70
E-Mailclaudia.calvano@fu-berlin.de

M.Sc. Susanne Birnkammer
Kontakt
Zur Person
Forschung
Publikationen
birnkammers
Klinische Kinder- und Jugendpsychologie und -psychotherapie
Wissenschaftliche Mitarbeiterin
Doktorandin

AdresseHabelschwerdter Allee 45
Raum JK 27/228
14195 Berlin
Telefon+49 30 838 75634
E-Mailsusanne.birnkammer@fu-berlin.de

Dr.rer.medic. Felicia Boma Lazaridou
Kontakt
Zur Person
Photo 01
Klinische Kinder- und Jugendpsychologie und -psychotherapie
wissenschaftliche Mitarbeiterin (Drittmittelprojekt)
AdresseHabelschwerdter Allee 45
Raum JK 27/228
14195 Berlin
E-Mailfelicia.lazaridou@fu-berlin.de

B.Sc. Esther Kipnis
144218
Klinische Kinder- und Jugendpsychologie und -psychotherapie
studentische Hilfskraft (Drittmittelprojekt)
AdresseHabelschwerdter Allee 45
Raum JK27/227
14195 Berlin
Telefon+49 30 838 60184
E-Maile.kipnis@fu-berlin.de


from Mädea: 

Stiftung SPI
Andrea Niemann, Vorstandsvorsitzende/Direktorin
Seestraße 67
13347 Berlin

Telefon: 030 4597930
Fax: 030 45979366
E-Mail: info@stiftung-spi.de


Celiana Kiefer
Celiana Kiefer, M. A. Soziale Arbeit mit Forschungsschwerpunkt Kulturelle Bildung, Teil des Vorstands der BAG Mädchen*politik und seit vier Jahren tätig in der Mädchen*arbeit, aktuell in Ausbildung zur systemischen Beraterin (GST Berlin). Themenschwerpunkte: Mädchen*arbeit und -politik, Queerfeminismus, Rassismus, Klassismus, Intersektionalität, jugendpolitische Lobbyarbeit.

Nina

Zilan

From Uni due: 
Chairholder

Prof. Dr. Hannes Rothe
Room:
R09 R04 H27
Phone:
+49 201 18-32604
Email:
hannes.rothe (at) ris.uni-due.de
Consultation Hour:
on request
Social Media:
LinkedIn
Address:
Chair of Sustainability and Innovation in Digital Ecosystems
Rhine-Ruhr Institute of Information Systems
Faculty of Computer Science
University of Duisburg-Essen
Universitätsstraße 9
45151 Essen
Bio
Honours and Awards
Fields of Research
Projects
Publications
Editorships
Reviewing and consulting activities
Conferences
Memberships
Academic Duties
Bio:
I (he/him/his) am a dad of two, professor and Chair of Sustainability and Innovation in Digital Ecosystems at University of Duisburg-Essen, and head of the Place Beyond Bytes. I conduct teaching on Digital Innovation, Entrepreneurship, and Machine Learning. My fields of research are on the intersection of Digital Innovation & Entrepreneurship, Managing Digital Ecosystems, and Organizing Data & Knowledge.

My research has been published in leading journals such as Information Systems Research, Journal of the Association for Information Systems, Strategic Management Journal, European Journal on Information Systems, Information Systems Journal, and Communications of the Association for Information Systems. I was winner and runner-up of multiple awards, including the Claudio Ciborra Award for the most innovative paper in 2019. Complementary to my research, I have always been interested in supporting entrepreneurs in deep tech and science, and have been involved as mentor to numerous spin-offs and ventures.

Looking back, I co-founded the Digital Entrepreneurship Hub at Freie Universität Berlin. Before, I held positions as an associate professor for "Digital Transformation and Information Systems" at ICN Business School (Nancy, Paris, Berlin) and an assistant professor position for "Educational Service Engineering and IT Entrepreneurship" at Freie Universität Berlin. I have earned my doctoral degree at Freie Universität Berlin in 2015, where I was responsible for coordinating entrepreneurship education between 2013 and 2021. I have been a visiting researcher at University of Cambridge (UK) and TU Graz (Austria). 


Academic Staff

M.Sc. Elias Jelinek
Room:
R09 R04 H41
Email:
elias.jelinek (at) uni-due.de
Social Media:
LinkedIn
Address:
Chair of Sustainability and Innovation in Digital Ecosystems
Rhine-Ruhr Institute of Information Systems
Faculty of Computer Science
University of Duisburg-Essen
Universitätsstraße 9
45151 Essen
Bio
Bio:
Elias Jelinek studied Mechanical Engineering at the University of Duisburg-Essen, where he completed his master's on analyzing nanomaterials using neural networks. Alongside his studies, he founded the startup Diffusione, which focuses on generating AI-powered product images for the fashion industry and contributes to AI-related projects. Through this experience, Elias gained valuable insights into entrepreneurship, agentic AI and interdisciplinary collaboration.

His expertise spans through engineering and nanomaterial sciences, generative AI, agentic AI and computer vision and more. Elias is now joining Hannes Rothe's team as a research assistant, where he will work on the development of a peer-to-peer living platform and researching on scaling startups and reducing the time-to-MVP through templating.

Elias is passionate about emerging technologies and is eager to tackle new and exciting challenges.

Just Standardize it and make a team page. ASk for logos 


5) the video should be playable from the landingpage (not loading at the moment)


6) remove the placeholderbn under activity!

7) FOLLOW ALL GUIDELINES from BMBF_ESF Plus_Leitfaden_Publizitaet

Images are in the public/BMBF folder

8) very Important large Implementation: 

DASHBOARD So I need you to break this down into multiple sub steps, but basically in the dashboard there should be multiple roles. So we should have an admin account where we can create workshops, manage workshops and the users, so the students and the mentors. The mentors should be able to make changes to workshops. So this is like the big thing. The workshops need to be implemented, need to be able to make big changes to the workshops and students should be able to enroll in workshops. The workshop should then be shown on the site also. Right now, like the navbar, the pages like activity workshops and so on are protected by logging, which is not the case. This should be visible for everybody. Maybe we have to rework the workshop logic itself, but this needs to be implemented and this needs to be fast.




10) goals toill november: 

Alright, we should have some sort of content creation basics. For example a GPD API or this nano banana. I don't know, just connected in order to create content. For example for Instagram or other things. And also we should have like a some sort of storytelling aspect in there. I mean this was the goal and to work out the basics for this with role models. So the mentors should be able to present themselves to the students on the website and function as mentors. And therefore we have to generate personas with like role model kind of things. And we have to assess requirements for our new research assistance. Also requirements for this persona.



