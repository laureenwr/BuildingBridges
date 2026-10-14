import { PortalPageIntro } from '@/components/dashboard-portal/PortalPageIntro';

export default function AdminPortalSettingsPage() {
  return (
    <PortalPageIntro
      titleEn="Admin Settings"
      titleDe="Admin-Einstellungen"
      bodyEn="Notification emails, escalation contacts, and community guidelines versioning can live here."
      bodyDe="Benachrichtigungs-E-Mails, Eskalationskontakte und Versionen der Community-Richtlinien können hier liegen."
      backHref="/portal/admin"
      backEn="← Back to moderation overview"
      backDe="← Zurück zur Moderationsübersicht"
    />
  );
}
