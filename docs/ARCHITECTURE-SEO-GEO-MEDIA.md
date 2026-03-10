# Architecture SEO & GEO — laureolivie.fr — Plateforme média IA BTP

Objectif : positionner laureolivie.fr comme **référence en France** sur l’IA pour la construction, artisans, PME et formations professionnelles.

---

## 1. Structure du site (500+ pages)

```
/                           Accueil
/formation-ia-btp           Pillar formation (ex /formations)
/intelligence-artificielle-batiment  Pillar IA BTP
/chatgpt-artisans           Pillar ChatGPT artisans (ex /chatgpt-artisans-btp)
/ia-pour-entreprises-btp    Pillar IA entreprises

/blog                       Hub blog
/blog/ia-artisans           Cluster IA artisans (30–50 articles)
/blog/ia-btp                Cluster IA BTP
/blog/chatgpt-btp          Cluster ChatGPT BTP
/blog/automatisation-entreprises
/blog/outils-ia             Cluster outils IA

/guides                     Guides pratiques
/outils                     Outils & calculateurs
/cas-clients                Témoignages & études
/ressources                 Fiches, templates, téléchargements

/prendre-rdv
/contact
/tarifs
```

---

## 2. Pillar pages

| Page | H1 | Intent | Cibles GEO |
|------|----|--------|------------|
| formation-ia-btp | Formation IA BTP — Programmes et financement | Transactionnel | ChatGPT, Perplexity |
| intelligence-artificielle-batiment | L’intelligence artificielle au service du bâtiment | Informationnel | Google AI Overviews |
| chatgpt-artisans | ChatGPT pour artisans du bâtiment | Informationnel | Claude, Gemini |
| ia-pour-entreprises-btp | IA pour les entreprises du BTP | Informationnel | Tous |

**Contenu obligatoire par pillar :**
- Short answer (2–3 phrases)
- Définition
- Key takeaways (5 points)
- Exemples pratiques
- FAQ (5–7 questions)
- Liens internes vers 5+ articles cluster

---

## 3. Topic clusters (30–50 articles par cluster)

### Cluster 1 : IA artisans
- **Pillar** : /chatgpt-artisans
- **Keywords** : ChatGPT plombier, IA électricien, devis artisan IA, automatisation artisan…
- **Intent** : Comment faire / Informationnel

### Cluster 2 : IA BTP
- **Pillar** : /intelligence-artificielle-batiment
- **Keywords** : IA conducteur travaux, analyse DCE, CR chantier IA, mémoire technique…

### Cluster 3 : ChatGPT BTP
- **Pillar** : /chatgpt-artisans
- **Keywords** : ChatGPT devis bâtiment, prompts BTP, ChatGPT appels offres…

### Cluster 4 : Automatisation entreprises
- **Pillar** : /ia-pour-entreprises-btp
- **Keywords** : automatisation PME, productivité BTP, gain temps administratif…

### Cluster 5 : Outils IA
- **Pillar** : /ia-pour-entreprises-btp
- **Keywords** : outils IA BTP, ChatGPT vs alternatives, logiciels IA chantier…

---

## 4. URLs des articles (exemples)

```
/blog/ia-artisans/chatgpt-devis-plombier
/blog/ia-btp/ia-conducteur-travaux
/blog/chatgpt-btp/ia-analyse-dce
/blog/automatisation-entreprises/automatisation-pme
/blog/outils-ia/chatgpt-vs-copilot-btp
```

---

## 5. Maillage interne

Chaque article doit lier vers :
- **3 articles** du même cluster
- **1 pillar** du cluster
- **1 page formation** (/formation-ia-btp ou /prendre-rdv)
- **1 CTA** (bloc conversion)

---

## 6. Blocs GEO (extraction IA)

Sur chaque page de contenu :

| Bloc | Usage | Exemple |
|------|-------|---------|
| Short answer | Réponse directe | « L’IA permet aux artisans de gagner 3 à 5h/semaine sur les devis. » |
| Definition | Définition structurée | « ChatGPT pour le BTP désigne… » |
| Key takeaways | Points clés | • Gain temps • Finançable • 4h formation |
| Practical example | Cas concret | « Un plombier a réduit ses devis de 2h à 15 min. » |
| FAQ | FAQPage schema | 5–7 Q/R |

---

## 7. CTAs

- **Découvrir la formation** → /formation-ia-btp
- **Prendre rendez-vous** → /prendre-rdv
- **Télécharger la ressource** → /ressources (ou formulaire)

---

## 8. Schema.org (JSON-LD)

- **Organization** (déjà)
- **Person** (Laure Olivié)
- **Course** (formations)
- **Article** (articles blog)
- **FAQPage** (FAQ)
- **HowTo** (guides pas à pas)
- **BreadcrumbList** (fil d’Ariane)

---

## 9. Structure technique

- **Blog** : `/blog/[slug]` (flat) ou `/blog/[cluster]/[slug]` — cluster en metadata pour linking
- **Sitemap** : dynamique (tous les slugs)
- **Internal links** : `lib/seo-architecture.ts`
- **Redirects** : /formation-ia-btp → /formations, /intelligence-artificielle-batiment → /ia-devis-batiment

## 10. Fichiers créés

| Fichier | Rôle |
|---------|------|
| `docs/ARCHITECTURE-SEO-GEO-MEDIA.md` | Architecture complète |
| `lib/seo-architecture.ts` | Pillars, clusters, internal links |
| `lib/seo-templates.ts` | Templates H1/H2, blocs GEO |
| `lib/seo.ts` | + getArticleSchema, getPersonSchema, getHowToSchema, getBreadcrumbSchema |
| `components/CTABlock.tsx` | Bloc conversion réutilisable |
