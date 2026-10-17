import Link from 'next/link';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  FORMATEUR_LAURE_OLIVIE,
  getCatalogueFormateurs,
  getFormateurFormationLinks,
} from '@/lib/formateurs';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

const MAX_INTERVENANTS = 3;

/** Équipe formateurs — aperçu court ; détail sur /formateurs. */
export function AccueilLaureFormateursSection() {
  const laure = FORMATEUR_LAURE_OLIVIE;
  const laureFormations = getFormateurFormationLinks(laure, new Date(), { hub: true }).slice(0, 3);
  const intervenants = getCatalogueFormateurs().slice(0, MAX_INTERVENANTS);

  return (
    <Section tone="canvas" aria-labelledby="accueil-equipe-title">
      <SectionHeader
        titleId="accueil-equipe-title"
        title="Découvrez notre équipe de formateurs"
        description="Laure Olivié et les intervenants métier — spécialités et programmes en présentiel Île-de-France."
      />

      <article className="mt-8 grid gap-6 rounded-ofc-card border border-ofc-border bg-white p-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-8">
        <FormateurPortraitView portrait={laure.portrait} shape="portrait" priority />
        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold text-ofc-ink">
            {laure.prenom} {laure.nom}
          </h3>
          <p className="mt-1 text-sm font-medium text-ofc-accent">
            Fondatrice d’OFC Création d’Entreprise · Formatrice IA spécialisée BTP
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted">{laure.parcours}</p>
          {laureFormations.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm">
              {laureFormations.map((f) => (
                <li key={f.code}>
                  <Link href={f.href} className={`${OFC_LINK} font-medium`}>
                    {f.titre}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-4">
            <Link href={LINKS.aPropos} className={`${OFC_LINK} text-sm font-semibold`}>
              Présentation de Laure Olivié
            </Link>
          </p>
        </div>
      </article>

      {intervenants.length > 0 ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {intervenants.map((f) => (
            <li key={f.id}>
              <article className="flex h-full gap-4 rounded-xl border border-ofc-border bg-white p-4">
                <FormateurPortraitView portrait={f.portrait} size="sm" />
                <div className="min-w-0">
                  <h4 className="font-display font-bold text-ofc-ink">
                    {f.prenom} {f.nom}
                  </h4>
                  <p className="text-xs font-medium text-ofc-accent">{f.intitule}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-ofc-ink-muted">
                    {f.specialites.slice(0, 3).join(' · ')}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link href={LINKS.formateurs} className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 px-6 py-3`}>
          Rencontrer nos formateurs
        </Link>
        <Link href={LINKS.qualiopi} className={`${OFC_LINK} text-sm font-semibold`}>
          Certification Qualiopi OFC
        </Link>
      </div>
    </Section>
  );
}
