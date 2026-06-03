'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function VisionPage() {
  const { t } = useTranslation('common');

  const copy = {
    badge: t('vision.badge', { defaultValue: 'Our Vision' }),
    heading: t('vision.heading', { defaultValue: 'Diversity in Education' }),
    paragraph: t('vision.paragraph', {
      defaultValue:
        'We advocate for more diversity and representation in psychosocial study programs. Our vision is that universities reflect the diversity of our society.',
    }),
    sectionTwoHeading: t('vision.sectionTwoHeading', { defaultValue: 'Empowerment' }),
    sectionTwoText: t('vision.sectionTwoText', {
      defaultValue:
        'Through mentoring, workshops, and community building, we strengthen girls and FLINTA* of Colour on their educational and career paths.',
    }),
    cta: t('vision.cta', { defaultValue: 'Join us' }),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">{copy.badge}</h1>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-[#8c52ff] mb-4">{copy.heading}</h2>
          <p className="text-gray-600">
            {copy.paragraph}
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-[#8c52ff] mb-4">{copy.sectionTwoHeading}</h2>
          <p className="text-gray-600">
            {copy.sectionTwoText}
          </p>
        </CardContent>
      </Card>

      <div className="text-center mt-12">
        <Button className="inline-flex items-center justify-center rounded-full bg-[#9152FF] px-8 py-4 text-white shadow-[0_3px_12px_rgba(145,82,255,0.35)] transition hover:-translate-y-px hover:bg-[#7339E0] hover:shadow-[0_6px_20px_rgba(145,82,255,0.45)]">
          {copy.cta}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}