import type { TutoData } from './types';
import { RESSOURCES_MINIATURES } from '@/lib/ressources-miniatures';

export const TUTO_SKILL_PLANNING_OFC: TutoData = {
  slug: 'tuto-skill-planning-ofc',
  category: 'chantier-livrables',
  pdfFile: 'tuto-skill-planning-ofc.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill Planning chantier',
  shortTitle: 'Skill planning chantier',
  subtitle:
    'Le tutoriel pas à pas pour piloter ton planning et absorber les aléas — 30 minutes de recalage au lieu de 5 heures.',

  metaTitle: 'Tuto skill planning chantier : recalage en 30 min',
  metaDescription:
    'Tuto skill planning chantier BTP : chemin critique, aléas et note d’impact Excel avec Claude. Formation IA pour le BTP — PDF gratuit pas à pas.',
  keywords: [
    'planning chantier',
    'recalage planning BTP',
    'chemin critique chantier',
    'note d’impact délai',
    'intempéries CCAG',
    'ordre de service',
    'skill Claude planning',
    'tuto planning chantier',
    'conducteur de travaux',
    'CCAG-Travaux 2021 art. 18',
    'pénalités de retard',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'formation IA pour le BTP',
    'Laure Olivié',
    "OFC Création d'Entreprise",
  ],
  ogImageAlt: RESSOURCES_MINIATURES.tutoPlanning.alt,

  publishedAt: '2026-10-11',
  updatedAt: '2026-10-11',

  cardSummary:
    'Pilote ton planning chantier et absorbe les aléas : chemin critique, scénarios de rattrapage, note d’impact et Excel recalé — 30 minutes au lieu de 5 heures.',

  totalTimeMinutes: 30,

  heroImage: RESSOURCES_MINIATURES.tutoPlanning,

  heroLearnPoints: [
    'Activer les compétences dans Claude en quelques minutes',
    'Construire un skill qui lit ton planning et identifie le chemin critique',
    'Recaler quand un aléa survient (retard, intempérie, ordre de service)',
    'Produire le planning recalé en Excel et la note d’impact prête à envoyer',
    'Exploiter les nouveautés Claude 2026 : mémoire, Docs, tâches planifiées, connecteurs',
  ],

  introTitle: 'Pourquoi un skill Planning ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "Le planning, c'est l'outil n°1 du conducteur de travaux. Il sert de référence en réunion hebdomadaire, déclenche les commandes matériaux, sécurise les délais contractuels et protège l'entreprise en cas de litige avec la maîtrise d'ouvrage.",
    },
    {
      kind: 'paragraph',
      text:
        "Le problème, c'est qu'aucun planning ne tient face au réel. Une livraison décalée de 4 jours, une intempérie qui bloque le gros œuvre, un ordre de service en cours de chantier, une co-activité mal anticipée, une équipe en arrêt — et tout est à recaler. Plannings et notes d'impact peuvent vite représenter plusieurs heures par semaine. Pendant ce temps-là, le conducteur n'est ni sur le chantier, ni en train de préparer le suivant.",
    },
    { kind: 'h3', text: 'Avec un skill bien construit, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        'Il lit ton planning initial et en extrait phases, durées et dépendances',
        'Il identifie le chemin critique et les marges par phase',
        "Tu signales l'aléa du jour, il recale le planning en quelques minutes",
        'Il propose deux ou trois scénarios de rattrapage chiffrés en jours',
        "Il rédige la note d'impact et livre le planning recalé en fichier Excel",
      ],
    },
    {
      kind: 'highlight',
      text:
        "Résultat : 30 minutes de recalage hebdo au lieu de 5 heures — et une trace écrite à chaque aléa.",
    },
    {
      kind: 'callout',
      title: 'Le planning est une pièce contractuelle',
      body:
        "En marché public, le CCAG-Travaux 2021 (art. 18) encadre la prolongation des délais : elle est notifiée par ordre de service. Pour les intempéries, elle correspond aux journées d'arrêt constatées, moins les journées prévisibles fixées au CCAP. D'où l'intérêt de tracer chaque aléa par écrit, daté et justifié. Sans prolongation, les pénalités de retard s'appliquent (art. 19.2) : par défaut 1/3 000ᵉ du montant HT par jour, plafonnées à 10 % — le CCAP peut prévoir plus sévère. Sur 800 000 € HT, 10 jours = 2 667 € au taux par défaut, 8 000 € si le CCAP fixe 1/1 000ᵉ. En marché privé, c'est ton contrat (souvent la norme NF P03-001) qui fait foi.",
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active la fonction Compétences dans Claude',
      intro:
        "Un skill (« compétence ») est un mode d'emploi permanent que tu donnes à Claude une fois pour toutes : tes phases, tes ratios, tes règles de recalage. Tu n'as plus à les réexpliquer à chaque aléa. Les compétences sont disponibles sur toutes les offres Claude, y compris la gratuite. Mais un planning et ses pièces jointes consomment vite le quota gratuit : pour un usage chantier hebdomadaire, l'offre Pro reste recommandée — environ 21 € TTC/mois, ou environ 17,50 €/mois en annuel.",
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
            "C'est elle qui permet à Claude de calculer les dates et les durées, et de produire ton planning recalé en Excel ou ta note en Word / PDF. Sans elle, les compétences restent grisées.",
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
            "L'administrateur active les compétences dans Paramètres de l'organisation → Plugins et compétences. Tu peux ensuite partager ton skill (menu « ⋯ » → Partager) : tous les conducteurs de l'entreprise recalent avec les mêmes règles et le même format de note. L'interface évolue régulièrement : si un libellé a changé, cherche « Compétences » ou « Skills » dans les paramètres.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière première',
      intro:
        'Plus ta matière est précise, plus ton skill sera juste. Réunis ces cinq éléments avant de lancer la conversation.',
      blocks: [
        {
          kind: 'numberedList',
          items: [
            'Tes 2 ou 3 derniers plannings finalisés — Excel, PDF ou export MS Project. Idéalement des typologies différentes (logement collectif, tertiaire, réhabilitation) pour que le skill apprenne tes habitudes de phasage. Un fichier Excel se lit plus fiablement qu’un Gantt en image.',
            'Ton phasage type par lot — terrassement, fondations, gros œuvre, charpente, étanchéité, façade, cloisons, électricité, plomberie, sols, peintures, OPR. Plus la liste est riche, plus le skill colle à ta réalité.',
            'Tes durées historiques par tâche — tes ratios de production réels : m² de chape par jour et par équipe, ml de cloison par plaquiste, durée d’un étage de plâtrerie. C’est ta vraie expertise — sans eux, le skill recalcule à l’aveugle.',
            'Tes contraintes et règles spécifiques — co-activités interdites (peinture et ponçage de chape dans la même zone), accès et horaires de chantier, DICT et autorisations préalables, saisonnalité (bétonnage par temps froid, étanchéité hors pluie), exigences de la MOA.',
            'Ta cascade de recalage — quand un retard survient, que fais-tu ? Absorber sur les marges, renforcer l’équipe, travailler un samedi, anticiper le second œuvre, arbitrer avec la MOA ? Écris ton ordre de décision : le skill le reproduira.',
          ],
        },
        {
          kind: 'callout',
          title: 'Astuce : un Projet Claude par chantier',
          body:
            'Crée un Projet Claude par chantier et dépose-y le planning en vigueur, le CCAP et les OS reçus. Chaque conversation repart de la bonne version — ton skill apporte la méthode, le Projet apporte le dossier.',
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        'Ouvre une nouvelle conversation, joins ta matière première, puis colle ce prompt. Adapte les passages entre crochets.',
      blocks: [
        {
          kind: 'prompt',
          title: 'Prompt — initialisation du skill',
          text: `Tu es mon assistant planning de chantier pour [ENTREPRISE],
[corps d'état / typologie de chantiers].

Ma matière est en pièces jointes : 3 plannings finalisés, mon phasage
standard par lot, mes ratios de production, mes règles de co-activité
et contraintes saisonnières, ma cascade de recalage.

Je veux que tu construises un skill capable de :
1. Lire un planning et extraire phases, durées, dépendances ;
2. Identifier le chemin critique et les marges par phase ;
3. Recaler le planning quand je signale un aléa (livraison,
   intempérie, absence, ordre de service, co-activité bloquée) ;
4. Proposer 2 ou 3 scénarios de rattrapage chiffrés en jours ;
5. Rédiger la note d'impact pour la MOA / le MOE ;
6. Livrer le planning recalé en fichier Excel.

Calcule les dates par le code, en jours ouvrés, jours fériés
français inclus. Distingue marché public (CCAG-Travaux 2021)
et marché privé (mon contrat). N'invente jamais un article :
si tu n'es pas sûr, dis-le.

Commence par me dire ce qu'il te manque pour que le skill soit fiable.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            'La dernière phrase compte autant que les autres. Tu obliges Claude à faire le diagnostic AVANT de produire : il te pose quelques questions ciblées sur tes contraintes métier. Réponds avec précision — c’est ce qui fait la différence entre un skill générique et un skill qui pilote vraiment ton chantier.',
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro: 'Claude te propose une première version. Avant de l’activer, contrôle ces six points.',
      blocks: [
        {
          kind: 'list',
          items: [
            'Les corps d’état sont bien reconnus (gros œuvre, charpente, étanchéité, plâtrerie, lots techniques, finitions)',
            'Les dépendances classiques sont respectées (bétonnage → décoffrage → charpente, cloisons → réseaux → peinture)',
            'Les durées sont cohérentes avec tes ratios',
            'Les co-activités interdites sont bien bloquées',
            'Le format de sortie te convient (tableau, Excel, note d’impact)',
            'Le recalage suit ta cascade de décision',
          ],
        },
        {
          kind: 'prompt',
          title: "Exemple d'ajustement",
          text: `Quand une intempérie bloque le gros œuvre, ne décale pas
mécaniquement tout le planning. Vérifie dans cet ordre :
1. Absorption sur les marges existantes ;
2. Démarrage anticipé du second œuvre en zone libérée ;
3. Renfort ou samedi travaillé (indique le surcoût) ;
4. En dernier recours seulement : décalage de la date de fin,
   avec rédaction automatique de la note d'impact.`,
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
            "Claude lit la description de ta compétence (200 caractères max) pour savoir quand la déclencher. Écris-la avec tes mots : « Recalage de planning chantier, chemin critique, aléas, intempéries, OS et notes d'impact pour [ENTREPRISE] ». Si elle ne se déclenche pas quand tu parles d'un retard, reformule la description.",
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Teste sur un vrai chantier',
      intro: 'Mets ton skill à l’épreuve sur un dossier en cours, pas sur un cas théorique.',
      blocks: [
        {
          kind: 'list',
          items: [
            'Choisis le chantier le plus représentatif de ton activité',
            'Charge son planning actuel et donne un aléa réel de la semaine',
            'Compare le recalage proposé à ce que tu aurais fait toi-même',
            'En cas d’écart, demande à Claude pourquoi — et ajuste les règles',
          ],
        },
        { kind: 'h3', text: 'Le bon prompt pour un usage quotidien' },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Aléa du jour :
- Chantier : [nom]            - Marché : [public / privé]
- Type : [livraison / intempérie / absence / OS / co-activité]
- Durée d'impact : [X jours]  - Date : [date]
- Tâches touchées : [phases concernées]

Donne-moi :
1. L'impact sur le chemin critique (en jours) ;
2. Le planning recalé : Phase / Initial / Recalé / Écart / Marge ;
3. Deux ou trois scénarios de rattrapage chiffrés ;
4. La note d'impact prête à signer ;
5. Le fichier Excel du planning recalé.
Si l'impact dépasse la marge contractuelle, alerte-moi.`,
        },
        {
          kind: 'callout',
          title: 'Exemple de sortie',
          body:
            'Aléa : intempérie de 3 jours sur le gros œuvre, semaine 12. Gros œuvre S12→S18 devient S12→S19 (+3 j, marge 0 ⚠) ; étanchéité S19→S22 devient S20→S23 (+3 j, marge 5 j) ; cloisons anticipées ; sols inchangés.',
        },
        { kind: 'h3', text: 'Les nouveautés Claude à exploiter' },
        {
          kind: 'paragraph',
          text:
            'Claude a beaucoup évolué en 2026. Voici les fonctions qui font gagner le plus de temps sur un planning — la disponibilité dépend de ton offre et le déploiement est parfois progressif.',
        },
        {
          kind: 'list',
          items: [
            'Grosses tâches dans le chat (Pro et Max) — planning Excel, note d’impact et tableau d’écarts dans la même conversation',
            'Claude Docs — note d’impact modifiable, partageable, exportable Word / PDF',
            'Modification ciblée — surligne une phrase et corrige uniquement ce passage',
            'Mémoire — retient format de note, vocabulaire et habitudes (Paramètres → Mémoire)',
            'Tâches planifiées — point planning automatique chaque lundi matin',
            'Connecteurs — lit le planning sur Drive / OneDrive et prépare le mail (Gmail, Outlook)',
          ],
        },
        {
          kind: 'prompt',
          title: 'Prompt — tâche planifiée du lundi',
          text: `Chaque lundi à 7 h : ouvre le planning en vigueur du chantier
[NOM] dans mon Projet Claude, compare-le à l'avancement que je t'ai
signalé la semaine passée, liste les tâches du chemin critique
en retard ou sans marge, et prépare-moi un point de 10 lignes
pour la réunion de chantier. Ne modifie rien sans mon accord.`,
        },
        {
          kind: 'callout',
          title: 'Règle de prudence',
          body:
            "Plus Claude agit seul, plus ta relecture compte. Une note d'impact ou un courrier à la MOA engage l'entreprise : Claude prépare, tu vérifies les dates, tu signes et tu envoies.",
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Combien de temps pour construire ce skill ?',
      a: 'Compte 1 h 30 à 2 h la première fois : 30 minutes pour rassembler ta matière, une heure de conversation avec Claude. Ensuite, tu le réutilises sur tous tes chantiers.',
    },
    {
      q: 'Faut-il MS Project ?',
      a: "Non. Le skill travaille avec un planning Excel, un PDF ou même une liste de tâches. Depuis MS Project, exporte en Excel : c'est le format le plus fiable. Sans logiciel, il peut aussi bâtir ton planning initial à partir d'un phasage et de durées.",
    },
    {
      q: "Les notes d'impact sont-elles conformes au CCAG ?",
      a: "Le skill structure la note (fait générateur daté, nature de l'aléa, conséquences sur le délai et éventuellement sur le coût, demande motivée), et tu la relis avant signature. En marché public, rappelle-toi que la prolongation est notifiée par ordre de service (CCAG-Travaux 2021, art. 18) : la note sert à la demander et à la justifier.",
    },
    {
      q: 'Comment gère-t-il les co-activités ?',
      a: "Uniquement si tu lui as donné tes règles. S'il sait que peinture et ponçage de chape sont incompatibles dans une même zone, il bloque l'enchaînement ; s'il sait que deux lots peuvent se chevaucher, il s'en sert comme levier de rattrapage.",
    },
    {
      q: 'Et les jours fériés et intempéries ?',
      a: "Demande-lui de calculer par le code, jours fériés français inclus, puis contrôle les dates clés. Pour les intempéries, signale-les comme aléas au fil de l'eau, ou donne-lui les journées prévisibles prévues au CCAP pour qu'il les intègre en tampon.",
    },
    {
      q: 'Et si le retard dépasse les marges contractuelles ?',
      a: 'Le skill te signale l’alerte et prépare le courrier de demande de prolongation en citant les clauses de ton marché. Tu valides, dates et signes. Pour un litige déjà engagé, fais-toi accompagner par un conseil.',
    },
    {
      q: 'Et si je veux le construire accompagné ?',
      a: 'En formation, on construit le skill ensemble sur tes propres plannings : tu repars avec une compétence opérationnelle.',
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: 'On le construit ensemble',
    subtitle:
      'Formation en présentiel en Île-de-France — prise en charge OPCO/Constructys selon éligibilité',
    programTitle: 'Formation Niveau 2 — Conducteurs de travaux',
    programItems: [
      'On construit ton skill planning sur tes propres chantiers et tes ratios',
      "On le calibre : chemin critique, cascade de recalage, notes d'impact",
      'Tu repars avec une compétence opérationnelle et un planning recalé en Excel',
      'Format : 4 h · intra-entreprise ou session inter · Organisme certifié Qualiopi',
    ],
  },
};
