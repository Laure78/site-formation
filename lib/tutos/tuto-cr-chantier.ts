import type { TutoData } from './types';

export const TUTO_CR_CHANTIER: TutoData = {
  slug: 'tuto-cr-chantier',
  category: 'chantier-livrables',
  pdfFile: 'tuto-cr-chantier.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill Compte rendu de chantier',
  shortTitle: 'Skill CR de chantier',
  subtitle:
    'Le tutoriel pas à pas pour transformer 23 minutes de voix en CR rédigé — 5 minutes au lieu de 45.',

  metaTitle: 'Tuto skill CR de chantier : 5 min au lieu de 45 avec Claude',
  metaDescription:
    "CR de chantier IA : transforme 23 min de dictée vocale en compte rendu Word en 5 min. Tutoriel pas à pas pour Claude par Laure Olivié, formatrice IA pour les pro du BTP.",
  keywords: [
    'CR de chantier IA',
    'compte rendu chantier Claude',
    'skill Claude CR BTP',
    'tuto compte rendu chantier',
    'modèle CR chantier BTP',
    'CR conducteur de travaux',
    'dictée vocale chantier',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'automatiser CR chantier',
    'transcription vocale BTP',
    'IA conducteur de travaux',
    'visite de chantier',
    'maître d\'œuvre',
    'formation IA pour le BTP',
    'Laure Olivié',
    'OFC Création d\'Entreprise',
    'Constructys',
  ],
  ogImageAlt:
    'Tuto Skill CR chantier — dictée vocale → compte rendu Word avec Claude, par Laure Olivié',

  publishedAt: '2026-05-09',
  updatedAt: '2026-05-09',

  cardSummary:
    "Transforme tes dictées vocales en compte rendu de chantier rédigé au format de ton entreprise : 5 minutes au lieu de 45 par CR. Workflow voix → Claude → Word + mail d'envoi.",

  totalTimeMinutes: 30,

  heroLearnPoints: [
    "Le workflow voix → CR qui change la vie d'un conducteur",
    '5 étapes pour créer ton skill en 30 minutes',
    'Le prompt exact à donner à Claude',
    "Comment l'utiliser au quotidien sans rien changer à ta routine",
  ],

  introTitle: 'Le workflow qui change tout',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "Le CR de chantier, c'est la corvée préférée de tout le monde. Tu rédiges le soir au bureau, parce que la journée est passée à courir entre les équipes, le maître d'œuvre et les sous-traitants.",
    },
    {
      kind: 'paragraph',
      text: 'Tu finis à 19h. Tu rédiges 4 CR. Le dernier ressemble à du télégramme.',
    },
    { kind: 'h3', text: 'Avec un skill bien construit, voilà ta nouvelle journée' },
    {
      kind: 'list',
      items: [
        'Tu quittes le chantier',
        'Tu démarres ton dictaphone (ou WhatsApp / Otter / ChatGPT vocal)',
        'Tu parles 20 minutes pendant le trajet : avancement, points bloquants, sous-traitants, prochaines étapes',
        'Tu arrives au bureau',
        'Tu colles la transcription dans Claude',
        "Le skill génère le CR. Trame respectée. Format de ton entreprise.",
        'Tu relis, tu signes, tu envoies.',
      ],
    },
    {
      kind: 'highlight',
      text: '5 minutes au lieu de 45. Et tu rentres chez toi avant 18h.',
    },
    {
      kind: 'callout',
      title: 'Ce qui change vraiment',
      body:
        "Tu n'écris plus tes CR — tu les valides. Le contenu reste à 100% le tien : c'est toi qui as observé le chantier, c'est ta voix qui dicte. Le skill ne fait que mettre en forme. La qualité du CR dépend de la qualité de ta dictée — donc de ta présence sur le terrain.",
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active la fonction skills dans Claude',
      intro:
        "Comme pour tous les skills, il te faut un abonnement Claude Pro (18€/mois). La fonction skills n'est pas accessible en version gratuite.",
      blocks: [
        {
          kind: 'paragraph',
          text:
            "Active ensuite l'option qui permet à Claude de générer des fichiers Word :",
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
          title: "L'outil vocal en bonus",
          body:
            "Pour la dictée, tu as plusieurs options gratuites : l'application ChatGPT mobile (bouton micro), WhatsApp (note vocale envoyée à toi-même puis transcrite avec son outil intégré), ou un dictaphone classique. Sur iPhone, tu peux aussi utiliser la dictée vocale native dans Notes.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière première',
      intro:
        "Le CR doit ressembler à ce que ton entreprise envoie déjà. Pour ça, Claude a besoin de tes modèles existants.",
      blocks: [
        { kind: 'h3', text: '1. Tes 3 derniers CR de chantier' },
        {
          kind: 'paragraph',
          text:
            "En PDF ou Word. Claude va analyser ton style, ta structure, ton ton. Si certains sont mieux écrits que d'autres, dis-le lui — il prendra ces exemples comme référence.",
        },
        { kind: 'h3', text: '2. Ta structure type' },
        {
          kind: 'paragraph',
          text:
            "Si tu as déjà une trame standard, parfait. Sinon voici les rubriques classiques d'un CR de chantier :",
        },
        {
          kind: 'list',
          items: [
            'En-tête (chantier, date, présents, absents excusés)',
            'Avancement des travaux',
            'Points bloquants et alertes',
            'Sous-traitants : présence, qualité, planning',
            'Sécurité, observations, incidents',
            'Décisions prises pendant la visite',
            'Actions à mener et leurs responsables',
            'Prochaines étapes / prochaine visite',
          ],
        },
        { kind: 'h3', text: '3. Ton vocabulaire métier' },
        {
          kind: 'paragraph',
          text:
            "Liste 10 mots ou expressions que tu utilises souvent dans tes CR : noms de sous-traitants récurrents, jargon technique, abréviations maison. Ça évite à Claude de transformer « le maço » en « le maçon » alors que tu parlais de « le maçon » mal transcrit.",
        },
        { kind: 'h3', text: '4. Ta charte graphique' },
        {
          kind: 'paragraph',
          text:
            "Logo, couleur principale, police. Pour qu'à l'export, ton CR ressemble à un document officiel de l'entreprise et pas à un mail générique.",
        },
        { kind: 'h3', text: '5. Ta liste de destinataires habituels' },
        {
          kind: 'paragraph',
          text:
            "Le maître d'œuvre, l'architecte, ton chef d'entreprise, les sous-traitants concernés. Claude pourra générer un mail d'envoi avec eux pré-renseignés.",
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        'Ouvre une nouvelle conversation. Upload tes 3 CR, ta structure type et ta charte.',
      blocks: [
        { kind: 'paragraph', text: 'Puis colle ce prompt :' },
        {
          kind: 'prompt',
          title: 'Prompt à copier-coller dans Claude',
          text: `Je suis conducteur de travaux en [TON MÉTIER BTP], je gère [NOMBRE] chantiers en parallèle.

Je veux créer un skill Claude qui transforme mes dictées vocales transcrites en CR de chantier rédigé, conforme au format de mon entreprise.

J'ai uploadé : mes 3 derniers CR, ma structure type, mon vocabulaire métier, ma charte graphique, ma liste de destinataires.

Le skill doit :
1. Gérer une transcription vocale brute (hésitations, redites, mots déformés)
2. Reformuler en français écrit professionnel sans inventer d'infos
3. Reclasser les éléments dans la bonne rubrique de mon CR type
4. Marquer les points à confirmer si ma dictée est ambigüe
5. Produire un fichier Word à ma charte + un mail d'envoi pour mes destinataires habituels

Avant de créer le skill, pose-moi toutes les questions nécessaires.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            "Insiste pour que Claude ne « comble pas les trous ». Si ta dictée ne mentionne pas un sous-traitant, le CR ne doit pas en parler. Mieux vaut « point à confirmer » qu'une info inventée.",
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro:
        'Claude génère un fichier SKILL.md. Avant de le sauvegarder, prends 5 minutes pour le relire.',
      blocks: [
        { kind: 'h3', text: 'Ce que tu dois vérifier' },
        {
          kind: 'list',
          items: [
            'La structure du CR correspond à ce que tu envoies vraiment',
            'Le ton décrit ressemble à ton style (technique, factuel, sans superlatifs)',
            'Le format de date est le bon (12/04/2026, pas April 12 2026)',
            'Les noms des sous-traitants récurrents sont bien orthographiés',
            'Les mentions à confirmer sont bien identifiées (pas fondues dans le texte)',
            "Le mail d'accompagnement est court et professionnel",
          ],
        },
        { kind: 'h3', text: 'Ajustement type à demander' },
        {
          kind: 'prompt',
          title: "Exemple d'ajustement",
          text: `Pour les points bloquants, mets-les en gras et en début de paragraphe. Le maître d'œuvre les rate sinon.

Et n'utilise jamais les mots "approfondir", "synergies" ou "feedback". Reste sur du vocabulaire chantier : avancement, blocage, retard, livraison, calage.`,
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
      title: 'Mets en place ta routine quotidienne',
      intro:
        "Le skill ne sert à rien sans une routine derrière. Voici celle qui marche, testée par plusieurs conducteurs de travaux :",
      blocks: [
        { kind: 'h3', text: 'Le moment de la dictée' },
        {
          kind: 'paragraph',
          text:
            "Pendant le trajet retour du chantier. C'est le seul moment où tu es au calme, avec le chantier encore frais en tête. Si tu es au volant, utilise le mode mains libres ou un dictaphone qui ne demande pas de manipulation.",
        },
        { kind: 'h3', text: 'La structure de ta dictée vocale' },
        {
          kind: 'paragraph',
          text:
            "Suis toujours le même ordre. Ça aide Claude à classer, et ça t'aide toi à ne rien oublier :",
        },
        {
          kind: 'list',
          items: [
            '« Chantier [NOM], visite du [DATE] »',
            '« Présents : [LISTE] »',
            '« Avancement : [DÉTAILS PAR LOT] »',
            '« Points bloquants : [DÉTAILS] »',
            "« Sous-traitants : [QUI ÉTAIT LÀ, QUI MANQUAIT, QUALITÉ DU TRAVAIL] »",
            "« Sécurité : [OBSERVATIONS, INCIDENTS] »",
            '« Décisions prises : [LISTE] »',
            '« Actions à mener : [QUI FAIT QUOI POUR QUAND] »',
            '« Prochaine visite : [DATE] »',
          ],
        },
        { kind: 'h3', text: 'Le bon prompt à coller' },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Voici la transcription de ma dictée chantier d'aujourd'hui :

[COLLE ICI LA TRANSCRIPTION VOCALE]

Génère le CR de chantier au format Word de mon entreprise. Marque clairement les points à confirmer si ma dictée est ambigüe. Génère aussi le mail d'envoi pour mes destinataires habituels.`,
        },
        {
          kind: 'callout',
          title: "La règle d'or",
          body:
            "Ne jamais envoyer un CR sans le relire. Le skill fait 95% du travail, mais c'est ton nom qui est dessus. Vérifie surtout les noms propres, les dates et les montants — ce sont les points où une transcription vocale peut déraper.",
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: "Et si je n'ai pas de connexion internet sur le chantier ?",
      a: "Ce n'est pas grave. Tu enregistres ta dictée en mode hors ligne (dictaphone, Notes, mémo vocal). Tu fais la transcription et tu utilises Claude une fois rentré au bureau ou dès que tu retrouves du réseau. Le skill n'a pas besoin de tourner en temps réel.",
    },
    {
      q: 'Quel outil utiliser pour la transcription vocale ?',
      a: "Plusieurs options gratuites : l'app ChatGPT mobile transcrit très bien le français même avec du jargon technique. Sur iPhone, l'app Notes a une dictée vocale native. Pour les vidéos, des outils comme Otter, Whisper ou même YouTube produisent des transcriptions correctes. Le critère qui compte : que la transcription gère bien les noms de sous-traitants et les abréviations métier.",
    },
    {
      q: 'Mon skill peut-il être utilisé par mon associé ou un autre conducteur de travaux ?',
      a: "Pas directement. Les skills sont attachés à un compte Claude personnel. Pour le partager : exporte le fichier SKILL.md, et chaque membre de l'équipe l'importe dans son propre compte. Une version Team de Claude existe pour les entreprises qui veulent mutualiser.",
    },
    {
      q: 'Combien de temps ça prend pour générer un CR ?',
      a: 'Une fois le skill en place : 30 secondes pour que Claude génère le CR à partir de la transcription. 5 minutes pour le relire et signer. À comparer avec 30 à 45 minutes pour rédiger le même CR à la main.',
    },
    {
      q: 'Et si ma dictée est en anglais ou en franglais ?',
      a: "Claude gère bien le franglais. Si tu travailles en anglais avec un maître d'ouvrage international, demande-lui de générer une version FR + une version EN. Précise dans ton skill que les noms propres (chantier, entreprises) ne doivent pas être traduits.",
    },
    {
      q: 'Et si Claude se trompe sur des termes techniques ?',
      a: "Tu corriges, et tu lui dis de mémoriser la correction. Plus tu utilises le skill, plus il devient précis sur ton métier. Les premières semaines, tu corrigeras 5 ou 6 termes par CR. Au bout d'un mois, c'est zéro.",
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: 'On le construit ensemble',
    subtitle: 'Atelier individuel ou en équipe — financement possible selon éligibilité (Constructys / OPCO)',
    programTitle: 'Programme « Niveau 2 — Skills BTP »',
    programItems: [
      'On construit ton skill CR sur tes vrais chantiers',
      'Calibrage sur ton vocabulaire et ta façon de dicter',
      'Un skill opérationnel à la fin de la session',
      'Format individuel (1h30) ou équipe conducteurs (4 à 14h)',
    ],
  },
};
