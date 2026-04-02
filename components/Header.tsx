'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';

const NAV_ITEMS: {
  href?: string;
  label: string;
  children?: { href: string; label: string }[];
  /** Bouton bleu (même style que S'inscrire) */
  cta?: boolean;
}[] = [
  { href: '/', label: 'Accueil' },
  {
    href: '/formations',
    label: 'Formations',
    children: [
      { href: '/#programme', label: "L'IA au service du bâtiment" },
      { href: '/formations/ia-travaux-publics', label: "L'IA au service des Travaux Publics" },
      {
        href: '/formations/ia-appels-offre-btp',
        label: "Répondre aux appels d'offres BTP avec l'IA",
      },
      {
        href: '/formations/ia-niveau2-assistant-ao-dce-memoire',
        label: 'IA AO — Assistant DCE & mémoire (niveau 2)',
      },
      {
        href: '/formations/ia-rh-btp',
        label: 'Formation IA pour la Fonction RH dans le BTP',
      },
      {
        href: '/formations/sensibilisation-ia-assistants-personnalises',
        label: "Sensibilisation à l'IA & Assistants IA personnalisés",
      },
      {
        href: '/formations/ia-architecture-claude-dpgf',
        label: 'IA architecture — Claude AI & DPGF',
      },
    ],
  },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
  { href: '/financement-constructys', label: 'Financement' },
  { href: '/blog', label: 'Ressources' },
  { href: CALENDLY_BOOKING_URL, label: 'Prendre RDV', cta: true },
];

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  if (href.startsWith('/#')) return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

function hasActiveChild(
  children: { href: string; label: string }[],
  pathname: string
) {
  return children.some((c) => isActive(c.href, pathname));
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-xl font-bold tracking-tight text-slate-900"
        >
          <img src="/logo-lo.svg" alt="Laure Olivié formation intelligence artificielle pour entreprises du BTP" className="h-9 w-auto" />
          Laure Olivié
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      hasActiveChild(item.children, pathname) || pathname.startsWith(item.href)
                        ? 'text-[var(--accent)]'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                    <ChevronDown size={14} strokeWidth={1.5} />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      hasActiveChild(item.children, pathname)
                        ? 'text-[var(--accent)]'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                    <ChevronDown size={14} strokeWidth={1.5} />
                  </button>
                )}
                {openDropdown === item.label && (
                  <div className="absolute left-0 top-full z-50 min-w-[220px] rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-4 py-2 text-sm ${
                          isActive(child.href, pathname)
                            ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.cta ? (
              item.href!.startsWith('http') ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  {item.label}
                </Link>
              )
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href!, pathname)
                    ? 'text-[var(--accent)]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/auth/connexion"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Connexion
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded p-2 lg:hidden"
          aria-label="Menu"
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="flex flex-col">
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-xs font-semibold uppercase text-[var(--accent)] hover:underline"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <p className="px-3 py-2 text-xs font-semibold uppercase text-slate-500">
                      {item.label}
                    </p>
                  )}
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className={`rounded-lg px-4 py-2.5 text-sm ${
                        isActive(child.href, pathname)
                          ? 'bg-[var(--accent-soft)] text-[var(--accent)] font-medium'
                          : 'text-slate-600'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : item.cta ? (
                item.href!.startsWith('http') ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="rounded-lg bg-[var(--accent)] px-3 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    onClick={() => setOpen(false)}
                    className="rounded-lg bg-[var(--accent)] px-3 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    {item.label}
                  </Link>
                )
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive(item.href!, pathname)
                      ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                      : ''
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4">
              <Link
                href="/auth/connexion"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm"
              >
                Connexion
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
