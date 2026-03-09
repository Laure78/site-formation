'use client';

import { useRouter } from 'next/navigation';
import { Send, Lock } from 'lucide-react';

export function DevisForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/merci-devis');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="nom" className="block text-sm font-medium text-slate-700">
          Nom complet *
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          required
          placeholder="Jean Dupont"
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email professionnel *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="j.dupont@entreprise.fr"
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>
      <div>
        <label htmlFor="tel" className="block text-sm font-medium text-slate-700">
          Téléphone *
        </label>
        <input
          id="tel"
          name="tel"
          type="tel"
          required
          placeholder="06 12 34 56 78"
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>
      <div>
        <label htmlFor="entreprise" className="block text-sm font-medium text-slate-700">
          Entreprise *
        </label>
        <input
          id="entreprise"
          name="entreprise"
          type="text"
          required
          placeholder="Nom de votre entreprise"
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>
      <div>
        <label htmlFor="participants" className="block text-sm font-medium text-slate-700">
          Nombre de participants *
        </label>
        <select
          id="participants"
          name="participants"
          required
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        >
          <option value="">Sélectionnez</option>
          <option value="1-5">1 à 5</option>
          <option value="6-12">6 à 12</option>
          <option value="13+">13+</option>
        </select>
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-slate-700">
          Type de formation *
        </label>
        <select
          id="type"
          name="type"
          required
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        >
          <option value="">Sélectionnez</option>
          <option value="ia-btp">L'IA au service du BTP</option>
          <option value="appels-offres">Répondre à un appel d'offre avec l'IA</option>
          <option value="ia-rh">L'IA au service de la fonction RH</option>
        </select>
      </div>
      <div>
        <label htmlFor="periode" className="block text-sm font-medium text-slate-700">
          Période souhaitée (optionnel)
        </label>
        <input
          id="periode"
          name="periode"
          type="text"
          placeholder="Ex: Mars 2026, Semaine 15, T2 2026..."
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>
      <div>
        <label htmlFor="besoins" className="block text-sm font-medium text-slate-700">
          Vos besoins spécifiques *
        </label>
        <textarea
          id="besoins"
          name="besoins"
          required
          rows={4}
          placeholder="Décrivez vos objectifs, contraintes, besoins particuliers..."
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-4 font-semibold text-white transition-colors hover:bg-blue-700"
      >
        <Send size={20} strokeWidth={1.5} />
        Recevoir mon devis gratuit
      </button>
      <p className="flex items-center gap-2 text-xs text-slate-500">
        <Lock size={14} strokeWidth={1.5} />
        Vos données sont protégées et utilisées uniquement pour établir votre devis. Réponse garantie sous 24h.
      </p>
    </form>
  );
}
