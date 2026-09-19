'use client';

import { useTransition } from 'react';
import {
  setDefinitionDefaultEnabledAction,
  toggleDefinitionActiveAction,
} from '@/app/admin/mon-espace/suivi-administratif/actions';
import type { ChecklistDefinition } from '@/lib/admin/mon-espace/suivi-administratif';

/**
 * Configuration globale des items de checklist.
 * Les items désactivés ne sont plus proposés aux nouvelles sessions.
 */
export function SuiviConfigPanel({
  definitions,
}: {
  definitions: ChecklistDefinition[];
}) {
  const [pending, startTransition] = useTransition();

  if (definitions.length === 0) {
    return (
      <p className="text-sm text-amber-800">
        Catalogue checklist vide. Appliquez la migration{' '}
        <code className="font-mono text-xs">051_organisation_suivi_administratif.sql</code>.
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <h2 className="font-display text-base font-semibold text-slate-900">
        Configuration des étapes
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Activez uniquement les étapes pertinentes. « Par défaut » = proposé à l’ouverture
        d’une session ; vous pouvez toujours désactiver une étape cas par cas.
      </p>
      <ul className="mt-4 divide-y divide-slate-100">
        {definitions.map((d) => (
          <li
            key={d.id}
            className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-slate-900">{d.label}</p>
              <p className="text-xs capitalize text-slate-400">Phase · {d.phase}</p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-slate-600">
              <label className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={d.default_enabled}
                  disabled={pending}
                  onChange={(e) => {
                    const fd = new FormData();
                    fd.set('definition_id', d.id);
                    fd.set('default_enabled', e.target.checked ? 'true' : 'false');
                    startTransition(async () => {
                      await setDefinitionDefaultEnabledAction(fd);
                    });
                  }}
                  className="rounded border-slate-300 text-[#377CF3]"
                />
                Par défaut
              </label>
              <label className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={d.is_active}
                  disabled={pending}
                  onChange={(e) => {
                    const fd = new FormData();
                    fd.set('definition_id', d.id);
                    fd.set('is_active', e.target.checked ? 'true' : 'false');
                    startTransition(async () => {
                      await toggleDefinitionActiveAction(fd);
                    });
                  }}
                  className="rounded border-slate-300 text-[#377CF3]"
                />
                Actif au catalogue
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
