/**
 * GEO — phrases autonomes en tête des sections H2 (fiches parcours).
 */
import type { ParcoursId } from '@/data/catalogue-2027';
import type { ParcoursComputed } from '@/data/catalogue-2027/parcours';
import { libelleDureeParcoursHeures } from '@/data/catalogue-2027/parcours';
import {
  libellePrixModuleInter,
  libellePrixParcoursCompletInter,
  PARCOURS_TARIF_INTER_CALCULE_MENTION,
} from '@/lib/catalogue-2027/parcours-affichage';
import { getModuleByCode } from '@/data/catalogue-2027';
import { PARCOURS_DISPONIBILITE_LIBELLE, PARCOURS_MODALITE_GEO } from '@/lib/catalogue-2027/parcours-commercial-copy';

export type ParcoursGeoSectionKey = 'apprendre' | 'programme' | 'prerequis' | 'financement';

const APPRENDRE: Record<ParcoursId, string> = {
  'dirigeant-pme-btp':
    'Ce parcours s’adresse aux dirigeants et associés de PME du bâtiment qui veulent utiliser l’IA pour le pilotage financier et le déploiement des outils. Vous travaillez sur marges, trésorerie, prix et règles d’usage — toujours avec validation humaine des chiffres et engagements.',
  'charge-affaires-btp':
    'Le parcours chargé d’affaires cible les professionnels du chiffrage et de la réponse aux marchés : devis structurés, analyse de DCE, mémoire technique et suivi d’avenants. L’IA accélère la synthèse documentaire ; vous conservez le contrôle des montants et des engagements.',
  'conducteur-de-travaux':
    'Conducteurs de travaux, aides-conducteurs et chefs de chantier en évolution : vous apprenez à préparer l’opération, tenir le planning, rédiger des comptes rendus et sécuriser la réception. Les modules s’appuient sur des documents chantier anonymisés.',
  'assistant-de-gestion-btp':
    'Assistants de gestion, comptables et fonctions support : ce parcours couvre facturation, relances, organisation des dossiers et tableaux de suivi avec l’IA. Les livrables sont réutilisables dans votre PME — sans automatiser les validations comptables ou fiscales.',
  'referent-ia-btp':
    'Référents IA, dirigeants et profils métier chargés du déploiement : vous structurez les usages, travaillez avec Claude et ChatGPT, et pouvez aller jusqu’à un prototype d’application métier. Le parcours inclut gouvernance et plan de déploiement sur 90 jours.',
  'maitre-oeuvre':
    'Maîtres d’œuvre, MOEX et OPC : vous enchaînez initiation IA, usages MOE documentaires, Claude et assistants personnalisés. Les exercices portent sur des dossiers anonymisés — validation humaine sur chaque acte.',
  'amo-btp':
    'AMO, MOA et chargés de mission : initiation IA, module assistance à maîtrise d’ouvrage puis analyse d’appels d’offres. L’IA accélère synthèses et structuration ; vous gardez le contrôle des engagements MOA.',
};

const PREREQUIS: Record<ParcoursId, string> = {
  'dirigeant-pme-btp':
    'Public : dirigeants, associés, repreneurs. Prérequis : responsabilité de direction ou projet de reprise en BTP. Tarif parcours complet et tarifs unitaires par module, selon la grille inter 2027.',
  'charge-affaires-btp':
    'Public : chargés d’affaires, économistes, commerciaux BTP. Prérequis : pratique du chiffrage ou de la consultation. Formation en présentiel Île-de-France — modules de 4 h à 14 h selon le code catalogue.',
  'conducteur-de-travaux':
    'Public : conducteurs, aides-conducteurs, chefs de chantier. Prérequis selon module (souvent NUM-01 ou niveau équivalent pour les usages IA). Tarifs unitaires visibles sur chaque carte module.',
  'assistant-de-gestion-btp':
    'Public : assistants de gestion, comptables, support chantier. Prérequis : gestion courante d’une PME du bâtiment. Possibilité de ne suivre qu’un module administratif ou facturation.',
  'referent-ia-btp':
    'Public : référents IA, dirigeants, profils en charge du déploiement. Prérequis catalogue : NUM-01 ou niveau équivalent pour aborder Claude et les usages avancés.',
  'maitre-oeuvre':
    'Public : MOE, MOEX, OPC. Prérequis : expérience dossier chantier ; NUM-01 en entrée. Quatre modules de 4 h — parcours complet 630 € HT / participant (inter).',
  'amo-btp':
    'Public : AMO, MOA, pilotage opération. Prérequis : exposition aux dossiers MOA. Trois modules de 4 h — parcours complet 460 € HT / participant (inter).',
};

const FINANCEMENT: Record<ParcoursId, string> = {
  'dirigeant-pme-btp':
    'Le parcours peut être financé module par module selon l’éligibilité OPCO ; l’intra-entreprise est sur devis. OFC Création d’Entreprise, organisme certifié Qualiopi, dispense les sessions en présentiel.',
  'charge-affaires-btp':
    'Inter ou intra en Île-de-France : calendrier confirmé après étude de votre demande. Une prise en charge Constructys peut être étudiée selon vos critères — sans garantie de remboursement.',
  'conducteur-de-travaux':
    'Parcours complet ou modules à la carte : tarifs HT / participant sur chaque carte. Adaptation intra possible (ordre des modules, documents d’entreprise, effectif) — sur devis.',
  'assistant-de-gestion-btp':
    'Formation non certifiante : attestation de fin de formation et certificat de réalisation. Tarif parcours (somme des modules) et prix unitaires ; pas de session datée affichée sans confirmation écrite.',
  'referent-ia-btp':
    'Le module NUM-04 (14 h) suit les règles tarifaires du niveau 3 du catalogue. Déploiement IA et gouvernance peuvent être regroupés en intra sur devis.',
  'maitre-oeuvre':
    'Modules MOE (NUM-08), Claude (NUM-03) et assistants (NUM-09) sont éligibles selon critères OPCO ; intra sur devis en Île-de-France.',
  'amo-btp':
    'Modules AMO (NUM-10) et appels d’offres (NUM-02) à la carte ou parcours complet ; prise en charge Constructys possible selon éligibilité, sans garantie.',
};

export function getParcoursGeoIntro(
  parcoursId: ParcoursId,
  section: ParcoursGeoSectionKey,
  computed?: ParcoursComputed,
): string {
  if (section === 'apprendre') return APPRENDRE[parcoursId];
  if (section === 'prerequis') return PREREQUIS[parcoursId];
  if (section === 'financement') return FINANCEMENT[parcoursId];
  if (section === 'programme' && computed) {
    const duree = libelleDureeParcoursHeures(computed.dureeHeures);
    const sample = computed.etapes
      .slice(0, 2)
      .map((e) => {
        const m = getModuleByCode(e.moduleCode);
        return m ? `${m.code} (${libellePrixModuleInter(m)})` : e.moduleCode;
      })
      .join(', ');
    const tarif = libellePrixParcoursCompletInter(computed);
    return `${PARCOURS_DISPONIBILITE_LIBELLE}. ${computed.moduleCount} modules, ${duree}, parcours complet ${tarif} — ${PARCOURS_MODALITE_GEO}. ${PARCOURS_TARIF_INTER_CALCULE_MENTION} Exemples de modules : ${sample}${computed.moduleCount > 2 ? ', etc.' : ''}. Chaque module peut être choisi indépendamment, sous réserve des prérequis.`;
  }
  return APPRENDRE[parcoursId];
}

export const PARCOURS_METIERS_HUB_GEO = {
  modularite:
    'Les parcours regroupent des modules du catalogue : durée totale, tarif inter du parcours complet (somme des modules obligatoires) et prix unitaire par module. Vous pouvez suivre le parcours complet, un module seul ou un programme personnalisé, sous réserve des prérequis. Présentiel en Île-de-France ; ouverture commerciale des parcours en 2027, modules unitaires programmables selon calendrier.',
  grid:
    'Sept parcours métiers couvrent la direction, l’affaires, la conduite de travaux, la maîtrise d’œuvre, l’AMO, la gestion et le référent IA. Chaque fiche affiche la durée totale, le tarif inter du parcours complet (somme des modules obligatoires) et le prix unitaire de chaque module.',
  casUsage:
    'Les exercices s’appuient sur des documents BTP courants : DCE, devis, comptes rendus, DOE. L’IA aide à structurer et synthétiser ; la validation métier reste humaine.',
  modalites:
    'Formations en présentiel en Île-de-France, inter-entreprises ou intra dans vos locaux. Ouverture commerciale des parcours et modules en 2027 ; inscription après devis ou prise de contact.',
} as const;
