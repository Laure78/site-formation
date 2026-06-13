/** Badge catalogue — tarif promotionnel NIV-03 conduite de travaux. */
export function LaunchPriceBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#1D4ED8] ${className}`}
    >
      Prix de lancement
    </span>
  );
}
