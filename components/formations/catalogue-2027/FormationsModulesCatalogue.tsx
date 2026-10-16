'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  DOMAINES_CATALOGUE_2027,
  METIERS_CATALOGUE_2027,
  SOUS_DOMAINES_IA_CHANTIER,
  formatPrixInterHt,
  prixModuleInterHt,
  type DisponibiliteCommerciale,
  type DomaineId,
  type MetierId,
  type ModuleDureeHeures,
  type SousDomaineIaChantierId,
} from '@/data/catalogue-2027';
import {
  filterCatalogueModules,
  libelleDisponibilite,
} from '@/lib/catalogue-2027/search-modules';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

const DUREES: Array<ModuleDureeHeures | 'all'> = ['all', 4, 7, 14];

export function FormationsModulesCatalogue() {
  const [query, setQuery] = useState('');
  const [domaineId, setDomaineId] = useState<DomaineId | 'all'>('all');
  const [metierId, setMetierId] = useState<MetierId | 'all'>('all');
  const [disponibilite, setDisponibilite] = useState<DisponibiliteCommerciale | 'all'>('all');
  const [dureeHeures, setDureeHeures] = useState<ModuleDureeHeures | 'all'>('all');
  const [thematiqueChantierIa, setThematiqueChantierIa] = useState<
    SousDomaineIaChantierId | 'all'
  >('all');

  const results = useMemo(
    () =>
      filterCatalogueModules({
        query,
        domaineId,
        metierId,
        disponibilite,
        dureeHeures,
        thematiqueChantierIa,
      }),
    [query, domaineId, metierId, disponibilite, dureeHeures, thematiqueChantierIa],
  );

  const reset = () => {
    setQuery('');
    setDomaineId('all');
    setMetierId('all');
    setDisponibilite('all');
    setDureeHeures('all');
    setThematiqueChantierIa('all');
  };

  return (
    <section
      id="catalogue-modules"
      className="mt-16 scroll-mt-24 border-t border-[#E2E8F0] pt-14"
      aria-labelledby="catalogue-modules-title"
    >
      <h2 id="catalogue-modules-title" className="ofc-type-h2 text-ofc-ink">
        Catalogue par domaine
      </h2>
      <p className="mt-3 max-w-2xl text-ofc-ink-muted">
        35 modules uniques. Recherchez par titre, sujet ou document métier (DCE, CCTP, planning,
        sécurité, PPSPS, accueil sécurité, Claude…). Sous-domaines IA chantier :{' '}
        <a href="#organisation-chantier-ia" className="font-medium text-[#377CF3] underline">
          organisation
        </a>{' '}
        et{' '}
        <a href="#securite-prevention-chantier-ia" className="font-medium text-[#377CF3] underline">
          prévention
        </a>
        .
      </p>

      <div className="mt-6 grid gap-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 md:grid-cols-2 lg:grid-cols-3">
        <label className="block text-sm md:col-span-2 lg:col-span-3">
          <span className="font-medium text-ofc-ink">Recherche</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex. organisation chantier, planning, sécurité, PPSPS, Claude…"
            className="mt-1 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 py-2 text-ofc-ink focus:border-[#377CF3] focus:outline-none focus:ring-2 focus:ring-[#377CF3]/30"
          />
        </label>
        <label className="block text-sm md:col-span-2 lg:col-span-3">
          <span className="font-medium text-ofc-ink">Sous-domaine IA chantier</span>
          <select
            value={thematiqueChantierIa}
            onChange={(e) =>
              setThematiqueChantierIa(e.target.value as SousDomaineIaChantierId | 'all')
            }
            className="mt-1 w-full max-w-xl rounded-lg border border-[#CBD5E1] bg-white px-3 py-2"
          >
            <option value="all">Tous les modules</option>
            {SOUS_DOMAINES_IA_CHANTIER.map((t) => (
              <option key={t.id} value={t.id}>
                {t.titre}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ofc-ink">Domaine</span>
          <select
            value={domaineId}
            onChange={(e) => setDomaineId(e.target.value as DomaineId | 'all')}
            className="mt-1 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 py-2"
          >
            <option value="all">Tous les domaines</option>
            {DOMAINES_CATALOGUE_2027.map((d) => (
              <option key={d.id} value={d.id}>
                {d.numero}. {d.titre}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ofc-ink">Métier</span>
          <select
            value={metierId}
            onChange={(e) => setMetierId(e.target.value as MetierId | 'all')}
            className="mt-1 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 py-2"
          >
            <option value="all">Tous les métiers</option>
            {METIERS_CATALOGUE_2027.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ofc-ink">Disponibilité</span>
          <select
            value={disponibilite}
            onChange={(e) => setDisponibilite(e.target.value as DisponibiliteCommerciale | 'all')}
            className="mt-1 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 py-2"
          >
            <option value="all">Toutes</option>
            <option value="disponible">Disponible</option>
            <option value="ouverture-2027">Ouverture prévue en 2027</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ofc-ink">Durée</span>
          <select
            value={dureeHeures}
            onChange={(e) =>
              setDureeHeures(
                e.target.value === 'all' ? 'all' : (Number(e.target.value) as ModuleDureeHeures),
              )
            }
            className="mt-1 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 py-2"
          >
            {DUREES.map((d) => (
              <option key={String(d)} value={d}>
                {d === 'all' ? 'Toutes les durées' : `${d} h`}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end">
          <button
            type="button"
            onClick={reset}
            className="min-h-10 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 py-2 text-sm font-medium text-ofc-ink hover:border-[#377CF3]"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm font-medium text-ofc-ink" aria-live="polite">
        {results.length} résultat{results.length > 1 ? 's' : ''}
      </p>

      {results.length === 0 ? (
        <p className="mt-6 rounded-lg border border-[#E2E8F0] bg-white p-6 text-ofc-ink-muted">
          Aucun module ne correspond à ces critères. Élargissez la recherche ou réinitialisez les
          filtres — ou{' '}
          <Link
            href={catalogueDemandeHref({
              formationOuParcours: 'Demande catalogue modules',
              nature: 'choix-formation',
            })}
            className="font-medium text-[#377CF3] underline"
          >
            demandez un programme adapté
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-[#E2E8F0] border border-[#E2E8F0] bg-white">
          {results.map((m) => {
            const prix = prixModuleInterHt(
              m.code,
              m.variantesDureeHeures ? m.dureeHeures : m.dureeHeures,
            );
            return (
              <li key={m.code} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs text-ofc-ink-muted">
                    {DOMAINES_CATALOGUE_2027.find((d) => d.id === m.domaineId)?.titre} ·{' '}
                    <span className="tabular-nums">{m.code}</span>
                  </p>
                  <h3 className="mt-1 font-semibold text-ofc-ink">{m.titre}</h3>
                  <p className="mt-1 text-sm text-ofc-ink-muted">{m.objectifPrincipal}</p>
                  <p className="mt-2 text-sm text-ofc-ink">
                    {m.variantesDureeHeures ? '7 h ou 14 h' : `${m.dureeHeures} h`} ·{' '}
                    {m.code === 'NUM-04'
                      ? `${formatPrixInterHt(310)} ou ${formatPrixInterHt(620)}`
                      : formatPrixInterHt(prix)}{' '}
                    / participant · {libelleDisponibilite(m.disponibilite)}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                  {m.href ? (
                    <Link
                      href={m.href}
                      className={`${OFC_CTA_PRIMARY} inline-flex min-h-10 items-center justify-center px-4 py-2 text-sm`}
                    >
                      Voir la fiche
                    </Link>
                  ) : (
                    <Link
                      href={catalogueDemandeHref({
                        formationOuParcours: `${m.code} — ${m.titre}`,
                        nature: 'choix-formation',
                      })}
                      className={`${OFC_CTA_PRIMARY} inline-flex min-h-10 items-center justify-center px-4 py-2 text-sm`}
                    >
                      Demander le programme
                    </Link>
                  )}
                  <Link
                    href={catalogueDemandeHref({
                      formationOuParcours: `${m.code} — ${m.titre}`,
                      nature: 'devis',
                    })}
                    className={`${OFC_CTA_SECONDARY} inline-flex min-h-10 items-center justify-center px-4 py-2 text-sm`}
                  >
                    Demander un devis
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
