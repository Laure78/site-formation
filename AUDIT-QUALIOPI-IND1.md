# Audit Qualiopi — Indicateur 1

**Organisme :** OFC Création d'Entreprise (Laure Olivié)  
**Site :** laureolivie.fr — dépôt Next.js App Router  
**Date d'audit :** 20/08/2026  
**Auditeur :** revue statique du code source (sans modification)  
**Référentiel :** RNQ — Ind. 1 : *« Le prestataire diffuse une information accessible au public, détaillée et vérifiable sur les prestations proposées. »*

---

## 1. Cartographie du dépôt (Étape 1)

### 1.1 Fiches formation catalogue (5 actions certifiées — source `data/formations.ts`)

| Réf. | Slug | Route | Fichier page |
|------|------|-------|--------------|
| NIV-01 | `ia-batiment-travaux-publics` | `/formations/ia-batiment-travaux-publics` | `app/formations/ia-batiment-travaux-publics/page.tsx` |
| NIV-02 | `ia-appels-offre-btp` | `/formations/ia-appels-offre-btp` | `app/formations/ia-appels-offre-btp/page.tsx` |
| NIV-03 | `ia-conduite-travaux-suivi-chantier` | `/formations/ia-conduite-travaux-suivi-chantier` | `app/formations/ia-conduite-travaux-suivi-chantier/page.tsx` |
| NIV-04 | `maitriser-claude-ai-btp` | `/formations/maitriser-claude-ai-btp` | `app/formations/maitriser-claude-ai-btp/page.tsx` |
| NIV-05 | `ia-maitrise-oeuvre` | `/formations/ia-maitrise-oeuvre` | `app/formations/ia-maitrise-oeuvre/page.tsx` |

**Composant réglementaire :** `<CatalogueInfosQualiopi />` → `components/formation/InfosQualiopi.tsx` (9 sections + date/version).

**Route dynamique stub :** `app/formations/[slug]/page.tsx` — JSON-LD seul, sans bloc Ind. 1 (pages statiques prennent le dessus).

### 1.2 Page catalogue / liste

| Route | Fichier |
|-------|---------|
| `/formations` | `app/formations/page.tsx` |

Composants : `FormationsHero`, `FormationsCatalogueInteractive`, `FormationsComparisonTable`, FAQ (`lib/faq.ts` → `FAQ_FORMATIONS`).

### 1.3 Pages institutionnelles

| Route | Fichier |
|-------|---------|
| Accueil | `app/page.tsx` |
| Contact | `app/contact/page.tsx` |
| Accessibilité handicap | `app/accessibilite-handicap/page.tsx` |
| Annuaire handicap | `app/annuaire-handicap/page.tsx` |
| À propos | `app/a-propos/page.tsx` |
| Indicateurs de résultats | `app/indicateurs-resultats/page.tsx` |
| Qualiopi | `app/qualiopi/page.tsx` |

### 1.4 Header & Footer

| Composant | Fichier |
|-----------|---------|
| Header (Navbar) | `components/Navbar.tsx` (+ `lib/header-nav.ts`) |
| Footer | `components/Footer.tsx` (+ `components/layout/FooterExploreStrip.tsx`, `components/QualiopiCertificationNotice.tsx`, `components/formation/ReferentHandicapBlock.tsx`) |

### 1.5 Sources de données produit

| Fichier | Rôle |
|---------|------|
| `data/formations.ts` | **Source de vérité** — 5 parcours (prix, durée, effectifs, PDF, objectifs) |
| `lib/formations-catalogue-display.ts` | Affichage catalogue, cartes, tarifs dérivés |
| `lib/tarifs-sessions.ts` | Grille commerciale (1200 € HT / session) |
| `lib/qualiopi-info.ts` | Textes Ind. 1, contacts, certificat, `getInfosQualiopiForCatalogue()` |
| `config/qualiopi.ts` | Délais d'accès, modalités, version fiche, stats |
| `lib/constants.ts` | `PREUVES` (1592 formés, 4,85/5, période, date MAJ) |
| `src/data/formations.ts` | Données LMS / JSON-LD complémentaires |
| `lib/faq.ts` | FAQ formations (catalogue, tarifs, modalités) |
| Landings métier / geo | `lib/formation-ia-*-landing.ts`, `lib/formation-ia-metier-eight-rich.ts`, `lib/geo-formation-config.ts`, etc. |

### 1.6 Landings SEO (hors fiches catalogue)

**29 pages** avec encart `<RenvoiFicheCatalogue />` (`components/qualiopi/RenvoiFicheCatalogue.tsx`) — renvoi explicite vers la fiche NIV-xx.

**22+ pages** présentent une offre de formation (durée, tarif, Course JSON-LD…) **sans** `CatalogueInfosQualiopi` **ni** `RenvoiFicheCatalogue` — voir § 5.

---

## 2. Grille Ind. 1 — 5 fiches catalogue × 12 items (Étape 2)

Légende : ✅ = affiché explicitement sur la page (corps + bloc `CatalogueInfosQualiopi`) · ❌ = absent ou insuffisant · ⚠️ = présent avec écart de formulation

| Item | NIV-01 Bâtiment & TP | NIV-02 Appels d'offres | NIV-03 Conduite travaux | NIV-04 Claude AI | NIV-05 Maîtrise d'œuvre |
|------|:---:|:---:|:---:|:---:|:---:|
| 1. Prérequis | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2. Objectifs pédagogiques | ✅ | ✅ | ✅ | ✅ | ✅ |
| 3. Contenu / programme (ou PDF) | ✅ ⚠️ | ✅ | ✅ | ✅ | ✅ |
| 4. Durée | ✅ | ✅ | ✅ | ✅ | ✅ |
| 5. Modalités d'accès / inscription | ✅ | ✅ | ✅ | ✅ | ✅ |
| 6. Délais d'accès | ✅ | ✅ | ✅ | ✅ | ✅ |
| 7. Tarif | ✅ | ✅ | ✅ | ✅ | ✅ |
| 8. Contacts | ✅ | ✅ | ✅ | ✅ | ✅ |
| 9. Méthodes mobilisées | ✅ | ✅ | ✅ | ✅ | ✅ |
| 10. Modalités d'évaluation | ✅ ⚠️ | ✅ | ✅ | ✅ | ✅ |
| 11. Accessibilité handicap | ✅ | ✅ | ✅ | ✅ | ✅ |
| 12. Indicateurs de résultats | ✅ | ❌ | ✅ | ✅ | ✅ |
| **Date de mise à jour visible** | ✅ | ✅ | ✅ | ✅ | ✅ |

**Sources communes (items 1, 2, 4–11, date MAJ)** : `components/formation/InfosQualiopi.tsx` lignes 88–215, alimenté par `lib/qualiopi-info.ts` (`getInfosQualiopiForCatalogue`) et `config/qualiopi.ts`.

### Écarts détaillés sur les fiches catalogue

#### NIV-01 — `/formations/ia-batiment-travaux-publics`

| Item | Statut | Détail |
|------|--------|--------|
| 3 Programme | ⚠️ | Programme inline (`#programme`, `ProgrammeAccordionBatiment`) ✅ — **aucun lien de téléchargement PDF** alors que le fichier existe (`/formations/pdf/programme-niveau-1-ia-batiment-travaux-publics.pdf`, constante `LINKS.pdfProgrammeIaBtpNiveau1BatimentTp` dans `lib/internal-links.ts` L.87). CTA « Demander le programme » = mailto L.67, L.284, L.853. |
| 10 Évaluation | ⚠️ | L.754–755 : *« attestation Qualiopi en fin de session »* — **formulation interdite** (voir § 4). |
| 12 Indicateurs | ✅ | L.404–405 : note 4,85/5 + volume formé. |

#### NIV-02 — `/formations/ia-appels-offre-btp`

| Item | Statut | Détail |
|------|--------|--------|
| 3 Programme | ✅ | Lien PDF L.163–168 (`PDF_HREF`). |
| 12 Indicateurs | ❌ | Pas de mention chiffrée agrégée (satisfaction globale / nb personnes formées). Seul le questionnaire de satisfaction apparaît dans le bloc livrables L.414 (≠ indicateurs de résultats). |

#### NIV-03, NIV-04, NIV-05

Conformes sur les 12 items. PDF téléchargeable (NIV-03 L.163–168, NIV-04 L.187–192, NIV-05 L.137–142). Indicateurs L.324 (NIV-03), L.371 (NIV-04), L.268–269 (NIV-05).

---

## 3. Vérifications transversales (Étape 3)

### 3.1 Date de mise à jour

| Fiche | Emplacement | Valeur source |
|-------|-------------|---------------|
| Toutes (NIV-01…05) | `InfosQualiopi.tsx` L.83–84, L.213–214 | `QUALIOPI_FICHE_META.updatedAt` → `formatPreuvesMajLe(PREUVES.majAt)` = **03/06/2026**, version **V2026.1** |

### 3.2 Programmes PDF — existence locale (`public/`)

| Réf. | Chemin | Statut |
|------|--------|--------|
| Certificat Qualiopi | `/documents/certificat-qualiopi-ofc.pdf` | ✅ Présent (154 Ko) |
| NIV-01 | `/formations/pdf/programme-niveau-1-ia-batiment-travaux-publics.pdf` | ✅ Présent — **non lié depuis la fiche** |
| NIV-02 | `/formations/ia-appels-offre-btp/Programme_IA_AO_DCE_MT_ClaudePro_OFC.pdf` | ✅ Présent + lien page |
| NIV-03 | `/formations/ia-conduite-travaux-suivi-chantier/Programme_IA_Conduite_Travaux_OFC.pdf` | ✅ Présent + lien page |
| NIV-04 | `/formations/maitriser-claude-ai-btp/Programme_Maitriser_Claude_BTP_OFC.pdf` | ✅ Présent + lien page |
| NIV-05 | `/formations/ia-maitrise-oeuvre/programme_OFC_IA_MOE_4h.pdf` | ✅ Présent + lien page |

**404 potentiels :** aucun fichier manquant en local. Script de référence : `scripts/audit-liens-qualiopi.mjs`.

### 3.3 Certificat Qualiopi téléchargeable

- Fichier : `public/documents/certificat-qualiopi-ofc.pdf` ✅  
- Lien footer : `components/QualiopiCertificationNotice.tsx` L.36–42 (`QUALIOPI_LEGAL.certificatPdfHref`)  
- Validité affichée : 16/01/2025 → 15/01/2028, n° 520911-1 (`lib/qualiopi-info.ts` L.42–47)

### 3.4 Cohérence tarifaire

**Source unique :** `data/formations.ts` — `prixHT: 1200` pour les 5 parcours → `lib/tarifs-sessions.ts` (`TARIF_SESSION_DEBUTANT_HT` / `TARIF_SESSION_AVANCE_HT` = **1 200 € HT / session**).

| Zone | Montant affiché | Cohérent |
|------|-----------------|----------|
| 5 fiches catalogue | 1 200 € HT | ✅ |
| `/formations` (hero, tableau, FAQ) | 1 200 € HT via `TARIF_SESSION_FORFAIT_HT` | ✅ |
| Accueil `app/page.tsx` L.603 | 1 200 € HT | ✅ |
| `/financement-constructys-formation-ia-btp` | 1 200 € HT | ✅ |
| Landings métier (ex. conducteur travaux) | 1 200 € HT via `TARIF_FORFAIT_DEBUTANT_HT` | ✅ |

**Incohérences détectées :** aucune divergence de tarif catalogue (pas de 1 000 € HT sur les pages formation). Les seules occurrences de « 1000 » concernent des fourchettes budget (`components/booking/QualificationForm.tsx` L.39–40) ou des exemples métier non tarifaires.

### 3.5 Mentions légales Footer (`components/Footer.tsx`)

| Mention exigée | Présent | Ligne(s) |
|----------------|---------|----------|
| OFC Création d'Entreprise (raison sociale) | ⚠️ Partiel | L.177 (`QUALIOPI_LEGAL.raisonSociale` dans copyright) — pas en en-tête bloc identité |
| SIRET 905 244 281 00010 | ✅ | L.150 |
| NDA 11788515078 + mention non-agrément État | ✅ | L.152–154 |
| 6 rue Henri Dunant, 78280 Guyancourt | ❌ | Adresse absente — seulement « Guyancourt (78) » L.150 |
| Téléphone | ✅ | L.133–139, L.198–204 |
| Email laureolivie@yahoo.fr | ✅ | L.125–131 |
| Logo Qualiopi + périmètre | ✅ | `QualiopiCertificationNotice` L.172 |
| Certificat PDF + data.gouv | ✅ | `QualiopiCertificationNotice` L.35–50 |

---

## 4. Formulations Qualiopi — usage de la marque (Étape 3)

> **Règle :** la certification Qualiopi porte sur **l'organisme** (actions de formation), pas sur une formation individuelle. Écarts = motif d'audit marque + risque de confusion Ind. 1.

### 4.1 Priorité haute — pages formation / catalogue (visibles par le public)

| Fichier | Ligne | Formulation problématique | Correction suggérée |
|---------|-------|---------------------------|---------------------|
| `components/formations/FormationsHero.tsx` | 25 | « **5 formations Qualiopi** » | « 5 parcours du catalogue — organisme certifié Qualiopi » |
| `components/formations/FormationsHero.tsx` | 26 | « **5 parcours Qualiopi** » | Idem |
| `components/formations/FormationsHero.tsx` | 30 | « **Sessions Qualiopi** » | « Sessions en présentiel — organisme certifié Qualiopi » |
| `components/formations/FormationsHero.tsx` | 37 | label « **formations Qualiopi** » | « parcours catalogue » |
| `app/formations/ia-batiment-travaux-publics/page.tsx` | 755 | « **attestation Qualiopi** en fin de session » | « certificat de réalisation » (cf. `QUALIOPI_CERTIFICAT_REALISATION`) |
| `app/formations/ia-btp-saint-quentin-en-yvelines/page.tsx` | 296 | « **La formation est certifiée Qualiopi** » | « OFC est certifiée Qualiopi ; cette action de formation… » |
| `app/formation-ia-btp/page.tsx` | 62 | meta : « **Certifiée Qualiopi** » (formation) | « Organisme certifié Qualiopi » |
| `app/formation-ia-btp/page.tsx` | 457 | « formation … **certifiée Qualiopi** » | « dispensée par un organisme certifié Qualiopi » |
| `lib/faq.ts` | 222 | « **toutes certifiées Qualiopi** » | « toutes dispensées par OFC, organisme certifié Qualiopi » |
| `lib/faq.ts` | 631 | « **attestation Qualiopi** » | « certificat de réalisation » |
| `lib/faq.ts` | 675 | « **attestation Qualiopi** » | Idem |
| `lib/faq.ts` | 715 | « **Formation Qualiopi** » | « Action de formation (organisme certifié Qualiopi) » |
| `app/contact/page.tsx` | 154 | « **Formation Qualiopi** avec prise en charge » | « Formations OFC (organisme certifié Qualiopi) » |
| `app/claude-ai-btp/page.tsx` | 579 | « **programme Qualiopi** » | « programme de la fiche catalogue (organisme certifié Qualiopi) » |
| `components/formations/FormationCityPage.tsx` | 57 | « …forfait… · **Qualiopi** » (suffixe formation) | Préciser « organisme certifié Qualiopi » |

### 4.2 Priorité moyenne — landings métier (footer / meta / FAQ)

| Fichier | Ligne(s) | Exemple |
|---------|----------|---------|
| `app/formation-ia-canalisateur-tp/page.tsx` | 22 | meta « **Formation Qualiopi** » |
| `app/formation-ia-pisciniste-btp/page.tsx` | 25 | idem |
| `app/formation-ia-assistante-travaux/page.tsx` | 218 | « Formation **Qualiopi** » |
| `app/formation-ia-couvreur-btp/page.tsx` | 465 | « **Certifiée Qualiopi** » (organisme OK en footer, mais ambigu) |
| `app/formation-ia-dirigeant-pme-btp/page.tsx` | 440 | idem |
| `lib/formation-ia-metier-eight-rich.ts` | 58, 132, 173, 242, 337, 425, 513, 601, 689, 776 | « Session 4 h **Qualiopi** » / courseDescription « Session 4 h, **Qualiopi** » |
| `lib/formation-ia-btp-departements-config.ts` | 117, 219, 320, 371, 438, 500 | « **Certification Qualiopi** » rattachée à la session département |

### 4.3 Priorité basse — blog, contenus générés, docs internes

Non exhaustif — occurrences « formation certifiée Qualiopi », « formations certifiées Qualiopi », « Session 4 h Qualiopi » dans :

- `lib/blog.ts` (multiples entrées, ex. L.322, L.751, L.756, L.1079, L.1396, L.1795)
- `content/generated/*.json` (articles peintre, financement, etc.)
- `contenu/page-formation-ia-btp.md` L.152
- `GEO-OPTIMISATION-COMPLETE-RAPPORT-FINAL.md` L.139 (doc interne)

**Formulations correctes repérées (à conserver comme modèle) :**

- `components/formation/InfosQualiopi.tsx` L.208 : *« Organisme certifié Qualiopi — actions de formation »*
- `config/qualiopi.ts` L.40–41 : *« Organisme certifié Qualiopi. Financement OPCO… »*
- `app/formations-linkedin-learning/page.tsx` L.333 : *« Les actions de formation OFC … sont certifiées Qualiopi »* (organisme)

---

## 5. Landings SEO sans bloc Ind. 1 complet (Étape 2 — périmètre élargi)

Ces URLs **commercialisent une formation** (H1, durée 4 h, tarif, JSON-LD Course…) mais n'affichent **ni** les 12 items **ni** `<RenvoiFicheCatalogue />`.

| Fichier | Risque Ind. 1 |
|---------|---------------|
| `app/formation-ia-btp/page.tsx` | **Bloquant** — pilier SEO majeur, programme partiel, pas de renvoi réglementaire |
| `app/formation-ia-paris/page.tsx` | **Bloquant** — idem |
| `app/formation-ia-btp-ile-de-france/page.tsx` | **Bloquant** |
| `app/formation-ia-artisans-btp/page.tsx` | **Bloquant** |
| `app/formation-ia-construction/page.tsx` | **Bloquant** |
| `app/formation-ia-conducteur-travaux/page.tsx` | **Bloquant** |
| `app/formation-ia-conducteur-de-travaux-btp/page.tsx` | **Élevé** — prérequis/tarif partiels, pas de bloc complet |
| `app/formation-ia-chef-chantier-tp/page.tsx` | **Élevé** |
| `app/formation-ia-responsable-administratif-btp/page.tsx` | **Élevé** |
| `app/formation-ia-assistante-travaux/page.tsx` | **Élevé** |
| `app/formation-ia-assistante-gestion-btp/page.tsx` | **Élevé** |
| `app/formation-ia-charge-affaires-btp/page.tsx` | **Élevé** |
| `app/formation-ia-couvreur-btp/page.tsx` | **Élevé** |
| `app/formation-ia-dirigeant-pme-btp/page.tsx` | **Élevé** |
| `app/formation-ia-etancheur/page.tsx` | **Élevé** |
| `app/formation-ia-canalisateur-tp/page.tsx` | **Élevé** |
| `app/formation-ia-peintre-btp/page.tsx` | **Élevé** |
| `app/formation-ia-pisciniste-btp/page.tsx` | **Élevé** |
| + 8 landings métier (vitrier, paysagiste, macon-paysagiste, ferrailleur, geometre, cloturiste, travaux-publics…) | **Élevé** |

**29 landings avec `<RenvoiFicheCatalogue />`** : conformité **partielle** acceptable si l'auditeur valide le renvoi vers la fiche NIV-xx (pattern documenté `RenvoiFicheCatalogue.tsx` L.25–28). Les 12 items ne sont **pas** sur la landing elle-même.

---

## 6. Termes interdits — modalité présentiel IDF (Étape 3 bis)

Formations OFC = **présentiel, Île-de-France uniquement**. Termes à signaler :

| Terme | Contexte | Verdict |
|-------|----------|---------|
| **distanciel** | `lib/faq.ts` L.102, L.160 (questions FAQ qui **refusent** le distanciel) | ✅ OK — négation explicite |
| **distanciel** | `lib/formation-ia-gros-oeuvre-btp-landing.ts` L.53, `app/formation-ia-gros-oeuvre-btp/page.tsx` L.69 | ✅ OK — exclusion explicite |
| **distanciel** | `lib/formation-ia-marche-public-config.ts` L.191 (FAQ) | ✅ OK — question + réponse présentiel |
| **distanciel** | `lib/formation-ia-responsable-administratif-btp-landing.ts` L.184–189 | ✅ OK — FAQ « pas e-learning » |
| **distanciel** | `lib/tutos/tuto-skill-diuo-ofc.ts` L.290 | ⚠️ **Risque** — « 4 à 14 h, en présentiel en Île-de-France **ou distanciel** » peut être lu comme offre OFC |
| **à distance** | `lib/faq.ts` L.102, L.160 | ✅ OK (refus) |
| **en ligne** | `config/qualiopi.ts` L.33 « prise de rendez-vous **en ligne** » | ✅ OK — inscription RDV, pas la formation |
| **en ligne** | `app/formations-linkedin-learning/page.tsx`, `app/page.tsx` L.831 | ✅ OK — LinkedIn Learning (hors Qualiopi OFC), distinction faite |
| **e-learning** | `app/formations/plateforme/page.tsx` L.54 | ⚠️ Plateforme post-formation stagiaires — clarifier « hors action de formation présentielle » |
| **e-learning** | `lib/a-propos-narrative.ts` L.12 | ✅ OK — historique CNFPT personnel |
| **visio** | Nombreuses pages (Calendly découverte) | ✅ OK — usage autorisé (visio découverte) |
| **Mon Compte Formation** | — | ✅ Absent |
| **CPF** | `lib/faq.ts` L.331, `app/cgv/page.tsx` L.193, `app/financement-constructys-formation-ia-btp/page.tsx` L.530, `lib/blog.ts` | ⚠️ **Présent** — FAQ financement et CGV ; risque si lu comme éligibilité des sessions catalogue OFC (non certifiantes RNCP) |

---

## 7. Fichiers à modifier — items manquants (avec lignes)

### 7.1 Fiches catalogue — corrections ciblées

| Priorité | Fichier | Ligne(s) | Action |
|----------|---------|----------|--------|
| P1 | `app/formations/ia-appels-offre-btp/page.tsx` | ~440 (avant `CatalogueInfosQualiopi`) | Ajouter bloc indicateurs : `formatPersonnesFormeesCount()`, `siteStats.noteMoyenneAffichee` + lien `/indicateurs-resultats` (`IndicateursResultatsLink`) |
| P2 | `app/formations/ia-batiment-travaux-publics/page.tsx` | ~663 (section `#programme`) | Ajouter lien PDF `LINKS.pdfProgrammeIaBtpNiveau1BatimentTp` (pattern NIV-02 L.163–168 ou `FormationProgrammePdfDownloadBanner`) |
| P1 | `app/formations/ia-batiment-travaux-publics/page.tsx` | 754–755 | Remplacer « attestation Qualiopi » → « certificat de réalisation » |
| P2 | `components/formation/InfosQualiopi.tsx` | 213–217 | Envisager d'intégrer item 12 (stats + lien indicateurs) dans **toutes** les fiches via le composant commun |

### 7.2 Footer — mentions légales complètes

| Fichier | Ligne(s) | Action |
|---------|----------|--------|
| `components/Footer.tsx` | 149–156 | Ajouter adresse complète : « 6 rue Henri Dunant, 78280 Guyancourt » (`CONTACT.address` / `SCHEMA_GEO`) + raison sociale visible |

### 7.3 Landings SEO — bloc Ind. 1 ou renvoi

| Priorité | Fichiers (exemples) | Action |
|----------|---------------------|--------|
| P1 | `app/formation-ia-btp/page.tsx` | Ajouter `<RenvoiFicheCatalogue programmeRef="NIV-01" />` ou migrer infos complètes |
| P1 | `app/formation-ia-paris/page.tsx`, `app/formation-ia-btp-ile-de-france/page.tsx` | Idem |
| P2 | 20 landings métier listées § 5 | Généraliser `<RenvoiFicheCatalogue programmeRef="NIV-01" />` (ou NIV adapté) |

### 7.4 Formulations Qualiopi — échantillon prioritaire

| Fichier | Ligne(s) |
|---------|----------|
| `components/formations/FormationsHero.tsx` | 25, 26, 30, 37 |
| `lib/faq.ts` | 202, 222, 631, 675, 715 |
| `app/formations/ia-btp-saint-quentin-en-yvelines/page.tsx` | 296 |
| `app/formation-ia-btp/page.tsx` | 62, 457 |
| `app/contact/page.tsx` | 154 |

### 7.5 Termes interdits / risque

| Fichier | Ligne(s) | Action |
|---------|----------|--------|
| `lib/tutos/tuto-skill-diuo-ofc.ts` | 290 | Supprimer « ou distanciel » ou préciser « hors catalogue OFC » |
| `lib/faq.ts` | 331 | Reformuler CPF : non éligible sessions catalogue actuelles |
| `app/cgv/page.tsx` | 193 | Vérifier pertinence mention CPF |

### 7.6 Placeholder indicateurs (Ind. 2 — impact Ind. 1 item 12)

| Fichier | Ligne(s) | Action |
|---------|----------|--------|
| `lib/constants.ts` | 40–45 | `PREUVES.tauxAbandon.valeur` = `__X,X %__` — non affichable sur `/indicateurs-resultats` |

---

## 8. Plan de correction ordonné par priorité

### Priorité 1 — Bloquant audit Ind. 1 (avant contrôle)

1. **NIV-02** : ajouter indicateurs de résultats agrégés (satisfaction + volume formé) sur `app/formations/ia-appels-offre-btp/page.tsx`.
2. **Pilier SEO** `app/formation-ia-btp/page.tsx` (+ Paris, IDF) : intégrer `<RenvoiFicheCatalogue />` ou équivalent complet.
3. **Formulations marque** : corriger « formations Qualiopi », « formation certifiée Qualiopi », « attestation Qualiopi » sur hero catalogue (`FormationsHero.tsx`) et NIV-01 L.755.
4. **Footer** : adresse postale complète + raison sociale explicite.

### Priorité 2 — Élevé (conformité renforcée)

5. **NIV-01** : lien téléchargement PDF programme (fichier déjà en `public/`).
6. **20+ landings métier** sans renvoi : déployer `<RenvoiFicheCatalogue programmeRef="NIV-01" />` (pattern existant).
7. **FAQ** `lib/faq.ts` : harmoniser formulations Qualiopi (L.202, 222, 631, 675) + clarifier CPF L.331.
8. **`lib/tutos/tuto-skill-diuo-ofc.ts`** L.290 : retirer ambiguïté distanciel.

### Priorité 3 — Amélioration continue

9. Factoriser item 12 dans `CatalogueInfosQualiopi` (stats + `IndicateursResultatsLink`) pour les 5 fiches.
10. Passer sur `lib/formation-ia-metier-eight-rich.ts` et landings département : « Session Qualiopi » → « organisme certifié Qualiopi ».
11. Nettoyer blog / contenus générés (occurrences « formation certifiée Qualiopi »).
12. Compléter `PREUVES.tauxAbandon` (placeholder) pour `/indicateurs-resultats`.
13. Exécuter `node scripts/audit-liens-qualiopi.mjs --base=https://www.laureolivie.fr` en production post-déploiement.

---

## 9. Synthèse exécutive

| Domaine | Verdict |
|---------|---------|
| **5 fiches catalogue** (actions de formation certifiées) | **4/5 conformes** sur les 12 items · **NIV-02** : item 12 manquant · **NIV-01** : PDF non lié + formulation « attestation Qualiopi » |
| **Programmes PDF** | 5/5 fichiers présents en local · 1/5 sans lien depuis la fiche (NIV-01) |
| **Certificat Qualiopi** | ✅ Fichier + lien footer |
| **Tarifs** | ✅ Cohérents à **1 200 € HT / session** sur tout le catalogue |
| **Footer légal** | ⚠️ Adresse postale complète absente |
| **Usage marque Qualiopi** | ❌ Nombreuses formulations « formation certifiée Qualiopi » / « X formations Qualiopi » |
| **Landings SEO** | ⚠️ 22+ pages offre sans bloc Ind. 1 ni renvoi · 29 pages avec renvoi catalogue (partiel) |
| **Termes modalité** | ✅ Pas de promesse distanciel sur fiches NIV · 1 tuto + mentions CPF à clarifier |

**Conclusion Ind. 1 :** le socle réglementaire (`CatalogueInfosQualiopi`) est **solide et complet** sur les 5 fiches catalogue. Les écarts principaux concernent (1) **une fiche incomplète sur les indicateurs de résultats** (NIV-02), (2) **l'écosystème SEO** (landings sans information vérifiable), (3) **l'usage de la marque Qualiopi** rattachée aux formations plutôt qu'à l'organisme, et (4) **le footer** (adresse incomplète).

---

*Rapport généré par analyse statique du dépôt — aucune modification de fichier n'a été effectuée.*
