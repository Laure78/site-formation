/**
 * Contenu page `/skills-claude-btp` — Skills Claude gratuits + méthode d’import.
 * Intention distincte : exemples téléchargeables + tuto d’usage (pas la fiche formation NIV-04).
 */

import {
  contentUpdatedAtToSchemaIso,
  type ContentUpdatedDate,
} from '@/lib/content-updated-at';
import { getFAQSchema } from '@/lib/seo';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import {
  SITE,
  siteSchemaOrganizationId,
  siteSchemaPersonId,
} from '@/lib/site-config';

/** Date de fraîcheur éditoriale — UI « Mis à jour le … » + JSON-LD `dateModified`. */
export const SKILLS_CLAUDE_BTP_CONTENT_UPDATED_AT = '2026-11-02' as const satisfies ContentUpdatedDate;

export const SKILLS_CLAUDE_BTP_LICENSE_URL =
  'https://creativecommons.org/licenses/by/4.0/' as const;

export const SKILLS_CLAUDE_BTP_LICENSE_MENTION =
  'Skills diffusés sous licence CC BY 4.0 : libres d’utilisation et de modification, en citant Laure Olivié — OFC Création d’Entreprise.' as const;

/** Bloc « En bref » — 2–3 phrases factuelles sous le H1. */
export const SKILLS_CLAUDE_BTP_EN_BREF =
  'Six skills Claude gratuits pour le BTP, créés par Laure Olivié (OFC Création d’Entreprise, organisme certifié Qualiopi), téléchargeables en .zip. Chaque archive contient un SKILL.md prêt à importer sur claude.ai. Licence Creative Commons Attribution 4.0 (CC BY 4.0).';

export const SKILLS_CLAUDE_BTP_META = {
  title: 'Skills Claude BTP : créer ses assistants métier | Laure Olivié',
  description:
    'Créez des Skills Claude pour vos tâches BTP : analyse de CCTP, comptes rendus et courriers. Découvrez des exemples et une méthode pratique.',
  h1: 'Skills Claude pour le BTP : créez vos assistants métier',
  eyebrow: 'Ressources gratuites · Skills Claude BTP',
} as const;

export const SKILLS_CLAUDE_BTP_INTRO = {
  definition:
    'Un Skill Claude BTP est un mode d’emploi réutilisable (fichier SKILL.md, souvent livré en .zip) que Claude charge pour exécuter une tâche métier précise — analyser un CCTP, extraire des actions d’un compte rendu, contrôler un devis — sans tout réécrire à chaque fois.',
  contexte:
    'Les six exemples ci-dessous sont issus d’une session « Créer des assistants IA avec Claude » animée le 9 octobre 2026 dans une entreprise de gros œuvre de l’Essonne (dirigeant, directeur technique, conducteurs de travaux, assistante, comptable, chargé d’études de prix).',
  auteur:
    'Laure Olivié — formatrice IA pour le BTP, OFC Création d’Entreprise (organisme certifié Qualiopi, actions de formation). Formations en présentiel en Île-de-France.',
} as const;

/** Distinctions vérifiées — doc Anthropic Skills / Projects. */
export const SKILLS_VS_PROMPT_PROJET = [
  {
    term: 'Prompt',
    text: 'Instruction ponctuelle dans une conversation. Utile pour une demande unique ; à reformuler à chaque nouvel échange.',
  },
  {
    term: 'Projet Claude',
    text: 'Espace de travail avec documents et consignes de fond, toujours chargés dans les chats de ce projet.',
  },
  {
    term: 'Skill Claude',
    text: 'Procédure réutilisable (consignes, éventuellement fichiers) que Claude active quand la demande correspond — utilisable dans plusieurs conversations.',
  },
] as const;

export const ANTHROPIC_SKILLS_DOCS = {
  overview: {
    href: 'https://claude.com/docs/skills/overview',
    label: 'Documentation Claude — Skills',
  },
  explained: {
    href: 'https://claude.com/resources/articles/skills-explained',
    label: 'Skills vs prompts, Projects et MCP (Anthropic)',
  },
} as const;

export type SkillClaudeBtpCard = {
  slug: string;
  title: string;
  /** Description courte — JSON-LD ItemList. */
  description: string;
  metier: string;
  document: string;
  tache: string;
  resultat: string;
  verification: string;
};

export const SKILLS_CLAUDE_BTP_CARDS: readonly SkillClaudeBtpCard[] = [
  {
    slug: 'analyse-cctp-gros-oeuvre',
    title: 'analyse-cctp-gros-oeuvre',
    description:
      'Skill Claude pour extraire exigences, risques et questions MOE à partir d’un CCTP gros œuvre (PDF ou Word).',
    metier: "Chargé d'études, conducteur de travaux",
    document: 'CCTP (PDF ou Word) d’un lot gros œuvre',
    tache: 'Extraire exigences, risques et questions à poser à la MOE',
    resultat: 'Liste structurée avec renvois aux articles utiles',
    verification:
      'Contrôler les citations d’articles et compléter avec votre lecture métier avant envoi',
  },
  {
    slug: 'actions-compte-rendu-chantier',
    title: 'actions-compte-rendu-chantier',
    description:
      'Skill Claude pour transformer un compte rendu de chantier en tableau d’actions qui / quoi / quand avec responsables et échéances.',
    metier: 'Conducteur de travaux',
    document: 'Compte rendu de chantier (notes ou CR rédigé)',
    tache: 'Identifier les actions qui / quoi / quand',
    resultat: 'Tableau d’actions avec responsables et échéances proposés',
    verification:
      'Valider responsables et délais avec les participants avant diffusion',
  },
  {
    slug: 'controle-devis-oublis',
    title: 'controle-devis-oublis',
    description:
      'Skill Claude pour repérer oublis et incohérences sur un devis ou DPGF avant envoi client.',
    metier: "Chargé d'études de prix, dirigeant",
    document: 'Devis ou DPGF avant envoi client',
    tache: 'Repérer les oublis et incohérences de structure',
    resultat: 'Liste de points de contrôle et questions à lever',
    verification:
      'Recalculer les montants et confirmer les postes manquants en interne — l’IA ne remplace pas le chiffrage',
  },
  {
    slug: 'courriers-relances-btp',
    title: 'courriers-relances-btp',
    description:
      'Skill Claude pour rédiger un projet de courrier ou de relance BTP à partir d’éléments factuels (facture, échanges MOE).',
    metier: 'Assistante, comptable, conducteur',
    document: 'Éléments factuels (facture, relance, échange MOE / fournisseur)',
    tache: 'Rédiger un projet de courrier ou de relance',
    resultat: 'Brouillon prêt à adapter au ton de l’entreprise',
    verification:
      'Relire engagements, montants et destinataires avant envoi',
  },
  {
    slug: 'methodologie-execution-gros-oeuvre',
    title: 'methodologie-execution-gros-oeuvre',
    description:
      'Skill Claude pour structurer une méthodologie d’exécution gros œuvre à partir de notes chantier ou CCTP.',
    metier: 'Directeur technique',
    document: 'Notes chantier, CCTP ou trame existante',
    tache: 'Structurer une méthodologie d’exécution',
    resultat: 'Plan de méthodologie à compléter avec vos moyens réels',
    verification:
      'Faire valider par le responsable technique avant remise en mémoire ou AO',
  },
  {
    slug: 'compte-rendu-chantier-btp',
    title: 'compte-rendu-chantier-btp',
    description:
      'Skill Claude pour passer d’une dictée vocale (ou notes) à un compte rendu de chantier Word au format entreprise, plus un mail d’envoi.',
    metier: 'Conducteur de travaux',
    document: 'Dictée vocale transcrite, notes ou photos de visite / réunion de chantier',
    tache: 'Mettre en forme le CR Word et préparer le mail de diffusion',
    resultat: 'Compte rendu structuré + brouillon de mail, sans faits inventés',
    verification:
      'Relire noms, dates, montants et points « à confirmer » avant envoi aux destinataires',
  },
] as const;

/** FAQ visible — alignée JSON-LD FAQPage (`getFAQSchema`). */
export const SKILLS_CLAUDE_BTP_FAQ: readonly { q: string; a: string }[] = [
  {
    q: 'Qu’est-ce qu’un skill Claude ?',
    a: 'C’est un mode d’emploi réutilisable (fichier SKILL.md, souvent en .zip) que Claude charge pour exécuter une tâche métier précise, par exemple analyser un CCTP ou structurer un compte rendu.',
  },
  {
    q: 'Faut-il un abonnement payant ?',
    a: 'Un compte claude.ai suffit pour importer et tester ces skills. Certaines limites ou fonctions avancées peuvent dépendre de l’offre Anthropic que vous utilisez.',
  },
  {
    q: 'Comment installer un skill ?',
    a: 'Téléchargez le .zip sur cette page, ouvrez claude.ai → Personnalisation → Compétences → « Importer depuis un fichier », activez le skill puis joignez votre document métier.',
  },
  {
    q: 'Mes documents sont-ils envoyés quelque part ?',
    a: 'Les fichiers que vous joignez dans Claude sont traités selon la politique d’Anthropic. Les archives .zip OFC ne contiennent que des consignes locales : elles ne transmettent pas vos documents à Laure Olivié ni à OFC.',
  },
  {
    q: 'Puis-je modifier un skill ?',
    a: 'Oui : éditez le SKILL.md après décompression ou adaptez les consignes dans Claude. Si vous republiez une version dérivée, citez Laure Olivié — OFC Création d’Entreprise (licence CC BY 4.0).',
  },
];

function stripJsonLdContext(node: Record<string, unknown>): Record<string, unknown> {
  const { ['@context']: _c, ...rest } = node;
  return rest;
}

function buildSkillsClaudeBtpItemListNode(
  canonical: string,
  base: string,
): Record<string, unknown> {
  const personId = siteSchemaPersonId(base);
  const organizationId = siteSchemaOrganizationId(base);
  return {
    '@type': 'ItemList',
    '@id': `${canonical}#skills-itemlist`,
    name: 'Skills Claude BTP — archives .zip',
    numberOfItems: SKILLS_CLAUDE_BTP_CARDS.length,
    itemListElement: SKILLS_CLAUDE_BTP_CARDS.map((skill, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareSourceCode',
        name: skill.title,
        description: skill.description,
        url: `${base}/skills/${skill.slug}.zip`,
        encodingFormat: 'application/zip',
        author: {
          '@type': 'Person',
          '@id': personId,
          name: SITE.marque,
        },
        publisher: {
          '@type': 'Organization',
          '@id': organizationId,
          name: SITE.raisonSociale,
        },
        license: SKILLS_CLAUDE_BTP_LICENSE_URL,
      },
    })),
  };
}

/** Graph JSON-LD page — WebPage, LearningResource, Breadcrumb, FAQPage, ItemList. */
export function buildSkillsClaudeBtpPageJsonLd(input: {
  canonical: string;
  metaTitle: string;
  metaDescription: string;
}): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const { canonical, metaTitle, metaDescription } = input;
  const dateModifiedIso = contentUpdatedAtToSchemaIso(SKILLS_CLAUDE_BTP_CONTENT_UPDATED_AT);
  const personId = siteSchemaPersonId(base);
  const organizationId = siteSchemaOrganizationId(base);

  const faqRaw = getFAQSchema(SKILLS_CLAUDE_BTP_FAQ);
  if (!faqRaw) {
    throw new Error('Skills Claude BTP : FAQPage JSON-LD invalide');
  }
  const faq = stripJsonLdContext(faqRaw as Record<string, unknown>);
  faq['@id'] = `${canonical}#faq`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: metaTitle,
        description: metaDescription,
        inLanguage: 'fr-FR',
        dateModified: dateModifiedIso,
        isPartOf: { '@type': 'WebSite', name: SITE.marque, url: base },
        about: { '@type': 'Thing', name: 'Skills Claude BTP' },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${base}${SKILLS_CLAUDE_BTP_IMAGE.src}`,
          width: SKILLS_CLAUDE_BTP_IMAGE.width,
          height: SKILLS_CLAUDE_BTP_IMAGE.height,
          caption: SKILLS_CLAUDE_BTP_IMAGE.alt,
        },
        author: { '@type': 'Person', '@id': personId, name: SITE.marque },
        publisher: { '@type': 'Organization', '@id': organizationId, name: SITE.raisonSociale },
      },
      {
        '@type': 'LearningResource',
        '@id': `${canonical}#resource`,
        name: SKILLS_CLAUDE_BTP_META.h1,
        description: metaDescription,
        url: canonical,
        inLanguage: 'fr-FR',
        dateModified: dateModifiedIso,
        isAccessibleForFree: true,
        learningResourceType: 'Guide',
        educationalLevel: 'beginner',
        license: SKILLS_CLAUDE_BTP_LICENSE_URL,
        author: { '@type': 'Person', '@id': personId, name: SITE.marque },
        provider: { '@type': 'Organization', '@id': organizationId, name: SITE.raisonSociale },
        about: [
          { '@type': 'Thing', name: 'Skills Claude BTP' },
          { '@type': 'Thing', name: 'Assistants IA pour le bâtiment' },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: base },
          { '@type': 'ListItem', position: 2, name: 'Skills Claude BTP', item: canonical },
        ],
      },
      faq,
      buildSkillsClaudeBtpItemListNode(canonical, base),
    ],
  };
}


export const SKILLS_CLAUDE_BTP_IMAGE = {
  src: '/images/ressources/miniatures/miniature-skills-claude-btp.jpg',
  alt: 'Tuto offert Skills Claude BTP — créer ses assistants métier, PDF gratuit formation IA bâtiment',
  width: 1024,
  height: 1024,
  caption:
    'Tuto offert — Skills Claude BTP : créer ses assistants métier (exemples ZIP et PDF gratuit).',
} as const;

export const SKILLS_CLAUDE_BTP_INSTALL_STEPS = [
  {
    name: 'Se connecter à Claude',
    text: 'Ouvrez claude.ai avec votre compte. Dans la barre de gauche, ouvrez Personnalisation, puis Compétences (Skills).',
  },
  {
    name: 'Ajouter une compétence',
    text: 'Cliquez sur « + Ajouter une compétence », puis choisissez « Importer depuis un fichier ».',
  },
  {
    name: 'Sélectionner le fichier .zip',
    text: 'Choisissez le .zip du skill téléchargé sur cette page (un skill à la fois — pas le pack entier d’un coup).',
  },
  {
    name: 'Activer et tester',
    text: 'Activez la compétence, joignez votre document (CCTP, CR, devis, courrier…) et formulez la demande métier.',
  },
] as const;

export const SKILLS_CLAUDE_BTP_CONTROLES = [
  'Vérifier les sources citées (articles CCTP, pages, dates) sur le document d’origine.',
  'Contrôler montants, engagements et destinataires avant tout envoi client ou MOE.',
  'Compléter les zones métier de votre entreprise dans le skill avant un usage récurrent.',
  'Un Skill n’assure ni exactitude automatique ni confidentialité à lui seul : choisissez l’offre Claude adaptée et vos règles internes de données.',
] as const;

export const SKILLS_CLAUDE_BTP_PREPARER = [
  'Le document type à joindre (CCTP, CR, devis, facture…).',
  'Les consignes : rôle, étapes, format de sortie, ton, interdits.',
  'Les contrôles humains obligatoires avant diffusion.',
  'Les éléments de charte ou modèles internes à mentionner dans le skill.',
] as const;
