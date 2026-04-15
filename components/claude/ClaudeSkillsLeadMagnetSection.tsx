'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, ClipboardList, MailCheck, FileText } from 'lucide-react';
import { submitLeadClaudeSkillsAction } from '@/app/actions/leads';

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
    description: 'Générez un CR structuré à partir de notes terrain brutes en quelques minutes.',
    Icon: ClipboardList,
  },
  {
    title: 'Devis client',
    description: 'Transformez un brief brut en devis clair, lisible et professionnel.',
    Icon: FileText,
  },
  {
    title: 'Réponse client',
    description: 'Rédigez des emails clients rapides, cadrés et cohérents avec votre activité.',
    Icon: MailCheck,
  },
];

export function ClaudeSkillsLeadMagnetSection() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const res = await submitLeadClaudeSkillsAction({
      nom: String(fd.get('nom') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      consent_rgpd: true,
    });

    setSubmitting(false);
    if (!res.ok) {
      setError(res.error ?? "Une erreur est survenue. Réessayez dans quelques instants.");
      return;
    }
    setSuccess(true);
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <section
      className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:mt-12 md:p-8"
      aria-labelledby="lead-magnet-claude-skills"
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white md:p-7">
          <h2 id="lead-magnet-claude-skills" className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Gagnez 5h par semaine sur vos tâches chantier grâce à l’IA
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">
            Recevez gratuitement 3 skills Claude AI BTP pour automatiser vos comptes rendus, devis et emails clients.
            Conçu pour l’IA chantier et l’automatisation BTP, sans complexité technique.
          </p>
          <p className="mt-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100">
            Spécial BTP – utilisable immédiatement
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent-soft)]/40 p-5 md:p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">Accès immédiat</p>
          <form onSubmit={handleSubmit} className="mt-3 space-y-3">
            <div>
              <label htmlFor="lead-claude-nom" className="block text-sm font-medium text-slate-700">
                Prénom et nom
              </label>
              <input
                id="lead-claude-nom"
                name="nom"
                type="text"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-blue-100"
                placeholder="Ex. Marc Dupont"
              />
            </div>
            <div>
              <label htmlFor="lead-claude-email" className="block text-sm font-medium text-slate-700">
                Email pro
              </label>
              <input
                id="lead-claude-email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-blue-100"
                placeholder="vous@entreprise.fr"
              />
            </div>
            {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
            {success ? (
              <p className="text-xs font-medium text-emerald-700">
                C’est envoyé. Vérifiez votre email pour télécharger les 3 skills.
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Envoi en cours...' : 'Recevoir les 3 skills'}
              <ArrowRight size={16} aria-hidden />
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">Ce que vous gagnez immédiatement</h2>
        <ul className="mt-3 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
          <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">Gain de temps sur l’administratif</li>
          <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">Documents plus clairs et exploitables</li>
          <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">Réponses clients plus rapides</li>
          <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">Moins de charge mentale au quotidien</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">Aperçu des 3 skills</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {SKILLS.map(({ title, description, Icon }) => (
            <article key={title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                <Icon size={18} strokeWidth={1.8} aria-hidden />
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-[#F2F4F8] p-4 md:p-5">
        <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">Exemple de prompt inclus</h2>
        <pre className="mt-4 whitespace-pre-wrap break-words border-l-4 border-[#377CF3] pl-3 font-mono text-xs leading-relaxed text-slate-800 md:text-sm">
          {SAMPLE_PROMPT}
        </pre>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5">
        <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">Méthode terrain, orientée résultats</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          Laure Olivié, formatrice spécialisée BTP, construit des cas d’usage concrets (devis, compte rendu, emails
          client) pour une mise en application immédiate. L’approche est opérationnelle, testée en formation avec des
          équipes chantier et fonctions support.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent-soft)]/30 p-4 text-center md:p-5">
        <p className="text-sm font-semibold text-slate-900 md:text-base">Recevez vos 3 skills prêts à l’emploi</p>
        <button
          type="button"
          onClick={() => {
            const nameInput = document.getElementById('lead-claude-nom');
            nameInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            (nameInput as HTMLInputElement | null)?.focus();
          }}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Recevoir les 3 skills
          <ArrowRight size={16} aria-hidden />
        </button>
      </div>
    </section>
  );
}
