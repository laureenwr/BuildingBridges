import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, University, Users, FileText } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kontakt
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Haben Sie Fragen zum Building Bridges Projekt oder möchten Sie mehr über unsere Forschung erfahren? 
              Wir freuen uns auf Ihre Nachricht.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Send className="h-6 w-6 mr-2 text-purple-600" />
                  Nachricht senden
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Vorname</Label>
                    <Input id="firstName" placeholder="Ihr Vorname" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nachname</Label>
                    <Input id="lastName" placeholder="Ihr Nachname" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">E-Mail-Adresse</Label>
                  <Input id="email" type="email" placeholder="ihre.email@beispiel.de" />
                </div>
                
                <div>
                  <Label htmlFor="organization">Institution/Organisation</Label>
                  <Input id="organization" placeholder="Ihre Institution oder Organisation" />
                </div>
                
                <div>
                  <Label htmlFor="subject">Betreff</Label>
                  <Input id="subject" placeholder="Worum geht es?" />
                </div>
                
                <div>
                  <Label htmlFor="message">Nachricht</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Ihre Nachricht an das Building Bridges Team..."
                    rows={6}
                  />
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                  Nachricht senden
                  <Send className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Project Partners Contact Info */}
            <div className="space-y-8">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <University className="h-6 w-6 mr-2 text-purple-600" />
                    Projektleitung
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Freie Universität Berlin</h4>
                      <p className="text-gray-600">Fachbereich Erziehungswissenschaft und Psychologie</p>
                      <p className="text-gray-600">Univ.-Prof. Dr. Claudia Calvano</p>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-purple-600" />
                      <span>info@building-bridges.app</span>
                    </div>
                    <div className="flex items-start text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-purple-600 mt-1" />
                      <span>Habelschwerdter Allee 45<br />14195 Berlin</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <Users className="h-6 w-6 mr-2 text-blue-600" />
                    Projektpartner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900">Stiftung SPI</h4>
                      <p className="text-gray-600">Sozialpädagogisches Institut Berlin "Walter May"</p>
                      <p className="text-gray-600">Geschäftsbereich Lebenslagen, Vielfalt & Stadtentwicklung</p>
                      <p className="text-gray-600">Celiana Kiefer</p>
                      <p className="text-gray-600 text-sm">Praxisorientierte Entwicklung des MEP-Programms</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900">Universität Duisburg-Essen</h4>
                      <p className="text-gray-600">Fakultät für Informatik</p>
                      <p className="text-gray-600">Univ.-Prof. Dr. Hannes Rothe</p>
                      <p className="text-gray-600 text-sm">Entwicklung der digitalen Storytelling-Plattform</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-green-600" />
                    Für Medien & Presse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Für Presseanfragen und Medieninformationen zum Building Bridges Projekt 
                    wenden Sie sich bitte an unser Kommunikationsteam.
                  </p>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-green-600" />
                    <span>info@building-bridges.app</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Interesse am Projekt?
                  </h3>
                  <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
                    Das Building Bridges Projekt läuft von September 2024 bis August 2027. 
                    Wenn Sie als Teilnehmerin, Mentorin oder Kooperationspartnerin mitwirken möchten, 
                    freuen wir uns über Ihre Kontaktaufnahme.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Für Teilnehmerinnen</h4>
                      <p className="text-sm text-gray-600">
                        Mädchen und FLINTA* of Colour ab der 10. Klasse
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <University className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Für Mentorinnen</h4>
                      <p className="text-sm text-gray-600">
                        Studierende und Role Models of Colour
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Für Partner</h4>
                      <p className="text-sm text-gray-600">
                        Schulen, Organisationen und Institutionen
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
} 