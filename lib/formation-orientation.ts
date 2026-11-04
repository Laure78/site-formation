/**
 * Orientation « Quelle formation IA BTP choisir ? » — règles explicites, sans API IA.
 * Formations : `data/formations.ts` + visibilité catalogue.
 */
import {
  formationHref,
  getFormationByCode,
  type Formation,
  type FormationNiveau,
} from '@/data/formations';
import type { ParcoursId } from '@/data/catalogue-2027';
import { parcoursHref } from '@/lib/catalogue-2027/parcours-href';
import {
  formationNiveauLabelCourt,
  getFormationNiveauIaDefinition,
} from '@/lib/formations-niveaux-ia';
import {
  isFormationCataloguePublished,
  isFormationCatalogueRetired,
} from '@/lib/formation-catalogue-visibility';
import { LINKS } from '@/lib/internal-links';

export const FORMATION_ORIENTATION_SECTION_ID = 'quelle-formation-choisir' as const;

export type OrientationMetier =
  | 'dirigeant'
  | 'charge-affaires'
  | 'conducteur-travaux'
  | 'chef-chantier'
  | 'assistant-gestion'
  | 'maitrise-oeuvre'
  | 'autre';

export type OrientationPratiqueIa = 'debute' | 'utilise-deja' | 'avance';

export type OrientationBesoin =
  | 'devis-relances'
  | 'dce-ao'
  | 'cr-suivi'
  | 'admin'
  | 'assistants-apps'
  | 'encadrer-ia';

export type OrientationEffectif = 'moi' | 'equipe-2-5' | 'equipe-6-plus' | 'a-preciser';

export type OrientationAnswers = {
  metier?: OrientationMetier;
  pratique?: OrientationPratiqueIa;
  besoin?: OrientationBesoin;
  effectif?: OrientationEffectif;
};

export type OrientationFormationRecommendation = {
  kind: 'formation';
  code: string;
  titre: string;
  href: string;
  niveauLabel: string;
  duree: string;
  prerequis: string;
  justification: string;
  prerequisAlert?: string;
};

export type OrientationParcoursRecommendation = {
  kind: 'parcours';
  parcoursId: ParcoursId;
  titre: string;
  href: string;
  justification: string;
};

export type OrientationEchangeRecommendation = {
  kind: 'echange';
  href: string;
  justification: string;
};

export type OrientationRecommendationResult = {
  primary: OrientationFormationRecommendation | OrientationEchangeRecommendation;
  complement?: OrientationFormationRecommendation | OrientationParcoursRecommendation;
  effectifNote?: string;
};

export const ORIENTATION_METIER_OPTIONS: readonly {
  id: OrientationMetier;
  label: string;
}[] = [
  { id: 'dirigeant', label: 'Dirigeant' },
  { id: 'charge-affaires', label: 'Chargé d’affaires / études de prix' },
  { id: 'conducteur-travaux', label: 'Conducteur de travaux' },
  { id: 'chef-chantier', label: 'Chef de chantier / chef d’équipe' },
  { id: 'assistant-gestion', label: 'Assistant de gestion / administratif' },
  { id: 'maitrise-oeuvre', label: 'Maîtrise d’œuvre' },
  { id: 'autre', label: 'Autre métier du BTP' },
] as const;

export const ORIENTATION_PRATIQUE_OPTIONS: readonly {
  id: OrientationPratiqueIa;
  label: string;
}[] = [
  { id: 'debute', label: 'Je débute' },
  { id: 'utilise-deja', label: 'J’utilise déjà ChatGPT ou Claude' },
  {
    id: 'avance',
    label: 'Je souhaite structurer des usages avancés et créer des outils',
  },
] as const;

export const ORIENTATION_BESOIN_OPTIONS: readonly {
  id: OrientationBesoin;
  label: string;
}[] = [
  { id: 'devis-relances', label: 'Préparer des devis et organiser les relances' },
  { id: 'dce-ao', label: 'Analyser un DCE et préparer une réponse à un appel d’offres' },
  { id: 'cr-suivi', label: 'Produire des comptes rendus et suivre les actions' },
  { id: 'admin', label: 'Organiser les documents et les tâches administratives' },
  { id: 'assistants-apps', label: 'Créer des assistants ou des applications métier' },
  { id: 'encadrer-ia', label: 'Encadrer les usages de l’IA dans mon entreprise' },
] as const;

export const ORIENTATION_EFFECTIF_OPTIONS: readonly {
  id: OrientationEffectif;
  label: string;
}[] = [
  { id: 'moi', label: 'Moi-même' },
  { id: 'equipe-2-5', label: 'Une équipe de 2 à 5 personnes' },
  { id: 'equipe-6-plus', label: 'Une équipe de 6 personnes ou plus' },
  { id: 'a-preciser', label: 'Effectif à préciser' },
] as const;

const METIER_PARCOURS: Partial<Record<OrientationMetier, ParcoursId>> = {
  dirigeant: 'dirigeant-pme-btp',
  'charge-affaires': 'charge-affaires-btp',
  'conducteur-travaux': 'conducteur-de-travaux',
  'chef-chantier': 'chef-de-chantier',
  'assistant-gestion': 'assistant-de-gestion-btp',
};

/** Formation cible « idéale » selon le besoin (avant ajustement pratique). */
function besoinToFormationCode(
  besoin: OrientationBesoin,
  pratique: OrientationPratiqueIa,
): string {
  switch (besoin) {
    case 'devis-relances':
      return 'NIV-01';
    case 'dce-ao':
      return 'NIV-02';
    case 'cr-suivi':
      return 'NIV-03';
    case 'admin':
      return pratique === 'avance' ? 'NIV-04' : 'NIV-01';
    case 'assistants-apps':
      if (pratique === 'debute') return 'NIV-01';
      if (pratique === 'utilise-deja') return 'NIV-04';
      return 'NIV-10';
    case 'encadrer-ia':
      return pratique === 'debute' ? 'NIV-01' : 'NIV-04';
    default:
      return 'NIV-01';
  }
}

function formationNiveauPedagogique(code: string): FormationNiveau | null {
  return getFormationByCode(code)?.niveau ?? null;
}

function isFormationRecommendable(code: string, at: Date): boolean {
  if (isFormationCatalogueRetired(code)) return false;
  if (!isFormationCataloguePublished(code, at)) return false;
  return Boolean(getFormationByCode(code));
}

function toFormationRec(
  code: string,
  justification: string,
  prerequisAlert?: string,
): OrientationFormationRecommendation {
  const f = getFormationByCode(code)!;
  const niveau = f.niveau;
  const def = getFormationNiveauIaDefinition(niveau);
  return {
    kind: 'formation',
    code,
    titre: f.titre,
    href: formationHref(f),
    niveauLabel: formationNiveauLabelCourt(niveau),
    duree: f.duree,
    prerequis: def.prerequis,
    justification,
    prerequisAlert,
  };
}

function adjustForPratique(
  targetCode: string,
  pratique: OrientationPratiqueIa,
  besoin: OrientationBesoin,
): { primaryCode: string; complementCode?: string; alert?: string } {
  const targetNiveau = formationNiveauPedagogique(targetCode);
  if (!targetNiveau) return { primaryCode: 'NIV-01' };

  if (pratique === 'debute' && targetNiveau >= 2) {
    if (besoin === 'dce-ao' || besoin === 'cr-suivi' || besoin === 'assistants-apps') {
      return {
        primaryCode: 'NIV-01',
        complementCode: targetCode,
        alert:
          'Pour aborder sereinement cette thématique, nous vous orientons d’abord vers les bases (4 h), puis vers le programme métier indiqué en complément.',
      };
    }
    return {
      primaryCode: 'NIV-01',
      complementCode: targetCode !== 'NIV-01' ? targetCode : undefined,
      alert:
        targetCode !== 'NIV-01'
          ? 'Programme de niveau intermédiaire ou avancé : prévoir les bases IA (niveau 1) ou une pratique régulière de ChatGPT ou Claude au préalable.'
          : undefined,
    };
  }

  if (pratique === 'avance' && targetNiveau === 1 && besoin !== 'devis-relances') {
    const bump =
      besoin === 'dce-ao'
        ? 'NIV-02'
        : besoin === 'cr-suivi'
          ? 'NIV-03'
          : besoin === 'assistants-apps'
            ? 'NIV-10'
            : besoin === 'encadrer-ia'
              ? 'NIV-04'
              : 'NIV-04';
    return { primaryCode: bump };
  }

  return { primaryCode: targetCode };
}

function metierJustification(metier: OrientationMetier | undefined): string {
  switch (metier) {
    case 'dirigeant':
      return 'Adapté à un dirigeant qui doit prioriser les usages IA et cadrer le déploiement.';
    case 'charge-affaires':
      return 'Aligné avec les missions chiffrage, dossiers de consultation et suivi d’affaires.';
    case 'conducteur-travaux':
    case 'chef-chantier':
      return 'Centré sur la conduite de travaux, les comptes rendus et le suivi documentaire de chantier.';
    case 'assistant-gestion':
      return 'Utile pour l’administratif, les courriers et l’organisation des pièces.';
    case 'maitrise-oeuvre':
      return 'Proche des missions MOE/MOEX : dossiers, CR, courriers et suivi de réception.';
    default:
      return 'Correspond à votre besoin prioritaire et au catalogue présentiel Île-de-France.';
  }
}

function buildParcoursComplement(
  metier: OrientationMetier | undefined,
  besoin: OrientationBesoin,
): OrientationParcoursRecommendation | undefined {
  if (besoin === 'encadrer-ia' && metier === 'dirigeant') {
    return {
      kind: 'parcours',
      parcoursId: 'dirigeant-pme-btp',
      titre: 'Parcours Dirigeant de PME BTP',
      href: parcoursHref('dirigeant-pme-btp'),
      justification:
        'Progression métier incluant règles d’usage IA et plan de déploiement — complément au programme recommandé.',
    };
  }

  const parcoursId = metier ? METIER_PARCOURS[metier] : undefined;
  if (!parcoursId) {
    if (metier === 'maitrise-oeuvre') return undefined;
    return undefined;
  }

  return {
    kind: 'parcours',
    parcoursId,
    titre: `Parcours métier — ${ORIENTATION_METIER_OPTIONS.find((m) => m.id === metier)?.label ?? ''}`.trim(),
    href: parcoursHref(parcoursId),
    justification:
      'Parcours progressif du catalogue 2027 — modules détaillés sur la page parcours.',
  };
}

export function computeOrientationRecommendation(
  answers: OrientationAnswers,
  at: Date = new Date(),
): OrientationRecommendationResult | null {
  const { metier, pratique, besoin, effectif } = answers;
  if (!metier || !pratique || !besoin || !effectif) return null;

  const targetCode = besoinToFormationCode(besoin, pratique);
  const adjusted = adjustForPratique(targetCode, pratique, besoin);

  let primaryCode = adjusted.primaryCode;
  if (!isFormationRecommendable(primaryCode, at)) {
    primaryCode = 'NIV-01';
  }
  if (!isFormationRecommendable(primaryCode, at)) {
    return {
      primary: {
        kind: 'echange',
        href: `${LINKS.prendreRdv}?src=orientation-formation`,
        justification:
          'Aucune session catalogue ne correspond exactement à votre profil pour le moment — un échange de cadrage permet de préciser niveau, effectif et programme.',
      },
    };
  }

  const justification = `${metierJustification(metier)} Votre besoin : « ${ORIENTATION_BESOIN_OPTIONS.find((b) => b.id === besoin)?.label} ».`;

  const primary = toFormationRec(primaryCode, justification, adjusted.alert);

  let complement: OrientationRecommendationResult['complement'];

  const complementCode = adjusted.complementCode;
  if (complementCode && isFormationRecommendable(complementCode, at)) {
    complement = toFormationRec(
      complementCode,
      'Programme complémentaire une fois les bases ou prérequis couverts.',
    );
  } else {
    const parcours = buildParcoursComplement(metier, besoin);
    if (parcours) complement = parcours;
  }

  if (
    metier === 'maitrise-oeuvre' &&
    isFormationRecommendable('NIV-05', at) &&
    (besoin === 'dce-ao' || besoin === 'cr-suivi') &&
    primaryCode !== 'NIV-05'
  ) {
    complement = toFormationRec(
      'NIV-05',
      'Spécialisation maîtrise d’œuvre — analyse DCE, CR et actes MOE.',
    );
  }

  let effectifNote: string | undefined;
  if (effectif === 'equipe-6-plus' || effectif === 'equipe-2-5') {
    effectifNote =
      effectif === 'equipe-6-plus'
        ? 'Pour six personnes ou plus, une session intra-entreprise en présentiel Île-de-France est souvent plus adaptée — à cadrer lors de l’échange.'
        : 'Pour une petite équipe, le format intra ou inter selon vos calendriers peut être envisagé lors de l’échange.';
  }

  return { primary, complement, effectifNote };
}

/** Libellé public d’une formation (tests / affichage). */
export function getOrientationFormationPublic(f: Formation): Pick<
  OrientationFormationRecommendation,
  'titre' | 'href' | 'niveauLabel' | 'duree' | 'prerequis'
> {
  const def = getFormationNiveauIaDefinition(f.niveau);
  return {
    titre: f.titre,
    href: formationHref(f),
    niveauLabel: formationNiveauLabelCourt(f.niveau),
    duree: f.duree,
    prerequis: def.prerequis,
  };
}
