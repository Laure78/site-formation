import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { CATALOGUE_MATURITE_STEPS } from '@/lib/formations-catalogue-architecture';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

/**
 * Parcours de maturité IA — gamme Déployer.
 */
export function FormationsCatalogueMaturitySection() {
  return (
    <section
      id="catalogue-maturite-ia"
      className="mt-10 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 md:p-6"
      aria-labelledby="catalogue-maturite-heading"
    >
      <h2 id="catalogue-maturite-heading" className="font-display text-lg font-semibold text-[#0F172A]">
        Parcours de maturité IA dans le BTP
      </h2>
      <p className="mt-2 text-sm text-[#64748B]">
        De la découverte au déploiement en entreprise — choisissez l’étape qui correspond à votre niveau.
      </p>
      <ol className="mt-6 flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-3">
        {CATALOGUE_MATURITE_STEPS.map((step, index) => (
          <li key={step.label} className="flex items-center gap-2">
            <Link
              href={step.href}
              className={`rounded-full border border-[#BFDBFE] bg-white px-3 py-1.5 text-sm font-medium text-[#1E40AF] transition hover:border-[#377CF3] hover:bg-[#EFF6FF] ${OFC_LINK}`}
            >
              {step.label}
            </Link>
            {index < CATALOGUE_MATURITE_STEPS.length - 1 ? (
              <ArrowDown className="h-4 w-4 shrink-0 text-[#94A3B8] md:hidden" aria-hidden />
            ) : null}
            {index < CATALOGUE_MATURITE_STEPS.length - 1 ? (
              <span className="hidden text-[#CBD5E1] md:inline" aria-hidden>
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
