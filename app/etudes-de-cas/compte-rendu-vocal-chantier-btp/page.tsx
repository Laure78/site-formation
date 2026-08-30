import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import { Check, Mic, FileText, Clock, Building2 } from 'lucide-react';
import { createPageMetadata, getArticleSchema, SITE_CONFIG } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { LINKS } from '@/lib/internal-links';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';

const PATH = LINKS.etudesCasCrVocalChantier;

const PAGE_META_DESCRIPTION =
  'Étude de cas : compte rendu de chantier vocal avec l’IA — PME gros œuvre IDF. Méthode, gains de temps et validation humaine. Laure Olivié, Qualiopi.';

export const metadata = createPageMetadata({
  title: 'Étude de cas CR vocal chantier — IA BTP',
  description: PAGE_META_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  keywords: [
    'compte rendu chantier IA',
    'CR vocal BTP',
    'dictée compte rendu chantier',
    'formation IA conducteur de travaux',
    'étude de cas formation BTP',
  ],
});

const articleSchema = getArticleSchema({
  headline: `Étude de cas — Compte rendu vocal de chantier avec l'IA | ${SITE_CONFIG.name}`,
  description:
    'Retour d\'expérience : structurer un CR de chantier à partir d\'une dictée vocale et de l\'IA — PME gros œuvre en Île-de-France.',
  path: PATH,
  datePublished: '2026-03-01T09:00:00+01:00',
  dateModified: '2026-08-30T10:00:00+02:00',
  authorName: SITE_CONFIG.name,
  image: '/images/formation-ia-btp-salle-interactive.jpg',
});

const CONTEXTE = [
  'PME gros œuvre, 18 salariés, chantiers logements collectifs en Île-de-France.',
  'Conducteur de travaux et adjoint : 2 à 4 réunions de chantier par semaine.',
  'CR souvent rédigés le soir ou le week-end — retard de diffusion aux équipes et à la MOE.',
] as const;

const METHODE = [
  {
    n: 1,
    title: 'Dictée terrain (5–10 min)',
    detail:
      'Notes vocales sur smartphone : avancement lots, blocages, réserves, prochaines étapes — sans rédaction au clavier sur le chantier.',
  },
  {
    n: 2,
    title: 'Transcription + structuration IA',
    detail:
      'Coller la transcription dans Claude ou ChatGPT avec une trame CR (participants, décisions, actions, délais, responsables).',
  },
  {
    n: 3,
    title: 'Relecture et validation humaine',
    detail:
      'Le conducteur corrige les faits, les dates et les engagements — l’IA ne remplace pas la responsabilité du CR.',
  },
  {
    n: 4,
    title: 'Diffusion le jour même',
    detail:
      'Export PDF ou email aux équipes et au MOE — archivage dans le dossier chantier.',
  },
] as const;

const RESULTATS = [
  'CR diffusé le jour de la réunion dans la majorité des cas (vs 24–48 h auparavant).',
  'Temps de rédaction réduit — ordre de grandeur : 45–60 min → 15–20 min après relecture.',
  'Documents plus homogènes (même structure, moins d’oublis de points abordés).',
  'Meilleure traçabilité pour les réunions de coordination et les litiges éventuels.',
] as const;

export default function EtudeDeCasCrVocalChantierPage() {
  return (
    <div>
      <JsonLd id="schema-article-cr-vocal" schema={articleSchema} />

      <section className="border-b border-slate-200 bg-gradient-to-b from-[#f8fbff] via-white to-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
            Étude de cas · Conduite de travaux
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Compte rendu vocal de chantier avec l&apos;IA
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Comment une PME gros œuvre en Île-de-France structure ses CR à partir d&apos;une dictée
            et de l&apos;IA — sans sacrifier la validation métier.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <RdvLink className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-600">
              Prendre rendez-vous
            </RdvLink>
            <Link
              href={LINKS.formationConduiteTravauxSuiviChantier}
              className="rounded-xl border-2 border-slate-200 px-6 py-3 font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              Formation conduite de travaux
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16">
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900">Contexte client</h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            {CONTEXTE.map((line) => (
              <li key={line} className="flex gap-2">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Méthode en 4 étapes</h2>
          <ol className="mt-8 space-y-6">
            {METHODE.map((step) => (
              <li
                key={step.n}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
                  Étape {step.n}
                </p>
                <h3 className="mt-2 font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats observés</h2>
          <ul className="mt-6 space-y-3">
            {RESULTATS.map((line) => (
              <li key={line} className="flex gap-2 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={2} />
                {line}
              </li>
            ))}
          </ul>
          <DisclaimerGains className="mt-6" />
        </section>

        <section className="mt-14 rounded-2xl border border-slate-200 bg-[#f8fbff] p-8">
          <div className="flex flex-wrap items-start gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
              <Mic size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                Indicateurs OFC (global)
              </h2>
              <p className="mt-2 text-2xl font-bold text-[var(--accent)]">
                {formatNoteSatisfactionAffichageComplet()}
              </p>
              <p className="text-sm text-slate-600">satisfaction participants (questionnaires fin de session)</p>
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                <Clock size={16} className="text-[var(--accent)]" />
                Organisme certifié Qualiopi — financement OPCO possible selon éligibilité
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Aller plus loin</h2>
          <ul className="mt-6 space-y-3">
            <li>
              <Link
                href={LINKS.tutoCrChantier}
                className="inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline"
              >
                <FileText size={18} />
                Tuto PDF — compte rendu de chantier avec l&apos;IA
              </Link>
            </li>
            <li>
              <Link
                href={LINKS.formationConduiteTravauxSuiviChantier}
                className="font-medium text-[var(--accent)] hover:underline"
              >
                Formation NIV-03 — IA conduite de travaux et suivi chantier
              </Link>
            </li>
            <li>
              <Link href={LINKS.etudesCasHub} className="font-medium text-[var(--accent)] hover:underline">
                Toutes les études de cas
              </Link>
            </li>
            <li>
              <Link href={LINKS.etudesCasFfbCsfe} className="font-medium text-[var(--accent)] hover:underline">
                Étude de cas FFB &amp; CSFE — étanchéité
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
