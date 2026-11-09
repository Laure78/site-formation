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
      'Consultant LLMOps / Nexus OS (RAG, agents, Azure). Formateur MBWAY M1. Pas de parcours BTP sur le CV ; coordination territoriale / écologie.',
    availabilityHint: 'Île-de-France, disponible rapidement (CV).',
    strengths: ['Gouvernance IA, traçabilité', 'Transmission structurée', 'IDF'],
    vigilance: ['Hors cible BTP', 'Risque jargon technique', 'Pas devis/DCE/CR métier'],
    questions: [
      'Nommez trois documents BTP que vous maîtrisez.',
      'Expliquez l’IA à un chef de chantier de 55 ans en 5 min sans dire « RAG ».',
      'Pourquoi formateur BTP et pas consultant LLMOps ?',
    ],
    suggestedFormations: [],
    etape2Subject: 'Mail de relance client chantier avec Claude (si profil tenu).',
  },
  'formpro.contact@gmail.com': {
    cvSummary:
      'Cadre technique BTP / formateur prévention (SST, amiante, SSIAP) — Batamiante, Foncia, APAVE. Neuilly-sur-Marne. NDA 11931098393. Ligne « accompagnement chantier » (devis, mémo, PPSPS). Pas d’IA sur CV.',
    availabilityHint: '93 — proche IDF. À confirmer : créneaux animation IA vs prévention réglementaire.',
    strengths: ['Formateur certifié', 'NDA + SIRET', 'Lien chantier / PPSPS'],
    vigilance: ['Pas d’IA documentée', 'Cœur métier prévention, pas catalogue IA'],
    questions: [
      'Pourquoi postuler formateur IA BTP ?',
      'Usage de ChatGPT ou Claude sur PPSPS, mails ou devis ?',
      'Pouvez-vous animer ChatGPT + Claude pour encadrants BTP ?',
    ],
    suggestedFormations: [],
  },
  'louis.ndam@hotmail.fr': {
    cvSummary:
      'Reporting Grand Paris Express (SGP) depuis 2021 — suivi ETP (coûts, délais). Ex EDF risques. Formateur CNFPT (IA + Copilot) et GRETA. Lettre : transposition ateliers vers devis, CCTP, CR. Carrières-sous-Poissy (78).',
    availabilityHint:
      'Présentiel IDF (lettre). Stage CNFPT Est Ensemble 25 fév. et 9 mars 2027 — calendrier à croiser avec OFC.',
    strengths: ['Animation adultes CNFPT', 'Lien travaux via MOA GPE', 'Réflexes données / erreurs IA'],
    vigilance: ['Pas entreprise BTP', 'Copilot en formation — aligner ChatGPT/Claude', 'Vocabulaire PME bâtiment'],
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
