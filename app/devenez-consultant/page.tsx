import { ConsultantFormateurCandidatureSection } from '@/components/career/ConsultantFormateurCandidatureSection';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const PAGE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.devenezConsultant}`;

export const metadata = createPageMetadata({
  title: 'Candidature formateur IA BTP 2027',
  titleAbsolute: 'Candidature formateur IA BTP 2027 | Laure Olivié',
  description:
    'Déposez votre candidature pour devenir formateur indépendant IA BTP : parcours métier, pratique de l’IA, disponibilités en Île-de-France. Formulaire en ligne ou email recrutement@laureolivie.fr.',
  descriptionFinal: true,
  path: LINKS.devenezConsultant,
  keywords: [
    'candidature formateur IA BTP',
    'devenir formateur IA BTP',
    'consultant formateur BTP',
    'recrutement formateur intelligence artificielle',
  ],
});

export default function DevenezConsultantPage() {
  return (
    <>
      <BreadcrumbJsonLd
        id="schema-breadcrumb-devenez-consultant"
        items={[
          { name: 'Accueil', url: SITE_CONFIG.url },
          { name: 'Nous rejoindre', url: `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.nousRejoindre}` },
          { name: 'Candidature formateur', url: PAGE_URL },
        ]}
      />
      <ConsultantFormateurCandidatureSection sourcePage={PAGE_URL} />
    </>
  );
}
