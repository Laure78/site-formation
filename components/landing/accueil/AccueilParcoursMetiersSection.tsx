import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getAccueilParcoursOffre } from '@/lib/accueil-offre-catalogue';
import { LINKS } from '@/lib/internal-links';
import { OFC_CARD, OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

export function AccueilParcoursMetiersSection() {
  const parcours = getAccueilParcoursOffre({ featuredOnly: true });

  return (
    <Section tone="white" id="accueil-parcours" className="scroll-mt-24" aria-labelledby="accueil-parcours-title">
      <SectionHeader
        titleId="accueil-parcours-title"
        title="Parcours métiers"
        description="Progression par fonction — modules détaillés sur chaque page parcours. Ouverture complète prévue en 2027 pour la plupart des parcours."
      />
      <ul className="mt-8 grid list-none gap-5 sm:grid-cols-2">
        {parcours.map((p) => (
          <li key={p.id}>
            <article className={`${OFC_CARD} flex h-full flex-col p-6`}>
              <p className="text-xs font-semibold uppercase tracking-wide text-ofc-accent">Parcours métier</p>
              <h3 className="mt-2 font-display text-lg font-bold text-ofc-ink">{p.titreCarte}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ofc-ink">{p.benefice}</p>
              <p className="mt-3 text-sm font-medium text-ofc-ink-muted">{p.disponibiliteLabel}</p>
              <div className="mt-auto pt-6">
                <Link
                  href={p.href}
                  className={`${OFC_CTA_PRIMARY} group inline-flex min-h-10 items-center gap-2 px-5 py-2.5 text-sm`}
                >
                  Voir le parcours
                  <ArrowRight className="h-4 w-4 motion-reduce:transition-none group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center">
        <Link href={LINKS.parcoursMetiers} className="text-sm font-semibold text-ofc-accent hover:underline">
          Voir tous les parcours
        </Link>
      </p>
    </Section>
  );
}
