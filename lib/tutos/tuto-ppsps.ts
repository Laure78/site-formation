import type { TutoData } from './types';
import { PHOTOS } from '@/lib/photos';

export const TUTO_PPSPS: TutoData = {
  slug: 'tuto-ppsps',
  category: 'qse-conformite',
  pdfFile: 'tuto-ppsps.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill PPSPS',
  shortTitle: 'Skill PPSPS',
  subtitle:
    'Le tutoriel pas à pas pour rédiger ton Plan Particulier de Sécurité et de Protection de la Santé en 30 minutes — au lieu de 2 jours.',

  metaTitle: 'Tuto skill PPSPS BTP : Plan Particulier Sécurité 30 min',
  metaDescription:
    "PPSPS BTP en 30 minutes : crée ton skill Claude pour rédiger ton Plan Particulier de Sécurité au lieu de 2 jours. Tuto gratuit.",
  keywords: [
    'PPSPS BTP',
    'Plan Particulier Sécurité Protection Santé',
    'skill Claude PPSPS',
    'tuto PPSPS',
    'modèle PPSPS BTP',
    'coordinateur SPS',
    'chantier catégorie 1 2',
    'R4532-56 R4532-77',
    'sécurité chantier BTP',
    'EPI BTP',
    'amiante sous-section 4',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'automatiser PPSPS',
    'site occupé ERP',
    'formation IA appliquée au bâtiment',
    'Laure Olivié',
    'OFC Création d\'Entreprise',
    'Constructys',
  ],
  ogImageAlt:
    'Tuto Skill PPSPS — Plan Particulier de Sécurité BTP 30 min avec Claude, par Laure Olivié',

  publishedAt: '2026-05-09',
  updatedAt: '2026-05-09',

  cardSummary:
    "Génère ton PPSPS BTP complet (30-40 pages) à partir de 10 lignes de description chantier : 8 chapitres réglementaires R4532-56 à R4532-77, EPI, EPC, procédures d'urgence, prêt pour le coordinateur SPS.",

  heroImage: PHOTOS.tutoPpspsHero2026,

  totalTimeMinutes: 30,

  heroLearnPoints: [
    "Les 8 chapitres réglementaires d'un PPSPS conforme",
    '5 étapes pour créer ton skill en 30 minutes',
    'Le prompt exact à donner à Claude',
    "Comment l'adapter à chaque chantier en 30 minutes",
  ],

  introTitle: 'Pourquoi un skill PPSPS ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "Le PPSPS, c'est l'obligation réglementaire de toute entreprise intervenant sur un chantier de catégorie 1 ou 2. Sans PPSPS validé par le coordinateur SPS, tu n'as pas le droit de démarrer.",
    },
    {
      kind: 'paragraph',
      text:
        "Le problème : un PPSPS sérieux, c'est 2 jours de travail. Tu rédiges les mêmes chapitres pour le 50ème chantier de l'année, en adaptant aux risques du site. À la fin, tu copies-colles ton dernier PPSPS, tu changes 3 noms, et tu pries pour que le SPS ne te demande pas trop de modifications.",
    },
    { kind: 'h3', text: 'Avec un skill bien construit, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        'Tu décris le chantier à Claude en 10 lignes',
        'Le skill produit un PPSPS Word complet de 30 à 40 pages',
        '8 chapitres réglementaires, adaptés à tes vrais risques métier',
        'Avec ton organigramme, tes coordonnées et ta charte',
        'Prêt à transmettre au coordinateur SPS pour validation',
      ],
    },
    {
      kind: 'highlight',
      text:
        '30 minutes de saisie. Au lieu de 2 jours de rédaction. Avec un PPSPS sérieux, complet et défendable.',
    },
    {
      kind: 'callout',
      title: "Les 8 chapitres réglementaires d'un PPSPS",
      body:
        "1. Présentation de l'entreprise et de l'opération. 2. Mesures d'organisation générale du chantier. 3. Mesures spécifiques aux travaux. 4. Risques particuliers et mesures de prévention. 5. Premiers secours et urgences. 6. Hygiène et conditions de travail. 7. Mesures concernant les sous-traitants. 8. Documents annexés (plans, fiches FDS, attestations). Le skill structure automatiquement ces 8 chapitres selon les exigences du Code du travail (articles R4532-56 à R4532-77).",
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
            "Active ensuite l'option qui permet à Claude de générer ton PPSPS au format Word :",
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
            "Un PPSPS fait facilement 30 à 40 pages, avec une mise en page structurée (tableaux, sommaire, pagination, en-têtes). Sans cette capacité activée, Claude te génèrerait un texte simple. Avec, il produit un vrai .docx prêt à imprimer ou à transmettre, avec ta charte graphique.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière première',
      intro:
        "Le PPSPS engage la responsabilité pénale de ton entreprise en cas d'accident grave. Pour calibrer ton skill au plus près de tes pratiques, voici ce que tu dois préparer :",
      blocks: [
        { kind: 'h3', text: '1. Tes 2 ou 3 derniers PPSPS validés' },
        {
          kind: 'paragraph',
          text:
            "En Word ou PDF. Idéalement un PPSPS pour chantier neuf, un pour rénovation et un pour site occupé. Claude apprend ta structure, ton vocabulaire métier, et les formulations validées par tes coordinateurs SPS habituels.",
        },
        { kind: 'h3', text: '2. Ton organigramme et tes coordonnées' },
        {
          kind: 'paragraph',
          text:
            "Nom du dirigeant, nom du conducteur de travaux, du chef de chantier, du SST, du référent sécurité. Adresses, téléphones, mails. Numéro APE, n° SIRET, qualifications Qualibat ou autres.",
        },
        { kind: 'h3', text: '3. Ta liste des risques métier types' },
        {
          kind: 'paragraph',
          text:
            "Chaque métier BTP a ses risques récurrents : carrelage = TMS lombalgies, étanchéité = travail en hauteur + chaleur extrême, charpente = chutes + électrocution, électricité = risque électrique + amiante, peinture = COV + échafaudage. Liste tes 10 risques majeurs et tes mesures de prévention associées.",
        },
        { kind: 'h3', text: '4. Tes EPI et matériels de protection types' },
        {
          kind: 'paragraph',
          text:
            "Ce que tu fournis systématiquement à tes équipes : chaussures S3, casques, gants, harnais, lunettes, masques. Et tes EPC sur chantier : garde-corps, filets, échafaudage classe 3, signalisation.",
        },
        { kind: 'h3', text: "5. Tes procédures d'urgence et premiers secours" },
        {
          kind: 'paragraph',
          text:
            "Liste des SST formés dans l'entreprise, emplacement de la trousse de secours, numéros d'urgence (15, 18, 112, médecin du travail), procédure en cas d'accident grave. Adresse de l'hôpital le plus proche selon les chantiers.",
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        "Ouvre une nouvelle conversation. Upload tes anciens PPSPS, ton organigramme, ta liste de risques métier et tes procédures d'urgence.",
      blocks: [
        { kind: 'paragraph', text: 'Puis colle ce prompt :' },
        {
          kind: 'prompt',
          title: 'Prompt à copier-coller dans Claude',
          text: `Je suis dirigeant d'une entreprise BTP en [TON MÉTIER].

Je dois rédiger un PPSPS pour chaque chantier de catégorie 1 ou 2 sur lequel j'interviens. Je veux automatiser cette rédaction tout en garantissant la conformité réglementaire et la qualité face au coordinateur SPS.

Je veux créer un skill Claude qui produit mes PPSPS au format Word complet, à partir d'une description simple du chantier (10 lignes).

J'ai uploadé : mes 2-3 derniers PPSPS validés, mon organigramme, ma liste des risques métier types, mes EPI et procédures d'urgence.

Le skill doit :
1. Accepter en entrée une description courte du chantier (adresse, nature, durée, risques particuliers)
2. Structurer automatiquement les 8 chapitres réglementaires d'un PPSPS conforme aux articles R4532-56 à R4532-77 du Code du travail
3. Adapter les risques aux spécificités du chantier (urbain, ERP, site occupé, hauteur, amiante, plomb)
4. Intégrer mon organigramme, mes EPI types et mes procédures d'urgence
5. Générer un fichier Word de 30 à 40 pages avec sommaire automatique, tableaux structurés et numérotation
6. Inclure une page de signature pour le dirigeant et le coordinateur SPS
7. Prévoir une rubrique « risques émergents » pour les imprévus du chantier

Avant de créer le skill, pose-moi toutes les questions nécessaires sur mes types de chantiers prioritaires, mes coordinateurs SPS habituels et mes formulations validées.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            "Demande à Claude de toujours générer la table des matières en début de PPSPS et la page de signature en fin. Ces deux éléments sont la première chose que regarde un coordinateur SPS pour valider la conformité formelle. Sans eux, ton PPSPS sera renvoyé en correction même si le contenu est bon.",
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro:
        "Claude génère un fichier SKILL.md. Avant de le sauvegarder, prends 15 minutes pour le relire. Sur un PPSPS, la précision réglementaire et le ton sécurité comptent plus que tout.",
      blocks: [
        { kind: 'h3', text: 'Ce que tu dois vérifier' },
        {
          kind: 'list',
          items: [
            'Les 8 chapitres réglementaires sont bien intégrés dans la méthode',
            'Les références au Code du travail (R4532-56 à R4532-77) apparaissent',
            'La liste des risques couvre bien tes métiers et tes typologies de chantier',
            'Les EPI et EPC sont à TES standards, pas à des moyennes marché',
            "Les procédures d'urgence intègrent bien les numéros et SST de ton entreprise",
            'La page de signature dirigeant + coordinateur SPS est en fin de document',
          ],
        },
        { kind: 'h3', text: 'Ajustement type à demander' },
        {
          kind: 'prompt',
          title: "Exemple d'ajustement",
          text: `Pour les chantiers en site occupé (école, hôpital, bureau), ajoute systématiquement :
- Une rubrique « Co-activité avec les usagers » détaillée
- Les mesures de protection acoustique et empoussièrement
- Le plan de circulation séparant ouvriers et usagers
- Les horaires de travaux compatibles avec l'occupation des lieux

Pour les chantiers ERP (recevant du public), ajoute la conformité à la sécurité incendie (cloisonnement, issues de secours protégées) et la coordination avec le SSIAP du site.`,
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
      title: 'Teste sur un vrai chantier',
      intro:
        "Le moment de vérité. Prends un chantier en cours ou à venir — idéalement un dossier où tu connais déjà le PPSPS final pour pouvoir comparer.",
      blocks: [
        { kind: 'h3', text: 'Le test' },
        {
          kind: 'list',
          items: [
            'Ouvre une nouvelle conversation Claude',
            'Décris ton chantier en 10 lignes : adresse, nature, durée, équipes, risques',
            'Tape : « rédige le PPSPS selon ma méthode »',
            'Le skill se déclenche automatiquement',
            'Tu obtiens le Word de 30 à 40 pages en 2 à 3 minutes',
          ],
        },
        { kind: 'h3', text: 'Le bon prompt à coller pour les usages quotidiens' },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Voici les éléments du chantier pour le PPSPS :
- Nom du chantier : [INTITULÉ]
- Adresse : [ADRESSE COMPLÈTE]
- Maître d'ouvrage : [NOM]
- Maître d'œuvre : [NOM]
- Coordinateur SPS : [NOM + NIVEAU]
- Nature des travaux : [DESCRIPTION 2 LIGNES]
- Durée prévisionnelle : [MOIS]
- Effectif sur le chantier : [NB PERSONNES]
- Catégorie du chantier : [1 / 2 / 3]
- Risques particuliers identifiés : [LISTE]
- Co-activité avec d'autres entreprises : [OUI/NON + PRÉCISIONS]
- Travaux en hauteur : [OUI/NON + HAUTEUR MAX]
- Travaux à risques (amiante, plomb, électricité) : [LISTE]

Génère le PPSPS complet en Word. Inclus la table des matières, l'organigramme, les 8 chapitres réglementaires et la page de signature.`,
        },
        {
          kind: 'callout',
          title: "La règle d'or",
          body:
            "Le PPSPS généré par Claude est un document professionnel solide, mais il doit toujours être relu par ton conducteur de travaux et validé par ton coordinateur SPS avant signature. Le skill te fait gagner 90% du temps de rédaction, mais les 10% restants (relecture, ajustements terrain) restent ta responsabilité de dirigeant. Un PPSPS engage ta responsabilité pénale en cas d'accident grave.",
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Le PPSPS généré par Claude est-il valable juridiquement ?',
      a: "Le PPSPS produit est conforme aux exigences du Code du travail (articles R4532-56 à R4532-77). Pour qu'il soit pleinement valable, il doit être daté, signé par le dirigeant, et validé par le coordinateur SPS. Le skill produit la trame conforme et structurée. La validation reste de la responsabilité humaine — comme pour tout PPSPS, qu'il soit rédigé manuellement ou avec l'IA.",
    },
    {
      q: 'Et si mon coordinateur SPS me demande des modifications ?',
      a: "Tu retournes dans Claude, tu lui dis « modifie le PPSPS pour intégrer les remarques suivantes : [LISTE] ». Il régénère le document en 1 minute avec les ajustements. Beaucoup plus rapide que de rouvrir un Word de 35 pages et de modifier chaque section concernée.",
    },
    {
      q: 'Combien de temps prend la génération la première fois ?',
      a: "La première fois en suivant ce tuto, comptez 30 minutes pour bien calibrer le skill. Les fois suivantes, 5 à 10 minutes par PPSPS (saisie de la description du chantier + génération + relecture rapide). À comparer avec 2 jours de rédaction manuelle. Sur 20 PPSPS par an, tu économises environ 200 heures.",
    },
    {
      q: 'Le skill peut-il intégrer les FDS de mes produits ?',
      a: "Oui. Tu peux uploader les Fiches de Données de Sécurité (FDS) de tes produits chimiques principaux (peintures, colles, solvants) lors du calibrage du skill. Claude les intégrera automatiquement en annexe et fera référence aux risques chimiques correspondants dans le chapitre 4. Pour les FDS rares ou nouvelles, tu les ajoutes manuellement à chaque PPSPS.",
    },
    {
      q: 'Que se passe-t-il si la réglementation change ?',
      a: "Tu mets à jour ton skill en 5 minutes. Tu dis à Claude « la réglementation X a évolué, voici la nouvelle version, intègre-la dans le skill ». Il met à jour la méthode et tous les futurs PPSPS générés intégreront le changement. Combine ce skill avec ton skill Veille Réglementaire pour ne rien rater.",
    },
    {
      q: 'Mes données chantier sont-elles confidentielles ?',
      a: "Sur le plan Claude Pro, Anthropic ne réutilise pas tes données pour entraîner ses modèles. Les éléments sensibles que tu uploades (organigramme, coordonnées, anciens PPSPS) restent dans ton compte. Pour les données client très sensibles, tu peux anonymiser dans le prompt et compléter manuellement dans le Word généré.",
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: 'On le construit ensemble',
    subtitle: 'Atelier individuel ou en équipe — financement possible selon éligibilité (Constructys / OPCO)',
    programTitle: 'Programme « Niveau 2 — Conducteurs de travaux »',
    programItems: [
      'On construit ton skill PPSPS sur tes vrais chantiers',
      'Calibrage sur tes risques métier et tes coordinateurs SPS',
      'Un skill opérationnel à la fin de la session',
      'Format individuel ou équipe (session catalogue 4 h, présentiel Île-de-France)',
    ],
  },
};
