'use client';

import { useId, useState } from 'react';

type Props = {
  summary: string;
  children: React.ReactNode;
  collapseThreshold?: number;
};

/** Présentation — résumé visible, suite repliable (HTML complet indexable). */
export function TrainingPresentationExpand({
  summary,
  children,
  collapseThreshold = 320,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const controlId = useId();
  const long = summary.length > collapseThreshold;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-5 md:px-6">
      <p className="text-base leading-relaxed text-slate-800">{summary}</p>
      {long ? (
        <>
          <div
            id={controlId}
            className={`overflow-hidden motion-safe:transition-[max-height] motion-safe:duration-300 ${
              expanded ? 'max-h-[2000px]' : 'max-h-0'
            }`}
            aria-hidden={!expanded}
          >
            <div className="pt-4 text-base leading-relaxed text-slate-700">{children}</div>
          </div>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={controlId}
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 text-sm font-semibold text-[#377CF3] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            {expanded ? 'Voir moins' : 'Voir plus'}
          </button>
        </>
      ) : (
        <div className="mt-4 text-base leading-relaxed text-slate-700">{children}</div>
      )}
    </div>
  );
}
