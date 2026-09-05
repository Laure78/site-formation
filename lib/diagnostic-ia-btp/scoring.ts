/**
 * Moteur de scoring et recommandations — diagnostic IA BTP
 */
import {
  CONSTRUCTYS_FINANCEMENT_NOTE,
  DATA_USAGE_OPTIONS,
  FREQUENCY_OPTIONS,
  GAIN_PRUDENCE_COEFFICIENT,
  GLOBAL_PRIORITY_THRESHOLDS,
  MATURITY_OPTIONS,
  ORGANISATION_OPTIONS,
  PRIORITY_CLUSTERS,
  SECURITY_RECOMMENDATION_TEXT,
  TASK_POTENTIAL,
  TIME_GAIN_DISCLAIMER,
  TIME_WEEKLY_OPTIONS,
  TRAINING_MAPPINGS,
  type TrainingMappingKey,
  getTaskLabel,
} from '@/lib/diagnostic-ia-btp/config';
import type {
  DiagnosticAnswers,
  DiagnosticPriority,
  DiagnosticResult,
  DiagnosticTaskId,
  GlobalPriorityLevel,
  PriorityPotentialLabel,
  ScoreLevel,
} from '@/lib/diagnostic-ia-btp/types';

function scoreLevel(score: number): ScoreLevel {
  if (score >= 75) return 'avance';
  if (score >= 50) return 'intermediaire';
  return 'debutant';
}

function securityLabel(score: number): string {
  if (score >= 70) return 'Bien encadré';
  if (score >= 45) return 'À structurer';
  return 'Prioritaire';
}

function globalPriorityLabel(level: GlobalPriorityLevel): string {
  const map: Record<GlobalPriorityLevel, string> = {
    faible: 'FAIBLE',
    moderee: 'MODÉRÉE',
    elevee: 'ÉLEVÉE',
    tres_elevee: 'TRÈS ÉLEVÉE',
  };
  return map[level];
}

function potentialLabel(score: number): PriorityPotentialLabel {
  if (score >= 0.65) return 'tres_eleve';
  if (score >= 0.5) return 'eleve';
  return 'moyen';
}

function avgTaskPotential(tasks: DiagnosticTaskId[]): number {
  if (!tasks.length) return 0.35;
  const sum = tasks.reduce((acc, id) => acc + (TASK_POTENTIAL[id] ?? 0.4), 0);
  return sum / tasks.length;
}

function computeGainPotentialScore(
  answers: DiagnosticAnswers,
  avgPotential: number,
): number {
  const time = TIME_WEEKLY_OPTIONS.find((o) => o.id === answers.timeWeekly);
  const freq = FREQUENCY_OPTIONS.find((o) => o.id === answers.frequency);
  const timeFactor = time ? Math.min(time.hours / 25, 1) : 0.3;
  const freqFactor = freq?.multiplier ?? 1;
  const taskCountFactor = Math.min((answers.tasks?.length ?? 1) / 3, 1);
  const raw = (avgPotential * 0.45 + timeFactor * 0.35 + taskCountFactor * 0.2) * freqFactor * 100;
  return Math.round(Math.min(100, Math.max(5, raw)));
}

function computeAutomationScore(maturity: number, organisation: number): number {
  const gap = Math.max(0, organisation - maturity);
  const readiness = maturity * 0.55 + organisation * 0.45;
  const upside = gap > 30 ? Math.min(gap * 0.4, 25) : 0;
  return Math.round(Math.min(100, readiness + upside));
}

function computeGlobalPriority(gainPotential: number, maturity: number, timeHours: number): GlobalPriorityLevel {
  const lowMaturityBoost = maturity < 45 ? 1.08 : 1;
  const timeBoost = timeHours >= 10 ? 1.05 : 1;
  const composite = gainPotential * lowMaturityBoost * timeBoost;

  if (composite >= GLOBAL_PRIORITY_THRESHOLDS.tres_elevee) return 'tres_elevee';
  if (composite >= GLOBAL_PRIORITY_THRESHOLDS.elevee) return 'elevee';
  if (composite >= GLOBAL_PRIORITY_THRESHOLDS.moderee) return 'moderee';
  return 'faible';
}

function buildPriorityWhy(clusterId: string, tasks: DiagnosticTaskId[], timeHours: number): string {
  const labels = tasks.slice(0, 3).map(getTaskLabel).join(', ');
  if (clusterId === 'dce') {
    return `Vous consacrez du temps à ${labels.toLowerCase()} — l'IA peut accélérer la lecture, la comparaison et la synthèse des pièces du dossier.`;
  }
  if (clusterId === 'cr_chantier') {
    return `Vous passez plusieurs heures par semaine sur ${labels.toLowerCase()} — des modèles et assistants IA réduisent le temps de rédaction tout en gardant la validation métier.`;
  }
  if (clusterId === 'courriers_relances') {
    return `Les ${labels.toLowerCase()} reviennent souvent dans votre semaine — l'IA aide à structurer, personnaliser et relancer plus vite.`;
  }
  if (timeHours >= 10) {
    return `Avec ${timeHours} h/semaine déclarées sur ces tâches, le levier IA est significatif sur ${labels.toLowerCase()}.`;
  }
  return `Vos réponses mettent en avant ${labels.toLowerCase()} — un bon point de départ pour des usages IA concrets et mesurables.`;
}

function computePriorities(answers: DiagnosticAnswers): DiagnosticPriority[] {
  const selected = answers.tasks ?? [];
  if (!selected.length) return [];

  const freq = FREQUENCY_OPTIONS.find((o) => o.id === answers.frequency);
  const time = TIME_WEEKLY_OPTIONS.find((o) => o.id === answers.timeWeekly);
  const freqMul = freq?.multiplier ?? 1;
  const timeHours = time?.hours ?? 3.5;

  const scored = PRIORITY_CLUSTERS.map((cluster) => {
    const matches = selected.filter((t) => cluster.taskIds.includes(t));
    const matchCount = matches.length;
    if (!matchCount) return null;

    const clusterPotential =
      matches.reduce((s, t) => s + (TASK_POTENTIAL[t] ?? 0.4), 0) / matchCount;

    const score = matchCount * cluster.baseWeight * clusterPotential * freqMul * (1 + timeHours / 50);

    return { cluster, matches, score, clusterPotential };
  }).filter(Boolean) as {
    cluster: (typeof PRIORITY_CLUSTERS)[number];
    matches: DiagnosticTaskId[];
    score: number;
    clusterPotential: number;
  }[];

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map((item, index) => ({
    rank: index + 1,
    title: item.cluster.title,
    subtitle: item.cluster.subtitle,
    potential: potentialLabel(item.clusterPotential),
    why: buildPriorityWhy(item.cluster.id, item.matches, timeHours),
    taskIds: item.matches,
  }));
}

function countThemeTasks(tasks: DiagnosticTaskId[], themePrefix: string): number {
  return tasks.filter((t) => t.startsWith(themePrefix)).length;
}

function recommendTraining(answers: DiagnosticAnswers, priorities: DiagnosticPriority[]): TrainingMappingKey {
  const maturity = Number(answers.maturity ?? '0');
  const tasks = answers.tasks ?? [];
  const role = answers.role;

  if (maturity >= 7) return 'app_metier_3';
  if (maturity >= 6) return 'app_metier_2';
  if (maturity >= 5 && answers.organisation !== 'papier') return 'claude_avance';

  const aoCount = countThemeTasks(tasks, 'ao_');
  const chantierCount = countThemeTasks(tasks, 'chantier_');
  const devisCount = countThemeTasks(tasks, 'devis_');

  if (role === 'moe_moex_opc') return 'maitrise_oeuvre';

  if (
    role === 'conducteur_travaux' ||
    role === 'chef_chantier' ||
    role === 'assistant_travaux' ||
    chantierCount >= 2
  ) {
    return 'conduite_travaux';
  }

  if (role === 'etudes_prix' || role === 'charge_affaires') return 'appels_offres';
  if (priorities[0]?.title.includes('DCE') || aoCount >= 2) return 'appels_offres';

  if (maturity <= 2 && (devisCount >= 1 || role === 'dirigeant' || role === 'artisan_tpe')) {
    return 'fondamentaux';
  }

  if (aoCount > chantierCount) return 'appels_offres';
  if (chantierCount > 0) return 'conduite_travaux';

  return 'fondamentaux';
}

function buildTrainingWhy(
  key: TrainingMappingKey,
  answers: DiagnosticAnswers,
  priorities: DiagnosticPriority[],
): string {
  const taskLabels = (answers.tasks ?? []).slice(0, 3).map(getTaskLabel).join(', ');
  const priorityTitles = priorities.slice(0, 2).map((p) => p.title.toLowerCase()).join(' et ');

  if (key === 'appels_offres') {
    return `Vos réponses montrent que vos principaux irritants concernent ${priorityTitles || "les appels d'offres"} (${taskLabels}). Ce parcours est le plus directement applicable à votre activité sur DCE, chiffrage et mémoire technique.`;
  }
  if (key === 'conduite_travaux') {
    return `Vos priorités portent sur le chantier — CCTP, comptes rendus, documents de suivi (${taskLabels}). Ce parcours cible ces usages avec validation métier obligatoire.`;
  }
  if (key === 'maitrise_oeuvre') {
    return `Votre profil MOE/MOEX oriente vers l'analyse documentaire, les CR, OS et le suivi de réception — au cœur de cette formation.`;
  }
  if (key === 'claude_avance') {
    return `Votre maturité IA et votre organisation numérique permettent d'industrialiser Claude (Projects, Cowork, Skills) sur vos processus BTP.`;
  }
  if (key.startsWith('app_metier')) {
    return `Vous visez des applications métier sur mesure — ce parcours accompagne la conception et le déploiement d'outils adaptés à vos processus BTP.`;
  }
  return `Vous débutez ou structurez vos premiers usages IA sur devis, emails et documents BTP (${taskLabels}). Ce parcours pose les fondamentaux avant d'aller plus loin.`;
}

export function isDiagnosticComplete(answers: DiagnosticAnswers): boolean {
  return Boolean(
    answers.role &&
      answers.tasks?.length &&
      answers.timeWeekly &&
      answers.frequency &&
      answers.maturity !== undefined &&
      answers.organisation &&
      answers.dataUsage,
  );
}

export function computeDiagnosticResult(answers: DiagnosticAnswers): DiagnosticResult | null {
  if (!isDiagnosticComplete(answers)) return null;

  const maturityOpt = MATURITY_OPTIONS.find((o) => o.id === answers.maturity);
  const orgOpt = ORGANISATION_OPTIONS.find((o) => o.id === answers.organisation);
  const dataOpt = DATA_USAGE_OPTIONS.find((o) => o.id === answers.dataUsage);
  const timeOpt = TIME_WEEKLY_OPTIONS.find((o) => o.id === answers.timeWeekly);

  const maturity = maturityOpt?.score ?? 5;
  const organisation = orgOpt?.score ?? 25;
  const security = dataOpt?.securityScore ?? 85;
  const tasks = answers.tasks ?? [];
  const avgPotential = avgTaskPotential(tasks);
  const gainPotential = computeGainPotentialScore(answers, avgPotential);
  const automation = computeAutomationScore(maturity, organisation);
  const timeHours = timeOpt?.hours ?? 3.5;

  const globalPriority = computeGlobalPriority(gainPotential, maturity, timeHours);
  const priorities = computePriorities(answers);

  const rawWeeklyGain = timeHours * avgPotential * GAIN_PRUDENCE_COEFFICIENT;
  const weeklyMin = Math.max(0.5, Math.floor(rawWeeklyGain * 0.75 * 2) / 2);
  const weeklyMax = Math.max(weeklyMin + 0.5, Math.ceil(rawWeeklyGain * 1.25 * 2) / 2);
  const annualMin = Math.round(weeklyMin * 50);
  const annualMax = Math.round(weeklyMax * 50);

  const trainingKey = recommendTraining(answers, priorities);
  const trainingBase = TRAINING_MAPPINGS[trainingKey];

  const constructysNote =
    answers.constructys === 'oui' || answers.constructys === 'inconnu'
      ? CONSTRUCTYS_FINANCEMENT_NOTE
      : null;

  return {
    scores: {
      maturity,
      maturityLabel: scoreLevel(maturity),
      gainPotential,
      organisation,
      organisationLabel: scoreLevel(organisation),
      automation,
      security,
      securityLabel: securityLabel(security),
      globalPriority,
      globalPriorityLabel: globalPriorityLabel(globalPriority),
    },
    priorities,
    timeGain: {
      weeklyMin,
      weeklyMax,
      annualMin,
      annualMax,
      disclaimer: TIME_GAIN_DISCLAIMER,
    },
    securityRecommendation: dataOpt?.needsSecurityAdvice ? SECURITY_RECOMMENDATION_TEXT : null,
    constructysNote,
    training: {
      href: trainingBase.href,
      title: trainingBase.title,
      code: trainingBase.code,
      why: buildTrainingWhy(trainingKey, answers, priorities),
    },
  };
}

export function maturityDisplayLabel(level: ScoreLevel): string {
  const map: Record<ScoreLevel, string> = {
    debutant: 'Débutant',
    intermediaire: 'Intermédiaire',
    avance: 'Avancé',
    expert: 'Expert',
  };
  return map[level];
}

export function potentialDisplay(label: PriorityPotentialLabel): string {
  const map: Record<PriorityPotentialLabel, string> = {
    tres_eleve: 'Très élevé',
    eleve: 'Élevé',
    moyen: 'Moyen',
  };
  return map[label];
}

export type DiagnosticTestProfile = {
  name: string;
  answers: DiagnosticAnswers;
  expectedTraining: TrainingMappingKey;
};

export const DIAGNOSTIC_TEST_PROFILES: DiagnosticTestProfile[] = [
  {
    name: 'CAS 1 — Conducteur débutant IA',
    answers: {
      role: 'conducteur_travaux',
      tasks: ['ao_cctp', 'chantier_cr', 'chantier_ppsps'],
      timeWeekly: '5_10h',
      frequency: 'plusieurs_semaine',
      maturity: '0',
      organisation: 'bureautique',
      dataUsage: 'interne',
      companySize: '11_49',
      constructys: 'oui',
    },
    expectedTraining: 'conduite_travaux',
  },
  {
    name: "CAS 2 — Chargé d'affaires AO",
    answers: {
      role: 'charge_affaires',
      tasks: ['ao_comparer_dce', 'ao_dpgf', 'ao_memoire_technique'],
      timeWeekly: '10_20h',
      frequency: 'tous_jours',
      maturity: '2',
      organisation: 'ged_cloud',
      dataUsage: 'dce_contractuel',
      companySize: '50_299',
      constructys: 'oui',
    },
    expectedTraining: 'appels_offres',
  },
  {
    name: 'CAS 3 — Dirigeant de TPE',
    answers: {
      role: 'artisan_tpe',
      tasks: ['devis_preparer', 'admin_emails', 'com_relance_devis'],
      timeWeekly: '2_5h',
      frequency: 'chaque_semaine',
      maturity: '1',
      organisation: 'emails_locaux',
      dataUsage: 'devis_clients',
      companySize: '1_10',
      constructys: 'inconnu',
    },
    expectedTraining: 'fondamentaux',
  },
  {
    name: 'CAS 4 — Entreprise avancée',
    answers: {
      role: 'referent_ia',
      tasks: ['admin_excel', 'gest_tableaux_bord', 'gest_consolidation'],
      timeWeekly: '5_10h',
      frequency: 'plusieurs_semaine',
      maturity: '6',
      organisation: 'erp_cloud_auto',
      dataUsage: 'interne',
      companySize: '11_49',
      constructys: 'non',
    },
    expectedTraining: 'app_metier_2',
  },
  {
    name: 'CAS 5 — MOEX',
    answers: {
      role: 'moe_moex_opc',
      tasks: ['chantier_cr', 'chantier_planning', 'chantier_reserves'],
      timeWeekly: '5_10h',
      frequency: 'plusieurs_semaine',
      maturity: '3',
      organisation: 'ged_cloud',
      dataUsage: 'dce_contractuel',
      companySize: '11_49',
      constructys: 'oui',
    },
    expectedTraining: 'maitrise_oeuvre',
  },
];

export function validateDiagnosticTestProfiles(): { ok: boolean; failures: string[] } {
  const failures: string[] = [];
  const results: DiagnosticResult[] = [];

  for (const profile of DIAGNOSTIC_TEST_PROFILES) {
    const result = computeDiagnosticResult(profile.answers);
    if (!result) {
      failures.push(`${profile.name}: résultat null`);
      continue;
    }
    results.push(result);

    const trainingKey = (Object.keys(TRAINING_MAPPINGS) as TrainingMappingKey[]).find(
      (k) => TRAINING_MAPPINGS[k].href === result.training.href,
    );
    if (trainingKey !== profile.expectedTraining) {
      failures.push(
        `${profile.name}: formation attendue ${profile.expectedTraining}, obtenue ${trainingKey ?? result.training.href}`,
      );
    }
  }

  for (let i = 0; i < results.length; i++) {
    for (let j = i + 1; j < results.length; j++) {
      const a = results[i]!;
      const b = results[j]!;
      const same =
        a.training.href === b.training.href &&
        a.scores.gainPotential === b.scores.gainPotential &&
        a.priorities.map((p) => p.title).join('|') === b.priorities.map((p) => p.title).join('|');
      if (same) {
        failures.push(`Profils ${i + 1} et ${j + 1} produisent un résultat identique`);
      }
    }
  }

  return { ok: failures.length === 0, failures };
}
