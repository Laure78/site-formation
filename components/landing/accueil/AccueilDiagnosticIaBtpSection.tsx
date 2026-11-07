import Link from 'next/link';
import { ArrowRight, ClipboardCheck } from 'lucide-react';
import { AccueilMaquetteSection } from '@/components/landing/accueil/AccueilMaquetteSection';
import { ACCUEIL_MAQUETTE_ICON_STROKE } from '@/components/landing/accueil/accueil-maquette-icons';
import { RevealShell } from '@/components/motion/RevealShell';
import { ACCUEIL_MOTION_REVEAL } from '@/components/landing/accueil/accueil-maquette-icons';
import { LINKS } from '@/lib/internal-links';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

const POINTS = [
  'Score de maturité IA et organisation numérique',
  'Vos 3 priorités d’usage sur devis, DCE, chantier ou administratif',
  'Potentiel de gain de temps et parcours catalogue recommandé',
] as const;

const BTN_PRIMARY =
  'inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0755E8] px-5 py-3 text-sm font-semibold text-white motion-safe:transition-[transform,background-color] motion-safe:duration-200 motion-safe:hover:-translate-y-px motion-safe:hover:bg-[#0648c7] motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755E8] sm:w-auto';

/** Accueil — diagnostic IA BTP gratuit (2 min, sans engagement). */
export function AccueilDiagnosticIaBtpSection() {
  return (
    <AccueilMaquetteSection
      id="accueil-diagnostic-ia"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-diagnostic-ia-title"
      tone="muted"
    >
      <RevealShell distance={ACCUEIL_MOTION_REVEAL.distance}>
        <div className="overflow-hidden rounded-2xl border border-[#DAE3F0] bg-white shadow-sm">
          <div className="grid gap-6 p-5 md:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0755E8] sm:text-[11px]">
                Outil gratuit
              </p>
              <h2
                id="accueil-diagnostic-ia-title"
                className={`${OFC_TYPE_H2} mt-2 text-left text-xl font-extrabold text-[#081A3D] md:text-2xl`}
              >
                Diagnostic IA BTP — où gagner du temps en priorité ?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted md:text-[0.9375rem]">
                En 2 minutes, identifiez les tâches à fort potentiel dans votre entreprise : devis, DCE,
                chantier, appels d&apos;offres et pilotage.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#081A3D]">
                {POINTS.map((line) => (
                  <li key={line} className="flex gap-2">
                    <ClipboardCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#0755E8]"
                      strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE}
                      aria-hidden
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-ofc-ink-muted">100 % gratuit · sans engagement · Qualiopi</p>
            </div>
            <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row lg:flex-col lg:items-end">
              <Link href={LINKS.diagnostic} data-cta="diagnostic-accueil" className={BTN_PRIMARY}>
                Lancer le diagnostic
                <ArrowRight className="h-4 w-4" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </RevealShell>
    </AccueilMaquetteSection>
  );
}
