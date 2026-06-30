/** Contenu éditorial — landing /ressources/guide-maitrise-oeuvre-ia */

export const GUIDE_MOE_IA_PATH = '/ressources/guide-maitrise-oeuvre-ia' as const;

export const GUIDE_MOE_IA_PDF_PATH = '/ressources/pdf/guide-moe-ia.pdf' as const;

export const GUIDE_MOE_IA_H1 =
  "Guide Maître d'Œuvre × IA : les 12 missions à confier (ou non) à Claude" as const;

export type MissionMoeTag = 'IA' | 'MIXTE' | 'HUMAIN';

export type MissionMoe = {
  id: string;
  titre: string;
  tag: MissionMoeTag;
  hint: string;
};

export const MISSIONS_MOE_IA: MissionMoe[] = [
  {
    id: 'analyse-pieces',
    titre: 'Analyse des pièces',
    tag: 'MIXTE',
    hint: 'Lecture CCTP, DCE, DPGF — synthèse et points de vigilance, validation MOE.',
  },
  {
    id: 'prep-consultation',
    titre: 'Préparation consultation',
    tag: 'MIXTE',
    hint: 'Grilles de consultation, calendrier, pièces à transmettre aux entreprises.',
  },
  {
    id: 'analyse-devis',
    titre: 'Analyse devis',
    tag: 'IA',
    hint: 'Tableaux comparatifs, écarts DPGF/BPU, relances structurées.',
  },
  {
    id: 'suivi-admin',
    titre: 'Suivi administratif',
    tag: 'IA',
    hint: 'Courriers, relances, tableaux de bord et synthèses écrites.',
  },
  {
    id: 'reunions-chantier',
    titre: 'Réunions de chantier',
    tag: 'MIXTE',
    hint: 'Préparation CR, ordre du jour, suivi des décisions — présence terrain humaine.',
  },
  {
    id: 'suivi-delais',
    titre: 'Suivi des délais',
    tag: 'IA',
    hint: 'Planning, alertes, courriers de rappel et constats de retard.',
  },
  {
    id: 'suivi-financier',
    titre: 'Suivi financier',
    tag: 'MIXTE',
    hint: 'Situations, révisions, réserves financières — arbitrage MOE.',
  },
  {
    id: 'echanges-entreprises',
    titre: 'Échanges entreprises',
    tag: 'MIXTE',
    hint: 'Mails, OS, demandes de précisions — rédaction assistée, validation humaine.',
  },
  {
    id: 'non-conformites',
    titre: 'Non-conformités & réserves',
    tag: 'MIXTE',
    hint: 'PV, levées de réserves, traçabilité — signature et présence [HUMAIN].',
  },
  {
    id: 'prep-reception',
    titre: 'Préparation réception',
    tag: 'MIXTE',
    hint: 'OPR, listes de réserves, convocations et pièces de clôture.',
  },
  {
    id: 'constitution-doe',
    titre: 'Constitution DOE',
    tag: 'IA',
    hint: 'Compilation, contrôle des pièces manquantes, structuration du dossier.',
  },
  {
    id: 'reporting',
    titre: 'Reporting',
    tag: 'IA',
    hint: 'Synthèses MOA, tableaux d\'avancement et notes de direction.',
  },
];

export const METHODE_MOE_5_ETAPES = [
  {
    position: 1,
    name: 'Activer Skills + Exécution de code',
    text: 'Dans Claude (plan Pro ou supérieur), activez les Skills et l\'exécution de code pour produire des fichiers (.docx, tableaux).',
  },
  {
    position: 2,
    name: 'Rassembler la matière',
    text: 'DCE, CCTP, CR précédents, modèles d\'entreprise : anonymisez les données sensibles avant envoi.',
  },
  {
    position: 3,
    name: 'Lancer le prompt fourni',
    text: 'Utilisez les prompts du guide pour la mission choisie — une mission à la fois.',
  },
  {
    position: 4,
    name: 'Affiner les sorties',
    text: 'Relisez, corrigez le fond métier et adaptez le ton à votre MOA / marché.',
  },
  {
    position: 5,
    name: 'Tester sur un vrai dossier',
    text: 'Validez sur une opération réelle avant de généraliser le skill à l\'équipe.',
  },
] as const;

export const FAQ_GUIDE_MOE_IA = [
  {
    q: "L'utilisation de Claude engage-t-elle ma responsabilité civile professionnelle ?",
    a: "Oui, totalement. Le signataire du document reste responsable de chaque livrable transmis au MOA, à l'entreprise ou au contrôle technique. L'IA n'exonère de rien : elle accélère la préparation, pas la décision.",
  },
  {
    q: 'Quelles tâches MOE peut-on confier à l\'IA ?',
    a: "Celles marquées [IA] dans le guide (CR, relances, tableaux, synthèses, structuration DOE). Les tâches [HUMAIN] (signature, présence terrain, arbitrage contractuel) ne se délèguent jamais à l'IA.",
  },
  {
    q: 'Mes données d\'opération sont-elles confidentielles ?',
    a: "Sur un plan Pro ou supérieur, Anthropic n'entraîne pas ses modèles sur vos conversations. Anonymisez toutefois noms de clients, montants sensibles et pièces contractuelles avant envoi.",
  },
  {
    q: 'Faut-il créer les 12 skills d\'un coup ?',
    a: "Non. Commencez par la mission qui vous fait perdre le plus de week-ends — souvent les comptes rendus de chantier ou le suivi administratif — puis étendez progressivement.",
  },
  {
    q: 'La formation est-elle finançable ?',
    a: "Oui : organisme certifié Qualiopi, financement possible via Constructys / OPCO selon éligibilité de votre structure et de vos salariés.",
  },
  {
    q: 'Ce guide remplace-t-il une formation présentielle ?',
    a: "Non : c'est un support autonome pour classer les missions et démarrer vos skills Claude. Une formation IA maîtrise d'œuvre en présentiel reste pertinente pour ancrer la méthode sur vos dossiers réels en Île-de-France.",
  },
] as const;

export const TAG_LEGEND: Record<MissionMoeTag, string> = {
  IA: 'Délégable à l\'IA (relecture humaine obligatoire)',
  MIXTE: 'IA pour le brouillon, humain pour valider et signer',
  HUMAIN: 'Présence, décision ou signature — jamais automatisé',
};
