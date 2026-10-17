import Link from 'next/link';
import { FormationsIaDisponibleCard } from '@/components/formations/catalogue-2027/FormationsIaDisponibleCard';
import {
  FORMATIONS_IA_NIVEAU_SECTIONS,
  getFormationsIaDisponiblesByNiveau,
} from '@/lib/formations-ia-disponibles-niveaux';

export function FormationsIaDisponibles() {
  const byNiveau = getFormationsIaDisponiblesByNiveau();

  return (
    <section
      id="formations-ia-disponibles"
      className="mt-16 scroll-mt-24 border-t border-[#E2E8F0] pt-14"
      aria-labelledby="ia-disponibles-title"
    >
      {/* Ancre legacy — maillage interne / URL historiques */}
      <span id="skills-metiers-btp" className="sr-only" />

      <h2 id="ia-disponibles-title" className="ofc-type-h2 text-ofc-ink">
        Formations IA disponibles : choisissez votre niveau
      </h2>
      <p className="mt-3 max-w-3xl text-ofc-ink-muted">
        Découvrez les bases de l’IA, appliquez-la à votre métier, puis créez vos propres assistants
        et outils BTP. Choisissez votre formation selon votre expérience et vos besoins.
      </p>

      <nav
        className="mt-8 flex flex-wrap gap-2 sm:gap-3"
        aria-label="Accès rapide aux niveaux de formation"
      >
        {FORMATIONS_IA_NIVEAU_SECTIONS.map((section) => (
          <Link
            key={section.niveau}
            href={`#${section.anchorId}`}
            className="inline-flex min-h-10 items-center rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-medium text-ofc-ink transition hover:border-[#377CF3]/40 hover:bg-[#377CF3]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            {section.anchorNavLabel}
          </Link>
        ))}
      </nav>

      <div className="mt-12 space-y-14">
        {FORMATIONS_IA_NIVEAU_SECTIONS.map((section) => {
          const formations = byNiveau[section.niveau];
          if (formations.length === 0) return null;

          return (
            <section
              key={section.niveau}
              id={section.anchorId}
              className="scroll-mt-24"
              aria-labelledby={`${section.anchorId}-heading`}
            >
              <h3
                id={`${section.anchorId}-heading`}
                className="font-display text-xl font-bold text-ofc-ink md:text-2xl"
              >
                {section.heading}
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ofc-ink-muted md:text-base">
                {section.description}
              </p>
              <p className="mt-2 text-sm font-medium text-ofc-ink">{section.publicLabel}</p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ofc-ink-muted">
                {section.usages.map((usage) => (
                  <li key={usage} className="inline-flex items-center gap-1.5">
                    <span className="text-ofc-accent" aria-hidden>
                      ·
                    </span>
                    {usage}
                  </li>
                ))}
              </ul>

              <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {formations.map((entry) => (
                  <FormationsIaDisponibleCard key={entry.ref} entry={entry} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}
