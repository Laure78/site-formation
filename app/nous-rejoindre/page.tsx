import { EmploisPageContent } from '@/components/career/EmploisPageContent';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const PAGE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.emplois}`;

export const metadata = createPageMetadata({
  title: 'Nous rejoindre — équipe Laure Olivié',
  description:
    'Rejoignez l’équipe Laure Olivié : offres d’emploi et candidatures pour la formation IA BTP en présentiel en Île-de-France. Candidature spontanée possible.',
  path: LINKS.emplois,
  keywords: ['emploi formation BTP', 'recrutement organisme formation', 'OFC Guyancourt'],
});

export default function EmploisPage() {
  return (
    <>
      <BreadcrumbJsonLd
        id="schema-breadcrumb-nous-rejoindre"
        items={[
          { name: 'Accueil', url: SITE_CONFIG.url },
          { name: 'Nous rejoindre', url: PAGE_URL },
        ]}
      />
      <EmploisPageContent />
    </>
  );
}
