/**
 * Landing SEO par département — Course + Service + FAQ + BreadcrumbList JSON-LD.
 * Les barres d’action fixes Calendly / blog (`CalendlyFloatingButton`, `StickyBlogMetierRdvBar`) sont rendues
 * globalement dans `app/layout.tsx` pour toutes les pages.
 */
import Link from 'next/link';
import { Calendar, Check, MapPin, Quote } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { FAQSection } from '@/components/landing/FAQSection';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import type { FAQItem } from '@/lib/faq';
import { LINKS } from '@/lib/internal-links';
import {
  buildFormationIaCourseJsonLd,
  buildFormationIaDeptPageLocalBusinessJsonLd,
  buildFormationIaServiceJsonLd,
} from '@/lib/seo-formation-ia-schemas';
import {
  breadcrumbItemsFromPaths,
  createPageMetadata,
  getBreadcrumbSchema,
  getFAQSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

export type FormationIaBtpDeptLandingConfig = {
  path: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Nom du département seul, ex. « Yvelines » */
  departementNom: string;
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
  return createPageMetadata({
    title: config.metaTitle,
    titleAbsolute: config.metaTitle,
    description: config.metaDescription,
    path: config.path,
    keywords: config.keywords,
    appendAuthorSuffix: false,
    openGraphType: 'article',
    article: {
      publishedTime: '2026-04-15',
      modifiedTime: '2026-04-15',
      author: SITE_CONFIG.name,
      section: 'Formation IA BTP',
    },
    image: {
      url: '/images/laure-olivie-formatrice.png',
      width: 1200,
      height: 630,
      alt: `${config.departementNom} (${config.deptCode}) — formation IA BTP Qualiopi, Laure Olivié`,
    },
  });
}

export function FormationIaBtpDepartementLanding({ config }: { config: FormationIaBtpDeptLandingConfig }) {
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

  const crumbDept = `${config.departementNom} (${config.deptCode})`;
  const breadcrumbItems = breadcrumbItemsFromPaths([
    { name: 'Accueil', path: '/' },
    { name: crumbDept, path: config.path },
  ]);
  const breadcrumbJson = getBreadcrumbSchema([
    { name: 'Accueil', path: '/' },
    { name: crumbDept, path: config.path },
  ]);

  const faqSchema = getFAQSchema(config.faq);

  return (
    <div className="bg-white text-slate-900">
      <JsonLd id={`schema-formation-ia-dept-${config.deptCode}-course`} schema={courseJson} />
      <JsonLd id={`schema-formation-ia-dept-${config.deptCode}-service`} schema={serviceJson} />
      <JsonLd id={`schema-formation-ia-dept-${config.deptCode}-localbusiness`} schema={localBusinessJson} />
      <JsonLd id={`schema-formation-ia-dept-${config.deptCode}-breadcrumb`} schema={breadcrumbJson} />
      <JsonLd id={`schema-formation-ia-dept-${config.deptCode}-faq`} schema={faqSchema} />

      <div className="mx-auto max-w-6xl px-4 pt-8">
        <nav aria-label="Fil d&apos;Ariane" className="text-sm text-slate-600">
          <ol className="flex flex-wrap items-center gap-1.5">
            {breadcrumbItems.map((item, i) => (
              <li key={item.url} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-slate-400" aria-hidden>/</span>}
                {i === breadcrumbItems.length - 1 ? (
                  <span className="font-medium text-slate-900">{item.name}</span>
                ) : (
                  <Link href={item.url} className="text-[#377CF3] hover:underline">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <section className="border-b border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
            {config.badgeLine}
          </p>
          <h1 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem]">
            {config.h1}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Organisme certifié <strong className="text-slate-800">Qualiopi</strong>, formations IA
            &amp; ChatGPT pour le bâtiment et les travaux publics — sessions de 4 h, sur vos
            documents réels. Plus de{' '}
            <strong className="text-slate-800">{formatProfessionalsTrainedCount()} professionnels</strong>{' '}
            formés · note <strong className="text-slate-800">{SOCIAL_PROOF.AVERAGE_RATING}</strong>.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-[#F2F2F2] px-4 py-2 text-sm text-slate-700">
            <MapPin size={16} className="text-[#377CF3]" aria-hidden />
            Siège : Guyancourt (78) — interventions dans les {config.departementNom} ({config.deptCode})
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RdvLink className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#2d6ae0]">
              <Calendar size={20} strokeWidth={1.5} aria-hidden />
              Prendre rendez-vous découverte (Calendly)
            </RdvLink>
            <Link
              href="#maillage-formation-ia-btp"
              className="inline-flex items-center justify-center rounded-xl border-2 border-[#377CF3] px-6 py-3.5 text-sm font-semibold text-[#377CF3] hover:bg-blue-50"
            >
              Catalogue, Paris, blog…
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Réservation en ligne :{' '}
            <a
              href={CALENDLY_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
            >
              {CALENDLY_BOOKING_URL}
            </a>
          </p>
        </div>
      </section>

      <section className="scroll-mt-24 border-b border-slate-200 bg-[#F2F2F2] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            BTP dans le {config.departementNom} ({config.deptCode}) : un tissu d&apos;entreprises et des défis communs
          </h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            {config.tissuBtpLocal.map((p, i) => (
              <p key={`tissu-${i}`}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{config.problemTitle}</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            {config.problemBody.map((p, i) => (
              <p key={`pb-${i}`}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{config.solutionTitle}</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            {config.solutionBody.map((p, i) => (
              <p key={`sb-${i}`}>{p}</p>
            ))}
          </div>
          <p className="mt-8 text-slate-700 leading-relaxed">
            Pour une vue d&apos;ensemble des modules (BTP-01 à BTP-05), le catalogue des formations, la page Paris et
            l&apos;angle pédagogique Qualiopi, reportez-vous au bloc « Liens utiles » un peu plus bas : tout y est regroupé
            pour éviter les doublons de navigation et garder une lecture fluide.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{config.villesTitle}</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">{config.villesIntro}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {config.cities.map((ville) => (
              <li
                key={ville}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm"
              >
                <Check className="h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
                {ville}
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-4 text-slate-700 leading-relaxed">
            {config.villesFooter.map((p, i) => (
              <p key={`vf-${i}`}>{p}</p>
            ))}
          </div>
          <aside className="mt-10 rounded-2xl border border-[#377CF3]/30 bg-white p-6 shadow-sm md:p-8">
            <h3 className="font-display text-lg font-bold text-slate-900">Déplacement depuis Guyancourt (78)</h3>
            <p className="mt-3 text-slate-700 leading-relaxed">{config.deplacementGuyancourt}</p>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{config.programmeTitle}</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            {config.programmeBody.map((p, i) => (
              <p key={`pg-${i}`}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Cinq cas d&apos;usage standard travaillés en formation
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Ces usages sont adaptés au vocabulaire du BTP ; chaque sortie reste une base de relecture, jamais un envoi
            sans validation interne.
          </p>
          <ol className="mt-8 list-decimal space-y-4 pl-5 text-slate-700 marker:font-semibold">
            {config.casUsageStandard.map((item, i) => (
              <li key={`cas-${i}`} className="leading-relaxed pl-1">
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Réseau FFB et ancrage dans le territoire
          </h2>
          <p className="mt-6 text-slate-700 leading-relaxed">{config.casClientFfb}</p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{config.temoignagesTitle}</h2>
          <p className="mt-4 text-slate-600">
            Retours anonymisés de participants en Île-de-France — entreprises du BTP ayant suivi une
            session chez OFC Création d&apos;Entreprise (noms et marques modifiés lorsque nécessaire).
          </p>
          <ul className="mt-8 space-y-6">
            {config.temoignages.map((t) => (
              <li
                key={t.attribution}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <Quote className="h-8 w-8 text-[#377CF3]/40" aria-hidden />
                <blockquote className="mt-2 text-slate-800 leading-relaxed">&laquo; {t.text} &raquo;</blockquote>
                <figcaption className="mt-3 text-sm font-medium text-slate-600">{t.attribution}</figcaption>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="maillage-formation-ia-btp"
        className="scroll-mt-28 border-b border-slate-200 bg-white px-4 py-14"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Liens utiles</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Accès direct aux ressources les plus consultées après une recherche « formation IA BTP » par département :
            catalogue officiel, page Paris (alias court /formation-ia-btp-paris), présentation de la formatrice et
            articles de fond.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            <li>
              <Link
                href={LINKS.formations}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 font-semibold text-[#377CF3] transition hover:border-[#377CF3] hover:bg-white"
              >
                <span className="text-slate-900">Catalogue des formations</span>
                <span className="mt-2 text-sm font-normal text-slate-600">
                  Modules BTP-01 à BTP-05, durées 4 h, objectifs Qualiopi.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.formationIaBtpParis}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 font-semibold text-[#377CF3] transition hover:border-[#377CF3] hover:bg-white"
              >
                <span className="text-slate-900">Formation IA BTP — Paris</span>
                <span className="mt-2 text-sm font-normal text-slate-600">
                  Paris &amp; petite couronne (redirection canonique vers la fiche catalogue).
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.aPropos}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 font-semibold text-[#377CF3] transition hover:border-[#377CF3] hover:bg-white"
              >
                <span className="text-slate-900">À propos</span>
                <span className="mt-2 text-sm font-normal text-slate-600">
                  Parcours, Qualiopi, références FFB et méthode terrain.
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.blog}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 font-semibold text-[#377CF3] transition hover:border-[#377CF3] hover:bg-white"
              >
                <span className="text-slate-900">Blog IA &amp; BTP</span>
                <span className="mt-2 text-sm font-normal text-slate-600">
                  Guides, cas d&apos;usage, bonnes pratiques Constructys.
                </span>
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-sm text-slate-500">
            Sur ce site, un rappel discret pour prendre rendez-vous et un accès rapide au blog restent visibles en bas
            d&apos;écran sur la plupart des pages (layout global) — typographie Inter / Outfit, accent #377CF3.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{config.financeTitle}</h2>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            {config.financeBody.map((p, i) => (
              <p key={`fb-${i}`}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={LINKS.financement}
              className="inline-flex rounded-xl bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2d6ae0]"
            >
              Financement Constructys — guide
            </Link>
            <Link
              href={LINKS.contact}
              className="inline-flex rounded-xl border-2 border-[#377CF3] px-6 py-3 text-sm font-semibold text-[#377CF3] hover:bg-blue-50"
            >
              Contact / demande de devis
            </Link>
          </div>
        </div>
      </section>

      <FAQSection
        id={`faq-formation-ia-dept-${config.deptCode}`}
        items={config.faq}
        title={`FAQ — formation IA BTP ${crumbDept}`}
        subtitle="Déplacements, formats intra / inter, distanciel, financement et calendrier."
      />

      <section className="border-b border-slate-200 bg-[#377CF3] px-4 py-14 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Réserver un créneau découverte</h2>
          <p className="mt-4 text-blue-100">
            30 minutes pour cadrer votre besoin dans le {config.deptCode} — présentiel, intra-entreprise ou
            distanciel selon vos contraintes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-[#377CF3] hover:bg-blue-50">
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
