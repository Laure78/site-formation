'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { CatalogueProgramModule } from '@/lib/catalogue-formation-page-content';
import { cn } from '@/lib/cn';

type Props = {
  modules: readonly CatalogueProgramModule[];
  /** Premier module ouvert par défaut (desktop / tous écrans). */
  defaultOpenFirst?: boolean;
  className?: string;
};

/**
 * Accordéon programme — HTML natif (`details`/`summary`), plusieurs modules ouverts,
 * contenu indexable ; barre « Tout déplier / replier » + ouverture via ancre #module-N.
 */
export function TrainingProgramAccordion({
  modules,
  defaultOpenFirst = true,
  className,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const toolbarId = useId();
  const [allExpanded, setAllExpanded] = useState<boolean | null>(null);

  const setAllOpen = useCallback((open: boolean) => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll('details').forEach((el) => {
      (el as HTMLDetailsElement).open = open;
    });
    setAllExpanded(open);
  }, []);

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const match = hash.match(/^#module-(\d+)$/);
    if (!match || !rootRef.current) return;
    const index = Number(match[1]) - 1;
    const details = rootRef.current.querySelectorAll('details');
    const target = details.item(index);
    if (target) {
      target.open = true;
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, []);

  useEffect(() => {
    const openAllForPrint = () => {
      rootRef.current?.querySelectorAll('details').forEach((el) => {
        (el as HTMLDetailsElement).open = true;
      });
    };
    window.addEventListener('beforeprint', openAllForPrint);
    return () => window.removeEventListener('beforeprint', openAllForPrint);
  }, []);

  if (modules.length === 0) return null;

  return (
    <div ref={rootRef} className={cn('space-y-2', className)}>
      <div className="mb-3 flex flex-wrap items-center justify-end gap-2 print:hidden">
        <button
          type="button"
          id={`${toolbarId}-expand`}
          onClick={() => setAllOpen(true)}
          className="min-h-9 rounded-lg px-3 py-1.5 text-sm font-semibold text-[#377CF3] hover:bg-[#377CF3]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          Tout déplier
        </button>
        <button
          type="button"
          id={`${toolbarId}-collapse`}
          onClick={() => setAllOpen(false)}
          className="min-h-9 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        >
          Tout replier
        </button>
        {allExpanded !== null ? (
          <span className="sr-only" aria-live="polite">
            {allExpanded ? 'Tous les modules sont dépliés' : 'Tous les modules sont repliés'}
          </span>
        ) : null}
      </div>

      {modules.map((mod, index) => {
        const moduleAnchor = `module-${index + 1}`;
        const panelId = `training-module-panel-${index + 1}`;
        const summaryId = `training-module-summary-${index + 1}`;
        return (
          <details
            key={`${mod.title}-${index}`}
            id={moduleAnchor}
            className="group formation-program-module rounded-2xl border border-slate-200 bg-white open:border-slate-300 motion-safe:transition-[border-color] motion-safe:duration-200 print:border-slate-300 print:open:border-slate-400"
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
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 group-open:hidden print:hidden"
                aria-hidden
              >
                +
              </span>
              <span
                className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 group-open:flex print:hidden"
                aria-hidden
              >
                −
              </span>
            </summary>
            <div id={panelId} role="region" aria-labelledby={summaryId}>
              {mod.competence ? (
                <p className="border-t border-slate-100 px-4 pt-4 text-sm font-semibold text-slate-800 md:px-5">
                  Compétence : {mod.competence}
                </p>
              ) : null}
              <ul
                className={`list-disc space-y-2 px-4 py-4 pl-[4.25rem] text-base text-slate-700 md:px-5 md:pl-[4.5rem] ${
                  mod.competence ? 'border-t-0 pt-2' : 'border-t border-slate-100'
                }`}
              >
                {mod.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {mod.practice ? (
                <div className="mx-4 mb-4 rounded-xl border border-[#377CF3]/20 bg-[rgba(55,124,243,0.06)] px-4 py-3.5 md:mx-5">
                  <p className="text-base leading-relaxed text-slate-800">
                    <span className="font-bold text-slate-900">Appliquer</span>
                    <span className="text-slate-500" aria-hidden>
                      {' '}
                      |{' '}
                    </span>
                    {mod.practice}
                  </p>
                </div>
              ) : null}
            </div>
          </details>
        );
      })}
    </div>
  );
}
