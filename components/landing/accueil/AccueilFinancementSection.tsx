import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_ORGANISME_CERTIFIE } from '@/config/qualiopi';
import {
  OFC_CTA_SECONDARY,
  OFC_TYPE_H2,
  OFC_TYPE_BODY,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Financement — texte court, formulation Qualiopi prudente. */
export function AccueilFinancementSection() {
  return (
    <section className={OFC_SEC.muted} aria-labelledby="accueil-financement">
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="accueil-financement" className={OFC_TYPE_H2}>
          Formation professionnelle et financement
        </h2>
        <p className={`${OFC_TYPE_BODY} mx-auto mt-4 text-slate-600`}>
          OFC Création d&apos;Entreprise est un {QUALIOPI_ORGANISME_CERTIFIE}. Une prise en charge
          peut être possible selon l&apos;entreprise, l&apos;OPCO, l&apos;éligibilité et les plafonds
          applicables.
        </p>
        <Link
          href={LINKS.financement}
          className={`${OFC_CTA_SECONDARY} mt-8 inline-flex min-h-11 items-center justify-center px-6 py-3`}
          title="Financement Constructys — formation IA pour le BTP"
        >
          Comprendre les possibilités de financement
        </Link>
      </div>
    </section>
  );
}
