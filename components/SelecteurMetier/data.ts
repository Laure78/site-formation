import type { InternalLinkPath } from '@/lib/internal-links';
import { LINKS } from '@/lib/internal-links';

export type MetierId = 'conducteur' | 'charge-affaires' | 'dirigeant';

export type CasUsage = {
  titre: string;
  description: string;
  gainTemps: string;
};

export type DocumentGenere = {
  nom: string;
  description: string;
};

/** Tutoriel Skill Claude listé dans /ressources — lien canonique via LINKS. */
export type TutoSkillSuggestion = {
  titre: string;
  description: string;
  href: InternalLinkPath;
};

export type Metier = {
  id: MetierId;
  titre: string;
  sousTitre: string;
  pitch: string;
  casUsage: CasUsage[];
  documents: DocumentGenere[];
  /** Tutos PDF + pages web gratuites — même catalogue que la rubrique Ressources du site. */
  tutosSkill: readonly TutoSkillSuggestion[];
  ctaTexte: string;
  /** URL interne canonique (maillage centralisé). */
  ctaHref: InternalLinkPath;
};

/** Données éditoriales — gains indicatifs issus de cas types en formation ; validation humaine indispensable. */
export const METIERS: readonly Metier[] = [
  {
    id: 'conducteur',
    titre: 'Conducteur de travaux',
    sousTitre: 'Terrain & coordination',
    pitch:
      "Reprenez la main sur vos chantiers. L'IA traite vos documents pendant que vous êtes sur le terrain.",
    casUsage: [
      {
        titre: 'Rédiger un compte rendu de chantier',
        description: 'Notes vocales ou bullet points vers CR structuré, prêt à relire.',
        gainTemps: '1 h 30 → 15 min',
      },
      {
        titre: 'Générer un PPSPS adapté au chantier',
        description: 'Structuration à partir des informations chantier et contraintes connues.',
        gainTemps: '4 h → 45 min',
      },
      {
        titre: 'Mettre à jour le DUERP après incident',
        description: 'Proposition de formulations et rattachements aux sections réglementaires.',
        gainTemps: '2 h → 30 min',
      },
      {
        titre: 'Traiter ordres de service et réserves',
        description: 'Classement, formulation et synthèse pour arbitrage.',
        gainTemps: '1 h → 10 min',
      },
      {
        titre: 'Rédiger une relance fournisseur ou sous-traitant',
        description: 'Courrier argumenté à partir du contexte contrat et du lot.',
        gainTemps: '20 min → 3 min',
      },
    ],
    documents: [
      { nom: 'Compte rendu de chantier hebdomadaire', description: 'Synthèse terrain pour MOE et équipes.' },
      { nom: 'PPSPS chantier', description: 'Plan de prévention adapté au périmètre.' },
      { nom: 'DUERP entreprise', description: 'Mise à jour documentaire après événement.' },
      { nom: "Plan d'installation chantier (PIC)", description: 'Structure logistique et sécurité.' },
      { nom: 'DICT et déclarations', description: 'Trames associées aux interventions réseaux.' },
      { nom: 'Notes de service et OS', description: 'Formalisation et traçabilité des décisions.' },
    ],
    tutosSkill: [
      {
        titre: 'Skill CR de chantier',
        description: 'Voix ou notes vers CR structuré — même logique que votre premier cas d’usage terrain.',
        href: LINKS.tutoCrChantier,
      },
      {
        titre: 'Skill PPSPS',
        description: 'Cadre réglementaire pour accélérer le plan de prévention avant coordination SPS.',
        href: LINKS.tutoPpsps,
      },
      {
        titre: 'Skill DUERP',
        description: 'Structurer ou actualiser le document unique après événement ou revue périodique.',
        href: LINKS.tutoDuerp,
      },
      {
        titre: 'Skill DOE',
        description: 'Assembler et contrôler le dossier des ouvrages exécutés en fin de chantier.',
        href: LINKS.tutoDoeDossierOuvragesExecutes,
      },
      {
        titre: 'Skill PV levée de réserves',
        description: 'Formaliser les levées de réserves avec références au PV de réception.',
        href: LINKS.tutoPvLeveeReserves,
      },
    ],
    ctaTexte: 'Découvrir la formation IA conducteurs de travaux',
    ctaHref: LINKS.formationConducteurTravaux,
  },
  {
    id: 'charge-affaires',
    titre: 'Chargé(e) d’affaires',
    sousTitre: 'Marchés & relation client',
    pitch:
      "Répondez à plus d'appels d'offres avec moins d'effort. L'IA décortique le DCE et structure votre réponse.",
    casUsage: [
      {
        titre: 'Analyser un DCE complet',
        description: 'RC, CCTP, CCAP, BPU — synthèse exploitable pour décision.',
        gainTemps: '6 h → 1 h',
      },
      {
        titre: 'Filtrer les appels d’offres BOAMP pertinents',
        description: 'Critères métiers pour réduire la veille manuelle.',
        gainTemps: '2 h / semaine → 15 min',
      },
      {
        titre: 'Rédiger un mémoire technique',
        description: 'Structure alignée sur les pondérations du RC.',
        gainTemps: '8 h → 2 h',
      },
      {
        titre: 'Chiffrer un devis à partir du BPU',
        description: 'Préparation et mise en forme — validation prix par vos équipes.',
        gainTemps: '4 h → 1 h 30',
      },
      {
        titre: 'Préparer une présentation commerciale client',
        description: 'Storyline et slides à partir du dossier technique.',
        gainTemps: '3 h → 45 min',
      },
    ],
    documents: [
      { nom: 'Mémoire technique', description: 'Réponse structurée au marché.' },
      { nom: 'Synthèse DCE structurée', description: 'Vision synthétique avant arbitrage.' },
      { nom: 'Chiffrage devis', description: 'Support pour revue interne.' },
      { nom: 'Présentation commerciale', description: 'Support oral ou envoyé au client.' },
      { nom: 'Email de relance prospect', description: 'Personnalisation rapide avec contrôle métier.' },
      { nom: 'Tableau de Go / No Go AO', description: 'Décision collective documentée.' },
    ],
    tutosSkill: [
      {
        titre: 'Skill Mémoire technique',
        description: 'Structure et méthode pour vos réponses marchés — alignée pondération RC.',
        href: LINKS.tutoMemoireTechnique,
      },
      {
        titre: 'Skill Analyse de DCE',
        description: 'Synthèse RC, CCTP, CCAP et BPU avant arbitrage Go / No Go.',
        href: LINKS.tutoAnalyseDce,
      },
      {
        titre: 'Tri DCE avec Claude in Chrome',
        description: 'Automatiser la veille BOAMP et prioriser les dossiers pertinents.',
        href: LINKS.tutoTriDceClaudeChrome,
      },
      {
        titre: 'Skill Constat de retard',
        description: 'Courriers formels et réserves utiles dans le cycle contractualisation AO.',
        href: LINKS.tutoConstatRetard,
      },
      {
        titre: 'Dispatch BTP',
        description: 'Gagner du temps entre dossiers et terrain lors des phases réponses.',
        href: LINKS.tutoDispatchBtp,
      },
    ],
    ctaTexte: 'Découvrir la formation IA réponse aux appels d’offres BTP',
    ctaHref: LINKS.formationAO,
  },
  {
    id: 'dirigeant',
    titre: 'Dirigeant PME BTP',
    sousTitre: 'Pilotage & stratégie',
    pitch:
      "Pilotez votre PME avec une longueur d'avance. L'IA libère votre temps stratégique en automatisant l'administratif.",
    casUsage: [
      {
        titre: 'Prospecter de nouveaux clients',
        description: 'Emails personnalisés à partir de brief et cibles.',
        gainTemps: '1 jour → 1 h',
      },
      {
        titre: 'Suivre la rentabilité chantier',
        description: 'Tableaux de synthèse à partir des données que vous fournissez.',
        gainTemps: 'Recalcul rapide',
      },
      {
        titre: 'Former l’équipe sur les outils internes',
        description: 'Supports pédagogiques — vous gardez le pilotage RH.',
        gainTemps: '1 jour → 1 h',
      },
      {
        titre: 'Rédiger communications clients et fournisseurs',
        description: 'Brouillons homogènes pour validation dirigeant.',
        gainTemps: 'Temps divisé par ~5',
      },
      {
        titre: 'Préparer entretiens annuels et trames RH',
        description: 'Grilles et suivis formalisés.',
        gainTemps: '1 jour → 2 h',
      },
    ],
    documents: [
      { nom: 'Plan de prospection commerciale', description: 'Séquence et messages à adapter.' },
      { nom: 'Tableau de bord rentabilité', description: 'Indicateurs synthétiques chantiers.' },
      { nom: 'Trame entretien annuel', description: 'Cadre conforme à votre politique RH.' },
      { nom: 'Support de formation interne', description: 'Slides ou fiches procédures.' },
      { nom: 'Communications clients', description: 'Courriers et annonces.' },
      { nom: 'Document unique RH', description: 'Structuration et mise à jour assistées.' },
    ],
    tutosSkill: [
      {
        titre: 'Dispatch BTP',
        description: 'Pilotage bureau depuis le terrain — utile pour suivre plusieurs chantiers ou dossiers.',
        href: LINKS.tutoDispatchBtp,
      },
      {
        titre: 'Pack 3 skills Claude AI BTP',
        description: 'Fichier méthode pour lancer l’usage dans l’entreprise sans partir de zéro.',
        href: LINKS.downloadClaudeSkillsBtp,
      },
      {
        titre: 'Guide IA conducteur de travaux',
        description: 'Vue d’ensemble des livrables terrain pour accompagner vos équipes.',
        href: LINKS.guideConducteurTravauxIaBtp,
      },
      {
        titre: 'Skill Mémoire technique',
        description: 'Comprendre la mécanique des offres pour arbitrer budgets et charge MO.',
        href: LINKS.tutoMemoireTechnique,
      },
      {
        titre: 'Skill Analyse de DCE',
        description: 'Contrôle rapide des dossiers avant engagement ou validation direction.',
        href: LINKS.tutoAnalyseDce,
      },
    ],
    ctaTexte: 'Contacter Laure Olivié — appel découverte ou formation',
    ctaHref: LINKS.contact,
  },
] as const;

export function getMetierById(id: MetierId): Metier | undefined {
  return METIERS.find((m) => m.id === id);
}
