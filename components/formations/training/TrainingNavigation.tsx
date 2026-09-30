import { cn } from '@/lib/cn';

export type TrainingNavItem = {
  href: string;
  label: string;
};

type Props = {
  items: readonly TrainingNavItem[];
  className?: string;
};

/**
 * Navigation interne sticky — CSS only, scroll horizontal sur mobile.
 * `top` = hauteur du header site pour ne pas masquer le contenu.
 */
export function TrainingNavigation({ items, className }: Props) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Sections de la formation"
      className={cn(
        'sticky top-[var(--site-header-height)] z-30 border-b border-slate-200 bg-white',
        className,
      )}
    >
      <div className="mx-auto max-w-[78rem] px-4">
        <ul className="-mx-1 flex gap-0.5 overflow-x-auto py-2 [scrollbar-width:thin]">
          {items.map((item) => (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                className="inline-flex min-h-10 items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
