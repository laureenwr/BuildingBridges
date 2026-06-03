'use client';

import { useLanguage } from '@/lib/hooks/useLanguage';

export default function ImprintPage() {
  const { isDe } = useLanguage();

  return (
    <section className="min-h-screen bg-[#F2EEFF] py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="mb-8 text-center font-lora text-4xl font-bold text-[#1A1033]">{isDe ? 'Impressum' : 'Imprint'}</h1>

        <div className="rounded-[24px] border border-[rgba(145,82,255,0.15)] bg-white p-8 shadow-[0_8px_32px_rgba(145,82,255,0.13)]">
          <div className="prose max-w-none prose-headings:font-lora prose-headings:text-[#1A1033] prose-p:text-[#6B5F8A] prose-li:text-[#6B5F8A]">
          <h2>{isDe ? 'Angaben gemäß § 5 TMG' : 'Information according to § 5 TMG'}</h2>
          <p>
            {isDe
              ? 'Building Bridges - Verbundprojekt aus Freie Universität Berlin, Stiftung SPI und Universität Duisburg-Essen. Diese Website dient der Information über das Projekt.'
              : 'Building Bridges is a joint project of Freie University Berlin, SPI Foundation, and the University of Duisburg-Essen. This website provides information about the project.'}
          </p>

          <h3>{isDe ? 'Kontakt' : 'Contact'}</h3>
          <p>
            {isDe ? 'E-Mail' : 'Email'}: team@buildingbridges.de<br />
            {isDe ? 'Postanschrift' : 'Postal address'}: Habelschwerdter Allee 45, 14195 Berlin ({isDe ? 'Projektkoordination' : 'Project coordination'})
          </p>

          <h3>{isDe ? 'Verantwortlich für den Inhalt' : 'Responsible for content'}</h3>
          <p>
            {isDe
              ? 'Freie Universität Berlin - Professur Klinische Kinder- und Jugendpsychologie und -psychotherapie (Projektleitung): Univ.-Prof. Dr. Claudia Calvano'
              : 'Freie University Berlin - Chair of Clinical Child and Adolescent Psychology and Psychotherapy (Project lead): Univ.-Prof. Dr. Claudia Calvano'}
          </p>

          <h3>{isDe ? 'Haftungsausschluss' : 'Disclaimer'}</h3>
          <p>
            {isDe
              ? 'Für Inhalte externer Links übernehmen wir keine Haftung. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.'
              : 'We assume no liability for the content of external links. The operators of linked pages are solely responsible for their content.'}
          </p>

          <h3>{isDe ? 'Urheberrecht' : 'Copyright'}</h3>
          <p>
            {isDe
              ? 'Die Inhalte dieser Seite sind urheberrechtlich geschuetzt. Eine Vervielfaeltigung oder Verbreitung bedarf der vorherigen Zustimmung.'
              : 'The content of this website is protected by copyright. Reproduction or distribution requires prior permission.'}
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}


