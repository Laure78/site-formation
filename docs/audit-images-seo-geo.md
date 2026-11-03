# Audit et optimisation des images — SEO et GEO

**Site :** [laureolivie.fr](https://www.laureolivie.fr)  
**Date :** 3 novembre 2026  
**Stack :** Next.js 16.1.6 (App Router) · `next/image` · sources centralisées `lib/photos.ts` / `lib/client-logos.ts`

---

## Synthèse

| Indicateur | Valeur |
|------------|--------|
| Images analysées (`public/`, hors dossiers hors prod) | **342** |
| Alts canoniques dans `lib/photos.ts` | **124** |
| Images informatives référencées **sans** alt exploitable | **0** |
| Noms de fichiers « génériques » (slides blog) | **24** — conservés |
| Fichiers > 500 Ko | **3** (PNG legacy / OG) |
| Fichiers sans référence code détectée | **115** (archives, variantes OG, doublons) |
| **Renommages effectués** | **0** |
| **Alts corrigés (cette session)** | **3** |
| **Optimisations poids (cette session)** | Tentative script — gain < 2 % sur les 3 PNG lourds |
| Redirections 301/308 images (`next.config.ts`) | Déjà en place (~80+ entrées) — **aucune nouvelle** |

Inventaire machine : `tmp/audit-images-inventory.csv` (342 lignes) · rapport JSON : `tmp/audit-images-seo.json`  
Commandes : `npm run audit:images-seo` · `npm run assert:images-seo`

---

## Phase 1 — Classification (résumé)

- **Classe A (conserver)** : logos officiels (`logo-laure-olivie-formation-ia-btp.webp`, Qualiopi, partenaires FFB/CSFE…), héros accueil (`public/images/accueil/01-hero-equipe-btp.webp`…), formateurs nommés, visuels formations décrits dans `PHOTOS`.
- **Classe B (renommage non retenu)** : 24 `slide-XX.png` (carrousels blog) — URLs indexées possibles ; **redirections permanentes** déjà configurées vers des WebP descriptifs pour le carrousel « présentation formation » ; alts présents dans le HTML embarqué des articles (`lib/blog-*-articles.ts`).
- **Classe C (alt)** : 2 composants avec `alt=""` inapproprié → **corrigés** (voir tableau ci-dessous) ; fond décoratif recrutement → `alt=""` + `aria-hidden` **validé**.
- **Classe D (poids)** : 3 PNG > 500 Ko servent surtout d’anciennes URL ; versions WebP canoniques ~34 Ko ; compression in-place **sans gain** (< 2 %).
- **Classe E (inutilisées)** : 115 fichiers non référencés dans le code scanné — **signalés, non supprimés** (sources, OG alternatifs, `_archive`, miniatures orphelines).

---

## Modifications effectuées (Phase 2–4)

| Page | Image actuelle | Nouveau nom | ALT corrigé | Action | Risque |
|------|----------------|-------------|-------------|--------|--------|
| `/ressources` (hub) | *(miniatures catalogue)* | — | Alt du catalogue `resource.image.alt` (aligné sur `RessourceCard`) | **C** — correction composant | Faible |
| `/nous-rejoindre` | `accueil-equipe-btp-plans-tablette-ia.webp` | — | `alt=""` conservé + `aria-hidden` sur `<Image>` (fond décoratif, conteneur `aria-hidden`) | **C** — accessibilité / CI | Faible |
| Formation NIV-10 / OG | `formation-developpement-web-ia-sans-coder/01-hero-applications-metier-btp-ia.webp` | — | « Visuel de partage — équipe BTP et outil ERP chantier conçu avec l’IA, sans coder » (distinct du hero page) | **C** — dédoublonnage alt `photos.ts` | Faible |
| Scripts CI | — | — | — | `assert-images-seo` / `audit-images-seo` : `alt=""` autorisé si `aria-hidden` sur le bloc `<Image>` | Outillage | Nul |

**Aucun renommage de fichier** : priorité à la stabilité des URL et aux redirections existantes.

---

## Recommandations (non appliquées)

| Page / usage | Image actuelle | Nouveau nom suggéré | ALT | Action | Risque |
|--------------|----------------|---------------------|-----|--------|--------|
| Blog carrousel A | `slide-01.png` … `slide-08.png` | Déjà : `formation-ia-batiment-*.webp` (cibles de redirect) | OK dans contenus | **B** — ne pas renommer les PNG sans campagne de nettoyage CDN | Élevé si URL publique indexée |
| Blog guide Claude 2026 | `slide-02.png` … `slide-16.png` | `guide-claude-btp-*.webp` (15 fichiers) | Inchangés (contenu article) | **B + redirect 308** — appliqué le 03/11/2026 | Faible après deploy |
| Legacy PNG blog | `laure-olivie-ia-*.png` | — | N/A (redirect → `.webp`) | **D** — envisager suppression PNG après analyse Search Console | Moyen |
| `public/_archive/images/*` | divers | — | — | **E** — archive ; hors sitemap | Faible |
| `logo-laure-olivie-formation-ia-btp-source.png` | source design | — | — | **E** — fichier maître, non servi en prod | Nul |

---

## Images lourdes (> 500 Ko)

| Fichier | Ko | Usage | Mesure |
|---------|-----|--------|--------|
| `laure-olivie-ia-rentabilite-chantier.png` | 668 | Redirect 308 → `.webp` (34 Ko) | Compression testée : gain < 2 % |
| `laure-olivie-ia-administratif-batiment.png` | 651 | Redirect 308 → `.webp` (34 Ko) | idem |
| `formation-ia-etancheur-btp-og.png` | 595 | OG / métadonnées | idem |

Proche du seuil : `formation-ia-sensibilisation.png` (~499 Ko), `laure-intervention-claude-experte-ia-btp.png` (~494 Ko) — **conservés** (URLs stables, usage OG/landing).

---

## Next.js — images (Phase 4)

- **Version :** 16.1.6 — optimisation WebP/AVIF via le pipeline `next/image` par défaut.
- **Remote :** uniquement avatars Google (`remotePatterns` → `lh3.googleusercontent.com`).
- **Cache :** en-têtes `Cache-Control: public, max-age=31536000, immutable` sur `/images/:path*`.
- **LCP :** `priority` utilisé sur héros accueil, catalogues, guides ressources, pages financement — pas de préchargement systématique ajouté.
- **Centralisation :** 0 chemin `/images/` en dur dans `app/` (hors `PHOTOS`) — conforme au garde-fou CI.
- **Sizes :** définis au cas par cas (héros, cartes catalogue, bandeaux) ; pas de modification de cadrage dans cet audit.

---

## Indexation et GEO (Phase 5)

- **Robots :** bots IA autorisés (cf. `robots.txt` / règles projet) — images sous `/images/` servies en statique.
- **Sitemap :** pas de sitemap images dédié ; URLs images découvrables via pages HTML, Open Graph et JSON-LD existants.
- **JSON-LD :** `lib/schema-image-objects.ts` — `ImageObject` accueil (hero + triptyque terrain), portrait à propos, guides conducteur / financement Constructys ; champs `contentUrl`, `caption` / `description` alignés sur les alts `PHOTOS`.
- **Person / Organization :** images Laure et logo via `lib/schema-person-global.ts` et schémas organisation — inchangés.
- **Course :** images formation injectées dans le JSON-LD catalogue lorsque définies dans les données formation.

Aucune balise ou schema supplémentaire ajouté sans lien direct avec un visuel déjà stratégique.

---

## Préservation des URL (Phase 6)

Politique du dépôt : **redirections permanentes** (`permanent: true` → HTTP **308** sur Next.js) de nombreuses anciennes URLs `/images/*` vers les fichiers canoniques (WebP, noms descriptifs carrousel A, etc.).

**Cette session :** aucune nouvelle redirection — aucun renommage.

Test redirection en production (03/11/2026) :

| URL | Statut | Cible |
|-----|--------|--------|
| `/images/laure-olivie-ia-administratif-batiment.png` | **308** | `/images/laure-olivie-ia-administratif-batiment.webp` |
| `/images/blog/carrousel-a-presentation-formation/slide-01.png` | **308** | `…/formation-ia-batiment-promesse-4h.webp` |
| `/images/blog/guide-claude-btp-2026/slide-02.png` | **200** (PNG) avant deploy | **308** attendu après mise en prod des redirects guide Claude |

---

## Contrôles (Phase 7)

| Contrôle | Résultat |
|----------|----------|
| `npm run assert:images-seo` | OK |
| `npm run audit:images-seo` | OK (0 problème composant, 0 doublon alt `photos.ts`) |
| `next build` (production) | OK |
| `npm run lint` | Échecs **préexistants** (scripts / teachizy) — hors périmètre images |
| Références cassées (scan code) | Aucune liée aux changements |
| 404 / redirects HTTP en prod | Non testés automatiquement |
| Affichage responsive | Non testés visuellement (Playwright non lancé) |

---

## Échantillon — images non référencées (classe E)

Fichiers présents dans `public/` sans occurrence dans `app/`, `components/`, `lib/`, `content/` (scan audit) — **ne pas supprimer sans validation métier** :

- Variantes OG / sources : `logo-laure-olivie-formation-ia-btp-source.png`, `skill-ia-og.png`, `financement-constructys-og.jpg`
- Legacy marque : `laure-linkedin-graz.png`, `logo-umb-ffb-metiers-du-bois.png` (UMB-FFB hors charte actuelle)
- Miniatures tutos non branchées : `miniature-tuto-analyse-ccap.jpg`, `miniature-tuto-diuo.jpg`
- Dossier `public/_archive/images/` : copies historiques de visuels formation

Liste complète : champ `referenced=non` dans `tmp/audit-images-inventory.csv`.

---

## Poursuite suggérée (hors scope immédiat)

1. Search Console → « Performance » / Google Images : confirmer le trafic sur PNG legacy avant retrait.
2. ~~Carrousel guide Claude 2026 : redirects slide → WebP~~ — **fait** (15 WebP + redirects `next.config.ts` ; `slide-01.png` orphelin conservé).
3. Exécuter `npm run optimize:carrousel-a-slides` après modification de contenu si les PNG slides sont encore servis directement quelque part.
4. Mettre à jour `public/llms.txt` uniquement si des **faits** site liés aux visuels changent (non le cas ici).

---

## Références projet

- Alts et chemins photos : `lib/photos.ts`
- Logos partenaires : `lib/client-logos.ts`
- JSON-LD images : `lib/schema-image-objects.ts`
- Redirections images : `next.config.ts` (`redirects()`)
- Audit précédent : `docs/seo/images-audit-2026-04-10.md`
