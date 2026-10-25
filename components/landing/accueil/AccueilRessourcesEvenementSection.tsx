import Link from 'next/link';
import { EvenementAoBtpPromoEncart } from '@/components/evenements/EvenementAoBtpPromoEncart';
import { ResourceCard } from '@/components/ui/ResourceCard';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  ACCUEIL_METHODE_PEDAGOGIQUE_ETAPES,
  ACCUEIL_RESSOURCES,
} from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { RevealGroupShell, RevealShell } from '@/components/motion/RevealShell';
import { MOTION_REVEAL } from '@/lib/motion-config';

/** Ressources gratuites (aperçu) + méthode repliée + encart événement. */
export function AccueilRessourcesEvenementSection() {
  const ressourcesPreview = ACCUEIL_RESSOURCES.slice(0, 3);

  return (
    <Section
      id="accueil-ressources"
      tone="canvas"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-ressources-evenement-title"
    >
      <RevealShell>
        <SectionHeader
          titleId="accueil-ressources-evenement-title"
          eyebrow="Ressources"
          title="Ressources gratuites"
          description="Guides et tutoriels — devis, DCE, CR — en complément du présentiel."
          className="max-w-2xl"
        />
      </RevealShell>
      <RevealGroupShell className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerMs={MOTION_REVEAL.staggerMs}>
        {ressourcesPreview.map((ressource) => (
          <ResourceCard
            key={ressource.href}
            href={ressource.href}
            titre={ressource.titre}
            phrase={ressource.phrase}
            category={ressource.category}
          />
        ))}
      </RevealGroupShell>
      <RevealShell delay={MOTION_REVEAL.contentDelayMs}>
      <p className="mt-8">
        <Link href={LINKS.ressources} className={`${OFC_LINK} text-sm font-semibold`}>
          Voir toutes les ressources
        </Link>
      </p>
      </RevealShell>

      <RevealShell>
      <details className="mt-10 rounded-ofc-card border border-ofc-border bg-white p-5 sm:p-6">
        <summary className="cursor-pointer list-none font-display text-lg font-bold text-ofc-ink marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-3">
            Notre méthode en 4 étapes
            <span className="text-sm font-semibold text-ofc-accent">Afficher</span>
          </span>
        </summary>
        <ol className="mt-6 space-y-4 border-t border-ofc-border pt-6">
          {ACCUEIL_METHODE_PEDAGOGIQUE_ETAPES.map((etape) => (
            <li key={etape.n} className="flex gap-4">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#377CF3]/10 font-display text-sm font-bold text-[#377CF3]"
                aria-hidden
              >
                {etape.n}
              </span>
              <div>
                <p className="font-semibold text-ofc-ink">{etape.titre}</p>
                <p className="mt-1 text-sm leading-relaxed text-ofc-ink-muted">{etape.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </details>
      </RevealShell>

      <RevealShell delay={80}>
      <div className="mt-10 overflow-hidden rounded-ofc-card border border-ofc-border bg-white">
        <EvenementAoBtpPromoEncart placement="accueil" variant="compact" />
      </div>
      </RevealShell>
    </Section>
  );
}
