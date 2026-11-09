/**
 * 5 parcours métiers publics — catalogue 2027.
 * Les parcours référencent les codes modules ; contenus non dupliqués.
 */
import { PARCOURS_CATALOGUE_2027 } from './parcours-data';
import { prixParcoursDepuisModules } from './tarifs';
import { getModuleByCode } from './modules';
import type {
  CatalogueModule,
  CatalogueParcours,
  DisponibiliteCommerciale,
  ModuleCode,
  ModuleDureeHeures,
  ParcoursId,
  StatutEditorial,
} from './types';

export { PARCOURS_CATALOGUE_2027 };

export type ParcoursComputed = CatalogueParcours & {
  moduleCount: number;
  /** Somme des durées modules — seule source pour l’affichage durée parcours. */
  dureeHeures: number;
  /** @deprecated Ne plus afficher — conservé pour compatibilité interne (nombre de modules). */
  joursFormation: number;
  /** Somme HT des modules obligatoires — tarif parcours complet affiché (calcul référentiel). */
  prixInterHt: number;
  disponibilite: DisponibiliteCommerciale;
  statutEditorial: StatutEditorial;
  modulesCodes: readonly ModuleCode[];
};

function modulesPourEtapes(etapes: CatalogueParcours['etapes']): CatalogueModule[] {
  return etapes
    .map((e) => getModuleByCode(e.moduleCode))
    .filter((m): m is CatalogueModule => m != null);
}

function sommeDureeModules(modules: readonly Pick<CatalogueModule, 'dureeHeures'>[]): number {
  return modules.reduce((s, m) => s + m.dureeHeures, 0);
}

function enrichParcoursVariantes(parcours: CatalogueParcours): CatalogueParcours {
  let varianteOptionnelle = parcours.varianteOptionnelle;
  if (varianteOptionnelle) {
    const etapes = parcours.etapes.filter(
      (e) => !varianteOptionnelle!.modulesRetires.includes(e.moduleCode),
    );
    const modules = modulesPourEtapes(etapes);
    varianteOptionnelle = {
      ...varianteOptionnelle,
      dureeHeures: sommeDureeModules(modules),
      prixInterHt: prixParcoursDepuisModules(modules),
    };
  }
  let initiationComplementaire = parcours.initiationComplementaire;
  if (initiationComplementaire) {
    const ajout = getModuleByCode(initiationComplementaire.moduleAjoute);
    const modules = modulesPourEtapes(parcours.etapes);
    if (ajout) modules.push(ajout);
    initiationComplementaire = {
      ...initiationComplementaire,
      dureeHeures: sommeDureeModules(modules),
      prixInterHt: prixParcoursDepuisModules(modules),
    };
  }
  return { ...parcours, varianteOptionnelle, initiationComplementaire };
}

export function computeParcours(parcours: CatalogueParcours): ParcoursComputed {
  const enriched = enrichParcoursVariantes(parcours);
  const modules = modulesPourEtapes(enriched.etapes);
  const dureeHeures = sommeDureeModules(modules);
  const prixInterHt = prixParcoursDepuisModules(modules);

  const modStatuses = enriched.etapes.map((e) => getModuleByCode(e.moduleCode));
  const allValides = modStatuses.every((m) => m?.statutEditorial === 'programme-valide');

  const { mentionDisponibilite: _mentionOmit, ...sansMentionDispo } = enriched;

  return {
    ...sansMentionDispo,
    moduleCount: enriched.etapes.length,
    dureeHeures,
    joursFormation: enriched.etapes.length,
    prixInterHt,
    /** Règle commerciale parcours métiers — indépendante du statut « disponible » de certains modules NUM au catalogue. */
    disponibilite: 'ouverture-2027',
    statutEditorial: allValides ? 'programme-valide' : 'programme-en-preparation',
    modulesCodes: enriched.etapes.map((e) => e.moduleCode),
  };
}

export function getAllParcoursComputed(): ParcoursComputed[] {
  return PARCOURS_CATALOGUE_2027.map(computeParcours);
}

export function getParcoursById(id: ParcoursId | string): CatalogueParcours | undefined {
  return PARCOURS_CATALOGUE_2027.find((p) => p.id === id);
}

export function getParcoursBySlug(slug: string): CatalogueParcours | undefined {
  return PARCOURS_CATALOGUE_2027.find((p) => p.slug === slug);
}

export function getParcoursByMetier(metierId: string): CatalogueParcours | undefined {
  return PARCOURS_CATALOGUE_2027.find((p) => p.metierId === metierId);
}

/** Libellé durée parcours — heures uniquement (pas de conversion « jours »). */
export function libelleDureeParcoursHeures(dureeHeures: number): string {
  return `${dureeHeures} h`;
}

/** @deprecated Préférer `libelleDureeParcoursHeures`. */
export function libelleJoursFormation(_jours: number): string {
  return '';
}

export function assertCatalogueParcoursIntegrity(): {
  ok: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (PARCOURS_CATALOGUE_2027.length !== 5) {
    errors.push(`Attendu 5 parcours, trouvé ${PARCOURS_CATALOGUE_2027.length}`);
  }
  const expected: Record<string, { h: number; prix: number; modules: number }> = {
    'dirigeant-pme-btp': { h: 24, prix: 1020, modules: 6 },
    'charge-affaires-btp': { h: 24, prix: 1020, modules: 6 },
    'conducteur-de-travaux': { h: 24, prix: 1020, modules: 6 },
    'assistant-de-gestion-btp': { h: 24, prix: 970, modules: 6 },
    'referent-ia-btp': { h: 26, prix: 1130, modules: 4 },
  };
  for (const p of getAllParcoursComputed()) {
    const exp = expected[p.id];
    if (!exp) {
      errors.push(`Parcours inconnu dans les totaux attendus : ${p.id}`);
      continue;
    }
    if (p.dureeHeures !== exp.h) {
      errors.push(`${p.id}: durée ${p.dureeHeures} h (attendu ${exp.h})`);
    }
    if (p.prixInterHt !== exp.prix) {
      errors.push(`${p.id}: prix interne ${p.prixInterHt} (attendu ${exp.prix})`);
    }
    if (p.moduleCount !== exp.modules) {
      errors.push(`${p.id}: ${p.moduleCount} modules (attendu ${exp.modules})`);
    }
    if (p.id === 'referent-ia-btp') {
      const num04 = getModuleByCode('NUM-04');
      if (num04?.niveau !== 3 || num04.dureeHeures !== 14) {
        errors.push('Référent IA : NUM-04 doit être niveau 3 · 14 h');
      }
    }
    if (p.id === 'assistant-de-gestion-btp' && p.varianteOptionnelle) {
      const v = p.varianteOptionnelle;
      if (v.dureeHeures !== 20 || v.prixInterHt !== 850) {
        errors.push(`Assistant gestion variante: ${v.dureeHeures}h / ${v.prixInterHt}€ (attendu 20h / 850€)`);
      }
    }
    if (p.id === 'referent-ia-btp' && p.initiationComplementaire) {
      const i = p.initiationComplementaire;
      if (i.dureeHeures !== 30 || i.prixInterHt !== 1250) {
        errors.push(`Référent initiation: ${i.dureeHeures}h / ${i.prixInterHt}€ (attendu 30h / 1250€)`);
      }
    }
    for (const e of p.etapes) {
      if (!getModuleByCode(e.moduleCode)) {
        errors.push(`${p.id}: module manquant ${e.moduleCode}`);
      }
    }
  }
  return { ok: errors.length === 0, errors };
}

export type { ModuleDureeHeures };
