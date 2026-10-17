/**
 * Page d’orientation /parcours-metiers — profils métiers → formations publiées.
 */
import { formationHref, type Formation } from '@/data/formations';
import { LINKS } from '@/lib/internal-links';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';

export type ParcoursMetiersProfil = {
  id: string;
  titre: string;
  besoins: readonly string[];
  /** Codes NIV du catalogue — filtrés sur les fiches publiées. */
  formationCodes: readonly string[];
  parcoursLabel?: string;
  parcoursHref?: string;
};

const PROFILS: readonly ParcoursMetiersProfil[] = [
  {
    id: 'dirigeants-pme',
    titre: 'Dirigeants et responsables de PME BTP',
    besoins: [
      'Piloter les priorités IA dans l’entreprise',
      'Contrôler un devis avant envoi',
      'Structurer les relances clients et fournisseurs',
    ],
    formationCodes: ['NIV-01', 'NIV-04', 'NIV-10'],
    parcoursLabel: 'Parcours Dirigeant de PME BTP',
    parcoursHref: LINKS.parcoursDirigeantPmeBtp,
  },
  {
    id: 'conducteurs-chantier',
    titre: 'Conducteurs de travaux et responsables de chantier',
    besoins: [
      'Rédiger un compte rendu de chantier',
      'Organiser les actions qui / quoi / quand',
      'Synthétiser un CCTP ou un lot technique',
    ],
    formationCodes: ['NIV-01', 'NIV-03', 'NIV-04'],
    parcoursLabel: 'Parcours Conducteur de travaux',
    parcoursHref: LINKS.parcoursConducteurDeTravaux,
  },
  {
    id: 'charges-affaires',
    titre: 'Chargés d’affaires et études de prix',
    besoins: [
      'Analyser un DCE et repérer les pièces manquantes',
      'Préparer un devis et une trame de mémoire technique',
      'Structurer le chiffrage et les questions à la MOE',
    ],
    formationCodes: ['NIV-01', 'NIV-02'],
    parcoursLabel: 'Parcours Chargé d’affaires BTP',
    parcoursHref: LINKS.parcoursChargeAffairesBtp,
  },
  {
    id: 'maitrise-oeuvre',
    titre: 'Bureaux d’études et maîtrise d’œuvre',
    besoins: [
      'Structurer un mémoire technique',
      'Préparer les comptes rendus et le suivi des réserves',
      'Analyser les exigences d’un CCTP',
    ],
    formationCodes: ['NIV-02', 'NIV-05', 'NIV-04'],
    parcoursLabel: 'Parcours maîtrise d’œuvre (modules MOE)',
    parcoursHref: LINKS.formationIaMaitriseOeuvre,
  },
  {
    id: 'admin-commercial',
    titre: 'Équipes administratives et commerciales',
    besoins: [
      'Rédiger courriers et relances',
      'Gagner du temps sur l’administratif courant',
      'Utiliser ChatGPT sur des modèles fiables',
    ],
    formationCodes: ['NIV-01', 'NIV-04'],
    parcoursLabel: 'Parcours Assistant de gestion BTP',
    parcoursHref: LINKS.parcoursAssistantDeGestionBtp,
  },
];

export type ParcoursMetiersProfilAvecFormations = ParcoursMetiersProfil & {
  formations: readonly (Pick<Formation, 'code' | 'titre' | 'duree' | 'public' | 'promesse'> & {
    href: string;
  })[];
};

export function getParcoursMetiersProfilsAvecFormations(
  at: Date = new Date(),
): ParcoursMetiersProfilAvecFormations[] {
  const published = new Map(getPublishedFormations(at).map((f) => [f.code, f]));

  return PROFILS.map((profil) => {
    const formations = profil.formationCodes
      .map((code) => published.get(code))
      .filter((f): f is Formation => Boolean(f))
      .map((f) => ({
        code: f.code,
        titre: f.titre,
        duree: f.duree,
        public: f.public,
        promesse: f.promesse,
        href: formationHref(f),
      }));

    return { ...profil, formations };
  }).filter((p) => p.formations.length > 0 || p.parcoursHref);
}

export const PARCOURS_METIERS_PAGE = {
  h1: 'Parcours de formation IA par métier BTP',
  intro:
    'Choisissez votre métier et découvrez les formations IA adaptées à vos missions.',
} as const;
