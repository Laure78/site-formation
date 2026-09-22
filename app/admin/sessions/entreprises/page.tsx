import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { listTrainingCompanies } from '@/lib/training-ops/companies';
import { createCompanyAction } from '../actions';

export default async function SessionsEntreprisesPage() {
  const companies = await listTrainingCompanies().catch(() => []);

  return (
    <div className="p-4 md:p-8">
      <Link href={LINKS.adminSessions} className="text-sm font-medium text-[#377CF3]">
        ← Sessions de formation
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">
        Entreprises clientes
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        Base dédiée aux clients formation — distincte du CRM Prospection.
      </p>

      <form
        action={createCompanyAction}
        className="mt-6 grid max-w-2xl gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2"
      >
        <input
          name="name"
          required
          placeholder="Raison sociale *"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2"
        />
        <input name="siret" placeholder="SIRET" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        <input name="city" placeholder="Ville" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        <input name="contactName" placeholder="Contact" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        <input name="contactEmail" type="email" placeholder="Email" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        <input name="contactPhone" placeholder="Téléphone" className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2" />
        <button
          type="submit"
          className="rounded-xl bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white sm:col-span-2"
        >
          Ajouter l’entreprise
        </button>
      </form>

      <ul className="mt-8 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
        {companies.map((c) => (
          <li key={c.id} className="px-4 py-3">
            <p className="font-semibold text-slate-900">{c.name}</p>
            <p className="text-sm text-slate-500">
              {[c.city, c.contact_name, c.contact_email].filter(Boolean).join(' · ') || '—'}
            </p>
          </li>
        ))}
        {companies.length === 0 ? (
          <li className="px-4 py-8 text-center text-sm text-slate-500">Aucune entreprise</li>
        ) : null}
      </ul>
    </div>
  );
}
