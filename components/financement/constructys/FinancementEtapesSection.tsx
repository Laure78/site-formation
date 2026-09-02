import { FINANCEMENT_ETAPES } from '@/lib/financement-constructys-page-config';

export function FinancementEtapesSection() {
  return (
    <section
      id="etapes-financement"
      aria-labelledby="etapes-title"
      className="scroll-mt-24"
    >
      <h2
        id="etapes-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Comment demander la prise en charge ?
      </h2>
      <ol className="mt-6 space-y-4">
        {FINANCEMENT_ETAPES.map((etape) => (
          <li
            key={etape.n}
            className="flex gap-4 rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#377CF3] text-lg font-bold text-white"
              aria-hidden
            >
              {etape.n}
            </span>
            <div>
              <h3 className="font-semibold text-[#0F172A]">{etape.titre}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#475569]">{etape.texte}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm text-[#64748B]">
        L’entreprise reste responsable du dépôt et du suivi de son dossier dans eGestion.
      </p>
    </section>
  );
}
