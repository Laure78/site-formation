/**
 * Contenu éditorial — tutoriel « Skill Claude pour préparer un PIC ».
 * Source unique pour la page `/ressources/tuto-skill-pic`.
 */
import { LINKS } from '@/lib/internal-links';

export const TUTO_SKILL_PIC_PATH = LINKS.tutoSkillPic;
export const TUTO_SKILL_PIC_SLUG = 'tuto-skill-pic';

/** Dates figées (pas de `new Date()`). */
export const TUTO_SKILL_PIC_PUBLISHED_AT = '2026-09-08';
export const TUTO_SKILL_PIC_UPDATED_AT = '2026-09-08';

export const TUTO_SKILL_PIC_META = {
  title: 'Créer un skill Claude pour préparer un PIC | Laure Olivié',
  description:
    'Apprenez à créer un skill Claude pour préparer votre plan d’installation de chantier : méthode, prompts à copier. Formation IA pour le BTP.',
  ogTitle: 'Créer un skill Claude pour préparer un PIC',
  ogDescription:
    'Méthode pas à pas, prompts à copier et points de contrôle pour organiser les infos chantier avec un skill Claude. Formation IA pour le BTP.',
  shortTitle: 'Skill PIC',
  h1: 'Créer un skill Claude pour préparer votre PIC',
  eyebrow: 'Tutoriel pratique • IA et préparation de chantier',
  intro:
    'Apprenez à créer un assistant réutilisable pour organiser les informations de votre chantier, préparer une trame de travail et repérer les points à vérifier.',
  disclaimer:
    'L’IA aide à préparer les documents. Les choix techniques, le plan et les vérifications restent sous la responsabilité des professionnels concernés.',
} as const;

export const TUTO_SKILL_PIC_CHECKLIST = [
  'Documents du chantier en cours (CCTP, plans, planning, notes de réunion).',
  'Plan avec échelle et dimensions lisibles (ou indication claire si l’échelle manque).',
  'Effectifs et phases prévisionnelles (qui intervient, quand, combien de temps).',
  'Contraintes d’accès et de livraison (voierie, créneaux, gabarits, riverains).',
  'Équipements et espaces nécessaires (base vie, stockage, engins, zones tampons).',
  'Consignes et documents de coordination applicables (PGC, PPSPS, notes SPS, etc.).',
  'Observations de terrain (visite, photos, points bloquants déjà repérés).',
  'Exemple interne utilisable comme référence de présentation (ancien dossier anonymisé).',
] as const;

export type TutoSkillPicStep = {
  number: 1 | 2 | 3 | 4 | 5;
  title: string;
  objectif: string;
  action: string;
  controle: string;
};

export const TUTO_SKILL_PIC_STEPS: readonly TutoSkillPicStep[] = [
  {
    number: 1,
    title: 'Définir le résultat attendu',
    objectif:
      'Clarifier ce que le skill doit produire à chaque usage : une trame de préparation PIC, un tableau des points à vérifier et une liste de questions — pas un plan technique signé.',
    action:
      'Écrivez en une phrase le livrable utile pour votre équipe (ex. : « trame de points à organiser avant le PIC, avec sources et manques »). Notez aussi ce que le skill ne doit jamais inventer (dimensions, emplacements, règles de sécurité).',
    controle:
      'Vous savez expliquer le résultat attendu à un collègue en moins d’une minute, sans parler de dessin réglementaire.',
  },
  {
    number: 2,
    title: 'Préparer les documents',
    objectif:
      'Réunir une base fiable pour un chantier réel (ou un dossier d’entraînement), en séparant modèles réutilisables et données propres au projet.',
    action:
      'Cochez la checklist ci-dessus. Retirez les données confidentielles inutiles. Si vous joignez un ancien exemple, indiquez clairement qu’il sert de format, pas de règle pour le nouveau chantier.',
    controle:
      'Chaque fichier joint a un rôle clair (référence de forme ou donnée du chantier). Les manques sont listés avant de lancer Claude.',
  },
  {
    number: 3,
    title: 'Rédiger les instructions du skill',
    objectif:
      'Enregistrer une méthode stable : rôle, livrables, règles de prudence et format de sortie.',
    action:
      'Créez un dossier de skill avec un fichier SKILL.md (frontmatter YAML : name + description, puis instructions en Markdown). Décrivez quand l’utiliser, ce qu’il doit produire, et l’obligation de signaler les informations manquantes. Empaquetez le dossier en ZIP selon la documentation Anthropic, puis activez le skill dans Claude (Personnaliser / Customize → Compétences / Skills).',
    controle:
      'La description du skill dit clairement le déclencheur (« préparation PIC », « installation de chantier ») et les limites (pas d’invention de dimensions ni d’exigences).',
  },
  {
    number: 4,
    title: 'Tester sur un cas connu',
    objectif:
      'Vérifier que le skill pose les bonnes questions et sépare faits, hypothèses et manques.',
    action:
      'Lancez le skill sur un chantier que vous connaissez. Joignez les documents. Relisez la trame, le tableau des points à vérifier et la liste de questions. Comparez avec votre propre lecture du dossier.',
    controle:
      'Aucune dimension ni exigence inventée. Les contradictions entre pièces sont signalées. Les propositions techniques restent à valider humainement.',
  },
  {
    number: 5,
    title: 'Corriger puis réutiliser',
    objectif:
      'Améliorer les instructions une fois, pour gagner du temps sur les prochains chantiers.',
    action:
      'Notez les erreurs ou oublis du test. Ajustez le SKILL.md (exemples, ordre des livrables, rappels de citation source/page). Réessayez sur un second dossier avant un usage en conditions réelles.',
    controle:
      'Le skill produit une sortie homogène sur deux dossiers différents, sans recopier un ancien chantier comme vérité.',
  },
] as const;

export const TUTO_SKILL_PIC_PROMPTS = [
  {
    id: 'creer',
    label: 'A. Créer le skill',
    title: 'Prompt — créer le skill PIC',
    text: `Tu m’aides à créer un skill Claude pour préparer un plan d’installation de chantier (PIC) dans le BTP.

Contexte entreprise : [raison sociale / métier / zone]
Public utilisateur du skill : [conducteur de travaux / chef de chantier / assistant travaux]
Résultat attendu à chaque usage :
1) une trame de préparation PIC (sections à renseigner) ;
2) un tableau des points à vérifier ;
3) une liste de questions à poser avant de finaliser.

Règles obligatoires :
- Pose toutes les questions nécessaires avant de conclure.
- Sépare clairement : FAITS (issus des documents), HYPOTHÈSES, INFORMATIONS MANQUANTES.
- Lorsque c’est identifiable, cite le document et la page (ou la feuille / le cartouche).
- N’invente aucune dimension, aucun emplacement, aucune exigence réglementaire ou technique.
- Repère et signale les contradictions entre documents.
- Ne présente jamais une sortie texte comme un plan technique exploitable à l’échelle.
- Toute proposition d’organisation doit porter la mention : « à vérifier par un professionnel compétent ».

À partir de mes consignes et des pièces jointes, rédige le contenu d’un SKILL.md (frontmatter name + description, puis instructions Markdown) prêt à être enregistré comme skill.`,
  },
  {
    id: 'utiliser',
    label: 'B. Utiliser pour un nouveau chantier',
    title: 'Prompt — nouveau chantier',
    text: `Utilise mon skill de préparation PIC.

Chantier : [nom / adresse / nature des travaux]
Dates prévisionnelles : [début / phases connues]
Pièces jointes : [liste des fichiers]
Contraintes déjà connues : [accès, livraisons, voisins, base vie, etc.]

Produis uniquement :
1) une trame de préparation PIC adaptée à ce chantier ;
2) un tableau des points à vérifier ;
3) une liste de questions avant conclusion.

Règles :
- Pose les questions manquantes avant de conclure.
- Sépare FAITS / HYPOTHÈSES / INFORMATIONS MANQUANTES.
- Cite document + page quand c’est possible.
- N’invente pas de dimensions ni d’exigences.
- Signale les contradictions entre pièces.
- Demande une vérification humaine de toute proposition technique ou d’implantation.`,
  },
  {
    id: 'reviser',
    label: 'C. Réviser après modification',
    title: 'Prompt — révision après changement',
    text: `Le chantier a évolué. Mets à jour la préparation PIC sans repartir de zéro.

Changements signalés : [planning / accès / effectifs / stockage / autre]
Documents ajoutés ou remplacés : [liste]
Version précédente de la trame : [coller ou joindre]

Livrables attendus :
1) trame actualisée (avec les sections touchées marquées) ;
2) tableau des points à vérifier mis à jour ;
3) liste de questions restantes.

Règles :
- Identifie ce qui reste valide, ce qui est caduc, et ce qui est nouveau.
- Sépare FAITS / HYPOTHÈSES / INFORMATIONS MANQUANTES.
- Cite document + page pour chaque fait identifiable.
- N’invente pas de dimensions ni d’exigences.
- Signale contradictions et écarts entre ancienne version et nouveaux documents.
- Rappelle qu’une vérification humaine est obligatoire avant toute décision d’implantation.`,
  },
] as const;

export const TUTO_SKILL_PIC_EXEMPLE = {
  titre: 'Cas fictif pédagogique — « Réhabilitation d’un local commercial, rue des Lilas »',
  avertissement:
    'Exemple inventé à des fins d’apprentissage. Aucune donnée réelle, aucune dimension réglementaire proposée.',
  rows: [
    {
      dispo: 'Adresse approximative et nature des travaux (réhabilitation intérieur).',
      manquant: 'Plan à l’échelle exploitable et surfaces précises.',
      action: 'Demander le plan PDF lisible ou une visite avec relevé validé.',
    },
    {
      dispo: 'Effectif prévu : 6 personnes en phase second œuvre.',
      manquant: 'Phasage détaillé et créneaux de livraison autorisés.',
      action: 'Recueillir le planning et les contraintes voirie auprès du CDT / MOA.',
    },
    {
      dispo: 'Accès rue étroite signalé oralement en réunion.',
      manquant: 'Confirmation écrite (gabarit, horaires, autorisations).',
      action: 'Tracer la question dans la liste et joindre la réponse au dossier.',
    },
    {
      dispo: 'Ancien PIC d’un autre chantier (format interne).',
      manquant: 'Adaptation au site actuel (ne pas recopier les implantations).',
      action: 'Utiliser l’ancien fichier comme modèle de présentation uniquement.',
    },
  ],
} as const;

export const TUTO_SKILL_PIC_FAQ = [
  {
    q: 'Faut-il savoir coder ?',
    a: 'Non. Un skill Claude repose surtout sur des instructions rédigées (fichier SKILL.md). L’essentiel est de décrire clairement la méthode, les livrables et les limites.',
  },
  {
    q: 'Que faire sans ancien PIC ?',
    a: 'Partez d’une trame vide et de vos documents chantier. L’IA peut proposer une structure de sections ; vous validez chaque point avec le terrain et la coordination.',
  },
  {
    q: 'L’IA peut-elle dessiner le plan ?',
    a: 'Ce tutoriel ne vise pas le dessin technique. Claude aide à organiser les informations et à repérer les manques. L’implantation et le plan restent du ressort des professionnels compétents.',
  },
  {
    q: 'Le résultat est-il directement utilisable ?',
    a: 'Non tel quel. Traitez la sortie comme une aide à la préparation : à relire, compléter et faire vérifier avant toute décision sur le chantier.',
  },
  {
    q: 'Comment actualiser les informations ?',
    a: 'Lorsque le chantier change, relancez le skill avec le prompt de révision, les nouveaux documents et la version précédente. Mettez aussi à jour le SKILL.md si la méthode d’équipe évolue.',
  },
  {
    q: 'Peut-on apprendre cette méthode en formation ?',
    a: 'Oui. En présentiel en Île-de-France, en groupe, en intra ou en interentreprises, je forme les équipes à utiliser l’IA sur leurs documents et situations de travail — y compris la création d’assistants réutilisables.',
  },
] as const;

/** Liens internes autorisés sur la page (une seule occurrence chacune). */
export const TUTO_SKILL_PIC_INTERNAL = {
  formation: LINKS.formationMaitriserClaudeAiBtp,
  formationLabel: 'Se former à l’IA dans le BTP',
  rdv: LINKS.prendreRdv,
  rdvLabel: 'Échanger sur votre besoin de formation',
} as const;
