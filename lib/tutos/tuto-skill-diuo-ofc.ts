import type { TutoData } from './types';

export const TUTO_SKILL_DIUO_OFC: TutoData = {
  slug: 'tuto-skill-diuo-ofc',
  category: 'chantier-livrables',
  pdfFile: 'tuto-skill-diuo-ofc.docx',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill Pièces DIUO pour le SPS',
  shortTitle: 'Skill pièces DIUO',
  subtitle:
    'Le tutoriel pas à pas pour préparer ta liasse DIUO — 30 minutes au lieu d’une demi-journée de course.',

  metaTitle: 'Tuto skill DIUO : pièces SPS pour ton lot en 30 min',
  metaDescription:
    'Tuto skill DIUO SPS : préparer la liasse pièces lot en 30 min avec Claude. Formation IA pour le BTP, présentiel Île-de-France, Qualiopi — tuto gratuit.',
  keywords: [
    'DIUO BTP',
    'dossier intervention ultérieure ouvrage',
    'pièces DIUO SPS',
    'coordonnateur SPS',
    'skill Claude DIUO',
    'tuto DIUO',
    'plans de récolement',
    'sécurité permanente chantier',
    'Code du travail R4532-95',
    'DOE vs DIUO',
    'réception chantier',
    'conducteur de travaux',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'formation IA pour le BTP',
    'Laure Olivié',
    "OFC Création d'Entreprise",
    'Constructys',
  ],
  ogImageAlt:
    'Professionnelle BTP, prépa DIUO pour le SPS — pièces lot chantier formation IA pour le BTP',

  publishedAt: '2026-07-24',
  updatedAt: '2026-07-24',

  cardSummary:
    'Prépare ta liasse DIUO pour le coordonnateur SPS : plans de récolement, sécurité permanente, accès, notices et checklist fourni / manquant — 30 minutes au lieu d’une demi-journée.',

  totalTimeMinutes: 30,

  heroImage: {
    src: '/images/ressources/miniatures/miniature-tuto-diuo.jpg',
    alt: 'Professionnelle BTP, prépa DIUO pour le SPS — pièces lot chantier formation IA pour le BTP',
    width: 1200,
    height: 675,
  },

  heroLearnPoints: [
    'Réunir les pièces DIUO que le coordonnateur SPS attend de ton lot',
    'Structurer la liasse par rubrique : plans, sécurité, accès, notices',
    'Repérer ce qui manque avant d’envoyer, pour ne pas être relancé',
    'Remettre un dossier carré du premier coup, sans bloquer la réception',
  ],

  introTitle: 'Pourquoi un skill Pièces DIUO pour le SPS ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        'Sur un chantier où plusieurs entreprises interviennent, c’est le coordonnateur SPS qui élabore le DIUO — Dossier d’Intervention Ultérieure sur l’Ouvrage — qui permettra aux entreprises intervenant plus tard (maintenance, réparation, rénovation) de travailler en sécurité. Pour cela, il réclame à chaque entreprise les pièces de son lot. Le DIUO relève du Code du travail (art. R.4532-95 et suivants) et le SPS en reste responsable. Ton rôle : lui fournir des pièces propres et complètes, dans les délais.',
    },
    {
      kind: 'paragraph',
      text:
        'En pratique, ces pièces sont éparpillées entre le bureau, les mails et le chef de chantier. On les rassemble en catastrophe à l’approche de la réception. Résultat : envois incomplets, relances du SPS, réception qui traîne. Et une pièce sécurité oubliée — un ancrage, une trappe — c’est un risque pour le technicien qui reviendra dans cinq ans.',
    },
    { kind: 'h3', text: 'Avec un skill bien construit, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        'Il liste les pièces DIUO attendues pour ton lot et repère celles qui manquent.',
        'Il structure la liasse par rubrique : plans, sécurité permanente, accès, notices.',
        'Il rédige les précautions d’intervention future sur tes ouvrages.',
        'Il te prépare un envoi carré, prêt à transmettre au coordonnateur SPS.',
        'Il te fait gagner la course aux pièces de dernière minute.',
      ],
    },
    {
      kind: 'highlight',
      text: 'Tu arrêtes de courir après tes propres pièces la veille de la réception.',
    },
    {
      kind: 'callout',
      title: 'Ce que le SPS attend de ton lot',
      body:
        'Plans de récolement (tel que réalisé) · Notices techniques des équipements posés · Dispositifs de sécurité permanents (ancrages, lignes de vie, trappes, garde-corps) · Accès et précautions pour les interventions futures. — À ne pas confondre : PAQ = qualité pendant les travaux · DOE = ce qui a été construit · DIUO = sécurité des interventions futures (compilé par le SPS).',
    },
    {
      kind: 'callout',
      title: 'Cas concret — pourquoi tes pièces comptent',
      body:
        '5 ans après la livraison, un couvreur remonte en toiture. Il cherche tes ancrages, l’accès sécurisé et les précautions dans TON dossier DIUO. Si tes pièces manquent : il découvre tout sur place, au risque de l’accident. Bien préparées : il intervient en sécurité — et ta réception n’a pas traîné.',
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active la fonction Skills',
      intro:
        'Pré-requis — un compte Claude. Le compte gratuit suffit pour démarrer (plus de « Pro obligatoire » depuis fin 2025). Attention : le plan gratuit est limité en tokens par session et sature vite sur les dossiers BTP lourds avec pièces jointes (plans, notices, fiches sécurité). Pour un usage pro quotidien, le plan Pro à 18€ HT/mois est recommandé.',
      blocks: [
        { kind: 'h3', text: 'Le chemin d’activation (interface 2026)' },
        {
          kind: 'list',
          items: [
            'Clique sur ton avatar en bas à gauche, puis sur « Personnaliser » (ou « Customize »).',
            'Ouvre l’onglet « Compétences » (ou « Skills »).',
            'Clique sur le bouton « + » en haut à droite.',
            'Choisis « + Créer une compétence » (création assistée par Claude) ou « Téléverser une compétence » pour importer un ZIP existant.',
          ],
        },
        {
          kind: 'callout',
          title: 'Pré-requis technique',
          body:
            'Active aussi l’option « Exécution de code » dans le même menu Personnaliser : sans elle, pas de sortie Word ou PDF en livrable. À ne plus utiliser : l’ancien chemin Settings → Capabilities → 3 toggles, qui est obsolète.',
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière',
      intro:
        'Plus tu donnes de contexte réel à Claude, plus le skill colle à ce que ton SPS attend. Réunis ces cinq éléments avant de lancer la conversation.',
      blocks: [
        {
          kind: 'numberedList',
          items: [
            'Tes plans de récolement — le « tel que réalisé » de ton lot : c’est la base sur laquelle le futur intervenant se repérera.',
            'Les notices techniques — notices des équipements que tu as posés (CVC, électricité, serrurerie…), utiles à la maintenance.',
            'Tes dispositifs de sécurité permanents — ancrages, lignes de vie, trappes, garde-corps : ce qui protégera l’intervenant, avec leur localisation précise.',
            'Les accès à tes ouvrages — toitures, locaux techniques, gaines : comment on atteint tes ouvrages en sécurité.',
            'Une liasse DIUO déjà transmise — un modèle de la structure attendue par le SPS : le skill reproduira ce format plutôt qu’un générique.',
          ],
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        'Ouvre une nouvelle conversation, charge ta matière et colle le prompt de cadrage ci-dessous. Il définit le rôle, la structure de sortie et les règles que le skill devra respecter à chaque usage.',
      blocks: [
        {
          kind: 'prompt',
          title: 'Prompt de création',
          text: `Tu es mon assistant de préparation des pièces DIUO à transmettre au
coordonnateur SPS, pour mon lot [métier].

À partir des pièces que je te donne (plans de récolement, notices,
fiches sécurité, accès), tu prépares une liasse structurée en rubriques :
1. Plans de récolement (tel que réalisé)
2. Dispositifs de sécurité permanents (ancrages, lignes de vie,
trappes, garde-corps) avec localisation
3. Accès à mes ouvrages (toitures, locaux techniques, gaines)
4. Précautions pour les interventions futures, poste par poste
5. Notices techniques des équipements posés

Tu signales les pièces manquantes au lieu de les inventer. Tu rappelles
que le SPS élabore le DIUO : moi je fournis, lui il compile.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            'Le SPS n’attend pas un DIUO fini de ta part — il attend TES pièces, propres et repérées. Demande au skill de sortir une liste de contrôle « fourni / manquant » avant tout envoi : c’est ce qui évite les allers-retours.',
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro: 'Ce que tu dois vérifier',
      blocks: [
        {
          kind: 'list',
          items: [
            'Le ton et la structure correspondent-ils à ce que ton SPS attend ?',
            'Les rubriques sont-elles complètes (plans, sécurité, accès, précautions, notices) ?',
            'Le skill demande-t-il les pièces manquantes au lieu de les inventer ?',
            'La checklist « fourni / manquant » est-elle bien présente ?',
            'Les localisations (ancrages, trappes, accès) sont-elles repérées ?',
            'Le livrable s’exporte-t-il au bon format (Word / PDF) ?',
          ],
        },
        {
          kind: 'prompt',
          title: 'Exemple d’ajustement',
          text:
            'Ajoute une page de garde par rubrique avec la liste des pièces jointes, et une checklist finale « fourni / manquant » à cocher avant envoi au SPS.',
        },
        { kind: 'h3', text: 'Active le skill' },
        {
          kind: 'paragraph',
          text:
            'Quand le rendu te convient, enregistre la conversation comme compétence : Personnaliser → Compétences → « + Créer une compétence ». Donne-lui un nom clair et une description qui dit quand le déclencher. Il sera réutilisable en un clic sur tous tes prochains chantiers.',
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Teste sur un vrai chantier',
      intro: 'Le test',
      blocks: [
        {
          kind: 'list',
          items: [
            'Ouvre une conversation et appelle ton skill Pièces DIUO.',
            'Joins tes pièces (plans de récolement, notices, fiches sécurité).',
            'Précise ton lot, le chantier et la date de réception prévue.',
            'Relis la liasse, complète ce que le skill te réclame.',
            'Vérifie la checklist « fourni / manquant » avant d’envoyer au SPS.',
          ],
        },
        { kind: 'h3', text: 'Le bon prompt pour les usages quotidiens' },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Lot [métier], chantier [nom], réception prévue le [date].
Pièces en PJ : plans de récolement, notices CVC, fiches sécurité toiture.
Prépare ma liasse DIUO pour le SPS, rubrique par rubrique, rédige les
précautions d’intervention en toiture, et liste ce qui me manque.`,
        },
        {
          kind: 'callout',
          title: 'La règle d’or',
          body:
            'Prépare tes pièces au fil du chantier, pas la veille de la réception. Lance le skill à chaque phase (pose, mise en service) pour compléter ta liasse — le SPS te réclame moins, la réception avance.',
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'C’est à moi de faire le DIUO ?',
      a: 'Non. Quand plusieurs entreprises interviennent, c’est le coordonnateur SPS qui élabore et met à jour le DIUO, et il en reste responsable (Code du travail). Ton rôle est de lui fournir les pièces de ton lot. Le skill prépare ces pièces, il ne se substitue pas au SPS.',
    },
    {
      q: 'Quelle différence entre DOE et DIUO ?',
      a: 'Le DOE est la mémoire technique de ce qui a été construit. Le DIUO se concentre sur la sécurité des interventions futures. Certaines pièces se recoupent (plans, notices), mais pour le DIUO le SPS attend l’angle accès, sécurité permanente et précautions.',
    },
    {
      q: 'Quelles pièces le SPS attend-il exactement ?',
      a: 'Pour ton lot : plans de récolement, dispositifs de sécurité permanents avec localisation, accès à tes ouvrages, précautions d’intervention et notices des équipements. Le skill en fait la checklist et te dit ce qui manque.',
    },
    {
      q: 'Le skill invente-t-il des données ?',
      a: 'Non, et c’est vital : il structure ce que tu lui donnes et signale les manques. Un accès ou une protection inventés seraient dangereux pour le technicien qui reviendra sur l’ouvrage. C’est un point que je fais travailler systématiquement en formation.',
    },
    {
      q: 'Mes données sont-elles confidentielles ?',
      a: 'Sur les plans professionnels, tes échanges ne servent pas à entraîner les modèles. Vérifie toutefois les conditions de l’éditeur, et évite de déposer des pièces couvertes par une clause de confidentialité sans l’accord de ton client.',
    },
    {
      q: 'Et si je livre mes pièces en retard ?',
      a: 'Le SPS relance, la mise à jour du DIUO traîne, et cela peut retarder la réception. Préparer la liasse tôt et complète évite ce blocage — et évite surtout de bricoler un dossier sécurité dans l’urgence.',
    },
    {
      q: 'Combien de temps pour créer le skill ?',
      a: 'Compte 20 à 30 minutes de cadrage, plus un essai sur un dossier que tu connais déjà pour caler le format attendu par ton SPS. Ensuite, il est réutilisable sur tous tes chantiers.',
    },
  ],

  cta: {
    eyebrow: 'ENVIE D’ALLER PLUS LOIN ?',
    title: 'On le construit ensemble',
    subtitle:
      'Atelier individuel ou en équipe — financement possible selon éligibilité (Constructys / OPCO)',
    programTitle: 'Programme « Niveau 2 — Dirigeants & QHSE »',
    programItems: [
      'On construit ton skill ensemble, sur tes vrais dossiers de chantier.',
      'On le calibre sur les attentes de ton coordonnateur SPS et de tes lots.',
      'Tu repars avec un skill opérationnel, utilisable dès la prochaine réception.',
      'Format individuel ou équipe — 4 à 14 h, en présentiel en Île-de-France.',
    ],
  },
};
