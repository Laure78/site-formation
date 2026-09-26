import { TrainingPractice } from '@/components/formations/training';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import { FORMATION_CLAUDE_BTP_CONFIG } from '@/lib/formation-claude-btp-landing';

const CLAUDE_LANDING = FORMATION_CLAUDE_BTP_CONFIG;
const PRACTICE_CASES = CLAUDE_LANDING.useCases.map((u) => `${u.title} — ${u.body}`);

/** Sections éditoriales spécifiques fiche NIV-04 — après objectifs. */
export function CatalogueFormationClaudeExtras() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Pourquoi Claude AI pour le BTP
          </h2>
          {CLAUDE_LANDING.introParagraphs.map((p) => (
            <p key={p.slice(0, 48)} className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
              {p}
            </p>
          ))}
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
            {GAINS_TEMPS_MENTION_PRUDENCE}
          </p>
        </div>
      </section>
      <TrainingPractice
        title={CLAUDE_LANDING.useCasesTitle}
        cases={PRACTICE_CASES}
        description="Usages métier travaillés pendant la session — validation humaine obligatoire."
      />
    </>
  );
}
