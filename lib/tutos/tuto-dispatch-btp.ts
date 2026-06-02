import type { TutoData } from './types';

export const TUTO_DISPATCH_BTP: TutoData = {
  slug: 'tuto-dispatch-btp',
  category: 'productivite',
  pdfFile: 'tuto-dispatch-btp.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton bureau depuis ton chantier',
  shortTitle: 'Dispatch BTP',
  subtitle:
    "Le tutoriel pas à pas pour utiliser Dispatch — la nouvelle fonctionnalité de Claude qui transforme ton téléphone en télécommande de ton PC.",

  metaTitle: 'Tuto Dispatch Claude BTP : ton téléphone pilote ton PC',
  metaDescription:
    "Dispatch Claude BTP : transforme ton téléphone en télécommande de ton PC depuis le chantier. Tuto pas à pas + 8 commandes vocales. Gratuit.",
  keywords: [
    'Dispatch Claude',
    'Claude Dispatch BTP',
    'Anthropic Dispatch',
    'tuto Dispatch',
    'IA BTP mobile',
    'IA chantier mobile',
    'commandes vocales BTP',
    'productivité BTP',
    'Claude desktop BTP',
    'IA voiture chantier',
    'automatisation BTP',
    'IA dirigeant BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'formation IA pour les pro du BTP',
    'Laure Olivié',
    "OFC Création d'Entreprise",
    'Constructys',
  ],
  ogImageAlt:
    'Tuto Dispatch Claude BTP — pilote ton PC depuis ton chantier, par Laure Olivié',

  publishedAt: '2026-05-09',
  updatedAt: '2026-05-09',

  cardSummary:
    "Pilote ton PC du bureau depuis ton chantier ou ta voiture grâce à Dispatch (Anthropic, mars 2026). 8 commandes vocales BTP, installation en 5 minutes, jusqu'à 4 heures économisées par jour.",

  totalTimeMinutes: 30,

  heroLearnPoints: [
    'Comment installer Dispatch en 5 minutes',
    '8 commandes vocales BTP à dicter depuis ta voiture',
    'Les pièges à éviter sur les chantiers',
    "Comment économiser 3h de paperasse par jour",
  ],
  heroLearnPointTargets: ['intro', 'etape-2', 'etape-4', 'etape-5'],

  introTitle: 'Pourquoi Dispatch change tout pour le BTP ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "Pendant des années, l'IA imposait une contrainte simple : être devant ton écran. Pas pratique quand tu passes 80% de ta journée en chantier, en voiture, en RDV client ou en visite de fournisseur.",
    },
    {
      kind: 'paragraph',
      text:
        "Dispatch, lancé par Anthropic en mars 2026, casse cette contrainte. Tu envoies un message ou un vocal depuis ton téléphone, ton PC resté allumé au bureau exécute la tâche, et tu retrouves le travail fait quand tu rentres.",
    },
    { kind: 'h3', text: 'Concrètement, voilà comment ça marche' },
    {
      kind: 'list',
      items: [
        'Tu pars en chantier le matin, PC laissé allumé au bureau',
        'Depuis la voiture ou le chantier, tu dictes une instruction à Claude',
        'Claude prend la main sur ton PC et exécute (devis, mails, comptes-rendus)',
        "Tu reçois une notification quand c'est fini",
        'Tu rentres le soir, le travail est sur ton bureau',
      ],
    },
    {
      kind: 'highlight',
      text:
        "Pour la première fois, un dirigeant BTP n'a plus besoin d'être devant un écran pour bosser avec l'IA. Ta voiture devient ton bureau.",
    },
    {
      kind: 'callout',
      title: 'Le concept en une phrase',
      body:
        "Dispatch transforme ton téléphone en télécommande de ton PC. Le téléphone, c'est l'interface. Le PC, c'est l'exécutant. Les deux communiquent via Claude. Une seule conversation continue, qui se synchronise entre tes deux appareils. Tu peux commencer une tâche depuis ton chantier et la finir le soir au bureau, sans rien réexpliquer.",
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Vérifie les prérequis',
      intro:
        "Avant d'installer Dispatch, tu dois remplir 4 conditions. Si une seule manque, ça ne fonctionnera pas.",
      blocks: [
        { kind: 'h3', text: 'Les 4 prérequis' },
        {
          kind: 'list',
          items: [
            'Abonnement Claude Pro (~20€/mois) ou Max (~100€/mois). Pas disponible sur la version gratuite ni sur Team/Enterprise au démarrage',
            'Un PC sous Windows ou Mac (pas Linux, pas iPad). Le PC doit avoir Claude Desktop installé',
            "Un smartphone iOS ou Android avec l'app Claude installée",
            'Une connexion internet stable des deux côtés (PC et téléphone)',
          ],
        },
        { kind: 'h3', text: 'Mises à jour à faire avant tout' },
        {
          kind: 'list',
          items: [
            'Va sur claude.com/download — télécharge la dernière version Claude Desktop',
            "Sur ton téléphone, mets à jour l'app Claude depuis l'App Store ou Google Play",
            'Connecte-toi avec le même compte sur les deux appareils',
          ],
        },
        {
          kind: 'callout',
          title: 'Le piège le plus fréquent',
          body:
            "Si tu n'as jamais utilisé Claude Desktop avant et que tu connais juste claude.ai dans ton navigateur, tu dois installer l'application desktop séparément. C'est elle qui va recevoir tes instructions et exécuter le travail. Sans Claude Desktop installé et ouvert, Dispatch ne fonctionne pas.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Active Dispatch en 5 minutes',
      intro:
        "L'installation est simple. Compte 5 minutes la première fois — pas de code, pas de configuration technique. Juste un QR code à scanner.",
      blocks: [
        { kind: 'h3', text: 'Sur ton PC (au bureau)' },
        {
          kind: 'list',
          items: [
            'Ouvre Claude Desktop',
            "Clique sur l'onglet « Cowork » (en haut)",
            'Sur le panneau de gauche, clique sur « Dispatch »',
            "Tu arrives sur une page d'accueil — clique sur « Get Started »",
            'Active les 2 toggles proposés : accès aux fichiers locaux + maintien du PC éveillé',
          ],
        },
        { kind: 'h3', text: 'Sur ton téléphone (en chantier ou en voiture)' },
        {
          kind: 'list',
          items: [
            "Ouvre l'app Claude",
            "Va dans l'onglet Cowork",
            'Tape sur « Pair with your desktop »',
            'Scanne le QR code affiché sur ton PC',
            "C'est fait — les deux appareils sont connectés",
          ],
        },
        {
          kind: 'callout',
          title: 'Paramétrage indispensable',
          body:
            "Active impérativement le toggle « keep your computer awake » pendant le setup. Sinon ton PC se met en veille au bout de 30 min et Claude ne peut plus exécuter les tâches que tu lui envoies. Sur Mac, désactive aussi la mise en veille via Réglages Système > Batterie. Sur Windows, va dans Paramètres > Alimentation et désactive la mise en veille.",
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Tes 8 commandes vocales BTP',
      intro:
        "Voici 8 commandes que tu peux dicter depuis ta voiture le matin, pour retrouver le travail fait le soir. À adapter à ton métier et tes outils.",
      blocks: [
        { kind: 'h3', text: 'Commerciales' },
        {
          kind: 'prompt',
          title: 'Commandes — phase commerciale',
          text: `« Rédige le devis Dupont à partir des mails et docs dans mes téléchargements. Utilise mes ratios habituels et ma trame standard. »

« Relance par mail les 12 devis en attente depuis plus de 15 jours. Ton ferme mais courtois. Mets en copie ma comptable. »`,
        },
        { kind: 'h3', text: 'Chantier' },
        {
          kind: 'prompt',
          title: 'Commandes — suivi de chantier',
          text: `« Prépare le compte-rendu de la visite Martin de lundi à partir de mes notes vocales et photos dans le dossier Visites. »

« Génère le PPSPS pour le chantier de la rue de la Paix. Tu trouveras le DCE dans mes fichiers Téléchargements de cette semaine. »`,
        },
        { kind: 'h3', text: 'Administratif' },
        {
          kind: 'prompt',
          title: 'Commandes — admin et facturation',
          text: `« Remplis ma feuille d'heures de la semaine selon les chantiers visités, en croisant mes mails et mon agenda. »

« Trie les factures fournisseurs reçues cette semaine dans Outlook et range-les par chantier dans le dossier Comptabilité. »`,
        },
        { kind: 'h3', text: 'Veille et stratégie' },
        {
          kind: 'prompt',
          title: 'Commandes — veille et pilotage',
          text: `« Scanne le BOAMP ce matin et envoie-moi par mail les 5 DCE pertinents pour mon métier en Île-de-France. »

« Lis les 3 mails que m'a envoyés mon avocat hier et fais-moi une synthèse de 10 lignes des actions à mener cette semaine. »`,
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Sécurise ton usage',
      intro:
        "Dispatch est puissant — il peut lire tes fichiers, manipuler tes apps, envoyer des mails. Cette puissance demande quelques règles de prudence pour éviter les mauvaises surprises.",
      blocks: [
        { kind: 'h3', text: "Les 5 règles d'or" },
        {
          kind: 'list',
          items: [
            "Toujours écrire « demande-moi confirmation avant » quand l'action est irréversible (envoi mail, suppression fichier)",
            'Ne jamais demander à Claude de manipuler des données sensibles (RIB, mots de passe, données personnelles salariés)',
            "Désactiver Dispatch quand tu ne l'utilises pas activement (par exemple le week-end)",
            'Garder un œil sur les notifications — Claude te demande validation pour les actions à risque',
            "Tester d'abord sur des tâches sans enjeu (compte-rendu, classement de fichiers) avant les tâches critiques",
          ],
        },
        { kind: 'h3', text: 'Exemple de commande sécurisée' },
        {
          kind: 'prompt',
          title: 'Commande avec garde-fou',
          text: `« Rédige les 12 mails de relance devis selon ma trame habituelle. NE LES ENVOIE PAS — laisse-les en brouillon dans Outlook. Préviens-moi quand c'est prêt, je les relirai et les enverrai moi-même ce soir. »`,
        },
        {
          kind: 'callout',
          title: 'Le bon réflexe',
          body:
            "Pour toutes les tâches qui produisent un envoi (mail, devis, facture), demande systématiquement à Claude de les laisser en brouillon. Tu valides toi-même avant envoi. Pour les tâches de production interne (CR, plannings, synthèses), tu peux laisser Claude finaliser sans validation. Cette distinction simple évite 95% des erreurs possibles.",
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Ta routine quotidienne',
      intro:
        "Voici comment intégrer Dispatch dans ta journée type de dirigeant BTP. C'est cette routine qui te fait économiser 3h de paperasse du soir.",
      blocks: [
        { kind: 'h3', text: '6h30 — Au café avant de partir' },
        {
          kind: 'paragraph',
          text:
            "Tu listes mentalement les 3 ou 4 tâches admin que tu aurais dû faire hier. Tu allumes ton PC au bureau, tu vérifies que Claude Desktop est ouvert et que Dispatch est actif.",
        },
        { kind: 'h3', text: '7h00 — En voiture vers le premier chantier' },
        {
          kind: 'paragraph',
          text:
            "Au feu rouge ou en sortie d'autoroute, tu prends ton téléphone et tu dictes tes 3-4 commandes. 2 minutes au total. Claude commence le travail sur ton PC pendant que tu roules.",
        },
        { kind: 'h3', text: 'Toute la journée — En chantier' },
        {
          kind: 'paragraph',
          text:
            "Tu reçois des notifications de Claude qui te demande validation pour certaines tâches (envoi mail, accès à un dossier nouveau). Tu valides en 30 secondes, depuis ton téléphone. Si tu prends une photo de chantier intéressante, tu peux l'envoyer dans la conversation Dispatch — Claude l'intègre dans le compte-rendu en cours.",
        },
        { kind: 'h3', text: '18h00 — De retour au bureau' },
        {
          kind: 'paragraph',
          text:
            "Tu trouves sur ton PC : 3 devis prêts à relire, 12 mails de relance en brouillon, 1 compte-rendu finalisé, ta feuille d'heures remplie. Tu valides ou ajustes en 30 minutes ce qui aurait demandé 3 heures de production from scratch.",
        },
        {
          kind: 'callout',
          title: 'Le gain réel en heures',
          body:
            "En usage quotidien moyen, un dirigeant BTP qui maîtrise Dispatch économise 2 à 4 heures par jour. Sur une année, ça représente 400 à 800 heures — soit l'équivalent de 50 à 100 jours de travail. C'est plus qu'un assistant à mi-temps, sans le coût ni la gestion RH.",
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Mon PC peut-il vraiment rester allumé 24h/24 ?',
      a: "Oui sans problème. Un PC moderne en veille active consomme 5 à 15W, soit environ 30€ par an d'électricité. Largement compensé par les heures économisées. Sur Mac, branche-le sur secteur. Sur Windows, désactive la mise en veille mais laisse l'écran s'éteindre — ça ne gêne pas Dispatch.",
    },
    {
      q: 'Que se passe-t-il si la connexion internet coupe sur mon chantier ?',
      a: "Tes commandes sont mises en file d'attente sur ton téléphone et envoyées dès que la connexion revient. Claude continue le travail sur ton PC sans dépendre de ton téléphone — la connexion n'est nécessaire que pour envoyer la commande initiale et recevoir les notifications.",
    },
    {
      q: 'Puis-je utiliser Dispatch pour gérer mon équipe ?',
      a: "Indirectement oui. Tu peux demander à Claude de générer les plannings de tes équipes, de rédiger leurs feuilles de route, de leur envoyer les fiches de chantier. Mais Dispatch est conçu pour un usage individuel — chaque dirigeant ou cadre doit avoir son propre setup pour profiter de la fonctionnalité.",
    },
    {
      q: 'Et si Claude se trompe pendant que je suis sur le chantier ?',
      a: "Tu reçois la notification d'erreur sur ton téléphone. Soit tu corriges depuis le téléphone par message vocal (« non, plutôt comme ça »), soit tu attends d'être au bureau pour reprendre la main. Pour les tâches sensibles, configure Claude pour qu'il te demande validation à chaque étape importante.",
    },
    {
      q: "Quelle est la différence entre Dispatch et l'app Claude classique sur téléphone ?",
      a: "L'app classique te permet de discuter avec Claude depuis ton téléphone, mais sans accès à tes fichiers PC ni à tes apps installées. Dispatch ajoute la dimension « ton PC fait le travail pour toi ». C'est la différence entre demander un conseil à un assistant à distance et lui dire de faire le boulot directement sur ton ordinateur.",
    },
    {
      q: 'Dispatch va-t-il rester disponible sur le plan Pro à 20€/mois ?',
      a: "Pour l'instant oui. Anthropic a confirmé l'ouverture aux abonnés Pro le 22 mars 2026. La fonctionnalité est encore en bêta (research preview), donc elle peut évoluer. Mais le positionnement actuel est clairement de la rendre accessible à tous les abonnés payants, pas seulement aux plans Max ou Enterprise.",
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: "On l'installe ensemble",
    subtitle: 'Atelier individuel ou en équipe — financement possible selon éligibilité (Constructys / OPCO)',
    programTitle: "Module « L'IA au service du BTP » — 4h",
    programItems: [
      'Setup Dispatch en direct sur ton PC et ton téléphone',
      'Calibrage sur tes vraies tâches admin du quotidien',
      'Tu repars opérationnel le soir même',
      'Format individuel ou équipe — Qualiopi — Finançable Constructys',
    ],
  },
};
