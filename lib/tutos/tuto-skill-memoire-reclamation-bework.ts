import type { TutoData } from './types';
import { RESSOURCES_MINIATURES } from '@/lib/ressources-miniatures';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';

export const TUTO_SKILL_MEMOIRE_RECLAMATION_BEWORK: TutoData = {
  slug: 'tuto-skill-memoire-reclamation-bework',
  category: 'marches-et-veille',
  pdfFile: 'tuto-skill-memoire-reclamation-bework.pdf',

  eyebrow: 'TUTO OFFERT PAR BEWORK',
  title: 'Crée ton skill Mémoire de réclamation',
  shortTitle: 'Skill Mémoire de réclamation',
  subtitle:
    'Le tutoriel pas à pas pour monter une réclamation solide — 45 minutes au lieu d’une journée.',

  metaTitle: 'Tuto mémoire réclamation : skill Claude en 45 min | Laure Olivié',
  metaDescription:
    'Tuto skill mémoire de réclamation BTP : CCAG art. 55, chiffrage et délai 30 j avec Claude. Formation IA pour le BTP — PDF gratuit pas à pas.',
  keywords: [
    'mémoire de réclamation',
    'réclamation marché public BTP',
    'CCAG-Travaux 2021 art. 55',
    'délai 30 jours réclamation',
    'décompte général DGD',
    'skill Claude réclamation',
    'tuto mémoire réclamation',
    'préjudice chantier',
    'chiffrage préjudice BTP',
    'marché public travaux',
    'IA BTP',
    'ChatGPT BTP',
    'Claude BTP',
    'formation IA pour le BTP',
    'BeWork',
    'Laure Olivié',
    "OFC Création d'Entreprise",
  ],
  ogImageAlt:
    'Professionnelle BTP, mémoire de réclamation marché — ChatGPT BTP créances et délais',

  publishedAt: '2026-07-31',
  updatedAt: '2026-07-31',

  cardSummary:
    'Monte une réclamation conforme au CCAG-Travaux 2021 (art. 55) : faits, fondement, chiffrage poste par poste et délai de 30 jours — 45 minutes au lieu d’une journée.',

  totalTimeMinutes: 45,

  heroImage: RESSOURCES_MINIATURES.memoireReclamation,

  heroLearnPoints: [
    'Structurer une réclamation conforme au CCAG-Travaux 2021 (art. 55)',
    'Chiffrer ton préjudice poste par poste, pièces à l’appui',
    'Respecter le délai de 30 jours pour ne pas perdre ton droit',
    'Sortir un mémoire argumenté prêt à transmettre au maître d’ouvrage',
  ],

  introTitle: 'Pourquoi un skill Mémoire de réclamation ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        'Sur un chantier, les aléas s’accumulent : travaux supplémentaires non commandés, allongement de délai du fait du maître d’ouvrage, sujétions imprévues, retards de paiement. Le mémoire de réclamation est la voie formelle pour obtenir réparation. Encadré par le CCAG-Travaux 2021 (article 55, anciennement article 50 du CCAG 2009), il obéit à des règles de forme et de délai strictes.',
    },
    {
      kind: 'paragraph',
      text:
        'Une réclamation mal montée ou hors délai, c’est un préjudice non indemnisé. Beaucoup d’entreprises renoncent faute de temps pour réunir les pièces et rédiger l’argumentaire — et abandonnent des sommes parfois à cinq chiffres qui leur étaient pourtant dues.',
    },
    { kind: 'h3', text: 'Avec un skill bien construit, voilà ce qui change' },
    {
      kind: 'list',
      items: [
        'Il structure le mémoire selon le formalisme attendu (exposé, fondement, chiffrage, demande).',
        'Il rattache chaque demande à son fondement (OS, CR, courrier, fait du maître d’ouvrage).',
        'Il chiffre le préjudice poste par poste, avec la base de calcul affichée.',
        'Il rappelle les délais de forclusion et la procédure (DGD, mémoire en réclamation).',
        'Il produit un document opposable, daté et référencé.',
      ],
    },
    {
      kind: 'highlight',
      text: 'Tu arrêtes de laisser filer des sommes que le marché te doit.',
    },
    {
      kind: 'callout',
      title: 'Obligation légale — le délai à ne pas rater',
      body:
        'Quand la réclamation porte sur le décompte général, le mémoire doit être transmis dans les 30 jours à compter de la notification du décompte (CCAG-Travaux 2021, art. 55.1.1 — c’était l’art. 50 du CCAG 2009). C’est la date de réception, par le maître d’ouvrage ET le maître d’œuvre, qui fait foi — pas la date d’envoi (CE, 2 fév. 2024, Société Valenti). Passé ce délai : forclusion, le décompte devient définitif et la créance est perdue.',
    },
    {
      kind: 'callout',
      title: 'Cas concret — ce que le skill chiffre',
      body:
        'Chantier prolongé de 40 jours du fait du maître d’ouvrage : immobilisation grue 40 j × 1 200 € = 48 000 € ; encadrement de chantier 40 j × 600 € = 24 000 € ; total du préjudice réclamé 72 000 € HT. Sans mémoire dans les 30 j du décompte général → 0 € indemnisé. Le skill structure, chiffre et rattache chaque poste à sa pièce.',
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active la fonction Skills',
      intro:
        'Pré-requis — un compte Claude. Le compte gratuit suffit pour démarrer (plus de « Pro obligatoire » depuis fin 2025). Attention : le plan gratuit est limité en tokens par session et sature vite sur les dossiers BTP lourds avec pièces jointes (CCAP de 50 pages, OS, CR, devis). Pour un usage pro quotidien, le plan Pro à 18€ HT/mois est recommandé.',
      blocks: [
        { kind: 'h3', text: 'Le chemin d’activation (interface 2026)' },
        {
          kind: 'list',
          items: [
            'Clique sur ton avatar en bas à gauche, puis sur « Personnaliser » (ou « Customize »).',
            'Ouvre l’onglet « Compétences » (ou « Skills »).',
            'Clique sur le bouton « + » en haut à droite.',
            'Choisis « + Créer une compétence » (création assistée par Claude) ou « Téléverser une compétence » pour importer un ZIP existant.',
          ],
        },
        {
          kind: 'callout',
          title: 'Pré-requis technique',
          body:
            'Active aussi l’option « Exécution de code » dans le même menu Personnaliser : sans elle, pas de sortie Word ou PDF en livrable. À ne plus utiliser : l’ancien chemin Settings → Capabilities → 3 toggles, qui est obsolète.',
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière',
      intro:
        'Plus tu donnes de contexte réel à Claude, plus le skill colle à ta façon de travailler. Réunis ces cinq éléments avant de lancer la conversation.',
      blocks: [
        {
          kind: 'numberedList',
          items: [
            'Les pièces du litige — OS, comptes rendus de chantier, courriers, mises en demeure, mails : tout ce qui date et qualifie les faits à l’origine du préjudice.',
            'Le marché et ses délais — CCAP et CCAG applicable : ils fixent le fondement, la procédure et surtout les délais de forclusion à ne pas dépasser.',
            'Tes pièces de chiffrage — devis, factures, bordereaux d’heures, prix unitaires : la base qui permet de chiffrer le préjudice de façon traçable.',
            'La chronologie des faits — une frise simple date → événement → pièce : c’est la colonne vertébrale de l’exposé des faits.',
            'Un mémoire déjà rédigé — un modèle de ton style de rédaction : le skill reproduira ton ton et ta structure plutôt qu’un format générique.',
          ],
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro:
        'Ouvre une nouvelle conversation et colle le prompt de cadrage ci-dessous. Il définit le rôle, la structure de sortie et les règles que le skill devra respecter à chaque usage.',
      blocks: [
        {
          kind: 'prompt',
          title: 'Prompt de création',
          text: `Tu es mon assistant de rédaction de mémoires de réclamation BTP.
Objectif : à partir des pièces d’un litige de chantier, produire un
mémoire de réclamation structuré, chiffré et opposable.

Tu structures toujours en 4 blocs :
1. Exposé des faits — chronologie datée, référencée aux pièces
2. Fondement contractuel et réglementaire — rattaché au marché et au
   CCAG-Travaux 2021 (art. 55 ; art. 50 si CCAG 2009), citer les articles
   sans recopier le texte officiel
3. Chiffrage du préjudice — poste par poste, avec base de calcul
4. Demande et pièces justificatives — montant total, liste des annexes

Tu rappelles le délai applicable (30 j depuis la notification du
décompte général, à peine de forclusion) et tu reprends mon style.
Tu n’inventes aucun montant : si une donnée manque, tu me la demandes.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            'Le nerf de la guerre, c’est le lien entre chaque demande et sa pièce. Un préjudice sans OS, CR ou courrier daté pour l’étayer ne sera pas indemnisé. Exige que le skill refuse de chiffrer ce qui n’est pas justifié.',
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Affine et active ton skill',
      intro: 'Teste la première sortie sur un cas que tu connais déjà, puis vérifie :',
      blocks: [
        {
          kind: 'list',
          items: [
            'Le ton et la structure correspondent-ils à tes documents habituels ?',
            'Les références d’articles sont-elles présentes et exactes ?',
            'Le skill demande-t-il les données manquantes au lieu de les inventer ?',
            'La sortie tient-elle sur le format voulu (fiche d’une page / mémoire complet) ?',
            'Les montants sont-ils traçables, avec la base de calcul affichée ?',
            'Le livrable s’exporte-t-il au bon format (Word / PDF) ?',
          ],
        },
        {
          kind: 'prompt',
          title: 'Exemple d’ajustement',
          text:
            'Reformule l’exposé des faits de façon plus sobre et factuelle, sans adjectifs. Et ajoute systématiquement un tableau récapitulatif du chiffrage en fin de mémoire.',
        },
        {
          kind: 'paragraph',
          text:
            'Quand le rendu te convient, enregistre la conversation comme compétence : Personnaliser → Compétences → « + Créer une compétence ». Donne-lui un nom clair et une description qui dit quand le déclencher. Il sera réutilisable en un clic sur tous tes prochains dossiers.',
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Teste sur un vrai dossier',
      intro: 'Le skill est prêt. Voici le réflexe à prendre sur un dossier réel :',
      blocks: [
        {
          kind: 'list',
          items: [
            'Ouvre une conversation et appelle ton skill Mémoire de réclamation.',
            'Joins les pièces du litige (OS, CR, courriers, chiffrage).',
            'Donne la chronologie des faits et les postes de préjudice.',
            'Relis le mémoire et complète les données qu’il te réclame.',
            'Vérifie le délai de transmission avant d’envoyer au maître d’ouvrage.',
          ],
        },
        { kind: 'h3', text: 'Prompt — utilisation quotidienne' },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Litige sur le chantier [nom]. Pièces en PJ (OS, CR, courriers,
bordereaux d’heures). Faits : [résumé en 3 lignes].
Préjudice estimé : [postes]. Marché : [public/privé], CCAG 2021.
Rédige le mémoire de réclamation complet, chiffrage poste par poste,
et rappelle-moi le délai pour le transmettre.`,
        },
        {
          kind: 'callout',
          title: 'Extrait de sortie — ce que tu obtiens',
          body:
            '3. CHIFFRAGE DU PRÉJUDICE — Immobilisation grue (40 j × 1 200 €) …… 48 000 € ; Encadrement chantier (40 j × 600 €) …… 24 000 € ; Total réclamé HT …… 72 000 €. Fondement : OS n°7 du 12/03, CR n°14, courrier RAR du 20/03. Délai : mémoire à réceptionner avant le 30/06 (J+30 du décompte).',
        },
        {
          kind: 'callout',
          title: 'La règle d’or',
          body:
            'Le délai prime sur la perfection. Un mémoire solide transmis dans les temps vaut mieux qu’un mémoire parfait hors délai — qui ne vaut plus rien.',
        },
      ],
    },
  ],

  faqTitle: 'FAQ',
  faq: [
    {
      q: 'Quand déposer un mémoire de réclamation ?',
      a: 'Dès qu’un préjudice est identifié, et dans les délais du marché. En marché public, le mémoire en réclamation relève de l’article 55 du CCAG-Travaux 2021 ; s’il porte sur le décompte général, il doit être reçu dans les 30 jours suivant sa notification, sous peine de forclusion.',
    },
    {
      q: 'Quels préjudices peut-on réclamer ?',
      a: 'Travaux supplémentaires non commandés, allongement de délai imputable au maître d’ouvrage, sujétions imprévues, immobilisation de matériel ou d’équipes, retards de paiement, entre autres — à condition de pouvoir les étayer.',
    },
    {
      q: 'Le skill garantit-il gain de cause ?',
      a: 'Non. Il structure et chiffre solidement la demande. L’issue dépend des pièces, du fondement et, en cas de litige, du juge ou du comité de règlement amiable. Le skill maximise tes chances, il ne décide pas à ta place.',
    },
    {
      q: 'Faut-il des pièces justificatives ?',
      a: 'Oui, c’est le cœur du dossier : OS, CR de chantier, courriers, bordereaux d’heures, devis. Le skill t’aide à relier chaque demande à sa pièce, et refuse de chiffrer ce qui n’est pas justifié.',
    },
    {
      q: 'Ça remplace un avocat ?',
      a: 'Pour une réclamation courante, il fait gagner un temps considérable. Pour un contentieux à fort enjeu, fais relire le mémoire par un conseil : le skill prépare le dossier, il ne remplace pas l’expertise juridique.',
    },
    {
      q: 'Et en marché privé ?',
      a: 'Le formalisme du CCAG ne s’applique pas : on se réfère à la norme NF P03-001 ou aux clauses du contrat, et les délais sont ceux du marché. La logique reste identique — faits, fondement, chiffrage, pièces — et le skill s’adapte au référentiel que tu lui indiques.',
    },
    {
      q: 'Compte payant nécessaire ?',
      a: 'Un compte gratuit permet de tester, mais les dossiers volumineux avec beaucoup de pièces saturent vite le plan gratuit. Pour un usage pro, le plan Pro est recommandé.',
    },
  ],

  cta: {
    eyebrow: 'PAS LE TEMPS DE LE FAIRE VOUS-MÊME ?',
    title: 'Faire appel à un Assistant Travaux BeWork',
    subtitle: 'Solutions IA sur mesure pour le BTP',
    programTitle: 'Assistant travaux BTP · Relais dossiers chantier · Augmenté par l’IA',
    programItems: [
      'Vous nous envoyez les pièces du litige (OS, CR, courriers, chiffrage).',
      'On reconstitue la chronologie, on chiffre le préjudice, on rédige le mémoire conforme.',
      'Vous transmettez un dossier opposable dans les délais, sans y passer la journée.',
    ],
    brand: 'bework',
    primaryHref: EXTERNAL_SITE_URLS.bework,
    primaryLabel: 'Réserver un appel de cadrage de 20 minutes sur bework.fr',
  },
};
