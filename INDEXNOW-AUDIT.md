# Audit indexation & IndexNow — laureolivie.fr

Date : 1er septembre 2026

---

## 1. Architecture détectée

| Élément | Détail |
| -------- | ------ |
| Framework | **Next.js 16.1.6** (App Router) |
| UI | React 19 |
| Routing | `app/` — SSG majoritaire (~270 pages, `revalidate: 3600`) + routes dynamiques (`admin`, `espace-apprenant`, API) |
| Sitemap | `app/sitemap.ts` → `/sitemap.xml` (MetadataRoute) |
| Robots | `app/robots.ts` → `/robots.txt` via `lib/robots-txt.ts` |
| Canonical / SEO | `lib/seo.ts` (`createPageMetadata`, `siteAbsoluteUrl`) |
| JSON-LD | `JsonLd`, `GlobalSiteJsonLd`, schémas par page |
| Redirections | `next.config.ts` + `middleware.ts` (apex → www 308) |
| Hébergement | Vercel + Railway (`railway.toml`, `vercel.json`) |
| lastmod sitemap | `lib/sitemap-last-modified.ts` + `lib/sitemap-dates.generated.json` (git au build — **pas** la date du jour) |

**Domaine canonique :** `https://www.laureolivie.fr` (`SCHEMA_PUBLIC_SITE_URL` / `SITE_CONFIG.url`)

**Redirection apex :** `laureolivie.fr` → `www.laureolivie.fr` (308) via middleware + `next.config.ts`

---

## 2. Sitemap

| | |
| --- | --- |
| **Fichier** | `app/sitemap.ts` |
| **URL** | https://www.laureolivie.fr/sitemap.xml |
| **Sources** | Tier1 static, catalogue formations, hub `/formation-ia/*`, départements IDF, landings métier, blog + catégories, ressources/tutos, pages marketing, conformité Qualiopi, cours Supabase publiés |

### Corrections effectuées

- **Retrait de `/auth/connexion`** du sitemap (page de connexion — ne doit pas être poussée à l’indexation).

### Exclusions déjà en place (OK)

- Pagination `/blog/page/[n]`
- Chemins `GSC_EXCLUDED_SITEMAP_PATHS`
- Mentions légales, CGV, politique confidentialité (indexables via canonical, hors sitemap volontaire)
- Fichiers `.pdf` / `.txt`
- Pages noindex (voir §5)

### Décompte URL

Exécuter après déploiement :

```bash
curl -s https://www.laureolivie.fr/sitemap.xml | grep -c "<loc>"
```

Estimation locale : **~250–280 URL** (catalogue + blog + géo + métier).

---

## 3. Robots.txt

| | |
| --- | --- |
| **Fichier** | `app/robots.ts` + `lib/robots-txt.ts` |
| **URL** | https://www.laureolivie.fr/robots.txt |

### Contenu

- `Allow: /` pour Googlebot, Bingbot, bots IA (GPTBot, ClaudeBot, etc.)
- `Disallow: /api/`, `/admin/`, `/acces-admin`, `/espace-apprenant/`
- `Host: www.laureolivie.fr`
- `Sitemap: https://www.laureolivie.fr/sitemap.xml`

**Corrections :** aucune nécessaire — conforme.

---

## 4. Canonical

| | |
| --- | --- |
| **Source** | `createPageMetadata` / `buildMetadata` → `alternates.canonical` |
| **Base** | `https://www.laureolivie.fr` (sans slash final sauf path) |

### Problèmes détectés

- Aucune anomalie structurelle : pas de canonical homepage sur les pages internes.
- Meta description `/formations` corrigée séparément (190 → 147 car.) — Bing Webmaster.

### Corrections IndexNow / sitemap

- URL sitemap = URL canonical (même origine www + HTTPS).

---

## 5. Meta robots — pages noindex (volontaires)

| Page | Raison |
| ---- | ------ |
| `/auth/*` (connexion, inscription, reset) | Zone authentification |
| `/acces-admin` | Admin + header `X-Robots-Tag` |
| `/messages`, `/merci-rdv` | Post-action |
| `/invitation/[token]` | Lien privé |
| `/ressources/guide-conducteur-de-travaux/merci` | Post-téléchargement |
| `/ressources/[slug]` (brouillons) | `robots: noindex` si slug inconnu |
| `/outils/verification-dtu-bework` | Prototype BeWork noindex |

**Aucune page commerciale SEO majeure en noindex involontaire.**

---

## 6. IndexNow

| | |
| --- | --- |
| **Clé** | `e05un916c5fd0496fbfbun9c2d975712b4` (Bing Webmaster Tools) |
| **Fichier clé** | `public/e05un916c5fd0496fbfbun9c2d975712b4.txt` |
| **URL publique** | https://www.laureolivie.fr/e05un916c5fd0496fbfbun9c2d975712b4.txt |
| **Module** | `lib/indexnow.ts` + `lib/indexnow-config.ts` + `lib/indexnow-url-map.ts` |
| **Endpoint** | `POST https://api.indexnow.org/indexnow` |
| **Surcharge clé** | Variable d’environnement `INDEXNOW_KEY` (optionnel) |

### Scripts npm

```bash
# Soumission manuelle (une ou plusieurs URL)
npm run indexnow -- https://www.laureolivie.fr/formations
npm run indexnow -- /formations /blog/mon-article

# Soumission auto après déploiement (uniquement pages modifiées git)
INDEXNOW_AUTO_SUBMIT=1 npm run indexnow:changed
```

### Règles anti-spam

- Jamais de soumission au chargement de page
- Jamais le sitemap entier au build
- Uniquement URL modifiées/supprimées dérivées du `git diff`
- Validation stricte : HTTPS, `www.laureolivie.fr`, pas d’UTM, pas d’`/api/`, pas d’admin

---

## 7. Automatisation

| Moment | Comportement |
| ------ | ------------ |
| **Publication manuelle** | `npm run indexnow -- <urls>` |
| **Déploiement CI/CD** | `INDEXNOW_AUTO_SUBMIT=1 npm run indexnow:changed` après build (optionnel) |
| **État** | `.indexnow-state.json` (gitignored) — dernier commit soumis |

**Railway / Vercel :** ajouter en post-deploy (facultatif) :

```bash
INDEXNOW_AUTO_SUBMIT=1 npm run indexnow:changed
```

---

## 8. Tests

| Test | Statut |
| ---- | ------ |
| Build production | **OK** |
| robots.txt (local généré) | **OK** |
| sitemap.xml (local généré) | **OK** |
| Fichier clé IndexNow (local) | **OK** (contenu = clé) |
| Soumission IndexNow live | **À tester après déploiement** |

```bash
# Après déploiement
curl -I https://www.laureolivie.fr/robots.txt
curl -I https://www.laureolivie.fr/sitemap.xml
curl https://www.laureolivie.fr/e05un916c5fd0496fbfbun9c2d975712b4.txt
npm run indexnow -- https://www.laureolivie.fr/formations
# Attendu : HTTP 200
```

---

## 9. Anomalies SEO techniques (indexation)

| Anomalie | Sévérité | Action |
| -------- | -------- | ------ |
| `/auth/connexion` dans sitemap | Corrigé | Retiré |
| Meta description `/formations` trop longue | Corrigé | 147 car. |
| IndexNow absent | Corrigé | Module + clé + scripts |
| `/cours/[slug]` dans sitemap | Info | Cours Supabase **publiés** uniquement — OK si produits indexables |
| `/install-pwa` dans sitemap | Faible | Page utilitaire — acceptable |

---

## 10. Fichiers modifiés / créés

- `lib/indexnow-config.ts` (nouveau)
- `lib/indexnow.ts` (nouveau)
- `lib/indexnow-url-map.ts` (nouveau)
- `public/e05un916c5fd0496fbfbun9c2d975712b4.txt` (clé Bing IndexNow)
- `scripts/indexnow-submit.ts` (nouveau)
- `scripts/indexnow-notify-changed.ts` (nouveau)
- `app/sitemap.ts` (retrait `/auth/connexion`)
- `package.json` (scripts `indexnow`, `indexnow:changed`)
- `.gitignore` (`.indexnow-state.json`)
- `INDEXNOW-AUDIT.md` (ce fichier)

---

## 11. Actions manuelles — Bing Webmaster Tools

1. **Vérifier** le site `https://www.laureolivie.fr`
2. **Soumettre le sitemap** : `https://www.laureolivie.fr/sitemap.xml` (Sitemaps → Ajouter)
3. **Demander une réindexation** de `/formations` après déploiement (meta description corrigée)
4. **Vérifier** que le fichier clé IndexNow répond en 200 :
   `https://www.laureolivie.fr/ofc-laureolivie-indexnow-7k9m2p4x.txt`
5. **Tester** : `npm run indexnow -- https://www.laureolivie.fr/formations` → HTTP 200
6. IndexNow notifie Bing **et** les moteurs compatibles — pas besoin d’API SOAP Bing legacy

---

*Aucun JavaScript client ajouté. Aucun impact PageSpeed.*
