/**
 * Usages IA proposés pour les modules métier du catalogue 2027
 * (hors modules NUM déjà couverts par les fiches NIV).
 * Alignés sur les titres réels de `data/catalogue-2027/modules.ts`.
 */
import type { ModuleCode } from '@/data/catalogue-2027/types';
import type { FormationIaUsage } from '@/lib/formation-ia/types';

const u = (
  partial: Omit<FormationIaUsage, 'pratiqueParticipant'> & {
    pratiqueParticipant?: boolean;
  },
): FormationIaUsage => ({
  pratiqueParticipant: partial.pratiqueParticipant ?? true,
  ...partial,
});

/** Un usage phare par module métier — évite les doublons dans un même parcours. */
export const USAGES_IA_MODULES_2027: Partial<
  Record<ModuleCode, FormationIaUsage>
> = {
  'DIR-01': u({
    id: 'dir01-prix-revient',
    moduleLabel: 'DIR-01 — Prix de revient',
    competenceMetier: 'Contrôler la cohérence d’un calcul de prix de revient',
    tacheIa:
      'Analyser un tableau de coûts, repérer écarts et hypothèses manquantes, proposer une grille de contrôle',
    documentsOuDonnees: 'Tableur pédagogique de coûts d’affaire',
    outil: 'chatgpt',
    fonctionnaliteId: 'chatgpt-data-analysis',
    travailParticipant:
      'Importer le fichier, vérifier un échantillon de calculs, corriger la grille',
    livrable: 'Grille prix de revient contrôlée + hypothèses explicites',
    controlesHumains: 'Tous les montants validés par le professionnel',
    critereEvaluation:
      'Écarts sourcés ; hypothèses listées ; aucun prix laissé à l’IA',
    niveau: 'intermediaire',
  }),
  'DIR-02': u({
    id: 'dir02-pilotage-marge',
    moduleLabel: 'DIR-02 — Pilotage des marges',
    competenceMetier: 'Repérer les écarts de marge et préparer une note de pilotage',
    tacheIa:
      'Comparer prévu / réalisé, formuler questions à approfondir et actions proposées',
    documentsOuDonnees: 'Tableau de marge chantier pédagogique',
    outil: 'chatgpt',
    fonctionnaliteId: 'chatgpt-data-analysis',
    travailParticipant:
      'Produire la synthèse, prioriser 3 actions, valider les chiffres clés',
    livrable:
      'Synthèse de pilotage : écarts, hypothèses, questions, actions proposées',
    controlesHumains: 'Décision de pilotage = direction / chargé d’affaires',
    critereEvaluation:
      'Écarts exacts ; faits vs recommandations ; plan d’action priorisé',
    niveau: 'intermediaire',
  }),
  'DIR-03': u({
    id: 'dir03-tresorerie',
    moduleLabel: 'DIR-03 — Trésorerie',
    competenceMetier: 'Organiser le suivi de trésorerie et les relances',
    tacheIa:
      'Structurer un prévisionnel simple et des modèles de relance à partir des échéances',
    documentsOuDonnees: 'Échéancier pédagogique encaissements / décaissements',
    outil: 'claude',
    fonctionnaliteId: 'claude-artifacts',
    travailParticipant:
      'Construire le tableau, rédiger 2 relances, appliquer grille avant envoi',
    livrable: 'Tableau de suivi + checklist + modèles de courrier',
    controlesHumains: 'Montants et destinataires validés avant envoi',
    critereEvaluation: 'Prévisionnel cohérent ; relances factuelles ; grille cochée',
    niveau: 'intermediaire',
  }),
  'DIR-04': u({
    id: 'dir04-plan-commercial',
    moduleLabel: 'DIR-04 — Plan commercial',
    competenceMetier: 'Comparer des scénarios commerciaux avec hypothèses explicites',
    tacheIa:
      'Produire une note d’aide à la décision (options, avantages, limites, conditions)',
    documentsOuDonnees: 'Contexte PME BTP pédagogique',
    outil: 'chatgpt',
    fonctionnaliteId: 'chatgpt-deep-research',
    travailParticipant:
      'Cadre les critères, comparer 2–3 options, conserver la décision finale',
    livrable: 'Note d’aide à la décision + plan d’action priorisé',
    controlesHumains:
      'Sources vérifiées ; Deep research n’est pas une étude de marché certifiée',
    critereEvaluation:
      'Critères explicites ; options comparées ; décision humaine tracée',
    niveau: 'intermediaire',
    demoFormateur: true,
  }),
  'DIR-05': u({
    id: 'dir05-gouvernance-ia',
    moduleLabel: 'DIR-05 — Gouvernance IA',
    competenceMetier: 'Définir règles d’usage et plan de déploiement IA',
    tacheIa:
      'Cartographier usages prioritaires, données autorisées / interdites, rôles de validation',
    documentsOuDonnees: 'Cartographie des processus de l’entreprise (atelier)',
    outil: 'claude',
    fonctionnaliteId: 'claude-projects',
    travailParticipant: 'Rédiger règles d’usage + feuille de route 90 jours',
    livrable: 'Plan de déploiement IA + matrice de confidentialité',
    controlesHumains: 'Validation direction ; pas de promesse de conformité automatique',
    critereEvaluation: 'Usages priorisés ; données cadrées ; jalons réalistes',
    niveau: 'intermediaire',
  }),
  'COM-01': u({
    id: 'com01-devis',
    moduleLabel: 'COM-01 — Devis clairs et rentables',
    competenceMetier: 'Structurer et contrôler un devis avant envoi',
    tacheIa:
      'Restructurer un devis, préparer options / exclusions et une grille de rentabilité à contrôler',
    documentsOuDonnees: 'Devis pédagogique anonymisé',
    outil: 'chatgpt',
    fonctionnaliteId: 'chatgpt-canvas',
    travailParticipant:
      'Produire la trame, cocher la grille, corriger libellés et unités',
    livrable: 'Trame de devis contrôlée + grille avant envoi',
    controlesHumains: 'Prix, quantités et marge validés par le professionnel',
    critereEvaluation:
      'Structure lisible ; exclusions explicites ; aucun prix validé par l’IA',
    niveau: 'intermediaire',
  }),
  'COM-02': u({
    id: 'com02-negociations',
    moduleLabel: 'COM-02 — Négociations et relances',
    competenceMetier: 'Préparer négociations et réponses aux objections',
    tacheIa:
      'Produire arguments, limites et conditions pour 3 objections types + plan de relance',
    documentsOuDonnees: 'Contexte devis / négociation pédagogique',
    outil: 'chatgpt',
    fonctionnaliteId: 'prompts-fichiers',
    travailParticipant: 'Rédiger, faire relire en binôme, appliquer grille avant envoi',
    livrable: 'Fiche négociation / objections + séquence de relances',
    controlesHumains: 'Pas de promesse commerciale non autorisée',
    critereEvaluation: 'Réponses factuelles ; limites assumées ; relances datées',
    niveau: 'intermediaire',
  }),
  'COM-03': u({
    id: 'com03-marches-publics',
    moduleLabel: 'COM-03 — Marchés publics',
    competenceMetier: 'Extraire les exigences d’un DCE avec leurs références',
    tacheIa:
      'Lister exigences et pièces à produire pour la candidature, avec renvois aux articles',
    documentsOuDonnees: 'Extrait de DCE pédagogique (RC + règlement)',
    outil: 'claude',
    fonctionnaliteId: 'claude-projects',
    travailParticipant:
      'Extraire, contrôler 5 exigences dans les pièces, lister les manques',
    livrable: 'Tableau d’exigences sourcé + checklist candidature',
    controlesHumains: 'Interprétation contractuelle validée par le professionnel',
    critereEvaluation: 'Références exactes ; manques listés ; pas d’exigence inventée',
    niveau: 'intermediaire',
  }),
  'COM-04': u({
    id: 'com04-memoire',
    moduleLabel: 'COM-04 — Mémoire technique',
    competenceMetier: 'Auditer et structurer un mémoire selon les critères du marché',
    tacheIa:
      'Proposer un plan aligné sur les critères et une grille d’auto-contrôle',
    documentsOuDonnees: 'RC + extrait de mémoire anonymisé',
    outil: 'claude',
    fonctionnaliteId: 'claude-artifacts',
    travailParticipant: 'Remplir la grille, corriger 2 sections critiques',
    livrable: 'Plan de mémoire + grille d’audit remplie',
    controlesHumains: 'Engagements et moyens validés par le professionnel',
    critereEvaluation: 'Alignement critères ; corrections justifiées',
    niveau: 'intermediaire',
  }),
  'COM-05': u({
    id: 'com05-avenants',
    moduleLabel: 'COM-05 — Avenants et réclamations',
    competenceMetier: 'Structurer le suivi des avenants et préparer une note factuelle',
    tacheIa:
      'Classer événements, pièces manquantes et chronologie pour une demande / réclamation pédagogique',
    documentsOuDonnees: 'Journal d’événements + extraits de marché fictifs',
    outil: 'claude',
    fonctionnaliteId: 'claude-projects',
    travailParticipant:
      'Produire chronologie, checklist pièces, brouillon de note à faire valider',
    livrable: 'Dossier de suivi avenant / réclamation (brouillon contrôlé)',
    controlesHumains:
      'Contenu juridique / contractuel vérifié dans les pièces — pas de mise en demeure autonome',
    critereEvaluation: 'Chronologie exacte ; pièces listées ; ton factuel',
    niveau: 'intermediaire',
  }),
  'TRA-01': u({
    id: 'tra01-passation',
    moduleLabel: 'TRA-01 — Passation / ouverture',
    competenceMetier: 'Organiser la préparation de chantier à partir des documents',
    tacheIa:
      'Extraire contraintes d’organisation (CCTP, pièces chantier), actions avant démarrage, approvisionnements',
    documentsOuDonnees: 'Dossier de passation pédagogique',
    outil: 'claude',
    fonctionnaliteId: 'claude-skills',
    travailParticipant:
      'Produire checklist, tableau ressources / livraisons, questions aux lots',
    livrable: 'Checklist de préparation + ressources à vérifier',
    controlesHumains: 'Retour aux pièces marché pour chaque point critique',
    critereEvaluation: 'Références exactes ; priorisation claire ; aucune donnée inventée',
    niveau: 'intermediaire',
  }),
  'TRA-02': u({
    id: 'tra02-planning',
    moduleLabel: 'TRA-02 — Planning',
    competenceMetier: 'Construire et actualiser un planning réaliste',
    tacheIa:
      'Structurer phases et dépendances, répartir tâches et moyens, comparer scénarios face à un aléa',
    documentsOuDonnees: 'Durées et moyens renseignés sur cas fil rouge',
    outil: 'chatgpt',
    fonctionnaliteId: 'chatgpt-canvas',
    travailParticipant: 'Planning prévisionnel + scénario d’actualisation contrôlé',
    livrable: 'Planning à vérifier + plan d’actions',
    controlesHumains: 'Délais et moyens validés par le conducteur / chef de chantier',
    critereEvaluation: 'Enchaînements cohérents ; aléa traité sans décision automatique',
    niveau: 'intermediaire',
  }),
  'NUM-07': u({
    id: 'num07-conduite-documentaire',
    moduleLabel: 'NUM-07 — IA et conduite de travaux',
    competenceMetier: 'Piloter le suivi documentaire et les actions de chantier',
    tacheIa:
      'CCTP → organisation / suivi ; CR → tableau d’actions ; cadrage d’un assistant métier',
    documentsOuDonnees: 'CCTP, notes de réunion et CR pédagogiques',
    outil: 'claude',
    fonctionnaliteId: 'claude-skills',
    travailParticipant: 'Fil rouge suivi + assistant avec sources validées',
    livrable: 'Méthode IA + plan d’actions et protocole de validation',
    controlesHumains: 'Aucune décision de chantier diffusée sans validation',
    critereEvaluation: 'Actions traçables ; séparation faits / recommandations',
    niveau: 'intermediaire',
  }),
  'TRA-03': u({
    id: 'tra03-couts',
    moduleLabel: 'TRA-03 — Suivi des coûts',
    competenceMetier: 'Comparer prévu / réalisé et préparer un point chiffré',
    tacheIa:
      'Analyser un tableau de coûts, repérer écarts et formuler questions / actions',
    documentsOuDonnees: 'Export pédagogique heures / matériaux / situations',
    outil: 'chatgpt',
    fonctionnaliteId: 'chatgpt-data-analysis',
    travailParticipant:
      'Analyser, contrôler un échantillon, produire la synthèse de point de situation',
    livrable: 'Tableau d’écarts + note de situation contrôlée',
    controlesHumains: 'Montants validés par le conducteur / gestion',
    critereEvaluation: 'Écarts sourcés ; hypothèses marquées ; actions priorisées',
    niveau: 'intermediaire',
  }),
  'TRA-04': u({
    id: 'tra04-reunion',
    moduleLabel: 'TRA-04 — Réunions de chantier',
    competenceMetier: 'Préparer une réunion et structurer le CR',
    tacheIa:
      'Préparer l’ordre du jour, puis structurer notes en CR + tableau d’actions',
    documentsOuDonnees: 'Notes et planning pédagogique',
    outil: 'claude',
    fonctionnaliteId: 'claude-artifacts',
    travailParticipant: 'ODJ → CR → tableau actions avec responsables',
    livrable: 'CR + tableau des actions et points à valider',
    controlesHumains: 'Validation du conducteur avant diffusion',
    critereEvaluation: 'Actions traçables ; pas d’invention',
    niveau: 'intermediaire',
  }),
  'TRA-05': u({
    id: 'tra05-reception',
    moduleLabel: 'TRA-05 — Réception',
    competenceMetier: 'Analyser les documents de réception',
    tacheIa: 'Structurer listes de réserves, DOE à compléter et suivi de levée',
    documentsOuDonnees: 'PV / listes pédagogiques',
    outil: 'chatgpt',
    fonctionnaliteId: 'chatgpt-projects',
    travailParticipant: 'Classer réserves, produire suivi et relances',
    livrable: 'Tableau de suivi réception contrôlé',
    controlesHumains: 'Constats terrain prioritaires sur la synthèse IA',
    critereEvaluation: 'Classement exact ; relances factuelles',
    niveau: 'intermediaire',
  }),
  'MAN-01': u({
    id: 'man01-briefing',
    moduleLabel: 'MAN-01 — Consignes d’équipe',
    competenceMetier: 'Préparer un briefing à partir de consignes validées',
    tacheIa:
      'Reformuler une procédure pour faciliter la compréhension terrain',
    documentsOuDonnees: 'Consignes sécurité / qualité validées (extrait)',
    outil: 'chatgpt',
    fonctionnaliteId: 'prompts-fichiers',
    travailParticipant:
      'Produire fiche briefing courte, faire tester la clarté en binôme',
    livrable: 'Fiche de briefing vérifiée et adaptée à l’équipe',
    controlesHumains:
      'Consignes de sécurité : validation du responsable avant diffusion',
    critereEvaluation: 'Clarté ; fidélité aux consignes ; aucune règle inventée',
    niveau: 'intermediaire',
  }),
  'MAN-03': u({
    id: 'man03-tensions',
    moduleLabel: 'MAN-03 — Situations difficiles',
    competenceMetier: 'Structurer une remontée factuelle après une tension',
    tacheIa:
      'Transformer des notes en fiche factuelle (faits, impacts, questions) sans jugement',
    documentsOuDonnees: 'Notes pédagogiques anonymisées d’une situation difficile',
    outil: 'claude',
    fonctionnaliteId: 'prompts-fichiers',
    travailParticipant:
      'Distinguer faits, hypothèses et demandes ; préparer un entretien de clarification',
    livrable: 'Fiche de transmission claire et vérifiée',
    controlesHumains: 'Pas de sanction ni conclusion RH générée par l’IA',
    critereEvaluation:
      'Faits séparés des interprétations ; questions utiles ; ton professionnel',
    niveau: 'intermediaire',
  }),
  'ADM-01': u({
    id: 'adm01-completude',
    moduleLabel: 'ADM-01 — Administratif chantier',
    competenceMetier: 'Contrôler la complétude d’un dossier et préparer les relances',
    tacheIa:
      'Comparer une checklist attendue aux pièces fournies, lister les manques',
    documentsOuDonnees: 'Jeu de pièces pédagogiques incomplet',
    outil: 'claude',
    fonctionnaliteId: 'claude-projects',
    travailParticipant: 'Produire tableau de contrôle + plan de relance interne',
    livrable: 'Tableau de suivi + checklist + modèle de courrier',
    controlesHumains: 'Pièces originales vérifiées avant clôture dossier',
    critereEvaluation: 'Manques exacts ; relances actionnables',
    niveau: 'intermediaire',
  }),
  'ADM-02': u({
    id: 'adm02-facturation',
    moduleLabel: 'ADM-02 — Facturation électronique',
    competenceMetier: 'Organiser les informations nécessaires à un dossier de facturation',
    tacheIa:
      'Contrôler la complétude des données (client, prestations, pièces) et produire une checklist',
    documentsOuDonnees: 'Jeu pédagogique devis / situation / facture',
    outil: 'chatgpt',
    fonctionnaliteId: 'chatgpt-data-analysis',
    travailParticipant: 'Repérer écarts de libellés / montants ; documenter les corrections',
    livrable: 'Checklist dossier facturation + tableau d’écarts',
    controlesHumains: 'Montants et mentions légales validés en gestion / comptabilité',
    critereEvaluation: 'Écarts référencés ; checklist applicable',
    niveau: 'intermediaire',
  }),
  'TQP-01': u({
    id: 'tqp01-prevention',
    moduleLabel: 'TQP-01 — Prévention chantier',
    competenceMetier: 'Préparer supports de prévention et tableaux d’actions',
    tacheIa:
      'Structurer observations, trames d’analyse des risques, accueil sécurité, quart d’heure, EPI, signalements',
    documentsOuDonnees: 'Consignes et extraits de dossier prévention validés',
    outil: 'claude',
    fonctionnaliteId: 'claude-projects',
    travailParticipant:
      'Trames accueil / QHS, checklist, tableau d’actions — relecture compétente',
    livrable: 'Trame accueil + support QHS + suivi actions prévention',
    controlesHumains:
      'Aide documentaire uniquement — pas de conformité PPSPS/DUERP automatique ni habilitation',
    critereEvaluation:
      'Références exactes ; limites explicites ; aucune mesure inventée par l’IA',
    niveau: 'intermediaire',
  }),
};

export function getModule2027IaUsage(
  code: ModuleCode,
): FormationIaUsage | null {
  return USAGES_IA_MODULES_2027[code] ?? null;
}
