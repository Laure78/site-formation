/**
 * Skills issus des tutos PDF /ressources — méthode Laure Olivié (OFC).
 */
import type { TutoCategoryId } from '@/lib/tutos/types';
import { TUTOS } from '@/lib/tutos';
import { LINKS } from '@/lib/internal-links';
import type { SkillLibraryCategoryId } from './categories';

const TUTO_CATEGORY_MAP: Record<TutoCategoryId, SkillLibraryCategoryId> = {
  'marches-et-veille': 'marches-publics',
  'chantier-livrables': 'chantier',
  'qse-conformite': 'qse',
  productivite: 'productivite',
};

/** Descriptif court carte (1 ligne) — distinct du cardSummary marketing. */
const TUTO_SHORT_SUMMARY: Record<string, string> = {
  'tuto-memoire-technique': 'Crée un skill qui rédige tes mémoires techniques BTP.',
  'tuto-analyse-dce': 'Analyse un DCE et produis une fiche Go / No Go en minutes.',
  'tuto-tri-dce-claude-chrome': 'Veille DCE automatique sur BOAMP avec Claude in Chrome.',
  'tuto-cr-chantier': 'Dictée vocale → compte rendu de chantier formaté.',
  'tuto-doe-dossier-ouvrages-executes': 'Assemble un DOE structuré sans y passer le week-end.',
  'tuto-skill-diuo-ofc': 'Prépare ta liasse DIUO (pièces SPS) lot par lot.',
  'tuto-skill-memoire-reclamation-bework':
    'Monte un mémoire de réclamation CCAG chiffré et dans les délais.',
  'tuto-pv-levee-reserves': 'PV de levée de réserves prêts à signer.',
  'tuto-ppsps': 'PPSPS complet à partir de 10 lignes de description chantier.',
  'tuto-duerp': 'DUERP BTP avec plan d\'actions priorisé.',
  'tuto-constat-retard': 'Courriers de constat de retard, ton juridique maîtrisé.',
  'tuto-dispatch-btp': 'Pilote ton PC bureau depuis le chantier (Dispatch).',
};

export type TutoSkillEntry = {
  id: string;
  name: string;
  summary: string;
  category: SkillLibraryCategoryId;
  source: 'tuto-ofc';
  tutoUrl: string;
  pdfUrl: string;
};

export const TUTO_SKILLS_CATALOG: TutoSkillEntry[] = TUTOS.map((t) => ({
  id: t.slug,
  name: t.shortTitle,
  summary: TUTO_SHORT_SUMMARY[t.slug] ?? t.cardSummary.split('.')[0] + '.',
  category: TUTO_CATEGORY_MAP[t.category],
  source: 'tuto-ofc' as const,
  tutoUrl: `${LINKS.ressources}/${t.slug}`,
  pdfUrl: `${LINKS.ressources}/pdf/${t.pdfFile}`,
}));

export const PACK_3_SKILLS_ENTRY: TutoSkillEntry = {
  id: 'ofc-pack-3-skills-claude',
  name: 'Pack 3 skills Claude BTP',
  summary: 'CR chantier, devis client et emails pro — modèles prêts à copier.',
  category: 'productivite',
  source: 'tuto-ofc',
  tutoUrl: LINKS.claudeAiBtp,
  pdfUrl: LINKS.downloadClaudeSkillsBtp,
};

export const RESSOURCES_TUTO_SKILLS: TutoSkillEntry[] = [...TUTO_SKILLS_CATALOG, PACK_3_SKILLS_ENTRY];
