import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { BookOpen, BriefcaseBusiness, Building2, ChevronDown, FileText, HardHat } from 'lucide-react';
import { CAS_USAGE_METIERS, type MetierId } from '@/data/cas-usage-metiers';
import { LINKS } from '@/lib/internal-links';

type Props = {
  /** Affiche un lien vers la page pilier complète (FAQ, breadcrumb). */
  showDedicatedPageLink?: boolean;
};

const ICON_BY_METIER: Record<MetierId, LucideIcon> = {
  'conducteur-de-travaux': HardHat,
  'charge-affaires': BriefcaseBusiness,
  'dirigeant-pme': Building2,
};

/**
 * Sélecteur métier → cas d’usage — rendu serveur (HTML initial indexable).
 * Pattern `<details>` / `<summary>` : tous les profils présents dans le DOM ;
 * le premier est ouvert par défaut (`open`).
 */
export function SelecteurMetier({ showDedicatedPageLink }: Props) {
  return (
    <div>
      <div className="space-y-4">
        {CAS_USAGE_METIERS.map((metier, index) => {
          const Icon = ICON_BY_METIER[metier.id];
          return (
            <details
              key={metier.id}
              id={metier.anchor}
              open={index === 0}
              name="cas-usage-metier"
              className="group scroll-mt-28 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_4px_16px_rgba(55,124,243,0.08)] open:border-[#377CF3]/40 open:shadow-[0_8px_24px_rgba(55,124,243,0.14)]"
            >
              <summary className="flex cursor-pointer list-none items-start gap-3 p-5 marker:content-none md:items-center md:p-6 [&::-webkit-details-marker]:hidden">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4E3FC] text-[#377CF3] group-open:bg-[#377CF3] group-open:text-white"
                  aria-hidden
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold leading-snug text-[#1A1A1A] md:text-lg">{metier.titre}</span>
                  <span className="mt-1 block text-sm text-[#5A5A5A]">{metier.sousTitre}</span>
                </span>
                <ChevronDown
                  className="mt-1 h-5 w-5 shrink-0 text-[#94A3B8] transition group-open:rotate-180 group-open:text-[#377CF3] md:mt-0"
                  aria-hidden
                />
              </summary>

              <div
                className="space-y-6 border-t border-[#F2F2F2] p-5 md:p-6"
                aria-labelledby={`detail-metier-${metier.id}`}
              >
                <h3 id={`detail-metier-${metier.id}`} className="sr-only">
                  Vos usages pour : {metier.titre}
                </h3>

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
                      Documents concernés
                    </h4>
                    <ul className="mt-4 space-y-3">
                      {metier.documents.map((d) => (
                        <li
                          key={d.nom}
                          className="flex gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
                        >
                          <FileText
                            className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]"
                            strokeWidth={1.75}
                            aria-hidden
                          />
                          <span>
                            <span className="block font-medium text-[#1A1A1A]">{d.nom}</span>
                            <span className="mt-0.5 block text-sm text-[#5A5A5A]">{d.description}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center">
                  <Link
                    href={metier.ctaHref}
                    className="inline-flex w-full max-w-[400px] items-center justify-center rounded-lg bg-[#377CF3] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[0_4px_16px_rgba(55,124,243,0.08)] transition-colors hover:bg-[#2A6BD9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#377CF3] focus-visible:ring-offset-2 sm:w-auto sm:min-w-[280px]"
                  >
                    {metier.ctaTexte}
                  </Link>
                </div>
              </div>
            </details>
          );
        })}
      </div>

      <nav
        aria-label="Accès rapide aux profils métier"
        className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm"
      >
        {CAS_USAGE_METIERS.map((m) => (
          <a
            key={m.id}
            href={`#${m.anchor}`}
            className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
          >
            {m.titre}
          </a>
        ))}
      </nav>

      <section
        className="mt-8 rounded-xl border border-[#F2F2F2] bg-white p-5 shadow-[0_4px_16px_rgba(55,124,243,0.08)] md:p-6"
        aria-labelledby="tutos-skill-hub"
      >
        <h3 id="tutos-skill-hub" className="text-sm font-semibold uppercase tracking-wide text-[#5A5A5A]">
          Ressources gratuites (hub)
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#5A5A5A]">
          Chaque cas d’usage ci-dessus renvoie vers un tuto Skill ou une ressource du site. Pour parcourir tout le
          catalogue PDF : rubrique Ressources et index des tutos.
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

      {showDedicatedPageLink ? (
        <p className="mt-8 text-center text-sm text-[#5A5A5A]">
          <Link
            href={LINKS.casUsageIaMetierBtp}
            className="font-semibold text-[#377CF3] underline-offset-2 hover:underline"
          >
            Page dédiée — définitions, FAQ et références formation IA pour le BTP
          </Link>
        </p>
      ) : null}
    </div>
  );
}
