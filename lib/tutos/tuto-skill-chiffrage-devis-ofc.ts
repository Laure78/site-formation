import type { TutoData } from './types';
import { RESSOURCES_MINIATURES } from '@/lib/ressources-miniatures';

export const TUTO_SKILL_CHIFFRAGE_DEVIS_OFC: TutoData = {
  slug: 'tuto-skill-chiffrage-devis-ofc',
  category: 'marches-et-veille',
  pdfFile: 'tuto-skill-chiffrage-devis-ofc.pdf',

  eyebrow: 'TUTO OFFERT PAR LAURE OLIVIÉ',
  title: 'Crée ton skill Chiffrage de devis BTP',
  shortTitle: 'Skill chiffrage de devis',
  subtitle:
    'Le tutoriel pas à pas pour transformer un métré en devis chiffré et mis en page — 30 minutes au lieu de 3 heures.',

  metaTitle: 'Tuto skill chiffrage devis BTP : BPU en 30 min',
  metaDescription:
    'Tuto skill chiffrage devis BTP : métré → devis Word/Excel (BPU, TVA) en 30 min. Formation IA pour le BTP, présentiel IDF, Qualiopi — tuto gratuit.',
  keywords: [
    'chiffrage devis BTP',
    'skill Claude devis',
    'BPU prix unitaires',
    'devis BTP IA',
    'TVA travaux 5,5 10 20',
    'métré devis',
    'coefficients frais généraux',
    'chargé d affaires',
    'artisan BTP',
    'Claude BTP',
    'ChatGPT BTP',
    'formation IA pour le BTP',
    'Laure Olivié',
    "OFC Création d'Entreprise",
    'Constructys',
  ],
  ogImageAlt:
    'Créer un skill chiffrage de devis BTP — tuto offert PDF gratuit, formation IA pour le BTP',

  publishedAt: '2026-09-18',
  updatedAt: '2026-09-18',

  cardSummary:
    'Crée un skill Claude qui transforme ton métré en devis Word chiffré + Excel de calcul : BPU, coefficients, TVA différenciée — 30 minutes au lieu de 3 heures.',

  totalTimeMinutes: 30,

  heroImage: RESSOURCES_MINIATURES.tutoSkillChiffrageDevis,

  heroLearnPoints: [
    'Activer les skills et l’exécution de code dans Claude (5 minutes, une seule fois)',
    'Calibrer ton skill avec ton BPU, tes coefficients et tes derniers devis',
    'Le prompt prêt à coller pour faire construire ton skill en une conversation',
    'Installer ton skill en .zip pour le retrouver dans toutes tes conversations',
    'Le prompt quotidien qui transforme un métré brut en devis chiffré',
  ],

  introTitle: 'Pourquoi un skill chiffrage de devis ?',
  introBlocks: [
    {
      kind: 'paragraph',
      text:
        'Le devis, c’est l’engagement contractuel n°1 de l’entreprise du bâtiment. Il fixe le prix, le périmètre et les délais. Une fois signé par le client, il devient une obligation de résultat. Une erreur de 5 % sur un poste mal estimé, c’est 5 % de marge en moins — voire un litige quand le client conteste un avenant.',
    },
    {
      kind: 'paragraph',
      text:
        'C’est aussi le levier commercial le plus chronophage. Entre la visite, le métré, le chiffrage et la mise en page, on est souvent à 3 ou 4 heures par devis. Et pendant ce temps, tu n’es pas sur le chantier. Sur 25 à 40 devis par an, cela représente 100 à 150 heures passées à ressortir les mêmes prix, retaper les mêmes paragraphes et recalculer les mêmes TVA.',
    },
    {
      kind: 'callout',
      title: 'Avec un skill bien construit, voilà ce qui change',
      body:
        'Tu donnes ton métré ou tes notes de visite, le skill sort le devis chiffré et mis en page · Ton BPU (bibliothèque de prix unitaires) est intégré : aucun prix oublié ni faux · Les coefficients sont appliqués automatiquement (frais généraux, marge, aléas) · La TVA est juste du premier coup selon la nature des travaux (5,5 % / 10 % / 20 %) · Tu passes de 3 heures à 30 minutes. Sur 30 devis par an, c’est 75 heures récupérées.',
    },
    {
      kind: 'highlight',
      text:
        'Le skill ne décide pas à ta place. Il met en forme, il calcule, il complète. La marge commerciale, le positionnement prix et la stratégie face à la concurrence restent ton métier.',
    },
    {
      kind: 'callout',
      title: 'Les 8 blocs standard d’un devis BTP pro',
      body:
        '(1) En-tête société : raison sociale, SIRET, RGE, assurance décennale. (2) Identification du client et adresse du chantier. (3) Descriptif des travaux par poste ou par lot, avec spécifications techniques. (4) Métré quantitatif (m², ml, m³, U, forfait). (5) Prix unitaires HT × quantité = prix du poste. (6) Récapitulatif HT, TVA aux taux différenciés, TTC, acompte demandé. (7) Conditions particulières : délai d’exécution, validité de l’offre, modalités de paiement, exclusions. (8) Mentions légales : médiateur de la consommation, droit de rétractation, clause de réserve de propriété. Un skill bien fait te garantit que ces 8 blocs y sont à chaque devis.',
    },
  ],

  steps: [
    {
      number: 1,
      eyebrow: 'ÉTAPE 1',
      title: 'Active les skills et l’exécution de code',
      intro: 'Une seule fois — 5 minutes',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Bonne nouvelle par rapport à l’an dernier : les skills ne sont plus réservés aux abonnés payants. Ils sont accessibles sur les formules Free, Pro, Max, Team et Enterprise. En revanche, pour un usage professionnel régulier (volume de conversations, fichiers lourds, longues sessions), la formule Pro reste le bon choix — environ 20 $ par mois, ou 17 $ par mois avec engagement annuel.',
        },
        { kind: 'h3', text: 'Le chemin précis (à faire une seule fois)' },
        {
          kind: 'list',
          items: [
            'Connecte-toi sur claude.ai avec ton compte.',
            'Clique sur ton avatar en bas à gauche, puis sur Paramètres (Settings).',
            'Ouvre Capacités (Capabilities) dans le menu de gauche.',
            'Active « Exécution de code et création de fichiers » (Code execution and file creation).',
            'Va ensuite dans Personnaliser (Customize) > Skills : c’est là que tu actives tes skills et que tu installeras le tien à l’étape 4.',
          ],
        },
        {
          kind: 'callout',
          title: 'Compte Team ou Enterprise',
          body:
            'C’est l’administrateur qui doit d’abord activer « Code execution » et « Skills » dans les paramètres de l’organisation. Chaque membre les active ensuite pour lui-même dans Personnaliser > Skills.',
        },
        {
          kind: 'callout',
          title: 'Pourquoi c’est indispensable',
          body:
            'Sans l’exécution de code, Claude ne peut pas générer de fichier Word ou Excel téléchargeable avec les calculs intégrés. Il rédigera ton devis en texte dans la conversation, mais ne te livrera pas le tableau Excel ni le PDF prêt à signer. Pour un devis client, c’est rédhibitoire : tu as besoin du fichier mis en page, que tu peux envoyer en pièce jointe, signer électroniquement et archiver.',
        },
      ],
    },
    {
      number: 2,
      eyebrow: 'ÉTAPE 2',
      title: 'Rassemble ta matière première',
      intro: '30 minutes de préparation — des heures gagnées ensuite',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Un skill générique te sortira des prix génériques. C’est exactement ce que tu ne veux pas. Pour qu’il chiffre comme toi, il a besoin de tes vrais prix, tes vrais coefficients, ta vraie structure. Rassemble cette matière avant de lancer la conversation.',
        },
        {
          kind: 'numberedList',
          items: [
            'Tes 2 ou 3 derniers devis finalisés (signés ou refusés) — le skill va calquer son ton, sa structure et son niveau de détail sur ces exemples. Choisis si possible un devis simple, un devis moyen et un devis complexe. PDF ou Word, indifféremment.',
            'Ta bibliothèque de prix unitaires (BPU) — tableau Excel ou PDF avec tes prix de main-d’œuvre (€/h), tes prix matériaux (€/m², €/ml, €/U) et tes prix de sous-traitance. Mets les tarifs à jour au moins deux fois par an.',
            'Tes coefficients d’entreprise — frais généraux (souvent 1,15 à 1,25), marge commerciale (1,10 à 1,20), aléas (1,03 à 1,08), et les taux de TVA : 5,5 % rénovation énergétique logement +2 ans, 10 % entretien/amélioration, 20 % neuf et tertiaire.',
            'Tes contraintes et règles spécifiques — mentions RGE (MaPrimeRénov’ / CEE), attestation de TVA réduite, garanties décennale et biennale, conditions de paiement (acompte 30 %, situations, retenue de garantie 5 %).',
            'Ton template de devis société — modèle Word ou Excel officiel (logo, mentions légales, structure de tableau, CGV). Le skill respectera ta charte sans reparamétrage à chaque devis.',
          ],
        },
        {
          kind: 'callout',
          title: 'Range tout dans un Projet Claude',
          body:
            'Crée un Projet « Devis » dans Claude et dépose-y ton BPU, tes coefficients et ton template. Les fichiers d’un Projet restent disponibles dans toutes les conversations de ce Projet : tu n’as plus à les ré-uploader à chaque devis, et tu les mets à jour en un seul endroit quand tes prix bougent.',
        },
      ],
    },
    {
      number: 3,
      eyebrow: 'ÉTAPE 3',
      title: 'Lance la conversation avec Claude',
      intro: 'Le skill se construit sous tes yeux',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Ouvre une nouvelle conversation sur claude.ai, dépose tous tes documents (devis exemples, BPU, coefficients, template), puis colle ce prompt tel quel. Claude te posera quelques questions de calibrage avant de construire ton skill.',
        },
        {
          kind: 'prompt',
          title: 'Prompt — création du skill devis',
          text: `Je veux que tu construises un skill personnalisé pour générer mes
devis BTP chiffrés.

Contexte :
- Je suis [artisan / dirigeant PME / conducteur de travaux] chez
  [TON ENTREPRISE]
- Métiers : [maçonnerie / couverture / électricité / plomberie /
  plâtrerie / multi-lots]
- Clientèle : [particuliers / pros / mixte] — [neuf / rénovation / mixte]
- Volume : entre 25 et 40 devis par an
- Sortie attendue : devis Word .docx + tableau Excel de calcul détaillé

Je t'ai déposé :
- Mes 3 derniers devis finalisés (référence de ton et de structure)
- Ma bibliothèque de prix unitaires (BPU)
- Mes coefficients d'entreprise (frais généraux, marge, aléas)
- Mon template de devis société

Construis un skill qui :
1. Me demande les caractéristiques du chantier en début de conversation
2. Accepte un métré collé brut ou un descriptif des travaux
3. Applique automatiquement mon BPU et mes coefficients
4. Calcule HT / TVA différenciée / TTC
5. Génère le devis Word complet avec mes 8 blocs standard
6. Sort en parallèle un Excel de chiffrage détaillé pour archive

Avant de générer le skill, pose-moi les questions nécessaires pour
bien calibrer la structure (entre 5 et 10 questions maximum).

Ensuite, livre-moi le skill sous forme de dossier prêt à installer :
un fichier SKILL.md avec son frontmatter (name, description), mes
fichiers de référence dans un sous-dossier, et le tout compressé
en .zip téléchargeable.`,
        },
        {
          kind: 'callout',
          title: 'Le point clé',
          body:
            'Plus ton BPU est complet et tes coefficients précis, plus le skill chiffrera juste. Si tu n’as pas de BPU formalisé, prends une heure pour le construire avant de lancer le skill : c’est l’investissement qui paie le plus. Et attention au nom du skill — le nom du dossier doit être identique au champ « name » du SKILL.md, sinon l’installation sera refusée.',
        },
      ],
    },
    {
      number: 4,
      eyebrow: 'ÉTAPE 4',
      title: 'Teste, affine, puis installe ton skill',
      intro: 'Ne l’installe pas les yeux fermés',
      blocks: [
        {
          kind: 'paragraph',
          text:
            'Claude va te proposer un premier brouillon. Ne l’installe pas tout de suite. Demande-lui d’abord un devis test sur un cas fictif — rénovation de salle de bain de 6 m², réfection de toiture de 80 m² — puis ajuste.',
        },
        { kind: 'h3', text: 'Ce que tu dois vérifier' },
        {
          kind: 'list',
          items: [
            'Les 8 blocs standard sont tous présents et dans le bon ordre.',
            'Les prix unitaires correspondent exactement à ton BPU (vérifie 3 lignes au hasard).',
            'Les coefficients frais généraux / marge / aléas sont appliqués au bon endroit.',
            'Les taux de TVA sont différenciés selon la nature des travaux (5,5 / 10 / 20).',
            'Les mentions légales et la mention RGE sont insérées si le chantier est éligible.',
            'Le total HT / TVA / TTC tombe juste à l’euro près — recalcule une ligne à la main.',
          ],
        },
        {
          kind: 'prompt',
          title: 'Exemple d’ajustement à demander',
          text: `Le brouillon est bien, mais 3 points à corriger :

1. En rénovation de logement de plus de 2 ans, applique la TVA à 5,5 %
   sur les travaux d'amélioration énergétique (isolation, chauffage
   performant) et 10 % sur le reste — ne mets pas tout à 10 %
2. Ajoute une ligne « Frais de déplacement et installation de chantier »
   à 3 % du total HT, calculée automatiquement
3. Dans le récapitulatif final, fais apparaître l'acompte demandé (30 %)
   et le solde à la livraison, pas seulement le TTC global

Régénère le skill avec ces ajustements et propose-moi un nouveau devis
test sur le même cas fictif.`,
        },
        {
          kind: 'callout',
          title: 'Installe-le pour de bon',
          body:
            'Un skill ne se « sauvegarde » pas d’une simple phrase en conversation : il s’installe. Télécharge le .zip que Claude t’a produit, va dans Personnaliser (Customize) > Skills, clique sur « + », choisis « Créer un skill » puis « Uploader un skill », et dépose ton fichier. Active-le ensuite avec l’interrupteur. Il sera disponible dans toutes tes prochaines conversations, sans avoir à recoller quoi que ce soit.',
        },
        {
          kind: 'paragraph',
          text:
            'Sur Mac, l’application Claude propose aussi « Enregistrer un skill » : Claude t’observe pendant que tu fais la tâche une fois, puis en déduit le skill. Pratique si tu préfères montrer plutôt qu’expliquer.',
        },
      ],
    },
    {
      number: 5,
      eyebrow: 'ÉTAPE 5',
      title: 'Teste sur un vrai chantier',
      intro: 'Le vrai test : ton prochain devis client réel',
      blocks: [
        { kind: 'h3', text: 'Le test' },
        {
          kind: 'list',
          items: [
            'Fais ta visite de chantier comme d’habitude : métré, photos, notes.',
            'Ouvre Claude et appelle ton skill par son nom.',
            'Colle ton métré, ton descriptif et les caractéristiques du client.',
            'Réponds aux 2 ou 3 questions complémentaires que Claude te posera.',
            'Récupère ton .docx et ton .xlsx, relis 5 minutes, ajuste le positionnement prix, envoie.',
          ],
        },
        {
          kind: 'prompt',
          title: 'Prompt — utilisation quotidienne',
          text: `Utilise mon skill devis.

Caractéristiques du chantier :
- Client : [NOM + particulier ou pro]
- Adresse chantier : [ADRESSE]
- Nature : [neuf / rénovation logement +2 ans / entretien / pro]
- Surface ou volume : [QUANTITÉ + UNITÉ]
- Délai souhaité : [JJ/MM/AAAA]
- RGE / aides : [oui MaPrimeRénov' / oui CEE / non]

Métré et descriptif des travaux ci-dessous :

[COLLER TON MÉTRÉ — format libre, abréviations OK, 1 ligne = 1 poste]

Si des informations manquent (taux de TVA exact, options de chiffrage,
fournisseur matériaux), pose-moi les questions manquantes en un bloc
compact, puis génère le devis final et l'Excel de calcul détaillé.`,
        },
        {
          kind: 'callout',
          title: 'La règle d’or',
          body:
            'Tu restes le décideur commercial. Le skill chiffre selon ton BPU et tes coefficients, mais le positionnement final — combien tu signes, sur quoi tu fais une remise, où tu mets ta marge — reste de ta responsabilité. Sur 5 minutes de relecture, tu ajusteras toujours une ou deux lignes : c’est normal, et c’est ton rôle de dirigeant.',
        },
      ],
    },
  ],

  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Le devis généré a-t-il une valeur juridique ?',
      a: 'Oui, exactement la même que celui que tu aurais rédigé à la main. Un devis devient juridiquement engageant à partir du moment où il est signé par le client — devis accepté vaut contrat formé. Peu importe l’outil qui l’a produit : Excel, Word, logiciel métier ou IA. Ce qui compte, c’est ta signature, ta validation finale et l’accord du client.',
    },
    {
      q: 'Comment intégrer ma bibliothèque Batiprix ou Le Moniteur ?',
      a: 'Si tu as un abonnement Batiprix ou un BPU type DTU, exporte les références qui te concernent en Excel et joins ce fichier au skill comme bibliothèque de référence. Le skill ira y chercher les prix en priorité, avant toute estimation générique. Pour les postes dont les prix bougent souvent (acier, cuivre, bois), prévois une mise à jour trimestrielle.',
    },
    {
      q: 'Le skill peut-il calculer un métré à partir de plans ?',
      a: 'Partiellement. Si tu déposes un plan PDF avec des cotes lisibles, Claude peut extraire les dimensions principales et estimer surfaces et volumes. Pour un métré précis — linéaire de plinthe, surface de carrelage avec découpes, hauteur sous plafond — il faut toujours le ressaisir ou passer par un logiciel de métré dédié. Le skill complète le métreur, il ne le remplace pas.',
    },
    {
      q: 'Couvre-t-il les marchés publics (DPGF, BPU, DQE) ?',
      a: 'Oui, à condition de le préciser dès le prompt initial. Les marchés publics ont leur propre format : DPGF, BPU, DQE. Donne au skill un exemple de DPGF déjà rendu sur un appel d’offres antérieur, et il calera sa structure sur les exigences du Code de la commande publique.',
    },
    {
      q: 'Mes prix et mes marges sont-ils confidentiels ?',
      a: 'C’est désormais un réglage, pas un acquis. Sur les formules grand public (Free, Pro, Max), Anthropic demande à chacun s’il accepte de partager ses conversations pour améliorer les modèles. Va dans Paramètres > Confidentialité pour vérifier ce réglage — et coupe-le si tu travailles sur des prix stratégiques. Les offres professionnelles (Team, Enterprise, API) sont exclues de l’entraînement par défaut.',
    },
    {
      q: 'Que faire si le client demande un avenant après signature ?',
      a: 'Procédure standard : tu appelles ton skill et tu lui demandes un avenant numéroté qui référence le devis initial (numéro et date), liste précisément les travaux ajoutés ou modifiés, chiffre l’écart et recalcule le nouveau total. L’avenant doit être signé par le client, comme le devis initial, pour avoir force contractuelle.',
    },
  ],

  cta: {
    eyebrow: 'ENVIE D’ALLER PLUS LOIN ?',
    title: 'On le construit ensemble',
    subtitle:
      'Formation en présentiel — Île-de-France — organisme certifié Qualiopi',
    programTitle: 'IA BTP : devis, emails et productivité — Niveau 1, 4 h',
    programItems: [
      'On construit ton skill devis ensemble, sur tes vrais prix et tes vrais chantiers.',
      'Calibrage de ton BPU, de tes coefficients et de ton template société.',
      'Tu repars avec un skill opérationnel et testé sur un de tes devis en cours.',
      'Intra-entreprise : session catalogue 4 h — financement OPCO / Constructys possible selon éligibilité.',
    ],
  },
};
