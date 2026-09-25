import type { GoogleStatus, QuestionnaireStatus } from '@/lib/training-ops/satisfaction/types';

const Q_LABELS: Record<QuestionnaireStatus, string> = {
  a_envoyer: 'À envoyer',
  programme: 'Programmé',
  envoye: 'Envoyé',
  a_relancer: 'À relancer',
  relance_1_envoyee: 'Relance 1 envoyée',
  relance_2_envoyee: 'Relance 2 envoyée',
  complete: 'Complété',
  sans_reponse: 'Sans réponse',
  desactive: 'Désactivé',
  echec_envoi: 'Échec d’envoi',
};

const G_LABELS: Record<GoogleStatus, string> = {
  non_eligible: 'Non éligible',
  a_programmer: 'À programmer',
  programme: 'Programmé',
  envoye: 'Envoyé',
  relance_envoyee: 'Relancé',
  termine: 'Terminé',
  desactive: 'Désactivé',
  echec_envoi: 'Échec d’envoi',
};

export function questionnaireStatusLabel(s: QuestionnaireStatus): string {
  return Q_LABELS[s] ?? s;
}

export function googleStatusLabel(s: GoogleStatus): string {
  return G_LABELS[s] ?? s;
}

export function questionnaireStatusTone(
  s: QuestionnaireStatus,
): 'slate' | 'blue' | 'amber' | 'emerald' | 'red' | 'violet' {
  if (s === 'complete') return 'emerald';
  if (s === 'echec_envoi') return 'red';
  if (s === 'desactive') return 'slate';
  if (s === 'sans_reponse') return 'violet';
  if (s === 'a_relancer' || s === 'a_envoyer') return 'amber';
  if (s.startsWith('relance')) return 'blue';
  return 'blue';
}

export function googleStatusTone(
  s: GoogleStatus,
): 'slate' | 'blue' | 'amber' | 'emerald' | 'red' {
  if (s === 'termine') return 'emerald';
  if (s === 'echec_envoi') return 'red';
  if (s === 'desactive' || s === 'non_eligible') return 'slate';
  if (s === 'a_programmer') return 'amber';
  return 'blue';
}
