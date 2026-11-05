'use client';

import Link from 'next/link';
import { adminRecrutementCandidat } from '@/lib/internal-links';
import type { RecruitmentCandidatRow } from '@/lib/recruitment/types';

export function RgpdStaleBanner({ candidats }: { candidats: RecruitmentCandidatRow[] }) {
  if (candidats.length === 0) return null;

  return (
    <div
      className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
      role="status"
    >
      <p className="font-semibold">RGPD — candidats non retenus (&gt; 2 ans sans contact)</p>
      <ul className="mt-2 list-inside list-disc space-y-1">
        {candidats.map((c) => (
          <li key={c.id}>
            <Link href={adminRecrutementCandidat(c.id)} className="text-[#377CF3] hover:underline">
              {c.first_name} {c.last_name}
            </Link>
            {' — suppression recommandée depuis la fiche candidat.'}
          </li>
        ))}
      </ul>
    </div>
  );
}
