import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY, OFC_TYPE_BODY, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { ofcSectionClasses, OFC_READABLE_COLUMN } from '@/lib/ofc-section-classes';

export const metadata = createPageMetadata({
  title: 'Candidature envoyée',
  titleAbsolute: 'Candidature formateur envoyée | Laure Olivié',
  description: 'Votre candidature formateur IA BTP a bien été transmise à OFC Création d’Entreprise.',
  descriptionFinal: true,
  path: LINKS.devenezConsultantMerci,
  noIndex: true,
});

const PAGE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.devenezConsultantMerci}`;

export default function DevenezConsultantMerciPage() {
  return (
    <>
      <BreadcrumbJsonLd
        id="schema-breadcrumb-devenez-consultant-merci"
        items={[
          { name: 'Accueil', url: SITE_CONFIG.url },
          { name: 'Nous rejoindre', url: `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.nousRejoindre}` },
          { name: 'Candidature envoyée', url: PAGE_URL },
        ]}
      />
      <section className={ofcSectionClasses({ tone: 'white', size: 'compact' })}>
        <div className={OFC_READABLE_COLUMN}>
          <h1 className={OFC_TYPE_H2}>Merci — votre candidature a bien été envoyée</h1>
          <p className={`${OFC_TYPE_BODY} mt-4 text-ofc-ink-muted`}>
            Notre équipe analyse les parcours BTP et les usages concrets de l’IA. Nous vous recontactons si
            un besoin correspond à votre profil.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={LINKS.nousRejoindre}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold`}
            >
              Retour au recrutement
            </Link>
            <Link
              href={LINKS.formations}
              className="inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold text-[#377CF3] underline-offset-2 hover:underline"
            >
              Voir le catalogue de formations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
