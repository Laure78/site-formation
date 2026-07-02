'use client';

import { useMemo, useState } from 'react';
import { Download, FileText, Package, Sparkles } from 'lucide-react';
import {
  BIBLIOTHEQUE_SKILLS,
  SKILL_INSTALL_TUTORIAL,
  SKILL_LIBRARY_CATEGORIES,
  type SkillLibraryCategoryId,
} from '@/lib/bibliotheque-skills';

export function BibliothequeSkillsContent() {
  const [activeCategory, setActiveCategory] = useState<SkillLibraryCategoryId | 'all'>('all');

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return BIBLIOTHEQUE_SKILLS;
    return BIBLIOTHEQUE_SKILLS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const countsByCategory = useMemo(() => {
    const map = new Map<SkillLibraryCategoryId, number>();
    for (const s of BIBLIOTHEQUE_SKILLS) {
      map.set(s.category, (map.get(s.category) ?? 0) + 1);
    }
    return map;
  }, []);

  return (
    <div className="space-y-14">
      <section aria-labelledby="skills-tutorial-heading" className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">{SKILL_INSTALL_TUTORIAL.kicker}</p>
        <h2 id="skills-tutorial-heading" className="font-display mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
          {SKILL_INSTALL_TUTORIAL.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">{SKILL_INSTALL_TUTORIAL.intro}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {SKILL_INSTALL_TUTORIAL.formats.map((format) => (
            <div key={format.ext} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="inline-flex items-center gap-2 font-semibold text-slate-900">
                {format.ext === '.skill' ? (
                  <Package className="h-4 w-4 text-[#377CF3]" aria-hidden />
                ) : (
                  <FileText className="h-4 w-4 text-[#377CF3]" aria-hidden />
                )}
                {format.label}
                <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600">{format.ext}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{format.hint}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {SKILL_INSTALL_TUTORIAL.sections.map((section) => (
            <article key={section.id} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-display text-lg font-bold text-slate-900">{section.title}</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950">
          {SKILL_INSTALL_TUTORIAL.disclaimer}
        </p>
      </section>

      <section aria-labelledby="skills-catalog-heading">
        <header className="mb-6 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
            <Sparkles className="h-4 w-4" aria-hidden />
            {BIBLIOTHEQUE_SKILLS.length} skills métier BTP
          </p>
          <h2 id="skills-catalog-heading" className="font-display mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
            Télécharger un skill
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            Skills issus de la plateforme BeWork — chantier, marchés publics, réception, administratif. Chaque carte
            propose le fichier .md et l&apos;archive .skill.
          </p>
        </header>

        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par thématique">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeCategory === 'all'
                ? 'bg-[#377CF3] text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-[#377CF3]/40'
            }`}
          >
            Tous ({BIBLIOTHEQUE_SKILLS.length})
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
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === cat.id
                    ? 'bg-[#377CF3] text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-[#377CF3]/40'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((skill) => (
            <article
              key={skill.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#377CF3]/40 hover:shadow-md"
            >
              <p className="font-mono text-[0.65rem] text-slate-400">{skill.id}</p>
              <h3 className="mt-1 font-display text-lg font-bold text-slate-900">{skill.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{skill.description}</p>
              {skill.hasAssets && (
                <p className="mt-2 text-xs font-medium text-[#377CF3]">Inclut scripts ou assets (décompresse le .skill)</p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={skill.mdUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#377CF3] hover:text-[#377CF3]"
                >
                  <FileText className="h-4 w-4" aria-hidden />
                  .md
                </a>
                <a
                  href={skill.skillUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-[#377CF3] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  .skill
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
