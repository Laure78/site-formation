import Link from 'next/link';
import { Check } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import {
  AO_ASSISTANTS_IA,
  AO_CAS_PRATIQUE_MENUISERIE_ITEMS,
  AO_FORMATION_CAS_PRATIQUE_QUOTE,
  AO_FORMATION_PERSONNALISATION,
  AO_FORMATION_PROMESSE,
  AO_LIVRABLES_FORMATION,
  AO_PRUDENCE_FORMULATION,
  AO_RESULTATS_ATTENDUS,
  AO_WORKFLOW_20_STEPS,
} from '@/lib/formation-ia-appels-offres-btp-operational-content';

type Props = {
  /** Afficher le lien vers la fiche catalogue en fin de section cas pratique. */
  showCatalogueLink?: boolean;
};

/**
 * Sections opérationnelles AO — cas pratique, workflow, assistants, livrables.
 * Réutilisé sur la landing SEO et la fiche catalogue NIV-02.
 */
export function FormationIaAppelsOffresOperationalSections({ showCatalogueLink = false }: Props) {
  return (
    <>
      <section id="cas-pratique-dce-reel" className="scroll-mt-24 mt-14">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Cas pratique — vos DCE et devis réels
        </h2>
        <p className="mt-4 leading-relaxed text-slate-600">
          Cette formation IA appels d&apos;offres BTP n&apos;est pas une initiation théorique à ChatGPT ou à
          l&apos;IA. Les participants travaillent sur leurs propres documents professionnels : analyse DCE avec
          IA, comparaison CCTP / DPGF, préparation du chiffrage et structuration du mémoire technique.
        </p>
        <blockquote className="mt-6 rounded-2xl border-l-4 border-[#377CF3] bg-slate-50 p-6 text-slate-700">
          <p className="text-lg leading-relaxed italic">&laquo;&nbsp;{AO_FORMATION_CAS_PRATIQUE_QUOTE}&nbsp;&raquo;</p>
        </blockquote>
        <p className="mt-4 leading-relaxed text-slate-600">{AO_FORMATION_PERSONNALISATION}</p>
        <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
          Exemple — entreprise de menuiserie (lot menuiseries)
        </h3>
        <ul className="mt-4 space-y-2 text-slate-700">
          {AO_CAS_PRATIQUE_MENUISERIE_ITEMS.map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        {showCatalogueLink ? (
          <p className="mt-6 text-sm text-slate-600">
            <Link href={LINKS.formationAO} className={`font-semibold ${OFC_LINK}`}>
              Voir le programme détaillé NIV-02 — formation ChatGPT appels d&apos;offres BTP
            </Link>
          </p>
        ) : null}
      </section>

      <section id="promesse-formation" className="scroll-mt-24 mt-14 rounded-2xl border border-[#377CF3]/25 bg-[#F8FAFC] p-6 md:p-8">
        <h2 className="font-display text-2xl font-bold text-slate-900">Ce que vous repartez avec</h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">{AO_FORMATION_PROMESSE}</p>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{AO_PRUDENCE_FORMULATION}</p>
      </section>

      <section id="workflow-ao" className="scroll-mt-24 mt-14">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Workflow reproductible — 20 étapes
        </h2>
        <p className="mt-3 text-slate-600">
          Méthode enseignée en session : de l&apos;import du DCE au contrôle final, en passant par l&apos;IA
          chiffrage bâtiment (assistée) et le ChatGPT mémoire technique BTP (structuration et rédaction).
        </p>
        <ol className="mt-8 list-decimal space-y-4 pl-5 text-slate-700">
          {AO_WORKFLOW_20_STEPS.map((step) => (
            <li key={step.title} className="pl-1">
              <strong className="text-slate-900">{step.title}</strong>
              <span className="mt-1 block text-sm leading-relaxed text-slate-600">{step.body}</span>
            </li>
          ))}
        </ol>
      </section>

      <section id="assistants-ia-ao" className="scroll-mt-24 mt-14">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Assistants IA réutilisables — 8 workflows
        </h2>
        <p className="mt-3 text-slate-600">
          En formation, vous configurez plusieurs assistants ou workflows pour vos futurs dossiers — assistant IA
          appels d&apos;offres adapté à votre entreprise.
        </p>
        <ul className="mt-8 space-y-5">
          {AO_ASSISTANTS_IA.map((assistant) => (
            <li
              key={assistant.name}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-display text-lg font-semibold text-slate-900">{assistant.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{assistant.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="resultats-attendus" className="scroll-mt-24 mt-14">
        <h2 className="font-display text-2xl font-bold text-slate-900">Résultats attendus</h2>
        <p className="mt-3 text-slate-600">
          À l&apos;issue de la formation IA appels d&apos;offres BTP, le participant est capable de :
        </p>
        <ul className="mt-6 space-y-2">
          {AO_RESULTATS_ATTENDUS.map((item) => (
            <li key={item} className="flex gap-2 text-slate-700">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section id="livrables-ao" className="scroll-mt-24 mt-14">
        <h2 className="font-display text-2xl font-bold text-slate-900">Livrables de la formation</h2>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {AO_LIVRABLES_FORMATION.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-slate-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
