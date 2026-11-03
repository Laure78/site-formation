'use client';

import { useMemo, useTransition } from 'react';
import {
  DOC_TYPE_LABELS,
  DOC_STATUS_LABELS,
  requiredDocTypesForTrainer,
  type ExtranetDocType,
} from '@/lib/extranet-formateurs/document-types';
import type { ExtranetDocumentRow, ExtranetTrainerRow } from '@/lib/extranet-formateurs/types';
import {
  getExtranetDocumentSignedUrlAction,
  uploadExtranetDocumentAction,
} from '@/app/espace-formateurs/actions';
import { ExtranetRgpdNotice } from './RgpdNotice';

function latestDocs(docs: ExtranetDocumentRow[]): Map<ExtranetDocType, ExtranetDocumentRow> {
  const map = new Map<ExtranetDocType, ExtranetDocumentRow>();
  for (const d of docs) {
    if (d.status === 'superseded') continue;
    const prev = map.get(d.doc_type);
    if (!prev || d.version > prev.version) map.set(d.doc_type, d);
  }
  return map;
}

export function DocumentsPanel({
  trainer,
  docs,
}: {
  trainer: ExtranetTrainerRow;
  docs: ExtranetDocumentRow[];
}) {
  const [pending, startTransition] = useTransition();
  const required = useMemo(
    () =>
      requiredDocTypesForTrainer({
        requires_urssaf_vigilance: trainer.requires_urssaf_vigilance,
        requires_rc_pro: trainer.requires_rc_pro,
        requires_qualiopi_certificate: trainer.requires_qualiopi_certificate,
        requires_pedagogy_proof: trainer.requires_pedagogy_proof,
        nda_status: trainer.nda_status,
      }),
    [trainer]
  );
  const byType = useMemo(() => latestDocs(docs), [docs]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-slate-900">Mes documents</h1>
        <p className="mt-2 text-sm text-slate-600">
          Dépôt sécurisé — seules les pièces requises pour votre situation sont listées ci-dessous.
        </p>
      </header>

      <ul className="space-y-4">
        {required.map((docType) => {
          const current = byType.get(docType);
          return (
            <li key={docType} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-slate-900">{DOC_TYPE_LABELS[docType]}</h2>
                  {current ? (
                    <p className="mt-1 text-sm text-slate-600">
                      v{current.version} — {DOC_STATUS_LABELS[current.status]} —{' '}
                      {new Date(current.uploaded_at).toLocaleDateString('fr-FR')}
                    </p>
                  ) : (
                    <p className="mt-1 text-sm text-amber-700">Document manquant</p>
                  )}
                  {current?.admin_comment ? (
                    <p className="mt-2 text-sm text-slate-700">Commentaire OFC : {current.admin_comment}</p>
                  ) : null}
                </div>
                {current ? (
                  <button
                    type="button"
                    className="text-sm font-medium text-[#377CF3] hover:underline"
                    onClick={() => {
                      startTransition(async () => {
                        const res = await getExtranetDocumentSignedUrlAction(current.id);
                        if (res.ok) window.open(res.url, '_blank', 'noopener,noreferrer');
                      });
                    }}
                  >
                    Télécharger
                  </button>
                ) : null}
              </div>

              <form
                className="mt-4 flex flex-wrap items-end gap-3 border-t border-slate-100 pt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  fd.set('doc_type', docType);
                  startTransition(async () => {
                    const res = await uploadExtranetDocumentAction(fd);
                    if (!res.ok) alert(res.error);
                    else e.currentTarget.reset();
                  });
                }}
              >
                <input type="hidden" name="doc_type" value={docType} />
                <label className="text-sm">
                  <span className="font-medium text-slate-700">Fichier (PDF, Word, image)</span>
                  <input
                    type="file"
                    name="file"
                    required
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                    className="mt-1 block text-sm"
                  />
                </label>
                <label className="text-sm">
                  <span className="font-medium text-slate-700">Expiration (optionnel)</span>
                  <input type="date" name="expires_at" className="mt-1 rounded-lg border border-slate-200 px-2 py-1.5" />
                </label>
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {current ? 'Remplacer' : 'Déposer'}
                </button>
              </form>
            </li>
          );
        })}
      </ul>

      <ExtranetRgpdNotice />
    </div>
  );
}
