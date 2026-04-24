export function LandingAbout() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#9152FF] px-6 py-24 text-white sm:px-10 sm:py-28">
      <div
        className="pointer-events-none absolute -top-px left-0 right-0 h-[70px] bg-[#F2EEFF] [clip-path:ellipse(55%_100%_at_50%_0%)]"
        aria-hidden
      />
      <div className="relative z-[1] mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-12 pt-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-white/65">About the Project</p>
          <h2 className="font-lora text-[clamp(2rem,3vw,2.8rem)] font-bold leading-tight tracking-tight">
            Building <em className="font-normal not-italic text-[#EDE5FF]">bridges</em> to academic futures
          </h2>
          <p className="mt-5 text-[0.97rem] leading-[1.8] opacity-80">
            &quot;Building Bridges&quot; is a 36-month interdisciplinary research and development project that aims to
            empower and mentor girls and FLINTA* of color from the 10th grade onwards. The project is being carried out
            by the Free University of Berlin, the SPI Foundation, and the University of Duisburg-Essen.
          </p>
          <p className="mt-4 text-[0.97rem] leading-[1.8] opacity-80">
            The entire project is scientifically monitored by the Free University of Berlin. Interviews and
            questionnaires assess experiences of discrimination, mental health, stressors, resources, and academic
            participation.
          </p>
        </div>
        <div>
          <div className="mb-6 grid grid-cols-2 gap-4">
            {[
              ['36', 'Months project duration'],
              ['3', 'Universities involved'],
              ['10+', 'Network partners'],
              ['2027', 'Project end date'],
            ].map(([num, label]) => (
              <div
                key={label}
                className="rounded-[18px] border border-white/20 bg-white/10 p-5 transition hover:bg-white/[0.17]"
              >
                <div className="font-lora text-[2.4rem] font-bold text-[#EDE5FF]">{num}</div>
                <div className="mt-1 text-[0.83rem] opacity-65">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {[
              {
                icon: '🔬',
                t: 'Scientific Coordination (TP1)',
                d: 'Interviews & questionnaires assessing discrimination, mental health, and academic participation.',
              },
              {
                icon: '🤝',
                t: 'Mentoring & Empowerment (TP2)',
                d: 'Supporting BIPoC girls and FLINTA* from grade 10 with empowerment, self-care, and transition workshops.',
              },
              {
                icon: '💻',
                t: 'Digital Platform (TP3)',
                d: 'A participatory “living” platform for context-sensitive storytelling and peer-to-peer exchange.',
              },
            ].map((p) => (
              <div
                key={p.t}
                className="flex gap-4 rounded-[18px] border border-white/10 bg-white/[0.08] p-5 transition hover:bg-white/[0.13]"
              >
                <span className="mt-0.5 text-2xl">{p.icon}</span>
                <div>
                  <div className="text-[0.97rem] font-bold">{p.t}</div>
                  <p className="mt-1 text-[0.86rem] leading-relaxed opacity-72">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
