"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { saveMentorData } from '@/lib/actions';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function MentorsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pronouns: '',
    age: '',
    studentStatus: '',
    fieldOfStudy: '',
    semester: '',
    university: '',
    bipocIdentity: '',
    additionalCategories: '',
    hasCapacity: '',
    intersectionalityKnowledge: '',
    mentorExperience: '',
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    saveMentorData(formData)
      .then(result => {
        if (result.success) {
          alert('Anmeldung erfolgreich! Wir werden uns in Kürze bei dir melden.');
          setFormData({
            name: '',
            email: '',
            pronouns: '',
            age: '',
            studentStatus: '',
            fieldOfStudy: '',
            semester: '',
            university: '',
            bipocIdentity: '',
            additionalCategories: '',
            hasCapacity: '',
            intersectionalityKnowledge: '',
            mentorExperience: '',
          });
        } else {
          console.error('Submission error:', result.error);
          alert('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
      });
  };

  return (
    <div className="container mx-auto py-24 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Anmeldeformular – Building Bridges - Mentor:innen
      </h1>
      <p className="text-gray-600 mb-8">
        Herzlich willkommen beim Anmeldeformular für die Mentor:innen des Projekts Building Bridges! 
        Wir freuen uns, dass du Interesse an der Mitarbeit in unserem Mentor:innen-Programm zeigst.
      </p>

      {/* Ausschreibung Mentoren Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ausschreibung Mentoren</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl">
          {/* Ausschreibung Mentoren 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="cursor-pointer"
            onClick={() => setSelectedImage('/Veranstaltungen/ausschreibungmentoren1.jpg')}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative w-full aspect-[3/4] bg-gray-100">
                <Image
                  src="/Veranstaltungen/ausschreibungmentoren1.jpg"
                  alt="Ausschreibung Mentoren Teil 1"
                  fill
                  className="object-contain"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">Ausschreibung Mentoren</h3>
                <p className="text-sm text-gray-600 mt-1">Teil 1 - Zum Vergrößern klicken</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ausschreibung Mentoren 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="cursor-pointer"
            onClick={() => setSelectedImage('/Veranstaltungen/ausschreibungmentoren2.jpg')}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative w-full aspect-[3/4] bg-gray-100">
                <Image
                  src="/Veranstaltungen/ausschreibungmentoren2.jpg"
                  alt="Ausschreibung Mentoren Teil 2"
                  fill
                  className="object-contain"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">Ausschreibung Mentoren</h3>
                <p className="text-sm text-gray-600 mt-1">Teil 2 - Zum Vergrößern klicken</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                aria-label="Schließen"
              >
                <X className="h-8 w-8" />
              </button>
              <div className="relative w-full h-[90vh] bg-white rounded-lg overflow-hidden">
                <Image
                  src={selectedImage}
                  alt="Vergrößerte Ansicht"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flyer Mentees Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Flyer für Mentees</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl">
          {/* Flyer Mentees */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="cursor-pointer"
            onClick={() => setSelectedImage('/Veranstaltungen/flyermentees.jpg')}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative w-full aspect-[3/4] bg-gray-100">
                <Image
                  src="/Veranstaltungen/flyermentees.jpg"
                  alt="Flyer für Mentees"
                  fill
                  className="object-contain"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">Flyer für Mentees</h3>
                <p className="text-sm text-gray-600 mt-1">Zum Vergrößern klicken</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Persönliche Informationen</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Vollständiger Name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="Deine Email-Adresse"
                />
              </div>

              <div>
                <Label htmlFor="pronouns">Pronomen (optional)</Label>
                <Input
                  id="pronouns"
                  value={formData.pronouns}
                  onChange={(e) => setFormData({ ...formData, pronouns: e.target.value })}
                  placeholder="z.B. sie/ihr, er/ihm, they/them"
                />
              </div>

              <div>
                <Label htmlFor="age">Alter (optional)</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="Dein Alter"
                />
              </div>

              <div>
                <Label htmlFor="studentStatus">Studierendenstatus</Label>
                <Input
                  id="studentStatus"
                  value={formData.studentStatus}
                  onChange={(e) => setFormData({ ...formData, studentStatus: e.target.value })}
                  required
                  placeholder="z.B. Bachelor, Master"
                />
              </div>

              <div>
                <Label htmlFor="fieldOfStudy">Studienfach</Label>
                <Input
                  id="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                  required
                  placeholder="Dein Studienfach"
                />
              </div>

              <div>
                <Label htmlFor="semester">Semester</Label>
                <Input
                  id="semester"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  required
                  placeholder="Aktuelles Semester"
                />
              </div>

              <div>
                <Label htmlFor="university">Universität/Hochschule</Label>
                <Input
                  id="university"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  required
                  placeholder="Name der Universität/Hochschule"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bipocIdentity">BIPoC Person - Selbstbeschreibung</Label>
              <Input
                id="bipocIdentity"
                value={formData.bipocIdentity}
                onChange={(e) => setFormData({ ...formData, bipocIdentity: e.target.value })}
                required
                placeholder="z.B. Ich bin eine Schwarze Person / jüdisch / türkisch, etc."
              />
            </div>

            <div>
              <Label htmlFor="additionalCategories">Weitere Kategorien (optional)</Label>
              <Input
                id="additionalCategories"
                value={formData.additionalCategories}
                onChange={(e) => setFormData({ ...formData, additionalCategories: e.target.value })}
                placeholder="z.B. LGBTQIA+, Behinderung, etc."
              />
            </div>

            <div>
              <Label>Hast du Kapazitäten, um regelmäßig an Treffen teilzunehmen?</Label>
              <RadioGroup
                value={formData.hasCapacity}
                onValueChange={(value) => setFormData({ ...formData, hasCapacity: value })}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="capacity-yes" />
                  <Label htmlFor="capacity-yes">Ja</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="capacity-no" />
                  <Label htmlFor="capacity-no">Nein</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maybe" id="capacity-maybe" />
                  <Label htmlFor="capacity-maybe">Vielleicht</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Kenntnisse über Intersektionalität</Label>
              <RadioGroup
                value={formData.intersectionalityKnowledge}
                onValueChange={(value) => setFormData({ ...formData, intersectionalityKnowledge: value })}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="knowledge-yes" />
                  <Label htmlFor="knowledge-yes">Ja</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="knowledge-no" />
                  <Label htmlFor="knowledge-no">Nein</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="some" id="knowledge-some" />
                  <Label htmlFor="knowledge-some">Ein bisschen</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Mentor:in Erfahrung</Label>
              <RadioGroup
                value={formData.mentorExperience}
                onValueChange={(value) => setFormData({ ...formData, mentorExperience: value })}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="experience-yes" />
                  <Label htmlFor="experience-yes">Ja</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="experience-no" />
                  <Label htmlFor="experience-no">Nein</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="similar" id="experience-similar" />
                  <Label htmlFor="experience-similar">Habe etwas ähnliches gemacht</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full">
              Anmeldung absenden
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 