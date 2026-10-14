import { PortalPageIntro } from '@/components/dashboard-portal/PortalPageIntro';

export default function AdminRejectedUsersPage() {
  return (
    <PortalPageIntro
      titleEn="Rejected Users"
      titleDe="Abgelehnte Nutzer:innen"
      bodyEn="Optionally retain a trimmed archive for moderator context. Tie to audit logs when you connect the backend."
      bodyDe="Optional ein gekürztes Archiv für den Moderationskontext behalten. Mit Audit-Logs verbinden, sobald das Backend angebunden ist."
      backHref="/portal/admin"
      backEn="← Back to moderation overview"
      backDe="← Zurück zur Moderationsübersicht"
    />
  );
}
