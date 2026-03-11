import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { EmargementForm } from './EmargementForm';
import { isAdmin } from '@/lib/auth';

export default async function EmargementPage({
  searchParams,
}: { searchParams: Promise<{ course?: string; date?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/connexion');
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) redirect('/espace-apprenant');

  const params = await searchParams;
  const courseId = params.course;
  const sessionDate = params.date;

  const { data: courses } = await supabase.from('courses').select('id, title, duration_hours').order('title');

  let apprenants: { id: string; nom: string; prenom: string; email: string }[] = [];
  let courseTitle = '';
  let duration = '';

  if (courseId) {
    const { data: c } = await supabase.from('courses').select('title, duration_hours').eq('id', courseId).single();
    if (c) {
      courseTitle = c.title ?? 'Formation';
      duration = c.duration_hours ? `${c.duration_hours} heure(s)` : 'Variable';
    }
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('user_id')
      .eq('course_id', courseId);
    const userIds = [...new Set((enrollments ?? []).map((e) => e.user_id))];
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, full_name, email')
        .in('id', userIds)
        .order('last_name');
      apprenants = (profiles ?? []).map((p) => {
        const first = (p as { first_name?: string }).first_name ?? (p as { full_name?: string }).full_name?.split(' ')[0] ?? '';
        const last = (p as { last_name?: string }).last_name ?? (p as { full_name?: string }).full_name?.split(' ').slice(1).join(' ') ?? '';
        return { id: p.id, prenom: first, nom: last, email: p.email ?? '' };
      });
    }
  }

  return (
    <div className="p-4 md:p-8">
      <Link href="/admin/qualite" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[var(--accent)]">
        ← Retour Qualiopi
      </Link>
      <h1 className="font-display text-2xl font-bold text-slate-900">Feuille d&apos;émargement</h1>
      <p className="mt-2 text-slate-600">
        Générez une feuille d&apos;émargement imprimable pour une formation et une session.
      </p>

      <EmargementForm courses={courses ?? []} />

      {courseId && (
        <div className="mt-8">
          <FeuilleEmargementPrint
            formation={courseTitle}
            duree={duration}
            dateSession={sessionDate ?? new Date().toISOString().slice(0, 10)}
            apprenants={apprenants}
          />
        </div>
      )}
    </div>
  );
}

function FeuilleEmargementPrint({
  formation,
  duree,
  dateSession,
  apprenants,
}: {
  formation: string;
  duree: string;
  dateSession: string;
  apprenants: { id: string; nom: string; prenom: string; email: string }[];
}) {
  const dateFormatted = new Date(dateSession + 'T12:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="print-only mt-8" style={{ display: 'block' }}>
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 print:border print:shadow-none" id="feuille-emargement">
        <div className="mb-8 text-center">
          <h2 className="font-display text-xl font-bold text-slate-900">FEUILLE D&apos;ÉMARGEMENT</h2>
          <p className="mt-2 text-slate-600">OFC Création d&apos;Entreprise — SIRET 905 244 281 00010 — Qualiopi</p>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Formation :</strong> {formation}
          </div>
          <div>
            <strong>Durée :</strong> {duree}
          </div>
          <div>
            <strong>Date de session :</strong> {dateFormatted}
          </div>
        </div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-slate-300 bg-slate-50">
              <th className="px-3 py-2 text-left font-semibold text-slate-900">N°</th>
              <th className="px-3 py-2 text-left font-semibold text-slate-900">Nom</th>
              <th className="px-3 py-2 text-left font-semibold text-slate-900">Prénom</th>
              <th className="px-3 py-2 text-left font-semibold text-slate-900">Signature</th>
            </tr>
          </thead>
          <tbody>
            {apprenants.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-8 text-center text-slate-500">
                  Aucun apprenant inscrit à cette formation. Les lignes ci-dessous peuvent être utilisées pour une inscription manuelle.
                </td>
              </tr>
            ) : (
              apprenants.map((a, i) => (
                <tr key={a.id} className="border-b border-slate-200">
                  <td className="px-3 py-3 text-slate-600">{i + 1}</td>
                  <td className="px-3 py-3 font-medium text-slate-900">{a.nom}</td>
                  <td className="px-3 py-3 text-slate-700">{a.prenom}</td>
                  <td className="px-3 py-3">
                    <div className="h-8 border-b border-slate-300 print:min-h-[32px]" />
                  </td>
                </tr>
              ))
            )}
            {apprenants.length > 0 && apprenants.length < 15 && (
              Array.from({ length: 15 - apprenants.length }).map((_, i) => (
                <tr key={`empty-${i}`} className="border-b border-slate-200">
                  <td className="px-3 py-2 text-slate-400">{apprenants.length + i + 1}</td>
                  <td className="px-3 py-2" />
                  <td className="px-3 py-2" />
                  <td className="px-3 py-2">
                    <div className="h-6 border-b border-slate-200" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <p className="mt-6 text-xs text-slate-500">
          Document généré le {new Date().toLocaleDateString('fr-FR')} — Les stagiaires doivent signer pour chaque demi-journée de formation. L&apos;émargement conditionne la délivrance de l&apos;attestation.
        </p>
      </div>
      <div className="mt-6 print:hidden">
        <PrintButton targetId="feuille-emargement" />
      </div>
    </div>
  );
}

function PrintButton({ targetId }: { targetId: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        const el = document.getElementById(targetId);
        if (el) {
          const w = window.open('', '_blank');
          if (w) {
            w.document.write(`
              <html><head><title>Feuille d'émargement</title>
              <style>body{font-family:sans-serif;padding:2rem;} table{width:100%;border-collapse:collapse;}
              th,td{border:1px solid #ccc;padding:8px;text-align:left;}</style></head><body>
              ${el.innerHTML}
              </body></html>
            `);
            w.document.close();
            w.print();
            w.close();
          }
        }
      }}
      className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700"
    >
      Imprimer / Enregistrer en PDF
    </button>
  );
}
