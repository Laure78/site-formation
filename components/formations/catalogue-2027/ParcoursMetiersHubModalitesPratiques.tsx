import {
  PARCOURS_DISPONIBILITE_LIBELLE,
  PARCOURS_MODALITE_GEO,
  PARCOURS_MODULARITE_DETAIL,
  PARCOURS_QUALIOPI_ORGANISME,
  PARCOURS_INSCRIPTION_RESUME,
  PARCOURS_NON_CERTIFIANT,
} from '@/lib/catalogue-2027/parcours-commercial-copy';
import Link from 'next/link';
import { PARCOURS_TARIF_INTER_CALCULE_MENTION } from '@/lib/catalogue-2027/parcours-affichage';
import { TARIF_INTRA_LIBELLE } from '@/data/catalogue-2027/tarifs';
import { LINKS } from '@/lib/internal-links';

const ROWS = [
  { titre: 'Disponibilité', contenu: PARCOURS_DISPONIBILITE_LIBELLE },
  { titre: 'Lieu et format', contenu: PARCOURS_MODALITE_GEO },
  { titre: 'Modularité', contenu: PARCOURS_MODULARITE_DETAIL },
  {
    titre: 'Tarification',
    contenu: `Tarif inter du parcours complet = somme des modules obligatoires (120 € · 170 € · 620 € HT / participant selon le niveau). ${PARCOURS_TARIF_INTER_CALCULE_MENTION} Intra : ${TARIF_INTRA_LIBELLE.toLowerCase()}.`,
  },
  { titre: 'Inscription', contenu: PARCOURS_INSCRIPTION_RESUME },
  { titre: 'Organisme', contenu: PARCOURS_QUALIOPI_ORGANISME },
  { titre: 'Nature', contenu: PARCOURS_NON_CERTIFIANT },
] as const;

export function ParcoursMetiersHubModalitesPratiques() {
  return (
    <section
      id="modalites-parcours-metiers"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.75rem)] border-t border-slate-100 bg-white py-12 sm:py-16"
      aria-labelledby="modalites-parcours-metiers-title"
    >
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        <h2 id="modalites-parcours-metiers-title" className="ofc-type-h2 text-[#101936]">
          Modalités pratiques
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Présentiel en Île-de-France — financement selon éligibilité OPCO.{' '}
          <Link href={LINKS.financement} className="font-medium text-[#377CF3] underline">
            Financement Constructys et OPCO
          </Link>
          .
        </p>
        <dl className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-[#F8FAFC]">
          {ROWS.map((row) => (
            <div
              key={row.titre}
              className="grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-6"
            >
              <dt className="text-sm font-semibold text-[#101936]">{row.titre}</dt>
              <dd className="text-sm leading-relaxed text-slate-600">{row.contenu}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
