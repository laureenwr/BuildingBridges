import Link from 'next/link';

export function LandingStorytelling() {
  return (
    <section
      id="storytelling"
      className="relative overflow-hidden bg-[#1A1033] px-6 py-24 text-white sm:px-10 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(145,82,255,0.18)_0%,transparent_70%),radial-gradient(ellipse_40%_60%_at_10%_80%,rgba(107,170,138,0.12)_0%,transparent_70%)]"
        aria-hidden
      />
      <div className="relative z-[1] mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#B580FF]">Story Creation Tool — TP3</p>
            <h2 className="font-lora text-[clamp(2rem,3vw,2.8rem)] font-bold leading-tight tracking-tight">
              A co-creative space for <em className="font-normal not-italic text-[#B580FF]">your story</em>
            </h2>
            <p className="mt-4 max-w-[420px] text-base leading-relaxed text-white/70">
              Explore the digital storytelling tool: guided steps, privacy controls, and optional AI support — developed
              with and for the community.
            </p>
          </div>
          <div className="rounded-[24px] bg-[#9152FF] p-8 text-white shadow-[0_12px_48px_rgba(145,82,255,0.18)]">
            <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-white/65">Story tool</p>
            <h3 className="font-lora text-xl font-bold">Create and share your story</h3>
            <p className="mt-3 text-[0.88rem] leading-relaxed opacity-80">
              A participatory space with optional AI support, built with the community.
            </p>
            <Link
              href="/story-tool"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-center font-primary text-[0.95rem] font-bold text-[#9152FF] shadow-md transition hover:bg-[#EDE5FF] sm:w-auto"
            >
              Open Story Creation Tool
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
