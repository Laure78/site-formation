import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getProfile } from '@/lib/auth';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PrintButton } from '@/components/PrintButton';

export default async function AttestationPage({
  params,
}: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/connexion');

  const profile = await getProfile(user.id);
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('progress_percent')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .single();

  const { data: course } = await supabase
    .from('courses')
    .select('id, title, duration_hours')
    .eq('id', courseId)
    .single();

  if (!course || !enrollment || enrollment.progress_percent < 100) notFound();

  const p = profile as { first_name?: string; last_name?: string; full_name?: string } | null;
  const name = [p?.first_name, p?.last_name].filter(Boolean).join(' ') || p?.full_name || 'Apprenant';
  const duration = course.duration_hours ? `${course.duration_hours} heure${Number(course.duration_hours) > 1 ? 's' : ''}` : 'Variable';
  const today = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/espace-apprenant"
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[var(--accent)]"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          Retour à l&apos;espace apprenant
        </Link>
        <div className="ml-auto">
          <PrintButton />
        </div>
      </div>

      <div id="attestation" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm print:border-0 print:shadow-none md:p-12">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Attestation de suivi de formation
          </h1>
          <p className="mt-2 text-sm text-slate-600">Formation dispensée par un organisme certifié Qualiopi</p>
        </div>

        <div className="mt-12 space-y-4">
          <p className="text-slate-700">
            Je soussignée, <strong>Laure Olivié</strong>, formatrice au titre de l&apos;organisme OFC Création d&apos;Entreprise,
            certifie que :
          </p>
          <p className="text-center text-lg font-semibold text-slate-900">{name}</p>
          <p className="text-slate-700">
            a suivi la formation intitulée :
          </p>
          <p className="text-center text-lg font-semibold text-[var(--accent)]">{course.title}</p>
          <p className="text-slate-700">
            d&apos;une durée de <strong>{duration}</strong>, à hauteur de 100 % du programme.
          </p>
          <p className="text-slate-700">
            Formation dispensée en présentiel, en Île-de-France.
          </p>
        </div>

        <div className="mt-12 flex justify-between">
          <div>
            <p className="text-sm text-slate-500">Fait le {today}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-700">OFC Création d&apos;Entreprise</p>
            <p className="text-xs text-slate-500">Organisme certifié Qualiopi</p>
            <p className="text-xs text-slate-500">SIRET 905 244 281 00010</p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500 print:hidden">
        Utilisez le bouton « Imprimer » de votre navigateur et sélectionnez « Enregistrer au format PDF » pour télécharger l&apos;attestation.
      </p>
    </div>
  );
}
