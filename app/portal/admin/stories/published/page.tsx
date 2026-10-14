import { PortalPageIntro } from '@/components/dashboard-portal/PortalPageIntro';
import { requireAdminUser } from '@/lib/auth/access';
import { ApprovedStoriesList } from '@/components/stories/ApprovedStoriesList';
import { getApprovedStoriesForPublic } from '@/lib/actions/stories';

export const dynamic = 'force-dynamic';

export default async function AdminStoriesPublishedPage() {
  await requireAdminUser();
  const approvedStories = await getApprovedStoriesForPublic();

  return (
    <div className="space-y-6">
      <PortalPageIntro
        titleEn="Published Stories"
        titleDe="Veröffentlichte Stories"
        bodyEn="Stories approved after human review. These also appear on the public stories pages."
        bodyDe="Stories, die nach menschlicher Prüfung freigegeben wurden. Sie erscheinen auch auf den öffentlichen Story-Seiten."
        backHref="/portal/admin"
        backEn="← Back to moderation overview"
        backDe="← Zurück zur Moderationsübersicht"
      />

      <ApprovedStoriesList stories={approvedStories} variant="admin" />
    </div>
  );
}
