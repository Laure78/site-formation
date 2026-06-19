import type { TutoData } from './types';
import { PHOTOS } from '@/lib/photos';

export const TUTO_PV_LEVEE_RESERVES: TutoData = {
  slug: 'tuto-pv-levee-reserves',
  category: 'chantier-livrables',
  pdfFile: 'tuto-pv-levee-reserves.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill PV de levée de réserves',
  shortTitle: 'Skill PV levée réserves',
  subtitle:
    'Le tutoriel pas à pas pour rédiger un PV juridique en 3 minutes — au lieu de 30.',

  metaTitle:
    'Tuto skill PV levée de réserves BTP : 3 min au lieu de 30 avec Claude',
  metaDescription:
    "PV de levée de réserves BTP : crée ton skill Claude pour rédiger un procès-verbal juridique en 3 minutes au lieu de 30. Tutoriel gratuit.",
  keywords: [
    'PV levée de réserves',
    'levée de réserves BTP',
    'skill Claude PV réception',
    'tuto PV réserves',
    'réception chantier',
    'garantie parfait achèvement',
    'maître d\'œuvre',
    'CCAG Travaux',
    'NF P03-001',
    'conducteur de travaux',
    'procès-verbal BTP',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'formation IA pour le BTP',
    'Laure Olivié',
    'OFC Création d\'Entreprise',
    'Constructys',
  ],
  ogImageAlt:
    'Tuto Skill PV levée de réserves — procès-verbal BTP en 3 min avec Claude, par Laure Olivié',

  publishedAt: '2026-05-09',
  updatedAt: '2026-05-09',

  cardSummary:
    "Rédige des PV de levée de réserves juridiquement formels en 3 minutes au lieu de 30 : référence au PV de réception, numérotation, photo avant/après, signatures MOE. Routine dossier par réserve dès la réception.",

  heroImage: PHOTOS.tutoPvLeveeReservesHero2026,

  totalTimeMinutes: 30,

  heroLearnPoints: [
    "La structure juridique d'un PV de levée valable",
    '5 étapes pour créer ton skill en 30 minutes',
    'Le prompt exact à donner à Claude',
    "Comment l'utiliser au fur et à mesure de tes interventions",
  ],

  introTitle: 'Pourquoi un skill PV de levée de réserves ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "À la réception, le PV liste 15, 20, parfois 30 réserves. Tu dois toutes les traiter, et faire signer un PV de levée pour chacune.",
    },
    {
      kind: 'paragraph',
      text:
        "Le problème : ces PV finissent dans un Excel mis à jour le dimanche soir, ou pas du tout. Sans PV signés, la garantie de parfait achèvement ne s'éteint pas, le solde du marché reste bloqué, la retenue de garantie n'est pas libérée.",
    },
    { kind: 'h3', text: 'Avec un skill bien construit, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        'Tu interviens sur la réserve sur le chantier',
        'Tu dictes ou tu écris en 1 minute ce qui a été fait',
        'Le skill génère le PV de levée juridiquement formel',
        "Référence à la réserve initiale, action menée, photo avant/après, date, signataires",
        "Tu transmets au maître d'œuvre pour signature dans la foulée",
      ],
    },
    {
      kind: 'highlight',
      text: '3 minutes par réserve. Et surtout : tu le fais au fur et à mesure.',
    },
    {
      kind: 'callout',
      title: 'Ce que le PV doit contenir',
      body:
        "L'identification du chantier et des intervenants. La référence numérotée à la réserve initiale (telle que listée au PV de réception). La description précise des travaux de levée effectués. La date d'intervention et l'identité de l'opérateur. Les photos avant/après. La déclaration que la réserve est levée. Les signatures de l'entreprise et du maître d'œuvre (ou maître d'ouvrage).",
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
            "Active ensuite l'option qui permet à Claude de générer ton PV en Word :",
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
            "Un PV de levée doit être un document Word imprimable, signé manuellement par l'entreprise et le maître d'œuvre. Sans cette capacité activée, Claude ne peut produire que du texte brut. Avec, il génère un PV au format de ton entreprise, prêt à imprimer ou à transmettre numériquement.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière première',
      intro:
        'Le PV de levée est un document juridique récurrent. Voici ce que tu dois préparer pour calibrer ton skill :',
      blocks: [
        { kind: 'h3', text: '1. Tes 2 ou 3 derniers PV de levée' },
        {
          kind: 'paragraph',
          text:
            "En PDF ou Word. Si tu n'en as jamais rédigé, demande à un confrère ou utilise un modèle FFB. Claude apprendra le ton juridique attendu et les formules consacrées.",
        },
        { kind: 'h3', text: '2. Le PV de réception du chantier en cours' },
        {
          kind: 'paragraph',
          text:
            "C'est la pièce centrale : il liste toutes les réserves numérotées avec leur description précise. Ton skill va systématiquement faire référence à ces numéros pour produire un PV traçable.",
        },
        { kind: 'h3', text: '3. Tes données entreprise' },
        {
          kind: 'paragraph',
          text:
            "Raison sociale, SIRET, adresse, coordonnées du conducteur de travaux signataire. Tout ce qui figure dans l'en-tête d'un document officiel.",
        },
        { kind: 'h3', text: '4. Tes formules juridiques habituelles' },
        {
          kind: 'paragraph',
          text:
            "Liste les expressions à utiliser : « la réserve numéro X est levée », « les travaux ont été exécutés conformément aux exigences », « le présent procès-verbal vaut levée définitive ». Claude les intégrera systématiquement.",
        },
        { kind: 'h3', text: '5. Ta charte graphique' },
        {
          kind: 'paragraph',
          text:
            "Logo, couleur, police pour l'en-tête. Le PV doit ressembler à un document officiel de ton entreprise — c'est ce qui rassure le maître d'œuvre et accélère la signature.",
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        'Ouvre une nouvelle conversation. Upload tes anciens PV de levée, le PV de réception du chantier, tes données entreprise, tes formules juridiques et ta charte.',
      blocks: [
        { kind: 'paragraph', text: 'Puis colle ce prompt :' },
        {
          kind: 'prompt',
          title: 'Prompt à copier-coller dans Claude',
          text: `Je suis conducteur de travaux dans une entreprise BTP en [TON MÉTIER].
Je dois rédiger des PV de levée de réserves au fur et à mesure du traitement des réserves émises lors des réceptions de chantier.

Je veux créer un skill Claude qui produit des PV juridiques formels à partir d'un constat factuel court.

J'ai uploadé : mes 2 derniers PV de levée, le PV de réception du chantier en cours, mes données entreprise, mes formules juridiques habituelles et ma charte graphique.

Le skill doit :
1. Accepter en entrée le numéro de la réserve et le constat de levée (action menée, opérateur, date)
2. Faire référence systématique au PV de réception initial (numéro, date, MOE)
3. Produire un PV juridiquement formel avec en-tête entreprise et MOE
4. Inclure un emplacement pour insérer la photo avant/après
5. Intégrer la formule de levée définitive et les emplacements de signatures
6. Produire un fichier Word A4 à ma charte, prêt à imprimer
7. Permettre le traitement par lot (plusieurs réserves levées le même jour) en un seul PV groupé

Avant de créer le skill, pose-moi toutes les questions nécessaires sur mes types de chantiers, mes interlocuteurs MOE habituels et la fréquence d'utilisation.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            "Demande à Claude de toujours numéroter le PV en référence directe à la réserve d'origine (« PV de levée n°7 — référence réserve n°7 du PV de réception du [DATE] »). C'est cette traçabilité qui te protège juridiquement et qui facilite la signature MOE.",
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro:
        "Claude génère un fichier SKILL.md. Avant de le sauvegarder, prends 5 minutes pour le relire. Sur un PV juridique, la précision du vocabulaire compte plus que le style.",
      blocks: [
        { kind: 'h3', text: 'Ce que tu dois vérifier' },
        {
          kind: 'list',
          items: [
            'La référence au PV de réception est systématique',
            "La numérotation des réserves est respectée à l'identique",
            'Les formules de levée définitive sont bien intégrées',
            'Les emplacements signatures sont prévus (entreprise + MOE)',
            "L'emplacement photo avant/après est bien identifié",
            'Le ton est formel mais pas pompeux',
          ],
        },
        { kind: 'h3', text: 'Ajustement type à demander' },
        {
          kind: 'prompt',
          title: "Exemple d'ajustement",
          text: `Pour les réserves liées à des défauts esthétiques (rayure, jeu, décollement léger), ajoute la mention « réception sans nouvelle réserve sur la zone traitée » à la fin du PV.

Et pour les réserves liées à la sécurité (garde-corps, accessibilité PMR, électrique), ajoute systématiquement « conformité aux normes en vigueur attestée ».`,
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
      title: 'Mets en place ta routine de traitement',
      intro:
        "Le skill ne sert à rien si tu attends d'avoir 20 réserves traitées pour rédiger 20 PV d'un coup. La vraie économie de temps vient d'une routine instaurée dès la fin de la réception.",
      blocks: [
        { kind: 'h3', text: 'La bonne méthode dès la réception' },
        {
          kind: 'list',
          items: [
            'Crée un dossier « Réserves-[NOM CHANTIER] » sur ton drive',
            'Sous-dossiers numérotés par réserve : 01_, 02_, 03_…',
            "Chaque fois qu'une réserve est levée, prends une photo avant/après",
            'Range les photos dans le sous-dossier de la réserve concernée',
            'Génère le PV dans la foulée et fais-le signer le jour même si possible',
          ],
        },
        { kind: 'h3', text: 'Le bon prompt à coller le moment venu' },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Voici la levée de réserve à formaliser :
- Chantier : [NOM, ADRESSE]
- Maître d'œuvre : [NOM, ENTREPRISE]
- PV de réception du : [DATE]
- Numéro de la réserve : [N°]
- Description de la réserve initiale : [REPRENDRE LE TEXTE EXACT DU PV DE RÉCEPTION]
- Action menée : [DESCRIPTION COURTE FACTUELLE]
- Date d'intervention : [DATE]
- Opérateur : [NOM, FONCTION]
- Photos disponibles : [OUI / NON]

Génère le PV de levée au format Word, à ma charte, prêt à imprimer et signer.`,
        },
        {
          kind: 'callout',
          title: "La règle d'or",
          body:
            "Fais signer le PV par le MOE le jour même si possible, ou dans la semaine. Plus le délai entre la levée et la signature est court, plus c'est facile. Si tu attends 3 mois, le MOE veut revoir le chantier, demande des justificatifs supplémentaires, et tu repars dans des relances sans fin.",
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Le PV généré par IA est-il valable juridiquement ?',
      a: "Oui. Ce qui compte juridiquement, c'est le contenu, les signatures, la date, et la traçabilité. L'outil utilisé pour rédiger n'a aucune incidence. Le skill produit un PV qui reprend les standards juridiques du BTP (CCAG Travaux pour le public, NF P03-001 pour le privé). C'est toi et le MOE qui validez en signant.",
    },
    {
      q: "Et si le maître d'œuvre refuse de signer ?",
      a: 'Tu envoies le PV en recommandé AR avec mention « PV de levée pour signature ». Si le MOE ne répond pas dans un délai raisonnable (15 jours), tu peux notifier par courrier formel que la réserve est réputée levée à défaut de retour. C\'est un point juridique à valider avec ton avocat conseil sur les dossiers à enjeu.',
    },
    {
      q: 'Faut-il un PV par réserve ou un PV groupé ?',
      a: 'Les deux marchent juridiquement. Le PV unique par réserve est plus traçable mais multiplie les documents. Le PV groupé (toutes les réserves levées le même jour) est plus pratique mais plus dense. Dans le skill, tu peux demander les deux modes — à toi de choisir selon le rythme de ton chantier.',
    },
    {
      q: 'Combien de temps prend la rédaction la première fois ?',
      a: "5 minutes par réserve la première fois, en suivant ce tuto. Les fois suivantes, comptez 3 minutes. À comparer avec 30 minutes par réserve quand tu pars d'un Excel et d'un modèle Word à recopier.",
    },
    {
      q: 'Et si la réserve nécessite plusieurs interventions étalées ?',
      a: "Tu peux générer un PV provisoire avec mention « levée partielle » après la première intervention, puis un PV définitif après la dernière. Le skill gère les deux variantes — précise dans ton prompt « PV de levée partielle » ou « PV de levée définitive ».",
    },
    {
      q: 'Comment intégrer les photos avant/après ?',
      a: "Le skill produit le PV avec un emplacement réservé aux photos. Tu insères ensuite tes photos dans le Word avant impression — soit manuellement, soit via le workflow conducteur de travaux qui automatise l'insertion d'images. Sur les chantiers à enjeu, garde toujours les originaux datés (métadonnées) pour la traçabilité juridique.",
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: 'On le construit ensemble',
    subtitle: 'Atelier individuel ou en équipe — financement possible selon éligibilité (Constructys / OPCO)',
    programTitle: 'Programme « Niveau 2 — Conducteurs de travaux »',
    programItems: [
      'On construit ton skill PV de levée en direct',
      "Calibrage sur tes vrais chantiers et tes interlocuteurs MOE",
      'Un skill opérationnel à la fin de la session',
      'Format individuel ou équipe (4 à 14h)',
    ],
  },
};
