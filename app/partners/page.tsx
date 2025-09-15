import Image from 'next/image';
import { FundingBanner } from '@/components/partners/FundingBanner';
import Link from 'next/link';

export default function PartnersPage() {
  const fundingLogos = [
    { src: '/BMBF/image copy.png', alt: 'ESF Plus – Kombilogos (BMBF und EU)', width: 220, height: 70 },
    { src: '/BMBF/image copy 2.png', alt: 'ESF Plus – Programmlogo', width: 220, height: 70 },
    { src: '/BMBF/image copy 3.png', alt: 'BMBF – Wortmarke', width: 220, height: 70 },
    { src: '/BMBF/image.png', alt: 'EU-Flagge – Europäische Union', width: 220, height: 70 },
  ];

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Projektpartner</h1>
        <p className="text-gray-700 max-w-4xl mb-10">
          Building Bridges ist ein Verbundprojekt der Freien Universität Berlin, Stiftung SPI und Universität Duisburg‑Essen.
          Das Projekt wird im Rahmen eines ESF‑Plus‑Programms durch das Bundesministerium für Bildung und Forschung (BMBF)
          und die Europäische Union über den Europäischen Sozialfonds Plus (ESF Plus) gefördert.
        </p>
      </div>

      <FundingBanner heading="Gefördert durch" logos={fundingLogos} />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Verbundkoordination</h2>
          <article className="flex flex-col md:flex-row items-center gap-6 bg-white border border-gray-200 rounded-2xl p-6">
            <Image src={'/Projektpartner%20Logos/FU%20Berlin%20logo.png'} alt="Freie Universität Berlin" width={220} height={70} className="object-contain" />
            <div className="text-gray-700">
              <p className="font-semibold">Freie Universität Berlin (FUB)</p>
              <p>Verbundkoordination, Leitung TP1 (Prof. Dr. Claudia Calvano).</p>
              <Link className="text-blue-700 hover:underline" href="https://www.fu-berlin.de" target="_blank">Website</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="py-4">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Verbundpartner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="flex flex-col md:flex-row items-center gap-6 bg-white border border-gray-200 rounded-2xl p-6">
              <Image src={'/Projektpartner%20Logos/Stiftung%20SPI%20Logo.png'} alt="Stiftung SPI" width={220} height={70} className="object-contain" />
              <div className="text-gray-700">
                <p className="font-semibold">Stiftung SPI</p>
                <p>Leitung TP2; Entwicklung und Umsetzung Mentoring‑ & Empowerment‑Programm.</p>
                <Link className="text-blue-700 hover:underline" href="https://stiftung-spi.de" target="_blank">Website</Link>
              </div>
            </article>
            <article className="flex flex-col md:flex-row items-center gap-6 bg-white border border-gray-200 rounded-2xl p-6">
              <Image src={'/Projektpartner%20Logos/UDE_Logo.png'} alt="Universität Duisburg‑Essen" width={220} height={70} className="object-contain" />
              <div className="text-gray-700">
                <p className="font-semibold">Universität Duisburg‑Essen (UDE)</p>
                <p>Leitung TP3 (Prof. Dr. Hannes Rothe); Digitale Plattform, Forschung & Transfer.</p>
                <Link className="text-blue-700 hover:underline" href="https://www.uni-due.de" target="_blank">Website</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Praxis-/Kooperationspartner (optional: add when assets/approvals are ready) */}
    </main>
  );
}

