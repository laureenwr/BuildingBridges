import { PortalPageIntro } from '@/components/dashboard-portal/PortalPageIntro';
import { requireAdminUser } from '@/lib/auth/access';
import { StoryReviewTable } from '@/components/dashboard-portal/StoryReviewTable';
import { getPendingStoriesForReview } from '@/lib/actions/stories';

export const dynamic = 'force-dynamic';

export default async function AdminStoriesReviewPage() {
  await requireAdminUser();
  const storyRows = await getPendingStoriesForReview();

  return (
    <div className="space-y-6">
      <PortalPageIntro
        titleEn="Stories for Review"
        titleDe="Stories zur Prüfung"
        bodyEn="Read the full submitted story, including chapters and who sent it, before you approve or reject it."
        bodyDe="Lies die vollständige eingereichte Story, inklusive Kapitel und wer sie gesendet hat, bevor du freigibst oder ablehnst."
        backHref="/portal/admin"
        backEn="← Back to moderation overview"
        backDe="← Zurück zur Moderationsübersicht"
      />

      <StoryReviewTable rows={storyRows} defaultExpanded />
    </div>
  );
}
