import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ACCUEIL_CAS_EXERCICES_FORMATION } from '@/lib/accueil-config';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

export function AccueilCasExercicesSection() {
  return (
    <Section tone="canvas" aria-labelledby="accueil-cas-title">
      <SectionHeader
        titleId="accueil-cas-title"
        title="Exemples d’exercices en formation"
        description="Cas pédagogiques typiques — ce ne sont pas des témoignages clients ni des gains chiffrés mesurés."
        className="mx-auto max-w-2xl"
        align="center"
      />
      <ul className="mt-10 grid gap-6 lg:grid-cols-3">
        {ACCUEIL_CAS_EXERCICES_FORMATION.map((cas) => (
          <li key={cas.id}>
            <article className="flex h-full flex-col rounded-ofc-card border border-ofc-border bg-white p-5">
              <h3 className="font-display text-base font-bold text-ofc-ink">{cas.titre}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-ofc-ink">Besoin</dt>
                  <dd className="mt-0.5 text-ofc-ink-muted">{cas.besoin}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ofc-ink">Travail réalisé</dt>
                  <dd className="mt-0.5 text-ofc-ink-muted">{cas.travail}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ofc-ink">Livrable</dt>
                  <dd className="mt-0.5 text-ofc-ink-muted">{cas.livrable}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ofc-ink">Résultat observé</dt>
                  <dd className="mt-0.5 text-ofc-ink-muted">{cas.resultat}</dd>
                </div>
              </dl>
              <p className="mt-auto pt-4">
                <Link href={cas.href} className={`${OFC_LINK} text-sm font-semibold`}>
                  Formation associée
                </Link>
              </p>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
