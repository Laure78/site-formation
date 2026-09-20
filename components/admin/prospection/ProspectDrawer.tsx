'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  addProspectNoteAction,
  getProspectDrawerDataAction,
  markProspectContactedAction,
  markRelanceDoneAction,
  scheduleRelanceAction,
  updateProspectStatutAction,
} from '@/app/admin/prospection/actions';
import { LINKS } from '@/lib/internal-links';
import { typeStructureLabel } from '@/lib/prospection/constants';
import { StatutBadge } from '@/components/admin/prospection/StatutBadge';
import type { ProspectRow, ProspectingActionRow, ProspectingEmailRow } from '@/lib/prospection/types';
import { QuickEmailModal } from '@/components/admin/prospection/QuickEmailModal';

export function ProspectDrawer({
  prospectId,
  onClose,
}: {
  prospectId: string | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prospect, setProspect] = useState<ProspectRow | null>(null);
  const [actions, setActions] = useState<ProspectingActionRow[]>([]);
  const [emails, setEmails] = useState<ProspectingEmailRow[]>([]);
  const [note, setNote] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [showRelanceAfter, setShowRelanceAfter] = useState(false);

  useEffect(() => {
    if (!prospectId) {
      setProspect(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    getProspectDrawerDataAction(prospectId).then((res) => {
      if (cancelled) return;
      setLoading(false);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setProspect(res.prospect);
      setActions(res.actions);
      setEmails(res.emails);
    });
    return () => {
      cancelled = true;
    };
  }, [prospectId]);

  if (!prospectId) return null;

  const run = (fn: () => Promise<{ ok: boolean; error?: string }>, then?: () => void) => {
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) {
        setError(res.error ?? 'Erreur');
        return;
      }
      then?.();
      router.refresh();
      const refreshed = await getProspectDrawerDataAction(prospectId);
      if (refreshed.ok) {
        setProspect(refreshed.prospect);
        setActions(refreshed.actions);
        setEmails(refreshed.emails);
      }
    });
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-slate-900/30"
        onClick={onClose}
        aria-hidden
      />
      <aside
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Fiche rapide prospect"
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div className="min-w-0">
            {prospect ? (
              <>
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  {prospect.prenom} {prospect.nom}
                </h2>
                <p className="mt-0.5 truncate text-sm text-slate-500">
                  {[prospect.fonction, prospect.entreprise].filter(Boolean).join(' · ') || '—'}
                </p>
              </>
            ) : (
              <h2 className="font-display text-lg font-semibold text-slate-900">Prospect</h2>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {loading ? <p className="text-sm text-slate-500">Chargement…</p> : null}
          {error ? <p className="mb-3 text-sm text-rose-600">{error}</p> : null}

          {prospect ? (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <StatutBadge statut={prospect.statut} />
                <span className="text-xs text-slate-500">
                  {typeStructureLabel(prospect.type_structure)}
                </span>
              </div>

              <dl className="grid grid-cols-1 gap-2 text-sm">
                <Row label="Email" value={prospect.email} href={`mailto:${prospect.email}`} />
                <Row label="Téléphone" value={prospect.telephone} />
                <Row label="LinkedIn" value={prospect.linkedin_url} href={prospect.linkedin_url ?? undefined} />
                <Row
                  label="Dernier contact"
                  value={
                    prospect.dernier_contact_at
                      ? new Date(prospect.dernier_contact_at).toLocaleString('fr-FR')
                      : '—'
                  }
                />
                <Row
                  label="Prochaine relance"
                  value={
                    prospect.prochaine_relance_at
                      ? new Date(prospect.prochaine_relance_at).toLocaleString('fr-FR')
                      : '—'
                  }
                />
                <Row label="Prochaine action" value={prospect.next_action ?? '—'} />
              </dl>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setShowEmail(true)}
                  className="rounded-lg bg-[#377CF3] px-3 py-1.5 text-xs font-semibold text-white"
                >
                  Créer un email
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() =>
                    run(() => markProspectContactedAction(prospect.id, 5), () =>
                      setShowRelanceAfter(false)
                    )
                  }
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium"
                >
                  Marquer contacté
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => setShowRelanceAfter(true)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium"
                >
                  Relancé
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => run(() => updateProspectStatutAction(prospect.id, 'opportunite'))}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium"
                >
                  Opportunité
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => run(() => updateProspectStatutAction(prospect.id, 'rdv_prevu'))}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium"
                >
                  Créer RDV
                </button>
              </div>

              {showRelanceAfter ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-700">
                    Programmer la prochaine relance
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {[3, 5, 7, 15].map((d) => (
                      <button
                        key={d}
                        type="button"
                        disabled={pending}
                        onClick={() =>
                          run(() => markRelanceDoneAction(prospect.id, d), () =>
                            setShowRelanceAfter(false)
                          )
                        }
                        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
                      >
                        {d} j
                      </button>
                    ))}
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() =>
                        run(() => markRelanceDoneAction(prospect.id, null), () =>
                          setShowRelanceAfter(false)
                        )
                      }
                      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
                    >
                      Aucune
                    </button>
                  </div>
                </div>
              ) : null}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Note rapide
                </p>
                <div className="mt-2 flex gap-2">
                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ajouter une note…"
                    className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    disabled={pending || !note.trim()}
                    onClick={() => {
                      const n = note;
                      setNote('');
                      run(() => addProspectNoteAction(prospect.id, n));
                    }}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium"
                  >
                    + Note
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Relance rapide
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {[3, 5, 7, 15].map((d) => (
                    <button
                      key={d}
                      type="button"
                      disabled={pending}
                      onClick={() => run(() => scheduleRelanceAction(prospect.id, d))}
                      className="rounded-md border border-slate-200 px-2 py-1 text-xs"
                    >
                      J+{d}
                    </button>
                  ))}
                </div>
              </div>

              {emails.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Emails
                  </p>
                  <ul className="mt-2 space-y-2">
                    {emails.map((e) => (
                      <li key={e.id} className="rounded-lg border border-slate-100 p-2 text-xs">
                        <p className="font-medium text-slate-800">{e.subject}</p>
                        <p className="text-slate-500">
                          {new Date(e.sent_at ?? e.created_at).toLocaleDateString('fr-FR')} ·{' '}
                          {e.email_type} · {e.status}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Historique récent
                </p>
                <ul className="mt-2 space-y-2 border-l border-slate-200 pl-3">
                  {actions.length === 0 ? (
                    <li className="text-xs text-slate-500">Aucun historique.</li>
                  ) : (
                    actions.map((a) => (
                      <li key={a.id}>
                        <p className="text-[11px] text-slate-400">
                          {new Date(a.created_at).toLocaleString('fr-FR')}
                        </p>
                        <p className="text-sm font-medium text-slate-800">{a.title}</p>
                        {a.details ? (
                          <p className="text-xs text-slate-500 line-clamp-2">{a.details}</p>
                        ) : null}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-t border-slate-100 px-5 py-3">
          <Link
            href={`${LINKS.adminProspectionProspects}/${prospectId}`}
            className="block rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-800"
          >
            Voir la fiche complète
          </Link>
        </div>
      </aside>

      {showEmail && prospect ? (
        <QuickEmailModal
          prospect={prospect}
          onClose={() => setShowEmail(false)}
          onSent={() => {
            setShowEmail(false);
            router.refresh();
          }}
        />
      ) : null}
    </>
  );
}

function Row({
  label,
  value,
  href,
}: {
  label: string;
  value: string | null | undefined;
  href?: string;
}) {
  return (
    <div className="flex justify-between gap-3 border-b border-slate-50 py-1.5">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-800">
        {href && value ? (
          <a href={href} className="text-[#377CF3] hover:underline" target="_blank" rel="noreferrer">
            {value}
          </a>
        ) : (
          value || '—'
        )}
      </dd>
    </div>
  );
}
