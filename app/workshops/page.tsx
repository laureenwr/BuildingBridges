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

const upcomingWorkshopCards = [
  {
    key: 'online-intro',
    icon: Users,
    badge: { de: 'Networking & Austausch', en: 'Networking & Exchange' },
    audience: { de: 'fuer Teilnehmerinnen', en: 'for participants' },
    date: { de: 'Mittwoch, 14. Jan 2026 · 18:00 Uhr · Online', en: 'Wednesday, 14 Jan 2026 · 6:00 PM · Online' },
    title: { de: 'Online Kennenlernen Mentor:innen', en: 'Online introductions to mentors' },
    description: {
      de: 'Lernen Sie unsere Mentor:innen kennen und erfahren Sie mehr ueber das Mentoring-Programm. Mentor:innen stellen sich vor und beantworten Fragen.',
      en: 'Get to know our mentors and learn more about the mentoring program. Mentors introduce themselves and answer your questions.',
    },
  },
  {
    key: 'individual-mentoring',
    icon: Heart,
    badge: { de: 'Individuelles Mentoring', en: 'Individual mentoring' },
    audience: { de: 'fuer Teilnehmerinnen', en: 'for participants' },
    date: { de: 'Jan-Nov 2026', en: 'Jan-Nov 2026' },
    title: { de: 'Einzelmentoring', en: 'Individual mentoring' },
    description: {
      de: 'Ein unterstuetzender Mentoring-Pfad fuer Teilnehmerinnen waehrend des gesamten Programmjahres.',
      en: 'A supportive mentoring pathway for participants throughout the program year.',
    },
  },
  {
    key: 'mentoring-ii-johanna',
    icon: BookOpen,
    badge: { de: 'Workshop', en: 'Workshop' },
    audience: { de: 'fuer Teilnehmerinnen', en: 'for participants' },
    date: { de: 'Maerz 2026', en: 'March 2026' },
    title: { de: 'Mentoring Workshop II - Johanna Eck', en: 'Mentoring Workshop II - Johanna Eck' },
    description: {
      de: 'Ein angeleiteter Workshop mit Fokus auf Mentoring, Reflexion und Community-Austausch.',
      en: 'A guided workshop focused on mentoring, reflection, and community exchange.',
    },
  },
  {
    key: 'self-care-i',
    icon: Heart,
    badge: { de: 'Self-care', en: 'Self-care' },
    audience: { de: 'fuer Teilnehmerinnen', en: 'for participants' },
    date: { de: 'April 2026', en: 'April 2026' },
    title: { de: 'SELF CARE I', en: 'SELF CARE I' },
    description: {
      de: 'Ein sicherer Raum, um Wohlbefinden, Grenzen und Resilienz-Praktiken gemeinsam zu staerken.',
      en: 'A safe space to explore wellbeing, boundaries, and resilience practices together.',
    },
  },
  {
    key: 'vision-workshop',
    icon: Target,
    badge: { de: 'Vision & Ziele', en: 'Vision & Goals' },
    audience: { de: 'fuer Teilnehmerinnen', en: 'for participants' },
    date: { de: 'Samstag, 25.04.2026 · ganztags', en: 'Saturday, 25.04.2026 · all day' },
    title: { de: 'Mentoring Workshop II - Vision', en: 'Mentoring Workshop II - Vision' },
    description: {
      de: 'Ein Workshop fuer das Gestalten persoenlicher Ziele, geteilter Visionen und akademischer Wege.',
      en: 'A workshop for shaping personal goals, shared visions, and academic pathways.',
    },
  },
  {
    key: 'self-care-ii',
    icon: Heart,
    badge: { de: 'Self-care', en: 'Self-care' },
    audience: { de: 'fuer Teilnehmerinnen', en: 'for participants' },
    date: { de: 'Freitag, 15.05.2026', en: 'Friday, 15.05.2026' },
    title: { de: 'Self Care II', en: 'Self Care II' },
    description: {
      de: 'Fortsetzung der Self-care-Reihe mit praktischen Tools fuer Reflexion und gegenseitige Unterstuetzung.',
      en: 'Continuing the self-care series with practical tools for reflection and support.',
    },
  },
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
    <main className="min-h-screen bg-[#F2EEFF]">
      <div className="mx-auto max-w-[1280px] px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-8 font-lora text-[clamp(2rem,3vw,2.8rem)] font-bold text-[#1A1033]">
              {isDe ? 'Trainings & Events' : 'Training & Events'}
            </h1>
            <p className="mx-auto max-w-4xl text-[1.05rem] leading-relaxed text-[#6B5F8A] md:text-[1.15rem]">
              {isDe
                ? 'Das Building Bridges Projekt bietet verschiedene Programme und Forschungsaktivitaeten zur Staerkung und Foerderung von Maedchen und FLINTA* of Colour in akademischen Laufbahnen.'
                : 'The Building Bridges project offers programs and research activities to empower girls and FLINTA* of Colour in academic pathways.'}
            </p>
          </motion.div>

          {/* Upcoming Workshops */}
          <section className="mb-20">
            <motion.div 
              className="mb-10 flex flex-wrap items-start justify-between gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="mb-3 font-lora text-[clamp(1.7rem,2.6vw,2.2rem)] font-bold text-[#1A1033]">{isDe ? 'Workshopangebote' : 'Workshop offerings'}</h2>
                <p className="max-w-3xl text-[1rem] text-[#6B5F8A]">
                  {isDe ? 'Die naechsten Termine fuer unsere Workshops und Veranstaltungen.' : 'The next dates for our workshops and events.'}
                </p>
              </div>
              <Button
                onClick={() => setShowPastWorkshops(!showPastWorkshops)}
                variant="outline"
                className="rounded-full border border-[rgba(145,82,255,0.28)] bg-white px-5 py-2 text-[0.78rem] font-semibold text-[#9152FF] hover:border-[#9152FF] hover:bg-[#F5F0FF]"
              >
                {showPastWorkshops
                  ? (isDe ? 'Vergangene Workshops ausblenden' : 'Hide past workshops')
                  : (isDe ? 'Vergangene Workshops anzeigen' : 'View past workshops')}
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {upcomingWorkshopCards.map((card, index) => (
                <motion.article
                  key={card.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  viewport={{ once: true }}
                  className="flex h-full flex-col rounded-[18px] border border-[rgba(145,82,255,0.15)] bg-white p-4 shadow-[0_6px_20px_rgba(145,82,255,0.08)]"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[rgba(145,82,255,0.12)] px-2.5 py-1 text-[0.62rem] font-bold text-[#9152FF]">
                      {isDe ? card.badge.de : card.badge.en}
                    </span>
                    <span className="rounded-full bg-[rgba(107,170,138,0.14)] px-2.5 py-1 text-[0.62rem] font-bold text-[#4d8e70]">
                      {isDe ? card.audience.de : card.audience.en}
                    </span>
                  </div>

                  <h3 className="font-lora text-[1.8rem] font-bold leading-tight text-[#1A1033]">
                    {isDe ? card.title.de : card.title.en}
                  </h3>
                  <p className="mt-2 text-[0.8rem] font-medium text-[#6B5F8A]">
                    {isDe ? card.date.de : card.date.en}
                  </p>
                  <p className="mt-4 flex-1 text-[0.9rem] leading-relaxed text-[#6B5F8A]">
                    {isDe ? card.description.de : card.description.en}
                  </p>

                  <Link
                    href="/contact"
                    className="mt-5 inline-flex w-fit items-center gap-1 rounded-full bg-[#9152FF] px-4 py-2 text-[0.84rem] font-semibold text-white shadow-[0_4px_14px_rgba(145,82,255,0.35)] transition hover:bg-[#7339E0]"
                  >
                    {isDe ? 'Mehr erfahren' : 'Read more'}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Past Workshops */}
          <section className="mb-20">
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
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {dbWorkshops.map((program: any, index: number) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border border-[rgba(145,82,255,0.2)] bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                    <CardHeader className="pb-4">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5F0FF]">
                        <GraduationCap className="h-8 w-8 text-purple-600" />
                      </div>
                      <CardTitle className="mb-3 font-lora text-xl font-bold text-[#1A1033]">
                        {program.title || program.name}
                      </CardTitle>
                      <p className="text-sm leading-relaxed text-[#6B5F8A]">
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
                          <Button className="w-full bg-[#9152FF] text-white hover:bg-[#7339E0]">
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
              <h2 className="mb-6 font-lora text-[clamp(1.8rem,2.8vw,2.5rem)] font-bold text-[#1A1033]">
                {isDe ? 'Forschungsaktivitaeten' : 'Research activities'}
              </h2>
              <p className="mx-auto max-w-3xl text-[1rem] text-[#6B5F8A]">
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
                  <Card className="h-full border border-[rgba(145,82,255,0.2)] bg-white shadow-md transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-8 text-center">
                      <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <activity.icon className="h-8 w-8 text-gray-600" />
                      </div>
                      <h3 className="mb-4 font-lora text-xl font-bold text-[#1A1033]">
                        {activity.title}
                      </h3>
                      <p className="mb-4 leading-relaxed text-[#6B5F8A]">
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
              <h2 className="mb-6 font-lora text-[clamp(1.8rem,2.8vw,2.5rem)] font-bold text-[#1A1033]">
                {isDe ? 'Projektverlauf' : 'Project timeline'}
              </h2>
              <p className="mx-auto max-w-3xl text-[1rem] text-[#6B5F8A]">
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
                      <Card className="border border-[rgba(145,82,255,0.2)] bg-white shadow-lg">
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