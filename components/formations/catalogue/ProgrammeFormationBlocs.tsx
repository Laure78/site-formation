import { Check } from 'lucide-react';

export type ProgrammeFormationBloc = {
  heading: string;
  /** Durée ou meta (ex. « 60 min · skills »). */
  meta?: string;
  objectifs: readonly string[];
  livrable?: string;
};

type Props = {
  blocs: readonly ProgrammeFormationBloc[];
  /** Encadré « Méthodes & moyens » au-dessus des modules. */
  pedagogicalMethods?: readonly string[];
  methodsTitle?: string;
};

/** Modules programme détaillé — style aligné fiche catalogue NIV-01. */
export function ProgrammeFormationBlocs({
  blocs,
  pedagogicalMethods,
  methodsTitle = 'Méthodes & moyens pédagogiques',
}: Props) {
  return (
    <>
      {pedagogicalMethods?.length ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
          <h3 className="font-display text-lg font-semibold text-slate-900">{methodsTitle}</h3>
          <ul className="mt-3 space-y-2 text-base text-slate-700">
            {pedagogicalMethods.map((line) => (
              <li key={line} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="mt-6 space-y-4">
        {blocs.map((bloc, index) => (
          <article
            key={bloc.heading}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                <span className="mr-2 text-[#377CF3]">{String(index + 1).padStart(2, '0')}</span>
                {bloc.heading}
              </h3>
              {bloc.meta ? (
                <span className="text-sm font-medium text-[#377CF3]">{bloc.meta}</span>
              ) : null}
            </div>
            <ul className="mt-3 space-y-1.5 text-base text-slate-700">
              {bloc.objectifs.map((o) => (
                <li key={o} className="flex gap-2">
                  <span className="text-[#377CF3]" aria-hidden>
                    ▸
                  </span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
            {bloc.livrable ? (
              <p className="mt-4 text-base text-slate-700">
                <span className="font-semibold text-slate-900">Livrable :</span> {bloc.livrable}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </>
  );
}
