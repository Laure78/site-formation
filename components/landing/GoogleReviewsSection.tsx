import { getGoogleReviews, formatRating } from '@/lib/google-reviews';
import { Star, Award, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export async function GoogleReviewsSection() {
  const data = await getGoogleReviews();

  // Si pas de données, afficher les avis statiques existants
  if (!data || data.reviews.length === 0) {
    return (
      <section
        id="temoignages"
        className="scroll-mt-24 border-b border-slate-200 bg-slate-50 px-4 py-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <Award size={16} strokeWidth={1.5} />
            <span>AVIS CLIENTS</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Cas concrets d&apos;entreprises du BTP formées
          </h2>
          <p className="mt-3 text-slate-600">
            Découvrez comment des entreprises du BTP comme la vôtre utilisent
            l&apos;IA au quotidien.
          </p>
          
          {/* Avis statiques par défaut */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "Depuis la formation, je génère mes devis 10 fois plus vite. Le retour sur investissement est immédiat. Mes équipes ont gagné en productivité.",
                name: "Marc DUBOIS",
                role: "Dirigeant",
                company: "DUBOIS Travaux Publics - 25 salariés",
                rating: 5,
              },
              {
                quote: "Formation 100 % terrain, zéro théorie inutile. On travaille directement sur nos vrais documents. Les gains de temps sont concrets dès le lendemain.",
                name: "Sophie MARTIN",
                role: "Assistante de direction",
                company: "BTP Construction - 45 salariés",
                rating: 5,
              },
              {
                quote: "J'ai automatisé tous mes comptes rendus de chantier. Je gagne minimum 2h par jour. La formation est parfaitement adaptée à notre métier.",
                name: "Pierre LEFEBVRE",
                role: "Conducteur de travaux",
                company: "Groupe Construction",
                rating: 5,
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="mt-4 italic text-slate-700">« {t.quote} »</p>
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-600">{t.role}</p>
                  <p className="text-sm text-slate-500">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Afficher les avis Google
  const displayedReviews = data.reviews.slice(0, 6);

  return (
    <section
      id="temoignages"
      className="scroll-mt-24 border-b border-slate-200 bg-slate-50 px-4 py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
              <Award size={16} strokeWidth={1.5} />
              <span>AVIS GOOGLE</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
              Cas concrets d&apos;entreprises du BTP formées
            </h2>
            <p className="mt-3 text-slate-600">
              Avis authentiques de nos stagiaires sur Google Business Profile
            </p>
          </div>
          
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
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedReviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-200">
                  {review.profile_photo_url ? (
                    <Image
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-lg font-bold text-slate-500">
                      {review.author_name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-semibold text-slate-900">
                    {review.author_name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {review.relative_time_description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < review.rating ? 'currentColor' : 'none'}
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                {review.text}
              </p>

              {review.author_url && (
                <a
                  href={review.author_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
                >
                  Voir sur Google
                  <ExternalLink size={14} strokeWidth={1.5} />
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Formation+IA+BTP+Laure+Olivié+Montigny-le-Bretonneux"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--accent)] px-8 py-3 font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft)]"
          >
            Voir tous les avis sur Google
            <ExternalLink size={18} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
