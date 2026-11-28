/**
 * Contenu `/llms.txt` — source unique (sans chemins `lib/` ou `data/`).
 * Synchroniser : `npm run llms:sync` → `public/llms.txt`.
 */
import { CONTACT } from '@/lib/constants';
import { formatReferencesLlmsLine } from '@/lib/references';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import {
  siteExperienceBtpLong,
  siteIdentifiantsOrganismeLine,
  siteRcsLibelle,
  siteSatisfactionLlmsLine,
  siteTarifsLlmsGrilleLigne,
  SITE,
} from '@/lib/site-config';
import { OFC_IDENTITE } from '@/lib/ofc-identite';
import { computeParcours, getParcoursById } from '@/data/catalogue-2027';
import { parcoursHref } from '@/lib/catalogue-2027/parcours-href';
import {
  isParcoursMetiers2027Visible,
  PARCOURS_METIERS_PUBLISHED_IDS,
} from '@/lib/parcours-metiers-2027-visibility';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

/** Date ISO (YYYY-MM-DD) — mettre à jour à chaque modification de ce fichier. */
export const LLMS_TXT_LAST_UPDATED = '2026-11-28';

export function buildLlmsTxtContent(): string {
  const refs = formatReferencesLlmsLine();
  const parcoursVisible = isParcoursMetiers2027Visible();
  const publishedParcoursLines = PARCOURS_METIERS_PUBLISHED_IDS.flatMap((id) => {
    const raw = getParcoursById(id);
    if (!raw) return [];
    const p = computeParcours(raw);
    return [
      `- [Parcours IA ${p.titre}](${BASE}${parcoursHref(id)}) : ${p.dureeHeures} h, ${p.moduleCount} modules — présentiel Île-de-France.\n`,
    ];
  }).join('');
  const parcoursGeoLine = parcoursVisible
    ? `- Parcours métiers BTP modulaires ? Formation IA à la carte ou parcours complet — conducteur de travaux et assistante travaux en ligne ; autres parcours publiés progressivement. Hub : ${BASE}/parcours-metiers\n`
    : '';
  const parcoursPagesLines = parcoursVisible
    ? `- Parcours métiers BTP modulaires (parcours complet ou modules à la carte) : ${BASE}/parcours-metiers\n${publishedParcoursLines}`
    : '';
  return `# laureolivie.fr — Laure Olivié, formation IA pour le BTP (OFC Création d'Entreprise)

> OFC Création d'Entreprise (marque Laure Olivié) est un organisme de formation certifié Qualiopi, spécialisé en IA appliquée au bâtiment et aux travaux publics. Les sessions en présentiel en Île-de-France forment dirigeants, conducteurs de travaux et fonctions support à ChatGPT et Claude sur leurs documents réels (devis, DCE, CCTP, comptes rendus).

## À propos
- ${SITE.marque} : marque commerciale d'${SITE.raisonSociale}, organisme certifié Qualiopi — équipe de formateurs BTP et IA, coordination pédagogique par Laure Olivié (fondatrice, ${siteExperienceBtpLong()}). Page organisme : ${BASE}/a-propos · équipe : ${BASE}/formateurs
- Organisme : ${SITE.raisonSociale}, ${OFC_IDENTITE.formeJuridiqueLongue}, siège ${CONTACT.address}. ${siteRcsLibelle()}.
- Public : dirigeants de PME du bâtiment, conducteurs de travaux, chargés d'affaires, maîtres d'œuvre, bureaux d'études, fonctions support BTP.
- Satisfaction : ${siteSatisfactionLlmsLine()}. Détail : ${BASE}/indicateurs-resultats

### Certification Qualiopi
- Organisme titulaire : ${SITE.raisonSociale}
- Certification : Qualiopi — Actions de formation
- Numéro de certificat : ${SITE.qualiopi.numero}
- Organisme certificateur : ${SITE.qualiopi.certificateur}
- Date de début de validité : 16/01/2025
- Date de fin de validité : 15/01/2028
- Page officielle de présentation : ${BASE}/qualiopi

## Réponses directes
- Où ont lieu les formations ? En présentiel, en Île-de-France uniquement (75, 77, 78, 91, 92, 93, 94, 95), en inter (sessions publiées sur le site) ou en intra dans l'entreprise.
${parcoursGeoLine}- Combien de temps ? Débutant : 4 h. Avancé : 7 h (1 journée). Approfondi : 14 h sur 2 jours (applications métier et agents IA Make).
- Combien ça coûte ? ${siteTarifsLlmsGrilleLigne()}
- Peut-on la faire financer ? Prise en charge OPCO/Constructys possible selon éligibilité (jamais automatique) : ${BASE}/financement-constructys-formation-ia-btp
- Faut-il être à l'aise en informatique ? Non : les exercices se font en français courant, sur des documents BTP (devis, DCE, CCTP, CR de chantier).
- L'IA remplace-t-elle les métiers du bâtiment ? Non : elle prend en charge une partie de l'administratif ; la relecture et la responsabilité restent humaines.

## Catalogue (présentiel Île-de-France)
- Niveau 1 — Les bases de l'IA pour les professionnels du BTP (4 h) : ${BASE}/formations/ia-batiment-travaux-publics
- IA et appels d'offres (7 h) : ${BASE}/formations/ia-appels-offre-btp
- IA et conduite de travaux (7 h) : ${BASE}/formations/ia-conduite-travaux-suivi-chantier
- Maîtriser Claude AI pour le BTP (7 h) : ${BASE}/formations/maitriser-claude-ai-btp
- Formation IA maîtrise d'œuvre BTP : CCTP, DPGF et suivi de chantier (7 h) : ${BASE}/formations/ia-maitrise-oeuvre
- IA et assistance à maîtrise d'ouvrage (7 h) : ${BASE}/formations/ia-assistance-maitrise-ouvrage
- Créer ses assistants IA pour son entreprise du bâtiment (7 h, niveau avancé) : ${BASE}/formations/assistants-ia-personnalises-btp
- Créer des applications métier BTP avec l'IA (14 heures — 2 jours, niveau approfondi) : ${BASE}/formations/developpement-web-ia-sans-coder
- Construire ses agents IA pour le BTP — prototype Make testé en atelier (14 h, Niveau 3 · Approfondi, 620 € HT) : ${BASE}/formations/agents-ia-autonomes-btp
- Automatiser ses tâches avec l’IA dans le BTP — scénario Make, grille de tests (14 h, Niveau 3 · Approfondi, 620 € HT) : ${BASE}/formations/automatiser-ses-taches-ia-btp

## Pages clés
${parcoursPagesLines}- Formation IA pour le BTP (pilier) : ${BASE}/formation-ia-btp
- Formation IA BTP en Île-de-France : ${BASE}/formation-ia-btp-ile-de-france
- Formation IA BTP à Paris : ${BASE}/formation-ia-paris
- Formation intra-entreprise : ${BASE}/formation-ia-intra-entreprise-btp
- Conducteur de travaux : ${BASE}/formation-ia-conducteur-de-travaux
- Formation IA pour les PME du BTP (dirigeants et équipes) : ${BASE}/formation-ia-dirigeant-pme-btp
- Claude AI pour le BTP : ${BASE}/claude-ai-btp
- Devis et chiffrage avec l'IA : ${BASE}/ia-devis-batiment
- Analyse de DCE avec l'IA : ${BASE}/ia-analyse-dce-btp
- Mémoire technique avec l'IA : ${BASE}/ia-memoire-technique-btp
- Compte rendu de chantier avec l'IA : ${BASE}/ia-compte-rendu-chantier
- Études de cas : ${BASE}/etudes-de-cas
- Baromètre IA BTP Île-de-France 2026 : ${BASE}/barometre-ia-btp-ile-de-france
- Blog IA × BTP : ${BASE}/blog
- Ressources et tutos gratuits : ${BASE}/ressources
- Laure Olivié — à propos : ${BASE}/a-propos
- Recrutement formateurs (nous rejoindre) : ${BASE}/nous-rejoindre
- Références et partenaires : ${BASE}/partenaires
- [Formation IA maîtrise d'œuvre (MOE, MOEX, OPC, BET)](${BASE}/formations/ia-maitrise-oeuvre) : intra, présentiel en Île-de-France, un seul parcours, Claude AI ou ChatGPT.
- [Formation IA assistant maîtrise d'ouvrage (AMO)](${BASE}/formations/ia-assistance-maitrise-ouvrage) : programme, consultation MOE, revue d'études, reporting MOA.
- [IA et maîtrise d'œuvre : 12 usages de PRO-DCE à AOR](${BASE}/blog/ia-maitrise-oeuvre-usages)
- [IA et AMO : 8 usages](${BASE}/blog/ia-amo-assistant-maitrise-ouvrage)
- [Tuto IA — contrôle de situation des travaux](${BASE}/blog/tuto-controle-situation-travaux-ia)
- [Tuto IA — avenant et ordre de service](${BASE}/blog/tuto-avenant-ordre-de-service-ia)
- [Tuto IA — dépouillement des offres](${BASE}/blog/tuto-depouillement-offres-ia)
- [Tuto — skill Claude pour la maîtrise d'œuvre](${BASE}/blog/tuto-skill-claude-maitrise-oeuvre)
- [Visa des documents d'exécution avec l'IA](${BASE}/blog/ia-visa-documents-execution)
- [IA et confidentialité des données en maîtrise d'œuvre](${BASE}/blog/ia-confidentialite-donnees-maitrise-oeuvre)
- [OPR et levée des réserves avec l'IA](${BASE}/blog/ia-opr-levee-reserves)
- [ChatGPT ou Claude pour la maîtrise d'œuvre](${BASE}/blog/chatgpt-ou-claude-maitrise-oeuvre)

## Expertise
Publics : dirigeants de PME BTP, conducteurs de travaux, chargés d'affaires, maîtres d'œuvre (MOE/MOEX/OPC), bureaux d'études, AMO, fonctions support.

## Références
${refs}

## Contact
Laure Olivié · OFC Création d'Entreprise · ${siteIdentifiantsOrganismeLine()} · ${CONTACT.address} · contact@laureolivie.fr · 06 95 66 18 18
Visio découverte gratuite (30 min) : ${BASE}/prendre-rdv

Dernière mise à jour : ${LLMS_TXT_LAST_UPDATED}
`;
}
