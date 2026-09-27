import { HomeJourneeBlock } from '@/components/bework/marketing/HomeJourneeBlock';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Export BeWork — section Jour 1',
  titleAbsolute: 'Export BeWork — section Jour 1',
  description: 'Aperçu interne de la section accueil BeWork « Jour 1 » (non indexée).',
  path: '/marketing-export/bework/home-journee',
  robots: { index: false, follow: false },
});

/** Aperçu local — chemins relatifs comme sur bework.fr. */
export default function BeworkHomeJourneeExportPage() {
  return (
    <main className="min-h-screen bg-[#f4f6fb]">
      <HomeJourneeBlock formationHref="/formation" demonstrationsHref="/demonstrations" />
    </main>
  );
}
