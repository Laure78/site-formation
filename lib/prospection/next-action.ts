import type { ProspectRow } from './types';

function startOfDay(d = new Date()) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d = new Date()) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

/** Libellé d’action affichable pour un prospect. */
export function resolveNextActionDisplay(p: ProspectRow): {
  label: string;
  kind: 'retard' | 'aujourdhui' | 'planifie' | 'statut' | 'aucune';
} {
  const now = new Date();
  const start = startOfDay(now);
  const end = endOfDay(now);

  if (p.prochaine_relance_at) {
    const d = new Date(p.prochaine_relance_at);
    if (d < start) {
      return { label: p.next_action || 'Relance en retard', kind: 'retard' };
    }
    if (d <= end) {
      return { label: p.next_action || 'Relance aujourd’hui', kind: 'aujourdhui' };
    }
    return {
      label: p.next_action || `Relance ${d.toLocaleDateString('fr-FR')}`,
      kind: 'planifie',
    };
  }

  if (p.next_action?.trim()) {
    return { label: p.next_action, kind: 'statut' };
  }

  const byStatut: Record<string, string> = {
    a_contacter: 'Envoyer premier email',
    email_envoye: 'Relancer',
    a_relancer: 'Relancer',
    reponse_recue: 'Traiter la réponse',
    rdv_prevu: 'Préparer RDV',
    opportunite: 'Faire avancer l’opportunité',
    proposition_envoyee: 'Suivre la proposition',
  };
  if (p.statut && byStatut[p.statut]) {
    return { label: byStatut[p.statut]!, kind: 'statut' };
  }
  return { label: 'Sans prochaine action', kind: 'aucune' };
}
