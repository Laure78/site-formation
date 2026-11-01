import { EmploisPageContent } from '@/components/career/EmploisPageContent';
import { JsonLd } from '@/components/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { NOUS_REJOINDRE_RECRUTEMENT_FAQ } from '@/lib/consultant-recruitment-content';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const PAGE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.nousRejoindre}`;

const PAGE_TITLE = 'Recrutement formateurs IA BTP 2027 | Laure Olivié';
const PAGE_DESCRIPTION =
  'Formation IA pour le BTP : recrutement 2027 de formateurs indépendants (2 ans d’expérience métier). Missions rémunérées en présentiel en Île-de-France. Candidature en ligne.';

export const metadata = createPageMetadata({
  title: 'Recrutement formateurs IA BTP 2027',
  titleAbsolute: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.nousRejoindre,
  keywords: [
    'recrutement formateur IA BTP',
    'formateur indépendant IA BTP',
    'devenir formateur IA BTP',
    'formateur intelligence artificielle BTP',
    'formation IA bâtiment travaux publics',
    'missions formation IA Île-de-France',
  ],
});

const FAQ_SCHEMA = getFAQSchema(NOUS_REJOINDRE_RECRUTEMENT_FAQ);

export default function NousRejoindrePage() {
  return (
    <>
      <BreadcrumbJsonLd
        id="schema-breadcrumb-nous-rejoindre"
        items={[
          { name: 'Accueil', url: SITE_CONFIG.url },
          { name: 'Nous rejoindre', url: PAGE_URL },
        ]}
      />
      {FAQ_SCHEMA ? <JsonLd id="schema-faq-nous-rejoindre" schema={FAQ_SCHEMA} /> : null}
      <EmploisPageContent sourcePage={PAGE_URL} />
    </>
  );
}
