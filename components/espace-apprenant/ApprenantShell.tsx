'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Home,
  Users,
  BookOpen,
  Menu,
  X,
  LogOut,
  UserRound,
} from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { signOutAction } from '@/app/espace-apprenant/actions';

type NavCourse = { slug: string; title: string };

export function ApprenantShell({
  firstName,
  email,
  courses,
  children,
}: {
  firstName: string;
  email: string | null | undefined;
  courses: NavCourse[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const general = [
    { href: '/espace-apprenant', label: 'Tableau de bord', icon: Home, exact: true },
    { href: '/messages', label: 'Communauté', icon: Users, exact: false },
  ];

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
            <Link href="/espace-apprenant" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#377CF3] text-xs font-bold text-white">
                LO
              </span>
              <span className="font-display text-sm font-bold text-slate-900 sm:text-base">
                Formation IA BTP
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/espace-apprenant"
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <UserRound size={16} strokeWidth={1.75} />
              </span>
              <span className="hidden sm:inline">Mon compte</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        {/* Overlay mobile */}
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
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
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Général
            </p>
            <ul className="mt-2 space-y-0.5">
              {general.map(({ href, label, icon: Icon, exact }) => {
                const active = exact ? pathname === href : pathname.startsWith(href);
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
                      <Icon size={18} strokeWidth={1.75} />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Mes formations
            </p>
            <ul className="mt-2 space-y-0.5">
              {courses.length === 0 ? (
                <li className="px-3 py-2 text-xs text-slate-500">Aucune inscription</li>
              ) : (
                courses.map((c) => {
                  const href = `/espace-apprenant/cours/${c.slug}`;
                  const active = pathname.startsWith(href);
                  return (
                    <li key={c.slug}>
                      <Link
                        href={href}
                        onClick={() => setOpen(false)}
                        className={`block rounded-lg px-3 py-2 text-sm leading-snug transition-colors ${
                          active
                            ? 'bg-white font-medium text-[#377CF3] shadow-sm'
                            : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
                        }`}
                        title={c.title}
                      >
                        <span className="line-clamp-2">{c.title}</span>
                      </Link>
                    </li>
                  );
                })
              )}
            </ul>
          </nav>

          <div className="border-t border-slate-200/80 p-3 space-y-1">
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

        <main className="min-w-0 flex-1 px-4 py-8 md:px-8 md:py-10">{children}</main>
      </div>
    </div>
  );
}
