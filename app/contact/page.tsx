'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, University, Users, FileText } from 'lucide-react';
import { useLanguage } from '@/lib/hooks/useLanguage';

export default function ContactPage() {
  const { isDe } = useLanguage();

  return (
    <main className="min-h-screen bg-[#F2EEFF]">
      <div className="mx-auto max-w-[1280px] px-6 py-24 sm:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {isDe ? 'Kontakt' : 'Contact us'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isDe
                ? 'Haben Sie Fragen zum Building Bridges Projekt oder möchten Sie mehr über unsere Forschung erfahren? Wir freuen uns auf Ihre Nachricht.'
                : 'Do you have questions about the Building Bridges project or want to learn more about our research? We look forward to your message.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg border border-[rgba(145,82,255,0.15)]">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Send className="h-6 w-6 mr-2 text-purple-600" />
                  {isDe ? 'Nachricht senden' : 'Send message'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">{isDe ? 'Vorname' : 'First name'}</Label>
                    <Input id="firstName" placeholder={isDe ? 'Ihr Vorname' : 'Your first name'} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{isDe ? 'Nachname' : 'Last name'}</Label>
                    <Input id="lastName" placeholder={isDe ? 'Ihr Nachname' : 'Your last name'} />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">{isDe ? 'E-Mail-Adresse' : 'Email address'}</Label>
                  <Input id="email" type="email" placeholder={isDe ? 'ihre.email@beispiel.de' : 'your.email@example.com'} />
                </div>
                
                <div>
                  <Label htmlFor="organization">{isDe ? 'Institution/Organisation' : 'Institution/organization'}</Label>
                  <Input id="organization" placeholder={isDe ? 'Ihre Institution oder Organisation' : 'Your institution or organization'} />
                </div>
                
                <div>
                  <Label htmlFor="subject">{isDe ? 'Betreff' : 'Subject'}</Label>
                  <Input id="subject" placeholder={isDe ? 'Worum geht es?' : 'What is this about?'} />
                </div>
                
                <div>
                  <Label htmlFor="message">{isDe ? 'Nachricht' : 'Message'}</Label>
                  <Textarea 
                    id="message" 
                    placeholder={isDe ? 'Ihre Nachricht an das Building Bridges Team...' : 'Your message to the Building Bridges team...'}
                    rows={6}
                  />
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                  {isDe ? 'Nachricht senden' : 'Send message'}
                  <Send className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Project Partners Contact Info */}
            <div className="space-y-8">
              <Card className="shadow-lg border border-[rgba(145,82,255,0.15)]">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <University className="h-6 w-6 mr-2 text-purple-600" />
                    {isDe ? 'Projektleitung' : 'Project lead'}
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

              <Card className="shadow-lg border border-[rgba(145,82,255,0.15)]">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <Users className="h-6 w-6 mr-2 text-blue-600" />
                    {isDe ? 'Projektpartner' : 'Project partners'}
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

              <Card className="shadow-lg border border-[rgba(145,82,255,0.15)]">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-green-600" />
                    {isDe ? 'Für Medien & Presse' : 'For media & press'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {isDe
                      ? 'Fuer Presseanfragen und Medieninformationen zum Building Bridges Projekt wenden Sie sich bitte an unser Kommunikationsteam.'
                      : 'For press inquiries and media information about Building Bridges, please contact our communications team.'}
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
            <Card className="shadow-lg border border-[rgba(145,82,255,0.15)] bg-gradient-to-br from-purple-50 to-blue-50">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {isDe ? 'Interesse am Projekt?' : 'Interested in the project?'}
                  </h3>
                  <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
                    {isDe
                      ? 'Das Building Bridges Projekt läuft von September 2024 bis August 2027. Wenn Sie als Teilnehmende, Mentorin oder Kooperationspartnerin mitwirken möchten, freuen wir uns über Ihre Kontaktaufnahme.'
                      : 'The Building Bridges project runs from September 2024 to August 2027. If you would like to participate as a participant, mentor, or cooperation partner, we would love to hear from you.'}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{isDe ? 'Für Teilnehmende' : 'For participants'}</h4>
                      <p className="text-sm text-gray-600">
                        {isDe ? 'Mädchen und FLINTA* of Colour ab der 10. Klasse' : 'Girls and FLINTA* of Colour from grade 10 onward'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <University className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{isDe ? 'Für Mentorinnen' : 'For mentors'}</h4>
                      <p className="text-sm text-gray-600">
                        {isDe ? 'Studierende und Role Models of Colour' : 'Students and role models of colour'}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{isDe ? 'Für Partner' : 'For partners'}</h4>
                      <p className="text-sm text-gray-600">
                        {isDe ? 'Schulen, Organisationen und Institutionen' : 'Schools, organizations, and institutions'}
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