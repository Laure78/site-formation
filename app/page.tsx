import Link from 'next/link';
import { PresentationAnimee } from '@/components/landing/PresentationAnimee';
import { CitationSentence } from '@/components/seo/CitationSentence';
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
import { FAQAccordion } from '@/components/landing/FAQAccordion';
import { ContactDirect } from '@/components/landing/ContactDirect';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';
import { GoogleReviewsSection } from '@/components/landing/GoogleReviewsSection';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import Image from 'next/image';
import Script from 'next/script';
import { createPageMetadata } from '@/lib/seo';
import { FAQ_ITEMS_HOME, buildHomeFAQPageJsonLd } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { PHOTOS } from '@/lib/photos';
import { EtudeCasClientsSection } from '@/components/landing/EtudeCasClientsSection';
import { PourQuiSection } from '@/components/landing/PourQuiSection';
import { ArticlesFormationLies } from '@/components/landing/ArticlesFormationLies';
import { FFBIAAccrocheSection } from '@/components/landing/FFBIAAccrocheSection';
import { ClientsLogosMarquee } from '@/components/landing/ClientsLogosMarquee';
import { CSFE_NOM_COMPLET, CSFE_NOM_LIBRE } from '@/lib/csfe';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_DEBUTANT_HT,
  TARIF_FORFAIT_AVANCE_HT,
  LIBELLE_EFFECTIF_GROUPE_COURT,
} from '@/lib/tarifs-sessions';
import { LINKS } from '@/lib/internal-links';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { OFC_CARD, OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { buildHomeUnifiedGraphJsonLd } from '@/lib/schema-home-unified-graph';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { HomePrincipalSections } from '@/components/landing/HomePrincipalSections';
import { SelecteurMetier } from '@/components/SelecteurMetier/SelecteurMetier';
import { BeworkEtFormationsOffreSection } from '@/components/landing/BeworkEtFormationsOffreSection';
import { Essentiel } from '@/components/readability/Essentiel';
import { Accordion } from '@/components/readability/Accordion';
import { StatCallout } from '@/components/readability/StatCallout';
import { KeyPoint } from '@/components/readability/KeyPoint';
import { Citation } from '@/components/readability/Citation';
import {
  COUNT_UP_PROS,
  COUNT_UP_PROS_PLUS,
  COUNT_UP_RATING,
  COUNT_UP_SATISFACTION,
  STATS_FRESHNESS_LABEL,
} from '@/lib/readability-presets';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';

/** Fiche officielle OFC — Annuaire des Entreprises (réf. Qualiopi / vérification) */
const ANNUAIRE_ENTREPRISES_OFC_URL =
  'https://annuaire-entreprises.data.gouv.fr/entreprise/ofc-creation-d-entreprise-ofc-creation-d-entreprise-905244281';

const GAINS_COMMERCIAUX_CARDS = [
  {
    icon: CircleDollarSign,
    title: 'Augmentez votre rentabilité',
    desc: "Réduisez vos coûts administratifs de 30 à 40 %. Répondez à plus d'appels d'offres avec les mêmes ressources.",
  },
  {
    icon: Rocket,
    title: 'Gagnez en réactivité commerciale',
    keyPoint: (
      <KeyPoint
        variant="inverse"
        label="Réactivité commerciale"
        subject="Réponse aux devis"
        after="15 minutes"
        before="2 jours"
      />
    ),
    desc: "Augmentez votre taux de transformation de 25 %.",
  },
  {
    icon: HeartHandshake,
    title: 'Fidélisez vos équipes',
    desc: "Libérez vos collaborateurs des tâches répétitives. Réduisez le turnover grâce à des conditions modernisées.",
  },
  {
    icon: LineChart,
    title: 'Développez votre CA sans embaucher',
    desc: "Traitez 50 % de chantiers supplémentaires avec les mêmes effectifs. Optimisez vos marges.",
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

/** Meta + Open Graph / Twitter (sans suffixe auteur — cible SERP ≤ 155 car.) */
const HOME_META_TITLE = "Formation IA pour les pro du BTP — Devis, chantier, appels d'offres";
const HOME_META_DESCRIPTION =
  "Formation IA appliquée au bâtiment : devis, appels d'offres, CR. BeWork ou Qualiopi. 1 592 pros, Constructys. RDV gratuit.";

const HOME_FAQ_PAGE_JSON_LD = JSON.stringify(buildHomeFAQPageJsonLd());

// ISR : HTML mis en cache au edge et revalidé toutes les heures (3600 s)
export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: HOME_META_TITLE,
  titleAbsolute: HOME_META_TITLE,
  description: HOME_META_DESCRIPTION,
  path: '/',
  appendAuthorSuffix: false,
  openGraphTitle: HOME_META_TITLE,
  openGraphDescription: HOME_META_DESCRIPTION,
  keywords: [
    'formation IA appliquée au bâtiment',
    'formation ChatGPT BTP',
    'formation IA bâtiment',
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
      {/* Hero — Formation IA pour le BTP (charte OFC #377CF3, fond neutre #F2F2F2) */}
      <section className={`${OFC_SEC.hero} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23377cf3\' fill-opacity=\'0.045\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-90" />
        <div
          className="pointer-events-none absolute -right-24 top-1/2 h-[min(480px,70vh)] w-[min(560px,55vw)] -translate-y-1/2 rounded-full bg-[#377CF3]/[0.06] blur-3xl md:right-0"
          aria-hidden
        />
        {/* Réseau léger aligné couleur primaire OFC */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] md:opacity-[0.14]"
          aria-hidden
        >
          <svg className="absolute left-1/2 top-0 h-[min(520px,75vh)] w-[min(900px,100%)] -translate-x-1/2" viewBox="0 0 400 280" fill="none">
            <defs>
              <linearGradient id="heroMesh" x1="200" y1="0" x2="200" y2="280" gradientUnits="userSpaceOnUse">
                <stop stopColor="#377CF3" stopOpacity="0.45" />
                <stop offset="1" stopColor="#377CF3" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M40 120 L120 60 L200 100 L280 40 L360 90 M120 60 L120 180 M200 100 L200 220 M280 40 L280 160 M40 120 L80 200 M360 90 L320 200"
              stroke="url(#heroMesh)"
              strokeWidth="0.75"
            />
            {[
              [120, 60],
              [200, 100],
              [280, 40],
              [40, 120],
              [360, 90],
              [120, 180],
              [200, 220],
              [280, 160],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2.5" fill="#377CF3" fillOpacity="0.28" />
            ))}
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col gap-10 md:gap-12 lg:gap-14">
            <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
              <div className="min-w-0">
                <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-[#377CF3]/20 bg-white/95 px-3 py-1.5 text-xs font-medium text-[#377CF3] shadow-[0_1px_6px_-2px_rgba(55,124,243,0.25)] backdrop-blur-sm ring-1 ring-white/80 sm:px-4 sm:py-2 sm:text-sm">
                  <Sparkles size={14} strokeWidth={1.5} className="shrink-0 text-[#377CF3] sm:h-4 sm:w-4" aria-hidden />
                  <span>Formation IA BTP · Qualiopi · Constructys</span>
                </div>
                <h1 className="mt-6 text-balance font-display text-[1.7rem] font-bold leading-[1.14] tracking-tight text-slate-900 sm:text-[1.95rem] md:text-[2.2rem] lg:text-[2.45rem] lg:leading-[1.11]">
                  Formation IA pour le BTP — devis, chantier, appels d&apos;offres
                </h1>
                <h2 className="mt-4 max-w-xl font-display text-lg font-semibold leading-snug tracking-tight text-slate-800 md:text-xl lg:text-[1.35rem]">
                  Sessions pratiques en présentiel — Île-de-France uniquement
                </h2>
                <p className="mt-2 max-w-xl text-sm font-medium text-slate-600 md:text-base">
                  Pas de distanciel · pas de déplacement hors Île-de-France
                </p>
                <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-700 md:text-lg">
                  Gagnez du temps sur vos devis, comptes rendus et réponses aux appels d&apos;offres avec{' '}
                  <span className="font-serif italic text-[#377CF3]">Claude AI</span> et l&apos;IA générative.
                </p>
                <p
                  className="citation-sentence mt-6 rounded-2xl border border-slate-200/70 bg-white p-4 text-[0.9375rem] leading-relaxed text-slate-800 shadow-[inset_4px_0_0_0_#377CF3,0_12px_40px_-18px_rgba(15,23,42,0.12)] md:p-5 md:text-lg"
                  data-citation="true"
                  itemProp="description"
                >
                  <strong>Laure Olivié</strong> forme vos équipes BTP à utiliser l&apos;IA sur leurs vrais documents
                  — devis, CR, DCE, mémoires techniques. Organisme <strong>OFC Création d&apos;Entreprise</strong>{' '}
                  certifié Qualiopi. {FINANCEMENT_FORMULATION_PRUDENTE}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
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
                <Essentiel
                  className="mt-8"
                  idPrefix="accueil"
                  items={[
                    'Sessions 4 h en présentiel IDF : devis, comptes rendus, appels d’offres et mémoires techniques (Claude AI, ChatGPT).',
                    'OFC Création d’Entreprise certifié Qualiopi — financement Constructys selon éligibilité.',
                    `${formatProfessionalsTrainedCount()} professionnels formés, note ${SOCIAL_PROOF.AVERAGE_RATING} — intra ou inter, pas de distanciel hors Île-de-France.`,
                    'Travail sur vos documents BTP réels : DCE, CCTP, relances clients et administratif chantier.',
                    'Catalogue NIV-01 bâtiment & TP et NIV-02 appels d’offres — validation métier de votre côté.',
                  ]}
                />
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <CalendlyEmbed
                    type="popup"
                    variant="pill"
                    campaign="accueil-hero"
                    ctaPosition="hero"
                    className="min-w-[min(100%,240px)] md:min-w-[auto]"
                  />
                  <Link
                    href="#programme"
                    className="inline-flex min-h-[46px] min-w-[min(100%,240px)] items-center justify-center rounded-full border-2 border-[#377CF3]/35 bg-white/90 px-7 py-3 text-center text-[0.95rem] font-semibold text-[#377CF3] backdrop-blur-sm transition hover:border-[#377CF3] hover:bg-[var(--accent-soft)] md:min-w-[auto]"
                  >
                    Voir le programme
                  </Link>
                </div>
                <div className="mt-8 rounded-xl border border-slate-200/90 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm md:px-5">
                <p className="text-sm leading-relaxed text-slate-600">
                  <span className="font-medium text-slate-700">Vous cherchez :</span>{' '}
                  <Link
                    href={LINKS.formationIaBtpNiveau1BatimentTp}
                    className={OFC_LINK}
                    title="Formation IA niveau 1 — bâtiment et travaux publics"
                  >
                    formation IA bâtiment &amp; travaux publics (niveau 1)
                  </Link>
                  {' · '}
                  <Link
                    href={LINKS.formationClaudeAiBtp}
                    className={OFC_LINK}
                    title="Formation Claude AI BTP dédiée"
                  >
                    formation Claude AI BTP
                  </Link>
                  {' · '}
                  <Link
                    href={LINKS.formationClaudeAiBatiment}
                    className={OFC_LINK}
                    title="Formation Claude AI bâtiment"
                  >
                    formation Claude bâtiment
                  </Link>
                  {' · '}
                  <Link
                    href={LINKS.formationClaudeAiTravauxPublics}
                    className={OFC_LINK}
                    title="Formation Claude AI travaux publics"
                  >
                    formation Claude travaux publics
                  </Link>
                  {' · '}
                  <Link
                    href={LINKS.financement}
                    className={OFC_LINK}
                    title="Financement Constructys — formation IA pour le BTP"
                  >
                    financement Constructys
                  </Link>
                  {' · '}
                  <Link
                    href={LINKS.formationAO}
                    className={OFC_LINK}
                    title="IA et appels d'offres BTP"
                  >
                    IA appels d&apos;offres BTP
                  </Link>
                </p>
                </div>
              </div>

              <aside className="flex w-full min-w-0 flex-col lg:sticky lg:top-24 xl:top-28">
                <div className="w-full rounded-3xl bg-gradient-to-b from-white to-[#F2F2F2]/80 p-1 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/60">
                  <div className="rounded-[1.35rem] bg-white px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
                  <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 sm:text-[0.7rem]">
                      Présentation vidéo
                    </p>
                    <span className="inline-flex w-fit items-center rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[0.7rem] font-semibold text-[#377CF3] ring-1 ring-[#377CF3]/15">
                      2 parcours · programme
                    </span>
                  </div>
                  <p className="mb-4 text-center text-sm font-medium leading-snug text-slate-800 lg:text-left">
                    Les 2 parcours de formation IA pour les pro du BTP
                  </p>
                  <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-slate-950 shadow-inner ring-1 ring-slate-900/10">
                    <div className="relative aspect-video w-full">
                      <iframe
                        src="https://www.youtube-nocookie.com/embed/7IBMFhdohkI"
                        title="Présentation animée — 2 formations IA appliquées au bâtiment"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    </div>
                  </div>
                  </div>
                </div>
              </aside>
            </div>

            <div className="min-w-0 w-full">
              <Reveal>
                <p
                  className="mt-0 text-sm text-slate-600 italic lg:-mt-2"
                  data-citation="true"
                >
                  <strong>Définition.</strong> Une « formation IA appliquée au bâtiment » est une formation professionnelle
                  qui apprend aux équipes du bâtiment et des travaux publics à utiliser les outils
                  d&apos;intelligence artificielle générative (Claude AI, Gemini, etc.) pour
                  automatiser leurs tâches récurrentes : devis, analyse de DCE et CCTP, appels d&apos;offres et mémoires
                  techniques, comptes rendus de chantier, relances clients et documents administratifs.
                </p>
              </Reveal>
              <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-3" staggerMs={50}>
                <StatCallout
                  value={COUNT_UP_PROS}
                  label="PERSONNES FORMÉES"
                  freshnessLabel={STATS_FRESHNESS_LABEL}
                />
                <StatCallout value="OPCO" label="FINANCEMENT POSSIBLE" />
                <StatCallout
                  value={COUNT_UP_RATING}
                  label="NOTE MOYENNE"
                  freshnessLabel={STATS_FRESHNESS_LABEL}
                />
              </RevealGroup>
              <CitationSentence text="La formation IA pour le BTP animée par Laure Olivié aide les professionnels du BTP et équipes terrain à gagner du temps : automatisation des devis, de l'administratif et des dossiers d'appels d'offres avec l'IA adaptée au chantier (Claude AI)." />
            </div>
          </div>
        </div>
      </section>

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
            <strong>exclusivement en présentiel en Île-de-France</strong> (Paris, 77, 78, 91, 92, 93, 94, 95) — intra
            dans vos locaux ou inter en salle. <strong>Pas de distanciel</strong> et{' '}
            <strong>pas de déplacement hors Île-de-France</strong>. On travaille sur vos documents BTP réels.
            </p>
          </Reveal>
        </div>
      </section>

      <ClientsLogosMarquee />

      {/* CTA mi-page — visio découverte */}
      <section className={OFC_SEC.mutedCompact}>
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              30 min pour cadrer votre formation IA BTP
            </h2>
            <p className="mt-2 text-slate-600">
              Devis, financement Constructys, format intra ou inter — sans engagement.
            </p>
          </div>
          <CalendlyEmbed
            type="popup"
            variant="primary"
            campaign="accueil-mid-page"
            ctaPosition="middle"
            className="shrink-0"
          />
        </Reveal>
      </section>

      {/* Référence clients — bande charte OFC (#377CF3, alignée sur le CTA Calendly) */}
      <section className={OFC_SEC.accent}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="max-w-xl shrink-0">
              <Reveal>
                <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">
                  Référence & partenaires
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                  FFB, CSFE… une formation IA plébiscitée par le réseau pro
                </h3>
                <p className="mt-4 text-white/90">
                  Devis, chantier, appels d&apos;offres : cas réels, gains concrets — pas de gadget.
                </p>
                <Link
                  href="/a-propos#clients-partenaires"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/15"
                >
                  Voir les clients & partenaires
                </Link>
              </Reveal>
              <RevealGroup className="mt-8 grid max-w-xl grid-cols-3 gap-3 sm:gap-4" staggerMs={50}>
                <StatCallout
                  variant="inverse"
                  className="rounded-2xl border border-white/25 bg-white/10 px-2 py-3 backdrop-blur-sm sm:px-4 sm:py-4"
                  value={COUNT_UP_PROS_PLUS}
                  label="personnes formées"
                  freshnessLabel={STATS_FRESHNESS_LABEL}
                />
                <StatCallout
                  variant="inverse"
                  className="rounded-2xl border border-white/25 bg-white/10 px-2 py-3 backdrop-blur-sm sm:px-4 sm:py-4"
                  value={COUNT_UP_RATING}
                  label="note moyenne"
                  freshnessLabel={STATS_FRESHNESS_LABEL}
                />
                <StatCallout
                  variant="inverse"
                  className="rounded-2xl border border-white/25 bg-white/10 px-2 py-3 backdrop-blur-sm sm:px-4 sm:py-4"
                  value="OPCO"
                  label="financement possible"
                />
              </RevealGroup>
            </div>
            <Reveal className="relative w-full min-h-[min(22rem,55vw)] overflow-hidden rounded-2xl border border-white/25 bg-black/10 lg:min-h-[28rem] lg:max-w-[min(100%,32rem)] xl:min-h-[32rem] xl:max-w-[36rem]">
              <Image
                src={PHOTOS.accueilReferencePartenairesLaureOFC2026.src}
                alt={PHOTOS.accueilReferencePartenairesLaureOFC2026.alt}
                title={`+${formatProfessionalsTrainedCount()} professionnels formés · Note ${SOCIAL_PROOF.AVERAGE_RATING} · Finançable Constructys`}
                fill
                className="object-cover object-[center_15%]"
                sizes="(max-width: 1024px) 100vw, 576px"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Étude de cas clients — FFB / CSFE (preuve B2B) */}
      <EtudeCasClientsSection />

      {/* Témoignages Google — sous « Ils m'ont fait confiance » (hiérarchie H2 → H3) */}
      <GoogleReviewsSection />

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
                Les bénéfices d&apos;une formation IA pour les pro du BTP
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
                  remplacer le métier. Les professionnels du BTP et conducteurs de travaux gagnent en productivité
                  et retrouvent du temps sur le chantier et les appels d&apos;offres.
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
                        Un devis détaillé prend <span className="text-slate-500">2h à 4h</span> à rédiger. Avec
                        l&apos;IA, vous passez à{' '}
                        <strong className="font-semibold text-[#377CF3]">15 minutes chrono</strong> tout en gardant la
                        qualité professionnelle.
                      </KeyPoint>
                    ),
                  },
                  {
                    icon: FileText,
                    title: "Les appels d'offres prennent des heures",
                    desc: "Analysez un DCE, structurez votre mémoire technique et rédigez une réponse convaincante 5 fois plus rapidement.",
                  },
                  {
                    icon: FileText,
                    title: "Les comptes rendus ne sont jamais faits",
                    desc: "Générez automatiquement vos CR, rapports d'avancement et fiches de suivi depuis vos notes vocales.",
                  },
                  {
                    icon: Mail,
                    title: "Trop d'emails à gérer",
                    desc: "Rédigez vos emails clients, fournisseurs et sous-traitants en quelques secondes avec le bon ton professionnel.",
                  },
                ].map((card) => {
                  const Icon = card.icon;
                  return (
                  <div
                    key={card.title}
                    className="h-full rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition-shadow hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-lg shadow-blue-500/20">
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

            <div
              className="relative mt-16 overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-b from-slate-100/50 via-white to-slate-50 px-4 py-12 md:px-8 md:py-16"
              aria-labelledby="probleme-solution-heading"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.12),transparent)]"
                aria-hidden
              />
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
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 shadow-[0_4px_24px_-6px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.04] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_-12px_rgba(37,99,235,0.14)] hover:ring-blue-500/10"
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
                        <ArrowDown className="h-4 w-4 text-[var(--accent)]" strokeWidth={2.5} aria-hidden />
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
                  entreprises du bâtiment : devis, chantier, appels d&apos;offres et productivité au
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
                    className="rounded-2xl border border-white/80 bg-white p-6 shadow-sm"
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
        <div className="bg-gradient-to-br from-[var(--accent)] to-blue-800 px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="max-w-3xl text-base leading-relaxed text-blue-100/95 md:text-lg">
                Ce que vous gagnez concrètement après la formation : rentabilité, réactivité commerciale,
                fidélisation des équipes et image professionnelle — sans embaucher à tout prix.
              </p>
            </Reveal>
            <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2" staggerMs={60}>
              {GAINS_COMMERCIAUX_CARDS.slice(0, 2).map((card) => {
                const Icon = card.icon;
                return (
                <div
                  key={card.title}
                  className="group/card rounded-2xl border border-white/10 bg-white/[0.08] p-6 shadow-lg shadow-blue-950/20 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.14] hover:shadow-xl hover:shadow-blue-950/30"
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
                    className="group/card rounded-2xl border border-white/10 bg-white/[0.08] p-6 shadow-lg shadow-blue-950/20 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.14] hover:shadow-xl hover:shadow-blue-950/30"
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

      {/* Catalogue formations */}
      <section className={OFC_SEC.mutedMesh}>
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
              <span>Formations IA pour le BTP</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
              Nos formations IA spécialisées BTP
            </h2>
            <p className="mt-3 max-w-none text-base leading-relaxed text-slate-600 md:text-lg">
              Formations IA Qualiopi / OPCO — intra ou inter, en présentiel en Île-de-France. Financement possible selon éligibilité.
            </p>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-8 md:grid-cols-2" staggerMs={60}>
            {[
              {
                ref: 'NIV-01',
                level: 'NIVEAU 1',
                title: "L'IA au service des pros du bâtiment et des travaux publics",
                href: LINKS.formationIaBtpNiveau1BatimentTp,
                pdf: LINKS.pdfProgrammeIaBtpNiveau1BatimentTp,
                visuel: PHOTOS.formationIABtpVisioBureau2026,
                duree: `${SESSION_DUREE_LIBELLE} · ${TARIF_FORFAIT_DEBUTANT_HT} € HT/session`,
                effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
                objectifs: [
                  'IA générative pour bâtiment et travaux publics — devis, chantier, administratif',
                  'Accélérer comptes rendus, courriers et suivi client',
                  'Repartir avec des prompts et trames prêts à l’emploi',
                ],
              },
              {
                ref: 'NIV-02',
                level: 'NIVEAU 2',
                title: "L'IA appliquée aux appels d'offres BTP",
                href: LINKS.formationAO,
                pdf: LINKS.pdfProgrammeIaBtpNiveau2AppelsOffre,
                visuel: PHOTOS.btpFormationChantierPlans2026,
                duree: `${SESSION_DUREE_LIBELLE} · ${TARIF_FORFAIT_AVANCE_HT} € HT/session`,
                effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
                objectifs: [
                  'Claude AI Pro, Cowork & Skills — assistants IA pour DCE et mémoire technique',
                  'Analyse DCE : 15 infos critiques, CCAP, CCTP, verdict Go / No Go',
                  'Skills personnalisés réutilisables — bibliothèque de prompts AO BTP',
                ],
              },
            ].map((cours) => (
              <div
                key={cours.ref}
                className={`${OFC_CARD} flex flex-col overflow-hidden`}
              >
                <div className="relative aspect-[4/3] w-full shrink-0 bg-slate-100">
                  <Image
                    src={cours.visuel.src}
                    alt={cours.visuel.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-slate-500">RÉF: {cours.ref}</span>
                  <span className="rounded-full border border-[var(--accent)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                    {cours.level}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-slate-900">
                  {cours.title}
                </h3>
                <div className="mt-4 flex gap-4 rounded-lg bg-slate-50 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock size={16} strokeWidth={1.5} />
                    {cours.duree}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-slate-600">
                    <Users size={16} strokeWidth={1.5} />
                    {cours.effectif}
                  </span>
                </div>
                <p className="mt-4 font-semibold text-slate-900">
                  OBJECTIFS PÉDAGOGIQUES
                </p>
                <ul className="mt-2 flex-1 space-y-2">
                  {cours.objectifs.map((obj) => (
                    <li key={obj} className="flex gap-2 text-sm text-slate-600">
                      <Check size={18} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                      {obj}
                    </li>
                  ))}
                </ul>
                <Link
                  href={cours.href}
                  className={`${OFC_CTA_PRIMARY} mt-6 block w-full py-3`}
                >
                  Voir la fiche formation
                </Link>
                <a
                  href={cours.pdf}
                  download
                  className="mt-3 block w-full rounded-xl border-2 border-slate-200 py-3 text-center text-sm font-semibold text-slate-800 hover:border-[var(--accent)]"
                >
                  Télécharger le programme (PDF)
                </a>
                </div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>
<PresentationAnimee />

      <FFBIAAccrocheSection />

      <PourQuiSection />

      <ArticlesFormationLies />

      {/* Thématiques abordées — H3 sous « Nos formations IA spécialisées BTP » */}
      <section id="programme" className={OFC_SEC.white}>
        <div className="mx-auto max-w-7xl">
          <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <span>THÉMATIQUES ABORDÉES</span>
          </div>
          <h3 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Programme détaillé de la formation
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            <Link
              href={LINKS.formations}
              className={OFC_LINK}
              title="Catalogue — 2 formations, programmes PDF"
            >
              catalogue &amp; programmes PDF
            </Link>
            {' — '}
            <Link href={LINKS.blog} className={OFC_LINK} title="Articles et guides IA BTP">
              tous les articles
            </Link>
            {' · '}
            <Link href={LINKS.claudeAiBtp} className={OFC_LINK} title="Guide Claude AI pour le BTP — interfaces, prompts, gains de temps">
              Claude AI BTP
            </Link>
            {' · '}
            <Link href={LINKS.iaDevis} className={OFC_LINK} title="IA pour automatiser les devis bâtiment">
              IA devis bâtiment
            </Link>
            {' · '}
            <Link href={LINKS.iaCDT} className={OFC_LINK} title="IA pour conducteurs de travaux">
              IA conducteur de travaux
            </Link>
            {' · '}
            <Link href={LINKS.prendreRdv} className={OFC_LINK} title="Prendre rendez-vous — diagnostic gratuit">
              prendre rendez-vous
            </Link>
          </p>
          <p className="mt-3 max-w-none text-base leading-relaxed text-slate-600 md:text-lg">
            Deux parcours officiels : <strong className="font-semibold text-slate-800">niveau 1</strong> (bâtiment
            &amp; travaux publics) et <strong className="font-semibold text-slate-800">niveau 2</strong> (appels
            d&apos;offres). Les thèmes couverts incluent devis et chiffrage, réponses aux marchés, comptes
            rendus, DOE, emails et relation client — en{' '}
            <strong className="font-semibold text-slate-800">sessions de 4 h</strong>, forfait par niveau, jusqu&apos;à{' '}
            12 participants. Téléchargez les <strong className="font-semibold text-slate-800">programmes PDF</strong>{' '}
            depuis chaque fiche ou ci-dessous sur la page catalogue.
          </p>
          <div className="mt-8">
            <Link
              href={LINKS.formations}
              className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              title="Catalogue des formations IA pour les pro du BTP Qualiopi"
            >
              catalogue des formations IA appliquées au bâtiment
            </Link>
          </div>
          </Reveal>
          <Accordion id="programme-modules-detail" summaryLabel="Lire la suite — modules et ressources">
            <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerMs={45}>
              {[
                {
                  n: 1,
                  title: 'Devis & chiffrage avec l\'IA',
                  items: [
                    'Créez des devis professionnels en 15 min',
                    'Ajustez les prix selon vos marges',
                    'Calculez automatiquement la rentabilité',
                    'Générez des variantes en un clic',
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
                    'Générez vos CR de chantier automatiquement',
                    'Structurez vos DOE',
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
              <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
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
                quote="Je forme les entreprises du BTP depuis 10 ans. Mon objectif : zéro théorie, 100 % pratique. Vous repartez avec des outils opérationnels dès le lendemain."
                author="Laure Olivié"
                role="Formatrice IA BTP — OFC Création d'Entreprise"
              />
              </Reveal>
              <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2" staggerMs={55}>
                {[
                  {
                    icon: GraduationCap,
                    title: '10 ans d\'expérience BTP',
                    desc: 'Spécialisation métiers du bâtiment, TP, génie civil.',
                  },
                  {
                    icon: Zap,
                    title: 'Méthode 100 % opérationnelle',
                    desc: "Pas de PowerPoint théorique. On travaille directement sur vos documents réels.",
                  },
                  {
                    icon: Check,
                    title: 'Certification Qualiopi',
                    desc: "Organisme certifié. Financement OPCO Constructys garanti.",
                  },
                  {
                    icon: Users,
                    title: 'Accompagnement post-formation',
                    desc: "Support WhatsApp. Accès 1 an aux ressources. Suivi personnalisé.",
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
              </div>
            </div>
          </div>

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
                {FINANCEMENT_FORMULATION_PRUDENTE}
              </p>
              <Accordion id="financement-constructys-detail" summaryLabel="Lire la suite — barèmes et démarches">
                <RevealGroup className="grid gap-6 md:grid-cols-3" staggerMs={45}>
                  {[
                    {
                      icon: Award,
                      title: 'Financement possible',
                      desc: "Coût pédagogique : plafond indicatif 24€ HT/heure/stagiaire. Sessions intra : 840€ HT/jour maximum — selon barèmes Constructys en vigueur.",
                    },
                    {
                      icon: Target,
                      title: 'Salaires remboursés',
                      desc: 'Pour les entreprises de moins de 11 salariés : 15€ HT/heure/stagiaire. Éligible si formation « gestion d\'entreprise ».',
                    },
                    {
                      icon: Check,
                      title: 'Certification Qualiopi',
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
                <div className="mt-10 text-center">
                  <Link
                    href={LINKS.financement}
                    className="inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                    title="Financement OPCO Constructys — formation IA pour les pro du BTP"
                  >
                    financement Constructys
                  </Link>
                </div>
              </Accordion>
            </div>
            </Reveal>

            <Reveal>
            <div className="mx-auto max-w-4xl">
              <div className="flex flex-col gap-8 rounded-2xl border border-slate-200 bg-slate-50 p-8 md:flex-row md:items-center">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <Image
                    src={PHOTOS.qualiopiLogoOfficiel.src}
                    alt={PHOTOS.qualiopiLogoOfficiel.alt}
                    width={PHOTOS.qualiopiLogoOfficiel.width}
                    height={PHOTOS.qualiopiLogoOfficiel.height}
                    className="mb-4 h-auto w-40"
                    sizes="160px"
                  />
                  <p className="font-display text-xl font-bold text-[var(--accent)]">
                    Qualiopi
                  </p>
                  <p className="mt-1 text-sm text-slate-600">processus certifié</p>
                  <p className="mt-4 text-xs text-slate-500">
                    La certification a été délivrée au titre de la catégorie d&apos;action
                    suivante : Action de formation
                  </p>
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
                    OFC CRÉATION D&apos;ENTREPRISE est certifié Qualiopi. Cette formation
                    est éligible aux financements OPCO et peut être prise en charge dans le
                    cadre du plan de développement des compétences de votre entreprise.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <ExternalLinkAnchor
                      href={ANNUAIRE_ENTREPRISES_OFC_URL}
                      title="Vérifier la certification Qualiopi — fiche entreprise officielle"
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

      {/* FAQ */}
      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-7xl">
          <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white">
            <span>FAQ</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900">
            Questions fréquentes sur la formation IA appliquée au bâtiment
          </h2>
          <p className="mt-3 text-slate-600">
            Vous avez des questions ? Voici les réponses aux interrogations les plus
            fréquentes.
          </p>
          </Reveal>
          <Reveal className="mt-8">
            <FAQAccordion items={FAQ_ITEMS_HOME} />
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
              <CalendlyEmbed
                type="popup"
                variant="secondary"
                campaign="accueil-faq"
                ctaPosition="middle"
                className="gap-2 px-6 py-3 text-slate-800"
              >
                <Calendar size={20} strokeWidth={1.5} />
                Réservez votre visio découverte gratuite
              </CalendlyEmbed>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA final — Prêt à transformer */}
      <section className={`${OFC_SEC.accentLoose} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60" />
        <Reveal className="relative mx-auto max-w-4xl text-center text-white">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Prêt à transformer votre métier avec l&apos;IA ?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Rejoignez les professionnels qui gagnent déjà plusieurs heures par semaine
            grâce à nos formations IA personnalisées pour le BTP.
          </p>
          <RevealGroup className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12" staggerMs={50}>
            <StatCallout
              variant="inverse"
              value={COUNT_UP_PROS_PLUS}
              label="Professionnels formés"
              freshnessLabel={STATS_FRESHNESS_LABEL}
            />
            <StatCallout
              variant="inverse"
              value={COUNT_UP_SATISFACTION}
              label="Satisfaction"
              freshnessLabel={STATS_FRESHNESS_LABEL}
            />
            <StatCallout variant="inverse" value="OPCO" label="Financement possible" />
          </RevealGroup>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CalendlyEmbed
              type="popup"
              variant="on-accent"
              campaign="accueil-fin-page"
              ctaPosition="footer"
              className="gap-2"
            >
              <Calendar size={20} strokeWidth={1.5} />
              Réservez votre visio découverte gratuite
            </CalendlyEmbed>
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white/60 px-8 py-4 font-semibold text-white hover:bg-white/10" />
          </div>
        </Reveal>
      </section>

      {/* Prise de RDV — H3 après le CTA final (#rdv conservé pour ancres) */}
      <section
        id="rdv"
        aria-labelledby="rdv-creneau-heading"
        className={OFC_SEC.muted}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                <Calendar size={16} strokeWidth={1.5} />
                <span>PRENDRE RDV</span>
              </div>
              <h3
                id="rdv-creneau-heading"
                className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl"
              >
                Réservez un créneau en ligne
              </h3>
              <p className="mt-3 text-slate-600">
                Choisissez le jour et l&apos;heure qui vous conviennent pour un échange
                de 30 minutes. Devis personnalisé sous 24h après notre rendez-vous.
              </p>
              <CalendlyEmbed
                type="popup"
                variant="primary"
                campaign="accueil-section-rdv"
                ctaPosition="footer"
                className="mt-6 gap-2 px-6 py-3"
              >
                <Calendar size={20} strokeWidth={1.5} />
                Réservez votre visio découverte gratuite
              </CalendlyEmbed>
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
                    title: 'Financement OPCO inclus',
                    desc: 'Votre devis intègre les possibilités de prise en charge Constructys',
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
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
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

      <JsonLd id="schema-home-unified-graph" schema={buildHomeUnifiedGraphJsonLd()} />
      <Script
        id="faq-schema-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: HOME_FAQ_PAGE_JSON_LD }}
      />
    </div>
  );
}
