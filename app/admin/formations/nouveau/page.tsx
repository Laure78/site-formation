'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { enrollUserByEmail } from '@/lib/lms-auto-enroll';
import { TARIF_SESSION_FORFAIT_HT, libelleTarifSessionForfaitaire, MENTIONS_TVA_REGIMES_COURT } from '@/lib/tarifs-sessions';

export default function NouvelleFormationPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [objectifs, setObjectifs] = useState('');
  const [prerequis, setPrerequis] = useState('');
  const [programme, setProgramme] = useState('');
  const [price, setPrice] = useState(String(TARIF_SESSION_FORFAIT_HT));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deriveSlug = (t: string) =>
    t
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

  const handleTitleChange = (t: string) => {
    setTitle(t);
    if (!slug || slug === deriveSlug(title)) setSlug(deriveSlug(t));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Non connecté');

      const { data, error: err } = await supabase
        .from('courses')
        .insert({
          title,
          slug: slug || deriveSlug(title),
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

      if (err) throw err;
      await enrollUserByEmail(supabase, data.id);
      router.push(`/admin/formations/${data.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <Link href="/admin/formations" className="text-sm text-[var(--accent)] hover:underline">
        ← Retour aux formations
      </Link>
      <h1 className="mt-6 font-display text-2xl font-bold text-slate-900">Nouvelle formation</h1>
      <p className="mt-2 text-slate-600">Tu pourras ensuite ajouter des modules et des leçons.</p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-6">
        {error && <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">Titre</label>
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
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-slate-700">Slug (URL)</label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ia-au-service-du-btp"
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
          <p className="mt-1 text-xs text-slate-500">/formations/[slug]</p>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
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
          <label htmlFor="objectifs" className="block text-sm font-medium text-slate-700">Objectifs</label>
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
          <label htmlFor="prerequis" className="block text-sm font-medium text-slate-700">Prérequis</label>
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
          <label htmlFor="programme" className="block text-sm font-medium text-slate-700">Programme (résumé)</label>
          <textarea
            id="programme"
            value={programme}
            onChange={(e) => setProgramme(e.target.value)}
            rows={3}
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
            placeholder={String(TARIF_SESSION_FORFAIT_HT)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
          <p className="mt-1 text-xs text-slate-500">
            Forfait unique {libelleTarifSessionForfaitaire(TARIF_SESSION_FORFAIT_HT)} (toutes formations catalogue) —{' '}
            {MENTIONS_TVA_REGIMES_COURT}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Création…' : 'Créer'}
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
