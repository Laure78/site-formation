# Media Machine — Architecture autonome

Système de génération automatique de contenu SEO et LinkedIn pour laureolivie.fr.

---

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────────┐
│                     MEDIA MACHINE — Pipeline                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐             │
│  │   TREND      │   │   TOPIC      │   │   CONTENT    │             │
│  │   DISCOVERY  │──►│   CLUSTERS   │──►│   GENERATOR  │             │
│  └──────────────┘   └──────────────┘   └──────┬───────┘             │
│         │                    │                 │                     │
│         │                    │                 ▼                     │
│         │                    │          ┌──────────────┐               │
│         │                    │          │   GEO        │               │
│         │                    │          │   OPTIMIZER │               │
│         │                    │          └──────┬──────┘               │
│         │                    │                 │                     │
│         │                    │                 ├─────────────────┐   │
│         │                    │                 ▼                 ▼   │
│         │                    │          ┌──────────┐    ┌──────────┐ │
│         │                    └─────────►│ INTERNAL │    │ LINKEDIN │ │
│         │                               │  LINKS   │    │  POSTS   │ │
│         │                               └────┬─────┘    └────┬─────┘ │
│         │                                    │               │       │
│         │                                    ▼               ▼       │
│         │                               ┌──────────┐   ┌──────────┐ │
│         └─────────────────────────────►│ PUBLISH  │   │  EXPORT  │ │
│                                        │  ARTICLES│   │  FOR     │ │
│                                        └──────────┘   │ LINKEDIN │ │
│                                                       └──────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Niche & audience cible

| Niche | Audience |
|-------|----------|
| IA pour la construction | Entreprises BTP, PME |
| IA pour artisans | Artisans du bâtiment |
| IA pour TPE/PME | Chefs d'entreprise |
| Formation IA | Professionnels, managers |

---

## Topic clusters (architecture)

### Cluster 1 : IA pour artisans (50–100 articles)
- ChatGPT artisans plombier, électricien, maçon, carreleur...
- Devis avec IA par métier
- Emails et relation client
- Gestion administrative

### Cluster 2 : IA pour entreprises construction (50–100 articles)
- IA appels d'offres
- IA gestion chantier
- IA conducteur travaux
- IA PME BTP

### Cluster 3 : IA productivité (50–100 articles)
- Gain de temps devis
- Automatisation emails
- CR chantier
- Planning et suivi

### Cluster 4 : IA marketing (50–100 articles)
- Prospection BTP
- Réseaux sociaux
- Contenu commercial

### Cluster 5 : IA recrutement (50–100 articles)
- Offres d'emploi BTP
- Recrutement artisans
- GEPP et RH

---

## Templates GEO (blocs obligatoires)

Chaque article doit contenir :

| Bloc | Description | Rôle GEO |
|------|-------------|----------|
| Short answer | Réponse en 1–2 phrases | Extraction AI |
| Definition | Définition claire du concept | Snippet |
| Key takeaways | 3–5 points clés | Liste structurée |
| Practical example | Cas concret BTP | Contexte |
| Step-by-step | Guide numéroté | How-to |
| FAQ | 3–5 questions | FAQPage schema |

---

## Workflow quotidien (cron)

```bash
# 1. Découvrir tendances (10 idées)
npm run media:trends

# 2. Générer articles (10/jour)
npm run media:generate

# 3. Optimiser SEO + GEO
npm run media:optimize

# 4. Publier (écrit dans lib/blog ou content/)
npm run media:publish

# 5. Générer posts LinkedIn
npm run media:linkedin
```

---

## Liens internes (anchors optimisés)

| Cible | Exemples d'ancre |
|-------|------------------|
| /formations | formation IA BTP, formation intelligence artificielle bâtiment |
| /chatgpt-artisans-btp | ChatGPT pour artisans, IA artisans |
| /ia-devis-batiment | IA devis bâtiment, automatiser devis |
| /prendre-rdv | réserver formation, prendre RDV |
| /blog | ressources IA BTP, articles formation |

---

## CTAs dans les articles

- Bloc fin d'article : « Découvrez notre formation IA BTP — financement possible selon éligibilité »
- Lien : /prendre-rdv
- Variante : « Réservez un échange de 30 min gratuit »

---

## Fichiers du système

```
lib/media-machine/
├── config.ts          # URL, mots-clés, liens internes
├── clusters.ts        # Topic clusters (5 × 50–100 articles)
├── trends.ts          # Trend discovery (generateDailyIdeas)
├── templates.ts       # Article & LinkedIn templates GEO
├── article-generator.ts
├── linkedin-generator.ts
├── internal-links.ts   # Maillage interne
├── storage.ts         # Lecture content/generated
└── index.ts           # Exports

scripts/
├── trends.ts          # npm run media:trends — 10 idées
├── generate-daily.ts  # npm run media:generate — articles + LinkedIn
└── publish.ts         # npm run media:publish — liste prêts à publier

app/admin/
└── media-dashboard/   # Dashboard SEO

content/
└── generated/         # article-*.json, daily-summary.json, linkedin-posts.json
```

---

## API externes (optionnel)

| Service | Usage | Clé |
|---------|-------|-----|
| Google Trends | Tendances hebdo | Non officiel / serpapi |
| OpenAI / Claude | Génération texte | OPENAI_API_KEY |
| LinkedIn | Publication auto | LINKEDIN_API (OAuth) |

---

*Architecture v1 — mars 2026*
