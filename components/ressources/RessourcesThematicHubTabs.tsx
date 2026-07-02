'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  Award,
  BookMarked,
  Briefcase,
  ChevronRight,
  FileText,
  HardHat,
  Newspaper,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export type RessourcesThematicHubBlock = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tutos: readonly { label: string; href: string }[];
  readonly guides: readonly { label: string; href: string }[];
  readonly articles: readonly { label: string; href: string }[];
  readonly blogCategoryCta?: string;
  readonly blogCategoryHref?: string;
};

const THEME_ICONS: Record<string, LucideIcon> = {
  'marches-et-veille': Briefcase,
  'chantier-livrables': HardHat,
  'qse-conformite': ShieldCheck,
  'productivite-outils': Zap,
  'cadre-professionnel': Award,
};

function countLinks(block: RessourcesThematicHubBlock): number {
  return block.tutos.length + block.guides.length + block.articles.length;
}

function LinkRow({ label, href }: { label: string; href: string }) {
  const className =
    'group flex items-start justify-between gap-3 rounded-xl border border-slate-200/80 bg-white px-3.5 py-3 text-sm leading-snug text-slate-700 shadow-sm transition hover:border-[#377CF3]/40 hover:shadow-md';
  const chevron = (
    <ChevronRight
      size={16}
      aria-hidden
      className="mt-0.5 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#377CF3]"
    />
  );

  if (href.startsWith('http')) {
    return (
      <li>
        <ExternalLinkAnchor href={href} title={label} className={className}>
          <span className="group-hover:text-[#377CF3]">{label}</span>
          {chevron}
        </ExternalLinkAnchor>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} className={className}>
        <span className="group-hover:text-[#377CF3]">{label}</span>
        {chevron}
      </Link>
    </li>
  );
}

function LinkListSection({
  id,
  title,
  icon: Icon,
  links,
}: {
  id: string;
  title: string;
  icon: typeof FileText;
  links: readonly { label: string; href: string }[];
}) {
  if (links.length === 0) return null;

  return (
    <div className="flex flex-col">
      <h4
        id={id}
        className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#377CF3]/10 text-[#377CF3]">
          <Icon size={14} aria-hidden />
        </span>
        {title}
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.65rem] font-bold text-slate-500">
          {links.length}
        </span>
      </h4>
      <ul className="space-y-2" aria-labelledby={id}>
        {links.map((item) => (
          <LinkRow key={`${item.href}-${item.label}`} label={item.label} href={item.href} />
        ))}
      </ul>
    </div>
  );
}

function ThematicPanel({ block }: { block: RessourcesThematicHubBlock }) {
  const Icon = THEME_ICONS[block.id] ?? FileText;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] md:p-8">
      <div className="flex items-start gap-4 border-b border-slate-100 pb-6">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#377CF3] text-white shadow-[0_4px_14px_rgba(55,124,243,0.35)]">
          <Icon size={22} aria-hidden />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900 md:text-2xl">{block.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">{block.description}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <LinkListSection id={`${block.id}-tutos`} title="Tutoriels PDF" icon={FileText} links={block.tutos} />
        <LinkListSection
          id={`${block.id}-guides`}
          title="Guides et pages formation"
          icon={BookMarked}
          links={block.guides}
        />
        <LinkListSection id={`${block.id}-articles`} title="Articles blog" icon={Newspaper} links={block.articles} />
      </div>

      {block.blogCategoryHref && block.blogCategoryCta ? (
        <div className="mt-8 border-t border-slate-100 pt-6">
          <Link
            href={block.blogCategoryHref}
            className="inline-flex items-center gap-2 rounded-xl bg-[#377CF3]/8 px-4 py-2.5 text-sm font-semibold text-[#377CF3] transition hover:bg-[#377CF3]/12"
          >
            {block.blogCategoryCta}
            <ChevronRight size={18} aria-hidden />
          </Link>
        </div>
      ) : null}
    </article>
  );
}

export function RessourcesThematicHubTabs({ blocks }: { blocks: readonly RessourcesThematicHubBlock[] }) {
  const [activeId, setActiveId] = useState(blocks[0]?.id ?? '');
  const activeBlock = blocks.find((b) => b.id === activeId) ?? blocks[0];

  return (
    <>
      <div
        role="tablist"
        aria-label="Thématiques ressources"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      >
        {blocks.map((block) => {
          const Icon = THEME_ICONS[block.id] ?? FileText;
          const selected = block.id === activeId;
          const total = countLinks(block);
          return (
            <button
              key={block.id}
              type="button"
              role="tab"
              id={`tab-${block.id}`}
              aria-selected={selected}
              aria-controls={`panel-${block.id}`}
              onClick={() => setActiveId(block.id)}
              className={`flex shrink-0 items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-left text-sm font-medium transition md:px-4 md:py-3 ${
                selected
                  ? 'border-[#377CF3] bg-[#377CF3] text-white shadow-[0_4px_16px_rgba(55,124,243,0.3)]'
                  : 'border-slate-200 bg-[#FAFBFC] text-slate-700 hover:border-[#377CF3]/50 hover:text-[#377CF3]'
              }`}
            >
              <Icon size={16} aria-hidden className={selected ? 'text-white' : 'text-[#377CF3]'} />
              <span className="max-w-[11rem] leading-snug md:max-w-none">{block.title}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[0.65rem] font-bold ${
                  selected ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
                }`}
              >
                {total}
              </span>
            </button>
          );
        })}
      </div>

      {activeBlock ? (
        <div
          key={activeBlock.id}
          role="tabpanel"
          id={`panel-${activeBlock.id}`}
          aria-labelledby={`tab-${activeBlock.id}`}
          className="mt-6 md:mt-8"
        >
          <ThematicPanel block={activeBlock} />
        </div>
      ) : null}
    </>
  );
}
