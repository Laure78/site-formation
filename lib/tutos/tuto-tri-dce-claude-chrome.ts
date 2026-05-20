import type { TutoData } from './types';

export const TUTO_TRI_DCE_CLAUDE_CHROME: TutoData = {
  slug: 'tuto-tri-dce-claude-chrome',
  category: 'marches-et-veille',
  pdfFile: 'tuto-tri-dce-claude-chrome.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Trie tes DCE avec Claude in Chrome',
  shortTitle: 'Tri DCE — Claude in Chrome',
  subtitle:
    'Le tutoriel pas à pas pour faire scanner le BOAMP automatiquement chaque matin — 3 dossiers utiles sur 47 publiés.',

  metaTitle: 'Tuto Claude in Chrome BTP : trie tes DCE BOAMP en automatique',
  metaDescription:
    "Claude in Chrome BTP : automatise ton tri DCE BOAMP chaque matin. 5 critères, raccourcis programmés. Tutoriel par Laure Olivié, formatrice IA BTP.",
  keywords: [
    'Claude in Chrome',
    'extension Claude Chrome',
    'tri DCE BTP',
    'BOAMP IA',
    'veille appels d\'offres BTP',
    'PLACE marchés publics',
    'AWS marchés sécurisés',
    'IA marchés publics BTP',
    'IA appel d\'offres BTP',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'IA Chrome BTP',
    'automatisation veille DCE',
    'pipeline commerciale BTP',
    'formation IA BTP',
    'Laure Olivié',
    'OFC Création d\'Entreprise',
    'Constructys',
  ],
  ogImageAlt:
    'Tuto Claude in Chrome — veille DCE BOAMP automatique chaque matin, par Laure Olivié',

  publishedAt: '2026-05-09',
  updatedAt: '2026-05-09',

  cardSummary:
    "Installe Claude in Chrome et programme une veille DCE automatique chaque matin sur BOAMP, PLACE, AWS. Tu reçois 3 à 5 DCE pertinents par jour au lieu d'en filtrer 50 à la main.",

  totalTimeMinutes: 30,

  heroLearnPoints: [
    'La différence entre Claude in Chrome et un skill classique',
    '5 étapes pour installer et paramétrer ton tri',
    'Le prompt exact à donner à Claude',
    'Comment programmer la veille automatique chaque matin',
  ],

  introTitle: 'Pourquoi Claude in Chrome pour le tri DCE ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "Sur le BOAMP, 50 à 80 nouveaux DCE sont publiés chaque jour en France. La majorité ne te concerne pas : mauvais métier, mauvaise région, mauvais montant, mauvais délai.",
    },
    {
      kind: 'paragraph',
      text:
        "Tu passes 4h par semaine à ouvrir des PDF un par un pour finalement n'en garder que 3. C'est un travail de filtrage que personne n'aime faire — et qui pourtant décide ta pipeline commerciale.",
    },
    { kind: 'h3', text: 'Avec Claude in Chrome, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        "L'extension scanne les plateformes pendant que tu prends ton café",
        'Elle applique tes critères : zone, métier, montant, délai',
        'Elle ouvre les fiches qui correspondent et te les liste',
        'Tu reçois 3 à 5 DCE pertinents au lieu de 50 à filtrer',
        'Tu gagnes 3 à 4 heures par semaine',
      ],
    },
    {
      kind: 'highlight',
      text: "C'est l'IA qui fait le tri. Pas toi.",
    },
    {
      kind: 'callout',
      title: "Claude in Chrome, ça n'est pas un skill classique",
      body:
        "Un skill, c'est un mode d'emploi que Claude utilise pour produire un document (mémoire, DUERP, CR). Claude in Chrome, c'est une extension qui agit dans ton navigateur — elle lit, clique, scrolle, comme si elle naviguait à ta place. Pour le tri de DCE, c'est exactement ce qu'il faut : aller sur les plateformes, filtrer, ouvrir les fiches utiles.",
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: "Installe l'extension Claude in Chrome",
      intro:
        "Claude in Chrome est en bêta, disponible sur tous les plans payants Claude (Pro 18€/mois, Max, Team, Enterprise). L'installation prend 5 minutes.",
      blocks: [
        { kind: 'paragraph', text: 'Voici le chemin précis :' },
        { kind: 'h3', text: 'Activer le connecteur dans Claude' },
        {
          kind: 'list',
          items: [
            'Ouvre Claude.ai et connecte-toi',
            'Clique sur tes initiales en bas à gauche',
            'Sélectionne « Paramètres »',
            "Va dans l'onglet « Connecteurs »",
            'Trouve « Claude in Chrome » dans la liste et clique sur « Configurer »',
            'Active le connecteur',
          ],
        },
        { kind: 'h3', text: "Installer l'extension dans Chrome" },
        {
          kind: 'list',
          items: [
            'Clique sur « Ajouter à Chrome » depuis la page de configuration',
            "Connecte-toi avec ton compte Claude quand l'extension le demande",
            "Épingle l'extension : icône puzzle dans la barre Chrome → punaise à côté de Claude",
            'Accorde les permissions demandées (lecture des onglets, navigation)',
          ],
        },
        {
          kind: 'callout',
          title: 'Mode de permission recommandé',
          body:
            "Au premier lancement, Claude te demande de choisir entre « demander avant d'agir » et « agir sans demander ». Choisis « demander avant d'agir » : Claude te montre son plan avant chaque action et tu valides. Tu basculeras en mode autonome plus tard, quand tu auras confiance dans son comportement.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Définis tes critères de tri',
      intro:
        "Avant de demander à Claude de scanner les plateformes, tu dois préciser ce que tu cherches. Plus tes critères sont stricts, plus son tri sera utile.",
      blocks: [
        { kind: 'h3', text: 'Les 5 critères à définir' },
        {
          kind: 'list',
          items: [
            'Zone géographique : départements ou régions précis (75, 78, 91, 92, 93, 94, 95)',
            "Lots métiers : exactement les libellés qu'on trouve dans les CCTP (revêtements de sols, faïence, étanchéité, électricité…)",
            'Montant : seuil minimum (50 000 € HT) et maximum si tu en as un',
            'Délai de remise : minimum (15 jours) pour avoir le temps de chiffrer',
            'Type de marché : public, privé, mapa, accord-cadre, sous-traitance',
          ],
        },
        { kind: 'h3', text: 'Les plateformes à cibler' },
        {
          kind: 'paragraph',
          text:
            'Liste les plateformes que tu veux que Claude consulte. Les plus utilisées en BTP :',
        },
        {
          kind: 'list',
          items: [
            'BOAMP (boamp.fr) — marchés publics nationaux',
            'PLACE (place.economie.gouv.fr) — marchés publics État',
            'AWS (marches-securises.fr) — collectivités locales',
            'Klekoon, e-marchespublics.com, achat-public — selon tes habitudes',
          ],
        },
        { kind: 'h3', text: 'Tes critères Go / No Go avancés' },
        {
          kind: 'paragraph',
          text:
            "Optionnel mais utile : précise tes éliminations automatiques. Exemples : pas de marchés à bons de commande inférieurs à 100k€, pas de chantiers en site occupé hospitalier, pas de DCE imposant une qualification que tu n'as pas.",
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance ton premier tri avec Claude',
      intro:
        "Ouvre Chrome. Va sur le BOAMP. Clique sur l'icône Claude dans la barre Chrome — le panneau latéral s'ouvre.",
      blocks: [
        { kind: 'paragraph', text: 'Colle ce prompt :' },
        {
          kind: 'prompt',
          title: 'Prompt à copier-coller dans Claude',
          text: `Je suis dirigeant d'une entreprise BTP en [TON MÉTIER], basée en [VILLE].

Je veux que tu scannes les nouveaux DCE publiés sur cette plateforme et que tu sélectionnes uniquement ceux qui correspondent à mes critères :
- Zone géographique : [DÉPARTEMENTS]
- Lots métiers recherchés : [LISTE PRÉCISE]
- Montant minimum : [MONTANT] € HT
- Délai de remise minimum : [JOURS] jours
- Type de marché : [PUBLIC / PRIVÉ / MAPA]

À éliminer automatiquement :
- [TES CRITÈRES DE NO GO]

Pour chaque DCE retenu, donne-moi :
1. L'objet du marché
2. Le maître d'ouvrage
3. Le montant estimé si indiqué
4. La date limite de remise
5. Le lien direct vers la fiche

Présente le résultat sous forme de tableau. Si aucun DCE ne correspond, dis-le simplement.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            "Claude lit la page comme un humain. Si la plateforme demande une connexion, il s'arrête et te demande de te connecter. Si elle a un CAPTCHA, pareil. C'est normal — ça protège contre les abus. Une fois connecté, tu reprends Claude là où il s'est arrêté.",
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Enregistre le workflow comme raccourci',
      intro:
        "Le vrai pouvoir de Claude in Chrome, c'est l'enregistrement de raccourci. Une fois ton workflow validé, tu peux le rejouer en un clic — et même le programmer pour qu'il s'exécute tout seul chaque matin.",
      blocks: [
        { kind: 'h3', text: 'Enregistrer le workflow' },
        {
          kind: 'list',
          items: [
            "Dans le panneau Claude, clique sur l'icône d'enregistrement",
            "Refais le scan en suivant les étapes de l'étape 3",
            "Arrête l'enregistrement quand le tableau est généré",
            'Sauvegarde le raccourci avec un nom clair (« Veille DCE matin »)',
          ],
        },
        { kind: 'h3', text: 'Programmer la veille automatique' },
        {
          kind: 'list',
          items: [
            "Clique sur l'icône d'horloge en haut à droite du panneau Claude",
            'Sélectionne ton raccourci « Veille DCE matin »',
            'Définis la fréquence : quotidienne, à 8h',
            'Active la programmation',
          ],
        },
        {
          kind: 'callout',
          title: 'Ce qui va se passer',
          body:
            "Chaque matin à 8h, Claude scanne automatiquement les plateformes. Quand tu ouvres Chrome avec ton café, le panneau Claude affiche déjà ta sélection du jour. Tu n'as plus rien à lancer.",
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Affine au fil des semaines',
      intro:
        "La première semaine, Claude va te proposer trop de DCE — ou en oublier qui correspondent. C'est normal. Tu affines au fur et à mesure.",
      blocks: [
        { kind: 'h3', text: 'Les ajustements types après quelques jours' },
        {
          kind: 'list',
          items: [
            'Élargir un libellé métier : « revêtements » au lieu de « carrelage » pour ne plus rater les marchés multi-lots',
            'Restreindre une zone : enlever un département où tu as trop de concurrence',
            "Ajouter un critère de qualification : si Qualibat 2152 est exigé et que tu ne l'as pas, élimination automatique",
            "Ajouter une règle sur le maître d'ouvrage : exclure une mairie qui ne paie jamais à temps",
          ],
        },
        { kind: 'h3', text: 'Le bon prompt pour les ajustements' },
        {
          kind: 'prompt',
          title: 'Prompt — mise à jour du raccourci',
          text: `Modifie mon raccourci « Veille DCE matin » avec les ajustements suivants :
- [AJUSTEMENT 1]
- [AJUSTEMENT 2]
- [AJUSTEMENT 3]

Ré-enregistre la nouvelle version sous le même nom.`,
        },
        {
          kind: 'callout',
          title: "La règle d'or",
          body:
            "Garde le contrôle. Claude trie, mais ce sont tes critères qui décident. Si un DCE pertinent passe à travers le filtre, c'est qu'un critère est mal calibré. Ne fais pas confiance aveuglément la première semaine — vérifie un échantillon de DCE filtrés pour t'assurer que rien d'important n'est éliminé à tort.",
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Claude peut-il vraiment naviguer seul sur le BOAMP ?',
      a: "Oui. L'extension fonctionne dans ton Chrome, avec ta session ouverte. Elle clique, scrolle, lit les fiches comme un humain — mais bien plus vite. Si une plateforme exige une connexion ou affiche un CAPTCHA, Claude s'arrête et te demande de gérer manuellement. Une fois fait, il reprend.",
    },
    {
      q: 'Mes données BOAMP sont-elles confidentielles ?',
      a: "Le BOAMP est une plateforme publique — toutes les fiches que Claude lit sont accessibles à n'importe qui. Aucun risque de confidentialité particulier. Pour les plateformes privées (extranet client), Claude lit ce que tu vois avec ta session, mais Anthropic ne réutilise pas ces données pour entraîner ses modèles sur les plans payants.",
    },
    {
      q: 'Et si la plateforme change son interface ?',
      a: "Les plateformes BOAMP, PLACE, AWS sont assez stables. Si l'interface change, Claude peut hésiter ou rater un filtre. Tu réenregistres simplement le raccourci avec la nouvelle interface. Comptez 5 minutes pour mettre à jour.",
    },
    {
      q: 'Combien de plateformes je peux scanner par tour ?',
      a: "Sans limite technique, mais en pratique : 3 à 5 plateformes par scan reste rapide (5-10 minutes au total). Au-delà, Claude met plus de temps et la fenêtre devient ingérable. Mieux vaut programmer 2 raccourcis : « Veille marchés publics » (BOAMP + PLACE) à 8h, et « Veille collectivités » (AWS + autres) à midi.",
    },
    {
      q: "Que se passe-t-il si je n'ouvre pas Chrome ?",
      a: "La planification automatique nécessite que Chrome soit ouvert au moment programmé. Pour une veille matinale, le bon réflexe est de laisser Chrome ouvert toute la nuit (sur l'ordinateur de bureau, pas le portable). Quand tu arrives le matin, le scan est déjà fait.",
    },
    {
      q: "L'extension est-elle vraiment fiable pour décider Go / No Go ?",
      a: "Non. Et elle ne doit pas. Claude in Chrome trie et filtre. Pour chaque DCE retenu, tu télécharges le dossier complet et tu utilises ton skill Analyse DCE pour produire la fiche standardisée. Les deux outils sont complémentaires : l'un sélectionne les bons dossiers, l'autre les analyse en profondeur.",
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: "On l'installe ensemble",
    subtitle: 'Atelier individuel ou en équipe — financement possible selon éligibilité (Constructys / OPCO)',
    programTitle: 'Programme « Niveau 2 — DCE & Mémoire Technique »',
    programItems: [
      'On installe Claude in Chrome sur ton poste',
      'On paramètre tes critères et tes plateformes en direct',
      'On enregistre ton raccourci de veille automatique',
      'Format individuel ou équipe (4 à 14h)',
    ],
  },
};
