import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  ClipboardList,
  FileSearch,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Mail,
} from 'lucide-react';
import { ACCUEIL_CAS_USAGE_RESULTATS } from '@/lib/accueil-config';
import { OFC_CARD, OFC_CARD_ARROW, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

const ICONS_BY_ID: Record<(typeof ACCUEIL_CAS_USAGE_RESULTATS)[number]['id'], LucideIcon> = {
  dce: FileSearch,
  devis: FileSpreadsheet,
  cr: ClipboardList,
  memoire: FileText,
  doe: FolderOpen,
  emails: Mail,
};

/** Résultats concrets — 6 cas d'usage orientés bénéfice, cartes liens (design system OFC_CARD). */
export function AccueilResultatsConcretsSection() {
  return (
    <section className={OFC_SEC.white} aria-labelledby="accueil-resultats-concrets">
      <div className="mx-auto max-w-6xl">
        <h2 id="accueil-resultats-concrets" className={`${OFC_TYPE_H2} text-center`}>
          Ce que vos équipes peuvent faire avec l&apos;IA
        </h2>
        <ul className="mt-10 grid list-none grid-cols-1 items-stretch gap-5 py-1 sm:grid-cols-2 lg:grid-cols-3">
          {ACCUEIL_CAS_USAGE_RESULTATS.map((item) => {
            const Icon = ICONS_BY_ID[item.id];
            return (
              <li key={item.id} className="min-w-0">
                <Link
                  href={item.href}
                  aria-label={item.ariaLabel}
                  className={`${OFC_CARD} group flex h-full min-h-[11.5rem] flex-col gap-3 p-5 sm:p-6`}
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ofc-accent-soft text-ofc-accent"
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>

                  <h3 className="font-display text-base font-bold leading-snug text-ofc-ink md:text-lg">
                    {item.titre}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-600">{item.phrase}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-ofc-border bg-[#F8FAFC] px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="mt-auto flex items-center justify-between gap-2 pt-1 text-sm font-semibold text-ofc-accent">
                    Découvrir
                    <ArrowRight className={`${OFC_CARD_ARROW} h-4 w-4 shrink-0`} aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
