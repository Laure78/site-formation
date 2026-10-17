import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

export function FormationsCatalogue2027Hero() {
  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden`} aria-labelledby="formations-catalogue-hero-h1">
      <div className="relative mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <p className="ofc-badge bg-ofc-accent-soft text-ofc-accent">Catalogue · Formations IA BTP</p>
        <h1
          id="formations-catalogue-hero-h1"
          className="ofc-type-hero mt-5 max-w-3xl text-balance text-ofc-ink"
        >
          Formations IA pour les professionnels du BTP
        </h1>
        <p className="ofc-type-lead mt-5 max-w-2xl text-ofc-ink-muted">
          Choisissez une formation adaptée à vos besoins et à votre niveau. Apprenez à utiliser
          ChatGPT et Claude sur vos documents et vos situations de travail.
        </p>
        <p className="mt-3 text-sm font-medium text-ofc-ink">En présentiel en Île-de-France.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#catalogue-formations"
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Explorer les formations
          </a>
          <Link
            href={`${LINKS.contact}?objet=choix-formation&src=catalogue-hero`}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Être conseillé
          </Link>
        </div>
      </div>
    </section>
  );
}
