'use client';

import Link from 'next/link';
import { Download } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';

/** Bandeau CTA vers la checklist — charte OFC (#377CF3). */
export function ChecklistBanner() {
  return (
    <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-6">
      <h3 className="font-display text-lg font-bold text-slate-900">
        Checklist gratuite : 10 prompts ChatGPT pour le BTP
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        Rédigez des emails en 30 s, répondez aux avis Google, structurez un devis plus vite…
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href={LINKS.checklist}
          className="inline-flex items-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#2d66d6]"
        >
          <Download size={18} strokeWidth={1.5} aria-hidden />
          Télécharger la checklist gratuite
        </Link>
        <Link
          href={LINKS.formations}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-[#377CF3] px-6 py-3 font-semibold text-[#377CF3] transition-colors hover:bg-white"
        >
          Découvrir mes formations IA pour les pros du BTP
        </Link>
      </div>
    </div>
  );
}
