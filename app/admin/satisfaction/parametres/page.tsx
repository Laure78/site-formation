import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { getSatisfactionSettings } from '@/lib/training-ops/satisfaction/settings';
import { saveSatisfactionSettingsAction } from '@/app/admin/satisfaction/actions';
import { OrgCard, OrgPageHeader, orgPageBg } from '@/components/admin/mon-espace/ui';

export default async function SatisfactionSettingsPage() {
  const settings = await getSatisfactionSettings().catch(() => null);

  return (
    <div className={`min-h-screen ${orgPageBg} px-4 py-8 md:px-8`}>
      <div className="mx-auto max-w-2xl space-y-6">
        <OrgPageHeader
          title="Paramètres · Satisfaction & Avis"
          description="Délais d’envoi, relances et URLs — sans modifier l’historique des réponses déjà enregistrées."
          actions={
            <Link href={LINKS.adminSatisfaction} className="text-sm text-[#377CF3] hover:underline">
              Retour
            </Link>
          }
        />
        {settings ? (
          <OrgCard>
            <form action={saveSatisfactionSettingsAction} className="space-y-8">
              <section>
                <h2 className="font-display text-lg font-bold text-slate-900">Questionnaire</h2>
                <label className="mt-4 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="questionnaire_auto_enabled"
                    defaultChecked={settings.questionnaire_auto_enabled}
                  />
                  Activation envoi automatique
                </label>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm">
                    Délai premier envoi (jours après fin)
                    <input
                      type="number"
                      name="questionnaire_first_send_days"
                      min={0}
                      defaultValue={settings.questionnaire_first_send_days}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                  </label>
                  <label className="text-sm">
                    Relance 1 (jours)
                    <input
                      type="number"
                      name="questionnaire_reminder_1_days"
                      min={1}
                      defaultValue={settings.questionnaire_reminder_1_days}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                  </label>
                  <label className="text-sm">
                    Relance 2 (jours)
                    <input
                      type="number"
                      name="questionnaire_reminder_2_days"
                      min={1}
                      defaultValue={settings.questionnaire_reminder_2_days}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                  </label>
                  <label className="text-sm">
                    Nombre max. de relances
                    <input
                      type="number"
                      name="questionnaire_max_reminders"
                      min={0}
                      max={2}
                      defaultValue={settings.questionnaire_max_reminders}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                  </label>
                </div>
              </section>
              <section>
                <h2 className="font-display text-lg font-bold text-slate-900">Avis Google</h2>
                <label className="mt-4 flex items-center gap-2 text-sm">
                  <input type="checkbox" name="google_auto_enabled" defaultChecked={settings.google_auto_enabled} />
                  Activation automatique après questionnaire
                </label>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm">
                    Délai après réponse (jours)
                    <input
                      type="number"
                      name="google_delay_after_complete_days"
                      min={0}
                      defaultValue={settings.google_delay_after_complete_days}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                  </label>
                  <label className="text-sm">
                    Relance Google (jours après 1er envoi)
                    <input
                      type="number"
                      name="google_reminder_days"
                      min={1}
                      defaultValue={settings.google_reminder_days}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                  </label>
                  <label className="text-sm">
                    Nombre max. relances Google
                    <input
                      type="number"
                      name="google_max_reminders"
                      min={0}
                      max={1}
                      defaultValue={settings.google_max_reminders}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                  </label>
                  <label className="text-sm sm:col-span-2">
                    URL Google (dépôt d’avis)
                    <input
                      type="url"
                      name="google_review_url"
                      defaultValue={settings.google_review_url}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                    />
                  </label>
                </div>
              </section>
              <section>
                <h2 className="font-display text-lg font-bold text-slate-900">Email</h2>
                <label className="mt-4 block text-sm">
                  Nom expéditeur
                  <input
                    name="email_from_name"
                    defaultValue={settings.email_from_name}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                  />
                </label>
                <label className="mt-4 block text-sm">
                  Email expéditeur (Resend) — vide = variable d’environnement
                  <input
                    name="email_from_address"
                    type="email"
                    defaultValue={settings.email_from_address ?? ''}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                  />
                </label>
                <label className="mt-4 block text-sm">
                  Adresse de réponse
                  <input
                    name="email_reply_to"
                    type="email"
                    defaultValue={settings.email_reply_to}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                  />
                </label>
                <label className="mt-4 block text-sm">
                  URL questionnaire public (Tally) — vide = défaut site
                  <input
                    name="questionnaire_public_url"
                    defaultValue={settings.questionnaire_public_url ?? ''}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                  />
                </label>
              </section>
              <button
                type="submit"
                className="rounded-xl bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Enregistrer
              </button>
            </form>
          </OrgCard>
        ) : (
          <p className="text-sm text-red-600">
            Exécutez la migration Supabase 065_training_satisfaction_google.sql pour activer les paramètres.
          </p>
        )}
      </div>
    </div>
  );
}
