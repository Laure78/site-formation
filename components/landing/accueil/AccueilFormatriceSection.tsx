import Link from 'next/link';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';
import { LinkedInPresenceCard } from '@/components/linkedin/LinkedInPresenceCard';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { LINKS } from '@/lib/internal-links';
import { LAURE_OLIVIE_CLIENT_REFERENCES_SHORT } from '@/lib/laure-olivie-profile';
import {
import { formatAnneesExperienceBTP } from '@/lib/data/indicateurs-resultats';
  OFC_CTA_PRIMARY,
  OFC_LINK,
  OFC_TYPE_H2,
} from '@/lib/ofc-interaction-classes';

/** Formatrice — portrait premium, expertise, LinkedIn. */
export function AccueilFormatriceSection() {
  return (
    <Section tone="white" aria-labelledby="accueil-formatrice">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-14">
        <div className="mx-auto w-full max-w-[15rem] lg:mx-0">
          <div className="overflow-hidden rounded-xl p-1 ring-1 ring-ofc-border/70">
            <ProfilePhoto title="Laure Olivié — formatrice IA pour le BTP, OFC Création d'Entreprise" />
          </div>
        </div>
        <div className="min-w-0">
          <Eyebrow>Formatrice</Eyebrow>
          <h2 id="accueil-formatrice" className={`${OFC_TYPE_H2} mt-4`}>
            Laure Olivié
          </h2>
          <p className="mt-2 text-lg font-semibold text-ofc-accent">
            Formatrice IA pour le BTP
          </p>
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-ofc-ink-muted">
            <li>Ancienne dirigeante d’une entreprise de travaux publics.</li>
            <li>{formatAnneesExperienceBTP()}.</li>
            <li>Approche opérationnelle : vos documents réels, des méthodes applicables dès le lendemain.</li>
          </ul>
          <p className="mt-4 text-sm text-ofc-ink-subtle">
            Références : {LAURE_OLIVIE_CLIENT_REFERENCES_SHORT}.
          </p>
          <Link
            href={LINKS.aPropos}
            className={`${OFC_CTA_PRIMARY} mt-8 inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Découvrir mon parcours
          </Link>
          <p className="mt-4 text-sm">
            <Link href={LINKS.formateurIaBtp} className={OFC_LINK}>
              Formateur IA pour le BTP — profil détaillé
            </Link>
          </p>
          <LinkedInPresenceCard className="mt-8" />
        </div>
      </div>
    </Section>
  );
}
