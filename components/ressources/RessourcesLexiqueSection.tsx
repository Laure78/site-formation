import { ArrowRight, BookOpen, Brain, Clock, GraduationCap, Layers } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { RESSOURCES_LEXIQUE } from '@/lib/ressources-lexique';

const MODE_ICONS = {
  parcours: GraduationCap,
  dictionnaire: BookOpen,
  flashcards: Layers,
  quiz: Brain,
} as const;

export function RessourcesLexiqueSection() {
  return (
    <section
      id="lexique-btp"
      aria-labelledby="ressources-lexique-heading"
      className="scroll-mt-28 border-t border-slate-200 bg-white py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">Outil gratuit · BeWork</p>
          <h2 id="ressources-lexique-heading" className="mt-2 font-display text-2xl font-bold text-slate-900 md:text-3xl">
            {RESSOURCES_LEXIQUE.heading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{RESSOURCES_LEXIQUE.description}</p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RESSOURCES_LEXIQUE.modes.map((mode) => {
            const Icon = MODE_ICONS[mode.id];
            return (
              <div
                key={mode.id}
                className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFF6FF]">
                  <Icon className="h-5 w-5 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mt-3 font-semibold text-slate-900">{mode.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{mode.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 md:p-8">
          <h3 className="font-display text-lg font-bold text-slate-900 md:text-xl">
            {RESSOURCES_LEXIQUE.parcoursCount} parcours pédagogiques
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Chaque parcours explique un sujet en langage simple, avec schémas pour visualiser — avancez étape par
            étape.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {RESSOURCES_LEXIQUE.parcours.map((parcours) => (
              <li
                key={parcours.title}
                className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3"
              >
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900">{parcours.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {parcours.duration} · {parcours.steps} étapes
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ExternalLinkAnchor
            href={RESSOURCES_LEXIQUE.url}
            title="Ouvrir le lexique BTP gratuit sur app.laureolivie.fr"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2d66d6]"
          >
            Ouvrir le lexique BTP
            <ArrowRight className="h-4 w-4" aria-hidden />
          </ExternalLinkAnchor>
          <p className="text-sm text-slate-500">
            {RESSOURCES_LEXIQUE.termCount} termes · flashcards &amp; quiz · sans inscription
          </p>
        </div>
      </div>
    </section>
  );
}
