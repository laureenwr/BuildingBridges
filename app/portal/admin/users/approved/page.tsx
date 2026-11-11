import { PortalPageIntro } from '@/components/dashboard-portal/PortalPageIntro';

export default function AdminApprovedUsersPage() {
  return (
    <PortalPageIntro
      titleEn="Approved Users"
      titleDe="Freigegebene Nutzer:innen"
      bodyEn="List approved mentors, participants, and researchers. Filter by role after your API exposes approval status."
      bodyDe="Liste freigegebener Mentor:innen, Teilnehmer:innen und Forscher:innen. Filter nach Rolle, sobald der Status in der API verfügbar ist."
      backHref="/portal/admin"
      backEn="← Back to moderation overview"
      backDe="← Zurück zur Moderationsübersicht"
    />
  );
}
