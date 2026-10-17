import Link from 'next/link';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

type CareerEncartProps = {
  title: string;
  children: React.ReactNode;
  buttonLabel: string;
  buttonHref: string;
};

export function CareerEncart({ title, children, buttonLabel, buttonHref }: CareerEncartProps) {
  return (
    <aside className="ofc-card flex flex-col gap-4 p-6 sm:p-8">
      <h2 className="font-display text-lg font-bold text-slate-900">{title}</h2>
      <p className="text-sm leading-relaxed text-slate-600">{children}</p>
      <Link
        href={buttonHref}
        className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold sm:w-auto`}
      >
        {buttonLabel}
      </Link>
    </aside>
  );
}
