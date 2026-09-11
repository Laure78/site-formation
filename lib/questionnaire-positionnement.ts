import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';

/** URL unique du questionnaire de positionnement (Tally) — toutes les formations OFC. */
export const QUESTIONNAIRE_POSITIONNEMENT_URL =
  EXTERNAL_SITE_URLS.questionnairePositionnement;

export const QUESTIONNAIRE_POSITIONNEMENT_LABEL =
  'Questionnaire de positionnement — Formation IA BTP';

export const QUESTIONNAIRE_POSITIONNEMENT_MENTION =
  'Un questionnaire de positionnement est adressé à chaque participant avant la session.';

/** Ajoute la mention Qualiopi si elle n’est pas déjà présente dans le texte modalités d’accès. */
export function withQuestionnairePositionnementMention(modalitesAcces: string): string {
  const trimmed = modalitesAcces.trim();
  if (/questionnaire de positionnement/i.test(trimmed)) {
    return trimmed;
  }
  return `${trimmed} ${QUESTIONNAIRE_POSITIONNEMENT_MENTION}`;
}
