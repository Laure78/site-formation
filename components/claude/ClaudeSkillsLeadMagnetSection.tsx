import Link from 'next/link';
import { ArrowRight, Check, ClipboardList, FileText, MailCheck } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';

const SAMPLE_PROMPT = `ROLE
Tu es conducteur de travaux dans une PME BTP.

CONTEXTE
Je te donne des notes brutes de réunion de chantier.

MISSION
Transformer ces notes en compte rendu exploitable par l'équipe.

FORMAT
En-tête + points clés + tableau Quoi | Qui | Délai | Statut.

RÈGLES
Rester factuel, ne rien inventer, signaler les données manquantes.`;

const SKILLS = [
  {
    title: 'Compte rendu de chantier',
    description: 'CR structuré à partir de notes terrain en quelques minutes.',
    Icon: ClipboardList,
  },
  {
    title: 'Devis client',
    description: 'Brief brut transformé en proposition claire et professionnelle.',
    Icon: FileText,
  },
  {
    title: 'Réponse client',
    description: 'Emails rapides, cadrés et alignés sur votre activité.',
    Icon: MailCheck,
  },
];

const BENEFITS = [
  'Moins de temps sur l’administratif',
  'Livrables plus lisibles pour l’équipe',
  'Réponses clients accélérées',
  'Charge mentale réduite au quotidien',
];

const cardHover =
  'rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:border-slate-200 hover:shadow-[0_14px_44px_rgba(15,23,42,0.08)] motion-safe:hover:-translate-y-0.5';

export function ClaudeSkillsLeadMagnetSection() {
  return (
    <section
      className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_40px_rgba(15,23,42,0.06)] md:p-10"
      aria-labelledby="lead-magnet-claude-skills"
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-[#0f172a] to-slate-950 p-6 text-white md:p-8">
          <div className="pointer-events-none absolute inset-0 claude-btp-hero-grid opacity-30" aria-hidden />
          <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Ressource gratuite</p>
          <h2 id="lead-magnet-claude-skills" className="relative mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
            3 skills Claude AI BTP
          </h2>
          <p className="relative mt-4 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
            Automatisez comptes rendus, devis et emails clients. Conçu pour l’IA chantier et l’automatisation BTP, sans
            complexité technique.
          </p>
          <p className="relative mt-5 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
            Terrain BTP · prêt à copier dans Claude
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent-soft)]/50 p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">Accès immédiat</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Fichier texte à intégrer dans vos projets Claude — un clic pour télécharger.
          </p>
          <Link
            href={LINKS.downloadClaudeSkillsBtp}
            download
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/15 transition hover:bg-blue-600"
          >
            Télécharger les 3 skills
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-display text-lg font-bold text-slate-900 md:text-xl">Bénéfices immédiats</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {BENEFITS.map((line) => (
            <li
              key={line}
              className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm text-slate-700"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
              </span>
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="font-display text-lg font-bold text-slate-900 md:text-xl">Les 3 compétences couvertes</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {SKILLS.map(({ title, description, Icon }) => (
            <article key={title} className={cardHover}>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-[var(--accent)]">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <h4 className="mt-4 font-display text-base font-semibold text-slate-900">{title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200/90 bg-slate-50/90 p-5 md:p-6">
        <h3 className="font-display text-lg font-bold text-slate-900">Exemple de prompt inclus</h3>
        <pre className="mt-4 whitespace-pre-wrap break-words border-l-[3px] border-[var(--accent)] pl-3 font-mono text-xs leading-relaxed text-slate-800 md:text-sm">
          {SAMPLE_PROMPT}
        </pre>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-5 md:p-6">
        <h3 className="font-display text-lg font-bold text-slate-900">Méthode terrain</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
          Laure Olivié, formatrice BTP : cas d’usage concrets (devis, CR, emails) pour une mise en œuvre immédiate, testée
          avec des équipes chantier et fonctions support.
        </p>
      </div>
    </section>
  );
}
