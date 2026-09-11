import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { InviterForm } from './InviterForm';
import { ImportApprenantsForm } from './ImportApprenantsForm';
import { ExportApprenantsButton } from './ExportApprenantsButton';
import { RenvoyerInvitationButton } from './RenvoyerInvitationButton';

export default async function AdminApprenantsPage() {
  const supabase = await createClient();
  const [
    { data: profiles },
    { data: courses },
    { data: enrollments },
    { data: lastSessions },
    { data: invitations },
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, first_name, last_name, full_name, email, created_at, account_status')
      .eq('role', 'apprenant')
      .order('created_at', { ascending: false }),
    supabase.from('courses').select('id, title').eq('published', true).order('title'),
    supabase.from('enrollments').select('user_id, course_id, progress_percent, courses(title)'),
    supabase.from('session_logs').select('user_id, started_at').order('started_at', { ascending: false }),
    supabase
      .from('invitations')
      .select('id, email, first_name, last_name, formation_id, status, sent_count, expires_at, created_at, accepted_at')
      .in('status', ['pending', 'expired', 'accepted'])
      .order('created_at', { ascending: false })
      .limit(50),
  ]);

  const formationIds = [...new Set((invitations ?? []).map((i) => i.formation_id).filter(Boolean))] as string[];
  const { data: invitationCourses } =
    formationIds.length > 0
      ? await supabase.from('courses').select('id, title').in('id', formationIds)
      : { data: [] as { id: string; title: string }[] };
  const courseTitleById = Object.fromEntries((invitationCourses ?? []).map((c) => [c.id, c.title]));

  const lastActivityByUser: Record<string, string> = {};
  for (const s of lastSessions ?? []) {
    if (!lastActivityByUser[s.user_id]) lastActivityByUser[s.user_id] = s.started_at;
  }

  const enrollmentsByUser: Record<string, { title: string; progress: number }[]> = {};
  for (const e of enrollments ?? []) {
    const c = e.courses as { title?: string } | { title?: string }[] | null | undefined;
    const title = (Array.isArray(c) ? c[0]?.title : c?.title) ?? 'Formation';
    if (!enrollmentsByUser[e.user_id]) enrollmentsByUser[e.user_id] = [];
    enrollmentsByUser[e.user_id].push({ title, progress: e.progress_percent });
  }

  const getCompteLabel = (accountStatus: string | null | undefined) => {
    if (accountStatus === 'active') return { label: '✅ Compte activé', color: 'text-emerald-700 bg-emerald-50' };
    if (accountStatus === 'disabled') return { label: '⛔ Désactivé', color: 'text-rose-700 bg-rose-50' };
    if (accountStatus === 'invited') return { label: '📧 Invitation envoyée', color: 'text-amber-800 bg-amber-50' };
    return { label: '⏳ Invitation à envoyer', color: 'text-slate-600 bg-slate-50' };
  };

  const formatInvitationStatus = (inv: {
    status: string;
    expires_at: string;
    created_at?: string;
    accepted_at?: string | null;
  }) => {
    if (inv.status === 'accepted') {
      const when = inv.accepted_at
        ? new Date(inv.accepted_at).toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : null;
      return {
        label: when ? `✅ Compte activé le ${when}` : '✅ Compte activé',
        color: 'text-emerald-700',
      };
    }
    if (inv.status === 'expired' || new Date(inv.expires_at) <= new Date()) {
      return { label: '⏳ Lien expiré — renvoyer', color: 'text-amber-800' };
    }
    const sent = inv.created_at
      ? new Date(inv.created_at).toLocaleString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : null;
    return {
      label: sent ? `📧 Invitation envoyée le ${sent}` : '📧 Invitation envoyée',
      color: 'text-blue-700',
    };
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Apprenants</h1>
          <p className="mt-2 text-slate-600">Liste des inscrits et leur progression</p>
        </div>
        <ExportApprenantsButton />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {(courses ?? []).length > 0 && <InviterForm courses={courses ?? []} />}
        <ImportApprenantsForm courses={courses ?? []} />
      </div>

      {(invitations ?? []).length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="font-display text-lg font-semibold text-slate-900">Invitations</h2>
            <p className="text-sm text-slate-600">
              Email avec identifiant (= adresse email) + lien sécurisé pour créer le mot de passe. « Renvoyer
              l’invitation » invalide l’ancien lien et en envoie un nouveau.
            </p>
          </div>
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Apprenant</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Formation</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Statut</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Envois</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(invitations ?? []).map((inv) => {
                const title = inv.formation_id ? courseTitleById[inv.formation_id] ?? '—' : '—';
                const name = [inv.first_name, inv.last_name].filter(Boolean).join(' ') || inv.email;
                const st = formatInvitationStatus(inv);
                return (
                  <tr key={inv.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-6 py-3">
                      <p className="font-medium text-slate-900">{name}</p>
                      <p className="text-sm text-slate-500">{inv.email}</p>
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-700">{title}</td>
                    <td className={`px-6 py-3 text-sm ${st.color}`}>{st.label}</td>
                    <td className="px-6 py-3 text-sm text-slate-600">{inv.sent_count}</td>
                    <td className="px-6 py-3 text-right">
                      {inv.status !== 'accepted' ? (
                        <RenvoyerInvitationButton
                          invitation={{
                            ...inv,
                            courses: { title },
                          }}
                        />
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Nom</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Formation</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Progression</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Dernière connexion</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Compte</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(profiles ?? []).length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  Aucun apprenant inscrit
                </td>
              </tr>
            ) : (
              (profiles ?? []).flatMap((p) => {
                const myEnrollments = enrollmentsByUser[p.id] ?? [];
                const compte = getCompteLabel((p as { account_status?: string }).account_status);
                const lastAct = lastActivityByUser[p.id]
                  ? new Date(lastActivityByUser[p.id]).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
                  : '—';
                const name = [(p as { first_name?: string }).first_name, (p as { last_name?: string }).last_name].filter(Boolean).join(' ') || (p as { full_name?: string }).full_name || '—';

                if (myEnrollments.length === 0) {
                  return (
                    <tr key={p.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-6 py-4">
                        <Link href={`/admin/apprenants/${p.id}`} className="font-medium text-slate-900 hover:text-[var(--accent)]">
                          {name}
                        </Link>
                        <p className="text-xs text-slate-500">Inscrit le {new Date(p.created_at).toLocaleDateString('fr-FR')}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{p.email}</td>
                      <td className="px-6 py-4 text-slate-400">—</td>
                      <td className="px-6 py-4">—</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{lastAct}</td>
                      <td className="px-6 py-4"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${compte.color}`}>{compte.label}</span></td>
                      <td className="px-6 py-4">
                        <Link href={`/admin/apprenants/${p.id}`} className="text-sm text-[var(--accent)] hover:underline">Profil</Link>
                      </td>
                    </tr>
                  );
                }
                return myEnrollments.map((e, i) => (
                  <tr key={`${p.id}-${i}`} className="border-b border-slate-100 last:border-0">
                    <td className="px-6 py-4">
                      {i === 0 ? (
                        <>
                          <Link href={`/admin/apprenants/${p.id}`} className="font-medium text-slate-900 hover:text-[var(--accent)]">{name}</Link>
                          <p className="text-xs text-slate-500">Inscrit le {new Date(p.created_at).toLocaleDateString('fr-FR')}</p>
                        </>
                      ) : null}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{i === 0 ? p.email : null}</td>
                    <td className="px-6 py-4 text-sm">{e.title}</td>
                    <td className="px-6 py-4 font-medium">{e.progress}%</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{i === 0 ? lastAct : null}</td>
                    <td className="px-6 py-4">{i === 0 ? <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${compte.color}`}>{compte.label}</span> : null}</td>
                    <td className="px-6 py-4">
                      {i === 0 ? (
                        <Link href={`/admin/apprenants/${p.id}`} className="text-sm text-[var(--accent)] hover:underline">Profil</Link>
                      ) : null}
                    </td>
                  </tr>
                ));
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
