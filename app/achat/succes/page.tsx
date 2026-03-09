import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Check } from 'lucide-react';
import Stripe from 'stripe';

export default async function AchatSuccesPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id) redirect('/formations');

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/connexion');

  let slug = '';
  let title = 'Formation';

  if (process.env.STRIPE_SECRET_KEY) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.retrieve(session_id);
      const courseId = session.metadata?.courseId;
      if (courseId) {
        const { data: c } = await supabase.from('courses').select('slug, title').eq('id', courseId).single();
        if (c) {
          slug = (c as { slug?: string }).slug ?? '';
          title = (c as { title?: string }).title ?? 'Formation';
        }
      }
    } catch {
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('courses(slug, title)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);
      const last = enrollments?.[0];
      const course = (last as { courses?: { slug?: string; title?: string } })?.courses;
      if (course) {
        slug = course.slug ?? '';
        title = course.title ?? 'Formation';
      }
    }
  } else {
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('courses(slug, title)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1);
    const last = enrollments?.[0];
    const course = (last as { courses?: { slug?: string; title?: string } })?.courses;
    if (course) {
      slug = course.slug ?? '';
      title = course.title ?? 'Formation';
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
        <Check size={32} strokeWidth={2} className="text-emerald-600" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-bold text-slate-900">Paiement réussi</h1>
      <p className="mt-3 text-slate-600">
        Merci pour votre achat. Vous avez maintenant accès à <strong>{title}</strong>.
      </p>
      <Link
        href={slug ? `/espace-apprenant/cours/${slug}` : '/espace-apprenant/mes-formations'}
        className="mt-8 inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Accéder à ma formation
      </Link>
      <p className="mt-6">
        <Link href="/espace-apprenant" className="text-sm text-[var(--accent)] hover:underline">
          Retour au dashboard
        </Link>
      </p>
    </div>
  );
}
