'use client';

import Link from 'next/link';
import { Download, Check } from 'lucide-react';

export function ChecklistBanner() {
  return (
    <div className="rounded-2xl border-2 border-[#166534] bg-[#166534]/5 p-6">
      <h3 className="font-display text-lg font-bold text-slate-900">
        Checklist gratuite : 10 Prompts ChatGPT pour le BTP
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        Rédigez des emails en 30 s, répondez aux avis Google, créez des devis plus vite…
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/checklist-ia-btp"
          className="inline-flex items-center gap-2 rounded-xl bg-[#166534] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#14502a]"
        >
          <Download size={18} strokeWidth={1.5} />
          Télécharger la checklist gratuite
        </Link>
        <Link
          href="/formations"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-[#166534] px-6 py-3 font-semibold text-[#166534] transition-colors hover:bg-[#166534]/5"
        >
          Découvrir nos formations IA pour les pros du BTP
        </Link>
      </div>
    </div>
  );
}
