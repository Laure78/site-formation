/**
 * Contenu opérationnel — formation IA appels d'offres BTP (NIV-02 + landing SEO).
 * Formulations prudentes : aide / assiste / facilite — jamais de garantie d'exhaustivité ou conformité.
 */

export const AO_FORMATION_CAS_PRATIQUE_QUOTE =
  'Pendant la formation, nous pouvons travailler directement sur l\u2019un de vos DCE ainsi que sur un ancien devis de l\u2019entreprise afin de construire une méthode adaptée à vos marchés, vos ouvrages et votre façon de chiffrer.';

export const AO_FORMATION_PROMESSE =
  'Vous ne repartez pas uniquement avec des connaissances sur l\u2019IA. Vous construisez une méthode de travail applicable à vos prochains appels d\u2019offres et des assistants IA adaptés aux documents de votre entreprise.';

export const AO_FORMATION_PERSONNALISATION =
  'Formation personnalisable à partir de vos propres DCE, devis, trames de mémoire technique et documents métier.';

export const AO_CAS_PRATIQUE_MENUISERIE_ITEMS = [
  'Un DCE réel de menuiserie (ou équivalent lot second œuvre)',
  'Le CCTP du lot concerné — prestations, matériaux, performances, normes',
  'La DPGF ou le BPU — postes à chiffrer et quantités indicatives',
  'Les prescriptions techniques et interfaces avec les autres lots',
  'Les prestations explicitement demandées et les prestations potentiellement implicites',
  'Les exclusions, variantes éventuelles et contraintes de pose',
  'Les délais et documents à remettre dans l\u2019offre',
  'Un ancien devis réalisé par l\u2019entreprise — comparaison et repérage des oublis',
] as const;

export const AO_WORKFLOW_20_STEPS = [
  { title: 'Importer et organiser le DCE', body: 'RC, CCTP, CCAP, DPGF, BPU, plans et annexes — index et ordre de lecture.' },
  { title: 'Identifier les pièces contractuelles et leur rôle', body: 'Comprendre ce que chaque document impose ou permet.' },
  { title: 'Synthèse structurée du marché', body: 'L\u2019IA aide à produire une première extraction — à valider par le professionnel.' },
  { title: 'Extraire les prestations du lot entreprise', body: 'Identification des postes correspondant à votre corps de métier.' },
  { title: 'Extraire les contraintes techniques', body: 'Normes, matériaux, performances, mise en œuvre, interfaces lots.' },
  { title: 'Extraire les contraintes administratives et contractuelles', body: 'CCAP, RC — délais, pénalités, garanties, pièces obligatoires.' },
  { title: 'Identifier livrables et documents attendus', body: 'Liste des éléments à remettre dans le pli.' },
  { title: 'Comparer CCTP, DPGF, CCAP et RC', body: 'Croisement des pièces pour repérer les écarts.' },
  { title: 'Repérer contradictions et questions MOE', body: 'Informations manquantes, incohérences — points à clarifier.' },
  { title: 'Construire une checklist de chiffrage', body: 'Postes à étudier avant chiffrage — sans promesse d\u2019exhaustivité automatique.' },
  { title: 'Préparer les quantitatifs', body: 'Lorsque les documents le permettent — extraction assistée, validation métier obligatoire.' },
  { title: 'Comparer prestations détectées et ancien devis', body: 'Repérage des postes absents ou à vérifier.' },
  { title: 'Identifier les postes potentiellement oubliés', body: 'Aide au contrôle — le chiffrage final reste humain.' },
  { title: 'Générer ou améliorer les désignations d\u2019ouvrages', body: 'Formulations professionnelles à partir des prestations identifiées.' },
  { title: 'Structurer le devis', body: 'Organisation des postes — IA devis bâtiment en aide, pas en substitut.' },
  { title: 'Analyser les critères de notation du RC', body: 'Pondération pour orienter le mémoire technique.' },
  { title: 'Construire le plan du mémoire technique', body: 'Structure alignée sur les critères du règlement de consultation.' },
  { title: 'Préparer les contenus du mémoire', body: 'Rédaction assistée à partir des informations réelles de l\u2019entreprise.' },
  { title: 'Contrôle final de cohérence de l\u2019offre', body: 'Croisement mémoire, chiffrage, pièces administratives.' },
  { title: 'Capitaliser en assistants IA réutilisables', body: 'Prompts et workflows pour les prochains dossiers.' },
] as const;

export const AO_ASSISTANTS_IA = [
  {
    name: 'Assistant 1 — Analyse DCE',
    body: 'Analyse les différentes pièces (RC, CCTP, CCAP, DPGF, annexes) et produit une synthèse structurée du marché — à valider sur les sources.',
  },
  {
    name: 'Assistant 2 — Analyse CCTP',
    body: 'Aide à extraire prestations, matériaux, performances, normes, contraintes de mise en œuvre et interfaces avec les autres lots.',
  },
  {
    name: 'Assistant 3 — Contrôle DPGF / CCTP',
    body: 'Compare la DPGF avec le CCTP pour repérer les prestations absentes ou incohérentes — points nécessitant une vérification.',
  },
  {
    name: 'Assistant 4 — Préparation chiffrage',
    body: 'Transforme les informations extraites du DCE en checklist de postes à chiffrer — sans garantir l\u2019exhaustivité du chiffrage.',
  },
  {
    name: 'Assistant 5 — Désignations de devis',
    body: 'Aide à rédiger des désignations d\u2019ouvrages professionnelles à partir des prestations identifiées.',
  },
  {
    name: 'Assistant 6 — Contrôle devis',
    body: 'Compare un devis avec le DCE et signale les prestations qui semblent manquer ou nécessiter une vérification.',
  },
  {
    name: 'Assistant 7 — Mémoire technique',
    body: 'Analyse les critères du RC et prépare une structure de mémoire technique adaptée au marché.',
  },
  {
    name: 'Assistant 8 — Contrôle avant dépôt',
    body: 'Facilite le contrôle des éléments attendus, documents obligatoires et points de conformité avant remise de l\u2019offre.',
  },
] as const;

export const AO_LIVRABLES_FORMATION = [
  'Trame d\u2019analyse DCE',
  'Grille RC (critères, pondération, calendrier)',
  'Grille d\u2019analyse CCTP',
  'Checklist CCAP',
  'Tableau de comparaison CCTP / DPGF',
  'Checklist de chiffrage',
  'Prompt de contrôle d\u2019un devis',
  'Prompt de génération de désignations',
  'Trame de mémoire technique',
  'Prompt d\u2019analyse des critères de notation',
  'Checklist avant dépôt',
  'Bibliothèque de prompts BTP appels d\u2019offres',
  'Assistant IA d\u2019analyse DCE configuré pendant la formation',
] as const;

export const AO_RESULTATS_ATTENDUS = [
  'Analyser plus rapidement un DCE complet (RC, CCTP, CCAP, DPGF, BPU, plans)',
  'Structurer les informations essentielles d\u2019un appel d\u2019offres',
  'Identifier les prestations à étudier pour votre lot',
  'Contrôler la cohérence entre les pièces du DCE',
  'Préparer son chiffrage avec une checklist — validation métier obligatoire',
  'Améliorer ses désignations de devis',
  'Préparer un mémoire technique adapté aux critères du marché',
  'Utiliser des prompts structurés et une bibliothèque réutilisable',
  'Créer des assistants IA réutilisables pour les prochains dossiers',
] as const;

export const AO_PRUDENCE_FORMULATION =
  'L\u2019IA aide à identifier, facilite le contrôle et prépare une première extraction — elle ne garantit ni l\u2019exhaustivité du chiffrage, ni l\u2019exactitude des quantités, ni l\u2019interprétation juridique définitive d\u2019un CCAP, ni la conformité totale d\u2019une offre. Toute sortie est à valider par le professionnel avant remise.';
