'use client';

import Link from 'next/link';
import { buildFormationsIaHref } from '@/lib/catalogue-filter-url';

const PILLS = [
  { label: 'Débutant', href: buildFormationsIaHref({ niveau: 1, vue: 'ia' }) },
  { label: 'Appels d’offres', href: buildFormationsIaHref({ thematique: 'devis-ao', vue: 'tout' }) },
  { label: 'Chantier', href: buildFormationsIaHref({ thematique: 'chantier-moe', vue: 'tout' }) },
  { label: 'Administratif', href: buildFormationsIaHref({ thematique: 'admin-commercial', vue: 'tout' }) },
  { label: 'Claude', href: buildFormationsIaHref({ q: 'Claude', vue: 'tout' }) },
  {
    label: 'Créer ses assistants',
    href: buildFormationsIaHref({ thematique: 'assistants-ia', vue: 'ia' }),
  },
] as const;

export function FormationsCatalogueQuickPills() {
  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Raccourcis de recherche">
      {PILLS.map(({ label, href }) => (
        <li key={label}>
          <Link
            href={href}
            className="inline-flex min-h-11 items-center rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-ofc-ink hover:border-[#377CF3]/50 hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
