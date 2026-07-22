/**
 * Landing `/formation-ia-chef-chantier-tp` — métadonnées, cas d’usage, FAQ, prompts.
 * Cadre OFC Qualiopi · présentiel Île-de-France.
 */
import { LINKS } from '@/lib/internal-links';

export const FORMATION_IA_CHEF_CHANTIER_TP_PATH =
  '/formation-ia-chef-chantier-tp' as const;

export const FORMATION_IA_CHEF_CHANTIER_TP_SEO = {
  title: 'Formation IA Chef Chantier TP Île-de-France',
  description:
    'Formation IA chef de chantier TP : rapports, mails ST, variations CCTP et PPSPS. Présentiel IDF, Qualiopi, Constructys selon éligibilité. Visio découverte.',
  h1: 'Formation IA pour chefs de chantier TP',
} as const;

export const CHEF_CHANTIER_EN_BREF = [
  'Cette formation vous apprend à utiliser ChatGPT et Claude comme assistants opérationnels : rapports d’avancement, coordination sous-traitants, variations CCTP et checklists sécurité.',
  'L’IA ne remplace ni votre autorité de chantier ni les documents réglementaires (PPSPS, plans de prévention) : elle accélère la mise en forme — vous validez avant diffusion.',
  'Sessions en présentiel Île-de-France / Grand Paris, organisme Qualiopi ; financement OPCO Constructys possible selon éligibilité.',
] as const;

export const CHEF_CHANTIER_USE_CASES = [
  {
    title: 'Rapport d’avancement quotidien',
    body: 'Transformer notes terrain (linéaires, m³, équipes, obstacles) en synthèse lisible pour MOA / MOE : avancement vs planning, points à escalader.',
  },
  {
    title: 'Mails de coordination sous-traitants',
    body: 'Relances, demandes d’action, interfaces lots : ton professionnel, dates et responsabilités explicites, prêt à relire et envoyer.',
  },
  {
    title: 'Compte rendu de réunion chantier',
    body: 'Structurer décisions, actions, responsables et échéances à partir de notes ou d’une dictée — relecture humaine avant envoi.',
  },
  {
    title: 'Variation CCTP / demande de prolongation',
    body: 'Brouillon d’analyse technique indicative, calculs à partir de vos PU, courrier factuel — validation direction et BE obligatoires.',
  },
  {
    title: 'Rappels sécurité (complément PPSPS)',
    body: 'Checklist opérationnelle affichable chantier : ne remplace jamais le PPSPS ni le plan de prévention du responsable désigné.',
  },
  {
    title: 'Synthèse d’écarts planning',
    body: 'Comparer situation prévue / réelle, formuler points de vigilance et messages aux équipes — à partir des chiffres que vous fournissez.',
  },
] as const;

export const CHEF_CHANTIER_PUBLIC = [
  'Chefs de chantier travaux publics',
  'Conducteurs de travaux TP / VRD',
  'Responsables d’équipe sur marchés eau, terrassement, canalisations',
  'Dirigeants de PME TP impliqués dans le suivi opérationnel',
] as const;

export const CHEF_CHANTIER_PREREQUIS = [
  'Connaître le déroulé d’un chantier TP (équipes, ST, sécurité)',
  'Rédiger régulièrement rapports, mails ou comptes rendus',
  'Aucun code requis — savoir formuler une demande en français suffit',
] as const;

export const CHEF_CHANTIER_PROGRAMME = [
  {
    title: 'IA générative en contexte chantier TP',
    body: 'Limites des modèles, risques d’erreur, données sensibles, validation humaine avant tout envoi contractuel ou sécurité.',
  },
  {
    title: 'ChatGPT et Claude pour le chef de chantier',
    body: 'Compte pro, prompts réutilisables, structuration des notes terrain, distinction brouillon / document validé.',
  },
  {
    title: 'Coordination et documentation',
    body: 'Rapports d’avancement, mails ST, CR de réunion, variations CCTP, checklists sécurité complémentaires au PPSPS.',
  },
] as const;

export const PROMPT_RAPPORT_CHEF = `Crée un rapport d'avancement chantier TP pour ce jour (Grand Paris, marché public eau/TP) :

Notes brutes :
- Jour 10 de chantier
- Canalisation EU : posé 220m aujourd'hui (versus 180m prévu), gain de 40m
- Terrassement zone B : creusement 85% (avant ça traîner demain)
- Équipes : 2 canalisateurs expérience, 1 apprenti, 3 manœuvres, 1 chef de chantier (moi)
- Sécurité : pas d'incident. Rappel balisage zone croisement routes, bien respecté.
- Météo : pluie matin ralenti, rattrapage après-midi
- Obstacles : canalisation gaz trouvée lors creusement zone C, GrDF appelé, confirmation lundi
- Planning : demain creusement zone C ralenti (attendre confirmation gaz), mais canalisation restera à jour si zone B finalisée

Rapport doit contenir :
1. Résumé avancement (m³, linéaires, % completion vs planning)
2. Équipes présentes et qualification
3. Sécurité et incidents (ou pas d'incidents)
4. Obstacles rencontrés et solutions apportées
5. Planning demain (prévisions équipes/engins)
6. Points nécessitant décision/escalade (ex. canalisation gaz)

Format : pro, lisible pour maître d'ouvrage / maîtrise d'œuvre, 1-2 pages, avec tableau avancement.
(Remplace les notes par vos données réelles du jour.)`;

export const PROMPT_EMAILS_CHEF = `Rédige 3 emails de coordination (chantier TP Grand Paris, jour 10) :

Email 1 — Au canalisateur :
Tu lui dis : "250m de canalisation posés, bravo. Demain on finit zone A (50m). Zone C révélée canalisation gaz non prévue (GrDF confirmation lundi). Peux-tu attendre lundi matin ou dois-je appeler une 2e équipe pour démarrer zone B demain ?"

Email 2 — À l'électricien :
Tu lui dis : "Tes installations électriques zone A : commandes de puissance mal positionnées selon DTU (vérification demain matin avec le coordonnateur SPS). Tu peux commencer zone B en attendant ?"

Email 3 — Au terrassier :
Tu lui dis : "Zone B 85% finalisée demain. Zone C : terrain devrait être prêt mercredi. Tu as les engins nécessaires ou tu les charges lundi matin ?"

Pour chaque email :
- Ton professionnel mais cordial, coordination claire
- Informations critiques (dates, obstacle, demande d'action)
- Signature avec toi en tant que chef de chantier + numéro contact

Format : prêt à copier-coller dans la messagerie.`;

export const PROMPT_VARIATION_CHEF = `Maître d'ouvrage demande variation CCTP :
"Canalisation EU actuellement prévue 315mm PVC groupe I. On voudrait upgrade 400mm béton renforcé pour durabilité long terme. Quel est le surcoût ?"

Contexte : 450m de canalisation, coût unitaire m² prévu 45€ HT PVC, surcoût béton estimé 65€ HT/m.

Rédige pour moi :
1. Analyse technique indicative : avantages/inconvénients (à valider par le bureau d'études / MO)
2. Calcul surcoût indicatif : (450m × (65-45€)) = XX€ HT — à recalculer avec mes PU contractuels
3. Impact planning : hypothèses possibles
4. Brouillon de demande de variation pour maître d'ouvrage : justification technique + montant surcoût + accord de principe
5. Rappel : validation direction et méthode interne de votre entreprise

Ton : neutre, technique, pas de jugement, faits et hypothèses clairement séparés.`;

export const PROMPT_ALERTES_CHEF = `Crée une fiche de rappels sécurité quotidiens pour ce chantier TP (marché eau/TP Grand Paris) :

Contexte : canalisation 450m, terrassement 200m³, zone proximité route (RN7), arrivée gaz non prévue (GrDF jeudi).

Points à couvrir (rappels / checklist — complément aux documents officiels du chantier) :
1. Zone de croisement routes : balisage temporaire, signalisation (gilets, cônes, etc.)
2. Déviations éventuelles et circulation
3. Travaux en tranchée : aération, sorties, risques enfermement
4. Canalisation gaz : périmètre GrDF, consignes équipes
5. EPI : gilets, casques, chaussures, protections auditives engins, harnais si travail en hauteur

Pour chaque point :
- Description simple
- Qui contrôle / fréquence
- Rappel : non-respect = risque humain et sanction

Format : checklist 1 page, affichage chantier.
Ajoute : « Ce document ne remplace pas le PPSPS ni les plans de prévention ; il sert de mémo opérationnel. »`;

export const CHEF_CHANTIER_FAQ = [
  {
    q: 'DTU, CCTP, marchés publics : que peut faire ChatGPT ou Claude ?',
    a: "L'IA peut aider à structurer des textes à partir des références que vous citez. La conformité technique et contractuelle reste validée par vous, le bureau d’études et les instances de la mission.",
  },
  {
    q: 'PPSPS et coordination sécurité : l’IA peut-elle les rédiger ?',
    a: "Les documents réglementaires (PPSPS, plans de prévention, consignes officielles) relèvent des rôles et habilitations prévus par la réglementation. L'IA peut aider à des brouillons de comptes rendus ou de checklists, pas à se substituer au responsable désigné.",
  },
  {
    q: "L'IA va-t-elle remplacer les chefs de chantier ?",
    a: "Non. L'IA accélère la rédaction et la structuration ; la décision, l'autorité de chantier et la responsabilité restent humaines.",
  },
  {
    q: 'L’IA peut-elle aider sur un compte rendu de réunion chantier ?',
    a: 'Oui : transformer notes ou transcription en CR structuré (décisions, actions, responsables, échéances). Relecture et validation avant envoi.',
  },
  {
    q: 'Comment financer la formation si je suis salarié ?',
    a: `OFC Création d'Entreprise est certifiée Qualiopi et enregistrée Constructys. Financement OPCO possible selon éligibilité — voir le <a href="${LINKS.financement}">guide financement Constructys</a>.`,
  },
  {
    q: 'Métrés et % avancement : l’IA calcule-t-elle correctement ?',
    a: "Elle peut présenter des tableaux et des pourcentages à partir des chiffres que vous fournissez. Les relevés sources et la validation des quantités restent votre responsabilité.",
  },
  {
    q: 'Demandes de prolongation de délai : peut-on utiliser l’IA ?',
    a: "Oui pour structurer un courrier : faits, causes, impacts, pièces à joindre — à relire et à faire valider selon votre organisation.",
  },
  {
    q: 'Faut-il être bon en informatique ou savoir coder ?',
    a: "Non. On formule les demandes en français, avec des prompts que vous réutilisez et adaptez.",
  },
] as const;
