import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glossar | Building Bridges',
  description: 'Wichtige Begriffe und Definitionen im Kontext des Building Bridges Projekts. Important terms and definitions in the context of the Building Bridges project.',
  keywords: ['Glossar', 'Glossary', 'Begriffe', 'Definitionen', 'Building Bridges', 'FLINTA', 'BIPoC', 'Empowerment', 'Mentoring'],
};

export default function GlossaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}








