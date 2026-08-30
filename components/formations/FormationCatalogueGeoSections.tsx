import type { ReactNode } from 'react';
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
import { getFormationCatalogueGeoExtended } from '@/lib/formation-catalogue-geo-extended';
import { getFormationByCode } from '@/data/formations';

type Props = {
  catalogueRef: FormationCatalogueCode;
  /** Liens ressources gratuites (max 2 recommandés). */
  ressourcesGratuites?: readonly { href: string; label: string }[];
  /** Lien étude de cas. */
  etudeDeCasHref?: string;
  etudeDeCasLabel?: string;
};

function GeoAnswerSection({
  id,
  question,
  children,
}: {
  id: string;
  question: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mt-12">
      <h2 className="font-display text-2xl font-bold text-slate-900">{question}</h2>
      <div className="mt-4 leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

/**
 * Blocs GEO citables — questions explicites, réponses factuelles, maillage cluster.
 */
export function FormationCatalogueGeoSections({
  catalogueRef,
  ressourcesGratuites = [],
  etudeDeCasHref = LINKS.etudesCas,
  etudeDeCasLabel = 'Étude de cas FFB & CSFE — formation IA BTP en réseau',
}: Props) {
  const seo = getFormationCatalogueSeo(catalogueRef);
  const geo = getFormationCatalogueGeoExtended(catalogueRef);
  const formation = getFormationByCode(catalogueRef)!;

  const clusterHrefs = new Set(geo.clusterMaillage.map((l) => l.href));
  const extraRessources = ressourcesGratuites.filter((l) => !clusterHrefs.has(l.href));
  const showEtudeDeCas = etudeDeCasHref && !clusterHrefs.has(etudeDeCasHref);
  const showRessourcesExtras = extraRessources.length > 0 || showEtudeDeCas;

  return (
    <div className="mx-auto max-w-4xl px-4">
      <section id="en-bref" className="scroll-mt-24 mt-10">
        <ShortAnswerBlock>{seo.enBref}</ShortAnswerBlock>
      </section>

      <GeoAnswerSection id="public-cible" question="À qui s'adresse cette formation ?">
        <ul className="space-y-2">
          {seo.publicTargets.map((target) => (
            <li key={target} className="flex gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
              {target}
            </li>
          ))}
        </ul>
      </GeoAnswerSection>

      <GeoAnswerSection id="que-apprendre" question="Que vais-je apprendre ?">
        <p>{geo.queApprendre}</p>
      </GeoAnswerSection>

      <GeoAnswerSection id="documents-btp" question="Quels documents BTP sont utilisés ?">
        <ul className="list-disc space-y-1 pl-5">
          {geo.documentsBtp.map((doc) => (
            <li key={doc}>{doc}</li>
          ))}
        </ul>
      </GeoAnswerSection>

      <GeoAnswerSection id="outils-ia" question="Quels outils IA sont utilisés ?">
        <ul className="list-disc space-y-1 pl-5">
          {geo.outilsIa.map((outil) => (
            <li key={outil}>{outil}</li>
          ))}
        </ul>
      </GeoAnswerSection>

      <GeoAnswerSection id="duree-modalites" question="Quelle est la durée et les modalités ?">
        <p>{geo.dureeReponse}</p>
      </GeoAnswerSection>

      <GeoAnswerSection id="livrables" question="Quels livrables repartez-vous avec ?">
        <ul className="list-disc space-y-1 pl-5">
          {geo.livrables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </GeoAnswerSection>

      <GeoAnswerSection id="debutants" question="Les débutants en IA sont-ils acceptés ?">
        <p>{geo.debutants}</p>
      </GeoAnswerSection>

      <GeoAnswerSection id="propres-dossiers" question="Peut-on travailler sur ses propres dossiers ?">
        <p>{geo.propresDossiers}</p>
      </GeoAnswerSection>

      <section id="ia-limites" className="scroll-mt-24 mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          L&apos;IA remplace-t-elle le professionnel ?
        </h2>
        <p className="mt-4 leading-relaxed text-slate-700">{geo.iaRemplacePro}</p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">Ce que l&apos;IA peut et ne peut pas faire</caption>
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

      <GeoAnswerSection id="deroulement" question="Comment se déroule la formation ?">
        <p>{geo.deroulement}</p>
      </GeoAnswerSection>

      <section id="maillage-cluster" className="scroll-mt-24 mt-12">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Formations et ressources du même parcours
        </h2>
        <ul className="mt-6 space-y-2">
          {geo.clusterMaillage.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`font-medium ${OFC_LINK}`}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="autorite-ofc" className="scroll-mt-24 mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        <h2 className="font-display text-xl font-bold text-slate-900">Laure Olivié — formatrice IA BTP</h2>
        <p className="mt-4 leading-relaxed text-slate-700">
          {getFormationCatalogueAutoriteParagraph(formation.programmeUpdatedAt)}
        </p>
        <IndicateursResultatsLink className="mt-3 text-left" />
      </section>

      {showRessourcesExtras && (
        <section id="ressources-liees" className="scroll-mt-24 mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900">Ressources complémentaires</h2>
          <ul className="mt-6 space-y-2">
            {extraRessources.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`font-medium ${OFC_LINK}`}>
                  {link.label}
                </Link>
              </li>
            ))}
            {showEtudeDeCas ? (
              <li>
                <Link href={etudeDeCasHref} className={`font-medium ${OFC_LINK}`}>
                  {etudeDeCasLabel}
                </Link>
              </li>
            ) : null}
            {!clusterHrefs.has(LINKS.prendreRdv) ? (
              <li>
                <Link href={LINKS.prendreRdv} className={`font-medium ${OFC_LINK}`}>
                  Prendre rendez-vous découverte — 30 min gratuites
                </Link>
              </li>
            ) : null}
          </ul>
        </section>
      )}
    </div>
  );
}
