/**
 * Accès unique aux formateurs visibles.
 */
import { formationHref, getFormationByCode } from '@/data/formations';
import { getModuleByCode, getSousDomaineIaChantierById } from '@/data/catalogue-2027';
import type { DomaineId, MetierId } from '@/data/catalogue-2027';
import { libelleDisponibilite } from '@/lib/catalogue-2027/search-modules';
import { CATALOGUE_FORMATEURS } from '@/lib/formateurs/catalogue-formateurs-profiles';
import {
  CONFIRMED_FORMATEURS,
  FORMATEUR_LAURE_OLIVIE,
} from '@/lib/formateurs/confirmed-profiles';
import type {
  FormateurFormationLink,
  FormateurId,
  FormateurModuleLink,
  FormateurProfile,
  FormateurSousDomaineLink,
} from '@/lib/formateurs/types';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';

/** Métiers parcours → domaines catalogue (section sous-domaine). */
const METIER_TO_DOMAINES: Record<MetierId, readonly DomaineId[]> = {
  dirigeant: ['direction'],
  'charge-affaires': ['commercial'],
  'conducteur-travaux': ['travaux'],
  'chef-chantier': ['travaux', 'management'],
  'chef-equipe': ['management'],
  'assistant-gestion': ['administration'],
  'referent-ia': ['numerique-ia'],
};

function isConfirmed(f: FormateurProfile): boolean {
  return f.status === 'confirmed';
}

/** Intervenants IA (Laure) — inchangé pour les fiches NIV. */
export function getIaFormateurs(): readonly FormateurProfile[] {
  return CONFIRMED_FORMATEURS;
}

/** Profils catalogue parcours métiers (hub + pages domaine). */
export function getCatalogueFormateurs(): readonly FormateurProfile[] {
  return CATALOGUE_FORMATEURS.filter((f) => !f.hubOnly);
}

/** Page /formateurs — Laure en tête, puis les intervenants catalogue 2027. */
export function getFormateursHubProfiles(): readonly FormateurProfile[] {
  return [FORMATEUR_LAURE_OLIVIE, ...CATALOGUE_FORMATEURS];
}

/**
 * Formateurs à afficher sur les pages parcours / domaine catalogue.
 * Laure (IA) + intervenants métier 2027.
 */
export function getVisibleFormateurs(): readonly FormateurProfile[] {
  return [...CONFIRMED_FORMATEURS, ...getCatalogueFormateurs()];
}

export function getConfirmedFormateurs(): readonly FormateurProfile[] {
  return getVisibleFormateurs().filter(isConfirmed);
}

export function getFormateurById(id: FormateurId): FormateurProfile | undefined {
  return getVisibleFormateurs().find((f) => f.id === id);
}

export function getFormateurBySlug(slug: string): FormateurProfile | undefined {
  return getVisibleFormateurs().find((f) => f.slug === slug);
}

/** Formateurs rattachés à un domaine catalogue — section masquée si liste vide. */
export function getFormateursForDomaine(
  domaineId: DomaineId,
): readonly FormateurProfile[] {
  return getVisibleFormateurs().filter((f) => f.domaineIds.includes(domaineId));
}

/** Formateurs pour un parcours métier (via domaines associés). */
export function getFormateursForMetier(
  metierId: MetierId,
): readonly FormateurProfile[] {
  const domaines = METIER_TO_DOMAINES[metierId] ?? [];
  if (domaines.length === 0) return [];
  const seen = new Set<FormateurId>();
  const out: FormateurProfile[] = [];
  for (const domaineId of domaines) {
    for (const f of getFormateursForDomaine(domaineId)) {
      if (f.animatesAllPublished && metierId !== 'referent-ia') continue;
      if (seen.has(f.id)) continue;
      seen.add(f.id);
      out.push(f);
    }
  }
  return out;
}

/** Formateurs associés à une fiche catalogue (code NIV). */
export function getFormateursForFormationCode(
  code: string,
  at: Date = new Date(),
): readonly FormateurProfile[] {
  const published = new Set(getPublishedFormations(at).map((f) => f.code));
  if (!published.has(code)) {
    return getVisibleFormateurs().filter(
      (f) => isConfirmed(f) && f.animatesAllPublished,
    );
  }
  return getVisibleFormateurs().filter((f) => {
    if (f.animatesAllPublished) return true;
    return f.formationCodes.includes(code);
  });
}

/** Liens formations catalogue IA (codes NIV publiés uniquement). */
export function getFormateurFormationLinks(
  formateur: FormateurProfile,
  at: Date = new Date(),
  opts?: { hub?: boolean },
): readonly FormateurFormationLink[] {
  const published = getPublishedFormations(at);
  const hubCodes = formateur.formationCodesHub;
  const codes =
    opts?.hub && hubCodes && hubCodes.length > 0
      ? hubCodes
      : formateur.animatesAllPublished
        ? published.map((f) => f.code)
        : formateur.formationCodes;

  const links: FormateurFormationLink[] = [];
  const seen = new Set<string>();
  for (const code of codes) {
    if (seen.has(code)) continue;
    const formation = getFormationByCode(code);
    if (!formation) continue;
    if (!published.some((f) => f.code === code)) continue;
    seen.add(code);
    links.push({
      code: formation.code,
      titre: formation.titre,
      href: formationHref(formation),
      duree: formation.duree,
    });
  }
  return links;
}

/** Liens modules catalogue 2027 — titres et statuts depuis `data/catalogue-2027`. */
export function getFormateurModuleLinks(
  formateur: FormateurProfile,
): readonly FormateurModuleLink[] {
  const codes = formateur.moduleCodes ?? [];
  const links: FormateurModuleLink[] = [];
  for (const code of codes) {
    const mod = getModuleByCode(code);
    if (!mod) continue;
    const formationHint = `${mod.code} — ${mod.titre}`;
    const href =
      mod.href ??
      catalogueDemandeHref({
        formationOuParcours: formationHint,
        nature: 'choix-formation',
      });
    links.push({
      code: mod.code,
      titre: mod.titre,
      href,
      ctaLabel: mod.href ? 'Voir le programme' : 'Demander le programme',
      disponibiliteLabel: libelleDisponibilite(mod.disponibilite),
      dureeLabel: mod.variantesDureeHeures
        ? `${mod.variantesDureeHeures.join(' h ou ')} h`
        : `${mod.dureeHeures} h`,
    });
  }
  return links;
}

/** Liens sous-domaines IA chantier — ancre sur le catalogue /formations. */
export function getFormateurSousDomaineLinks(
  formateur: FormateurProfile,
): readonly FormateurSousDomaineLink[] {
  const refs = formateur.hubSousDomaines ?? [];
  const links: FormateurSousDomaineLink[] = [];
  for (const ref of refs) {
    const sd = getSousDomaineIaChantierById(ref.id);
    if (!sd) continue;
    links.push({
      id: ref.id,
      titre: sd.titre,
      href: `${LINKS.formations}#${sd.slug}`,
      note: ref.note,
    });
  }
  return links;
}

export function hasVisibleFormateurs(): boolean {
  return getVisibleFormateurs().length > 0;
}

/** @deprecated Plus de profils démo — conservé pour compatibilité des imports. */
export function isFormateursDemoActive(): boolean {
  return false;
}
