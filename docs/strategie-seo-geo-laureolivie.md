# Stratégie SEO + GEO + AEO — laureolivie.fr

> Document de pilotage. Cartographie détaillée : [`docs/seo-geo-map.md`](./seo-geo-map.md).  
> Principe directeur : **moins de pages, plus fortes** — zéro cannibalisation, réponses citables, entité Laure Olivié unique.

---

# 1. Diagnostic

## 1.1 Problèmes SEO

| Problème | Détail | Gravité |
|----------|--------|---------|
| Clusters commerciaux / fiches | Landing AO vs fiche NIV-02 ; landing CDT vs NIV-03 — titles proches possibles | Élevée |
| Hub catalogue vs pilier | `/formations` peut concurrencer `/formation-ia-btp` si H1/title trop génériques | Moyenne |
| Pages locales | Départements + villes : risque de H1 « Formation IA BTP » sans différenciation locale | Moyenne |
| Landings métiers (~30) | Valeur longue traîne si contenu distinct ; sinon thin content | Moyenne |
| Docs internes obsolètes | ARBORESCENCE / ARCHITECTURE-SEO-GEO-MEDIA trompeurs | Faible (ops) |

## 1.2 Problèmes GEO / AEO

| Problème | Détail | Gravité |
|----------|--------|---------|
| `@id` Person fragmenté | `#laure-olivie` (layout) vs `#person` (seo.ts, a-propos, landings) | **Critique** |
| Doublons JSON-LD | Person/Organization réémis sur `/a-propos` et `/formateur-ia-btp` + layout | Moyenne |
| Blocs « En bref » incomplets | Manquant sur `/a-propos` ; inégal ailleurs | Moyenne |
| Answer-first | Certaines landings encore narrative avant la réponse | Moyenne |
| Blog = `Article` | Helper `BlogPosting` non branché (écart .cursorrules) | Faible–moyenne |

## 1.3 Cannibalisation

| Cluster | URLs en tension | Décision |
|---------|-----------------|----------|
| Formation IA BTP | pilier / catalogue / hub / blog guide | **1 pilier** = `/formation-ia-btp` |
| AO / DCE / MT | landing + fiche + méthodes + blog | Landing C + fiche Q + méthodes I |
| CDT | landing + fiche + CR + prompts | Landing C + fiche Q |
| Claude | guide + fiche + leads | Guide I + fiche C |
| Entité | a-propos / formateur / expert(301) | a-propos = Person ; formateur = requête « formateur » |
| Paris | `/formation-ia-paris` (canon) | Alias déjà 301 |

## 1.4 Doublons / stubs

Pages encore dans le repo mais redirigées : `formation-ia-construction`, `formation-claude-*`, `expert-ia-btp`, stubs CDT, `bework`.  
**Action** : conserver les 301 ; ne plus créer de liens internes vers ces sources.

## 1.5 Contenus faibles (candidats consolidation P2)

- Landings métiers sans cas d’usage distincts
- Pages villes sans ancrage local réel (au-delà du nom de ville)
- Articles blog redondants MT / devis (déjà partiellement 301)

## 1.6 Technique

- robots.txt : bots IA autorisés — OK  
- sitemap : exclusions cannibales (ex. expert) — OK  
- Canonicals via `createPageMetadata` — OK  
- Performance : hors scope P1 (audit LCP séparé)

---

# 2. Architecture cible

## 2.1 Couche commerciale

```
/formation-ia-btp                          ← PILIER
├── /formations                            ← catalogue
├── /formation-chatgpt-btp
├── /formation-ia-appels-offres-btp  →  /formations/ia-appels-offre-btp
├── /formation-ia-conducteur-de-travaux → /formations/ia-conduite-travaux-suivi-chantier
├── /formations/maitriser-claude-ai-btp  ←── /claude-ai-btp (info)
├── /formations/assistants-ia-personnalises-btp
├── /formations/application-metier-btp-niveau-{1,2,3}
├── /formations/developpement-web-ia-sans-coder
├── /formations/ia-maitrise-oeuvre
└── /formation-ia-btp-ile-de-france → départements → villes (si contenu distinct)
```

## 2.2 Couche informationnelle (soutien, pas concurrence)

```
Méthodes : /ia-analyse-dce-btp · /ia-memoire-technique-btp · /ia-compte-rendu-chantier · /ia-devis-batiment
Blog : CCTP · CCAP · comparatif IA · CR · devis · financement · Paris
Ressources / tutos / guides PDF : lead magnets → silo
```

## 2.3 Couche entité / confiance

```
/a-propos              ← Person canon
/formateur-ia-btp      ← intention « formateur IA bâtiment »
/avis-clients · /partenaires · /etudes-de-cas · /qualiopi · légal
```

## 2.4 Pages à ne pas créer

- Variantes keyword du pilier (IA générative, PME, débutant, construction…)
- Doorway villes sans contenu local
- Deuxième page « expert IA » (déjà 301)
- Page auteur séparée `/auteur/` (déjà → a-propos)

---

# 3. Keyword mapping

| URL | Mot-clé principal | Variantes | Intention | Entités | Questions GEO |
|-----|-------------------|-----------|-----------|----------|---------------|
| `/formation-ia-btp` | formation IA pour le BTP | IA bâtiment ; IA PME BTP ; ChatGPT BTP débutant | C | IA, BTP, Qualiopi, OFC, Laure | Quelle formation IA pour une entreprise BTP ? Qui forme à l’IA BTP en IDF ? |
| `/formations` | catalogue formations IA BTP | programmes Qualiopi | C | Course list | Quels programmes IA BTP propose OFC ? |
| `/formation-ia-appels-offres-btp` | formation IA appels d’offres BTP | DCE ; MT ; AO travaux | C | DCE, CCTP, CCAP, MT | Comment former son équipe AO à l’IA ? |
| `/formations/ia-appels-offre-btp` | programme IA DCE mémoire technique | NIV-02 ; 4 h | C | DCE, MT | Quel programme pour analyser un DCE ? |
| `/ia-analyse-dce-btp` | analyser un DCE avec l’IA | CCTP ; RC | I | DCE | Peut-on analyser un DCE avec ChatGPT/Claude ? |
| `/ia-memoire-technique-btp` | mémoire technique avec l’IA | MT AO | I | MT | L’IA peut-elle rédiger un mémoire technique ? |
| `/formation-ia-conducteur-de-travaux` | formation IA conducteur de travaux | CDT ; chantier | C | CDT, CR, DOE | Comment former un CDT à l’IA ? |
| `/ia-compte-rendu-chantier` | compte rendu chantier IA | CR | I | CR | Comment faire un CR de chantier avec l’IA ? |
| `/formations/maitriser-claude-ai-btp` | formation Claude AI BTP | Projects ; Skills | C | Claude | Quelle formation pour apprendre Claude dans le BTP ? |
| `/claude-ai-btp` | Claude AI BTP | Chat ; Cowork | I | Claude | Claude ou ChatGPT pour le BTP ? |
| `/formation-chatgpt-btp` | formation ChatGPT BTP | ChatGPT devis | C | ChatGPT | Quelle formation ChatGPT pour le bâtiment ? |
| `/formations/assistants-ia-personnalises-btp` | formation assistants IA BTP | GPT ; Projects | C | Assistants | Comment créer un assistant IA pour le BTP ? |
| `/formations/developpement-web-ia-sans-coder` | créer application BTP avec l’IA | sans coder | C | Apps | Peut-on créer son logiciel BTP avec l’IA ? |
| `/formation-ia-btp-ile-de-france` | formation IA BTP Île-de-France | présentiel IDF | C | IDF | Où se former à l’IA BTP en IDF ? |
| `/formation-ia-paris` | formation IA BTP Paris | 75 | C | Paris | Formation IA BTP à Paris ? |
| `/a-propos` | Laure Olivié formatrice IA BTP | OFC ; parcours | I | Person | Qui est Laure Olivié ? |
| `/formateur-ia-btp` | formateur IA bâtiment Île-de-France | formatrice IA | C | Formateur | Qui choisir comme formateur IA BTP en IDF ? |
| `/financement-constructys-formation-ia-btp` | financement Constructys formation IA | OPCO | C | Constructys | Une formation IA peut-elle être financée par Constructys ? |

---

# 4. Plan de consolidation

## Conserver

- Pilier, catalogue, fiches NIV-01 à NIV-10, landings clusters, méthodes, hub IDF, départements avec contenu, a-propos, formateur, financement, blog piliers listés.

## Améliorer (P1)

1. Unifier `@id` Person → `https://www.laureolivie.fr/#laure-olivie`
2. Bloc « En bref » + date mise à jour sur `/a-propos`
3. Affiner En bref pilier (définition citable, pas pitch)
4. Renforcer différenciation titles catalogue / pilier / formateur
5. Maillage silo méthodes → landings → fiches → pilier
6. Réponses FAQ conversationnelles sur pages stratégiques (déjà partiellement présentes)

## Fusionner / rediriger (déjà fait ou P2)

- Expert → a-propos (fait)
- Claude landings multiples → NIV-04 (fait)
- Paris doublons → `/formation-ia-paris` (fait)
- P2 : auditer landings métiers thin → 301 vers hub `/formation-ia` ou pilier

## Repositionner

- `/formations` : title/H1 strictement « catalogue / programmes »
- `/formateur-ia-btp` : angle « pourquoi ce formateur », pas bio complète
- `/claude-ai-btp` : rester 100 % informationnel (pas de title « formation »)

## noindex

- Espaces privés, démos, plateforme stagiaires, pagination blog ≥2 (déjà)

## Créer uniquement si nécessaire (après validation 5 questions)

| Candidat | Verdict |
|----------|---------|
| Page auteur `/auteur/` | Non — `/a-propos` suffit |
| Article « ChatGPT ou Claude BTP » | Non — blog comparatif existe |
| Article « analyser DCE » | Non — `/ia-analyse-dce-btp` + blog |
| Article PPSPS / DOE / planning (P3) | Oui **seulement** si aucune page équivalente après audit slug |

---

# 5. Maillage interne

Règles : ancres descriptives ; **jamais 2 liens même URL** sur une page ; URLs via `lib/internal-links.ts` ; max 5 liens/article blog.

| URL source | Ancre | URL destination |
|------------|-------|-----------------|
| `/ia-analyse-dce-btp` | formation IA dédiée aux appels d’offres BTP | `/formation-ia-appels-offres-btp` |
| `/ia-memoire-technique-btp` | formation IA appels d’offres BTP | `/formation-ia-appels-offres-btp` |
| `/ia-compte-rendu-chantier` | formation IA pour conducteurs de travaux | `/formation-ia-conducteur-de-travaux` |
| `/ia-devis-batiment` | formation ChatGPT pour le BTP | `/formation-chatgpt-btp` |
| `/blog/comparatif-chatgpt-claude-gemini-btp` | formation Claude AI pour le BTP | `/formations/maitriser-claude-ai-btp` |
| `/formation-ia-appels-offres-btp` | programme IA DCE et mémoire technique | `/formations/ia-appels-offre-btp` |
| `/formation-ia-conducteur-de-travaux` | programme IA suivi de chantier | `/formations/ia-conduite-travaux-suivi-chantier` |
| `/claude-ai-btp` | formation Claude AI BTP | `/formations/maitriser-claude-ai-btp` |
| Toute formation spécialisée | formation IA pour le BTP | `/formation-ia-btp` |
| `/a-propos` | formateur IA bâtiment en Île-de-France | `/formateur-ia-btp` |
| `/formateur-ia-btp` | présentation de Laure Olivié | `/a-propos` |
| Articles AO | analyser un DCE avec l’IA | `/ia-analyse-dce-btp` |
| Articles CDT | compte rendu de chantier avec l’IA | `/ia-compte-rendu-chantier` |

Ancres **à éviter** : « cliquez ici », « en savoir plus », « découvrir ».

Intention « formation IA BTP » → **toujours** `/formation-ia-btp` (jamais alterner avec `/formations` ou `/formation-ia`).

---

# 6. Données structurées

| Schéma | Action |
|--------|--------|
| Person `#laure-olivie` | **Corriger** toutes les références `#person` / `/a-propos#person` |
| Organization `#organization` | Conserver ; éviter re-déclaration complète sur pages secondaires |
| Course | Déjà sur fiches — vérifier instructor `@id` = `#laure-olivie` |
| FAQPage | Uniquement si FAQ visible |
| BlogPosting | P2 : brancher ou documenter le choix `Article` |
| ProfilePage | `/a-propos` — OK ; aligner `mainEntity` sur `#laure-olivie` |
| BreadcrumbList | Conserver pattern `Breadcrumb` |
| sameAs | Uniquement URLs authentifiées (`schema-constants`) — ne pas inventer |
| AggregateRating faux | **Interdit** |

Tester après modifs : [Google Rich Results Test](https://search.google.com/test/rich-results).

---

# 7. Priorisation

## P1 — ✅ appliqué

1. Unifier `@id` Person `#laure-olivie`
2. En bref + fraîcheur sur `/a-propos`
3. Affiner En bref pilier (citable)
4. Différencier titles entité / formateur / catalogue
5. Corriger instructor Person sur page pilier
6. Maillage AllerPlusLoin a-propos → formateur + pilier
7. Documenter cartographie + stratégie

## P2 — ✅ appliqué (2026-04-05 + 2026-04-07)

- 301 doorway : Morangis, Longjumeau → Essonne 91 ; solier → hub ; conducteur-engins → TP
- H1 + En bref sur pages département
- Answer-first + tableaux + sources (CNIL, Anthropic, OpenAI) sur DCE / MT / CR
- Maillage silo méthodes → landings AO / CDT → pilier
- BlogPosting branché sur `/blog/[slug]` + `@id` Person/Organization
- Niches métiers : conservées ; maillage pilier systématique (`buildMetierAllerPlusLoinLinks`)
- Dédoublonnage JSON-LD `/a-propos` et `/formateur-ia-btp` ✅
- Comparatif `/outils-ia-btp` enrichi ✅

## P3

- Articles PPSPS / DOE / planning : **ne pas créer** — déjà couverts par tutos + blog CDT ; maillage NIV-03 → tutos ✅
- Performance images LCP
- Consolidation docs obsolètes (archivage)

---

## Critères de validation avant toute création de page

1. Une page existante répond-elle déjà ? → ne pas créer  
2. Peut-on enrichir l’existante sans changer l’intention ? → ne pas créer  
3. Besoin réellement différent ?  
4. Information substantiellement différente ?  
5. Risque de concurrencer une URL existante ? → résoudre d’abord  

**Objectif final** : source structurée, spécialisée, fiable et citable sur l’IA appliquée aux métiers du BTP — pas un site de variantes de mots-clés.
