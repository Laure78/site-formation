import type { LucideIcon } from 'lucide-react';
import {
  ClipboardList,
  FileSearch,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Mail,
} from 'lucide-react';
import { AccueilSectionPhoto } from '@/components/landing/accueil/AccueilSectionPhoto';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SimpleFeatureCard } from '@/components/ui/FeatureCard';
import { Section } from '@/components/ui/Section';
import { ACCUEIL_CAS_USAGE_RESULTATS } from '@/lib/accueil-config';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { PHOTOS } from '@/lib/photos';

const ICONS_BY_ID: Record<(typeof ACCUEIL_CAS_USAGE_RESULTATS)[number]['id'], LucideIcon> = {
  dce: FileSearch,
  devis: FileSpreadsheet,
  cr: ClipboardList,
  memoire: FileText,
  doe: FolderOpen,
  emails: Mail,
};

/** Résultats concrets — photo ancrée + grille fonctionnalités. */
export function AccueilResultatsConcretsSection() {
  const photo = PHOTOS.accueilFormatriceIaBtpBureauChantier2026;

  return (
    <Section tone="white" aria-labelledby="accueil-resultats-concrets">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,22.5rem)_minmax(0,1fr)] lg:gap-12">
        <AccueilSectionPhoto
          photo={photo}
          size="md"
          className="mx-auto lg:mx-0"
          caption="Du bureau au chantier : mêmes méthodes IA — relecture humaine obligatoire."
        />
        <div className="min-w-0 max-w-2xl lg:justify-self-start">
          <Eyebrow>Cas d’usage</Eyebrow>
          <h2 id="accueil-resultats-concrets" className={`${OFC_TYPE_H2} mt-4`}>
            Ce que vos équipes peuvent faire avec l’IA
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ofc-ink-muted md:text-lg">
            Des usages immédiatement transférables sur devis, DCE, chantier et administratif.
          </p>
        </div>
      </div>

      <ul className="mt-12 grid list-none grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ACCUEIL_CAS_USAGE_RESULTATS.map((item) => (
          <li key={item.id} className="min-w-0">
            <SimpleFeatureCard
              href={item.href}
              title={item.titre}
              phrase={item.phrase}
              tags={item.tags}
              icon={ICONS_BY_ID[item.id]}
              ariaLabel={item.ariaLabel}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
