import { getGoogleReviews, formatRating } from '@/lib/google-reviews';
import { googleReviewsToMarqueeItems } from '@/lib/google-reviews-marquee';
import { SITE_CONFIG } from '@/lib/seo';
import { GoogleReviewsMarquee } from '@/components/landing/GoogleReviewsMarquee';
import { Testimonial } from '@/components/testimonials/Testimonial';
import { getFilledTestimonials } from '@/lib/testimonials';
import { Star, Award, ExternalLink } from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { OFC_SEC } from '@/lib/ofc-section-classes';

export async function GoogleReviewsSection() {
  const data = await getGoogleReviews();

  const hasGoogleApi = data && data.reviews.length > 0;
  const marqueeItems = hasGoogleApi ? googleReviewsToMarqueeItems(data.reviews) : [];
  // Repli sans API Google : uniquement de VRAIS témoignages renseignés (voir lib/testimonials.ts).
  const testimonials = getFilledTestimonials();

  return (
    <section
      id="temoignages"
      className={`${OFC_SEC.muted} scroll-mt-24`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
              <Award size={16} strokeWidth={1.5} />
              <span>{hasGoogleApi ? 'AVIS GOOGLE' : 'AVIS CLIENTS'}</span>
            </div>
            <h3 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
              Cas concrets d&apos;entreprises du BTP formées
            </h3>
            <p className="mt-3 text-slate-600">
              {hasGoogleApi
                ? 'Avis authentiques sur Google Business Profile — défilant ci-dessous.'
                : 'Découvrez comment des entreprises du BTP comme la vôtre utilisent l’IA au quotidien.'}
            </p>
          </Reveal>

          {hasGoogleApi ? (
            <Reveal>
            <div className="flex flex-col items-end rounded-2xl border-2 border-[var(--accent)] bg-white px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-[var(--accent)]">
                  {formatRating(data.rating)}
                </span>
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < Math.floor(data.rating) ? 'currentColor' : 'none'}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                {data.user_ratings_total} avis Google
              </p>
            </div>
            </Reveal>
          ) : null}
        </div>

        {hasGoogleApi ? (
          <Reveal className="mt-10">
            <GoogleReviewsMarquee reviews={marqueeItems} />
          </Reveal>
        ) : testimonials.length > 0 ? (
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerMs={45}>
            {testimonials.map((t, i) => (
              <Testimonial key={`${t.firstNameInitial}-${i}`} {...t} />
            ))}
          </RevealGroup>
        ) : null}

        <Reveal className="mt-10 text-center">
          <a
            href={SITE_CONFIG.googleBusinessProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--accent)] px-8 py-3 font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft)]"
          >
            {hasGoogleApi ? 'Voir la fiche et tous les avis sur Google' : 'Fiche Google & avis'}
            <ExternalLink size={18} strokeWidth={1.5} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
