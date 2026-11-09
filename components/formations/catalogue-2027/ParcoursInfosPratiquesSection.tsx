import type { ParcoursComputed } from '@/data/catalogue-2027';
import { CATALOGUE_2027_INFOS_PRATIQUES } from '@/data/catalogue-2027';
import {
  PARCOURS_ACCESSIBILITE_RESUME,
  PARCOURS_ADAPTATION_INTRA,
  PARCOURS_DISPONIBILITE_LIBELLE,
  PARCOURS_EVALUATION_RESUME,
  PARCOURS_INSCRIPTION_RESUME,
  PARCOURS_MARQUE_COMMERCIALE,
  PARCOURS_MODALITE_GEO,
  PARCOURS_MODALITE_GEO_DETAIL,
  PARCOURS_MODULARITE_DETAIL,
  PARCOURS_NON_CERTIFIANT,
  PARCOURS_ORGANISATION_RESUME,
  PARCOURS_QUALIOPI_ORGANISME,
} from '@/lib/catalogue-2027/parcours-commercial-copy';

type Props = {
  parcours: ParcoursComputed;
};

/**
 * Bloc informations pratiques harmonisé — 5 parcours métiers (Qualiopi, modalités, ouverture 2027).
 */
export function ParcoursInfosPratiquesSection({ parcours: p }: Props) {
  const id = `parcours-infos-pratiques-${p.id}`;

  const rows: { titre: string; contenu: string }[] = [
    { titre: 'Public visé', contenu: p.publicCible },
    { titre: 'Prérequis', contenu: p.prerequis },
    { titre: 'Disponibilité', contenu: PARCOURS_DISPONIBILITE_LIBELLE },
    { titre: 'Format et lieu', contenu: `${PARCOURS_MODALITE_GEO}. ${PARCOURS_MODALITE_GEO_DETAIL}` },
    { titre: 'Modularité', contenu: PARCOURS_MODULARITE_DETAIL },
    { titre: 'Modalités pédagogiques', contenu: PARCOURS_ORGANISATION_RESUME },
    { titre: 'Modalités d’évaluation', contenu: PARCOURS_EVALUATION_RESUME },
    { titre: 'Modalités d’inscription', contenu: PARCOURS_INSCRIPTION_RESUME },
    { titre: 'Adaptation en intra-entreprise', contenu: PARCOURS_ADAPTATION_INTRA },
    { titre: 'Accessibilité', contenu: PARCOURS_ACCESSIBILITE_RESUME },
    { titre: 'Attestations', contenu: CATALOGUE_2027_INFOS_PRATIQUES.attestations },
    { titre: 'Organisme', contenu: `${PARCOURS_QUALIOPI_ORGANISME} ${PARCOURS_MARQUE_COMMERCIALE}` },
    { titre: 'Nature des formations', contenu: PARCOURS_NON_CERTIFIANT },
  ];

  return (
    <section className="scroll-mt-28" aria-labelledby={id}>
      <h2 id={id} className="ofc-type-h2 text-[#101936]">
        Informations pratiques
      </h2>
      <p className="mt-3 max-w-3xl text-sm text-slate-600">
        {CATALOGUE_2027_INFOS_PRATIQUES.financement} {CATALOGUE_2027_INFOS_PRATIQUES.pasCpf}
      </p>
      <dl className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-[#F8FAFC]">
        {rows.map((row) => (
          <div key={row.titre} className="grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-6">
            <dt className="text-sm font-semibold text-[#101936]">{row.titre}</dt>
            <dd className="text-sm leading-relaxed text-slate-600">{row.contenu}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
