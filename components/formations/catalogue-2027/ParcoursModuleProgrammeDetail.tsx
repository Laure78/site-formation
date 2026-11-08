import type { ReactNode } from 'react';
import type { CatalogueModule, ParcoursEtape } from '@/data/catalogue-2027';
import { getModuleProgrammePedagogique } from '@/data/catalogue-2027/module-programmes/programmes-parcours';
import { CONFIDENTIALITE_STANDARD } from '@/data/catalogue-2027/module-programmes/builders';
import { getModule2027IaUsage, labelOutil } from '@/lib/formation-ia';

type Props = {
  mod: CatalogueModule;
  etape: ParcoursEtape;
};

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-slate-100 pt-3 first:border-t-0 first:pt-0">
      <h4 className="text-sm font-medium text-[#101936]">{title}</h4>
      <div className="mt-1.5 text-sm text-slate-600">{children}</div>
    </section>
  );
}

/**
 * Contenu dépliable module parcours — ordre fixe A à H (identique sur les 5 métiers).
 */
export function ParcoursModuleProgrammeDetail({ mod, etape }: Props) {
  const prog = getModuleProgrammePedagogique(mod.code);
  const sequences = mod.programmeSequences ?? prog?.sequences;
  const iaUsageLegacy = getModule2027IaUsage(mod.code);

  const objectifs = mod.objectifsMesurables?.length
    ? mod.objectifsMesurables
    : mod.objectifPrincipal
      ? [mod.objectifPrincipal]
      : [];

  const evaluationText = prog
    ? `${prog.evaluation.modalites} Critères : ${prog.evaluation.criteres.join(' · ')}`
    : mod.evaluation;

  const confidentialite =
    prog?.verificationHumaineEtConfidentialite ?? CONFIDENTIALITE_STANDARD;

  return (
    <div className="space-y-0">
      {/* A — Objectifs pédagogiques */}
      {objectifs.length > 0 ? (
        <DetailSection title="A. Objectifs pédagogiques">
          <ul className="list-disc space-y-1 pl-5">
            {objectifs.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </DetailSection>
      ) : null}

      {/* B — Prérequis */}
      {mod.prerequis ? (
        <DetailSection title="B. Prérequis">
          <p>{mod.prerequis}</p>
        </DetailSection>
      ) : null}

      {/* C — Programme chronologique */}
      {sequences?.length ? (
        <DetailSection title="C. Programme chronologique et durée des séquences">
          <p className="mb-2 text-xs text-slate-500">
            Durée annoncée : {mod.dureeHeures} h ({sequences.reduce((s, x) => s + x.minutes, 0)} min de séquences
            planifiées).
          </p>
          <ol className="space-y-2">
            {sequences.map((seq) => (
              <li key={seq.ordre} className="rounded-lg border border-slate-100 bg-white px-3 py-2">
                <p className="text-xs font-semibold text-[#377CF3]">
                  {String(seq.ordre).padStart(2, '0')}. {seq.titre} · {seq.minutes} min
                </p>
                <p className="mt-1">{seq.contenu}</p>
              </li>
            ))}
          </ol>
        </DetailSection>
      ) : null}

      {/* D — Exercice professionnel BTP (variante parcours si définie) */}
      <DetailSection title="D. Exercice professionnel BTP">
        <p className="mb-2">
          <span className="font-medium text-[#101936]">Dans ce parcours : </span>
          {etape.exercice}
        </p>
        {etape.competence ? (
          <p>
            <span className="font-medium text-[#101936]">Compétence travaillée : </span>
            {etape.competence}
          </p>
        ) : null}
      </DetailSection>

      {/* E — Utilisation de l'IA */}
      <DetailSection title="E. Utilisation de l’IA">
        {prog?.usageIa ? (
          <div className="space-y-2">
            <p>
              <span className="font-medium text-[#101936]">Outil : </span>
              {prog.usageIa.outil === 'claude-et-chatgpt'
                ? 'Claude et ChatGPT'
                : labelOutil(prog.usageIa.outil)}
            </p>
            <p>{prog.usageIa.description}</p>
            <p>
              <span className="font-medium text-[#101936]">Documents : </span>
              {prog.usageIa.documents}
            </p>
            <p>
              <span className="font-medium text-[#101936]">Contrôle humain : </span>
              {prog.usageIa.controleHumain}
            </p>
          </div>
        ) : iaUsageLegacy ? (
          <div className="space-y-2">
            <p>
              <span className="font-medium text-[#101936]">Outil : </span>
              {labelOutil(iaUsageLegacy.outil)}
            </p>
            <p>{iaUsageLegacy.tacheIa}</p>
            <p>
              <span className="font-medium text-[#101936]">Contrôle humain : </span>
              {iaUsageLegacy.controlesHumains}
            </p>
          </div>
        ) : (
          <p>Usage IA contextualisé en session selon le module ; validation humaine systématique.</p>
        )}
      </DetailSection>

      {/* F — Livrables */}
      <DetailSection title="F. Livrables remis ou produits">
        <p className="mb-2">
          <span className="font-medium text-[#101936]">Livrable principal dans ce parcours : </span>
          {etape.livrable}
        </p>
        {mod.livrables.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5">
            {mod.livrables.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        ) : null}
      </DetailSection>

      {/* G — Évaluation */}
      {evaluationText ? (
        <DetailSection title="G. Évaluation des acquis">
          <p>{evaluationText}</p>
        </DetailSection>
      ) : null}

      {/* H — Vérifications humaines */}
      <DetailSection title="H. Vérifications humaines et confidentialité">
        <p>{confidentialite}</p>
      </DetailSection>
    </div>
  );
}
