/** Contenu d’aide à l’entretien — jour type 9/11/2026 (usage admin recrutement). */

export const INTERVIEW_DEROULE_30_MIN = [
  { range: '0–2 min', title: 'Accueil', detail: 'Déroulé, étape 2 si retenu (20 min séquence + 10 min échange).' },
  { range: '2–12 min', title: 'Parcours', detail: 'BTP, IA, écarts CV / réponses.' },
  { range: '12–22 min', title: 'Animation & catalogue', detail: 'Gestion de groupe, formations souhaitées, alignement ChatGPT + Claude / CRAFT.' },
  { range: '22–30 min', title: 'Zone, dispos, suite', detail: 'Organisation, NDA, mobilité IDF 2027, conditions.' },
] as const;

export type RecruitmentInterviewPrep = {
  readonly cvSummary: string;
  readonly availabilityHint: string;
  readonly strengths: readonly string[];
  readonly vigilance: readonly string[];
  readonly questions: readonly string[];
  readonly suggestedFormations: readonly string[];
  readonly etape2Subject?: string;
};

function normEmail(email: string): string {
  return email.trim().toLowerCase();
}

const PREP_BY_EMAIL: Record<string, RecruitmentInterviewPrep> = {
  'virginie.waechter@gmail.com': {
    cvSummary:
      'Ingénieure ENGEES, ~24 ans TP/GC : DG PME, dir. op. terrassement (11), DP DEME/NGE (EOLE 75), dir. travaux A61. Management, interfaces, budget. IA et animation absentes du CV.',
    availabilityHint: 'Dernières bases Aude (11) — à confirmer : mobilité présentiel Paris 12e, calendrier 2027, statut / NDA.',
    strengths: ['Crédibilité grands projets et PME', 'Vocabulaire MOA/entreprises travaux', 'Anglais courant'],
    vigilance: ['Pas de formation IA documentée', 'Passage manager → formatrice', 'Rayon géographique'],
    questions: [
      'Pourquoi la formation IA BTP maintenant ?',
      'Exemple récent de tension coût/délai avec une entreprise de travaux.',
      'Avez-vous déjà animé une formation payante ? Public, durée, thème ?',
      'ChatGPT ou Claude : un cas d’usage concret sur chantier ou AO ?',
      'Combien de jours/mois en présentiel IDF en 2027 ?',
    ],
    suggestedFormations: ['niv-03', 'niv-02', 'niv-05'],
    etape2Subject: 'Prioriser une semaine de conducteur de travaux avec l’IA (sans survendre).',
  },
  'stephaniebarge@passion-referencement.fr': {
    cvSummary:
      'BTP depuis 2000, associée LANDSCAPE TERRASSEMENTS (06). IA quotidienne : skills Claude (devis, DCE, factures, CR). Formatrice depuis 2023, NDA 93061254106, Activatrice France Num.',
    availabilityHint:
      'Basée Grasse (06). CV : présentiel et distanciel — OFC = présentiel IDF uniquement : jours/mois Paris, frais, stages Elephord/Perfodiet en parallèle.',
    strengths: ['Cas métier BTP très concrets', 'Pédagogie ateliers', 'NDA PACA'],
    vigilance: ['Mobilité IDF', 'Stack large (Make, Gemini) vs catalogue OFC', 'Public paysage/TP vs bâtiment IDF'],
    questions: [
      'Combien de jours/mois acceptez-vous à Paris 12e en 2027 ?',
      'Démo 3 min : devis à partir d’une note chantier avec Claude.',
      'Comment gérez-vous un DCE confidentiel en salle ?',
      'Acceptez-vous d’enseigner sans promouvoir Claude Code / Make en session OFC ?',
    ],
    suggestedFormations: ['niv-01', 'niv-02', 'niv-04', 'niv-10'],
    etape2Subject: 'Devis à partir d’une note manuscrite chantier.',
  },
  'lrafaelpeytavin@gmail.com': {
    cvSummary:
      'Développement d’outils IA (Codex, GitHub). Projets hébergés sur GitHub. Expérience BTP non confirmée — profil à évaluer pour la pédagogie métier OFC.',
    availabilityHint: 'IDF · disponibilité rapide. Préavis à préciser.',
    strengths: ['Développement technique', 'Création d’outils IA'],
    vigilance: [
      'Pas de parcours BTP documenté',
      'Ne pas présenter comme expert BTP sans preuve',
      'Adéquation animation présentiel artisans/dirigeants',
    ],
    questions: [
      'Quel outil IA avez-vous livré pour un usage métier non technique ?',
      'Expliquez ChatGPT à un dirigeant BTP sans jargon développeur.',
      'Avez-vous déjà animé une formation payante ? Durée, public.',
      'Zone d’intervention IDF et jours/mois en 2027.',
    ],
    suggestedFormations: [],
    etape2Subject: 'Vulgariser une fonctionnalité GitHub/Codex pour un cas chantier (si profil retenu).',
  },
  'formpro.contact@gmail.com': {
    cvSummary:
      'Chef d’entreprise dans le bâtiment — expertise opérationnelle et terrain. NDA déclaré (numéro à confirmer). Outils IA non renseignés.',
    availabilityHint: 'Disponibilité rapide — préavis à préciser. Zone d’intervention à confirmer.',
    strengths: ['Connaissance métiers bâtiment', 'Expérience de direction', 'Expertise terrain'],
    vigilance: ['Outils IA non documentés', 'Expérience pédagogique à qualifier', 'Numéro NDA à vérifier'],
    questions: [
      'Spécialités métier et type d’entreprises que vous connaissez le mieux.',
      'Avez-vous déjà animé une formation (thème, durée, public) ?',
      'Usage concret de ChatGPT ou Claude sur devis, CR ou mails chantier ?',
      'Combien de jours/mois en présentiel Paris 12e en 2027 ?',
    ],
    suggestedFormations: ['niv-01', 'niv-02'],
  },
  'louis.ndam@hotmail.fr': {
    cvSummary:
      'Formateur CNFPT — IA et tableaux de bord assistés. Outils : Claude, Copilot Business, ChatGPT. NDA en cours d’instruction (ne pas présenter comme NDA actif).',
    availabilityHint: '1 à 2 jours, préavis 1 mois minimum. Présentiel IDF.',
    strengths: ['Expérience de formation', 'Plusieurs solutions IA', 'Tableaux de bord'],
    vigilance: ['NDA en instruction', 'Expérience BTP entreprise à confirmer', 'Aligner démos sur ChatGPT/Claude OFC'],
    questions: [
      'Exemple d’échange mensuel avec une entreprise de travaux sur le GPE.',
      'Démo ChatGPT ou Claude (pas Copilot) : synthèse ou CR chantier.',
      'Quels parcours métiers catalogue 2027 visez-vous ?',
      'NDA, statut indép., tarif jour.',
    ],
    suggestedFormations: ['niv-01', 'niv-02', 'niv-03'],
    etape2Subject: 'Repérer les erreurs de l’IA sur un extrait de CCTP.',
  },
};

export function getRecruitmentInterviewPrep(email: string | null | undefined): RecruitmentInterviewPrep | null {
  if (!email) return null;
  return PREP_BY_EMAIL[normEmail(email)] ?? null;
}
