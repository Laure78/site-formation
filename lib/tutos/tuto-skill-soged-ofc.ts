import type { TutoData } from './types';
import { RESSOURCES_MINIATURES } from '@/lib/ressources-miniatures';

export const TUTO_SKILL_SOGED_OFC: TutoData = {
  slug: 'tuto-skill-soged-ofc',
  category: 'qse-conformite',
  pdfFile: 'tuto-skill-soged-ofc.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill SOGED',
  shortTitle: 'Skill SOGED',
  subtitle:
    "Le tutoriel pas à pas pour générer ton Schéma d'Organisation et de Gestion des Déchets — 12 minutes au lieu de 3 heures.",

  metaTitle: 'Tuto skill SOGED : plan déchets chantier 12 min',
  metaDescription:
    'Tuto skill SOGED BTP : schéma gestion des déchets, AGEC, REP Bâtiment et Trackdéchets avec Claude. Formation IA pour le BTP — PDF gratuit.',
  keywords: [
    'SOGED',
    'schéma organisation gestion déchets',
    'déchets de chantier',
    'loi AGEC',
    'REP Bâtiment',
    'Trackdéchets',
    'CCAG-Travaux art. 36',
    'skill Claude SOGED',
    'tuto SOGED',
    'diagnostic PEMD',
    'valorisation déchets BTP',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'formation IA pour le BTP',
    'Laure Olivié',
    "OFC Création d'Entreprise",
  ],
  ogImageAlt: RESSOURCES_MINIATURES.tutoSoged.alt,

  publishedAt: '2026-10-11',
  updatedAt: '2026-10-11',

  cardSummary:
    "Génère ton SOGED (Schéma d'Organisation et de Gestion des Déchets) aligné AGEC, REP Bâtiment et Trackdéchets — 12 minutes au lieu de 3 heures.",

  totalTimeMinutes: 12,

  heroImage: RESSOURCES_MINIATURES.tutoSoged,

  heroLearnPoints: [
    'Activer les compétences dans Claude (procédure à jour)',
    'Préparer ta matière chantier pour entraîner ton skill SOGED',
    'Générer un SOGED aligné sur le CCAG-Travaux, la loi AGEC, la REP Bâtiment et Trackdéchets',
    'Réutiliser le skill sur tous tes chantiers',
    'Exploiter les nouveautés Claude 2026 : Projets, mémoire, tâches planifiées',
  ],

  introTitle: 'Pourquoi un skill SOGED ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "Le SOGED (Schéma d'Organisation et de Gestion des Déchets) est devenu incontournable. En marché public, le CCAG-Travaux 2021 (art. 36) demande au titulaire de le remettre pendant la période de préparation, ou au plus tard deux mois après la notification. En privé, il est de plus en plus exigé par les maîtres d'ouvrage. Et la réglementation s'est durcie : loi AGEC, REP Bâtiment, traçabilité dématérialisée des déchets dangereux.",
    },
    {
      kind: 'paragraph',
      text:
        "Pourtant, dans beaucoup de PME, le SOGED reste un vieux fichier Word recopié de chantier en chantier, avec des filières dépassées, sans REP ni Trackdéchets. Le conducteur de travaux y passe souvent 2 à 3 heures par dossier — pour un document qui peut coûter des points en analyse des offres s'il est mal calibré.",
    },
    { kind: 'h3', text: 'Avec un skill SOGED bien construit, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        'Le cadre réglementaire est intégré une fois pour toutes',
        'Les estimations de tonnages partent de tes propres ratios',
        'Tes filières locales et les éco-organismes de la REP Bâtiment sont repris',
        "Pour chaque chantier : adresse, type d'ouvrage, surface — et tu récupères un SOGED rédigé",
        "Le document sort en Word, au format du maître d'ouvrage si un modèle est imposé",
      ],
    },
    {
      kind: 'highlight',
      text: 'Résultat : 12 minutes au lieu de 3 heures — et un SOGED qui ne te pénalise plus.',
    },
    {
      kind: 'callout',
      title: 'Le cadre réglementaire à connaître',
      body:
        "Code de l'environnement (art. L541-1 et suivants) · loi AGEC n° 2020-105 du 10/02/2020 · REP Bâtiment : décret n° 2021-1941 du 31/12/2021, éco-contributions depuis le 1er mai 2023 · traçabilité : décret n° 2021-321, Trackdéchets obligatoire depuis le 1er janvier 2022 pour les déchets dangereux et l'amiante (BSDA) · CCAG-Travaux 2021, art. 36 · amiante : décret n° 2012-639. Pour les démolitions et réhabilitations lourdes, demande au maître d'ouvrage son diagnostic PEMD (produits, équipements, matériaux et déchets) : c'est ta meilleure source pour estimer les tonnages.",
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active la fonction Compétences dans Claude',
      intro:
        "Un skill (« compétence ») est un mode d'emploi permanent que tu donnes à Claude une fois pour toutes : ta trame SOGED, tes ratios, tes filières. Tu n'as plus à les réexpliquer à chaque chantier. Les compétences sont disponibles sur toutes les offres Claude, y compris la gratuite. Mais un SOGED avec pièces jointes (CCTP, plan masse, diagnostic) consomme vite le quota gratuit : pour un usage professionnel, l'offre Pro reste recommandée — environ 21 € TTC/mois, ou environ 17,50 €/mois en annuel.",
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
            "Sans cette option, les compétences restent grisées et Claude ne peut pas te livrer le SOGED en Word : tu n'aurais que du texte à recopier.",
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
            "L'administrateur active les compétences dans Paramètres de l'organisation → Plugins et compétences. Tu peux ensuite partager ton skill (menu « ⋯ » → Partager) : tous les conducteurs produisent des SOGED homogènes. L'interface évolue régulièrement : si un libellé a changé, cherche « Compétences » ou « Skills » dans les paramètres.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière SOGED',
      intro:
        "Un skill SOGED n'est utile que s'il est nourri par ta réalité d'entreprise. Prends 20 minutes pour réunir ces cinq éléments.",
      blocks: [
        {
          kind: 'numberedList',
          items: [
            "Deux ou trois SOGED finalisés et acceptés — pas tes brouillons : des SOGED validés par un maître d'ouvrage sur tes derniers chantiers. Idéalement un marché public et un marché privé, pour couvrir les deux niveaux d'exigence.",
            'Ta nomenclature déchets et tes ratios — les codes déchets que tu rencontres (17 01 01 béton, 17 02 01 bois, 17 04 05 fer et acier, 17 06 05* matériaux contenant de l’amiante…) et tes ratios moyens par m² ou par type d’ouvrage. À défaut, les tonnages réels de ton dernier chantier similaire.',
            'Tes filières et points de reprise — centres de tri, ISDI, ISDND, ISDD, plateformes et points de reprise que tu utilises sur ta zone. Les déchets triés relevant de la REP Bâtiment peuvent être repris sans frais dans les points agréés, sans que tu aies besoin d’adhérer à un éco-organisme (Ecominéro, Ecomaison, Valdelia, Valobat).',
            "Les exigences de tes maîtres d'ouvrage — modèles imposés, taux de valorisation visés, pénalités prévues au CCAP, photos ou bordereaux à fournir. Ajoute tout ce que tes donneurs d'ordre récurrents demandent.",
            "Tes trames et documents types — plan d'installation de chantier avec zones de bennes, affichage de tri, fiche de sensibilisation des compagnons, tableau de suivi mensuel des évacuations.",
          ],
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        'Crée un Projet Claude « SOGED », dépose la matière de l’étape 2 dans ses connaissances, puis ouvre une conversation dans ce Projet et colle ce prompt.',
      blocks: [
        {
          kind: 'prompt',
          title: 'Prompt — création du skill SOGED',
          text: `Je veux créer un skill Claude dédié à la rédaction de SOGED
(Schéma d'Organisation et de Gestion des Déchets) pour mes chantiers.

Contexte : je suis [conducteur de travaux / dirigeant] chez
[ENTREPRISE], spécialisé en [corps d'état].
Mes chantiers types : [logement / tertiaire / réhab / démolition].

Documents dans le Projet : 2 SOGED acceptés (public + privé),
ma nomenclature et mes ratios, mes filières, les modèles imposés
par mes maîtres d'ouvrage récurrents.

Cadre à respecter :
- CCAG-Travaux 2021, art. 36 (contenu du SOGED, traçabilité) ;
- loi AGEC et REP Bâtiment (décret 2021-1941) ;
- Trackdéchets pour les déchets dangereux et l'amiante (BSDA).

Le skill prend en entrée : adresse, maître d'ouvrage, type
d'ouvrage, surface, durée, corps d'état — et produit un SOGED
complet en Word. N'invente jamais une filière ni un texte : si une
info manque, demande-la. Pose-moi toutes les questions nécessaires
avant de commencer.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            'Plus tu donnes de matière réelle à Claude, plus ton skill colle à ton style et à tes habitudes. Un skill construit en 30 minutes avec 3 vrais SOGED bat largement un skill construit en 5 minutes avec des consignes générales.',
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro: 'Claude te propose une première version. Vérifie ces six points.',
      blocks: [
        {
          kind: 'list',
          items: [
            'La description du skill mentionne bien SOGED, plan déchets, gestion des déchets de chantier',
            'La structure suit l’art. 36 : prévention, tri, installations de destination, traçabilité, moyens, responsable, sensibilisation',
            'Les références réglementaires sont à jour (AGEC, REP Bâtiment, Trackdéchets, CCAG 2021)',
            'Les quatre éco-organismes de la REP Bâtiment sont cités correctement',
            'Le skill demande toujours adresse, maître d’ouvrage, surface et durée avant de rédiger',
            'Le livrable sort en Word, pour que tu puisses retoucher avant envoi',
          ],
        },
        {
          kind: 'prompt',
          title: "Exemple d'ajustement",
          text: `Pour les estimations de tonnages, ne pars pas de ratios génériques.
Demande-moi le type d'ouvrage (neuf / réhab / démolition), la surface
de plancher et le corps d'état dominant, puis applique mes ratios.
Si un diagnostic PEMD existe, utilise-le en priorité.
Si le taux de valorisation matière prévu passe sous 70 %, signale-le
en alerte (objectif national pour les déchets du BTP).`,
        },
        { kind: 'h3', text: 'Transforme-le en compétence' },
        {
          kind: 'paragraph',
          text:
            "Demande : « Transforme ces consignes en compétence réutilisable ». Claude te livre un dossier de compétence (fichier SKILL.md + annexes). Téléverse-le dans Personnaliser → Compétences, puis active-le.",
        },
        {
          kind: 'callout',
          title: 'La description décide de tout',
          body:
            "Claude lit la description de ta compétence (200 caractères max) pour savoir quand la déclencher. Écris-la avec tes mots : « SOGED, plan de gestion des déchets de chantier, bennes, filières, Trackdéchets, BSDA pour [ENTREPRISE] ».",
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Teste sur un vrai chantier',
      intro:
        'Ne teste jamais un skill SOGED sur un cas fictif : tu ne verrais pas les vrais trous. Prends un chantier qui démarre.',
      blocks: [
        {
          kind: 'list',
          items: [
            'Ouvre une conversation dans ton Projet « SOGED »',
            'Demande simplement « génère un SOGED » : la compétence se déclenche d’elle-même',
            'Réponds aux questions (adresse, maître d’ouvrage, ouvrage, surface, durée, corps d’état)',
            'Récupère le SOGED Word, relis-le et corrige les écarts',
            'Reverse chaque correction dans le skill pour qu’elle ne revienne plus',
          ],
        },
        { kind: 'h3', text: 'Le bon prompt pour un usage quotidien' },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Génère un SOGED pour le chantier suivant :
- Adresse : [adresse complète]
- Maître d'ouvrage : [nom — public / privé]   - MOE : [nom]
- Type d'ouvrage : [neuf / réhab / démolition / extension]
- Surface de plancher : [m²]                   - Durée : [mois]
- Corps d'état présents : [liste]
- Particularités : [amiante / plomb / site occupé / co-activité]
- Diagnostic PEMD ou modèle imposé : [oui / non — joints]
Sors-moi le SOGED complet en Word.`,
        },
        {
          kind: 'callout',
          title: "La règle d'or",
          body:
            "Un skill SOGED se bonifie avec le temps. Chaque correction apportée à la sortie, reverse-la dans le skill. Au bout de quelques chantiers, il produit un SOGED quasi prêt à envoyer — que tu relis et signes toujours.",
        },
        { kind: 'h3', text: 'Les nouveautés Claude à exploiter' },
        {
          kind: 'paragraph',
          text:
            'Claude a beaucoup évolué en 2026. Voici les fonctions qui font gagner le plus de temps sur tes SOGED — la disponibilité dépend de ton offre et le déploiement est parfois progressif.',
        },
        {
          kind: 'list',
          items: [
            'Projets — un Projet par chantier garde le SOGED en vigueur, le diagnostic, les bordereaux et le CCAP',
            'Grosses tâches dans le chat (Pro et Max) — SOGED Word, plan de bennes et tableau d’évacuations Excel',
            'Claude Docs — SOGED modifiable, partageable, exportable Word / PDF',
            'Modification ciblée — corrige une filière ou un tonnage sans tout régénérer',
            'Mémoire — retient filières, ton et format (Paramètres → Mémoire)',
            'Tâches planifiées — point mensuel automatique sur évacuations et taux de valorisation',
          ],
        },
        {
          kind: 'prompt',
          title: 'Prompt — tâche planifiée mensuelle',
          text: `Chaque 1er du mois à 8 h : dans mon Projet « [CHANTIER] », compare
le SOGED aux évacuations du mois que je t'ai transmises, liste les
justificatifs ou bordereaux manquants, calcule le taux de
valorisation et prépare un point de 10 lignes pour le maître
d'ouvrage. Ne modifie rien sans mon accord.`,
        },
        {
          kind: 'callout',
          title: 'Règle de prudence',
          body:
            'Claude prépare, tu vérifies et tu signes. Le skill ne remplace pas Trackdéchets : les bordereaux se créent et se signent sur la plateforme officielle.',
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: "Un SOGED rédigé avec l'IA est-il valable ?",
      a: "Oui, s'il est relu, validé et signé par l'entreprise : c'est elle qui en porte la responsabilité, comme pour un document rédigé par un collaborateur.",
    },
    {
      q: 'SOGED, SOSED, PAE, notice environnementale : quelle différence ?',
      a: "Le CCAG-Travaux 2021 parle de SOGED. Le SOSED (schéma d'organisation et de suivi de l'évacuation des déchets) est une ancienne appellation encore présente dans certains marchés. Le PAE (plan d'assurance environnement) est plus large : bruit, eau, poussières. La notice environnementale est souvent une pièce de l'offre qui résume ta démarche.",
    },
    {
      q: 'Faut-il un SOGED même pour un petit chantier ?',
      a: "Si ton marché renvoie au CCAG-Travaux 2021, l'art. 36 prévoit sa remise. Sinon, cela dépend du contrat. Dans tous les cas, les obligations de traçabilité (registre, bordereaux, Trackdéchets pour les déchets dangereux) s'appliquent. Un SOGED court et adapté vaut mieux qu'aucun.",
    },
    {
      q: 'Mon skill peut-il remplir Trackdéchets ?',
      a: 'Non : Trackdéchets est une plateforme publique distincte où les bordereaux se créent et se signent. Le skill prépare les informations utiles (codes déchets, filières, mentions) et te rappelle les bordereaux à émettre.',
    },
    {
      q: "Et si le maître d'ouvrage impose son modèle ?",
      a: "Mets le modèle dans ton Projet et dis à Claude : « Quand un modèle est fourni, remplis-le au lieu du format standard. » Le skill s'adapte à chaque donneur d'ordre.",
    },
    {
      q: 'Et si je découvre une erreur après envoi ?',
      a: 'Le SOGED vit pendant le chantier : produis une version révisée, datée, et reverse la correction dans le skill pour les prochains dossiers.',
    },
    {
      q: 'Et si je veux le construire accompagné ?',
      a: 'En formation, on construit le skill ensemble sur tes propres chantiers : tu repars avec une compétence opérationnelle.',
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: 'On le construit ensemble',
    subtitle:
      'Formation en présentiel en Île-de-France — prise en charge OPCO/Constructys selon éligibilité',
    programTitle: 'Formation Niveau 2 — Conducteurs de travaux',
    programItems: [
      'On construit ton skill SOGED sur tes propres chantiers et filières',
      'On le calibre : ratios, réglementation, modèles de tes maîtres d’ouvrage',
      'Tu repars avec une compétence opérationnelle et un SOGED prêt à signer',
      'Format : 4 h · intra-entreprise ou session inter · Organisme certifié Qualiopi',
    ],
  },
};
