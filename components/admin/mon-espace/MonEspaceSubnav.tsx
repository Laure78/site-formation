import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';

const items = [
  { href: LINKS.adminMonEspace, label: 'Agenda', exact: true },
  { href: LINKS.adminMonEspaceNotes, label: 'Notes', exact: false },
  { href: LINKS.adminMonEspaceTaches, label: 'Tâches', exact: false },
  { href: LINKS.adminMonEspaceFavoris, label: 'Favoris', exact: false },
] as const;

export function MonEspaceSubnav({ pathname }: { pathname: string }) {
  return (
    <nav
      className="mt-4 flex flex-wrap gap-1 border-b border-slate-200"
      aria-label="Sections Mon espace"
    >
      {items.map(({ href, label, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`relative px-3 py-2.5 text-sm font-semibold transition-colors ${
              active ? 'text-[var(--accent)]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {label}
            {active ? (
              <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[var(--accent)]" />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
