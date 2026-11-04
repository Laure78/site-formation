import type { ProgrammeFormationBloc } from '@/components/formations/catalogue/ProgrammeFormationBlocs';

/** Programme NIV-11 — source programme_OFC_NIV-11_IA_AMO_20261104.pdf */
export const NIV11_PROGRAMME_BLOCS: readonly ProgrammeFormationBloc[] = [
  {
    heading: 'MODULE 1 — Confidentialité des données, risques de l’IA et charte de bonnes pratiques',
    meta: '45 min',
    objectifs: [
      'Les risques de l’IA générative',
      'Hallucinations, références inventées, erreurs de calcul et de lecture de tableaux',
      'Responsabilité : l’IA ne valide ni une offre, ni une conformité, ni une décision du maître d’ouvrage',
      'Confidentialité des données d’opération',
      'Offres des candidats, prix, données du maître d’ouvrage : secret des affaires et confidentialité des consultations',
      'Données personnelles (RGPD) : anonymiser avant de confier un document',
      'Cadre réglementaire et charte',
      'AI Act : obligation de maîtrise de l’IA (art. 4 du règlement UE 2024/1689)',
      'Charte IA : usages autorisés, données interdites, vérification, traçabilité',
    ],
    livrable:
      'Modèle de charte de bonnes pratiques IA + check-list « avant d’envoyer un document à l’IA »',
  },
  {
    heading: 'MODULE 2 — ChatGPT ou Claude : choisir et prendre en main son outil',
    meta: '30 min',
    objectifs: [
      'Choisir son outil',
      'Forces de chacun pour l’AMO : documents longs, rigueur d’analyse, rédaction, recherche',
      'Fonctionnalités utiles à l’AMO',
      'Projets, GPTs personnalisés, Skills, connecteurs Microsoft 365 (Outlook, SharePoint / OneDrive, Teams)',
      'Bien formuler ses demandes',
      'Méthode CRAFT : Contexte – Rôle – Action – Format – Ton ; exiger les sources (pièce, article, page)',
      'Assistant ou Skill : quelle différence ?',
    ],
    livrable: 'Mémo comparatif « ChatGPT ou Claude pour l’AMO » + modèle de prompt CRAFT',
  },
  {
    heading: 'MODULE 3 — Analyse des consultations : MOE, entreprises, contrôleur technique, CSPS',
    meta: '1 h 25',
    objectifs: [
      'Préparer la consultation',
      'Relecture croisée programme / RC / CCTP / CCAP / DPGF : incohérences et manques',
      'Cohérence des missions demandées (MOE, contrôle technique, coordination SPS)',
      'Analyser les offres',
      'Grille d’analyse à partir des critères et sous-critères du règlement de consultation',
      'Synthèse comparative des mémoires techniques ; analyse des offres de prix et offres anormalement basses',
      'Rédiger et contrôler',
      'Pré-rédaction du rapport d’analyse des offres, notes justifiées et sourcées',
      'Test croisé ChatGPT / Claude sur la même offre',
    ],
    controlesHumains:
      'L’IA prépare, l’AMO note et propose : aucun classement retenu sans vérification sur les pièces',
    livrable:
      'Assistant « Consultations » avec ses Skills + grille-type d’analyse des offres + trame de rapport d’analyse',
  },
  {
    heading: 'MODULE 4 — Piloter les intervenants : l’AMO chef d’orchestre',
    meta: '1 h 10',
    objectifs: [
      'Contrôler la maîtrise d’œuvre',
      'Revue des livrables MOE par phase : complétude, cohérence avec le programme et l’enveloppe',
      'Suivre contrôleur technique et CSPS',
      'Synthèse des avis du contrôleur technique et des observations du coordonnateur SPS',
      'Rendre compte au maître d’ouvrage',
      'CR de comité de pilotage, tableau de bord délais / coûts / risques, note d’alerte',
      'Partager et faire vivre ses assistants',
      'Partage en équipe, règles de mise à jour et traçabilité des versions',
    ],
    livrable:
      'Assistant « Pilotage » avec ses Skills + tableau de suivi des intervenants + gabarit de CR de pilotage + note d’alerte MOA',
  },
  {
    heading: 'CLÔTURE — Bilan, plan d’action et évaluation',
    meta: '10 min',
    objectifs: [
      'Clôture de session',
      'Auto-positionnement de sortie et mesure de la progression',
      'Plan d’action individuel : 3 actions concrètes à 30 jours',
      'Questionnaire de satisfaction à chaud et remise des attestations',
    ],
    livrable: 'Plan d’action individuel à 30 jours + attestation individuelle de fin de formation',
  },
];
