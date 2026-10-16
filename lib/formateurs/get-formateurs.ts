/**
 * Accès unique aux formateurs visibles — gate démo / public.
 * Les profils démo ne sont jamais renvoyés hors prévisualisation privée locale.
 */
import { formationHref, getFormationByCode } from '@/data/formations';
import type { DomaineId, MetierId } from '@/data/catalogue-2027';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';
import { CONFIRMED_FORMATEURS } from '@/lib/formateurs/confirmed-profiles';
import { DEMO_FORMATEURS } from '@/lib/formateurs/demo-profiles';
import { isFormateursDemoPreviewEnabled } from '@/lib/formateurs/preview-env';
import type {
  FormateurFormationLink,
  FormateurId,
  FormateurProfile,
} from '@/lib/formateurs/types';

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

/**
 * Formateurs à afficher selon l’environnement.
 * Public / production : confirmés uniquement.
 * Dev local : confirmés + démo.
 */
export function getVisibleFormateurs(): readonly FormateurProfile[] {
  if (!isFormateursDemoPreviewEnabled()) {
    return CONFIRMED_FORMATEURS;
  }
  return [...CONFIRMED_FORMATEURS, ...DEMO_FORMATEURS];
}

export function getConfirmedFormateurs(): readonly FormateurProfile[] {
  return CONFIRMED_FORMATEURS;
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

/** Liens formations catalogue pour une carte formateur (codes publiés uniquement). */
export function getFormateurFormationLinks(
  formateur: FormateurProfile,
  at: Date = new Date(),
): readonly FormateurFormationLink[] {
  const published = getPublishedFormations(at);
  const codes = formateur.animatesAllPublished
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

export function hasVisibleFormateurs(): boolean {
  return getVisibleFormateurs().length > 0;
}

export function isFormateursDemoActive(): boolean {
  return isFormateursDemoPreviewEnabled();
}
