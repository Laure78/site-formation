'use client';

import { CopyPromptButton } from '@/components/CopyPromptButton';

type Props = {
  title: string;
  body: string;
  outcome: string;
};

export function PromptCopiableBlock({ title, body, outcome }: Props) {
  return (
    <article className="mt-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-slate-900">{title}</h3>
        <CopyPromptButton text={body} />
      </div>
      <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm leading-relaxed text-slate-800">
        {body}
      </pre>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        <strong className="font-semibold text-slate-800">Ce que ça donne :</strong> {outcome}
      </p>
    </article>
  );
}
