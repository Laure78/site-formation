'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  analyzeProspectsJsonAction,
  confirmProspectsJsonImportAction,
} from '@/app/admin/prospection/actions';

/** Convertit un CSV simple (virgule ou point-virgule) en tableau d’objets JSON. */
export function csvToProspectsJson(raw: string): string {
  const lines = raw
    .replace(/^\uFEFF/, '')
    .trim()
    .split(/\r?\n/)
    .filter((l) => l.trim());
  if (lines.length < 2) {
    throw new Error('CSV vide ou sans ligne de données.');
  }

  const sep = lines[0]!.includes(';') ? ';' : ',';
  const headers = splitCsvLine(lines[0]!, sep).map((h) =>
    h.trim().toLowerCase().replace(/\s+/g, '_')
  );

  const alias: Record<string, string> = {
    prenom: 'first_name',
    prénom: 'first_name',
    first_name: 'first_name',
    nom: 'last_name',
    last_name: 'last_name',
    email: 'email',
    mail: 'email',
    telephone: 'phone',
    téléphone: 'phone',
    phone: 'phone',
    entreprise: 'company',
    societe: 'company',
    société: 'company',
    company: 'company',
    fonction: 'job_title',
    job_title: 'job_title',
    poste: 'job_title',
    categorie: 'category',
    catégorie: 'category',
    category: 'category',
    departement: 'department',
    département: 'department',
    department: 'department',
    ville: 'city',
    city: 'city',
    region: 'region',
    région: 'region',
    statut: 'status',
    status: 'status',
    source: 'source',
    notes: 'notes',
    linkedin: 'linkedin',
  };

  const prospects = lines.slice(1).map((line) => {
    const cols = splitCsvLine(line, sep);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      const key = alias[h] ?? h;
      const val = cols[i]?.trim();
      if (val) obj[key] = val;
    });
    return obj;
  });

  return JSON.stringify({ prospects }, null, 2);
}

function splitCsvLine(line: string, sep: string): string[] {
  const out: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]!;
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === sep && !inQuotes) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

export function ImportProspectsCsv() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [csv, setCsv] = useState('');
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);

  const onImport = () => {
    setError(null);
    setReport(null);
    startTransition(async () => {
      try {
        const json = csvToProspectsJson(csv);
        const analyzed = await analyzeProspectsJsonAction(json);
        if (!analyzed.ok) {
          setError(analyzed.error);
          return;
        }
        const decisions = analyzed.rows
          .filter((r) => r.status === 'duplicate')
          .map((r) => ({
            rowIndex: r.draft.rowIndex,
            mode: 'merge_missing' as const,
          }));
        const res = await confirmProspectsJsonImportAction(json, decisions);
        if (!res.ok) {
          setError(res.error);
          return;
        }
        setReport(
          `${res.imported} créé(s) · ${res.updated} mis à jour · ${res.skipped} ignoré(s)`
        );
        setCsv('');
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Import CSV impossible');
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
      >
        Importer CSV
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-2xl rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Importer des prospects (CSV)
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Première ligne = en-têtes (prenom, nom, email, entreprise…). Séparateur , ou
                  ;. Doublons : infos manquantes ajoutées.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-slate-500 hover:text-slate-800"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>
            <textarea
              value={csv}
              onChange={(e) => setCsv(e.target.value)}
              rows={12}
              spellCheck={false}
              placeholder={'prenom;nom;email;entreprise;fonction;departement;statut\nMarc-Antoine;Pagot;mapagot@exemple.fr;CCI Versailles;Conseiller;78;À contacter'}
              className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 font-mono text-xs focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/20"
            />
            {error ? <p className="mt-2 text-sm text-rose-600">{error}</p> : null}
            {report ? <p className="mt-2 text-sm text-emerald-700">{report}</p> : null}
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
              >
                Fermer
              </button>
              <button
                type="button"
                disabled={pending || !csv.trim()}
                onClick={onImport}
                className="rounded-xl bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {pending ? 'Import…' : 'Importer'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
