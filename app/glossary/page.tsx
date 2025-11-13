'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Languages } from 'lucide-react';

const germanTerms = [
  {
    term: 'Akademische Teilhabe',
    definition: 'Teilhabe bedeutet Einbezogensein. Dazu gehört, Mit-Entscheiden, Mit-Erleben, Mit-Wissen und Mit-Machen zu dürfen. Bei akademischer Teilhabe bezieht sich das Einbezogensein auf alle Bildungsformen, gerade auf Universitäten und Hochschulen. Das bedeutet, dass du unabhängig von deinem Hintergrund Zugang zu Universitäten hast und am Universitätsleben beteiligt wirst.'
  },
  {
    term: 'BIPoC',
    definition: 'BIPoC ist eine Abkürzung. Lang heißt es: Black, Indigenous, and other People of Color. Es handelt sich um einen Sammelbegriff, mit dem sich nicht-weiße und/ oder von Rassismus betroffene Menschen selbst bezeichnen, also unter anderem Schwarze, indigene oder andere migrantisierte Personen.'
  },
  {
    term: 'Diversitätssensibel',
    definition: 'Diversitätssensibel zu sein bedeutet zu erkennen, dass die eigene Lebenswelt nur eine von vielen ist, also dass Menschen unter unterschiedlichen Bedingungen ihr Leben gestalten können und teilweise auch müssen. Lebensbedingungen, die sich zwischen Menschen unterscheiden können, sind z.B. Geld, Herkunft, Religion, Geschlecht, Sexualität usw.'
  },
  {
    term: 'Empowerment',
    definition: 'Das Wort "Empowerment" ist Englisch. Empowerment bedeutet: Sich selbst stark machen, eigenständig entscheiden zu können, sich stark fühlen, selbstbewusst handeln. Empowerment kann aus dir selbst herauskommen, aber du kannst dabei auch von anderen Menschen, einer Gruppe und/oder einem Programm unterstützt werden.'
  },
  {
    term: 'FLINTA*',
    definition: 'FLINTA* ist eine Abkürzung. Lang heißt es: Frauen, Lesben, intergeschlechlichtliche, nichtbinäre. transgeschlichtliche, agender Personen. Der angehängte Stern ist ein Platzhalter für alle Personen, die sich in keinem der Buchstaben wiederfinden. Es handelt sich bei FLINTA* also um einen Sammelbegriff für alle Personen, die aufgrund ihrer Geschlechtsidentität Sexismus und/oder Transfeindlichkeit ausgesetzt sind.'
  },
  {
    term: 'LGBTQIA+',
    definition: 'LGBTQIA+ ist eine Abkürzung. Lang heißt es: Lesben, Gays, Bi-Sexuelle, Transpersonen, Queers, Inter-Personen, Asexuelle. Das angehängte Plus ist ein Platzhalter für alle Personen, die sich in keinem der Buchstaben wiederfinden. Es handelt sich also um einen Sammelbegriff für alle Personen, die aufgrund ihrer Sexualität oder Geschlechtsidentität Sexismus, Transfeindlichkeit und/oder Homofeindlichkeit ausgesetzt sind.'
  },
  {
    term: 'Mentoring',
    definition: 'Beim Mentoring kommen eine erfahrene Person (Mentor*in) und eine unerfahrene Person (Mentee) zusammen. Der/die Mentor*in gibt dann deren Wissen an den/die Mentee weiter und steht dem*r Mentee beratend und unterstützend zur Seite.'
  },
  {
    term: 'Migrantisiert',
    definition: 'Dieser Begriff wird für Personen verwendet, denen aufgrund ihres Aussehens, ihrer Kultur, ihrer Religion oder anderer Merkmale ein Migrationshintergrund zugeschrieben wird. Diese Zuschreibung kann, aber muss nicht immer stimmen. Migrantisierung geht oft mit verschiedenen Formen von Rassismus einher.'
  },
  {
    term: 'Partizipation',
    definition: 'Partizipation und Teilhabe sind ähnliche Begriffe. Partizipation bedeutet die Beteiligung und Einbeziehung. Das bedeutet, dass sich Menschen aktiv an allen Entscheidungen beteiligen können, die ihr Leben beeinflussen.'
  },
  {
    term: 'Psychische Gesundheit',
    definition: 'Genauso wie dein Körper kann auch deine Psyche erkranken. Dann bist du zum Beispiel viel traurig und müde oder hast oft Angst. Du kannst dann Hilfe bei Fachleuten suchen. Diese Fachleute heißen Psychotherapeut*innen und helfen dir, dich um deine psychische Gesundheit zu kümmern.'
  },
  {
    term: 'Queer',
    definition: 'Man spricht das Wort kwier aus. Queer ist ein Sammelbegriff. Das bedeutet: Viele Menschen, die bi-sexuell, lesbisch, schwul, inter- oder transgeschlechtlich sind, nennen sich queer. Damit wollen sie zeigen, dass sie zusammen gehören und Teil einer Gemeinschaft sind.'
  },
  {
    term: 'Resilienz',
    definition: 'Resilienz ist die Fähigkeit, mental gesund zu bleiben, obwohl einem das Leben ganz schön zusetzt, z.B. durch großen Stress, eine Krise oder die Erfahrung von Diskriminierung.'
  },
  {
    term: 'Ressourcen',
    definition: 'Eine Ressource kann ein Mittel sein, mit dem man ein Ziel erreichen kann oder das einen stärkt und gut tut. Das können zum Beispiel Menschen in deinem Leben sein, Geld oder auch Eigenschaften von dir.'
  },
  {
    term: 'Storytelling',
    definition: 'Storytelling ist die Kunst des Geschichtenerzählens. Dabei werden Informationen oder Ideen durch eine Erzählung vermittelt. Diese Methode wird genutzt, um Emotionen zu wecken und verschiedene Lebensgeschichten sichtbar zu machen und miteinander zu verbinden.'
  }
];

const englishTerms = [
  {
    term: 'Academic participation',
    definition: 'Participation means being involved. This includes being allowed to participate in decision-making, sharing experiences, sharing knowledge, and sharing activities. In academic participation, involvement refers to all forms of education, especially at universities and colleges. This means that regardless of your background, you have access to universities and are involved in university life.'
  },
  {
    term: 'BIPoC',
    definition: 'BIPoC is an abbreviation. It stands for Black, Indigenous, and other People of Color. It is a collective term used by non-white people and/or people affected by racism to describe themselves, including Black, Indigenous, and other migrant people.'
  },
  {
    term: 'Diversity-sensitive',
    definition: 'Being diversity-sensitive means recognizing that your own life is only one of many, i.e., that people can shape their lives under different conditions. Living conditions that can differ between people include, for example, money, origin, religion, gender, sexuality, etc.'
  },
  {
    term: 'Empowerment',
    definition: 'The word "empowerment" comes from English. Empowerment means making yourself strong, feeling strong, acting confidently. Empowerment can come from within yourself, but you can also be supported by other people, a group, and/or a program.'
  },
  {
    term: 'FLINTA*',
    definition: 'FLINTA* is an abbreviation. It stands for: women, lesbians, intersex, non-binary, transgender, and agender persons. The asterisk is a placeholder for all people who do not identify with any of the letters. FLINTA* is therefore a collective term for all people who are exposed to sexism and/or transphobia because of their gender identity.'
  },
  {
    term: 'LGBTQIA+',
    definition: 'LGBTQIA+ is an abbreviation. It stands for lesbian, gay, bisexual, transgender, queer, intersex, and asexual. The plus sign is a placeholder for anyone who does not identify with any of the letters. It is therefore a collective term for all people who are exposed to sexism, transphobia, and/or homophobia because of their sexuality or gender identity.'
  },
  {
    term: 'Mentoring',
    definition: 'Mentoring brings together an experienced person (mentor) and an inexperienced person (mentee). The mentor then passes on their knowledge to the mentee and provides them with advice and support.'
  },
  {
    term: 'Mental health',
    definition: 'Just like your body, your mind can also become ill. When this happens, you may feel very sad and tired, or you may often feel anxious. You can seek help from specialists called psychotherapists.'
  },
  {
    term: 'Migrantized/ Minoritised',
    definition: 'These terms are used for people who are assumed to have a migrant background based on their appearance, culture, religion, or other characteristics. This assumption may or may not be accurate. Migrantization/ minoritization is often accompanied by various forms of racism.'
  },
  {
    term: 'Queer',
    definition: 'The word is pronounced kwier. Queer is a collective term. This means that many people who are bisexual, lesbian, gay, intersex, or transgender refer to themselves as queer. In doing so, they want to show that they belong together and are part of a community.'
  },
  {
    term: 'Resilience',
    definition: 'Resilience is the ability to stay mentally healthy even when life is tough, e.g., due to high levels of stress, a crisis, or experiencing discrimination.'
  },
  {
    term: 'Resources',
    definition: 'A resource can be a means by which you can achieve a goal. These can be, for example, people in your life, money, or even your own qualities.'
  },
  {
    term: 'Storytelling',
    definition: 'Storytelling is the art of telling stories. It involves conveying information or ideas through a narrative. This method is used to evoke emotions and make different life stories visible as well as connect them with one another.'
  }
];

export default function GlossaryPage() {
  const [activeTab, setActiveTab] = useState<'german' | 'english'>('german');

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg px-6 py-4 inline-block mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Glossar
              </h1>
            </div>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Wichtige Begriffe und Definitionen, die im Kontext des Building Bridges Projekts verwendet werden.
            </p>
          </div>

          {/* Language Tabs */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-white rounded-lg p-1 shadow-md border border-gray-200">
              <Button
                onClick={() => setActiveTab('german')}
                variant={activeTab === 'german' ? 'default' : 'ghost'}
                className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                  activeTab === 'german'
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Languages className="h-3 w-3 mr-1.5" />
                Deutsch
              </Button>
              <Button
                onClick={() => setActiveTab('english')}
                variant={activeTab === 'english' ? 'default' : 'ghost'}
                className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                  activeTab === 'english'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Languages className="h-3 w-3 mr-1.5" />
                English
              </Button>
            </div>
          </div>

          {/* German Section */}
          {activeTab === 'german' && (
            <section>
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg py-3">
                  <CardTitle className="text-lg font-bold flex items-center text-white">
                    <Languages className="h-4 w-4 mr-2" />
                    Deutsch
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-5">
                    {germanTerms.map((item, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                        <h3 className="text-lg md:text-xl font-bold text-purple-600 mb-2">
                          {item.term}
                        </h3>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                          {item.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* English Section */}
          {activeTab === 'english' && (
            <section>
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg py-3">
                  <CardTitle className="text-lg font-bold flex items-center text-white">
                    <Languages className="h-4 w-4 mr-2" />
                    English
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-5">
                    {englishTerms.map((item, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                        <h3 className="text-lg md:text-xl font-bold text-blue-600 mb-2">
                          {item.term}
                        </h3>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                          {item.definition}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}


