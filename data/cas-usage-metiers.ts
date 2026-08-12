import type { InternalLinkPath } from '@/lib/internal-links';
import { LINKS } from '@/lib/internal-links';

/**
 * Profils du sélecteur « Que peut faire l'IA pour votre métier ? »
 * Source unique — contenu rendu côté serveur (HTML initial indexable).
 */

export type MetierId = 'conducteur-de-travaux' | 'charge-affaires' | 'dirigeant-pme';

export type CasUsage = {
  titre: string;
  description: string;
  /** Gain indicatif (ordre de grandeur pédagogique — validation métier requise). */
  gainTemps: string;
  /** Page tuto Skill / ressource — une URL distincte par ligne pour le maillage. */
  tutoSkill: {
    libelle: string;
    href: InternalLinkPath;
  };
};

export type DocumentGenere = {
  nom: string;
  description: string;
};

export type MetierCasUsage = {
  id: MetierId;
  /** Ancre HTML (`#…`) — identique à `id`. */
  anchor: MetierId;
  titre: string;
  sousTitre: string;
  pitch: string;
  casUsage: CasUsage[];
  documents: DocumentGenere[];
  ctaTexte: string;
  /** Page métier canonique. */
  ctaHref: InternalLinkPath;
};

/** Données éditoriales — gains indicatifs issus de cas types en formation ; validation humaine indispensable. */
export const CAS_USAGE_METIERS: readonly MetierCasUsage[] = [
  {
    id: 'conducteur-de-travaux',
    anchor: 'conducteur-de-travaux',
    titre: 'Conducteur de travaux',
    sousTitre: 'Terrain & coordination',
    pitch:
      "Reprenez la main sur vos chantiers. L'IA traite vos documents pendant que vous êtes sur le terrain.",
    casUsage: [
      {
        titre: 'Rédiger un compte rendu de chantier',
        description: 'Notes vocales ou bullet points vers CR structuré, prêt à relire.',
        gainTemps: '1 h 30 → 15 min',
        tutoSkill: {
          libelle: 'Tuto Skill — compte rendu de chantier',
          href: LINKS.tutoCrChantier,
        },
      },
      {
        titre: 'Générer un PPSPS adapté au chantier',
        description: 'Structuration à partir des informations chantier et contraintes connues.',
        gainTemps: '4 h → 45 min',
        tutoSkill: {
          libelle: 'Tuto Skill — PPSPS chantier',
          href: LINKS.tutoPpsps,
        },
      },
      {
        titre: 'Mettre à jour le DUERP après incident',
        description: 'Proposition de formulations et rattachements aux sections réglementaires.',
        gainTemps: '2 h → 30 min',
        tutoSkill: {
          libelle: 'Tuto Skill — DUERP',
          href: LINKS.tutoDuerp,
        },
      },
      {
        titre: 'Traiter ordres de service et réserves',
        description: 'Classement, formulation et synthèse pour arbitrage.',
        gainTemps: '1 h → 10 min',
        tutoSkill: {
          libelle: 'Tuto Skill — PV levée de réserves',
          href: LINKS.tutoPvLeveeReserves,
        },
      },
      {
        titre: 'Rédiger une relance fournisseur ou sous-traitant',
        description: 'Courrier argumenté à partir du contexte contrat et du lot.',
        gainTemps: '20 min → 3 min',
        tutoSkill: {
          libelle: 'Tuto Skill — constat de retard / courrier formel',
          href: LINKS.tutoConstatRetard,
        },
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
    ctaTexte: 'Découvrir la formation IA conducteurs de travaux',
    ctaHref: LINKS.formationConducteurTravaux,
  },
  {
    id: 'charge-affaires',
    anchor: 'charge-affaires',
    titre: 'Chargé(e) d’affaires',
    sousTitre: 'Marchés & relation client',
    pitch:
      "Répondez à plus d'appels d'offres, plus vite. L'IA décortique le DCE et structure votre réponse — vous validez le fond.",
    casUsage: [
      {
        titre: 'Analyser un DCE complet',
        description: 'RC, CCTP, CCAP, BPU — synthèse exploitable pour décision.',
        gainTemps: '6 h → 1 h',
        tutoSkill: {
          libelle: 'Tuto Skill — analyse de DCE',
          href: LINKS.tutoAnalyseDce,
        },
      },
      {
        titre: 'Filtrer les appels d’offres BOAMP pertinents',
        description: 'Critères métiers pour réduire la veille manuelle.',
        gainTemps: '2 h / semaine → 15 min',
        tutoSkill: {
          libelle: 'Tuto — tri DCE avec Claude in Chrome',
          href: LINKS.tutoTriDceClaudeChrome,
        },
      },
      {
        titre: 'Rédiger un mémoire technique',
        description: 'Structure alignée sur les pondérations du RC.',
        gainTemps: '8 h → 2 h',
        tutoSkill: {
          libelle: 'Tuto Skill — mémoire technique',
          href: LINKS.tutoMemoireTechnique,
        },
      },
      {
        titre: 'Chiffrer un devis à partir du BPU',
        description: 'Préparation et mise en forme — validation prix par vos équipes.',
        gainTemps: '4 h → 1 h 30',
        tutoSkill: {
          libelle: 'Guide — répondre à un AO BTP (méthode 5 étapes)',
          href: LINKS.guideRepondreAoBtpOfc2026,
        },
      },
      {
        titre: 'Préparer une présentation commerciale client',
        description: 'Storyline et slides à partir du dossier technique.',
        gainTemps: '3 h → 45 min',
        tutoSkill: {
          libelle: 'Tuto — Dispatch BTP (gain de temps multi-dossiers)',
          href: LINKS.tutoDispatchBtp,
        },
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
    ctaTexte: 'Découvrir la formation IA chargé d’affaires BTP',
    ctaHref: LINKS.formationChargeAffairesBtp,
  },
  {
    id: 'dirigeant-pme',
    anchor: 'dirigeant-pme',
    titre: 'Dirigeant PME BTP',
    sousTitre: 'Pilotage & stratégie',
    pitch:
      "Pilotez votre PME avec une longueur d'avance. L'IA libère votre temps stratégique en accélérant l'administratif — sous votre validation.",
    casUsage: [
      {
        titre: 'Prospecter de nouveaux clients',
        description: 'Emails personnalisés à partir de brief et cibles.',
        gainTemps: '1 jour → 1 h',
        tutoSkill: {
          libelle: 'Pack méthode — 3 skills Claude AI BTP (téléchargement)',
          href: LINKS.downloadClaudeSkillsBtp,
        },
      },
      {
        titre: 'Suivre la rentabilité chantier',
        description: 'Tableaux de synthèse à partir des données que vous fournissez.',
        gainTemps: 'Recalcul rapide',
        tutoSkill: {
          libelle: 'Bibliothèque de skills Claude AI pour le BTP',
          href: LINKS.bibliothequeSkills,
        },
      },
      {
        titre: 'Former l’équipe sur les outils internes',
        description: 'Supports pédagogiques — vous gardez le pilotage RH.',
        gainTemps: '1 jour → 1 h',
        tutoSkill: {
          libelle: 'Guide long — IA pour conducteur de travaux (vue livrables équipe)',
          href: LINKS.guideConducteurTravauxIaBtp,
        },
      },
      {
        titre: 'Rédiger communications clients et fournisseurs',
        description: 'Brouillons homogènes pour validation dirigeant.',
        gainTemps: 'Temps divisé par ~5',
        tutoSkill: {
          libelle: 'Tuto Skill — mémoire de réclamation',
          href: LINKS.tutoSkillMemoireReclamationBework,
        },
      },
      {
        titre: 'Préparer entretiens annuels et trames RH',
        description: 'Grilles et suivis formalisés.',
        gainTemps: '1 jour → 2 h',
        tutoSkill: {
          libelle: 'Tuto Skill — livret d’intégration / accueil RH BTP',
          href: LINKS.tutoSkillLivretIntegrationOfc,
        },
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
    ctaTexte: 'Découvrir la formation IA dirigeant PME BTP',
    ctaHref: LINKS.formationIaDirigeantPmeBtp,
  },
] as const;

/** @deprecated Alias — préférer `CAS_USAGE_METIERS`. */
export const METIERS = CAS_USAGE_METIERS;

export type Metier = MetierCasUsage;

export function getMetierById(id: MetierId): MetierCasUsage | undefined {
  return CAS_USAGE_METIERS.find((m) => m.id === id);
}
