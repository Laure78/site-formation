import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

/**
 * Passerelle discrète — création avec l’IA sans savoir coder (fiche NIV-10).
 */
export function FormationBeworkPasserelle() {
  return (
    <section className="border-b border-slate-200 bg-slate-50 px-4 py-8 md:py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
          Autre formation
        </p>
        <h2 className="mt-2 font-display text-xl font-bold text-slate-900 md:text-2xl">
          Développement web avec l’IA — sans savoir coder
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-700">
          Créer un site, une application ou un outil métier avec l’intelligence artificielle — 7&nbsp;h,
          sans prérequis en programmation.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={LINKS.formationDeveloppementWebIaSansCoder}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-5 py-2.5`}
          >
            Voir la formation
          </Link>
          <Link href={LINKS.formations} className={`${OFC_LINK} self-center text-sm`}>
            Retour au catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}
