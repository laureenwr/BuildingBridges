# Building Bridges — development log

**Last updated:** 29 September 2026  
**Who this is for:** The project team (not only developers).  
**How dates work:** Dates come from **chat requests**, not from git. Several small changes were often **pushed together later**. This list is the real order of work.

**What this file covers:** The **whole website** (home, workshops, team, contact, login, stories, admin). Sections 1–3 are a snapshot of the **story feature today**. Section 4 is every small change we have in chat history from March 2026 onward.

---

## 1. Story feature — what’s built and working

- Public **Stories** and **Story Creation Tool** pages work.
- Readers can switch views: immersive, video, cards, timeline, quotes, globe, album. Same story, different look.
- Four **featured stories** (including Cairo to Charité) are always on the site. They were written by hand.
- Stories **approved** by staff also show in that same list.
- English and German labels exist.
- Anyone can open the story tool **without logging in**.
- People can **paste text** or **answer interview questions** (Talk with AI).
- They type a **title**, pick **mentor / participant / awareness**, and **edit chapters**.
- They must tick **consent**. Then **submit** saves the story as “waiting for review.” It is **not public** yet.
- Staff can **approve, reject, or delete** in the Admin portal. Approve can make it public.
- On Chrome/Edge, the interview **microphone** uses the browser’s own speech-to-text.
- After login, admins are meant to go to the **Admin portal**; others go to the **mentor/user portal**.

---

## 2. Story feature — known bugs or incomplete pieces

- Admin **pages** mostly check “are you logged in?”, not “are you an admin?” Approve/reject **does** check admin.
- Sign-up can still send an **Admin** role. Only one email is hard-coded as a platform admin.
- The tool still says **Under development**.
- **Summary** = first chapter. **Empowerment message** = last chapter.
- Grammar / title buttons talk to **OpenAI**, not university SAIA. They often fail.
- Talk with AI can fall back to **scripted questions** without saying so.
- Only Cairo has a **special globe**. Other stories use generic map points.
- Submitted stories usually have **no video**. Album “photos” are decorations, not uploads.
- Admin **settings**, invitation **emails**, and “this story belongs to this login” are not finished.

---

## 3. Story feature — hardcoded / fake vs real

- Featured stories = **hand-written**.
- Timeline / quotes / album / globe = **layouts**, not AI rewriting.
- Homepage sample “AI generator” = **splits sentences**. **Does not save.**
- Real save = `/story-tool`.
- Tags on submitted stories = from the **type** the person picked.

---

## 4. Every change (diary from chat)

Newest month first. Each bullet is a **separate request**. “Where is the file?” questions are left out unless they led to a change.

Jump: [Sep](#september-2026) · [Aug](#august-2026) · [Jul](#july-2026) · [Jun](#june-2026) · [May](#may-2026) · [Apr](#april-2026) · [Mar](#march-2026)

---

### September 2026

**29 Sep**

- Want a document of **previous versions** of the website — is that data somewhere?
- **Screenshots of all previous designs** (HTML mocks in `versions of web/` and prototypes).
- **Not those** — wanted the version **before** the April HTML look. Screenshots of the **February 2026** cover-image homepage plus older **2025** landings.
- Create **DEVELOPMENT-LOG.md** for the team (read-only, current story state).
- Document **every minor change**, keep it simple.
- Date from **chat history**, not git (several changes pushed at once).
- Then: this log was still **too short** compared to the work done — expand to the full website diary.

**28 Sep** (on this computer — not saved to git yet)

- Can AI **fix grammar while typing** and **suggest chapter names**?
- Yes: optional buttons (not live-as-you-type) — Fix grammar (Use this / Keep mine), Suggest chapter names, Suggest titles.
- **AI isn’t working** (local key missing, then live OpenAI key has **no credits**).
- **Do not add OpenAI billing.** Intended provider is university **SAIA / Academic Cloud** (`https://chat-ai.academiccloud.de/v1`). Old SAIA key expired 6 Sep 2026. Live site still has only `OPENAI_API_KEY`. **SAIA not switched on yet.**

**24 Sep** (later pushed together with other portal/story work)

- **Use this interface** for the story reader: full-screen overlay, icon rail, labelled layout icons.
- **Building Bridges logo** at top left, not a purple jot.
- **Cairo video** not aligned (portrait vs 16:9) — sit correctly in the video view.
- Live **Vercel build error** (`user is possibly null`) after a push — admin check treated as signed-in after the test passed.
- Asked to **push** that fix.
- Is voice-to-text an **AI API**? No — browser speech first; Whisper only if the browser cannot listen.
- How do designs work **without an LLM**? Layouts wrap **chapters you typed**. Featured stories are hand-written.
- What if a **new mentor pastes** a story? It used to fake-split into Origin / Journey / Challenges / Turning Point / Today.
- That’s **hardcoded / not good**. What to do? In easy words: let the person **edit chapters** (rename, split, merge, delete).
- **Do that.** Mentor type stays **Mentor**, not rewritten as researcher.
- **Not saved to git yet:** those editable chapters + the 28 Sep AI buttons.

**23 Sep** (later pushed with 24 Sep)

- Delete leftover test accounts; grant admin to **sumerasajid99@gmail.com** (colleague admin later). Story delete said **Unauthorized**.
- **Talk with AI:** add **voice to text**, and it should work.
- Long paragraph: mic only kept the **last two lines** — keep the whole recording.

**22 Sep** (later pushed together)

- **Talk with AI** interview instead of only pasting a transcript. Yes, add it.
- Old leftover **demo dashboard** still opened after login — delete it for real (it still appeared).
- Sometimes login felt **mentor**, sometimes **admin**. Make **which button is which** clear.
- Pasted a **labelled Dashboard menu** HTML — copy the **idea**, keep the **existing site look**.
- Hover colour **white**; remove dummy **Amina** preview; make portals **real**.
- Both roles still went to mentor — **one path for admin**. New registration should **create a real account**.
- Admin **still landed on mentor portal** — keep fixing redirect / JWT role.

**20 Sep** (pushed that day)

- After login, **Dashboard** still opened the **old demo admin page**. What’s it for? Confusing. Real admin is `/portal/admin`.
- Clean up / remove that leftover dashboard.
- **Push.**
- Dashboard after login **still** opened the old page — extra redirect so admin destination is not lost.
- Show / replace only the story-tool **“co-creative space” marketing steps** with a smaller HTML stepper. Same content, less bulky.
- **Push** that stepper.

**19 Sep**

- Want the **admin portal on the live site**, not only local (where should it live?).
- Login works, but then **`/portal` (mentor)** instead of Admin.
- **No** public “Login as Admin / Login as Mentor.” Roles stay: Admin → `/portal/admin`; Mentor/Student → `/portal`.
- Make live account **sumerasajid99@gmail.com** an admin (Production had zero admins).
- Focus: Story Tool → submit → Admin review → **publish to public Stories**.
- Pending stories visible; **Approve** still broken — fix so approve actually publishes.
- Test the **whole flow locally** before push (no extra features).
- Want to **delete** a test story.
- Delete must be **in the admin screen**, not only via Cursor (colleagues need it).
- **Delete button** hard to see — make it visible.
- Profile dropdown (account / workshops / settings / logout) **half hidden** under the bar.

**18 Sep**

- **Ignore n8n.** Website should work: Participant → Story Tool → Submit → Admin → Publish.
- Inspect that path; check live database / `stories` table (no extra features that day).
- Confirm how Production database was checked; safest way to create `stories` on Production if missing.

**17 Sep**

- Check Neon **local vs live** (which URL, which branch).
- Read-only check: does Production have `public.stories`?

**16 Sep**

- Add upcoming workshop **“Wege nach der Schule”**.
- English language toggle must show the **English** description.

**10 Sep** (many small asks; later one big website push)

- Generate **Cairo globe** story code for the team / flyers.
- Flyer brief: **colours and website info** for pamphlets.
- Where is the **logo** (and other logos).
- **Replace Cairo globe** with the exact pasted HTML (same request sent many times — one change).
- Move **31 July storytelling workshop** to archived (done).
- On globe story, **remove** “Build your ideal story” (memory / card / place checkboxes).
- Workshop section: **no upcoming workshop** at that moment — correct the list.

**9 Sep**

- Generate the **globe** story-format section code.

**4 Sep**

- List exact **website colour codes** for a workshop flyer (primary, accents, backgrounds).

**1 Sep**

- Couldn’t find screenshot files on the PC — show where they are.
- **Cairo to Charité:** replace the story **card** with a **video** you will upload.
- Where to upload (`public/`).
- Video should sit in the **video** layout, not replace the Community Stories heading.
- Pippit logo on the video: OK if no copyright problem.
- **Globe animation isn’t good** — replace with pasted HTML globe.

---

### August 2026

**27 Aug**

- WP 3.2 eval write-up: **which screenshot under which section** (one screenshot per section, not a dump).

**23 Aug**

- Screenshots of **every page** of the live site.
- Where to see the captured files.
- Help write whether the website follows **WP 3.2** principles (formative evaluation, July 2025–Feb 2027).
- Where to see that file.

**22 Aug** (live story submit)

- Check if `/api/stories/submit` exists and whether it is **on main**.
- **Commit and push** that route (don’t change the code).
- Vercel: missing `stories` export — **fix and push**.
- n8n: consent must be **true/false**, not the word “yes”.
- **401 Unauthorized** — inspect which header/key the API expects (`STORIES_API_KEY` / `x-api-key`).
- **500 Failed to submit** from live site — inspect body and logs.
- Live DB error: **`stories` table missing** on the database the site was using — SQL to create it (approval needed for Production).
- Table **does** exist in one Neon check, but the app still said missing — which connection is Vercel using?
- Temporary logging of **host + database name only** (never passwords). **Deploy it.**
- Extra diagnostics (`current_user`, `search_path`, does `public.stories` exist). Then investigate remaining 42P01.

**20 Aug**

- Check submit route exists and git status (local vs pushed).

**19 Aug**

- Temporary: change admin email in **dev** DB to another address to test password reset / stories.
- Look for a dummy login / preview bypass to skip auth — **not used**; real login kept.
- Where is **n8n** in this repo? Confirmed: **no n8n in the website**. Intended n8n was an outside idea.

**18 Aug** (story backend started — many small steps the same evening)

- How to **store stories**: mentor interview **or** mentee self-serve tool (optionally with AI).
- Questions only at first (don’t build yet): is this Next.js the only backend? Then site overview for the team. Then each component of the website.
- Contact form: where SMTP lives; what “from” address (inspect only).
- Build **stories table** + API so an outside tool (n8n) can POST finished stories.
- Run **migration** so the table exists on the **dev** database.
- No local Docker Postgres — use **cloud Neon** for local; paste `DATABASE_URL` into env files; run migrate.
- Why does the app still connect to **localhost**? Prefer cloud URL when set. Want to test submit on **Vercel** (no ngrok).
- Status report of automation (don’t change files).
- Make **existing Admin story review real** (replace dummy list). Do **not** create a new portal. Do **not** redesign. Do **not** change Story Tool / public stories / n8n / AI yet.
- How is `/portal/admin` protected? Where is `dummyStoriesForReview`? Reuse login; change the existing table.
- Implement review like **workshops** server actions.
- Next: connect **existing Story Tool** to **existing submit API** (no second tool, no redesign).
- Submit works; **Approve** says only admins — account was **STUDENT**. Promote **only** `sumerasajid99@gmail.com` to **ADMIN** on **dev** (one row).
- Forgot password. Inspect reset flow (don’t change password yet).
- Reset failed: missing `verification_tokens` table; NextAuth **JWE** error.
- Fix **local** `NEXTAUTH_SECRET` only.
- Still missing `verification_tokens` — inspect, then finish reset **email** using existing **SMTP / Nodemailer** (not Resend, no new packages).
- Diagnose reset email fail (550 / SMTP) with **safe logs only** (no secrets). Temporary diagnostic in catch block.

---

### July 2026

**24 Jul**

- Co-creation **interviews** opened in a small box — want **full-screen** (HTML prototype).
- Also: use the **album** style from that file; **add globe**; improve the reader overall.

**20 Jul**

- Contact form: even when send **succeeds**, the page still shows **“We could not send your message”** — fix the success/error message.

**19 Jul**

- Does contact send to an email? Will testing work? Are **SMTP variables** set?
- Still “could not send” — will it work **live**? Should we **push**?
- Where is `.env.local`? Show contact route env usage (inspect).

**16 Jul**

- Guide on **n8n** for co-creation (advice only).
- Contact: **not receiving** emails — check and **fix**.
- Temporarily send contact to **personal email** for testing, then switch back to `building.bridges@ewi-psy.fu-berlin.de`.
- Switch contact **back to Nodemailer/SMTP** (away from Resend). Keep all form fields. Recipient for testing as specified.
- Where is **DNS** for `building-bridges.app`? Check nameservers (Vercel vs other).
- Add Resend **domain TXT** via Vercel CLI (DKIM).

**14 Jul**

- Update **upcoming** Building Bridges flyer: new **31 July** English and German files.
- **Funded by:** use one **Partners logo** image so logos aren’t arranged by hand. Proper size, not a tiny banner.

**13 Jul**

- Put new flyers in a **separate folder** (updated flyers). Can PDFs be uploaded? Where?
- Team request (Celiana): more flyers from the archive; **descriptions must match** flyers (`Infos TP für Webseite`); add missing **funding programme** text on the funded-by logos.
- Workshop **detail modal**: click card / “View workshop” opens an animated panel (not a new tab). **Do not** change the card grid look. Buttons: Join workshop + View flyer.
- Add mentee interview transcript to the **interview** section; title **“Holding on to my own measure”**.

**9 Jul**

- Contact: try **Resend HTTP API** instead of Nodemailer (`RESEND_API_KEY`, to project email, from onboarding, reply-to sender). Same validation.

**8 Jul**

- Where is the **logo without background**.

**3 Jul**

- Is there a **database** for workshops and interviews?

**2 Jul**

- Recreate/confirm `app/api/contact/route.ts` (POST name, email, message).
- Env template for mail.
- Temporarily send contact to **personal Gmail** until domain is verified.

---

### June 2026

**30 Jun**

- Status report for someone else (framework, contact, etc.).
- Where is the **BMBFSFJ** logo.

**25 Jun**

- Can we upload a **PDF** flyer (with a link on it)?
- Replace **online workshop TP3** with updated **English and German** versions. **Join workshop** → Google Form.
- German flyer not visible — fix.
- Contact address: `info@building-bridges.app` → **`building.bridges@ewi-psy.fu-berlin.de`**.
- **View workshop** must **not** go to the contact form.

**19 Jun**

- Colours used on the site.
- Where to add another **workshop flyer**.
- Where is the **funded-by** logo.
- Use **BMBFSFJ_gefoerdert_vom_deutsch_Web**; add **online workshop TP3** flyer; Self-Care is done — remove it from “next up”.
- Still showing Self-Care as next — **fix**.
- Clean **workshop offerings** list (old Frühlingsfest / mentoring dates still showing).
- Contact had **no backend** — send to `sumera.sajid@uni-due.de` end to end.
- Send still fails — Nodemailer + Gmail SMTP env vars + **error logging**.

**11 Jun**

- Where do **register** and **contact** data go? Neon / users table / how to see who registered on the live site.
- Co-creation will need login: add **preview / under development** on that section (existing preview stays below).
- Couldn’t see the change — where to check (`/story-tool`).

**10 Jun**

- Can’t see **admin and user dashboard** options that used to sit under the first homepage section.

**2 Jun**

- Full **German (DE) audit**: no redesign — only fix missing/broken translations, umlauts, leftover English.

---

### May 2026

**7 May**

- Run **admin portal** to look at it.
- **Vision** link went to About the project — link Vision to the real Vision page/section.
- Vision still German + old design — match **current** design; English content provided; then **EN/DE toggle** on Vision.
- Accidental **old version** link — fix again.
- **Join us** button old style — match the rest of the site.
- Site-wide **EN/DE**: umlauts, natural German, toggle **not working** — fix; then German cleanup pass; rewrite German to sound natural.
- Toggle still broken; also make it work on **admin** and **mentor/mentee** portals.

**6 May**

- Create `public/workshops/`.
- Pasted workshop data — **make it visible**.
- Redesign **Workshops & Events** (mobile-inspired, Building Bridges look, not a copy of the reference screenshot).

**5 May**

- Homepage clutter: **one Dashboard** button only; remove extra dashboard links from navbar and hero; keep Discover / Register.
- Redesign **Workshop / Events** with archived **flyer images**, not PDF-only lists.
- Homepage workshop block **too large** — compact teaser (2–3 cards), full archive on `/workshops`.
- Teaser looked **empty** (missing flyer images, huge blank cards) — polish compact teaser.

---

### April 2026

**29 Apr**

- Claudia / Celiana bios still hardcoded German — toggle + **Felicia** profile link; Sumera title **research assistant**.
- Team **titles still German** when EN is on.
- Team order: **Hannes, Daniel, Laureen, Sumera**.
- Redesign **#events** to a pasted HTML structure (keep content, change look).
- Home should keep a **button to workshops**, like before.
- Footer **Legal** + About the project text hardcoded German — toggle.
- **Imprint, privacy, terms** hardcoded German — toggle.
- Those pages: odd **Join now** — use normal buttons; fix text and colours.
- Add **Bavaria mentor** story to published stories (HTML).
- Home **cover half-sized** — fill the viewport.

**28 Apr**

- Remove **“How helpful was this section?”** feedback.
- Remove **TP Universities & partners** strip (FU / SPI / UDE).
- From storytelling, remove **AI-supported technical toolkit** marketing block.
- Add **Egyptian mentor (Cairo)** story into storytelling (HTML).
- **Navbar and footer** must go to the same places (Vision went to an old page). Dropdowns must **stay open**. Contact us must go to contact.
- Design tokens / colours for other prototype tools.
- Make **workshop section** like a pasted design.
- **Project progress** duplicated — remove from homepage (keep on workshops).
- Team section **hardcoded German**.
- Team bios: Sumera, Hannes, Daniel (text); **profile** links (label “profile”, not “UDE profile”); bios still English when DE — toggle each card.

**24 Apr** (HTML design incorporation — many homepage asks)

- Incorporate a full **HTML homepage design** (purple `#9152FF`, Sora/Lora, etc.).
- Hero too long: storytelling becomes a **teaser card** → `/story-tool` (“Create and share your story”).
- Front-page **text like a screenshot**.
- Main heading **Building Bridges** (not “Mentoring & empowerment…” as the H1).
- Cover image in hero; remove “claim your space” boxes; second section = scientific coordination / mentoring / digital platform (not repeating duration/universities); **explain video** centred; TP3: remove Elias, add **Daniel** and **Sumera** with photos; knowledge section updates (same request).
- Photos added under Teams — wire them.
- Home fonts back toward **previous** look but **keep cover image**; restyle **Get in touch** (numbered TP cards, CTA bar).
- **About the project** like a screenshot.
- **Fonts coherent** across the site.
- Homepage workshops **too much** — button to **all workshops**.
- Team card click **errored** — show a short bio (text later).
- Replace a **logo** (where to paste); then **logo without background** instead of a photo copy.
- EN/DE not working on **Trainings & Events** — still German when EN — fix.
- About the project **too static**.
- EN/DE not working on **homepage**.

**22–23 Apr** (other chats, same redesign wave)

- Team photos **larger**; not tiny circles — large **rectangular** photos.
- Navbar: Vision / Goals / timeline **wrong targets**; Partners page; funded logo **bigger** in the card.
- **Story Tool** links: `/story-tool` not old `#story` / `#storytelling`.
- Navbar **merge conflict** markers broke the site — fix so the app can run.
- Inner pages still **old navbar** — same navbar, language toggle, footer, theme on workshops / events / team.
- Workshops page **German only** — toggle EN/DE.
- **Project Timeline** vs **Workshops** navbar mix-up; Sign in / Sign up must hit existing routes.
- Sign-in / sign-up still German when EN is on.
- Team bios mix “I am” / “She is” — third person; team + **contact page** language toggle.

**20 Apr**

- Add **cover image** to the first homepage section (`coverimage.png` behind the mentoring text).
- Hydration error after that — fix.
- How to **upload** an image.
- Team TP3: add **Sumera Sajid** (student assistant).
- Team images not filling boxes — width/height, not tiny circles.
- Add Sumera photo; replace **Elias** with **Daniel** + photo + intro.

**9 Apr**

- Team member photos **larger**.
- Can a new **HTML prototype** be applied to the current site? (Yes — later incorporated.)

---

### March 2026

**13 Mar**

- Story Creation **Generate** path pointed at university **Academic Cloud / SAIA** (`chat-ai.academiccloud.de`) — this is the intended AI, not paid OpenAI. (Later work used OpenAI by default; SAIA is **not** on the live site now.)

---

## 5. Not started yet

- My Stories / Messages / Community / Resources inside the portal (placeholders).
- Separate mentee-only dashboard.
- Real **account** approve/reject.
- “This story belongs to **this** logged-in person.”
- **SAIA / Academic Cloud** instead of paid OpenAI (waiting for a **new** SAIA key).
- Custom map or photo album per new story.
- Admin settings (emails, guidelines).
- Evaluation widgets on the live site.
- **n8n** inside this website (outside idea only; site works without it).

---

## Bottom line

The public site was rebuilt around the **April 2026** purple HTML look (cover image, team, workshops, EN/DE). Contact mail, flyers, and story **submit → review → publish** were added in summer. Layouts only **display** what was entered. Featured stories are **hand-written**. AI extras are **optional and often off**. Admin screens are **not fully locked**. This is a **working prototype**.
