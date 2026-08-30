import Link from 'next/link';
import { calendlyCatalogueUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import {
  getTarifGrille,
  libelleTarifInterParParticipant,
  libelleTarifIntraParSession,
  MENTION_ABONNEMENTS_IA_HORS_FORFAIT,
  TARIF_INTRA_7H_HT,
  TARIF_INTER_4H_HT_FROM,
  TARIF_INTER_7H_HT_FROM,
} from '@/lib/tarifs-sessions';
import { MentionTVA } from '@/components/MentionTVA';

/**
 * Section « Tarifs des formations IA pour le BTP » — page catalogue `/formations`.
 */
export function FormationsTarifsGrilleSection() {
  const g4 = getTarifGrille(4);
  const g7 = getTarifGrille(7);

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
        Deux formats : session réservée pour votre entreprise (tarif forfaitaire) ou inscription
        individuelle en interentreprises (tarif par participant). {FINANCEMENT_FORMULATION_PRUDENTE}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
          <h3 className="font-display text-xl font-semibold text-[#0F172A]">Formation intra-entreprise</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#475569]">
            Une formation organisée exclusivement pour votre entreprise, dans vos locaux en Île-de-France.
            Le tarif est forfaitaire pour l&apos;ensemble du groupe.
          </p>
          <ul className="mt-4 flex-1 space-y-2 text-sm text-[#334155]">
            <li>
              <strong>4 heures :</strong> {libelleTarifIntraParSession(g4.intraHT)}.
            </li>
            <li>
              <strong>7 heures :</strong> {libelleTarifIntraParSession(g7.intraHT, g7.intraFrom)}.
            </li>
            <li>Jusqu&apos;à 8 ou 12 participants selon le programme.</li>
            <li>Programme adapté aux besoins et aux documents de l&apos;entreprise.</li>
          </ul>
          <Link
            href={calendlyCatalogueUrl('devis-intra-formations')}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#377CF3] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#2A6BD9]"
          >
            Demander un devis intra-entreprise
          </Link>
        </article>

        <article className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <h3 className="font-display text-xl font-semibold text-[#0F172A]">Formation interentreprises</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#475569]">
            Une session réunissant des professionnels de plusieurs entreprises. Le tarif est calculé par
            participant.
          </p>
          <ul className="mt-4 flex-1 space-y-2 text-sm text-[#334155]">
            <li>
              <strong>4 heures :</strong> {libelleTarifInterParParticipant(TARIF_INTER_4H_HT_FROM)}.
            </li>
            <li>
              <strong>7 heures :</strong> {libelleTarifInterParParticipant(TARIF_INTER_7H_HT_FROM)}.
            </li>
            <li>Dates et lieux communiqués selon le calendrier des sessions.</li>
            <li>Session maintenue sous réserve d&apos;un nombre minimum d&apos;inscrits.</li>
          </ul>
          <Link
            href={LINKS.contact}
            className="mt-6 inline-flex items-center justify-center rounded-xl border-2 border-[#377CF3] bg-white px-5 py-3 text-center text-sm font-semibold text-[#377CF3] hover:bg-[#EFF6FF]"
          >
            Voir les prochaines sessions
          </Link>
        </article>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-[#64748B]">
        Sensibilisation 2 h (intra) : {libelleTarifIntraParSession(750)} · Parcours 14 h (intra) : à
        partir de 3 200 € HT par session · Parcours 14 h (inter) : à partir de 1 100 € HT par
        participant. {MENTION_ABONNEMENTS_IA_HORS_FORFAIT}
      </p>
      <MentionTVA className="mt-3 max-w-3xl" />
    </section>
  );
}
