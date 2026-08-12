# Audit Qualiopi — laureolivie.fr (dépôt site-formation)

**Date d’audit code :** 12 août 2026  
**Audit de surveillance prévu :** 24 août 2026  
**Organisme :** OFC Création d’Entreprise — certificat Qualiopi n° 520911-1 (CERTIFOPAC), catégorie actions de formation  
**Méthode :** revue du dépôt Next.js App Router uniquement (aucune modification de code hors ce rapport). Les constats citent des chemins et extraits présents dans le dépôt.

---

## 1. Synthèse

| Métrique | Valeur |
|---|---|
| Routes publiques générées au dernier `npm run build` | ~262 (App Router) |
| Fiches catalogue officielles auditées (NIV-01 → NIV-05) | **5** |
| Pages / landings « action de formation » avec bloc réglementaire ou description programme | **5 fiches + satellite CCTP + landings métier / geo / ville** (dizaines d’URL via composants partagés) |
| Écarts **bloquants** | **4** |
| Écarts **à corriger** | **6** |
| Points **amélioration** | **4** |

**Verdict (3 lignes) :**  
Les **5 fiches catalogue** portent un bloc `InformationsReglementaires` (indicateur 1) globalement complet, avec programme, public, durée (heures + 0,5 jour), tarifs, évaluation et accessibilité visibles.  
Des **écarts bloquants** apparaissent hors catalogue : identité juridique **SAS vs SASU**, landings qui affichent le **programme NIV-01 sous un autre titre**, page **SQY sans bloc réglementaire**, satellite **CCTP** incohérent avec NIV-02.  
Sans correction avant le 24/08/2026, un auditeur ouvrant une landing métier ou la page SQY peut constater une information **contradictoire ou incomplète** au titre de l’indicateur 1.

---

## 2. Tableau par fiche / page formation (indicateur 1)

Périmètre : pages qui décrivent une **action de formation** (fiche catalogue, satellite, ou landing avec programme / Course schema).  
Item « conforme » = présent noir sur blanc sur la page **ou** accessible en un clic depuis elle (lien interne / PDF programme).  
Formations **non certifiantes RNCP/RS** : colonnes RNCP non applicables (N/A).

### 2.1 Fiches catalogue officielles (source `data/formations.ts`)

| Page (URL) | Item manquant / constat | Fichier | Niveau |
|---|---|---|---|
| `/formations/ia-batiment-travaux-publics` (NIV-01) | Aucun item grille manquant sur la fiche : programme `#programme`, public, `CatalogueInfosQualiopi` (prérequis, objectifs, durée + `0,5 jour`, délais, tarifs, méthodes, évaluation, handicap, contacts). | `app/formations/ia-batiment-travaux-publics/page.tsx` ; `components/formation/InfosQualiopi.tsx` | — (conforme) |
| `/formations/ia-appels-offre-btp` (NIV-02) | Idem. Prérequis niveau 2 explicites (pas « aucun prérequis »). | `app/formations/ia-appels-offre-btp/page.tsx` | — |
| `/formations/ia-conduite-travaux-suivi-chantier` (NIV-03) | Idem. | `app/formations/ia-conduite-travaux-suivi-chantier/page.tsx` | — |
| `/formations/maitriser-claude-ai-btp` (NIV-04) | Idem. Public depuis `FORMATION.public`. | `app/formations/maitriser-claude-ai-btp/page.tsx` | — |
| `/formations/ia-maitrise-oeuvre` (NIV-05) | Idem. | `app/formations/ia-maitrise-oeuvre/page.tsx` | — |
| **Toutes les 5 fiches** | Section « 9. Contacts » du bloc Qualiopi : **e-mail + téléphone + adresse**, mais **pas de nom** de contact (ex. Laure Olivié). La grille exige « contact : nom, e-mail, téléphone ». | `components/formation/InfosQualiopi.tsx` (l.179–201) ; `lib/qualiopi-info.ts` (`QUALIOPI_CONTACTS` sans nom) | **à corriger** |
| **Toutes les 5 fiches** | Section « 4. Modalités et délais d’accès » : texte = **uniquement le délai** (`QUALIOPI_DELAI_ACCES_EXACT`). Le **présentiel** est dans « 6. Méthodes », pas dans les modalités d’accès / inscription. | `config/qualiopi.ts` l.29–30 ; `lib/qualiopi-info.ts` l.78 (`QUALIOPI_MODALITES_ACCES = QUALIOPI_DELAI_ACCES_EXACT`) ; `InfosQualiopi.tsx` l.107–118 | **à corriger** |
| **Toutes les 5 fiches** | « Public visé » et « contenu / programme » absents du composant à 9 cases, mais **présents sur la page** (sections Public / `#programme` + PDF) → conforme grille « ou un clic ». | pages `app/formations/*/page.tsx` | — |

### 2.2 Satellite et landings à risque

| Page (URL) | Item manquant / constat | Fichier | Niveau |
|---|---|---|---|
| `/formations/formation-ia-cctp-analyse-dce-btp` | Se présente comme formation « IA CCTP & DCE » (H1 / meta / programme dédié) mais injecte `CatalogueInfosQualiopi programmeRef="NIV-02"` → **titre, objectifs et référence programme = fiche AO**, pas CCTP. Canonical vers NIV-02. Information contradictoire pour l’auditeur. | `app/formations/formation-ia-cctp-analyse-dce-btp/page.tsx` (meta l.32–62, `CatalogueInfosQualiopi` ~l.448) | **bloquant** |
| `/formations/ia-btp-saint-quentin-en-yvelines` | Page formation (Course schema, durée, présentiel, financement) **sans** `InfosQualiopi` / `CatalogueInfosQualiopi` : pas de bloc unique prérequis / objectifs / délais d’accès / tarifs inter-intra / évaluation / handicap réglementaire. | `app/formations/ia-btp-saint-quentin-en-yvelines/page.tsx` | **bloquant** |
| Landings métier / geo / ville / PME / gros œuvre / marchés publics affichant `InfosQualiopiLanding` | Le titre affiché est local (`formationTitle`), mais le contenu réglementaire est **toujours celui de NIV-01** (`buildLandingInfosQualiopiProps` → `programmeRef: 'NIV-01 (programme catalogue de référence)'`, objectifs / tarifs NIV-01). Ex. « Formation IA BTP à Longjumeau » + objectifs niveau 1 génériques. | `lib/qualiopi-info.ts` l.177–195 ; usages : `components/formations/FormationCityPage.tsx`, `components/formation-ia-metier/FormationIaMetierBtpLanding.tsx`, `components/geo/GeoFormationPage.tsx`, `components/formation-ia-btp/DepartementPage.tsx`, `components/formation-ia/FormationIaSlugContent.tsx`, `components/landing/FormationMetierB1Page.tsx`, `components/formation-ia-marche-public/FormationIaMarchePublicLanding.tsx`, `app/formations/ia-pme-btp/page.tsx`, `app/formation-ia-gros-oeuvre-btp/page.tsx` | **bloquant** |
| `/formations` (catalogue) | Hub : délais + accessibilité cités ; pas une fiche unique — OK si l’auditeur bascule vers les 5 cartes. | `app/formations/page.tsx` | — |

---

## 3. Tableau transverse

| Élément attendu | Présent ? | Fichier | Niveau | Correction |
|---|---|---|---|---|
| **Ind. 2** — satisfaction chiffrée et datée | Oui — `4,85/5`, période `01/01/2024 – 31/12/2025`, maj `03/06/2026`, millésime année de référence `2025` | `lib/constants.ts` (`PREUVES`) ; `app/indicateurs-resultats/page.tsx` ; `config/qualiopi.ts` | — | — |
| **Ind. 2** — nb stagiaires / heures | Oui — cumul stagiaires (`1592`) + répondants ; pas de volume d’heures global affiché | `app/indicateurs-resultats/page.tsx` | **amélioration** | Ajouter heures stagiaires ou heures réalisées si disponibles en registre interne |
| **Ind. 2** — taux d’abandon | **Non** explicite (taux de réalisation 100 %, assiduité 98 % seulement) | `app/indicateurs-resultats/page.tsx` l.9–14, 70–78 | **à corriger** | Publier un **taux d’abandon** (ou « non-démarrage / rupture ») chiffré, daté, avec méthode |
| Certificat Qualiopi PDF + validité | Oui — PDF `public/documents/certificat-qualiopi-ofc.pdf` ; validité `16/01/2025` → `15/01/2028` ; n° `520911-1` | `lib/qualiopi-info.ts` (`QUALIOPI_LEGAL`) ; `components/QualiopiCertificationNotice.tsx` ; footer | — | **À vérifier en ligne** : ouverture PDF + date encore valide le 24/08 |
| Logo catégorie « actions de formation » + n° certificat | Oui — `QualiopiBadge` (visuel Certifopac) + texte certificat n° / validité | `components/QualiopiLogo.tsx` ; `lib/photos.ts` (`qualiopiLogoOfficiel`) ; `QualiopiCertificationNotice.tsx` | — | Vérifier à l’écran que le PNG affiche bien la catégorie AFC |
| **Ind. 26** — page handicap, référent, contact, adaptations, réseau | Oui — `/accessibilite-handicap` + `/annuaire-handicap` ; référente Laure Olivié ; AGEFIPH / Cap emploi / MDPH | `app/accessibilite-handicap/page.tsx` ; `components/formation/ReferentHandicapBlock.tsx` ; `app/annuaire-handicap/page.tsx` | — | Vérifier en ligne le PDF annuaire |
| **Ind. 31** — réclamations + médiateur | Oui — `/reclamations` + CM2C | `app/reclamations/page.tsx` ; `lib/qualiopi-info.ts` (`QUALIOPI_MEDIATION_CM2C`) ; `components/qualiopi/MediationCm2cBlock.tsx` | **amélioration** | Constant `delaiAccuseReception: '48 h ouvrées'` non repris distinctement à l’écran (AR + réponse fusionnés sous 15 j) |
| **Ind. 9** — RI, CGV, conditions | Oui — liens footer `NAV_LEGAL` | `app/reglement-interieur/page.tsx` ; `app/cgv/page.tsx` ; `lib/nav.ts` | — | — |
| Mentions légales SIRET + NDA + mention État | Oui | `app/mentions-legales/page.tsx` ; `components/Footer.tsx` | — | — |
| Identité juridique cohérente | **Non** — `SASU` vs `SAS` | `lib/qualiopi-info.ts` (`formeJuridique: 'SASU'`) ; `app/mentions-legales/page.tsx` (« SAS ») ; `app/cgv/page.tsx` (« SAS ») ; `lib/schema-constants.ts` (`legalNameSasu`) | **bloquant** | Uniformiser **SASU** (ou SAS) partout selon le Kbis réel |
| Politique confidentialité RGPD | Oui | `app/politique-confidentialite/page.tsx` ; `lib/nav.ts` | — | — |
| Gestion cookies | Oui — bandeau consentement | `components/CookieConsentBanner.tsx` | — | Vérifier en navigation réelle l’affichage avant scripts tiers |
| Cohérence tarifs catalogue | Oui sur 5 fiches — `1200` € HT via `data/formations.ts` / `getInfosQualiopiForCatalogue` | `data/formations.ts` ; `lib/qualiopi-info.ts` | — | — |
| Chiffres / dates antérieurs à 2025 | Période de preuve commence en **2024** (légitime pour historique) ; fiches maj **2026** | `lib/constants.ts` ; `QUALIOPI_FICHE_META` | — | — |
| Ancien domaine `ofc-creation-entreprise.fr` | **Aucune occurrence** dans le dépôt (hors `.git`) | grep dépôt | — | — |
| Footer SIRET + NDA + mention agrément + Qualiopi | Oui | `components/Footer.tsx` ; `QualiopiCertificationNotice` | — | — |

---

## 4. Plan de correction (par priorité)

1. **[bloquant]** Harmoniser la forme juridique : remplacer « SAS » par « SASU » (ou l’inverse selon Kbis) dans `app/mentions-legales/page.tsx` et `app/cgv/page.tsx`, aligné sur `lib/qualiopi-info.ts` / `lib/schema-constants.ts`.
2. **[bloquant]** Corriger `buildLandingInfosQualiopiProps` dans `lib/qualiopi-info.ts` : ne plus afficher les objectifs / tarifs / `programmeRef` NIV-01 sous un titre d’une autre action ; soit (a) rediriger chaque landing vers la fiche catalogue concernée sans faux bloc réglementaire, soit (b) afficher un encart « action catalogue de référence » avec lien unique vers la fiche NIV-xx et **sans** reprendre un titre local contradictoire.
3. **[bloquant]** Sur `app/formations/formation-ia-cctp-analyse-dce-btp/page.tsx` : retirer le faux programme autonome (ou 301 vers `/formations/ia-appels-offre-btp`) et ne plus appeler `CatalogueInfosQualiopi` sous un intitulé CCTP distinct.
4. **[bloquant]** Ajouter `<CatalogueInfosQualiopi programmeRef="NIV-01" />` (ou le niveau réellement vendu) dans `app/formations/ia-btp-saint-quentin-en-yvelines/page.tsx`, ou remplacer la page par un hub géo renvoyant uniquement vers les 5 fiches catalogue.
5. **[à corriger]** Ajouter le **nom** du contact (Laure Olivié) dans la section « 9. Contacts » de `components/formation/InfosQualiopi.tsx` (étendre `QUALIOPI_CONTACTS` dans `lib/qualiopi-info.ts`).
6. **[à corriger]** Enrichir `QUALIOPI_DELAI_ACCES_EXACT` / section 4 : modalités d’inscription + **présentiel** (intra locaux / inter IDF) + délai, dans `config/qualiopi.ts`.
7. **[à corriger]** Publier un **taux d’abandon** daté sur `app/indicateurs-resultats/page.tsx` (source registre sessions).
8. **[à corriger]** Passer en revue les FAQ / textes qui ne citent que « 24 € HT/h » sans le plafond **19 €** (11–50 salariés, barème 2026) pour éviter une divergence avec la page financement — `lib/faq.ts` vs contenus Constructys à jour.
9. **[amélioration]** Afficher distinctement l’accusé de réception sous **48 h ouvrées** sur `app/reclamations/page.tsx` (constante déjà dans `QUALIOPI_RECLAMATIONS.delaiAccuseReception`).
10. **[amélioration]** Supprimer ou archiver les commentaires / seeds citant encore « NIV-06 » et l’ancien titre Claude si l’auditeur fouille le dépôt (hors site public) — `lib/internal-links.ts`, seeds Supabase.
11. **[amélioration]** Documenter le volume d’**heures** de formation (indicateur 2) si le registre le permet.
12. **[amélioration]** Après correctifs, relancer `npm run build` et contrôler manuellement les URL du §5.

---

## 5. Points à vérifier manuellement en ligne

Ces éléments ne peuvent pas être tranchés par le seul code :

1. Ouverture de `https://www.laureolivie.fr/documents/certificat-qualiopi-ofc.pdf` — fichier lisible, n° **520911-1**, dates **16/01/2025–15/01/2028**, catégorie **actions de formation**.
2. Affichage réel du PNG Qualiopi Certifopac (catégorie AFC visible sans zoom excessif) dans le footer sur mobile et desktop.
3. Fiche data.gouv / annuaire entreprises : SIREN **905244281**, certification toujours active au 24/08/2026.
4. Cohérence Kbis : **SASU** vs **SAS** (trancher le point bloquant identité).
5. Parcours cookies : bandeau avant Calendly / analytics ; refus effectivement respecté.
6. Lien annuaire handicap (PDF) depuis `/accessibilite-handicap` et `/annuaire-handicap` — téléchargement OK.
7. Redirection live : `/formations/formation-claude-ia-btp` → `/formations/maitriser-claude-ai-btp` (308/301 permanent).
8. Sur production, ouvrir **une landing métier** (ex. électricien) et **SQY** : constater ou non le faux bloc NIV-01 / l’absence de bloc (écarts bloquants §2.2).
9. Registre interne : valeurs affichées (1592 formés, 4,85/5, 412 répondants, 100 % réalisation, 98 % assiduité) — preuves documentaires pour l’auditeur (pas dans le dépôt).
10. Aucune page production encore indexée sous l’ancien domaine `ofc-creation-entreprise.fr` (Search Console / redirections serveur hors Next).

---

## Annexe A — Inventaire fiches catalogue (source de vérité)

| Code | URL | Titre (`data/formations.ts`) | Tarif HT | Bloc Qualiopi |
|---|---|---|---|---|
| NIV-01 | `/formations/ia-batiment-travaux-publics` | L'IA au service des pros du bâtiment et des travaux publics | 1200 | `CatalogueInfosQualiopi` |
| NIV-02 | `/formations/ia-appels-offre-btp` | L'IA appliquée aux appels d'offres BTP | 1200 | `CatalogueInfosQualiopi` |
| NIV-03 | `/formations/ia-conduite-travaux-suivi-chantier` | L'IA appliquée à la conduite de travaux | 1200 | `CatalogueInfosQualiopi` |
| NIV-04 | `/formations/maitriser-claude-ai-btp` | Maîtriser Claude AI pour le BTP — Chat, Cowork & Code | 1200 | `CatalogueInfosQualiopi` |
| NIV-05 | `/formations/ia-maitrise-oeuvre` | L'IA au service des maîtres d'œuvre | 1200 | `CatalogueInfosQualiopi` |

Composant indicateur 1 : `components/formation/InfosQualiopi.tsx` — sections affichées : Prérequis, Objectifs, Durée, Modalités et délais d’accès, Tarifs, Méthodes, Évaluation, Accessibilité handicap, Contacts (+ date / version).

## Annexe B — Extraits cités (preuves dépôt)

**Modalités = délai seul :**
```29:30:config/qualiopi.ts
export const QUALIOPI_DELAI_ACCES_EXACT =
  "Délai d'accès : entrée en formation sous 2 à 4 semaines après signature de la convention. ...
```

**Landing = toujours NIV-01 :**
```177:184:lib/qualiopi-info.ts
export function buildLandingInfosQualiopiProps(formationTitle: string): InfosQualiopiProps {
  const entry = FORMATIONS_CATALOGUE[0];
  ...
    programmeRef: 'NIV-01 (programme catalogue de référence)',
```

**SAS vs SASU :**
- `lib/qualiopi-info.ts` : `formeJuridique: 'SASU'`
- `app/mentions-legales/page.tsx` : `Forme juridique : Société par Actions Simplifiée (SAS)`
- `app/cgv/page.tsx` : `Forme juridique : SAS (Société par Actions Simplifiée)`

**Contacts sans nom :**
```179:201:components/formation/InfosQualiopi.tsx
<QualiopiItem icon={Mail} title="9. Contacts">
  ... email, téléphone, adresse — pas de nom ...
```

---

*Fin du rapport — aucun autre fichier modifié.*
