'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  Download,
  FileText,
  Package,
  Search,
  Sparkles,
} from 'lucide-react';
import {
  BIBLIOTHEQUE_BEWORK_COUNT,
  BIBLIOTHEQUE_SKILLS,
  BIBLIOTHEQUE_TUTO_COUNT,
  SKILL_INSTALL_TUTORIAL,
  SKILL_LIBRARY_CATEGORIES,
  type BibliothequeSkillEntry,
  type BibliothequeSkillSource,
  type SkillLibraryCategoryId,
} from '@/lib/bibliotheque-skills';

type SourceFilter = 'all' | BibliothequeSkillSource;

function normalizeSearch(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function matchesSearch(skill: BibliothequeSkillEntry, query: string): boolean {
  if (!query) return true;
  const hay = normalizeSearch(`${skill.name} ${skill.summary} ${skill.category}`);
  return hay.includes(normalizeSearch(query));
}

function SkillCard({ skill }: { skill: BibliothequeSkillEntry }) {
  const isBework = skill.source === 'bework';
  const categoryLabel = SKILL_LIBRARY_CATEGORIES.find((c) => c.id === skill.category)?.label;

  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#377CF3]/35 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ${
            isBework ? 'bg-[#EFF6FF] text-[#377CF3]' : 'bg-emerald-50 text-emerald-800'
          }`}
        >
          {isBework ? 'Import .skill' : 'Tuto PDF'}
        </span>
        {categoryLabel && (
          <span className="text-[0.65rem] font-medium text-slate-400">{categoryLabel}</span>
        )}
      </div>

      <h3 className="mt-3 font-display text-lg font-bold leading-snug text-slate-900 group-hover:text-[#377CF3]">
        {skill.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{skill.summary}</p>

      {skill.hasAssets && (
        <p className="mt-2 text-xs text-slate-500">Scripts inclus dans le .skill</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
        {isBework && skill.skillUrl ? (
          <>
            <a
              href={skill.skillUrl}
              download
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d66d6] sm:flex-none"
            >
              <Download className="h-4 w-4" aria-hidden />
              Télécharger .skill
            </a>
            {skill.mdUrl && (
              <a
                href={skill.mdUrl}
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:border-[#377CF3] hover:text-[#377CF3]"
                title="Fichier Markdown"
              >
                <FileText className="h-4 w-4" aria-hidden />
                .md
              </a>
            )}
          </>
        ) : (
          <>
            {skill.tutoUrl && (
              <Link
                href={skill.tutoUrl}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d66d6] sm:flex-none"
              >
                <BookOpen className="h-4 w-4" aria-hidden />
                Voir le tuto
              </Link>
            )}
            {skill.pdfUrl && (
              <a
                href={skill.pdfUrl}
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#377CF3] hover:text-[#377CF3]"
              >
                <Download className="h-4 w-4" aria-hidden />
                PDF
              </a>
            )}
          </>
        )}
      </div>
    </article>
  );
}

function SkillGrid({ skills, emptyMessage }: { skills: BibliothequeSkillEntry[]; emptyMessage: string }) {
  if (skills.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-200 bg-[#F8FAFC] px-6 py-12 text-center text-sm text-slate-500">
        {emptyMessage}
      </p>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
}

export function BibliothequeSkillsContent() {
  const [activeCategory, setActiveCategory] = useState<SkillLibraryCategoryId | 'all'>('all');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return BIBLIOTHEQUE_SKILLS.filter((s) => {
      if (sourceFilter !== 'all' && s.source !== sourceFilter) return false;
      if (activeCategory !== 'all' && s.category !== activeCategory) return false;
      return matchesSearch(s, search.trim());
    });
  }, [activeCategory, sourceFilter, search]);

  const beworkFiltered = useMemo(() => filtered.filter((s) => s.source === 'bework'), [filtered]);
  const tutoFiltered = useMemo(() => filtered.filter((s) => s.source === 'tuto-ofc'), [filtered]);

  const countsByCategory = useMemo(() => {
    const map = new Map<SkillLibraryCategoryId, number>();
    for (const s of BIBLIOTHEQUE_SKILLS) {
      map.set(s.category, (map.get(s.category) ?? 0) + 1);
    }
    return map;
  }, []);

  const showGrouped = sourceFilter === 'all' && !search.trim();

  return (
    <div className="space-y-10">
      {/* Catalogue en premier */}
      <section id="catalogue" aria-labelledby="skills-catalog-heading" className="scroll-mt-24">
        <div className="sticky top-0 z-20 -mx-4 border-b border-slate-200/80 bg-white/95 px-4 py-4 backdrop-blur-md md:-mx-0 md:rounded-2xl md:border md:px-5">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un skill (CR, DCE, DOE, PPSPS…)"
              className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
              aria-label="Rechercher dans la bibliothèque"
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Type de ressource">
            {(
              [
                { id: 'all' as const, label: `Tous (${BIBLIOTHEQUE_SKILLS.length})` },
                { id: 'bework' as const, label: `Prêts à importer (${BIBLIOTHEQUE_BEWORK_COUNT})` },
                { id: 'tuto-ofc' as const, label: `Tutos création (${BIBLIOTHEQUE_TUTO_COUNT})` },
              ] as const
            ).map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={sourceFilter === id}
                onClick={() => setSourceFilter(id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition sm:text-sm ${
                  sourceFilter === id
                    ? 'bg-[#377CF3] text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-[#377CF3]/40'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            className="mt-2 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Thématique"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Toutes thématiques
            </button>
            {SKILL_LIBRARY_CATEGORIES.map((cat) => {
              const count = countsByCategory.get(cat.id) ?? 0;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    activeCategory === cat.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <header className="mb-6 mt-8 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
            <Sparkles className="h-4 w-4" aria-hidden />
            {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
          </p>
          <h2 id="skills-catalog-heading" className="font-display mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
            Télécharger un skill
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5 text-[#377CF3]" aria-hidden />
              <strong className="font-semibold text-slate-800">Import .skill</strong> — fichier prêt pour Claude
            </span>
            <span className="mx-2 text-slate-300">·</span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
              <strong className="font-semibold text-slate-800">Tuto PDF</strong> — méthode pour créer le tien
            </span>
          </p>
        </header>

        {showGrouped ? (
          <div className="space-y-12">
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-slate-900">
                <Package className="h-5 w-5 text-[#377CF3]" aria-hidden />
                Prêts à importer
                <span className="text-sm font-normal text-slate-500">({beworkFiltered.length})</span>
              </h3>
              <SkillGrid
                skills={beworkFiltered}
                emptyMessage="Aucun skill BeWork pour ces filtres."
              />
            </div>
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-slate-900">
                <BookOpen className="h-5 w-5 text-emerald-600" aria-hidden />
                Tutos pour créer ton skill
                <span className="text-sm font-normal text-slate-500">({tutoFiltered.length})</span>
              </h3>
              <SkillGrid
                skills={tutoFiltered}
                emptyMessage="Aucun tuto pour ces filtres."
              />
            </div>
          </div>
        ) : (
          <SkillGrid skills={filtered} emptyMessage="Aucun skill ne correspond à ta recherche. Essaie un autre mot-clé." />
        )}
      </section>

      {/* Tutoriel repliable — en bas */}
      <details
        id="tutoriel"
        className="group scroll-mt-24 rounded-2xl border border-slate-200 bg-[#F8FAFC] open:shadow-sm"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 marker:content-none [&::-webkit-details-marker]:hidden">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
              {SKILL_INSTALL_TUTORIAL.kicker}
            </p>
            <p className="mt-1 font-display text-lg font-bold text-slate-900 md:text-xl">
              {SKILL_INSTALL_TUTORIAL.title}
            </p>
            <p className="mt-1 text-sm text-slate-600">3 étapes · Claude.ai ou Claude Code</p>
          </div>
          <ChevronDown
            className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180"
            aria-hidden
          />
        </summary>
        <div className="border-t border-slate-200 px-6 pb-6 pt-4">
          <p className="text-sm leading-relaxed text-slate-600">{SKILL_INSTALL_TUTORIAL.intro}</p>
          <ol className="mt-5 grid gap-3 md:grid-cols-3">
            {SKILL_INSTALL_TUTORIAL.steps.map((step) => (
              <li
                key={step.n}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#377CF3] text-xs font-bold text-white">
                  {step.n}
                </span>
                <p className="mt-3 font-semibold text-slate-900">{step.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-amber-900/90">{SKILL_INSTALL_TUTORIAL.disclaimer}</p>
        </div>
      </details>
    </div>
  );
}
