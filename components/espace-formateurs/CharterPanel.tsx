'use client';

import { useTransition } from 'react';
import { acceptCharterAction } from '@/app/espace-formateurs/actions';
import type { ExtranetCharterAcceptanceRow, ExtranetCharterVersionRow } from '@/lib/extranet-formateurs/types';

export function CharterPanel({
  charter,
  acceptance,
}: {
  charter: ExtranetCharterVersionRow;
  acceptance: ExtranetCharterAcceptanceRow | null;
}) {
  const [pending, startTransition] = useTransition();

  const paragraphs = charter.content_md.split('\n').filter(Boolean);

  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-900">{charter.title}</h1>
        <p className="mt-2 text-sm text-slate-600">
          Version {charter.version_label} — publiée le{' '}
          {new Date(charter.published_at).toLocaleDateString('fr-FR')}
        </p>
      </header>

      <article className="prose prose-slate max-w-none rounded-xl border border-slate-200 bg-white p-6 shadow-sm prose-headings:font-display">
        {paragraphs.map((line) => {
          if (line.startsWith('# ')) {
            return (
              <h2 key={line} className="text-xl font-bold">
                {line.replace(/^#\s+/, '')}
              </h2>
            );
          }
          if (/^\d+\./.test(line.trim())) {
            return (
              <p key={line} className="text-sm leading-relaxed text-slate-700">
                {line}
              </p>
            );
          }
          return (
            <p key={line} className="text-sm leading-relaxed text-slate-700">
              {line}
            </p>
          );
        })}
      </article>

      <p className="text-xs text-slate-500">
        L&apos;acceptation ci-dessous atteste votre engagement ; elle ne constitue pas une signature
        électronique qualifiée. Le contrat de sous-traitance fait l&apos;objet d&apos;une signature
        distincte (document « Contrat de sous-traitance »).
      </p>

      {acceptance ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Charte acceptée le {new Date(acceptance.accepted_at).toLocaleString('fr-FR')} (version{' '}
          {charter.version_label}).
        </p>
      ) : (
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            startTransition(async () => {
              const res = await acceptCharterAction(charter.id);
              if (!res.ok) alert(res.error);
            });
          }}
          className="rounded-lg bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2d6ad8] disabled:opacity-60"
        >
          {pending ? 'Enregistrement…' : 'J’accepte la charte du formateur'}
        </button>
      )}
    </div>
  );
}
