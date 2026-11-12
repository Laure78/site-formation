type Props = {
  children: string;
  className?: string;
};

/** Encadré « EN BREF » — maquette article Claude MOE (coins 16px). */
export function EnBref({ children, className = '' }: Props) {
  return (
    <aside
      className={`rounded-2xl bg-[#F2F2F2] px-5 py-4 md:px-6 md:py-5 ${className}`}
      aria-labelledby="article-en-bref-label"
    >
      <p
        id="article-en-bref-label"
        className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]"
      >
        En bref
      </p>
      <p className="mt-2 text-[17px] leading-[1.75] text-[#1A1A1A]">{children}</p>
    </aside>
  );
}
