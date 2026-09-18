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
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getAccueilCartesProblemesMetier } from '@/lib/accueil-config';
import { OFC_CTA_SECONDARY, OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';
import { PHOTOS } from '@/lib/photos';

const ICONS: Record<string, LucideIcon> = {
  ao: FileSearch,
  chiffrage: Calculator,
  cr: ClipboardList,
  documents: FileText,
  admin: Mail,
  communication: Megaphone,
};

/** Usages IA pour le BTP — cartes visuelles + CTA vers la section formations. */
export function AccueilProblemesMetierSection() {
  const cartes = getAccueilCartesProblemesMetier();
  const photo = PHOTOS.accueilIaChantierLaptopPlansBtp2026;

  return (
    <Section tone="canvas" aria-labelledby="accueil-problemes-metier">
      <SectionHeader
        align="center"
        titleId="accueil-problemes-metier"
        eyebrow="Usages métier"
        title="L’IA appliquée à vos métiers du BTP"
        description="Des usages concrets pour gagner du temps sur vos documents et process quotidiens — avant de choisir la formation adaptée."
        className="mx-auto"
      />
      <AccueilSectionPhoto
        photo={photo}
        className="mx-auto mt-10 max-w-4xl"
        caption="Sur chantier : croiser plans, notes et outils IA pour accélérer CR, suivi et synthèse — avec validation métier."
      />
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
