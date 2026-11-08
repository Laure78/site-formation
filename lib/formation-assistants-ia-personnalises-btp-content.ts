/**
 * Contenu centralisé — fiche catalogue NIV-09 assistants IA personnalisés BTP.
 *
 * Proposition pédagogique — validation Laure avant diffusion des supports PDF définitifs.
 * Référence PDF actuelle (nom historique) : programme_OFC_Assistants_IA_BTP_7h_20261022.pdf — à régénérer en 4 h.
 */
import { getFormationByCode, libelleEffectifFormation } from '@/data/formations';
import { SITE_INTER_LIEU_PREFIX } from '@/lib/site-config';

const NIV_09 = getFormationByCode('NIV-09')!;
const EFFECTIF_NIV09 = libelleEffectifFormation(NIV_09);

export const ASSISTANTS_IA_PROPOSITION_VALEUR =
  'Créez vos propres assistants IA pour les tâches quotidiennes de votre entreprise du BTP. Apprenez à utiliser ChatGPT et Claude pour concevoir des assistants adaptés à vos devis, comptes rendus de chantier, courriers, appels d\'offres et documents administratifs. Travaillez sur vos propres modèles et repartez avec une méthode et un plan de déploiement réaliste pour la suite.' as const;

export const ASSISTANTS_IA_HERO_FACTS = [
  '4 heures — demi-journée',
  'Présentiel',
  SITE_INTER_LIEU_PREFIX,
  `Jusqu'à ${NIV_09.effectifMax} participants`,
  'Environ 70 % de pratique',
  'ChatGPT Plus ou Claude Pro (ou compte entreprise) — un des deux suffit',
] as const;

export const ASSISTANTS_IA_OUTILS = 'ChatGPT · Claude' as const;

export const ASSISTANTS_IA_CREATIONS = [
  {
    title: '1 assistant métier opérationnel (visé en session)',
    text: 'Un premier assistant configuré et testé sur un cas réel, avec protocole de relecture — la généralisation à d’autres usages s’inscrit dans le plan d’action post-formation.',
  },
  {
    title: 'Bibliothèque de skills BTP',
    text: 'Skills prêts à téléverser dans ChatGPT ou Claude, personnalisables selon vos modèles.',
  },
  {
    title: 'Modèles et consignes réutilisables',
    text: 'Devis, CR, courriers et trames intégrés dans vos projets pour accélérer les prochains usages.',
  },
  {
    title: 'Plan d\'action individuel',
    text: 'Priorités sur 30 jours et règles de partage prudentes en équipe.',
  },
  {
    title: 'Accès plateforme 1 an',
    text: 'Supports, tutoriels, base de prompts et bibliothèque de skills après la session.',
  },
] as const;

export const ASSISTANTS_IA_OBJECTIFS = [
  'Utiliser les fonctionnalités clés de ChatGPT et de Claude (projets, skills, connecteurs) et choisir l’outil adapté à la tâche.',
  'Appliquer les bonnes pratiques de confidentialité et vérifier systématiquement les sorties de l’IA avant tout envoi.',
  'Concevoir les instructions d’un assistant IA personnalisé (rôle, ton, périmètre documentaire) aligné sur votre entreprise.',
  'Créer ou adapter un skill pour automatiser une tâche récurrente et en documenter l’usage.',
  'Tester un assistant sur un document métier réel et ajuster les consignes selon une grille de contrôle.',
  'Préparer un plan d’action de déploiement (qui fait quoi, quelles mises à jour, quelle traçabilité).',
] as const;

export const ASSISTANTS_IA_JOURNEE_TIMELINE = [
  '9h00 — 10h00 · Module 1 — Fonctionnalités, cadre et confidentialité (60 min)',
  '10h00 — 10h10 · Pause',
  '10h10 — 11h10 · Module 2 — Concevoir un assistant sur vos modèles (60 min)',
  '11h10 — 11h20 · Pause',
  '11h20 — 12h20 · Module 3 — Skills et mise en pratique sur un cas BTP (60 min)',
  '12h20 — 12h30 · Pause',
  '12h30 — 13h30 · Module 4 — Déploiement, évaluation des acquis et plan d’action (60 min)',
] as const;

export const ASSISTANTS_IA_MODULES = [
  {
    heading: 'Module 1 — Panorama outils, cadre d’usage et confidentialité',
    duree: '60 min — temps de formation effective',
    points: [
      'Projets, assistants / GPT, skills (« / ») et connecteurs : ce que chaque brique permet sur ChatGPT et Claude.',
      'Choisir l’outil selon la tâche (document long, réactivité, intégration messagerie/drive).',
      'Données sensibles, anonymisation et périmètre des pièces déposées — rappel RGPD et usage en entreprise.',
      'Démonstration guidée : créer un projet, y déposer un modèle anonymisé, premier test.',
    ],
    atelier: 'Livrable : fiche « avant d’envoyer un document à l’IA » + premier test sur un extrait anonymisé.',
  },
  {
    heading: 'Module 2 — Concevoir un assistant aligné sur votre entreprise',
    duree: '60 min — temps de formation effective',
    points: [
      'Définir rôle, ton, interdits et livrables attendus (vocabulaire BTP, charte).',
      'Intégrer des modèles : devis types, trames de CR, courriers — versioning et mises à jour.',
      'Méthode en trois passes : brouillon → correction des consignes → test sur cas réel.',
      'Construction collaborative d’un premier assistant sur le cas prioritaire du groupe.',
    ],
    atelier: 'Livrable : assistant prêt à être testé sur un document réel (hors données confidentielles non autorisées).',
  },
  {
    heading: 'Module 3 — Skills et automatisation d’une tâche métier',
    duree: '60 min — temps de formation effective',
    points: [
      'Règle d’or : un skill = une mission précise (relance, structure de CR, contrôle avant envoi…).',
      'Importer ou personnaliser un skill depuis la bibliothèque BTP fournie ; critères de qualité.',
      'Enchaînement prompt → skill → contrôle humain sur un lot court de tâches.',
      'Selon le temps et les besoins du groupe : mise au point sur un deuxième cas parmi les six familles (devis, CR, e-mails, AO, administratif chantier, communication) — pas l’ensemble la même demi-journée.',
    ],
    atelier: 'Livrable : au moins un skill opérationnel ou un brouillon validé pour finalisation en autonomie supervisée.',
  },
  {
    heading: 'Module 4 — Déploiement, évaluation des acquis et plan d’action',
    duree: '60 min — temps de formation effective',
    points: [
      'Partage en équipe : droits, référent, fréquence des mises à jour.',
      'Grille d’auto-évaluation sur les livrables produits en session.',
      'Plan d’action 30 jours : quels assistants ou skills généraliser, dans quel ordre, avec quels contrôles.',
      'Rappel : pas de promesse de nombre d’assistants « clé en main » — objectif méthode, qualité et traçabilité.',
    ],
    atelier: 'Livrable : plan d’action individuel et tableau de suivi des prochaines étapes.',
  },
] as const;

export type AssistantsIaAtelier = {
  id: string;
  title: string;
  description: string;
  usages: readonly string[];
  skills: readonly string[];
};

export const ASSISTANTS_IA_ATELIERS: readonly AssistantsIaAtelier[] = [
  {
    id: 'devis',
    title: 'Devis et chiffrage',
    description:
      'Rédiger et contrôler vos devis à partir de vos modèles et notes de visite.',
    usages: [
      'Devis détaillé à partir de notes de visite',
      'Contrôle avant envoi (postes, unités, mentions)',
    ],
    skills: ['Descriptif de devis', 'Contrôle de devis', 'Relance de devis', 'Avenant / travaux supplémentaires'],
  },
  {
    id: 'cr-chantier',
    title: 'Comptes rendus de chantier',
    description: 'Structurer vos CR et le suivi des actions et réserves.',
    usages: [
      'Notes en vrac ou message vocal → CR structuré',
      'Actions qui / quoi / quand, reprise des points non soldés',
    ],
    skills: ['CR de chantier', 'CR d\'intervention', 'Suivi des réserves', 'Ordre du jour de réunion'],
  },
  {
    id: 'emails',
    title: 'E-mails et courriers',
    description: 'Réponses et relances au ton de votre entreprise.',
    usages: [
      'Réponse client, relance paiement, réclamation',
      'Courrier sous-traitant avec formules validées',
    ],
    skills: ['Relance impayé', 'Réponse à réclamation', 'Courrier sous-traitant', 'Réponse à demande client'],
  },
  {
    id: 'ao',
    title: 'Appels d\'offres',
    description: 'Analyser le DCE et préparer la décision go / no go.',
    usages: [
      'Synthèse RC, CCTP, CCAP et critères de notation',
      'Points de vigilance et préparation du mémoire technique',
    ],
    skills: ['Analyse RC', 'Analyse CCTP', 'Go / No go', 'Mémoire technique'],
  },
  {
    id: 'admin-chantier',
    title: 'Administratif de chantier',
    description: 'Préparer les documents obligatoires sans repartir de zéro.',
    usages: [
      'Trames PPSPS, PIC, DOE, fiches qualité',
      'Planning de chantier et mises à jour',
    ],
    skills: ['PPSPS', 'PIC', 'DOE', 'Planning'],
  },
  {
    id: 'communication',
    title: 'Communication',
    description: 'Valoriser vos chantiers et votre présence en ligne.',
    usages: [
      'Posts réseaux sociaux à partir de photos de chantier',
      'Article web optimisé SEO, newsletter',
    ],
    skills: ['Post réseaux sociaux', 'Article SEO', 'Newsletter', 'Fiche référence chantier'],
  },
] as const;

export const ASSISTANTS_IA_ATELIERS_NOTE =
  'La demi-journée permet d’approfondir un ou deux cas parmi ces familles selon un questionnaire envoyé avant la session. Les six ne sont pas traités intégralement le même jour : le module 3 cible la priorité du groupe.' as const;

export const ASSISTANTS_IA_LIVRABLES = [
  'Un assistant métier testé sur un cas réel (avec grille de contrôle).',
  'Au moins un skill adapté ou prêt à finaliser après la session.',
  'Bibliothèque de skills BTP personnalisables (ChatGPT / Claude).',
  'Plan d’action individuel sur 30 jours.',
  'Accès individuel à la plateforme de formation pendant 1 an.',
  'Attestation individuelle de fin de formation.',
] as const;

export const ASSISTANTS_IA_PEDAGOGIE = [
  'Avant la session : questionnaire de recueil des attentes pour cadrer le module 3.',
  'Pendant : apports courts, démonstrations en direct, atelier sur vos documents (anonymisés si nécessaire).',
  'Après : accès plateforme 1 an (supports, prompts, tutoriels, skills BTP).',
  'Positionnement initial et validation des acquis sur les livrables produits.',
  'Questionnaire de satisfaction à chaud.',
  'Émargement et attestation individuelle.',
] as const;

export const ASSISTANTS_IA_PUBLIC_ITEMS = [
  'Professionnels du BTP : dirigeants et chefs d\'entreprise (tous corps d\'état)',
  'Conducteurs de travaux, chefs d\'équipe, chargés d\'affaires',
  'Assistant(e)s administratifs et travaux, conjoints collaborateurs',
  'Fonctions support du bâtiment',
] as const;

export const ASSISTANTS_IA_PREREQUIS_ITEMS = [
  'Savoir utiliser un ordinateur et naviguer sur internet',
  'Utilisation courante de l\'IA (ChatGPT ou Claude)',
  'Ordinateur portable',
  'Abonnement ChatGPT Plus ou Claude Pro (ou offre Team) actif avant la session — un des deux suffit (non inclus dans le tarif)',
] as const;

export const ASSISTANTS_IA_MODALITES = [
  `Présentiel — ${SITE_INTER_LIEU_PREFIX} · Intra : locaux de l'entreprise en Île-de-France`,
  `Effectif : ${EFFECTIF_NIV09}`,
  'Horaires : créneau demi-journée 4 h (matin ou après-midi selon convocation — 9h00–13h00 ou 13h30–17h30)',
  'Inscription via laureolivie.fr/contact jusqu\'à 7 jours avant la session, sous réserve de places',
  'Prise en charge possible par l\'OPCO compétent, notamment Constructys, selon les conditions d\'éligibilité applicables',
] as const;
