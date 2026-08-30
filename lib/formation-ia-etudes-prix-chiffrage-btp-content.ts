/**
 * Landing `/formations/ia-etudes-prix-chiffrage-btp` — études de prix, métrés et chiffrage BTP.
 * Entrée thématique complémentaire ; fiche Qualiopi catalogue : NIV-02.
 */
import { LINKS } from '@/lib/internal-links';
import { SESSION_DUREE_LIBELLE, libelleTarifsDualCourt } from '@/lib/tarifs-sessions';
import type { FAQItem } from '@/lib/faq';

export const ETUDES_PRIX_CHIFFRAGE_PATH = LINKS.formationIaEtudesPrixChiffrageBtp;

export const ETUDES_PRIX_SEO = {
  title: 'Formation IA études de prix BTP',
  description:
    'Formation IA études de prix et chiffrage BTP : DPGF, DQE, métrés, BPU. L’IA assiste, vous validez. Présentiel IDF, Qualiopi, financement OPCO possible.',
  h1: 'Formation IA pour les études de prix et le chiffrage BTP',
  openGraphTitle: 'Formation IA études de prix BTP — DPGF, métrés, chiffrage',
} as const;

export const ETUDES_PRIX_EN_BREF = [
  `Session ${SESSION_DUREE_LIBELLE} en présentiel en Île-de-France : ChatGPT et Claude pour structurer métrés, quantitatifs, contrôles DPGF/DQE et vérification de bordereaux BPU.`,
  'L’IA accélère la mise en forme, la relecture croisée et la détection d’incohérences — vous validez unités, ratios et sous-détail de prix avant diffusion.',
  `Organisme certifié Qualiopi — ${libelleTarifsDualCourt(4)} — financement OPCO possible selon éligibilité.`,
] as const;

export const ETUDES_PRIX_CAS_USAGE = [
  {
    titre: 'Croiser CCTP et DPGF',
    desc: 'Repérer oublis, doublons et postes sensibles avant chiffrage ou contrôle MOE.',
  },
  {
    titre: 'Structurer une minute de métré',
    desc: 'Partir de notes terrain pour produire un quantitatif provisoire avec hypothèses à confirmer.',
  },
  {
    titre: 'Contrôler un bordereau BPU',
    desc: 'Vérifier cohérence libellés, unités et ratios matière/main-d’œuvre avant chiffrage.',
  },
  {
    titre: 'Préparer une synthèse DQE',
    desc: 'Produire une note de ratio et d’écarts pour réunion interne — validation humaine obligatoire.',
  },
] as const;

export const ETUDES_PRIX_FAQ: readonly FAQItem[] = [
  {
    q: 'L’IA peut-elle chiffrer ou métrer à ma place ?',
    a: 'Non. L’IA structure des minutes de métré, des quantitatifs et des tableaux de contrôle — les quantités définitives, les unités et les prix restent sous votre responsabilité après relevé et validation métier.',
  },
  {
    q: 'Quelle formation catalogue correspond aux études de prix ?',
    a: `La fiche Qualiopi <a href="${LINKS.formationAO}">L&apos;IA appliquée aux appels d&apos;offres BTP (NIV-02)</a> couvre l&apos;analyse DCE, le chiffrage assisté et le mémoire technique — module chiffrage inclus.`,
  },
  {
    q: 'Faut-il déjà utiliser ChatGPT ou Claude ?',
    a: 'Non. La formation part de zéro, sans code. Vous repartez avec des prompts réutilisables sur vos dossiers réels (AO, études, contrôles internes).',
  },
  {
    q: 'Financement OPCO / Constructys possible ?',
    a: `Financement OPCO possible selon éligibilité (organisme certifié Qualiopi). Détails sur la page <a href="${LINKS.financement}">financement Constructys formation IA BTP</a>.`,
  },
];

export const ETUDES_PRIX_MAILLAGE = [
  { href: LINKS.formationAO, label: 'Formation NIV-02 — appels d’offres et chiffrage BTP' },
  { href: LINKS.formationIaMetreurEconomisteConstruction, label: 'Landing métreur-économiste BTP' },
  { href: LINKS.guideRepondreAoBtpOfc2026, label: 'Guide répondre aux AO BTP (PDF 2026)' },
  { href: LINKS.financement, label: 'Financement Constructys formation IA BTP' },
] as const;
