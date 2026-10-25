import { EmploisPageContent } from '@/components/career/EmploisPageContent';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const PAGE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.emplois}`;

export const metadata = createPageMetadata({
  title: 'Emplois — rejoindre Laure Olivié',
  description:
    'Offres d’emploi pour rejoindre l’équipe Laure Olivié : formation IA pour les professionnels du BTP en présentiel en Île-de-France. Candidature spontanée possible.',
  path: LINKS.emplois,
  keywords: ['emploi formation BTP', 'recrutement organisme formation', 'OFC Guyancourt'],
});

export default function EmploisPage() {
  return (
    <>
      <BreadcrumbJsonLd
        id="schema-breadcrumb-emplois"
        items={[
          { name: 'Accueil', url: SITE_CONFIG.url },
          { name: 'Emplois', url: PAGE_URL },
        ]}
      />
      <EmploisPageContent />
    </>
  );
}
