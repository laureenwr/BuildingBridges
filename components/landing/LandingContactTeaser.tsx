import Image from 'next/image';
import Link from 'next/link';

export function LandingContactTeaser() {
  return (
    <section id="contact" className="bg-[#F2EEFF] px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">Contact</p>
          <h2 className="font-lora text-[2.2rem] font-bold leading-tight tracking-tight text-[#1A1033]">
            Get in <em className="font-normal not-italic text-[#9152FF]">touch</em>
          </h2>
          <p className="mt-4 text-[0.97rem] leading-relaxed text-[#6B5F8A]">
            Do you have questions about the Building Bridges project? We look forward to hearing from you.
          </p>
          <div className="mt-8 flex flex-col gap-4">
            {[
              {
                logo: '/Projektpartner Logos/FU Berlin logo.png',
                title: 'Project management – FU Berlin (TP1)',
                lines: ['Univ.-Prof. Dr. Claudia Calvano', 'Habelschwerdter Allee 45, 14195 Berlin'],
                mail: 'claudia.calvano@fu-berlin.de',
              },
              {
                logo: '/Projektpartner Logos/Stiftung SPI Logo.png',
                title: 'SPI Foundation – MEP (TP2)',
                lines: ['MA Celiana Kiefer', 'Building Bridges c/o MÄDEA, Grüntaler Straße 21, 13357 Berlin'],
                mail: 'celiana.kiefer@lvs.stiftung-spi.de',
              },
              {
                logo: '/Projektpartner Logos/UDE_Logo.png',
                title: 'University of Duisburg-Essen – Platform (TP3)',
                lines: ['Prof. Dr. Hannes Rothe · Faculty of Computer Science', 'Universitätsstraße 9, 45151 Essen'],
                mail: 'hannes.rothe@ris.uni-due.de',
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-[18px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-5 shadow-[0_2px_12px_rgba(145,82,255,0.08)]"
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="relative h-9 w-[70px] shrink-0">
                    <Image src={b.logo} alt="" fill className="object-contain object-left" sizes="70px" />
                  </div>
                  <div className="text-[0.9rem] font-bold text-[#1A1033]">{b.title}</div>
                </div>
                <p className="text-[0.85rem] leading-relaxed text-[#6B5F8A]">
                  {b.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <a href={`mailto:${b.mail}`} className="mt-1 inline-block font-semibold text-[#9152FF] hover:underline">
                    {b.mail}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-8 shadow-[0_6px_28px_rgba(145,82,255,0.13)] sm:p-10">
          <h3 className="mb-6 font-lora text-2xl font-bold text-[#1A1033]">Send a message</h3>
          <p className="mb-6 text-[0.9rem] text-[#6B5F8A]">
            Use the contact form for detailed inquiries — we route messages to the right project partner.
          </p>
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#9152FF] py-4 font-primary text-[0.95rem] font-bold text-white shadow-[0_4px_18px_rgba(145,82,255,0.35)] transition hover:bg-[#7339E0] hover:-translate-y-px"
          >
            Open contact form →
          </Link>
        </div>
      </div>
    </section>
  );
}
