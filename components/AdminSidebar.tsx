'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, BookOpen, Users, Menu, X, BarChart3 } from 'lucide-react';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/formations', label: 'Formations', icon: BookOpen },
  { href: '/admin/apprenants', label: 'Apprenants', icon: Users },
  { href: '/admin/media-dashboard', label: 'Media Machine', icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bouton hamburger mobile */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-20 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm lg:hidden"
        aria-label="Ouvrir le menu"
      >
        <Menu size={20} strokeWidth={1.5} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-display text-lg font-bold text-slate-900">LO</Link>
            <span className="hidden text-xs text-slate-500 sm:inline">Admin</span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded p-2 lg:hidden"
            aria-label="Fermer"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="space-y-1 p-4">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                pathname === href || (href !== '/admin' && pathname.startsWith(href))
                  ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon size={20} strokeWidth={1.5} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100"
            onClick={() => setOpen(false)}
          >
            ← Retour au site
          </Link>
        </div>
      </aside>
    </>
  );
}
