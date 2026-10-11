import type { TutoData } from './types';
import { RESSOURCES_MINIATURES } from '@/lib/ressources-miniatures';

export const TUTO_SKILL_RDV_CLIENT_OFC: TutoData = {
  slug: 'tuto-skill-rdv-client-ofc',
  category: 'productivite',
  pdfFile: 'tuto-skill-rdv-client-ofc.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill Préparation de RDV client',
  shortTitle: 'Skill préparation RDV client',
  subtitle:
    'Le tutoriel pas à pas pour préparer un rendez-vous client en 15 minutes — au lieu de 2 heures.',

  metaTitle: 'Tuto skill RDV client BTP : brief en 15 min',
  metaDescription:
    'Tuto skill préparation RDV client BTP : brief contact, ordre du jour et compte rendu avec Claude. Formation IA pour le BTP — PDF gratuit.',
  keywords: [
    'préparation RDV client',
    'brief rendez-vous client',
    'ordre du jour commercial',
    'compte rendu RDV',
    'questions de découverte',
    'skill Claude commercial',
    'tuto RDV client BTP',
    'chargé d’affaires',
    'prospection BTP',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'formation IA pour le BTP',
    'Laure Olivié',
    "OFC Création d'Entreprise",
  ],
  ogImageAlt: RESSOURCES_MINIATURES.tutoRdvClient.alt,

  publishedAt: '2026-10-11',
  updatedAt: '2026-10-11',

  cardSummary:
    'Prépare un rendez-vous client en 15 minutes : brief contact, ordre du jour, questions de découverte, arguments et trame de compte rendu — au lieu de 2 heures.',

  totalTimeMinutes: 15,

  heroImage: RESSOURCES_MINIATURES.tutoRdvClient,

  heroLearnPoints: [
    'Activer les compétences dans Claude (procédure à jour)',
    'Construire un skill « Préparation RDV client » nourri par tes vrais dossiers',
    'Générer brief contact, ordre du jour et trame de compte rendu en une seule demande',
    'Arriver aligné à chaque RDV, repartir avec le compte rendu déjà rédigé',
    'Exploiter les nouveautés Claude 2026 : agenda, mémoire, appli mobile',
  ],

  introTitle: 'Pourquoi un skill « Préparation de RDV client » ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "Un dirigeant ou un conducteur de travaux enchaîne les rendez-vous : prospects, clients fidèles, maîtres d'ouvrage, architectes, sous-traitants, fournisseurs. Sur le papier, chaque rendez-vous mérite une à deux heures de préparation. Dans la vraie vie, on ouvre la fiche contact cinq minutes avant, on improvise, on oublie le sujet sensible évoqué le mois dernier.",
    },
    {
      kind: 'paragraph',
      text:
        "Ce ne sont pas les arguments qui manquent, c'est le temps pour les remettre en tête au bon moment.",
    },
    { kind: 'h3', text: 'Avec un skill bien construit, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        'Un brief contact synthétique : historique, dernier échange, sujet sensible, levier connu',
        'Un ordre du jour structuré et chronométré, adapté au profil du client',
        'Les questions de découverte les plus pertinentes pour son secteur',
        'Tes arguments différenciants à sortir au bon moment, preuves chiffrées incluses',
        'Une trame de compte rendu avec les actions à programmer et la prochaine relance',
      ],
    },
    {
      kind: 'highlight',
      text:
        "15 minutes pour préparer, quelques minutes pour le compte rendu. Le rendez-vous redevient l'événement préparé qu'il devrait toujours être.",
    },
    {
      kind: 'callout',
      title: "Les 6 éléments d'un brief RDV professionnel",
      body:
        "1. Identité (qui parle, qui décide, qui paie) · 2. Historique de la relation (dernier échange, sujet ouvert) · 3. Contexte projet (besoin réel, urgence, budget probable) · 4. Objectif du rendez-vous (signer, qualifier, relancer, déminer) · 5. Arguments différenciants prêts à sortir · 6. Trame de compte rendu avec actions à programmer.",
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active la fonction Compétences dans Claude',
      intro:
        "Un skill (« compétence ») est un mode d'emploi permanent que tu donnes à Claude une fois pour toutes : ta façon de vendre, tes preuves, ta trame de compte rendu. Tu n'as plus à les réexpliquer avant chaque rendez-vous. Les compétences sont disponibles sur toutes les offres Claude, y compris la gratuite. Mais plaquette, devis et photos de chantier consomment vite le quota gratuit : pour un usage quotidien, l'offre Pro reste recommandée — environ 21 € TTC/mois, ou environ 17,50 €/mois en annuel.",
      blocks: [
        { kind: 'h3', text: "1. Active l'exécution de code (indispensable)" },
        {
          kind: 'list',
          items: [
            'Sur claude.ai : Paramètres → Capacités',
            'Active « Exécution de code et création de fichiers »',
          ],
        },
        {
          kind: 'callout',
          title: 'Sans cette option',
          body:
            'Sans cette option, les compétences restent grisées et Claude ne peut pas te livrer le brief en Word ou PDF.',
        },
        { kind: 'h3', text: '2. Ouvre ton espace Compétences' },
        {
          kind: 'list',
          items: [
            'Va dans Personnaliser → Compétences',
            'Le bouton « + » puis « Créer une compétence » te permet de la construire avec Claude ou de téléverser un fichier ZIP existant',
            "Chaque compétence s'active ou se désactive d'un simple interrupteur dans la liste",
          ],
        },
        {
          kind: 'callout',
          title: 'En équipe (offres Team et Enterprise)',
          body:
            "L'administrateur active les compétences dans Paramètres de l'organisation → Plugins et compétences. Tu peux ensuite partager ton skill (menu « ⋯ » → Partager) : associé, commerciaux et chargés d'affaires préparent leurs rendez-vous avec la même méthode. L'interface évolue régulièrement : si un libellé a changé, cherche « Compétences » ou « Skills » dans les paramètres.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière commerciale',
      intro:
        "Un skill ne devient utile que s'il connaît ta manière de vendre, tes preuves et ton secteur. Pas besoin de 50 documents : 5 à 7 fichiers bien choisis suffisent.",
      blocks: [
        {
          kind: 'numberedList',
          items: [
            'Deux ou trois comptes rendus de rendez-vous réussis — idéalement des rendez-vous qui ont abouti à une signature ou à une étape décisive. Ils apprennent au skill ton ton, ton vocabulaire et ce que tu juges important de noter.',
            'Ta plaquette ou ta fiche entreprise — savoir-faire, qualifications (Qualibat, Qualifelec, RGE…), références chantiers et positionnement.',
            'Tes ratios de chiffrage indicatifs — tu ne citeras pas toujours un prix en rendez-vous, mais le skill doit pouvoir te donner une fourchette plausible — présentée comme une estimation — si le prospect insiste.',
            'Tes questions de découverte — à défaut d’une liste, les 10 questions que tu poses toujours : nature du projet, surface, échéance, budget, décideur, financement, sensibilité prix ou qualité.',
            'Tes 3 cas clients phares, chiffrés — le chantier dont tu es le plus fier, celui où tu as tenu un délai impossible, celui où le client est revenu pour la phase 2 — avec surface, durée et montant si possible.',
            'Ta trame de compte rendu — Word, PDF ou même un mail type : c’est elle qui guidera la mise en forme du compte rendu après chaque rendez-vous.',
          ],
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        'Crée un Projet Claude « RDV clients », dépose ta matière dans ses connaissances, ouvre une conversation dans ce Projet et colle ce prompt. Adapte les passages entre crochets.',
      blocks: [
        {
          kind: 'prompt',
          title: 'Prompt — création du skill',
          text: `Je veux créer un skill Claude qui m'aide à préparer mes RDV clients.

Mon contexte :
- Entreprise : [NOM] — [métier : couverture / électricité / TCE…]
- Zone d'intervention : [départements]
- Clients cibles : [MOA publics / privés / particuliers / syndics…]
- Mes 3 différenciateurs : [à compléter]

Documents dans le Projet : 2 comptes rendus récents, plaquette,
ratios de chiffrage, questions de découverte, 3 cas clients,
trame de compte rendu.

Quand je te dirai « prépare le RDV avec [contact] — [contexte] »,
tu produiras un brief Word de 2 pages :
1. Brief contact (qui décide, historique, sujet sensible) ;
2. Ordre du jour chronométré (60 min par défaut) ;
3. 8 questions de découverte adaptées au profil ;
4. 3 arguments différenciants avec preuves chiffrées ;
5. Trame de compte rendu pré-remplie.

N'invente jamais un chiffre ou une référence : s'il en manque,
signale-le. Pose-moi tes questions, puis transforme le tout
en compétence réutilisable.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            'Plus tu donnes de contexte (métier, zone, clients cibles, différenciateurs), plus le skill produit un brief percutant et calibré pour TON marché — pas un brief générique.',
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro:
        'Claude te livre un dossier de compétence (fichier SKILL.md, parfois avec des annexes). Avant de l’activer, vérifie qu’il a bien capté ta façon de travailler.',
      blocks: [
        {
          kind: 'list',
          items: [
            'Le ton du brief correspond au tien (concis, terrain, sans jargon creux)',
            'Les questions de découverte couvrent tes critères de qualification',
            'Les arguments différenciants sont les TIENS, pas des arguments génériques',
            'La trame de compte rendu reprend ta structure (objet, points, décisions, actions)',
            'Les durées de l’ordre du jour sont réalistes pour tes rendez-vous',
            'Aucune donnée d’un dossier client n’est restée écrite en dur dans le skill',
          ],
        },
        {
          kind: 'prompt',
          title: "Exemple d'ajustement",
          text: `Modifie le skill :
- Ajoute un point « budget pressenti » dans le brief, présenté
  comme une estimation si le client ne l'a pas donné ;
- Dans l'ordre du jour de 60 min, garde 10 min en fin pour
  présenter un cas client similaire ;
- Dans la trame de compte rendu, ajoute « date de relance proposée ».`,
        },
        { kind: 'h3', text: 'Active-le' },
        {
          kind: 'paragraph',
          text:
            'Téléverse le dossier dans Personnaliser → Compétences → « + », puis active-le. Il est ensuite disponible dans toutes tes conversations.',
        },
        {
          kind: 'callout',
          title: 'La description décide de tout',
          body:
            "Claude lit la description de ta compétence (200 caractères max) pour savoir quand la déclencher. Écris-la avec tes mots : « Préparation de rendez-vous client, brief contact, ordre du jour, questions de découverte et compte rendu pour [ENTREPRISE] ».",
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Teste sur un vrai RDV à venir',
      intro:
        'Le seul vrai test, c’est un rendez-vous de la semaine prochaine. Compare le brief avec ce que tu aurais préparé toi-même.',
      blocks: [
        {
          kind: 'list',
          items: [
            'Le matin, demande : « prépare le RDV avec [nom] — [contexte] »',
            'Récupère le brief Word, imprime-le ou garde-le sur l’appli mobile Claude',
            'Pendant le rendez-vous, prends tes notes sur la trame de compte rendu',
            'Juste après, dicte tes notes dans l’appli mobile : Claude rédige le compte rendu propre',
            'Valide les actions et la date de relance avant d’envoyer quoi que ce soit',
          ],
        },
        { kind: 'h3', text: 'Le bon prompt pour un usage quotidien' },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Prépare le RDV avec [NOM DU CONTACT] :
- Entreprise : [NOM CLIENT]
- Date / lieu : [JOUR · HEURE · LIEU]
- Objet annoncé : [ex. étude de faisabilité couverture 800 m²]
- Historique : [ex. RDV en mars, chiffrage demandé, pas de suite]
- Sujet sensible : [ex. un concurrent moins cher est en course]
- Mon objectif : [ex. requalifier le besoin et sortir du seul prix]

Génère le brief complet au format Word.`,
        },
        {
          kind: 'callout',
          title: "La règle d'or",
          body:
            "Le skill ne remplace pas ton instinct commercial — il s'assure que tu n'oublies rien. C'est la différence entre un rendez-vous mené à l'inspiration et un rendez-vous mené avec méthode.",
        },
        { kind: 'h3', text: 'Les nouveautés Claude à exploiter' },
        {
          kind: 'paragraph',
          text:
            'Claude a beaucoup évolué en 2026. Voici les fonctions qui font gagner le plus de temps sur tes rendez-vous — la disponibilité dépend de ton offre et le déploiement est parfois progressif.',
        },
        {
          kind: 'list',
          items: [
            'Projets — un Projet par client important garde devis, comptes rendus et échanges',
            'Connecteurs agenda et mail — retrouve les RDV, relit les derniers mails et prépare le mail de confirmation en brouillon',
            'Mémoire — retient format du brief, ton et différenciateurs (Paramètres → Mémoire)',
            'Claude Docs — compte rendu modifiable, partageable, exportable Word / PDF',
            'Modification ciblée — corrige une phrase sans tout régénérer',
            'Tâches planifiées — chaque matin, liste tes RDV du jour et prépare les briefs',
          ],
        },
        {
          kind: 'prompt',
          title: 'Prompt — tâche planifiée du matin',
          text: `Chaque jour ouvré à 7 h : regarde mes rendez-vous clients du jour
dans mon agenda, retrouve pour chacun le dernier échange dans mes
mails et dans mon Projet « RDV clients », et prépare un brief
d'une page par rendez-vous. N'envoie aucun mail sans mon accord.`,
        },
        {
          kind: 'callout',
          title: 'Confidentialité et RGPD',
          body:
            "Vérifie dans Paramètres → Confidentialité si l'utilisation de tes conversations pour améliorer Claude est activée, et désactive-la si besoin. Ne transmets que les données utiles au rendez-vous (pas de RIB ni de données personnelles superflues) : les informations de tes prospects restent des données personnelles.",
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Le skill fonctionne-t-il en présentiel et en visio ?',
      a: 'Oui, sans modification. Précise « RDV en visio » : le skill ajoute un rappel pour tester le son et préparer l’écran à partager. Le reste ne change pas.',
    },
    {
      q: 'Mes informations clients restent-elles confidentielles ?',
      a: "Depuis l'automne 2025, sur les offres individuelles (Free, Pro, Max), c'est un réglage de Paramètres → Confidentialité qui décide si tes conversations peuvent servir à améliorer Claude : vérifie-le. Les offres Team et Enterprise ne s'en servent pas. Dans tous les cas, ne colle que ce qui est utile.",
    },
    {
      q: 'Combien de temps pour créer le skill ?',
      a: 'Avec tes documents prêts : 25 à 40 minutes une fois pour toutes (création, ajustements, premier test). Ensuite, chaque rendez-vous se prépare en quelques minutes.',
    },
    {
      q: 'Et si le contact est un client existant ?',
      a: "C'est encore plus efficace : joins le dernier compte rendu, le dernier devis et l'historique du chantier. Le skill produit alors un brief « point de relation » au lieu d'un brief « découverte ».",
    },
    {
      q: 'Puis-je partager le skill avec mon associé ou mon commercial ?',
      a: "Oui : en offre Team ou Enterprise, via le bouton Partager ; sinon, en lui transmettant le dossier ZIP à téléverser sur son compte. Même méthode, mêmes questions, même trame — et un excellent outil d'intégration pour une nouvelle recrue.",
    },
    {
      q: 'Le skill peut-il préparer le mail de confirmation ?',
      a: "Oui, demande-le à la création : mail de confirmation la veille, brief le jour J, compte rendu avec relance après. Avec un connecteur mail, Claude le dépose en brouillon — c'est toi qui l'envoies.",
    },
    {
      q: 'Et si je veux le construire accompagné ?',
      a: 'En formation, on construit le skill ensemble sur tes propres dossiers : tu repars avec une compétence opérationnelle.',
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: 'On le construit ensemble',
    subtitle:
      'Formation en présentiel en Île-de-France — prise en charge OPCO/Constructys selon éligibilité',
    programTitle: 'Formation Niveau 1 — Devis, e-mails et productivité',
    programItems: [
      'On construit ton skill « RDV client » sur tes propres dossiers',
      'On le calibre : brief, questions de découverte, arguments, compte rendu',
      'Tu repars avec une compétence opérationnelle dès ton prochain rendez-vous',
      'Format : 4 h · intra-entreprise ou session inter · Organisme certifié Qualiopi',
    ],
  },
};
