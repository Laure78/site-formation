'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  addProspectNoteAction,
  markEmailSentAction,
  scheduleRelanceAction,
  updateProspectStatutAction,
} from '@/app/admin/prospection/actions';
import { EMAIL_TYPES, PROSPECTION_STATUTS } from '@/lib/prospection/constants';
import type { ProspectRow, ProspectingTemplateRow } from '@/lib/prospection/types';
import { fillTemplate } from '@/lib/prospection/email-ai';

export function ProspectQuickActions({
  prospect,
  templates,
}: {
  prospect: ProspectRow;
  templates: ProspectingTemplateRow[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [note, setNote] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [emailType, setEmailType] = useState('premier_contact');
  const [msg, setMsg] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const run = (fn: () => Promise<{ ok: boolean; error?: string }>, okMsg: string) => {
    setMsg(null);
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) {
        setMsg(res.error ?? 'Erreur');
        return;
      }
      setMsg(okMsg);
      router.refresh();
    });
  };

  const applyTemplate = (templateId: string) => {
    const t = templates.find((x) => x.id === templateId);
    if (!t) return;
    setEmailType(t.email_type);
    setSubject(fillTemplate(t.subject_template, prospect));
    setBody(fillTemplate(t.body_template, prospect));
    setShowEmail(true);
  };

  const generateAi = async () => {
    setAiLoading(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin/prospection/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prospectId: prospect.id,
          emailType,
          subjectDraft: subject,
          bodyDraft: body,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error ?? 'Génération impossible');
        return;
      }
      setSubject(data.subject);
      setBody(data.body);
      setShowEmail(true);
    } catch {
      setMsg('Génération impossible');
    } finally {
      setAiLoading(false);
    }
  };

  const copyEmail = async () => {
    const text = `Objet : ${subject}\n\n${body}`;
    await navigator.clipboard.writeText(text);
    setMsg('Email copié dans le presse-papiers');
  };

  return (
    <div className="space-y-4">
      {msg ? (
        <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700" role="status">
          {msg}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() => setShowEmail(true)}
          className="rounded-lg bg-[#377CF3] px-3 py-2 text-sm font-semibold text-white hover:bg-[#2A6BD9]"
        >
          Créer un email
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            run(
              () =>
                markEmailSentAction({
                  prospectId: prospect.id,
                  subject: subject || `Contact — ${prospect.entreprise ?? prospect.prenom}`,
                  body: body || '(contenu non saisi — marqué envoyé manuellement)',
                  emailType,
                  scheduleRelanceDays: 5,
                }),
              'Marqué comme envoyé · relance J+5'
            )
          }
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Marquer comme envoyé
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            run(() => scheduleRelanceAction(prospect.id, 5), 'Relance dans 5 jours')
          }
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Programmer relance J+5
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            run(() => updateProspectStatutAction(prospect.id, 'opportunite'), 'Passé en opportunité')
          }
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Passer en opportunité
        </button>
        <select
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          defaultValue=""
          onChange={(e) => {
            const v = e.target.value;
            if (!v) return;
            run(() => updateProspectStatutAction(prospect.id, v), 'Statut mis à jour');
            e.target.value = '';
          }}
        >
          <option value="">Changer le statut…</option>
          {PROSPECTION_STATUTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <select
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          defaultValue=""
          onChange={(e) => {
            if (e.target.value) applyTemplate(e.target.value);
            e.target.value = '';
          }}
        >
          <option value="">Utiliser un modèle…</option>
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
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
            run(() => addProspectNoteAction(prospect.id, n), 'Note ajoutée');
          }}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Note
        </button>
      </div>

      {showEmail ? (
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold text-slate-900">Email personnalisé</h3>
            <button
              type="button"
              onClick={() => setShowEmail(false)}
              className="text-sm text-slate-500 hover:underline"
            >
              Fermer
            </button>
          </div>
          <select
            value={emailType}
            onChange={(e) => setEmailType(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            {EMAIL_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Objet"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            placeholder="Corps de l’email"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={aiLoading}
              onClick={generateAi}
              className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {aiLoading ? 'Adaptation…' : 'Adapter cet email à ce prospect'}
            </button>
            <button
              type="button"
              onClick={copyEmail}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium"
            >
              Copier l’email
            </button>
            <a
              href={`mailto:${prospect.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium"
            >
              Ouvrir dans la messagerie
            </a>
            <button
              type="button"
              disabled={pending || !subject.trim() || !body.trim()}
              onClick={() =>
                run(
                  () =>
                    markEmailSentAction({
                      prospectId: prospect.id,
                      subject,
                      body,
                      emailType,
                      scheduleRelanceDays: 5,
                    }),
                  'Email enregistré comme envoyé'
                )
              }
              className="rounded-lg bg-[#377CF3] px-3 py-2 text-sm font-semibold text-white"
            >
              Marquer comme envoyé
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
