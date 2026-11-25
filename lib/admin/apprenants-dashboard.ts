/**
 * Préparation liste admin `/admin/apprenants` — une ligne par apprenant.
 */

export type ApprenantAccessBadge = {
  label: string;
  color: string;
};

export type ApprenantEnrollmentLine = {
  title: string;
  progress: number;
};

export type ApprenantListRow = {
  id: string;
  name: string;
  email: string;
  createdLabel: string;
  enrollments: ApprenantEnrollmentLine[];
  lastActivityLabel: string;
  access: ApprenantAccessBadge;
  showResend: boolean;
  pendingInvitation:
    | {
        id: string;
        email: string;
        first_name: string | null;
        last_name: string | null;
        formation_id: string | null;
        status: string;
        sent_count: number;
        expires_at: string;
        courses: { title: string };
      }
    | null;
};

export function getApprenantAccessBadge(accountStatus: string | null | undefined): ApprenantAccessBadge {
  if (accountStatus === 'active') {
    return { label: 'Actif', color: 'text-emerald-800 bg-emerald-50 border-emerald-200' };
  }
  if (accountStatus === 'disabled') {
    return { label: 'Désactivé', color: 'text-rose-800 bg-rose-50 border-rose-200' };
  }
  if (accountStatus === 'invited') {
    return { label: 'Invitation', color: 'text-amber-900 bg-amber-50 border-amber-200' };
  }
  return { label: 'À inviter', color: 'text-slate-700 bg-slate-50 border-slate-200' };
}

export function formatAdminShortDate(iso: string | undefined | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}