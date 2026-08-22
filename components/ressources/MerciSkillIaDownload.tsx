'use client';

import { SKILL_IA_LEAD_MAGNET } from '@/lib/lead-magnet-skill-ia';

export function MerciSkillIaDownload() {
  return (
    <a
      href={SKILL_IA_LEAD_MAGNET.pdfPublicPath}
      download={SKILL_IA_LEAD_MAGNET.fileName}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-8 py-4 text-base font-semibold text-white shadow-md transition hover:bg-[#2d66d6]"
    >
      📥 Télécharger le guide PDF (~400&nbsp;Ko, 52 pages)
    </a>
  );
}
