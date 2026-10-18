import { getFormationByCode, isFormationSurDevis, libellePrixSessionHt } from '@/data/formations';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import type { CatalogueComplementaryEntry } from '@/lib/catalogue-thematiques-btp';
import {
  formatCataloguePublishFromLabel,
  getFormationPublishFromIso,
} from '@/lib/catalogue-formation-schedule';
import {
  DEV_WEB_IA_DUREE_COURTE,
  DEV_WEB_IA_PRIX_LANCEMENT_LABEL,
  TARIF_INTER_DEV_WEB_IA_HT,
} from '@/lib/formation-developpement-web-ia-content';
import { libelleTarifParcoursCatalogue } from '@/lib/formations-catalogue-display';
import { formatTarifHt } from '@/lib/tarifs-sessions';

export type CatalogueDisponibiliteBadge = {
  label: string;
  variant: 'available' | 'soon' | 'demand';
};

export function getCatalogueEntryDisponibiliteBadge(
  ref: string,
  opts?: { upcoming?: boolean },
): CatalogueDisponibiliteBadge {
  if (opts?.upcoming) {
    const from = getFormationPublishFromIso(ref);
    const label = from
      ? `Ouverture prévue — ${formatCataloguePublishFromLabel(from)}`
      : 'Ouverture prochaine';
    return { label, variant: 'soon' };
  }

  const f = getFormationByCode(ref);
  if (f && isFormationSurDevis(f)) {
    return { label: 'Sur demande', variant: 'demand' };
  }

  return { label: 'Disponible', variant: 'available' };
}

export function getComplementaryDisponibiliteBadge(
  item: CatalogueComplementaryEntry,
): CatalogueDisponibiliteBadge {
  const lower = item.disponibiliteLabel.toLowerCase();
  if (lower.includes('sur mesure') || lower.includes('contacter')) {
    return { label: 'Sur demande', variant: 'demand' };
  }
  return { label: item.disponibiliteLabel, variant: 'demand' };
}

export function catalogueEntryTarifLines(ref: string): string | null {
  const f = getFormationByCode(ref);
  if (!f) return null;

  if (ref === 'NIV-10') {
    return `${DEV_WEB_IA_PRIX_LANCEMENT_LABEL} · ${formatTarifHt(TARIF_INTER_DEV_WEB_IA_HT)} € HT / participant`;
  }

  if (f.tarifParcoursAppMetier) {
    const parcours = libelleTarifParcoursCatalogue(f);
    const participant = f.tarifParticipantHt
      ? libellePrixSessionHt(f)
      : null;
    if (participant && parcours !== participant) {
      return `${participant} · ${parcours}`;
    }
    return parcours;
  }

  const participant = libellePrixSessionHt(f);
  if (participant === 'Sur devis') return participant;
  return participant;
}

export function catalogueEntryDuree(entry: FormationCatalogueEntry): string {
  if (entry.ref === 'NIV-10') return DEV_WEB_IA_DUREE_COURTE;
  return entry.duree;
}
