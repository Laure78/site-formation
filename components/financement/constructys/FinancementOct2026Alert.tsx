import { AlertTriangle } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { CONSTRUCTYS_SOURCES } from '@/lib/financement-constructys-page-config';

export function FinancementOct2026Alert() {
  const source = CONSTRUCTYS_SOURCES.dispositifTransitoireOct2026;

  return (
    <aside
      role="note"
      aria-labelledby="alerte-oct2026-title"
      className="rounded-xl border border-amber-300 bg-amber-50 px-5 py-5 text-[#78350F] sm:px-6"
    >
      <div className="flex gap-3">
        <AlertTriangle
          className="mt-0.5 h-6 w-6 shrink-0 text-amber-700"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <h2
            id="alerte-oct2026-title"
            className="font-display text-lg font-bold text-[#92400E] sm:text-xl"
          >
            Important : changement de paiement à partir du 1<sup>er</sup> octobre 2026
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#78350F] sm:text-base">
            <li>
              Du 1<sup>er</sup> octobre au 31 décembre 2026, un dispositif transitoire{' '}
              <strong>sans subrogation de paiement</strong> s’applique aux nouveaux dossiers
              concernés.
            </li>
            <li>L’organisme de formation facture l’entreprise.</li>
            <li>L’entreprise règle la facture.</li>
            <li>
              L’entreprise dépose ensuite sa demande de remboursement auprès de Constructys avec les
              justificatifs attendus.
            </li>
            <li>Le remboursement est effectué sur la base du montant net de taxe.</li>
            <li>
              La période transitoire est annoncée jusqu’au 31 décembre 2026, sous réserve de
              prolongation.
            </li>
            <li>De nouvelles modalités doivent être précisées pour 2027.</li>
          </ul>
          <p className="mt-4 text-sm">
            <ExternalLinkAnchor href={source.href} className="font-medium text-[#92400E] underline">
              {source.title} — {source.org}
            </ExternalLinkAnchor>
          </p>
        </div>
      </div>
    </aside>
  );
}
