# Rapport SEO + GEO — laureolivie.fr

**Date** : 2026-04-05  
**Périmètre** : audit complet + optimisations P1 sans risque  
**Documents associés** : [`seo-geo-map.md`](./seo-geo-map.md) · [`strategie-seo-geo-laureolivie.md`](./strategie-seo-geo-laureolivie.md)

---

## Synthèse

Le site dispose déjà d’une architecture anti-cannibalisation avancée (redirects 301, piliers, fiches Qualiopi distinctes des landings). Les actions P1 de cette session portent sur :

1. **Entité Person unifiée** (`#laure-olivie`)
2. **Différenciation titres** (pilier / catalogue / auteur)
3. **Blocs GEO citables** (En bref pilier + à-propos)
4. **Maillage entité** (a-propos → pilier / formateur / catalogue)
5. **Documentation de pilotage** (cartographie + stratégie)

**Aucune nouvelle page créée** — conformément à la règle de validation (5 questions).

---

## Pages auditées

- ~154 routes publiques `app/**/page.tsx` (hors admin / auth / LMS / api)
- Clusters : formation IA BTP, AO/DCE, CDT, Claude, ChatGPT, assistants, apps métier, locales IDF, entité Laure
- Schema.org : layout global, Course, FAQ, ProfilePage, blog Article
- robots / sitemap / redirects (`next.config` + `gsc-redirects-2026`)

---

## Pages modifiées (code)

| Fichier / page | Nature |
|----------------|--------|
| `/a-propos` | Title, meta, En bref, date maj, CTA → pilier, AllerPlusLoin |
| `/formation-ia-btp` | En bref citable (définition) ; instructor `@id` → `#laure-olivie` |
| `/formations` | Title + H1 + meta repositionnés « catalogue / programmes » |
| Schema Person (multi-fichiers) | Unification `@id` `#laure-olivie` |
| `lib/schema-constants.ts` | Helper `schemaPersonNodeId()` + doctrine |
| `lib/content-updated-at.ts` | Dates `/a-propos` + pilier |

### Fichiers Schema touchés (Person `@id`)

- `lib/seo.ts`
- `lib/schema-a-propos-*.ts`
- `lib/claude-ai-btp-jsonld.ts`
- `lib/blog-index-schema.ts`
- `lib/formation-ia-conducteur-travaux-landing.ts`
- `app/formation-ia-btp/page.tsx`
- `app/formation-ia-paris/page.tsx`
- `app/formateur-ia-btp/page.tsx`
- `app/formations-linkedin-learning/page.tsx`
- `components/seo/FormationMetierJsonLd.tsx`
- `components/schema/PersonSchema.tsx`

---

## Pages fusionnées / redirigées

**Aucune nouvelle redirection ajoutée dans cette session.**  
Redirections déjà en place et confirmées dans la cartographie :

| Source | Destination |
|--------|-------------|
| `/expert-ia-btp` | `/a-propos` |
| `/formation-ia-construction` | `/formation-ia-btp` |
| `/formation-ia-btp-paris` (+ variantes) | `/formation-ia-paris` |
| `/formation-claude-*` | `/formations/maitriser-claude-ai-btp` |
| stubs CDT | `/formation-ia-conducteur-de-travaux` |
| `/bework` | `/formations/developpement-web-ia-sans-coder` |

---

## Titles avant / après

| URL | Avant | Après |
|-----|-------|-------|
| `/a-propos` | Laure Olivié \| Formatrice IA spécialisée BTP | Laure Olivié : formatrice IA pour le BTP |
| `/formations` | Catalogue des formations IA BTP en Île-de-France | Catalogue des programmes IA pour le BTP \| Laure Olivié |
| `/formation-ia-btp` | (inchangé) Formation IA pour le BTP : IA bâtiment \| Laure Olivié | — |

---

## Metas avant / après

| URL | Avant (extrait) | Après (extrait) |
|-----|-----------------|-----------------|
| `/a-propos` | Laure Olivié, formatrice IA spécialisée BTP : formation IA… | Laure Olivié est formatrice en intelligence artificielle appliquée au BTP. Formation IA pour le BTP… |
| `/formations` | Catalogue formations IA BTP en Île-de-France… | Catalogue des programmes de formation IA pour le BTP… |

---

## H1 avant / après

| URL | Avant | Après |
|-----|-------|-------|
| `/formations` | Catalogue des formations IA BTP en Île-de-France | Catalogue des programmes IA pour le BTP en Île-de-France |
| `/a-propos` | (inchangé) Laure Olivié, formatrice IA spécialisée dans le BTP | — |

---

## Nouveaux blocs « En bref »

| Page | Contenu (résumé) |
|------|------------------|
| `/a-propos` | Définition entité : formatrice IA BTP, OFC Qualiopi, présentiel IDF, parcours ALIA, publics |
| `/formation-ia-btp` | Définition citable de la formation IA BTP (outils, tâches métier, validation humaine, IDF) — remplace l’ancien pitch centré Laure |

---

## Nouvelles FAQ

Aucune FAQ créée dans cette session (FAQ déjà présentes sur pilier, a-propos, formateur, fiches).  
**P2** : enrichir FAQ conversationnelles sur méthodes DCE / MT / CR si manques.

---

## Liens internes ajoutés / ajustés

| Source | Ancre | Destination |
|--------|-------|-------------|
| `/a-propos` (hero CTA) | Formation IA pour le BTP | `/formation-ia-btp` |
| `/a-propos` (AllerPlusLoin) | Formateur IA bâtiment en Île-de-France | `/formateur-ia-btp` |
| `/a-propos` (AllerPlusLoin) | Catalogue des programmes IA pour le BTP | `/formations` |

Respect de la règle : **pas de double lien** vers la même URL sur `/a-propos`.

---

## Données structurées

| Action | Détail |
|--------|--------|
| Unifié | Person `@id` → `https://www.laureolivie.fr/#laure-olivie` |
| Mis à jour | ProfilePage `/a-propos` `dateModified` → 2026-04-05 |
| Ajouté | Helper `schemaPersonNodeId()` dans `schema-constants` |
| Non fait (P2) | Brancher `BlogPosting` ; réduire doublons JSON-LD page-level |

---

## Cannibalisation corrigée / clarifiée

| Problème | Traitement |
|----------|------------|
| Catalogue vs pilier | Title/H1 catalogue = « programmes / catalogue » ; head term réservé au pilier |
| a-propos vs formateur | Title a-propos = entité ; formateur conserve requête « formateur IA bâtiment » |
| Person fragmentée | Un seul `@id` Knowledge Graph |
| Expert | Confirmé hors index (301 + hors sitemap) — pas de réactivation |

---

## Contenus GEO améliorés

- En bref answer-first (définition autonome) sur pilier et a-propos
- Date « Mis à jour le… » visible sur a-propos
- Formulation factuelle entité (« est formatrice… ») sans superlatif
- CTA hero a-propos ancré sur le pilier commercial

---

## Nouvelles pages créées

**Aucune.**

Raisons :

1. Les clusters prioritaires ont déjà une URL canon.
2. Les articles P1 (DCE, MT, CR, ChatGPT vs Claude) existent déjà (méthodes + blog).
3. Une page auteur dédiée `/auteur/` est déjà 301 → `/a-propos`.

---

## Problèmes P2 / P3 restants

| Priorité | Action |
|----------|--------|
| P2 | Audit thin content landings métiers / villes |
| P2 | Answer-first + tableaux citables sur méthodes AO/CDT |
| P2 | Sources primaires (OpenAI, Anthropic, Constructys) sur articles réglementaires |
| P2 | BlogPosting vs Article ; dédoublonnage JSON-LD |
| P3 | Articles PPSPS / DOE / planning **si** absence confirmée |
| P3 | Archiver docs obsolètes (`ARBORESCENCE-SITE`, `ARCHITECTURE-SEO-GEO-MEDIA`) |

---

## Keyword mapping canon (rappel)

| Mot-clé principal | URL |
|-------------------|-----|
| formation IA pour le BTP | `/formation-ia-btp` |
| formation IA appels d’offres BTP | `/formation-ia-appels-offres-btp` |
| formation IA conducteur de travaux | `/formation-ia-conducteur-de-travaux` |
| formation Claude AI BTP | `/formations/maitriser-claude-ai-btp` |
| formation ChatGPT BTP | `/formation-chatgpt-btp` |
| formation assistants IA BTP | `/formations/assistants-ia-personnalises-btp` |
| formation IA BTP Île-de-France | `/formation-ia-btp-ile-de-france` |
| Laure Olivié (entité) | `/a-propos` |

---

## Validation recommandée post-déploiement

1. [Google Rich Results Test](https://search.google.com/test/rich-results) sur `/`, `/a-propos`, `/formation-ia-btp`, une fiche Course
2. Vérifier dans le HTML rendu un seul `@id` Person `#laure-olivie`
3. Contrôle GSC : couverture, cannibalisation title (catalogue vs pilier)
4. Ne pas créer de pages locales supplémentaires sans contenu distinct

---

# Appendice P2 — 2026-04-05 (session suivante)

## Doorways consolidés (301)

| Source | Destination | Motif |
|--------|-------------|-------|
| `/formations/ia-btp-morangis` | `/formation-ia-btp-essonne-91` | Ville thin / FAQ générique |
| `/formations/ia-btp-longjumeau` | `/formation-ia-btp-essonne-91` | Idem |
| `/formation-ia-solier-revetements` | `/formation-ia` | B1 ~270 mots, H1 générique « 5h » |
| `/formation-ia-conducteur-engins-tp` | `/formation-ia-travaux-publics` | B1 ~240 mots, même formule |

`LINKS` mis à jour (alias dépréciés) ; exclus du sitemap ; maillage Claude IDF → Essonne unique.

**Non touché** : `/formation-ia-etancheur` reste le canon (déjà 301 depuis `-etancheur-btp`). SQY conservée (contenu local distinct).

## Départements (anti-doorway)

- H1 généré distinct : `Formation IA pour le BTP {locatif} ({code}) — {3 villes}`
- Bloc « En bref » ajouté sur toutes les pages `DepartementPage`

## Méthodes answer-first

| Page | Ajouts |
|------|--------|
| `/ia-analyse-dce-btp` | En bref + tableau pièces + sources CNIL/Anthropic/OpenAI + maillage landing AO + pilier |
| `/ia-memoire-technique-btp` | En bref + tableau limites + maillage landing AO + pilier |
| `/ia-compte-rendu-chantier` | En bref + tableau flux CR + maillage landing CDT + pilier |

## Conservé sans 301 (enrichir plus tard si besoin)

- Gabarits métiers riches (étancheur, électricien, maçon…)
- Niches clone (vitrier, pisciniste…) — score 3–4, pas doorway critique
- Ferrailleur / dirigeant B1 — candidats P2bis si trafic faible

## P3 non lancé

Articles PPSPS / DOE / planning : non créés (règle des 5 questions — vérifier absence avant toute création).

---

# Appendice P2bis — 2026-04-07

## BlogPosting

| Avant | Après |
|-------|-------|
| `ArticleJsonLd` → `buildBlogArticleJsonLd` (`@type: Article`) | `ArticleJsonLd` → `buildBlogPostingJsonLd` (`@type: BlogPosting`) |
| Author sans `@id` / sameAs string | Author `@id` `#laure-olivie`, `worksFor` `#organization`, sameAs LinkedIn + Learning |

`buildBlogArticleJsonLd` conserve un alias déprécié qui délègue à BlogPosting.

## Niches métiers (conservées, maillage renforcé)

Aucun 301 supplémentaire : ferrailleur, vitrier, pisciniste, clôturiste, canalisateur, géomètre, maçon-paysagiste, paysagiste ont un contenu métier distinct (~400 lignes).

| Action | Détail |
|--------|--------|
| Helper `buildMetierAllerPlusLoinLinks` | Pilier `/formation-ia-btp` en tête de chaque AllerPlusLoin |
| 8 landings niches | Migrées vers le helper |
| Gabarit B1 | En bref + maillage pilier (bénéficie à `/formation-ia-dirigeant-btp`) |
| `getMetierLandingCoreLinks` | Lien pilier ajouté en tête |

## Non fusionné (intention distincte)

- `/formation-ia-macon-paysagiste-btp` ≠ paysagiste ≠ maçon
- `/formation-ia-dirigeant-btp` ≠ `/formation-ia-dirigeant-pme-btp`

---

# Appendice P3 suite — 2026-04-07

## Pas de nouvelles pages P3 (PPSPS / DOE / planning)

| Intention | Déjà couvert par | Décision |
|-----------|------------------|----------|
| PPSPS avec l’IA | `/ressources/tuto-ppsps` + blog CDT | **Ne pas créer** |
| DOE avec l’IA | `/ressources/tuto-doe-dossier-ouvrages-executes` | **Ne pas créer** |
| Levée de réserves | `/ressources/tuto-pv-levee-reserves` | **Ne pas créer** |
| Planning chantier | usages dans CDT / blog | **Ne pas créer** sans angle distinct |

Maillage ajouté : fiche NIV-03 → tutos PPSPS, DOE, PV réserves.

## JSON-LD dédoublonné

| Page | Avant | Après |
|------|-------|-------|
| `/a-propos` | Person + Organization + unified graph | **unified graph seul** |
| `/formateur-ia-btp` | Person + Organization complets (+ layout) | **WebPage** (about `#laure-olivie`) + FAQ |

## Comparatif outils

`/outils-ia-btp` : En bref, tableau enrichi (DCE, rédaction, MT, intégrations, confidentialité), sources Anthropic / OpenAI / CNIL, liens via `LINKS`, CTA vers pilier.
