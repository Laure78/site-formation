import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export function MonEspacePageHeader({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
}) {
  return (
    <header className="max-w-3xl">
      <h1 className="flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
        {Icon ? (
          <Icon className="shrink-0 text-[#377CF3]" size={28} strokeWidth={1.75} aria-hidden />
        ) : null}
        {title}
      </h1>
      {description ? (
        <p className="mt-2 text-base leading-relaxed text-slate-600">{description}</p>
      ) : null}
    </header>
  );
}

export function MonEspaceSection({
  title,
  description,
  actionHref,
  actionLabel,
  children,
  className,
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm md:p-6', className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-slate-900">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          ) : null}
        </div>
        {actionHref && actionLabel ? (
          <Link
            href={actionHref}
            className="text-sm font-medium text-[#377CF3] hover:underline"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function MonEspaceEmptyHint({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50/80 px-4 py-8 text-center text-sm text-slate-500">
      {children}
    </div>
  );
}

export function MonEspaceStatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = 'blue',
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  tone?: 'blue' | 'green' | 'amber' | 'violet';
}) {
  const tones = {
    blue: 'bg-sky-50 text-sky-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-800',
    violet: 'bg-violet-50 text-violet-700',
  } as const;

  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
          <p className="mt-1 font-display text-2xl font-bold text-slate-900">{value}</p>
          {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
        </div>
        <span
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-lg',
            tones[tone]
          )}
          aria-hidden
        >
          <Icon size={18} strokeWidth={1.75} />
        </span>
      </div>
    </div>
  );
}

export function MonEspaceShortcut({
  href,
  label,
  description,
  icon: Icon,
}: {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm transition-colors hover:border-[#377CF3]/40 hover:bg-[#377CF3]/[0.03]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#377CF3]">
        <Icon size={18} strokeWidth={1.75} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-slate-900 group-hover:text-[#377CF3]">
          {label}
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{description}</span>
      </span>
    </Link>
  );
}
