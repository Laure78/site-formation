'use client';

import { useTransition } from 'react';
import {
  getExtranetAdminDocumentSignedUrlAction,
  reviewExtranetDocumentAction,
  updateExtranetTrainerAdminAction,
} from '@/app/admin/formateurs/actions';
import {
  DOC_STATUS_LABELS,
  DOC_TYPE_LABELS,
  NDA_STATUS_LABELS,
} from '@/lib/extranet-formateurs/document-types';
import type { ExtranetDocumentRow, ExtranetTrainerRow } from '@/lib/extranet-formateurs/types';

export function TrainerAdminPanel({
  trainer,
  documents,
}: {
  trainer: ExtranetTrainerRow;
  documents: ExtranetDocumentRow[];
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-slate-900">Paramètres administratifs</h2>
        <form
          className="mt-4 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            startTransition(async () => {
              await updateExtranetTrainerAdminAction(trainer.id, {
                nda_status: fd.get('nda_status') as ExtranetTrainerRow['nda_status'],
                admin_validation_status: fd.get('admin_validation_status') as ExtranetTrainerRow['admin_validation_status'],
                first_contract_at: String(fd.get('first_contract_at') || '') || null,
                nda_declaration_deadline: String(fd.get('nda_declaration_deadline') || '') || null,
                requires_urssaf_vigilance: fd.get('requires_urssaf_vigilance') === 'on',
                requires_rc_pro: fd.get('requires_rc_pro') === 'on',
                requires_qualiopi_certificate: fd.get('requires_qualiopi_certificate') === 'on',
                requires_pedagogy_proof: fd.get('requires_pedagogy_proof') === 'on',
                admin_notes: String(fd.get('admin_notes') || '') || null,
              });
            });
          }}
        >
          <label className="text-sm">
            Statut NDA
            <select name="nda_status" defaultValue={trainer.nda_status} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
              {Object.entries(NDA_STATUS_LABELS).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            Validation dossier
            <select
              name="admin_validation_status"
              defaultValue={trainer.admin_validation_status}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            >
              <option value="pending">En attente</option>
              <option value="in_review">En revue</option>
              <option value="approved">Validé pour intervention</option>
              <option value="blocked">Bloqué</option>
            </select>
          </label>
          <label className="text-sm">
            Première contractualisation
            <input
              type="date"
              name="first_contract_at"
              defaultValue={trainer.first_contract_at ?? ''}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="text-sm">
            Échéance déclaration NDA
            <input
              type="date"
              name="nda_declaration_deadline"
              defaultValue={trainer.nda_declaration_deadline ?? ''}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <div className="space-y-2 text-sm sm:col-span-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="requires_rc_pro" defaultChecked={trainer.requires_rc_pro} />
              RC pro requise
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="requires_urssaf_vigilance" defaultChecked={trainer.requires_urssaf_vigilance} />
              Attestation URSSAF requise
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="requires_qualiopi_certificate" defaultChecked={trainer.requires_qualiopi_certificate} />
              Certificat Qualiopi requis
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="requires_pedagogy_proof" defaultChecked={trainer.requires_pedagogy_proof} />
              Justificatif pédagogique requis
            </label>
          </div>
          <label className="text-sm sm:col-span-2">
            Notes internes
            <textarea
              name="admin_notes"
              rows={3}
              defaultValue={trainer.admin_notes ?? ''}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white sm:col-span-2 disabled:opacity-60"
          >
            Enregistrer
          </button>
        </form>
        <p className="mt-4 text-xs text-slate-500">
          Aucune conformité Qualiopi automatique — validation humaine et documentée obligatoire.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-slate-900">Documents</h2>
        <ul className="mt-4 space-y-3">
          {documents.filter((d) => d.status !== 'superseded').length === 0 ? (
            <li className="text-sm text-slate-500">Aucun document déposé.</li>
          ) : (
            documents
              .filter((d) => d.status !== 'superseded')
              .map((doc) => (
                <li key={doc.id} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-slate-900">{DOC_TYPE_LABELS[doc.doc_type]}</p>
                      <p className="text-sm text-slate-600">
                        {doc.original_filename} — v{doc.version} — {DOC_STATUS_LABELS[doc.status]}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-[#377CF3] hover:underline"
                      onClick={() => {
                        startTransition(async () => {
                          const res = await getExtranetAdminDocumentSignedUrlAction(doc.id);
                          if (res.ok) window.open(res.url, '_blank', 'noopener,noreferrer');
                        });
                      }}
                    >
                      Ouvrir
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(['approved', 'rejected'] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        disabled={pending}
                        onClick={() => {
                          const comment = window.prompt('Commentaire (optionnel) :') ?? undefined;
                          startTransition(async () => {
                            await reviewExtranetDocumentAction(doc.id, status, comment);
                          });
                        }}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50"
                      >
                        {status === 'approved' ? 'Valider' : 'Refuser'}
                      </button>
                    ))}
                  </div>
                </li>
              ))
          )}
        </ul>
      </section>
    </div>
  );
}
