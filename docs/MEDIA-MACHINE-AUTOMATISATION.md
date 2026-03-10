# Automatisation des articles de blog — Media Machine

---

## Ce qui a été mis en place

### 1. Intégration au blog

Les articles de `content/generated/` sont **chargés automatiquement** dans le blog.

- `lib/blog.ts` fusionne les articles statiques + générés
- Les pages `/blog` et `/blog/[slug]` affichent tous les articles
- Le sitemap inclut les nouveaux slugs automatiquement

### 2. Génération

| Commande | Description |
|----------|-------------|
| `npm run media:generate` | 10 articles + 10 posts LinkedIn (templates) |
| `npm run media:generate:ai` | Idem + enrichissement OpenAI des paragraphes |

### 3. Cron GitHub Actions

- **Fichier** : `.github/workflows/media-generate.yml`
- **Planification** : tous les jours à 4h (heure Paris)
- **Actions** : génère 10 articles, commit, push
- **Effet** : Railway/autre plateforme redéploie avec les nouveaux articles

### 4. Configuration GitHub

Pour activer le cron :

1. GitHub → dépôt `site-formation` → **Settings** → **Actions** → **General**
2. Vérifier que les workflows sont autorisés

Pour enrichissement IA (optionnel) :
- **Settings** → **Secrets and variables** → **Actions**
- Ajouter `OPENAI_API_KEY`
- Modifier le workflow pour lancer `media:generate:ai` au lieu de `media:generate`

---

## Workflow complet

```
4h du matin (Paris)
    ↓
GitHub Actions : media-generate
    ↓
npm run media:generate
    ↓
10 articles → content/generated/*.json
    ↓
git commit + push
    ↓
Déploiement Railway auto (si branch main)
    ↓
Blog mis à jour avec les nouveaux articles
```

---

## Lancement manuel

**Générer maintenant** :
- GitHub → **Actions** → **Media Machine — Génération articles** → **Run workflow**

**En local** :
```bash
npm run media:generate
git add content/generated/
git commit -m "Articles générés"
git push
```

---

## Prochaines étapes possibles

- **SerpApi** : tendances Google pour varier les sujets
- **LinkedIn API** : publication automatique des posts
- **Media generate:ai** dans le cron si OPENAI_API_KEY est configuré
