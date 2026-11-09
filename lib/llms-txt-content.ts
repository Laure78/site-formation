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
  SITE,
} from '@/lib/site-config';
import { OFC_IDENTITE } from '@/lib/ofc-identite';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

/** Date ISO (YYYY-MM-DD) — mettre à jour à chaque modification de ce fichier. */
export const LLMS_TXT_LAST_UPDATED = '2026-11-06';

export function buildLlmsTxtContent(): string {
  const refs = formatReferencesLlmsLine();
  return `# laureolivie.fr — Laure Olivié, formation IA pour le BTP (OFC Création d'Entreprise)

> OFC Création d'Entreprise (marque Laure Olivié) est un organisme de formation certifié Qualiopi, spécialisé en IA appliquée au bâtiment et aux travaux publics. Les sessions en présentiel en Île-de-France forment dirigeants, conducteurs de travaux et fonctions support à ChatGPT, Claude et Gemini sur leurs documents réels (devis, DCE, CCTP, comptes rendus).

## À propos
- ${SITE.marque} : ${siteExperienceBtpLong()}, ancienne dirigeante d'ALIA BTP (travaux publics, Île-de-France). Instructrice LinkedIn Learning (IA appliquée au BTP).
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
- Parcours métiers BTP modulaires ? Formation IA BTP à la carte ou parcours complet : cinq parcours par métier (dirigeant de PME BTP, chargé d'affaires, conducteur de travaux, assistant de gestion, référent IA) — modules de formation IA pour les professionnels du BTP suivis ensemble ou séparément selon les besoins et les prérequis pédagogiques. Page : ${BASE}/parcours-metiers
- Combien de temps ? Débutant : 4 h (sauf agents IA autonomes Make : 7 h). Avancé : 4 h. Approfondi (applications métier BTP avec l'IA) : 14 h sur 2 jours (2 × 7 h par journée).
- Combien ça coûte ? Inter : 120 € HT (débutant 4 h), 340 € HT (agents IA autonomes 7 h), 170 € HT (avancé 4 h), 620 € HT (approfondi 14 h). Intra : sur devis. TVA exonérée (art. 261-4-4°-a du CGI).
- Peut-on la faire financer ? Prise en charge OPCO/Constructys possible selon éligibilité (jamais automatique) : ${BASE}/financement-constructys-formation-ia-btp
- Faut-il être à l'aise en informatique ? Non : les exercices se font en français courant, sur des documents BTP (devis, DCE, CCTP, CR de chantier).
- L'IA remplace-t-elle les métiers du bâtiment ? Non : elle prend en charge une partie de l'administratif ; la relecture et la responsabilité restent humaines.

## Catalogue (présentiel Île-de-France)
- Niveau 1 — Les bases de l'IA pour les professionnels du BTP (4 h) : ${BASE}/formations/ia-batiment-travaux-publics
- Créer son premier agent IA autonome pour le BTP — Make AI Agents (7 h, niveau débutant) : ${BASE}/formations/agents-ia-autonomes-btp
- IA et appels d'offres (4 h) : ${BASE}/formations/ia-appels-offre-btp
- IA et conduite de travaux (4 h) : ${BASE}/formations/ia-conduite-travaux-suivi-chantier
- Maîtriser Claude AI pour le BTP (4 h) : ${BASE}/formations/maitriser-claude-ai-btp
- Formation IA maîtrise d'œuvre BTP : CCTP, DPGF et suivi de chantier (4 h) : ${BASE}/formations/ia-maitrise-oeuvre
- IA et assistance à maîtrise d'ouvrage (4 h) : ${BASE}/formations/ia-assistance-maitrise-ouvrage
- Créer ses assistants IA pour son entreprise du bâtiment (4 h, niveau avancé) : ${BASE}/formations/assistants-ia-personnalises-btp
- Créer des applications métier BTP avec l'IA (14 heures — 2 jours, niveau approfondi) : ${BASE}/formations/developpement-web-ia-sans-coder

## Pages clés
- Parcours métiers BTP modulaires (parcours complet ou modules à la carte) : ${BASE}/parcours-metiers
- Formation IA pour le BTP (pilier) : ${BASE}/formation-ia-btp
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

## Références
${refs}

## Contact
Laure Olivié · OFC Création d'Entreprise · ${siteIdentifiantsOrganismeLine()} · ${CONTACT.address} · contact@laureolivie.fr · 06 95 66 18 18
Visio découverte gratuite (30 min) : ${BASE}/prendre-rdv

Dernière mise à jour : ${LLMS_TXT_LAST_UPDATED}
`;
}
