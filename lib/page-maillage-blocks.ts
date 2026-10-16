/**
 * Blocs de maillage standardisés — associations éditoriales par fiche formation.
 * URLs via `LINKS` uniquement.
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import type { ContextualLinkCard } from '@/lib/contextual-internal-links';
import { getParcoursMetiersProfilsAvecFormations } from '@/lib/parcours-metiers-orientation';
import { LINKS } from '@/lib/internal-links';

export type PageMaillageBlock = {
  id: string;
  title: string;
  subtitle?: string;
  links: ContextualLinkCard[];
};

/** Ressources pratiques liées à une fiche catalogue Qualiopi (2–3 max). */
const FORMATION_PRACTICE_RESOURCES: Partial<
  Record<FormationCatalogueCode, readonly ContextualLinkCard[]>
> = {
  'NIV-01': [
    {
      href: LINKS.skillsChatgptBtp,
      title: 'Skills ChatGPT pour le BTP',
      description: 'Tutoriel PDF et modèles à importer sur vos dossiers.',
    },
    {
      href: LINKS.blogSecuriteDonneesChatgptBtp,
      title: 'Sécurité des données ChatGPT en entreprise BTP',
      description: 'RGPD, confidentialité chantier et règles internes.',
    },
  ],
  'NIV-02': [
    {
      href: LINKS.tutoAnalyseDce,
      title: 'Tutoriel — analyser un DCE avec l’IA',
      description: 'Méthode pas à pas sur CCTP, CCAP et pièces jointes.',
    },
    {
      href: LINKS.iaAnalyseDce,
      title: 'Guide analyse DCE BTP',
      description: 'Page métier — cas d’usage et bonnes pratiques.',
    },
    {
      href: LINKS.guideRepondreAoBtpOfc2026,
      title: 'Guide répondre aux AO BTP (2026)',
      description: 'Méthode en 5 étapes — PDF gratuit OFC.',
    },
  ],
  'NIV-03': [
    {
      href: LINKS.tutoCrChantier,
      title: 'Tutoriel — compte rendu de chantier',
      description: 'Skill PDF pour structurer vos CR avec l’IA.',
    },
    {
      href: LINKS.iaCompteRenduChantier,
      title: 'IA et comptes rendus de chantier',
      description: 'Usages terrain et limites de validation.',
    },
    {
      href: LINKS.guideConducteurTravauxIaBtp,
      title: 'Guide PDF conducteur de travaux',
      description: '6 tutos Claude AI — ressource gratuite.',
    },
  ],
  'NIV-04': [
    {
      href: LINKS.skillsClaudeBtp,
      title: 'Skills Claude pour le BTP',
      description: 'Pack ZIP et méthode d’import pour vos dossiers.',
    },
    {
      href: LINKS.claudeAiBtp,
      title: 'Guide Claude AI BTP',
      description: 'Interfaces, Projects, Cowork et prompts métier.',
    },
    {
      href: LINKS.guideClaudeBtpOfc,
      title: 'Guide Claude BTP OFC (PDF)',
      description: 'Projets, Skills et MCP — téléchargement gratuit.',
    },
  ],
  'NIV-05': [
    {
      href: LINKS.guideMaitriseOeuvreIa,
      title: 'Guide maîtrise d’œuvre × IA',
      description: 'CR, OS et réserves — PDF gratuit.',
    },
    {
      href: LINKS.tutoSkillOsOfc,
      title: 'Tutoriel — ordre de service',
      description: 'Skill PDF pour rédiger vos OS avec l’IA.',
    },
  ],
  'NIV-06': [
    {
      href: LINKS.tutoSkillChiffrageDevisOfc,
      title: 'Tutoriel — skill chiffrage de devis',
      description: 'Préparer un chiffrage assisté avec validation humaine.',
    },
    {
      href: LINKS.iaDevis,
      title: 'IA pour devis et chiffrage bâtiment',
      description: 'Page métier — méthode et formation associée.',
    },
  ],
  'NIV-08': [
    {
      href: LINKS.skillsClaudeBtp,
      title: 'Bibliothèque Skills Claude BTP',
      description: 'Modèles prêts à adapter à votre entreprise.',
    },
    {
      href: LINKS.bibliothequePromptsBtpParMetier,
      title: 'Prompts IA BTP par métier',
      description: 'Grille de prompts réutilisables sur le terrain.',
    },
  ],
  'NIV-10': [
    {
      href: LINKS.blogCharteIaBtp,
      title: 'Charte IA BTP — article et modèle',
      description: 'Gouvernance et déploiement responsable en entreprise.',
    },
    {
      href: LINKS.modeleCharteIaEntrepriseBtpDoc,
      title: 'Modèle Word — charte d’utilisation de l’IA',
      description: 'Document type à adapter à votre PME.',
    },
    {
      href: LINKS.parcoursDirigeantPmeBtp,
      title: 'Parcours Dirigeant de PME BTP',
      description: 'Pilotage, marges et plan de déploiement IA.',
    },
  ],
};

function dedupeLinks(links: ContextualLinkCard[]): ContextualLinkCard[] {
  const seen = new Set<string>();
  return links.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
}

/** Parcours métiers où la formation apparaît (profils publiés). */
export function getParcoursLinksForFormation(
  ref: FormationCatalogueCode,
  at: Date = new Date(),
): ContextualLinkCard[] {
  const profils = getParcoursMetiersProfilsAvecFormations(at);
  const links: ContextualLinkCard[] = [];

  for (const profil of profils) {
    if (!profil.formationCodes.includes(ref)) continue;
    if (profil.parcoursHref && profil.parcoursLabel) {
      links.push({
        href: profil.parcoursHref,
        title: profil.parcoursLabel,
        description: profil.besoins[0] ?? profil.titre,
      });
    }
  }

  return dedupeLinks(links).slice(0, 3);
}

export function getFormationPracticeResourceLinks(
  ref: FormationCatalogueCode,
): ContextualLinkCard[] {
  return [...(FORMATION_PRACTICE_RESOURCES[ref] ?? [])].slice(0, 3);
}

export function getFormationIntraTeamBlock(): PageMaillageBlock {
  return {
    id: 'besoin-equipe',
    title: 'Besoin d’une formation pour votre équipe ?',
    subtitle:
      'Intra-entreprise en Île-de-France : programme du catalogue ou parcours adapté à vos documents.',
    links: [
      {
        href: LINKS.formationIaIntraEntrepriseBtp,
        title: 'Formation IA intra-entreprise BTP',
        description: 'Même entreprise, vos cas réels, calendrier sur mesure.',
      },
      {
        href: LINKS.contact,
        title: 'Demander un devis ou un programme',
        description: 'Réponse sous 48 h ouvrées — sans engagement.',
      },
      {
        href: LINKS.financement,
        title: 'Financement OPCO Constructys',
        description: 'Prise en charge possible selon éligibilité — dossier et convention.',
      },
    ],
  };
}

export function buildFormationPageMaillageBlocks(
  ref: FormationCatalogueCode,
  at: Date = new Date(),
): PageMaillageBlock[] {
  const blocks: PageMaillageBlock[] = [];

  const parcours = getParcoursLinksForFormation(ref, at);
  if (parcours.length > 0) {
    blocks.push({
      id: 'parcours-metier',
      title: 'Dans quel parcours s’inscrit cette formation ?',
      subtitle: 'Parcours métiers 2027 — modules métier + usages IA encadrés.',
      links: parcours,
    });
  }

  const ressources = getFormationPracticeResourceLinks(ref);
  if (ressources.length > 0) {
    blocks.push({
      id: 'ressources-pratique',
      title: 'Ressources pour passer à la pratique',
      subtitle: 'Guides, tutos PDF et skills gratuits avant ou après la session.',
      links: ressources,
    });
  }

  blocks.push(getFormationIntraTeamBlock());

  return blocks;
}
