import type { DashboardCompleteness } from './completeness';
import type { ExtranetMissionDocumentRow, ExtranetMissionRow } from './phase2-types';
import type { MissionFeedbackRow, SubcontractorControlRow } from './phase3-types';
import type { ExtranetTrainerRow } from './types';
import { LINKS } from '@/lib/internal-links';

export const QUALIOPI_INDICATOR_LABELS = {
  ind21: {
    code: '21',
    title: 'Compétences des intervenants',
    summary:
      'OFC évalue et suit les compétences des formateurs (expérience BTP, IA, pédagogie) pour garantir l’adéquation avec les missions.',
  },
  ind27: {
    code: '27',
    title: 'Sous-traitance et sélection',
    summary:
      'Constitution du dossier, contrôle administratif et contractualisation avant toute intervention — validation humaine par l’équipe OFC.',
  },
  ind30: {
    code: '30',
    title: 'Analyse des prestations',
    summary:
      'Après chaque intervention : retour formateur, pièces de session (émargement, évaluation) et compte rendu pour amélioration continue.',
  },
  ind31: {
    code: '31–32',
    title: 'Actions d’amélioration',
    summary:
      'Plans d’action partagés avec vous lorsque l’audit interne ou vos retours le nécessitent.',
  },
} as const;

export type QualiopiChecklistItem = {
  id: string;
  label: string;
  ok: boolean;
  indicator?: string;
  href?: string;
  detail?: string;
};

export type InterventionReadiness = {
  canIntervene: boolean;
  checklist: QualiopiChecklistItem[];
  blockers: string[];
};

export function computeInterventionReadiness(input: {
  trainer: Pick<ExtranetTrainerRow, 'admin_validation_status'>;
  charterAccepted: boolean;
  completeness: DashboardCompleteness;
  subcontractorControl: SubcontractorControlRow | null;
}): InterventionReadiness {
  const { trainer, charterAccepted, completeness, subcontractorControl } = input;

  const allDocsApproved = completeness.missingCount === 0 && completeness.pendingCount === 0;

  const adminOk = trainer.admin_validation_status === 'approved';
  const subcontractOk =
    !subcontractorControl ||
    subcontractorControl.validation_status === 'validated' ||
    subcontractorControl.validation_status === 'draft';

  const checklist: QualiopiChecklistItem[] = [
    {
      id: 'charte',
      label: 'Charte du formateur acceptée',
      ok: charterAccepted,
      indicator: 'Procédures internes',
      href: LINKS.espaceFormateursCharte,
    },
    {
      id: 'dossier',
      label: 'Dossier documentaire complet (pièces déposées)',
      ok: completeness.missingCount === 0,
      indicator: QUALIOPI_INDICATOR_LABELS.ind27.code,
      href: LINKS.espaceFormateursDocuments,
      detail:
        completeness.missingCount > 0
          ? `${completeness.missingCount} pièce(s) manquante(s)`
          : completeness.pendingCount > 0
            ? `${completeness.pendingCount} en attente de validation OFC`
            : undefined,
    },
    {
      id: 'validation',
      label: 'Validation du dossier par l’équipe OFC',
      ok: adminOk,
      indicator: QUALIOPI_INDICATOR_LABELS.ind27.code,
      detail:
        trainer.admin_validation_status === 'pending'
          ? 'En attente'
          : trainer.admin_validation_status === 'in_review'
            ? 'Examen en cours'
            : trainer.admin_validation_status === 'blocked'
              ? 'Dossier bloqué — contactez OFC'
              : undefined,
    },
    {
      id: 'subcontract',
      label: 'Fiche de contrôle sous-traitance à jour',
      ok: subcontractOk,
      indicator: QUALIOPI_INDICATOR_LABELS.ind27.code,
      href: LINKS.espaceFormateursConformite,
      detail: subcontractorControl
        ? subcontractorControl.validation_status === 'needs_action'
          ? 'Actions correctives demandées par OFC'
          : subcontractorControl.validation_status === 'validated'
            ? `Validée le ${new Date(subcontractorControl.validated_at ?? subcontractorControl.created_at).toLocaleDateString('fr-FR')}`
            : 'Brouillon — en cours côté OFC'
        : 'Sera établie par OFC avant la première mission',
    },
    {
      id: 'competency',
      label: 'Dossier de compétences (profil + évaluations)',
      ok: completeness.percent >= 70,
      indicator: QUALIOPI_INDICATOR_LABELS.ind21.code,
      href: LINKS.espaceFormateursProfil,
    },
  ];

  const blockers: string[] = [];
  if (!charterAccepted) blockers.push('Acceptez la charte du formateur.');
  if (completeness.missingCount > 0) blockers.push('Complétez les pièces manquantes de votre dossier.');
  if (!adminOk) blockers.push('Votre dossier doit être validé par OFC avant intervention.');
  if (subcontractorControl?.validation_status === 'needs_action') {
    blockers.push('La fiche de contrôle sous-traitance demande des actions de votre part.');
  }

  const canIntervene =
    charterAccepted &&
    adminOk &&
    allDocsApproved &&
    subcontractorControl?.validation_status !== 'needs_action';

  return { canIntervene, checklist, blockers };
}

export type MissionSessionCheckItem = {
  id: string;
  label: string;
  ok: boolean;
  indicator: string;
  hint?: string;
};

export function computeMissionSessionChecklist(
  mission: ExtranetMissionRow,
  documents: ExtranetMissionDocumentRow[],
  feedback: MissionFeedbackRow | null
): MissionSessionCheckItem[] {
  const hasKind = (k: string) => documents.some((d) => d.doc_kind === k);

  const pastOrActive = ['confirmed', 'in_progress', 'completed'].includes(mission.status);

  const items: MissionSessionCheckItem[] = [
    {
      id: 'prep',
      label: 'Préparation pédagogique confirmée',
      ok: Boolean(mission.preparation_confirmed_at),
      indicator: 'Avant session',
      hint: 'Confirmez avoir lu le programme et les consignes.',
    },
  ];

  if (pastOrActive) {
    items.push(
      {
        id: 'attendance',
        label: 'Feuille d’émargement déposée',
        ok: hasKind('attendance_sheet'),
        indicator: 'Ind. 11',
        hint: 'Scan ou PDF signé — présentiel.',
      },
      {
        id: 'assessment',
        label: 'Évaluation des acquis',
        ok: hasKind('learning_assessment'),
        indicator: 'Ind. 11',
      },
      {
        id: 'report',
        label: 'Compte rendu formateur',
        ok: Boolean(mission.trainer_report?.trim()) || hasKind('trainer_report_file'),
        indicator: 'Ind. 30',
      },
      {
        id: 'feedback',
        label: 'Retour d’expérience Qualiopi',
        ok: Boolean(feedback),
        indicator: 'Ind. 30',
        hint: 'Rubrique Qualité — difficultés, adaptations, propositions.',
      }
    );
  }

  return items;
}

export const QUALITY_ACTION_STATUS_LABELS = {
  open: 'Ouvert',
  in_progress: 'En cours',
  closed: 'Clôturé',
} as const;

export const SUBCONTRACT_VALIDATION_LABELS = {
  draft: 'En cours d’établissement (OFC)',
  validated: 'Validée',
  needs_action: 'Actions correctives requises',
} as const;