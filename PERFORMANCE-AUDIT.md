# Audit performance laureolivie.fr

Audit et optimisations réalisés le **1er septembre 2026** sur le dépôt `site-formation` (www.laureolivie.fr).

---

## 1. Stack technique

| Élément | Détail |
| -------- | ------ |
| Framework | **Next.js 16.1.6** (App Router, Turbopack build) |
| UI | **React 19.2.3** |
| CSS | **Tailwind CSS v4** (`@tailwindcss/postcss`) |
| Langage | TypeScript 5 |
| Rendu | **SSG** majoritaire (~270 pages statiques, revalidate 1 h) + routes dynamiques (`admin`, `espace-apprenant`, API) |
| Fonts | Google Fonts via `next/font` — Inter (400–700), Outfit (600–700), `display: swap` |
| Images | `next/image` + assets `/public/images` (WebP en cours, PNG lourds résiduels) |
| Auth / BDD | Supabase (`@supabase/ssr`) — middleware session sur routes protégées |
| Analytics | GA4 (`next/script`) — variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| RDV | Calendly (`widget.js`) — différé après consentement cookies |
| Hébergement | **Vercel** (`vercel.json` crons) + **Railway** (`railway.toml`) |
| Composants client | ~130 fichiers `"use client"` (Header, Reveal, formulaires, admin, etc.) |

---

## 2. Situation initiale

Mesures locales après `npm run build` (production, avant optimisations) :

| Métrique | Avant |
| -------- | ----: |
| JavaScript total (chunks `.next/static/chunks`) | **2 303,7 KB** (76 fichiers) |
| JavaScript initial (`rootMainFiles` + polyfill) | **~511 KB** (estimation build manifest — non mesuré avant modif.) |
| Plus gros chunk | **469,3 KB** (`5455ce26868f407d.js` — runtime Next/React) |
| CSS total | **251,1 KB** |
| Nombre de chunks JS | **76** |
| Plus grosse image publique | **1,9 MB** (`formation-ia-etancheur-btp-og.png`) |
| TBT / LCP PageSpeed | **Non mesurable localement** — nécessite PageSpeed Insights ou WebPageTest sur l’URL live |

---

## 3. Principaux problèmes identifiés

| Priorité | Problème | Impact | Complexité | Risque |
| -------- | -------- | ------ | ---------- | ------ |
| 1 | **JS global layout** : recherche site, bandeaux sticky, scroll, trackers analytics chargés sur 100 % des pages | Très élevé | Moyen | Faible |
| 2 | **GA4 en `afterInteractive` sans consentement** | Élevé | Faible | Faible |
| 3 | **SiteSearchDialog** monté systématiquement (lucide + fetch API) | Élevé | Faible | Faible |
| 4 | **~130 composants `"use client"`** dont Reveal massif sur l’accueil | Élevé | Élevé | Moyen |
| 5 | **Header client** (menu, scroll compact, 8 icônes lucide) | Moyen | Moyen | Moyen |
| 6 | **Calendly widget.js** (~100 KB+) si cookies acceptés | Moyen | Faible | Faible (déjà `lazyOnload`) |
| 7 | **Images PNG > 1 MB** (OG, carrousels blog legacy) | Élevé (LCP réseau) | Moyen | Faible |
| 8 | **Pas de `Cache-Control: immutable`** sur `/_next/static` | Moyen | Faible | Faible |
| 9 | **lucide-react** importé dans ~200 fichiers | Moyen | Élevé | Moyen |
| 10 | **Supabase middleware** sur routes marketing (session check partiel) | Faible–Moyen | Élevé | Élevé |

---

## 4. JavaScript

### Bundle initial

- **Framework chunk** (~218 KB) : Next.js + React runtime (incompressible).
- **Layout root** : Header, CookieConsent, SiteSearchProvider (contexte léger), Footer statique.
- **Optimisation appliquée** : extraction des widgets non critiques vers `DeferredLayoutWidgets` (dynamic import, `ssr: false`).

### Dépendances lourdes

| Dépendance | Utilité | Poids bundle | Utilisée où | Action |
| ---------- | ------- | ------------ | ----------- | ------ |
| `next` / `react` | Core | ~470 KB runtime | Partout | — |
| `lucide-react` | Icônes | Tree-shaké par import | Header, pages, admin | Conserver imports ciblés |
| `@supabase/*` | Auth LMS | Chunk routes protégées | admin, espace-apprenant | Hors marketing |
| `googleapis` | API server | Server-only | scripts / API | OK |
| `docx` | Génération Word | Server-only | API | OK |
| `stripe` | Paiement | API routes | checkout | OK |
| `openai` | Chat / agent | API routes | `/api/chat` | OK |
| `next-mdx-remote` | Blog MDX | Pages blog | `/blog/[slug]` | OK |

Aucune dépendance inutilisée évidente dans `package.json` (toutes ont des usages serveur ou route-spécifiques).

### JavaScript inutilisé

- **SiteSearchDialog** : n’était pas ouvert au chargement → retiré du bundle initial (import dynamique + montage conditionnel).
- **StickyMobileCalendlyCta / StickyBlogMetierRdvBar / ScrollToTopButton** : listeners scroll inutiles au first paint → chunks séparés.
- **CalendlyClickTracker + DownloadGuideTracker** : fusionnés et différés dans `InteractionTrackers`.

### Composants client

- **Conservés client (nécessaires)** : Header (menu, pathname), CookieConsentBanner, SiteSearchProvider (raccourci ⌘K).
- **Tentative serveur rejetée** : `GlobalBreadcrumbs` / `FormationCalendlyInlineGate` via `headers()` → forçait **toutes** les pages en rendu dynamique (`ƒ`) au lieu de SSG (`○`) — régression majeure, annulée.
- **Piste future** : animations `Reveal` sur l’accueil (~40 instances) → CSS `@keyframes` + `IntersectionObserver` léger ou réduction du périmètre client.

### Scripts tiers

| Script | Utilité | Chargement actuel | Optimisation |
| ------ | ------- | ----------------- | ------------ |
| GA4 (`gtag.js`) | Analytics | ~~`afterInteractive`~~ → **`lazyOnload` + consentement** | ✅ Appliqué |
| Calendly `widget.js` | Prise de RDV | `lazyOnload` après cookies acceptés | Déjà optimal |
| Google Places | Avis clients | Fetch serveur build | Clé API à vérifier (warning build) |

---

## 5. Images

- **LCP accueil** : hero WebP (`formation-ia-btp-laure-olivie-ile-de-france.webp`) — format moderne OK.
- **Problème** : PNG > 1 MB encore présents (OG, carrousels blog `slide-*.png`, `financement-constructys-...-hero.png`).
- **Redirects 301** nombreux vers WebP dans `next.config.ts` — bonne stratégie SEO.
- **Action restante** : convertir/supprimer les PNG legacy non référencés ; vérifier `sizes` / `priority` sur hero portrait header.

---

## 6. Fonts

- Inter : 400, 500, 600, 700 — **4 graisses** (vérifier usage réel de 500).
- Outfit : 600, 700 — titres uniquement.
- `display: swap` ✅ — pas de FOIT bloquant.
- Pas de double chargement Google Fonts (self-hosted via `next/font`).

---

## 7. CSS

- **Tailwind v4** purge en production : ~230 KB chunk principal + ~20 KB chunks route.
- Pas de librairie CSS externe lourde (Bootstrap, etc.).
- Animations Reveal via `[data-reveal-state]` dans `globals.css` — bon pattern (pas de lib animation JS).

---

## 8. Core Web Vitals

| Métrique | Cible | Mesure locale |
| -------- | ----- | ------------- |
| LCP | < 2,5 s | Non mesuré — tester PSI mobile sur `/` |
| INP | < 200 ms | Non mesuré |
| CLS | < 0,1 | Structure stable (dimensions images centralisées `lib/photos.ts`) |
| TBT | < 200 ms | Réduction attendue via JS différé (non chiffré ici) |

**Recommandation** : lancer [PageSpeed Insights](https://pagespeed.web.dev/) sur mobile pour `/`, `/formations`, `/contact`, `/prendre-rendez-vous` après déploiement.

---

## 9. Optimisations réalisées

### 9.1 `DeferredLayoutWidgets` — code splitting layout

- **Problème** : 4 composants client avec listeners scroll chargés synchronement dans `app/layout.tsx`.
- **Fichier** : `components/layout/DeferredLayoutWidgets.tsx` (nouveau), `app/layout.tsx`
- **Modification** : `dynamic()` + `ssr: false` pour ScrollToTop, StickyMobile, StickyBlogMetier, InteractionTrackers.
- **Raison** : réduire JS parsé/exécuté au first load.
- **Impact attendu** : −15 à −40 KB JS initial + moins de TBT.
- **Risque** : Faible (widgets apparaissent après hydratation chunk).

### 9.2 Recherche site — import dynamique

- **Problème** : `SiteSearchDialog` (lucide, fetch `/api/search`) dans le bundle layout.
- **Fichier** : `components/search/SiteSearchProvider.tsx`
- **Modification** : `dynamic()` + rendu `{open ? <Dialog /> : null}`.
- **Impact attendu** : chunk recherche chargé uniquement à l’ouverture (⌘K ou clic).
- **Risque** : Faible.

### 9.3 GA4 — consentement + lazyOnload

- **Problème** : gtag chargé `afterInteractive` sans attendre le bandeau cookies.
- **Fichier** : `components/analytics/GoogleAnalytics.tsx`, `hooks/useCookieConsent.ts`
- **Modification** : chargement uniquement si `consent === 'accepted'`, strategy `lazyOnload`.
- **Impact attendu** : −50 à −100 KB réseau + moins de JS tiers au first load (visiteurs sans consentement).
- **Risque** : Faible (aligné RGPD + politique cookies existante).

### 9.4 Trackers analytics fusionnés

- **Problème** : 2 composants client séparés (double hydratation).
- **Fichier** : `components/analytics/InteractionTrackers.tsx` (nouveau)
- **Modification** : un seul `useEffect` pour Calendly + PDF.
- **Risque** : Faible.

### 9.5 Cache assets Next.js

- **Problème** : pas de header cache long sur fichiers hashés.
- **Fichier** : `next.config.ts`
- **Modification** : `Cache-Control: public, max-age=31536000, immutable` sur `/_next/static/:path*`.
- **Impact attendu** : revisites plus rapides (navigateur + CDN Vercel).
- **Risque** : Faible (fichiers fingerprintés).

### 9.6 Hook consentement extrait

- **Fichier** : `hooks/useCookieConsent.ts`
- **Modification** : hook partagé (évite couplage GA ↔ bandeau UI).
- **Risque** : Nul.

### 9.7 Middleware pathname (infrastructure)

- **Fichier** : `lib/middleware/pathname-header.ts`, `middleware.ts`
- **Modification** : en-tête `x-pathname` pour usage futur en routes serveur **hors layout root**.
- **Note** : non utilisé dans le layout (préserve SSG).

---

## 10. Avant / après

Mesures locales build production (même machine, Next.js 16.1.6).

### PageSpeed Insights — bureau (live, 1 sept. 2026, avant déploiement lot 2)

| Métrique | PSI live | Cible |
| -------- | -------: | ----- |
| Score performance | **45** | ≥ 95 |
| FCP | 0,5 s | — |
| LCP | **5,4 s** | < 2,5 s |
| TBT | **2 270 ms** | < 200 ms |
| CLS | 0 | < 0,1 |
| Speed Index | 1,6 s | — |

Diagnostics PSI : JS inutilisé ~1 290 KiB, CSS inutilisé ~1 240 KiB, charge réseau ~3 815 KiB, cache inefficace ~313 KiB.

### Build local (avant → après optimisations code)

| Métrique | Avant | Après lot 1+2 | Gain |
| -------- | ----: | ------------: | ---: |
| JS total (tous chunks) | 2 304 KB | ~2 300 KB | ≈ stable* |
| JS initial (rootMain + polyfill) | ~511 KB | ~511 KB | ≈ 0** |
| Nombre de chunks JS | 76 | **82+** | +chunks lazy |
| SSG pages marketing | ○ | ○ | préservé |

\* Le total stable masque un **déplacement** du JS hors chemin critique (Reveal, sections accueil, mesh hero).

\*\* Le manifest `rootMainFiles` ne reflète pas le JS tiers (GA) ni le gain TBT ; **retester PSI après déploiement**.

### Lot 2 — corrections PSI (1 sept. 2026)

| Problème PSI | Correction |
| ------------ | ---------- |
| TBT / JS exécution 3,5 s | `RevealShell` serveur + **1 seul** `RevealScrollObserver` (vs ~26 `<Reveal />` hydratés sur `/`) |
| JS inutilisé accueil | `HomeBelowFoldSections` — `dynamic()` sections sous-fold (SSR conservé) |
| LCP 5,4 s | `preload()` image hero catalogue + mesh hero **sans JS** (`AccueilHeroAnimatedMesh` serveur) |
| Cache 313 KiB | `Cache-Control: immutable` sur `/images/*` et `/og/*` |
| CSS / fonts | Inter : retrait graisse **500** (400/600/700 conservées) |

---

## 11. Actions restant à réaliser

### Actions possibles dans le code

1. **Accueil — composants `Reveal`** : réduire le nombre d’instances client (~40) ou passer les sections below-the-fold en CSS pur.
2. **lucide-react sur `app/page.tsx`** : icônes dans des branches `Reveal` (client) — remplacer par SVG inline pour les icônes hero/above-the-fold.
3. **Header** : séparer coque statique (logo, liens) et micro-widget client menu mobile.
4. **Images PNG legacy** : batch conversion WebP + suppression doublons (`public/images/blog/carrousel-*`, OG > 800 KB).
5. **Font Inter 500** : auditer usage Tailwind `font-medium` — retirer la graisse si redondante avec 600.
6. **PageSpeed cible** : itérer après mesure PSI mobile réelle (objectif ≥ 90).

### Actions hébergement / serveur

1. Vérifier **Brotli** actif sur Vercel (par défaut).
2. Confirmer **HTTP/2** / **HTTP/3** sur le domaine.
3. Corriger la clé **Google Places API** (warning build avis clients).

### Actions Cloudflare

- Non applicable directement (domaine sur Vercel). Si proxy Cloudflare devant Vercel : activer Brotli, cache assets, Early Hints — sans modifier DNS sans validation.

### Actions services tiers

1. **Calendly** : conserver le pattern lien → `/prendre-rendez-vous` plutôt qu’embed inline sur les pages marketing (déjà en place).
2. **GA4** : valider que les conversions (`cta_rdv_click`, `download_guide`) remontent après passage en consentement-only.

---

## Validation effectuée

- [x] `npm run build` — succès
- [x] TypeScript — OK
- [x] SSG restauré (pas de rendu dynamique global)
- [x] ESLint — pas d’erreurs sur fichiers modifiés
- [ ] Test manuel menu / recherche / sticky CTA / RDV — **à faire après déploiement**
- [ ] PageSpeed Insights mobile — **à faire sur URL live**

---

*Rapport généré dans le cadre de l’optimisation performance laureolivie.fr — OFC Création d’Entreprise.*
