'use client';

import { useRouter } from 'next/navigation';
import { Send } from 'lucide-react';

interface Props {
  formationDefault?: string | null;
}

export function ContactForm({ formationDefault }: Props = {}) {
  const router = useRouter();
  const messageDefault = formationDefault ? `Je souhaite accéder à la formation : ${formationDefault}.` : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/merci-devis');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-nom" className="block text-sm font-medium text-slate-700">
          Nom et Prénom *
        </label>
        <input
          id="contact-nom"
          name="nom"
          type="text"
          required
          placeholder="Ex: Jean Dupont"
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700">
          Email professionnel *
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="Ex: jean.dupont@entreprise.fr"
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>
      <div>
        <label htmlFor="contact-tel" className="block text-sm font-medium text-slate-700">
          Téléphone *
        </label>
        <input
          id="contact-tel"
          name="tel"
          type="tel"
          required
          placeholder="Ex: 06 12 34 56 78"
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>
      <div>
        <label htmlFor="contact-entreprise" className="block text-sm font-medium text-slate-700">
          Entreprise
        </label>
        <input
          id="contact-entreprise"
          name="entreprise"
          type="text"
          placeholder="Ex: Entreprise Dupont BTP"
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>
      <div>
        <label htmlFor="contact-type" className="block text-sm font-medium text-slate-700">
          Type de formation recherchée
        </label>
        <select
          id="contact-type"
          name="type"
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        >
          <option value="">Sélectionnez une option</option>
          <option value="ia-btp">L&apos;IA au service du BTP</option>
          <option value="appels-offres">Répondre à un appel d&apos;offre avec l&apos;IA</option>
          <option value="ia-rh">L&apos;IA au service de la fonction RH</option>
          <option value="ia-tp">IA & Travaux Publics</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700">
          Votre message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          defaultValue={messageDefault}
          placeholder="Décrivez-nous votre projet de formation IA, vos besoins spécifiques, le nombre de participants..."
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-4 font-semibold text-white transition-colors hover:bg-blue-700"
      >
        <Send size={20} strokeWidth={1.5} />
        Prendre rendez-vous
      </button>
      <p className="text-xs text-slate-500">
        * Champs obligatoires — Vos données sont traitées de manière confidentielle
      </p>
    </form>
  );
}
