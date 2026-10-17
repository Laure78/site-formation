import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { buildFormationsIaNiveauHref } from '@/lib/catalogue-filter-url';
import { FORMATIONS_NIVEAUX_IA } from '@/lib/formations-niveaux-ia';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

export function AccueilNiveauxOrientationSection() {
  return (
    <Section tone="white" aria-labelledby="accueil-niveaux-title">
      <SectionHeader
        align="center"
        titleId="accueil-niveaux-title"
        title="Trois niveaux pour progresser avec l’IA"
        description="Niveau de maîtrise de l’IA, distinct de votre métier ou de la thématique traitée en session."
        className="mx-auto max-w-2xl"
      />
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {FORMATIONS_NIVEAUX_IA.map((n) => (
          <li key={n.niveau}>
            <article className="flex h-full flex-col rounded-ofc-card border border-ofc-border bg-white p-6 shadow-ofc-sm">
              <h3 className="font-display text-lg font-bold text-ofc-ink">{n.labelComplet}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ofc-ink">{n.accueilAccroche}</p>
              <p className="mt-3 text-sm font-medium text-ofc-ink-muted">Durée : {n.accueilDuree}</p>
              <Link
                href={buildFormationsIaNiveauHref(n.niveau)}
                className={`${OFC_CTA_SECONDARY} mt-6 inline-flex min-h-10 items-center justify-center px-4 py-2.5 text-sm font-semibold`}
              >
                Découvrir le niveau {n.niveau}
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
