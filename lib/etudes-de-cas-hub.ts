import { LINKS } from '@/lib/internal-links';
import { CSFE_NOM_LIBRE } from '@/lib/csfe';

/**
 * Hub `/etudes-de-cas` — faits repris des pages études (ne pas inventer de chiffres).
 * Sources : `app/etudes-de-cas/ffb-csfe/page.tsx`, `app/etudes-de-cas/compte-rendu-vocal-chantier-btp/page.tsx`.
 */
export const ETUDES_DE_CAS_HUB_INTRO =
  'Les études de cas de Laure Olivié, formatrice IA pour le BTP (OFC Création d’Entreprise, organisme certifié Qualiopi), portent sur des sessions en présentiel en Île-de-France. Deux retours sont publiés : le réseau FFB (Grand Paris, Île-de-France Est et Ouest) avec la Chambre Syndicale Française de l’étanchéité (CSFE), et une PME de gros œuvre de 18 salariés, logements collectifs en Île-de-France. L’IA accélère la mise en forme des mémoires, CCTP, devis et comptes rendus ; la relecture humaine reste obligatoire. Pour FFB et CSFE, cinq modules sont décrits ; l’ordre de grandeur constaté après mise en pratique est de 3 à 5 heures par semaine récupérables sur l’administratif. Pour le compte rendu vocal, la rédaction observée passe de 45 à 60 minutes à 15 à 20 minutes après relecture, souvent diffusée le jour même contre 24 à 48 heures auparavant. Ces durées sont des ordres de grandeur, pas une garantie de résultat.';

export type EtudeDeCasHubCard = {
  href: typeof LINKS.etudesCasFfbCsfe | typeof LINKS.etudesCasCrVocalChantier;
  title: string;
  contexte: string;
  probleme: string;
  resultatChiffre: string;
  linkLabel: string;
};

export const ETUDES_DE_CAS_HUB_CARDS: readonly EtudeDeCasHubCard[] = [
  {
    href: LINKS.etudesCasFfbCsfe,
    title: 'FFB et CSFE — étanchéité',
    contexte: `Interventions auprès du réseau FFB (Grand Paris, Île-de-France Est et Ouest) et de la ${CSFE_NOM_LIBRE}, sessions courtes en présentiel.`,
    probleme:
      'Outiller les professionnels du bâtiment pour l’IA sur les tâches chronophages (mémoires, dossiers marchés, suivi administratif) sans remplacer le métier ni la validation humaine.',
    resultatChiffre:
      'Cinq modules ; ordre de grandeur : 3 à 5 h par semaine récupérables sur l’administratif après mise en pratique (pas une garantie de résultat).',
    linkLabel: 'Étude de cas FFB et CSFE — formation IA pour le BTP',
  },
  {
    href: LINKS.etudesCasCrVocalChantier,
    title: 'Compte rendu vocal de chantier',
    contexte:
      'PME gros œuvre, 18 salariés, chantiers de logements collectifs en Île-de-France ; 2 à 4 réunions de chantier par semaine.',
    probleme:
      'CR souvent rédigés le soir ou le week-end, avec un retard de diffusion aux équipes et à la maîtrise d’œuvre.',
    resultatChiffre:
      'Rédaction observée : 45–60 min → 15–20 min après relecture ; CR diffusé le jour de la réunion dans la majorité des cas (contre 24–48 h auparavant).',
    linkLabel: 'Étude de cas — compte rendu vocal de chantier avec l’IA',
  },
];
