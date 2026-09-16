import { AccueilSectionPhoto } from '@/components/landing/accueil/AccueilSectionPhoto';
import { Badge } from '@/components/ui/Badge';
import { ProcessStep } from '@/components/ui/ProcessStep';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  ACCUEIL_DOCUMENTS_EXEMPLES,
  ACCUEIL_METHODE_ETAPES,
} from '@/lib/accueil-config';
import { PHOTOS } from '@/lib/photos';

/** Différenciation — formation sur vos vrais documents. */
export function AccueilDifferentiationSection() {
  const photo = PHOTOS.accueilEquipeBtpPlansTabletteIa2026;

  return (
    <Section tone="canvas" aria-labelledby="accueil-differentiation">
      <SectionHeader
        align="center"
        titleId="accueil-differentiation"
        eyebrow="Méthode"
        title="Une formation basée sur vos vrais documents"
        description="Les participants travaillent directement à partir des documents et processus de leur entreprise."
        className="mx-auto"
      />
      <AccueilSectionPhoto
        photo={photo}
        className="mx-auto mt-10 max-w-4xl"
        caption="Plan papier et tablette : on forme sur vos dossiers réels (DCE, devis, CR), pas sur des cas génériques."
      />
      <ul
        className="mt-10 flex flex-wrap justify-center gap-2.5"
        aria-label="Exemples de documents BTP"
      >
        {ACCUEIL_DOCUMENTS_EXEMPLES.map((doc) => (
          <li key={doc}>
            <Badge className="bg-white px-4 py-2 text-[0.7rem] tracking-[0.1em] text-ofc-ink">
              {doc}
            </Badge>
          </li>
        ))}
      </ul>
      <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ACCUEIL_METHODE_ETAPES.map((etape) => (
          <ProcessStep key={etape.n} number={etape.n} title={etape.titre} />
        ))}
      </ol>
    </Section>
  );
}
