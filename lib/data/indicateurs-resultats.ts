/**
 * Indicateurs de résultats Qualiopi (indicateur 2) — source unique du site public.
 *
 * Règles :
 * - Ne publier que des valeurs consolidées et sourcées.
 * - Ne jamais inventer un taux, un effectif ou une période.
 * - Les indicateurs non consolidés restent `null` / `not_published` (pas de placeholder).
 *
 * Les fichiers sources bruts (questionnaires, émargements) ne sont pas versionnés
 * dans ce dépôt. La consolidation est saisie ici après contrôle manuel OFC.
 */

export type IndicateurNonPublie = {
  readonly status: 'not_published';
  /** Motif transparent pour la page publique et le rapport d’audit. */
  readonly motif: string;
};

export type IndicateurPublieNombre = {
  readonly status: 'published';
  readonly value: number;
};

/** Libellé d’affichage quand une donnée n’est pas consolidée. */
export const INDICATEUR_NON_PUBLIE_LIBELLE =
  'Donnée non publiée pour cette période' as const;

/**
 * Source centrale — valeurs publiques.
 * Toute modification doit rester alignée avec AggregateRating (`lib/schema-aggregate-rating.ts`)
 * et `PREUVES` (`lib/constants.ts`).
 */
export const indicateursResultats = {
  /** Début de période (ISO). */
  periodStart: '2025-07-01',
  /** Fin de période (ISO). */
  periodEnd: '2026-06-30',
  /** Date de dernière consolidation (ISO). */
  lastCalculatedAt: '2026-08-23',
  /** Libellé humain de la période (affichage FR). */
  periodeReference: 'juillet 2025 – juin 2026',
  /** Alias historique — même valeur que `lastCalculatedAt`. */
  dateMiseAJour: '2026-08-23',

  scopeLabel:
    'Les indicateurs présentés concernent les actions de formation réalisées directement par OFC Création d’Entreprise sur la période indiquée.',
  scopeExclusions: [
    'Interventions de Laure Olivié réalisées en sous-traitance pour un autre organisme (ex. donneur d’ordre externe), sauf mention contraire et données comparables.',
    'Cours ou contenus en ligne gérés par une plateforme tierce.',
    'Événements gratuits, démonstrations ou conférences hors convention de formation.',
    'Réponses de test ou internes.',
  ] as const,

  sourceLabel:
    'Questionnaires de satisfaction à chaud renseignés par les participants en fin de session, consolidés manuellement par OFC.',
  methodologyVersion: '2026.08',

  /** Note moyenne (échelle 1–5). */
  noteSatisfaction: 4.45,
  /** Nombre de questionnaires valides consolidés. */
  nombreRepondants: 20,
  satisfactionScaleMax: 5 as const,
  satisfactionScaleMin: 1 as const,
  satisfactionQuestion:
    'Note globale de satisfaction à chaud (questionnaire en fin de session), échelle de 1 à 5.',
  satisfactionFormule:
    'Somme des notes globales valides ÷ nombre de notes globales valides.',

  /**
   * Volume cumulé — conservé pour d’autres surfaces historiques du site.
   * Non publié sur `/indicateurs-resultats` : périmètre (personnes uniques vs participations,
   * OFC direct vs sous-traitance) non documenté de façon vérifiable dans ce dépôt.
   */
  volumeProsFormesBtp: 1592,
  volumePublieSurPageIndicateurs: false as const,

  /** Indicateurs non consolidés — absents du rendu public (pas de 0 % / 100 % fictifs). */
  nonPublies: {
    tauxReponse: {
      status: 'not_published',
      motif:
        'Dénominateur (participants sollicités sur la période) non consolidé dans la source versionnée.',
    },
    participantsAccueillis: {
      status: 'not_published',
      motif:
        'Effectif formé / participations : non publié tant que le registre sessions (OFC direct, dédoublonnage) n’est pas consolidé.',
    },
    heuresStagiaires: {
      status: 'not_published',
      motif: 'Heures de présence effectives non consolidées dans la source versionnée.',
    },
    tauxAssiduite: {
      status: 'not_published',
      motif: 'Heures prévues et heures effectives non consolidées.',
    },
    tauxRealisation: {
      status: 'not_published',
      motif: 'Sessions planifiées / réalisées non consolidées (numérateur et dénominateur absents).',
    },
    tauxAbandon: {
      status: 'not_published',
      motif:
        'Définition d’abandon et dénombrement des entrants non consolidés ; ne pas afficher 0 % par défaut.',
    },
  } satisfies Record<string, IndicateurNonPublie>,

  limitations: [
    'Les questionnaires individuels et le registre des sessions ne sont pas versionnés dans le dépôt public.',
    'La note moyenne est une consolidation manuelle OFC ; le calcul n’est pas rejoué automatiquement depuis une base brute ici.',
    'Le taux de réponse, l’assiduité, la réalisation, l’abandon et les heures-stagiaires ne sont pas publiés faute de numérateurs / dénominateurs vérifiables.',
    'Le volume cumulé de professionnels formés n’est pas affiché sur cette page (périmètre ambigu).',
  ] as const,

  /**
   * Actions d’amélioration documentées pour publication.
   * Laisser vide plutôt qu’inventer des exemples.
   */
  improvementActions: [] as readonly {
    constat: string;
    action: string;
    etat: 'prevue' | 'en_cours' | 'realisee';
    periodeSuivi: string;
  }[],
} as const;

export type IndicateursResultats = typeof indicateursResultats;

/** Contrôles arithmétiques / cohérence — à appeler au build et côté page. */
export function assertIndicateursResultatsCoherents(
  data: IndicateursResultats = indicateursResultats,
): void {
  const {
    noteSatisfaction,
    nombreRepondants,
    satisfactionScaleMin,
    satisfactionScaleMax,
    periodStart,
    periodEnd,
    lastCalculatedAt,
  } = data;

  if (!Number.isFinite(noteSatisfaction)) {
    throw new Error('indicateursResultats.noteSatisfaction doit être un nombre fini.');
  }
  if (noteSatisfaction < satisfactionScaleMin || noteSatisfaction > satisfactionScaleMax) {
    throw new Error(
      `indicateursResultats.noteSatisfaction hors échelle (${satisfactionScaleMin}–${satisfactionScaleMax}).`,
    );
  }
  if (!Number.isInteger(nombreRepondants) || nombreRepondants < 1) {
    throw new Error('indicateursResultats.nombreRepondants doit être un entier ≥ 1.');
  }
  if (periodStart > periodEnd) {
    throw new Error('indicateursResultats : periodStart doit être ≤ periodEnd.');
  }
  if (lastCalculatedAt < periodEnd) {
    throw new Error(
      'indicateursResultats : lastCalculatedAt doit être ≥ periodEnd (consolidation après la période).',
    );
  }

  const serialized = JSON.stringify(data);
  const forbidden = ['__X', '__JJ', 'XXX__', 'NaN', 'undefined', 'null %'] as const;
  for (const token of forbidden) {
    if (serialized.includes(token)) {
      throw new Error(`indicateursResultats contient un placeholder interdit : ${token}`);
    }
  }
}

assertIndicateursResultatsCoherents();

/** Volume cumulé formé — affichage FR avec espace milliers (ex. « 1 592 »). */
export function formatVolumeProsFormesBtp(): string {
  return indicateursResultats.volumeProsFormesBtp.toLocaleString('fr-FR');
}

/** Libellé complet volume formé (ex. « 1 592 professionnels du BTP formés »). */
export function formatVolumeProsFormesBtpLibelle(): string {
  return `${formatVolumeProsFormesBtp()} professionnels du BTP formés`;
}

/** Note sur 5 avec virgule décimale (ex. « 4,45/5 »). */
export function formatNoteSatisfactionSur5(): string {
  const note = indicateursResultats.noteSatisfaction.toFixed(2).replace('.', ',');
  return `${note}/5`;
}

/** Note complète pour preuves sociales (ex. « 4,45/5 — 20 répondants »). */
export function formatNoteSatisfactionAffichageComplet(): string {
  return `${formatNoteSatisfactionSur5()} — ${indicateursResultats.nombreRepondants} répondants`;
}

/** Période de référence telle qu'affichée sur la page indicateurs. */
export function formatPeriodeReferenceAffichage(): string {
  return indicateursResultats.periodeReference;
}

/** Date de dernière mise à jour (JJ/MM/AAAA). */
export function formatDateMiseAJourIndicateurs(
  isoDate: string = indicateursResultats.dateMiseAJour,
): string {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

/** Libellé principal — indicateur satisfaction à chaud. */
export function formatIndicateurSatisfactionLibelle(): string {
  return `Note moyenne issue des questionnaires de satisfaction à chaud : ${formatNoteSatisfactionSur5()}`;
}

/** Sous-texte descriptif sous l'indicateur satisfaction. */
export function formatIndicateurSatisfactionSousTexte(): string {
  return `Moyenne arithmétique des notes globales sur ${indicateursResultats.satisfactionScaleMax} — ${indicateursResultats.nombreRepondants} répondants, période ${formatPeriodeReferenceAffichage()}. Dernière consolidation : ${formatDateMiseAJourIndicateurs()}.`;
}

/** Paragraphe « Méthode de calcul » — satisfaction uniquement. */
export function getMethodeCalculSatisfactionParagraph(): string {
  return `Satisfaction (évaluation à chaud) : ${indicateursResultats.satisfactionFormule} Notes sur ${indicateursResultats.satisfactionScaleMax}, période ${formatPeriodeReferenceAffichage()} (${indicateursResultats.nombreRepondants} répondants). Source : ${indicateursResultats.sourceLabel}`;
}

/**
 * @deprecated Préférer `indicateursResultats.nonPublies` + `INDICATEUR_NON_PUBLIE_LIBELLE`.
 * Conservé pour imports éventuels.
 */
export const INDICATEURS_REALISATION_ASSIDUITE_A_VENIR =
  "Les indicateurs de réalisation et d'assiduité ne sont pas publiés pour cette période (données non consolidées)." as const;
