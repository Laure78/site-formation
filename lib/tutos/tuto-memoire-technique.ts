import type { TutoData } from './types';
import { PHOTOS } from '@/lib/photos';

export const TUTO_MEMOIRE_TECHNIQUE: TutoData = {
  slug: 'tuto-memoire-technique',
  category: 'marches-et-veille',
  pdfFile: 'tuto-memoire-technique.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill Mémoire Technique BTP',
  shortTitle: 'Skill Mémoire Technique',
  subtitle:
    'Le tutoriel pas à pas pour transformer Claude en assistant qui rédige tes mémoires techniques à ta place.',

  metaTitle: 'Tuto skill Mémoire Technique BTP : assistant Claude AO',
  metaDescription:
    "Mémoire technique BTP : crée ton skill Claude pour rédiger tes mémoires techniques en automatique. Tutoriel pas à pas gratuit.",
  keywords: [
    'mémoire technique BTP',
    'skill Claude mémoire technique',
    'tuto mémoire technique',
    'IA appel d\'offres BTP',
    'rédaction mémoire technique',
    'IA marché public BTP',
    'CCTP DCE',
    'Qualibat RGE',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'GPT mémoire technique',
    'méthodologie BTP',
    'organigramme entreprise BTP',
    'références chantiers',
    'formation IA pour les pros du BTP',
    'Laure Olivié',
    'OFC Création d\'Entreprise',
    'Constructys',
  ],
  ogImageAlt:
    'Tuto Skill Mémoire Technique BTP — assistant rédaction Claude appels d\'offres, par Laure Olivié',

  publishedAt: '2026-05-09',
  updatedAt: '2026-05-09',

  cardSummary:
    "Crée un skill Claude qui rédige automatiquement tes mémoires techniques BTP : 11 sections classiques, méthodologie, QSE, références. Divise ton temps de rédaction par 5.",

  heroImage: PHOTOS.tutoMemoireTechniqueHero2026,

  totalTimeMinutes: 30,

  heroLearnPoints: [
    "Ce qu'est un skill Claude (et pourquoi un Project ne suffit pas)",
    '5 étapes pour créer ton skill en 30 minutes',
    'Le prompt exact à donner à Claude',
    "Comment l'utiliser sur ton prochain DCE",
  ],

  introTitle: "C'est quoi un skill Claude ?",
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "Un skill, c'est un mode d'emploi permanent que tu donnes à Claude. Tu lui apprends ton métier, ta boîte, ton style — une fois pour toutes.",
    },
    {
      kind: 'paragraph',
      text:
        "À chaque nouvelle conversation, le skill s'active automatiquement quand tu mentionnes ton sujet. Tu n'as plus jamais besoin de réexpliquer ton contexte.",
    },
    { kind: 'h3', text: 'Skill vs Project — la différence' },
    {
      kind: 'list',
      items: [
        'Project : un dossier de conversations. Skill : un savoir-faire réutilisable.',
        "Project : tu dois aller dedans pour l'utiliser. Skill : s'active tout seul quand tu en as besoin.",
        "Project : stocke surtout des fichiers et l'historique. Skill : stocke des instructions et une méthode.",
        'Project : bon pour suivre un projet client. Skill : bon pour automatiser une tâche récurrente.',
      ],
    },
    { kind: 'h3', text: 'Pourquoi un skill mémoire technique ?' },
    {
      kind: 'list',
      items: [
        'Tu rédiges plusieurs mémoires par mois et la trame est toujours la même.',
        'Tu te répètes : présentation entreprise, références, méthodologie, QSE.',
        "Tu colles toujours les mêmes infos dans Claude pour qu'il comprenne ta boîte.",
        'Tu adaptes le style à chaque marché public, sans changer la structure.',
      ],
    },
    {
      kind: 'highlight',
      text: "→ C'est exactement le cas d'usage où un skill divise ton temps par 5.",
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active la fonction skills dans Claude',
      intro:
        "Avant tout, il te faut un abonnement Claude Pro (18€/mois). C'est obligatoire — la fonction skill n'est pas accessible en version gratuite.",
      blocks: [
        { kind: 'paragraph', text: 'Ensuite, tu dois activer une option cachée :' },
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
          title: 'Pourquoi cette étape',
          body:
            "Un skill est un fichier que Claude lit et écrit dans son environnement. Sans la capacité d'exécuter du code et de créer des fichiers, il ne peut pas générer ton skill.",
        },
        { kind: 'h3', text: 'Vérifie que c’est bien activé' },
        {
          kind: 'paragraph',
          text:
            "Ouvre une nouvelle conversation et tape : « Liste-moi mes skills disponibles ». Si Claude te répond avec une liste (même vide), c'est bon. Si rien ne se passe, retourne dans Settings et vérifie le toggle.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière première',
      intro:
        "Avant de parler à Claude, tu dois préparer les ingrédients. Plus tu lui donnes de matière, plus ton skill sera fidèle à ton entreprise.",
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Voici les 5 éléments à réunir dans un dossier sur ton ordinateur :',
        },
        { kind: 'h3', text: '1. La structure de ton mémoire technique' },
        {
          kind: 'paragraph',
          text:
            "Si tu as déjà une trame, parfait. Sinon, voici les 11 sections classiques d'un mémoire BTP :",
        },
        {
          kind: 'list',
          items: [
            'Présentation entreprise',
            'Parcours du dirigeant',
            'Organigramme',
            'Références chantiers similaires',
            'Moyens humains affectés',
            'Moyens matériels',
            "Méthodologie d'exécution",
            'Gestion qualité',
            'QSE — Sécurité Santé Environnement',
            'Planning prévisionnel',
            'Valeur ajoutée et différenciation',
          ],
        },
        { kind: 'h3', text: '2. Tes 2 ou 3 derniers mémoires gagnés' },
        {
          kind: 'paragraph',
          text:
            "En PDF ou en Word. Claude va analyser ton style, tes formulations, ton ton. Si tu n'as que des mémoires perdus, donne-les quand même : on apprend autant des échecs.",
        },
        { kind: 'h3', text: '3. Tes données entreprise' },
        {
          kind: 'paragraph',
          text:
            "Raison sociale, SIRET, année de création, effectif, CA, qualifications, zone d'intervention. Mets tout dans un fichier texte.",
        },
        { kind: 'h3', text: '4. Tes assets visuels' },
        {
          kind: 'paragraph',
          text:
            "Logo, organigramme, charte graphique (couleurs principales si tu en as une), photos de chantiers récents.",
        },
        { kind: 'h3', text: '5. Ta liste de références' },
        {
          kind: 'paragraph',
          text:
            "Tableau Excel ou Word avec : maître d'ouvrage, lieu, montant, surface, année, nature des travaux, référent contactable.",
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        "Ouvre une nouvelle conversation. Upload tous tes fichiers préparés à l'étape 2 (glisser-déposer dans le chat).",
      blocks: [
        { kind: 'paragraph', text: 'Puis colle ce prompt :' },
        {
          kind: 'prompt',
          title: 'Prompt à copier-coller dans Claude',
          text: `Je suis dirigeant d'une entreprise BTP spécialisée en [TON MÉTIER : carrelage / gros œuvre / électricité / etc.].

Je veux créer un skill Claude qui va m'aider à rédiger automatiquement mes mémoires techniques pour répondre à des appels d'offres.

J'ai uploadé :
- Ma structure type de mémoire technique
- 2 anciens mémoires que j'ai utilisés sur des marchés publics
- Mes données entreprise (raison sociale, effectif, CA, qualifications)
- Mon logo et ma charte graphique
- Ma liste de références chantiers

Génère-moi un skill complet pour rédiger mes futurs mémoires techniques.

Le skill doit :
1. Analyser ma structure type et la rendre réutilisable
2. Intégrer mes données entreprise comme contexte permanent
3. Reproduire mon style à partir de mes anciens mémoires
4. Inclure un prompt par section pour faciliter la rédaction
5. Permettre que je colle juste un CCTP pour qu'il génère un mémoire adapté

Avant de créer le skill, pose-moi toutes les questions nécessaires pour bien le calibrer.`,
        },
        {
          kind: 'callout',
          title: 'Ce que Claude va faire',
          body:
            "Il va te poser 5 à 10 questions pour clarifier ton positionnement, ton style, tes contraintes habituelles. Réponds avec précision : la qualité de ton skill dépend de la qualité de tes réponses.",
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro:
        "Une fois les questions posées, Claude va générer un fichier appelé SKILL.md. Il te le présentera à l'écran avant de te demander si tu veux qu'il le sauvegarde.",
      blocks: [
        { kind: 'paragraph', text: 'Ne te précipite pas. Prends 5 minutes pour le relire.' },
        { kind: 'h3', text: 'Ce que tu dois vérifier' },
        {
          kind: 'list',
          items: [
            'Les noms et données de ton entreprise sont corrects',
            'La structure du mémoire correspond à ce que tu utilises vraiment',
            'Le ton décrit ressemble à ton style (direct, technique, etc.)',
            'Les prompts par section sont actionnables (pas vagues)',
            'Les références à tes qualifications (Qualibat, RGE) sont exactes',
          ],
        },
        { kind: 'h3', text: 'Demande des ajustements' },
        {
          kind: 'paragraph',
          text:
            'Si quelque chose cloche, dis-le simplement. Par exemple :',
        },
        {
          kind: 'prompt',
          title: "Exemple d'ajustement",
          text: `Dans la section méthodologie, ajoute systématiquement une mention sur les normes DTU applicables.

Et change le ton de la section "valeur ajoutée" : je ne veux pas du tout sonner commercial, je veux rester factuel.`,
        },
        { kind: 'h3', text: 'Active le skill' },
        {
          kind: 'paragraph',
          text:
            "Quand tu es satisfait, demande à Claude : « Sauvegarde ce skill ». Il l'enregistre dans tes skills disponibles.",
        },
        {
          kind: 'paragraph',
          text:
            'Tu peux le retrouver dans Settings → Customize → Skills. Vérifie que le toggle est activé (à droite).',
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Teste sur un vrai DCE',
      intro:
        "Le moment de vérité. Prends un DCE que tu as déjà reçu (peu importe s'il est encore ouvert ou pas).",
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Ouvre une nouvelle conversation Claude (pas dans un Project, juste une conversation neuve).',
        },
        { kind: 'h3', text: 'Le test' },
        {
          kind: 'list',
          items: [
            'Upload le CCTP, le règlement de consultation et la DPGF',
            'Tape simplement : « Rédige le mémoire technique pour ce marché »',
            'Le skill se déclenche automatiquement',
            "Claude produit la trame complète, adaptée à l'AO",
          ],
        },
        {
          kind: 'callout',
          title: 'Ce qui va se passer',
          body:
            "La première fois, tu vas corriger 30% du contenu — c'est normal. La deuxième fois, 10%. La troisième fois, tu relis et tu envoies. Le skill apprend de tes corrections si tu lui dis : « Mémorise cette correction pour les prochains mémoires. »",
        },
        { kind: 'h3', text: 'Optimisations courantes après le premier test' },
        {
          kind: 'list',
          items: [
            'Demander des prompts plus spécifiques pour la section méthodologie',
            'Ajouter des formulations gagnantes que tu utilises souvent',
            'Préciser les normes techniques par type de chantier',
            'Standardiser les visuels (planning Gantt, organigramme)',
          ],
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: "Et si je n'ai pas d'ancien mémoire technique ?",
      a: "Demande à Claude de te générer une trame standard pour ton métier, puis adapte-la avec tes données. Le skill sera moins personnalisé au début, mais s'enrichira au fil de tes corrections.",
    },
    {
      q: 'Mon skill peut-il être utilisé par toute mon équipe ?',
      a: "Pas en l'état. Les skills sont attachés à un compte Claude personnel. Pour le partager : exporte le fichier SKILL.md, et chaque membre de l'équipe peut l'importer dans son propre compte. Une version Team est disponible chez Claude pour les entreprises.",
    },
    {
      q: 'Mes données sont-elles confidentielles ?',
      a: "Anthropic, l'éditeur de Claude, ne réutilise pas tes données pour entraîner ses modèles si tu es en plan payant. Évite quand même d'y mettre des données nominatives sensibles (numéros de sécu, infos médicales).",
    },
    {
      q: 'Combien de temps ça prend pour créer le skill ?',
      a: '30 à 45 minutes la première fois, en suivant ce tuto. Les ajustements après les premiers tests prennent 10 minutes par session.',
    },
    {
      q: 'Le skill marche-t-il aussi avec ChatGPT ?',
      a: "Pas directement. ChatGPT a un système équivalent appelé GPTs personnalisés, mais la logique est différente. Si tu veux utiliser ChatGPT, fais-toi accompagner pour adapter la méthode.",
    },
    {
      q: 'Et si Claude se trompe sur des points techniques BTP ?',
      a: "Tu corriges, et tu lui dis de mémoriser la correction. Plus tu utilises le skill, plus il devient précis sur ton métier. C'est de l'apprentissage par usage.",
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS VITE ?",
    title: 'On le construit ensemble',
    subtitle: 'Atelier individuel ou en équipe — financement possible selon éligibilité (Constructys / OPCO)',
    programTitle: 'Programme « Niveau 2 — Skills BTP »',
    programItems: [
      'On construit ton skill mémoire technique en direct',
      'Calibrage sur tes vrais DCE et tes vrais mémoires',
      'Un skill opérationnel à la fin de la session',
      'Format individuel (1h30) ou équipe (4 à 14h)',
    ],
  },
};
