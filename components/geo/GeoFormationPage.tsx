import Link from 'next/link';
import { Calendar, Check, MapPin } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { CTABlock } from '@/components/CTABlock';
import { RdvLink } from '@/components/RdvLink';
import { StatCallout } from '@/components/readability/StatCallout';
import { IndicateursResultatsLink } from '@/components/formation/IndicateursResultatsLink';
import { buildMetadata, SITE_CONFIG } from '@/lib/seo';
import {
  buildFormationIaCourseJsonLd,
  buildFormationIaDeptPageLocalBusinessJsonLd,
} from '@/lib/seo-formation-ia-schemas';
import { LINKS } from '@/lib/internal-links';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { VoirAussi } from '@/components/VoirAussi';
import {
  getGeoPageUtilityLinks,
  getGeoSisterDepartmentLinks,
} from '@/lib/contextual-internal-links';
import { voirAussiDepartementProps } from '@/lib/voir-aussi';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { COUNT_UP_RATING, getStatsFreshnessLabel } from '@/lib/readability-presets';
import { buildDeptMetaDescription } from '@/lib/meta-description';
import { buildIdfDeptPageTitle } from '@/lib/seo-geo-keywords';
import {
  GEO_FORMATION_CAS_USAGE,
  geoFormationDepartementLabel,
  geoFormationPath,
  type GeoFormationPageProps,
} from '@/lib/geo-formation-config';
import { FormationDeptLocalSeoBlock } from '@/components/formation-ia-btp/FormationDeptLocalSeoBlock';
import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import { getDeptLocalSeoContent } from '@/lib/formation-ia-btp-dept-local-content';

export type { GeoFormationPageProps };

function geoMetaDescription(departement: string, code: string, villes: readonly string[]): string {
  const villesCourtes = villes.slice(0, 3).join(', ');
  return buildDeptMetaDescription(departement, code, villesCourtes);
}

export function geoFormationMetadata(props: GeoFormationPageProps) {
  const { departement, code, villes, slug, seo } = props;
  const title = seo?.title ?? buildIdfDeptPageTitle(departement, code);
  const description =
    seo?.description ?? geoMetaDescription(departement, code, villes);

  return buildMetadata({
    title,
    description,
    descriptionFinal: true,
    path: geoFormationPath(slug),
    openGraphType: 'website',
    image: {
      url: '/images/formation-ia-btp-laure-olivie-ile-de-france.webp',
      width: 1024,
      height: 682,
      alt: `Formation IA BTP ${departement} (${code}) — présentiel intra`,
    },
  });
}

export function GeoFormationPage(props: GeoFormationPageProps) {
  const { departement, code, villes, slug, h1, heroIntro, conversionLink } = props;
  const path = geoFormationPath(slug);
  const deptLabel = `${departement} (${code})`;
  const deptPreposition = geoFormationDepartementLabel(departement, code);
  const villePrincipale = villes[0] ?? departement;

  const metaDescription = geoMetaDescription(departement, code, villes);

  const defaultH1 = `Formation IA BTP ${deptLabel} — Présentiel dans vos locaux`;
  const defaultIntro =
    "Devis, comptes rendus, appels d'offres et administratif : session 4 h sur vos documents réels — ChatGPT et Claude AI, organisme certifié Qualiopi.";

  const localContent = getDeptLocalSeoContent(code);

  const statsFreshness = getStatsFreshnessLabel();

  const courseJsonLd = buildFormationIaCourseJsonLd({
    areaServed: [departement, ...villes, 'Île-de-France', 'France'],
  });

  const localBusinessJsonLd = buildFormationIaDeptPageLocalBusinessJsonLd({
    path,
    departementNom: departement,
    deptCode: code,
    description: metaDescription,
  });

  return (
    <div className="bg-white text-slate-800">
      <JsonLd id={`schema-geo-course-${code}`} schema={courseJsonLd} />
      <JsonLd id={`schema-geo-localbusiness-${code}`} schema={localBusinessJsonLd} />

      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="min-w-0 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
                {deptLabel} · Présentiel · organisme certifié Qualiopi · Constructys
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem]">
                {h1 ?? defaultH1}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 md:text-xl">
                {heroIntro ?? defaultIntro}
              </p>
          </div>
        </div>

        {localContent ? (
          <FormationDeptLocalSeoBlock content={localContent} variant="underH1" />
        ) : null}

        <div className="mx-auto max-w-6xl px-4 pb-12 pt-4">
          {conversionLink ? (
            <p className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
              <span className="font-medium text-slate-900">Fiche conversion :</span>{' '}
              <Link href={conversionLink.href} className="font-medium text-[#377CF3] hover:underline">
                {conversionLink.label}
              </Link>
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-3">
            <StatCallout
              variant="inline"
              value={COUNT_UP_RATING}
              label="Satisfaction (Qualiopi)"
              freshnessLabel={statsFreshness}
            />
          </div>
          <IndicateursResultatsLink className="mt-3 text-left" />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RdvLink
              campaign={`geo-formation-${slug}-hero`}
              ctaPosition="hero"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3.5 text-center text-base font-semibold text-white shadow-sm transition hover:bg-[#2d6ae0]"
             />
            <Link
              href={LINKS.formationIaBtpNiveau1BatimentTp}
              className="inline-flex items-center justify-center rounded-xl border-2 border-[#377CF3] px-6 py-3.5 text-base font-semibold text-[#377CF3] hover:bg-blue-50"
            >
              Programme NIV-01
            </Link>
          </div>
        </div>
      </section>

      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Formatrice basée à Guyancourt (78)
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
            <strong>Laure Olivié</strong> intervient dans tout le département {deptPreposition} ({code}) :
            sessions <strong>intra-entreprise, dans vos locaux</strong> (proche de{' '}
            {villePrincipale}). Siège {SITE_CONFIG.legalName} à Guyancourt — déplacements Île-de-France
            précisés au devis, sans surprise.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-base text-slate-700">
            <MapPin size={16} className="text-[#377CF3]" aria-hidden />
            Guyancourt (78) → interventions {deptPreposition}
          </div>
        </div>
      </section>

      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Villes et bassins couverts {deptPreposition} ({code})
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
            Liste indicative — intra-entreprise dans vos locaux ou sur site. Échange gratuit de 30 min pour
            confirmer la logistique.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {villes.map((ville) => (
              <li
                key={ville}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-[#F2F2F2] px-4 py-3 text-base text-slate-800"
              >
                <Check className="h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
                {ville}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base leading-relaxed text-slate-600">
            Formations <strong>intra-entreprise, dans vos locaux</strong> en
            Île-de-France — créneaux souvent disponibles à proximité de {villePrincipale}.
          </p>
        </div>
      </section>

      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Les PME BTP {deptPreposition} : à quoi utilisent-elles l&apos;IA ?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
            Professionnels du BTP et PME du bâtiment {deptPreposition} cherchent surtout à réduire le temps
            passé sur l&apos;administratif sans perdre le contrôle des prix et des engagements contractuels.
            En formation, je travaille ces cas concrets — toujours avec relecture humaine avant envoi.
          </p>
          <ol className="mt-8 list-decimal space-y-4 pl-5 text-base text-slate-700 marker:font-semibold md:text-lg">
            {GEO_FORMATION_CAS_USAGE.map((item) => (
              <li key={item} className="leading-relaxed pl-1">
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <RenvoiFicheCatalogue programmeRef="NIV-01" contexte={`en ${deptLabel}`} />

      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-4xl px-4">
          <CTABlock
            title="Prendre rendez-vous"
            description={
              <>
                30 minutes pour cadrer vos besoins {deptPreposition} : devis, CR, AO, financement
                Constructys. Formation dispensée par un organisme certifié Qualiopi — présentiel uniquement.
              </>
            }
            primaryLabel="Prendre rendez-vous (30 min, gratuit)"
            primaryHref={LINKS.prendreRdv}
            primaryCalendlyCampaign={`geo-formation-${slug}-cta-block`}
            secondaryLabel="Catalogue des formations"
            secondaryHref={LINKS.formations}
          />
        </div>
      </section>

      <ContextualLinksSection
        id="maillage-formation-ia-btp"
        title="Catalogue et ressources"
        subtitle="Programmes officiels, financement et présentation de la formatrice."
        links={getGeoPageUtilityLinks()}
        tone="muted"
      />

      <ContextualLinksSection
        title={`Autres départements d'Île-de-France`}
        subtitle={`Vous intervenez hors ${deptLabel} ? Consultez les pages locales voisines.`}
        links={getGeoSisterDepartmentLinks(slug)}
        tone="white"
      />

      <div className="mx-auto max-w-4xl px-4 pb-12">
        <VoirAussi
          {...voirAussiDepartementProps({
            currentPath: geoFormationPath(slug),
            excludeHrefs: [
              ...getGeoPageUtilityLinks().map((l) => l.href), ...getGeoSisterDepartmentLinks(slug).map((l) => l.href),
            ],
          })}
        />
      </div>
    </div>
  );
}
