import { AccueilSectionPhoto } from '@/components/landing/accueil/AccueilSectionPhoto';
import { Badge } from '@/components/ui/Badge';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ProcessStep } from '@/components/ui/ProcessStep';
import { Section } from '@/components/ui/Section';
import {
  ACCUEIL_DOCUMENTS_EXEMPLES,
  ACCUEIL_METHODE_ETAPES,
} from '@/lib/accueil-config';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { PHOTOS } from '@/lib/photos';

/** Différenciation — formation sur vos vrais documents. */
export function AccueilDifferentiationSection() {
  const photo = PHOTOS.accueilEquipeBtpPlansTabletteIa2026;

  return (
    <Section tone="canvas" aria-labelledby="accueil-differentiation">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22.5rem)] lg:gap-12">
        <div className="min-w-0 max-w-2xl">
          <Eyebrow>Méthode</Eyebrow>
          <h2 id="accueil-differentiation" className={`${OFC_TYPE_H2} mt-4`}>
            Une formation basée sur vos vrais documents
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ofc-ink-muted md:text-lg">
            Les participants travaillent directement à partir des documents et processus de leur
            entreprise.
          </p>
          <ul
            className="mt-8 flex flex-wrap gap-2.5"
            aria-label="Exemples de documents BTP"
          >
            {ACCUEIL_DOCUMENTS_EXEMPLES.map((doc) => (
              <li key={doc}>
                <Badge className="bg-white px-3.5 py-1.5 text-[0.65rem] tracking-[0.1em] text-ofc-ink">
                  {doc}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
        <AccueilSectionPhoto
          photo={photo}
          size="md"
          className="mx-auto lg:mx-0 lg:justify-self-end"
          caption="Plan papier et tablette : on forme sur vos dossiers réels, pas sur des cas génériques."
        />
      </div>

      <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ACCUEIL_METHODE_ETAPES.map((etape) => (
          <ProcessStep key={etape.n} number={etape.n} title={etape.titre} />
        ))}
      </ol>
    </Section>
  );
}
