const goals = [
  { icon: '📋', title: 'Developing an MEP Program', body: 'Empowering BIPoC girls and FLINTA* through a needs-based, intersectionality-sensitive mentoring program.' },
  { icon: '🎓', title: 'Promoting Academic Careers', body: 'Promoting academic careers in the psychosocial field and strengthening the resources of M*oC for the path into science.' },
  { icon: '⭐', title: 'Creating Role Models', body: 'Integration of mentors and role models of colour to highlight successful educational biographies and empowerment.' },
  { icon: '🌐', title: 'Digital Platform', body: 'Creation of a participatory digital platform for context-sensitive storytelling and sustainable peer-to-peer exchange.' },
  { icon: '🔍', title: 'Research Barriers', body: 'Investigation of experiences of discrimination and barriers and conditions for increased participation in academic settings.' },
  { icon: '💪', title: 'Strengthening Resilience', body: 'Strengthening resilience and performance potential through the identification and activation of individual talents and resources.' },
];

export function LandingProgram() {
  return (
    <section id="program" className="bg-[#F2EEFF] px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-3 text-center text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">Project Goals</p>
        <h2 className="mb-14 text-center font-lora text-[clamp(2rem,3vw,2.6rem)] font-bold leading-tight tracking-tight text-[#1A1033]">
          Our main goals are to <em className="font-normal not-italic text-[#9152FF]">promote &amp; empower</em>
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((g) => (
            <article
              key={g.title}
              className="group relative overflow-hidden rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-8 shadow-[0_2px_12px_rgba(145,82,255,0.08)] transition hover:-translate-y-1 hover:shadow-[0_6px_28px_rgba(145,82,255,0.13)]"
            >
              <div className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#9152FF] to-[#B580FF] transition group-hover:scale-x-100" />
              <div className="mb-4 text-3xl">{g.icon}</div>
              <h3 className="font-lora text-lg font-bold text-[#1A1033]">{g.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-[#6B5F8A]">{g.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
