import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export type EssentielProps = {
  /** 3 à 5 puces — phrases-clés déjà présentes sur la page (pas de paragraphe dupliqué). */
  items: readonly string[];
  className?: string;
  /** Préfixe d’id pour `aria-labelledby` si plusieurs blocs sur une même page. */
  idPrefix?: string;
};

/**
 * Encadré « L’essentiel en 30 secondes » — charte OFC (#377CF3, #F2F2F2, Poppins).
 * Server Component : tout le texte reste dans le DOM (SEO + lecture rapide).
 */
export function Essentiel({ items, className = '', idPrefix = 'page' }: EssentielProps) {
  const bullets = items.slice(0, 5);
  if (bullets.length === 0) return null;

  const headingId = `${idPrefix}-essentiel-heading`;

  return (
    <aside
      className={`rounded-2xl border border-[#377CF3]/25 bg-[#F2F2F2] px-5 py-5 shadow-[inset_3px_0_0_0_#377CF3] md:px-6 md:py-6 ${poppins.className} ${className}`.trim()}
      aria-labelledby={headingId}
      data-essentiel
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
        L&apos;essentiel en 30 secondes
      </p>
      <h2 id={headingId} className="mt-1.5 text-lg font-semibold leading-snug text-slate-900 md:text-xl">
        L&apos;essentiel
      </h2>
      <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed text-slate-700 md:text-base">
        {bullets.map((item, index) => (
          <li key={`${headingId}-${index}`} className="flex gap-2.5">
            <span
              className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#377CF3]"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
