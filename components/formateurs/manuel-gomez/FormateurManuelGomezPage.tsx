import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Calculator,
  FileSearch,
  HardHat,
  MapPin,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { EnBref } from '@/app/components/EnBref';
import { CtaDevis } from '@/components/CtaDevis';
import { FormationsCatalogueGridCard } from '@/components/formations/catalogue/FormationsCatalogueGridCard';
import { FAQSectionServer } from '@/components/landing/FAQSectionServer';
import { JsonLd } from '@/components/JsonLd';
import { ContentUpdatedLine } from '@/components/seo/ContentUpdatedLine';
import type { FormationNiveau } from '@/data/formations';
import { getFormationByCode } from '@/data/formations';
import { FORMATEUR_PROFILE_CONTENT_UPDATED_AT } from '@/lib/content-updated-at';
import {
  getFormateurFormationLinks,
  type FormateurProfile,
} from '@/lib/formateurs';
import {
  getManuelGomezFaqItems,
  MANUEL_FORMATIONS_INTRO,
  MANUEL_FORMATIONS_SECTION_ID,
  MANUEL_GOMEZ_EN_BREF,
  MANUEL_INTERVENTION_CARDS,
  MANUEL_MAILLAGE,
  MANUEL_OUTILS_IA,
  MANUEL_PARCOURS_VALIDE_COURT,
  MANUEL_PEDAGOGIE,
  MANUEL_PUBLIC_CIBLE,
  manuelFormationsNiveauResume,
} from '@/lib/formateurs/manuel-gomez/manuel-gomez-content';
import { getManuelGomezPageJsonLd } from '@/lib/formateurs/manuel-gomez/manuel-gomez-schema';
import {
  FORMATEUR_SHOWCASE_PORTRAIT_FRAME,
  FORMATEUR_SHOWCASE_PORTRAIT_IMAGE,
} from '@/lib/formateurs/formateur-showcase-portrait';
import { getFormationCatalogueByRef } from '@/lib/formations-catalogue-display';
import { formationNiveauOfficielLabel } from '@/lib/formation-niveaux-officiels';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_LINK, OFC_TYPE_BODY, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { OFC_SECTION_INNER, ofcSectionClasses } from '@/lib/ofc-section-classes';
import { SITE_CONFIG } from '@/lib/seo';
import { MODALITE_POSITIONNEMENT } from '@/lib/tarifs-sessions';

const INTERVENTION_ICONS: Record<(typeof MANUEL_INTERVENTION_CARDS)[number]['key'], LucideIcon> = {
  ao: FileSearch,
  devis: Calculator,
  travaux: HardHat,
  gestion: BriefcaseBusiness,
  assistants: Bot,
  auto: Workflow,
};

const NIVEAUX: FormationNiveau[] = [1, 2, 3];

function groupCatalogueRefsByNiveau(formateur: FormateurProfile, at: Date) {
  const links = getFormateurFormationLinks(formateur, at);
  const byNiveau: Record<FormationNiveau, string[]> = { 1: [], 2: [], 3: [] };
  for (const link of links) {
    const formation = getFormationByCode(link.code);
    if (!formation) continue;
    const entry = getFormationCatalogueByRef(link.code);
    if (!entry) continue;
    byNiveau[formation.niveau].push(link.code);
  }
  return byNiveau;
}

type Props = {
  formateur: FormateurProfile;
};

export function FormateurManuelGomezPage({ formateur }: Props) {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const at = new Date();
  const byNiveau = groupCatalogueRefsByNiveau(formateur, at);
  const portrait = formateur.portrait;
  const portraitAlt =
    portrait.kind === 'photo' ? portrait.alt : 'Portrait de Manuel Gomez';

  return (
    <main className="min-w-0">
      <JsonLd
        id="schema-manuel-gomez-profile"
        schema={getManuelGomezPageJsonLd(formateur, base)}
      />

      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact', mesh: false })}
        aria-labelledby="manuel-gomez-h1"
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
              <li className="font-medium text-ofc-ink">Manuel Gomez</li>
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
                Formateur IA — bâtiment et travaux publics
              </p>
              <h1
                id="manuel-gomez-h1"
                className="mt-2 font-display text-2xl font-bold text-[#101936] text-pretty sm:text-3xl"
              >
                Manuel Gomez — Formateur en intelligence artificielle pour le BTP
              </h1>
              <EnBref id="manuel-en-bref" text={MANUEL_GOMEZ_EN_BREF} className="mt-4" />
              {formateur.profileDraft ? (
                <p className="mt-4 rounded-lg border border-amber-200/90 bg-amber-50 px-3 py-2 text-sm text-amber-950">
                  Le détail chronologique du parcours professionnel et des diplômes sera publié
                  après validation des justificatifs.
                </p>
              ) : null}
              <p className="mt-4 text-lg font-semibold text-[#101936]">
                Du terrain à l&apos;intelligence artificielle : des formations conçues pour les
                réalités du BTP.
              </p>
              <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
                Manuel Gomez intervient auprès des dirigeants et collaborateurs des PME du bâtiment
                et des travaux publics pour les accompagner dans l&apos;utilisation concrète de
                l&apos;intelligence artificielle.
              </p>
              <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
                Il intervient sur l&apos;ensemble des formations IA BTP de notre catalogue, de
                l&apos;initiation à la création d&apos;assistants, d&apos;agents IA et à
                l&apos;automatisation des processus métier.
              </p>
              <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
                Son objectif : permettre aux professionnels du BTP d&apos;intégrer l&apos;intelligence
                artificielle dans leurs méthodes de travail quotidiennes.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={`#${MANUEL_FORMATIONS_SECTION_ID}`}
                  className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-base font-semibold`}
                >
                  Découvrir ses formations
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
                <CtaDevis
                  variant="secondary"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-2.5 text-base font-semibold"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-slate-200/90 bg-[#F2F2F2]">
        <div className={`${OFC_SECTION_INNER} py-5 sm:py-6`}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
            <li className="text-center text-sm font-semibold text-[#101936] sm:text-[15px]">
              Expérience terrain BTP (éléments validés par l&apos;organisme)
            </li>
            <li className="text-center text-sm font-semibold text-[#101936] sm:text-[15px]">
              Tous les niveaux de formation
            </li>
            <li className="text-center text-sm font-semibold text-[#101936] sm:text-[15px]">
              Ensemble du catalogue IA BTP publié
            </li>
            <li className="flex items-center justify-center gap-2 text-center text-sm font-semibold text-[#101936] sm:text-[15px]">
              <MapPin className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              Présentiel en Île-de-France
            </li>
          </ul>
        </div>
      </div>

      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
        aria-labelledby="manuel-intervention-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="manuel-intervention-heading" className={OFC_TYPE_H2}>
            L&apos;intelligence artificielle appliquée aux métiers du BTP
          </h2>
          <p className={`${OFC_TYPE_BODY} mt-4 max-w-3xl text-ofc-ink-muted`}>
            Domaines d&apos;intervention pédagogique — formations catalogue IA BTP, sans engagement
            sur des références clients individuelles.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MANUEL_INTERVENTION_CARDS.map((card) => {
              const Icon = INTERVENTION_ICONS[card.key];
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

      <section
        className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}
        aria-labelledby="manuel-parcours-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 id="manuel-parcours-heading" className={OFC_TYPE_H2}>
            Le parcours professionnel de Manuel Gomez
          </h2>
          <p className={`${OFC_TYPE_BODY} mt-4 text-ofc-ink-muted`}>{MANUEL_PARCOURS_VALIDE_COURT}</p>
          <p className="mt-4 text-sm text-slate-600">
            La présentation détaillée des expériences (entreprises, missions, diplômes) est en cours
            de vérification documentaire et ne sera affichée qu&apos;après validation.
          </p>
        </div>
      </section>

      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
        aria-labelledby="manuel-outils-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 id="manuel-outils-heading" className={OFC_TYPE_H2}>
            Des outils IA au service des professionnels du BTP
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {MANUEL_OUTILS_IA.map((outil) => (
              <li
                key={outil.label}
                className="rounded-lg border border-slate-200/90 bg-[#F8FAFC] px-4 py-3"
              >
                <p className="font-display text-base font-bold text-[#101936]">{outil.label}</p>
                <p className="mt-1 text-sm text-slate-600">{outil.hint}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id={MANUEL_FORMATIONS_SECTION_ID}
        className={ofcSectionClasses({ tone: 'muted', size: 'compact', divide: true })}
        aria-labelledby="manuel-formations-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="manuel-formations-heading" className={OFC_TYPE_H2}>
            Les formations IA BTP dispensées par Manuel Gomez
          </h2>
          <p className={`${OFC_TYPE_BODY} mt-4 max-w-3xl text-ofc-ink-muted`}>
            {MANUEL_FORMATIONS_INTRO}
          </p>
          {NIVEAUX.map((niveau) => {
            const refs = byNiveau[niveau];
            if (refs.length === 0) return null;
            return (
              <div key={niveau} className="mt-10">
                <h3 className="font-display text-xl font-bold text-[#101936]">
                  {formationNiveauOfficielLabel(niveau)}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  {manuelFormationsNiveauResume(niveau)}
                </p>
                <ul className="mt-6 grid list-none gap-6 lg:grid-cols-2">
                  {refs.map((ref) => {
                    const entry = getFormationCatalogueByRef(ref);
                    if (!entry) return null;
                    return (
                      <li key={ref} className="min-w-0">
                        <FormationsCatalogueGridCard entry={entry} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
        aria-labelledby="manuel-pedagogie-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 id="manuel-pedagogie-heading" className={OFC_TYPE_H2}>
            Des formations centrées sur les situations professionnelles du BTP
          </h2>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-base text-slate-700">
            {MANUEL_PEDAGOGIE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}
        aria-labelledby="manuel-public-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="manuel-public-heading" className={OFC_TYPE_H2}>
            À qui s&apos;adressent les formations de Manuel Gomez ?
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MANUEL_PUBLIC_CIBLE.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-slate-200/90 bg-white px-4 py-3 text-sm font-medium text-[#101936]"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base text-slate-600">{MODALITE_POSITIONNEMENT}</p>
        </div>
      </section>

      <section className={ofcSectionClasses({ tone: 'white', size: 'compact' })}>
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 className={OFC_TYPE_H2}>Pour aller plus loin</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MANUEL_MAILLAGE.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex h-full items-center rounded-xl border border-slate-200/90 bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-[#101936] motion-safe:transition-colors motion-safe:hover:border-[#377CF3]/35"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQSectionServer
        id="manuel-faq"
        title="Questions fréquentes sur Manuel Gomez et ses formations IA BTP"
        items={getManuelGomezFaqItems()}
        layout="wide"
        className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}
      />

      <section
        className="bg-[#377CF3] py-10 md:py-12"
        aria-labelledby="manuel-cta-final-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl text-center text-white`}>
          <h2 id="manuel-cta-final-heading" className="font-display text-2xl font-bold text-pretty">
            Intégrez concrètement l&apos;intelligence artificielle dans votre entreprise BTP
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/95">
            De l&apos;initiation à l&apos;automatisation de vos processus métier, découvrez les
            formations adaptées aux besoins et au niveau de vos équipes.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <CtaDevis className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-2.5 text-base font-semibold text-[#377CF3] hover:bg-slate-50" />
            <Link
              href={LINKS.formations}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-white px-6 py-2.5 text-base font-semibold text-white hover:bg-white/10"
            >
              Découvrir toutes les formations
            </Link>
          </div>
          <p className="mt-6">
            <Link
              href={LINKS.formateurs}
              className="text-sm font-medium text-white/90 underline-offset-2 hover:underline"
            >
              Découvrir nos formateurs
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}