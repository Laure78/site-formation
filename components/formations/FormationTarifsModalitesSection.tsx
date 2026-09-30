import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { getFormationByCode, isFormationSurDevis, libelleEffectifFormation } from '@/data/formations';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import {
  DEV_WEB_IA_INCLUS_TARIF,
} from '@/lib/formation-developpement-web-ia-content';
import { FEDERATION_PARCOURS_EFFECTIF_MIN } from '@/lib/parcours-federation-trois-niveaux';
import { libelleTarifParticipantCatalogue } from '@/lib/tarifs-catalogue-participant';
import { LINKS } from '@/lib/internal-links';
import Link from 'next/link';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import {
  MENTION_ABONNEMENTS_IA_HORS_FORFAIT,
  MENTIONS_TVA_INTRA_COURTE,
} from '@/lib/tarifs-sessions';
import { MentionTVA, MentionTvaAsterisque } from '@/components/MentionTVA';
import { libelleTarifParcoursCatalogue } from '@/lib/formations-catalogue-display';

type Props = {
  catalogueRef: FormationCatalogueCode;
};

/**
 * Section « Tarifs et modalités » — fiches formation catalogue (Qualiopi indic. 1).
 * Affiche uniquement le tarif HT / participant + effectif.
 */
export function FormationTarifsModalitesSection({ catalogueRef }: Props) {
  const formation = getFormationByCode(catalogueRef)!;
  const surDevis = isFormationSurDevis(formation);
  const isDevWebIa = catalogueRef === 'NIV-10';
  const tarifParticipantHt = formation.tarifParticipantHt;
  const isTarifParticipant = tarifParticipantHt != null && tarifParticipantHt > 0;
  const effectifLabel = libelleEffectifFormation(formation);
  const tarifLabel = libelleTarifParcoursCatalogue(formation);

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

        <div className="mt-6 rounded-2xl border border-[#377CF3]/20 bg-slate-50 p-6 shadow-sm ring-1 ring-[#377CF3]/10">
          <h3 className="font-display text-lg font-semibold text-slate-900">
            Tarif HT par participant
          </h3>
          {isTarifParticipant || isDevWebIa ? (
            <>
              <p className="mt-4 font-display text-2xl font-bold text-[#377CF3]">
                {isTarifParticipant
                  ? libelleTarifParticipantCatalogue(tarifParticipantHt)
                  : tarifLabel}
                <MentionTvaAsterisque />
              </p>
              <p className="mt-2 text-base font-semibold text-slate-800">{effectifLabel}</p>
              <p className="mt-2 text-sm text-slate-600">
                Durée : {formation.duree}. Sessions collectives — dans vos locaux ou en
                inter-entreprises selon les dates.
              </p>
              {isDevWebIa ? (
                <>
                  <p className="mt-4 text-sm font-semibold text-slate-900">Le tarif comprend :</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-600">
                    {DEV_WEB_IA_INCLUS_TARIF.map((item) => (
                      <li key={item}>{item} ;</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    Les abonnements aux outils IA utilisés pendant la formation ne sont pas inclus.
                  </p>
                </>
              ) : (
                <p className="mt-3 text-sm text-slate-600">
                  Grille des 3 niveaux pour les fédérations :{' '}
                  <Link href={LINKS.partenaires} className={OFC_LINK}>
                    page Partenaires
                  </Link>
                  .
                </p>
              )}
              <p className="mt-3 text-sm text-slate-600">
                Session maintenue sous réserve d&apos;un nombre minimum d&apos;inscrits (
                {FEDERATION_PARCOURS_EFFECTIF_MIN} participants pour une session convoquée par un
                réseau).
              </p>
            </>
          ) : surDevis ? (
            <>
              <p className="mt-4 font-display text-xl font-bold text-[#377CF3]">Sur devis</p>
              <p className="mt-2 text-sm text-slate-600">
                Effectif : {effectifLabel}. Durée : {formation.duree}.
              </p>
            </>
          ) : (
            <>
              <p className="mt-4 font-display text-xl font-bold text-[#377CF3]">
                {tarifLabel}
                <MentionTvaAsterisque />
              </p>
              <p className="mt-2 text-base font-semibold text-slate-800">{effectifLabel}</p>
            </>
          )}
          <p className="mt-3 text-sm text-slate-600">{MENTIONS_TVA_INTRA_COURTE}</p>
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
