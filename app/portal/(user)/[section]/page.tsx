import { PortalPageIntro } from '@/components/dashboard-portal/PortalPageIntro';
import { redirect } from 'next/navigation';
import { getUser } from '@/lib/db/queries';

const labels: Record<string, { en: string; de: string }> = {
  profile: { en: 'My Profile', de: 'Mein Profil' },
  stories: { en: 'My Stories', de: 'Meine Stories' },
  messages: { en: 'Messages', de: 'Nachrichten' },
  community: { en: 'Community', de: 'Community' },
  events: { en: 'Events & Workshops', de: 'Termine & Workshops' },
  resources: { en: 'Resources', de: 'Ressourcen' },
  settings: { en: 'Settings', de: 'Einstellungen' },
};

const liveRoutes: Record<string, string> = {
  stories: '/stories',
  events: '/workshops',
  profile: '/dashboard/general',
  settings: '/dashboard/general',
};

export default async function UserPortalSectionPage({ params }: { params: { section: string } }) {
  if (!(await getUser())) redirect('/sign-in');

  const { section } = params;
  if (liveRoutes[section]) {
    redirect(liveRoutes[section]);
  }

  const title = labels[section] ?? {
    en: section.replace(/-/g, ' '),
    de: section.replace(/-/g, ' '),
  };

  return (
    <PortalPageIntro
      titleEn={title.en}
      titleDe={title.de}
      bodyEn="This part of the portal is not available yet. Use Story Creation, workshops, or settings from the dashboard."
      bodyDe="Dieser Bereich des Portals ist noch nicht verfügbar. Nutze Story-Erstellung, Workshops oder Einstellungen über das Portal."
      backHref="/portal"
      backEn="← Back to dashboard"
      backDe="← Zurück zum Portal"
    />
  );
}
