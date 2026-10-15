/**
 * Contenu page `/skills-chatgpt-btp` — tutoriel + 6 Skills ChatGPT BTP.
 * Intention distincte de `/skills-claude-btp` (Claude) : méthode ChatGPT + modèles complémentaires.
 *
 * Disponibilité Skills ChatGPT (OpenAI Help Center, article Skills in ChatGPT) :
 * comptes Business, Enterprise, Healthcare et Edu éligibles, selon réglages d’espace de travail.
 */

export const SKILLS_CHATGPT_BTP_META = {
  title: 'Skills ChatGPT BTP : tutoriel et 6 modèles | Laure Olivié',
  description:
    'Apprenez à créer des Skills ChatGPT pour le BTP. Téléchargez le tutoriel et 6 modèles : budget chantier, fournisseurs, factures et sécurité.',
  h1: 'Créez vos Skills ChatGPT pour le BTP',
  eyebrow: 'Ressources gratuites · Skills ChatGPT BTP',
} as const;

export const SKILLS_CHATGPT_BTP_INTRO = {
  lead: 'Vous répétez les mêmes consignes pour préparer vos documents BTP ? Structurez votre méthode dans un Skill réutilisable. Découvrez le tutoriel et six modèles à adapter aux pratiques de votre entreprise.',
  disclaimer: 'Des modèles à personnaliser. Des résultats à vérifier avant utilisation.',
  auteur:
    'Laure Olivié — formatrice IA pour le BTP, OFC Création d’Entreprise (organisme certifié Qualiopi, actions de formation). Formations en présentiel en Île-de-France.',
} as const;

export const OPENAI_SKILLS_DOCS = {
  skillsHelp: {
    href: 'https://help.openai.com/en/articles/20001066-skills-in-chatgpt',
    label: 'OpenAI — Skills in ChatGPT',
  },
  buildSkills: {
    href: 'https://learn.chatgpt.com/docs/build-skills',
    label: 'OpenAI — Build skills',
  },
  projects: {
    href: 'https://help.openai.com/en/articles/10169521-chatgpt-projects',
    label: 'OpenAI — Projects in ChatGPT',
  },
  gpts: {
    href: 'https://help.openai.com/en/articles/8554407-gpts-in-chatgpt',
    label: 'OpenAI — GPTs in ChatGPT',
  },
} as const;

/** Comparatif vérifié — Skills / GPT / Projects (docs OpenAI). */
export const SKILLS_CHATGPT_COMPARATIF = [
  {
    term: 'Prompt',
    text: 'Demande ponctuelle dans une conversation. À reformuler à chaque fois.',
  },
  {
    term: 'Skill',
    text: 'Workflow réutilisable (instructions, exemples, éventuellement fichiers ou scripts). ChatGPT peut l’activer quand la demande correspond, selon votre espace.',
  },
  {
    term: 'GPT personnalisé',
    text: 'Assistant configuré avec instructions, fichiers et capacités. Utile si les Skills ne sont pas disponibles ; OpenAI annonce une évolution vers les plugins.',
  },
  {
    term: 'Projet',
    text: 'Espace de travail qui regroupe chats, fichiers et instructions pour un chantier ou un dossier long.',
  },
] as const;

export const SKILLS_CHATGPT_BENEFICES = [
  'Réutiliser une procédure sans tout retaper',
  'Harmoniser les formats de sortie dans l’équipe',
  'Préciser les sources à consulter',
  'Formaliser les contrôles avant envoi',
  'Faire évoluer les consignes au fil des retours',
] as const;

export const SKILLS_CHATGPT_STEPS = [
  {
    name: 'Vérifier les fonctions disponibles',
    text: 'Selon OpenAI, les Skills ChatGPT sont proposés aux comptes Business, Enterprise, Healthcare et Edu éligibles, sous réserve des réglages d’espace de travail. Si l’entrée Skills n’apparaît pas, demandez à l’administrateur ou utilisez un GPT / un Projet avec le même contenu d’instructions.',
  },
  {
    name: 'Choisir une tâche et réunir ses documents',
    text: 'Une tâche récurrente, un format de sortie stable, 2–3 documents finalisés anonymisés, vos phrases de déclenchement et vos interdits métier.',
  },
  {
    name: 'Rédiger les instructions et les déclencheurs',
    text: 'Un SKILL.md avec name, description (phrases naturelles de déclenchement), rôle, étapes, format de sortie et interdits. Les champs entre crochets restent à personnaliser.',
  },
  {
    name: 'Configurer ou importer selon l’environnement',
    text: 'Création via le chat (skill-creator), l’éditeur Skills, ou import d’un .zip depuis l’ordinateur — selon les options visibles sur votre compte. Un .zip = un skill.',
  },
  {
    name: 'Tester, corriger et organiser les mises à jour',
    text: 'Testez d’abord la méthode, puis sur des dossiers représentatifs autorisés. Corrigez le SKILL.md plutôt que le résultat à la main. Nommez un responsable de mise à jour.',
  },
] as const;

export const SKILLS_CHATGPT_GENERATOR_PROMPT = `Utilise skill-creator pour m'aider à créer un Skill.

Entreprise : [NOM], [MÉTIER BTP], [DÉPARTEMENT].
Tâche à automatiser : [DÉCRIRE LA TÂCHE].
Je la demande habituellement en écrivant :
« [PHRASE 1] », « [PHRASE 2] », « [PHRASE 3] ».
Sources à consulter : [DOSSIER / FICHIER / CONNECTEUR].
Format de sortie : [MAIL / TABLEAU / WORD] avec [STRUCTURE].
Ce qu'il ne faut jamais faire : [INTERDITS].

Rédige le SKILL.md complet en français : en-tête (name,
description avec les déclencheurs), rôle, étapes numérotées,
règles de format, interdits. Propose ensuite 3 cas de test.
Pose-moi tes questions une par une avant d'écrire.`;

export type SkillChatgptBtpCard = {
  slug: string;
  title: string;
  public: string;
  tache: string;
  documents: string;
  livrables: string;
  exemple: string;
  limite: string;
  zipHref: string;
};

const ZIP_BASE = '/skills/chatgpt' as const;

export const SKILLS_CHATGPT_BTP_CARDS: readonly SkillChatgptBtpCard[] = [
  {
    slug: 'travaux-supplementaires-ts',
    title: 'Travaux supplémentaires et modificatifs',
    public: 'Conducteur de travaux, chargé d’études de prix',
    tache:
      'Préparer une fiche TS, un chiffrage documenté, un courrier de transmission et un suivi.',
    documents: 'Demande (mail, CR, OS, plan), marché (CCAP/CCTP/DPGF), bordereau de prix interne',
    livrables: 'Fiche TS, courrier MOE/MOA, ligne de tableau de suivi',
    exemple: 'Prépare une fiche de travaux supplémentaires à partir de cette demande.',
    limite:
      'Ne garantit ni le paiement ni une qualification juridique : accord écrit avant exécution ; litige à traiter avec la direction ou un conseil.',
    zipHref: `${ZIP_BASE}/travaux-supplementaires-ts.zip`,
  },
  {
    slug: 'consultation-fournisseurs',
    title: 'Consultation fournisseurs et sous-traitants',
    public: 'Chargé d’études de prix, conducteur de travaux, dirigeant',
    tache: 'Préparer une demande de prix et comparer les offres à périmètre équivalent.',
    documents: 'CCTP/DPGF ou besoins, devis fournisseurs reçus',
    livrables: 'Demande de prix, tableau comparatif, questions et recommandation argumentée',
    exemple: 'Compare ces devis fournisseurs et liste les prestations manquantes.',
    limite: 'La décision d’achat reste humaine ; ne pas transmettre le prix d’un fournisseur à un autre.',
    zipHref: `${ZIP_BASE}/consultation-fournisseurs.zip`,
  },
  {
    slug: 'suivi-budget-chantier',
    title: 'Suivi du budget et de la marge chantier',
    public: 'Dirigeant, directeur technique, conducteur de travaux',
    tache: 'Comparer prévisions, dépenses et estimations à terminaison.',
    documents: 'Budget affaire, export comptable / factures / heures, situations facturées',
    livrables: 'Tableau de suivi, marge à terminaison, alertes et actions proposées',
    exemple: 'Prépare un point financier du chantier avec les écarts et les hypothèses.',
    limite: 'Les calculs dépendent des données fournies et des outils disponibles ; afficher chaque hypothèse.',
    zipHref: `${ZIP_BASE}/suivi-budget-chantier.zip`,
  },
  {
    slug: 'rapprochement-bl-factures',
    title: 'Rapprochement commandes, BL et factures',
    public: 'Comptable, assistante, conducteur de travaux',
    tache: 'Repérer les écarts de quantités, de prix et les doublons.',
    documents: 'Factures, bons de livraison, bons de commande / devis acceptés',
    livrables: 'Tableau de rapprochement, écarts chiffrés, mails de réclamation, statut proposé',
    exemple: 'Rapproche ces factures avec les commandes et les bons de livraison.',
    limite: 'La validation du paiement reste humaine.',
    zipHref: `${ZIP_BASE}/rapprochement-bl-factures.zip`,
  },
  {
    slug: 'journal-chantier-intemperies',
    title: 'Journal de chantier et intempéries',
    public: 'Conducteur de travaux, chef de chantier, assistante',
    tache: 'Structurer les faits quotidiens et réunir les justificatifs d’arrêt.',
    documents: 'Notes du jour, relevés météo sourcés, photos, effectifs',
    livrables: 'Fiche journal, dossier intempéries, courrier d’information MOE',
    exemple: 'Transforme mes notes du jour en journal de chantier.',
    limite:
      'Aucune garantie d’indemnisation ou de prolongation de délai : conditions à vérifier auprès de la caisse et de la MOE.',
    zipHref: `${ZIP_BASE}/journal-chantier-intemperies.zip`,
  },
  {
    slug: 'causerie-securite-chantier',
    title: 'Quart d’heure sécurité',
    public: 'Conducteur de travaux, chef de chantier, directeur technique',
    tache: 'Préparer une causerie, un émargement et un suivi des remontées.',
    documents: 'Phase de chantier, engins, coactivité, incidents récents, extraits DUERP/PPSPS si autorisés',
    livrables: 'Fiche causerie, émargement, tableau des remontées',
    exemple: 'Prépare une causerie adaptée à cette phase de chantier.',
    limite: 'Ne remplace ni le DUERP, ni le PPSPS, ni l’avis du préventeur / CSPS.',
    zipHref: `${ZIP_BASE}/causerie-securite-chantier.zip`,
  },
] as const;

export const SKILLS_CHATGPT_DOWNLOADS = {
  tutorielPdf: '/ressources/pdf/tutoriel-skills-chatgpt-btp-laure-olivie.pdf',
  packComplet: `${ZIP_BASE}/skills-chatgpt-btp-pack-complet.zip`,
} as const;

export const SKILLS_CHATGPT_BTP_IMAGE = {
  src: '/images/tutoriel-skills-chatgpt-btp-laure-olivie.webp',
  alt: 'Couverture du tutoriel Crée ton skill sur ChatGPT de Laure Olivié',
  width: 893,
  height: 1263,
  caption: 'Tutoriel PDF — créer un Skill ChatGPT pour une tâche BTP récurrente.',
} as const;

export const SKILLS_CHATGPT_PERSONNALISER = [
  'Compléter les champs entre crochets avec vos méthodes et modèles',
  'Ajouter uniquement les documents autorisés par votre entreprise',
  'Vérifier les sources et noter « À CONFIRMER » quand une donnée manque',
  'Tester le format produit (mail, tableau, fiche) avant diffusion',
  'Nommer un responsable de mise à jour du skill',
  'Valider les résultats avant envoi ou décision',
] as const;

export const SKILLS_CHATGPT_FAQ = [
  {
    q: 'Comment créer un Skill ChatGPT pour une entreprise du BTP ?',
    a: 'Choisissez une tâche récurrente, rédigez un SKILL.md (ou utilisez skill-creator), importez-le si votre espace le permet, puis testez sur des dossiers autorisés. Le tutoriel PDF détaille la méthode.',
  },
  {
    q: 'Que faire si la fonction Skills n’apparaît pas ?',
    a: 'La disponibilité dépend du type de compte et des réglages d’espace de travail (voir OpenAI Help Center). Demandez à l’administrateur d’activer les Skills, ou placez le même contenu en instructions d’un GPT ou d’un Projet en attendant.',
  },
  {
    q: 'Peut-on adapter ces modèles à son entreprise ?',
    a: 'Oui : complétez les zones entre crochets, ajoutez vos modèles autorisés et vos règles internes, puis retestez sur vos documents.',
  },
  {
    q: 'Peut-on les réutiliser dans Claude ?',
    a: 'Le format d’instructions SKILL.md est proche du standard Agent Skills. Vous pouvez importer un .zip dans Claude si votre environnement le permet. Les outils, connecteurs et comportements restent ceux de chaque plateforme : vérifiez le résultat après import.',
  },
  {
    q: 'Quels documents faut-il fournir ?',
    a: 'Ceux listés sur chaque carte (demande, devis, budget, BL, notes chantier, etc.), anonymisés si votre politique l’exige.',
  },
  {
    q: 'Faut-il vérifier les résultats ?',
    a: 'Oui. Chaque livrable est un brouillon : contrôlez sources, montants, engagements et destinataires avant envoi ou décision. Un Skill ne garantit ni exactitude ni confidentialité à lui seul.',
  },
] as const;

/** Points PDF à actualiser côté document source (non modifiés silencieusement). */
export const SKILLS_CHATGPT_PDF_UPDATE_NOTES = [
  'Le PDF mentionne Business, Enterprise et Edu ; OpenAI liste aussi Healthcare parmi les comptes éligibles.',
  'Éviter les formulations « 20 minutes », « 90 % du bénéfice » et « brouillon fiable » comme promesses sur le site.',
  'La compatibilité Claude/ChatGPT doit être présentée comme partage du format d’instructions, pas comme équivalence des outils.',
  'Les indicateurs de satisfaction / effectifs du PDF page 9 doivent rester alignés sur les sources Qualiopi du site avant republication.',
] as const;
