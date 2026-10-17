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
import { libelleDisponibilite } from '@/lib/catalogue-2027/search-modules';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';
import {
  FORMATIONS_NIVEAUX_IA,
  formationNiveauBadge,
} from '@/lib/formations-niveaux-ia';

/** Ancre section offre — cible du CTA principal du hero. */
export const ACCUEIL_OFFRE_SECTION_ID = 'formations-parcours' as const;

export type AccueilParcoursEtapeCard = {
  moduleCode: string;
  titre: string;
};

export type AccueilParcoursOffreCard = {
  id: ParcoursId;
  titre: string;
  /** Titre court affiché sur l’accueil. */
  titreCarte: string;
  benefice: string;
  publicCible: string;
  objectif: string;
  dureeLabel: string | null;
  disponibiliteLabel: string;
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
> = Object.fromEntries(
  FORMATIONS_NIVEAUX_IA.map((n) => [
    n.niveau,
    {
      id: `formations-niveau-${n.niveau}`,
      title: n.labelComplet,
      badge: formationNiveauBadge(n.niveau),
    },
  ]),
) as Record<FormationNiveau, { id: string; title: string; badge: string }>;

/** Parcours mis en avant sur l’accueil (sélection courte). */
const ACCUEIL_PARCOURS_FEATURED_IDS: readonly ParcoursId[] = [
  'dirigeant-pme-btp',
  'charge-affaires-btp',
  'conducteur-de-travaux',
  'assistant-de-gestion-btp',
];

/** Libellés cartes accueil (métier lisible). */
const ACCUEIL_PARCOURS_TITRE_CARTE: Partial<Record<ParcoursId, string>> = {
  'dirigeant-pme-btp': 'Direction · Dirigeant de PME BTP',
  'charge-affaires-btp': 'Chargé d’affaires',
  'conducteur-de-travaux': 'Conducteur de travaux',
  'assistant-de-gestion-btp': 'Fonctions administratives et assistance travaux',
};

/** Parcours du catalogue 2027 — ordre pédagogique (source PARCOURS_CATALOGUE_2027). */
export function getAccueilParcoursOffre(
  opts?: { featuredOnly?: boolean },
): readonly AccueilParcoursOffreCard[] {
  const list = getAllParcoursComputed().filter((p) =>
    opts?.featuredOnly ? ACCUEIL_PARCOURS_FEATURED_IDS.includes(p.id) : true,
  );
  return list.map((p) => {
    const dureeLabel =
      p.dureeHeures > 0
        ? `${p.dureeHeures} h · ${libelleJoursFormation(p.joursFormation)}`
        : null;

    return {
      id: p.id,
      titre: p.titre,
      titreCarte: ACCUEIL_PARCOURS_TITRE_CARTE[p.id] ?? p.titre,
      benefice: p.benefice,
      publicCible: p.publicCible,
      objectif: p.objectif,
      dureeLabel,
      disponibiliteLabel: libelleDisponibilite(p.disponibilite),
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
        niveauLabel: meta.title,
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
