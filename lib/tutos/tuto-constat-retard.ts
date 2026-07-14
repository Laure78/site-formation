import type { TutoData } from './types';
import { PHOTOS } from '@/lib/photos';

export const TUTO_CONSTAT_RETARD: TutoData = {
  slug: 'tuto-constat-retard',
  category: 'chantier-livrables',
  pdfFile: 'tuto-constat-retard.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill Constat de retard',
  shortTitle: 'Skill Constat de retard',
  subtitle:
    "Le tutoriel pas à pas pour rédiger un courrier de réserves en 8 minutes — au lieu d'une heure ou jamais.",

  metaTitle: 'Tuto skill Constat de retard BTP : courrier en 8 min Claude',
  metaDescription:
    "Constat de retard BTP : crée ton skill Claude pour rédiger un courrier juridique de réserves en 8 minutes au lieu d'1h. Tuto gratuit.",
  keywords: [
    'constat de retard BTP',
    'courrier de réserves BTP',
    'mise en demeure BTP',
    'skill Claude constat retard',
    'tuto courrier juridique BTP',
    'pénalités de retard chantier',
    'CCAG Travaux',
    'sous-traitance BTP',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'lettre recommandée BTP',
    'maître d\'œuvre',
    'conducteur de travaux',
    'IA conducteur de travaux',
    'IA juridique BTP',
    'formation IA appliquée au bâtiment',
    'Laure Olivié',
    'OFC Création d\'Entreprise',
    'Constructys',
  ],
  ogImageAlt:
    'Tuto Skill Constat de retard — courrier de réserves BTP en 8 min avec Claude, par Laure Olivié',

  publishedAt: '2026-05-09',
  updatedAt: '2026-05-09',

  cardSummary:
    "Rédige des courriers juridiques de réserves et constats de retard en 8 minutes au lieu d'une heure. Mise en page Word, formules consacrées, ton mesuré, prêt à signer et envoyer en recommandé.",

  heroImage: PHOTOS.tutoConstatRetardHero2026,

  totalTimeMinutes: 30,

  heroLearnPoints: [
    "La trame juridique d'un constat de retard valable",
    '5 étapes pour créer ton skill en 30 minutes',
    'Le prompt exact à donner à Claude',
    "Comment l'utiliser à chaque retard constaté sur ton chantier",
  ],

  introTitle: 'Pourquoi un skill constat de retard ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "Un retard sur ton chantier, ça arrive. Le problème, ce n'est pas le retard. C'est ce que tu en fais.",
    },
    {
      kind: 'paragraph',
      text:
        "Sans courrier formel, sans réserves notifiées, sans date qui figure dans un recommandé, le retard se retourne contre toi. Tu paies des pénalités pour un retard que tu n'as pas causé.",
    },
    { kind: 'h3', text: 'Avec un skill bien construit, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        'Tu constates un retard sur le chantier',
        'Tu dictes ou tu écris en 2 minutes ce que tu as vu',
        'Le skill génère le courrier juridique formel',
        'Constat factuel, daté, réserves notifiées, dommages chiffrés',
        'Tu imprimes, tu signes, tu envoies en recommandé',
      ],
    },
    {
      kind: 'highlight',
      text:
        "8 minutes au lieu d'une heure. Et surtout : tu le fais à chaque fois.",
    },
    {
      kind: 'callout',
      title: 'Ce que la lettre doit contenir',
      body:
        "L'identification précise du chantier et des intervenants. La date et la nature du fait constaté. La référence au contrat ou marché. La notification de réserves. L'estimation chiffrée des conséquences. La demande explicite (action attendue, délai). La mention que la lettre vaut mise en demeure si nécessaire.",
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active la fonction skills dans Claude',
      intro:
        "Comme pour tous les skills, il te faut un abonnement Claude Pro (18€/mois). La fonction n'est pas accessible en version gratuite.",
      blocks: [
        {
          kind: 'paragraph',
          text:
            "Active ensuite l'option qui permet à Claude de générer ton courrier en Word :",
        },
        { kind: 'h3', text: 'Le chemin précis' },
        {
          kind: 'list',
          items: [
            'Va sur claude.ai et connecte-toi',
            'Clique sur tes initiales en bas à gauche',
            'Sélectionne « Settings »',
            "Va dans l'onglet « Capabilities »",
            'Active le toggle « Code execution and file creation »',
          ],
        },
        {
          kind: 'callout',
          title: "Pourquoi c'est indispensable",
          body:
            "Un constat de retard doit être un document Word imprimable, signé manuellement, envoyé en recommandé. Sans cette capacité activée, Claude ne peut produire que du texte brut. Avec, il génère un courrier au format de ton entreprise, prêt à imprimer.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière première',
      intro:
        "Le constat de retard est un courrier juridique. Il doit être précis, sourcé et formel. Voici ce que tu dois préparer pour calibrer ton skill :",
      blocks: [
        { kind: 'h3', text: '1. Tes 2 ou 3 derniers courriers de réserves' },
        {
          kind: 'paragraph',
          text:
            "En PDF ou Word. Si tu n'en as jamais envoyé, demande à un confrère ou utilise un modèle FFB / OPPBTP. Claude apprendra le ton juridique attendu et les formules consacrées.",
        },
        { kind: 'h3', text: '2. Tes données entreprise' },
        {
          kind: 'paragraph',
          text:
            "Raison sociale, SIRET, adresse, coordonnées du chargé d'affaires ou du conducteur signataire. Tout ce qui figure dans l'en-tête d'un courrier officiel.",
        },
        { kind: 'h3', text: '3. Tes types de chantiers et tes contrats types' },
        {
          kind: 'paragraph',
          text:
            "Marché public, marché privé, contrat de sous-traitance, marché à bons de commande. Le ton et les références juridiques diffèrent selon les cas. Précise tes 2 ou 3 typologies les plus fréquentes.",
        },
        { kind: 'h3', text: '4. Tes formules de réserves habituelles' },
        {
          kind: 'paragraph',
          text:
            "Liste les expressions juridiques que tu veux retrouver : « émettons les plus expresses réserves », « sous toutes réserves de tous droits, dommages et intérêts », « cette correspondance vaut mise en demeure ». Claude les intégrera systématiquement.",
        },
        { kind: 'h3', text: '5. Ta charte graphique' },
        {
          kind: 'paragraph',
          text:
            "Logo, couleur, police pour l'en-tête. Le courrier doit ressembler à un document officiel de ton entreprise, pas à un courrier générique.",
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        'Ouvre une nouvelle conversation. Upload tes courriers existants, tes données entreprise, tes typologies de marchés et ta charte.',
      blocks: [
        { kind: 'paragraph', text: 'Puis colle ce prompt :' },
        {
          kind: 'prompt',
          title: 'Prompt à copier-coller dans Claude',
          text: `Je suis conducteur de travaux dans une entreprise BTP en [TON MÉTIER]. Je gère plusieurs chantiers en parallèle et j'ai besoin d'envoyer des constats de retard et lettres de réserves rapidement quand un problème survient.

Je veux créer un skill Claude qui génère des courriers juridiques formels à partir de mes constats terrain.

J'ai uploadé : mes 2 derniers courriers de réserves, mes données entreprise, mes typologies de marchés et mes formules juridiques habituelles.

Le skill doit :
1. Accepter en entrée un constat factuel court (date, nature du fait, intervenant en cause)
2. Identifier la nature du courrier (constat simple, mise en demeure, notification de réserves)
3. Adapter les formules juridiques selon le type de marché (public ou privé, sous-traitance)
4. Chiffrer les conséquences quand je donne des éléments (jours d'impact, surcoût)
5. Inclure systématiquement la phrase de réserves de droits
6. Produire un fichier Word A4 à ma charte, prêt à imprimer
7. Me proposer le mode d'envoi (recommandé AR, simple courrier, mail confirmé)

Avant de créer le skill, pose-moi toutes les questions nécessaires sur mes types de chantiers, mes interlocuteurs habituels et mon niveau de fermeté souhaité selon les cas.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            "Demande à Claude de toujours produire un courrier mesuré, factuel, sans agressivité — mais sans complaisance non plus. Le ton juridique doit protéger tes droits sans envenimer la relation. Les formules toutes faites des modèles juridiques classiques marchent très bien.",
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro:
        "Claude génère un fichier SKILL.md. Avant de le sauvegarder, prends 5 minutes pour le relire. Sur un courrier juridique, la précision compte plus que le style.",
      blocks: [
        { kind: 'h3', text: 'Ce que tu dois vérifier' },
        {
          kind: 'list',
          items: [
            'Les références à la réglementation BTP sont exactes (CCAG Travaux pour le public)',
            'Les formules de réserves sont bien intégrées et apparaissent à la fin',
            'Le ton est formel mais pas agressif',
            "La structure suit l'ordre : faits / conséquences / réserves / demande",
            "Les coordonnées de ton entreprise sont correctes dans l'en-tête",
            'Le format est conforme : A4, marges normales, police lisible',
          ],
        },
        { kind: 'h3', text: 'Ajustement type à demander' },
        {
          kind: 'prompt',
          title: "Exemple d'ajustement",
          text: `Pour tous les courriers liés à un retard du fait d'un sous-traitant, ajoute systématiquement la phrase :

« Nous nous réservons le droit de refacturer les surcoûts induits par ce retard, conformément aux clauses du contrat de sous-traitance signé le [DATE]. »

Et termine toujours par : « Cette lettre vaut mise en demeure et fait courir les délais légaux. »`,
        },
        { kind: 'h3', text: 'Active le skill' },
        {
          kind: 'paragraph',
          text:
            'Quand tu es satisfait, dis à Claude « Sauvegarde ce skill ». Tu le retrouves dans Settings → Customize → Skills. Vérifie que le toggle est activé.',
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Utilise-le dès le premier retard constaté',
      intro:
        "Le moment de vérité. Dès qu'un retard ou un manquement apparaît sur ton chantier, ne laisse pas passer 48h. Plus le délai entre le fait et le courrier est court, plus le courrier a de poids juridique.",
      blocks: [
        { kind: 'h3', text: 'Le bon réflexe terrain' },
        {
          kind: 'list',
          items: [
            'Tu constates le fait pendant ta visite ou ta réunion',
            "Tu prends une photo si c'est visuellement constatable",
            "Tu notes la date, l'heure, les personnes présentes",
            'Tu rédiges ton constat dans Claude le soir même',
            'Tu envoies le courrier en recommandé dans les 24-48h',
          ],
        },
        { kind: 'h3', text: 'Le bon prompt à coller' },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Voici les éléments du retard que je veux notifier :
- Chantier : [NOM, ADRESSE]
- Maître d'œuvre : [NOM, ENTREPRISE]
- Intervenant en cause : [NOM, FONCTION]
- Date du constat : [DATE]
- Fait constaté : [DESCRIPTION FACTUELLE COURTE]
- Conséquences sur mon chantier : [JOURS D'IMPACT, SURCOÛT ESTIMÉ SI POSSIBLE]
- Type de marché : [PUBLIC / PRIVÉ / SOUS-TRAITANCE]

Génère le courrier de constat de retard en Word A4, à ma charte, prêt à imprimer et signer.`,
        },
        {
          kind: 'callout',
          title: "La règle d'or",
          body:
            "Ne jamais envoyer un courrier de réserves sans le relire et le faire valider par ton dirigeant ou ton chargé d'affaires. Le skill rédige bien, mais c'est ton entreprise qui engage sa responsabilité avec ce courrier. Sur les dossiers à enjeu, fais aussi relire par ton avocat conseil.",
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Le courrier généré par IA est-il valable juridiquement ?',
      a: "Oui. Ce qui compte juridiquement, c'est le contenu, la signature, la date d'envoi et la traçabilité (recommandé AR). L'outil utilisé pour le rédiger n'a aucune incidence. Le skill produit un courrier qui reprend les standards juridiques du BTP — c'est toi qui le valides en le signant.",
    },
    {
      q: "Et si le maître d'œuvre conteste les faits ?",
      a: "C'est précisément pour ça qu'il faut envoyer le courrier vite : pour figer les faits par écrit avant qu'on puisse les contester. Si le MOE répond, tu as déjà ton document daté et signé. Si le litige va en justice, le courrier devient une pièce à charge.",
    },
    {
      q: "Faut-il l'envoyer en recommandé ?",
      a: "Pour un constat factuel : un mail confirmé suffit. Pour des réserves de droits ou une mise en demeure : recommandé AR obligatoire. Pour un litige naissant : recommandé AR + copie au maître d'ouvrage. Le skill peut te recommander le bon mode d'envoi selon la situation.",
    },
    {
      q: 'À quelle fréquence faut-il en envoyer ?',
      a: "À chaque fait constaté qui peut avoir un impact sur le délai, le coût ou la qualité de ton chantier. En moyenne, sur un chantier complexe : 3 à 5 courriers de réserves par mois. Sur les chantiers où tout va bien : 0 à 1.",
    },
    {
      q: 'Et si je dois envenimer un peu pour me faire entendre ?',
      a: "Le skill peut générer des courriers à 3 niveaux d'intensité : information factuelle / réserves notifiées / mise en demeure formelle. À toi de choisir le bon niveau selon l'historique du chantier et la gravité du fait. Demande explicitement « niveau 2 — réserves notifiées » dans ton prompt.",
    },
    {
      q: 'Mon dirigeant peut-il valider rapidement ?',
      a: "Oui, et c'est un usage très demandé. Demande à Claude de générer une version courte (1 page max) avec les points clés en gras. Ton dirigeant la lit en 2 minutes, valide, signe. Le courrier part le jour même.",
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: 'On le construit ensemble',
    subtitle: 'Atelier individuel ou en équipe — financement possible selon éligibilité (Constructys / OPCO)',
    programTitle: 'Programme « Niveau 2 — Conducteurs de travaux »',
    programItems: [
      'On construit tes skills CR + Constat + Email MOE en direct',
      'Calibrage sur tes vrais chantiers et tes types de marchés',
      'Des skills opérationnels à la fin de la session',
      'Format individuel ou équipe conducteurs (session catalogue 4 h, présentiel Île-de-France)',
    ],
  },
};
