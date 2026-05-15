'use client';

import Link from 'next/link';
import { BookOpen, FileText } from 'lucide-react';
import type { Metier } from './data';
import { LINKS } from '@/lib/internal-links';

type Props = {
  metier: Metier;
  onChangeMetier: () => void;
};

/**
 * Détail cas d’usage + documents — visible après sélection d’un métier.
 */
export function CasUsageDetail({ metier, onChangeMetier }: Props) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_4px_16px_rgba(55,124,243,0.08)] transition-all duration-300 ease-out"
      role="region"
      aria-labelledby={`detail-metier-${metier.id}`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-[#F2F2F2] px-5 py-4 md:px-6">
        <h3 id={`detail-metier-${metier.id}`} className="font-semibold text-[#1A1A1A] md:text-lg">
          Vos usages pour : {metier.titre}
        </h3>
        <button
          type="button"
          onClick={onChangeMetier}
          className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-[#377CF3] underline-offset-2 transition-colors hover:bg-[#F2F2F2] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#377CF3]"
        >
          Changer de métier
        </button>
      </div>

      <div className="space-y-6 p-5 md:p-6">
        <div className="rounded-xl bg-[#D4E3FC] px-6 py-6">
          <p className="text-base leading-relaxed text-[#1A1A1A]">{metier.pitch}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[#5A5A5A]">
              5 cas d&apos;usage concrets
            </h4>
            <ul className="mt-4 space-y-4">
              {metier.casUsage.map((c) => (
                <li key={c.titre} className="rounded-xl border border-[#F2F2F2] bg-[#F2F2F2]/60 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="font-semibold text-[#1A1A1A]">{c.titre}</p>
                    <span className="shrink-0 rounded-lg bg-[#377CF3] px-2 py-1 text-xs font-semibold text-white">
                      {c.gainTemps}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#5A5A5A]">{c.description}</p>
                  <p className="mt-3">
                    <Link
                      href={c.tutoSkill.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#377CF3] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#377CF3] focus-visible:ring-offset-1"
                    >
                      <BookOpen className="h-4 w-4 shrink-0 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
                      {c.tutoSkill.libelle}
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[#5A5A5A]">
              Documents générés par l&apos;IA
            </h4>
            <ul className="mt-4 space-y-3">
              {metier.documents.map((d) => (
                <li key={d.nom} className="flex gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                  <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
                  <span>
                    <span className="block font-medium text-[#1A1A1A]">{d.nom}</span>
                    <span className="mt-0.5 block text-sm text-[#5A5A5A]">{d.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Un seul lien vers chaque URL de tuto : intégré dans les cartes ci-dessus ; ici hub + index. */}
        <section className="rounded-xl border border-[#F2F2F2] bg-[#FAFBFD] p-5 md:p-6" aria-labelledby={`tutos-skill-${metier.id}`}>
          <h4 id={`tutos-skill-${metier.id}`} className="text-sm font-semibold uppercase tracking-wide text-[#5A5A5A]">
            Ressources gratuites (hub)
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[#5A5A5A]">
            Chaque cas d’usage ci-dessus renvoie vers un tuto Skill ou une ressource du site. Pour parcourir tout le catalogue PDF : rubrique Ressources et index des tutos.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
            <Link
              href={LINKS.ressources}
              className="text-center text-sm font-semibold text-[#377CF3] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#377CF3]"
            >
              Hub Ressources laureolivie.fr
            </Link>
            <Link
              href={LINKS.ressourcesTutos}
              className="text-center text-sm font-semibold text-[#377CF3] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#377CF3]"
            >
              Index de tous les tutos PDF — /ressources/tutos
            </Link>
          </div>
        </section>

        <div className="flex justify-center pt-2">
          <Link
            href={metier.ctaHref}
            className="inline-flex w-full max-w-[400px] items-center justify-center rounded-lg bg-[#377CF3] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[0_4px_16px_rgba(55,124,243,0.08)] transition-colors hover:bg-[#2A6BD9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#377CF3] focus-visible:ring-offset-2 sm:w-auto sm:min-w-[280px]"
          >
            {metier.ctaTexte}
          </Link>
        </div>
      </div>
    </div>
  );
}
