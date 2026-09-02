/**
 * Données « Informations pratiques » — 5 parcours catalogue (Indicateur 1 Qualiopi).
 * Source : `data/formations.ts`, `config/qualiopi.ts`, programmes des fiches catalogue.
 */

import { getFormationByCode, type FormationCode } from '@/data/formations';
import {
  QUALIOPI_DELAI_ACCES_EXACT,
  QUALIOPI_MODALITES_ACCES_EXACT,
} from '@/config/qualiopi';
import {
  QUALIOPI_EVALUATION_STANDARD,
  QUALIOPI_METHODES_STANDARD,
} from '@/lib/qualiopi-info';
import { getFormationCatalogueByRef } from '@/lib/formations-catalogue-display';
import type { InfosPratiquesFormation } from '@/lib/infos-pratiques-types';
import { assertInfosPratiquesCompletes } from '@/lib/assert-infos-pratiques';
import { libelleTarifsCarteCatalogue, parseDureeHeures, MENTIONS_TVA_INTRA_COURTE, PREREQUIS_NIVEAU_2 } from '@/lib/tarifs-sessions';
import { libelleTarifApplicationMetierBtp } from '@/lib/tarifs-applications-metier-btp';

/** Modalité pédagogique fixe — toutes les actions catalogue OFC. */
export const MODALITE_PEDAGOGIQUE_CATALOGUE =
  'Présentiel — Île-de-France uniquement (intra-entreprise, dans vos locaux)' as const;

/** Encart accessibilité handicap — texte réglementaire affiché dans le composant. */
export const INFOS_PRATIQUES_HANDICAP_ENCART =
  "Chaque besoin d'aménagement est étudié au cas par cas. Laure Olivié, référente handicap, étudie avec vous les adaptations possibles (matériel, rythme, supports, accès aux locaux) avant l'entrée en formation. Aucune solution n'est garantie avant cette étude. Contact : 06 95 66 18 18 — laureolivie@yahoo.fr";

/** Grandes parties du programme — titres modules (fiches catalogue). */
export const PROGRAMME_CONTENU_CATALOGUE: Record<FormationCode, readonly string[]> = {
  'NIV-01': [
    'Module 1 — Les fondamentaux de l’IA pour le BTP',
    'Module 2 — Devis et chiffrage assistés par l’IA',
    'Module 3 — Documents réglementaires et gestion de chantier avec l’IA',
    'Module 4 — Communication digitale et visibilité du professionnel BTP',
  ],
  'NIV-02': [
    'Accueil, cadrage et positionnement (15 min)',
    'Module 1 — Paramétrage de Claude AI Pro et de Cowork',
    'Module 2 — Analyse express de DCE avec Cowork',
    'Module 3 — Rédiger son mémoire technique avec Cowork',
    'Bilan, plan d\'action et clôture (15 min)',
  ],
  'NIV-03': [
    'Module 1 — Installation & démarrage de chantier',
    'Module 2 — Sécurité de chantier',
    'Module 3 — Gestion de chantier',
    'Module 4 — Administratif de suivi de chantier',
  ],
  'NIV-04': [
    'Accueil, cadrage et positionnement (10 min)',
    "Module 1 — Projets et skills : structurer Claude pour l'entreprise",
    'Module 2 — Cowork : déléguer la production documentaire',
    'Module 3 — Connecteurs : relier Claude à ses outils',
    'Module 4 — Claude Code : automatiser ses tâches',
    "Bilan, plan d'action et clôture (10 min)",
  ],
  'NIV-05': [
    'Accueil et positionnement (5 min)',
    "Module 0 — Introduction à Claude, l'écosystème Anthropic",
    "Module 1 — Analyse des offres et conformité avec l'IA",
    'Module 2 — Comptes rendus de chantier en 10 minutes',
    'Module 3 — Courriers, ordres de service et actes administratifs',
    'Module 4 — Réserves, réception et suivi client',
    "Bilan, plan d'action et clôture (5 min)",
  ],
  'NIV-06': [
    'Module 1 — Identifier un problème métier à digitaliser (45 min)',
    'Module 2 — Transformer le problème en cahier des charges (1 h)',
    'Module 3 — Comprendre le fonctionnement d’une application web (1 h)',
    'Module 4 — Concevoir l’interface (1 h 30)',
    'Module 5 — Construire les premières fonctionnalités (1 h 30)',
    'Module 6 — Tester et améliorer le prototype (1 h 15)',
  ],
  'NIV-07': [
    'Module 1 — Structurer une base de données métier (1 h 15)',
    'Module 2 — Gérer les utilisateurs et les accès (1 h)',
    'Module 3 — Construire un workflow métier (1 h)',
    'Module 4 — Connecter des services externes (1 h 15)',
    'Module 5 — Automatiser les actions répétitives (1 h)',
    'Module 6 — Générer et gérer des documents (1 h)',
    'Module 7 — Tester et sécuriser (30 min)',
  ],
  'NIV-08': [
    'Module 1 — Structurer une application métier avancée (1 h)',
    'Module 2 — Intégrer une intelligence artificielle (1 h 15)',
    'Module 3 — Exploiter des documents métier (1 h 15)',
    'Module 4 — Construire un workflow IA (1 h)',
    'Module 5 — Automatiser un processus complet (1 h)',
    'Module 6 — Fiabiliser et sécuriser (1 h)',
    'Module 7 — Déployer et maintenir (30 min)',
  ],
};

const PREREQUIS_NIV01 =
  'Savoir utiliser un ordinateur et un smartphone. Bonne maîtrise du français écrit et oral. Aucun prérequis IA ni abonnement payant : les versions gratuites suffisent. Un compte payant (Claude Pro, ChatGPT Plus) est seulement recommandé pour aller plus loin ensuite.';

const MODALITES_ACCES_NIV01 =
  "Inscription sur demande auprès d'OFC (laureolivie@yahoo.fr — 06 95 66 18 18) : analyse du besoin → acceptation du devis → signature de la convention de formation → demande de prise en charge OPCO → convocation. Un questionnaire de positionnement est adressé à chaque participant avant la session.";

const DELAI_ACCES_NIV01 =
  "Inscription jusqu'à 15 jours calendaires avant le démarrage, sous réserve des disponibilités de la formatrice et du client. Ce délai correspond au minimum exigé par les OPCO pour l'instruction d'une demande de prise en charge. Le délai exact est confirmé lors de la demande de formation.";

export const MODALITE_PEDAGOGIQUE_NIV02 =
  'Action de formation — intra-entreprise — 100 % présentiel — 75 % pratique / 25 % théorie';

export const PREREQUIS_NIV02 =
  "Formation de niveau 2 : bases d'une IA générative acquises, ou avoir suivi la session « L'IA au service des professionnels du BTP » (niveau 1). Abonnement Claude Pro actif (environ 18 € HT / mois, à la charge de l'entreprise) avec Cowork installé. Chaque participant apporte un DCE complet récent (RC + CCAP + CCTP) et 2 à 3 mémoires techniques de son entreprise.";

export const MODALITES_ACCES_NIV02 =
  "Inscription sur demande auprès d'OFC (laureolivie@yahoo.fr — 06 95 66 18 18) : entretien d'analyse du besoin et vérification des prérequis → devis et programme personnalisé → convention de formation signée → demande de prise en charge OPCO → convocation des participants. Un questionnaire de positionnement est adressé à chaque participant avant la session.";

export const DELAI_ACCES_NIV02 =
  "Inscription jusqu'à 15 jours calendaires avant le démarrage, sous réserve des disponibilités de la formatrice et du client. Ce délai correspond au minimum exigé par les OPCO pour l'instruction d'une demande de prise en charge. Le délai exact est confirmé lors de la demande de formation.";

export const PREREQUIS_NIV03 =
  "Savoir utiliser un ordinateur. Bonne maîtrise du français écrit. Avoir suivi le Niveau 1 ou pratiquer déjà un outil d'IA générative. Compte Claude Pro recommandé.";

export const MODALITE_PEDAGOGIQUE_NIV03 =
  'Action de formation — Présentiel — 70 % pratique / 30 % théorie';

export const DELAI_ACCES_NIV03 =
  "Inscription jusqu'à 7 jours ouvrés avant la session.";

export const PREREQUIS_NIV04 =
  "Formation de niveau avancé : utilisation régulière de Claude déjà acquise. Abonnement Claude Pro actif (environ 18 € HT / mois, à la charge de l'entreprise) avec l'option « Exécution de code » activée. Chaque participant apporte ses propres pièces de chantier (CCTP, CCAP, modèles, dossiers).";

export const MODALITE_PEDAGOGIQUE_NIV04 =
  'Action de formation au sens de l\'art. L6313-1 du Code du travail — 100 % présentiel — intra-entreprise, dans vos locaux — 70 % pratique / 30 % théorie';

export const MODALITES_ACCES_NIV04 =
  "Inscription sur demande auprès d'OFC (laureolivie@yahoo.fr — 06 95 66 18 18) : entretien d'analyse du besoin et vérification des prérequis → devis et programme personnalisé → convention de formation signée → demande de prise en charge OPCO → convocation des participants. Un recueil des attentes est adressé à chaque participant avant la session.";

export const DELAI_ACCES_NIV04 =
  "Inscription jusqu'à 15 jours calendaires avant le démarrage, sous réserve des disponibilités de la formatrice et du client. Ce délai correspond au minimum exigé par les OPCO pour l'instruction d'une demande de prise en charge. Le délai exact est confirmé lors de la demande de formation.";

export const EVALUATION_NIV04 = [
  'Évaluation en amont : vérification des prérequis, recueil des attentes et auto-positionnement des participants en début de session.',
  'Évaluation des acquis : évaluation continue par mises en situation — chaque participant configure et teste son environnement Claude (Projet, skills, connecteur, automatisme) tout au long de la session, avec validation individuelle par la formatrice.',
  'Auto-positionnement de sortie permettant de mesurer la progression sur chacun des objectifs.',
  'Évaluation de la satisfaction : questionnaire à chaud en fin de session, suivi d\'un questionnaire à froid à J+30.',
  'Feuille d\'émargement signée par demi-journée ; attestation individuelle de fin de formation et certificat de réalisation.',
] as const;

export const PREREQUIS_NIV06 =
  'Aucune compétence préalable en programmation. Une pratique courante de l’intelligence artificielle générative est recommandée. Ordinateur portable avec connexion internet. Jeu de données professionnelles anonymisées recommandé.';

export const MODALITE_PEDAGOGIQUE_NIV06 =
  'Action de formation — 100 % présentiel — intra-entreprise — 70 % pratique / 30 % théorie — développement assisté par l’IA sur le poste du participant';

export const PREREQUIS_NIV07 =
  'Avoir suivi le niveau 1 (applications métier BTP) ou maîtriser les compétences équivalentes : prototype, cahier des charges et premières fonctionnalités. Ordinateur portable avec connexion internet.';

export const MODALITE_PEDAGOGIQUE_NIV07 = MODALITE_PEDAGOGIQUE_NIV06;

export const MODALITES_ACCES_NIV07 = MODALITES_ACCES_NIV04;

export const DELAI_ACCES_NIV07 = DELAI_ACCES_NIV04;

export const PREREQUIS_NIV08 =
  'Être autonome dans la création d’une application simple, comprendre les principales briques techniques, maîtriser le niveau 2 ou disposer d’une expérience équivalente. Ordinateur portable avec connexion internet.';

export const MODALITE_PEDAGOGIQUE_NIV08 = MODALITE_PEDAGOGIQUE_NIV06;

export const MODALITES_ACCES_NIV08 = MODALITES_ACCES_NIV04;

export const DELAI_ACCES_NIV08 = DELAI_ACCES_NIV04;

export const MODALITES_ACCES_NIV06 = MODALITES_ACCES_NIV04;

export const DELAI_ACCES_NIV06 = DELAI_ACCES_NIV04;

export const PREREQUIS_NIV05 =
  "Aisance avec les outils numériques courants — aucun prérequis IA. Abonnements Claude Pro et ChatGPT Plus actifs sur le poste de chaque participant (environ 18 à 20 € HT / mois chacun, à la charge de l'entreprise). Chaque participant apporte ses dossiers techniques, OS, CR et DCE réels.";

export const MODALITE_PEDAGOGIQUE_NIV05 =
  'Action de formation au sens de l\'art. L6313-1 du Code du travail — 100 % présentiel — alternance théorie courte / ateliers pratiques sur cas réels MOE — 70 % pratique / 30 % théorie';

export const MODALITES_ACCES_NIV05 =
  "Inscription sur demande auprès d'OFC (laureolivie@yahoo.fr — 06 95 66 18 18) : entretien d'analyse du besoin et vérification des prérequis → devis et programme personnalisé → convention de formation signée → demande de prise en charge OPCO → convocation des participants. Un recueil des attentes est adressé à chaque participant avant la session.";

export const DELAI_ACCES_NIV05 =
  "Inscription jusqu'à 15 jours calendaires avant le démarrage, sous réserve des disponibilités de la formatrice et du client. Ce délai correspond au minimum exigé par les OPCO pour l'instruction d'une demande de prise en charge. Le délai exact est confirmé lors de la demande de formation.";

export const EVALUATION_NIV05 = [
  'Évaluation en amont : vérification des prérequis et recueil des attentes adressé à chaque participant avant la session, permettant d\'ajuster les cas pratiques aux dossiers apportés.',
  'Auto-positionnement en début et en fin de session afin de mesurer la progression sur chacun des objectifs visés.',
  'Évaluation des acquis : évaluation continue par les exercices pratiques — chaque module génère un livrable exploitable — avec validation individuelle par la formatrice.',
  'Évaluation de la satisfaction : questionnaire à chaud en fin de session, suivi d\'un questionnaire à froid à J+30.',
  'Feuille d\'émargement signée par demi-journée ; attestation individuelle de fin de formation et certificat de réalisation.',
] as const;

export const EVALUATION_NIV03 = [
  'Recueil des attentes et auto-positionnement des participants en début de session.',
  'Évaluation continue par mises en situation : chaque participant crée et teste ses propres skills tout au long de la session.',
  'Questionnaire de satisfaction à chaud remis en fin de formation.',
  'Attestation de fin de formation individuelle et certificat de réalisation remis à chaque participant.',
] as const;

export const EVALUATION_NIV02 = [
  'Évaluation en amont : vérification des prérequis et questionnaire de positionnement adressé à chaque participant avant la session.',
  'Auto-positionnement en début et en fin de session afin de mesurer la progression sur chacun des objectifs visés.',
  'Évaluation des acquis : évaluation continue par les exercices pratiques sur les DCE et mémoires techniques réels des participants, avec validation individuelle par la formatrice.',
  'Évaluation de la satisfaction : questionnaire à chaud en fin de session, suivi d\'un questionnaire à froid à J+30.',
  'Feuille d\'émargement signée par demi-journée ; attestation individuelle de fin de formation et certificat de réalisation.',
] as const;

const EVALUATION_NIV01 = [
  'Questionnaire de positionnement adressé à chaque participant avant la session.',
  'Auto-positionnement en début et en fin de session ; évaluation continue par exercices pratiques et mises en situation.',
  'Questionnaire de satisfaction à chaud en fin de session ; questionnaire à froid à 3 mois.',
  'Feuille d’émargement signée par demi-journée ; attestation de fin de formation et certificat de réalisation.',
] as const;

function stripLabelPrefix(text: string, prefix: RegExp): string {
  return text.replace(prefix, '').trim();
}

/** Évite les termes interdits sur le bloc Informations pratiques (Qualiopi Ind. 1). */
function sanitizeInfosPratiquesText(text: string): string {
  return text
    .replace(/\ben ligne\b/gi, 'sur le site')
    .replace(/\bà distance\b/gi, 'sur site')
    .replace(/\bdistanciel\b/gi, 'présentiel')
    .replace(/\be-learning\b/gi, 'présentiel')
    .replace(/\bMon Compte Formation\b/gi, 'financement professionnel')
    .replace(/\bCPF\b/gi, 'financement professionnel');
}

function libelleDureeInfosPratiques(f: NonNullable<ReturnType<typeof getFormationByCode>>): string {
  let label = f.duree.replace(/\b4 h\b/, '4 heures').replace(/\b(\d+) h\b/, '$1 heures');
  if (f.horaires) {
    const horaires = f.horaires
      .replace(/^matin\s*/i, '')
      .replace(/^\(/, '')
      .replace(/\)$/, '')
      .trim();
    label = label.replace(/\s*matin\s*(\([^)]*\))?/i, '').trim();
    return `${label} (${horaires})`;
  }
  // TODO(NIV-01|02|03|05) : compléter les créneaux horaires dans data/formations.ts (ex. 9h00 – 13h00)
  return label;
}

function prerequisPourRef(ref: FormationCode): string {
  if (ref === 'NIV-01') return PREREQUIS_NIV01;
  if (ref === 'NIV-02') return PREREQUIS_NIV02;
  if (ref === 'NIV-03') return PREREQUIS_NIV03;
  if (ref === 'NIV-04') return PREREQUIS_NIV04;
  if (ref === 'NIV-05') return PREREQUIS_NIV05;
  if (ref === 'NIV-06') return PREREQUIS_NIV06;
  if (ref === 'NIV-07') return PREREQUIS_NIV07;
  if (ref === 'NIV-08') return PREREQUIS_NIV08;
  return PREREQUIS_NIVEAU_2.join(' ');
}

function tarifPourRef(ref: FormationCode): string {
  const formation = getFormationByCode(ref);
  if (formation?.tarifParcoursAppMetier) {
    return `${libelleTarifApplicationMetierBtp(formation.tarifParcoursAppMetier)} ${MENTIONS_TVA_INTRA_COURTE}`;
  }
  const entry = getFormationCatalogueByRef(ref);
  if (!entry) {
    throw new Error(`[getInfosPratiquesForCatalogue] Référence inconnue : ${ref}`);
  }
  const tarifs = libelleTarifsCarteCatalogue(parseDureeHeures(entry.duree));
  return `Intra-entreprise : ${tarifs.intra} (${entry.effectif.toLowerCase()})${tarifs.inter ? ` · Interentreprises : ${tarifs.inter}` : ''}. ${MENTIONS_TVA_INTRA_COURTE}`;
}

export function getInfosPratiquesForCatalogue(ref: string): InfosPratiquesFormation {
  const formation = getFormationByCode(ref);
  const entry = getFormationCatalogueByRef(ref);
  if (!formation || !entry) {
    throw new Error(`[getInfosPratiquesForCatalogue] Référence catalogue inconnue : ${ref}`);
  }
  const code = formation.code as FormationCode;
  const contenu = PROGRAMME_CONTENU_CATALOGUE[code];
  if (!contenu?.length) {
    throw new Error(`[getInfosPratiquesForCatalogue] Contenu programme manquant pour ${ref}`);
  }

  return assertInfosPratiquesCompletes({
    formationTitle: entry.title,
    programmeRef: entry.ref,
    programmeVersion: formation.programmeVersion,
    prerequis: prerequisPourRef(code),
    objectifs: [...entry.objectifs],
    contenu: [...contenu],
    programmePdfUrl: formation.pdfProgramme,
    duree: libelleDureeInfosPratiques(formation),
    modalitesAcces: sanitizeInfosPratiquesText(
      code === 'NIV-01'
        ? MODALITES_ACCES_NIV01
        : code === 'NIV-02'
          ? MODALITES_ACCES_NIV02
          : code === 'NIV-04'
            ? MODALITES_ACCES_NIV04
            : code === 'NIV-06'
              ? MODALITES_ACCES_NIV06
              : code === 'NIV-07'
                ? MODALITES_ACCES_NIV07
                : code === 'NIV-08'
                  ? MODALITES_ACCES_NIV08
            : code === 'NIV-05'
              ? MODALITES_ACCES_NIV05
              : stripLabelPrefix(QUALIOPI_MODALITES_ACCES_EXACT, /^Modalités d'accès\s*:\s*/i)
    ),
    delaiAcces: sanitizeInfosPratiquesText(
      code === 'NIV-01' || code === 'NIV-02' || code === 'NIV-03' || code === 'NIV-04' || code === 'NIV-05' || code === 'NIV-06' || code === 'NIV-07' || code === 'NIV-08'
        ? code === 'NIV-02'
          ? DELAI_ACCES_NIV02
          : code === 'NIV-03'
            ? DELAI_ACCES_NIV03
            : code === 'NIV-04'
              ? DELAI_ACCES_NIV04
              : code === 'NIV-06'
                ? DELAI_ACCES_NIV06
                : code === 'NIV-07'
                  ? DELAI_ACCES_NIV07
                  : code === 'NIV-08'
                    ? DELAI_ACCES_NIV08
              : code === 'NIV-05'
                ? DELAI_ACCES_NIV05
                : DELAI_ACCES_NIV01
        : stripLabelPrefix(QUALIOPI_DELAI_ACCES_EXACT, /^Délai d'accès\s*:\s*/i)
    ),
    tarif: tarifPourRef(code),
    methodes: [...QUALIOPI_METHODES_STANDARD],
    modalitesEvaluation:
      code === 'NIV-01'
        ? [...EVALUATION_NIV01]
        : code === 'NIV-02'
          ? [...EVALUATION_NIV02]
          : code === 'NIV-03'
            ? [...EVALUATION_NIV03]
            : code === 'NIV-04'
              ? [...EVALUATION_NIV04]
              : code === 'NIV-06' || code === 'NIV-07' || code === 'NIV-08'
                ? [...EVALUATION_NIV04]
              : code === 'NIV-05'
                ? [...EVALUATION_NIV05]
                : [...QUALIOPI_EVALUATION_STANDARD],
    modalitePedagogique:
      code === 'NIV-02'
        ? MODALITE_PEDAGOGIQUE_NIV02
        : code === 'NIV-03'
          ? MODALITE_PEDAGOGIQUE_NIV03
          : code === 'NIV-04'
            ? MODALITE_PEDAGOGIQUE_NIV04
            : code === 'NIV-06'
              ? MODALITE_PEDAGOGIQUE_NIV06
              : code === 'NIV-07'
                ? MODALITE_PEDAGOGIQUE_NIV07
                : code === 'NIV-08'
                  ? MODALITE_PEDAGOGIQUE_NIV08
            : code === 'NIV-05'
              ? MODALITE_PEDAGOGIQUE_NIV05
              : MODALITE_PEDAGOGIQUE_CATALOGUE,
    accessibiliteHandicap: INFOS_PRATIQUES_HANDICAP_ENCART,
    dateMaj: formation.programmeUpdatedAt,
  });
}
