import type { TocEntry } from '@/components/blog/TableOfContents';
import type { PhaseCard } from '@/components/blog/PhaseGrid';
import type { FaqItem } from '@/components/blog/FaqList';
import { blogArticleClaudeIaMaitriseOeuvre } from '@/lib/blog-claude-ia-maitrise-oeuvre-article';

export const CLAUDE_MOE_TOC: TocEntry[] = [
  { id: 'pourquoi-lia-interesse-les-maitres-doeuvre', depth: 2, text: 'Pourquoi l\'IA intéresse les maîtres d\'œuvre' },
  { id: 'quelles-fonctionnalites-de-claude-utiliser-en-maitrise-doeuvre', depth: 2, text: 'Quelles fonctionnalités de Claude utiliser en maîtrise d\'œuvre ?' },
  { id: 'etape-1-creer-un-projet-par-operation', depth: 2, text: 'Étape 1 : créer un Projet par opération' },
  { id: 'les-12-usages-de-claude-phase-par-phase', depth: 2, text: 'Les 12 usages de Claude, phase par phase' },
  { id: 'automatiser-avec-les-skills-creer-votre-premier-skill-en-5-etapes', depth: 2, text: 'Automatiser avec les Skills : créer votre premier Skill en 5 étapes' },
  { id: 'les-regles-de-prudence-a-respecter', depth: 2, text: 'Les règles de prudence à respecter' },
  { id: 'faq', depth: 2, text: 'FAQ' },
];

export const PROMPT_PROJET_OPERATION = `Tu assistes l'équipe de maîtrise d'œuvre de l'opération [NOM], [nature des travaux], à [ville], pour le maître d'ouvrage [NOM].
Mission : [base / EXE / DET / OPC / AOR].
Règles :
- Appuie-toi uniquement sur les pièces du projet. Si une info manque, dis-le au lieu de supposer.
- Cite la pièce et l'article utilisés (ex. : CCTP lot 03, art. 2.4).
- Ne cite aucune norme ni aucun DTU sans préciser qu'il faut vérifier la version en vigueur.
- Termine chaque document par la liste des points à vérifier par la MOE.`;

export const PROMPT_CCTP_DPGF = `Compare le CCTP et la DPGF du lot [N°]. Fais un tableau : ouvrage décrit au CCTP sans ligne DPGF / ligne DPGF sans description au CCTP / écarts d'unités ou de désignation. Indique l'article et la ligne concernés.`;

export const PROMPT_VISA = `Voici la fiche technique transmise par l'entreprise du lot [N°] pour [produit]. Compare-la aux exigences du CCTP (art. [X]). Tableau : exigence / valeur fournie / conforme, non conforme ou à préciser. Propose ensuite un projet d'avis de visa.`;

export const PROMPT_CR = `Transforme ma dictée en compte rendu n°[X] du [date], au format de nos CR : présents, avancement par lot, observations, décisions, actions (qui / quoi / pour quand), prochaine réunion. Reprends les actions non soldées du CR précédent. N'invente rien : si une info manque, écris [À COMPLÉTER].`;

export const PHASE_GRID_CARDS: PhaseCard[] = [
  {
    phase: 'DCE',
    usages: [
      'Rédiger un CCTP de lot à partir de vos CCTP types',
      'Contrôler la cohérence CCTP / DPGF',
    ],
  },
  {
    phase: 'ACT',
    usages: [
      "Préparer l'analyse des offres",
      "Rédiger le rapport d'analyse",
    ],
  },
  {
    phase: 'VISA',
    usages: ['Pré-analyser une fiche technique', 'Tenir le suivi des visas'],
  },
  {
    phase: 'DET',
    usages: [
      "Produire le compte rendu de chantier à partir d'une dictée",
      'Relancer les entreprises',
    ],
  },
  { phase: 'OPC', usages: ['Analyser un glissement de planning'] },
  {
    phase: 'AOR · DOE',
    usages: [
      'Établir la liste des réserves',
      'Suivre la levée des réserves',
      'Contrôler la complétude des DOE',
    ],
  },
];

export const PRUDENCE_RULES = [
  {
    title: 'Vous restez responsable',
    text: 'aucun document ne part sans relecture et signature.',
  },
  {
    title: 'Vérifiez les références',
    text: 'normes, DTU et textes réglementaires se contrôlent toujours à la source officielle, dans leur version en vigueur.',
  },
  {
    title: 'Protégez les données',
    text: 'utilisez une offre professionnelle, vérifiez les paramètres de confidentialité et les clauses de votre contrat de maîtrise d\'œuvre ; en cas de doute, anonymisez.',
  },
  {
    title: 'Exigez les sources',
    text: 'demandez à Claude de citer la pièce et l\'article utilisés.',
  },
  {
    title: "Interdisez l'invention",
    text: 'ajoutez « si l\'info manque, écris [À COMPLÉTER] » dans vos consignes.',
  },
  {
    title: 'Gardez le jugement',
    text: 'notation des offres, choix techniques et décisions restent votre rôle.',
  },
] as const;

export const SKILL_STEPS = [
  {
    title: 'Choisissez une tâche répétitive',
    text: "compte rendu de chantier, avis de visa, rapport d'analyse.",
  },
  {
    title: 'Rassemblez trois exemples réussis',
    text: 'et votre gabarit Word.',
  },
  {
    title: 'Faites rédiger le Skill par Claude',
    text: "demandez-lui d'en déduire la structure, le ton et les règles, puis de vous poser ses questions avant de rédiger le SKILL.md.",
  },
  {
    title: 'Enregistrez-le',
    text: "depuis la conversation, ou importez le dossier dans les réglages de Claude (l'emplacement peut varier selon votre version).",
  },
  {
    title: 'Testez et ajustez',
    text: "sur un vrai dossier jusqu'à obtenir un résultat sans retouche.",
  },
] as const;

export const FAQ_ITEMS: FaqItem[] = blogArticleClaudeIaMaitriseOeuvre.faq ?? [];
