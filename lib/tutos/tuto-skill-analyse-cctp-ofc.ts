import type { TutoData } from './types';
import { RESSOURCES_MINIATURES } from '@/lib/ressources-miniatures';

export const TUTO_SKILL_ANALYSE_CCTP_OFC: TutoData = {
  slug: 'tuto-skill-analyse-cctp-ofc',
  category: 'marches-et-veille',
  pdfFile: 'tuto-skill-analyse-cctp-ofc.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill Analyse de CCTP',
  shortTitle: 'Skill Analyse CCTP',
  subtitle:
    'Le tutoriel pas à pas pour dépouiller un CCTP de 80 pages en 20 minutes, sans laisser passer ce qui coûte cher.',

  metaTitle: 'Tuto skill Analyse CCTP : 80 pages en 20 min',
  metaDescription:
    'Tuto skill Analyse CCTP BTP : dépouiller un CCTP en 20 min avec Claude. Formation IA pour le BTP, présentiel IDF, Qualiopi — tuto gratuit PDF.',
  keywords: [
    'analyser un CCTP',
    'CCTP marché public BTP',
    'skill Claude CCTP',
    'prescriptions produit CCTP',
    'normes DTU CCTP',
    'points d arrêt chantier',
    'CCTP DPGF',
    'appels d offres BTP',
    'mémoire technique CCTP',
    'Claude BTP',
    'ChatGPT BTP',
    'formation IA pour le BTP',
    'Laure Olivié',
    "OFC Création d'Entreprise",
    'Constructys',
  ],
  ogImageAlt:
    'Créer un skill Analyse CCTP — tuto offert PDF gratuit, formation IA pour le BTP',

  publishedAt: '2026-09-29',
  updatedAt: '2026-09-29',

  cardSummary:
    'Crée un skill Claude qui dépouille un CCTP : exigences article par article, prescriptions produit, normes, points d’arrêt et croisement DPGF — 20 minutes au lieu d’une lecture en diagonale.',

  totalTimeMinutes: 40,

  heroImage: RESSOURCES_MINIATURES.tutoAnalyseCctp,

  heroLearnPoints: [
    'Sortir les exigences techniques article par article, avec le renvoi au paragraphe d’origine',
    'Repérer les prescriptions produit imposées et les normes visées avant de consulter tes fournisseurs',
    'Isoler les points d’arrêt, les essais et les échantillons à la charge de l’entreprise',
    'Confronter le CCTP à la DPGF et sortir la liste des questions à poser avant remise',
  ],

  introTitle: 'Pourquoi un skill Analyse de CCTP ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        'Le CCTP est la pièce qui dit ce que tu dois faire, avec quels produits et selon quelles règles. C’est aussi celle qui sera ressortie le jour où quelque chose ne va pas. Le devis fixe un prix ; le CCTP fixe une obligation.',
    },
    {
      kind: 'paragraph',
      text:
        'Il fait quarante à cent vingt pages, il arrive avec le reste du dossier, et il est lu en diagonale l’avant-veille de la remise. Ce qui se paie ensuite, ce n’est pas ce qu’on a mal compris : c’est ce qu’on n’a pas vu.',
    },
    {
      kind: 'paragraph',
      text:
        'Une marque imposée sans « ou équivalent » qu’on découvre à la commande. Un point d’arrêt dont personne n’avait relevé le délai de levée. Un essai de laboratoire mis à la charge de l’entreprise dans un article de généralités. Une garantie portée à dix ans sur une prestation qui n’en valait pas deux.',
    },
    {
      kind: 'callout',
      title: 'Avec un skill bien construit, voilà ce qui change',
      body:
        'Il sort les exigences article par article, avec le renvoi au paragraphe d’origine · Il isole les prescriptions produit et signale l’absence de mention d’équivalence · Il liste les normes et DTU visés, et te dit lesquels ne sont pas ceux de ton métier · Il relève les points d’arrêt, les essais, les échantillons et qui les prend en charge · Il confronte le CCTP à la DPGF et sort ce qui est décrit sans être quantifié.',
    },
    {
      kind: 'h3',
      text: 'Les 8 lignes qu’on lit trop vite dans un CCTP',
    },
    {
      kind: 'numberedList',
      items: [
        'Les prescriptions produit nominatives, quand « ou équivalent » a disparu.',
        'Les normes et DTU visés, et surtout leur millésime.',
        'Les points d’arrêt, leur délai de levée et qui prononce la reprise.',
        'Les essais et contrôles laissés à la charge de l’entreprise.',
        'Les échantillons et ouvrages témoins exigés avant démarrage.',
        'Les « le titulaire du présent lot devra » logés dans un autre lot.',
        'Les conditions de réception des supports et les réserves à émettre.',
        'Les garanties étendues au-delà des garanties légales.',
      ],
    },
    {
      kind: 'highlight',
      text: 'L’IA dépouille le CCTP. Le professionnel décide de ce qu’il engage.',
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
            'Un skill, c’est une compétence sur mesure que Claude garde en mémoire : les normes de ton corps d’état, tes points de vigilance et ta trame de dépouillement, mobilisés dès que tu déposes un CCTP.',
        },
        {
          kind: 'callout',
          title: 'Le compte : gratuit possible, Pro conseillé',
          body:
            'Depuis fin 2025, la création de compétences est accessible à tous les plans. Sur un CCTP lourd avec DPGF et plans, le plan gratuit sature vite en session. Pour un usage professionnel quotidien, le plan Pro (environ 18 € HT/mois) reste recommandé.',
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
            'Choisis « + Créer une compétence » ou « Téléverser une compétence » pour un ZIP existant.',
          ],
        },
        {
          kind: 'callout',
          title: 'À ne pas oublier',
          body:
            'Dans le même menu « Personnaliser », active aussi l’option « Exécution de code » : sans elle, Claude ne pourra pas te livrer le tableau des exigences en Excel ni la note de synthèse en Word.',
        },
        {
          kind: 'callout',
          title: 'Pourquoi c’est indispensable',
          body:
            'Sans exécution de code, tu obtiens une synthèse dans la conversation à recopier à la main. Avec l’exécution activée, Claude produit des livrables prêts à circuler dans ton équipe — la différence entre une IA qui commente et une IA qui dépouille.',
        },
        {
          kind: 'paragraph',
          text:
            'Avant de passer à la suite : ouvre un dossier sur ton poste pour l’étape 2, prévois environ quarante minutes au calme pour la construction du skill, et garde un CCTP sous la main pour l’étape 4.',
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière première',
      intro: 'Nourrir Claude avec ton métier',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'C’est l’étape que tout le monde veut sauter, et c’est elle qui fait la différence. Un skill nourri de ton métier repère ce qui est anormal. Compte environ trente minutes de collecte : tu ne les referas jamais.',
        },
        {
          kind: 'numberedList',
          items: [
            'Deux ou trois CCTP de ton corps d’état déjà traités — idéalement un dossier qui s’est bien passé et un qui a mal tourné.',
            'La liste des normes et DTU de ton métier, avec les millésimes que tu appliques réellement.',
            'Tes fiches techniques et tes équivalences habituelles — pour qualifier une prescription nominative au lieu de la recopier.',
            'Tes points de vigilance et tes litiges passés (réception de support, essai non chiffré, garantie étendue, prestation d’un autre lot glissée chez toi).',
            'Ta trame de synthèse et ton bordereau de questions au maître d’œuvre — Claude s’y calera pour la sortie.',
          ],
        },
        {
          kind: 'callout',
          title: 'Ce que tu ne déposes pas',
          body:
            'Les conditions négociées avec tes fournisseurs, les coordonnées de tes salariés et tout document couvert par une clause de confidentialité. Le skill a besoin de tes normes et points de vigilance, pas de tes conditions commerciales.',
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro: 'Le prompt qui crée ton skill',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Ouvre une nouvelle conversation, dépose les fichiers rassemblés, puis colle le prompt ci-dessous en l’adaptant à ton métier. Ne le raccourcis pas : chaque ligne cadre ce que le skill fera seul ensuite.',
        },
        {
          kind: 'prompt',
          title: 'Prompt — création du skill Analyse CCTP',
          text: `Tu es expert en création de skills Claude pour le BTP.
Je suis [MÉTIER] et je veux un skill qui dépouille les CCTP
des dossiers auxquels je réponds.

Analyse les documents joints : CCTP déjà traités, normes et DTU de
mon métier, fiches produits, points de vigilance, trame de synthèse.

Construis un skill qui, à partir d'un CCTP :
1. sort les exigences article par article, avec le n° d'article
2. isole les prescriptions produit, signale l'absence d'équivalence
3. liste les normes et DTU visés, avec leur millésime
4. relève points d'arrêt, essais et échantillons, et à la charge de qui
5. repère les prestations d'un autre lot mises à ma charge
6. confronte le CCTP à la DPGF : ce qui est décrit, non quantifié
7. rédige les questions à poser au maître d'œuvre avant remise

Règles impératives :
- chaque constat cite l'article du CCTP dont il vient
- aucune exigence reformulée au point d'en changer le sens
- toute ambiguïté s'écrit À CONFIRMER, jamais une interprétation
- sortie : un tableau des exigences + une note de synthèse

Pose-moi toutes les questions nécessaires avant de générer le skill.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            'La consigne qui change tout, c’est le renvoi à l’article : une synthèse sans référence n’est ni vérifiable, ni utilisable face au maître d’œuvre. Exige aussi le « À CONFIRMER » : un CCTP ambigu doit ressortir ambigu, pas lissé par une interprétation qui t’engage.',
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
            'Claude te propose une première version. Ne l’installe pas tout de suite : relis-la avec un CCTP sous les yeux.',
        },
        {
          kind: 'list',
          items: [
            'Chaque exigence porte son numéro d’article, sans exception.',
            'Les prescriptions produit sont sorties à part, pas noyées dans le tableau.',
            'Les normes citées sont reprises telles quelles, millésime compris.',
            'Les points d’arrêt indiquent qui prononce la levée et sous quel délai.',
            'Les ambiguïtés apparaissent en « À CONFIRMER » et non en interprétation.',
            'Les prestations relevant d’un autre lot sont signalées comme telles.',
          ],
        },
        {
          kind: 'callout',
          title: 'Exemple d’ajustement à demander',
          body:
            '« Ajoute une section PRESCRIPTIONS PRODUIT en tête de la note, avec marque citée, article et mention « ou équivalent » présente ou absente. Dans le tableau, ajoute une colonne « à la charge de qui » pour chaque essai, contrôle, échantillon et ouvrage témoin. Sépare ce que le CCTP impose de ce que tu en déduis. »',
        },
        {
          kind: 'paragraph',
          text:
            'Une fois la version validée, enregistre la compétence depuis Personnaliser → Compétences. Compte deux à quatre allers-retours : c’est le signe que tu relis vraiment la sortie.',
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Teste sur un dossier que tu connais',
      intro: 'Le passage à la réalité',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Ne teste jamais sur une consultation en cours. Prends un CCTP d’un chantier terminé, dont tu connais les mauvaises surprises : c’est le seul moyen de savoir si le skill les aurait vues.',
        },
        {
          kind: 'list',
          items: [
            'Choisis un dossier soldé où tu as eu un litige, un avenant ou une reprise.',
            'Dépose le CCTP d’origine, sans raconter ce qui s’est passé.',
            'Demande le dépouillement complet et la liste des questions.',
            'Vérifie si la clause qui t’a coûté cher ressort dans la synthèse.',
            'Si elle n’y est pas, ajoute ce cas à tes points de vigilance et regénère.',
          ],
        },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Dépouillement du CCTP — lot [N° ET INTITULÉ],
opération [NOM], [VILLE].
Pièces jointes : CCTP, DPGF, [CCAP / plans / rapport de sol].
Remise le [DATE]. Maîtrise d'œuvre : [MOE].

Sors-moi :
- le tableau des exigences, avec n° d'article
- les prescriptions produit et la mention d'équivalence
- les normes et DTU visés, millésime compris
- les points d'arrêt, essais, échantillons, et à la charge de qui
- les prestations d'un autre lot mises à ma charge
- ce qui est décrit au CCTP et absent de la DPGF
- les questions à envoyer avant le [DATE - 5 j]`,
        },
        {
          kind: 'highlight',
          text: 'Le skill dépouille le CCTP, il ne l’interprète pas à ta place. Une exigence technique engage ton entreprise : c’est toi qui décides de ce que tu acceptes, de ce que tu chiffres en plus et de ce que tu fais lever avant remise.',
        },
      ],
    },
  ],

  faqTitle: 'FAQ — Analyse CCTP',
  faq: [
    {
      q: 'Claude peut-il vraiment lire un CCTP de 100 pages ?',
      a: 'Oui, y compris en PDF scanné si le scan est propre.',
      aDetail:
        'La difficulté n’est pas le volume, c’est la restitution : sans consigne de renvoi à l’article, tu obtiens un résumé agréable et inutilisable. C’est pour cela que la citation de l’article est la première règle du prompt.',
    },
    {
      q: 'Et si le CCTP est un scan de mauvaise qualité ?',
      a: 'Demande d’abord quels passages n’ont pas pu être lus.',
      aDetail:
        'Tu sauras ce qui manque au lieu de le découvrir plus tard. Sur un scan très dégradé, une reconnaissance de texte préalable reste le plus sûr.',
    },
    {
      q: 'Le skill remplace-t-il la lecture du CCTP ?',
      a: 'Non.',
      aDetail:
        'Il fait le dépouillement exhaustif que personne n’a le temps de faire, et te met sous les yeux les lignes qui méritent ton jugement. Ces lignes, tu les lis toi-même, dans le texte.',
    },
    {
      q: 'Peut-il servir aussi à préparer le mémoire technique ?',
      a: 'Oui, c’est même un second usage fréquent.',
      aDetail:
        'Les exigences sorties article par article deviennent la trame de ta méthodologie : à chaque exigence, tu réponds par un moyen. Demande un tableau exigence / réponse attendue.',
    },
    {
      q: 'Comment l’utiliser pour contrôler une offre de sous-traitant ?',
      a: 'Confronte CCTP et proposition du sous-traitant.',
      aDetail:
        'Demande ce que le CCTP impose et que l’offre ne couvre pas : essais non repris, échantillons oubliés, prestations laissées de côté.',
    },
    {
      q: 'Faut-il refaire le skill pour chaque corps d’état ?',
      a: 'Non si tu restes dans ton métier.',
      aDetail:
        'Si tu réponds sur plusieurs lots très différents, mieux vaut un skill par famille d’ouvrages qu’un skill unique qui dilue tout.',
    },
    {
      q: 'Que faire des questions qu’il sort ?',
      a: 'Envoie-les au maître d’œuvre par écrit, dans le délai du RC.',
      aDetail:
        'Une réponse écrite vaut mieux qu’une hypothèse, et la question posée devient une pièce du dossier si le sujet revient en cours de chantier.',
    },
    {
      q: 'Mes données restent-elles confidentielles ?',
      a: 'Sur les plans professionnels, tes conversations ne servent pas à entraîner les modèles.',
      aDetail:
        'Évite malgré tout d’y coller des pièces strictement confidentielles non nécessaires au dépouillement.',
    },
  ],

  cta: {
    eyebrow: 'ENVIE D’ALLER PLUS LOIN ?',
    title: 'On le construit ensemble',
    subtitle:
      'Formation IA pour le BTP — présentiel Île-de-France — organisme certifié Qualiopi',
    programTitle: 'Formation IA appels d’offres BTP — DCE, chiffrage, mémoire technique',
    programItems: [
      'Construire ton skill d’analyse de CCTP sur tes propres dossiers, avec relecture humaine.',
      'Calibrer la méthode sur les normes et points de vigilance de ton corps d’état.',
      'Enchaîner dépouillement CCTP, mémoire technique et chiffrage — sans promesse de gain automatique.',
      'Financement OPCO / Constructys possible selon éligibilité.',
    ],
  },
};
