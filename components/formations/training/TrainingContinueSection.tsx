'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { getParcoursLinksForFormation } from '@/lib/page-maillage-blocks';
import { getRelatedCatalogueFormations } from '@/lib/catalogue-formation-related';
import { FORMATIONS } from '@/data/formations';
import { libelleTarifParcoursCatalogue } from '@/lib/formations-catalogue-display';
import { formationNiveauBadge } from '@/lib/formations-niveaux-ia';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type Props = {
  programmeRef: FormationCatalogueCode;
};

export function TrainingContinueSection({ programmeRef }: Props) {
  const parcours = getParcoursLinksForFormation(programmeRef);
  const formations = getRelatedCatalogueFormations(programmeRef);
  const baseId = useId();

  const showParcours = parcours.length > 0;
  const showFormations = formations.length > 0;
  const defaultTab = showParcours ? 'parcours' : 'formations';
  const [tab, setTab] = useState<'parcours' | 'formations'>(defaultTab);
  const showTabs = showParcours && showFormations;

  if (!showParcours && !showFormations) return null;

  return (
    <section
      className="border-b border-slate-200 bg-white px-4 py-10 md:py-12"
      aria-labelledby="poursuivre-competences-title"
    >
      <div className="mx-auto max-w-[78rem]">
        <h2
          id="poursuivre-competences-title"
          className="font-display text-xl font-bold text-slate-900 md:text-2xl"
        >
          Poursuivez votre montée en compétences
        </h2>

        {showTabs ? (
          <div
            role="tablist"
            aria-label="Recommandations"
            className="mt-6 inline-flex gap-1 rounded-xl bg-slate-100 p-1"
          >
            <button
              type="button"
              role="tab"
              id={`${baseId}-tab-parcours`}
              aria-selected={tab === 'parcours'}
              aria-controls={`${baseId}-panel-parcours`}
              onClick={() => setTab('parcours')}
              className={`min-h-10 rounded-lg px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
                tab === 'parcours' ? 'bg-white text-[#377CF3] shadow-sm' : 'text-slate-600'
              }`}
            >
              Parcours métiers associés
            </button>
            <button
              type="button"
              role="tab"
              id={`${baseId}-tab-formations`}
              aria-selected={tab === 'formations'}
              aria-controls={`${baseId}-panel-formations`}
              onClick={() => setTab('formations')}
              className={`min-h-10 rounded-lg px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
                tab === 'formations' ? 'bg-white text-[#377CF3] shadow-sm' : 'text-slate-600'
              }`}
            >
              Formations complémentaires
            </button>
          </div>
        ) : null}

        <div className="mt-6">
          {(tab === 'parcours' || !showTabs) && showParcours ? (
            <ul
              role={showTabs ? 'tabpanel' : undefined}
              id={showTabs ? `${baseId}-panel-parcours` : undefined}
              aria-labelledby={showTabs ? `${baseId}-tab-parcours` : undefined}
              className={`grid gap-4 ${
                parcours.length === 1
                  ? 'max-w-md'
                  : 'sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {parcours.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-[#377CF3]/35 hover:bg-white hover:shadow-sm"
                  >
                    <span className="font-display text-base font-semibold text-slate-900 group-hover:text-[#377CF3]">
                      {item.title}
                    </span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </span>
                    <span className={`${OFC_LINK} mt-4 inline-flex items-center gap-1 text-sm font-semibold`}>
                      Découvrir le parcours
                      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          {(tab === 'formations' || (!showTabs && !showParcours)) && showFormations ? (
            <ul
              role={showTabs ? 'tabpanel' : undefined}
              id={showTabs ? `${baseId}-panel-formations` : undefined}
              aria-labelledby={showTabs ? `${baseId}-tab-formations` : undefined}
              className={`grid gap-4 ${
                formations.length === 1
                  ? 'max-w-md'
                  : 'sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {formations.map((item) => {
                const codeMatch = item.href.match(/\/formations\/([^/]+)/);
                const slug = codeMatch?.[1];
                const bySlug = slug ? FORMATIONS.find((x) => x.slug === slug) : undefined;
                const level =
                  bySlug && bySlug.niveau
                    ? formationNiveauBadge(bySlug.niveau)
                    : null;
                const tarif = bySlug ? libelleTarifParcoursCatalogue(bySlug) : null;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex h-full flex-col rounded-2xl border border-t-4 border-t-[#377CF3] border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#377CF3]/40 hover:shadow-md"
                    >
                      {level ? (
                        <span className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#377CF3]">
                          {level}
                        </span>
                      ) : null}
                      <span className="mt-1 font-display text-base font-semibold text-slate-900 group-hover:text-[#377CF3]">
                        {item.title}
                      </span>
                      <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                        {item.teaser}
                      </span>
                      {bySlug ? (
                        <p className="mt-3 text-xs text-slate-500">
                          {bySlug.duree}
                          {tarif && tarif !== 'Sur devis' ? ` · ${tarif} HT / participant` : null}
                        </p>
                      ) : null}
                      <span className={`${OFC_LINK} mt-3 inline-flex items-center gap-1 text-sm font-semibold`}>
                        Voir le programme
                        <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
