'use client';

import { List } from 'lucide-react';

export type TocEntry = {
  id: string;
  depth: 2 | 3;
  text: string;
};

type Props = {
  items: TocEntry[];
  className?: string;
};

/**
 * Sommaire cliquable — ancres alignées sur rehype-slug (ids des H2/H3 dans le MDX).
 */
export function TableOfContents({ items, className = '' }: Props) {
  if (items.length === 0) return null;
  return (
    <nav
      aria-label="Sommaire de l’article"
      className={`rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 ${className}`}
    >
      <p className="flex items-center gap-2 font-display text-sm font-semibold text-slate-900">
        <List size={18} className="text-[#377CF3]" aria-hidden />
        Dans cet article
      </p>
      <ol className="mt-4 space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.depth === 3 ? 'ml-4 list-[circle]' : 'list-decimal'}
            style={{ listStylePosition: 'outside' }}
          >
            <a href={`#${item.id}`} className="text-[#377CF3] hover:underline">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
