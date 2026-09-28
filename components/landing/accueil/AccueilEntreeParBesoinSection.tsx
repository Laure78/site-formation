import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getAccueilEntreeParBesoinCartes } from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

/** Entrée par besoin — 6 cartes vers formations ou catalogue. */
export function AccueilEntreeParBesoinSection() {
  const cartes = getAccueilEntreeParBesoinCartes();

  return (
    <Section
      id="besoin-metier"
      tone="canvas"
      className="scroll-mt-24"
      aria-labelledby="accueil-besoin-metier"
    >
      <SectionHeader
        align="center"
        titleId="accueil-besoin-metier"
        eyebrow="Par où commencer ?"
        title="Quel est votre besoin avec l’IA ?"
        description="Choisissez un usage concret — nous vous orientons vers le parcours adapté."
        className="mx-auto max-w-2xl"
      />
      <ul className="mt-12 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cartes.map((carte) => (
          <li key={carte.id} className="min-w-0">
            <Card className="flex h-full flex-col p-6 sm:p-7">
              <h3 className={OFC_TYPE_H3}>{carte.besoin}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted">{carte.publicLabel}</p>
              <div className="mt-auto pt-6">
                <Link
                  href={carte.href}
                  className={`${OFC_LINK} inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold`}
                >
                  {carte.linkLabel}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
              </div>
            </Card>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-center text-sm text-ofc-ink-muted">
        Besoin plus spécifique ?{' '}
        <Link href={LINKS.formations} className={`${OFC_LINK} font-semibold`}>
          Parcourir tout le catalogue
        </Link>
        {' · '}
        <Link href={`${LINKS.formations}#catalogue-besoin-selector`} className={`${OFC_LINK} font-semibold`}>
          Filtrer par besoin
        </Link>
      </p>
    </Section>
  );
}
