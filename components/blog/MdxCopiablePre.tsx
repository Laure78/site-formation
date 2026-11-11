'use client';

import { CopyPromptButton } from '@/components/CopyPromptButton';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

/** Bloc `pre` MDX avec bouton copier (prompts tutos). */
export function MdxCopiablePre({ children }: Props) {
  const text =
    typeof children === 'string'
      ? children
      : extractTextFromPreChildren(children);

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC] shadow-sm">
      <div className="flex flex-wrap items-center justify-end gap-3 border-b border-slate-200 bg-white px-4 py-2.5">
        <CopyPromptButton text={text} label="Copier le prompt" />
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap px-5 py-5 font-mono text-[0.85rem] leading-relaxed text-slate-800">
        {children}
      </pre>
    </div>
  );
}

function extractTextFromPreChildren(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractTextFromPreChildren).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    if (props?.children != null) return extractTextFromPreChildren(props.children);
  }
  return '';
}
