'use client';

import { useState } from 'react';
import { testGoogleCalendarAction } from '@/app/actions/test-google-calendar';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export function TestGoogleCalendar() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string; details?: { calendarId?: string; serviceAccountEmail?: string } } | null>(null);

  const runTest = async () => {
    setLoading(true);
    setResult(null);
    try {
      const r = await testGoogleCalendarAction();
      setResult(r);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-display text-lg font-semibold text-slate-900">Test Google Calendar</h2>
      <p className="mt-2 text-sm text-slate-600">
        Vérifie que la connexion à ton agenda Google fonctionne. Si le test échoue, le message indiquera quoi corriger.
      </p>
      <button
        type="button"
        onClick={runTest}
        disabled={loading}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : null}
        Tester la connexion
      </button>
      {result && (
        <div className={`mt-6 flex gap-3 rounded-xl p-4 ${result.ok ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
          {result.ok ? <CheckCircle size={24} className="shrink-0 text-emerald-600" /> : <AlertCircle size={24} className="shrink-0 text-amber-600" />}
          <div className="min-w-0">
            <p className={`font-medium ${result.ok ? 'text-emerald-900' : 'text-amber-900'}`}>{result.message}</p>
            {result.details?.serviceAccountEmail && (
              <p className="mt-2 text-sm text-slate-600">
                Compte de service : <code className="rounded bg-slate-100 px-1">{result.details.serviceAccountEmail}</code>
              </p>
            )}
            {result.details?.calendarId && (
              <p className="mt-1 text-sm text-slate-600">
                Calendrier : <code className="rounded bg-slate-100 px-1">{result.details.calendarId}</code>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
