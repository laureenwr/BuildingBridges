'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, ArrowDown, Users, Target, Lightbulb, Award, Calendar, BookOpen, Heart, Globe, Zap, GraduationCap, Star, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FundingBanner } from '@/components/partners/FundingBanner';

export default function HomePage() {
  const [videoVisible, setVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Video visibility effect
  const isVideoInView = useInView(videoSectionRef, { 
    amount: 0.3,
    margin: "-100px 0px -100px 0px"
  });

  useEffect(() => {
    setVideoVisible(isVideoInView);
  }, [isVideoInView]);

  return (
    <main className="relative">
      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <Image
            src="/coverimage.png"
            alt="Building Bridges Cover"
            fill
            className="object-cover"
            priority
          />
          {/* Combined approach: Darker overlay + enhanced text */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-6xl mx-auto"
          style={{ y: textY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white"
            style={{
              textShadow: '3px 3px 6px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.6), 1px 1px 2px rgba(0,0,0,0.6)',
              WebkitTextStroke: '1px rgba(0,0,0,0.5)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            Building Bridges
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl mb-12 text-white max-w-4xl mx-auto leading-relaxed"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.6)',
              WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            Mentoring und Empowerment für Mädchen und FLINTA* of Colour
            <br />
            <span className="text-lg md:text-xl lg:text-2xl font-medium">
              Ein interdisziplinäres Forschungsprojekt für Bildungsgerechtigkeit
            </span>
          </motion.p>

          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-12 drop-shadow-md max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          >
            Ein interdisziplinäres Forschungs- und Entwicklungsprojekt zur Stärkung von Mädchen und FLINTA* of Colour 
            für ihre Teilhabe an Hochschulbildung und akademischen Laufbahnen im psychosozialen Bereich.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9 }}
          >
            <Link href="/workshops">
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl border-2 border-white/20"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 4px 16px rgba(147,51,234,0.3)'
                }}
              >
                Programme entdecken
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button 
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl border-2 border-white/20"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 4px 16px rgba(147,51,234,0.3)'
                }}
              >
                Jetzt anmelden
              </Button>
            </Link>
          </motion.div>

          {/* Project Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
          >
            {[
              { number: "36", label: "Monate Projektlaufzeit", unit: "" },
              { number: "3", label: "Universitäten beteiligt", unit: "" },
              { number: "10+", label: "Kooperationspartner", unit: "" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}{stat.unit}</div>
                <div className="text-white/80 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
            <ArrowDown className="h-6 w-6 text-white/90" />
          </div>
        </motion.div>
      </section>

      {/* Project Overview Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Über das Projekt
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-12">
              "Building Bridges" ist ein 36-monatiges interdisziplinäres Forschungs- und Entwicklungsprojekt, 
              das darauf abzielt, Mädchen und FLINTA* of Colour ab der 10. Klasse zu stärken und zu mentorieren. 
              Das Projekt wird von der Freien Universität Berlin, der Stiftung SPI und der Universität Duisburg-Essen durchgeführt.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <Card className="p-8 bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200 hover:shadow-lg transition-all duration-300">
                <GraduationCap className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mentoring & Empowerment</h3>
                <p className="text-gray-700 leading-relaxed">
                  Entwicklung und Erprobung eines potentialorientierten, diversitätssensiblen und intersektionalen 
                  Mentoring- und Empowerment-Programms (MEP) mit psychologischem, diskriminierungssensiblem Coaching.
                </p>
              </Card>
              
              <Card className="p-8 bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200 hover:shadow-lg transition-all duration-300">
                <MessageCircle className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Digitale Plattform</h3>
                <p className="text-gray-700 leading-relaxed">
                  Partizipative Entwicklung einer "lebenden" digitalen Plattform für kontextsensitives Storytelling, 
                  die audiovisuelle Erfahrungsberichte ermöglicht und nachhaltigen Peer-to-Peer-Austausch fördert.
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <motion.section 
        ref={videoSectionRef}
        className="py-24 bg-gradient-to-br from-gray-50 to-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Projekt Building Bridges erklärt
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Erfahren Sie mehr über unser interdisziplinäres Forschungsprojekt zur Förderung 
                von Mädchen und FLINTA* of Colour in akademischen Laufbahnen.
              </p>
            </div>

            <div className="relative bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8 shadow-2xl">
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-xl">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  playsInline
                  poster="/coverimage.png"
                >
                  <source src="/media/intro.mp4" type="video/mp4" />
                  Ihr Browser unterstützt das Video-Element nicht.
                </video>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-700 text-lg font-medium mb-4">
                  Entdecken Sie die Vision und Ziele des Building Bridges Projekts
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Play className="h-4 w-4 mr-1 text-purple-600" />
                    Projektübersicht
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-blue-600" />
                    Mentoring-Programme
                  </span>
                  <span className="flex items-center">
                    <Target className="h-4 w-4 mr-1 text-green-600" />
                    Forschungsziele
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Project Goals Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                Projektziele
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Unsere Hauptziele zur Förderung von Mädchen und FLINTA* of Colour in akademischen Laufbahnen.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  icon: Users,
                  title: "MEP-Programm entwickeln",
                  description: "Entwicklung und Erprobung eines potentialorientierten, diversitätssensiblen Mentoring- und Empowerment-Programms mit psychologischem Coaching.",
                  color: "purple"
                },
                {
                  icon: GraduationCap,
                  title: "Akademische Laufbahnen fördern",
                  description: "Förderung akademischer Laufbahnen im psychosozialen Bereich und Stärkung der Ressourcen von M*oC für den Weg in die Wissenschaft.",
                  color: "blue"
                },
                {
                  icon: Star,
                  title: "Vorbilder schaffen",
                  description: "Integration von Mentorinnen und Role Models of Colour zur Sichtbarmachung erfolgreicher Bildungsbiografien und Empowerment.",
                  color: "green"
                },
                {
                  icon: Globe,
                  title: "Digitale Plattform",
                  description: "Schaffung einer partizipativen digitalen Plattform für kontextsensitives Storytelling und nachhaltigen Peer-to-Peer-Austausch.",
                  color: "orange"
                },
                {
                  icon: Target,
                  title: "Barrieren erforschen",
                  description: "Untersuchung von Diskriminierungserfahrungen und Barrieren sowie Bedingungen für erhöhte Teilhabe in akademischen Settings.",
                  color: "red"
                },
                {
                  icon: Heart,
                  title: "Resilienz stärken",
                  description: "Stärkung der Resilienz und des Leistungspotentials durch Identifikation und Aktivierung individueller Talente und Ressourcen.",
                  color: "pink"
                }
              ].map((goal, index) => (
                <motion.div
                  key={goal.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                    <div className={`bg-${goal.color}-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                      <goal.icon className={`h-8 w-8 text-${goal.color}-600`} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      {goal.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {goal.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Funding Banner per Leitfaden */}
      <FundingBanner
        heading="Gefördert durch"
        logos={[
          { src: '/BMBF/image copy.png', alt: 'ESF Plus – Kombilogos (BMBF und EU)', width: 220, height: 70, scale: 0.95 },
          { src: '/BMBF/image copy 2.png', alt: 'ESF Plus – Programmlogo', width: 220, height: 70, scale: 0.85 },
          { src: '/BMBF/image copy 3.png', alt: 'BMBF – Wortmarke', width: 220, height: 70, scale: 0.65 },
          { src: '/BMBF/image.png', alt: 'EU-Flagge – Europäische Union', width: 220, height: 70, scale: 0.9 },
        ]}
      />

      {/* Partners Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Projektpartner
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Eine starke Allianz aus Universitäten, Stiftungen und Community-Organisationen
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Freie Universität Berlin",
                role: "Projektleitung & Forschung",
                description: "Gesamtkoordination, wissenschaftliche Leitung und Evaluation des Projekts unter Prof. Dr. Claudia Calvano.",
                color: "purple",
                logo: "/Projektpartner Logos/FU Berlin logo.png",
                alt: "Freie Universität Berlin Logo"
              },
              {
                name: "Stiftung SPI",
                role: "MEP-Entwicklung",
                description: "Praxisorientierte Entwicklung und Umsetzung des Mentoring- und Empowerment-Programms unter M.A. Celiana Kiefer",
                color: "blue",
                logo: "/Projektpartner Logos/Stiftung SPI Logo.png",
                alt: "Stiftung SPI Logo"
              },
              {
                name: "Universität Duisburg-Essen",
                role: "Digitale Plattform",
                description: "Partizipative Entwicklung der digitalen Storytelling-Plattform unter Prof. Dr. Hannes Rothe.",
                color: "green",
                logo: "/Projektpartner Logos/UDE_Logo.png",
                alt: "Universität Duisburg-Essen Logo"
              }
            ].map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-8 h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
                  <div className="w-full flex items-center justify-center mb-6">
                    <div className="relative w-48 h-16">
                      <Image src={partner.logo} alt={partner.alt} fill className="object-contain" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    {partner.name}
                  </h3>
                  <p className="text-center text-sm font-medium text-purple-600 mb-4">
                    {partner.role}
                  </p>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {partner.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/coverimage.png')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Werden Sie Teil von Building Bridges
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
              Ob als Teilnehmerin, Mentorin oder Kooperationspartnerin - gemeinsam bauen wir Brücken 
              in eine vielfältige und inklusive akademische Zukunft.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-5 text-xl font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Programm beitreten
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-5 text-xl font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Kontakt aufnehmen
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 