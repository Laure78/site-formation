/**
 * Page département unifiée — une seule structure pour Paris + 77/78/91–95.
 * Blocs 2–7 : contenu propre (données). Blocs 8–11 : composants partagés identiques.
 */
import Link from 'next/link';
import { Calendar, Check } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { FAQSection } from '@/components/landing/FAQSection';
import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { VoirAussi } from '@/components/VoirAussi';
import { DepartementFormatriceGuyancourt } from '@/components/formation-ia-btp/DepartementFormatriceGuyancourt';
import { DepartementCasUsageStandard } from '@/components/formation-ia-btp/DepartementCasUsageStandard';
import { TemoignagesRegion } from '@/components/formation-ia-btp/TemoignagesRegion';
import type { DepartementPageData } from '@/lib/departement-pages/types';
import { deptLocatif } from '@/lib/formation-ia-btp-dept-grammar';
import {
  buildFormationIaCourseJsonLd,
  buildFormationIaDeptPageLocalBusinessJsonLd,
} from '@/lib/seo-formation-ia-schemas';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import {
  FORMATION_CATALOGUE_CORE,
  GEO_DEPARTMENT_EXTENDED,
  getGeoSisterDepartmentLinks,
} from '@/lib/contextual-internal-links';
import { voirAussiDepartementProps } from '@/lib/voir-aussi';
import { getClusterRelatedHrefs } from '@/lib/maillage-clusters';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { buildDeptMetaDescription } from '@/lib/meta-description';
import { buildIdfDeptPageTitle } from '@/lib/seo-geo-keywords';

export function departementPageMetadata(data: DepartementPageData) {
  const grammar = {
    nom: data.nom,
    article: data.article,
    prepositionLocative: data.prepositionLocative,
  };
  const locatif = deptLocatif(grammar);
  const metaTitle = data.metaTitle ?? buildIdfDeptPageTitle(data.nom, data.code);
  const metaDescription =
    data.metaDescription ??
    buildDeptMetaDescription(data.nom, data.code, data.villes.slice(0, 3).join(', '));

  return createPageMetadata({
    title: metaTitle,
    titleAbsolute: metaTitle,
    description: metaDescription,
    descriptionFinal: true,
    path: data.path,
    keywords: data.keywords,
    appendAuthorSuffix: false,
    openGraphType: 'website',
    image: {
      url: '/images/laure-olivie-formatrice-ia-btp-qualiopi.webp',
      width: 1200,
      height: 630,
      alt: `Session formation IA ${locatif} (${data.code}) — Laure Olivié — organisme certifié Qualiopi`,
    },
  });
}

export function DepartementPage({ data }: { data: DepartementPageData }) {
  const grammar = {
    nom: data.nom,
    article: data.article,
    prepositionLocative: data.prepositionLocative,
  };
  const locatif = deptLocatif(grammar);
  const deptLabel = `${data.nom} (${data.code})`;
  const h1 = `Formation IA BTP ${deptLabel} — présentiel dans vos locaux`;
  const campaign = `dept-${data.code}`;

  const metaDescription =
    data.metaDescription ??
    buildDeptMetaDescription(data.nom, data.code, data.villes.slice(0, 3).join(', '));

  const courseJson = buildFormationIaCourseJsonLd({
    areaServed: [data.nom, ...data.villes, 'Île-de-France', 'France'],
  });

  const localBusinessJson = buildFormationIaDeptPageLocalBusinessJsonLd({
    path: data.path,
    departementNom: data.nom,
    deptCode: data.code,
    description: metaDescription,
  });

  const faqSchema = getFAQSchema([...data.faqLocale]);
  const sisterLinks = getGeoSisterDepartmentLinks(data.slug, 4, GEO_DEPARTMENT_EXTENDED);
  const clusterExcludes = getClusterRelatedHrefs(data.path);
  const utilityLinks = [
    ...FORMATION_CATALOGUE_CORE.filter(
      (l) => !clusterExcludes.includes(l.href) && l.href !== data.metierPertinent.href,
    ).slice(0, 3),
    {
      href: data.metierPertinent.href,
      title: data.metierPertinent.label,
      description: data.metierPertinent.description,
    },
  ].filter((l) => l.href !== data.path);

  return (
    <div className="bg-white text-slate-900">
      <JsonLd id={`schema-dept-${data.code}-course`} schema={courseJson} />
      <JsonLd id={`schema-dept-${data.code}-localbusiness`} schema={localBusinessJson} />
      <JsonLd id={`schema-dept-${data.code}-faq`} schema={faqSchema} />

      {/* 1. Breadcrumb + H1 */}
      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-4xl">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: LINKS.home },
              { label: 'Formations', href: LINKS.formations },
              { label: deptLabel, href: data.path },
            ]}
            jsonLdId={`breadcrumb-dept-${data.code}`}
          />
          <h1 className="font-display mt-6 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem]">
            {h1}
          </h1>

          {/* 2. Chapô */}
          <p className="mt-6 text-lg leading-relaxed text-slate-700 md:text-xl">{data.accroche}</p>
        </div>
      </section>

      {/* 3. Villes & secteurs */}
      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Villes &amp; secteurs desservis
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
            {data.tempsTrajetGuyancourt}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {data.villes.map((ville) => (
              <li
                key={ville}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 shadow-sm"
              >
                <Check className="h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
                {ville}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Tissu BTP local */}
      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Tissu BTP local
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg whitespace-pre-line">
            {data.tissuLocal}
          </p>
        </div>
      </section>

      {/* 5. 2 cas d’usage locaux */}
      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            2 cas d&apos;usage prioritaires {locatif}
          </h2>
          <ul className="mt-6 list-disc space-y-3 pl-5 text-base leading-relaxed text-slate-700 md:text-lg">
            {data.casUsageLocaux.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. CTA Calendly */}
      <section className={OFC_SEC.white}>
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-[#377CF3]/25 bg-[#F2F2F2] p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              Visio découverte gratuite — {deptLabel}
            </h2>
            <p className="mt-3 text-base text-slate-700 md:text-lg">
              30 minutes pour cadrer votre besoin {locatif} : devis, CR, AO, financement Constructys.
              Présentiel uniquement · Île-de-France uniquement.
            </p>
            <RdvLink
              campaign={campaign}
              ctaPosition="inline"
              ctaId="dept-mid"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3.5 text-center text-base font-semibold text-white shadow-sm transition hover:bg-[#2d6ae0] sm:w-auto"
            >
              <Calendar size={20} strokeWidth={1.5} aria-hidden />
              Prendre rendez-vous (30 min)
            </RdvLink>
          </div>
        </div>
      </section>

      {/* 7. FAQ locale */}
      <FAQSection
        id={`faq-dept-locale-${data.code}`}
        items={[...data.faqLocale]}
        title={`FAQ — formation IA BTP ${deptLabel}`}
        subtitle="Présentiel, logistique locale et financement."
      />

      {/* 8. Formatrice Guyancourt — partagé */}
      <DepartementFormatriceGuyancourt grammar={grammar} deptCode={data.code} />

      {/* 9. Cas d’usage standard — partagé identique */}
      <DepartementCasUsageStandard />

      {/* 10. Informations réglementaires Qualiopi — partagé */}
      <RenvoiFicheCatalogue programmeRef="NIV-01" contexte={`en ${deptLabel}`} />

      {/* 11. Témoignages région IDF — partagé */}
      <TemoignagesRegion />

      {/* 12. Liens utiles + cluster IDF */}
      <ContextualLinksSection
        id="maillage-formation-ia-btp"
        title="Liens utiles"
        subtitle="Catalogue, financement et page métier pertinente pour votre bassin."
        links={utilityLinks}
      />

      <ContextualLinksSection
        title="Autres départements d’Île-de-France"
        subtitle={`Vous intervenez hors ${deptLabel} ? Consultez les pages locales voisines.`}
        links={sisterLinks}
        tone="muted"
      />

      <div className="mx-auto max-w-4xl px-4 pb-8">
        <VoirAussi
          {...voirAussiDepartementProps({
            currentPath: data.path,
            excludeHrefs: [
              ...FORMATION_CATALOGUE_CORE.map((l) => l.href),
              data.metierPertinent.href,
              ...sisterLinks.map((l) => l.href),
              ...clusterExcludes,
            ],
          })}
        />
      </div>

      {/* 13. CTA final */}
      <section className={OFC_SEC.accent}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Réserver un créneau découverte</h2>
          <p className="mt-4 text-lg text-blue-100 md:text-xl">
            30 minutes pour cadrer votre besoin {locatif} ({data.code}) — en présentiel, intra ou inter
            selon vos contraintes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RdvLink
              campaign={`${campaign}-footer`}
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
