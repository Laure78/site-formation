import Link from 'next/link';
import { Check } from 'lucide-react';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { IndicateursResultatsLink } from '@/components/formation/IndicateursResultatsLink';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import {
  getFormationCatalogueAutoriteParagraph,
  getFormationCatalogueSeo,
} from '@/lib/formation-catalogue-seo';
import { getFormationByCode } from '@/data/formations';

type Props = {
  catalogueRef: FormationCatalogueCode;
  /** Liens ressources gratuites (max 2 recommandés). */
  ressourcesGratuites?: readonly { href: string; label: string }[];
  /** Lien étude de cas. */
  etudeDeCasHref?: string;
  etudeDeCasLabel?: string;
};

/**
 * Blocs GEO citables — En bref, public, limites IA, autorité E-E-A-T, maillage.
 */
export function FormationCatalogueGeoSections({
  catalogueRef,
  ressourcesGratuites = [],
  etudeDeCasHref = LINKS.etudesCas,
  etudeDeCasLabel = 'Étude de cas FFB & CSFE — formation IA BTP en réseau',
}: Props) {
  const seo = getFormationCatalogueSeo(catalogueRef);
  const formation = getFormationByCode(catalogueRef)!;

  return (
    <div className="mx-auto max-w-4xl px-4">
      <section id="en-bref" className="scroll-mt-24 mt-10">
        <ShortAnswerBlock>{seo.enBref}</ShortAnswerBlock>
      </section>

      <section id="public-cible" className="scroll-mt-24 mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          À qui s&apos;adresse cette formation ?
        </h2>
        <ul className="mt-6 space-y-2">
          {seo.publicTargets.map((target) => (
            <li key={target} className="flex gap-2 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
              {target}
            </li>
          ))}
        </ul>
      </section>

      <section id="ia-limites" className="scroll-mt-24 mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Ce que l&apos;IA peut et ne peut pas faire
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          L&apos;IA aide à identifier, facilite le contrôle et prépare une première extraction — toute
          sortie est à valider par le professionnel avant remise ou diffusion.
        </p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                  L&apos;IA peut aider à
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-slate-900">
                  La validation humaine reste nécessaire pour
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {seo.iaLimits.map((row) => (
                <tr key={row.iaAide}>
                  <td className="px-4 py-3 text-slate-700">{row.iaAide}</td>
                  <td className="px-4 py-3 text-slate-700">{row.validationHumaine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="autorite-ofc" className="scroll-mt-24 mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        <h2 className="font-display text-xl font-bold text-slate-900">Laure Olivié — formatrice IA BTP</h2>
        <p className="mt-4 leading-relaxed text-slate-700">
          {getFormationCatalogueAutoriteParagraph(formation.programmeUpdatedAt)}
        </p>
        <IndicateursResultatsLink className="mt-3 text-left" />
      </section>

      {(ressourcesGratuites.length > 0 || etudeDeCasHref) && (
        <section id="ressources-liees" className="scroll-mt-24 mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Ressources complémentaires</h2>
          <ul className="mt-6 space-y-2">
            {ressourcesGratuites.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`font-medium ${OFC_LINK}`}>
                  {link.label}
                </Link>
              </li>
            ))}
            {etudeDeCasHref ? (
              <li>
                <Link href={etudeDeCasHref} className={`font-medium ${OFC_LINK}`}>
                  {etudeDeCasLabel}
                </Link>
              </li>
            ) : null}
            <li>
              <Link href={LINKS.financement} className={`font-medium ${OFC_LINK}`}>
                Financement OPCO Constructys — formation IA BTP
              </Link>
            </li>
            <li>
              <Link href={LINKS.prendreRdv} className={`font-medium ${OFC_LINK}`}>
                Prendre rendez-vous découverte — 30 min gratuites
              </Link>
            </li>
          </ul>
        </section>
      )}
    </div>
  );
}
