import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { AccueilCatalogueSearchBar } from '@/components/landing/accueil/AccueilCatalogueSearchBar';
import { CATALOGUE_THEMATIQUES } from '@/lib/catalogue-thematiques-btp';
import { buildFormationsThematiqueHref } from '@/lib/catalogue-filter-url';
import { OFC_CARD, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

/** Recherche catalogue + rubriques thématiques — avant l’aperçu formations / parcours. */
export function AccueilRechercheFormationsSection() {
  return (
    <Section
      id="accueil-recherche-formations"
      tone="white"
      className="scroll-mt-24"
      aria-labelledby="accueil-recherche-formations-title"
    >
      <h2
        id="accueil-recherche-formations-title"
        className="mx-auto max-w-4xl text-center font-display text-2xl font-bold leading-snug tracking-tight text-ofc-ink sm:text-3xl md:text-[2rem]"
      >
        Trouvez votre formation IA BTP{' '}
        <span className="text-ofc-accent">et développez vos compétences</span>
      </h2>

      <AccueilCatalogueSearchBar className="mt-8 sm:mt-10" />

      <div className="mt-12 md:mt-14">
        <h3 className="font-display text-xl font-bold text-ofc-ink sm:text-2xl">
          Nos domaines de formation IA BTP
        </h3>
        <div
          className="mt-3 h-0.5 w-14 rounded-full bg-ofc-accent"
          aria-hidden
        />

        <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATALOGUE_THEMATIQUES.map((rubrique) => (
            <li key={rubrique.id} className="min-w-0">
              <Link
                href={buildFormationsThematiqueHref(rubrique.id)}
                className={`${OFC_CARD} group flex h-full flex-col p-5 sm:p-6`}
              >
                <h4 className={`${OFC_TYPE_H3} text-lg sm:text-xl`}>{rubrique.title}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ofc-ink-muted">
                  {rubrique.description}
                </p>
                <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-ofc-accent group-hover:underline">
                  Voir les formations
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
