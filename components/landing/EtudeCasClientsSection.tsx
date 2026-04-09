import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import { ArrowRight, Building2, CheckCircle2, FileStack } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/seo';
import { CSFE_NOM_LIBRE } from '@/lib/csfe';

const ETUDE_HREF = '/etudes-de-cas/ffb-csfe';

/**
 * Bloc accueil — valorise l’étude de cas FFB / CSFE (preuve sociale B2B).
 */
export function EtudeCasClientsSection() {
  return (
    <section
      className="border-b border-slate-200 bg-gradient-to-b from-white via-[#f8fbff] to-white px-4 py-16 md:py-20"
      aria-labelledby="etude-cas-titre"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--accent)] shadow-sm">
            <FileStack size={14} strokeWidth={2} aria-hidden />
            Étude de cas clients
          </div>
          <h2
            id="etude-cas-titre"
            className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
          >
            FFB &amp; étanchéité :{' '}
            <span className="font-serif italic text-slate-800">ce qui a été mis en place</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Retour d&apos;expérience détaillé : défis, dispositif pédagogique, modules (mémoires,
            CCTP, devis, mails) et indicateurs — pour les fédérations, OPCO et entreprises du
            bâtiment qui veulent du concret.
          </p>

          <ul className="mt-8 space-y-3 text-slate-700">
            {[
              'Sessions courtes et opérationnelles avec la FFB (Grand Paris, IDF Est & Ouest).',
              `Même socle pédagogique avec la ${CSFE_NOM_LIBRE} pour cohérence réseau.`,
              'Financement OPCO / Qualiopi lorsque les entreprises sont éligibles.',
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]"
                  strokeWidth={2}
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
            {[
              { val: `+${SITE_CONFIG.statsPersonnesFormees}`, label: 'accompagnés' },
              { val: '4,85/5', label: 'satisfaction' },
              { val: '5', label: 'modules clés' },
            ].map((k) => (
              <div
                key={k.label}
                className="rounded-xl border border-slate-200/80 bg-white/90 px-3 py-4 text-center shadow-sm"
              >
                <p className="text-xl font-bold tabular-nums text-[var(--accent)] sm:text-2xl">
                  {k.val}
                </p>
                <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-wide text-slate-500 sm:text-xs">
                  {k.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={ETUDE_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-md shadow-blue-500/15 transition-colors hover:bg-blue-700"
            >
              Lire l&apos;étude de cas complète
              <ArrowRight size={18} strokeWidth={2} aria-hidden />
            </Link>
            <RdvLink className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-center text-sm font-semibold text-slate-800 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]">
              <Building2 size={18} strokeWidth={1.75} aria-hidden />
              Projet équivalent ?
            </RdvLink>
          </div>
        </div>
      </div>
    </section>
  );
}
