import Link from 'next/link';
import { BookOpen, Calendar, Coins, GraduationCap, Sparkles, User } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';

const items = [
  {
    href: LINKS.formations,
    title: 'Formations',
    line: 'Catalogue Qualiopi',
    Icon: GraduationCap,
  },
  {
    href: LINKS.financement,
    title: 'Financement',
    line: 'Constructys 100 %',
    Icon: Coins,
  },
  {
    href: LINKS.blog,
    title: 'Blog',
    line: 'Guides IA BTP',
    Icon: BookOpen,
  },
  {
    href: LINKS.claudeAiBtp,
    title: 'Claude AI BTP',
    line: 'Guide complet',
    Icon: Sparkles,
  },
  {
    href: LINKS.aPropos,
    title: 'À propos',
    line: 'Laure Olivié',
    Icon: User,
  },
  {
    href: LINKS.prendreRdv,
    title: 'Prendre RDV',
    line: 'Visio gratuite',
    Icon: Calendar,
  },
] as const;

/**
 * Maillage interne vers les sections clés — présent sur toutes les pages (avant le footer).
 */
export function SitelinksHub() {
  return (
    <section aria-labelledby="nav-hub" className="border-t border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="nav-hub" className="sr-only">
          Navigation principale du site
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {items.map(({ href, title, line, Icon }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:border-[var(--accent)]/35 hover:shadow-md"
            >
              <Icon
                className="h-5 w-5 text-[var(--accent)]"
                strokeWidth={1.75}
                aria-hidden
              />
              <span className="mt-3 block text-sm font-semibold text-slate-900 group-hover:text-[var(--accent)]">
                {title}
              </span>
              <p className="mt-1 text-xs text-slate-600">{line}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
