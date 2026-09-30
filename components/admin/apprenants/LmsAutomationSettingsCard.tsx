'use client';

import { useTransition } from 'react';
import { saveLmsAutomationSettingsAction } from '@/app/admin/apprenants/actions';
import type { LmsAutomationSettings } from '@/lib/lms-automation-settings';

export function LmsAutomationSettingsCard({ settings }: { settings: LmsAutomationSettings }) {
  const [pending, startTransition] = useTransition();

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-display text-lg font-semibold text-slate-900">Automatisations LMS</h2>
      <p className="mt-1 text-sm text-slate-600">
        Invitations à l’ajout d’un participant de session · relance satisfaction J+1 (parcours LMS sans
        session ops).
      </p>
      <form
        className="mt-4 space-y-3"
        action={(fd) => {
          startTransition(async () => {
            await saveLmsAutomationSettingsAction(fd);
          });
        }}
      >
        <label className="flex items-center gap-2 text-sm text-slate-800">
          <input
            type="checkbox"
            name="invitation_auto_enabled"
            defaultChecked={settings.invitation_auto_enabled}
            disabled={pending}
          />
          Envoyer automatiquement l’invitation LMS lors de l’inscription à une session
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-800">
          <input
            type="checkbox"
            name="satisfaction_j1_enabled"
            defaultChecked={settings.satisfaction_j1_enabled}
            disabled={pending}
          />
          Activer la relance satisfaction J+1 (inscriptions LMS sans participant session ops)
        </label>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </form>
    </section>
  );
}
