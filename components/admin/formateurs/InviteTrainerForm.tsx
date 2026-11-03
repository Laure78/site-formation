'use client';

import { useTransition } from 'react';
import { inviteExtranetTrainerAction } from '@/app/admin/formateurs/actions';

export function InviteTrainerForm() {
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          const res = await inviteExtranetTrainerAction(fd);
          if (!res.ok) alert(res.error);
          else e.currentTarget.reset();
        });
      }}
    >
      <h2 className="font-display text-lg font-bold text-slate-900">Inviter un formateur</h2>
      <p className="mt-1 text-sm text-slate-600">
        Crée un dossier extranet. Le formateur pourra se connecter avec le même e-mail (lien automatique).
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          <span className="font-medium">E-mail</span>
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="text-sm">
          <span className="font-medium">Spécialité</span>
          <input name="specialty" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="text-sm">
          <span className="font-medium">Prénom</span>
          <input name="first_name" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="text-sm">
          <span className="font-medium">Nom</span>
          <input name="last_name" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-4 rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? 'Création…' : 'Créer le dossier'}
      </button>
    </form>
  );
}
