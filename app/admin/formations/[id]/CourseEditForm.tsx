'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Save } from 'lucide-react';
import { TARIF_SESSION_FORFAIT_HT, libelleTarifSessionForfaitaire, MENTIONS_TVA_REGIMES_COURT } from '@/lib/tarifs-sessions';

interface Props {
  courseId: string;
  initial: {
    title: string;
    slug: string;
    description?: string;
    objectifs?: string;
    prerequis?: string;
    programme?: string;
    price?: number;
    published: boolean;
  };
}

export function CourseEditForm({ courseId, initial }: Props) {
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description || '');
  const [objectifs, setObjectifs] = useState(initial.objectifs || '');
  const [prerequis, setPrerequis] = useState(initial.prerequis || '');
  const [programme, setProgramme] = useState(initial.programme || '');
  const [price, setPrice] = useState(
    String(initial.price != null && initial.price > 0 ? initial.price : TARIF_SESSION_FORFAIT_HT)
  );
  const [published, setPublished] = useState(initial.published);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const supabase = createClient();
      await supabase
        .from('courses')
        .update({
          title,
          description: description || null,
          objectifs: objectifs || null,
          prerequis: prerequis || null,
          programme: programme || null,
          price: parseFloat(price) || 0,
          published,
        })
        .eq('id', courseId);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="font-display text-lg font-semibold text-slate-900">Informations de la formation</h2>
      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Objectifs</label>
          <textarea
            value={objectifs}
            onChange={(e) => setObjectifs(e.target.value)}
            placeholder="Ex : Maîtriser ChatGPT pour les devis, accélérer la rédaction..."
            rows={3}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Prérequis</label>
          <textarea
            value={prerequis}
            onChange={(e) => setPrerequis(e.target.value)}
            placeholder="Ex : Aucun prérequis technique, ordinateur avec connexion internet"
            rows={2}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Programme (résumé)</label>
          <textarea
            value={programme}
            onChange={(e) => setProgramme(e.target.value)}
            placeholder="Ex : Module 1 - Découverte, Module 2 - Pratique..."
            rows={4}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
          <p className="mt-1 text-xs text-slate-500">
            Le programme détaillé est défini par les modules et leçons ci-dessous.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Prix forfaitaire HT (€)
          </label>
          <input
            type="number"
            min={0}
            step={1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 w-full max-w-xs rounded-lg border border-slate-300 px-4 py-2 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
          <p className="mt-1 text-xs text-slate-500">
            Forfait unique {libelleTarifSessionForfaitaire(TARIF_SESSION_FORFAIT_HT)} (toutes formations catalogue) —{' '}
            {MENTIONS_TVA_REGIMES_COURT}
          </p>
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="rounded border-slate-300"
          />
          <span className="text-sm font-medium text-slate-700">Publiée</span>
        </label>
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Save size={18} strokeWidth={1.5} />
          {loading ? 'Enregistrement…' : saved ? 'Enregistré ✓' : 'Enregistrer'}
        </button>
      </div>
    </div>
  );
}
