/**
 * Blocs de maillage standardisés — associations éditoriales par fiche formation.
 * URLs via `LINKS` uniquement.
 */
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import type { ContextualLinkCard } from '@/lib/contextual-internal-links';
import { getModuleByCode, type ParcoursComputed } from '@/data/catalogue-2027';
import type { ParcoursId } from '@/data/catalogue-2027/types';
import { buildCatalogueModulesHref } from '@/lib/catalogue-filter-url';
import { getParcoursMetiersProfilsAvecFormations } from '@/lib/parcours-metiers-orientation';
import { isParcoursMetiers2027Visible } from '@/lib/parcours-metiers-2027-visibility';
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
  if (!isParcoursMetiers2027Visible()) return [];
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

function getFormationCatalogueNavigationBlock(): PageMaillageBlock {
  const links: ContextualLinkCard[] = [
    {
      href: LINKS.formations,
      title: 'Catalogue complet des formations IA BTP',
      description: 'Parcours, niveaux IA et modules par domaine.',
    },
  ];
  if (isParcoursMetiers2027Visible()) {
    links.push({
      href: LINKS.parcoursMetiers,
      title: 'Parcours métiers — choisir selon ma fonction',
      description: '7 parcours progressifs — dirigeant, conducteur, chargé d’affaires…',
    });
  }
  return {
    id: 'catalogue-navigation',
    title: 'Explorer le catalogue',
    subtitle: isParcoursMetiers2027Visible()
      ? 'Comparer les parcours métiers ou revenir à la liste des programmes Qualiopi.'
      : 'Revenir à la liste des programmes Qualiopi.',
    links,
  };
}

export function buildFormationPageMaillageBlocks(
  ref: FormationCatalogueCode,
  at: Date = new Date(),
): PageMaillageBlock[] {
  const blocks: PageMaillageBlock[] = [getFormationCatalogueNavigationBlock()];

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

/** Ressources gratuites associées à un parcours métier (associations éditoriales). */
const PARCOURS_PRACTICE_RESOURCES: Partial<
  Record<ParcoursId, readonly ContextualLinkCard[]>
> = {
  'dirigeant-pme-btp': [
    {
      href: LINKS.blogCharteIaBtp,
      title: 'Charte IA BTP — article et modèle Word',
      description: 'Gouvernance et déploiement responsable en PME.',
    },
    {
      href: LINKS.modeleCharteIaEntrepriseBtpDoc,
      title: 'Modèle Word — charte d’utilisation de l’IA',
      description: 'Document type à adapter à votre entreprise.',
    },
  ],
  'charge-affaires-btp': [
    {
      href: LINKS.iaAnalyseDce,
      title: 'Analyser un DCE avec l’IA',
      description: 'Méthode CCTP, CCAP, RC — page usage BTP.',
    },
    {
      href: LINKS.tutoAnalyseDce,
      title: 'Tutoriel PDF — analyse DCE',
      description: 'Pas à pas avant la session appels d’offres.',
    },
    {
      href: LINKS.iaMemoireTechnique,
      title: 'Rédiger un mémoire technique avec l’IA',
      description: 'Enchaînement naturel après l’analyse DCE.',
    },
  ],
  'conducteur-de-travaux': [
    {
      href: LINKS.formationConduiteTravauxSuiviChantier,
      title: 'Programme catalogue conduite de travaux (7 h)',
      description: 'Fiche Qualiopi NIV-03 — CR, CCTP, skills Claude, DOE.',
    },
    {
      href: LINKS.formationConducteurTravaux,
      title: 'Formation IA conducteur de travaux — page métier',
      description: 'Usages, prompts et public — distinct du parcours multi-modules.',
    },
    {
      href: LINKS.tutoCrChantier,
      title: 'Tutoriel — compte rendu de chantier',
      description: 'Skill PDF pour structurer vos CR avant la session.',
    },
  ],
  'chef-de-chantier': [
    {
      href: LINKS.tutoCrChantier,
      title: 'Tutoriel — compte rendu de chantier',
      description: 'Modèle réutilisable sur le terrain.',
    },
    {
      href: LINKS.guideChefDeChantierOfc,
      title: 'Guide chef de chantier × IA',
      description: 'PDF OFC — organisation et consignes.',
    },
  ],
  'chef-dequipe': [
    {
      href: LINKS.tutoCrChantier,
      title: 'Tutoriel — compte rendu de chantier',
      description: 'Structurer vos CR et consignes d’équipe avec l’IA.',
    },
    {
      href: LINKS.iaCompteRenduChantier,
      title: 'IA et comptes rendus de chantier',
      description: 'Méthode terrain — limites et validation humaine.',
    },
    {
      href: LINKS.guideChefDeChantierOfc,
      title: 'Guide chef de chantier × IA',
      description: 'PDF OFC — organisation et coordination.',
    },
  ],
  'assistant-de-gestion-btp': [
    {
      href: LINKS.formationIaAssistanteBtp,
      title: 'Formation IA assistante administrative BTP',
      description: 'Courriers, facturation, relances — page métier.',
    },
    {
      href: LINKS.guideRhBtpIaOfc,
      title: 'Guide RH BTP × IA',
      description: 'PDF gratuit — recrutement, contrats et communication.',
    },
    {
      href: LINKS.tutoSkillChiffrageDevisOfc,
      title: 'Tutoriel — skill chiffrage de devis',
      description: 'Préparer un chiffrage assisté avec validation humaine.',
    },
  ],
  'referent-ia-btp': [
    {
      href: LINKS.skillsClaudeBtp,
      title: 'Skills Claude pour le BTP',
      description: 'Pack ZIP et méthode d’import.',
    },
    {
      href: LINKS.blogCharteIaBtp,
      title: 'Charte IA BTP — article et modèle',
      description: 'Encadrer les usages avant le déploiement.',
    },
    {
      href: LINKS.claudeAiBtp,
      title: 'Guide Claude AI BTP',
      description: 'Projects, Cowork et prompts métier.',
    },
  ],
};

function getParcoursModuleFormationLinks(parcours: ParcoursComputed): ContextualLinkCard[] {
  const links: ContextualLinkCard[] = [];
  const seen = new Set<string>();

  for (const etape of parcours.etapes) {
    const mod = getModuleByCode(etape.moduleCode);
    if (!mod?.href || seen.has(mod.href)) continue;
    seen.add(mod.href);
    links.push({
      href: mod.href,
      title: mod.titre,
      description:
        mod.objectifPrincipal.length > 88
          ? `${mod.objectifPrincipal.slice(0, 86)}…`
          : mod.objectifPrincipal,
    });
  }

  return links.slice(0, 3);
}

export function buildParcoursPageMaillageBlocks(parcours: ParcoursComputed): PageMaillageBlock[] {
  const blocks: PageMaillageBlock[] = [];

  const programmes = getParcoursModuleFormationLinks(parcours);
  if (programmes.length > 0) {
    blocks.push({
      id: 'parcours-programmes',
      title: 'Programmes qui composent ce parcours',
      subtitle: 'Fiches catalogue Qualiopi — modules référencés dans la frise ci-dessus.',
      links: programmes,
    });
  }

  const ressources = [...(PARCOURS_PRACTICE_RESOURCES[parcours.id] ?? [])].slice(0, 3);
  if (ressources.length > 0) {
    blocks.push({
      id: 'parcours-ressources',
      title: 'Ressources pour passer à la pratique',
      subtitle: 'Guides, tutos PDF et pages méthode avant ou après la session.',
      links: ressources,
    });
  }

  blocks.push({
    id: 'parcours-catalogue-retour',
    title: 'Poursuivre votre lecture',
    subtitle: 'Retour au catalogue ou modules filtrés par métier.',
    links: [
      {
        href: LINKS.parcoursMetiers,
        title: 'Comparer les parcours métiers',
        description: '7 parcours — choisir selon votre fonction BTP.',
      },
      {
        href: buildCatalogueModulesHref({ metier: parcours.metierId }),
        title: 'Modules catalogue pour ce métier',
        description: 'Filtre métier pré-appliqué — 35 modules par domaine.',
      },
      {
        href: LINKS.formations,
        title: 'Catalogue complet des formations',
        description: 'Parcours, niveaux IA et modules par domaine.',
      },
    ],
  });

  blocks.push(getFormationIntraTeamBlock());

  return blocks;
}
