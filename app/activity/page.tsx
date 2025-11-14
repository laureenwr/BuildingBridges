"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MessageCircle, Heart, Award, TrendingUp, Clock, MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

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

const communityStats: { icon: any; title: string; value: string }[] = [
  { icon: Users, title: 'Aktive Mitglieder', value: '0' },
  { icon: Award, title: 'Abgeschlossene Workshops', value: '0' },
  { icon: Heart, title: 'Mentoring-Paare', value: '0' },
  { icon: TrendingUp, title: 'Job-Vermittlungen', value: '0' },
];

export default function ActivityPage() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  useEffect(() => {
    fetchWorkshopsClient().then(setWorkshops).catch(() => setWorkshops([]));
  }, []);
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8">Community Activity</h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">Aktuelle Bewegungen in unserer Community.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full">Community beitreten</Button>
              </Link>
              <Link href="/workshops">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full">Workshops ansehen</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Community im Überblick</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Live-Zahlen folgen; derzeit Platzhalter auf 0 gesetzt.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <motion.div key={stat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -5 }}>
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
                  <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <stat.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600 mb-2 font-medium">{stat.title}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Neueste Aktivitäten</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Sobald Workshops/Beiträge veröffentlicht werden, erscheinen sie hier.</p>
          </motion.div>
          <div className="text-center text-gray-600">Keine Aktivitäten vorhanden.</div>
        </div>
      </section>

      {/* Upcoming Events (from DB workshops) */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Kommende Events</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Direkt aus der Workshop-Datenbank.</p>
          </motion.div>

          {workshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workshops.map((w) => (
                <Card key={w.id} className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900">{w.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6 text-sm text-gray-600">
                      <div className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-purple-600" />{w.startsAt ? new Date(w.startsAt).toLocaleDateString('de-DE') : 'tba'}</div>
                      <div className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-purple-600" />{w.location || 'tba'}</div>
                    </div>
                    <Link href="/workshops">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Details</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">Keine kommenden Events.</div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Werde Teil der Bewegung</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Schließe dich unserer aktiven Community an und gestalte die Zukunft mit.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg">Kostenlos beitreten</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg">Event vorschlagen</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 