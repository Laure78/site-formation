'use client';

import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { enrollUserByEmail } from '@/lib/lms-auto-enroll';
import {
  libelleTarifsDualCourt,
  MENTIONS_TVA_REGIMES_COURT,
  TARIF_INTRA_4H_HT,
} from '@/lib/tarifs-sessions';
import type { OrigineTitre } from '@/lib/lms/analyse-programme-schema';
import {
  ModulesProgrammeEditor,
  ProgrammeImportZone,
  OrigineBadge,
  type ModuleDraft,
} from './ProgrammeImportAnalyse';

export default function NouvelleFormationPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [origineIntitule, setOrigineIntitule] = useState<OrigineTitre | 'manuel' | null>(
    null
  );
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [objectifs, setObjectifs] = useState('');
  const [prerequis, setPrerequis] = useState('');
  const [programme, setProgramme] = useState('');
  const [modules, setModules] = useState<ModuleDraft[]>([]);
  const [price, setPrice] = useState(String(TARIF_INTRA_4H_HT));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submittingRef = useRef(false);
  /** Empêche le slug auto de réécraser une saisie manuelle après analyse. */
  const slugTouchedRef = useRef(false);

  const deriveSlug = (t: string) =>
    t
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

  const handleTitleChange = (t: string) => {
    setTitle(t);
    setOrigineIntitule((prev) => (prev ? 'manuel' : prev));
    if (!slugTouchedRef.current) {
      setSlug(deriveSlug(t));
    }
  };

  const onAnalyseApplied = useCallback(
    (payload: {
      intitule: string;
      origineIntitule: OrigineTitre;
      modules: ModuleDraft[];
      pointsAVerifier: string[];
      programmeResume: string;
    }) => {
      setTitle(payload.intitule);
      setOrigineIntitule(payload.origineIntitule);
      setModules(payload.modules);
      setProgramme(payload.programmeResume);
      if (!slugTouchedRef.current) {
        setSlug(deriveSlug(payload.intitule));
      }
      setError(null);
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current || loading) return;
    setError(null);

    const intitule = title.trim();
    if (intitule.length < 2) {
      setError('Indiquez un intitulé de formation.');
      return;
    }

    const modulesClean = modules
      .map((m) => ({ ...m, titre: m.titre.trim() }))
      .filter((m) => m.titre.length >= 2);

    submittingRef.current = true;
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Non connecté');

      const finalSlug = (slug || deriveSlug(intitule)).trim();

      // Ne pas écraser une formation existante (même slug)
      const { data: existing } = await supabase
        .from('courses')
        .select('id, title')
        .eq('slug', finalSlug)
        .maybeSingle();

      if (existing) {
        setError(
          `Une formation existe déjà avec le slug « ${finalSlug} » (« ${existing.title} »). Changez le slug ou ouvrez la formation existante — aucune donnée n’a été écrasée.`
        );
        return;
      }

      const { data, error: err } = await supabase
        .from('courses')
        .insert({
          title: intitule,
          slug: finalSlug,
          description: description || null,
          objectifs: objectifs || null,
          prerequis: prerequis || null,
          programme: programme || null,
          price: parseFloat(price) || 0,
          creator_id: user.id,
          published: false,
        })
        .select('id')
        .single();

      if (err) {
        if (/duplicate|unique/i.test(err.message)) {
          throw new Error(
            'Une formation avec ce slug existe déjà. Modifiez le slug — aucune donnée n’a été écrasée.'
          );
        }
        throw err;
      }

      if (modulesClean.length > 0) {
        const rows = modulesClean.map((m, i) => ({
          course_id: data.id,
          title: m.titre,
          order_index: i,
        }));
        const { error: modErr } = await supabase.from('modules').insert(rows);
        if (modErr) {
          throw new Error(
            `Formation créée, mais erreur à l’enregistrement des modules : ${modErr.message}`
          );
        }
      }

      await enrollUserByEmail(supabase, data.id);
      router.push(`/admin/formations/${data.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  return (
    <div className="p-4 md:p-8">
      <Link href="/admin/formations" className="text-sm text-[var(--accent)] hover:underline">
        ← Retour aux formations
      </Link>
      <h1 className="mt-6 font-display text-2xl font-bold text-slate-900">
        Nouvelle formation
      </h1>
      <p className="mt-2 text-slate-600">
        Déposez un programme pour préremplir l’intitulé et les modules, puis validez avant
        création.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-8">
        <ProgrammeImportZone
          onAnalyseApplied={onAnalyseApplied}
          currentIntitule={title}
          currentModules={modules}
        />

        {error && (
          <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">
              Intitulé de la formation
            </label>
            {origineIntitule && <OrigineBadge origine={origineIntitule} />}
          </div>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            placeholder="Ex : L'IA au service du bâtiment"
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>

        <ModulesProgrammeEditor modules={modules} onChange={setModules} />

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-slate-700">
            Slug (URL)
          </label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => {
              slugTouchedRef.current = true;
              setSlug(e.target.value);
            }}
            placeholder="ia-au-service-du-btp"
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
          <p className="mt-1 text-xs text-slate-500">/formations/[slug]</p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Décris le parcours..."
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <div>
          <label htmlFor="objectifs" className="block text-sm font-medium text-slate-700">
            Objectifs
          </label>
          <textarea
            id="objectifs"
            value={objectifs}
            onChange={(e) => setObjectifs(e.target.value)}
            rows={3}
            placeholder="Ex : Maîtriser ChatGPT pour les devis..."
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <div>
          <label htmlFor="prerequis" className="block text-sm font-medium text-slate-700">
            Prérequis
          </label>
          <textarea
            id="prerequis"
            value={prerequis}
            onChange={(e) => setPrerequis(e.target.value)}
            rows={2}
            placeholder="Ex : Aucun prérequis technique..."
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <div>
          <label htmlFor="programme" className="block text-sm font-medium text-slate-700">
            Programme (résumé)
          </label>
          <textarea
            id="programme"
            value={programme}
            onChange={(e) => setProgramme(e.target.value)}
            rows={4}
            placeholder="Ex : Module 1 - Découverte..."
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-slate-700">
            Prix forfaitaire HT (€)
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder={String(TARIF_INTRA_4H_HT)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
          <p className="mt-1 text-xs text-slate-500">
            {libelleTarifsDualCourt(4)} (toutes formations catalogue) —{' '}
            {MENTIONS_TVA_REGIMES_COURT}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Création…' : 'Valider et créer la formation'}
          </button>
          <Link
            href="/admin/formations"
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
