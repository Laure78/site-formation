import Link from 'next/link';
import type { ReactNode } from 'react';

/** Fond page Organisation — blanc cassé discret, cohérent admin. */
export const orgPageBg = 'bg-[#F7F9FC]';

export function OrgPageHeader({
  eyebrow = 'Organisation · admin',
  title,
  description,
  icon,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.06em] text-slate-400">
          {eyebrow}
        </p>
        <h1 className="mt-1.5 flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight text-slate-900 md:text-[1.75rem]">
          {icon}
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-sm leading-relaxed text-slate-500 md:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}

export function OrgCard({
  children,
  className = '',
  padding = 'md',
}: {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}) {
  const pad =
    padding === 'sm' ? 'p-3.5' : padding === 'lg' ? 'p-6 md:p-7' : 'p-5 md:p-6';
  return (
    <section
      className={`rounded-2xl border border-slate-200/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${pad} ${className}`}
    >
      {children}
    </section>
  );
}

export function OrgCardHeader({
  title,
  description,
  actionHref,
  actionLabel,
  icon,
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="font-display text-[17px] font-semibold text-slate-900">
            {title}
          </h2>
        </div>
        {description ? (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        ) : null}
      </div>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="shrink-0 text-sm font-medium text-[#377CF3] hover:underline"
        >
          {actionLabel} →
        </Link>
      ) : null}
    </div>
  );
}

export function OrgStatCard({
  label,
  value,
  icon,
  tone = 'sky',
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  tone?: 'sky' | 'emerald' | 'amber' | 'violet' | 'rose' | 'slate';
}) {
  const tones: Record<string, { wrap: string; icon: string }> = {
    sky: { wrap: 'bg-sky-50/80 border-sky-100/80', icon: 'bg-white/80 text-sky-600' },
    emerald: {
      wrap: 'bg-emerald-50/70 border-emerald-100/80',
      icon: 'bg-white/80 text-emerald-600',
    },
    amber: {
      wrap: 'bg-amber-50/70 border-amber-100/80',
      icon: 'bg-white/80 text-amber-700',
    },
    violet: {
      wrap: 'bg-violet-50/70 border-violet-100/80',
      icon: 'bg-white/80 text-violet-600',
    },
    rose: { wrap: 'bg-rose-50/70 border-rose-100/80', icon: 'bg-white/80 text-rose-600' },
    slate: {
      wrap: 'bg-slate-50 border-slate-200/80',
      icon: 'bg-white text-slate-500',
    },
  };
  const t = tones[tone] ?? tones.sky!;

  return (
    <div
      className={`rounded-2xl border px-4 py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] ${t.wrap}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="mt-1 font-display text-2xl font-bold tabular-nums text-slate-900">
            {value}
          </p>
        </div>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${t.icon}`}
          aria-hidden
        >
          {icon}
        </span>
      </div>
    </div>
  );
}

export function OrgTag({
  children,
  tone = 'slate',
}: {
  children: ReactNode;
  tone?: 'sky' | 'emerald' | 'amber' | 'violet' | 'rose' | 'slate' | 'blue';
}) {
  const map: Record<string, string> = {
    sky: 'bg-sky-50 text-sky-700',
    blue: 'bg-[#EFF6FF] text-[#377CF3]',
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-800',
    violet: 'bg-violet-50 text-violet-700',
    rose: 'bg-rose-50 text-rose-700',
    slate: 'bg-slate-100 text-slate-600',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${map[tone] ?? map.slate}`}
    >
      {children}
    </span>
  );
}

export function OrgEmpty({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl bg-slate-50/80 px-3 py-5 text-center text-sm text-slate-400">
      {children}
    </p>
  );
}

export function OrgPrimaryButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/15 hover:bg-[#2d66d6] disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/** En-têtes pastel jours (planning). */
export const DAY_HEADER_TONES = [
  'bg-sky-50 text-sky-800',
  'bg-emerald-50 text-emerald-800',
  'bg-violet-50 text-violet-800',
  'bg-amber-50 text-amber-900',
  'bg-rose-50 text-rose-800',
  'bg-orange-50 text-orange-900',
  'bg-slate-100 text-slate-700',
] as const;
