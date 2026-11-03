import { ArrowRight } from 'lucide-react';
import { Fragment } from 'react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  CONSTRUCTYS_SOURCES,
  FINANCEMENT_ETAPES,
} from '@/lib/financement-constructys-page-config';
import { FC_SECTION, FC_SUBTITLE, FC_TITLE } from '@/lib/financement-constructys-ui';

export function FinancementEtapesSection() {
  return (
    <section id="etapes-financement" aria-labelledby="etapes-title" className={FC_SECTION}>
      <h2 id="etapes-title" className={FC_TITLE}>
        Comment demander votre prise en charge ?
      </h2>
      <p className={FC_SUBTITLE}>
        Cinq étapes — l’entreprise dépose et suit son dossier dans eGestion.
      </p>

      <ol className="mt-10 hidden min-w-0 xl:flex xl:items-start xl:justify-between">
        {FINANCEMENT_ETAPES.map((etape, index) => (
          <Fragment key={etape.n}>
            <li className="flex max-w-[10.5rem] flex-1 flex-col items-center text-center">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#377CF3] text-sm font-bold text-white"
                aria-hidden
              >
                {etape.n}
              </span>
              <h3 className="mt-3 font-display text-sm font-bold leading-snug text-[#081943]">
                {etape.titre}
              </h3>
              <p className="sr-only">{etape.texte}</p>
            </li>
            {index < FINANCEMENT_ETAPES.length - 1 ? (
              <li className="flex shrink-0 items-center pt-5" aria-hidden>
                <ArrowRight className="h-4 w-4 text-[#377CF3]/45" />
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>

      <ol className="mt-8 grid gap-4 sm:grid-cols-2 xl:hidden">
        {FINANCEMENT_ETAPES.map((etape) => (
          <li key={etape.n}>
            <article className="flex h-full flex-col rounded-2xl border border-[#D7E5F7] bg-white p-4 shadow-[0_1px_3px_rgba(8,25,67,0.06)]">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#377CF3] text-sm font-bold text-white"
                aria-hidden
              >
                {etape.n}
              </span>
              <h3 className="mt-3 font-display text-base font-bold text-[#081943]">{etape.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{etape.texte}</p>
            </article>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-center text-sm">
        <ExternalLinkAnchor
          href={CONSTRUCTYS_SOURCES.egestion.href}
          className="font-semibold text-[#377CF3] underline underline-offset-2"
        >
          Accéder au portail eGestion Constructys
        </ExternalLinkAnchor>
      </p>
    </section>
  );
}
