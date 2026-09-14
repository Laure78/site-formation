import { FINANCEMENT_ETAPES } from '@/lib/financement-constructys-page-config';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

export function FinancementEtapesSection() {
  return (
    <section id="etapes-financement" aria-labelledby="etapes-title" className="scroll-mt-24">
      <h2 id="etapes-title" className={OFC_TYPE_H2}>
        Comment demander la prise en charge ?
      </h2>
      <ol className="mt-8 grid gap-5 sm:grid-cols-2">
        {FINANCEMENT_ETAPES.map((etape) => (
          <li key={etape.n} className="ofc-process-step">
            <span className="ofc-process-step__n">
              {String(etape.n).padStart(2, '0')}
            </span>
            <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-ofc-ink">
              {etape.titre}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ofc-ink-muted md:text-base">
              {etape.texte}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-5 text-sm text-ofc-ink-subtle">
        L’entreprise reste responsable du dépôt et du suivi de son dossier dans eGestion.
      </p>
    </section>
  );
}
