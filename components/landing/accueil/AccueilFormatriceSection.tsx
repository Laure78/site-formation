import Link from 'next/link';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { LINKS } from '@/lib/internal-links';
import { formatAnneesExperienceBTP } from '@/lib/data/indicateurs-resultats';
import { OFC_CTA_PRIMARY, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

/** Formatrice — portrait et crédibilité, sans surcharge de liens. */
export function AccueilFormatriceSection() {
  return (
    <Section tone="white" aria-labelledby="accueil-formatrice">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-12">
        <div className="mx-auto w-full max-w-[14rem] lg:mx-0">
          <div className="overflow-hidden rounded-xl p-1 ring-1 ring-ofc-border/70">
            <ProfilePhoto title="Laure Olivié — formatrice IA pour le BTP, OFC Création d'Entreprise" />
          </div>
        </div>
        <div className="min-w-0 max-w-2xl">
          <Eyebrow>Formatrice</Eyebrow>
          <h2 id="accueil-formatrice" className={`${OFC_TYPE_H2} mt-4`}>
            Laure Olivié
          </h2>
          <p className="mt-2 text-lg font-semibold text-ofc-accent">Formatrice IA pour le BTP</p>
          <p className="mt-5 text-base leading-relaxed text-ofc-ink-muted">
            Ancienne dirigeante en travaux publics, {formatAnneesExperienceBTP()}. J’anime des
            sessions courtes en petit groupe sur vos documents réels — avec une exigence Qualiopi
            sur les programmes et les résultats.
          </p>
          <Link
            href={LINKS.aPropos}
            className={`${OFC_CTA_PRIMARY} mt-8 inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Découvrir mon parcours
          </Link>
        </div>
      </div>
    </Section>
  );
}
