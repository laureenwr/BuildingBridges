import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glossary',
  description:
    'Key terms and definitions from the Building Bridges project. Wichtige Begriffe und Definitionen im Kontext von Building Bridges.',
  keywords: ['Glossar', 'Glossary', 'Begriffe', 'Definitionen', 'Building Bridges', 'FLINTA', 'BIPoC', 'Empowerment', 'Mentoring'],
};

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}









