import { FundingBanner } from '@/components/partners/FundingBanner';
import { PartnerGrid } from '@/components/partners/PartnerGrid';

export default function PartnersPage() {
  const fundingLogos = [
    { src: '/BMBF/image.png', alt: 'BMBF – Bundesministerium für Bildung und Forschung', width: 200, height: 70 },
    { src: '/BMBF/image copy.png', alt: 'ESF Plus – Europäischer Sozialfonds', width: 200, height: 70 },
  ];

  const consortium = [
    { name: 'Freie Universität Berlin', logoSrc: '/logo_graphic.png', alt: 'Freie Universität Berlin', url: 'https://www.fu-berlin.de' },
    { name: 'Stiftung SPI', logoSrc: '/BMBF/image copy 2.png', alt: 'Stiftung SPI', url: 'https://stiftung-spi.de' },
    { name: 'Universität Duisburg-Essen', logoSrc: '/logo.png', alt: 'Universität Duisburg-Essen', url: 'https://www.uni-due.de' },
  ];

  const network = [
    { name: 'Schule mit Courage', logoSrc: '/logo_graphic_wide.png', alt: 'Netzwerk Schule mit Courage' },
  ];

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Partner</h1>
        <p className="text-gray-700 max-w-3xl mb-12">
          Unser Projekt wird durch öffentliche Fördermittel unterstützt und von einem starken Verbund aus Wissenschaft
          und Praxispartnern getragen. Nachfolgend finden Sie die Förderhinweise und unsere wichtigsten Partner.
        </p>
      </div>

      {/* Funding banner per Leitfaden: white background, correct logos */}
      <FundingBanner heading="Gefördert durch" logos={fundingLogos} />

      <PartnerGrid title="Verbundpartner" partners={consortium} />
      <PartnerGrid title="Netzwerkpartner" partners={network} />
    </main>
  );
}

