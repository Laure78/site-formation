import Link from 'next/link';
import { PresentationAnimee } from '@/components/landing/PresentationAnimee';
import { CitationSentence } from '@/components/seo/CitationSentence';
import { RdvLink } from '@/components/RdvLink';
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
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_ITEMS_HOME } from '@/lib/faq';
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
  LIBELLE_EFFECTIF_GROUPE_COURT,
} from '@/lib/tarifs-sessions';
import { LINKS } from '@/lib/internal-links';
import { SCHEMA_CONTACT } from '@/lib/schema-constants';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { buildHomeUnifiedGraphJsonLd } from '@/lib/schema-home-unified-graph';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { HomePrincipalSections } from '@/components/landing/HomePrincipalSections';

/** Fiche officielle OFC — Annuaire des Entreprises (réf. Qualiopi / vérification) */
const ANNUAIRE_ENTREPRISES_OFC_URL =
  'https://annuaire-entreprises.data.gouv.fr/entreprise/ofc-creation-d-entreprise-ofc-creation-d-entreprise-905244281';

/** Meta + Open Graph / Twitter (sans suffixe auteur — ≤ 155 car. description SERP) */
const HOME_META_DESCRIPTION =
  "1 592 pros BTP formés à l'IA. Qualiopi finançable Constructys. ChatGPT devis, DCE, mémoire technique. Visio découverte gratuite.";

export const metadata = createPageMetadata({
  title: 'Formation IA BTP — ChatGPT, Devis & Chantier',
  description: HOME_META_DESCRIPTION,
  path: '/',
  appendAuthorSuffix: false,
  openGraphDescription:
    "1 592 pros BTP formés à l'IA. Qualiopi finançable Constructys. ChatGPT devis, DCE, mémoire technique. Visio découverte gratuite.",
  openGraphTitle: 'Formation IA BTP — ChatGPT, Devis & Chantier',
  keywords: [
    'formation IA BTP',
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

const STATS_FRESHNESS_LABEL = 'au 17 avril 2026';

export default function HomePage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS_HOME);

  return (
    <div>
      {/* Hero — Formation IA BTP */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#f8fbff] via-white to-white px-4 py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%232563eb\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-70" />
        {/* Réseau léger type « constellation » (inspiration landing pro) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          aria-hidden
        >
          <svg className="absolute left-1/2 top-0 h-[min(520px,75vh)] w-[min(900px,100%)] -translate-x-1/2" viewBox="0 0 400 280" fill="none">
            <defs>
              <linearGradient id="heroMesh" x1="200" y1="0" x2="200" y2="280" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563eb" stopOpacity="0.5" />
                <stop offset="1" stopColor="#2563eb" stopOpacity="0" />
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
              <circle key={i} cx={cx} cy={cy} r="2.5" fill="#2563eb" fillOpacity="0.35" />
            ))}
          </svg>
        </div>
        <div className="relative mx-auto max-w-6xl">
          {/* Colonne unique : texte sur toute la largeur du conteneur, vidéo en dessous — évite la moitié droite vide (grille 2 cols + iframe peu visible) */}
          <div className="flex flex-col gap-10 md:gap-12">
            <div className="min-w-0 w-full">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-medium text-[var(--accent)] shadow-sm backdrop-blur-sm">
                <Sparkles size={16} strokeWidth={1.5} className="shrink-0" />
                <span>Formation IA BTP · bâtiment & travaux publics</span>
                <span className="hidden text-slate-300 sm:inline">·</span>
                <span className="hidden sm:inline">Qualiopi · Constructys</span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-900 md:mt-5 md:text-5xl lg:text-6xl">
                Laure Olivié — Formatrice IA BTP de référence en France
              </h1>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-800 md:text-3xl lg:text-4xl">
                Formation IA BTP en Île-de-France pour vos équipes du bâtiment
              </h2>
              <p className="mt-3 text-xl font-semibold text-slate-700 md:text-2xl">
                Devis, chantier, appels d&apos;offres :{' '}
                <span className="font-serif italic text-[var(--accent)]">
                  ChatGPT et Claude AI
                </span>{' '}
                au service de votre productivité
              </p>
              <p
                className="citation-sentence my-6 border-l-[3px] border-[var(--accent)] bg-[#F8F9FA] p-4 text-slate-800"
                data-citation="true"
                itemProp="description"
              >
                <strong>Laure Olivié</strong> forme les équipes BTP à utiliser ChatGPT et Claude AI
                pour gagner 3 à 5 heures par semaine sur les devis, comptes rendus de chantier et
                réponses aux appels d&apos;offres. Sa formation, dispensée par l&apos;organisme{' '}
                <strong>OFC Création d&apos;Entreprise</strong> (certifié Qualiopi), est finançable à
                100 % par Constructys et a déjà accompagné {formatProfessionalsTrainedCount()}{' '}
                professionnels du bâtiment et des travaux publics en Île-de-France (note{' '}
                {SOCIAL_PROOF.AVERAGE_RATING}/5 en 2026).
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <RdvLink className="rounded-xl bg-[var(--accent)] px-8 py-4 text-center font-semibold text-white hover:bg-blue-600">
                  Organiser une formation
                </RdvLink>
                <Link
                  href="#programme"
                  className="rounded-xl border-2 border-[var(--accent)] px-8 py-4 text-center font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
                >
                  Voir le programme
                </Link>
              </div>
              <p className="mt-6 text-sm text-slate-500">
                <span className="font-medium text-slate-700">Vous cherchez :</span>{' '}
                <Link
                  href={LINKS.formationBatiment}
                  className="text-[var(--accent)] hover:underline"
                  title="Formation IA bâtiment — L'IA au service du bâtiment"
                >
                  formation IA bâtiment
                </Link>
                {' · '}
                <Link
                  href={LINKS.formationTP}
                  className="text-[var(--accent)] hover:underline"
                  title="Formation IA travaux publics"
                >
                  formation IA travaux publics
                </Link>
                {' · '}
                <Link
                  href={LINKS.financement}
                  className="text-[var(--accent)] hover:underline"
                  title="Financement Constructys — formation IA BTP"
                >
                  financement Constructys
                </Link>
                {' · '}
                <Link
                  href={LINKS.formationAO}
                  className="text-[var(--accent)] hover:underline"
                  title="IA et appels d'offres BTP"
                >
                  IA appels d&apos;offres BTP
                </Link>
              </p>
              <p
                className="mt-8 text-sm text-slate-600 italic"
                data-citation="true"
              >
                <strong>Définition.</strong> Une « formation IA BTP » est une formation professionnelle
                qui apprend aux équipes du bâtiment et des travaux publics à utiliser les outils
                d&apos;intelligence artificielle générative (ChatGPT, Claude AI, Gemini) pour
                automatiser leurs tâches récurrentes : rédaction de devis, comptes rendus de
                chantier, mémoires techniques, emails et analyse de dossiers d&apos;appel
                d&apos;offres.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { val: formatProfessionalsTrainedCount(), label: 'PERSONNES FORMÉES' },
                  { val: '100%', label: 'FINANÇABLE OPCO' },
                  { val: SOCIAL_PROOF.AVERAGE_RATING, label: 'NOTE MOYENNE' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-[var(--accent)] md:text-3xl">
                      {stat.val}
                    </p>
                    <small className="mt-1 block text-[0.65rem] text-slate-400">
                      {STATS_FRESHNESS_LABEL}
                    </small>
                    <p className="mt-1 text-xs text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
              <CitationSentence text="La formation IA BTP animée par Laure Olivié aide artisans et équipes terrain à gagner du temps : automatisation des devis, de l'administratif et des dossiers d'appels d'offres avec ChatGPT BTP et l'intelligence artificielle adaptée au chantier." />
            </div>
            <div className="w-full">
              <p className="mb-3 text-center text-sm font-medium text-slate-600 md:text-left">
                Présentation vidéo — les 6 parcours formation IA BTP
              </p>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-2xl">
                <div className="relative aspect-video w-full">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/7IBMFhdohkI"
                    title="Présentation animée — 6 formations IA BTP"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomePrincipalSections />

      <section
        className="border-b border-slate-200 bg-white px-4 py-12"
        aria-labelledby="couverture-geo"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="couverture-geo"
            className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Une formation IA BTP accessible partout en France
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600" data-citation="true">
            Basée à Guyancourt (Yvelines), Laure Olivié intervient principalement en présentiel en{' '}
            <strong>Île-de-France (Paris, 78, 91, 92, 93, 94, 95, 77)</strong> auprès des entreprises
            du bâtiment et des travaux publics. Pour les entreprises hors Île-de-France ou pour les
            équipes réparties sur plusieurs sites, toutes les formations sont également disponibles{' '}
            <strong>en distanciel via visioconférence</strong>, sans perte d&apos;efficacité
            pédagogique. La pédagogie reste 100 % opérationnelle : on travaille directement sur vos
            documents BTP réels.
          </p>
        </div>
      </section>

      <ClientsLogosMarquee />

      {/* Référence clients — bande charte OFC (#377CF3, alignée sur le CTA Calendly) */}
      <section className="border-b border-slate-200 bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="max-w-xl shrink-0">
              <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">
                Référence & partenaires
              </p>
              <h3 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                FFB, CSFE… la formation IA BTP terrain plébiscitée par le réseau pro
              </h3>
              <p className="mt-4 text-white/90">
                Interventions en intelligence artificielle bâtiment et formation IA travaux publics
                auprès de fédérations et d&apos;entreprises : cas réels (devis, chantier, appels
                d&apos;offres), gain de temps mesurable — zéro gadget.
              </p>
              <Link
                href="/a-propos#clients-partenaires"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/15"
              >
                Voir les clients & partenaires
              </Link>
              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 sm:gap-4">
                {[
                  { val: `+${formatProfessionalsTrainedCount()}`, label: 'personnes formées' },
                  { val: SOCIAL_PROOF.AVERAGE_RATING, label: 'note moyenne' },
                  { val: '100%', label: 'finançable OPCO' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/25 bg-white/10 px-2 py-3 text-center backdrop-blur-sm sm:px-4 sm:py-4"
                  >
                    <p className="text-lg font-bold text-white sm:text-xl md:text-2xl">{s.val}</p>
                    <p className="mt-1 text-[0.6rem] leading-tight text-white/80 sm:text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full min-h-[min(22rem,55vw)] overflow-hidden rounded-2xl border border-white/25 bg-black/10 lg:min-h-[28rem] lg:max-w-[min(100%,32rem)] xl:min-h-[32rem] xl:max-w-[36rem]">
              <Image
                src={PHOTOS.accueilReferencePartenairesLaureOFC2026.src}
                alt={PHOTOS.accueilReferencePartenairesLaureOFC2026.alt}
                title={`+${formatProfessionalsTrainedCount()} professionnels formés · Note ${SOCIAL_PROOF.AVERAGE_RATING} · Finançable Constructys`}
                fill
                className="object-cover object-[center_15%]"
                sizes="(max-width: 1024px) 100vw, 576px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Étude de cas clients — FFB / CSFE (preuve B2B) */}
      <EtudeCasClientsSection />

      {/* Témoignages Google — sous « Ils m'ont fait confiance » (hiérarchie H2 → H3) */}
      <GoogleReviewsSection />

      {/* Les bénéfices — H2 unique + sous-sections H3 */}
      <section
        className="border-b border-slate-200"
        aria-labelledby="benefices-formation-ia-heading"
      >
        <div className="bg-white px-4 pb-12 pt-16 md:pb-16 md:pt-20">
          <div className="mx-auto max-w-6xl">
            <h2
              id="benefices-formation-ia-heading"
              className="text-center font-display text-3xl font-bold text-slate-900 md:text-4xl"
            >
              Les bénéfices d&apos;une formation IA BTP
            </h2>
            <div className="mt-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                <Zap size={16} strokeWidth={1.5} />
                <span>GAINS CONCRETS</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Pourquoi l&apos;IA change le quotidien des entreprises du BTP
              </h3>
              <p className="mt-3 max-w-2xl text-slate-600">
                Une formation IA BTP sérieuse automatise devis, emails et suivi administratif sans
                remplacer le métier. Les artisans et conducteurs de travaux gagnent en productivité
                et retrouvent du temps sur le chantier et les appels d&apos;offres.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: Clock,
                    title: 'Trop de temps sur les devis',
                    desc: "Un devis détaillé prend 2h à 4h à rédiger. Avec l'IA, vous passez à 15 minutes chrono tout en gardant la qualité professionnelle.",
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
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition-shadow hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-lg shadow-blue-500/20">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <h4 className="mt-4 font-semibold text-slate-900">{title}</h4>
                    <p className="mt-2 text-sm text-slate-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="relative mt-16 overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-b from-slate-100/50 via-white to-slate-50 px-4 py-12 md:px-8 md:py-16"
              aria-labelledby="probleme-solution-heading"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.12),transparent)]"
                aria-hidden
              />
              <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
                Avant · Après
              </p>
              <h3
                id="probleme-solution-heading"
                className="mx-auto mt-4 max-w-4xl text-center font-display text-2xl font-bold leading-[1.15] tracking-tight text-slate-900 md:text-3xl"
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
              <p className="mx-auto mt-4 max-w-2xl text-center text-sm font-medium text-slate-600 md:text-base">
                Trois freins fréquents sur chantier et au bureau — et ce que change une formation IA
                BTP encadrée (toujours sous votre validation métier).
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
              </div>
            </div>

            <div
              className="mt-16 rounded-2xl border border-slate-200 bg-[#eef2ff] px-4 py-12 md:px-8"
              itemScope
              itemType="https://schema.org/HowTo"
            >
              <h3
                className="text-center font-display text-2xl font-bold text-slate-900 md:text-3xl"
                itemProp="name"
              >
                5 cas d&apos;usage concrets de l&apos;IA dans le{' '}
                <span className="font-serif italic">BTP</span>
              </h3>
              <p
                className="mx-auto mt-3 max-w-2xl text-center text-slate-600"
                itemProp="description"
              >
                Méthodes éprouvées en formation IA BTP avec artisans, conducteurs de travaux et
                entreprises du bâtiment : devis, chantier, appels d&apos;offres et productivité au
                quotidien.
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              </div>
              <div className="mt-10 text-center">
                <Link
                  href={LINKS.casUsage}
                  className="inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline"
                  title="10 cas d’usage concrets de l’IA dans le BTP"
                >
                  Voir le détail des 10 cas d&apos;usage
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[var(--accent)] to-blue-800 px-4 py-20">
          <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: CircleDollarSign,
                title: 'Augmentez votre rentabilité',
                desc: "Réduisez vos coûts administratifs de 30 à 40 %. Répondez à plus d'appels d'offres avec les mêmes ressources.",
              },
              {
                icon: Rocket,
                title: 'Gagnez en réactivité commerciale',
                desc: "Répondez aux devis en 15 minutes au lieu de 2 jours. Augmentez votre taux de transformation de 25 %.",
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
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
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
                <h3 className="mt-5 font-semibold tracking-tight text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100/95">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Catalogue formations */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <span>FORMATIONS IA BTP</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Nos formations IA spécialisées BTP
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Formations IA finançables Qualiopi / OPCO — présentiel.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                ref: 'BTP-01',
                level: 'DÉBUTANT',
                title: "L'IA au service du bâtiment",
                href: LINKS.formationBatiment,
                visuel: PHOTOS.formationIABtpVisioBureau2026,
                duree: `${SESSION_DUREE_LIBELLE} · ${TARIF_FORFAIT_DEBUTANT_HT} € HT/part.`,
                effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
                objectifs: [
                  'Identifier les usages IA utiles dans le BTP',
                  'Accélérer la rédaction de devis et messages clients',
                  "Structurer l'administratif (CR, relances, modèles)",
                  "Repartir avec des trames et prompts prêts à l'emploi",
                ],
              },
              {
                ref: 'BTP-04',
                level: 'DÉBUTANT',
                title: "L'IA au service des Travaux Publics",
                href: LINKS.formationTP,
                visuel: PHOTOS.btpFormationChantierEquipe2026,
                duree: `${SESSION_DUREE_LIBELLE} · ${TARIF_FORFAIT_DEBUTANT_HT} € HT/part.`,
                effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
                objectifs: [
                  'Analyser DCE, CCTP et comptes rendus chantier',
                  "Rédiger rapports et réponses appels d'offres",
                  'Créer votre assistant IA métier TP',
                ],
              },
              {
                ref: 'BTP-05',
                level: 'DÉBUTANT',
                title: "Sensibilisation à l'IA & Assistants IA personnalisés",
                href: LINKS.formationSensibilisation,
                visuel: PHOTOS.formationSensibilisationAssistantsIaBtp2026,
                duree: `${SESSION_DUREE_LIBELLE} · ${TARIF_FORFAIT_DEBUTANT_HT} € HT/part.`,
                effectif: LIBELLE_EFFECTIF_GROUPE_COURT,
                objectifs: [
                  "Sensibilisation à l'IA et usages terrain (supports PDF)",
                  'Banque de prompts par métier (Excel)',
                  'Concevoir des assistants IA personnalisés',
                  'Ressources plateforme en prolongement — Qualiopi, OPCO Constructys',
                ],
              },
            ].map((cours) => (
              <div
                key={cours.ref}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
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
                  className="mt-6 block w-full rounded-xl bg-[var(--accent)] py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Voir le programme
                </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
<PresentationAnimee />

      <FFBIAAccrocheSection />

      <PourQuiSection />

      <ArticlesFormationLies />

      {/* Thématiques abordées — H3 sous « Nos formations IA spécialisées BTP » */}
      <section id="programme" className="border-b border-slate-200 bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <span>THÉMATIQUES ABORDÉES</span>
          </div>
          <h3 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Programme détaillé de la formation
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            <Link
              href={LINKS.formationBatiment}
              className="font-medium text-[var(--accent)] hover:underline"
              title="Fiche formation BTP-01 — L’IA au service du bâtiment"
            >
              programme détaillé
            </Link>
            {' — '}
            <Link href={LINKS.blog} className="font-medium text-[var(--accent)] hover:underline" title="Articles et guides IA BTP">
              tous les articles
            </Link>
            {' · '}
            <Link href={LINKS.claudeAiBtp} className="font-medium text-[var(--accent)] hover:underline" title="Guide Claude AI pour le BTP — interfaces, prompts, gains de temps">
              Claude AI BTP
            </Link>
            {' · '}
            <Link href={LINKS.iaDevis} className="font-medium text-[var(--accent)] hover:underline" title="IA pour automatiser les devis bâtiment">
              IA devis bâtiment
            </Link>
            {' · '}
            <Link href={LINKS.iaCDT} className="font-medium text-[var(--accent)] hover:underline" title="IA pour conducteurs de travaux">
              IA conducteur de travaux
            </Link>
            {' · '}
            <Link href={LINKS.prendreRdv} className="font-medium text-[var(--accent)] hover:underline" title="Prendre rendez-vous — diagnostic gratuit">
              prendre rendez-vous
            </Link>
          </p>
          <p className="mt-3 max-w-3xl text-slate-600">
            Voici les <strong className="font-semibold text-slate-800">quatre grands axes</strong> sur
            lesquels s&apos;appuient les formations IA BTP : devis et chiffrage, réponses aux appels
            d&apos;offres, comptes rendus et DOE, gestion des emails et relation client. Selon le
            programme choisi dans le catalogue, l&apos;accent est mis sur l&apos;un ou l&apos;autre de ces
            sujets — toujours en <strong className="font-semibold text-slate-800">sessions de 4 h</strong>,
            avec un forfait par participant selon le niveau (débutant ou avancé).
          </p>
          <div className="mt-8">
            <Link
              href={LINKS.formations}
              className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              title="Catalogue des formations IA BTP Qualiopi"
            >
              catalogue des formations IA BTP
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          </div>

          <div className="mt-16 max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
              LinkedIn Learning
            </p>
            <h4 className="mt-2 font-display text-xl font-bold text-slate-900 md:text-2xl">
              L&apos;IA pour recruter dans le BTP
            </h4>
            <p className="mt-3 text-slate-600">
              Pour les <strong>artisans et TPE</strong> du bâtiment : annonces, tri de CV, entretiens,
              fidélisation. Cours{' '}
              <strong>
                L&apos;IA pour les artisans et TPE&nbsp;: Recruter sa main-d&apos;œuvre efficacement
              </strong>{' '}
              — accédez à la vidéo et au programme sur{' '}
              <a
                href="https://fr.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement/bienvenue-dans-l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[var(--accent)] hover:underline"
              >
                LinkedIn Learning
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi choisir Laure Olivié */}
      <section
        className="border-b border-slate-200 bg-white px-4 py-16"
        aria-labelledby="pourquoi-laure-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
            <div className="shrink-0 w-full space-y-4 sm:w-80 lg:w-96">
              <ProfilePhoto
                alt="Laure Olivié, formatrice IA BTP certifiée Qualiopi, spécialiste ChatGPT pour le bâtiment"
                title="Sessions présentiel Île-de-France — Qualiopi, OPCO Constructys"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                <span>VOTRE FORMATRICE</span>
              </div>
              <h2
                id="pourquoi-laure-heading"
                className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl"
              >
                Pourquoi choisir Laure Olivié ?
              </h2>
              <blockquote className="mt-6 rounded-2xl bg-[var(--accent-soft)] p-6 text-[var(--accent)]">
                « Je forme les entreprises du BTP depuis 10 ans. Mon objectif : zéro
                théorie, 100 % pratique. Vous repartez avec des outils opérationnels
                dès le lendemain. »
              </blockquote>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
              </div>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-[var(--accent-soft)] p-6 shadow-sm">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Building2 className="h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} aria-hidden />
                  Partenaires
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Interventions et actions de formation avec la FFB (Artisans, Île-de-France) et
                  la {CSFE_NOM_LIBRE}.
                </p>
                <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {[
                    {
                      label: 'FFB Artisans',
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
                    className="font-medium text-[var(--accent)] hover:underline"
                    title={CSFE_NOM_COMPLET}
                  >
                    Étude de cas FFB &amp; {CSFE_NOM_COMPLET}
                  </Link>
                  {' · '}
                  <Link href="/a-propos#clients-partenaires" className="hover:underline">
                    Tous les partenaires
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 space-y-16 border-t border-slate-200 pt-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                <span>FINANCEMENT</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Formation finançable par Constructys
              </h3>
              <p className="mt-3 max-w-2xl text-slate-600">
                Cette formation peut être{' '}
                <span className="font-semibold text-[var(--accent)]">
                  prise en charge à 100% par Constructys
                </span>{' '}
                dans le cadre du Plan de Développement des Compétences 2026 pour les
                entreprises de moins de 50 salariés.
              </p>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {[
                  {
                    icon: Award,
                    title: '100% finançable',
                    desc: "Coût pédagogique pris en charge à hauteur de 24€ HT/heure/stagiaire. Sessions intra : 840€ HT/jour maximum.",
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
              </div>
              <div className="mt-10 text-center">
                <Link
                  href={LINKS.financement}
                  className="inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                  title="Financement OPCO Constructys — formation IA BTP"
                >
                  financement Constructys
                </Link>
              </div>
            </div>

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
                    className="mt-4 inline-flex text-xs font-medium text-[var(--accent)] hover:underline"
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
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white">
            <span>FAQ</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900">
            Questions fréquentes sur la formation IA BTP
          </h2>
          <p className="mt-3 text-slate-600">
            Vous avez des questions ? Voici les réponses aux interrogations les plus
            fréquentes.
          </p>
          <div className="mt-8">
            <FAQAccordion items={FAQ_ITEMS_HOME} />
          </div>
        </div>
      </section>

      {/* Une autre question ? Contact CTA */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-2xl">
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
              <RdvLink className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:bg-slate-50">
                <Calendar size={20} strokeWidth={1.5} />
                Prendre RDV
              </RdvLink>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final — Prêt à transformer */}
      <section className="relative overflow-hidden bg-[var(--accent)] px-4 py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60" />
        <div className="relative mx-auto max-w-4xl text-center text-white">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Prêt à transformer votre métier avec l&apos;IA ?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Rejoignez les professionnels qui gagnent déjà plusieurs heures par semaine
            grâce à nos formations IA personnalisées pour le BTP.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {[
              { val: `+${formatProfessionalsTrainedCount()}`, label: 'Professionnels formés' },
              { val: '98%', label: 'Satisfaction' },
              { val: '100%', label: 'Finançable OPCO' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold md:text-4xl">{s.val}</p>
                <small className="mt-1 block text-[0.65rem] text-blue-200/80">
                  {STATS_FRESHNESS_LABEL}
                </small>
                <p className="mt-1 text-sm text-blue-200">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl border-2 border-white bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50">
              <Calendar size={20} strokeWidth={1.5} />
              Réserver ma formation
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white/60 px-8 py-4 font-semibold text-white hover:bg-white/10" />
          </div>
        </div>
      </section>

      {/* Prise de RDV — H3 après le CTA final (#rdv conservé pour ancres) */}
      <section
        id="rdv"
        aria-labelledby="rdv-creneau-heading"
        className="border-b border-slate-200 bg-slate-50 px-4 py-16"
      >
        <div className="mx-auto max-w-6xl">
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
              <RdvLink className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-600">
                <Calendar size={20} strokeWidth={1.5} />
                Voir le calendrier
              </RdvLink>
              <p className="mt-4 text-sm text-slate-600">
                Email :{' '}
                <a
                  href={`mailto:${SCHEMA_CONTACT.email}`}
                  className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
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
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h4 className="font-display text-lg font-semibold text-slate-900">Me contacter</h4>
              <div className="mt-4">
                <ContactDirect />
              </div>
            </div>
          </div>
        </div>
      </section>

      <JsonLd id="schema-home-unified-graph" schema={buildHomeUnifiedGraphJsonLd()} />
      {faqSchema ? <JsonLd id="schema-home-faq" schema={faqSchema} /> : null}
    </div>
  );
}
