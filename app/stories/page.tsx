import type { Metadata } from 'next';
import { PostedStoriesPage } from '@/components/stories/PostedStoriesPage';
import { getApprovedStoriesForPublic } from '@/lib/actions/stories';

export const metadata: Metadata = {
  title: 'Community Stories',
  description:
    'Read community stories from Building Bridges — immersive narratives, story cards, podcast structures, and memory albums.',
};

export const dynamic = 'force-dynamic';

export default async function StoriesPage() {
  const approvedStories = await getApprovedStoriesForPublic();
  return <PostedStoriesPage approvedStories={approvedStories} />;
}