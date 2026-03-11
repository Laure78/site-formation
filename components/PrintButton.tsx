'use client';

import { Printer } from 'lucide-react';

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50 print:hidden"
    >
      <Printer size={18} strokeWidth={1.5} />
      Imprimer / Enregistrer en PDF
    </button>
  );
}
