import type { TutoData } from './types';
import { PHOTOS } from '@/lib/photos';

export const TUTO_ANALYSE_DCE: TutoData = {
  slug: 'tuto-analyse-dce',
  category: 'marches-et-veille',
  pdfFile: 'tuto-analyse-dce.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: "Crée ton skill Analyse de DCE",
  shortTitle: 'Skill Analyse de DCE',
  subtitle:
    'Le tutoriel pas à pas pour mâcher 220 pages de DCE en 3 minutes — au lieu de 4 heures.',

  metaTitle: 'Tuto skill Analyse DCE BTP : 220 pages en 3 minutes Claude',
  metaDescription:
    "Analyse DCE BTP : crée ton skill Claude pour mâcher 220 pages de DCE en 3 minutes au lieu de 4h. Tutoriel gratuit.",
  keywords: [
    'analyse DCE BTP',
    'skill Claude DCE',
    'tuto analyse DCE',
    'CCAP CCTP RC BPU',
    'IA appel d\'offres BTP',
    'fiche analyse DCE',
    'Go No Go appel d\'offres',
    'IA marché public BTP',
    'BOAMP IA',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'Qualibat',
    'mémoire technique',
    'critères de sélection AO',
    'formation IA pour les pros du BTP',
    'Laure Olivié',
    'OFC Création d\'Entreprise',
    'Constructys',
  ],
  ogImageAlt:
    'Tuto Skill Analyse DCE — fiche standardisée 220 pages en 3 min avec Claude, par Laure Olivié',

  publishedAt: '2026-05-09',
  updatedAt: '2026-05-09',

  cardSummary:
    "Analyse complète d'un DCE en 3 minutes au lieu de 4 heures : fiche standardisée 8 rubriques, critères, pénalités, qualifications + avis Go / No Go argumenté. Pour décider vite et bien.",

  heroImage: PHOTOS.tutoAnalyseDceHero2026,

  totalTimeMinutes: 30,

  heroLearnPoints: [
    "La fiche d'analyse standardisée d'un DCE",
    '5 étapes pour créer ton skill en 30 minutes',
    'Le prompt exact à donner à Claude',
    "Comment l'utiliser pour décider Go / No Go en 3 minutes",
  ],

  introTitle: 'Pourquoi un skill analyse DCE ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "Un DCE de 220 pages, c'est 4 heures de lecture. Et tu as déjà 3 autres dossiers en cours. Sur les 47 DCE qui sortent dans le mois, tu ne peux pas tous les lire.",
    },
    {
      kind: 'paragraph',
      text:
        "Du coup, tu choisis au feeling. Tu loupes des opportunités. Ou tu réponds à des marchés mal calibrés pour toi.",
    },
    { kind: 'h3', text: 'Avec un skill bien construit, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        'Tu colles le DCE dans Claude (CCAP + CCTP + RC + DPGF)',
        'Tu écris : « analyse-le »',
        'En 3 minutes, tu as une fiche standardisée',
        'Tu décides Go / No Go en connaissance de cause',
        'Si Go, tu as déjà la base de ta réponse',
      ],
    },
    {
      kind: 'highlight',
      text:
        "L'objectif n'est pas de remplacer ta lecture du DCE — c'est de la prioriser. Tu lis vraiment les dossiers qui en valent la peine.",
    },
    {
      kind: 'callout',
      title: 'Ce que la fiche doit contenir',
      body:
        "Les 5 critères de sélection avec leur pondération. La date limite et les modalités de remise. Les exigences techniques classées par priorité. Les pénalités et points de vigilance. Les pièces administratives à fournir. Pas un résumé général — une fiche actionnable, toujours la même structure.",
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
            "Active ensuite l'option qui permet à Claude de lire des PDF lourds et de générer ta fiche d'analyse :",
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
            "Un DCE complet pèse souvent 50 à 200 Mo (CCAP, CCTP, RC, plans, BPU). Sans cette capacité activée, Claude ne peut traiter qu'une partie du contenu. Avec, il extrait, croise et structure l'ensemble — c'est ce qui te donne une fiche fiable plutôt qu'un résumé bancal.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière première',
      intro:
        "L'analyse DCE est un skill un peu différent : tu ne mets pas en forme un document selon ton style, tu extrais des informations selon une grille. La matière à préparer est donc plus courte, mais cruciale.",
      blocks: [
        { kind: 'h3', text: '1. Ta grille d’analyse type' },
        {
          kind: 'paragraph',
          text:
            'Si tu as déjà une fiche de lecture standard, parfait. Sinon voici les 8 rubriques classiques à reprendre :',
        },
        {
          kind: 'list',
          items: [
            'Identité du marché (objet, MOA, MOE, n° de marché)',
            "Calendrier (date limite, durée d'exécution, démarrage prévu)",
            'Modalités de remise (plateforme, format, signature électronique)',
            'Critères de sélection avec leur pondération précise',
            'Exigences techniques classées par priorité',
            'Conditions financières (variantes, options, pénalités, retenue de garantie)',
            'Pièces administratives à fournir (DC1, DC2, attestations)',
            'Points de vigilance (clauses inhabituelles, contraintes site)',
          ],
        },
        { kind: 'h3', text: '2. Tes critères Go / No Go' },
        {
          kind: 'paragraph',
          text:
            "Liste ce qui te fait dire « on y va » ou « on laisse passer » sur un AO. Exemples : montant minimum, distance maximum du chantier, présence de pénalités hors barème, exigence de qualifications que tu n'as pas. Claude va intégrer ces critères pour te donner une recommandation Go / No Go en bas de fiche.",
        },
        { kind: 'h3', text: '3. Tes qualifications et capacités' },
        {
          kind: 'paragraph',
          text:
            "Qualibat, RGE, certifications ISO, MASE, capacités humaines et matérielles. Permet à Claude de te dire si tu remplis les critères de candidature dès l'analyse.",
        },
        { kind: 'h3', text: '4. Un exemple de DCE déjà analysé' },
        {
          kind: 'paragraph',
          text:
            "Idéalement, prends un DCE que tu as bien décortiqué récemment, avec ta fiche de lecture déjà remplie. Claude apprendra ton niveau de précision attendu et le ton de tes commentaires.",
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        "Ouvre une nouvelle conversation. Upload ta grille d'analyse, tes critères Go / No Go, tes qualifications et ton exemple de DCE déjà analysé.",
      blocks: [
        { kind: 'paragraph', text: 'Puis colle ce prompt :' },
        {
          kind: 'prompt',
          title: 'Prompt à copier-coller dans Claude',
          text: `Je suis dirigeant d'une entreprise BTP en [TON MÉTIER], je réponds à des appels d'offres publics et privés.

Je veux créer un skill Claude qui produit une fiche d'analyse standardisée à partir d'un DCE complet (CCAP, CCTP, RC, BPU, plans).

J'ai uploadé : ma grille d'analyse type, mes critères Go / No Go, mes qualifications, et un DCE déjà analysé en exemple.

Le skill doit :
1. Accepter en entrée plusieurs PDF d'un même DCE
2. Extraire et structurer l'info selon ma grille en 8 rubriques
3. Identifier précisément les critères de sélection avec leur pondération
4. Lister les pièces administratives obligatoires
5. Repérer les pénalités, retenues de garantie et clauses inhabituelles
6. Vérifier si je remplis les critères de candidature avec mes qualifications
7. Proposer un avis Go / No Go argumenté en bas de fiche
8. Produire une fiche Word d'1 à 2 pages, prête à imprimer pour le dossier AO

Avant de créer le skill, pose-moi toutes les questions nécessaires sur ma typologie de marchés, mes seuils Go / No Go et mes points de vigilance habituels.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            "Demande à Claude de toujours citer la page exacte du DCE pour chaque info extraite. C'est ta garantie en cas de litige : la fiche n'invente rien, elle reformule du sourcé.",
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro:
        "Claude génère un fichier SKILL.md. Avant de le sauvegarder, prends 5 minutes pour le relire. Sur un skill d'analyse, la précision est plus importante que le style.",
      blocks: [
        { kind: 'h3', text: 'Ce que tu dois vérifier' },
        {
          kind: 'list',
          items: [
            'Les 8 rubriques de ta grille sont bien présentes et dans l’ordre',
            'La consigne de citer la page exacte est intégrée',
            'Les seuils Go / No Go correspondent à tes vrais critères',
            'Les qualifications listées sont exactes (Qualibat à jour, RGE actif…)',
            'Le format de sortie est précisé : Word A4, 1 à 2 pages, à imprimer',
            "La consigne anti-hallucination est claire : si l'info n'est pas dans le DCE, ne pas inventer",
          ],
        },
        { kind: 'h3', text: 'Ajustement type à demander' },
        {
          kind: 'prompt',
          title: "Exemple d'ajustement",
          text: `Pour les pénalités, mets-les en gras et signale toujours si une pénalité dépasse 1/3000ème par jour de retard — c'est mon seuil de vigilance.

Et pour la retenue de garantie : signale systématiquement si elle est non remplaçable par caution bancaire.`,
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
      title: 'Teste sur un vrai DCE',
      intro:
        "Le moment de vérité. Prends un DCE récent — idéalement un que tu as déjà analysé manuellement, pour comparer.",
      blocks: [
        { kind: 'h3', text: 'Le test' },
        {
          kind: 'list',
          items: [
            'Ouvre une nouvelle conversation Claude (pas dans un Project)',
            'Upload tous les PDF du DCE : CCAP, CCTP, RC, BPU, annexes',
            'Tape simplement : « Analyse ce DCE »',
            'Le skill se déclenche automatiquement',
            'Claude produit la fiche complète en 3 à 5 minutes',
          ],
        },
        { kind: 'h3', text: 'Le bon prompt à coller pour les usages quotidiens' },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Voici les pièces du DCE pour le marché [NOM DU MARCHÉ].

Génère ma fiche d'analyse standardisée. Cite la page exacte du DCE pour chaque information extraite. Termine par un avis Go / No Go argumenté selon mes critères habituels.`,
        },
        {
          kind: 'callout',
          title: 'Ce qui va se passer',
          body:
            "La première fois, tu vas comparer avec ta fiche manuelle et corriger 20% du contenu. La deuxième fois, 5%. La troisième, tu fais confiance au skill et tu valides en 5 minutes. Ton temps d'analyse passe vraiment de 4h à 3 minutes — mais le temps de décision Go / No Go reste à toi.",
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Le skill peut-il vraiment remplacer ma lecture du DCE ?',
      a: "Non. Et il ne doit pas. Le skill sert à filtrer et à prioriser. Sur les 10 DCE que tu reçois, il te dit lesquels valent la peine d'être lus en détail. Pour les marchés que tu décides de chiffrer, tu relis le CCTP toi-même — c'est ta responsabilité de dirigeant.",
    },
    {
      q: 'Et si Claude rate une clause cachée dans le CCAP ?',
      a: "C'est possible la première fois. Tu lui signales : « Tu as oublié de relever la clause X page Y. Mémorise ce type de clause pour les prochaines analyses. » À chaque correction, le skill devient plus précis. Au bout de 5 ou 6 DCE, il rate beaucoup moins de choses qu'un humain fatigué à 19h.",
    },
    {
      q: 'Mes données sont-elles confidentielles ?',
      a: "Sur Claude Pro, Anthropic ne réutilise pas tes données pour entraîner ses modèles. Pour les DCE de marchés sensibles (défense, santé, sites SEVESO), vérifie quand même que le règlement de consultation autorise l'usage d'outils IA externes — certains MOA l'interdisent explicitement.",
    },
    {
      q: 'Combien de DCE puis-je analyser par mois ?',
      a: "Avec Claude Pro, tu as une limite d'usage hebdomadaire. En pratique, un DCE complet de 200 pages représente environ 1 à 2% de ta limite. Tu peux donc analyser facilement 30 à 50 DCE par semaine — bien plus que ce que tu reçois en réalité.",
    },
    {
      q: 'Mon associé peut-il utiliser le même skill ?',
      a: "Pas directement. Les skills sont attachés à un compte Claude personnel. Pour le partager : exporte le fichier SKILL.md, et chaque utilisateur l'importe dans son propre compte. Une version Team de Claude existe pour mutualiser au sein d'une entreprise.",
    },
    {
      q: 'Et si le DCE est mal scanné ou écrit à la main ?',
      a: "Claude gère bien les scans propres et les PDF natifs. Pour les scans dégradés ou les annotations manuscrites, tu peux d'abord lui demander : « Ce DCE est mal scanné, signale-moi tous les passages où tu n'es pas sûr de la lecture. » Il marquera les zones à vérifier manuellement.",
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: 'On le construit ensemble',
    subtitle: 'Atelier individuel ou en équipe — financement possible selon éligibilité (Constructys / OPCO)',
    programTitle: 'Programme « Niveau 2 — DCE & Mémoire Technique »',
    programItems: [
      'On construit ton skill analyse DCE en direct',
      'Calibrage sur tes vrais marchés et tes vrais critères',
      'Un skill opérationnel à la fin de la session',
      'Format individuel (1h30) ou équipe (4 à 14h)',
    ],
  },
};
