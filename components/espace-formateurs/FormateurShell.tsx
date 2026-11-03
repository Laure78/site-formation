'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Home,
  UserRound,
  FileText,
  ScrollText,
  BookOpen,
  FolderOpen,
  CalendarDays,
  Award,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { signOutExtranetAction } from '@/app/espace-formateurs/actions';

const NAV = [
  { href: LINKS.espaceFormateurs, label: 'Accueil', icon: Home, exact: true },
  { href: LINKS.espaceFormateursProfil, label: 'Mon profil', icon: UserRound },
  { href: LINKS.espaceFormateursDocuments, label: 'Mes documents', icon: FileText },
  { href: LINKS.espaceFormateursCharte, label: 'Charte du formateur', icon: ScrollText },
  { href: LINKS.espaceFormateursProgrammes, label: 'Programmes', icon: BookOpen },
  { href: LINKS.espaceFormateursSupports, label: 'Supports', icon: FolderOpen },
  { href: LINKS.espaceFormateursInterventions, label: 'Mes interventions', icon: CalendarDays },
  { href: LINKS.espaceFormateursQualite, label: 'Qualité', icon: Award },
] as const;

export function FormateurShell({
  displayName,
  children,
}: {
  displayName: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
            <Link href={LINKS.espaceFormateurs} className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#377CF3] text-xs font-bold text-white">
                LO
              </span>
              <span className="font-display text-sm font-bold text-slate-900 sm:text-base">
                Espace formateurs
              </span>
            </Link>
          </div>
          <p className="hidden text-sm text-slate-600 sm:block">{displayName}</p>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}

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

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-0.5">
              {NAV.map((item) => {
                const { href, label, icon: Icon } = item;
                const active =
                  'exact' in item && item.exact ? pathname === href : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-[#377CF3] text-white shadow-sm'
                          : 'text-slate-700 hover:bg-white/70'
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.75} aria-hidden />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-slate-200/80 p-3">
            <form action={signOutExtranetAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-white/80"
              >
                <LogOut size={18} strokeWidth={1.75} aria-hidden />
                Déconnexion
              </button>
            </form>
          </div>
        </aside>

        <div className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">{children}</div>
      </div>
    </div>
  );
}
