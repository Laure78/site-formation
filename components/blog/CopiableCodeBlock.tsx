'use client';

import { CopyPromptButton } from '@/components/CopyPromptButton';

type Props = {
  title: string;
  text: string;
};

/** Bloc monospace copiable — tutoriels SKILL.md dans les articles MDX. */
export function CopiableCodeBlock({ title, text }: Props) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC] shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2.5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">{title}</p>
        <CopyPromptButton text={text} label="Copier le code" />
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap px-5 py-5 font-mono text-[0.85rem] leading-relaxed text-slate-800">
        {text}
      </pre>
    </div>
  );
}
