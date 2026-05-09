import type { TutoData } from './types';

export const TUTO_DOE_DOSSIER_OUVRAGES_EXECUTES: TutoData = {
  slug: 'tuto-doe-dossier-ouvrages-executes',
  pdfFile: 'tuto-doe-dossier-ouvrages-executes.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill DOE — Dossier des Ouvrages Exécutés',
  shortTitle: 'Skill DOE',
  subtitle:
    'Le tutoriel pas à pas pour assembler ton DOE en 30 minutes — au lieu de 2 week-ends.',

  metaTitle:
    'Tuto skill DOE BTP : assembler ton dossier ouvrages exécutés en 30 min',
  metaDescription:
    "Crée ton skill Claude pour assembler ton DOE BTP en 30 minutes au lieu de 2 week-ends. Tutoriel pas à pas gratuit par Laure Olivié, formatrice IA BTP.",
  keywords: [
    'DOE BTP',
    'dossier ouvrages exécutés',
    'skill Claude DOE',
    'tuto DOE',
    'modèle DOE BTP',
    'NF P03-001',
    'CCAG Travaux DOE',
    'réception chantier DOE',
    'DOE numérique BTP',
    'DOE BIM',
    'Consuel',
    'conducteur de travaux',
    'maître d\'œuvre',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'formation IA BTP',
    'Laure Olivié',
    'OFC Création d\'Entreprise',
    'Constructys',
  ],
  ogImageAlt:
    'Tuto Skill DOE — dossier des ouvrages exécutés BTP en 30 min avec Claude, par Laure Olivié',

  publishedAt: '2026-05-09',
  updatedAt: '2026-05-09',

  cardSummary:
    "Assemble ton DOE en 30 minutes au lieu de 2 week-ends : sommaire 8 chapitres, classement pièces, détection des manques, page de garde Word + dossier zippé conforme tes exigences MOE.",

  totalTimeMinutes: 30,

  heroLearnPoints: [
    "La structure standardisée d'un DOE conforme",
    '5 étapes pour créer ton skill en 30 minutes',
    'Le prompt exact à donner à Claude',
    "Comment l'utiliser à chaque fin de chantier",
  ],

  introTitle: 'Pourquoi un skill DOE ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "Le DOE, c'est la dernière étape du chantier. Et c'est aussi celle que tout le monde repousse.",
    },
    {
      kind: 'paragraph',
      text:
        "Le problème : sans DOE conforme, le maître d'œuvre ne signe pas la réception. Sans réception signée, ton dernier paiement est bloqué et la garantie de parfait achèvement ne court pas. Le DOE, c'est ta clé pour fermer le chantier financièrement.",
    },
    { kind: 'h3', text: 'Avec un skill bien construit, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        'Tu rassembles toutes tes pièces dans un dossier',
        'Tu uploades dans Claude (fiches techniques, PV, plans, attestations)',
        'Tu écris : « monte le DOE pour ce chantier »',
        'En 30 minutes, tu as un dossier structuré, sommaire généré, pièces classées',
        "Tu relis, tu valides, tu remets au maître d'œuvre",
      ],
    },
    {
      kind: 'highlight',
      text:
        '30 minutes au lieu de 2 week-ends. Et ton dernier paiement arrive plus vite.',
    },
    {
      kind: 'callout',
      title: 'Ce que le DOE doit contenir',
      body:
        "Le sommaire structuré chapitre par chapitre. Les plans conformes à l'exécution (DCE marqués, plans de récolement). Les fiches techniques classées par lot et par produit. Les PV de réception de matériaux, de mise en service, d'essais. Les notices d'utilisation et de maintenance. Les attestations réglementaires (Consuel, gaz, accessibilité). Les garanties constructeurs et fabricants. Les coordonnées des intervenants pour le SAV.",
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
            "Active ensuite l'option qui permet à Claude d'assembler ton dossier en Word :",
        },
        { kind: 'h3', text: 'Le chemin précis' },
        {
          kind: 'list',
          items: [
            'Va sur claude.ai et connecte-toi',
            'Clique sur tes initiales en bas à gauche',
            'Sélectionne « Settings »',
            "Va dans l'onglet « Capabilities »",
            'Active le toggle « Code execution and file creation »',
          ],
        },
        {
          kind: 'callout',
          title: "Pourquoi c'est indispensable",
          body:
            "Le DOE est un dossier composé de dizaines de pièces (PDF, Word, plans). Sans cette capacité activée, Claude ne peut pas assembler les éléments dans une structure cohérente. Avec, il génère le sommaire, classe les pièces et produit le document final prêt à imprimer ou à transmettre numériquement.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière première',
      intro:
        "Le DOE est un dossier de fin de chantier. Plus tu as anticipé la collecte des pièces pendant l'exécution, plus l'assemblage sera rapide. Voici ce que tu dois préparer pour calibrer ton skill :",
      blocks: [
        { kind: 'h3', text: '1. Ta structure type de DOE' },
        {
          kind: 'paragraph',
          text:
            "Si tu as un sommaire standard, parfait. Sinon voici les 8 chapitres classiques d'un DOE BTP :",
        },
        {
          kind: 'list',
          items: [
            'Présentation du chantier et des intervenants',
            'Plans conformes à l\'exécution',
            'Fiches techniques des produits et matériaux',
            "PV de réception, d'essais et de mise en service",
            "Notices d'utilisation et de maintenance",
            'Attestations réglementaires obligatoires',
            'Garanties constructeurs et fabricants',
            'Coordonnées des intervenants pour le SAV',
          ],
        },
        { kind: 'h3', text: '2. Tes 1 ou 2 derniers DOE' },
        {
          kind: 'paragraph',
          text:
            "En PDF. Claude apprendra ton niveau de détail attendu, ton ton, et la façon dont tu nommes les chapitres. Si tu n'en as jamais fait, demande à un confrère ou utilise un modèle FFB / OPPBTP.",
        },
        { kind: 'h3', text: '3. Tes données entreprise' },
        {
          kind: 'paragraph',
          text:
            'Raison sociale, SIRET, coordonnées, qualifications, nom du conducteur de travaux signataire. Tout ce qui figure dans la page de garde du DOE.',
        },
        { kind: 'h3', text: '4. Tes pièces récurrentes' },
        {
          kind: 'paragraph',
          text:
            "Modèles de PV, modèles d'attestations, charte graphique, page de garde type. Plus tu as de modèles réutilisables, moins tu repars de zéro à chaque chantier.",
        },
        { kind: 'h3', text: "5. Les exigences spécifiques de tes maîtres d'œuvre" },
        {
          kind: 'paragraph',
          text:
            'Certains MOE imposent un format précis (DOE numérique, BIM, classement par lot puis par produit, doublé en version papier). Liste les exigences que tu rencontres le plus souvent — Claude pourra adapter le skill selon le client.',
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        "Ouvre une nouvelle conversation. Upload tes 1 ou 2 anciens DOE, ta structure type, tes pièces récurrentes et les exigences MOE habituelles.",
      blocks: [
        { kind: 'paragraph', text: 'Puis colle ce prompt :' },
        {
          kind: 'prompt',
          title: 'Prompt à copier-coller dans Claude',
          text: `Je suis conducteur de travaux dans une entreprise BTP en [TON MÉTIER].
Je dois remettre un DOE à la fin de chaque chantier — c'est la condition pour déclencher le solde du marché.

Je veux créer un skill Claude qui assemble automatiquement mes DOE à partir des pièces collectées pendant le chantier.

J'ai uploadé : mes 2 derniers DOE, ma structure type, mes données entreprise, mes pièces récurrentes (PV, attestations, page de garde) et les exigences MOE habituelles.

Le skill doit :
1. Générer le sommaire structuré en 8 chapitres conformes à ma trame
2. Classer les pièces par lot puis par produit (ou selon l'exigence MOE)
3. Identifier les pièces manquantes et me les signaler avant production
4. Renommer les fichiers selon une nomenclature propre (LOT_PRODUIT_TYPE)
5. Produire un document Word de garde avec ma charte et la liste des annexes
6. Permettre une variante DOE numérique zippé selon les exigences du client

Avant de créer le skill, pose-moi toutes les questions nécessaires sur mes types de chantiers, mes interlocuteurs MOE et mes exigences réglementaires métier (Consuel, Qualibat, accessibilité).`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            "Demande à Claude de toujours signaler les pièces manquantes avant de générer le DOE. C'est ce qui te fait gagner du temps : tu vas chercher les 3 ou 4 PV oubliés en une demi-journée plutôt que de découvrir le manque le lundi de remise et de paniquer.",
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro:
        "Claude génère un fichier SKILL.md. Avant de le sauvegarder, prends 5 minutes pour le relire. Sur un DOE, la rigueur structurelle compte plus que le style.",
      blocks: [
        { kind: 'h3', text: 'Ce que tu dois vérifier' },
        {
          kind: 'list',
          items: [
            'Les 8 chapitres de ta trame sont bien présents et dans l\'ordre',
            'Le système de nomenclature des fichiers est cohérent',
            'La détection des pièces manquantes est bien intégrée',
            'Le format de sortie est conforme : Word + dossier zippé numérique',
            'Les attestations réglementaires propres à ton métier sont listées',
            'Le ton de la page de garde est neutre et professionnel',
          ],
        },
        { kind: 'h3', text: 'Ajustement type à demander' },
        {
          kind: 'prompt',
          title: "Exemple d'ajustement",
          text: `Pour les DOE remis aux maîtres d'œuvre publics, ajoute systématiquement le bordereau récapitulatif en première page avec : nom du chantier, n° de marché, date de réception, nom du MOE, liste des lots traités.

Et pour les chantiers ERP, ajoute une section dédiée aux attestations accessibilité PMR et SSI.`,
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
      title: 'Mets en place ta routine de fin de chantier',
      intro:
        "Le skill ne sert à rien si tu attends la dernière semaine pour collecter les pièces. La vraie économie de temps vient d'une routine instaurée dès le début du chantier.",
      blocks: [
        { kind: 'h3', text: 'La bonne méthode dès J+0' },
        {
          kind: 'list',
          items: [
            'Crée un dossier « DOE-[NOM CHANTIER] » sur ton drive ou serveur',
            'Sous-dossiers par chapitre : 01-Plans, 02-Fiches techniques, 03-PV, etc.',
            "Chaque fois qu'une pièce arrive, classe-la immédiatement (5 secondes)",
            "Pendant la phase d'essais : récupère les PV au fur et à mesure",
            'À J-15 de la réception : tu as déjà 80% du DOE prêt',
          ],
        },
        { kind: 'h3', text: 'Le bon prompt à coller le moment venu' },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Voici les pièces collectées pour le chantier [NOM CHANTIER] :
[J'ai uploadé tous les fichiers du dossier DOE-[NOM CHANTIER]]
Date de réception prévue : [DATE]
Maître d'œuvre : [NOM]
Type de marché : [PUBLIC / PRIVÉ]
Spécificités à respecter : [ERP, BIM, etc. si applicable]

Génère le DOE complet selon ma trame standard. Signale-moi d'abord les pièces manquantes avant production. Produis ensuite le sommaire et la page de garde Word, plus le dossier zippé numérique.`,
        },
        {
          kind: 'callout',
          title: "La règle d'or",
          body:
            "Le DOE n'est pas une formalité administrative — c'est un document qui engage ta responsabilité décennale. Toutes les pièces que tu remets serviront en cas de sinistre, de réclamation, ou de SAV. Relis attentivement avant de signer. Sur les chantiers à forte technicité, fais valider par ton dirigeant ou ton responsable QHSE.",
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: "Le DOE généré par IA est-il conforme à la réglementation ?",
      a: "Oui. Ce qui compte juridiquement, c'est le contenu du DOE, pas l'outil utilisé pour l'assembler. Le skill reprend les standards BTP (norme NF P03-001 marchés privés, CCAG Travaux marchés publics). C'est toi qui valides et qui signes — donc toi qui engages la responsabilité de l'entreprise.",
    },
    {
      q: 'Que se passe-t-il s\'il manque des pièces le jour de la remise ?',
      a: "Le maître d'œuvre peut refuser le DOE et reporter la réception. C'est tout l'intérêt de demander à Claude de signaler les manques en amont : tu as le temps de faire les relances aux fabricants et sous-traitants. Sans le skill, on découvre souvent les manques au moment de l'assemblage final — donc trop tard.",
    },
    {
      q: 'Faut-il remettre le DOE en papier ou en numérique ?',
      a: "Cela dépend du marché. Sur le public, c'est de plus en plus du DOE numérique (PDF structuré + dossier zippé). Sur le privé, certains MOE imposent encore le papier. Le skill génère les deux versions à partir des mêmes pièces — tu choisis le format de sortie selon ton client.",
    },
    {
      q: 'Et le DOE BIM ?',
      a: "Si ton chantier a un cahier des charges BIM, le DOE prend la forme d'une maquette numérique enrichie. Le skill ne génère pas la maquette en elle-même, mais il peut produire le carnet d'attributs (fiches techniques, garanties, contacts SAV) qui s'attache aux objets BIM. Précise dans ton prompt « format BIM Carnet d'attributs ».",
    },
    {
      q: 'Combien de temps prend l\'assemblage la première fois ?',
      a: "30 à 45 minutes la première fois, en suivant ce tuto et avec les pièces déjà collectées. Comparé aux 2 week-ends que coûte un DOE fait à la main, c'est une économie majeure. Les fois suivantes, comptez 20 minutes par chantier.",
    },
    {
      q: 'Mes données techniques chantier sont-elles confidentielles ?',
      a: "Sur Claude Pro, Anthropic ne réutilise pas tes données pour entraîner ses modèles. Pour les chantiers sensibles (sites classés défense, hôpitaux, sites industriels avec confidentialité contractuelle), vérifie quand même que ton marché autorise l'usage d'outils IA externes — certains MOE l'interdisent explicitement.",
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: 'On le construit ensemble',
    subtitle: 'Atelier individuel ou en équipe — finançable Constructys / OPCO',
    programTitle: 'Programme « Niveau 2 — Conducteurs de travaux »',
    programItems: [
      'On construit ton skill DOE en direct sur tes vrais chantiers',
      "Calibrage sur tes exigences MOE habituelles",
      'Un skill opérationnel à la fin de la session',
      'Format individuel ou équipe (4 à 14h)',
    ],
  },
};
