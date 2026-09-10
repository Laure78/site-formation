'use client';

import { useCallback, useId, useRef, useState } from 'react';
import {
  FileUp,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  FileText,
} from 'lucide-react';
import type { AnalyseProgrammeResult, OrigineTitre } from '@/lib/lms/analyse-programme-schema';

export type ModuleDraft = {
  localId: string;
  titre: string;
  origine: OrigineTitre | 'manuel';
};

type AnalyseState = 'idle' | 'uploading' | 'analyzing' | 'done' | 'error';

type Props = {
  onAnalyseApplied: (payload: {
    intitule: string;
    origineIntitule: OrigineTitre;
    modules: ModuleDraft[];
    pointsAVerifier: string[];
    programmeResume: string;
  }) => void;
  /** Conserve les titres déjà saisis si l’analyse échoue (affichage). */
  currentIntitule: string;
  currentModules: ModuleDraft[];
};

function newLocalId() {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function modulesFromAnalyse(result: AnalyseProgrammeResult): ModuleDraft[] {
  return [...result.modules]
    .sort((a, b) => a.ordre - b.ordre)
    .map((m) => ({
      localId: newLocalId(),
      titre: m.titre,
      origine: m.origine,
    }));
}

function OrigineBadge({ origine }: { origine: OrigineTitre | 'manuel' }) {
  if (origine === 'extrait') {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800 ring-1 ring-emerald-200">
        Extrait du document
      </span>
    );
  }
  if (origine === 'propose') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-900 ring-1 ring-amber-200">
        <Sparkles size={12} strokeWidth={1.75} />
        Proposé par l’IA
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
      Saisie manuelle
    </span>
  );
}

export function ProgrammeImportZone({
  onAnalyseApplied,
  currentIntitule,
  currentModules,
}: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [state, setState] = useState<AnalyseState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [points, setPoints] = useState<string[]>([]);
  const analysingRef = useRef(false);

  const runAnalyse = useCallback(
    async (file: File) => {
      if (analysingRef.current) return;
      analysingRef.current = true;
      setFileName(file.name);
      setError(null);
      setPoints([]);
      setState('analyzing');

      try {
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/admin/formations/analyse-programme', {
          method: 'POST',
          body: form,
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || !data?.ok) {
          setState('error');
          setError(
            typeof data?.error === 'string'
              ? data.error
              : 'L’analyse du programme a échoué.'
          );
          // Conservations manuelles : on ne touche pas currentIntitule / modules
          void currentIntitule;
          void currentModules;
          return;
        }

        const result = data.result as AnalyseProgrammeResult;
        const modules = modulesFromAnalyse(result);
        const programmeResume = modules
          .map((m, i) => `Module ${i + 1} — ${m.titre}`)
          .join('\n');

        onAnalyseApplied({
          intitule: result.intitule,
          origineIntitule: result.origine_intitule,
          modules,
          pointsAVerifier: result.points_a_verifier ?? [],
          programmeResume,
        });
        setPoints(result.points_a_verifier ?? []);
        setState('done');
      } catch {
        setState('error');
        setError(
          'Impossible de joindre le serveur d’analyse. Vos saisies manuelles sont conservées.'
        );
      } finally {
        analysingRef.current = false;
        if (inputRef.current) inputRef.current.value = '';
      }
    },
    [currentIntitule, currentModules, onAnalyseApplied]
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    void runAnalyse(file);
  };

  const busy = state === 'analyzing' || state === 'uploading';

  return (
    <div className="rounded-2xl border border-dashed border-[#377CF3]/40 bg-[#377CF3]/5 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#377CF3] shadow-sm">
          <FileUp size={22} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Déposer le programme de formation
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            PDF ou DOCX avec texte sélectionnable. L’outil propose l’intitulé et les
            modules ; vous validez avant création.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label
              htmlFor={inputId}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2A6BD9] ${
                busy ? 'pointer-events-none opacity-60' : ''
              }`}
            >
              {busy ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Analyse en cours…
                </>
              ) : (
                <>
                  <FileText size={16} strokeWidth={1.75} />
                  Choisir un fichier
                </>
              )}
            </label>
            <input
              ref={inputRef}
              id={inputId}
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              disabled={busy}
              onChange={onFileChange}
            />
            {fileName && (
              <span className="truncate text-sm text-slate-700" title={fileName}>
                {fileName}
              </span>
            )}
          </div>

          <div className="mt-3 text-sm" aria-live="polite">
            {busy && (
              <p className="flex items-center gap-2 text-[#377CF3]">
                <Loader2 size={16} className="animate-spin" />
                Extraction du document puis identification de l’intitulé et des modules…
              </p>
            )}
            {state === 'done' && (
              <p className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 size={16} strokeWidth={1.75} />
                Analyse terminée — vérifiez et ajustez ci-dessous avant de créer.
              </p>
            )}
            {state === 'error' && error && (
              <p className="flex items-start gap-2 text-red-700" role="alert">
                <AlertCircle size={16} className="mt-0.5 shrink-0" strokeWidth={1.75} />
                <span>{error}</span>
              </p>
            )}
          </div>

          {points.length > 0 && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              <p className="font-semibold">Points à vérifier</p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                {points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type ModulesEditorProps = {
  modules: ModuleDraft[];
  onChange: (modules: ModuleDraft[]) => void;
};

export function ModulesProgrammeEditor({
  modules,
  onChange,
}: ModulesEditorProps) {
  const updateTitre = (localId: string, titre: string) => {
    onChange(
      modules.map((m) =>
        m.localId === localId ? { ...m, titre, origine: 'manuel' as const } : m
      )
    );
  };

  const remove = (localId: string) => {
    onChange(modules.filter((m) => m.localId !== localId));
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = index + dir;
    if (next < 0 || next >= modules.length) return;
    const copy = [...modules];
    const tmp = copy[index];
    copy[index] = copy[next];
    copy[next] = tmp;
    onChange(copy);
  };

  const add = () => {
    onChange([
      ...modules,
      { localId: newLocalId(), titre: '', origine: 'manuel' },
    ]);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between gap-3">
          <label className="block text-sm font-medium text-slate-700">
            Modules (ordre pédagogique)
          </label>
          <button
            type="button"
            onClick={add}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Plus size={14} strokeWidth={2} />
            Ajouter un module
          </button>
        </div>

        {modules.length === 0 ? (
          <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Aucun module pour l’instant. Déposez un programme ou ajoutez un module
            manuellement.
          </p>
        ) : (
          <ol className="mt-3 space-y-3">
            {modules.map((mod, index) => (
              <li
                key={mod.localId}
                className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
              >
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Module {index + 1}
                  </span>
                  <OrigineBadge origine={mod.origine} />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={mod.titre}
                    onChange={(e) => updateTitre(mod.localId, e.target.value)}
                    placeholder="Titre du module"
                    maxLength={200}
                    className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    aria-label={`Titre du module ${index + 1}`}
                  />
                  <div className="flex shrink-0 flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      className="rounded-md border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-30"
                      aria-label="Monter"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(index, 1)}
                      disabled={index === modules.length - 1}
                      className="rounded-md border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-30"
                      aria-label="Descendre"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(mod.localId)}
                    className="shrink-0 rounded-md border border-red-100 p-2 text-red-600 hover:bg-red-50"
                    aria-label={`Supprimer le module ${index + 1}`}
                  >
                    <Trash2 size={16} strokeWidth={1.75} />
                  </button>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export { OrigineBadge };
