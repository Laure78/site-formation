'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LINKS } from '@/lib/internal-links';

const items = [
  { href: LINKS.adminRecrutementPlanning, label: 'Planning', match: '/admin/recrutement/planning' },
  { href: LINKS.adminRecrutementCandidats, label: 'Candidats', match: '/admin/recrutement/candidats' },
] as const;

export function RecruitmentSubnav() {
  const pathname = usePathname();
  return (
    <nav
      className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1"
      aria-label="Sections recrutement formateurs"
    >
      {items.map(({ href, label, match }) => {
        const active = pathname === match || pathname.startsWith(`${match}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
              active
                ? 'bg-[#377CF3] text-white shadow-sm shadow-blue-500/20'
                : 'bg-white text-slate-600 ring-1 ring-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
