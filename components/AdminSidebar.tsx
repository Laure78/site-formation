'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Menu,
  X,
  TrendingUp,
  ShieldCheck,
  Clock,
  ExternalLink,
  LogOut,
  CalendarDays,
  Home,
} from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { adminSignOutAction } from '@/app/admin/actions';

const NAV_PILOTAGE = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: LINKS.adminMonEspace, label: 'Organisation', icon: CalendarDays, exact: false },
] as const;

const NAV_PLATFORM = [
  { href: '/admin/disponibilites', label: 'Disponibilités', icon: Clock },
  { href: '/admin/formations', label: 'Formations', icon: BookOpen },
  { href: '/admin/apprenants', label: 'Apprenants', icon: Users },
  { href: '/admin/progression', label: 'Progression', icon: TrendingUp },
  { href: '/admin/qualite', label: 'Qualiopi / Qualité', icon: ShieldCheck },
] as const;

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact || href === '/admin') return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
        active
          ? 'bg-[#377CF3] text-white shadow-sm shadow-blue-500/20'
          : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm'
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          active
            ? 'bg-white/15 text-white'
            : 'bg-white text-slate-500 shadow-sm ring-1 ring-slate-200/80 group-hover:text-[#377CF3]'
        }`}
      >
        <Icon size={16} strokeWidth={1.75} aria-hidden />
      </span>
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function AdminSidebar({
  showOrganisation = false,
}: {
  /** Section Organisation : admin allowlist uniquement (jamais formateur / apprenant). */
  showOrganisation?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const pilotageItems = showOrganisation
    ? NAV_PILOTAGE
    : NAV_PILOTAGE.filter((item) => item.href !== LINKS.adminMonEspace);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-700 shadow-md lg:hidden"
        aria-label="Ouvrir le menu admin"
      >
        <Menu size={20} strokeWidth={1.75} />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] lg:hidden"
          onClick={close}
          aria-hidden
        />
      ) : null}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col border-r border-slate-200/80 bg-[#F4F6F8] transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200/70 px-4">
          <Link href="/admin" className="flex items-center gap-2.5" onClick={close}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#377CF3] text-xs font-bold text-white shadow-sm">
              LO
            </span>
            <span className="min-w-0">
              <span className="block font-display text-sm font-bold leading-tight text-slate-900">
                Laure Olivié
              </span>
              <span className="block text-[11px] font-medium tracking-wide text-slate-500">
                Espace admin
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-2 text-slate-500 hover:bg-white lg:hidden"
            aria-label="Fermer"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Navigation admin">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
            Pilotage
          </p>
          <ul className="space-y-1">
            {pilotageItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={isActive(pathname, item.href, 'exact' in item ? item.exact : false)}
                  onNavigate={close}
                />
              </li>
            ))}
          </ul>

          <p className="mb-2 mt-7 px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
            Plateforme
          </p>
          <ul className="space-y-1">
            {NAV_PLATFORM.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={isActive(pathname, item.href)}
                  onNavigate={close}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 space-y-1 border-t border-slate-200/70 bg-[#EEF1F4]/80 p-3">
          <a
            href={LINKS.formations}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-white hover:text-slate-900"
            onClick={close}
          >
            <ExternalLink size={16} strokeWidth={1.75} aria-hidden />
            Catalogue public
          </a>
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-white hover:text-slate-900"
            onClick={close}
          >
            <Home size={16} strokeWidth={1.75} aria-hidden />
            Retour au site
          </Link>
          <form action={adminSignOutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:text-rose-600"
              onClick={close}
            >
              <LogOut size={16} strokeWidth={1.75} aria-hidden />
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
