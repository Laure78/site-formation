import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { getFormationByCode, isFormationSurDevis } from '@/data/formations';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import {
  DEV_WEB_IA_INCLUS_TARIF,
  DEV_WEB_IA_PRIX_LANCEMENT_LABEL,
  TARIF_INTER_DEV_WEB_IA_HT,
} from '@/lib/formation-developpement-web-ia-content';
import {
  getTarifGrilleFromDureeLibelle,
  libelleTarifInterParParticipant,
  libelleTarifIntraParSession,
  MENTION_ABONNEMENTS_IA_HORS_FORFAIT,
  MENTIONS_TVA_INTRA_COURTE,
  formatTarifHt,
} from '@/lib/tarifs-sessions';
import { MentionTVA, MentionTvaAsterisque } from '@/components/MentionTVA';

type Props = {
  catalogueRef: FormationCatalogueCode;
};

/**
 * Section « Tarifs et modalités » — fiches formation catalogue (Qualiopi indic. 1).
 */
export function FormationTarifsModalitesSection({ catalogueRef }: Props) {
  const formation = getFormationByCode(catalogueRef)!;
  const surDevis = isFormationSurDevis(formation);
  const grille = getTarifGrilleFromDureeLibelle(formation.duree);
  const intraHT = formation.prixHT > 0 ? formation.prixHT : grille.intraHT;
  const customIntra = formation.prixHT > 0 && formation.prixHT !== grille.intraHT;
  const isDevWebIa = catalogueRef === 'NIV-10';
  const effectifLabel =
    formation.effectifMin === formation.effectifMax
      ? `${formation.effectifMax} participants`
      : `${formation.effectifMin} à ${formation.effectifMax} participants`;

  return (
    <section
      id="tarifs-modalites"
      className="scroll-mt-24 border-b border-slate-200 bg-white px-4 py-12"
      aria-labelledby="tarifs-modalites-title"
    >
      <div className="mx-auto max-w-4xl">
        <h2 id="tarifs-modalites-title" className="font-display text-2xl font-bold text-slate-900">
          Tarifs et modalités
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-display text-lg font-semibold text-slate-900">Intra-entreprise</h3>
            {isDevWebIa ? (
              <>
                <p className="mt-4 font-display text-xl font-bold text-[#377CF3]">Tarif sur devis</p>
                <p className="mt-2 text-sm text-slate-600">
                  {effectifLabel}
                  <br />
                  7 heures
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Le tarif est forfaitaire pour l&apos;ensemble du groupe. Il comprend l&apos;animation, les
                  supports pédagogiques, les livrables et les évaluations prévues dans le programme.
                </p>
              </>
            ) : (
              <>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Le tarif est forfaitaire pour l&apos;ensemble du groupe. Il comprend l&apos;animation, les
                  supports pédagogiques, les livrables et les évaluations prévues dans le programme.
                </p>
                <p className="mt-4 font-display text-xl font-bold text-[#377CF3]">
                  {surDevis ? (
                    'Sur devis'
                  ) : (
                    <>
                      {libelleTarifIntraParSession(intraHT)}
                      <MentionTvaAsterisque />
                    </>
                  )}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Effectif : {effectifLabel}. Durée : {formation.duree}.
                </p>
              </>
            )}
            <p className="mt-2 text-sm text-slate-600">{MENTIONS_TVA_INTRA_COURTE}</p>
          </div>

          <div className="rounded-2xl border border-[#377CF3]/20 bg-white p-6 shadow-sm ring-1 ring-[#377CF3]/10">
            <h3 className="font-display text-lg font-semibold text-slate-900">Interentreprises</h3>
            {isDevWebIa ? (
              <>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
                  {DEV_WEB_IA_PRIX_LANCEMENT_LABEL}
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-[#377CF3]">
                  {formatTarifHt(TARIF_INTER_DEV_WEB_IA_HT)} € HT par participant
                  <MentionTvaAsterisque />
                </p>
                <p className="mt-2 text-sm font-medium text-slate-700">7 heures de formation.</p>
                <p className="mt-4 text-sm font-semibold text-slate-900">Le tarif comprend :</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-600">
                  {DEV_WEB_IA_INCLUS_TARIF.map((item) => (
                    <li key={item}>{item} ;</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  Les abonnements aux outils IA utilisés pendant la formation ne sont pas inclus.
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  Session maintenue sous réserve d&apos;un nombre minimum d&apos;inscrits.
                </p>
              </>
            ) : (
              <>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Le tarif est fixé par participant. Les dates sont proposées selon le calendrier des
                  sessions ouvertes.
                </p>
                {surDevis || customIntra ? (
                  <>
                    <p className="mt-4 font-display text-xl font-bold text-[#377CF3]">Sur devis</p>
                    <p className="mt-2 text-sm text-slate-600">
                      Vous pouvez vous inscrire à une session collective interentreprises. Aucun
                      accompagnement individuel n&apos;est proposé.
                    </p>
                  </>
                ) : grille.interHT != null ? (
                  <>
                    <p className="mt-4 font-display text-xl font-bold text-[#377CF3]">
                      {libelleTarifInterParParticipant(grille.interHT)}
                      <MentionTvaAsterisque />
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Session maintenue sous réserve d&apos;un nombre minimum d&apos;inscrits.
                    </p>
                  </>
                ) : (
                  <p className="mt-4 text-sm text-slate-600">
                    Format non proposé pour cette durée — contactez-nous pour une session
                    intra-entreprise.
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {isDevWebIa ? (
          <p className="mt-6 text-sm leading-relaxed text-slate-600">{FINANCEMENT_FORMULATION_PRUDENTE}</p>
        ) : (
          <>
            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              {MENTION_ABONNEMENTS_IA_HORS_FORFAIT}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Prise en charge par un OPCO possible selon l&apos;éligibilité de l&apos;entreprise et du
              dossier.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {FINANCEMENT_FORMULATION_PRUDENTE}
            </p>
          </>
        )}
        <MentionTVA className="mt-4 max-w-3xl" />
      </div>
    </section>
  );
}
