# Optimisation des liens — laureolivie.fr

**Objectif** : Renforcer le SEO et la crédibilité via une stratégie de liens (internes, sortants, entrants).

---

## 1. Liens internes (maillage)

### En place

- **`lib/seo-links.ts`** : Configuration centralisée des ancres SEO variées (évite répétition, renforce les mots-clés)
- **`lib/blog.ts`** : `getCommercialLinksForArticle()` — 4–5 liens contextuels par article selon la catégorie
- **`getRelatedArticlesForDisplay()`** : Maillage blog → blog (jusqu’à 6 articles associés par article)
- **Footer** : Liens vers formations, RDV, blog, pages légales
- **Header** : Navigation vers piliers (formations, blog, prendre RDV)

### Bonnes pratiques

- Varier les ancres : ex. "formation IA BTP", "catalogue formations IA", "formations IA bâtiment"
- Lier les articles à la même catégorie + pages commerciales (formations, RDV, diagnostic)
- Limiter à 5–8 liens internes contextuels par page de contenu
- Prioriser les pages de conversion : /formations, /prendre-rdv, /diagnostic-ia-btp

### Règles d’ancres

- Privilégier des ancres descriptives (pas uniquement "cliquez ici")
- Intégrer les mots-clés cibles (formation IA BTP, ChatGPT artisans, IA devis bâtiment)
- Ne pas sur-optimiser : ancres naturelles, variées

---

## 2. Liens externes sortants

### En place

- **`components/ExternalLink.tsx`** : Composant `ExternalLinkAnchor` avec `target="_blank"` et `rel="noopener noreferrer"`
- Attributs `title` sur les liens sortants pour accessibilité et SEO
- Pas de `nofollow` sur les sources officielles (Constructys, CNIL, data.gouv.fr, Agefiph, LinkedIn)

### Quand utiliser `nofollow` ?

- Liens sponsorisés ou publicitaires
- Contenu généré par les utilisateurs (UGC) non modéré
- Sites non éditoriaux ou peu fiables

### Bonnes pratiques

- Tous les liens externes : `target="_blank"` + `rel="noopener noreferrer"`
- Ajouter `title` descriptif (ex. "Constructys — OPCO du BTP")
- Privilégier des liens vers des sources autoritaires (OPCO, institutions, formations officielles)
- Utiliser `ExternalLinkAnchor` pour les liens sortants dans le code

---

## 3. Liens externes entrants (backlinks)

Les backlinks ne se contrôlent pas directement, mais le site peut être rendu plus « linkable ».

### Contenu propice aux liens

- Guides pratiques (ex. checklist 10 prompts ChatGPT)
- Articles de fond avec données ou études
- Pages partenaires (FFB, Lefebvre Dalloz)
- Témoignages et cas clients
- FAQ détaillées et référentiel Qualiopi / financement

### Actions pour attirer des liens

1. **Partenariats** : FFB, Lefebvre Dalloz — proposer une page partenaire ou un article invité
2. **Médias / presse** : Communiqués sur l’IA au BTP, formations, qualification Qualiopi
3. **Réseaux** : LinkedIn, publications régulières avec lien vers le site
4. **Annuaire / citations** : Annuaire des organismes de formation, annuaire Qualiopi
5. **Invitations** : Articles invités sur des blogs BTP ou formation
6. **Outils gratuits** : Checklist, calculateur, modèle de devis téléchargeable

### Pages à mettre en avant

- `/checklist-ia-btp` — Checklist téléchargeable
- `/a-propos` — Parcours Laure Olivié
- `/clients-partenaires` — Références FFB, etc.
- `/financement-constructys` — Guide financement
- `/diagnostic-ia-btp` — Offre de diagnostic gratuit

### Partenaires susceptibles de linker

| Partenaire | Type de lien possible |
|------------|------------------------|
| FFB | Page partenaire, article invité |
| Lefebvre Dalloz | Page partenaire, formation |
| Lefebvre Dalloz | Référence formation |
| CNAM Entreprise | Référence formation |
| Constructys | Annuaire OPCO (si applicable) |
| LinkedIn Learning | Profil intervenante |

---

## 4. Schéma de maillage recommandé

```
Accueil (/)
├── Formations (/formations)
├── Prendre RDV (/prendre-rdv)
├── Blog (/blog)
└── ChatGPT artisans (/chatgpt-artisans-btp)

Blog (articles)
├── → Formations (ancres variées)
├── → Prendre RDV (ancres variées)
├── → Pages selon catégorie (devis, financement, appels d’offres…)
└── → Articles associés (maillage interne)

Pages piliers (formations, chatgpt-artisans, ia-devis)
├── → Prendre RDV
├── → Blog (ressources)
└── → Autres piliers
```

---

## 5. Fichiers techniques

| Fichier | Rôle |
|---------|------|
| `lib/seo-links.ts` | Config ancres internes, liens externes autorités |
| `components/ExternalLink.tsx` | Composant `ExternalLinkAnchor` pour liens sortants |
| `lib/blog.ts` | `getCommercialLinksForArticle`, `getRelatedArticlesForDisplay` |
| `components/Footer.tsx` | Liens internes + ExternalLinkAnchor pour LinkedIn, Qualiopi |
