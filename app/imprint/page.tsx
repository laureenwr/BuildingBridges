'use client';

export default function ImprintPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">Impressum</h1>

        <div className="prose prose-gray max-w-none">
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            Building Bridges – Verbundprojekt aus Freie Universität Berlin, Stiftung SPI und
            Universität Duisburg‑Essen. Diese Website dient der Information über das Projekt.
          </p>

          <h3>Kontakt</h3>
          <p>
            E-Mail: info@building-bridges.example<br />
            Postanschrift: Habelschwerdter Allee 45, 14195 Berlin (Projektkoordination)
          </p>

          <h3>Verantwortlich für den Inhalt</h3>
          <p>
            Freie Universität Berlin – Professur Klinische Kinder- und Jugendpsychologie
            und -psychotherapie (Projektleitung): Univ.-Prof. Dr. Claudia Calvano
          </p>

          <h3>Haftungsausschluss</h3>
          <p>
            Für Inhalte externer Links übernehmen wir keine Haftung. Für den Inhalt der verlinkten
            Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>

          <h3>Urheberrecht</h3>
          <p>
            Die Inhalte dieser Seite sind urheberrechtlich geschützt. Eine Vervielfältigung oder
            Verbreitung bedarf der vorherigen Zustimmung.
          </p>
        </div>
      </div>
    </section>
  );
}


