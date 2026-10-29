import { EmploisPageContent } from '@/components/career/EmploisPageContent';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const PAGE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.emplois}`;

const PAGE_TITLE = 'Recrutement formateurs IA BTP 2027 | Laure Olivié';
const PAGE_DESCRIPTION =
  'Formateurs indépendants issus du BTP : transmettez vos usages de l’IA en présentiel en Île-de-France. Missions rémunérées dès 2027. Candidatez.';

export const metadata = createPageMetadata({
  title: 'Recrutement formateurs IA BTP 2027',
  titleAbsolute: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.emplois,
  keywords: [
    'recrutement formateur IA BTP',
    'formateur indépendant IA BTP',
    'formateur intelligence artificielle BTP',
    'formation IA bâtiment travaux publics',
    'missions formation IA Île-de-France',
  ],
});

export default function EmploisPage() {
  return (
    <>
      <BreadcrumbJsonLd
        id="schema-breadcrumb-nous-rejoindre"
        items={[
          { name: 'Accueil', url: SITE_CONFIG.url },
          { name: 'Recrutement formateurs', url: PAGE_URL },
        ]}
      />
      <EmploisPageContent />
    </>
  );
}
