# Audit SEO & GEO — laureolivie.fr

**Objectif** : Position #1 en France pour « formation IA BTP », « IA pour le BTP », « ChatGPT pour artisans », « intelligence artificielle bâtiment ».

**Cible** : Google, Google AI Overviews, ChatGPT, Perplexity, Gemini, Claude.

---

## STEP 1 — Crawl & structure

### Cartographie des pages

| Route | H1 | Metadata | Schema | Priorité sitemap |
|-------|-----|----------|--------|------------------|
| `/` | Formation IA pour les entreprises du BTP ✓ | ✓ | Org, LocalBusiness, WebSite | 1 |
| `/formations` | Catalogue des formations IA BTP | ✓ | — | 0.9 |
| `/formations/ia-btp-paris` | Formation IA BTP à Paris | ✓ | Course ✓ | 0.9 |
| `/formations/ia-travaux-publics` | IA & Travaux Publics | ✓ | — | 0.85 |
| `/formations/ia-appels-offre-btp` | Appels d'Offres BTP | ✓ | — | 0.85 |
| `/formations/ia-rh-btp` | Formation IA Fonction RH | ✓ | — | 0.85 |
| `/formations/ia-pme-btp` | Formation IA pour PME du BTP | ✓ | — | 0.85 |
| `/formations/ia-productivite-chantier` | Productivité chantier | ✓ | — | 0.85 |
| `/cours` | Catalogue des cours en ligne | ✓ | — | 0.9 |
| `/contact` | Laure Olivié ⚠ | ✓ | — | 0.9 |
| `/a-propos` | Laure Olivié ⚠ | ✓ | — | 0.8 |
| `/tarifs` | Tarifs ⚠ | **Manquant** | — | 0.8 |
| `/offres` | Nos offres | **Manquant** | — | — (absent sitemap) |
| `/prendre-rdv` | Prendre rendez-vous | ✓ | — | 0.95 |
| `/annuaire-handicap` | Annuaire handicap | ✓ | — | — (absent sitemap) |

---

## ERREURS critiques

| # | Problème | Impact |
|---|----------|--------|
| 1 | **Tarifs** : pas de metadata (title, description, canonical) | SEO faible, title générique |
| 2 | **Offres** : pas de metadata | Page invisible pour les moteurs |
| 3 | **H1 Contact/A-propos** : "Laure Olivié" au lieu de "Contact" / "À propos" | Mauvaise interprétation thématique |
| 4 | **Cloudflare robots** : ClaudeBot, GPTBot, Google-Extended DISALLOW | **Bloque la visibilité GEO** — à désactiver dans Cloudflare |
| 5 | **Sitemap 500** : /sitemap.xml retourne erreur | Crawlers ne découvrent pas les URLs |

---

## AVERTISSEMENTS

| # | Problème |
|---|----------|
| 1 | Schema Course uniquement sur ia-btp-paris — 5 autres formations sans Course |
| 2 | Pas de FAQPage schema sur la homepage (section FAQ existante) |
| 3 | annuaire-handicap, offres absents du sitemap |
| 4 | formations/[slug] (excel-avance, etc.) : metadata manquant |
| 5 | Contenu mince sur ia-pme-btp (~30 lignes) |
| 6 | Mots-clés GEO manquants : "ChatGPT pour artisans", "IA devis bâtiment" peu présents |

---

## OPPORTUNITÉS

| # | Action |
|---|--------|
| 1 | Ajouter Course schema sur toutes les pages formations |
| 2 | Ajouter FAQPage schema (homepage) |
| 3 | Créer pages cibles : ChatGPT artisans, IA devis bâtiment, IA conducteur travaux, IA appels offres, IA PME BTP |
| 4 | Blocs GEO : définition courte + exemples pratiques sur chaque sujet |
| 5 | Maillage interne : liens formations ↔ blog ↔ guides |
| 6 | Désactiver Cloudflare "AI bots disallow" pour GEO |

---

## STEP 2 — Technique

### À corriger
- [x] Metadata tarifs, offres
- [x] Sitemap : ajouter offres, annuaire-handicap ; exclure merci-*
- [x] FAQPage schema homepage
- [ ] BreadcrumbList sur les formations
- [ ] Alt text images (à audit)

### robots.txt (Cloudflare)
⚠️ **Action manuelle requise** : Dans Cloudflare → Scrape Shield ou pare-feu → désactiver le blocage de GPTBot, ClaudeBot, etc. si vous souhaitez apparaître dans ChatGPT, Claude, Perplexity.

---

## STEP 3-4 — GEO & autorité

### Structure pillar + clusters

**Pillar** : `/formations` ou `/` (Formation IA BTP)

**Clusters à créer** :
- ChatGPT pour artisans BTP
- IA pour devis bâtiment
- IA conducteur de travaux
- IA appels d'offres BTP
- IA pour PME BTP
- IA gestion chantier
- IA sécurité chantier
- IA planning travaux

---

## STEP 7 — Schema prêts

- Organization, LocalBusiness, WebSite : ✅ (layout)
- Course : ✅ ia-btp-paris ; à ajouter sur 5 autres
- FAQPage : à ajouter homepage
- Person (Laure Olivié) : à ajouter
- BreadcrumbList : à ajouter formations

---

---

## ACTIONS RÉALISÉES (session mars 2026)

- [x] Metadata tarifs, offres
- [x] FAQPage schema homepage
- [x] Course schema sur toutes les formations (6/6)
- [x] Sitemap : offres, annuaire-handicap, chatgpt-artisans-btp, ia-devis-batiment, ia-conducteur-travaux
- [x] Nouvelles pages : ChatGPT artisans BTP, IA devis bâtiment, IA conducteur de travaux
- [x] FAQPage schema sur les nouvelles pages
- [x] Footer : liens vers les guides
- [ ] Cloudflare : autoriser les bots IA (action manuelle)
- [ ] Corriger H1 Contact / À propos

*Rapport généré — mars 2026*
