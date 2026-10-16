import type { ReactNode } from 'react';

/** Conteneur scroll horizontal pour tableaux MDX (mobile). */
export function BlogTableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-[640px] w-full text-left text-sm text-slate-700">{children}</table>
    </div>
  );
}
