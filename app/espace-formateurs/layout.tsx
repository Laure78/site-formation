import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';

export const metadata = createPageMetadata({
  title: 'Espace formateurs',
  description: 'Extranet réservé aux formateurs indépendants Laure Olivié — dossier, charte et interventions.',
  path: LINKS.espaceFormateurs,
  robots: { index: false, follow: false },
});

export default function EspaceFormateursRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
