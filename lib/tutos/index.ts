/**
 * Registre des tutos Ressources OFC.
 *
 * Source unique pour : pages individuelles, page index `/ressources`,
 * Navbar, sitemap, llms.txt et JSON-LD CollectionPage.
 */

import type { TutoData } from './types';
import { TUTO_DUERP } from './tuto-duerp';
import { TUTO_DISPATCH_BTP } from './tuto-dispatch-btp';
import { TUTO_CR_CHANTIER } from './tuto-cr-chantier';
import { TUTO_ANALYSE_DCE } from './tuto-analyse-dce';
import { TUTO_CONSTAT_RETARD } from './tuto-constat-retard';
import { TUTO_MEMOIRE_TECHNIQUE } from './tuto-memoire-technique';
import { TUTO_TRI_DCE_CLAUDE_CHROME } from './tuto-tri-dce-claude-chrome';
import { TUTO_PPSPS } from './tuto-ppsps';
import { TUTO_DOE_DOSSIER_OUVRAGES_EXECUTES } from './tuto-doe-dossier-ouvrages-executes';
import { TUTO_PV_LEVEE_RESERVES } from './tuto-pv-levee-reserves';
import { TUTO_SKILL_DIUO_OFC } from './tuto-skill-diuo-ofc';
import { TUTO_SKILL_LIVRET_INTEGRATION_OFC } from './tuto-skill-livret-integration-ofc';
import { TUTO_SKILL_MEMOIRE_RECLAMATION_BEWORK } from './tuto-skill-memoire-reclamation-bework';
import { TUTO_SKILL_RECOUVREMENT_RG_OFC } from './tuto-skill-recouvrement-rg-ofc';
import { TUTO_SKILL_PLANNING_OFC } from './tuto-skill-planning-ofc';
import { TUTO_SKILL_DC4_OFC } from './tuto-skill-dc4-ofc';
import { TUTO_SKILL_SOGED_OFC } from './tuto-skill-soged-ofc';
import { TUTO_SKILL_RDV_CLIENT_OFC } from './tuto-skill-rdv-client-ofc';
import { TUTO_SKILL_METRE_EXCEL_OFC } from './tuto-skill-metre-excel-ofc';
import { TUTO_SKILL_CHIFFRAGE_DEVIS_OFC } from './tuto-skill-chiffrage-devis-ofc';
import { TUTO_SKILL_ANALYSE_CCAP_OFC } from './tuto-skill-analyse-ccap-ofc';
import { TUTO_SKILL_ANALYSE_CCTP_OFC } from './tuto-skill-analyse-cctp-ofc';

export const TUTOS: ReadonlyArray<TutoData> = [
  TUTO_MEMOIRE_TECHNIQUE,
  TUTO_ANALYSE_DCE,
  TUTO_SKILL_ANALYSE_CCAP_OFC,
  TUTO_SKILL_ANALYSE_CCTP_OFC,
  TUTO_SKILL_METRE_EXCEL_OFC,
  TUTO_SKILL_CHIFFRAGE_DEVIS_OFC,
  TUTO_TRI_DCE_CLAUDE_CHROME,
  TUTO_SKILL_DC4_OFC,
  TUTO_SKILL_MEMOIRE_RECLAMATION_BEWORK,
  TUTO_SKILL_RECOUVREMENT_RG_OFC,
  TUTO_CR_CHANTIER,
  TUTO_SKILL_PLANNING_OFC,
  TUTO_DOE_DOSSIER_OUVRAGES_EXECUTES,
  TUTO_SKILL_DIUO_OFC,
  TUTO_PV_LEVEE_RESERVES,
  TUTO_PPSPS,
  TUTO_SKILL_SOGED_OFC,
  TUTO_DUERP,
  TUTO_SKILL_LIVRET_INTEGRATION_OFC,
  TUTO_CONSTAT_RETARD,
  TUTO_SKILL_RDV_CLIENT_OFC,
  TUTO_DISPATCH_BTP,
];

/** Récupère un tuto par son slug. */
export function getTutoBySlug(slug: string): TutoData | undefined {
  return TUTOS.find((t) => t.slug === slug);
}

/** Liste des slugs (utilisé par sitemap, navigation, etc.). */
export const TUTO_SLUGS = TUTOS.map((t) => t.slug);

export type { TutoData, TutoCategoryId } from './types';
export {
  TUTO_CATEGORY_ORDER,
  TUTO_CATEGORY_META,
} from './types';
