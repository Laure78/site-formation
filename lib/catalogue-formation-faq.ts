/**
 * FAQ « noyau » des fiches formation catalogue — source unique (HTML + JSON-LD).
 * Complétée par des questions spécifiques passées en second argument.
 */
import {
  formationHref,
  getFormationByCode,
  libelleDureeFormation,
  libelleEffectifFormation,
  type FormationCode,
} from '@/data/formations';
import type { FAQItem } from '@/lib/faq';
import { getInfosPratiquesForCatalogue } from '@/lib/infos-pratiques-catalogue';
import { LINKS } from '@/lib/internal-links';
import { MODALITE_PEDAGOGIQUE_CATALOGUE } from '@/lib/infos-pratiques-catalogue';
import { MENTIONS_TVA_REGIMES_COURT } from '@/lib/tarifs-sessions';
import { trainingDevisHref } from '@/lib/training-page-helpers';

const CORE_QUESTION_MARKERS = [
  'usages métier',
  'prérequis',
  'durée de la formation',
  'quel est le tarif',
  'quel est son tarif',
  'devis ou s’inscrire',
  "devis ou s'inscrire",
] as const;

function normalizeQuestion(q: string): string {
  return q
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isCoreFaqQuestion(q: string): boolean {
  const n = normalizeQuestion(q);
  return CORE_QUESTION_MARKERS.some((marker) => n.includes(marker));
}

/** Questions communes en tête de fiche — données depuis `data/formations` et infos pratiques. */
export function buildCatalogueFormationCoreFaq(ref: string): FAQItem[] {
  const formation = getFormationByCode(ref);
  if (!formation) return [];

  const infos = getInfosPratiquesForCatalogue(ref);
  const ficheHref = formationHref(formation);
  const devisHref = trainingDevisHref(formation.titre);
  const usagesListe = formation.casUsageCourts.join(', ');
  const effectif = libelleEffectifFormation(formation);
  const dureeCourte = libelleDureeFormation(formation);

  return [
    {
      q: 'Quels usages métier sont travaillés ?',
      a: `Cette session « ${formation.titre} » travaille ${usagesListe.toLowerCase()} — au-delà des cas affichés sur la fiche : ${formation.casUsage}. Les ateliers s’appuient sur des documents BTP réels (devis, DCE, CCTP, comptes rendus de chantier, mémoires techniques ou assistants métier selon le programme), avec relecture humaine avant envoi. Voir le <a href="${ficheHref}#programme">programme détaillé</a> et le PDF du programme sur la fiche.`,
    },
    {
      q: 'Quels sont les prérequis ?',
      a: `${infos.prerequis} Public visé : ${formation.public}. Un questionnaire de positionnement peut être envoyé avant la session pour adapter le rythme du groupe.`,
    },
    {
      q: 'Quelle est la durée de la formation ?',
      a: `La formation dure ${infos.duree} (${dureeCourte} sur la fiche), pour ${effectif}, en ${MODALITE_PEDAGOGIQUE_CATALOGUE.toLowerCase()}.`,
    },
    {
      q: 'Quel est le tarif ?',
      a: `${infos.tarif} ${MENTIONS_TVA_REGIMES_COURT} Une prise en charge OPCO/Constructys est possible selon éligibilité — voir <a href="${LINKS.financement}">financement formation IA BTP</a>.`,
    },
    {
      q: 'Comment demander un devis ou s’inscrire ?',
      a: `Pour cadrer votre besoin : <a href="${LINKS.prendreRdv}">réserver une visio découverte gratuite</a>. Pour un devis intra ou une session sur mesure : <a href="${devisHref}">demander un devis</a> ou écrire via la <a href="${LINKS.contact}">page contact</a> (objet inscription ou devis). Les dates inter-entreprises ouvertes, le cas échéant, sont indiquées sur la fiche ; inscription par contact en précisant la formation « ${formation.titre} ».`,
    },
  ];
}

/** Fusionne le noyau et les FAQ métier, sans doublon sur les cinq questions communes. */
export function mergeCatalogueFormationFaq(
  ref: FormationCode | string,
  supplemental: readonly FAQItem[] = [],
): FAQItem[] {
  const core = buildCatalogueFormationCoreFaq(ref);
  if (core.length === 0) return [...supplemental];
  const filtered = supplemental.filter((item) => !isCoreFaqQuestion(item.q));
  return [...core, ...filtered];
}
