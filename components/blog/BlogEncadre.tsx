import type { ReactNode } from 'react';

type Props = {
  title?: string;
  children: ReactNode;
};

/** Encadré court pour articles MDX (charte OFC). */
export function BlogEncadre({ title, children }: Props) {
  return (
    <aside className="my-6 rounded-xl border border-[#377CF3]/25 bg-[#F2F2F2]/80 p-4 md:p-5">
      {title ? <p className="font-semibold text-slate-900">{title}</p> : null}
      <div className={`text-sm leading-relaxed text-slate-700 ${title ? 'mt-2' : ''}`}>
        {children}
      </div>
    </aside>
  );
}
