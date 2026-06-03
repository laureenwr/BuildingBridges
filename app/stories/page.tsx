import type { Metadata } from 'next';
import { PostedStoriesPage } from '@/components/stories/PostedStoriesPage';

export const metadata: Metadata = {
  title: 'Community Stories',
  description:
    'Read community stories from Building Bridges — immersive narratives, story cards, podcast structures, and memory albums.',
};

export default function StoriesPage() {
  return <PostedStoriesPage />;
}
