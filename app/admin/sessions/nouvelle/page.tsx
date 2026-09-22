import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { FORMATIONS } from '@/data/formations';
import { createAdminClient } from '@/lib/supabase/admin';
import { listTrainingCompanies } from '@/lib/training-ops/companies';
import { listTrainingPrograms, syncAllCataloguePrograms } from '@/lib/training-ops/programs';
import { MODALITY_LABELS } from '@/lib/training-ops/constants';
import { createCompanyAction, createSessionAction } from '../actions';

export default async function NouvelleSessionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const prefillCode = typeof sp.catalogueCode === 'string' ? sp.catalogueCode : '';

  let programs = await listTrainingPrograms().catch(() => []);
  if (programs.length === 0) {
    try {
      await syncAllCataloguePrograms();
      programs = await listTrainingPrograms();
    } catch {
      programs = [];
    }
  }

  const companies = await listTrainingCompanies().catch(() => []);
  const supabase = createAdminClient();
  const { data: trainers } = await supabase
    .from('profiles')
    .select('id, full_name, email, role')
    .in('role', ['admin', 'formateur'])
    .order('full_name', { ascending: true });

  const catalogueOptions =
    programs.length > 0
      ? programs.map((p) => ({
          code: p.catalogue_code!,
          title: p.title,
        }))
      : FORMATIONS.map((f) => ({ code: f.code, title: f.titre }));

  return (
    <div className="mx-auto max-w-3xl p-4 md:p-8">
      <Link href={LINKS.adminSessions} className="text-sm font-medium text-[#377CF3]">
        ← Sessions de formation
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">
        Nouvelle session
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        Les infos catalogue sont préremplies. La référence (ex. IA-BTP-2026-001) est générée
        automatiquement et reste stable.
      </p>

      <form action={createSessionAction} className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
        <section className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-slate-900">Identification</h2>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Formation catalogue</span>
            <select
              name="catalogueCode"
              required
              defaultValue={prefillCode || catalogueOptions[0]?.code}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            >
              {catalogueOptions.map((o) => (
                <option key={o.code} value={o.code}>
                  {o.code} — {o.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Nom de la session</span>
            <input
              name="name"
              placeholder="Ex. IA BTP — session menuiserie XYZ"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Entreprise cliente</span>
            <select name="companyId" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
              <option value="">— À renseigner plus tard —</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Formateur principal</span>
            <select
              name="primaryTrainerId"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            >
              <option value="">—</option>
              {(trainers ?? []).map((t) => (
                <option key={t.id} value={t.id}>
                  {t.full_name || t.email}
                </option>
              ))}
            </select>
          </label>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <h2 className="font-display text-lg font-semibold text-slate-900 sm:col-span-2">
            Planning
          </h2>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Date début</span>
            <input name="startsOn" type="date" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Date fin</span>
            <input name="endsOn" type="date" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-slate-700">Horaires</span>
            <input
              name="scheduleText"
              placeholder="9h00–13h00"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Durée (heures)</span>
            <input name="durationHours" type="number" step="0.5" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Nombre de jours</span>
            <input name="daysCount" type="number" step="0.5" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
          </label>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <h2 className="font-display text-lg font-semibold text-slate-900 sm:col-span-2">
            Modalité & lieu
          </h2>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Modalité</span>
            <select name="modality" defaultValue="presentiel" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
              {Object.entries(MODALITY_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Max participants</span>
            <input name="maxParticipants" type="number" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-slate-700">Adresse</span>
            <input name="locationAddress" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Ville</span>
            <input name="locationCity" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Lien visioconférence</span>
            <input name="meetingUrl" type="url" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" />
          </label>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <h2 className="font-display text-lg font-semibold text-slate-900 sm:col-span-2">
            Contact entreprise
          </h2>
          <input name="companyContactName" placeholder="Nom contact" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          <input name="companyContactEmail" placeholder="Email contact" type="email" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          <input name="companyContactPhone" placeholder="Téléphone" className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2" />
          <textarea
            name="internalNotes"
            placeholder="Commentaires internes"
            rows={3}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2"
          />
        </section>

        <button
          type="submit"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#377CF3] px-4 font-semibold text-white sm:w-auto"
        >
          Créer la session
        </button>
      </form>

      <details className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <summary className="cursor-pointer font-semibold text-slate-900">
          Créer une entreprise cliente
        </summary>
        <form action={createCompanyAction} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input name="name" required placeholder="Raison sociale *" className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2" />
          <input name="siret" placeholder="SIRET" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          <input name="city" placeholder="Ville" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          <input name="contactName" placeholder="Contact" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          <input name="contactEmail" placeholder="Email" type="email" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white sm:col-span-2">
            Enregistrer l’entreprise
          </button>
        </form>
      </details>
    </div>
  );
}
