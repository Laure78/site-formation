import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Calculator,
  FileSearch,
  HardHat,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { EnBref } from '@/app/components/EnBref';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
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
  getLaureOlivieFaqItems,
  LAURE_DIPLOMES,
  LAURE_EXPERTISE_CARDS,
  LAURE_FORMATIONS_INTRO,
  LAURE_FORMATIONS_SECTION_ID,
  LAURE_LINKEDIN_COURSES,
  LAURE_LINKEDIN_INSTRUCTOR_HREF,
  LAURE_OLIVIE_EN_BREF,
  LAURE_PEDAGOGIE,
  LAURE_REFERENCES_LOGOS,
  LAURE_TIMELINE,
  laureFormationsNiveauResume,
} from '@/lib/formateurs/laure-olivie/laure-olivie-content';
import { getLaureOliviePageJsonLd } from '@/lib/formateurs/laure-olivie/laure-olivie-schema';
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

const EXPERTISE_ICONS: Record<(typeof LAURE_EXPERTISE_CARDS)[number]['key'], LucideIcon> = {
  ao: FileSearch,
  travaux: HardHat,
  devis: Calculator,
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
    if (!getFormationCatalogueByRef(link.code)) continue;
    byNiveau[formation.niveau].push(link.code);
  }
  return byNiveau;
}

type Props = {
  formateur: FormateurProfile;
};

export function FormateurLaureOliviePage({ formateur }: Props) {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const at = new Date();
  const byNiveau = groupCatalogueRefsByNiveau(formateur, at);
  const portrait = formateur.portrait;
  const portraitAlt =
    portrait.kind === 'photo' ? portrait.alt : 'Portrait de Laure Olivié';

  return (
    <main className="min-w-0">
      <JsonLd id="schema-laure-olivie-profile" schema={getLaureOliviePageJsonLd(formateur, base)} />

      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact', mesh: false })}
        aria-labelledby="laure-olivie-h1"
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
              <li className="font-medium text-ofc-ink">Laure Olivié</li>
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
                Fondatrice · formatrice IA BTP · coordinatrice pédagogique
              </p>
              <h1
                id="laure-olivie-h1"
                className="mt-2 font-display text-2xl font-bold text-[#101936] text-pretty sm:text-3xl"
              >
                Laure Olivié — Formatrice en intelligence artificielle pour le BTP
              </h1>
              <EnBref id="laure-en-bref" text={LAURE_OLIVIE_EN_BREF} className="mt-4" />
              <p className="mt-4 text-lg font-semibold text-[#101936]">
                J&apos;ai dirigé une entreprise de travaux publics. Aujourd&apos;hui, je forme les
                professionnels du BTP à utiliser l&apos;intelligence artificielle dans leur
                quotidien.
              </p>
              <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
                Ancienne dirigeante d&apos;une entreprise de travaux publics, Laure Olivié s&apos;appuie
                sur sept années d&apos;expérience dans le BTP et dix années dans la gestion et la
                coordination de formations professionnelles.
              </p>
              <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
                Fondatrice d&apos;OFC Création d&apos;Entreprise, organisme certifié Qualiopi, elle
                conçoit et anime des formations en intelligence artificielle exclusivement adaptées
                aux métiers du bâtiment et des travaux publics.
              </p>
              <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
                Elle intervient également comme instructrice LinkedIn Learning et assure la
                coordination pédagogique de son équipe de formateurs.
              </p>
              <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
                Ses formations s&apos;adressent aux dirigeants et collaborateurs des PME du BTP en
                Île-de-France.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={`#${LAURE_FORMATIONS_SECTION_ID}`}
                  className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-base font-semibold`}
                >
                  Découvrir mes formations
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
              7 ans d&apos;expérience dans le BTP
            </li>
            <li className="text-center text-sm font-semibold text-[#101936] sm:text-[15px]">
              10 ans au CNFPT
            </li>
            <li className="text-center text-sm font-semibold text-[#101936] sm:text-[15px]">
              2 cours LinkedIn Learning publiés
            </li>
            <li className="text-center text-sm font-semibold text-[#101936] sm:text-[15px]">
              Formations IA BTP depuis 2022
            </li>
          </ul>
        </div>
      </div>

      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
        aria-labelledby="laure-expertise-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="laure-expertise-heading" className={OFC_TYPE_H2}>
            Une double expertise BTP et intelligence artificielle
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LAURE_EXPERTISE_CARDS.map((card) => {
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

      <section
        id={LAURE_FORMATIONS_SECTION_ID}
        className={ofcSectionClasses({ tone: 'muted', size: 'compact', divide: true })}
        aria-labelledby="laure-formations-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="laure-formations-heading" className={OFC_TYPE_H2}>
            Les formations IA BTP dispensées par Laure Olivié
          </h2>
          <p className={`${OFC_TYPE_BODY} mt-4 max-w-3xl text-ofc-ink-muted`}>
            {LAURE_FORMATIONS_INTRO}
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
                  {laureFormationsNiveauResume(niveau)}
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
        aria-labelledby="laure-parcours-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 id="laure-parcours-heading" className={OFC_TYPE_H2}>
            Du terrain BTP à la formation en intelligence artificielle
          </h2>
          <ol className="relative mt-8 space-y-8">
            {LAURE_TIMELINE.map((step) => (
              <li
                key={`${step.periode}-${step.titre}`}
                className="relative border-l-2 border-[#377CF3]/35 pl-6"
              >
                <span
                  className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-[#377CF3]"
                  aria-hidden
                />
                <h3 className="font-display text-lg font-bold text-[#101936]">
                  {step.titre}
                  {step.periode ? ` — ${step.periode}` : ''}
                </h3>
                {step.intro ? (
                  <p className="mt-2 text-base leading-relaxed text-slate-600">{step.intro}</p>
                ) : null}
                {step.bullets?.length ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-base text-slate-600">
                    {step.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
                {step.detail ? (
                  <p className="mt-2 text-base leading-relaxed text-slate-600">{step.detail}</p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}
        aria-labelledby="laure-diplomes-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="laure-diplomes-heading" className={OFC_TYPE_H2}>
            Diplômes et reconnaissances professionnelles
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {LAURE_DIPLOMES.map((card) => (
              <li
                key={card.id}
                className="flex h-full flex-col rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm"
              >
                <h3 className="font-display text-lg font-bold text-[#101936]">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{card.body}</p>
                {'href' in card && card.href ? (
                  <p className="mt-4">
                    <ExternalLinkAnchor href={card.href} className={`${OFC_LINK} text-sm font-semibold`}>
                      En savoir plus
                    </ExternalLinkAnchor>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
        aria-labelledby="laure-references-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="laure-references-heading" className={OFC_TYPE_H2}>
            Des interventions auprès des acteurs du BTP
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {LAURE_REFERENCES_LOGOS.map((logo) => (
              <li key={logo.id} className="flex items-center justify-center rounded-lg bg-[#F8FAFC] p-4">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="h-auto max-h-12 w-full max-w-[140px] object-contain object-center"
                />
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link href={LINKS.partenaires} className={`${OFC_LINK} text-sm font-semibold`}>
              Voir toutes les références
            </Link>
          </p>
        </div>
      </section>

      <section
        className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}
        aria-labelledby="laure-linkedin-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 id="laure-linkedin-heading" className={OFC_TYPE_H2}>
            Mes cours sur LinkedIn Learning
          </h2>
          <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
            Cours en ligne à la demande — distincts des formations professionnelles OFC en
            présentiel en Île-de-France.
          </p>
          <ul className="mt-6 space-y-4">
            {LAURE_LINKEDIN_COURSES.map((course) => (
              <li
                key={course.href}
                className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm"
              >
                <h3 className="font-display text-base font-bold text-[#101936]">
                  <ExternalLinkAnchor href={course.href}>{course.title}</ExternalLinkAnchor>
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {course.duration} · {course.topics}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <ExternalLinkAnchor
              href={LAURE_LINKEDIN_INSTRUCTOR_HREF}
              className={`${OFC_LINK} font-semibold`}
            >
              Profil instructrice LinkedIn Learning
            </ExternalLinkAnchor>
          </p>
        </div>
      </section>

      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
        aria-labelledby="laure-pedagogie-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 id="laure-pedagogie-heading" className={OFC_TYPE_H2}>
            Des formations conçues pour les réalités du terrain
          </h2>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-base text-slate-700">
            {LAURE_PEDAGOGIE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-base text-slate-600">{MODALITE_POSITIONNEMENT}</p>
        </div>
      </section>

      <FAQSectionServer
        id="laure-faq"
        title="Questions fréquentes sur Laure Olivié"
        items={getLaureOlivieFaqItems()}
        layout="wide"
        className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}
      />

      <section className="bg-[#377CF3] py-10 md:py-12" aria-labelledby="laure-cta-final-heading">
        <div className={`${OFC_SECTION_INNER} max-w-3xl text-center text-white`}>
          <h2 id="laure-cta-final-heading" className="font-display text-2xl font-bold text-pretty">
            L&apos;intelligence artificielle doit s&apos;adapter à votre métier. Pas l&apos;inverse.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/95">
            Formez vos équipes à utiliser l&apos;intelligence artificielle sur leurs documents, leurs
            chantiers et leurs dossiers marchés — en présentiel en Île-de-France.
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
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            <Link
              href={LINKS.formateurs}
              className="font-medium text-white/90 underline-offset-2 hover:underline"
            >
              Découvrir nos formateurs
            </Link>
            <Link
              href={LINKS.aPropos}
              className="font-medium text-white/90 underline-offset-2 hover:underline"
            >
              L&apos;organisme OFC
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}