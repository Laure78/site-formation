import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { EnBref } from '@/app/components/EnBref';
import { CtaDevis } from '@/components/CtaDevis';
import { CtaVisio } from '@/components/CtaVisio';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import { FormateurProfileDetail } from '@/components/formateurs/FormateurProfileDetail';
import { JsonLd } from '@/components/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { ContentUpdatedLine } from '@/components/seo/ContentUpdatedLine';
import { FORMATEUR_PROFILE_CONTENT_UPDATED_AT } from '@/lib/content-updated-at';
import {
  getFormateurProfileStaticSlugs,
  getHubFormateurProfileBySlug,
} from '@/lib/formateurs/get-formateurs';
import { formateurProfileEnBref } from '@/lib/formateurs/formateur-page-copy';
import {
  formateurPublicProfileAbsoluteUrl,
  formateurPublicProfilePath,
  isLaureFormateurSlug,
} from '@/lib/formateurs/formateur-profile-href';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SECTION_INNER, ofcSectionClasses } from '@/lib/ofc-section-classes';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: string }[] {
  return getFormateurProfileStaticSlugs().map((slug) => ({ slug }));
}

function pagePath(slug: string): string {
  return formateurPublicProfilePath(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (isLaureFormateurSlug(slug)) {
    return { robots: { index: false, follow: true } };
  }
  const formateur = getHubFormateurProfileBySlug(slug);
  if (!formateur) {
    return { title: 'Formateur introuvable' };
  }
  const fullName = `${formateur.prenom} ${formateur.nom}`;
  const path = pagePath(slug);
  const description = `${fullName}, formateur IA BTP chez Laure Olivié : ${formateur.intitule}. Formations ChatGPT et Claude en présentiel en Île-de-France. Réservez une visio découverte.`;

  return {
    ...createPageMetadata({
      title: `${fullName} — formateur IA BTP`,
      titleAbsolute: `${fullName} — formateur IA BTP | Laure Olivié`,
      description,
      descriptionFinal: true,
      path,
      appendAuthorSuffix: false,
      keywords: [
        'formateur IA BTP',
        fullName,
        'formation intelligence artificielle bâtiment',
        'Laure Olivié',
      ],
    }),
    title: { absolute: `${fullName} — formateur IA BTP | Laure Olivié` },
  };
}

export default async function FormateurProfilPage({ params }: Props) {
  const { slug } = await params;

  if (isLaureFormateurSlug(slug)) {
    redirect(LINKS.aPropos);
  }

  const formateur = getHubFormateurProfileBySlug(slug);
  if (!formateur) notFound();

  const fullName = `${formateur.prenom} ${formateur.nom}`;
  const path = pagePath(slug);
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const profileUrl = formateurPublicProfileAbsoluteUrl(formateur, base);
  const image =
    formateur.portrait.kind === 'photo' ? `${base}${formateur.portrait.src}` : undefined;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${profileUrl}#person`,
    name: fullName,
    jobTitle: formateur.intitule,
    description: formateur.parcours,
    ...(image ? { image } : {}),
    url: profileUrl,
    worksFor: { '@id': `${base}/#organization` },
  };

  return (
    <main className="min-w-0">
      <JsonLd id={`schema-formateur-${formateur.id}`} schema={personSchema} />
      <BreadcrumbJsonLd
        id={`schema-breadcrumb-formateur-${formateur.id}`}
        items={[
          { name: 'Accueil', url: `${base}/` },
          { name: 'Formateurs', url: `${base}${LINKS.formateurs}` },
          { name: fullName, url: `${base}${path}` },
        ]}
      />

      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
        aria-labelledby="formateur-profil-h1"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <nav aria-label="Fil d’Ariane" className="text-sm text-ofc-ink-muted">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href={LINKS.home} className={OFC_LINK}>
                  Accueil
                </Link>
              </li>
              <li aria-hidden>·</li>
              <li>
                <Link href={LINKS.formateurs} className={OFC_LINK}>
                  Formateurs
                </Link>
              </li>
              <li aria-hidden>·</li>
              <li className="font-medium text-ofc-ink">{fullName}</li>
            </ol>
          </nav>

          <ContentUpdatedLine className="mt-4" date={FORMATEUR_PROFILE_CONTENT_UPDATED_AT} />

          <EnBref className="mt-6">{formateurProfileEnBref(formateur)}</EnBref>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
            <FormateurPortraitView portrait={formateur.portrait} shape="portrait" priority />
            <div className="min-w-0 flex-1">
              <h1
                id="formateur-profil-h1"
                className="font-display text-2xl font-bold text-ofc-ink text-pretty sm:text-3xl"
              >
                {fullName}
              </h1>
              <p className="mt-2 text-base font-medium text-ofc-accent text-pretty">
                {formateur.intitule}
              </p>
              <p className="mt-4 text-base leading-relaxed text-ofc-ink-muted text-pretty">
                {formateur.parcours}
              </p>
              {formateur.modalite ? (
                <p className="mt-3 text-sm text-ofc-ink-muted">{formateur.modalite}</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className={ofcSectionClasses({ tone: 'muted', size: 'compact', divide: true })}>
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <FormateurProfileDetail formateur={formateur} includeIntro={false} />
        </div>
      </section>

      <section className={ofcSectionClasses({ tone: 'white', size: 'compact' })}>
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 className="font-display text-xl font-bold text-ofc-ink text-pretty">
            Un projet de formation avec {formateur.prenom} ?
          </h2>
          <p className="mt-2 text-base text-ofc-ink-muted">
            Échange gratuit pour cadrer vos besoins et le format en présentiel en Île-de-France.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaVisio src={`formateur-${formateur.slug}`} />
            <CtaDevis />
          </div>
          <p className="mt-8">
            <Link href={LINKS.formateurs} className={`${OFC_LINK} text-sm font-semibold`}>
              ← Tous les formateurs
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}