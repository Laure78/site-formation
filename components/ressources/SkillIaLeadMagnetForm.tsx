'use client';

import Link from 'next/link';
import { ArrowUpRight, Download } from 'lucide-react';
import { SKILL_IA_LEAD_MAGNET } from '@/lib/lead-magnet-skill-ia';
import { LINKS } from '@/lib/internal-links';

function pushDataLayer(event: string, resource: string) {
  if (typeof window === 'undefined') return;
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, resource });
}

export function SkillIaLeadMagnetForm() {
  return (
    <div
      className="rounded-2xl border-2 border-white/30 bg-white p-6 shadow-xl md:p-8"
      style={{ color: '#1A1A1A' }}
    >
      <p className="font-display text-lg font-bold" style={{ color: '#1A1A1A' }}>
        Télécharger le pack PDF
      </p>
      <p className="mt-1 text-sm text-slate-600">
        Conducteur de travaux — environ 52 pages · ~400&nbsp;Ko · sans inscription
      </p>

      <a
        href={SKILL_IA_LEAD_MAGNET.pdfPublicPath}
        download={SKILL_IA_LEAD_MAGNET.fileName}
        onClick={() => pushDataLayer('lead_magnet_download', 'guide-conducteur-de-travaux')}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#377CF3] bg-[#377CF3] px-5 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
      >
        <Download className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
        Obtenir le fichier PDF
      </a>

      <p className="mt-6 border-t border-slate-100 pt-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        Approfondir
      </p>
      <Link
        href={LINKS.blogGuideSkillIaConducteurTravaux}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#377CF3] transition hover:bg-[#377CF3]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        onClick={() => pushDataLayer('lead_magnet_article_open', 'guide-conducteur-de-travaux')}
      >
        Lire aussi le tutoriel étape par étape sur le blog
        <ArrowUpRight className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
      </Link>
    </div>
  );
}
