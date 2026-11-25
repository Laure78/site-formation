/**
 * Contenu éditorial — fiche `/formateurs/manuel-gomez` (publiable sans le parcours détaillé non validé).
 */
import type { FormationNiveau } from '@/data/formations';
import type { FAQItem } from '@/lib/faq';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { formationNiveauOfficielLabel } from '@/lib/formation-niveaux-officiels';
import { FORMATIONS_NIVEAUX_IA } from '@/lib/formations-niveaux-ia';
import { LINKS } from '@/lib/internal-links';
import {
  TARIF_PARTICIPANT_NIV01_HT,
  TARIF_PARTICIPANT_NIV02_HT,
  TARIF_PARTICIPANT_NIV10_14H_HT,
} from '@/lib/tarifs-catalogue-participant';

export const MANUEL_GOMEZ_SLUG = 'manuel-gomez' as const;
export const MANUEL_GOMEZ_PATH = `/formateurs/${MANUEL_GOMEZ_SLUG}` as const;

export const MANUEL_GOMEZ_METADATA = {
  title: 'Manuel Gomez | Formateur IA BTP – Île-de-France',
  description:
    'Manuel Gomez, formateur IA BTP en Île-de-France. Formations ChatGPT, Claude, appels d’offres, conduite de travaux, agents IA et automatisation.',
} as const;

export const MANUEL_GOMEZ_EN_BREF =
  'Manuel Gomez est formateur en intelligence artificielle appliquée au BTP pour OFC Création d’Entreprise (marque commerciale Laure Olivié), organisme certifié Qualiopi. Il anime l’ensemble des formations IA du catalogue publié, en présentiel en Île-de-France, pour les dirigeants et équipes des PME du bâtiment et des travaux publics.';

export const MANUEL_FORMATIONS_SECTION_ID = 'manuel-formations' as const;

/** Parcours publié — formulation validée côté organisme (sans détail chronologique). */
export const MANUEL_PARCOURS_VALIDE_COURT =
  'Dirigeant d’entreprise de travaux publics et ancien conducteur de travaux chez Eiffage, Manuel Gomez met son expérience terrain au service des formations IA appliquées au BTP.';

export const MANUEL_INTERVENTION_CARDS = [
  {
    key: 'ao',
    title: 'Appels d’offres et marchés de travaux',
    body: 'Analyse des DCE, RC, CCTP, CCAP et DPGF. Préparation des mémoires techniques et aide à la décision de candidater.',
  },
  {
    key: 'devis',
    title: 'Devis et chiffrage',
    body: 'Structuration des devis, analyse des prestations et préparation des documents commerciaux.',
  },
  {
    key: 'travaux',
    title: 'Conduite de travaux',
    body: 'Préparation des comptes rendus de chantier, suivi des actions, plannings, réserves et DOE.',
  },
  {
    key: 'gestion',
    title: 'Gestion et direction d’entreprise',
    body: 'Utilisation de l’IA pour simplifier les tâches administratives, commerciales et organisationnelles des PME du BTP.',
  },
  {
    key: 'assistants',
    title: 'Assistants et agents IA',
    body: 'Création d’assistants personnalisés et d’agents adaptés aux documents et procédures de l’entreprise.',
  },
  {
    key: 'auto',
    title: 'Automatisation et outils métier',
    body: 'Identification des tâches répétitives, automatisation des processus et création d’applications métier assistée par l’IA.',
  },
] as const;

export const MANUEL_OUTILS_IA = [
  { label: 'ChatGPT', hint: 'Usages métier et prompts structurés (méthode CRAFT).' },
  { label: 'Claude AI', hint: 'Analyse documentaire, rédaction et projets avancés.' },
] as const;

export const MANUEL_PEDAGOGIE = [
  'Cas pratiques issus du bâtiment et des travaux publics.',
  '70 % de pratique en session.',
  'Utilisation de documents métier (devis, DCE, comptes rendus).',
  'Exercices adaptés aux fonctions des participants.',
  'Méthodes et prompts réutilisables après la formation.',
  'Protection des données confidentielles.',
  'Vérification humaine des productions IA.',
] as const;

export const MANUEL_PUBLIC_CIBLE = [
  'Dirigeants de PME du BTP',
  'Conducteurs de travaux',
  'Chargés d’affaires',
  'Chefs de chantier',
  'Responsables études de prix',
  'Assistantes de gestion',
  'Responsables administratifs',
  'Équipes de maîtrise d’œuvre',
  'Référents IA',
] as const;

export const MANUEL_MAILLAGE = [
  { href: LINKS.formateurs, label: 'Nos formateurs' },
  { href: LINKS.formations, label: 'Catalogue des formations IA BTP' },
  { href: LINKS.parcoursDirigeantPmeBtp, label: 'Parcours dirigeant' },
  { href: LINKS.parcoursConducteurDeTravaux, label: 'Parcours conducteur de travaux' },
  { href: LINKS.parcoursChargeAffairesBtp, label: 'Parcours chargé d’affaires' },
  { href: LINKS.ressources, label: 'Guides IA BTP' },
  { href: LINKS.formationIaAppelsOffresBtp, label: 'Ressources appels d’offres' },
  { href: LINKS.financement, label: 'Financement Constructys' },
] as const;

const TARIF_PAR_NIVEAU: Record<FormationNiveau, number> = {
  1: TARIF_PARTICIPANT_NIV01_HT,
  2: TARIF_PARTICIPANT_NIV02_HT,
  3: TARIF_PARTICIPANT_NIV10_14H_HT,
};

export function manuelFormationsNiveauResume(niveau: FormationNiveau): string {
  const def = FORMATIONS_NIVEAUX_IA.find((n) => n.niveau === niveau);
  const duree = def?.accueilDuree ?? (niveau === 3 ? '14 h' : '4 h');
  return `${formationNiveauOfficielLabel(niveau)} — ${duree} — ${TARIF_PAR_NIVEAU[niveau]} € HT / participant`;
}

export const MANUEL_FORMATIONS_INTRO =
  'Manuel Gomez intervient sur l’ensemble des formations en intelligence artificielle appliquée au BTP proposées par notre organisme, du niveau débutant au niveau approfondi (catalogue publié).';

export function getManuelGomezFaqItems(): readonly FAQItem[] {
  return [
    {
      q: 'Qui est Manuel Gomez ?',
      a: `${MANUEL_PARCOURS_VALIDE_COURT} Il intervient auprès des dirigeants et collaborateurs des PME du BTP en Île-de-France.`,
    },
    {
      q: 'Quelles formations dispense Manuel Gomez ?',
      a: 'Manuel Gomez anime l’ensemble des formations IA BTP du catalogue publié par OFC : initiation (niveau 1), perfectionnement métier (niveau 2), assistants IA, agents IA, automatisation et création d’outils (niveau 3).',
    },
    {
      q: 'Peut-il former les conducteurs de travaux ?',
      a: 'Oui. Les formations destinées aux conducteurs de travaux abordent notamment les comptes rendus de chantier, l’analyse des documents contractuels, les plannings, le suivi des réserves et les DOE.',
    },
    {
      q: 'Intervient-il sur les appels d’offres BTP ?',
      a: 'Oui. Les formations consacrées aux appels d’offres abordent l’analyse des DCE, CCTP, CCAP et DPGF ainsi que la préparation des mémoires techniques avec l’assistance de l’IA.',
    },
    {
      q: 'Propose-t-il des formations sur les agents IA ?',
      a: 'Oui. Il intervient sur les formations approfondies consacrées aux agents IA, aux assistants personnalisés et à l’automatisation des processus métier.',
    },
    {
      q: 'Où se déroulent ses formations ?',
      a: 'Les formations se déroulent en présentiel en Île-de-France, en inter-entreprises et en intra-entreprise dans les locaux de l’entreprise.',
    },
    {
      q: 'Quel est le prix des formations ?',
      a: `Les tarifs dépendent du niveau : ${TARIF_PARTICIPANT_NIV01_HT} € HT / participant (niveau 1), ${TARIF_PARTICIPANT_NIV02_HT} € HT (niveau 2) et ${TARIF_PARTICIPANT_NIV10_14H_HT} € HT (niveau 3 — 14 h). Voir le catalogue pour le détail par fiche.`,
    },
    {
      q: 'Les formations peuvent-elles être prises en charge par Constructys ?',
      a: `${FINANCEMENT_FORMULATION_PRUDENTE} Voir le <a href="${LINKS.financement}">guide financement Constructys</a>.`,
    },
    {
      q: 'Quel organisme organise les formations ?',
      a: 'Les formations sont organisées par OFC Création d’Entreprise, dont Laure Olivié est la marque commerciale. L’organisme est certifié Qualiopi au titre des actions de formation.',
    },
  ];
}