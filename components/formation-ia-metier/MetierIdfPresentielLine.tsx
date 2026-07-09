import { METIER_IDF_PRESENTIEL_LINE } from '@/lib/formation-ia-metier-idf';

export function MetierIdfPresentielLine({ className = '' }: { className?: string }) {
  return (
    <p className={`text-sm font-medium text-slate-600 ${className}`.trim()}>
      {METIER_IDF_PRESENTIEL_LINE}
    </p>
  );
}
