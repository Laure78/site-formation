import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type ChipLink = { href: string; label: string };

type Props = { links: ChipLink[] };

export function Chips({ links }: Props) {
  return (
    <section className="scroll-mt-24">
      <div className="mx-auto max-w-6xl rounded-2xl border border-[#E2E8F0] bg-white px-6 py-10 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
        <h2 className="font-display text-2xl font-bold text-[#0F172A]">Aller plus loin</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex w-full items-center justify-between rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm text-[#0F172A] transition hover:-translate-y-px hover:border-[#377CF3] hover:bg-[#EFF6FF] hover:text-[#377CF3]"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
