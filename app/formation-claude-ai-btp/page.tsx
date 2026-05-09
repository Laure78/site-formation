import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  Sparkles,
  CircleCheckBig,
  ListOrdered,
  TriangleAlert,
  FileText,
  Download,
  ArrowRight,
  Shield,
  Zap,
  BookOpen,
} from "lucide-react";
import { FAQSection } from "@/components/landing/FAQSection";
import { AllerPlusLoin } from "@/components/AllerPlusLoin";
import { CourseSchema } from "@/components/seo/CourseSchema";
import { buildSiteCalendlyCtaUrl } from "@/lib/calendly";

/* ---------------------------------------------------------------- METADATA */

const PAGE_URL = "https://www.laureolivie.fr/formation-claude-ai-btp";
const OG_IMAGE = "/images/claude-btp-hero-chantier-2026.png";

export const metadata: Metadata = {
  title: "Formation Claude AI BTP — L'IA d'Anthropic pour le bâtiment",
  description:
    "Formation Claude AI BTP : maîtrisez l'IA d'Anthropic pour devis, CCTP, mémoires techniques. 4h, Qualiopi, finançable Constructys. 1 592 pros BTP formés.",
  keywords: [
    "formation Claude AI BTP",
    "Claude AI bâtiment",
    "Claude AI PME BTP",
    "Claude Pro BTP",
    "formation Anthropic BTP",
    "IA Claude pour le BTP",
    "Claude vs ChatGPT BTP",
    "formation IA BTP Qualiopi",
  ],
  authors: [{ name: "Laure Olivié", url: "https://www.laureolivie.fr/a-propos" }],
  creator: "Laure Olivié",
  publisher: "OFC Création d'Entreprise",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    title: "Formation Claude AI BTP — L'IA d'Anthropic pour le bâtiment",
    description:
      "Maîtrisez Claude AI (Anthropic) pour vos devis, CCTP et mémoires techniques BTP. Session 4h, Qualiopi, finançable Constructys.",
    url: PAGE_URL,
    siteName: "Laure Olivié — Formation IA BTP",
    locale: "fr_FR",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Formation Claude AI BTP — Laure Olivié, formatrice IA pour le bâtiment",
      },
    ],
    publishedTime: "2026-04-23T08:00:00+02:00",
    modifiedTime: new Date().toISOString(),
    authors: ["https://www.laureolivie.fr/a-propos"],
    section: "Formation IA BTP",
    tags: ["Claude AI", "Anthropic", "BTP", "formation IA", "Qualiopi", "Constructys"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formation Claude AI BTP — L'IA d'Anthropic pour le bâtiment",
    description: "4h Qualiopi, finançable Constructys. Devis, CCTP, mémoires techniques.",
    images: [OG_IMAGE],
  },
  other: {
    "geo.region": "FR-IDF",
    "geo.placename": "Guyancourt",
    "geo.position": "48.7713;2.0739",
    ICBM: "48.7713, 2.0739",
  },
};

/* ------------------------------------------------------------------ SCHEMAS */

const CALENDLY_HERO = buildSiteCalendlyCtaUrl("formation-claude-ai-btp-hero");
const CALENDLY_FIN_SECTION = buildSiteCalendlyCtaUrl("formation-claude-ai-btp-fin-section");
const CALENDLY_ALLER_PLUS = buildSiteCalendlyCtaUrl("formation-claude-ai-btp-aller-plus-loin");

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.laureolivie.fr/" },
    { "@type": "ListItem", position: 2, name: "Formations", item: "https://www.laureolivie.fr/formations" },
    { "@type": "ListItem", position: 3, name: "Formation Claude AI BTP" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  serviceType: "Formation professionnelle Claude AI BTP",
  name: "Formation Claude AI BTP — 4 heures",
  description:
    "Formation inter ou intra sur Claude AI (Anthropic) calibrée pour les métiers du BTP : devis, CCTP, mémoires techniques, comptes rendus de chantier.",
  provider: { "@id": "https://www.laureolivie.fr/#organization" },
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "State", name: "Île-de-France" },
  ],
  termsOfService: "https://www.laureolivie.fr/cgv",
};

const faqItems = [
  {
    q: "Qu'est-ce que Claude AI et pourquoi se former spécifiquement dessus pour le BTP ?",
    a: 'Claude AI est l\'assistant d\'intelligence artificielle développé par Anthropic. Pour le BTP, Claude se distingue de ChatGPT sur les documents longs (CCTP de 80 pages, mémoires techniques, DCE complets) qu\'il analyse avec une précision supérieure grâce à sa fenêtre de contexte étendue. Notre formation cible ces cas d\'usage métier spécifiques — voir le <a href="/formations">catalogue complet des formations IA BTP</a>.',
  },
  {
    q: "Claude AI est-il meilleur que ChatGPT pour les professionnels du BTP ?",
    a: "Claude n'est pas meilleur que ChatGPT dans l'absolu : il est complémentaire. Claude excelle sur l'analyse de documents longs (CCTP, DCE, contrats), la rédaction structurée (mémoires techniques) et le raisonnement technique. ChatGPT reste souvent plus rapide sur les tâches courtes (emails, posts, devis simples). Notre formation vous apprend à choisir le bon outil pour chaque tâche BTP.",
  },
  {
    q: "Faut-il un abonnement Claude Pro pour suivre la formation ?",
    a: 'Le niveau débutant (100 € HT) fonctionne avec le plan gratuit de Claude AI. Le niveau avancé (175 € HT) nécessite Claude Pro (environ 20 $/mois) pour accéder à Claude Sonnet 4.5/Opus et à l\'upload de documents volumineux. Ce coût est modeste au regard du temps gagné — détails sur la <a href="/financement-constructys-formation-ia-btp">page financement</a>.',
  },
  {
    q: "Cette formation Claude AI est-elle finançable par Constructys ?",
    a: 'Oui, la formation Claude AI BTP est certifiée Qualiopi et finançable à 100 % par Constructys pour les entreprises BTP de moins de 50 salariés dans le cadre du Plan de Développement des Compétences 2026. Plafond pédagogique : 24 € HT par heure et par participant. Voir <a href="/financement-constructys-formation-ia-btp">le guide complet du financement Constructys</a>.',
  },
  {
    q: "Combien de temps dure la formation Claude AI BTP ?",
    a: "La formation Claude AI BTP est une session de 4 heures (demi-journée), en présentiel ou en intra-entreprise. Ce format court et intensif est conçu pour que chaque stagiaire reparte opérationnel sur au moins 3 cas d'usage concrets de son métier BTP.",
  },
  {
    q: "Quels métiers du BTP bénéficient le plus de Claude AI ?",
    a: 'Les métiers qui manipulent des documents longs ou techniques : chargés d\'affaires BTP (analyse CCTP, rédaction mémoire technique), conducteurs de travaux (comptes rendus, planning, sous-traitance), dirigeants PME (stratégie, veille concurrentielle), fonctions administratives (contrats, courriers complexes). Voir aussi <a href="/ia-conducteur-travaux">la formation IA conducteur de travaux</a>.',
  },
  {
    q: "Est-ce que Claude AI peut lire un CCTP de 100 pages ?",
    a: "Oui, c'est précisément l'un des cas d'usage où Claude excelle. Avec Claude Pro, vous pouvez uploader un CCTP BTP de 80 à 150 pages et demander à l'outil de l'analyser, d'en extraire les exigences clés, les délais, les critères de notation, les points de vigilance. Ce qui prendrait 3 heures de lecture devient 20 minutes avec Claude. La formation vous apprend les prompts précis pour ce cas d'usage.",
  },
  {
    q: "Mes données confidentielles sont-elles protégées avec Claude AI ?",
    a: "Anthropic applique une politique stricte de confidentialité : par défaut, les conversations avec Claude Pro ne sont pas utilisées pour entraîner les modèles. Pour les entreprises BTP avec des AO publics ou des données sensibles, Claude est souvent privilégié à ChatGPT en raison de cette politique plus protectrice. La formation couvre les bonnes pratiques de confidentialité métier.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a.replace(/<[^>]+>/g, ""),
    },
  })),
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#faq h2", "#faq [itemprop='acceptedAnswer']"],
  },
};

/* --------------------------------------------------------------- COMPOSANT */

export default function FormationClaudeAiBtpPage() {
  return (
    <>
      {/* Schemas JSON-LD */}
      <Script
        id="schema-breadcrumb-claude"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CourseSchema
        name="Formation Claude AI BTP"
        description="Formation de 4 heures sur Claude AI (Anthropic) appliquée au BTP : devis, analyse de CCTP, mémoires techniques et comptes rendus de chantier."
        url="https://laureolivie.fr/formation-claude-ai-btp"
        duration="PT4H"
        price={100}
        level="Intermediate"
      />
      <Script
        id="schema-service-claude"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="schema-faq-claude"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div>
        {/* Fil d'Ariane */}
        <div className="mx-auto max-w-6xl px-4 pt-8">
          <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-gray-500">
            <ol className="flex flex-wrap items-center gap-1">
              <li className="flex items-center gap-1">
                <Link href="/" className="hover:text-[#377CF3] hover:underline">
                  Accueil
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <span className="text-gray-300">/</span>
                <Link href="/formations" className="hover:text-[#377CF3] hover:underline">
                  Formations
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <span className="text-gray-300">/</span>
                <span className="text-gray-700">Formation Claude AI BTP</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* Hero */}
        <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 text-white md:py-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="text-center lg:text-left">
              <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Formation Claude AI · Anthropic · BTP
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
                Formation Claude AI BTP — Maîtrisez l&apos;IA d&apos;Anthropic pour le bâtiment
              </h1>
              <p className="mt-6 text-lg text-slate-300">
                <strong className="text-white">Claude AI</strong> est l&apos;IA qui lit vos CCTP de 100 pages
                sans broncher, rédige vos mémoires techniques avec finesse et protège vos données
                sensibles. Formation de 4 heures, certifiée Qualiopi, finançable Constructys.
                Déjà <strong className="text-white">1 592 professionnels du BTP</strong> formés
                (note 4,85/5).
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
                <a
                  href={CALENDLY_HERO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Réserver ma visio découverte gratuite
                </a>
                <Link
                  href="/financement-constructys-formation-ia-btp"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  Financement Constructys <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <figure className="mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/50 shadow-2xl ring-1 ring-white/5">
                <Image
                  src={OG_IMAGE}
                  alt="Formatrice présentant Claude AI sur un chantier BTP — interface Anthropic, analyse de CCTP en direct, casque de chantier au premier plan"
                  width={1024}
                  height={682}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs leading-relaxed text-slate-400 lg:text-left">
                Session Claude AI en présentiel — atelier sur poste avec cas d&apos;usage BTP réels.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* À retenir */}
        <section className="border-b border-slate-200 bg-amber-50 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900">
              <TriangleAlert className="h-6 w-6 shrink-0 text-amber-600" aria-hidden="true" />
              À retenir — Pourquoi Claude AI intéresse le BTP en 2026
            </h2>
            <p className="mt-4 text-slate-700">
              Claude AI (Anthropic) est devenu en 2026 l&apos;alternative sérieuse à ChatGPT pour les
              métiers du BTP. Ses atouts : <strong>analyse de documents longs</strong> (CCTP, DCE,
              contrats de 100+ pages), <strong>rédaction technique structurée</strong>, et
              <strong> confidentialité renforcée</strong> — trois critères clés pour un chargé
              d&apos;affaires ou un dirigeant de PME. Cette formation vous apprend à l&apos;utiliser au
              quotidien, seule ou en complément de ChatGPT.
            </p>
          </div>
        </section>

        {/* Claude AI, c'est quoi */}
        <section className="border-b border-slate-200 bg-white px-4 py-14">
          <div className="mx-auto max-w-3xl prose prose-slate max-w-none">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Claude AI, c&apos;est quoi exactement ?
            </h2>
            <p className="mt-4 text-slate-700">
              <strong>Claude AI</strong> est l&apos;assistant d&apos;intelligence artificielle développé par
              <strong> Anthropic</strong>, l&apos;entreprise américaine fondée en 2021 par d&apos;anciens
              chercheurs d&apos;OpenAI. Comme ChatGPT, Claude comprend le français, rédige, analyse, résume
              et raisonne. Contrairement à ChatGPT, Claude a été conçu dès le départ avec une
              exigence forte sur la <strong>sécurité</strong>, la <strong>confidentialité</strong> et
              la <strong>qualité du raisonnement</strong> — trois dimensions qui font la différence
              quand on travaille sur des documents techniques BTP.
            </p>
            <p className="mt-4 text-slate-700">
              Pour une entreprise du bâtiment, retenir trois choses : Claude lit <strong>des documents
              très longs</strong> (jusqu&apos;à 200 000 tokens, soit environ 500 pages), il
              <strong> rédige avec une structure naturelle</strong> proche d&apos;un chargé d&apos;affaires
              expérimenté, et Anthropic <strong>n&apos;utilise pas vos données</strong> pour entraîner
              ses modèles par défaut. Dans les formations OFC, nous constatons que Claude fait
              gagner <strong>jusqu&apos;à 3 heures par mémoire technique</strong> de 40 pages par
              rapport à un travail manuel.
            </p>
          </div>
        </section>

        {/* Comparatif Claude / ChatGPT */}
        <section className="border-b border-slate-200 bg-slate-50 px-4 py-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Claude AI ou ChatGPT pour le BTP ? Comparatif 2026
            </h2>
            <p className="mt-3 text-slate-600">
              Les deux outils sont complémentaires. Voici comment ils se positionnent sur les cas
              d&apos;usage BTP les plus fréquents :
            </p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[640px] text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100">
                    <th className="px-4 py-3 font-semibold text-slate-900">Cas d&apos;usage BTP</th>
                    <th className="px-4 py-3 font-semibold text-slate-900">Claude AI</th>
                    <th className="px-4 py-3 font-semibold text-slate-900">ChatGPT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3">Analyse CCTP de 80+ pages</td>
                    <td className="px-4 py-3 font-medium text-emerald-600">Excellent</td>
                    <td className="px-4 py-3 text-slate-500">Bon</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3">Rédaction de mémoire technique</td>
                    <td className="px-4 py-3 font-medium text-emerald-600">Excellent</td>
                    <td className="px-4 py-3 text-slate-500">Bon</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3">Rédaction de devis standard</td>
                    <td className="px-4 py-3 text-slate-500">Bon</td>
                    <td className="px-4 py-3 font-medium text-emerald-600">Excellent</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3">Emails clients rapides</td>
                    <td className="px-4 py-3 text-slate-500">Bon</td>
                    <td className="px-4 py-3 font-medium text-emerald-600">Excellent</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3">Posts LinkedIn / réseaux</td>
                    <td className="px-4 py-3 text-slate-500">Bon</td>
                    <td className="px-4 py-3 font-medium text-emerald-600">Excellent</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3">Confidentialité des données</td>
                    <td className="px-4 py-3 font-medium text-emerald-600">Renforcée</td>
                    <td className="px-4 py-3 text-slate-500">Standard</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Génération d&apos;images</td>
                    <td className="px-4 py-3 text-slate-400">Non</td>
                    <td className="px-4 py-3 font-medium text-emerald-600">Oui (DALL·E)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-slate-700">
              <strong>Notre recommandation en formation</strong> : un professionnel BTP a intérêt à
              maîtriser <strong>les deux</strong>. Claude pour les documents longs et techniques
              (CCTP, DCE, mémoires, contrats), ChatGPT pour les tâches courtes et créatives (emails,
              devis simples, posts, images). La formation Claude AI BTP complète parfaitement la
              formation <Link href="/formation-ia-artisans-btp" className="text-[var(--accent)] underline">ChatGPT pour entreprises BTP</Link>.
            </p>
          </div>
        </section>

        {/* Programme */}
        <section className="border-b border-slate-200 bg-white px-4 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-slate-900">
              <BookOpen className="h-7 w-7 text-[var(--accent)]" aria-hidden="true" />
              Programme de la formation Claude AI BTP — 4 heures
            </h2>
            <p className="mt-4 text-slate-700">
              La formation alterne démonstrations, ateliers sur vos cas réels et exercices guidés.
              70 % du temps est consacré à la pratique sur vos propres CCTP, devis ou mémoires
              techniques.
            </p>

            <div className="mt-8 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Module 1 — Prendre Claude AI en main (45 min)
                </h3>
                <ul className="mt-3 space-y-2 text-slate-700">
                  <li className="flex gap-2">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    Découvrir l&apos;interface, créer son compte (gratuit ou Pro)
                  </li>
                  <li className="flex gap-2">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    Comprendre la différence entre Claude Sonnet, Haiku et Opus
                  </li>
                  <li className="flex gap-2">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    Bonnes pratiques de confidentialité pour les données BTP
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Module 2 — Analyser un CCTP BTP avec Claude (1 h)
                </h3>
                <ul className="mt-3 space-y-2 text-slate-700">
                  <li className="flex gap-2">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    Upload d&apos;un CCTP réel (apporté par le stagiaire)
                  </li>
                  <li className="flex gap-2">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    Prompts d&apos;extraction : exigences, délais, critères de notation, pièges
                  </li>
                  <li className="flex gap-2">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    Fiche de synthèse AO prête en 20 minutes au lieu de 3 heures
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Module 3 — Rédiger un mémoire technique avec Claude (1 h 30)
                </h3>
                <ul className="mt-3 space-y-2 text-slate-700">
                  <li className="flex gap-2">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    Construire sa base de contenu réutilisable (références, moyens, QSE)
                  </li>
                  <li className="flex gap-2">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    Prompts section par section (méthodologie, planning, sous-traitance)
                  </li>
                  <li className="flex gap-2">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    Relecture, harmonisation et mise en forme finale
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Module 4 — Intégrer Claude au quotidien BTP (45 min)
                </h3>
                <ul className="mt-3 space-y-2 text-slate-700">
                  <li className="flex gap-2">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    Comptes rendus de chantier à partir de notes vocales
                  </li>
                  <li className="flex gap-2">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    Analyse de contrats de sous-traitance et PPSPS
                  </li>
                  <li className="flex gap-2">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    Quand basculer vers ChatGPT, quand rester sur Claude
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cas d'usage */}
        <section className="border-b border-slate-200 bg-[var(--accent-soft)] px-4 py-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-slate-900">
              <Zap className="h-7 w-7 text-[var(--accent)]" aria-hidden="true" />
              6 cas d&apos;usage Claude AI concrets pour le BTP
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  titre: "Analyse CCTP en 20 minutes",
                  texte:
                    "Uploader un CCTP de 80 pages, extraire exigences, délais, critères. Gain : 2 h 30 par AO.",
                },
                {
                  titre: "Mémoire technique structuré",
                  texte:
                    "Rédiger les sections clés (méthodologie, QSE, références) à partir de votre base existante. Gain : 1 à 2 jours par AO.",
                },
                {
                  titre: "Compte rendu de chantier propre",
                  texte:
                    "À partir d'une note vocale de 5 min, produire un CR complet exploitable. Gain : 35 min par CR.",
                },
                {
                  titre: "Analyse de contrat de sous-traitance",
                  texte:
                    "Extraire les clauses à risque (pénalités, indexation, acceptation) d'un contrat long. Gain : 1 h par contrat.",
                },
                {
                  titre: "PPSPS et documents QSE",
                  texte:
                    "Générer la structure d'un PPSPS adapté à votre chantier, prête à personnaliser. Gain : 3 h par PPSPS.",
                },
                {
                  titre: "Veille réglementaire BTP",
                  texte:
                    "Résumer un texte réglementaire long (DTU, RE2020, arrêté) en 10 points actionnables. Gain : 1 h par veille.",
                },
              ].map((item) => (
                <article
                  key={item.titre}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h3 className="font-display text-base font-bold text-slate-900">{item.titre}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.texte}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Tarifs */}
        <section className="border-b border-slate-200 bg-sky-50/90 px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Tarifs — Session Claude AI BTP de 4 h
            </h2>
            <p className="mt-3 text-slate-700">
              Forfait par participant selon le niveau pédagogique. Formation finançable à 100 % par
              Constructys pour les entreprises BTP de moins de 50 salariés.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
              <li>
                <strong>Niveau débutant :</strong> 100 € HT par participant — Compte gratuit Claude
                AI suffisant.
              </li>
              <li>
                <strong>Niveau avancé :</strong> 175 € HT par participant — Abonnement Claude Pro
                requis (environ 20 $/mois) pour accéder à Claude Sonnet 4.5 et à l&apos;upload de
                documents volumineux.
              </li>
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              Le montant facturé par OFC peut ensuite être couvert en tout ou partie par l&apos;OPCO
              Constructys —{" "}
              <Link
                href="/financement-constructys-formation-ia-btp"
                className="font-medium text-[var(--accent)] hover:underline"
              >
                voir les plafonds 2026
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Étapes d'inscription */}
        <section className="border-b border-slate-200 bg-white px-4 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-slate-900">
              <ListOrdered className="h-7 w-7 text-[var(--accent)]" aria-hidden="true" />
              Comment s&apos;inscrire à la formation Claude AI BTP
            </h2>
            <ol className="mt-8 space-y-6">
              {[
                {
                  t: "Réserver une visio découverte gratuite",
                  d: "30 minutes avec Laure pour identifier vos cas d'usage prioritaires et choisir le bon format.",
                },
                {
                  t: "Recevoir le programme et le devis",
                  d: "Programme pédagogique détaillé + devis OFC conformes aux attentes Constructys.",
                },
                {
                  t: "Monter le dossier Constructys",
                  d: "Convention de formation, liste des participants, dépôt sur eGestion au moins 15 jours avant le début.",
                },
                {
                  t: "Valider la date de session",
                  d: "Session en inter à Paris / Île-de-France ou en intra dans vos locaux — 4 heures, en matinée ou en après-midi.",
                },
                {
                  t: "Suivre la formation",
                  d: "Session présentielle avec atelier sur vos cas réels. Attestation Qualiopi remise en fin de session.",
                },
              ].map((step, idx) => (
                <li key={step.t} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{step.t}</p>
                    <p className="mt-1 text-slate-600">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Confidentialité / garanties */}
        <section className="border-b border-slate-200 bg-slate-50 px-4 py-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-slate-900">
              <Shield className="h-7 w-7 text-[var(--accent)]" aria-hidden="true" />
              Confidentialité, Qualiopi, Constructys — ce qui sécurise votre choix
            </h2>
            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="flex gap-2">
                <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>
                  <strong>Qualiopi</strong> — OFC Création d&apos;Entreprise est certifié depuis 2023
                  (vérifiable sur{" "}
                  <a
                    href="https://annuaire-entreprises.data.gouv.fr/labels-certificats/905244281"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--accent)] underline"
                  >
                    annuaire officiel
                  </a>
                  ).
                </span>
              </li>
              <li className="flex gap-2">
                <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>
                  <strong>Finançable Constructys</strong> — plafond 24 € HT / h / participant, jusqu&apos;à
                  840 € HT / jour / groupe en intra (2026).
                </span>
              </li>
              <li className="flex gap-2">
                <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>
                  <strong>Confidentialité Anthropic</strong> — par défaut, Anthropic n&apos;utilise pas vos
                  conversations pour entraîner Claude. Bonnes pratiques couvertes pendant la formation.
                </span>
              </li>
              <li className="flex gap-2">
                <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>
                  <strong>1 592 professionnels du BTP formés</strong> (FFB Grand Paris, FFB
                  Île-de-France, CSFE, CAPEB, CNAM Entreprise, Lefebvre Dalloz) — note de satisfaction
                  moyenne 4,85/5.
                </span>
              </li>
            </ul>
            <p className="mt-6 text-sm text-slate-600">
              <a
                href="/documents/conditions-constructys-2026.pdf"
                download
                className="inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Télécharger les conditions de prise en charge Constructys 2026 (PDF)
              </a>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection
          items={faqItems}
          title="Questions fréquentes — Formation Claude AI BTP"
          subtitle="Réponses courtes sur Claude AI, le comparatif avec ChatGPT et le financement Constructys."
        />

        {/* CTA final */}
        <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-16 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold">
              Prêt à maîtriser Claude AI pour votre activité BTP ?
            </h2>
            <p className="mt-4 text-slate-300">
              30 minutes en visio avec Laure pour choisir entre inter et intra, valider le niveau
              (débutant ou avancé) et monter votre dossier Constructys. Sans engagement.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <FileText className="mr-2 h-5 w-5" aria-hidden="true" />
                Demander un devis
              </Link>
              <a
                href={CALENDLY_FIN_SECTION}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/70 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Réserver un rendez-vous
              </a>
            </div>
          </div>
        </section>

        {/* Aller plus loin */}
        <div className="border-t border-slate-200 bg-slate-50 px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <Link href="/" className="font-medium text-[var(--accent)] hover:underline">
              ← Retour à l&apos;accueil
            </Link>
            <div className="mt-8">
              <AllerPlusLoin
                links={[
                  { href: "/formations", label: "Catalogue des formations IA BTP" },
                  { href: "/formation-ia-artisans-btp", label: "ChatGPT pour entreprises BTP" },
                  { href: "/ia-devis-batiment", label: "IA devis bâtiment" },
                  { href: "/ia-conducteur-travaux", label: "IA conducteur de travaux" },
                  {
                    href: "/financement-constructys-formation-ia-btp",
                    label: "Financement Constructys 2026",
                  },
                  { href: "/blog", label: "Tous les articles du blog" },
                  { href: CALENDLY_ALLER_PLUS, label: "Prendre rendez-vous" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
