import { ArrowRight, FileText, Landmark, Receipt } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { CONSTRUCTYS_SOURCES } from '@/lib/financement-constructys-page-config';
import { FC_SECTION } from '@/lib/financement-constructys-ui';

const ETAPES = [
  { icon: FileText, label: 'Facture OFC' },
  { icon: Receipt, label: 'Paiement par l’entreprise' },
  { icon: Landmark, label: 'Remboursement Constructys' },
] as const;

export function FinancementCircuitTransitoireBanner() {
  const source = CONSTRUCTYS_SOURCES.dispositifTransitoirePaiement;

  return (
    <section
      id="circuit-transitoire"
      aria-labelledby="circuit-transitoire-title"
      className={`${FC_SECTION} overflow-hidden rounded-2xl bg-[#081943] px-5 py-8 text-white sm:px-8 sm:py-10`}
    >
      <p className="text-center text-xs font-bold uppercase tracking-[0.14em] text-white/70">
        Circuit transitoire
      </p>
      <h2
        id="circuit-transitoire-title"
        className="mt-2 text-center font-display text-xl font-bold md:text-2xl"
      >
        Du 1<sup>er</sup> octobre au 31 décembre 2026
      </h2>
      <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-white/85 md:text-base">
        Pour les nouveaux dossiers concernés : l’entreprise règle l’organisme, puis demande le
        remboursement à Constructys selon accord et justificatifs — sous réserve d’évolution du
        dispositif (hors application automatique en 2027).
      </p>
      <div
        className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
        role="list"
        aria-label="Étapes du circuit transitoire"
      >
        {ETAPES.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex items-center gap-2" role="listitem">
              <div className="flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                <Icon className="h-5 w-5 shrink-0 text-[#93C5FD]" aria-hidden />
                <span className="text-sm font-semibold">{step.label}</span>
              </div>
              {index < ETAPES.length - 1 ? (
                <ArrowRight className="hidden h-5 w-5 shrink-0 text-white/50 sm:block" aria-hidden />
              ) : null}
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-center text-sm">
        <ExternalLinkAnchor
          href={source.href}
          className="font-medium text-white underline underline-offset-2 hover:text-white/90"
        >
          {source.title} — {source.org}
        </ExternalLinkAnchor>
      </p>
    </section>
  );
}
