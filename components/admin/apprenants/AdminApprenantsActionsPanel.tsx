'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { ChevronDown, Upload, UserPlus } from 'lucide-react';
import { InviterForm } from '@/app/admin/apprenants/InviterForm';
import { ImportApprenantsForm } from '@/app/admin/apprenants/ImportApprenantsForm';

type Course = { id: string; title: string };

export function AdminApprenantsActionsPanel({ courses }: { courses: Course[] }) {
  const [tab, setTab] = useState<'invite' | 'import'>('invite');

  if (courses.length === 0) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Aucune formation publiée — publiez un parcours dans{' '}
        <Link href="/admin/formations" className="font-semibold underline">
          Admin → Formations
        </Link>{' '}
        avant d’inviter des apprenants.
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm" aria-labelledby="apprenants-actions-title">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <h2 id="apprenants-actions-title" className="font-display text-base font-semibold text-slate-900">
          Ajouter des apprenants
        </h2>
        <div className="flex rounded-lg border border-slate-200 p-0.5 text-sm">
          <button
            type="button"
            onClick={() => setTab('invite')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors ${
              tab === 'invite' ? 'bg-[var(--accent)] text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <UserPlus className="h-4 w-4" aria-hidden />
            Inviter
          </button>
          <button
            type="button"
            onClick={() => setTab('import')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors ${
              tab === 'import' ? 'bg-[var(--accent)] text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Upload className="h-4 w-4" aria-hidden />
            Import CSV
          </button>
        </div>
      </div>
      <div className="p-4 md:p-5">
        {tab === 'invite' ? <InviterForm courses={courses} compact /> : <ImportApprenantsForm courses={courses} compact />}
      </div>
    </section>
  );
}

/** Bandeau repliable — paramètres avancés */
export function AdminApprenantsAdvancedToggle({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group rounded-xl border border-slate-200 bg-white shadow-sm" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-semibold text-slate-800 marker:content-none [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="border-t border-slate-100 px-4 pb-4 pt-2">{children}</div>
    </details>
  );
}