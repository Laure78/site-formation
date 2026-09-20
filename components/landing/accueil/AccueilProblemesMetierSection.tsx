import {
  Calculator,
  ClipboardList,
  FileSearch,
  FileText,
  Mail,
  Megaphone,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AccueilSectionPhoto } from '@/components/landing/accueil/AccueilSectionPhoto';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { getAccueilCartesProblemesMetier } from '@/lib/accueil-config';
import { OFC_CTA_SECONDARY, OFC_TYPE_H2, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';
import { PHOTOS } from '@/lib/photos';

const ICONS: Record<string, LucideIcon> = {
  ao: FileSearch,
  chiffrage: Calculator,
  cr: ClipboardList,
  documents: FileText,
  admin: Mail,
  communication: Megaphone,
};

/** Usages IA pour le BTP — photo compacte en ancrage + cartes. */
export function AccueilProblemesMetierSection() {
  const cartes = getAccueilCartesProblemesMetier();
  const photo = PHOTOS.accueilIaChantierLaptopPlansBtp2026;

  return (
    <Section tone="canvas" aria-labelledby="accueil-problemes-metier">
      <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22.5rem)] lg:gap-12">
        <div className="min-w-0 max-w-2xl">
          <Eyebrow>Usages métier</Eyebrow>
          <h2 id="accueil-problemes-metier" className={`${OFC_TYPE_H2} mt-4`}>
            L’IA appliquée à vos métiers du BTP
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ofc-ink-muted md:text-lg">
            Des usages concrets pour gagner du temps sur vos documents et process quotidiens — avant
            de choisir la formation adaptée.
          </p>
        </div>
        <AccueilSectionPhoto
          photo={photo}
          size="md"
          className="mx-auto lg:mx-0 lg:justify-self-end"
          caption="Sur chantier : croiser plans, notes et outils IA — avec validation métier."
        />
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        {cartes.map((carte) => {
          const Icon = ICONS[carte.id];
          return (
            <Card key={carte.id} className="flex flex-col p-6 sm:p-7">
              {Icon ? (
                <span
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-ofc-accent-soft text-ofc-accent"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
              ) : null}
              <h3 className={OFC_TYPE_H3}>{carte.titre}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ofc-ink-muted md:text-base">
                {carte.description}
              </p>
            </Card>
          );
        })}
      </div>
      <p className="mt-12 text-center">
        <a
          href="#offre-formations"
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
        >
          Voir toutes les formations
        </a>
      </p>
    </Section>
  );
}
