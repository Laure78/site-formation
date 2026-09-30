import Link from 'next/link';
import {
  FEDERATION_PARCOURS_EFFECTIF_MIN,
  FEDERATION_PARCOURS_INTRO,
  FEDERATION_PARCOURS_TROIS_NIVEAUX,
  libelleTarifFederationParParticipant,
} from '@/lib/parcours-federation-trois-niveaux';
import { MENTIONS_TVA_INTRA_COURTE } from '@/lib/tarifs-sessions';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

export function PartenairesParcoursTroisNiveauxSection() {
  return (
    <section
      id="parcours-trois-niveaux"
      className="scroll-mt-24"
      aria-labelledby="parcours-trois-niveaux-title"
    >
      <h2
        id="parcours-trois-niveaux-title"
        className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl"
      >
        Parcours en 3 niveaux — tarif par participant
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#475569]">{FEDERATION_PARCOURS_INTRO}</p>

      <ol className="mt-8 space-y-6">
        {FEDERATION_PARCOURS_TROIS_NIVEAUX.map((niveau) => (
          <li
            key={niveau.niveau}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
              Niveau {niveau.niveau}
            </p>
            <h3 className="mt-2 font-display text-lg font-bold leading-snug text-[#0F172A] md:text-xl">
              {niveau.title}
            </h3>
            <p className="mt-2 text-sm font-semibold text-[#334155]">Format : {niveau.formatLabel}</p>
            <p className="mt-3 text-base leading-relaxed text-[#475569]">{niveau.description}</p>
            {niveau.note ? (
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{niveau.note}</p>
            ) : null}
            <p className="mt-4 font-display text-lg font-bold text-[#377CF3]">
              Tarif : {libelleTarifFederationParParticipant(niveau.tarifHtParParticipant, niveau.tarifSuffix)}
            </p>
            <p className="mt-1 text-sm text-[#64748B]">
              Minimum : {FEDERATION_PARCOURS_EFFECTIF_MIN} participants
            </p>
            <p className="mt-4">
              <Link href={niveau.programmeHref} className={`${OFC_LINK} text-sm font-semibold`}>
                {niveau.programmeLabel} →
              </Link>
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-4 text-xs leading-relaxed text-[#64748B]">{MENTIONS_TVA_INTRA_COURTE}</p>
      <p className="mt-2 text-sm text-[#475569]">
        Financement OPCO possible selon éligibilité — un reste à charge peut s’appliquer.
      </p>
    </section>
  );
}
