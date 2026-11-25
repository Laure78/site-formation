import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BriefcaseBusiness,
  Calculator,
  FileSearch,
  FileText,
  MapPin,
  type LucideIcon,
} from 'lucide-react';
import { EnBref } from '@/app/components/EnBref';
import { CtaDevis } from '@/components/CtaDevis';
import { CtaVisio } from '@/components/CtaVisio';
import { FAQSectionServer } from '@/components/landing/FAQSectionServer';
import { JsonLd } from '@/components/JsonLd';
import { ContentUpdatedLine } from '@/components/seo/ContentUpdatedLine';
import { FORMATEUR_PROFILE_CONTENT_UPDATED_AT } from '@/lib/content-updated-at';
import { getModuleByCode } from '@/data/catalogue-2027';
import {
  getFormateurModuleLinks,
  type FormateurProfile,
} from '@/lib/formateurs';
import {
  FORMATION_ACCROCHES,
  FORMATION_CATEGORY,
  FORMATION_THEMES,
  getThomasGarnierFaqItems,
  THOMAS_CHARGEAFFAIRES_ACTIVITES,
  THOMAS_EXPERTISE_CARDS,
  THOMAS_FORMATIONS_OFC_LINKS,
  THOMAS_FORMATIONS_SECTION_ID,
  THOMAS_GARNIER_EN_BREF,
  THOMAS_GUIDES_LINKS,
  THOMAS_PROBLEMATIQUES,
  THOMAS_PUBLIC_CIBLE,
} from '@/lib/formateurs/thomas-garnier/thomas-garnier-content';
import { getThomasGarnierPageJsonLd } from '@/lib/formateurs/thomas-garnier/thomas-garnier-schema';
import {
  FORMATEUR_SHOWCASE_PORTRAIT_FRAME,
  FORMATEUR_SHOWCASE_PORTRAIT_IMAGE,
} from '@/lib/formateurs/formateur-showcase-portrait';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_LINK, OFC_TYPE_BODY, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { OFC_SECTION_INNER, ofcSectionClasses } from '@/lib/ofc-section-classes';
import { PHOTOS } from '@/lib/photos';
import { SITE_CONFIG } from '@/lib/seo';
import { MODALITE_POSITIONNEMENT } from '@/lib/tarifs-sessions';

const EXPERTISE_ICONS: Record<(typeof THOMAS_EXPERTISE_CARDS)[number]['key'], LucideIcon> = {
  devis: Calculator,
  dce: FileSearch,
  memoire: FileText,
  offres: BriefcaseBusiness,
};

const FORMATION_VISUALS: Record<string, { photo: (typeof PHOTOS)[keyof typeof PHOTOS] }> = {
  'COM-01': { photo: PHOTOS.accueilIaChantierLaptopPlansBtp2026 },
  'COM-04': { photo: PHOTOS.formationsCatalogueCarteAppelsOffres2026 },
};

type Props = {
  formateur: FormateurProfile;
};

export function FormateurThomasGarnierPage({ formateur }: Props) {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const moduleLinks = getFormateurModuleLinks(formateur);
  const portrait = formateur.portrait;
  const portraitAlt =
    portrait.kind === 'photo' ? portrait.alt : `Portrait de Thomas Garnier`;

  return (
    <main className="min-w-0">
      <JsonLd
        id="schema-thomas-garnier-profile"
        schema={getThomasGarnierPageJsonLd(formateur, base)}
      />

      {/* Hero */}
      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact', mesh: false })}
        aria-labelledby="thomas-garnier-h1"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
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
              <li className="font-medium text-ofc-ink">Thomas Garnier</li>
            </ol>
          </nav>
          <ContentUpdatedLine className="mt-4" date={FORMATEUR_PROFILE_CONTENT_UPDATED_AT} />
          <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start lg:gap-10">
            <div className={FORMATEUR_SHOWCASE_PORTRAIT_FRAME}>
              {portrait.kind === 'photo' ? (
                <Image
                  src={portrait.src}
                  alt={portraitAlt}
                  width={portrait.width}
                  height={portrait.height}
                  className={FORMATEUR_SHOWCASE_PORTRAIT_IMAGE}
                  style={
                    portrait.objectPosition
                      ? { objectPosition: portrait.objectPosition }
                      : undefined
                  }
                  sizes="(max-width: 1024px) 60vw, 280px"
                  priority
                />
              ) : null}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#377CF3]">
                Formateur — chiffrage et appels d&apos;offres BTP
              </p>
              <h1
                id="thomas-garnier-h1"
                className="mt-2 font-display text-2xl font-bold text-[#101936] text-pretty sm:text-3xl"
              >
                Thomas Garnier — Formateur en devis, chiffrage et appels d&apos;offres BTP
              </h1>
              <EnBref id="thomas-en-bref" text={THOMAS_GARNIER_EN_BREF} className="mt-4" />
              <p className="mt-4 text-lg font-semibold text-[#101936]">
                Chiffrez juste. Structurez vos offres. Démarquez-vous.
              </p>
              <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
                Fort de 12 ans d&apos;expérience en tant que chargé d&apos;affaires dans le bâtiment,
                Thomas Garnier accompagne les professionnels du BTP dans la construction de leurs
                devis, l&apos;analyse des dossiers de consultation et la préparation de leurs réponses
                commerciales.
              </p>
              <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
                Son approche s&apos;appuie sur les réalités du métier : maîtrise des coûts,
                compréhension des exigences clients et structuration des offres techniques.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={`#${THOMAS_FORMATIONS_SECTION_ID}`}
                  className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-base font-semibold`}
                >
                  Découvrir ses formations
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
                <CtaVisio
                  src="formateur-thomas-garnier-hero"
                  variant="secondary"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2.5 text-base font-semibold"
                  title="Échanger sur votre projet"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Réassurance */}
      <div className="border-y border-slate-200/90 bg-[#F2F2F2]">
        <div className={`${OFC_SECTION_INNER} py-5 sm:py-6`}>
          <ul className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            <li className="text-center text-sm font-semibold text-[#101936] sm:text-[15px]">
              12 ans d&apos;expérience en gestion d&apos;affaires BTP
            </li>
            <li className="text-center text-sm font-semibold text-[#101936] sm:text-[15px]">
              2 formations prévues en 2027
            </li>
            <li className="flex items-center justify-center gap-2 text-center text-sm font-semibold text-[#101936] sm:text-[15px]">
              <MapPin className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              Présentiel en Île-de-France
            </li>
          </ul>
        </div>
      </div>

      {/* Expertise */}
      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
        aria-labelledby="thomas-expertise-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="thomas-expertise-heading" className={OFC_TYPE_H2}>
            Une expertise commerciale ancrée dans les réalités du BTP
          </h2>
          <p className={`${OFC_TYPE_BODY} mt-4 max-w-3xl text-ofc-ink-muted`}>
            Dans une PME du BTP, la qualité du chiffrage et la pertinence des réponses commerciales
            sont déterminantes pour la rentabilité des chantiers et le développement de
            l&apos;activité.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {THOMAS_EXPERTISE_CARDS.map((card) => {
              const Icon = EXPERTISE_ICONS[card.key];
              return (
                <li
                  key={card.key}
                  className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm"
                >
                  <Icon className="h-7 w-7 text-[#377CF3]" strokeWidth={2} aria-hidden />
                  <h3 className="mt-3 font-display text-lg font-bold text-[#101936]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Problématiques */}
      <section
        className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}
        aria-labelledby="thomas-problematiques-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 id="thomas-problematiques-heading" className={OFC_TYPE_H2}>
            Des formations conçues pour répondre aux enjeux des PME du BTP
          </h2>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-base text-slate-700">
            {THOMAS_PROBLEMATIQUES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={`${OFC_TYPE_BODY} mt-6 text-ofc-ink-muted`}>
            Les formations de Thomas Garnier visent à structurer les méthodes de travail et à renforcer
            la qualité des réponses commerciales des entreprises du BTP.
          </p>
        </div>
      </section>

      {/* Formations Thomas */}
      <section
        id={THOMAS_FORMATIONS_SECTION_ID}
        className={ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })}
        aria-labelledby="thomas-formations-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="thomas-formations-heading" className={OFC_TYPE_H2}>
            Les formations de Thomas Garnier pour les PME du BTP
          </h2>
          <p className="mt-3 text-sm font-medium text-slate-600">Ouverture prévue en 2027.</p>
          <ul className="mt-8 grid gap-6 lg:grid-cols-2">
            {moduleLinks.map((link) => {
              const mod = getModuleByCode(link.code);
              const visual = FORMATION_VISUALS[link.code]?.photo;
              const themes = FORMATION_THEMES[link.code] ?? [];
              const accroche = FORMATION_ACCROCHES[link.code] ?? '';
              const categorie = FORMATION_CATEGORY[link.code] ?? '';
              const duree = mod ? `${mod.dureeHeures} heures` : '—';
              const imageAlt =
                link.code === 'COM-01'
                  ? 'Chargé d’affaires travaillant sur un devis, des plans et un tableau de chiffrage'
                  : 'Chargé d’affaires analysant un dossier d’appel d’offres dans un bureau d’entreprise du bâtiment';
              return (
                <li
                  key={link.code}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm"
                >
                  {visual ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F2F2F2]">
                      <Image
                        src={visual.src}
                        alt={imageAlt}
                        width={visual.width}
                        height={visual.height}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 1024px) 100vw, 560px"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    {categorie ? (
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                        {categorie}
                      </p>
                    ) : null}
                    <h3 className="mt-2 font-display text-xl font-bold text-[#101936] text-pretty">
                      {link.titre}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{accroche}</p>
                    {themes.length > 0 ? (
                      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        {themes.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    ) : null}
                    <p className="mt-4 text-sm font-medium text-slate-800">Durée : {duree}</p>
                    <p className="mt-1 text-sm text-slate-600">Modalité : présentiel.</p>
                    <p className="mt-1 text-sm text-slate-600">Zone : Île-de-France.</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Disponibilité : ouverture prévue en 2027.
                    </p>
                    <div className="mt-auto pt-5">
                      <Link
                        href={link.href}
                        className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold`}
                      >
                        Être informé de l&apos;ouverture
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Parcours */}
      <section
        className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}
        aria-labelledby="thomas-parcours-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 id="thomas-parcours-heading" className={OFC_TYPE_H2}>
            12 ans au cœur de la gestion d&apos;affaires dans le bâtiment
          </h2>
          <ol className="relative mt-8 space-y-8 border-slate-200 pl-0">
            {formateur.experiences?.map((step, index) => {
              const isChargeAffaires = index === 0 && step.periode === '12 ans';
              return (
                <li
                  key={step.titre}
                  className="relative border-l-2 border-[#377CF3]/35 pl-6 last:pb-0"
                >
                  <span
                    className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-[#377CF3]"
                    aria-hidden
                  />
                  <h3 className="font-display text-lg font-bold text-[#101936]">
                    {isChargeAffaires
                      ? `Chargé d’affaires BTP — ${step.periode}`
                      : step.periode
                        ? `${step.titre} — ${step.periode}`
                        : step.titre}
                  </h3>
                  {isChargeAffaires ? (
                    <>
                      <p className="mt-2 text-base leading-relaxed text-slate-600">
                        Expérience acquise au sein d&apos;entreprises du bâtiment :
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-base text-slate-600">
                        {THOMAS_CHARGEAFFAIRES_ACTIVITES.map((label) => (
                          <li key={label}>{label}</li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="mt-2 text-base leading-relaxed text-slate-600">{step.detail}</p>
                  )}
                </li>
              );
            })}
          </ol>
          {formateur.formationsProfessionnelles && formateur.formationsProfessionnelles.length > 0 ? (
            <div className="mt-8 rounded-lg border border-slate-200 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-[#101936]">Formations professionnelles</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {formateur.formationsProfessionnelles.map((label) => (
                  <li key={label}>{label}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* Public */}
      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
        aria-labelledby="thomas-public-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="thomas-public-heading" className={OFC_TYPE_H2}>
            À qui s&apos;adressent les formations de Thomas Garnier ?
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {THOMAS_PUBLIC_CIBLE.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-slate-200/90 bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-[#101936]"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base text-slate-600">{MODALITE_POSITIONNEMENT}</p>
        </div>
      </section>

      {/* Maillage */}
      <section
        className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}
        aria-labelledby="thomas-maillage-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="thomas-maillage-heading" className={OFC_TYPE_H2}>
            Développez les compétences commerciales de votre équipe
          </h2>
          <p className={`${OFC_TYPE_BODY} mt-3 max-w-3xl text-ofc-ink-muted`}>
            Les modules de Thomas Garnier complètent le catalogue IA animé par l&apos;équipe Laure
            Olivié — formations distinctes, même organisme Qualiopi.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {THOMAS_FORMATIONS_OFC_LINKS.map((card) => (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="flex h-full flex-col rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm transition-colors hover:border-[#377CF3]/40"
                >
                  <span className="font-display text-base font-bold text-[#101936]">{card.label}</span>
                  <span className="mt-2 text-sm text-slate-600">{card.hint}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <h3 className="font-display text-lg font-bold text-[#101936]">Guides et ressources</h3>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {THOMAS_GUIDES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`${OFC_LINK} text-sm font-semibold`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FAQSectionServer
        id="thomas-faq"
        title="Questions fréquentes sur Thomas Garnier et ses formations BTP"
        items={getThomasGarnierFaqItems()}
        layout="wide"
        className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
      />

      {/* CTA final */}
      <section
        className="bg-[#377CF3] py-10 md:py-12"
        aria-labelledby="thomas-cta-final-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl text-center text-white`}>
          <h2 id="thomas-cta-final-heading" className="font-display text-2xl font-bold text-pretty">
            Renforcez la performance commerciale de votre PME du BTP
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/95">
            Vous souhaitez structurer vos devis, améliorer vos mémoires techniques ou développer les
            compétences de vos chargés d&apos;affaires ? Échangeons sur les besoins de votre
            entreprise.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <CtaDevis
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-2.5 text-base font-semibold text-[#377CF3] hover:bg-slate-50"
            />
            <CtaVisio
              src="formateur-thomas-garnier-fin"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-white px-6 py-2.5 text-base font-semibold text-white hover:bg-white/10"
              title="Échanger sur votre projet"
            />
          </div>
          <p className="mt-6">
            <Link
              href={LINKS.formateurs}
              className="text-sm font-medium text-white/90 underline-offset-2 hover:underline"
            >
              Découvrir tous nos formateurs
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}