import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { NavItem } from '@/lib/nav';

const chipClass =
  'inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-[#377CF3] hover:bg-[#EFF6FF] hover:text-[#377CF3]';

type FooterExploreStripProps = {
  title: string;
  links: readonly NavItem[];
};

/**
 * Bandeau de liens internes compact — footer (métiers, départements IDF).
 */
export function FooterExploreStrip({ title, links }: FooterExploreStripProps) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {links.map(({ href, label, title: linkTitle }) => (
          <li key={href}>
            <Link href={href} className={chipClass} title={linkTitle}>
              {label}
              <ArrowUpRight size={14} strokeWidth={2} className="shrink-0 opacity-70" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
