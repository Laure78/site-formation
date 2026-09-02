import type { TutoData } from './types';

export const TUTO_SKILL_METRE_EXCEL_OFC: TutoData = {
  slug: 'tuto-skill-metre-excel-ofc',
  category: 'marches-et-veille',
  pdfFile: 'tuto-skill-metre-excel-ofc.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill Métré Excel',
  shortTitle: 'Skill métré Excel',
  subtitle:
    'Le tutoriel pas à pas pour sortir un métré complet, traçable et vérifié à partir de tes plans et de ton CCTP.',

  metaTitle: 'Tuto skill métré Excel BTP : quantités traçables en 45 min',
  metaDescription:
    'Tuto skill métré Excel BTP : métré complet, formules visibles, récap DPGF en 45 min avec Claude. Formation IA pour le BTP, présentiel IDF, Qualiopi — tuto gratuit.',
  keywords: [
    'métré Excel BTP',
    'skill Claude métré',
    'DPGF',
    'CCTP',
    'quantités chantier',
    'conducteur de travaux',
    'chargé d affaires',
    'métreur BTP',
    'chiffrage BTP',
    'formules Excel métré',
    'Claude BTP',
    'ChatGPT BTP',
    'formation IA pour le BTP',
    'Laure Olivié',
    "OFC Création d'Entreprise",
    'Constructys',
  ],
  ogImageAlt:
    'Métré Excel BTP traçable avec Claude — skill quantités DPGF formation IA pour le BTP',

  publishedAt: '2026-09-02',
  updatedAt: '2026-09-02',

  cardSummary:
    'Crée un skill Claude qui produit un classeur Excel de métré par lot : formules visibles, coefficients de pertes, récap DPGF et onglet points à vérifier — 45 minutes au lieu de 1 à 2 jours.',

  totalTimeMinutes: 45,

  heroLearnPoints: [
    'Activer la fonction skills dans Claude — 5 minutes, une seule fois',
    'Calibrer ton skill sur tes ratios, tes unités et ta décomposition des ouvrages',
    'Générer un classeur Excel de métré par lot, avec formules visibles et récapitulatif DPGF',
    'Contrôler les quantités comme un métreur expérimenté avant d\'envoyer au chiffrage',
  ],

  introTitle: 'Pourquoi un skill Métré ?',
  introBlocks: [
    { kind: 'h3', text: 'Le premier maillon de la chaîne — et le plus fragile' },
    {
      kind: 'paragraph',
      text:
        'Une quantité fausse au départ, c\'est un devis faux à l\'arrivée. Personne ne te le pardonne : ni le client quand tu réclames un avenant, ni ta trésorerie quand tu as oublié 40 m³ de béton. Pourtant, dans la plupart des PME du BTP, le métré se fait encore à la main — règle sur le plan, calculatrice, tableau Excel bricolé la veille de la remise.',
    },
    {
      kind: 'paragraph',
      text:
        'Un conducteur de travaux ou un chargé d\'affaires passe 1 à 2 jours par dossier à quantifier. Sur 30 à 50 dossiers par an, c\'est 6 à 12 semaines de travail, dont une bonne partie perdue puisqu\'on ne gagne pas tous les marchés. Et une erreur de 5 % sur les postes principaux suffit à effacer la marge d\'un chantier de second œuvre.',
    },
    {
      kind: 'callout',
      title: 'Métré manuel aujourd\'hui → avec ton skill Métré',
      body:
        '1 à 2 jours par dossier, souvent le soir → 30 à 45 minutes, contrôle compris · Oublis d\'ouvrages découverts sur le chantier → liste exhaustive tirée du CCTP et de la DPGF · Quantités tapées en dur, impossibles à retracer → formules Excel visibles ligne par ligne · Pertes et chutes ajoutées « au jugé » → tes coefficients appliqués automatiquement · Incohérences plan / CCTP vues trop tard → onglet « points à vérifier » généré d\'office.',
    },
    {
      kind: 'highlight',
      text:
        'Le skill ne remplace pas ton œil de métreur. Il fait les 80 % de calcul répétitif pour que tu consacres ton temps aux 20 % qui demandent du jugement.',
    },
    {
      kind: 'callout',
      title: 'Les 9 unités que ton skill doit maîtriser',
      body:
        'm — linéaires (plinthes, bordures, joints, réseaux) · m² — surfaces (dallages, cloisons, peintures, étanchéité) · m³ — volumes (béton, terrassement, remblais) · U — unités (portes, appareils, regards) · kg — aciers, quincaillerie · t — enrobés, granulats · ens — ensemble complet · F — forfait (installation de chantier, DOE) · h — régie, main-d\'œuvre. Chaque ligne de métré porte une seule unité, la même que celle de la DPGF. C\'est la règle n°1 pour éviter les quantités incomparables au moment du chiffrage.',
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active la fonction skills dans Claude',
      intro: 'Une seule fois — 5 minutes',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Les skills sont des « modes d\'emploi » que Claude charge automatiquement quand il reconnaît une tâche. Il te faut un abonnement Claude Pro (environ 18 € HT par mois) et l\'activation de l\'exécution de code : c\'est elle qui permet à Claude de produire un vrai fichier Excel avec des formules, et pas un tableau en texte.',
        },
        { kind: 'h3', text: 'Le chemin précis' },
        {
          kind: 'numberedList',
          items: [
            'Connecte-toi sur claude.ai avec ton compte Pro.',
            'Clique sur ton nom en bas à gauche → Settings.',
            'Ouvre l\'onglet Capabilities.',
            'Active « Code execution and file creation ».',
            'Vérifie que la section Skills est visible.',
          ],
        },
        {
          kind: 'callout',
          title: 'Pourquoi c\'est indispensable',
          body:
            'Sans exécution de code, Claude répond dans le chat avec un tableau que tu dois recopier — et les formules disparaissent. Avec l\'exécution de code, il écrit un fichier Excel réel : formules actives, onglets par lot, récapitulatif qui se met à jour quand tu corriges une dimension. C\'est la différence entre un « brouillon IA » et un métré que tu peux transmettre à ton chiffreur ou ton économiste.',
        },
        { kind: 'h3', text: 'Ce que tu dois voir à l\'écran avant de continuer' },
        {
          kind: 'list',
          items: [
            'L\'interrupteur « Code execution and file creation » est bleu (activé).',
            'La section « Skills » apparaît dans Capabilities, même vide pour l\'instant.',
            'Dans une nouvelle conversation, l\'icône « + » propose bien d\'ajouter des fichiers.',
          ],
        },
        {
          kind: 'callout',
          title: 'Si tu es en équipe',
          body:
            'Avec un abonnement Claude Team, l\'administrateur active ces options une fois pour tout le monde, et les skills créés peuvent être partagés entre collègues : le skill Métré calibré par ton meilleur métreur devient le standard de l\'entreprise.',
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière première',
      intro: '20 minutes — le meilleur investissement du tuto',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Un skill Métré générique produit un métré générique. Ce qui rend le tien fiable, c\'est qu\'il est calibré sur ta façon de travailler. Avant d\'ouvrir Claude, réunis ces cinq éléments dans un dossier.',
        },
        {
          kind: 'numberedList',
          items: [
            'Tes 2-3 derniers métrés finalisés — des fichiers Excel réellement utilisés pour chiffrer, idéalement sur des chantiers gagnés et réalisés. Claude y lit ta structure de colonnes, ta façon de nommer les ouvrages, ton niveau de détail. Anonymise le client si besoin, garde les quantités réelles.',
            'Ta décomposition type par lot — la liste des ouvrages élémentaires que tu quantifies systématiquement : pour un carreleur, ragréage / chape / carrelage sol / plinthes / faïence / joints / profilés ; pour un étancheur, pare-vapeur / isolant / membrane / relevés / EEP / protection. C\'est elle qui évite les oublis.',
            'Tes ratios et coefficients — pertes et chutes par matériau (8 % carrelage droit, 12 % en diagonale…), recouvrements (10 cm membranes), foisonnement des terres, ratio d\'aciers par m³ de béton. Ce sont tes chiffres d\'expérience — le skill doit les appliquer, pas inventer les siens.',
            'Tes règles de mesure — déduis-tu les ouvertures < 0,50 m² ? Comptes-tu les tableaux de baies en m² ou en ml ? Cloisons mesurées hors œuvre ou dans œuvre ? Écris ces conventions noir sur blanc : ce sont elles qui rendent un métré comparable d\'un chantier à l\'autre.',
            'Ton modèle Excel de référence — le classeur vierge que tu veux retrouver à chaque fois. Si tu n\'en as pas, pars de la structure recommandée ci-dessous — le skill la reproduira à l\'identique.',
          ],
        },
        {
          kind: 'callout',
          title: 'Structure de colonnes recommandée',
          body:
            'Repère · Désignation · Unité · Nb · Long. · Larg./Ht · Qté brute (= formules) · Coef pertes · Qté finale · Source (plan ou article CCTP). Exemple : 2.1.3 Carrelage sol grès cérame 60×60 — m² — plan A02. Un onglet par lot + un onglet RÉCAP au format DPGF + un onglet POINTS À VÉRIFIER.',
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro: '10 minutes — le skill se construit sous tes yeux',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Ouvre une nouvelle conversation, glisse-y les fichiers de l\'étape 2 (Excel, PDF et images de plans acceptés), puis colle le prompt ci-dessous tel quel. Tu adaptes uniquement les crochets.',
        },
        {
          kind: 'prompt',
          title: 'Prompt — création du skill Métré',
          text: `Tu es un métreur BTP expérimenté, spécialisé en [TON MÉTIER : carrelage / étanchéité / gros œuvre / VRD…].

Je veux que tu crées un SKILL Claude nommé « metre-[ton-metier] » qui, à chaque fois que je
lui donne des plans, un CCTP et/ou une DPGF, produit un fichier Excel de métré complet.

Étudie d'abord les fichiers joints : mes anciens métrés, ma décomposition par lot,
mes ratios de pertes et mes règles de mesure. Le skill doit reproduire EXACTEMENT
ma structure de colonnes, mes unités et mes conventions — pas les tiennes.

Le skill doit :
1. Lister tous les ouvrages à quantifier à partir du CCTP/DPGF, dans l'ordre de la DPGF
2. Calculer chaque quantité avec des formules Excel visibles (jamais de valeurs en dur)
3. Appliquer mes coefficients de pertes/recouvrement dans une colonne dédiée
4. Créer un onglet par lot + un onglet RÉCAP + un onglet POINTS À VÉRIFIER
5. Signaler toute incohérence entre plan, CCTP et DPGF, et toute quantité qu'il a dû estimer

Rédige le fichier SKILL.md, montre-le moi, puis attends ma validation avant de l'activer.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            'La phrase la plus importante du prompt : « jamais de valeurs en dur ». Un métré dont on ne peut pas retracer le calcul n\'a aucune valeur — ni pour ton chiffreur, ni pour négocier un avenant, ni devant un expert en cas de litige. Exige des formules visibles et un onglet « points à vérifier » : c\'est là que Claude t\'avoue honnêtement ce qu\'il n\'a pas pu lire sur le plan.',
        },
        { kind: 'h3', text: 'Ce qui se passe ensuite' },
        {
          kind: 'list',
          items: [
            'Claude lit tes fichiers et te pose 2 ou 3 questions sur tes conventions — réponds précisément, c\'est du calibrage.',
            'Il rédige un SKILL.md : un document texte qui décrit ses règles, ta structure et le format de sortie.',
            'Il te le montre sans l\'activer : c\'est le moment de l\'étape 4.',
          ],
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro: '5 minutes de relecture qui t\'en feront gagner des heures',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Claude te propose un premier SKILL.md. Ne l\'active pas les yeux fermés : lis-le comme tu relirais le métré d\'un nouvel embauché.',
        },
        { kind: 'h3', text: 'Ce que tu dois vérifier — coche au fur et à mesure' },
        {
          kind: 'list',
          items: [
            'Ta décomposition par lot est reprise intégralement, dans ton ordre, sans ouvrage ajouté « par défaut ».',
            'Les unités sont les tiennes : pas de m² là où tu comptes en ml, pas de U là où tu comptes en ens.',
            'Tes coefficients de pertes sont bien ceux que tu as donnés, matériau par matériau.',
            'Tes règles de mesure (déduction des ouvertures, dans / hors œuvre) sont écrites explicitement.',
            'Le skill précise qu\'il signale les quantités estimées plutôt que de les inventer.',
            'Le format de sortie est un vrai fichier .xlsx avec formules, pas un tableau dans le chat.',
          ],
        },
        {
          kind: 'prompt',
          title: 'Exemple d\'ajustement',
          text: `Trois corrections avant activation :
1. Pour les ouvertures : ne déduis que celles > 0,50 m² sur les surfaces de peinture,
   mais déduis TOUTES les ouvertures sur les surfaces de carrelage mural.
2. Les plinthes se mesurent en ml au nu des murs, ouvertures déduites,
   avec un coefficient de pertes de 10 % (et non 8 %).
3. Ajoute une colonne « Source » sur chaque ligne : n° de plan ou article CCTP
   d'où vient la quantité. Écris « ESTIMÉ » quand tu n'as pas la donnée.

Mets à jour le SKILL.md et remontre-le moi.`,
        },
        {
          kind: 'callout',
          title: 'Active le skill',
          body:
            'Quand le SKILL.md te convient, écris simplement « Valide, active-le ». Claude l\'enregistre dans ta bibliothèque. À partir de maintenant, chaque fois que tu écriras « fais le métré » en joignant des plans, il se déclenchera tout seul — tu n\'auras plus jamais à réexpliquer tes règles.',
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Teste sur un vrai chantier',
      intro: 'Le seul test qui compte : un dossier que tu as déjà métré à la main',
      blocks: [
        { kind: 'h3', text: 'Le protocole de test' },
        {
          kind: 'list',
          items: [
            'Choisis un dossier récent dont tu as le métré manuel et, si possible, les quantités réellement posées.',
            'Nouvelle conversation : joins les plans PDF, le CCTP et la DPGF vierge, puis colle le prompt ci-dessous.',
            'Ouvre le fichier Excel produit et compare poste par poste avec ton métré manuel.',
            'Tout écart > 5 % sur un poste principal : demande à Claude d\'expliquer son calcul — soit il a raison, soit tu affines une règle.',
            'Vérifie l\'onglet « points à vérifier » : chaque ligne doit correspondre à une vraie zone d\'ombre du dossier.',
          ],
        },
        {
          kind: 'callout',
          title: 'Exemple de comparaison',
          body:
            'Carrelage sol 60×60 : manuel 412 m², skill 418 m² (+1,5 % — pertes 8 % OK) · Plinthes : manuel 268 ml, skill 241 ml (−10 % — règle ouvertures à affiner) · Faïence murale : 96 m² des deux côtés · Ragréage P3 : ESTIMÉ — HSP manquante à trancher.',
        },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Fais le métré du chantier [NOM DU CHANTIER] — [TYPE : réhabilitation / neuf], [SURFACE] m².
Pièces jointes : plans [N° ET INDICE], CCTP lot [N° ET INTITULÉ], DPGF vierge.
Lot à quantifier : [TON LOT].
Particularités : [ex. : niveaux R+2 et R+3 uniquement / hors locaux techniques /
hauteur sous plafond 2,70 m sauf indication contraire].
Livrable : fichier Excel selon mon modèle, formules visibles, onglet récap au format DPGF,
onglet « points à vérifier » avec les quantités estimées et les incohérences plan/CCTP.`,
        },
        {
          kind: 'callout',
          title: 'La règle d\'or',
          body:
            'Le skill sort le métré, tu le signes. Prends 15 minutes pour contrôler les 5 postes qui pèsent le plus lourd dans ton chiffrage et pour trancher chaque ligne de l\'onglet « points à vérifier ». Cette relecture ciblée — et non le calcul — est ta vraie valeur ajoutée de professionnel.',
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Le métré produit par le skill a-t-il une valeur contractuelle ?',
      a: 'Le métré est un document interne d\'étude : c\'est ton offre signée (DPGF remplie, devis) qui engage ton entreprise, pas le fichier de calcul. En revanche, un métré traçable avec formules et sources te sert de preuve en cas de désaccord sur des quantités — pour justifier un avenant ou un métré contradictoire. Raison de plus pour exiger des formules visibles et conserver le fichier avec le dossier.',
    },
    {
      q: 'Le maître d\'œuvre modifie les plans à l\'indice B : je recommence tout ?',
      a: 'Non. Tu rouvres la conversation, tu joins les nouveaux plans et tu écris « mets à jour le métré avec l\'indice B et liste les postes modifiés ». Le skill recalcule les lignes concernées et te sort un tableau des écarts entre indices — pratique pour justifier une révision de prix.',
    },
    {
      q: 'Combien de temps prend la génération la première fois ?',
      a: 'Compte 5 à 10 minutes pour créer le skill (étapes 3 et 4), puis 5 à 15 minutes par métré selon la taille du dossier et la lisibilité des plans. Plus tes plans sont propres (PDF vectoriels cotés plutôt que scans), plus c\'est rapide et fiable. Sur un dossier moyen, tu passes de 1 à 2 jours à environ 45 minutes, contrôle inclus.',
    },
    {
      q: 'Le skill sait-il lire les plans pour mesurer les surfaces lui-même ?',
      a: 'Il lit les cotes écrites, les légendes, les nomenclatures et les tableaux de surfaces quand ils existent. Il ne « mesure » pas à l\'échelle sur un plan non coté comme un logiciel de métré graphique. Pour les plans peu cotés, il te demande les dimensions manquantes et les marque ESTIMÉ — exactement ce que tu veux qu\'il fasse.',
    },
    {
      q: 'Mes plans et mes ratios sont-ils confidentiels ?',
      a: 'Avec un abonnement Claude Pro ou Team, tes conversations ne servent pas à entraîner les modèles par défaut, et tu peux supprimer les échanges à tout moment. Bonne pratique : anonymise le maître d\'ouvrage sur les dossiers sensibles, et ne mets jamais de données personnelles (salariés, sous-traitants) dans un métré.',
    },
    {
      q: 'Mon métier a plusieurs types de chantiers très différents : un seul skill ?',
      a: 'Crée un skill par typologie plutôt qu\'un skill fourre-tout : « metre-etancheite-neuf » et « metre-etancheite-refection », par exemple. Chacun porte ses propres ouvrages et coefficients. Claude choisit le bon selon ta demande, et chaque skill reste simple à maintenir quand tes ratios évoluent.',
    },
  ],

  cta: {
    eyebrow: 'ENVIE D\'ALLER PLUS LOIN ?',
    title: 'On le construit ensemble',
    subtitle:
      'Atelier individuel ou en équipe — prise en charge Constructys / OPCO selon éligibilité',
    programTitle: 'Programme « Niveau 2 — Conducteurs de travaux : créer ses skills IA de chantier »',
    programItems: [
      'On construit ton skill Métré ensemble, sur tes vrais dossiers, pendant la session.',
      'Calibrage sur tes ratios, tes unités et ta décomposition — aucune solution générique.',
      'Tu repars opérationnel : skill activé, premier métré contrôlé, méthode transmise à ton équipe.',
      'Format individuel ou équipe — 4 à 14 h, en présentiel en Île-de-France.',
    ],
  },
};
