import { getFormationByCode, libelleDureeFormation } from '@/data/formations';
import { TrainingFormatTabs } from '@/components/formations/training/TrainingFormatTabs';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { DEV_WEB_IA_DUREE_AFFICHAGE } from '@/lib/formation-developpement-web-ia-content';
import { getCataloguePublicSessionsForSlug } from '@/lib/catalogue-public-sessions';
import { libelleTarifParticipantCatalogue } from '@/lib/tarifs-catalogue-participant';

type Props = {
  programmeRef: FormationCatalogueCode;
  formationTitle: string;
  formationSlug: string;
  effectifMin: number;
  effectifMax: number;
  /** Masquer le sélecteur inter/intra (ex. offre intra uniquement). */
  hideSelector?: boolean;
};

/**
 * Un seul bloc Inter / Intra par fiche — tarif identique des deux côtés.
 */
export async function TrainingFormationFormatSection({
  programmeRef,
  formationTitle,
  formationSlug,
  effectifMin,
  effectifMax,
  hideSelector = false,
}: Props) {
  if (hideSelector) return null;

  const formation = getFormationByCode(programmeRef)!;
  const tarifHt = formation.tarifParticipantHt ?? 0;
  const tarifLabel =
    tarifHt > 0 ? libelleTarifParticipantCatalogue(tarifHt) : 'Sur devis';
  const durationLabel =
    programmeRef === 'NIV-10' ? DEV_WEB_IA_DUREE_AFFICHAGE : libelleDureeFormation(formation);
  const effectifLabel = `${effectifMin} à ${effectifMax} participants`;
  const sessions = await getCataloguePublicSessionsForSlug(formationSlug);

  return (
    <section aria-labelledby={`${programmeRef}-format-modalites-title`} className="scroll-mt-24">
      <h2 id={`${programmeRef}-format-modalites-title`} className="sr-only">
        Modalités inter-entreprises et intra-entreprise
      </h2>
      <TrainingFormatTabs
        variant="catalogue"
        formationTitle={formationTitle}
        durationLabel={durationLabel}
        interPriceLabel={tarifLabel}
        intraPriceLabel={tarifLabel}
        effectifLabel={effectifLabel}
        showIntra
        hasPublishedSessions={sessions.length > 0}
      />
    </section>
  );
}
