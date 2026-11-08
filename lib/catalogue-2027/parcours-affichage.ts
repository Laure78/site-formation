/**
 * Libellés d’affichage parcours métiers — durées et tarifs au module uniquement.
 */
import { libellePrixParticipantInter, type CatalogueModule } from '@/data/catalogue-2027';
import { NIVEAU_LIBELLE } from '@/data/catalogue-2027/module-niveaux';
import type { ParcoursComputed } from '@/data/catalogue-2027/parcours';

export const PARCOURS_TARIFS_PAR_MODULE =
  'Tarifs affichés par module' as const;

export const PARCOURS_MODULARITE_LIBELLE =
  'Parcours complet ou modules à la carte' as const;

export const PARCOURS_OUVERTURE_2027 = 'Ouverture 2027' as const;

/** « 170 € HT / participant » — une seule fois HT. */
export function libellePrixModuleInter(mod: Pick<CatalogueModule, 'prixInterHt'>): string {
  return libellePrixParticipantInter(mod.prixInterHt);
}

export function libelleNiveauModule(mod: Pick<CatalogueModule, 'niveau'>): string {
  return NIVEAU_LIBELLE[mod.niveau];
}

export function libelleDureeModuleHeures(mod: Pick<CatalogueModule, 'dureeHeures'>): string {
  return `${mod.dureeHeures} h`;
}

export function texteVarianteSansPrix(parcours: ParcoursComputed): string | null {
  if (parcours.varianteOptionnelle) {
    const codes = parcours.varianteOptionnelle.modulesRetires.join(', ');
    return `Après positionnement, le ou les modules suivants peuvent être retirés du parcours : ${codes}. Chaque module reste facturé à son tarif inter s’il est conservé ou suivi séparément.`;
  }
  return null;
}

export function texteInitiationSansPrix(parcours: ParcoursComputed): string | null {
  if (parcours.initiationComplementaire) {
    const code = parcours.initiationComplementaire.moduleAjoute;
    return `Initiation complémentaire éventuelle : module ${code} en sus — facturé au tarif du module (${code}), sans forfait parcours.`;
  }
  return null;
}
