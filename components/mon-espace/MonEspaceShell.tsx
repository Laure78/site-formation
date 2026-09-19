'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { Menu, X, LogOut, BookOpen, Search } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { signOutAction } from '@/app/espace-apprenant/actions';
import { isMonEspaceNavActive, MON_ESPACE_NAV } from '@/lib/mon-espace/nav';

export function MonEspaceShell({
  firstName,
  email,
  children,
}: {
  firstName: string;
  email: string | null | undefined;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
            <Link href={LINKS.monEspace} className="flex min-w-0 items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#377CF3] text-xs font-bold text-white">
                LO
              </span>
              <span className="truncate font-display text-sm font-bold text-slate-900 sm:text-base">
                Mon espace
              </span>
            </Link>
          </div>

          <form
            role="search"
            className="hidden max-w-md flex-1 md:block"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Recherche dans Mon espace"
          >
            <label className="relative block">
              <span className="sr-only">Rechercher</span>
              <Search
                size={16}
                strokeWidth={1.75}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                type="search"
                name="q"
                placeholder="Rechercher une note, une tâche…"
                disabled
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#377CF3] focus:outline-none focus:ring-1 focus:ring-[#377CF3] disabled:cursor-not-allowed disabled:opacity-80"
                title="La recherche sera disponible prochainement"
              />
            </label>
          </form>

          <Link
            href={LINKS.espaceApprenant}
            className="shrink-0 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            <span className="hidden sm:inline">Mes formations</span>
            <span className="sm:hidden">Formations</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        {open ? (
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        ) : null}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-slate-200 bg-[#EEF1F4] pt-14 transition-transform lg:static lg:z-0 lg:min-h-[calc(100vh-3.5rem)] lg:translate-x-0 lg:pt-0 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3 lg:hidden">
            <span className="text-sm font-semibold text-slate-800">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1.5 text-slate-500 hover:bg-slate-200/60"
              aria-label="Fermer"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Navigation Mon espace">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Navigation
            </p>
            <ul className="mt-2 space-y-0.5">
              {MON_ESPACE_NAV.map((item) => {
                const Icon = item.icon;
                const active = isMonEspaceNavActive(pathname, item);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-[#377CF3] text-white shadow-sm'
                          : 'text-slate-700 hover:bg-white/70'
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.75} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-1 border-t border-slate-200/80 p-3">
            <Link
              href={LINKS.formations}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-white/70"
            >
              <BookOpen size={16} strokeWidth={1.75} />
              Catalogue
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-white/70"
              >
                <LogOut size={16} strokeWidth={1.75} />
                Se déconnecter
              </button>
            </form>
            <p className="truncate px-3 pb-1 text-[11px] text-slate-400" title={email ?? undefined}>
              {firstName}
              {email ? ` · ${email}` : ''}
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
