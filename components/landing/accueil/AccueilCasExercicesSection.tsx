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
        title="Exemples de réalisations en formation"
        description="Cas pédagogiques — données fictives ou anonymisées. Ce ne sont pas des témoignages clients ni des gains chiffrés."
        className="mx-auto max-w-2xl"
        align="center"
      />
      <ul className="mt-10 grid gap-6 lg:grid-cols-3">
        {ACCUEIL_CAS_EXERCICES_FORMATION.map((cas) => (
          <li key={cas.id}>
            <article className="flex h-full flex-col rounded-ofc-card border border-ofc-border bg-white p-5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-ofc-accent">
                {cas.badge}
              </p>
              <h3 className="mt-2 font-display text-base font-bold text-ofc-ink">{cas.titre}</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-ofc-ink">Situation de départ</dt>
                  <dd className="mt-0.5 text-ofc-ink-muted">{cas.besoin}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ofc-ink">Travail avec ChatGPT ou Claude</dt>
                  <dd className="mt-0.5 text-ofc-ink-muted">{cas.travail}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ofc-ink">Livrable obtenu</dt>
                  <dd className="mt-0.5 text-ofc-ink-muted">{cas.livrable}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ofc-ink">Vérification humaine</dt>
                  <dd className="mt-0.5 text-ofc-ink-muted">{cas.verification}</dd>
                </div>
              </dl>
              {'apercu' in cas && cas.apercu ? (
                <pre
                  className="mt-4 max-w-full overflow-x-auto rounded-md border border-ofc-border bg-ofc-surface/50 p-3 font-mono text-[0.7rem] leading-relaxed text-ofc-ink-muted whitespace-pre-wrap"
                  aria-label="Aperçu fictif du livrable"
                >
                  {cas.apercu}
                </pre>
              ) : null}
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
