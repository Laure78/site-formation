/**
 * Contenu `/llms.txt` — source unique (sans chemins `lib/` ou `data/`).
 * Synchroniser : `npm run llms:sync` → `public/llms.txt`.
 */
import { CONTACT } from '@/lib/constants';
import { formatReferencesLlmsLine } from '@/lib/references';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

/** Date ISO (YYYY-MM-DD) — mettre à jour à chaque modification de ce fichier. */
export const LLMS_TXT_LAST_UPDATED = '2026-10-29';

export function buildLlmsTxtContent(): string {
  const refs = formatReferencesLlmsLine();
  return `# laureolivie.fr — Laure Olivié, formation IA pour le BTP (OFC Création d'Entreprise)

> Laure Olivié est formatrice IA spécialisée BTP. Laure Olivié, organisme certifié Qualiopi (OFC Création d'Entreprise), forme les professionnels du bâtiment et des travaux publics à ChatGPT, Claude et Gemini appliqués à leurs documents réels. Formations en présentiel, en Île-de-France uniquement.

## À propos
- Laure Olivié : 7 ans d'expérience dans le BTP, ancienne dirigeante d'ALIA BTP (travaux publics, Île-de-France). Instructrice LinkedIn Learning (IA appliquée au BTP).
- Organisme : OFC Création d'Entreprise, SASU, ${CONTACT.address}. Certifié Qualiopi (actions de formation).
- Public : dirigeants de PME du bâtiment, conducteurs de travaux, chargés d'affaires, maîtres d'œuvre, bureaux d'études, fonctions support BTP.
- Satisfaction : 4,45/5 (20 répondants, questionnaires à chaud, juillet 2025 – juin 2026). Détail : ${BASE}/indicateurs-resultats

## Réponses directes
- Où ont lieu les formations ? En présentiel, en Île-de-France uniquement (75, 77, 78, 91, 92, 93, 94, 95), en inter (sessions publiées sur le site) ou en intra dans l'entreprise.
- Combien de temps ? Niveau 1 : 4 h. Modules métier : 7 h. Parcours avancé : 14 h (2 jours).
- Combien ça coûte ? Inter : 120 € HT par participant (4 h), 310 € HT (7 h), 620 € HT (14 h). Intra : sur devis. TVA exonérée (art. 261-4-4°-a du CGI).
- Peut-on la faire financer ? Prise en charge OPCO/Constructys possible selon éligibilité (jamais automatique) : ${BASE}/financement-constructys-formation-ia-btp
- Faut-il être à l'aise en informatique ? Non : les exercices se font en français courant, sur des documents BTP (devis, DCE, CCTP, CR de chantier).
- L'IA remplace-t-elle les métiers du bâtiment ? Non : elle prend en charge une partie de l'administratif ; la relecture et la responsabilité restent humaines.

## Catalogue (présentiel Île-de-France)
- Niveau 1 — Les bases de l'IA pour les pros du BTP (4 h) : ${BASE}/formations/ia-batiment-travaux-publics
- IA et appels d'offres (7 h) : ${BASE}/formations/ia-appels-offre-btp
- IA et conduite de travaux (7 h) : ${BASE}/formations/ia-conduite-travaux-suivi-chantier
- Maîtriser Claude AI pour le BTP (7 h) : ${BASE}/formations/maitriser-claude-ai-btp
- IA et maîtrise d'œuvre (7 h) : ${BASE}/formations/ia-maitrise-oeuvre
- Créer ses assistants IA pour son entreprise du bâtiment (7 h, niveau 2) : ${BASE}/formations/assistants-ia-personnalises-btp
- Créer des applications métier BTP avec l'IA (14 heures — 2 jours, niveau 3) : ${BASE}/formations/developpement-web-ia-sans-coder

## Pages clés
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
- Parcours et certifications : ${BASE}/a-propos
- Références et partenaires : ${BASE}/partenaires

## Références
${refs}

## Contact
Laure Olivié · OFC Création d'Entreprise · SIRET 905 244 281 00010 · NDA 11788515078 · ${CONTACT.address} · contact@laureolivie.fr · 06 95 66 18 18
Visio découverte gratuite (30 min) : ${BASE}/prendre-rdv

Dernière mise à jour : ${LLMS_TXT_LAST_UPDATED}
`;
}
