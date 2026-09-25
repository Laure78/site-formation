'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import type { EmailTemplateRow } from '@/lib/training-ops/satisfaction/settings';
import { saveEmailTemplateAction } from '@/app/admin/satisfaction/actions';
import { SendTestEmailForm } from '@/components/admin/satisfaction/SendTestEmailForm';

const LABELS: Record<string, string> = {
  questionnaire_initial: 'Questionnaire de satisfaction',
  questionnaire_reminder: 'Relance questionnaire',
  google_initial: "Demande d'avis Google",
  google_reminder: 'Relance avis Google',
};

export function EmailTemplateEditor({ template }: { template: EmailTemplateRow }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          await saveEmailTemplateAction(formData);
          router.refresh();
        });
      }}
      className="space-y-4"
    >
      <input type="hidden" name="template_key" value={template.template_key} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold text-slate-900">
            {LABELS[template.template_key] ?? template.template_key}
          </h2>
          <p className="text-xs text-slate-500">{template.template_key}</p>
        </div>
        <SendTestEmailForm templateKey={template.template_key} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_active" defaultChecked={template.is_active} />
        Modèle actif
      </label>
      <label className="block text-sm">
        Objet
        <input
          name="subject"
          defaultValue={template.subject}
          required
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        Corps HTML
        <textarea
          name="body_html"
          defaultValue={template.body_html}
          rows={6}
          required
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-xs"
        />
      </label>
      <label className="block text-sm">
        Corps texte
        <textarea
          name="body_text"
          defaultValue={template.body_text}
          rows={4}
          required
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-xs"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {pending ? 'Enregistrement…' : 'Enregistrer le modèle'}
      </button>
    </form>
  );
}
