import { ArrowRight } from 'lucide-react';
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
        Comment demander la prise en charge ?
      </h2>
      <p className={FC_SUBTITLE}>
        L’entreprise reste responsable du dépôt et du suivi de son dossier dans eGestion.
      </p>
      <ol className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-2">
        {FINANCEMENT_ETAPES.map((etape, index) => (
          <li key={etape.n} className="flex min-w-0 flex-1 flex-col lg:flex-row lg:items-center">
            <article className="flex h-full flex-1 flex-col rounded-2xl border border-[#D7E5F7] bg-white p-4 shadow-sm md:p-5">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#377CF3] text-sm font-bold text-white"
                aria-hidden
              >
                {etape.n}
              </span>
              <h3 className="mt-3 font-display text-base font-bold text-[#081943]">{etape.titre}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ofc-ink-muted">{etape.texte}</p>
            </article>
            {index < FINANCEMENT_ETAPES.length - 1 ? (
              <ArrowRight
                className="mx-auto my-1 h-5 w-5 shrink-0 rotate-90 text-[#377CF3]/60 lg:mx-2 lg:my-0 lg:rotate-0"
                aria-hidden
              />
            ) : null}
          </li>
        ))}
      </ol>
      <p className="mt-6 text-center text-sm">
        <ExternalLinkAnchor
          href={CONSTRUCTYS_SOURCES.egestion.href}
          className="font-medium text-[#377CF3] underline underline-offset-2"
        >
          Accéder au portail eGestion Constructys
        </ExternalLinkAnchor>
      </p>
    </section>
  );
}
