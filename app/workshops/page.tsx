"use client";

import { useEffect, useState } from 'react';
// Client page (fetches via API)
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, MapPin, Star, ArrowRight, BookOpen, Code, Lightbulb, Target, GraduationCap, Heart, Globe, Award, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
async function fetchWorkshopsClient() {
  try {
    const res = await fetch(`/api/workshops`, { cache: 'no-store' });
    if (!res.ok) return [] as any[];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [] as any[];
  }
}

const mepPrograms = [
  {
    id: 1,
    title: "Mentoring & Empowerment-Programm (MEP)",
    description: "Potentialorientiertes, diversitätssensibles und intersektionales Coaching für Mädchen und FLINTA* of Colour.",
    startDate: "September 2024",
    duration: "12 Monate",
    format: "Hybrid (Online & Präsenz)",
    participants: "Begrenzte Teilnehmerinnenanzahl",
    location: "Berlin & Online",
    focus: "Psychosoziale Berufsfelder",
    type: "empowerment",
    highlights: [
      "Individuelle Potentialentfaltung",
      "Diskriminierungssensibles Coaching",
      "Mentoring durch Role Models of Colour",
      "Resilienzstärkung"
    ]
  },
  {
    id: 2,
    title: "Digital Storytelling Workshop",
    description: "Partizipative Entwicklung audiovisueller Erfahrungsberichte und Bildungsbiografien.",
    startDate: "Frühjahr 2025",
    duration: "6 Monate",
    format: "Hybrid",
    participants: "20-25 Teilnehmerinnen",
    location: "UDE & Online",
    focus: "Digitale Medienkompetenzen",
    type: "digital",
    highlights: [
      "Storytelling-Techniken",
      "Audiovisuelle Medienproduktion",
      "Peer-to-Peer-Austausch",
      "Plattform-Mitgestaltung"
    ]
  },
  {
    id: 3,
    title: "Akademische Laufbahnberatung",
    description: "Beratung und Unterstützung für den Übergang zu Hochschulbildung und akademischen Karrieren.",
    startDate: "Laufend",
    duration: "Individuell",
    format: "1:1 Beratung",
    participants: "Nach Bedarf",
    location: "FU Berlin & Online",
    focus: "Hochschulzugang",
    type: "academic",
    highlights: [
      "Studienberatung",
      "Bewerbungsunterstützung",
      "Netzwerkaufbau",
      "Laufbahnplanung"
    ]
  }
];

const researchActivities = [
  {
    title: "Diskriminierungsforschung",
    description: "Untersuchung von Diskriminierungserfahrungen und Barrieren im Bildungsbereich.",
    participants: "Schülerinnen & Studentinnen",
    method: "Mixed-Methods",
    icon: Target
  },
  {
    title: "Resilienzstudien",
    description: "Erforschung von Schutzfaktoren und Resilienzressourcen bei M*oC.",
    participants: "MEP-Teilnehmerinnen",
    method: "Längsschnittstudie",
    icon: Heart
  },
  {
    title: "Partizipative Evaluation",
    description: "Gemeinsame Bewertung und Weiterentwicklung des MEP-Programms.",
    participants: "Alle Beteiligten",
    method: "Partizipativ",
    icon: Users
  }
];

export default function WorkshopsPage() {
  const [dbWorkshops, setDbWorkshops] = useState<any[]>([]);
  const [showPastWorkshops, setShowPastWorkshops] = useState(false);
  const [lang, setLang] = useState<'en' | 'de'>('en');
  const isDe = lang === 'de';

  useEffect(() => {
    fetchWorkshopsClient().then(setDbWorkshops).catch(() => setDbWorkshops([]));
  }, []);

  useEffect(() => {
    const loadLanguage = () => {
      try {
        const saved = localStorage.getItem('bb_lang_v1');
        if (saved === 'en' || saved === 'de') {
          setLang(saved);
          return;
        }
      } catch {
        /* ignore */
      }
      setLang(document.documentElement.lang === 'de' ? 'de' : 'en');
    };

    loadLanguage();

    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<'en' | 'de'>;
      if (customEvent.detail === 'en' || customEvent.detail === 'de') {
        setLang(customEvent.detail);
      } else {
        loadLanguage();
      }
    };

    window.addEventListener('bb-lang-change', handleLanguageChange as EventListener);
    window.addEventListener('storage', loadLanguage);
    return () => {
      window.removeEventListener('bb-lang-change', handleLanguageChange as EventListener);
      window.removeEventListener('storage', loadLanguage);
    };
  }, []);
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              {isDe ? 'Trainings & Events' : 'Training & Events'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {isDe
                ? 'Das Building Bridges Projekt bietet verschiedene Programme und Forschungsaktivitaeten zur Staerkung und Foerderung von Maedchen und FLINTA* of Colour in akademischen Laufbahnen.'
                : 'The Building Bridges project offers programs and research activities to empower girls and FLINTA* of Colour in academic pathways.'}
            </p>
          </motion.div>

          {/* Upcoming Workshops */}
          <section className="mb-20">
            <motion.div 
              className="text-left mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{isDe ? 'Workshopangebote' : 'Workshop offerings'}</h2>
              <p className="text-xl text-gray-600 max-w-3xl">
                {isDe ? 'Die naechsten Termine fuer unsere Workshops und Veranstaltungen.' : 'The next dates for our workshops and events.'}
              </p>
            </motion.div>

            <div className="space-y-6 max-w-5xl">
              {/* First Workshop */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/2 h-64 md:h-auto relative bg-gradient-to-br from-purple-100 via-blue-100 to-purple-50 flex items-center justify-center">
                      <div className="text-center p-8">
                        <Users className="h-24 w-24 text-purple-600 mx-auto mb-4 opacity-80" />
                        <p className="text-purple-700 font-medium text-lg">{isDe ? 'Networking & Austausch' : 'Networking & Exchange'}</p>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        {/* Category Tag */}
                        <div className="inline-block mb-4">
                          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-1.5 rounded-full">
                            {isDe ? 'fuer Teilnehmerinnen' : 'for participants'}
                          </span>
                        </div>
                        
                        {/* Date, Time, Format */}
                        <div className="text-sm text-gray-600 mb-4">
                          {isDe ? 'Mittwoch, 14.01.2026 | 18:00 Uhr | Online' : 'Wednesday, 14 Jan 2026 | 6:00 PM | Online'}
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {isDe ? 'Online Kennenlernen Mentor:innen' : 'Online introductions to mentors'}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed mb-6">
                          {isDe
                            ? 'Lernen Sie unsere Mentor:innen kennen und erfahren Sie mehr ueber das Mentoring-Programm. In dieser Online-Veranstaltung stellen sich die Mentor:innen vor und beantworten Ihre Fragen.'
                            : 'Get to know our mentors and learn more about the mentoring program. In this online event, mentors introduce themselves and answer your questions.'}
                        </p>
                      </div>
                      
                      {/* Read More Link */}
                      <Link href="/contact" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                        {isDe ? 'Weiterlesen' : 'Read more'} <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Einzelmentoring */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-64 md:h-auto relative bg-gradient-to-br from-purple-100 via-blue-100 to-purple-50 flex items-center justify-center">
                      <div className="text-center p-8">
                        <Heart className="h-24 w-24 text-purple-600 mx-auto mb-4 opacity-80" />
                        <p className="text-purple-700 font-medium text-lg">Individuelles Mentoring</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="inline-block mb-4">
                          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-1.5 rounded-full">
                            {isDe ? 'fuer Teilnehmerinnen' : 'for participants'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          {isDe ? 'Jan-Nov. 2026' : 'Jan-Nov 2026'}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {isDe ? 'Einzelmentoring' : 'Individual mentoring'}
                        </h3>
                      </div>
                      <Link href="/contact" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                        {isDe ? 'Weiterlesen' : 'Read more'} <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Mentoring Workshop II Johanna Eck */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-64 md:h-auto relative bg-gradient-to-br from-purple-100 via-blue-100 to-purple-50 flex items-center justify-center">
                      <div className="text-center p-8">
                        <BookOpen className="h-24 w-24 text-purple-600 mx-auto mb-4 opacity-80" />
                        <p className="text-purple-700 font-medium text-lg">Workshop</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="inline-block mb-4">
                          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-1.5 rounded-full">
                            {isDe ? 'fuer Teilnehmerinnen' : 'for participants'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          {isDe ? 'Maerz 2026' : 'March 2026'}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {isDe ? 'Mentoring Workshop II Johanna Eck' : 'Mentoring Workshop II - Johanna Eck'}
                        </h3>
                      </div>
                      <Link href="/contact" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                        {isDe ? 'Weiterlesen' : 'Read more'} <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* SELF CARE I */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-64 md:h-auto relative bg-gradient-to-br from-purple-100 via-blue-100 to-purple-50 flex items-center justify-center">
                      <div className="text-center p-8">
                        <Heart className="h-24 w-24 text-purple-600 mx-auto mb-4 opacity-80" />
                        <p className="text-purple-700 font-medium text-lg">{isDe ? 'Selbstfuersorge' : 'Self-care'}</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="inline-block mb-4">
                          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-1.5 rounded-full">
                            {isDe ? 'fuer Teilnehmerinnen' : 'for participants'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          {isDe ? 'April 2026' : 'April 2026'}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          SELF CARE I
                        </h3>
                      </div>
                      <Link href="/contact" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                        {isDe ? 'Weiterlesen' : 'Read more'} <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Mentoring Workshop II- Vision */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-64 md:h-auto relative bg-gradient-to-br from-purple-100 via-blue-100 to-purple-50 flex items-center justify-center">
                      <div className="text-center p-8">
                        <Target className="h-24 w-24 text-purple-600 mx-auto mb-4 opacity-80" />
                        <p className="text-purple-700 font-medium text-lg">Vision & Ziele</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="inline-block mb-4">
                          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-1.5 rounded-full">
                            {isDe ? 'fuer Teilnehmerinnen' : 'for participants'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          {isDe ? 'Samstag, 25.04.2026, ganztaegig' : 'Saturday, 25.04.2026, all day'}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {isDe ? 'Mentoring Workshop II- Vision' : 'Mentoring Workshop II - Vision'}
                        </h3>
                      </div>
                      <Link href="/contact" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                        {isDe ? 'Weiterlesen' : 'Read more'} <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Self Care II */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-64 md:h-auto relative bg-gradient-to-br from-purple-100 via-blue-100 to-purple-50 flex items-center justify-center">
                      <div className="text-center p-8">
                        <Heart className="h-24 w-24 text-purple-600 mx-auto mb-4 opacity-80" />
                        <p className="text-purple-700 font-medium text-lg">{isDe ? 'Selbstfuersorge' : 'Self-care'}</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="inline-block mb-4">
                          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-1.5 rounded-full">
                            {isDe ? 'fuer Teilnehmerinnen' : 'for participants'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          {isDe ? 'Freitag, 15.05.2026' : 'Friday, 15.05.2026'}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          Self Care II
                        </h3>
                      </div>
                      <Link href="/contact" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                        {isDe ? 'Weiterlesen' : 'Read more'} <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Skills Training I */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-64 md:h-auto relative bg-gradient-to-br from-purple-100 via-blue-100 to-purple-50 flex items-center justify-center">
                      <div className="text-center p-8">
                        <Lightbulb className="h-24 w-24 text-purple-600 mx-auto mb-4 opacity-80" />
                        <p className="text-purple-700 font-medium text-lg">Kompetenzen</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="inline-block mb-4">
                          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-1.5 rounded-full">
                            {isDe ? 'fuer Teilnehmerinnen' : 'for participants'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          {isDe ? 'Freitag, 12.06.2026' : 'Friday, 12.06.2026'}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          Skills Training I
                        </h3>
                      </div>
                      <Link href="/contact" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                        {isDe ? 'Weiterlesen' : 'Read more'} <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Skills Training II */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-64 md:h-auto relative bg-gradient-to-br from-purple-100 via-blue-100 to-purple-50 flex items-center justify-center">
                      <div className="text-center p-8">
                        <Lightbulb className="h-24 w-24 text-purple-600 mx-auto mb-4 opacity-80" />
                        <p className="text-purple-700 font-medium text-lg">Kompetenzen</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="inline-block mb-4">
                          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-1.5 rounded-full">
                            {isDe ? 'fuer Teilnehmerinnen' : 'for participants'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          {isDe ? 'Freitag, 03.08.2026' : 'Friday, 03.08.2026'}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          Skills Training II
                        </h3>
                      </div>
                      <Link href="/contact" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                        {isDe ? 'Weiterlesen' : 'Read more'} <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Skills Training III */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-64 md:h-auto relative bg-gradient-to-br from-purple-100 via-blue-100 to-purple-50 flex items-center justify-center">
                      <div className="text-center p-8">
                        <Lightbulb className="h-24 w-24 text-purple-600 mx-auto mb-4 opacity-80" />
                        <p className="text-purple-700 font-medium text-lg">Kompetenzen</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="inline-block mb-4">
                          <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-4 py-1.5 rounded-full">
                            {isDe ? 'fuer Teilnehmerinnen' : 'for participants'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          {isDe ? 'Freitag, 09.10.2026' : 'Friday, 09.10.2026'}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          Skills Training III
                        </h3>
                      </div>
                      <Link href="/contact" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                        {isDe ? 'Weiterlesen' : 'Read more'} <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </section>

          {/* Past Workshops */}
          <section className="mb-20">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Button
                onClick={() => setShowPastWorkshops(!showPastWorkshops)}
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-gray-300 hover:border-purple-500 hover:text-purple-600"
              >
                {showPastWorkshops ? (
                  <>
                    {isDe ? 'Vergangene Workshops ausblenden' : 'Hide past workshops'}
                    <ChevronUp className="h-5 w-5 ml-2" />
                  </>
                ) : (
                  <>
                    {isDe ? 'Vergangene Workshops anzeigen' : 'View past workshops'}
                    <ChevronDown className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>

            <AnimatePresence>
              {showPastWorkshops && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6 max-w-5xl">
                    {/* Basis-Training Gruppe I */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 opacity-75">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/2 h-64 md:h-auto relative bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center">
                            <div className="text-center p-8">
                              <GraduationCap className="h-24 w-24 text-gray-400 mx-auto mb-4 opacity-60" />
                              <p className="text-gray-500 font-medium text-lg">{isDe ? 'Workshop abgeschlossen' : 'Workshop completed'}</p>
                            </div>
                          </div>
                          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                            <div>
                              <div className="inline-block mb-4">
                                <span className="bg-gray-200 text-gray-600 text-sm font-medium px-4 py-1.5 rounded-full">
                                  {isDe ? 'Abgeschlossen' : 'Completed'}
                                </span>
                              </div>
                              <div className="text-sm text-gray-500 mb-4">
                                {isDe ? 'Freitag, 20.-22.06.2025' : 'Friday, 20-22.06.2025'}
                              </div>
                              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                                {isDe ? 'Basis-Training Gruppe I' : 'Basic training group I'}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>

                    {/* Kennenlernen- Workshop Johanna Eck */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 opacity-75">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/2 h-64 md:h-auto relative bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center">
                            <div className="text-center p-8">
                              <Users className="h-24 w-24 text-gray-400 mx-auto mb-4 opacity-60" />
                              <p className="text-gray-500 font-medium text-lg">{isDe ? 'Workshop abgeschlossen' : 'Workshop completed'}</p>
                            </div>
                          </div>
                          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                            <div>
                              <div className="inline-block mb-4">
                                <span className="bg-gray-200 text-gray-600 text-sm font-medium px-4 py-1.5 rounded-full">
                                  {isDe ? 'Abgeschlossen' : 'Completed'}
                                </span>
                              </div>
                              <div className="text-sm text-gray-500 mb-4">
                                {isDe ? 'Mittwoch, 08.10.2025 | 13-16 Uhr' : 'Wednesday, 08.10.2025 | 1-4 PM'}
                              </div>
                              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                                {isDe ? 'Kennenlernen- Workshop Johanna Eck' : 'Intro workshop with Johanna Eck'}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>

                    {/* Auftaktveranstaltung */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 opacity-75">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/2 h-64 md:h-auto relative bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center">
                            <div className="text-center p-8">
                              <Star className="h-24 w-24 text-gray-400 mx-auto mb-4 opacity-60" />
                              <p className="text-gray-500 font-medium text-lg">{isDe ? 'Workshop abgeschlossen' : 'Workshop completed'}</p>
                            </div>
                          </div>
                          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                            <div>
                              <div className="inline-block mb-4">
                                <span className="bg-gray-200 text-gray-600 text-sm font-medium px-4 py-1.5 rounded-full">
                                  {isDe ? 'Abgeschlossen' : 'Completed'}
                                </span>
                              </div>
                              <div className="text-sm text-gray-500 mb-4">
                                {isDe ? 'Samstag, 22.11.2025' : 'Saturday, 22.11.2025'}
                              </div>
                              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                                {isDe ? 'Auftaktveranstaltung' : 'Opening event'}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>

                    {/* Get together */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 opacity-75">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/2 h-64 md:h-auto relative bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center">
                            <div className="text-center p-8">
                              <Heart className="h-24 w-24 text-gray-400 mx-auto mb-4 opacity-60" />
                              <p className="text-gray-500 font-medium text-lg">{isDe ? 'Workshop abgeschlossen' : 'Workshop completed'}</p>
                            </div>
                          </div>
                          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                            <div>
                              <div className="inline-block mb-4">
                                <span className="bg-gray-200 text-gray-600 text-sm font-medium px-4 py-1.5 rounded-full">
                                  {isDe ? 'Abgeschlossen' : 'Completed'}
                                </span>
                              </div>
                              <div className="text-sm text-gray-500 mb-4">
                                {isDe ? 'Dienstag, 09.12.2025 | 18-20 Uhr' : 'Tuesday, 09.12.2025 | 6-8 PM'}
                              </div>
                              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                                Get together
                              </h3>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>

                    {/* Perlen & Power Workshop Johanna Eck */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 opacity-75">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/2 h-64 md:h-auto relative bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center">
                            <div className="text-center p-8">
                              <Award className="h-24 w-24 text-gray-400 mx-auto mb-4 opacity-60" />
                              <p className="text-gray-500 font-medium text-lg">{isDe ? 'Workshop abgeschlossen' : 'Workshop completed'}</p>
                            </div>
                          </div>
                          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                            <div>
                              <div className="inline-block mb-4">
                                <span className="bg-gray-200 text-gray-600 text-sm font-medium px-4 py-1.5 rounded-full">
                                  {isDe ? 'Abgeschlossen' : 'Completed'}
                                </span>
                              </div>
                              <div className="text-sm text-gray-500 mb-4">
                                {isDe ? 'Donnerstag, 18.12.2025' : 'Thursday, 18.12.2025'}
                              </div>
                              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                                {isDe ? 'Perlen & Power Workshop Johanna Eck' : 'Pearls & Power workshop with Johanna Eck'}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Workshops (DB-backed only) */}
          <section className="mb-20">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{isDe ? 'Workshops' : 'Workshops'}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isDe ? 'Aus der Datenbank - oder Hinweis, wenn noch keine veroeffentlicht sind.' : 'From the database, or a notice when none are published yet.'}
              </p>
            </motion.div>

            {(!dbWorkshops || dbWorkshops.length === 0) ? (
              <div className="text-center text-gray-600">{isDe ? 'Aktuell sind keine Workshops verfuegbar.' : 'No workshops are currently available.'}</div>
            ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {dbWorkshops.map((program: any, index: number) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className={`h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50`}>
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-purple-100">
                        <GraduationCap className="h-8 w-8 text-purple-600" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 mb-3">
                        {program.title || program.name}
                      </CardTitle>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {program.description || (isDe ? 'Details folgen in Kuerze.' : 'Details coming soon.')}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                          <span>{program.startDate || (program.startsAt ? new Date(program.startsAt).toLocaleDateString(isDe ? 'de-DE' : 'en-US') : 'tba')}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-blue-600" />
                          <span>{program.duration || (program.endsAt && program.startsAt ? '—' : 'tba')}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-green-600" />
                          <span>{program.participants || (program.capacity ? `${program.capacity} ${isDe ? 'Plaetze' : 'spots'}` : isDe ? 'Kapazitaet tba' : 'capacity tba')}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                          <span>{program.location || (isDe ? 'Ort tba' : 'location tba')}</span>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Link href="/sign-up">
                          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                            {isDe ? 'Interesse bekunden' : 'Express interest'}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            )}
          </section>

          {/* Research Activities */}
          <section className="mb-20">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {isDe ? 'Forschungsaktivitaeten' : 'Research activities'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isDe ? 'Wissenschaftliche Untersuchungen zu Barrieren, Erfolgsfaktoren und Resilienz' : 'Scientific studies on barriers, success factors, and resilience'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {researchActivities.map((activity, index) => (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
                    <CardContent className="p-8 text-center">
                      <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <activity.icon className="h-8 w-8 text-gray-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {activity.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {activity.description}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-center items-center text-gray-500">
                          <Users className="h-4 w-4 mr-2" />
                          {activity.participants}
                        </div>
                        <div className="flex justify-center items-center text-gray-500">
                          <BookOpen className="h-4 w-4 mr-2" />
                          {activity.method}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Project Timeline */}
          <section className="mb-20">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {isDe ? 'Projektverlauf' : 'Project timeline'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {isDe ? 'Building Bridges laeuft ueber 36 Monate von September 2024 bis August 2027' : 'Building Bridges runs for 36 months from September 2024 to August 2027'}
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-400 to-blue-400 rounded-full"></div>
                
                {[
                  {
                    phase: isDe ? 'Phase 1' : 'Phase 1',
                    period: 'Sep 2024 - Aug 2025',
                    title: isDe ? 'Projektstart & MEP-Entwicklung' : 'Project launch & MEP development',
                    description: isDe ? 'Entwicklung des Mentoring-Programms und erste Teilnehmerinnen-Kohorte' : 'Development of the mentoring program and first participant cohort',
                  },
                  {
                    phase: isDe ? 'Phase 2' : 'Phase 2',
                    period: 'Sep 2025 - Aug 2026',
                    title: isDe ? 'Vollimplementierung & Forschung' : 'Full implementation & research',
                    description: isDe ? 'Vollstaendige Umsetzung aller Programme und intensive Datenerhebung' : 'Full delivery of all programs and intensive data collection',
                  },
                  {
                    phase: isDe ? 'Phase 3' : 'Phase 3',
                    period: 'Sep 2026 - Aug 2027',
                    title: isDe ? 'Evaluation & Nachhaltigkeit' : 'Evaluation & sustainability',
                    description: isDe ? 'Projektevaluation, Ergebnisverbreitung und Nachhaltigkeitsstrategie' : 'Project evaluation, dissemination, and sustainability strategy',
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.phase}
                    className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
                        <CardContent className="p-6">
                          <div className="text-sm font-medium text-purple-600 mb-2">{item.phase}</div>
                          <div className="text-sm text-gray-500 mb-3">{item.period}</div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="w-2/12 flex justify-center">
                      <div className="w-6 h-6 bg-purple-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                    </div>
                    <div className="w-5/12"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
} 