'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
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
        Accéder au guide complet
      </p>
      <p className="mt-1 text-sm text-slate-600">Version article blog optimisée SEO/GEO</p>

      <Link
        href={LINKS.blogGuideSkillIaConducteurTravaux}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#377CF3] bg-white px-5 py-3.5 text-base font-semibold text-[#377CF3] shadow-sm transition hover:bg-[#377CF3]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
        onClick={() => pushDataLayer('lead_magnet_article_open', 'skill-ia-conducteur-travaux')}
      >
        Consulter le guide sur le blog
        <ArrowUpRight className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
      </Link>
    </div>
  );
}
