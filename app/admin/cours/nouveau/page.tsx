'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NouveauCoursPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Link href="/admin" className="text-sm text-[var(--accent)] hover:underline">
        ← Retour à l&apos;admin
      </Link>
      <h1 className="mt-6 font-display text-3xl font-bold">Créer une formation</h1>
      <p className="mt-2 text-slate-600">
        Définis le cours. Tu pourras ensuite ajouter des modules et des leçons (vidéos, PDF, quiz, textes).
      </p>

      <form className="mt-8 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Titre
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Ex : Excel avancé"
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
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
            placeholder="Décris le parcours et ce que l'apprenant va acquérir..."
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-slate-700">
            Prix (€)
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="49"
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Créer (à connecter API)
          </button>
          <Link
            href="/admin"
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
