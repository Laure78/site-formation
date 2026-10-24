import Link from 'next/link';
import { Briefcase } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ACCUEIL_CAS_EXERCICES_FORMATION } from '@/lib/accueil-config';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

function formationLinkLabel(titre: string): string {
  return `Voir la formation — ${titre}`;
}

export function AccueilCasExercicesSection() {
  return (
    <Section
      id="accueil-cas"
      tone="canvas"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-cas-title"
    >
      <SectionHeader
        titleId="accueil-cas-title"
        title="Exemples en formation"
        description="Cas fictifs ou anonymisés — relecture métier avant tout envoi."
        className="max-w-2xl"
      />
      <ul className="mt-10 grid gap-6 lg:grid-cols-3">
        {ACCUEIL_CAS_EXERCICES_FORMATION.map((cas) => (
          <li key={cas.id}>
            <article className="flex h-full flex-col rounded-ofc-card border border-ofc-border bg-white p-5">
              <div className="flex items-center gap-2 text-ofc-accent">
                <Briefcase className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-wide">{cas.badge}</p>
              </div>
              <h3 className="mt-2 font-display text-base font-bold text-ofc-ink">{cas.titre}</h3>
              <p className="mt-2 text-sm text-ofc-ink-muted">{cas.besoin}</p>

              <div className="mt-4 grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-lg bg-[#F2F2F2] p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-ofc-ink-subtle">
                    Avant
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ofc-ink-muted">
                    Notes dispersées, relecture longue, risque d’oubli sur les points clés.
                  </p>
                </div>
                <div className="rounded-lg border border-[#377CF3]/25 bg-[#377CF3]/5 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#377CF3]">
                    Avec l’IA
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ofc-ink">
                    {cas.travail} → {cas.livrable}
                  </p>
                  <p className="mt-2 text-xs text-ofc-ink-muted">{cas.verification}</p>
                </div>
              </div>

              <div className="mt-auto pt-5">
                <Link
                  href={cas.href}
                  aria-label={formationLinkLabel(cas.titre)}
                  className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 w-full items-center justify-center px-4 py-2.5 text-sm`}
                >
                  {formationLinkLabel(cas.titre)}
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
