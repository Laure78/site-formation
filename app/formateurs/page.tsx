import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FormateursProfileDialogHost } from '@/components/formateurs/FormateursProfileDialogHost';
import {
  FormateursHeroSection,
  FormateursInfoStrip,
  FormateursMetiersSection,
  FormateursPedagogieSection,
  FormateursPrimaryCtaSection,
  FormateursRecrutementBandSection,
  FormateursTeamSection,
} from '@/components/formateurs/FormateursLandingSections';
import { JsonLd } from '@/components/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { getFormateursHubProfiles } from '@/lib/formateurs';
import { formateurPublicProfileAbsoluteUrl } from '@/lib/formateurs/formateur-profile-href';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const PAGE_TITLE = 'Les formateurs qui vous accompagnent | Laure Olivié';
const PAGE_DESCRIPTION =
  'Découvrez les formateurs Laure Olivié : expertise métier BTP et pédagogie concrète pour utiliser l’IA en présentiel en Île-de-France.';

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Les formateurs qui vous accompagnent',
    titleAbsolute: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    descriptionFinal: true,
    path: LINKS.formateurs,
    appendAuthorSuffix: false,
    keywords: [
      'formateurs IA BTP',
      'formateurs intelligence artificielle bâtiment',
      'formateurs IA construction',
      'formation IA métiers du BTP',
      'formation IA conduite de travaux',
      'organisme de formation IA BTP',
    ],
  }),
  title: { absolute: PAGE_TITLE },
};

export default async function FormateursPage() {
  const formateurs = getFormateursHubProfiles();
  const base = SITE_CONFIG.url.replace(/\/$/, '');

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Formateurs OFC — équipe formation IA BTP',
    numberOfItems: formateurs.length,
    itemListElement: formateurs.map((f, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${f.prenom} ${f.nom}`,
      url: formateurPublicProfileAbsoluteUrl(f, base),
    })),
  };

  const personSchemas = formateurs.map((f) => {
    const image =
      f.portrait.kind === 'photo' ? `${base}${f.portrait.src}` : undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${formateurPublicProfileAbsoluteUrl(f, base)}#person`,
      name: `${f.prenom} ${f.nom}`,
      jobTitle: f.intitule,
      description: f.parcours,
      ...(image ? { image } : {}),
      url: formateurPublicProfileAbsoluteUrl(f, base),
      worksFor: { '@id': `${base}/#organization` },
    };
  });

  return (
    <div className="formateurs-page min-w-0">
      <JsonLd id="schema-formateurs-itemlist" schema={itemListSchema} />
      {personSchemas.map((schema, index) => (
        <JsonLd
          key={formateurs[index]?.id ?? index}
          id={`schema-formateur-person-${formateurs[index]?.slug ?? index}`}
          schema={schema}
        />
      ))}
      <BreadcrumbJsonLd
        id="schema-breadcrumb-formateurs"
        items={[
          { name: 'Accueil', url: `${base}/` },
          { name: 'Formateurs', url: `${base}${LINKS.formateurs}` },
        ]}
      />

      <FormateursHeroSection />
      <FormateursInfoStrip />
      <FormateursTeamSection formateurs={formateurs} />
      <FormateursMetiersSection />
      <FormateursPedagogieSection />
      <FormateursPrimaryCtaSection />
      <FormateursRecrutementBandSection />

      <Suspense fallback={null}>
        <FormateursProfileDialogHost formateurs={formateurs} />
      </Suspense>
    </div>
  );
}
