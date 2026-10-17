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

const MAX_INTERVENANTS = 2;

/** Laure confirmée + intervenants catalogue mobilisables (profils à valider côté OFC). */
export function AccueilLaureFormateursSection() {
  const laure = FORMATEUR_LAURE_OLIVIE;
  const laureFormations = getFormateurFormationLinks(laure, new Date(), { hub: true }).slice(0, 4);
  const intervenants = getCatalogueFormateurs().slice(0, MAX_INTERVENANTS);

  return (
    <Section tone="canvas" aria-labelledby="accueil-equipe-title">
      <SectionHeader
        titleId="accueil-equipe-title"
        title="Laure Olivié et l’équipe"
        description="Formatrice IA BTP et intervenants métier pour les parcours — détail des programmes sur chaque fiche."
      />

      <article className="mt-8 grid gap-6 rounded-ofc-card border border-ofc-border bg-white p-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-8">
        <FormateurPortraitView portrait={laure.portrait} shape="portrait" priority />
        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold text-ofc-ink">
            {laure.prenom} {laure.nom}
          </h3>
          <p className="mt-1 text-sm font-medium text-ofc-accent">{laure.intitule}</p>
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
              En savoir plus sur Laure Olivié
            </Link>
          </p>
        </div>
      </article>

      {intervenants.length > 0 ? (
        <>
          <p className="mt-8 text-sm text-ofc-ink-muted">
            Intervenants catalogue parcours métiers — biographies et expériences à confirmer avec
            OFC avant usage commercial étendu.
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {intervenants.map((f) => (
              <li key={f.id}>
                <article className="flex gap-4 rounded-xl border border-ofc-border bg-white p-4">
                  <FormateurPortraitView portrait={f.portrait} size="sm" />
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-ofc-ink">
                      {f.prenom} {f.nom}
                    </h4>
                    <p className="text-xs font-medium text-ofc-accent">{f.intitule}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-ofc-ink-muted">
                      {f.specialites.slice(0, 2).join(' · ')}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <div className="mt-8 flex justify-center">
        <Link href={LINKS.formateurs} className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 px-6 py-3`}>
          Découvrir nos formateurs
        </Link>
      </div>
    </Section>
  );
}
