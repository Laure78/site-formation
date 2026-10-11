import type { TutoData } from './types';
import { RESSOURCES_MINIATURES } from '@/lib/ressources-miniatures';

export const TUTO_SKILL_DC4_OFC: TutoData = {
  slug: 'tuto-skill-dc4-ofc',
  category: 'marches-et-veille',
  pdfFile: 'tuto-skill-dc4-ofc.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill DC4 — Déclaration de sous-traitance',
  shortTitle: 'Skill DC4 sous-traitance',
  subtitle:
    'Le tutoriel pas à pas pour produire un DC4 complet et cohérent avec ton marché — 12 minutes au lieu de 2 heures.',

  metaTitle: 'Tuto skill DC4 : déclaration sous-traitance 12 min',
  metaDescription:
    'Tuto skill DC4 BTP : déclaration de sous-traitance, paiement direct et pièces acheteur avec Claude. Formation IA pour le BTP — PDF gratuit pas à pas.',
  keywords: [
    'DC4',
    'déclaration de sous-traitance',
    'acte spécial sous-traitance',
    'paiement direct sous-traitant',
    'marché public travaux',
    'loi 75-1334',
    'Code de la commande publique',
    'skill Claude DC4',
    'tuto DC4',
    'ATTRI1',
    'obligation de vigilance',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'formation IA pour le BTP',
    'Laure Olivié',
    "OFC Création d'Entreprise",
  ],
  ogImageAlt: RESSOURCES_MINIATURES.tutoDc4.alt,

  publishedAt: '2026-10-11',
  updatedAt: '2026-10-11',

  cardSummary:
    'Produis un DC4 complet et cohérent avec ton marché : rubriques officielles, pièces, paiement direct et mail à l’acheteur — 12 minutes au lieu de 2 heures.',

  totalTimeMinutes: 12,

  heroImage: RESSOURCES_MINIATURES.tutoDc4,

  heroLearnPoints: [
    'Construire ton skill DC4 dans Claude en 30 minutes',
    'Remplir toutes les rubriques du formulaire officiel sans rien oublier',
    "Anticiper l'acceptation du sous-traitant par l'acheteur public",
    'Sécuriser le paiement direct dès la première sous-traitance',
    'Exploiter les nouveautés Claude 2026 : Projets, mémoire, connecteurs',
  ],

  introTitle: 'Pourquoi un skill DC4 ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        "Le DC4 — déclaration de sous-traitance, ou acte spécial — est le formulaire qui permet à l'acheteur public d'accepter ton sous-traitant et d'agréer ses conditions de paiement. Cadre : loi n° 75-1334 du 31 décembre 1975 et articles L2193-1 et suivants du Code de la commande publique. Sans acceptation, le sous-traitant n'a pas accès au paiement direct et tu t'exposes aux sanctions prévues par ton marché, jusqu'à la résiliation à tes torts.",
    },
    {
      kind: 'list',
      items: [
        'Titulaire — signe le marché et reste responsable de tout, y compris de ce que fait son sous-traitant.',
        "Sous-traitant — exécute les prestations déclarées. Payé directement par l'acheteur dès 600 € TTC.",
        "Acheteur — accepte (ou refuse) le sous-traitant et agrée ses conditions de paiement.",
      ],
    },
    {
      kind: 'paragraph',
      text:
        "Le problème concret : un DC4 incomplet, ce sont des allers-retours avec l'acheteur, des semaines de blocage, un sous-traitant qui démarre sans être accepté et des règlements suspendus. Sur un marché de 180 000 € HT sous-traité à 35 %, ce sont 63 000 € de prestations dont le paiement attend l'instruction.",
    },
    { kind: 'h3', text: 'Avec un skill bien construit, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        'Il remplit le DC4 rubrique par rubrique, sur la trame officielle',
        "Il vérifie que montants, TVA et délais de paiement collent à l'acte d'engagement",
        'Il intègre les coordonnées bancaires du sous-traitant pour le paiement direct',
        'Il liste les pièces à joindre et signale celles qui manquent',
        "Il rédige le mail de transmission à l'acheteur, prêt à partir",
      ],
    },
    {
      kind: 'highlight',
      text: 'Tu sors un DC4 acceptable au premier envoi, pas au troisième.',
    },
    {
      kind: 'callout',
      title: "Les points que l'acheteur contrôle en premier",
      body:
        "1. Nature et montant des prestations sous-traitées · 2. Conditions de paiement du sous-traité · 3. Identité et capacités du sous-traitant · 4. Coordonnées bancaires pour le paiement direct. Côté Code du travail, n'oublie pas l'obligation de vigilance (art. L8222-1) : pour un contrat d'au moins 5 000 € HT, tu dois obtenir l'attestation Urssaf du sous-traitant à la signature puis tous les 6 mois, sous peine de solidarité financière.",
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active la fonction Compétences dans Claude',
      intro:
        "Un skill (« compétence ») est un mode d'emploi permanent que tu donnes à Claude une fois pour toutes : ta trame DC4, tes contrôles, ton ton de mail. Tu n'as plus à les réexpliquer à chaque nouveau sous-traitant. Les compétences sont disponibles sur toutes les offres Claude, y compris la gratuite. Mais un acte d'engagement, un DC1, un DC2 et un Kbis dans la même conversation consomment vite le quota gratuit : pour un usage professionnel, l'offre Pro reste recommandée — environ 21 € TTC/mois, ou environ 17,50 €/mois en annuel.",
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
            "Sans cette option, les compétences restent grisées et Claude ne peut pas te livrer le DC4 en Word ou PDF : tu n'aurais que du texte à recopier.",
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
            "L'administrateur active les compétences dans Paramètres de l'organisation → Plugins et compétences. Tu peux ensuite partager ton skill DC4 (menu « ⋯ » → Partager) : tout le service marchés produit les mêmes DC4, avec les mêmes contrôles. L'interface évolue régulièrement : si un libellé a changé, cherche « Compétences » ou « Skills » dans les paramètres.",
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière DC4',
      intro:
        'Plus le skill est nourri de tes vrais documents, plus il sort un DC4 calibré sur ta façon de faire. Réunis ces cinq éléments.',
      blocks: [
        {
          kind: 'numberedList',
          items: [
            'Tes 2 ou 3 derniers DC4 acceptés — pas les brouillons : des DC4 réellement acceptés par un acheteur public (commune, département, bailleur social, hôpital). C’est ta référence de mise en forme et de niveau de détail.',
            "L'acte d'engagement du marché concerné — le DC4 doit être cohérent avec le marché : acheteur, lot, montant HT, conditions de paiement, durée. Avec l'acte d'engagement (ATTRI1, qui a remplacé le DC3), le skill recoupe les chiffres.",
            'Les pièces administratives du sous-traitant — Kbis récent, attestations fiscale et Urssaf, assurances (RC pro, décennale selon le lot), qualifications (Qualibat, RGE…), RIB pour le paiement direct. Le skill listera celles qui manquent.',
            'Les éléments de capacités du sous-traitant — ses références, moyens et effectifs — souvent issus de son DC1 / DC2 ou d’une fiche de présentation. Ils servent à justifier ses capacités dans le DC4.',
            'Le formulaire DC4 officiel à jour — à télécharger sur le site de la Direction des affaires juridiques (DAJ) de Bercy, avec sa notice explicative. Vérifie que tu utilises la dernière version publiée avant chaque nouveau marché.',
          ],
        },
        {
          kind: 'callout',
          title: 'Lien à mettre en favori',
          body:
            'economie.gouv.fr/daj/formulaires-declaration-du-candidat — la page rassemble les formulaires DC et ATTRI en Word et PDF. Donne le DC4 Word officiel à ton skill : sa sortie suivra exactement la trame attendue par l’acheteur.',
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        'Crée un Projet Claude « DC4 », téléverse les documents de l’étape 2 dans ses connaissances, puis ouvre une conversation dans ce Projet et colle ce prompt.',
      blocks: [
        {
          kind: 'prompt',
          title: 'Prompt — initialisation du skill',
          text: `Je veux créer un skill Claude qui produit mes DC4 (déclarations
de sous-traitance) pour des marchés publics de travaux.

Mon contexte :
- Entreprise : [NOM], [corps d'état]
- Lots que je sous-traite souvent : [X, Y, Z]
- Mes acheteurs habituels : [commune / bailleur / hôpital…]
- Je suis titulaire du marché (pas cotraitant pour cet usage)

Documents dans le Projet : 2 DC4 acceptés, un acte d'engagement,
les pièces de mon sous-traitant habituel, le DC4 officiel vierge.

Le skill doit :
1. Remplir toutes les rubriques du DC4 officiel, dans l'ordre ;
2. Vérifier la cohérence des montants HT avec l'acte d'engagement ;
3. Calculer la part sous-traitée et m'alerter si le CCAP la limite ;
4. Lister les pièces à joindre et celles qui manquent ;
5. Rédiger le mail de transmission à l'acheteur ;
6. Me signaler une éventuelle sous-traitance de 2ᵉ rang.

N'invente jamais un article de loi. Avant de créer le skill,
pose-moi toutes les questions nécessaires.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            'Ne demande pas un DC4. Demande un skill qui produira tous tes futurs DC4. Claude va t’interroger sur tes habitudes, tes lots et tes acheteurs récurrents — et construire une méthode réutilisable, pas un document jetable.',
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro: 'Claude te restitue une première version. Challenge-la avant de l’activer.',
      blocks: [
        {
          kind: 'list',
          items: [
            'Toutes les rubriques du DC4 officiel sont couvertes, dans le bon ordre',
            'Le pourcentage sous-traité est bien calculé sur le montant du marché',
            'Le paiement direct est prévu dès 600 € TTC sous-traités',
            "L'autoliquidation de TVA est mentionnée pour les travaux de construction sous-traités (art. 283, 2 nonies du CGI)",
            'La liste des pièces est complète (Kbis, attestations, assurances, qualifications, RIB)',
            'Le mail de transmission et un mail de relance à J+15 sont prévus',
          ],
        },
        {
          kind: 'prompt',
          title: "Exemple d'ajustement",
          text: `Ajuste ces points :
- Signale-moi tout Kbis ou attestation dont la date te paraît ancienne ;
- Rappelle le paiement direct dès 600 € TTC sous-traités ;
- Ajoute la mention d'autoliquidation de TVA quand elle s'applique ;
- Mail de transmission : ton ferme mais courtois ;
- Liste toujours les pièces manquantes en tête de réponse.`,
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
            "Claude lit la description de ta compétence (200 caractères max) pour savoir quand la déclencher. Écris-la avec tes mots : « DC4, déclaration de sous-traitance, acte spécial, paiement direct du sous-traitant pour les marchés publics de [ENTREPRISE] ».",
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Teste sur un vrai dossier',
      intro: 'Un nouveau marché, un sous-traitant à déclarer : voilà le déroulé au quotidien.',
      blocks: [
        {
          kind: 'list',
          items: [
            'Ouvre une conversation dans ton Projet « DC4 »',
            "Téléverse l'acte d'engagement du marché et les pièces du nouveau sous-traitant",
            'Donne les 4 infos clés : sous-traitant, lot, montant HT, prestations',
            'Claude restitue le DC4 rempli, les pièces manquantes et le mail',
            'Tu relis, tu corriges si besoin, tu signes et tu envoies',
          ],
        },
        { kind: 'h3', text: 'Le bon prompt pour un usage quotidien' },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Nouveau dossier DC4 :
- Marché : [intitulé + numéro]     - Acheteur : [nom]
- Acte d'engagement : joint
- Sous-traitant : [raison sociale, SIRET]
- Prestations sous-traitées : [nature détaillée]
- Montant HT sous-traité : [X] € HT
- Conditions de paiement : [délai]

Génère :
1. Le DC4 complet en Word, sur la trame officielle ;
2. Le contrôle de cohérence avec l'acte d'engagement ;
3. Les pièces à joindre et celles qui manquent ;
4. Le mail de transmission à l'acheteur.`,
        },
        {
          kind: 'callout',
          title: "La règle d'or",
          body:
            "Un DC4 transmis sans pièces complètes revient presque toujours. Mieux vaut attendre 48 h une attestation manquante que relancer l'acheteur pendant trois semaines. Et le sous-traitant ne démarre qu'une fois accepté.",
        },
        { kind: 'h3', text: 'Les nouveautés Claude à exploiter' },
        {
          kind: 'paragraph',
          text:
            'Claude a beaucoup évolué en 2026. Voici les fonctions qui font gagner le plus de temps sur tes DC4 — la disponibilité dépend de ton offre et le déploiement est parfois progressif.',
        },
        {
          kind: 'list',
          items: [
            'Projets — un Projet « DC4 » garde la trame officielle, tes DC4 de référence et les pièces de tes sous-traitants habituels',
            'Grosses tâches dans le chat (Pro et Max) — DC4 Word, tableau des pièces et mail dans la même conversation',
            'Claude Docs — mail ou note d’accompagnement modifiable, exportable Word / PDF',
            'Modification ciblée — corrige un montant ou une phrase sans tout régénérer',
            'Mémoire — retient ton des mails et acheteurs récurrents (Paramètres → Mémoire)',
            'Connecteurs — retrouve les pièces dans Drive / OneDrive et prépare le mail (Gmail, Outlook)',
          ],
        },
        {
          kind: 'callout',
          title: 'Confidentialité',
          body:
            "Un DC4 contient un RIB et des données d'entreprise. Vérifie dans Paramètres → Confidentialité que l'utilisation de tes conversations pour améliorer Claude est désactivée, ne joins que les pièces utiles, et préfère une offre Team ou Enterprise pour un service marchés.",
        },
        {
          kind: 'callout',
          title: 'Règle de prudence',
          body:
            "Claude prépare, tu vérifies et tu signes. Un DC4 engage ton entreprise : contrôle toujours montants, SIRET et RIB avant envoi.",
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Faut-il un DC4 pour chaque sous-traitant, même petit ?',
      a: "Oui : tout sous-traitant doit être accepté et ses conditions de paiement agréées, quel que soit le montant. Le seuil de 600 € TTC concerne le paiement direct, pas l'obligation de déclarer.",
    },
    {
      q: 'Le DC4 peut-il être transmis après le démarrage ?',
      a: "Le sous-traitant doit être accepté avant d'intervenir. Régulariser en cours de chantier reste un risque : sans acceptation, pas de paiement direct, et ton marché peut prévoir des sanctions, jusqu'à la résiliation.",
    },
    {
      q: "Quel est le délai d'acceptation par l'acheteur ?",
      a: "L'acceptation est constatée par la signature de l'acte spécial. À défaut, le silence de l'acheteur pendant 21 jours après réception du dossier complet vaut acceptation du sous-traitant ET agrément des conditions de paiement (art. R2193-4 du Code de la commande publique). Relance à J+15.",
    },
    {
      q: 'Y a-t-il une limite de sous-traitance ?',
      a: "Le Code n'impose pas de pourcentage général, mais l'acheteur peut exiger que certaines tâches essentielles soient réalisées directement par le titulaire, et le CCAP peut encadrer la sous-traitance. Lis l'article « Sous-traitance » du CCAP avant chaque nouveau DC4.",
    },
    {
      q: 'Le sous-traitant change de RIB ou de montant en cours de marché ?',
      a: "Toute modification (montant, prestations, conditions de paiement, coordonnées bancaires) passe par un acte spécial modificatif transmis à l'acheteur. Sinon, il continuera à payer sur les anciennes bases.",
    },
    {
      q: 'DC1, DC2, ATTRI1, DC4 : quelle différence ?',
      a: "DC1 = lettre de candidature ; DC2 = déclaration du candidat (capacités) ; ATTRI1 = acte d'engagement (il a remplacé le DC3) ; DC4 = déclaration de sous-traitance, au dépôt de l'offre ou en cours d'exécution. Ton skill DC4 ne traite que la sous-traitance.",
    },
    {
      q: 'Et si je veux le construire accompagné ?',
      a: 'En formation, on construit le skill ensemble sur tes propres marchés : tu repars avec une compétence opérationnelle.',
    },
  ],

  cta: {
    eyebrow: "ENVIE D'ALLER PLUS LOIN ?",
    title: 'On le construit ensemble',
    subtitle:
      'Formation en présentiel en Île-de-France — prise en charge OPCO/Constructys selon éligibilité',
    programTitle: "Formation Niveau 2 — Appels d'offres : DCE & mémoire technique",
    programItems: [
      'On construit ton skill DC4 sur tes propres marchés et sous-traitants',
      'On le calibre : rubriques, contrôles de cohérence, pièces, paiement direct',
      'Tu repars avec une compétence opérationnelle et des DC4 prêts à signer',
      'Format : 4 h · intra-entreprise ou session inter · Organisme certifié Qualiopi',
    ],
  },
};
