import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getAccueilParcoursOffre } from '@/lib/accueil-offre-catalogue';
import { LINKS } from '@/lib/internal-links';
import { OFC_CARD, OFC_LINK } from '@/lib/ofc-interaction-classes';

export function AccueilParcoursMetiersSection() {
  const parcours = getAccueilParcoursOffre({ featuredOnly: true });

  return (
    <Section
      tone="canvas"
      id="accueil-parcours"
      className="scroll-mt-24"
      aria-labelledby="accueil-parcours-title"
    >
      <SectionHeader
        titleId="accueil-parcours-title"
        title="Choisir son parcours métier"
        description="Progressions par fonction — l’IA s’intègre aux modules métier, avec relecture humaine sur vos documents."
        className="max-w-2xl"
      />
      <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2">
        {parcours.map((p) => (
          <li key={p.id}>
            <article className={`${OFC_CARD} flex h-full flex-col p-5 sm:p-6`}>
              <h3 className="font-display text-lg font-bold text-ofc-ink">{p.titreCarte}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ofc-ink-muted">
                {p.usagesIa.slice(0, 2).join(' · ')}.
              </p>
              <Link
                href={p.href}
                className={`${OFC_LINK} mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold`}
              >
                Voir le parcours
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </article>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href={LINKS.parcoursMetiers} className={`${OFC_LINK} text-sm font-semibold`}>
          Voir tous les parcours métiers
        </Link>
      </p>
    </Section>
  );
}
