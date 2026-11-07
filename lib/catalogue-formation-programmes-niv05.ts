import type { ProgrammeFormationBloc } from '@/components/formations/catalogue/ProgrammeFormationBlocs';

/** Programme NIV-05 — maîtrise d’œuvre conception et exécution (fusion NIV-12), 4 h · 5 modules · 240 min. */
export const NIV05_PROGRAMME_BLOCS: readonly ProgrammeFormationBloc[] = [
  {
    heading: 'Module 1 — IA et maîtrise d’œuvre',
    meta: '30 min',
    objective: 'Comprendre comment intégrer l’IA dans les missions quotidiennes d’un maître d’œuvre.',
    objectifs: [
      'Applications de ChatGPT et Claude en maîtrise d’œuvre',
      'Organisation et analyse des documents techniques',
      'Confidentialité et protection des données',
      'Construction de prompts adaptés aux missions MOE',
      'Vérification humaine des résultats',
      'Exercice : créer un prompt réutilisable pour une mission de maîtrise d’œuvre',
    ],
    critereEvaluation:
      'Le participant produit un prompt MOE réutilisable et identifie les points de contrôle humain associés.',
    livrable: 'Prompt réutilisable pour une mission MOE',
  },
  {
    heading: 'Module 2 — CCTP et DPGF',
    meta: '55 min',
    objective: 'Accélérer la préparation et le contrôle des documents techniques de consultation.',
    objectifs: [
      'Structurer un CCTP à partir des informations d’un projet',
      'Préparer des descriptifs techniques par lot',
      'Assister la préparation des métrés et DPGF',
      'Identifier les incohérences entre documents',
      'Repérer les omissions et données manquantes',
      'Vérifier les quantités, unités et références',
      'Exercice : préparer un extrait de CCTP et une trame de DPGF à partir d’un dossier technique',
    ],
    controlesHumains:
      'l’IA assiste la préparation, mais ne remplace pas les métrés, contrôles et validations réalisés par les professionnels compétents',
    critereEvaluation:
      'Le participant livre un extrait de CCTP et une trame de DPGF avec incohérences signalées et contrôles listés.',
    livrable: 'Extrait de CCTP + trame de DPGF',
  },
  {
    heading: 'Module 3 — Analyse DCE et comparaison des offres',
    meta: '45 min',
    objective:
      'Analyser efficacement les dossiers de consultation et faciliter la comparaison des propositions des entreprises.',
    objectifs: [
      'Analyser CCTP, CCAP et autres pièces disponibles',
      'Identifier les exigences techniques et contractuelles',
      'Repérer les points de vigilance',
      'Comparer les offres reçues',
      'Structurer un tableau comparatif',
      'Préparer des demandes de clarification',
      'Exercice : produire une synthèse et un tableau comparatif à partir d’extraits de documents',
    ],
    controlesHumains:
      'conserver les références aux documents sources et vérifier les conclusions de l’IA',
    critereEvaluation:
      'Le participant produit une synthèse DCE et un tableau comparatif sourcé, avec demandes de clarification si besoin.',
    livrable: 'Synthèse DCE + tableau comparatif des offres',
  },
  {
    heading: 'Module 4 — Comptes rendus et plannings de chantier',
    meta: '50 min',
    objective:
      'Simplifier la rédaction des documents de suivi et le pilotage opérationnel des réunions de chantier.',
    objectifs: [
      'Générer un compte rendu à partir de notes ou d’une dictée',
      'Organiser les observations par corps d’état',
      'Identifier les décisions et actions à réaliser',
      'Attribuer responsables et échéances',
      'Préparer un planning court de chantier',
      'Rédiger des relances et courriers de suivi',
      'Exercice : transformer des notes de réunion en compte rendu structuré avec tableau des actions',
    ],
    critereEvaluation:
      'Le participant produit un CR structuré avec tableau d’actions et ébauche de planning court.',
    livrable: 'Compte rendu de chantier + tableau des actions',
  },
  {
    heading: 'Module 5 — Ordres de service, réserves et réception',
    meta: '60 min',
    objective: 'Utiliser l’IA pour préparer les documents de suivi contractuel et de réception.',
    objectifs: [
      'Préparer un projet d’ordre de service à partir d’un modèle',
      'Rédiger les courriers de chantier',
      'Structurer les observations et listes de réserves',
      'Créer un tableau de suivi des levées de réserves',
      'Préparer les documents de réception',
      'Organiser le suivi de la garantie de parfait achèvement',
      'Exercice : préparer une liste de réserves et son tableau de suivi',
    ],
    controlesHumains:
      'les ordres de service et documents de réception doivent respecter les responsabilités, les habilitations et les stipulations contractuelles applicables',
    critereEvaluation:
      'Le participant livre une liste de réserves, un tableau de suivi et un brouillon d’OS ou courrier relu.',
    livrable: 'Liste de réserves + tableau de suivi des levées',
  },
];
