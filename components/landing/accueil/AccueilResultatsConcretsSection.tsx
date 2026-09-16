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
import { SimpleFeatureCard } from '@/components/ui/FeatureCard';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ACCUEIL_CAS_USAGE_RESULTATS } from '@/lib/accueil-config';
import { PHOTOS } from '@/lib/photos';

const ICONS_BY_ID: Record<(typeof ACCUEIL_CAS_USAGE_RESULTATS)[number]['id'], LucideIcon> = {
  dce: FileSearch,
  devis: FileSpreadsheet,
  cr: ClipboardList,
  memoire: FileText,
  doe: FolderOpen,
  emails: Mail,
};

/** Résultats concrets — grille fonctionnalités SaaS. */
export function AccueilResultatsConcretsSection() {
  const photo = PHOTOS.accueilFormatriceIaBtpBureauChantier2026;

  return (
    <Section tone="white" aria-labelledby="accueil-resultats-concrets">
      <SectionHeader
        align="center"
        titleId="accueil-resultats-concrets"
        eyebrow="Cas d’usage"
        title="Ce que vos équipes peuvent faire avec l’IA"
        description="Des usages immédiatement transférables sur devis, DCE, chantier et administratif."
        className="mx-auto"
      />
      <AccueilSectionPhoto
        photo={photo}
        className="mx-auto mt-10 max-w-4xl"
        caption="Du bureau au chantier : les mêmes méthodes IA pour devis, DCE, CR et administratif — relecture humaine obligatoire."
      />
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
