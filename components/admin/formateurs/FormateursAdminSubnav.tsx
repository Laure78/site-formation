import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';

const ITEMS = [
  { href: LINKS.adminFormateurs, label: 'Dossiers' },
  { href: LINKS.adminFormateursProgrammes, label: 'Programmes' },
  { href: LINKS.adminFormateursSupports, label: 'Supports' },
  { href: LINKS.adminFormateursPlanning, label: 'Planning' },
  { href: LINKS.adminFormateursQualite, label: 'Qualité' },
  { href: LINKS.adminFormateursCharte, label: 'Charte' },
] as const;

export function FormateursAdminSubnav({ activePath }: { activePath: string }) {
  return (
    <nav className="flex flex-wrap gap-2 border-b border-slate-200 pb-4" aria-label="Extranet formateurs">
      {ITEMS.map(({ href, label }) => {
        const active = activePath === href || (href !== LINKS.adminFormateurs && activePath.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
              active ? 'bg-[#377CF3] text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
