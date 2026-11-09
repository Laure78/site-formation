import type { ReactNode } from 'react';
import type { CatalogueModule, ParcoursEtape } from '@/data/catalogue-2027';
import { getModuleProgrammePedagogique } from '@/data/catalogue-2027/module-programmes/programmes-parcours';
import {
  CONFIDENTIALITE_STANDARD,
  partPratiquePourcent,
} from '@/data/catalogue-2027/module-programmes/builders';
import {
  libelleDureeModuleHeures,
  libelleNiveauModule,
  libellePrixModuleInter,
} from '@/lib/catalogue-2027/parcours-affichage';
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
 * Programme détaillé module parcours — structure commune A à J (5 parcours métiers).
 */
export function ParcoursModuleProgrammeDetail({ mod, etape }: Props) {
  const prog = getModuleProgrammePedagogique(mod.code);
  const sequences = mod.programmeSequences ?? prog?.sequences;

  const objectifs = mod.objectifsMesurables?.length
    ? mod.objectifsMesurables
    : prog?.objectifsMesurables?.length
      ? prog.objectifsMesurables
      : mod.objectifPrincipal
        ? [mod.objectifPrincipal]
        : [];

  const pctPratique =
    sequences?.length && prog
      ? partPratiquePourcent(sequences, prog.dureeMinutes)
      : null;

  const confidentialite =
    prog?.verificationHumaineEtConfidentialite ?? CONFIDENTIALITE_STANDARD;

  return (
    <div className="space-y-0">
      <DetailSection title="A. Intitulé et code">
        <p>
          <span className="font-semibold text-[#101936]">{mod.code}</span>
          {' — '}
          {prog?.intitule ?? mod.titre}
        </p>
      </DetailSection>

      <DetailSection title="B. Niveau, durée et tarif">
        <ul className="list-disc space-y-1 pl-5">
          <li>{libelleNiveauModule(mod)}</li>
          <li>Durée : {libelleDureeModuleHeures(mod)}</li>
          <li>Tarif inter : {libellePrixModuleInter(mod)}</li>
        </ul>
      </DetailSection>

      <DetailSection title="C. Public concerné et prérequis">
        <p className="mb-2">
          <span className="font-medium text-[#101936]">Public — </span>
          {prog?.publicCible ?? mod.publicCible}
        </p>
        <p>
          <span className="font-medium text-[#101936]">Prérequis — </span>
          {prog?.prerequis ?? mod.prerequis}
        </p>
      </DetailSection>

      {objectifs.length > 0 ? (
        <DetailSection title="D. Objectifs pédagogiques mesurables">
          <ul className="list-disc space-y-1 pl-5">
            {objectifs.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </DetailSection>
      ) : null}

      {sequences?.length ? (
        <DetailSection title="E. Programme chronologique">
          <p className="mb-2 text-xs text-slate-500">
            Durée annoncée : {mod.dureeHeures} h ({sequences.reduce((s, x) => s + x.minutes, 0)} min planifiées
            {pctPratique != null ? ` · ~${pctPratique} % d’activités pratiques guidées` : ''}
            ).
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

      <DetailSection title="F. Exercice pratique">
        {prog?.exercicePratique ? (
          <p className="mb-2">{prog.exercicePratique}</p>
        ) : null}
        <p>
          <span className="font-medium text-[#101936]">Dans ce parcours — </span>
          {etape.exercice}
        </p>
        {etape.competence ? (
          <p className="mt-2">
            <span className="font-medium text-[#101936]">Compétence travaillée : </span>
            {etape.competence}
          </p>
        ) : null}
      </DetailSection>

      <DetailSection title="G. Utilisation de l’IA">
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
              <span className="font-medium text-[#101936]">Vérification des sorties IA : </span>
              {prog.usageIa.controleHumain}
            </p>
          </div>
        ) : (
          (() => {
            const iaUsageLegacy = getModule2027IaUsage(mod.code);
            if (iaUsageLegacy) {
              return (
                <div className="space-y-2">
                  <p>
                    <span className="font-medium text-[#101936]">Outil : </span>
                    {labelOutil(iaUsageLegacy.outil)}
                  </p>
                  <p>{iaUsageLegacy.tacheIa}</p>
                  <p>
                    <span className="font-medium text-[#101936]">Vérification : </span>
                    {iaUsageLegacy.controlesHumains}
                  </p>
                </div>
              );
            }
            return (
              <p>Usage IA contextualisé en session ; contrôle humain systématique sur les livrables.</p>
            );
          })()
        )}
      </DetailSection>

      <DetailSection title="H. Livrables professionnels">
        <p className="mb-2">
          <span className="font-medium text-[#101936]">Livrable attendu dans ce parcours : </span>
          {etape.livrable}
        </p>
        {(mod.livrables.length > 0 || prog?.livrables.length) ? (
          <ul className="list-disc space-y-1 pl-5">
            {(prog?.livrables ?? mod.livrables).map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        ) : null}
      </DetailSection>

      <DetailSection title="I. Modalités et critères d’évaluation">
        {prog ? (
          <>
            <p>{prog.evaluation.modalites}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {prog.evaluation.criteres.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>{mod.evaluation}</p>
        )}
      </DetailSection>

      <DetailSection title="J. Validation humaine et confidentialité">
        <p>{confidentialite}</p>
      </DetailSection>
    </div>
  );
}
