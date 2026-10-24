import Link from 'next/link';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  FORMATEUR_LAURE_OLIVIE,
  getCatalogueFormateurs,
} from '@/lib/formateurs';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

const MAX_INTERVENANTS = 3;

/** Laure Olivié + aperçu des intervenants confirmés — détail sur /formateurs. */
export function AccueilLaureFormateursSection() {
  const laure = FORMATEUR_LAURE_OLIVIE;
  const intervenants = getCatalogueFormateurs()
    .filter((f) => f.status === 'confirmed')
    .slice(0, MAX_INTERVENANTS);

  return (
    <Section tone="canvas" size="compact" aria-labelledby="accueil-equipe-title">
      <SectionHeader
        titleId="accueil-equipe-title"
        title="Laure Olivié et l’équipe de formateurs"
        description="Terrain BTP et formation IA en présentiel — détail des programmes sur chaque fiche."
        className="max-w-2xl"
      />

      <article className="mt-8 grid gap-6 rounded-ofc-card border border-ofc-border bg-white p-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-8">
        <FormateurPortraitView portrait={laure.portrait} shape="portrait" priority />
        <div className="min-w-0 text-left">
          <h3 className="font-display text-xl font-bold text-ofc-ink">
            {laure.prenom} {laure.nom}
          </h3>
          <p className="mt-1 text-sm font-medium text-ofc-accent">
            Formatrice IA spécialisée BTP · Fondatrice de Laure Olivié
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted">
            7 ans dans le BTP, ex-dirigeante d’ALIA BTP (travaux publics). Formations sur vos devis,
            appels d’offres, comptes rendus et outils de gestion — avec l’IA, en présentiel.
          </p>
        </div>
      </article>

      {intervenants.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {intervenants.map((f) => (
            <li key={f.id}>
              <article className="flex h-full gap-4 rounded-xl border border-ofc-border bg-white p-4">
                <FormateurPortraitView portrait={f.portrait} size="sm" />
                <div className="min-w-0 text-left">
                  <h4 className="font-display font-bold text-ofc-ink">
                    {f.prenom} {f.nom}
                  </h4>
                  <p className="text-xs font-medium text-ofc-accent">{f.intitule}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8">
        <Link href={LINKS.formateurs} className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 px-6 py-3`}>
          Découvrir nos formateurs
        </Link>
      </div>
    </Section>
  );
}
