import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { BookOpen, Clock } from 'lucide-react';
import { BuyButton } from '../BuyButton';

/**
 * Canonical SEO : /cours/[slug] → page catalogue / landing publique
 * (évite le duplicate content avec les fiches /formations).
 */
const COURS_SLUG_CANONICAL_PATH: Record<string, string> = {
  // Correspondance demandée
  'ia-appels-offre-btp': LINKS.formationAO,
  'ia-au-service-du-btp': LINKS.formationIaBtpNiveau1BatimentTp,
  'ia-travaux-publics': LINKS.formationIaTravauxPublics,
  'ia-niveau2-assistant-ao-dce-memoire': LINKS.formationAO,
  'ia-architecture-claude-dpgf': LINKS.formationMaitriserClaudeAiBtp,
  'ia-rh-btp': LINKS.formations,
  'formation-ia-sensibilisation-prompt-engineering-assistants': LINKS.formations,
  // Slugs LMS catalogue (1:1 avec fiches /formations)
  'ia-batiment-travaux-publics': LINKS.formationIaBtpNiveau1BatimentTp,
  'ia-conduite-travaux-suivi-chantier': LINKS.formationConduiteTravauxSuiviChantier,
  'maitriser-claude-ai-btp': LINKS.formationMaitriserClaudeAiBtp,
  'ia-maitrise-oeuvre': LINKS.formationIaMaitriseOeuvre,
  'formation-claude-ia-btp': LINKS.formationClaudeIaBtpFiche,
  'pdf-btp-claude-skills': LINKS.formationClaudeIaBtpFiche,
};

function coursCanonicalUrl(slug: string): string {
  const path = COURS_SLUG_CANONICAL_PATH[slug] ?? LINKS.formations;
  return `${SITE_CONFIG.url.replace(/\/$/, '')}${path}`;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('courses').select('title').eq('slug', slug).eq('published', true).single();
  if (!data) return { title: 'Cours non trouvé' };
  /** Meta manuelle (gabarit) — jamais d’excerpt / slice BDD. */
  const COURS_META_DESCRIPTION =
    'Cours formation IA pour le BTP : module pratique présentiel IDF, supports Qualiopi OFC. Constructys selon éligibilité. Accédez au programme et RDV découverte.';
  const meta = createPageMetadata({
    title: data.title,
    description: COURS_META_DESCRIPTION,
    descriptionFinal: true,
    path: `/cours/${slug}`,
  });
  const canonical = coursCanonicalUrl(slug);
  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      canonical,
    },
  };
}

export default async function CoursDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: course } = await supabase
    .from('courses')
    .select('id, slug, title, description, image_url, price, duration_hours, level')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!course) notFound();

  const price = Number(course.price ?? 0);
  const isFree = price <= 0;
  const stripeEnabled = !!process.env.STRIPE_SECRET_KEY;
  let enrolled = false;
  if (user) {
    const { data: e } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', course.id)
      .single();
    enrolled = !!e;
  }

  const { data: modules } = await supabase
    .from('modules')
    .select('id, title, order_index, lessons(id, title, type, order_index, duration_minutes)')
    .eq('course_id', course.id)
    .order('order_index');

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="aspect-video w-full overflow-hidden bg-slate-200">
              {course.image_url ? (
                <img
                  src={course.image_url}
                  alt={`Formation intelligence artificielle BTP : ${course.title} par Laure Olivié`}
                  width={1280}
                  height={720}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-400">
                  <BookOpen size={64} strokeWidth={1.5} />
                </div>
              )}
            </div>
            <div className="p-4 md:p-8">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{course.level ?? 'débutant'}</span>
              <h1 className="mt-1 font-display text-3xl font-bold text-slate-900">{course.title}</h1>
              <p className="mt-4 text-slate-600">{course.description ?? ''}</p>
              {modules && modules.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-semibold text-slate-900">Programme</h2>
                  <ul className="mt-4 space-y-3">
                    {modules.map((m) => (
                      <li key={m.id}>
                        <span className="font-medium text-slate-700">{m.title}</span>
                        {(m.lessons as { title: string }[] ?? []).length > 0 && (
                          <ul className="mt-1 ml-4 text-sm text-slate-500">
                            {(m.lessons as { title: string }[]).map((l, i) => (
                              <li key={i}>• {l.title}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="border-t border-slate-200 p-6 md:col-span-2 md:border-t-0 md:border-l md:p-8">
            <div className="sticky top-8">
              <div className="flex items-center gap-2 text-slate-600">
                <Clock size={20} strokeWidth={1.5} />
                {course.duration_hours ? `${course.duration_hours}h de formation` : 'Variable'}
              </div>
              <div className="mt-6">
                {enrolled ? (
                  <Link
                    href={`/espace-apprenant/cours/${course.slug}`}
                    className="block w-full rounded-xl bg-[var(--accent)] px-4 py-4 text-center font-semibold text-white hover:bg-blue-700"
                  >
                    Accéder au cours
                  </Link>
                ) : isFree ? (
                  <Link
                    href={user ? `/api/enroll-free?courseId=${course.id}` : `/auth/connexion?next=/cours/${slug}`}
                    className="block w-full rounded-xl bg-emerald-600 px-4 py-4 text-center font-semibold text-white hover:bg-emerald-700"
                  >
                    S&apos;inscrire gratuitement
                  </Link>
                ) : stripeEnabled ? (
                  <BuyButton courseId={course.id} courseTitle={course.title} price={price} />
                ) : (
                  <Link
                    href={`/contact?formation=${encodeURIComponent(course.title)}`}
                    className="block w-full rounded-xl bg-[var(--accent)] px-4 py-4 text-center font-semibold text-white hover:bg-blue-700"
                  >
                    Demander l&apos;accès
                  </Link>
                )}
              </div>
              <p className="mt-4 text-center text-xs text-slate-500">
                {stripeEnabled ? 'Paiement sécurisé par Stripe • ' : ''}Accès immédiat ou sur demande
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/formations" className="text-sm text-[var(--accent)] hover:underline">← Retour aux formations</Link>
      </div>
    </div>
  );
}
