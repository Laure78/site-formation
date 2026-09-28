import type { TutoData } from './types';
import { RESSOURCES_MINIATURES } from '@/lib/ressources-miniatures';

export const TUTO_SKILL_ANALYSE_CCAP_OFC: TutoData = {
  slug: 'tuto-skill-analyse-ccap-ofc',
  category: 'marches-et-veille',
  pdfFile: 'tuto-skill-analyse-ccap-ofc.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill Analyse de CCAP',
  shortTitle: 'Skill Analyse CCAP',
  subtitle:
    'Le tutoriel pas à pas pour décrypter un CCAP et repérer les clauses à risque — 20 minutes au lieu de 3 heures.',

  metaTitle: 'Tuto skill Analyse CCAP BTP : clauses à risque en 20 min',
  metaDescription:
    'Tuto skill Analyse CCAP BTP : pénalités, retenue de garantie, paiement et révision avec Claude. Formation IA pour le BTP, présentiel IDF, Qualiopi — tuto gratuit.',
  keywords: [
    'analyser un CCAP',
    'CCAP marché public BTP',
    'clauses à risque CCAP',
    'pénalités retard BTP',
    'retenue de garantie',
    'CCAG-Travaux 2021',
    'skill Claude CCAP',
    'appels d offres BTP',
    'chargé d affaires',
    'Claude BTP',
    'ChatGPT BTP',
    'formation IA pour le BTP',
    'Laure Olivié',
    "OFC Création d'Entreprise",
    'Constructys',
  ],
  ogImageAlt:
    'Créer un skill Analyse CCAP — tuto offert PDF gratuit, formation IA pour le BTP',

  publishedAt: '2026-09-28',
  updatedAt: '2026-09-28',

  cardSummary:
    'Crée un skill Claude qui applique la grille des 9 familles de clauses, chiffre l’impact (pénalités, RG, paiement, révision) et produit une fiche Go / sous conditions / No Go — 20 minutes au lieu de 2 à 3 heures de lecture.',

  totalTimeMinutes: 20,

  heroImage: RESSOURCES_MINIATURES.tutoAnalyseCcap,

  heroLearnPoints: [
    'Construire un skill Claude qui lit un CCAP et en extrait les clauses qui engagent ta marge',
    'Repérer délais, pénalités, retenue de garantie, révision de prix et délais de paiement',
    'Obtenir une fiche de synthèse claire avec les points de vigilance avant de répondre ou de signer',
    'Préparer tes questions de mise au point sans relire 40 pages de clauses juridiques',
  ],

  introTitle: 'Pourquoi un skill Analyse CCAP ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        'Après 7 ans dans le BTP, j’ai vu trop d’entreprises gagner un marché… puis le regretter à la réception. Le problème est presque toujours au même endroit : le CCAP.',
    },
    {
      kind: 'paragraph',
      text:
        'Le CCAP — Cahier des Clauses Administratives Particulières — est le cœur contractuel d’un marché. Pendant que tout le monde se concentre sur le CCTP (la technique) et la DPGF (les prix), c’est le CCAP qui fixe ce à quoi tu t’engages vraiment : délais, pénalités, retenue de garantie, délais de paiement, révision des prix, réception, assurances, résiliation.',
    },
    {
      kind: 'paragraph',
      text:
        'Et c’est là que la marge se joue. Lire un CCAP de 30 à 50 pages prend 2 à 3 heures, et l’essentiel se cache dans 8 ou 10 articles que l’on survole sous la pression du délai.',
    },
    {
      kind: 'callout',
      title: 'Avec un skill bien construit, voilà ce qui change',
      body:
        'Lecture exhaustive : il lit le CCAP en entier et liste les articles qui engagent financièrement ton entreprise · Repérage des pièges : pénalités, RG, révision, délais de paiement, repérés et chiffrés au même endroit · Niveau d’alerte : chaque clause sensible est notée vert / orange / rouge selon le risque pour ta trésorerie · Mise au point : la liste des questions à poser au maître d’ouvrage avant de t’engager · Synthèse : une fiche d’une page que tu relis en 5 minutes avant la décision Go / No Go.',
    },
    {
      kind: 'highlight',
      text: 'Tu ne signes plus jamais sans savoir ce que le CCAP va vraiment te coûter.',
    },
    {
      kind: 'callout',
      title: 'Obligation légale — ce que le CCAP ne peut pas contourner',
      body:
        'Retenue de garantie plafonnée à 5 % et toujours remplaçable par une caution (loi n° 71-584 du 16 juillet 1971 en marché privé ; Code de la commande publique en marché public) · Délai global de paiement encadré : 30 jours pour les acheteurs publics, 60 jours nets ou 45 jours fin de mois maxi entre entreprises privées (loi LME) · Avance d’au moins 5 % en principe obligatoire sur les marchés publics dépassant les seuils · Pénalités de retard plafonnées à 10 % via le CCAG Travaux 2021 en marché public.',
    },
    {
      kind: 'callout',
      title: 'Ce qu’une mauvaise lecture du CCAP coûte',
      body:
        'Marché de second œuvre à 250 000 € HT, 8 % de marge visée (20 000 €) — quatre clauses lues trop vite : pénalités non plafonnées (90 j à 1/1000ᵉ/j → 22 500 €) · retenue de garantie 5 % bloquée 1 an (12 500 € immobilisés) · paiement à 45 j fin de mois (trésorerie sous tension) · prix ferme 16 mois sans révision (~6 000 € de marge perdue avec 4 % d’inflation). Sans litige, la marge passe de 8 % à 2 ou 3 %. Un skill qui lit le CCAP en 20 minutes te montre ces lignes avant signature.',
    },
    {
      kind: 'highlight',
      text: 'Une marge ne se calcule jamais sur la DPGF seule. Elle se calcule DPGF + clauses du CCAP.',
    },
    {
      kind: 'h3',
      text: 'Les 9 familles de clauses à passer au crible',
    },
    {
      kind: 'paragraph',
      text:
        'C’est la grille que le skill applique à chaque CCAP. Garde-la sous les yeux : même sans l’IA, elle t’évite déjà l’essentiel des mauvaises surprises.',
    },
    {
      kind: 'numberedList',
      items: [
        'Délais d’exécution — point de départ (OS, notification) et délai global. Piège : le délai court avant les accès au chantier.',
        'Pénalités de retard — taux et plafond (10 % via le CCAG). Piège : pénalités non plafonnées ou qui s’additionnent.',
        'Retenue de garantie — taux (5 % maxi) et remplacement par caution. Piège : RG jamais libérée d’office.',
        'Délai de paiement — 30 j public, 45 j fin de mois privé, et point de départ. Piège : délai à validation de la situation, pas à l’envoi.',
        'Révision des prix — prix ferme ou révisable, formule d’index (BT, TP). Piège : prix ferme sur chantier long = inflation pour toi.',
        'Avance — taux et conditions de remboursement. Piège : aucune avance = trésorerie sous tension dès le démarrage.',
        'Réception — OPR, levée des réserves, durée de GPA. Piège : réception avec réserves qui bloque le solde.',
        'Assurances — montants et attestations (décennale, RC). Piège : garantie demandée absente ou exigée avant l’OS.',
        'Résiliation — cas prévus et indemnités. Piège : résiliation à tes torts avec pénalités, ou mal indemnisée.',
      ],
    },
    {
      kind: 'callout',
      title: 'L’aide-mémoire des sigles',
      body:
        'CCAP : clauses administratives · CCTP : clauses techniques · RC : règlement de consultation · DPGF/DQE : décomposition des prix · CCAG : cahier général (marchés publics) · RG : retenue de garantie · GPA : garantie de parfait achèvement · DGD : décompte général définitif · OS : ordre de service · OPR : opérations préalables à la réception · MOA : maître d’ouvrage.',
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active la fonction Skills',
      intro: 'Préparer ton espace Claude — une fois',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Un skill, c’est une compétence sur mesure que Claude garde en mémoire et réutilise à chaque fois que tu lui confies un CCAP.',
        },
        {
          kind: 'callout',
          title: 'Le compte : gratuit possible, Pro conseillé',
          body:
            'Depuis fin 2025, la création de compétences est accessible à tous les plans, y compris le plan gratuit. Mais le plan gratuit est limité en volume par session : sur un CCAP lourd avec RC et CCTP, tu risques de bloquer en cours d’analyse. Pour un usage professionnel quotidien, le plan Pro (environ 18 € HT/mois) reste recommandé.',
        },
        {
          kind: 'h3',
          text: 'Le chemin d’activation (interface 2026)',
        },
        {
          kind: 'numberedList',
          items: [
            'Clique sur ton avatar en bas à gauche, puis sur « Personnaliser » (ou « Customize »).',
            'Ouvre l’onglet « Compétences » (ou « Skills »).',
            'Clique sur le bouton « + » en haut à droite.',
            'Choisis « + Créer une compétence » (création assistée) ou « Téléverser une compétence » pour un ZIP existant.',
          ],
        },
        {
          kind: 'callout',
          title: 'À ne pas oublier',
          body:
            'Dans le même menu « Personnaliser », active aussi l’option « Exécution de code » : sans elle, Claude ne pourra pas te livrer ta fiche d’analyse en Word ou PDF. L’ancien chemin Settings → Capabilities n’existe plus depuis la refonte fin 2025.',
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière',
      intro: 'Nourrir Claude avec ton expérience terrain',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Un skill générique reste générique. Pour qu’il analyse un CCAP comme ton meilleur chargé d’affaires, donne-lui ton vécu. Réunis ces cinq éléments avant de lancer la conversation.',
        },
        {
          kind: 'numberedList',
          items: [
            'Tes 2 ou 3 derniers CCAP analysés — idéalement annotés (alertes, oublis, coûts en chantier).',
            'Ta nomenclature des clauses à surveiller et tes seuils internes (ex. pénalité plafonnée à 5 % maxi acceptable).',
            'Ton historique de pénalités ou litiges — les marchés où une clause t’a piégé.',
            'Tes contraintes propres d’entreprise : trésorerie, marge minimale, assurances détenues.',
            'Ta trame de fiche d’analyse (tableau, fiche Go / No Go) si tu en as déjà une.',
          ],
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation',
      intro: 'Le prompt qui crée ton skill',
      blocks: [
        {
          kind: 'prompt',
          title: 'Prompt — création du skill Analyse CCAP',
          text: `Je veux créer un skill "Analyse CCAP" pour mon entreprise du BTP.
Mon métier : [ex. gros œuvre / second œuvre / TCE].
Ma situation : [taille, trésorerie, marge mini, assurances].
À chaque CCAP que je te donne, tu dois :
1. Repérer les 9 familles de clauses : délais, pénalités,
retenue de garantie, paiement, révision, avance, réception,
assurances, résiliation.
2. Pour chacune : citer l'article, résumer en clair, chiffrer
l'impact, attribuer un niveau VERT / ORANGE / ROUGE.
3. Lister les clauses absentes mais attendues.
4. Proposer mes questions de mise au point au maître d'ouvrage.
5. Produire une fiche d'1 page + verdict Go / sous conditions / No Go.
6. Citer les références utiles (CCAG Travaux 2021, Code de la
commande publique, loi 71-584) sans recopier les textes.
Reformule toujours, ne recopie jamais le texte officiel.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            'Donne tes seuils chiffrés (pénalité acceptable, délai de paiement maxi, RG tolérée). C’est ce qui transforme un résumé poli en outil de décision : le skill ne se contente plus de lire, il juge selon tes règles.',
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro: 'Régler avant de figer',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Claude propose une première version. Avant de l’enregistrer, vérifie sur un CCAP test que la sortie ressemble à une fiche structurée (9 familles, impact chiffré, vert / orange / rouge, clauses manquantes, verdict).',
        },
        {
          kind: 'callout',
          title: 'Exemple d’ajustement',
          body:
            '« Sois plus sévère sur les délais de paiement : au-delà de 45 j fin de mois, passe en ROUGE. Et ajoute une ligne impact trésorerie estimé sur la durée du chantier. » Quand le résultat te convient, enregistre la compétence.',
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Teste sur un vrai CCAP',
      intro: 'Le passage à la réalité',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Le vrai test, c’est un dossier en cours. Prends le prochain DCE qui arrive et déroule le workflow complet.',
        },
        {
          kind: 'list',
          items: [
            'Dépose le CCAP (PDF ou Word), idéalement avec le RC et le CCTP pour le contexte.',
            'Lance le skill et laisse-le produire sa fiche d’analyse complète.',
            'Confronte chaque alerte ROUGE à ta connaissance du chantier.',
            'Envoie les questions de mise au point au maître d’ouvrage avant la date limite.',
            'Classe la fiche dans ton dossier : mémoire pour le prochain marché du même MOA.',
          ],
        },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Voici le CCAP du marché [nom de l'opération].
Analyse-le avec le skill : tableau des 9 familles de clauses,
niveaux VERT/ORANGE/ROUGE, clauses manquantes, questions de
mise au point, verdict Go / sous conditions / No Go.
Livre-moi la synthèse en Word.`,
        },
        {
          kind: 'highlight',
          text: 'Le skill éclaire, il ne décide pas à ta place. Il te fait gagner 2 à 3 heures de lecture et t’évite une clause coûteuse. La décision Go / No Go et la signature restent toujours de ta responsabilité.',
        },
      ],
    },
  ],

  faqTitle: 'FAQ — Analyse CCAP',
  faq: [
    {
      q: 'Le skill remplace-t-il un juriste ?',
      a: 'Non.',
      aDetail:
        'Il fait gagner un temps considérable sur la lecture et structure ta décision, mais sur un montage complexe ou un litige potentiel, l’avis d’un juriste reste indispensable. Le skill te dit où regarder ; il ne plaide pas.',
    },
    {
      q: 'Le skill connaît-il le CCAG applicable ?',
      a: 'Oui, si tu le précises.',
      aDetail:
        'En marché public de travaux, le CCAP renvoie au CCAG Travaux 2021 : demande au skill de signaler les articles où le CCAP y déroge, car ce sont souvent les plus défavorables.',
    },
    {
      q: 'Et si le CCAP renvoie à des conditions générales ?',
      a: 'Signale-le au skill.',
      aDetail:
        'Il intégrera l’analyse des documents annexes (CCAG, CGV, CCAP-type) et te dira lesquels priment en cas de contradiction — souvent là que se cachent les pénalités oubliées.',
    },
    {
      q: 'Et si le CCAP est mal scanné ?',
      a: 'Claude lit la plupart des PDF, même scannés.',
      aDetail:
        'Si la qualité est mauvaise, vérifie les articles critiques (pénalités, paiement, RG) sur le document d’origine et redemande à Claude de relire l’article précis.',
    },
    {
      q: 'Public ou privé : faut-il deux skills ?',
      a: 'Pas forcément.',
      aDetail:
        'Les 9 familles existent dans les deux cas. Précise dans le prompt que le skill adapte sa grille : CCAG Travaux et Code de la commande publique côté public, conditions générales et délais de paiement côté privé.',
    },
    {
      q: 'Le skill peut-il comparer plusieurs CCAP ?',
      a: 'Oui, sur demande.',
      aDetail:
        'Il produit un tableau comparatif de deux ou trois marchés sur les mêmes critères (pénalités, RG, paiement) pour arbitrer où concentrer tes moyens en période de forte activité.',
    },
    {
      q: 'Mes données restent-elles confidentielles ?',
      a: 'Sur les plans professionnels, tes conversations ne servent pas à entraîner les modèles.',
      aDetail:
        'Évite malgré tout d’y coller des données strictement confidentielles non nécessaires à l’analyse.',
    },
    {
      q: 'Combien de temps avant qu’il soit fiable ?',
      a: 'Une à deux heures de réglage, puis quelques ajustements sur les trois premiers CCAP réels.',
      aDetail:
        'Dès le premier marché où il repère une pénalité non plafonnée, il a payé son temps de mise au point.',
    },
  ],

  cta: {
    eyebrow: 'ENVIE D’ALLER PLUS LOIN ?',
    title: 'Forme-toi à l’IA pour tes appels d’offres',
    subtitle:
      'Formation IA pour le BTP — présentiel Île-de-France — organisme certifié Qualiopi',
    programTitle: 'Formation IA appels d’offres BTP — DCE, chiffrage, mémoire technique',
    programItems: [
      'Analyser un DCE complet (CCAP, CCTP, RC) et repérer les clauses à risque en quelques minutes.',
      'Rédiger un mémoire technique solide, structuré, avec l’IA — relecture humaine obligatoire.',
      'Construire tes propres skills IA, adaptés à tes marchés et à ta façon de travailler.',
      'Financement OPCO / Constructys possible selon éligibilité.',
    ],
  },
};
