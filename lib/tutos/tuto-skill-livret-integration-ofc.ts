import type { TutoData } from './types';

export const TUTO_SKILL_LIVRET_INTEGRATION_OFC: TutoData = {
  slug: 'tuto-skill-livret-integration-ofc',
  category: 'qse-conformite',
  pdfFile: 'tuto-skill-livret-integration-ofc.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: "Crée ton skill Livret d'intégration",
  shortTitle: "Skill livret d'intégration",
  subtitle:
    'Le tutoriel pas à pas pour accueillir un nouveau collaborateur. 20 minutes au lieu de 2 journées.',

  metaTitle: "Tuto skill livret d'intégration BTP en 20 min",
  metaDescription:
    "Tuto skill livret d'intégration BTP : accueil sécurité, parcours J1/S1/M1 et EPI en 20 min avec Claude. Formation IA pour le BTP, présentiel Île-de-France.",
  keywords: [
    "livret d'intégration BTP",
    "livret d'accueil chantier",
    'accueil sécurité embauche',
    'parcours J1 S1 M1',
    'EPI nouveau collaborateur',
    'skill Claude RH BTP',
    'formation sécurité L.4141-2',
    'intérimaire BTP',
    'apprenti BTP',
    'référent sécurité',
    'DUERP consignes',
    'carte BTP',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'formation IA pour le BTP',
    'Laure Olivié',
    "OFC Création d'Entreprise",
    'Constructys',
  ],
  ogImageAlt:
    "Livret d'intégration BTP — skill Claude accueil sécurité et parcours J1 S1 M1 formation IA",

  publishedAt: '2026-08-06',
  updatedAt: '2026-08-06',

  cardSummary:
    "Génère un livret d'accueil complet à partir de tes documents internes : sécurité, EPI, organigramme et parcours J1 / S1 / M1 — 20 minutes au lieu de deux journées.",

  totalTimeMinutes: 20,

  heroLearnPoints: [
    "Transformer tes documents internes en un livret d'accueil complet et à jour",
    "Générer un parcours d'intégration J1 / S1 / M1 adapté à chaque poste",
    "Sécuriser l'accueil sécurité obligatoire à l'embauche, sans rien oublier",
    "Partager la compétence à ton équipe et la retrouver directement dans Word",
  ],

  introTitle: "Pourquoi un skill Livret d'intégration ?",
  introBlocks: [
    {
      kind: 'paragraph',
      text: "Le livret d'intégration n'est pas un document de communication. C'est le premier maillon de la chaîne sécurité et de la fidélisation. Le Code du travail impose à l'employeur d'organiser une information et une formation à la sécurité au bénéfice de chaque salarié à l'embauche (article L.4141-2), renforcée pour les salariés en CDD ou en intérim affectés à des postes présentant des risques particuliers. Dans le BTP, cet accueil se joue le premier matin, souvent entre le café et le départ sur chantier.",
    },
    {
      kind: 'paragraph',
      text: "Dans les faits, le livret est presque toujours refait à la main. Une demi-journée à une journée pour bâtir la première version, puis deux à trois heures à chaque recrutement pour l'adapter au poste, au chantier, aux EPI et aux interlocuteurs. Et quand la version est ancienne, elle ressort avec l'organigramme d'il y a deux ans et un référent sécurité qui a quitté l'entreprise. Or les salariés de moins d'un an d'ancienneté restent surreprésentés dans les accidents du travail du secteur : c'est exactement la période que le livret est censé couvrir.",
    },
    { kind: 'h3', text: 'Avec un skill bien construit, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        "un livret complet généré à partir du poste, du chantier d'affectation et de tes documents internes",
        "le parcours d'intégration structuré en trois horizons : premier jour, première semaine, premier mois",
        'le volet sécurité systématiquement présent : risques du poste, EPI, consignes chantier, conduite à tenir en cas d\'accident',
        "la checklist administrative d'embauche générée en même temps (DPAE, visite médicale, carte BTP, mutuelle, badge, EPI remis)",
        'un ton et une mise en forme constants, quel que soit celui qui lance la demande',
      ],
    },
    {
      kind: 'highlight',
      text: 'Tu ne réécris plus un livret : tu décris un poste, et le livret sort déjà rédigé.',
    },
    {
      kind: 'callout',
      title: "Les 8 blocs d'un livret d'intégration BTP",
      body: "1. Mot d'accueil et présentation de l'entreprise (métiers, chantiers types, valeurs) · 2. Organigramme et interlocuteurs clés (encadrement, RH, référent sécurité, tuteur) · 3. Fiche de poste et attendus des premières semaines · 4. Sécurité : risques du poste, EPI fournis, consignes chantier, procédure accident · 5. Règles internes : horaires, pointage, véhicules, matériel, tenue, téléphone · 6. Administratif : documents à fournir, mutuelle, prévoyance, congés, notes de frais · 7. Outils et accès : logiciels, boîte mail, applications de suivi de chantier · 8. Parcours J1 / S1 / M1 avec points d'étape et signature du tuteur",
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active les Compétences',
      intro:
        "Une compétence (skill), c'est une procédure que tu écris une fois et que Claude réutilise tout seul dès que ta demande correspond. Les compétences sont disponibles sur tous les plans, y compris le plan gratuit. Deux réglages à faire avant de créer la tienne, dans cet ordre.",
      blocks: [
        { kind: 'h3', text: "1. Active l'exécution de code et la création de fichiers" },
        {
          kind: 'paragraph',
          text: "Va dans Réglages, onglet Fonctionnalités (Settings → Capabilities), et active « Exécution de code et création de fichiers ». C'est le pré-requis technique : sans lui, la section Compétences reste invisible ou grisée, et Claude ne peut pas te livrer de fichier Word ou PDF. Sur un plan Team ou Entreprise, ce réglage relève du propriétaire du compte, dans les Paramètres de l'organisation.",
        },
        { kind: 'h3', text: "2. Ouvre l'espace Compétences" },
        {
          kind: 'list',
          items: [
            'clique sur ton avatar, puis sur « Personnaliser » (Customize)',
            "ouvre l'onglet « Compétences » (Skills) — adresse directe : claude.ai/customize/skills",
            'clique sur le bouton « + » en haut à droite',
            'choisis « Créer une compétence » pour te faire guider par Claude, ou « Téléverser une compétence » pour importer un ZIP',
            "les compétences déjà en place s'activent et se désactivent d'un simple interrupteur",
          ],
        },
        {
          kind: 'callout',
          title: 'Nouveau — Enregistrer une compétence',
          body: "Plutôt que de décrire ta méthode, tu peux la montrer. Sur les plans Pro, Max et Team, dans Cowork sur Mac, Claude filme ton écran pendant que tu fais la tâche, t'écoute la commenter, puis te propose la compétence correspondante à valider. Un enregistrement dure une dizaine de minutes maximum. Commente à voix haute pendant que tu travailles : c'est le contexte que l'écran seul ne montre pas. À ne pas faire : afficher un mot de passe, un salaire ou un dossier salarié pendant l'enregistrement. Tout ce qui est à l'écran est capté.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière',
      intro:
        'La qualité du livret dépend entièrement de ce que tu donnes à Claude au départ. Compte vingt minutes de collecte, une seule fois. Ensuite le skill fonctionne sans que tu aies à redonner quoi que ce soit.',
      blocks: [
        {
          kind: 'numberedList',
          items: [
            "Tes deux ou trois derniers documents d'accueil — Livret existant même incomplet, mail d'accueil type, note de service, plaquette de présentation. Ce sont eux qui portent ton ton, ton vocabulaire et tes règles maison.",
            "Ton organigramme et ta nomenclature de postes — Qui encadre qui, qui est le référent sécurité, qui gère les EPI, qui traite les heures et les congés. Ajoute la liste de tes intitulés réels : chef d'équipe, chef de chantier, conducteur de travaux, assistant travaux, apprenti.",
            "Tes données historiques — Fiches de poste, entretiens de fin de période d'essai, retours des dernières intégrations. Les questions qui reviennent chez tous les nouveaux sont exactement celles que le livret doit traiter d'avance.",
            'Tes contraintes et règles spécifiques — Consignes issues de ton DUERP, EPI fournis par poste, règles véhicules et matériel, horaires et pointage, tenue de chantier, usage du téléphone, procédure en cas d\'accident ou de presque-accident.',
            "Tes templates et plans types — Charte graphique, logo, trame de livret si tu en as une, et surtout ta grille de parcours J1 / S1 / M1 avec les points d'étape à faire signer par le tuteur.",
          ],
        },
        {
          kind: 'callout',
          title: "Ce que tu n'as pas à préparer",
          body: "Ne perds pas de temps à mettre au propre. Un scan de travers, un PDF de 2019, un tableau Excel mal aligné : Claude s'en accommode. Ce qui compte, c'est que l'information existe quelque part.",
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation',
      intro:
        'Ouvre une conversation, joins les documents rassemblés à l\'étape 2, puis colle le prompt ci-dessous. Claude va te poser des questions de cadrage avant de construire la compétence : réponds avec tes réalités de terrain, pas avec des généralités.',
      blocks: [
        {
          kind: 'prompt',
          title: 'Prompt — Création du skill',
          text: `Je veux créer une compétence qui rédige les livrets d'intégration
des nouveaux collaborateurs de mon entreprise de BTP.

Contexte : entreprise de [ton activité], [effectif] salariés,
chantiers en [zone]. Je recrute des [postes] et j'accueille aussi
des apprentis et des intérimaires.

En entrée, je donnerai : nom, poste, date d'arrivée, chantier ou
agence, tuteur, statut (CDI, CDD, apprenti, intérim).

En sortie : un livret complet en Word, en 8 blocs — accueil et
présentation, organigramme et interlocuteurs, fiche de poste et
attendus, sécurité (risques du poste, EPI, consignes chantier,
procédure accident), règles internes, administratif, outils et
accès, parcours J1 / S1 / M1 avec cases à cocher et signature.

Règles : reprends le ton des documents joints, adapte la sécurité
et les EPI au poste, renforce ce volet pour les CDD, intérimaires
et apprentis, et n'invente JAMAIS un nom, un chiffre ou une
garantie absent de mes documents — signale-les en [À COMPLÉTER].

Rédige la description de la compétence en moins de 200 caractères.
Pose-moi les questions nécessaires avant de la créer.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body: "La consigne qui change tout est l'avant-dernière : « n'invente jamais, signale en [À COMPLÉTER] ». Un livret d'intégration engage l'entreprise. Un nom de référent sécurité inventé, un taux de mutuelle approximatif ou un EPI oublié ne sont pas des détails de rédaction : ce sont des erreurs opposables. Mieux vaut un livret avec trois champs à compléter qu'un livret plausible et faux.",
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro:
        "Claude te propose une première version de la compétence. Ne l'active pas tout de suite : relis-la comme tu relirais une procédure interne. Six points à vérifier.",
      blocks: [
        {
          kind: 'list',
          items: [
            'les 8 blocs du livret sont bien présents et dans ton ordre à toi',
            'le volet sécurité est renforcé pour les postes à risques particuliers, les CDD, les intérimaires et les apprentis',
            'les EPI listés correspondent réellement à ceux que tu fournis, poste par poste',
            'les interlocuteurs cités sont des fonctions, pas des personnes figées, pour que le livret ne périme pas au premier départ',
            "le parcours J1 / S1 / M1 se termine par un point d'étape signé, exploitable en fin de période d'essai",
            'la description tient en moins de 200 caractères et dit clairement quand déclencher la compétence',
          ],
        },
        {
          kind: 'prompt',
          title: "Prompt — Exemple d'ajustement",
          text: `Deux corrections sur la compétence :
1. Dans le bloc sécurité, ajoute systématiquement un encadré
   « les 5 réflexes du premier jour sur notre chantier » : accueil
   par le chef de chantier, repérage des issues et du point de
   rassemblement, localisation de la trousse de secours,
   présentation du référent sécurité, remise des EPI contre
   signature.
2. Dans le parcours d'intégration, remplace le point d'étape unique
   à un mois par trois points : fin de J1, fin de S1, fin de M1,
   chacun avec une ligne de signature nouveau collaborateur
   et tuteur.`,
        },
        { kind: 'h3', text: 'Modifier sans tout réécrire' },
        {
          kind: 'paragraph',
          text: "Pendant que tu ajustes la compétence en conversation, ses fichiers s'ouvrent à côté du fil de discussion. Surligne le passage à changer, clique sur « Modifier avec Claude » et dicte ta correction. Si ta compétence contient plusieurs fichiers, laisse tes demandes de modification dans chacun, puis envoie-les ensemble : Claude les applique en une seule passe.",
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Teste sur un vrai recrutement',
      intro:
        'Ne teste pas sur un cas fictif : prends ton dernier embauché, celui dont tu connais déjà les questions et les points de friction. C\'est le seul moyen de voir ce que le skill oublie.',
      blocks: [
        {
          kind: 'list',
          items: [
            'lance la génération avec les informations réelles du poste et du chantier',
            "relis le livret en te mettant à la place de quelqu'un qui arrive le lundi matin sans rien connaître",
            'traque les [À COMPLÉTER] : ce sont tes trous documentaires, pas des défauts du skill',
            'fais relire le volet sécurité par ton référent sécurité ou ton chef de chantier',
            'reprends les remarques et demande un ajustement de la compétence, pas seulement du document',
          ],
        },
        {
          kind: 'prompt',
          title: 'Prompt — Utilisation quotidienne',
          text: `Livret d'intégration pour :
Nom            : [prénom nom]
Poste          : [intitulé exact]
Statut         : [CDI / CDD / apprenti / intérim]
Arrivée        : [date]
Affectation    : [chantier ou agence]
Tuteur         : [nom et fonction]
Particularités : [travail en hauteur, conduite d'engin, port de
                 charges, habilitation électrique, aucune]
Génère le livret complet en Word, avec le parcours J1 / S1 / M1
et les lignes de signature.`,
        },
        {
          kind: 'callout',
          title: "La règle d'or",
          body: "Le livret ne remplace pas l'accueil. Il le rend possible. Le document ne vaut que par la demi-heure que quelqu'un passe à le parcourir avec le nouveau, sur site, EPI en main. Le skill te rend cette demi-heure disponible en supprimant les deux heures de mise en forme qui la précédaient.",
        },
        { kind: 'h3', text: 'Aller plus loin : 3 leviers récents' },
        {
          kind: 'numberedList',
          items: [
            "Partage la compétence à ton équipe — Sur les plans Team et Entreprise, tu peux partager une compétence avec une personne précise ou avec toute l'organisation, via l'annuaire interne. Chaque destinataire l'active de son côté et reçoit automatiquement tes mises à jour. Le partage est en lecture seule, et désactivé par défaut : c'est le propriétaire du compte qui doit l'ouvrir. Tu construis le livret une fois, toute l'équipe produit exactement le même document.",
            "Retrouve ton skill directement dans Word et Outlook — Les compétences activées dans ton compte sont aussi disponibles dans les modules Claude pour Word, Excel, PowerPoint et Outlook. Tu tapes « / » dans le volet latéral pour choisir la compétence, ou tu décris simplement ta tâche. Pour un livret, ça veut dire finir la mise en forme sans quitter le document, et enchaîner sur le mail d'accueil dans la foulée.",
            "Découpe plutôt que d'empiler — La tentation est de tout mettre dans un seul skill géant. Plusieurs compétences focalisées se combinent mieux qu'une seule qui fait tout : Claude en charge automatiquement plusieurs quand la tâche l'exige. Garde le livret d'un côté, la checklist administrative d'embauche de l'autre, et l'entretien de fin de période d'essai en troisième.",
          ],
        },
        {
          kind: 'callout',
          title: 'Deux réflexes à garder',
          body: "Entretien — une à deux fois par an, redonne à la compétence ton organigramme actualisé et tes consignes sécurité révisées. Cinq minutes, et toutes les générations suivantes repartent sur des bases justes. Sécurité — n'installe que des compétences de source fiable. Une compétence reçue d'un collègue ou téléchargée se relit avant activation, en particulier les scripts et les fichiers joints.",
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Un seul skill peut-il servir pour un apprenti et pour un conducteur de travaux ?',
      a: "Oui, et c'est même l'intérêt. Le skill garde une structure unique et fait varier le contenu selon le poste, le statut et les particularités déclarées. L'apprenti reçoit un volet sécurité renforcé, un tutorat détaillé et le rythme école-entreprise ; le conducteur de travaux reçoit les accès outils, les délégations et les interlocuteurs externes.",
    },
    {
      q: "Le livret suffit-il à remplir mon obligation de formation à la sécurité ?",
      a: "Non, et il ne faut pas le présenter comme tel. L'obligation porte sur une information et une formation pratiques, appropriées au poste et adaptées à la personne. Le livret documente et trace cet accueil, il ne le remplace pas. En revanche, la fiche de parcours signée qu'il contient constitue un élément de preuve utile.",
    },
    {
      q: 'Faut-il un abonnement payant pour créer la compétence ?',
      a: "Non. Les compétences sont accessibles sur tous les plans, plan gratuit compris, à condition d'avoir activé l'exécution de code et la création de fichiers. Le plan gratuit reste limité en volume par session : sur un livret avec plusieurs pièces jointes, tu risques de buter en pleine génération. Pour un usage professionnel quotidien, un plan payant est la configuration confortable.",
    },
    {
      q: 'Puis-je partager le skill avec mon assistante et mes conducteurs de travaux ?',
      a: "Oui, sur les plans Team et Entreprise, une fois le partage ouvert par le propriétaire du compte. Sur un plan individuel, chaque personne téléverse la compétence sur son propre compte : tu exportes ton skill en ZIP et tu le transmets. Dans les deux cas, garde une seule version de référence.",
    },
    {
      q: 'Claude peut-il inventer un nom ou un chiffre ?',
      a: "Il le peut si tu ne le lui interdis pas, d'où la consigne explicite du prompt de l'étape 3. Avec la règle [À COMPLÉTER] posée dès la création, le comportement devient stable. Garde malgré tout une relecture humaine sur trois points sensibles : les noms et fonctions, les garanties mutuelle et prévoyance, et la liste des EPI par poste.",
    },
    {
      q: 'Mes documents internes sont dispersés et pas à jour, est-ce bloquant ?',
      a: "Non. Donne ce que tu as, même partiel et daté. Claude produira le livret en signalant en [À COMPLÉTER] tout ce qui manque. Cette liste de trous est souvent le vrai livrable du premier essai : elle dit exactement quelles informations n'existent nulle part sous forme écrite.",
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: 'On le construit ensemble',
    subtitle:
      'Atelier individuel ou en équipe — financement OPCO possible selon éligibilité (Constructys / OPCO)',
    programTitle: 'Programme « Niveau 2 — Dirigeants & QHSE »',
    programItems: [
      "On construit ton skill Livret d'intégration en direct, sur tes vrais documents",
      'On le calibre sur tes postes, tes EPI et tes consignes de chantier',
      'Tu repars avec la compétence active et un livret déjà généré',
      'Format individuel ou équipe — 4 à 14 h, en présentiel en Île-de-France.',
    ],
  },
};
