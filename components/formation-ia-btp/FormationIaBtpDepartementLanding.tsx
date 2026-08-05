/**
 * Landing SEO par département — Course + Service + FAQ + BreadcrumbList JSON-LD.
 * Les barres d’action fixes Calendly / blog (`CalendlyFloatingButton`, `StickyBlogMetierRdvBar`) sont rendues
 * globalement dans `app/layout.tsx` pour toutes les pages.
 */
import Link from 'next/link';
import { Calendar, Check, MapPin } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { FAQSection } from '@/components/landing/FAQSection';
import { StatCallout } from '@/components/readability/StatCallout';
import { Citation } from '@/components/readability/Citation';
import type { FAQItem } from '@/lib/faq';
import { LINKS } from '@/lib/internal-links';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { VoirAussi } from '@/components/VoirAussi';
import {
  FORMATION_CATALOGUE_CORE,
  GEO_DEPARTMENT_EXTENDED,
  getGeoSisterDepartmentLinks,
} from '@/lib/contextual-internal-links';
import { voirAussiDepartementProps } from '@/lib/voir-aussi';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import {
  buildFormationIaCourseJsonLd,
  buildFormationIaDeptPageLocalBusinessJsonLd,
  buildFormationIaServiceJsonLd,
} from '@/lib/seo-formation-ia-schemas';
import {
  createPageMetadata,
  getFAQSchema,
} from '@/lib/seo';
import { COUNT_UP_PROS, COUNT_UP_RATING, getStatsFreshnessLabel } from '@/lib/readability-presets';
import { FormationDeptLocalSeoBlock } from '@/components/formation-ia-btp/FormationDeptLocalSeoBlock';
import { RelatedLinks } from '@/components/RelatedLinks';
import { getClusterRelatedHrefs } from '@/lib/maillage-clusters';
import { getDeptLocalSeoContent } from '@/lib/formation-ia-btp-dept-local-content';
import type { DeptArticle, DeptPrepositionLocative } from '@/lib/formation-ia-btp-dept-grammar';
import { deptLocatif } from '@/lib/formation-ia-btp-dept-grammar';

export type FormationIaBtpDeptLandingConfig = {
  path: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Nom du département seul, ex. « Yvelines » — alias de `nom` */
  departementNom: string;
  /** Nom nu (même valeur que `departementNom`) */
  nom: string;
  /** Article défini : le | la | l' | les | null (Paris) */
  article: DeptArticle;
  /** Préposition locative : « en », « dans les », « à »… */
  prepositionLocative: DeptPrepositionLocative;
  deptCode: string;
  badgeLine: string;
  cities: string[];
  courseName: string;
  courseDescription: string;
  serviceName: string;
  serviceDescription: string;
  areaServedCourse: string[];
  areaServedService: string[];
  problemTitle: string;
  problemBody: string[];
  solutionTitle: string;
  solutionBody: string[];
  villesTitle: string;
  villesIntro: string;
  villesFooter: string[];
  programmeTitle: string;
  programmeBody: string[];
  temoignagesTitle: string;
  temoignages: { text: string; attribution: string }[];
  financeTitle: string;
  financeBody: string[];
  faq: FAQItem[];
  /** Présentation du tissu BTP local (2–3 paragraphes) */
  tissuBtpLocal: string[];
  /** Cinq cas d’usage types travaillés en formation */
  casUsageStandard: string[];
  /** Déplacement depuis Guyancourt, inclus, 30 min IDF */
  deplacementGuyancourt: string;
  /** Réseau FFB / cas client selon département */
  casClientFfb: string;
};

export function formationIaBtpDeptMetadata(config: FormationIaBtpDeptLandingConfig) {
  const grammar = {
    nom: config.nom,
    article: config.article,
    prepositionLocative: config.prepositionLocative,
  };
  return createPageMetadata({
    title: config.metaTitle,
    titleAbsolute: config.metaTitle,
    description: config.metaDescription,
    descriptionFinal: true,
    path: config.path,
    keywords: config.keywords,
    appendAuthorSuffix: false,
    openGraphType: 'website',
    image: {
      url: '/images/laure-olivie-formatrice-ia-btp-qualiopi.webp',
      width: 1200,
      height: 630,
      alt: `Session formation IA ${deptLocatif(grammar)} (${config.deptCode}) — Laure Olivié Qualiopi`,
    },
  });
}

export function FormationIaBtpDepartementLanding({ config }: { config: FormationIaBtpDeptLandingConfig }) {
  const locatif = deptLocatif({
    nom: config.nom,
    article: config.article,
    prepositionLocative: config.prepositionLocative,
  });

  const courseJson = buildFormationIaCourseJsonLd({
    name: config.courseName,
    description: config.courseDescription,
    path: config.path,
    areaServed: config.areaServedCourse,
  });

  const serviceJson = buildFormationIaServiceJsonLd({
    name: config.serviceName,
    description: config.serviceDescription,
    path: config.path,
    areaServed: config.areaServedService,
  });

  const localBusinessJson = buildFormationIaDeptPageLocalBusinessJsonLd({
    path: config.path,
    departementNom: config.departementNom,
    deptCode: config.deptCode,
    description: config.metaDescription,
  });

  const crumbDept = `${config.nom} (${config.deptCode})`;
  const localContent = getDeptLocalSeoContent(config.deptCode);
  const statsFreshness = getStatsFreshnessLabel();

  const faqSchema = getFAQSchema(
    localContent ? [...localContent.faq, ...config.faq.slice(3)] : config.faq,
  );

  return (
    <div className="bg-white text-slate-900">
      <JsonLd id={`schema-formation-ia-dept-${config.deptCode}-course`} schema={courseJson} />
      <JsonLd id={`schema-formation-ia-dept-${config.deptCode}-service`} schema={serviceJson} />
      <JsonLd id={`schema-formation-ia-dept-${config.deptCode}-localbusiness`} schema={localBusinessJson} />
      <JsonLd id={`schema-formation-ia-dept-${config.deptCode}-faq`} schema={faqSchema} />

      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
            {config.badgeLine}
          </p>
          <h1 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem]">
            {config.h1}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-slate-600 md:text-2xl">
            Qualiopi · sessions 4 h · vos documents réels.
          </p>
        </div>

        {localContent ? (
          <FormationDeptLocalSeoBlock
            content={localContent}
            emitFaqSchema={false}
            variant="underH1"
          />
        ) : null}

        <div className="mx-auto max-w-4xl">
          <div className="mt-4 flex flex-wrap gap-3">
            <StatCallout
              variant="inline"
              value={COUNT_UP_PROS}
              label="professionnels formés"
              freshnessLabel={statsFreshness}
            />
            <StatCallout
              variant="inline"
              value={COUNT_UP_RATING}
              label="note moyenne"
              freshnessLabel={statsFreshness}
            />
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[#F2F2F2] px-4 py-2 text-base text-slate-700">
            <MapPin size={16} className="text-[#377CF3]" aria-hidden />
            Siège : Guyancourt (78) — interventions {locatif} ({config.deptCode})
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RdvLink
              campaign={`dept-${config.path.replace('/formation-ia-btp-', '')}`}
              ctaPosition="hero"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3.5 text-center text-base font-semibold text-white shadow-sm transition hover:bg-[#2d6ae0]"
            >
              <Calendar size={20} strokeWidth={1.5} aria-hidden />
              Échanger sur vos besoins
            </RdvLink>
            <Link
              href="#maillage-formation-ia-btp"
              className="inline-flex items-center justify-center rounded-xl border-2 border-[#377CF3] px-6 py-3.5 text-base font-semibold text-[#377CF3] hover:bg-blue-50"
            >
              Catalogue, Paris, blog…
            </Link>
          </div>
          <p className="mt-6 text-base text-slate-500">
            Visio découverte gratuite (Calendly), sans engagement.
          </p>
        </div>
      </section>

      <section className={`${OFC_SEC.muted} scroll-mt-24`}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            BTP {locatif} ({config.deptCode}) : défis communs
          </h2>
          <div className="mt-6 space-y-4 text-base text-slate-700 leading-relaxed md:text-lg">
            {config.tissuBtpLocal.map((p, i) => (
              <p key={`tissu-${i}`}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={`${OFC_SEC.white} scroll-mt-24`}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{config.problemTitle}</h2>
          <div className="mt-6 space-y-4 text-base text-slate-700 leading-relaxed md:text-lg">
            {config.problemBody.map((p, i) => (
              <p key={`pb-${i}`}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={`${OFC_SEC.white} scroll-mt-24`}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{config.solutionTitle}</h2>
          <div className="mt-6 space-y-4 text-base text-slate-700 leading-relaxed md:text-lg">
            {config.solutionBody.map((p, i) => (
              <p key={`sb-${i}`}>{p}</p>
            ))}
          </div>
          <p className="mt-8 text-base text-slate-700 leading-relaxed md:text-lg">
            Parcours NIV-01, NIV-02 et NIV-03, catalogue, Île-de-France et financement : voir le bloc « Liens utiles »
            ci-dessous.
          </p>
        </div>
      </section>

      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{config.villesTitle}</h2>
          <p className="mt-4 text-base text-slate-700 leading-relaxed md:text-lg">{config.villesIntro}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {config.cities.map((ville) => (
              <li
                key={ville}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 shadow-sm"
              >
                <Check className="h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
                {ville}
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-4 text-base text-slate-700 leading-relaxed md:text-lg">
            {config.villesFooter.map((p, i) => (
              <p key={`vf-${i}`}>{p}</p>
            ))}
          </div>
          <aside className="mt-10 rounded-2xl border border-[#377CF3]/30 bg-white p-6 shadow-sm md:p-8">
            <h3 className="font-display text-lg font-bold text-slate-900">Déplacement depuis Guyancourt (78)</h3>
            <p className="mt-3 text-base text-slate-700 leading-relaxed md:text-lg">{config.deplacementGuyancourt}</p>
          </aside>
        </div>
      </section>

      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{config.programmeTitle}</h2>
          <div className="mt-6 space-y-4 text-base text-slate-700 leading-relaxed md:text-lg">
            {config.programmeBody.map((p, i) => (
              <p key={`pg-${i}`}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Cinq cas d&apos;usage standard travaillés en formation
          </h2>
          <p className="mt-4 text-base text-slate-700 leading-relaxed md:text-lg">
            Ces usages sont adaptés au vocabulaire du BTP ; chaque sortie reste une base de relecture, jamais un envoi
            sans validation interne.
          </p>
          <ol className="mt-8 list-decimal space-y-4 pl-5 text-base text-slate-700 marker:font-semibold md:text-lg">
            {config.casUsageStandard.map((item, i) => (
              <li key={`cas-${i}`} className="leading-relaxed pl-1">
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Réseau FFB et ancrage dans le territoire
          </h2>
          <p className="mt-6 text-base text-slate-700 leading-relaxed md:text-lg">{config.casClientFfb}</p>
        </div>
      </section>

      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{config.temoignagesTitle}</h2>
          <p className="mt-4 text-base text-slate-600 md:text-lg">
            Retours anonymisés de participants aux sessions OFC en Île-de-France.
          </p>
          <ul className="mt-8 space-y-6">
            {config.temoignages.map((t) => (
              <li key={t.attribution}>
                <Citation quote={t.text} role={t.attribution} variant="client" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContextualLinksSection
        id="maillage-formation-ia-btp"
        title="Liens utiles"
        subtitle="Accès direct aux ressources les plus consultées après une recherche « formation IA pour le BTP » par département."
        links={[
          ...FORMATION_CATALOGUE_CORE,
          {
            href: LINKS.aPropos,
            title: 'À propos — Laure Olivié',
            description: 'Parcours, Qualiopi, références FFB et méthode terrain.',
          },
          {
            href: LINKS.blog,
            title: 'Blog IA & BTP',
            description: 'Guides, cas d’usage, bonnes pratiques Constructys.',
          },
        ].filter((l) => !getClusterRelatedHrefs(config.path).includes(l.href))}
      />

      <RelatedLinks path={config.path} />

      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{config.financeTitle}</h2>
          <div className="mt-6 space-y-4 text-base text-slate-700 leading-relaxed md:text-lg">
            {config.financeBody.map((p, i) => (
              <p key={`fb-${i}`}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={LINKS.financement}
              className="inline-flex rounded-xl bg-[#377CF3] px-6 py-3 text-base font-semibold text-white hover:bg-[#2d6ae0]"
            >
              Financement Constructys — guide
            </Link>
            <Link
              href={LINKS.contact}
              className="inline-flex rounded-xl border-2 border-[#377CF3] px-6 py-3 text-base font-semibold text-[#377CF3] hover:bg-blue-50"
            >
              Contact / demande de devis
            </Link>
          </div>
        </div>
      </section>

      <FAQSection
        id={`faq-formation-ia-dept-${config.deptCode}`}
        items={config.faq.slice(3)}
        title={`FAQ — formation IA appliquée au bâtiment ${crumbDept}`}
        subtitle="Formats intra / inter en présentiel, financement et calendrier."
      />

      <div className="mx-auto max-w-4xl px-4">
        <VoirAussi
          {...voirAussiDepartementProps({
            currentPath: config.path,
            excludeHrefs: [
              ...FORMATION_CATALOGUE_CORE.map((l) => l.href),
              LINKS.formationIleDeFrance,
              LINKS.aPropos,
              LINKS.blog,
              ...getClusterRelatedHrefs(config.path),
              ...getGeoSisterDepartmentLinks(
                config.path.replace('/formation-ia-btp-', ''),
                4,
                GEO_DEPARTMENT_EXTENDED
              ).map((l) => l.href),
            ],
          })}
        />
      </div>

      <section className={OFC_SEC.accent}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Réserver un créneau découverte</h2>
          <p className="mt-4 text-lg text-blue-100 md:text-xl">
            30 minutes pour cadrer votre besoin {locatif} ({config.deptCode}) — en présentiel, intra
            ou inter selon vos contraintes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RdvLink
              campaign={`dept-${config.path.replace('/formation-ia-btp-', '')}-footer`}
              ctaPosition="footer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-[#377CF3] hover:bg-blue-50"
            >
              <Calendar size={20} strokeWidth={1.5} aria-hidden />
              Ouvrir Calendly
            </RdvLink>
            <Link
              href={LINKS.diagnostic}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/80 px-8 py-4 font-semibold text-white hover:bg-white/10"
            >
              Diagnostic IA BTP gratuit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
