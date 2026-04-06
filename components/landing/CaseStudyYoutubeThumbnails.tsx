import Image from 'next/image';

export type CaseStudyThumb = {
  src: string;
  alt: string;
  /** Titre principal sous le dégradé (style miniature YouTube) */
  title: string;
  /** Sous-ligne optionnelle */
  subtitle?: string;
  /** Ancre vers #ffb ou #csfe sur la même page */
  href?: string;
};

type Props = {
  items: readonly CaseStudyThumb[];
  className?: string;
};

/**
 * Grille de miniatures type YouTube (16:9) pour études de cas : cadre net, léger effet « player ».
 */
export function CaseStudyYoutubeThumbnails({ items, className = '' }: Props) {
  return (
    <div
      className={`grid gap-6 sm:grid-cols-2 ${className}`.trim()}
      role="list"
    >
      {items.map((item) => {
        const inner = (
          <div
            className="group relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200/90 bg-slate-900 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.35)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-16px_rgba(15,23,42,0.45)]"
            role="listitem"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
            />
            {/* Assombrissement progressif pour lisibilité du texte */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-black/35 to-black/10"
              aria-hidden
            />
            {/* Pastille « lecture » façon YouTube (décoratif) */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600/95 pl-1 shadow-lg ring-4 ring-white/25 transition group-hover:scale-105 group-hover:bg-red-500"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" aria-hidden>
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-12 md:px-5 md:pb-5">
              <p className="text-sm font-bold leading-snug text-white drop-shadow-md md:text-base">
                {item.title}
              </p>
              {item.subtitle ? (
                <p className="mt-1 text-xs font-medium text-white/85 drop-shadow md:text-sm">
                  {item.subtitle}
                </p>
              ) : null}
            </div>
          </div>
        );

        if (item.href) {
          return (
            <a
              key={item.src}
              href={item.href}
              className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
            >
              {inner}
            </a>
          );
        }

        return <div key={item.src}>{inner}</div>;
      })}
    </div>
  );
}
