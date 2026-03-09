'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function NouveauModulePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: mods } = await supabase.from('modules').select('order_index').eq('course_id', courseId).order('order_index', { ascending: false }).limit(1);
      const nextOrder = ((mods?.[0]?.order_index ?? -1) + 1);
      await supabase.from('modules').insert({ course_id: courseId, title, order_index: nextOrder });
      router.push(`/admin/formations/${courseId}`);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <Link href={`/admin/formations/${courseId}`} className="text-sm text-[var(--accent)] hover:underline">← Retour</Link>
      <h1 className="mt-6 font-display text-2xl font-bold">Nouveau module</h1>
      <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Titre du module</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Ajout…' : 'Ajouter'}
          </button>
          <Link href={`/admin/formations/${courseId}`} className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50">Annuler</Link>
        </div>
      </form>
    </div>
  );
}
