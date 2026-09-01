import Link from 'next/link';
import Image from 'next/image';
import { getGoogleReviews, formatRating } from '@/lib/google-reviews';
import { googleReviewsToMarqueeItems } from '@/lib/google-reviews-marquee';
import { SITE_CONFIG } from '@/lib/seo';
import { GoogleReviewsMarquee } from '@/components/landing/GoogleReviewsMarquee';
import { Temoignages } from '@/components/Temoignages';
import { getTemoignagesRemplis } from '@/data/temoignages';
import { Star, Award, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RevealShell } from '@/components/motion/RevealShell';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { RdvLink } from '@/components/RdvLink';
import { CSFE_NOM_LIBRE } from '@/lib/csfe';
import { PHOTOS } from '@/lib/photos';
import { QualiopiWordmark } from '@/components/QualiopiLogo';

const ETUDE_HREF = '/etudes-de-cas/ffb-csfe';

/**
 * Preuve sociale home — avis Google si dispo, sinon étude de cas FFB/CSFE
 * (sans annoncer d’avis absents). Option A : `Temoignages` dès que `data/temoignages.ts` est rempli.
 */
export async function GoogleReviewsSection() {
  const data = await getGoogleReviews();

  const hasGoogleApi = Boolean(data && data.reviews.length > 0);
  const marqueeItems = hasGoogleApi && data ? googleReviewsToMarqueeItems(data.reviews) : [];
  const hasTemoignages = getTemoignagesRemplis().length > 0;

  const kicker = hasGoogleApi ? 'AVIS GOOGLE' : hasTemoignages ? 'AVIS CLIENTS' : 'BÉNÉFICES';
  const heading = hasGoogleApi
    ? 'Avis Google & étude de cas FFB'
    : hasTemoignages
      ? 'Avis clients & étude de cas FFB'
      : 'Étude de cas : FFB & filière étanchéité';

  return (
    <section id="temoignages" className={`${OFC_SEC.muted} scroll-mt-24`}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <RevealShell>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
              <Award size={16} strokeWidth={1.5} />
              <span>{kicker}</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">{heading}</h2>
            {hasGoogleApi ? (
              <p className="mt-3 text-slate-600">
                Avis authentiques sur Google Business Profile — défilant ci-dessous. Étude de cas FFB &amp; étanchéité
                en complément.
              </p>
            ) : hasTemoignages ? (
              <p className="mt-3 text-slate-600">
                Retours d&apos;entreprises formées à l&apos;IA — étude de cas FFB / filière étanchéité en complément.
              </p>
            ) : null}
          </RevealShell>

          {hasGoogleApi && data ? (
            <RevealShell>
              <div className="flex flex-col items-end rounded-2xl border-2 border-[var(--accent)] bg-white px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold text-[var(--accent)]">{formatRating(data.rating)}</span>
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
                <p className="mt-1 text-sm text-slate-600">{data.user_ratings_total} avis Google</p>
              </div>
            </RevealShell>
          ) : null}
        </div>

        {hasGoogleApi ? (
          <RevealShell className="mt-10">
            <GoogleReviewsMarquee reviews={marqueeItems} />
          </RevealShell>
        ) : (
          <Temoignages className="mt-10" />
        )}

        {hasGoogleApi ? (
          <RevealShell className="mt-10 text-center">
            <a
              href={SITE_CONFIG.googleBusinessProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--accent)] px-8 py-3 font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft)]"
            >
              Voir la fiche et tous les avis sur Google
              <ExternalLink size={18} strokeWidth={1.5} />
            </a>
          </RevealShell>
        ) : null}

        {/* Étude de cas FFB / CSFE */}
        <div
          className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-12 ${
            hasGoogleApi || hasTemoignages ? 'mt-16 border-t border-slate-200 pt-12' : 'mt-10'
          }`}
        >
          <div className="min-w-0 max-w-3xl lg:max-w-none">
            <RevealShell>
              {!hasGoogleApi && !hasTemoignages ? null : (
                <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--accent)] shadow-sm">
                  Étude de cas
                </p>
              )}
              <h3
                className={`font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl ${
                  !hasGoogleApi && !hasTemoignages ? '' : 'mt-4'
                }`}
              >
                FFB &amp; étanchéité :{' '}
                <span className="font-serif italic text-slate-800">ce qui a été mis en place</span>
              </h3>
              <p className="mt-4 text-lg text-slate-600">
                Retour d&apos;expérience détaillé : défis, dispositif pédagogique, modules (mémoires, DCE, chantier) et
                suites concrètes pour les entreprises du réseau.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700 md:text-base">
                <li className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={2} aria-hidden />
                  <span>Cas réels métier — pas de démonstration gadget.</span>
                </li>
                <li className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={2} aria-hidden />
                  <span>Présentiel, documents anonymisés, validation humaine des sorties.</span>
                </li>
                <li className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={2} aria-hidden />
                  <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                    <span>Financement OPCO /</span>
                    <QualiopiWordmark />
                    <span>lorsque les entreprises sont éligibles.</span>
                  </span>
                </li>
              </ul>
            </RevealShell>
            <RevealShell className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <RdvLink
                page="/"
                ctaPosition="middle"
                campaign="accueil-temoignages-etude-cas"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-md shadow-blue-500/15 transition-colors hover:bg-blue-700"
              >
                Prendre rendez-vous
              </RdvLink>
              <Link
                href={ETUDE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-center text-sm font-semibold text-slate-800 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
              >
                Lire l&apos;étude de cas complète
                <ArrowRight size={18} strokeWidth={2} aria-hidden />
              </Link>
            </RevealShell>
          </div>
          <RevealShell as="figure" className="min-w-0 lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)]">
              <Image
                src={PHOTOS.accueilEtudeCasFfbLaureIntervention.src}
                alt={PHOTOS.accueilEtudeCasFfbLaureIntervention.alt}
                title={PHOTOS.accueilEtudeCasFfbLaureIntervention.title}
                width={PHOTOS.accueilEtudeCasFfbLaureIntervention.width}
                height={PHOTOS.accueilEtudeCasFfbLaureIntervention.height}
                loading="lazy"
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              
                quality={70}/>
            </div>
            <figcaption className="mt-3 text-center text-sm text-slate-500">
              Laure Olivié — animation formation IA pour les pros du BTP en présentiel (réseau FFB, filière étanchéité /{' '}
              {CSFE_NOM_LIBRE})
            </figcaption>
          </RevealShell>
        </div>
      </div>
    </section>
  );
}
