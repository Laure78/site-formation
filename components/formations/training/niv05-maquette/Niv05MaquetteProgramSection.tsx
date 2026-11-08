import Link from 'next/link';
import { Download } from 'lucide-react';
import { TrainingProgramAccordion } from '@/components/formations/training/TrainingProgramAccordion';
import type { CatalogueProgramLink, CatalogueProgramModule } from '@/lib/catalogue-formation-page-content';
import { OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { libelleTarifParticipantCatalogue, TARIF_PARTICIPANT_NIV05_HT } from '@/lib/tarifs-catalogue-participant';

type Props = {
  modules: readonly CatalogueProgramModule[];
  programLinks?: readonly CatalogueProgramLink[];
  pdfHref?: string;
  title?: string;
  programIntro?: string;
};

export function Niv05MaquetteProgramSection({
  modules,
  programLinks,
  pdfHref,
  title = 'Programme — 5 modules (4 h · 240 min)',
  programIntro,
}: Props) {
  const tarifLabel = libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV05_HT);

  return (
    <section
      id={TRAINING_ANCHOR.programme}
      className="scroll-mt-24 border-b border-slate-100 bg-white py-10 md:py-12"
      aria-labelledby="niv05-programme-title"
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <h2 id="niv05-programme-title" className="ofc-type-h2 text-[#101936]">
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-base text-slate-600">
          {programIntro ??
            'Cinq modules pour 4 heures de formation effective (240 min) : de l’intégration de l’IA en MOE jusqu’aux réserves et à la réception, avec évaluations intégrées aux ateliers.'}
        </p>
        <div className="mt-8 min-w-0">
          <TrainingProgramAccordion modules={modules} defaultOpenFirst />
          {programLinks && programLinks.length > 0 ? (
            <div className="mt-6 space-y-2 text-base text-slate-600">
              {programLinks.map((link) => (
                <p key={link.href}>
                  {link.prefix}{' '}
                  <Link href={link.href} className={OFC_LINK}>
                    {link.label}
                  </Link>
                  .
                </p>
              ))}
            </div>
          ) : null}
          {pdfHref ? (
            <p className="mt-6">
              <a
                href={pdfHref}
                download
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                Télécharger le programme PDF
              </a>
            </p>
          ) : null}
          <p className="mt-4 text-sm text-slate-500">
            Durée totale : 4 h (5 modules, 240 min) — {tarifLabel} en inter-entreprises, sous réserve
            d&apos;une session ouverte.
          </p>
        </div>
      </div>
    </section>
  );
}
