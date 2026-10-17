import Link from 'next/link';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getFormateursHubProfiles } from '@/lib/formateurs';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

const TEASER_COUNT = 3;

export function AccueilFormateursTeaserSection() {
  const formateurs = getFormateursHubProfiles().slice(0, TEASER_COUNT);

  return (
    <Section tone="white" aria-labelledby="accueil-formateurs-title">
      <SectionHeader
        titleId="accueil-formateurs-title"
        title="Équipe pédagogique"
        description="Formatrice IA et intervenants métier pour les parcours BTP — profils détaillés sur la page dédiée."
      />
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {formateurs.map((f, index) => (
          <li key={f.id}>
            <article className="flex h-full flex-col rounded-ofc-card border border-ofc-border p-5">
              <FormateurPortraitView
                portrait={f.portrait}
                size="md"
                priority={index === 0}
                className="mx-auto"
              />
              <h3 className="mt-4 text-center font-display text-lg font-bold text-ofc-ink">
                {f.prenom} {f.nom}
              </h3>
              <p className="mt-2 text-center text-sm font-medium text-ofc-accent">{f.intitule}</p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ofc-ink-muted">
                {f.parcours}
              </p>
            </article>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center">
        <Link href={LINKS.formateurs} className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 px-6 py-3`}>
          Découvrir nos formateurs
        </Link>
      </div>
    </Section>
  );
}
