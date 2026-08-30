import Link from 'next/link';
import { Suspense } from 'react';
import { AccueilHeroSection } from '@/components/landing/AccueilHeroSection';
import { AccueilPreuveSocialeSection } from '@/components/landing/AccueilPreuveSocialeSection';
import { AccueilBeworkAccordionSection } from '@/components/landing/AccueilBeworkAccordionSection';
import { AccueilCasUsageIaVisuels } from '@/components/landing/AccueilCasUsageIaVisuels';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import {
  FileText,
  Award,
  Clock,
  Zap,
  Target,
  Users,
  Check,
  Calendar,
  Mail,
  GraduationCap,
  CircleDollarSign,
  Rocket,
  HeartHandshake,
  LineChart,
  Sparkles,
  ShieldCheck,
  ArrowDown,
  X,
  Building2,
} from 'lucide-react';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';
import { GoogleReviewsSection } from '@/components/landing/GoogleReviewsSection';
import { GoogleReviewsSectionPlaceholder } from '@/components/landing/GoogleReviewsSectionPlaceholder';
import { HomeDeferredLinkedInLearning } from '@/components/landing/HomeDeferredLinkedInLearning';
import { HomeFaqDetailsList } from '@/components/landing/HomeFaqDetailsList';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { QualiopiBadge } from '@/components/QualiopiLogo';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { QUALIOPI_FINANCEMENT_FORMULATION } from '@/config/qualiopi';
import Image from 'next/image';
import { buildMetadata } from '@/lib/seo';
import { FAQ_ITEMS_HOME, buildHomeFAQPageJsonLd } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { PHOTOS } from '@/lib/photos';
import { PourQuiSection } from '@/components/landing/PourQuiSection';
import { ArticlesFormationLies } from '@/components/landing/ArticlesFormationLies';
import { CSFE_NOM_COMPLET, CSFE_NOM_LIBRE } from '@/lib/csfe';
import { LINKS } from '@/lib/internal-links';
import { LOGO_LINKEDIN_LEARNING } from '@/lib/client-logos';
import {
  libelleTarifsCarteCatalogue,
  SESSION_DUREE_LIBELLE,
} from '@/lib/tarifs-sessions';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';
import { ConstructysResteAChargeBox } from '@/components/financement/ConstructysResteAChargeBox';
import { MentionFinancement } from '@/components/MentionFinancement';
import { OFC_LINK, OFC_BENEFIT_CARD, OFC_GAIN_CARD, OFC_PROBLEM_SOLUTION_CARD, OFC_HOWTO_STEP, OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_INSET_PANEL, OFC_INNER_ACCENT_BAND } from '@/lib/ofc-section-classes';
import { DEVIS_GAIN_TEMPS_LIBELLE, GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import { buildHomeUnifiedGraphJsonLd } from '@/lib/schema-home-unified-graph';
import { HomePrincipalSections } from '@/components/landing/HomePrincipalSections';
import { SelecteurMetier } from '@/components/SelecteurMetier/SelecteurMetier';
import { BeworkEtFormationsOffreSection } from '@/components/landing/BeworkEtFormationsOffreSection';
import { HomeGuideConducteurTravauxSection } from '@/components/landing/HomeGuideConducteurTravauxSection';
import { AccueilFormationsIaMetiersSection } from '@/components/landing/AccueilFormationsIaMetiersSection';
import { Accordion } from '@/components/readability/Accordion';
import { KeyPoint } from '@/components/readability/KeyPoint';
import { Citation } from '@/components/readability/Citation';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';

import { ANNUAIRE_ENTREPRISES_OFC_URL } from '@/lib/schema-constants';

/** Puces fusionnées depuis l’offre BeWork/formations (ex-titre « Ce que vous gagnez concrètement »). */
const GAINS_CONCRETS_MERGES = [
  "Appels d'offres : analyse DCE et mémoire technique assistés — relecture métier obligatoire",
  'Chantier : DOE, PV, CR à partir de vos notes — vous validez et signez',
  'Communication : visuels avant/après et posts réseaux pour vos chantiers',
  'Prompts sur mesure : méthodes adaptées à vos documents et process',
] as const;

const GAINS_COMMERCIAUX_CARDS = [
  {
    icon: CircleDollarSign,
    title: 'Augmentez votre rentabilité',
    desc: "Réduisez le temps passé sur l'administratif et traitez davantage d'appels d'offres à effectif constant. Les gains varient selon l'organisation et le niveau de pratique.",
  },
  {
    icon: Rocket,
    title: 'Gagnez en réactivité commerciale',
    keyPoint: (
      <KeyPoint variant="inverse" label="Réactivité commerciale">
        {DEVIS_GAIN_TEMPS_LIBELLE}
      </KeyPoint>
    ),
    desc: 'Répondez plus vite aux demandes de devis — un délai de réponse court reste le premier levier de transformation.',
  },
  {
    icon: HeartHandshake,
    title: 'Fidélisez vos équipes',
    desc: "Libérez vos collaborateurs des tâches répétitives. Réduisez le turnover grâce à des conditions modernisées.",
  },
  {
    icon: LineChart,
    title: 'Développez votre CA sans embaucher',
    desc: 'Libérez du temps bureau pour absorber plus de chantiers à effectif constant, sans dégrader le suivi.',
  },
  {
    icon: Sparkles,
    title: 'Professionnalisez votre image',
    desc: "Démarquez-vous par votre rapidité. Proposez des documents ultra-professionnels.",
  },
  {
    icon: ShieldCheck,
    title: 'Sécurisez vos process',
    desc: "Standardisez vos documents. Assurez la traçabilité complète. Réduisez les litiges.",
  },
] as const;

/** Segment sans suffixe — `buildMetadata` ajoute « | Laure Olivié » (total ≤ 60). */
const HOME_META_TITLE = 'Formation IA pour le BTP en Île-de-France';
const HOME_META_DESCRIPTION = `Formation IA pour le BTP en présentiel IDF : devis, DCE et CR. Qualiopi, Constructys selon éligibilité. Laure Olivié — ${formatNoteSatisfactionAffichageComplet()}. Visio découverte.`;

const HOME_FAQ_PAGE_JSON_LD = buildHomeFAQPageJsonLd();

// ISR : HTML mis en cache au edge et revalidé toutes les heures (3600 s)

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: HOME_META_TITLE,
  description: HOME_META_DESCRIPTION,
  descriptionFinal: true,
  path: '/',
  keywords: [
    'formation IA appliquée au bâtiment',
    'formation ChatGPT BTP',
    'formation IA bâtiment',
    'formation IA construction',
    'formation IA travaux publics',
    'formation Claude AI BTP',
    'intelligence artificielle bâtiment',
    'formation IA Île-de-France',
    'formation IA Paris',
    'formation IA Yvelines',
    'Qualiopi IA BTP',
    'Constructys IA',
    'ChatGPT devis BTP',
    'IA conducteur de travaux',
    'IA appel d\'offres BTP',
  ],
  category: 'education',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  image: {
    url: PHOTOS.heroAccueilFormationIABtpEchange2026.src,
    width: PHOTOS.heroAccueilFormationIABtpEchange2026.width,
    height: PHOTOS.heroAccueilFormationIABtpEchange2026.height,
    alt: PHOTOS.heroAccueilFormationIABtpEchange2026.alt,
  },
});

export default function HomePage() {
  return (
    <div>
      <AccueilHeroSection />

      <AccueilPreuveSocialeSection />

      <section
        aria-labelledby="home-selecteur-cas-usage-ia"
        className={OFC_SEC.muted}
      >
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <h2
              id="home-selecteur-cas-usage-ia"
              className="font-display text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-3xl"
            >
              Que peut faire l&apos;IA pour votre métier ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5A5A5A] md:text-[17px]">
              Choisissez votre profil. Exemples concrets, documents concernés et formation adaptée — toujours avec
              validation métier de votre côté.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <SelecteurMetier showDedicatedPageLink />
          </Reveal>
        </div>
      </section>

      <AccueilCasUsageIaVisuels />

      <HomePrincipalSections />

      <BeworkEtFormationsOffreSection />

      <section
        className={`${OFC_SEC.whiteCompact} scroll-mt-24`}
        aria-labelledby="couverture-geo"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2
              id="couverture-geo"
              className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
            >
              Formations IA en présentiel — Île-de-France
            </h2>
            <p
              className="mt-3 max-w-none text-base leading-relaxed text-slate-600 md:text-lg"
              data-citation="true"
            >
            Basée à Guyancourt (78), Laure Olivié anime des formations{' '}
            <strong>présentiel uniquement · Île-de-France uniquement</strong> (Paris, 77, 78, 91, 92, 93, 94, 95) — intra-entreprise, dans vos locaux, pour les entreprises de construction et du BTP. On travaille sur vos
            documents réels. Découvrez la{' '}
            <Link href={LINKS.formationIleDeFrance} className={`${OFC_LINK} font-semibold`}>
              formation IA BTP en Île-de-France
            </Link>
            .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Les bénéfices — H2 unique + sous-sections H3 */}
      <section
        className={OFC_SEC.whiteMesh}
        aria-labelledby="benefices-formation-ia-heading"
      >
        <div className="mx-auto max-w-7xl">
            <Reveal className="text-center">
              <h2
                id="benefices-formation-ia-heading"
                className="font-display text-3xl font-bold text-slate-900 md:text-4xl"
              >
                Les bénéfices d&apos;une formation IA pour les pros du BTP et de la construction
              </h2>
            </Reveal>
            <div className="mt-12">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                  <Zap size={16} strokeWidth={1.5} />
                  <span>GAINS CONCRETS</span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-slate-900 md:text-3xl">
                  Pourquoi l&apos;IA change le quotidien des entreprises du BTP
                </h3>
                <p className="mt-3 max-w-none text-base leading-relaxed text-slate-600 md:text-lg">
                  Une formation IA appliquée au bâtiment, sérieuse, automatise devis, emails et suivi administratif sans
                  remplacer le métier. Dans le secteur de la construction, les professionnels du BTP et conducteurs de
                  travaux gagnent en productivité et retrouvent du temps sur le chantier et les appels d&apos;offres.
                </p>
              </Reveal>
              <RevealGroup
                className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                staggerMs={60}
              >
                {[
                  {
                    icon: Clock,
                    title: 'Trop de temps sur les devis',
                    keyPoint: (
                      <KeyPoint label="Gain constaté">
                        {DEVIS_GAIN_TEMPS_LIBELLE} L&apos;IA structure la trame ; vous validez prix et conditions.
                      </KeyPoint>
                    ),
                  },
                  {
                    icon: FileText,
                    title: "Les appels d'offres prennent des heures",
                    desc: "Un mémoire technique structuré à partir d'une trame plutôt que d'une page blanche — analyse DCE et rédaction sous votre validation métier.",
                  },
                  {
                    icon: FileText,
                    title: "Les comptes rendus ne sont jamais faits",
                    desc: "Des comptes rendus rédigés le jour même de la visite, à partir de vos notes vocales ou écrites.",
                  },
                  {
                    icon: Mail,
                    title: "Trop d'emails à gérer",
                    desc: "Moins de temps sur les relances et les courriers récurrents, avec le bon ton professionnel.",
                  },
                ].map((card) => {
                  const Icon = card.icon;
                  return (
                  <div
                    key={card.title}
                    className={`${OFC_BENEFIT_CARD} h-full rounded-2xl border border-slate-200 bg-slate-50/50 p-6`}
                  >
                    <div className="ofc-benefit-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-lg shadow-blue-500/20">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <h4 className="mt-4 font-semibold text-slate-900">{card.title}</h4>
                    {'keyPoint' in card && card.keyPoint ? (
                      <div className="mt-3">{card.keyPoint}</div>
                    ) : (
                      <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
                    )}
                  </div>
                  );
                })}
              </RevealGroup>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">{GAINS_TEMPS_MENTION_PRUDENCE}</p>
            </div>

            <div className={OFC_INSET_PANEL} aria-labelledby="probleme-solution-heading">
              <Reveal className="text-center">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Avant · Après
                </p>
                <h3
                  id="probleme-solution-heading"
                  className="mx-auto mt-4 max-w-4xl font-display text-2xl font-bold leading-[1.15] tracking-tight text-slate-900 md:text-3xl"
                >
                  Le BTP perd des heures sur des tâches que l&apos;IA{' '}
                  <span className="relative inline-block font-serif italic text-[var(--accent)]">
                    automatise
                    <span
                      className="absolute -bottom-0.5 left-0 right-0 -z-10 h-2.5 rounded-md bg-blue-100/90"
                      aria-hidden
                    />
                  </span>
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-slate-600 md:text-base">
                  Trois freins fréquents sur chantier et au bureau — et ce que change une formation IA
                  BTP encadrée (toujours sous votre validation métier).
                </p>
              </Reveal>
              <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" staggerMs={50}>
                {[
                  {
                    problem: 'Mémoires techniques et dossiers chronophages',
                    solution: 'Trames et IA : rédigez l’essentiel en minutes, vous validez.',
                  },
                  {
                    problem: 'Analyse de CCTP / DCE fastidieuse',
                    solution: 'L’IA extrait critères et points clés pour structurer votre réponse.',
                  },
                  {
                    problem: 'Comptes rendus et emails répétitifs',
                    solution: 'Dictez ou notez : l’IA structure un CR ou un mail pro.',
                  },
                ].map(({ problem, solution }, index) => (
                  <article
                    key={problem}
                    className={`${OFC_PROBLEM_SOLUTION_CARD} group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 shadow-[0_4px_24px_-6px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.04] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_-12px_rgba(37,99,235,0.14)] hover:ring-blue-500/10`}
                  >
                    <div className="relative border-b border-dashed border-slate-200/90 bg-gradient-to-br from-rose-50/90 via-white to-transparent px-5 pb-5 pt-6 sm:px-6">
                      <div className="absolute right-4 top-4 text-[0.65rem] font-bold tabular-nums text-rose-300/90">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="flex gap-4">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-rose-50 text-rose-600 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] ring-1 ring-rose-200/60"
                          aria-hidden
                        >
                          <X size={20} strokeWidth={2.25} />
                        </span>
                        <p className="pt-0.5 text-[0.9375rem] font-semibold leading-snug text-slate-800">
                          {problem}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex h-12 shrink-0 items-center justify-center bg-white/50">
                      <div className="absolute left-8 right-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-slate-200 to-transparent" aria-hidden />
                      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white shadow-[0_4px_14px_-4px_rgba(37,99,235,0.35)] ring-4 ring-white">
                        <ArrowDown className="ofc-problem-arrow h-4 w-4 text-[var(--accent)]" strokeWidth={2.5} aria-hidden />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col bg-gradient-to-br from-[var(--accent-soft)]/40 via-white to-blue-50/30 px-5 pb-6 pt-1 sm:px-6">
                      <div className="flex gap-4">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-blue-600 text-white shadow-[0_6px_16px_-6px_rgba(37,99,235,0.55)] ring-1 ring-white/30"
                          aria-hidden
                        >
                          <Check size={20} strokeWidth={2.25} />
                        </span>
                        <p className="pt-0.5 text-[0.9375rem] leading-relaxed text-slate-700">{solution}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </RevealGroup>
            </div>

            <div
              className="mt-16 rounded-2xl border border-slate-200 bg-[#eef2ff] px-4 py-12 md:px-8"
              itemScope
              itemType="https://schema.org/HowTo"
            >
              <Reveal className="text-center">
                <h3
                  className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
                  itemProp="name"
                >
                  5 cas d&apos;usage concrets de l&apos;IA dans le{' '}
                  <span className="font-serif italic">BTP</span>
                </h3>
                <p
                  className="mx-auto mt-3 max-w-2xl text-slate-600"
                  itemProp="description"
                >
                  Méthodes éprouvées en formation IA pour le BTP avec des professionnels du BTP, conducteurs de travaux et
                  entreprises de construction : devis, chantier, appels d&apos;offres et productivité au
                  quotidien.
                </p>
              </Reveal>
              <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerMs={45}>
                {[
                  {
                    title: 'Mémoires techniques & dossiers',
                    desc: "Structurer et rédiger plus vite tout en gardant la validation métier.",
                  },
                  {
                    title: 'Analyse CCTP / DCE',
                    desc: 'Synthétiser des pièces longues et repérer les exigences clés.',
                  },
                  {
                    title: 'Comptes rendus de chantier',
                    desc: 'À partir de notes ou dictée : CR clair et professionnel.',
                  },
                  {
                    title: 'Devis et chiffrage',
                    desc: 'Mise en forme, variantes et relecture pour gagner du temps.',
                  },
                  {
                    title: 'Emails & administratif',
                    desc: 'Relances, courriers et priorités pour souffler sur la boîte mail.',
                  },
                ].map((c, idx) => (
                  <div
                    key={c.title}
                    className={`${OFC_HOWTO_STEP} rounded-2xl border border-white/80 bg-white p-6 shadow-sm`}
                    itemScope
                    itemProp="step"
                    itemType="https://schema.org/HowToStep"
                  >
                    <meta itemProp="position" content={String(idx + 1)} />
                    <h4 className="font-semibold text-slate-900" itemProp="name">
                      {c.title}
                    </h4>
                    <p className="mt-2 text-sm text-slate-600" itemProp="text">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </RevealGroup>
              <Reveal className="mt-10 text-center">
                <Link
                  href={LINKS.casUsage}
                  className={`inline-flex items-center gap-2 ${OFC_LINK}`}
                  title="10 cas d’usage concrets de l’IA dans le BTP"
                >
                  Voir le détail des 10 cas d&apos;usage
                  <span aria-hidden>→</span>
                </Link>
              </Reveal>
            </div>
        </div>
        <div className={OFC_INNER_ACCENT_BAND}>
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2
                id="gains-concrets-heading"
                className="font-display text-3xl font-bold text-white md:text-4xl"
              >
                Ce que vous gagnez concrètement
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-blue-100/95 md:text-lg">
                Après la formation : rentabilité, réactivité commerciale, fidélisation des équipes et image
                professionnelle — sans embaucher à tout prix.
              </p>
            </Reveal>
            <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2" staggerMs={60}>
              {GAINS_COMMERCIAUX_CARDS.slice(0, 2).map((card) => {
                const Icon = card.icon;
                return (
                <div
                  key={card.title}
                  className={`${OFC_GAIN_CARD} group/card rounded-2xl border border-white/10 bg-white/[0.08] p-6 shadow-lg shadow-blue-950/20 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.14] hover:shadow-xl hover:shadow-blue-950/30`}
                >
                  <div className="relative flex h-[3.75rem] w-[3.75rem] items-center justify-center" aria-hidden>
                    <span className="benefit-icon-halo absolute -inset-1 z-0 rounded-2xl opacity-90 transition-opacity duration-300 group-hover/card:opacity-100" />
                    <span className="benefit-icon-plate absolute inset-0 z-[1] rounded-2xl ring-1 ring-white/25" />
                    <Icon
                      size={26}
                      strokeWidth={1.6}
                      className="relative z-10 text-white drop-shadow-[0_2px_10px_rgba(56,189,248,0.45)] transition-transform duration-300 group-hover/card:scale-105"
                    />
                  </div>
                  <h3 className="mt-5 font-semibold tracking-tight text-white">{card.title}</h3>
                  {'keyPoint' in card && card.keyPoint ? (
                    <>
                      <div className="mt-3">{card.keyPoint}</div>
                      {card.desc ? (
                        <p className="mt-2 text-sm leading-relaxed text-blue-100/95">{card.desc}</p>
                      ) : null}
                    </>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-blue-100/95">{card.desc}</p>
                  )}
                </div>
                );
              })}
            </RevealGroup>
            <ul className="mt-8 space-y-3 text-base leading-relaxed text-blue-100/95">
              {GAINS_CONCRETS_MERGES.map((line) => (
                <li key={line} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-white" strokeWidth={2} aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <DisclaimerGains className="mt-6 max-w-3xl text-blue-100/80" />
            <Accordion
              id="benefices-gains-commerciaux"
              variant="inverse"
              summaryLabel="Lire la suite — 4 autres bénéfices"
            >
              <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerMs={45}>
                {GAINS_COMMERCIAUX_CARDS.slice(2).map((card) => {
                  const Icon = card.icon;
                  return (
                  <div
                    key={card.title}
                    className={`${OFC_GAIN_CARD} group/card rounded-2xl border border-white/10 bg-white/[0.08] p-6 shadow-lg shadow-blue-950/20 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.14] hover:shadow-xl hover:shadow-blue-950/30`}
                  >
                    <div className="relative flex h-[3.75rem] w-[3.75rem] items-center justify-center" aria-hidden>
                      <span className="benefit-icon-halo absolute -inset-1 z-0 rounded-2xl opacity-90 transition-opacity duration-300 group-hover/card:opacity-100" />
                      <span className="benefit-icon-plate absolute inset-0 z-[1] rounded-2xl ring-1 ring-white/25" />
                      <Icon
                        size={26}
                        strokeWidth={1.6}
                        className="relative z-10 text-white drop-shadow-[0_2px_10px_rgba(56,189,248,0.45)] transition-transform duration-300 group-hover/card:scale-105"
                      />
                    </div>
                    <h3 className="mt-5 font-semibold tracking-tight text-white">{card.title}</h3>
                    {'keyPoint' in card && card.keyPoint ? (
                      <>
                        <div className="mt-3">{card.keyPoint}</div>
                        {card.desc ? (
                          <p className="mt-2 text-sm leading-relaxed text-blue-100/95">{card.desc}</p>
                        ) : null}
                      </>
                    ) : (
                      <p className="mt-2 text-sm leading-relaxed text-blue-100/95">{card.desc}</p>
                    )}
                  </div>
                  );
                })}
              </RevealGroup>
            </Accordion>
          </div>
        </div>
      </section>

      <HomeGuideConducteurTravauxSection />

      <AccueilFormationsIaMetiersSection />

      <PourQuiSection />

      {/* Thématiques abordées — H3 sous « Mes formations IA spécialisées BTP » */}
      <section id="programme" className={OFC_SEC.white}>
        <div className="mx-auto max-w-7xl">
          <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <span>THÉMATIQUES ABORDÉES</span>
          </div>
          <h3 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Programme détaillé des formations
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            catalogue &amp; programmes PDF — articles et guides IA BTP · Claude AI BTP · mémoire technique · IA
            conducteur de travaux
          </p>
          <p className="mt-3 max-w-none text-base leading-relaxed text-slate-600 md:text-lg">
            {getPublishedFormations().length} parcours officiels :{' '}
            {getPublishedFormations().map((f, i, list) => (
              <span key={f.code}>
                {i > 0 ? (i === list.length - 1 ? ' et ' : ' ; ') : null}
                <strong className="font-semibold text-slate-800">{f.niveauLabel}</strong>
                {' — '}
                {f.titre}
              </span>
            ))}
            . Les thèmes couverts incluent devis et chiffrage, réponses aux marchés, comptes rendus, DOE, emails et
            relation client — en{' '}
            <strong className="font-semibold text-slate-800">sessions de {SESSION_DUREE_LIBELLE}</strong>
            {' '}
            (intra {libelleTarifsCarteCatalogue(4).intra} ; inter {libelleTarifsCarteCatalogue(4).inter} — effectifs selon fiche). Téléchargez les{' '}
            <strong className="font-semibold text-slate-800">programmes PDF</strong> depuis chaque fiche ou ci-dessous
            sur la page catalogue.
          </p>
          </Reveal>
          <Accordion id="programme-modules-detail" summaryLabel="Lire la suite — modules et ressources">
            <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerMs={45}>
              {[
                {
                  n: 1,
                  title: 'Devis & chiffrage avec l\'IA',
                  items: [
                    'Structurez un premier devis en moins d\'une heure, contre une demi-journée en routine',
                    'Adaptez la trame à vos prix et vos marges — vous validez les montants',
                    'Préparez vos éléments de rentabilité pour vérification',
                    'Déclinez des variantes de libellés et d\'options plus rapidement',
                  ],
                },
                {
                  n: 2,
                  title: "Réponses aux appels d'offres",
                  items: [
                    'Analysez un DCE rapidement',
                    'Structurez votre mémoire technique',
                    'Rédigez une proposition convaincante',
                    'Sécurisez la confidentialité des données',
                  ],
                },
                {
                  n: 3,
                  title: 'Comptes rendus et DOE',
                  items: [
                    'Rédigez vos CR de chantier à partir de vos notes ou d\'une dictée, en relecture',
                    'Structurez vos DOE à partir des pièces existantes',
                    "Créez des rapports d'avancement",
                    'Documentez vos réunions de chantier',
                  ],
                },
                {
                  n: 4,
                  title: 'Gestion des emails & relation client',
                  items: [
                    'Rédigez vos emails professionnels',
                    'Créez des modèles de relances',
                    'Gérez les réclamations clients',
                    'Communiquez avec les fournisseurs',
                  ],
                },
              ].map((mod) => (
                <div
                  key={mod.n}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-bold text-white">
                    {mod.n}
                  </div>
                  <h4 className="mt-4 font-semibold text-slate-900">{mod.title}</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {mod.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-[var(--accent)]">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </RevealGroup>

            <Reveal className="mt-16 max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
              <Image
                src={LOGO_LINKEDIN_LEARNING.src}
                alt={LOGO_LINKEDIN_LEARNING.alt}
                width={LOGO_LINKEDIN_LEARNING.width}
                height={LOGO_LINKEDIN_LEARNING.height}
                className="h-8 w-auto max-w-[160px] object-contain"
                sizes="160px"
                loading="lazy"
                quality={70}
              />
              <p className="mt-3 text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
                LinkedIn Learning
              </p>
              <h4 className="mt-2 font-display text-xl font-bold text-slate-900 md:text-2xl">
                L&apos;IA pour recruter dans le BTP
              </h4>
              <p className="mt-3 text-slate-600">
                Pour les <strong>PME BTP et TPE</strong> du bâtiment : annonces, tri de CV, entretiens,
                fidélisation. Cours{' '}
                <strong>
                  L&apos;IA pour les artisans et TPE&nbsp;: Recruter sa main-d&apos;œuvre efficacement
                </strong>{' '}
                — accédez à la vidéo et au programme sur{' '}
                <a
                  href="https://fr.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement/bienvenue-dans-l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={OFC_LINK}
                >
                  LinkedIn Learning
                </a>
                .
              </p>
            </Reveal>
          </Accordion>
        </div>
      </section>

      {/* Pourquoi choisir Laure Olivié */}
      <section
        className={OFC_SEC.whiteMesh}
        aria-labelledby="pourquoi-laure-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
            <div className="shrink-0 w-full space-y-4 sm:w-80 lg:w-96">
              <ProfilePhoto title="Sessions présentiel Île-de-France — Qualiopi, Constructys" />
            </div>
            <div>
              <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                <span>VOTRE FORMATRICE</span>
              </div>
              <h2
                id="pourquoi-laure-heading"
                className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl"
              >
                Pourquoi choisir Laure Olivié ?
              </h2>
              </Reveal>
              <Reveal>
              <Citation
                className="mt-6"
                variant="formatrice"
                quote="Formatrice IA spécialisée BTP depuis fin 2021, après 10 ans de terrain BTP comme conductrice de travaux. Mon objectif : zéro théorie, 100 % pratique. Vous repartez avec des outils opérationnels dès le lendemain."
                author="Laure Olivié"
                role="Formatrice IA BTP — OFC Création d'Entreprise"
              />
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Vous cherchez un formateur IA pour le bâtiment ou la construction ? Découvrez{' '}
                <Link href={LINKS.formateurIaBtp} className={`${OFC_LINK} font-semibold`}>
                  une formatrice IA spécialisée construction
                </Link>
                .
              </p>
              </Reveal>
              <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2" staggerMs={55}>
                {[
                  {
                    icon: GraduationCap,
                    title: '10 ans de terrain BTP',
                    desc: 'Spécialisation métiers du bâtiment, TP, génie civil.',
                  },
                  {
                    icon: Zap,
                    title: 'Méthode 100 % opérationnelle',
                    desc: "Pas de PowerPoint théorique. On travaille directement sur vos documents réels.",
                  },
                  {
                    icon: Check,
                    title: 'Organisme certifié Qualiopi',
                    desc: QUALIOPI_FINANCEMENT_FORMULATION,
                  },
                  {
                    icon: Users,
                    title: 'Supports fournis',
                    desc: 'Vous repartez avec les supports de la session et vos prompts adaptés à vos documents.',
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-slate-200 p-4 shadow-sm"
                  >
                    <Icon size={24} strokeWidth={1.5} className="text-[var(--accent)]" />
                    <h4 className="mt-2 font-semibold text-slate-900">{title}</h4>
                    <p className="mt-1 text-sm text-slate-600">{desc}</p>
                  </div>
                ))}
              </RevealGroup>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-[var(--accent-soft)] p-6 shadow-sm">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Building2 className="h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} aria-hidden />
                  Partenaires
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Interventions et actions de formation avec la FFB (Île-de-France) et
                  la {CSFE_NOM_LIBRE}.
                </p>
                <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {[
                    {
                      label: 'FFB Bâtiment',
                      href: 'https://www.ffbatiment.fr',
                      title: 'Fédération Française du Bâtiment',
                    },
                    {
                      label: 'FFB Île-de-France',
                      href: 'https://www.ffbatiment.fr/federations/ile-de-france',
                      title: 'FFB Île-de-France',
                    },
                    { label: 'CSFE', href: 'https://www.csfe.fr', title: CSFE_NOM_COMPLET },
                  ].map(({ label, href, title }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={title}
                        className="inline-flex rounded-xl border border-[var(--accent)]/25 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-slate-500">
                  <Link
                    href="/etudes-de-cas/ffb-csfe"
                    className={OFC_LINK}
                    title={CSFE_NOM_COMPLET}
                  >
                    Étude de cas FFB &amp; {CSFE_NOM_COMPLET}
                  </Link>
                  {' · '}
                  <Link href="/a-propos#clients-partenaires" className={OFC_LINK}>
                    Tous les partenaires
                  </Link>
                </p>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">
                  <Link href={LINKS.formationsLinkedInLearning} className={`${OFC_LINK} font-semibold`}>
                    Instructrice LinkedIn Learning — découvrez mes 2 cours à la demande
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <HomeDeferredLinkedInLearning />

          <div className="mt-16 space-y-16 border-t border-slate-200 pt-16">
            <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                <span>FINANCEMENT</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Financement possible selon éligibilité
              </h3>
              <p className="mt-3 max-w-none text-base leading-relaxed text-slate-600 md:text-lg">
                <MentionFinancement variant="long" />
              </p>
              <Accordion id="financement-constructys-detail" summaryLabel="Lire la suite — barèmes et démarches">
                <RevealGroup className="grid gap-6 md:grid-cols-3" staggerMs={45}>
                  {[
                    {
                      icon: Award,
                      title: 'Prise en charge partielle',
                      desc: "Coût pédagogique : plafond indicatif 24 € HT/heure/stagiaire (96 € HT pour 4 h). Sessions intra : 840 € HT/jour maximum — selon barèmes Constructys et éligibilité.",
                    },
                    {
                      icon: Target,
                      title: 'Salaires remboursés',
                      desc: 'Pour les entreprises de moins de 11 salariés : 15€ HT/heure/stagiaire. Éligible si formation « gestion d\'entreprise ».',
                    },
                    {
                      icon: Check,
                      title: 'Organisme certifié Qualiopi',
                      desc: "Organisme certifié Qualiopi. Démarches administratives simplifiées. Accompagnement complet pour monter le dossier.",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <h4 className="mt-4 font-semibold text-slate-900">{title}</h4>
                      <p className="mt-2 text-sm text-slate-600">{desc}</p>
                    </div>
                  ))}
                </RevealGroup>
                <ConstructysResteAChargeBox />
                <div className="mt-10 text-center">
                  <Link
                    href={LINKS.financement}
                    className="inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                    title="Financement OPCO Constructys — formation IA pour les pros du BTP"
                  >
                    financement Constructys
                  </Link>
                </div>
              </Accordion>
            </div>
            </Reveal>

            <Reveal>
            <div className="mx-auto max-w-4xl">
              <div className="flex flex-col gap-8 rounded-2xl border border-slate-200 bg-slate-50 p-8 md:flex-row md:items-start">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:w-[28rem] md:shrink-0">
                  <Link href={LINKS.qualiopi} className="block hover:opacity-95">
                    <QualiopiBadge size="lg" />
                  </Link>
                  <ExternalLinkAnchor
                    href={ANNUAIRE_ENTREPRISES_OFC_URL}
                    title="Consulter la fiche OFC Création d'Entreprise sur l'Annuaire des Entreprises (data.gouv.fr)"
                    className={`mt-4 inline-flex text-xs ${OFC_LINK}`}
                  >
                    Vérifier l&apos;organisme sur annuaire-entreprises.data.gouv.fr →
                  </ExternalLinkAnchor>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-bold text-slate-900">
                    Organisme de formation certifié Qualiopi
                  </h3>
                  <p className="mt-3 text-slate-600">
                    OFC CRÉATION D&apos;ENTREPRISE est certifié Qualiopi, dans le cadre du
                    plan de développement des compétences de votre entreprise.{' '}
                    <MentionFinancement variant="court" withLink={false} />.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <ExternalLinkAnchor
                      href={ANNUAIRE_ENTREPRISES_OFC_URL}
                      title="Vérifier l'organisme certifié Qualiopi — fiche entreprise officielle"
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)] hover:bg-blue-100"
                    >
                      Vérifier la certification (annuaire des entreprises) →
                    </ExternalLinkAnchor>
                  </div>
                </div>
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Suspense fallback={<GoogleReviewsSectionPlaceholder />}>
        <GoogleReviewsSection />
      </Suspense>

      {/* FAQ */}
      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-7xl">
          <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white">
            <span>FAQ</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900">
            Questions fréquentes sur la formation IA appliquée au bâtiment et à la construction
          </h2>
          <p className="mt-3 text-slate-600">
            Vous avez des questions ? Voici les réponses aux interrogations les plus
            fréquentes.
          </p>
          </Reveal>
          <Reveal className="mt-8">
            <HomeFaqDetailsList items={FAQ_ITEMS_HOME} />
          </Reveal>
        </div>
      </section>

      {/* Une autre question ? Contact CTA */}
      <section className={OFC_SEC.white}>
        <Reveal className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-[var(--accent-soft)] p-10 text-center">
            <h3 className="font-display text-2xl font-bold text-slate-900">
              Une autre question ?
            </h3>
            <p className="mt-3 text-slate-600">
              Écrivez-moi ou prenez rendez-vous pour un échange de 30 minutes gratuit.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={`mailto:${SCHEMA_CONTACT.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                <Mail size={20} strokeWidth={1.5} />
                {SCHEMA_CONTACT.email}
              </a>
              <Link
                href={LINKS.accueilRdv}
                className={`${OFC_CTA_SECONDARY} inline-flex items-center justify-center gap-2 px-6 py-3`}
              >
                <Calendar size={20} strokeWidth={1.5} />
                Réservez votre visio découverte gratuite
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Prise de RDV — bloc Calendly unique (#rdv) */}
      <section
        id="rdv"
        aria-labelledby="rdv-creneau-heading"
        className={OFC_SEC.muted}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                <Calendar size={16} strokeWidth={1.5} />
                <span>PRENDRE RDV</span>
              </div>
              <h3
                id="rdv-creneau-heading"
                className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl"
              >
                Réservez un créneau de visio découverte
              </h3>
              <p className="mt-3 text-slate-600">
                Choisissez le jour et l&apos;heure qui vous conviennent pour un échange
                de 30 minutes. Devis personnalisé sous 24h après l&apos;échange.
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Email :{' '}
                <a
                  href={`mailto:${SCHEMA_CONTACT.email}`}
                  className={OFC_LINK}
                >
                  {SCHEMA_CONTACT.email}
                </a>
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Écrivez-moi ou prenez rendez-vous — coordonnées à droite.
              </p>
              <div className="mt-8 space-y-6">
                {[
                  {
                    icon: Clock,
                    title: 'Réponse rapide',
                    desc: 'Devis détaillé sous 24h avec programme personnalisé',
                  },
                  {
                    icon: Check,
                    title: 'Financement OPCO selon éligibilité',
                    desc: 'Financement possible selon éligibilité — détail Constructys sur devis après analyse de votre dossier.',
                  },
                  {
                    icon: Mail,
                    title: 'Besoin d\'échanger ?',
                    desc: SCHEMA_CONTACT.email,
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{title}</p>
                      <p className="text-sm text-slate-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="accueil-rdv-calendly min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 md:p-6">
              <CalendlyEmbed
                type="inline"
                campaign="accueil-rdv-inline"
                ctaPosition="inline"
                heightPx={620}
              />
            </div>
          </div>
        </div>
      </section>

      <ArticlesFormationLies />

      <AccueilBeworkAccordionSection />

      <JsonLd id="schema-home-unified-graph" schema={buildHomeUnifiedGraphJsonLd()} />
      <JsonLd id="faq-schema-home" schema={HOME_FAQ_PAGE_JSON_LD} />
    </div>
  );
}
