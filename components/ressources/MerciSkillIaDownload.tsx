'use client';

import { SKILL_IA_LEAD_MAGNET } from '@/lib/lead-magnet-skill-ia';

export function MerciSkillIaDownload() {
  const href = SKILL_IA_LEAD_MAGNET.pdfPublicPath;

  function onClick() {
    if (typeof window === 'undefined') return;
    const w = window as Window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: 'lead_magnet_download', resource: 'guide-conducteur-de-travaux' });
  }

  return (
    <a
      href={href}
      download={SKILL_IA_LEAD_MAGNET.fileName}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-8 py-4 text-base font-semibold text-white shadow-md transition hover:bg-[#2d66d6]"
    >
      📥 Télécharger le guide PDF (~400&nbsp;Ko, 52 pages)
    </a>
  );
}
