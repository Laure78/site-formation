import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Calculator,
  LineChart,
  MapPin,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { EnBref } from '@/app/components/EnBref';
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
  MARC_DELCOURT_EN_BREF,
  MARC_EXPERTISE_CARDS,
  MARC_FORMATIONS_SECTION_ID,
  MARC_MAILLAGE,
  MARC_PUBLIC_CIBLE,
  getMarcDelcourtFaqItems,
} from '@/lib/formateurs/marc-delcourt/marc-delcourt-content';
import { getMarcDelcourtPageJsonLd } from '@/lib/formateurs/marc-delcourt/marc-delcourt-schema';
import {
  FORMATEUR_SHOWCASE_PORTRAIT_FRAME,
  FORMATEUR_SHOWCASE_PORTRAIT_IMAGE,
} from '@/lib/formateurs/formateur-showcase-portrait';
import { LINKS } from '@/lib/internal-links';
import { isParcoursMetiers2027Visible } from '@/lib/parcours-metiers-2027-visibility';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_LINK, OFC_TYPE_BODY, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { OFC_SECTION_INNER, ofcSectionClasses } from '@/lib/ofc-section-classes';
import { PHOTOS } from '@/lib/photos';
import { SITE_CONFIG } from '@/lib/seo';
import { MODALITE_POSITIONNEMENT } from '@/lib/tarifs-sessions';

const EXPERTISE_ICONS: Record<(typeof MARC_EXPERTISE_CARDS)[number]['key'], LucideIcon> = {
  prix: Calculator,
  marges: LineChart,
  tresorerie: Wallet,
};

const FORMATION_VISUALS: Record<string, { photo: (typeof PHOTOS)[keyof typeof PHOTOS] }> = {
  'DIR-01': { photo: PHOTOS.accueilIaChantierLaptopPlansBtp2026 },
  'DIR-03': { photo: PHOTOS.accueilReferencePartenairesLaureOFC2026 },
};

const FORMATION_THEMES: Record<string, readonly string[]> = {
  'DIR-01': [
    'Coûts directs et indirects',
    'Prix de revient',
    'Construction du prix de vente',
    'Marge et rentabilité',
  ],
  'DIR-03': [
    'Prévisions d’encaissement',
    'Décaissements de l’entreprise',
    'Besoins de trésorerie',
    'Anticipation des tensions financières',
  ],
};

const FORMATION_ACCROCHES: Record<string, string> = {
  'DIR-01':
    'Mieux connaître ses coûts pour construire des offres commercialement et économiquement cohérentes.',
  'DIR-03':
    'Mieux anticiper les besoins financiers de son entreprise et les décalages de paiement.',
};

type Props = {
  formateur: FormateurProfile;
};

export function FormateurMarcDelcourtPage({ formateur }: Props) {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const parcoursVisible = isParcoursMetiers2027Visible();
  const moduleLinks = getFormateurModuleLinks(formateur);
  const portrait = formateur.portrait;
  const portraitAlt =
    portrait.kind === 'photo' ? portrait.alt : `Portrait de Marc Delcourt`;

  return (
    <main className="min-w-0">
      <JsonLd
        id="schema-marc-delcourt-profile"
        schema={getMarcDelcourtPageJsonLd(formateur, base)}
      />

      {/* Hero */}
      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact', mesh: false })}
        aria-labelledby="marc-delcourt-h1"
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
              <li className="font-medium text-ofc-ink">Marc Delcourt</li>
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
                Formateur — direction et gestion BTP
              </p>
              <h1
                id="marc-delcourt-h1"
                className="mt-2 font-display text-2xl font-bold text-[#101936] text-pretty sm:text-3xl"
              >
                Marc Delcourt — Formateur en gestion de PME du BTP
              </h1>
              <EnBref id="marc-en-bref" text={MARC_DELCOURT_EN_BREF} className="mt-4" />
              <p className="mt-4 text-lg font-semibold text-[#101936]">
                Pilotez vos marges. Maîtrisez votre trésorerie.
              </p>
              <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
                Ancien dirigeant d&apos;entreprise de travaux publics, Marc Delcourt accompagne les
                professionnels du BTP dans la compréhension de leurs coûts, la construction de leurs
                prix de vente et le pilotage de leur trésorerie.
              </p>
              <p className={`${OFC_TYPE_BODY} mt-3 text-ofc-ink-muted`}>
                Son approche s&apos;appuie sur 15 ans d&apos;expérience à la direction d&apos;une
                entreprise de travaux publics et sur les réalités économiques des entreprises du
                secteur.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={
                    parcoursVisible && moduleLinks.length > 0
                      ? `#${MARC_FORMATIONS_SECTION_ID}`
                      : LINKS.formations
                  }
                  className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-base font-semibold`}
                >
                  {parcoursVisible && moduleLinks.length > 0
                    ? 'Découvrir ses formations'
                    : 'Voir le catalogue des formations'}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
                <CtaVisio
                  src="formateur-marc-delcourt-hero"
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
              15 ans à la direction d&apos;une entreprise de TP
            </li>
            {parcoursVisible ? (
              <li className="text-center text-sm font-semibold text-[#101936] sm:text-[15px]">
                2 formations prévues en 2027
              </li>
            ) : (
              <li className="text-center text-sm font-semibold text-[#101936] sm:text-[15px]">
                Expertise gestion et pilotage PME BTP
              </li>
            )}
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
        aria-labelledby="marc-expertise-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="marc-expertise-heading" className={OFC_TYPE_H2}>
            Une expertise au service de la rentabilité des PME du BTP
          </h2>
          <p className={`${OFC_TYPE_BODY} mt-4 max-w-3xl text-ofc-ink-muted`}>
            Dans le bâtiment et les travaux publics, maîtriser ses coûts, fixer des prix de vente
            cohérents et anticiper les besoins de trésorerie sont des enjeux essentiels pour
            préserver la rentabilité de l&apos;entreprise.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {MARC_EXPERTISE_CARDS.map((card) => {
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

      {parcoursVisible && moduleLinks.length > 0 ? (
      <section
        id={MARC_FORMATIONS_SECTION_ID}
        className={ofcSectionClasses({ tone: 'muted', size: 'compact', divide: true })}
        aria-labelledby="marc-formations-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
          <h2 id="marc-formations-heading" className={OFC_TYPE_H2}>
            Les formations en gestion BTP de Marc Delcourt
          </h2>
          <ul className="mt-8 grid gap-6 lg:grid-cols-2">
            {moduleLinks.map((link) => {
              const mod = getModuleByCode(link.code);
              const visual = FORMATION_VISUALS[link.code]?.photo;
              const themes = FORMATION_THEMES[link.code] ?? [];
              const accroche = FORMATION_ACCROCHES[link.code] ?? '';
              const duree = mod ? `${mod.dureeHeures} heures` : '—';
              return (
                <li
                  key={link.code}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm"
                >
                  {visual ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F2F2F2]">
                      <Image
                        src={visual.src}
                        alt=""
                        width={visual.width}
                        height={visual.height}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 1024px) 100vw, 560px"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {link.code}
                    </p>
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
                    <p className="mt-1 text-sm text-slate-600">Disponibilité : ouverture prévue en 2027.</p>
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
      ) : null}

      {/* Parcours */}
      <section
        className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
        aria-labelledby="marc-parcours-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 id="marc-parcours-heading" className={OFC_TYPE_H2}>
            15 ans d&apos;expérience à la direction d&apos;une entreprise de travaux publics
          </h2>
          <ol className="relative mt-8 space-y-8 border-slate-200 pl-0">
            {formateur.experiences?.map((step) => (
              <li
                key={step.titre}
                className="relative border-l-2 border-[#377CF3]/35 pl-6 last:pb-0"
              >
                <span
                  className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-[#377CF3]"
                  aria-hidden
                />
                <h3 className="font-display text-lg font-bold text-[#101936]">
                  {step.periode ? `${step.titre} — ${step.periode}` : step.titre}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{step.detail}</p>
              </li>
            ))}
          </ol>
          {formateur.formationsProfessionnelles && formateur.formationsProfessionnelles.length > 0 ? (
            <div className="mt-8 rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-3">
              <p className="text-sm font-semibold text-[#101936]">Formation professionnelle</p>
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
        className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}
        aria-labelledby="marc-public-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 id="marc-public-heading" className={OFC_TYPE_H2}>
            À qui s&apos;adressent les formations de Marc Delcourt ?
          </h2>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-base text-slate-700">
            {MARC_PUBLIC_CIBLE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-base text-slate-600">
            {MODALITE_POSITIONNEMENT}
          </p>
        </div>
      </section>

      <FAQSectionServer
        id="marc-faq"
        title="Questions fréquentes sur Marc Delcourt et ses formations BTP"
        items={getMarcDelcourtFaqItems()}
        layout="wide"
        className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
      />

      {/* Maillage */}
      <section className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}>
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 className="font-display text-lg font-bold text-[#101936]">Pour aller plus loin</h2>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {MARC_MAILLAGE.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`${OFC_LINK} text-sm font-semibold`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <section
        className="bg-[#377CF3] py-10 md:py-12"
        aria-labelledby="marc-cta-final-heading"
      >
        <div className={`${OFC_SECTION_INNER} max-w-3xl text-center text-white`}>
          <h2 id="marc-cta-final-heading" className="font-display text-2xl font-bold text-pretty">
            Améliorez le pilotage financier de votre entreprise BTP
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/95">
            Échangeons sur vos besoins en matière de gestion, de rentabilité et de trésorerie afin
            d&apos;identifier la formation adaptée à votre équipe.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <CtaVisio
              src="formateur-marc-delcourt-fin"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 py-2.5 text-base font-semibold text-[#377CF3] hover:bg-slate-50"
              title="Échanger sur votre projet"
            />
            {parcoursVisible ? (
              <Link
                href={LINKS.parcoursDirigeantPmeBtp}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-white px-6 py-2.5 text-base font-semibold text-white hover:bg-white/10"
              >
                Découvrir le parcours dirigeant de PME BTP
              </Link>
            ) : (
              <Link
                href={LINKS.formations}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-white px-6 py-2.5 text-base font-semibold text-white hover:bg-white/10"
              >
                Voir le catalogue des formations
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}