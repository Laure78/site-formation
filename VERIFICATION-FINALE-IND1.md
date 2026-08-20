# Vérification finale — Indicateur 1 Qualiopi

**Organisme :** OFC Création d'Entreprise (Laure Olivié)  
**Site :** laureolivie.fr — dépôt Next.js App Router  
**Date de vérification :** 20/08/2026  
**Méthode :** reprise de l'audit `AUDIT-QUALIOPI-IND1.md` (revue statique du code, sans modification)  
**Référentiel :** RNQ — Ind. 1 : *« Le prestataire diffuse une information accessible au public, détaillée et vérifiable sur les prestations proposées. »*

---

## Synthèse comparative (avant / après corrections)

| Domaine | Audit initial (20/08/2026) | Vérification finale |
|---------|---------------------------|---------------------|
| Composant Ind. 1 fiches catalogue | `CatalogueInfosQualiopi` (9 sections + date) | **`CatalogueInfosPratiques`** (`components/InfosPratiques.tsx`) — 11 items dans le `<dl>` + date MAJ ; item 12 reste en corps de page |
| Fiches 12/12 items | **4/5** — NIV-02 item 12 manquant | **4/5** — NIV-02 item 12 **toujours manquant** |
| NIV-01 PDF programme | Fichier présent, **non lié** | **✅ Lié** — hero L.284-290 + bloc Contenu `InfosPratiques` |
| NIV-01 « attestation Qualiopi » | ❌ L.754-755 | **✅ Corrigé** — `QUALIOPI_EVALUATION_STANDARD` → « certificat de réalisation » |
| Footer adresse complète | ❌ « Guyancourt (78) » seulement | **✅** `Footer.tsx` L.149-156 — 6 rue Henri Dunant, 78280 Guyancourt |
| Formulations marque (hero catalogue) | ❌ « formations Qualiopi » | **✅** `FormationsHero.tsx` L.25-30 — « organisme certifié Qualiopi » |
| Pilier `formation-ia-btp` | ❌ sans renvoi Ind. 1 | **✅** `<RenvoiFicheCatalogue programmeRef="NIV-01" />` L.692 |
| Termes CPF / FSE+ / GERESO (pages publiques) | ⚠️ présents | **✅ absents** de `app/`, `components/`, `public/` |
| PDF morts | 0/5 programmes · certificat OK | **20/22 OK** — 2 documents institutionnels manquants |
| Usage marque Qualiopi (ensemble site) | ❌ nombreuses occurrences | **⚠️ partiel** — `app/` + `components/` propres ; écarts résiduels dans `lib/faq.ts`, blog, landings data |

---

## 1. Tableau Fiche formation × 12 items (version après correction)

**Composant commun :** `<CatalogueInfosPratiques programmeRef="NIV-xx" />` → `components/InfosPratiques.tsx` L.53-181, alimenté par `lib/infos-pratiques-catalogue.ts`.

Légende : ✅ = conforme · ❌ = absent · ⚠️ = présent avec écart mineur

| Item | NIV-01 Bâtiment & TP | NIV-02 Appels d'offres | NIV-03 Conduite travaux | NIV-04 Claude AI | NIV-05 Maîtrise d'œuvre |
|------|:---:|:---:|:---:|:---:|:---:|
| 1. Prérequis | ✅ | ✅ | ✅ | ✅ | ✅ |
| 2. Objectifs pédagogiques | ✅ | ✅ | ✅ | ✅ | ✅ |
| 3. Contenu / programme (ou PDF) | ✅ | ✅ | ✅ | ✅ | ✅ |
| 4. Durée | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ |
| 5. Modalités d'accès / inscription | ✅ | ✅ | ✅ | ✅ | ✅ |
| 6. Délais d'accès | ✅ | ✅ | ✅ | ✅ | ✅ |
| 7. Tarif | ✅ | ✅ | ✅ | ✅ | ✅ |
| 8. Contacts | ✅ | ✅ | ✅ | ✅ | ✅ |
| 9. Méthodes mobilisées | ✅ | ✅ | ✅ | ✅ | ✅ |
| 10. Modalités d'évaluation | ✅ | ✅ | ✅ | ✅ | ✅ |
| 11. Accessibilité handicap | ✅ | ✅ | ✅ | ✅ | ✅ |
| 12. Indicateurs de résultats | ✅ | ❌ | ✅ | ✅ | ✅ |
| **Date de mise à jour visible** | ✅ | ✅ | ✅ | ✅ | ✅ |

### Détail des écarts

| Item | Fiche | Statut | Emplacement / note |
|------|-------|--------|-------------------|
| 3 PDF | NIV-01 | ✅ | Hero L.284-290 (`LINKS.pdfProgrammeIaBtpNiveau1BatimentTp`) + lien dans `InfosPratiques` (Contenu) |
| 3 PDF | NIV-02…05 | ✅ | Hero PDF (ex. NIV-02 L.165-168) + lien Contenu dans `InfosPratiques` |
| 4 Durée | NIV-01, 02, 03, 05 | ⚠️ | « 4 heures » sans créneau horaire — seul NIV-04 a `horaires: 'matin (9h00 – 13h00)'` dans `data/formations.ts` L.107 ; TODO `lib/infos-pratiques-catalogue.ts` L.91 |
| 4 Durée | NIV-04 | ✅ | « 4 heures (9h00 – 13h00) » via `libelleDureeInfosPratiques` |
| 10 Évaluation | Toutes | ✅ | `QUALIOPI_EVALUATION_STANDARD` (`lib/qualiopi-info.ts` L.92-97) inclut `QUALIOPI_CERTIFICAT_REALISATION` |
| 12 Indicateurs | NIV-01 | ✅ | `app/formations/ia-batiment-travaux-publics/page.tsx` L.410-411 |
| 12 Indicateurs | NIV-02 | ❌ | **Aucun bloc** satisfaction agrégée / volume formé avant `CatalogueInfosPratiques` L.445 |
| 12 Indicateurs | NIV-03 | ✅ | `app/formations/ia-conduite-travaux-suivi-chantier/page.tsx` L.327-328 |
| 12 Indicateurs | NIV-04 | ✅ | `app/formations/maitriser-claude-ai-btp/page.tsx` L.371-372 |
| 12 Indicateurs | NIV-05 | ✅ | `app/formations/ia-maitrise-oeuvre/page.tsx` L.270-271 (bio formatrice — stats agrégées) |
| Date MAJ | Toutes | ✅ | `InfosPratiques.tsx` L.170-172 ← `QUALIOPI_FICHE_META.updatedAt` (**03/06/2026**, V2026.1) |

**Verdict fiches catalogue : 4/5 conformes sur les 12 items** (identique à l'audit initial — seule correction bloquante non appliquée : NIV-02 item 12).

---

## 2. Items encore manquants (fichier + ligne exacte)

### 2.1 Indicateur 1 — contenu réglementaire

| Priorité | Fichier | Ligne(s) | Item | Action requise |
|----------|---------|----------|------|----------------|
| **P1** | `app/formations/ia-appels-offre-btp/page.tsx` | **445** (avant `<CatalogueInfosPratiques programmeRef="NIV-02" />`) | **12. Indicateurs de résultats** | Ajouter paragraphe : note `{siteStats.noteMoyenneAffichee}`, `{formatPersonnesFormeesCount()}`, lien `/indicateurs-resultats` (pattern NIV-03 L.327-328) |
| P2 | `data/formations.ts` | codes NIV-01, NIV-02, NIV-03, NIV-05 | **4. Durée** (créneaux) | Compléter champ `horaires` (ex. `matin (9h00 – 13h00)`) — seul NIV-04 renseigné L.107 |
| P2 | `public/documents/annuaire-handicap.pdf` | — | PDF accessibilité | Fichier absent — lié depuis `app/annuaire-handicap/page.tsx` L.65, L.73 |
| P2 | `public/documents/conditions-constructys-2026.pdf` | — | PDF financement | Fichier absent — lié depuis `app/financement-constructys-formation-ia-btp/page.tsx` L.289 |

### 2.2 Formulations marque Qualiopi (hors Ind. 1 strict, mais signalées)

| Fichier | Ligne | Formulation |
|---------|-------|-------------|
| `lib/faq.ts` | **215** | « **Programme certifié Qualiopi** » |
| `lib/faq.ts` | 246 | Question « formations … **certifiées Qualiopi** ? » (réponse L.247 correcte : organisme) |
| `lib/faq.ts` | 696 | « formation IA pour le BTP **Qualiopi** » (suffixe ambigu) |
| `lib/guide-assistants-travaux-content.ts` | 115 | « formation IA … **certifiée Qualiopi** » |
| `lib/blog.ts` | 322, 751, 1124, 1387 | « formations **certifiées Qualiopi** » / « offre … **certifiée Qualiopi** » |
| `lib/blog-formation-ia-cctp-pillar.ts` | 78 | « session **certifiée Qualiopi** » |
| `lib/media-machine/config.ts` | 37 | « **Formation certifiée Qualiopi** » |
| `lib/formation-ia-metier-eight-rich.ts` | 65, 131, etc. | « formation **Qualiopi** » / « catalogue **Qualiopi** » (SEO métier) |

---

## 3. Confirmation — aucune formulation ne certifie une formation au titre de Qualiopi

### ✅ Confirmé pour les surfaces prioritaires (`app/` + `components/`)

Recherche ciblée sur : `formation certifiée Qualiopi`, `formations certifiées Qualiopi`, `Programme certifié Qualiopi`, `formations Qualiopi`, `attestation Qualiopi`, `La formation est certifiée` :

**Résultat : 0 occurrence** dans `app/` et `components/`.

Corrections validées par rapport à l'audit initial :

| Fichier | Avant | Après |
|---------|-------|-------|
| `components/formations/FormationsHero.tsx` | « 5 formations Qualiopi » | L.25-30 : « organisme certifié Qualiopi » |
| `app/formations/ia-batiment-travaux-publics/page.tsx` | « attestation Qualiopi » | Évaluation standard → certificat de réalisation |
| `app/formation-ia-btp/page.tsx` | meta « Certifiée Qualiopi » | Organisme certifié + `RenvoiFicheCatalogue` |
| `app/formations/ia-btp-saint-quentin-en-yvelines/page.tsx` | « La formation est certifiée Qualiopi » | Corrigé (audit initial P1) |

Formulations **correctes** repérées (modèle à conserver) :

- `app/formations/ia-maitrise-oeuvre/page.tsx` L.262-263 : « organisme certifié Qualiopi »
- `app/formation-ia-travaux-publics/page.tsx` L.277-278 : « organisme **certifié Qualiopi** » (financement OPCO)
- `config/qualiopi.ts` L.37-39 : `QUALIOPI_ORGANISME_CERTIFIE` / `QUALIOPI_FORMATION_DISPENSEE`

### ❌ Non confirmé pour l'ensemble du dépôt

Des formulations rattachant la certification à la **formation** ou au **programme** subsistent dans les contenus data (`lib/faq.ts` L.215, `lib/blog.ts`, landings métier, pipeline média). Voir § 2.2.

**Conclusion § 3 :** confirmation **partielle** — pages formation et composants UI conformes ; contenus FAQ/blog/SEO métier à finaliser.

---

## 4. Confirmation — périmètre « ACTIONS DE FORMATION » avec le logo

### ✅ Confirmé

| Élément | Fichier | Ligne(s) | Détail |
|---------|---------|----------|--------|
| Texte réglementaire source | `config/qualiopi.ts` | 29-30 | `QUALIOPI_MENTION_PERIMETRE` = *« … catégorie d'action suivante : **ACTIONS DE FORMATION**. »* |
| Propagation | `lib/qualiopi-info.ts` | 42 | `qualiopiCategoryMention: QUALIOPI_MENTION_PERIMETRE` |
| Affichage footer | `components/QualiopiCertificationNotice.tsx` | 28-31 | `{QUALIOPI_LEGAL.qualiopiCategoryMention}` au-dessus des liens certificat |
| Visuel Certifopac | `components/QualiopiLogo.tsx` | 29 | Commentaire + `QualiopiBadge` — mention intégrée au visuel officiel |
| Image asset | `lib/photos.ts` | 36-38 | `/images/logo-qualiopi-certifopac-actions-formation.png` |
| Footer global | `components/Footer.tsx` | ~L.185+ | `<QualiopiCertificationNotice />` sur toutes les pages |

Le logo Qualiopi n'apparaît **jamais seul** sans périmètre (texte L.31 ou visuel Certifopac).

---

## 5. Liste des liens PDF vérifiés

Scan : constantes `lib/internal-links.ts` + attributs `href="…pdf"` dans `app/`, `components/`, `lib/` — existence dans `public/`.

| Statut | Chemin PDF | Référencé depuis |
|--------|-----------|-----------------|
| ✅ | `/documents/certificat-qualiopi-ofc.pdf` | `QualiopiCertificationNotice`, `LINKS.certificatQualiopi` |
| ❌ **404 local** | `/documents/annuaire-handicap.pdf` | `app/annuaire-handicap/page.tsx` L.65, L.73 |
| ❌ **404 local** | `/documents/conditions-constructys-2026.pdf` | `app/financement-constructys-formation-ia-btp/page.tsx` L.289 |
| ✅ | `/formations/pdf/programme-niveau-1-ia-batiment-travaux-publics.pdf` | NIV-01 hero + `InfosPratiques` |
| ✅ | `/formations/ia-appels-offre-btp/Programme_IA_AO_DCE_MT_ClaudePro_OFC.pdf` | NIV-02 |
| ✅ | `/formations/ia-appels-offre-btp/Support_complementaire_AO_BTP.pdf` | NIV-02 |
| ✅ | `/formations/ia-conduite-travaux-suivi-chantier/Programme_IA_Conduite_Travaux_OFC.pdf` | NIV-03 |
| ✅ | `/formations/maitriser-claude-ai-btp/Programme_Maitriser_Claude_BTP_OFC.pdf` | NIV-04 |
| ✅ | `/formations/ia-maitrise-oeuvre/programme_OFC_IA_MOE_4h.pdf` | NIV-05 |
| ✅ | `/formations/carrousels/Carrousel_A_Presentation_Formation.pdf` | Pages formations |
| ✅ | `/ressources/pdf/guide-assistants-travaux-ofc.pdf` | Guides ressources |
| ✅ | `/ressources/pdf/guide-charge-affaires-ofc.pdf` | Guides ressources |
| ✅ | `/ressources/pdf/guide-chef-de-chantier-ofc.pdf` | Guides ressources |
| ✅ | `/ressources/pdf/guide-claude-btp-ofc.pdf` | Guides ressources |
| ✅ | `/ressources/pdf/guide-dirigeant-btp-ofc.pdf` | Guides ressources |
| ✅ | `/ressources/pdf/guide-moe-ia.pdf` | Guides ressources |
| ✅ | `/ressources/pdf/guide-repondre-ao-btp-ofc-2026.pdf` | Guides ressources |
| ✅ | `/ressources/pdf/guide-rh-btp-ia-ofc.pdf` | Guides ressources |
| ✅ | `/ressources/pdf/pack-conducteur-de-travaux-ofc.pdf` | Ressources |
| ✅ | `/ressources/pdf/tuto-skill-analyse-ccap-bework.pdf` | Tutoriels |
| ✅ | `/ressources/pdf/tuto-skill-livret-integration-ofc.pdf` | Tutoriels |
| ✅ | `/ressources/pdf/tuto-skill-memoire-reclamation-bework.pdf` | Tutoriels |

**Bilan : 20 fichiers présents / 22 référencés — 2 manquants** (régression vs audit initial qui ne listait que les programmes catalogue, tous présents).

---

## 6. Confirmation — aucun terme interdit ne subsiste

Périmètre contrôlé : pages publiques `app/`, `components/`, `public/` (+ sanitizer actif dans `lib/infos-pratiques-catalogue.ts` L.69-78).

| Terme | Statut | Détail |
|-------|--------|--------|
| **CPF** | ✅ Absent | Supprimé FAQ, CGV, financement, politique confidentialité |
| **FSE+** | ✅ Absent | Retiré `.cursorrules` et pages publiques |
| **GERESO** | ✅ Absent | Retiré clients / logos |
| **Mon Compte Formation** | ✅ Absent | Sanitizer remplace si fuite dans textes Qualiopi |
| **distanciel** (offre OFC) | ✅ Absent | Plus de promesse distanciel ; `lib/tutos/tuto-skill-diuo-ofc.ts` corrigé |
| **à distance** (formation) | ✅ Absent | FAQ reformulées ; sanitizer InfosPratiques |
| **e-learning** (catalogue OFC) | ✅ OK | Uniquement `formations/plateforme` (post-formation stagiaires) et historique à-propos |
| **en ligne** | ✅ OK | Calendly / LinkedIn Learning / admin — hors action de formation Qualiopi |
| **visio** | ✅ OK | RDV découverte / J+30 — usage autorisé |
| **hors Île-de-France** (offre) | ✅ Absent | `public/llms.txt` L.124 : « pas de formation à distance » |
| **Modalité catalogue** | ✅ | `MODALITE_PEDAGOGIQUE_CATALOGUE` = « Présentiel — Île-de-France uniquement » |

**Conclusion § 6 :** ✅ confirmé pour les pages publiques et le bloc Informations pratiques. Occurrences résiduelles dans contenus blog générés (`lib/blog.ts`) ou skills BeWork (`public/ressources/skills/`) hors périmètre formation OFC Qualiopi.

---

## 7. Build de production (`npm run build`)

**Commande exécutée le 20/08/2026.**

| Étape | Résultat |
|-------|----------|
| `generate-sitemap-dates` | ✅ |
| `build-bibliotheque-skills` (24 skills) | ✅ |
| Compilation Turbopack | ✅ Compiled successfully in ~47s |
| TypeScript | ❌ **Échec** |

### Erreur de typage

```
./app/formation-ia-assistante-gestion-btp/page.tsx:55:19
Type error: Cannot find name 'TARIF_FORFAIT_AVANCE_HT'.
```

Contexte : schéma JSON-LD `Offer.price` L.55 — identifiant non importé / renommé (tarifs centralisés dans `lib/tarifs-sessions.ts`).

**Impact :** le build ne passe pas ; déploiement bloqué tant que cette référence n'est pas corrigée (importer `TARIF_SESSION_AVANCE_HT` ou constante équivalente depuis `lib/tarifs-sessions.ts`).

Aucune autre erreur TypeScript remontée après celle-ci (build interrompu au premier échec).

---

## 8. Verdict final Ind. 1

| Critère | Verdict |
|---------|---------|
| 5 fiches catalogue × 12 items | **4/5** — NIV-02 item 12 non corrigé |
| Programmes PDF catalogue | **5/5** présents et liés |
| Footer légal complet | **✅** |
| Marque Qualiopi (UI formation) | **✅** |
| Marque Qualiopi (FAQ/blog/data) | **⚠️** écarts résiduels |
| Périmètre logo ACTIONS DE FORMATION | **✅** |
| Termes interdits (pages publiques) | **✅** |
| PDF institutionnels | **❌** 2 fichiers manquants |
| Build production | **❌** 1 erreur TS `formation-ia-assistante-gestion-btp` |

**Progression nette vs audit initial :** corrections majeures appliquées (PDF NIV-01, footer, hero catalogue, composant `InfosPratiques`, renvoi pilier SEO, nettoyage CPF/FSE+/GERESO, formulations UI). **Point bloquant restant pour Ind. 1 :** item 12 sur NIV-02.

---

*Rapport généré par analyse statique du dépôt post-corrections — aucune modification de fichier n'a été effectuée lors de cette vérification.*
