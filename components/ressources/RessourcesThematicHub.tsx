import Link from 'next/link';
import { BookMarked, ChevronRight, FileText, Newspaper } from 'lucide-react';
import {
  RESSOURCES_THEMATIC_BLOCKS,
  ressourcesBlogCategoryCta,
  ressourcesBlogCategoryHref,
} from '@/lib/ressources-thematic-hub';

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
    <div>
      <h4 id={id} className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        <Icon size={15} aria-hidden className="text-[#377CF3]" />
        {title}
      </h4>
      <ul className="space-y-1.5 border-l-2 border-slate-100 pl-4" aria-labelledby={id}>
        {links.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link
              href={item.href}
              className="text-sm leading-snug text-slate-700 underline decoration-slate-200 underline-offset-2 hover:text-[#377CF3] hover:decoration-[#377CF3]/40"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Hub « par thématique » : tutos PDF, guides / formations et articles blog depuis lib/ressources-thematic-hub.ts */
export function RessourcesThematicHub() {
  return (
    <section
      id="hub-par-theme"
      aria-labelledby="ressources-par-theme-heading"
      className="scroll-mt-28 border-t border-slate-200 bg-white py-14 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-10 max-w-3xl border-b border-slate-100 pb-8 md:pb-10">
          <h2 id="ressources-par-theme-heading" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Par thématique : tutos, guides et articles
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            Chaque thème rassemble les ressources utiles ensemble : télécharge les tutos PDF, ouvre les pages guides ou
            formations, puis poursuis avec les articles du blog et la liste complète par catégorie.
          </p>
        </header>

        <div className="grid gap-8 lg:gap-10">
          {RESSOURCES_THEMATIC_BLOCKS.map((block) => (
            <article
              key={block.id}
              className="rounded-2xl border border-slate-200 bg-[#FAFBFC] p-6 shadow-sm md:p-8"
            >
              <h3 className="font-display text-xl font-bold text-slate-900 md:text-2xl">{block.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{block.description}</p>

              <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                <LinkListSection
                  id={`${block.id}-tutos`}
                  title="Tutoriels PDF"
                  icon={FileText}
                  links={block.tutos}
                />
                <LinkListSection
                  id={`${block.id}-guides`}
                  title="Guides et pages formation"
                  icon={BookMarked}
                  links={block.guides}
                />
                <LinkListSection
                  id={`${block.id}-articles`}
                  title="Articles blog"
                  icon={Newspaper}
                  links={block.articles}
                />
              </div>

              {block.blogCategory ? (
                <div className="mt-10 border-t border-slate-200 pt-6">
                  <Link
                    href={ressourcesBlogCategoryHref(block.blogCategory)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#377CF3] hover:text-[#2d66d6]"
                  >
                    {ressourcesBlogCategoryCta(block.blogCategory)}
                    <ChevronRight size={18} aria-hidden />
                  </Link>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
