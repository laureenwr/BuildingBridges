import Link from 'next/link';

export function LandingHero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100dvh-70px)] items-center overflow-hidden bg-gradient-to-br from-[#F5F0FF] via-[#EDE5FF] to-[#E8DCFF] px-6 pb-20 pt-24 sm:px-10"
    >
      <div
        className="pointer-events-none absolute -right-[200px] -top-[200px] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(145,82,255,0.18)_0%,transparent_68%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-60px] left-[3%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(181,128,255,0.15)_0%,transparent_68%)]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#9152FF] px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.09em] text-white shadow-[0_3px_14px_rgba(145,82,255,0.35)]">
            <span className="text-[0.45rem] opacity-60" aria-hidden>
              ●
            </span>
            Research Project 2024–2027 · Berlin · Duisburg-Essen
          </div>
          <h1 className="font-lora text-[clamp(2.6rem,4.5vw,4rem)] font-bold leading-[1.08] tracking-tight text-[#1A1033]">
            Building Bridges
          </h1>
          <p className="mt-5 max-w-[500px] text-lg font-semibold leading-relaxed text-[#6B5F8A]">
            Mentoring &amp; empowerment for girls and FLINTA* of Colour
          </p>
          <p className="mt-3 max-w-[500px] text-base leading-relaxed text-[#6B5F8A]">
            An interdisciplinary research and development project to empower girls and FLINTA* of color from the 10th
            grade onwards to participate in higher education and academic careers in the psychosocial field.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-full bg-[#9152FF] px-8 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_6px_24px_rgba(145,82,255,0.4)] transition hover:-translate-y-0.5 hover:bg-[#7339E0] hover:shadow-[0_10px_32px_rgba(145,82,255,0.5)]"
            >
              Register Now
            </Link>
            <Link
              href="/#about"
              className="inline-flex items-center justify-center rounded-full border-[1.5px] border-[#9152FF] bg-white px-8 py-3.5 text-[0.95rem] font-semibold text-[#9152FF] transition hover:bg-[#9152FF] hover:text-white"
            >
              Discover the Project
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-10">
            {[
              { n: '36', l: 'Months project duration' },
              { n: '3', l: 'Universities involved' },
              { n: '10+', l: 'Network partners' },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-lora text-[2.1rem] font-bold text-[#9152FF]">{s.n}</div>
                <div className="mt-0.5 text-[0.8rem] font-medium text-[#6B5F8A]">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden min-h-[420px] lg:block" aria-hidden>
          <div className="relative mx-auto h-[420px] max-w-md">
            <div className="absolute left-2.5 top-0 w-[310px] -rotate-3 rounded-[24px] border border-[rgba(145,82,255,0.15)] bg-[#9152FF] p-6 shadow-[0_12px_48px_rgba(145,82,255,0.18)] transition hover:translate-y-[-6px] hover:rotate-0">
              <div className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white/65">Dream Without Limits</div>
              <div className="font-lora text-lg font-bold text-white">Claim Your Space</div>
              <p className="mt-3 border-l-[2.5px] border-white/35 pl-3 text-[0.84rem] italic leading-relaxed text-white/80">
                Your voice and perspective are essential to the academic world. We provide the tools to help you take
                your seat at the table.
              </p>
            </div>
            <div className="absolute left-[130px] top-[90px] w-[295px] rotate-2 rounded-[24px] border border-[rgba(145,82,255,0.15)] bg-white p-6 shadow-[0_12px_48px_rgba(145,82,255,0.18)] transition hover:translate-y-[-6px] hover:rotate-0">
              <div className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#9152FF]">Lead the · Change</div>
              <div className="font-lora text-lg font-bold text-[#1A1033]">Build Your Future</div>
              <p className="mt-3 border-l-[2.5px] border-[rgba(145,82,255,0.4)] pl-3 text-[0.84rem] italic leading-relaxed text-[#6B5F8A]">
                Turn your aspirations into a roadmap. Whether it&apos;s higher education or a psychosocial career,
                your journey starts here.
              </p>
            </div>
            <div className="absolute bottom-2.5 left-8 w-[280px] -rotate-1 rounded-[24px] border border-[rgba(145,82,255,0.15)] bg-[#EDE5FF] p-6 shadow-[0_12px_48px_rgba(145,82,255,0.18)] transition hover:translate-y-[-6px] hover:rotate-0">
              <div className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#7339E0]">Own Your · Narrative</div>
              <div className="font-lora text-lg font-bold text-[#7339E0]">Stronger Together</div>
              <p className="mt-3 border-l-[2.5px] border-[rgba(145,82,255,0.4)] pl-3 text-[0.84rem] italic leading-relaxed text-[#7339E0]">
                Empowerment isn&apos;t a solo mission. Join a sisterhood of FLINTA* of Colour who are breaking barriers
                and building bridges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
