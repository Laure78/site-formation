import type { CatalogueProgramModule } from '@/lib/catalogue-formation-page-content';
import { cn } from '@/lib/cn';

type Props = {
  modules: readonly CatalogueProgramModule[];
  /** Premier module ouvert par défaut (desktop / tous écrans). */
  defaultOpenFirst?: boolean;
  className?: string;
};

/**
 * Accordéon programme — HTML natif (`details`/`summary`), accessible clavier,
 * contenu indexable SEO sans JavaScript.
 */
export function TrainingProgramAccordion({
  modules,
  defaultOpenFirst = true,
  className,
}: Props) {
  if (modules.length === 0) return null;

  return (
    <div className={cn('space-y-2', className)}>
      {modules.map((mod, index) => {
        const panelId = `training-module-panel-${index + 1}`;
        const summaryId = `training-module-summary-${index + 1}`;
        return (
          <details
            key={mod.title}
            className="group rounded-2xl border border-slate-200 bg-white open:border-slate-300 motion-safe:transition-[border-color] motion-safe:duration-200"
            open={defaultOpenFirst && index === 0}
          >
            <summary
              id={summaryId}
              aria-controls={panelId}
              className="flex min-h-12 cursor-pointer list-none items-center gap-3 px-4 py-3.5 text-left marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] [&::-webkit-details-marker]:hidden md:px-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#377CF3] text-sm font-bold text-white">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 font-display text-base font-semibold text-slate-900 md:text-lg">
                {mod.title}
              </span>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 group-open:hidden"
                aria-hidden
              >
                +
              </span>
              <span
                className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 group-open:flex"
                aria-hidden
              >
                −
              </span>
            </summary>
            <div id={panelId} role="region" aria-labelledby={summaryId}>
              <ul className="list-disc space-y-2 border-t border-slate-100 px-4 py-4 pl-[4.25rem] text-base text-slate-700 md:px-5 md:pl-[4.5rem]">
                {mod.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </details>
        );
      })}
    </div>
  );
}
