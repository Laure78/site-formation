import Image from 'next/image';
import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import { Check, Building2, GraduationCap, TrendingUp, Landmark, ShieldCheck, Timer } from 'lucide-react';
import {
  createPageMetadata,
  getArticleSchema,
  getBreadcrumbSchema,
  SITE_CONFIG,
} from '@/lib/seo';
import { CSFE_NOM_LIBRE, CSFE_TITRE_PAGE } from '@/lib/csfe';
import { CaseStudyYoutubeThumbnails } from '@/components/landing/CaseStudyYoutubeThumbnails';

const ETUDE_CAS_THUMBNAILS = [
  {
    src: '/images/ffb-logo-moss-mur.png',
    alt:
      'Logo FFB sur mur de mousse en accueil : Fédération Française du Bâtiment — réseau artisans et entreprises du bâtiment, formations IA BTP (ChatGPT, Claude AI) en Île-de-France.',
    title: 'FFB — formation IA BTP & réseau national du bâtiment',
    subtitle: 'Interventions Grand Paris, IDF Est & Ouest · Laure Olivié, OFC Qualiopi',
    href: '#ffb',
  },
  {
    src: '/images/csfe-signaletique.png',
    alt:
      'Panneau d’orientation CSFE : Chambre syndicale française de l’étanchéité — professionnels de l’étanchéité BTP, filière toiture-terrasse et enveloppe (formations IA).',
    title: 'CSFE — étanchéité & intelligence artificielle pour le bâtiment',
    subtitle: 'Mémoires techniques, métiers enveloppe · même socle pédagogique que le réseau FFB',
    href: '#csfe',
  },
] as const;

export const metadata = createPageMetadata({
  title: 'Étude de cas FFB & CSFE — Étanchéité | Formation IA BTP | Résultats concrets',
  description: `Retour d'expérience : interventions auprès de la FFB et de la ${CSFE_NOM_LIBRE}. Modules, objectifs pédagogiques et bénéfices pour les entreprises.`,
  path: '/etudes-de-cas/ffb-csfe',
  keywords: [
    'formation IA FFB',
    'FFB formation IA',
    'CSFE étanchéité',
    'Chambre syndicale française étanchéité',
    'étude de cas formation BTP',
    'Laure Olivié FFB',
  ],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: `Étude de cas ${CSFE_TITRE_PAGE}`, path: '/etudes-de-cas/ffb-csfe' },
]);

const articleSchema = getArticleSchema({
  headline: `Étude de cas — FFB & CSFE (étanchéité) | ${SITE_CONFIG.name}`,
  description: `Retour d'expérience : interventions FFB et ${CSFE_NOM_LIBRE}. Modules, objectifs et résultats pour entreprises du BTP.`,
  path: '/etudes-de-cas/ffb-csfe',
  datePublished: '2024-06-01T09:00:00+02:00',
  dateModified: '2026-04-06T12:00:00+02:00',
  authorName: SITE_CONFIG.name,
  image: '/images/rencontres-artisans-ia-ffb-atelier.jpg',
});

/** Modules communs aux parcours réseau FFB / CSFE — étanchéité (métier BTP) */
const MODULES = [
  {
    n: 1,
    title: 'Sensibilisation & prompts métier',
    detail:
      'Cadrage RGPD, choix des outils, bibliothèque de prompts adaptés aux métiers du bâtiment.',
  },
  {
    n: 2,
    title: 'Mémoires techniques & dossiers de réponse',
    detail:
      'Structuration des réponses, relecture assistée, cohérence avec les critères du marché.',
  },
  {
    n: 3,
    title: 'Analyse de CCTP / DCE',
    detail:
      'Synthèse des exigences, extraction des points clés, préparation à la décision Go / No Go.',
  },
  {
    n: 4,
    title: 'Comptes rendus de chantier & suivi',
    detail:
      'À partir de notes ou dictée : mise en forme professionnelle et archivage utile.',
  },
  {
    n: 5,
    title: 'Devis, chiffrage & boîte mail',
    detail:
      'Mise en forme des offres, relecture, tri et réponses types pour soulager l’administratif.',
  },
] as const;

const OBJECTIFS_PEDAGOGIQUES = [
  'Identifier les usages de l’IA utiles et réalistes dans le quotidien d’une entreprise du bâtiment.',
  'Savoir formuler des prompts fiables sur des cas concrets (mémoires, CCTP, CR, devis, mails).',
  'Respecter la confidentialité des données et les règles des marchés (relecture humaine, validation métier).',
  'Repartir avec des trames, modèles et une feuille de route pour déployer l’outil en interne.',
] as const;

const BENEFICES_CLIENTS = [
  'Gain de temps sur les tâches répétitives (souvent plusieurs heures par semaine une fois les réflexes pris).',
  'Meilleure réactivité sur les devis, relances et dossiers techniques.',
  'Image professionnelle renforcée (documents structurés, ton homogène).',
  'Formation éligible au financement OPCO (dont Constructys pour le BTP) pour les entreprises éligibles.',
  'Accompagnement par une formatrice terrain BTP, certification Qualiopi (OFC Création d’Entreprise).',
] as const;

export default function EtudeDeCasFfbCsfePage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero — Références */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#f8fbff] via-white to-white px-4 py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden>
          <svg
            className="absolute left-1/2 top-0 h-[min(480px,70vh)] w-full max-w-3xl -translate-x-1/2"
            viewBox="0 0 400 260"
            fill="none"
          >
            <path
              d="M40 110 L130 50 L210 95 L300 45 L360 100 M130 50 L130 170 M210 95 L210 200 M300 45 L300 150"
              stroke="#2563eb"
              strokeWidth="0.75"
            />
            {[
              [130, 50],
              [210, 95],
              [300, 45],
              [40, 110],
              [360, 100],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2.5" fill="#2563eb" fillOpacity="0.35" />
            ))}
          </svg>
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-blue-100 bg-white/90 px-4 py-1.5 text-sm font-medium text-[var(--accent)] shadow-sm">
            Références
          </p>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Étude de cas clients —{' '}
            <span className="font-serif italic text-slate-800">FFB &amp; CSFE</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            Comment des structures du bâtiment et de l&apos;étanchéité ont structuré une montée
            en compétences sur l&apos;IA : périmètre, modules, résultats — avec la{' '}
            <strong>Fédération Française du Bâtiment</strong> et la{' '}
            <strong>Chambre Syndicale Française de l&apos;étanchéité</strong> (CSFE).
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1">OFC Création d&apos;Entreprise</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">Qualiopi</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">Interventions réseau FFB</span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-3xl text-center text-slate-600">
          <p className="text-lg leading-relaxed text-slate-700">
            Laure Olivié intervient depuis plusieurs années auprès du réseau FFB (dont Grand
            Paris, Île-de-France Est et Ouest) et des structures du secteur (dont la{' '}
            {CSFE_NOM_LIBRE}) pour des sessions courtes, opérationnelles, sans jargon inutile — avec
            des cas d&apos;usage directement transposables sur vos chantiers et dossiers.
          </p>
        </div>
      </section>

      {/* Résumé exécutif — chiffres & périmètre */}
      <section
        id="resume"
        className="scroll-mt-24 border-b border-slate-200 bg-[#eef2ff] px-4 py-12"
        aria-label="Résumé exécutif"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-xl font-bold text-slate-900 md:text-2xl">
            Résumé exécutif
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">
            Périmètre institutionnel, exigence pédagogique et indicateurs suivis (OFC /{' '}
            {SITE_CONFIG.name}).
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Landmark,
                title: 'Réseau FFB',
                desc: 'Grand Paris, Île-de-France Est & Ouest — interventions terrain.',
              },
              {
                icon: Building2,
                title: 'CSFE',
                desc: `Même socle métier étanchéité avec la ${CSFE_NOM_LIBRE}.`,
              },
              {
                icon: ShieldCheck,
                title: 'Qualiopi & OPCO',
                desc: 'Dispositif éligible financement lorsque l’entreprise est concernée.',
              },
              {
                icon: Timer,
                title: 'Impact temps',
                desc: 'Ordre de grandeur : 3 à 5 h / semaine récupérables sur l’administratif.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/80 bg-white p-6 shadow-sm"
              >
                <Icon className="h-8 w-8 text-[var(--accent)]" strokeWidth={1.5} aria-hidden />
                <p className="mt-3 font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Études de cas — FFB */}
      <section
        id="etudes-de-cas"
        className="scroll-mt-24 border-b border-slate-200 bg-slate-50 px-4 py-16"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Études de cas
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
            Projets ambitieux, approche pédagogique terrain, résultats suivis sur la
            satisfaction des participants.
          </p>

          <div className="mt-10">
            <CaseStudyYoutubeThumbnails items={ETUDE_CAS_THUMBNAILS} />
          </div>

          <article
            id="ffb"
            className="mt-12 scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <header className="bg-slate-900 px-6 py-6 text-white md:px-10">
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-200">
                BTP
              </span>
              <h3 className="mt-3 font-display text-xl font-bold md:text-2xl">
                FFB — Fédération Française du Bâtiment
              </h3>
            </header>
            <figure className="border-b border-slate-200 bg-slate-100">
              <Image
                src="/images/rencontres-artisans-ia-ffb-atelier.jpg"
                alt="Atelier « Les Rencontres des Artisans » — L'IA au service des artisans du bâtiment : participants en salle de formation avec ordinateurs portables, sous le bandeau FFB."
                width={1024}
                height={764}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1280px) 100vw, 1024px"
                priority
              />
              <figcaption className="px-4 py-3 text-center text-xs text-slate-500 md:px-10">
                « Les Rencontres des Artisans » — L&apos;IA au service des artisans du bâtiment
                (intervention réseau FFB).
              </figcaption>
            </figure>
            <div className="grid gap-10 px-6 py-10 md:grid-cols-2 md:px-10">
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                    Le défi
                  </p>
                  <p className="mt-2 text-slate-700">
                    Outiller les professionnels du bâtiment pour utiliser l&apos;IA au
                    service des tâches chronophages du quotidien — mémoires, dossiers
                    marchés, suivi administratif — sans remplacer le métier ni la validation
                    humaine.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                    Notre solution
                  </p>
                  <p className="mt-2 text-slate-700">
                    Programme de formation IA adapté aux métiers du BTP, avec ateliers
                    pratiques et cas réels (Rencontres et actions territoriales FFB).
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                    Cas d&apos;usage travaillés
                  </p>
                  <ul className="mt-3 space-y-2 text-slate-700">
                    {[
                      'Rédaction et structuration de mémoires techniques',
                      'Analyse de CCTP / pièces marchés',
                      'Comptes rendus de chantier',
                      'Création et relecture de devis',
                      'Tri et réponses mail avec l’IA',
                    ].map((line) => (
                      <li key={line} className="flex gap-2">
                        <Check
                          className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
                          strokeWidth={2}
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                  Indicateurs (global Laure Olivié / OFC)
                </p>
                <ul className="mt-4 space-y-6">
                  <li>
                    <p className="text-3xl font-bold text-[var(--accent)]">
                      +{SITE_CONFIG.statsPersonnesFormees}
                    </p>
                    <p className="text-sm text-slate-600">professionnels accompagnés</p>
                  </li>
                  <li>
                    <p className="text-3xl font-bold text-[var(--accent)]">4,85/5</p>
                    <p className="text-sm text-slate-600">note moyenne de satisfaction</p>
                  </li>
                  <li>
                    <p className="text-3xl font-bold text-[var(--accent)]">3 à 5 h</p>
                    <p className="text-sm text-slate-600">
                      par semaine récupérables sur l&apos;administratif (ordre de grandeur
                      constaté en entreprise après mise en pratique)
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </article>

          {/* CSFE — Chambre syndicale française de l'étanchéité */}
          <article
            id="csfe"
            className="mt-10 scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <header className="bg-slate-900 px-6 py-6 text-white md:px-10">
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-200">
                Formation entreprises
              </span>
              <h3 className="mt-3 font-display text-xl font-bold leading-tight md:text-2xl">
                <span className="block text-base font-semibold text-blue-200/95 md:text-lg">
                  Chambre Syndicale Française de l&apos;étanchéité
                </span>
                <span className="mt-1 block text-2xl md:text-3xl">CSFE</span>
              </h3>
            </header>
            <div className="grid gap-10 px-6 py-10 md:grid-cols-2 md:px-10">
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                    Le défi
                  </p>
                  <p className="mt-2 text-slate-700">
                    Permettre aux TPE et PME accompagnées par le réseau de monter en
                    compétence sur l&apos;IA générative, avec une pédagogie accessible (pas
                    de prérequis technique) et des livrables utilisables le lendemain.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                    Notre solution
                  </p>
                  <p className="mt-2 text-slate-700">
                    Sessions sur mesure : même socle de cas d&apos;usage que pour la FFB,
                    ajusté aux publics artisans, dirigeants et équipes support selon le
                    dispositif local de la CSFE.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                    Cas d&apos;usage travaillés
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Identiques au socle pédagogique FFB (voir liste ci-dessus) pour garantir
                    la cohérence du réseau et la réutilisation des supports.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center rounded-xl border border-slate-100 bg-slate-50 p-6">
                <Building2 className="h-10 w-10 text-[var(--accent)]" strokeWidth={1.5} />
                <p className="mt-4 font-semibold text-slate-900">Pour les entreprises</p>
                <p className="mt-2 text-sm text-slate-600">
                  Même exigence de résultat : des participants autonomes sur les prompts, une
                  politique de données claire, et un lien direct avec le financement OPCO
                  lorsque l&apos;entreprise est éligible.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Modules détaillés */}
      <section id="modules" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-[var(--accent)]" strokeWidth={1.5} />
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Modules de formation (socle commun FFB / CSFE — étanchéité)
            </h2>
          </div>
          <p className="mt-3 text-slate-600">
            Parcours modulable selon la durée retenue (journée, demi-journées ou cycle).
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m) => (
              <div
                key={m.n}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
                  {m.n}
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">{m.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectifs */}
      <section id="objectifs" className="scroll-mt-24 border-b border-slate-200 bg-[#eef2ff] px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Objectifs pédagogiques
          </h2>
          <ul className="mt-8 space-y-4">
            {OBJECTIFS_PEDAGOGIQUES.map((obj) => (
              <li
                key={obj}
                className="flex gap-3 rounded-xl border border-white/80 bg-white p-4 text-slate-700 shadow-sm"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2} />
                {obj}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bénéfices */}
      <section id="benefices" className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-[var(--accent)]" strokeWidth={1.5} />
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Bénéfices pour les clients et participants
            </h2>
          </div>
          <ul className="mt-8 space-y-3 text-slate-700">
            {BENEFICES_CLIENTS.map((b) => (
              <li key={b} className="flex gap-3 border-b border-slate-100 pb-3 last:border-0">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Un projet équivalent pour votre structure ?
          </h2>
          <p className="mt-4 text-slate-300">
            Fédération, OPCO, groupement ou entreprise : discutons de vos objectifs et d&apos;un
            format adapté.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RdvLink className="inline-flex rounded-xl bg-white px-8 py-3 font-semibold text-slate-900 hover:bg-slate-100">
              Demander un échange
            </RdvLink>
            <Link
              href="/a-propos#clients-partenaires"
              className="inline-flex rounded-xl border border-white/40 px-8 py-3 font-semibold text-white hover:bg-white/10"
            >
              Voir les références
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
