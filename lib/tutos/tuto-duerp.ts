import type { TutoData } from './types';
import { PHOTOS } from '@/lib/photos';

export const TUTO_DUERP: TutoData = {
  slug: 'tuto-duerp',
  category: 'qse-conformite',
  pdfFile: 'tuto-duerp.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill DUERP',
  shortTitle: 'Skill DUERP',
  subtitle:
    "Le tutoriel pas à pas pour rédiger ton Document Unique d'Évaluation des Risques Professionnels en 30 minutes — au lieu de 3 jours.",

  metaTitle: 'Tuto skill DUERP : rédige ton Document Unique en 30 min',
  metaDescription:
    "DUERP BTP en 30 minutes : crée ton skill Claude pour rédiger ton Document Unique au lieu de 3 jours. Tutoriel pas à pas gratuit.",
  keywords: [
    'DUERP BTP',
    'Document Unique Évaluation Risques Professionnels',
    'skill Claude DUERP',
    'tuto DUERP',
    'modèle DUERP BTP',
    'DUERP Inspection du travail',
    'évaluation des risques BTP',
    'risques professionnels BTP',
    'OPPBTP DUERP',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'automatiser DUERP',
    'CSE DUERP',
    'risques psychosociaux BTP',
    'formation IA pour le BTP',
    'Laure Olivié',
    'OFC Création d\'Entreprise',
    'Constructys',
  ],
  ogImageAlt:
    "Tuto Skill DUERP — Document Unique BTP en 30 minutes avec Claude, par Laure Olivié",

  publishedAt: '2026-05-09',
  updatedAt: '2026-05-09',

  cardSummary:
    "Génère ton DUERP BTP complet (25 à 40 pages) à partir de 10 lignes de description : 9 unités de travail, cotation fréquence × gravité, plan d'actions priorisé. Conforme R4121-1.",

  heroImage: PHOTOS.tutoDuerpHero2026,

  totalTimeMinutes: 30,

  heroLearnPoints: [
    'Les 9 unités de travail à évaluer dans le BTP',
    '5 étapes pour créer ton skill en 30 minutes',
    'Le prompt exact à donner à Claude',
    'Comment le mettre à jour annuellement en 30 minutes',
  ],

  introTitle: 'Pourquoi un skill DUERP ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "Le DUERP, c'est l'obligation réglementaire de tout employeur — dès le premier salarié. Il recense tous les risques professionnels de ton entreprise et les mesures de prévention associées. Sans DUERP à jour, tu encours jusqu'à 1 500€ d'amende par salarié, et ta responsabilité pénale est engagée en cas d'accident grave.",
    },
    {
      kind: 'paragraph',
      text:
        "Le problème : un DUERP sérieux, c'est 3 jours de travail à la création, et 1 jour de mise à jour par an. La plupart des PME BTP ont un DUERP périmé, copié-collé d'un modèle générique, qui ne tient pas la route en cas de contrôle Inspection du travail.",
    },
    { kind: 'h3', text: 'Avec un skill bien construit, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        'Tu décris ton entreprise à Claude en 10 lignes',
        'Le skill produit un DUERP Word complet de 25 à 40 pages',
        '9 unités de travail évaluées avec cotation fréquence × gravité',
        "Plan d'actions priorisé avec délais et responsables",
        "Prêt à présenter à l'Inspection du travail ou à ton CSE",
      ],
    },
    {
      kind: 'highlight',
      text:
        '30 minutes de saisie. Au lieu de 3 jours de rédaction. Avec un DUERP solide et défendable.',
    },
    {
      kind: 'callout',
      title: 'Les 9 unités de travail types dans le BTP',
      body:
        "1. Direction et administration. 2. Bureau d'études et chiffrage. 3. Conducteurs de travaux et chefs de chantier. 4. Compagnons sur chantier (gros œuvre). 5. Compagnons spécialisés (second œuvre). 6. Magasiniers et logisticiens. 7. Chauffeurs et conducteurs d'engins. 8. Apprentis et stagiaires. 9. Personnel de nettoyage et entretien. Le skill structure automatiquement l'évaluation pour chaque unité selon les exigences du Code du travail (articles R4121-1 à R4121-4).",
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active la fonction skills dans Claude',
      intro:
        "Comme pour tous les skills, il te faut un abonnement Claude Pro (18€/mois). La fonction n'est pas accessible en version gratuite.",
      blocks: [
        {
          kind: 'paragraph',
          text:
            "Active ensuite l'option qui permet à Claude de générer ton DUERP au format Word :",
        },
        { kind: 'h3', text: 'Le chemin précis' },
        {
          kind: 'list',
          items: [
            'Va sur claude.ai et connecte-toi',
            'Clique sur tes initiales en bas à gauche',
            'Sélectionne « Settings »',
            'Va dans l’onglet « Capabilities »',
            'Active le toggle « Code execution and file creation »',
          ],
        },
        {
          kind: 'callout',
          title: "Pourquoi c'est indispensable",
          body:
            "Un DUERP fait facilement 25 à 40 pages, avec une structure complexe (tableaux de cotation, plans d'actions, signatures). Sans cette capacité activée, Claude te génèrerait un texte simple non exploitable. Avec, il produit un vrai .docx structuré, prêt à imprimer et à présenter à l'Inspection du travail.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière première',
      intro:
        "Le DUERP engage ta responsabilité pénale et celle de ton entreprise. Pour calibrer ton skill au plus près de tes pratiques, voici ce que tu dois préparer :",
      blocks: [
        { kind: 'h3', text: '1. Ton DUERP actuel (même périmé)' },
        {
          kind: 'paragraph',
          text:
            "En Word ou PDF. Il sert de base pour identifier ce qui marche déjà chez toi et ce qu'il faut améliorer. Si tu n'en as pas, prépare un modèle DUERP BTP type téléchargeable sur le site de l'OPPBTP.",
        },
        { kind: 'h3', text: '2. Ton organigramme et tes effectifs par poste' },
        {
          kind: 'paragraph',
          text:
            "Liste tes salariés par fonction : combien de conducteurs, de chefs de chantier, de compagnons, d'apprentis, d'administratifs. Plus c'est précis, mieux le skill évalue les risques par unité de travail.",
        },
        { kind: 'h3', text: "3. Tes accidents et presqu'accidents des 3 dernières années" },
        {
          kind: 'paragraph',
          text:
            "Registre des accidents du travail, déclarations CPAM, presqu'accidents notés en réunion sécurité. C'est la matière la plus précieuse — Claude détectera les patterns récurrents et proposera des actions correctives ciblées.",
        },
        { kind: 'h3', text: '4. Tes équipements et produits utilisés' },
        {
          kind: 'paragraph',
          text:
            "Liste de tes engins (échafaudages, nacelles, scies, perforateurs, compresseurs), de tes EPI fournis, de tes produits chimiques principaux. Pour les produits, prépare les FDS (Fiches de Données de Sécurité) — Claude les intégrera dans l'évaluation des risques chimiques.",
        },
        { kind: 'h3', text: '5. Tes formations sécurité réalisées' },
        {
          kind: 'paragraph',
          text:
            'Liste des formations SST, CACES, habilitations électriques, travail en hauteur, amiante sous-section 4, échafaudage, harnais. Avec les dates de validité. Ces formations sont des mesures de prévention valorisables dans le DUERP.',
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        'Ouvre une nouvelle conversation. Upload ton DUERP actuel, ton organigramme, ton registre des accidents, tes équipements et tes formations sécurité.',
      blocks: [
        { kind: 'paragraph', text: 'Puis colle ce prompt :' },
        {
          kind: 'prompt',
          title: 'Prompt à copier-coller dans Claude',
          text: `Je suis dirigeant d'une entreprise BTP en [TON MÉTIER], avec [NB] salariés.
Je dois rédiger ou mettre à jour mon DUERP (Document Unique d'Évaluation des Risques Professionnels) chaque année. Je veux automatiser cette rédaction tout en garantissant la conformité réglementaire et la qualité face à l'Inspection du travail.

Je veux créer un skill Claude qui produit mon DUERP au format Word complet, à partir d'une description simple de mon entreprise (10 lignes).

J'ai uploadé : mon DUERP actuel, mon organigramme, mon registre des accidents, mes équipements et mes formations sécurité.

Le skill doit :
1. Identifier les unités de travail de mon entreprise (administration, BE, chantier, etc.)
2. Pour chaque unité, lister les risques professionnels selon les 7 familles (chutes, manutention, chimique, biologique, mécanique, électrique, psycho-social)
3. Coter chaque risque selon la grille fréquence × gravité (1 à 4 pour chacun)
4. Proposer des mesures de prévention adaptées (organisationnelles, techniques, humaines)
5. Construire un plan d'actions priorisé avec délais et responsables
6. Générer un fichier Word de 25 à 40 pages avec sommaire automatique, tableaux de cotation et plan d'actions
7. Inclure une page de signature pour le dirigeant et le CSE (si présent)
8. Prévoir une rubrique « risques émergents » (RPS, télétravail, IA, transitions écologiques)

Avant de créer le skill, pose-moi toutes les questions nécessaires sur mon effectif, mes activités principales et mes accidents passés.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            "Demande à Claude d'utiliser systématiquement la grille de cotation fréquence × gravité (notes de 1 à 4 pour chacun, indice de criticité de 1 à 16). C'est la méthode reconnue par l'Inspection du travail. Et impose-lui de toujours générer le plan d'actions priorisé en fin de DUERP — c'est ce qui transforme un document théorique en outil opérationnel.",
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro:
        'Claude génère un fichier SKILL.md. Avant de le sauvegarder, prends 15 minutes pour le relire. Sur un DUERP, la précision réglementaire et la cohérence des cotations comptent plus que tout.',
      blocks: [
        { kind: 'h3', text: 'Ce que tu dois vérifier' },
        {
          kind: 'list',
          items: [
            'Les 9 unités de travail BTP types sont bien intégrées',
            'Les références au Code du travail (R4121-1 à R4121-4) apparaissent',
            'La grille de cotation fréquence × gravité est bien appliquée',
            'Les risques RPS (risques psychosociaux) sont systématiquement évalués',
            "Le plan d'actions priorisé apparaît en fin de DUERP avec délais",
            'La rubrique « risques émergents » couvre IA, télétravail, transitions',
          ],
        },
        { kind: 'h3', text: 'Ajustement type à demander' },
        {
          kind: 'prompt',
          title: "Exemple d'ajustement",
          text: `Pour les chantiers exposant à l'amiante (rénovation), ajoute systématiquement :
- Une rubrique dédiée « risque amiante » avec sous-sections (sous-section 3 / sous-section 4)
- Les formations obligatoires correspondantes (SS3 ou SS4)
- Les EPI spécifiques (combinaisons, demi-masques FFP3, douches de décontamination)
- Le suivi médical renforcé (visite préalable + suivi post-exposition)

Pour les entreprises avec moins de 11 salariés, simplifie le DUERP en supprimant la rubrique CSE (non obligatoire) mais garde la consultation des salariés.`,
        },
        { kind: 'h3', text: 'Active le skill' },
        {
          kind: 'paragraph',
          text:
            'Quand tu es satisfait, dis à Claude « Sauvegarde ce skill ». Tu le retrouves dans Settings → Customize → Skills. Vérifie que le toggle est activé.',
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Teste sur ton entreprise',
      intro:
        'Le moment de vérité. Active le skill avec les vraies données de ton entreprise. Le résultat te servira de référence pour ton DUERP officiel.',
      blocks: [
        { kind: 'h3', text: 'Le test' },
        {
          kind: 'list',
          items: [
            'Ouvre une nouvelle conversation Claude',
            'Décris ton entreprise en 10 lignes : effectif, métiers, chantiers types',
            'Tape : « rédige mon DUERP selon ma méthode »',
            'Le skill se déclenche automatiquement',
            'Tu obtiens le Word de 25 à 40 pages en 3 à 5 minutes',
          ],
        },
        { kind: 'h3', text: 'Le bon prompt à coller pour les usages quotidiens' },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Voici les éléments pour mon DUERP [ANNÉE] :
- Raison sociale : [NOM ENTREPRISE]
- Effectif total : [NB] salariés
- Activités principales : [LISTE]
- Métiers représentés : [LISTE]
- Localisation siège : [VILLE]
- Chantiers types : [URBAIN / RURAL / NEUF / RÉNO / ERP]
- Risques particuliers à intégrer : [LISTE]
- Accidents survenus depuis le dernier DUERP : [LISTE]
- Nouveaux équipements ou produits introduits : [LISTE]
- Nouvelles formations sécurité réalisées : [LISTE]
- Évolutions organisationnelles (télétravail, IA, etc.) : [DESCRIPTION]

Génère le DUERP complet en Word. Inclus la table des matières, l'évaluation par unité de travail, la grille de cotation, le plan d'actions priorisé et la page de signature.`,
        },
        {
          kind: 'callout',
          title: "La règle d'or",
          body:
            "Le DUERP doit être mis à jour au minimum une fois par an, et à chaque changement significatif (nouveau salarié, nouvel équipement, nouvel accident, nouvelle activité). Le skill te permet de faire cette mise à jour en 30 minutes au lieu d'une journée. Mais la responsabilité du contenu reste celle du dirigeant — un DUERP signé engage ta responsabilité pénale en cas de contrôle ou d'accident.",
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Le DUERP généré par Claude est-il valable juridiquement ?',
      a: "Le DUERP produit est conforme aux exigences du Code du travail (articles R4121-1 à R4121-4). Pour qu'il soit pleinement valable, il doit être daté, signé par le dirigeant, présenté au CSE (si présent) et tenu à disposition de l'Inspection du travail et de la médecine du travail. Le skill produit la trame conforme. La validation reste de la responsabilité humaine — comme pour tout DUERP, qu'il soit rédigé manuellement ou avec l'IA.",
    },
    {
      q: "Et si l'Inspection du travail me demande des précisions ?",
      a: "Tu retournes dans Claude, tu lui dis « l'inspecteur a demandé des précisions sur les points X, Y, Z. Voici ses remarques [TEXTE]. Modifie le DUERP en conséquence ». Il régénère le document en quelques minutes avec les ajustements demandés. Tu peux ainsi répondre rapidement aux remarques sans bloquer ton activité.",
    },
    {
      q: 'Combien de temps prend la génération la première fois ?',
      a: 'La première fois en suivant ce tuto, comptez 30 minutes pour bien calibrer le skill. Les fois suivantes (mises à jour annuelles), 15 à 20 minutes. À comparer avec 1 à 3 jours de rédaction manuelle. Sur 5 ans, tu économises environ 15 jours de travail.',
    },
    {
      q: 'Le skill couvre-t-il les risques psychosociaux (RPS) ?',
      a: "Oui. Depuis 2002, les RPS doivent être évalués au même titre que les risques physiques. Le skill intègre systématiquement cette évaluation : stress, harcèlement, charge mentale, ambiguïté de rôle. C'est un point souvent oublié dans les DUERP BTP traditionnels — ton DUERP sera donc plus complet que la moyenne du secteur.",
    },
    {
      q: 'Mon DUERP doit-il être public ou confidentiel ?',
      a: "Il doit être tenu à disposition de tes salariés (par affichage ou consultation), du CSE (si présent), de l'Inspection du travail, de la médecine du travail et de la CARSAT. Il n'est pas public au grand sens, mais il n'est pas confidentiel pour autant. Pour les éléments sensibles (accidents nominatifs), tu peux anonymiser dans le document distribué et garder la version complète en interne.",
    },
    {
      q: "Que faire si je n'ai pas eu d'accident depuis 3 ans ?",
      a: "C'est une excellente nouvelle, et c'est valorisable dans le DUERP comme indicateur de performance sécurité. Le skill l'intégrera comme tel. Mais attention : l'absence d'accident ne signifie pas absence de risque. Continue à évaluer les risques potentiels, en t'appuyant sur les statistiques sectorielles OPPBTP et CARSAT pour ton métier.",
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: 'On le construit ensemble',
    subtitle: 'Atelier individuel ou en équipe — financement possible selon éligibilité (Constructys / OPCO)',
    programTitle: 'Programme « Niveau 2 — Dirigeants & QHSE »',
    programItems: [
      'On construit ton skill DUERP sur ta vraie entreprise',
      'Calibrage sur tes risques métier et tes accidents passés',
      'Un skill opérationnel à la fin de la session',
      'Format individuel ou équipe (session catalogue 4 h, présentiel Île-de-France)',
    ],
  },
};
