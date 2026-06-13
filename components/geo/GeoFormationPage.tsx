import Link from 'next/link';
import { Calendar, Check, MapPin } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { CTABlock } from '@/components/CTABlock';
import { RdvLink } from '@/components/RdvLink';
import { StatCallout } from '@/components/readability/StatCallout';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import {
  buildFormationIaCourseJsonLd,
  buildFormationIaDeptPageLocalBusinessJsonLd,
} from '@/lib/seo-formation-ia-schemas';
import { LINKS } from '@/lib/internal-links';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import {
  GEO_PAGE_UTILITY_LINKS,
  getGeoSisterDepartmentLinks,
} from '@/lib/contextual-internal-links';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { COUNT_UP_PROS, COUNT_UP_RATING, STATS_FRESHNESS_LABEL } from '@/lib/readability-presets';
import {
  GEO_FORMATION_CAS_USAGE,
  geoFormationDepartementLabel,
  geoFormationPath,
  type GeoFormationPageProps,
} from '@/lib/geo-formation-config';

export type { GeoFormationPageProps };

export function geoFormationMetadata(props: GeoFormationPageProps) {
  const { departement, code, villes, slug } = props;
  const deptLabel = geoFormationDepartementLabel(departement, code);
  const v0 = villes[0] ?? departement;
  const v1 = villes[1] ?? v0;
  const v2 = villes[2] ?? v1;

  return createPageMetadata({
    title: `Formation IA BTP ${departement} (${code}) — Qualiopi — Laure Olivié`,
    titleAbsolute: `Formation IA BTP ${departement} (${code}) — Qualiopi — Laure Olivié`,
    description: `Formation IA pour entreprises BTP ${deptLabel} (${code}) : ${v0}, ${v1}, ${v2}. Intra dans vos locaux. Qualiopi, Constructys. RDV gratuit.`,
    path: geoFormationPath(slug),
    appendAuthorSuffix: false,
    openGraphType: 'article',
    article: {
      publishedTime: '2026-06-02',
      modifiedTime: '2026-06-02',
      author: SITE_CONFIG.name,
      section: 'Formation IA pour les pro du BTP',
    },
    image: {
      url: '/images/hero-accueil-formation-ia-btp-echange-2026.png',
      width: 1024,
      height: 682,
      alt: `Formation IA BTP ${departement} (${code}) — Laure Olivié, Qualiopi, présentiel intra`,
    },
  });
}

export function GeoFormationPage(props: GeoFormationPageProps) {
  const { departement, code, villes, slug } = props;
  const path = geoFormationPath(slug);
  const deptLabel = `${departement} (${code})`;
  const deptPreposition = geoFormationDepartementLabel(departement, code);
  const villePrincipale = villes[0] ?? departement;

  const metaDescription = `Formation IA pour entreprises BTP ${deptPreposition} (${code}) : ${villes.slice(0, 3).join(', ')}. Intra dans vos locaux. Qualiopi, Constructys. RDV gratuit.`;

  const courseJsonLd = buildFormationIaCourseJsonLd({
    name: `Formation IA BTP ${deptLabel} — Qualiopi`,
    description: metaDescription,
    path,
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

      <div className="mx-auto max-w-6xl px-4 pt-8">
        <nav aria-label="Fil d'Ariane" className="text-sm text-slate-600">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href={LINKS.home} className="text-[#377CF3] hover:underline">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={LINKS.formations} className="text-[#377CF3] hover:underline">
                Formations
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-slate-900">{deptLabel}</li>
          </ol>
        </nav>
      </div>

      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
            {deptLabel} · Présentiel · Qualiopi · Constructys
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem]">
            Formation IA BTP {deptLabel} — Présentiel dans vos locaux
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 md:text-xl">
            Devis, comptes rendus, appels d&apos;offres et administratif : session 4 h sur vos documents
            réels — ChatGPT et Claude AI, certification Qualiopi.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <StatCallout
              variant="inline"
              value={COUNT_UP_PROS}
              label="professionnels formés"
              freshnessLabel={STATS_FRESHNESS_LABEL}
            />
            <StatCallout
              variant="inline"
              value={COUNT_UP_RATING}
              label="note moyenne"
              freshnessLabel={STATS_FRESHNESS_LABEL}
            />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RdvLink
              campaign={`geo-formation-${slug}-hero`}
              ctaPosition="hero"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3.5 text-center text-base font-semibold text-white shadow-sm transition hover:bg-[#2d6ae0]"
            >
              <Calendar size={20} strokeWidth={1.5} aria-hidden />
              Visio découverte gratuite — 30 min
            </RdvLink>
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
            sessions <strong>intra dans vos locaux</strong> ou <strong>inter en salle</strong> (proche de{' '}
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
            Formations <strong>intra dans vos locaux</strong> ou <strong>inter en salle</strong> en
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
            Artisans, PME bâtiment et travaux publics {deptPreposition} cherchent surtout à réduire le temps
            passé sur l&apos;administratif sans perdre le contrôle des prix et des engagements contractuels.
            En formation, nous travaillons ces cas concrets — toujours avec relecture humaine avant envoi.
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

      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-4xl px-4">
          <CTABlock
            title="Réservez votre visio découverte gratuite"
            description={
              <>
                30 minutes pour cadrer vos besoins {deptPreposition} : devis, CR, AO, financement
                Constructys. Formation certifiée Qualiopi — présentiel uniquement.
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
        links={GEO_PAGE_UTILITY_LINKS}
        tone="muted"
      />

      <ContextualLinksSection
        title={`Autres départements d'Île-de-France`}
        subtitle={`Vous intervenez hors ${deptLabel} ? Consultez les pages locales voisines.`}
        links={getGeoSisterDepartmentLinks(slug)}
        tone="white"
      />
    </div>
  );
}
