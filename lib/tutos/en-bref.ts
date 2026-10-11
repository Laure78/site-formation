/**
 * Textes « En bref » des tutos `/ressources/[slug]` — faits tirés du contenu de chaque PDF/page.
 * Pas de survente : livrable + gain chiffré annoncé dans le tuto + outil.
 */
export const TUTO_EN_BREF: Readonly<Record<string, readonly string[]>> = {
  'tuto-memoire-technique': [
    'Ce tuto vous fait créer un skill Claude qui produit un premier jet de mémoire technique sur votre trame (entreprise, références, méthodologie, QSE).',
    'Selon le guide, un skill bien calé divise le temps de rédaction par environ 5 ; la création du skill prend 30 à 45 minutes la première fois.',
    'Vous relisez et validez le fond avant tout dépôt d’offre.',
  ],
  'tuto-analyse-dce': [
    'Vous obtenez une fiche d’analyse standardisée d’un DCE (CCAP, CCTP, RC, DPGF) pour prioriser la lecture et préparer un Go / No-Go.',
    'Le tuto annonce une fiche en environ 3 minutes, contre une lecture brute de l’ordre de 4 heures.',
    'Outil : skill Claude (abonnement Pro requis pour les skills).',
  ],
  'tuto-skill-analyse-ccap-ofc': [
    'Vous créez un skill Claude qui analyse un CCAP : 9 familles de clauses, impact chiffré et niveaux vert / orange / rouge.',
    'Le tuto vise environ 20 minutes par CCAP, contre 2 à 3 heures de lecture manuelle.',
    'Outil : skill Claude — vous validez le verdict Go / No Go avant toute signature.',
  ],
  'tuto-skill-analyse-cctp-ofc': [
    'Vous créez un skill Claude qui dépouille un CCTP : exigences avec n° d’article, prescriptions produit, normes, points d’arrêt et croisement DPGF.',
    'Le tuto vise environ 20 minutes de dépouillement par CCTP, contre une lecture en diagonale sur des dizaines de pages.',
    'Outil : skill Claude — vous relisez les lignes qui engagent avant remise ou signature.',
  ],
  'tuto-skill-metre-excel-ofc': [
    'Vous créez un skill Claude qui produit un classeur Excel de métré : formules visibles, onglets par lot, récap DPGF et points à vérifier.',
    'Le tuto vise environ 45 minutes par dossier (contrôle compris), contre 1 à 2 jours de métré manuel.',
    'Outil : skill Claude Pro avec exécution de code — vous signez les quantités après relecture métier.',
  ],
  'tuto-skill-chiffrage-devis-ofc': [
    'Vous créez un skill Claude qui transforme un métré en devis Word chiffré + Excel de calcul (BPU, coefficients, TVA différenciée).',
    'Le tuto vise environ 30 minutes par devis, contre 3 heures de chiffrage et mise en page manuels.',
    'Outil : skill Claude avec exécution de code — vous validez le positionnement prix avant envoi client.',
  ],
  'tuto-tri-dce-claude-chrome': [
    'Claude in Chrome scanne les plateformes (ex. BOAMP) selon vos critères de zone, métier, montant et délai, puis liste les fiches utiles.',
    'Objectif du tuto : recevoir 3 à 5 DCE pertinents plutôt que filtrer des dizaines d’avis, avec un gain indiqué de 3 à 4 heures par semaine.',
    'Outil : extension Claude in Chrome (navigation assistée), distincte d’un skill document.',
  ],
  'tuto-cr-chantier': [
    'Le skill transforme une dictée ou des notes de réunion en compte rendu de chantier structuré, prêt à relire.',
    'Gain annoncé : environ 5 minutes de production, au lieu d’environ 45 minutes de rédaction manuelle.',
    'Outil : skill Claude, à lancer après la visite ou la réunion.',
  ],
  'tuto-doe-dossier-ouvrages-executes': [
    'Le DOE (Dossier des Ouvrages Exécutés) rassemble les pièces qui décrivent l’ouvrage réellement construit : plans conformes, fiches, PV, notices et garanties.',
    'Il se remet généralement à la réception des travaux, souvent comme condition de solde et de clôture du chantier.',
    'Cette page propose un modèle de sommaire gratuit, des exemples par lot, une méthode IA pour assembler le dossier, et le PDF à télécharger.',
  ],
  'tuto-skill-diuo-ofc': [
    'Vous préparez la liasse de pièces DIUO à transmettre au coordonnateur SPS (plans, sécurité permanente, accès, notices).',
    'Le tuto vise environ 30 minutes, contre une demi-journée de course aux pièces avant réception.',
    'Outil : skill Claude ; le DIUO reste élaboré et signé par le SPS.',
  ],
  'tuto-skill-memoire-reclamation-bework': [
    'Vous créez un skill Claude qui structure un mémoire de réclamation (faits, fondement CCAG art. 55, chiffrage, demande).',
    'Le tuto vise environ 45 minutes pour monter une réclamation solide, contre une journée manuelle ; le délai de 30 jours reste critique.',
    'Outil : skill Claude ; relecture humaine obligatoire avant transmission au maître d’ouvrage.',
  ],
  'tuto-skill-recouvrement-rg-ofc': [
    'Vous créez un skill Claude qui rédige mises en demeure, demandes de garantie de paiement (art. 1799-1) et libération de retenue de garantie.',
    'Le tuto vise environ 15 minutes pour un dossier de relance argumenté, contre une demi-journée manuelle.',
    'Outil : skill Claude ; distinction privé / public et relecture avant envoi en recommandé.',
  ],
  'tuto-skill-planning-ofc': [
    'Vous créez un skill Claude qui lit votre planning, identifie le chemin critique et recale les phases après un aléa.',
    'Le tuto vise environ 30 minutes de recalage, contre environ 5 heures manuelles, avec note d’impact et Excel.',
    'Outil : skill Claude ; vous validez dates et clauses avant envoi à la MOA / au MOE.',
  ],
  'tuto-skill-dc4-ofc': [
    'Vous créez un skill Claude qui remplit le DC4 officiel, contrôle la cohérence avec l’acte d’engagement et liste les pièces manquantes.',
    'Le tuto vise environ 12 minutes par DC4, contre environ 2 heures manuelles, avec mail de transmission à l’acheteur.',
    'Outil : skill Claude ; vous contrôlez montants, SIRET et RIB avant signature et envoi.',
  ],
  'tuto-skill-soged-ofc': [
    'Vous créez un skill Claude qui rédige un SOGED à partir de vos ratios, filières et du cadre AGEC / REP Bâtiment / Trackdéchets.',
    'Le tuto vise environ 12 minutes par SOGED, contre environ 3 heures manuelles, avec livrable Word.',
    'Outil : skill Claude ; vous relisez et signez — Trackdéchets reste sur la plateforme officielle.',
  ],
  'tuto-skill-rdv-client-ofc': [
    'Vous créez un skill Claude qui produit brief contact, ordre du jour, questions de découverte et trame de compte rendu.',
    'Le tuto vise environ 15 minutes de préparation par RDV, contre environ 2 heures manuelles.',
    'Outil : skill Claude ; vous validez actions et date de relance avant envoi.',
  ],
  'tuto-pv-levee-reserves': [
    'Le skill rédige un PV de levée de réserves à structure juridique, à partir de vos interventions et références.',
    'Gain annoncé : environ 3 minutes de rédaction assistée, au lieu d’environ 30 minutes.',
    'Outil : skill Claude ; la signature et la validation restent humaines.',
  ],
  'tuto-constat-retard': [
    'Vous produisez un courrier de constat de retard / réserves (ton mesuré, formules utiles, mise en page type Word).',
    'Gain annoncé : environ 8 minutes, au lieu d’environ une heure — ou un courrier jamais envoyé faute de temps.',
    'Outil : skill Claude ; vous vérifiez dates, faits et destinataires avant envoi.',
  ],
  'tuto-ppsps': [
    'Le skill structure un PPSPS (Plan particulier de sécurité et de protection de la santé) sur les chapitres réglementaires attendus.',
    'Gain annoncé : rédaction assistée en environ 30 minutes, au lieu d’environ 2 jours.',
    'Outil : skill Claude ; adaptation chantier par chantier après relecture QSE.',
  ],
  'tuto-duerp': [
    'Vous obtenez un DUERP (Document unique d’évaluation des risques) avec unités de travail BTP, cotations et plan d’actions.',
    'Gain annoncé : environ 30 minutes pour une première version ou une mise à jour, au lieu de plusieurs jours de rédaction manuelle.',
    'Outil : skill Claude ; le contenu signé reste sous la responsabilité du dirigeant.',
  ],
  'tuto-skill-livret-integration-ofc': [
    "Vous créez un skill Claude qui rédige un livret d'intégration BTP (8 blocs : sécurité, EPI, organigramme, parcours J1 / S1 / M1).",
    'Le tuto vise environ 20 minutes, contre deux journées de rédaction manuelle à chaque recrutement.',
    "Outil : skill Claude ; le livret trace l'accueil sécurité, il ne remplace pas la formation pratique obligatoire.",
  ],
  'tuto-dispatch-btp': [
    'Dispatch relie votre téléphone au PC : vous dictez depuis le chantier, Claude poursuit le travail bureau (devis, mails, CR, feuilles d’heures).',
    'Installation indiquée en environ 5 minutes ; le tuto estime 2 à 4 heures de paperasse évitées par jour en usage régulier.',
    'Outil : Claude Dispatch (plans payants Anthropic), pas un skill fichier .md.',
  ],
};

export function getTutoEnBref(slug: string): readonly string[] | null {
  return TUTO_EN_BREF[slug] ?? null;
}
