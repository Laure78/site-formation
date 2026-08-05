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
    'Vous assemblez un DOE (Dossier des Ouvrages Exécutés) sur une structure standardisée, chantier par chantier.',
    'Le tuto vise une constitution en environ 30 minutes, contre l’équivalent de deux week-ends de montage manuel.',
    'Outil : skill Claude dédié au DOE.',
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
  'tuto-dispatch-btp': [
    'Dispatch relie votre téléphone au PC : vous dictez depuis le chantier, Claude poursuit le travail bureau (devis, mails, CR, feuilles d’heures).',
    'Installation indiquée en environ 5 minutes ; le tuto estime 2 à 4 heures de paperasse évitées par jour en usage régulier.',
    'Outil : Claude Dispatch (plans payants Anthropic), pas un skill fichier .md.',
  ],
};

export function getTutoEnBref(slug: string): readonly string[] | null {
  return TUTO_EN_BREF[slug] ?? null;
}
