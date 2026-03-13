import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { BookOpen, Clock, Video } from 'lucide-react';
import { BuyButton } from './BuyButton';
import { LinkedInLearningEmbed } from '@/components/LinkedInLearningEmbed';
import { FAQSection } from '@/components/landing/FAQSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQ_COURS } from '@/lib/faq';

export const metadata = createPageMetadata({
  title: 'Catalogue des cours en ligne — IA BTP',
  description: 'Formations IA en ligne pour entrepreneurs et professionnels du BTP.',
  path: '/cours',
});

export default async function CoursPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const stripeEnabled = !!process.env.STRIPE_SECRET_KEY;

  const { data: courses } = await supabase
    .from('courses')
    .select('id, slug, title, description, image_url, price, duration_hours, level')
    .eq('published', true)
    .order('created_at', { ascending: false });

  let enrolledIds: string[] = [];
  if (user) {
    const { data: enrolls } = await supabase
      .from('enrollments')
      .select('course_id')
      .eq('user_id', user.id);
    enrolledIds = (enrolls ?? []).map((e) => e.course_id);
  }

  const faqSchema = getFAQSchema(FAQ_COURS);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Catalogue des cours en ligne
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Formations IA pratiques accessibles à tout moment.
        </p>
      </div>

      {/* Formations LinkedIn — expertise à découvrir */}
      <div className="mt-12 space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <div className="flex items-center gap-2">
            <Video size={24} strokeWidth={1.5} className="text-[var(--accent)]" />
            <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              L&apos;IA pour le BTP : Des solutions concrètes pour vos chantiers
            </h2>
          </div>
          <p className="mt-2 text-slate-600">
            Découvrez ma formation sur les solutions IA pour vos chantiers — Laure Olivié, formatrice LinkedIn Learning.
          </p>
          <div className="mt-6">
            <LinkedInLearningEmbed course="chantiers" showCaption={false} compact />
          </div>
          <a
            href="https://www.linkedin.com/learning/l-ia-pour-le-btp-des-solutions-concretes-pour-vos-chantiers"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Voir la formation complète sur LinkedIn Learning →
          </a>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <div className="flex items-center gap-2">
            <Video size={24} strokeWidth={1.5} className="text-[var(--accent)]" />
            <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              L&apos;IA pour recruter sa main-d&apos;œuvre efficacement
            </h2>
          </div>
          <p className="mt-2 text-slate-600">
            Découvrez ma formation sur le recrutement BTP avec l&apos;IA — Laure Olivié, formatrice LinkedIn Learning.
          </p>
          <div className="mt-6">
            <LinkedInLearningEmbed course="recrutement" showCaption={false} compact />
          </div>
          <a
            href="https://www.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Voir la formation complète sur LinkedIn Learning →
          </a>
        </section>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {(courses ?? []).length === 0 ? (
          <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <BookOpen size={48} strokeWidth={1} className="mx-auto text-slate-300" />
            <p className="mt-4 font-medium text-slate-700">Aucun cours publié pour l&apos;instant</p>
            <p className="mt-2 text-sm text-slate-500">Revenez bientôt pour découvrir nos formations.</p>
          </div>
        ) : (
          (courses ?? []).map((c) => {
            const enrolled = enrolledIds.includes(c.id);
            const price = Number(c.price ?? 0);
            const isFree = price <= 0;
            return (
              <div
                key={c.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <Link href={enrolled ? `/espace-apprenant/cours/${c.slug}` : `/cours/${c.slug}`} className="block flex-1">
                  <div className="aspect-video w-full overflow-hidden bg-slate-200">
                    {c.image_url ? (
                      <img src={c.image_url} alt={`Formation IA BTP : ${c.title}`} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <BookOpen size={48} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-400">{c.level ?? 'débutant'}</span>
                    <h2 className="mt-1 font-display text-lg font-semibold text-slate-900">{c.title}</h2>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">{c.description ?? ''}</p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                      <Clock size={16} strokeWidth={1.5} />
                      {c.duration_hours ? `${c.duration_hours}h` : '-'}
                    </div>
                  </div>
                </Link>
                <div className="border-t border-slate-100 p-6">
                  {enrolled ? (
                    <Link
                      href={`/espace-apprenant/cours/${c.slug}`}
                      className="block w-full rounded-xl bg-[var(--accent)] px-4 py-3 text-center font-semibold text-white hover:bg-blue-700"
                    >
                      Accéder au cours
                    </Link>
                  ) : isFree ? (
                    <Link
                      href={user ? `/api/enroll-free?courseId=${c.id}` : `/auth/connexion?next=/cours/${c.slug}`}
                      className="block w-full rounded-xl bg-emerald-600 px-4 py-3 text-center font-semibold text-white hover:bg-emerald-700"
                    >
                      S&apos;inscrire gratuitement
                    </Link>
                  ) : stripeEnabled ? (
                    <BuyButton courseId={c.id} courseTitle={c.title} price={price} />
                  ) : (
                    <Link
                      href={`/contact?formation=${encodeURIComponent(c.title)}`}
                      className="block w-full rounded-xl bg-[var(--accent)] px-4 py-3 text-center font-semibold text-white hover:bg-blue-700"
                    >
                      Demander l&apos;accès
                    </Link>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <FAQSection
        items={FAQ_COURS}
        title="Questions fréquentes sur les cours en ligne"
        subtitle="Formations présentielles vs en ligne, financement, accès."
      />

      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/formations" className="text-sm text-[var(--accent)] hover:underline">← Catalogue formations</Link>
        <Link href="/chatgpt-artisans-btp" className="text-sm text-[var(--accent)] hover:underline">ChatGPT artisans BTP</Link>
        <Link href="/ia-devis-batiment" className="text-sm text-[var(--accent)] hover:underline">IA devis bâtiment</Link>
        <Link href="/ia-conducteur-travaux" className="text-sm text-[var(--accent)] hover:underline">IA conducteur de travaux</Link>
        <Link href="/blog" className="text-sm text-[var(--accent)] hover:underline">Articles et guides</Link>
      </div>

      <AllerPlusLoin
        variant="compact"
        links={[
          { href: '/formations', label: 'Formation IA BTP' },
          { href: '/chatgpt-artisans-btp', label: 'ChatGPT artisans BTP' },
          { href: '/prendre-rdv', label: 'Prendre rendez-vous' },
        ]}
      />
    </div>
  );
}
