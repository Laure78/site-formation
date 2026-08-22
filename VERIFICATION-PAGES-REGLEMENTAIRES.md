# Vérification — pages réglementaires Qualiopi (indicateur 1)

**Date :** 22 août 2026  
**Périmètre :** 4 pages conformité (`COMPLIANCE_SITEMAP_PATHS`) — hub, livret, règlement intérieur, réclamations.

---

## 1. Métadonnées SEO et JSON-LD

| Page | URL | H1 | Title SEO | Longueur description | Canonical | JSON-LD présent |
|------|-----|-----|-----------|----------------------|-----------|-----------------|
| Hub informations réglementaires | `/informations-reglementaires` | Informations réglementaires et qualité | Informations réglementaires \| Laure Olivié | **157** car. | `https://www.laureolivie.fr/informations-reglementaires` | **WebPage** + **BreadcrumbList** (`schema-informations-reglementaires`) |
| Livret d'accueil du stagiaire | `/livret-accueil-stagiaire` | Livret d'accueil du stagiaire | Livret d'accueil du stagiaire \| Laure Olivié | **174** car. | `https://www.laureolivie.fr/livret-accueil-stagiaire` | **WebPage** + **Organization** + **BreadcrumbList** (`schema-livret-accueil`) |
| Règlement intérieur | `/reglement-interieur` | Règlement intérieur | Règlement intérieur \| Laure Olivié | **169** car. | `https://www.laureolivie.fr/reglement-interieur` | **WebPage** + **BreadcrumbList** (`schema-reglement-interieur`) |
| Réclamations et médiation | `/reclamations` | Réclamations, difficultés et aléas | Réclamations et médiation \| Laure Olivié | **183** car. ⚠️ | `https://www.laureolivie.fr/reclamations` | **FAQPage** uniquement (`schema-faq-reclamations`) — pas de WebPage ni BreadcrumbList dédiés |

**Sources :** `app/informations-reglementaires/page.tsx`, `app/livret-accueil-stagiaire/page.tsx`, `app/reglement-interieur/page.tsx`, `app/reclamations/page.tsx` · canonical via `createPageMetadata({ path })` → `siteAbsoluteUrl`.

**Écarts SEO notables :**

- Meta descriptions **livret (174)**, **règlement (169)** et **réclamations (183)** dépassent la cible projet **≤ 160 caractères**.
- Title SEO réclamations : **40 car.** (≤ 65 ✓).

---

## 2. Maillage Footer et fiches formation

### Footer — 4 pages confirmées ✅

| Page | Emplacement footer | Libellé |
|------|-------------------|---------|
| `/informations-reglementaires` | Colonne **Légal** (`NAV_LEGAL`) | Informations réglementaires |
| `/livret-accueil-stagiaire` | Colonne **Informations réglementaires** (`NAV_REGLEMENTAIRE`) | Livret d'accueil du stagiaire |
| `/reglement-interieur` | Colonne **Informations réglementaires** (`NAV_REGLEMENTAIRE`) | Règlement intérieur |
| `/reclamations` | Colonne **Informations réglementaires** (`NAV_REGLEMENTAIRE`) | Réclamations et médiation |

**Fichiers :** `lib/nav.ts` (définition), `lib/site.ts` → `nav.footer.reglementaire` / `nav.footer.legal`, rendu dans `components/Footer.tsx`.

### Fiches formation catalogue — 3 documents stagiaire ✅

Le bloc `CatalogueInfosPratiques` (`components/InfosPratiques.tsx`, lignes 186–199) affiche sur **chaque fiche** un paragraphe « Avant votre inscription » avec liens vers :

1. `LINKS.livretAccueilStagiaire` — livret d'accueil  
2. `LINKS.reglementInterieur` — règlement intérieur  
3. `LINKS.reclamations` — procédure de réclamation  

**5 fiches auditées** (`scripts/audit-qualiopi-fiches-formations.ts`) :

| Réf. | Fichier page |
|------|--------------|
| NIV-01 | `app/formations/ia-batiment-travaux-publics/page.tsx` |
| NIV-02 | `app/formations/ia-appels-offre-btp/page.tsx` |
| NIV-03 | `app/formations/ia-conduite-travaux-suivi-chantier/page.tsx` |
| NIV-04 | `app/formations/maitriser-claude-ai-btp/page.tsx` |
| NIV-05 | `app/formations/ia-maitrise-oeuvre/page.tsx` |

Toutes importent `<CatalogueInfosPratiques programmeRef="NIV-0X" />`.

---

## 3. Liens de téléchargement PDF

Vérification filesystem : `public/documents/*.pdf` (22 août 2026).

| Lien (constante `LINKS`) | URL | Page(s) qui exposent le lien | Fichier sur disque | Statut |
|----------------------------|-----|------------------------------|--------------------|--------|
| `certificatQualiopi` | `/documents/certificat-qualiopi-ofc.pdf` | Hub, livret, footer (`NAV_REGLEMENTAIRE`) | `public/documents/certificat-qualiopi-ofc.pdf` | ✅ **Existe** |
| `livretAccueilStagiairePdf` | `/documents/livret-accueil-stagiaire-ofc.pdf` | Livret (CTA pied de page) | — | ❌ **LIEN MORT** |
| `reglementInterieurPdf` | `/documents/reglement-interieur-ofc.pdf` | Règlement intérieur (CTA pied de page) | — | ❌ **LIEN MORT** |
| `procedureReclamationsPdf` | `/documents/procedure-reclamations-ofc-v3.pdf` | Réclamations (CTA pied de page) | — | ❌ **LIEN MORT** |

**Résumé :** 4 liens PDF réglementaires recensés · **1 valide** · **3 liens morts** (documents stagiaire / procédure absents du dépôt `public/documents/`).

> ⚠️ Priorité corrective : déposer les 3 PDF manquants ou retirer/masquer les CTA jusqu'à publication — un lien de téléchargement cassé sur une page de conformité est pire qu'absence de lien.

---

## 4. TODO restants dans le code (données non trouvées dans le repo)

| Page | Fichier | TODO visible |
|------|---------|--------------|
| Réclamations | `app/reclamations/page.tsx` (~L254–256) | **Médiateur de la consommation** : nom, adresse, site web et validité de l'adhésion en cours — non renseignés dans le dépôt |
| Livret d'accueil | `app/livret-accueil-stagiaire/page.tsx` (~L213–215) | **Partenaire(s) organisateur(s) inter** — à compléter si affichage public souhaité |
| Livret d'accueil | `app/livret-accueil-stagiaire/page.tsx` (~L277–279) | **Horaires types jour J** — formulation unique vs renvoi convocation seule (varie selon parcours NIV-01…05) |

**Règlement intérieur** et **hub informations réglementaires** : aucun TODO explicite dans le code source des pages.

---

## 5. Termes interdits et formulations Qualiopi

### Scan sur les 4 `page.tsx` ✅ (termes interdits absents)

Recherche insensible à la casse pour :

`distanciel` · `à distance` · `en ligne` · `e-learning` · `CPF` · `Mon Compte Formation`

→ **Aucune occurrence** sur les quatre pages.

Également absent sur ces pages : `visio`, `Calendly`, variantes « distance ».

### Formulations « formation certifiée Qualiopi » ✅

Aucune formulation ne présente une **formation** ou un **parcours** comme certifié Qualiopi.

Mentions Qualiopi relevées (conformes — **organisme** ou **certificateur**, pas la formation) :

| Page | Formulation |
|------|-------------|
| Livret | « Organisme certifié Qualiopi » + lien certificat PDF |
| Hub | Carte « Certificat Qualiopi » (organisme certificateur Certifopac) |
| Hub | « indicateur 2 Qualiopi » (indicateurs de résultats) |
| Réclamations | « CERTIFOPAC, organisme certificateur » (voie de recours) |

---

## 6. Sitemap et robots.txt

### Sitemap ✅

Les 4 URL sont dans `COMPLIANCE_SITEMAP_PATHS` (`app/sitemap.ts`) :

- `/informations-reglementaires`
- `/livret-accueil-stagiaire`
- `/reglement-interieur`
- `/reclamations`

Paramètres : `changeFrequency: yearly`, `priority: 0.3`.  
`/reglement-interieur` n'est **pas** dans `SITEMAP_EXCLUDED_LOW_VALUE_PATHS` (mentions légales, CGV, confidentialité uniquement).

### robots.txt ✅

`lib/robots-txt.ts` — `PRIVATE_DISALLOW` :

- `/api/`
- `/admin/`
- `/acces-admin`
- `/espace-apprenant/`

Les 4 chemins conformité ne sont **pas** bloqués ; règle par défaut `allow: /` pour tous les user-agents (search + bots IA listés).

---

## 7. Build de production

**Commande :** `npm run build` (22 août 2026)  
**Résultat :** ❌ **Échec** — exit code 1 (Turbopack, Next.js 16.1.6)

### Erreur liée aux pages réglementaires

| Fichier | Erreur |
|---------|--------|
| `app/livret-accueil-stagiaire/page.tsx` | Import `QUALIOPI_CERTIFICAT_REALISATION` depuis `@/lib/qualiopi-info` — **export inexistant** (suggestion Turbopack : `QUALIOPI_RECLAMATIONS`) |

### Autres erreurs de compilation (hors périmètre réglementaire, bloquent le build global)

| Fichier | Erreur |
|---------|--------|
| `app/ia-devis-batiment/page.tsx` | `LINKS` défini plusieurs fois (import en double) |
| `components/blog/BlogIndexView.tsx` | `LINKS` défini plusieurs fois (import en double) |
| `app/ressources/guide-maitrise-oeuvre-ia/page.tsx` | Erreur de parsing JSX — balise `</CtaButton>` orpheline (~L264) |
| `components/Header.tsx` | Erreur de parsing JSX — balise `</CtaButton>` orpheline (~L369) |
| `app/formations/ia-maitrise-oeuvre/page.tsx` | Import `QualiopiLogoInline` — export inexistant dans `QualiopiLogo.tsx` |

### Avertissements (non bloquants)

- Next.js : racine workspace Turbopack ambiguë (lockfile parent `/Users/laure/package-lock.json`)
- Convention `middleware` dépréciée au profit de `proxy`
