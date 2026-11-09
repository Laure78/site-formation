/**
 * Libellés d’affichage parcours métiers — tarif parcours (somme modules obligatoires) + tarifs unitaires.
 */
import {
  libellePrixParticipantInter,
  type CatalogueModule,
  type ModuleCode,
} from '@/data/catalogue-2027';
import { NIVEAU_LIBELLE } from '@/data/catalogue-2027/module-niveaux';
import type { ParcoursComputed } from '@/data/catalogue-2027/parcours';
import type { CatalogueParcours } from '@/data/catalogue-2027/types';
import { PARCOURS_DISPONIBILITE_LIBELLE } from '@/lib/catalogue-2027/parcours-commercial-copy';

/** Mention légale sous le tarif parcours complet (grille hero / fiche). */
export const PARCOURS_TARIF_INTER_CALCULE_MENTION =
  'Tarif inter-entreprises calculé à partir des modules du parcours.' as const;

/** Rappel sur les cartes module : chaque module conserve son prix catalogue. */
export const PARCOURS_TARIFS_UNITAIRES_RAPPEL =
  'Chaque module affiche son tarif inter HT / participant.' as const;

/** @deprecated Préférer libelleTarificationParcoursHero — conservé pour hub explorateur. */
export const PARCOURS_TARIFS_PAR_MODULE = PARCOURS_TARIFS_UNITAIRES_RAPPEL;

export const PARCOURS_MODULARITE_LIBELLE =
  'Parcours complet ou modules à la carte' as const;

/** @deprecated Préférer PARCOURS_DISPONIBILITE_LIBELLE — alias historique. */
export const PARCOURS_OUVERTURE_2027 = PARCOURS_DISPONIBILITE_LIBELLE;

export { PARCOURS_DISPONIBILITE_LIBELLE } from '@/lib/catalogue-2027/parcours-commercial-copy';

/** « 170 € HT / participant » — une seule fois HT. */
export function libellePrixModuleInter(mod: Pick<CatalogueModule, 'prixInterHt'>): string {
  return libellePrixParticipantInter(mod.prixInterHt);
}

/** Tarif inter du parcours complet (somme des modules obligatoires du référentiel). */
export function libellePrixParcoursCompletInter(
  parcours: Pick<ParcoursComputed, 'prixInterHt'>,
): string {
  return libellePrixParticipantInter(parcours.prixInterHt);
}

/** Libellé court pour grilles (modules + durée + tarif calculé). */
export function libelleTarificationParcoursHero(
  parcours: Pick<ParcoursComputed, 'prixInterHt'>,
): string {
  return libellePrixParcoursCompletInter(parcours);
}

export function moduleEstRetirableApresPositionnement(
  parcours: Pick<CatalogueParcours, 'varianteOptionnelle'>,
  code: ModuleCode,
): boolean {
  const retraits = parcours.varianteOptionnelle?.modulesRetires ?? [];
  return retraits.includes(code);
}

export function libelleNiveauModule(mod: Pick<CatalogueModule, 'niveau'>): string {
  return NIVEAU_LIBELLE[mod.niveau];
}

export function libelleDureeModuleHeures(mod: Pick<CatalogueModule, 'dureeHeures'>): string {
  return `${mod.dureeHeures} h`;
}

export function texteVarianteSansPrix(parcours: ParcoursComputed): string | null {
  if (parcours.varianteOptionnelle) {
    const v = parcours.varianteOptionnelle;
    const codes = v.modulesRetires.join(', ');
    const prixBase = libellePrixParcoursCompletInter(parcours);
    const prixSans =
      v.prixInterHt != null ? libellePrixParticipantInter(v.prixInterHt) : null;
    const detailPrix =
      prixSans != null
        ? ` Tarif parcours avec ces modules : ${prixBase}. Après retrait : ${prixSans} (hors modules retirés).`
        : '';
    return `Après positionnement, le ou les modules suivants peuvent être retirés du parcours : ${codes}.${detailPrix} Chaque module conservé reste facturé à son tarif inter unitaire.`;
  }
  return null;
}

export function texteInitiationSansPrix(parcours: ParcoursComputed): string | null {
  if (parcours.initiationComplementaire) {
    const i = parcours.initiationComplementaire;
    const code = i.moduleAjoute;
    const prixBase = libellePrixParcoursCompletInter(parcours);
    const prixAvec =
      i.prixInterHt != null ? libellePrixParticipantInter(i.prixInterHt) : null;
    const detailPrix =
      prixAvec != null
        ? ` Tarif parcours de base : ${prixBase}. Avec ${code} en complément : ${prixAvec}.`
        : '';
    return `Initiation complémentaire éventuelle : module ${code} (optionnel, non inclus dans le tarif de base).${detailPrix} Facturé au tarif unitaire du module si retenu.`;
  }
  return null;
}
