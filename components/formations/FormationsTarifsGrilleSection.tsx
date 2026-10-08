import Link from 'next/link';
import { calendlyCatalogueUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import {
  getFormationsCatalogue,
  sortFormationsCatalogue,
} from '@/lib/formations-catalogue-display';
import {
  MENTION_ABONNEMENTS_IA_HORS_FORFAIT,
} from '@/lib/tarifs-sessions';
import { MentionTVA } from '@/components/MentionTVA';

/**
 * Section « Tarifs des formations IA pour le BTP » — page catalogue `/formations`.
 * Affiche uniquement le tarif HT / participant + effectif.
 */
export function FormationsTarifsGrilleSection() {
  const formations = sortFormationsCatalogue(
    getFormationsCatalogue().filter((f) =>
      ['NIV-01', 'NIV-02', 'NIV-03', 'NIV-04', 'NIV-05', 'NIV-10'].includes(f.ref),
    ),
  );

  return (
    <section
      id="tarifs-formations-btp"
      className="mt-12 scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white p-6 md:p-8"
      aria-labelledby="tarifs-formations-btp-title"
    >
      <h2 id="tarifs-formations-btp-title" className="font-display text-2xl font-bold text-[#0F172A]">
        Tarifs des formations IA pour le BTP
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#64748B]">
        Chaque formation est proposée au tarif HT par participant. L&apos;effectif autorisé est
        indiqué pour chaque parcours. {FINANCEMENT_FORMULATION_PRUDENTE}
      </p>

      <ul className="mt-8 divide-y divide-[#E2E8F0] rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
        {formations.map((f) => (
          <li
            key={f.ref}
            className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          >
            <div className="min-w-0">
              <Link
                href={f.href}
                className="font-display text-sm font-semibold text-[#0F172A] hover:text-[#377CF3]"
              >
                {f.title}
              </Link>
              <p className="mt-0.5 text-xs text-[#64748B]">
                {f.duree} · {f.effectif}
              </p>
            </div>
            <p className="shrink-0 font-display text-base font-bold text-[#377CF3]">
              {f.tarifParcoursLabel}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={calendlyCatalogueUrl('devis-formations')}
          className="inline-flex items-center justify-center rounded-xl bg-[#377CF3] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#2A6BD9]"
        >
          Demander un devis
        </Link>
        <Link
          href={LINKS.contact}
          className="inline-flex items-center justify-center rounded-xl border-2 border-[#377CF3] bg-white px-5 py-3 text-center text-sm font-semibold text-[#377CF3] hover:bg-[#EFF6FF]"
        >
          Voir les prochaines sessions
        </Link>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-[#64748B]">
        {MENTION_ABONNEMENTS_IA_HORS_FORFAIT}
      </p>
      <MentionTVA className="mt-3 max-w-3xl" />
    </section>
  );
}
