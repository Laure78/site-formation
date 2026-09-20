import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';

const items = [
  { href: LINKS.adminProspection, label: 'Tableau de bord', exact: true },
  { href: LINKS.adminProspectionProspects, label: 'Prospects', exact: false },
  { href: LINKS.adminProspectionEntreprises, label: 'Entreprises', exact: false },
  { href: LINKS.adminProspectionCampagnes, label: 'Campagnes', exact: false },
  { href: LINKS.adminProspectionEmails, label: 'Emails', exact: false },
  { href: LINKS.adminProspectionRelances, label: 'Relances', exact: false },
  { href: LINKS.adminProspectionModeles, label: "Modèles d'emails", exact: false },
  { href: LINKS.adminProspectionAnnuaires, label: 'Annuaires', exact: false },
] as const;

export function ProspectionSubnav({ pathname }: { pathname: string }) {
  return (
    <nav
      className="mt-6 -mx-1 flex gap-1 overflow-x-auto px-1 pb-1"
      aria-label="Sections Prospection"
    >
      {items.map(({ href, label, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
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
