/**
 * Offre accueil — parcours métiers + formations publiées.
 * Sources uniques : data/catalogue-2027 + data/formations (via getPublishedFormations).
 */
import {
  getAllParcoursComputed,
  getModuleByCode,
  libelleJoursFormation,
  type ParcoursId,
} from '@/data/catalogue-2027';
import { formationHref, type FormationNiveau } from '@/data/formations';
import { parcoursHref } from '@/lib/catalogue-2027/parcours-href';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';

/** Ancre section offre — cible du CTA principal du hero. */
export const ACCUEIL_OFFRE_SECTION_ID = 'formations-parcours' as const;

export type AccueilParcoursEtapeCard = {
  moduleCode: string;
  titre: string;
};

export type AccueilParcoursOffreCard = {
  id: ParcoursId;
  titre: string;
  publicCible: string;
  objectif: string;
  dureeLabel: string | null;
  href: string;
  etapes: readonly AccueilParcoursEtapeCard[];
};

export type AccueilFormationOffreCard = {
  code: string;
  titre: string;
  niveauLabel: string;
  niveauBadge: string;
  niveau: FormationNiveau;
  duree: string;
  benefice: string;
  href: string;
  anchorId: string;
};

export type AccueilNiveauFormationGroup = {
  niveau: FormationNiveau;
  id: string;
  title: string;
  formations: readonly AccueilFormationOffreCard[];
};

const NIVEAU_GROUP_META: Record<
  FormationNiveau,
  { id: string; title: string; badge: string }
> = {
  1: {
    id: 'formations-niveau-1',
    title: 'Niveau 1 — Initiation',
    badge: 'Niveau 1 · Initiation',
  },
  2: {
    id: 'formations-niveau-2',
    title: 'Niveau 2 — Perfectionnement',
    badge: 'Niveau 2 · Perfectionnement',
  },
  3: {
    id: 'formations-niveau-3',
    title: 'Niveau 3 — Création et déploiement',
    badge: 'Niveau 3 · Création et déploiement',
  },
};

function niveauLabel(niveau: FormationNiveau): string {
  return `Niveau ${niveau}`;
}

/** Parcours du catalogue 2027 — ordre pédagogique (source PARCOURS_CATALOGUE_2027). */
export function getAccueilParcoursOffre(): readonly AccueilParcoursOffreCard[] {
  return getAllParcoursComputed().map((p) => {
    const dureeLabel =
      p.dureeHeures > 0
        ? `${p.dureeHeures} h · ${libelleJoursFormation(p.joursFormation)}`
        : null;

    return {
      id: p.id,
      titre: p.titre,
      publicCible: p.publicCible,
      objectif: p.objectif,
      dureeLabel,
      href: parcoursHref(p.id),
      etapes: p.etapes.map((e) => ({
        moduleCode: e.moduleCode,
        titre: getModuleByCode(e.moduleCode)?.titre ?? e.moduleCode,
      })),
    };
  });
}

/** Formations publiées du catalogue NIV — hors archivées / non encore publiées. */
export function getAccueilFormationsOffre(): readonly AccueilFormationOffreCard[] {
  return getPublishedFormations()
    .map((f) => {
      const meta = NIVEAU_GROUP_META[f.niveau];
      return {
        code: f.code,
        titre: f.titre,
        niveauLabel: niveauLabel(f.niveau),
        niveauBadge: meta.badge,
        niveau: f.niveau,
        duree: f.duree,
        benefice: f.promesse,
        href: formationHref(f),
        anchorId: `accueil-formation-${f.code}`,
      };
    })
    .sort((a, b) => {
      if (a.niveau !== b.niveau) return a.niveau - b.niveau;
      return a.code.localeCompare(b.code, 'fr');
    });
}

/** Formations regroupées par niveau pédagogique (1 → 2 → 3). */
export function getAccueilFormationsParNiveau(): readonly AccueilNiveauFormationGroup[] {
  const all = getAccueilFormationsOffre();
  const niveaux: FormationNiveau[] = [1, 2, 3];
  return niveaux
    .map((niveau) => {
      const meta = NIVEAU_GROUP_META[niveau];
      return {
        niveau,
        id: meta.id,
        title: meta.title,
        formations: all.filter((f) => f.niveau === niveau),
      };
    })
    .filter((g) => g.formations.length > 0);
}
