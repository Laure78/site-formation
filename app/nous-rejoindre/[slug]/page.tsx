import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { getJobOfferBySlug, getPublishedJobOffers } from '@/lib/data/job-offers';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { clampMetaDescription } from '@/lib/meta-description';
import { createPageMetadata } from '@/lib/seo';

export const revalidate = 3600;

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedJobOffers().map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = getJobOfferBySlug(slug);
  if (!offer) {
    return createPageMetadata({
      title: 'Offre d’emploi',
      description:
        'Offre d’emploi chez OFC Création d’Entreprise : formation IA pour le BTP en présentiel Île-de-France. Consultez la fiche ou déposez une candidature.',
      path: LINKS.emplois,
    });
  }
  const description = clampMetaDescription(
    `${offer.title} — ${offer.contractType}, ${offer.location}. ${offer.missionSummary}`,
  );
  return createPageMetadata({
    title: `${offer.title} — emploi OFC`,
    description,
    descriptionFinal: true,
    path: `${LINKS.emplois}/${offer.slug}`,
  });
}

export default async function EmploiDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const offer = getJobOfferBySlug(slug);
  if (!offer) notFound();

  const paragraphs = (offer.description ?? offer.missionSummary)
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className={ofcSectionClasses({ tone: 'white', size: 'default' })}>
      <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
        <Breadcrumb
          className="mb-4 text-sm"
          items={[
            { label: 'Accueil', href: LINKS.home },
            { label: 'Nous rejoindre', href: LINKS.emplois },
            { label: offer.title, href: `${LINKS.emplois}/${offer.slug}` },
          ]}
        />
        <h1 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">{offer.title}</h1>
        <p className="mt-2 text-sm text-slate-600">
          {offer.contractType} · {offer.location}
        </p>
        <div className="mt-8 space-y-4 text-slate-700 leading-relaxed">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={LINKS.candidaturesSpontanees}
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold`}
          >
            Postuler à cette offre
          </Link>
          <Link
            href={LINKS.emplois}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Toutes les offres
          </Link>
        </div>
      </div>
    </section>
  );
}
