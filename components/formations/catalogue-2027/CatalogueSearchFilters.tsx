'use client';

import { useId } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import type { FormationNiveau } from '@/data/formations';
import {
  DOMAINES_CATALOGUE_2027,
  METIERS_CATALOGUE_2027,
  type DomaineId,
  type MetierId,
} from '@/data/catalogue-2027';
import type { CatalogueDisponibiliteFilter, CatalogueDureeFilter, CatalogueVue } from '@/lib/catalogue-filter-url';
import {
  CATALOGUE_THEMATIQUES,
  type CatalogueThematiqueId,
} from '@/lib/catalogue-thematiques-btp';
import { FORMATIONS_NIVEAUX_IA } from '@/lib/formations-niveaux-ia';
import type { FormationsIaFilterParams } from '@/lib/catalogue-filter-url';
import { isParcoursMetiers2027Visible } from '@/lib/parcours-metiers-2027-visibility';

type Props = {
  filters: FormationsIaFilterParams;
  metierOptions: readonly MetierId[];
  thematiqueOptions: readonly CatalogueThematiqueId[];
  onChange: (next: Partial<FormationsIaFilterParams>) => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

type FilterFieldsProps = Omit<Props, 'mobileOpen' | 'onMobileOpenChange'> & {
  idPrefix: string;
};

function FilterFields({
  idPrefix,
  filters,
  metierOptions,
  thematiqueOptions,
  onChange,
}: FilterFieldsProps) {
  const vue = filters.vue ?? 'tout';
  const niveauId = `${idPrefix}-niveau`;
  const thematiqueId = `${idPrefix}-thematique`;
  const metierId = `${idPrefix}-metier`;
  const domaineId = `${idPrefix}-domaine`;
  const dureeId = `${idPrefix}-duree`;
  const dispoId = `${idPrefix}-disponibilite`;

  const vueOptions: { id: CatalogueVue; label: string }[] = [
    { id: 'ia', label: 'Formations IA' },
    { id: 'modules', label: 'Modules métier' },
    { id: 'tout', label: 'Tout' },
  ];

  return (
    <div className="space-y-4">
      <fieldset>
        <legend className="text-sm font-semibold text-ofc-ink">Afficher</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {vueOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange({ vue: opt.id === 'tout' ? undefined : opt.id })}
              className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
                vue === opt.id
                  ? 'bg-[#377CF3] text-white'
                  : 'border border-[#E2E8F0] bg-white text-ofc-ink hover:border-[#377CF3]/40'
              }`}
              aria-pressed={vue === opt.id}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <label htmlFor={niveauId} className="text-sm font-semibold text-ofc-ink">
          Niveau
        </label>
        <select
          id={niveauId}
          value={filters.niveau ?? ''}
          onChange={(e) =>
            onChange({
              niveau: e.target.value ? (Number(e.target.value) as FormationNiveau) : undefined,
            })
          }
          className="mt-1.5 min-h-11 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-ofc-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
        >
          <option value="">Tous les niveaux</option>
          {FORMATIONS_NIVEAUX_IA.map((n) => (
            <option key={n.niveau} value={n.niveau}>
              {n.labelComplet}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={thematiqueId} className="text-sm font-semibold text-ofc-ink">
          Thématique
        </label>
        <select
          id={thematiqueId}
          value={filters.thematique ?? ''}
          onChange={(e) =>
            onChange({
              thematique: (e.target.value || undefined) as CatalogueThematiqueId | undefined,
            })
          }
          className="mt-1.5 min-h-11 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-ofc-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
        >
          <option value="">Toutes les thématiques</option>
          {CATALOGUE_THEMATIQUES.filter((t) => thematiqueOptions.includes(t.id)).map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>
      {metierOptions.length > 0 ? (
        <div>
          <label htmlFor={metierId} className="text-sm font-semibold text-ofc-ink">
            Métier
          </label>
          <select
            id={metierId}
            value={filters.metier ?? ''}
            onChange={(e) =>
              onChange({
                metier: (e.target.value || undefined) as MetierId | undefined,
              })
            }
            className="mt-1.5 min-h-11 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-ofc-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
          >
            <option value="">Tous les métiers</option>
            {METIERS_CATALOGUE_2027.filter((m) => metierOptions.includes(m.id)).map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div>
        <label htmlFor={domaineId} className="text-sm font-semibold text-ofc-ink">
          Domaine
        </label>
        <select
          id={domaineId}
          value={filters.domaine ?? ''}
          onChange={(e) =>
            onChange({
              domaine: (e.target.value || undefined) as DomaineId | undefined,
            })
          }
          className="mt-1.5 min-h-11 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-ofc-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
        >
          <option value="">Tous les domaines</option>
          {DOMAINES_CATALOGUE_2027.map((d) => (
            <option key={d.id} value={d.id}>
              {d.numero}. {d.titre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={dureeId} className="text-sm font-semibold text-ofc-ink">
          Durée
        </label>
        <select
          id={dureeId}
          value={filters.duree ?? ''}
          onChange={(e) => {
            const v = e.target.value;
            onChange({
              duree: v ? (Number(v) as CatalogueDureeFilter) : undefined,
            });
          }}
          className="mt-1.5 min-h-11 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-ofc-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
        >
          <option value="">Toutes les durées</option>
          <option value="4">4 h</option>
          <option value="7">7 h</option>
          <option value="14">14 h</option>
        </select>
      </div>
      <div>
        <label htmlFor={dispoId} className="text-sm font-semibold text-ofc-ink">
          Disponibilité
        </label>
        <select
          id={dispoId}
          value={filters.disponibilite ?? ''}
          onChange={(e) =>
            onChange({
              disponibilite: (e.target.value || undefined) as CatalogueDisponibiliteFilter | undefined,
            })
          }
          className="mt-1.5 min-h-11 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-ofc-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
        >
          <option value="">Toutes</option>
          <option value="disponible">Disponible</option>
          {isParcoursMetiers2027Visible() ? (
            <option value="ouverture-2027">Ouverture prévue en 2027</option>
          ) : null}
        </select>
      </div>
      </div>
    </div>
  );
}

export function CatalogueSearchFilters(props: Props) {
  const baseId = useId();
  const { filters, mobileOpen, onMobileOpenChange } = props;

  const activeChips: { key: string; label: string; clear: () => void }[] = [];
  if (filters.niveau) {
    const def = FORMATIONS_NIVEAUX_IA.find((n) => n.niveau === filters.niveau);
    activeChips.push({
      key: 'niveau',
      label: def?.labelComplet ?? `Niveau ${filters.niveau}`,
      clear: () => props.onChange({ niveau: undefined }),
    });
  }
  if (filters.thematique) {
    const th = CATALOGUE_THEMATIQUES.find((t) => t.id === filters.thematique);
    activeChips.push({
      key: 'thematique',
      label: th?.title ?? filters.thematique,
      clear: () => props.onChange({ thematique: undefined }),
    });
  }
  if (filters.metier) {
    const m = METIERS_CATALOGUE_2027.find((x) => x.id === filters.metier);
    activeChips.push({
      key: 'metier',
      label: m?.label ?? filters.metier,
      clear: () => props.onChange({ metier: undefined }),
    });
  }
  if (filters.q) {
    activeChips.push({
      key: 'q',
      label: `Recherche : ${filters.q}`,
      clear: () => props.onChange({ q: undefined }),
    });
  }
  if (filters.vue && filters.vue !== 'tout') {
    activeChips.push({
      key: 'vue',
      label: filters.vue === 'ia' ? 'Formations IA' : 'Modules métier',
      clear: () => props.onChange({ vue: undefined }),
    });
  }
  if (filters.domaine) {
    const d = DOMAINES_CATALOGUE_2027.find((x) => x.id === filters.domaine);
    activeChips.push({
      key: 'domaine',
      label: d?.titre ?? filters.domaine,
      clear: () => props.onChange({ domaine: undefined }),
    });
  }
  if (filters.duree) {
    activeChips.push({
      key: 'duree',
      label: `${filters.duree} h`,
      clear: () => props.onChange({ duree: undefined }),
    });
  }
  if (filters.disponibilite) {
    activeChips.push({
      key: 'disponibilite',
      label:
        filters.disponibilite === 'disponible'
          ? 'Disponible'
          : 'Ouverture prévue en 2027',
      clear: () => props.onChange({ disponibilite: undefined }),
    });
  }

  return (
    <div className="mt-6">
      <div className="hidden md:block">
        <FilterFields idPrefix={`${baseId}-desktop`} {...props} />
      </div>

      <div className="md:hidden">
        <button
          type="button"
          onClick={() => onMobileOpenChange(true)}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-semibold text-ofc-ink hover:border-[#377CF3]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
          aria-expanded={mobileOpen}
          aria-controls={`${baseId}-filters-panel`}
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filtrer{activeChips.length > 0 ? ` (${activeChips.length})` : ''}
        </button>

        {mobileOpen ? (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 bg-slate-900/40"
              aria-label="Fermer les filtres"
              onClick={() => onMobileOpenChange(false)}
            />
            <div
              id={`${baseId}-filters-panel`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${baseId}-filters-title`}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border border-[#E2E8F0] bg-white p-5 shadow-xl motion-safe:animate-[header-mobile-drawer-in_0.24s_var(--ofc-ease-out)_both]"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 id={`${baseId}-filters-title`} className="font-display text-lg font-bold text-ofc-ink">
                  Filtres
                </h3>
                <button
                  type="button"
                  onClick={() => onMobileOpenChange(false)}
                  className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
                  aria-label="Fermer"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <div className="mt-4">
                <FilterFields idPrefix={`${baseId}-mobile`} {...props} />
              </div>
              <button
                type="button"
                onClick={() => onMobileOpenChange(false)}
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-ofc-accent px-4 py-3 text-sm font-semibold text-white hover:bg-ofc-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
              >
                Afficher les résultats
              </button>
            </div>
          </>
        ) : null}
      </div>

      {activeChips.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Filtres actifs">
          {activeChips.map((chip) => (
            <li key={chip.key}>
              <button
                type="button"
                onClick={chip.clear}
                className="inline-flex min-h-9 max-w-full items-center gap-1.5 rounded-full border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs font-medium text-ofc-ink hover:border-[#377CF3]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
              >
                <span className="truncate">{chip.label}</span>
                <X className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="sr-only">Retirer le filtre</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
