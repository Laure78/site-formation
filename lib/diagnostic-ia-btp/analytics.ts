import { getPagePath, sendGa4Event } from '@/lib/ga4-analytics';

export function trackDiagnosticStarted(): void {
  sendGa4Event('diagnostic_started', { page_path: getPagePath() });
}

export function trackDiagnosticRoleSelected(role: string): void {
  sendGa4Event('diagnostic_role_selected', { role, page_path: getPagePath() });
}

export function trackDiagnosticTaskSelected(taskCount: number): void {
  sendGa4Event('diagnostic_task_selected', {
    task_count: taskCount,
    page_path: getPagePath(),
  });
}

export function trackDiagnosticCompleted(trainingCode?: string): void {
  sendGa4Event('diagnostic_completed', {
    training_code: trainingCode,
    page_path: getPagePath(),
  });
}

export function trackDiagnosticTrainingClicked(href: string, trainingCode?: string): void {
  sendGa4Event('diagnostic_training_clicked', {
    training_href: href,
    training_code: trainingCode,
    page_path: getPagePath(),
  });
}

export function trackDiagnosticContactClicked(origin: string): void {
  sendGa4Event('diagnostic_contact_clicked', { origin, page_path: getPagePath() });
}
