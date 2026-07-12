# Suivi Google Search Console — laureolivie.fr

Checklist des actions à réaliser dans [Google Search Console](https://search.google.com/search-console) (propriété `https://www.laureolivie.fr/`) après la campagne de canonicalisation et de redirections.

> Objectif : faire indexer le bon sitemap, valider les **pages maîtres** et surveiller la **cannibalisation résiduelle** via le rapport « Pages ».

---

## 1. Soumettre le sitemap

- [ ] Ouvrir **Index > Sitemaps**.
- [ ] Saisir et envoyer : `https://www.laureolivie.fr/sitemap.xml`
- [ ] Vérifier le statut **« Réussite »** (pas d'erreur de lecture).
- [ ] Contrôler le **nombre d'URL découvertes** (cohérent avec le sitemap : les anciennes URL redirigées `/formation-ia/btp-paris`, `/formation-ia/btp-saint-quentin-en-yvelines` et `/formation-ia-btp` ne doivent **plus** y figurer).
- [ ] Re-soumettre après chaque déploiement majeur modifiant la liste des pages.

---

## 2. Inspecter les pages maîtres (après pose des canoniques)

Pour chaque URL maître : barre **« Inspection de l'URL »** → vérifier que **« Canonique sélectionnée par Google »** = l'URL maître → cliquer **« Demander une indexation »**.

### Pages maîtres canonisées
- [ ] `https://www.laureolivie.fr/formation-ia-btp-yvelines-78`
      *(reçoit le canonical de `/formation-ia-btp-yvelines`)*
- [ ] `https://www.laureolivie.fr/financement-constructys-formation-ia-btp`
      *(reçoit le canonical de `/financement-constructys-100-ia-btp`)*
- [ ] `https://www.laureolivie.fr/formations`
      *(reçoit le canonical de `/formation-ia-et-chatgpt`)*

### Pages secondaires (vérifier la prise en compte du canonical)
À inspecter aussi : Google doit indiquer **« Canonique sélectionnée par l'utilisateur »** pointant vers la maître, et idéalement **« Canonique sélectionnée par Google »** = la maître.
- [ ] `https://www.laureolivie.fr/formation-ia-btp-yvelines`
- [ ] `https://www.laureolivie.fr/financement-constructys-100-ia-btp`
- [ ] `https://www.laureolivie.fr/formation-ia-et-chatgpt`

### Cibles des redirections 308 (vérifier le code de redirection)
- [ ] `https://www.laureolivie.fr/formation-ia/btp-paris` → doit renvoyer **308** vers `/formation-ia-btp-paris`
- [ ] `https://www.laureolivie.fr/formation-ia/btp-saint-quentin-en-yvelines` → **308** vers `/formations/ia-btp-saint-quentin-en-yvelines`
- [ ] `https://www.laureolivie.fr/formation-ia-btp` → **308** vers `/formations`

> Astuce : pour les redirections, l'inspection doit afficher **« Page avec redirection »** comme raison de non-indexation (c'est le comportement attendu, pas une erreur).

---

## 3. Surveiller la cannibalisation résiduelle — rapport « Pages »

- [ ] Ouvrir **Indexation > Pages** (anciennement « Couverture »).
- [ ] Dans la liste **« Pourquoi des pages ne sont pas indexées »**, repérer la ligne :

  ### ⚠️ « Page en double, sans canonique sélectionnée par l'utilisateur »
  > C'est **l'indicateur direct de cannibalisation résiduelle** : Google a trouvé un duplicata mais aucune balise canonique exploitable, et a choisi lui-même une autre URL comme canonique.

- [ ] Cliquer sur cette ligne pour obtenir la **liste des URL concernées**.
- [ ] Pour chaque URL listée :
  - [ ] Vérifier qu'une balise `<link rel="canonical">` **absolue** est bien présente et pointe vers la bonne maître.
  - [ ] Si la canonique manque/est erronée → corriger dans le code (export `metadata.alternates.canonical`), redéployer, puis **« Valider la correction »** dans GSC.
  - [ ] Si la page est réellement un doublon sans valeur propre → envisager une **redirection 308** vers la maître plutôt qu'un simple canonical.

### Autres statuts à surveiller (connexes)
- [ ] **« Autre page avec balise canonique correcte »** : statut **sain** (le canonical est respecté) — rien à faire.
- [ ] **« Page en double, Google n'a pas choisi la même canonique que l'utilisateur »** : Google **ignore** votre canonical → renforcer le signal (contenu différencié, maillage interne vers la maître, cohérence sitemap, voire redirection 308).
- [ ] **« Explorée, actuellement non indexée »** / **« Détectée, actuellement non indexée »** : surveiller l'évolution sur 2-4 semaines.

---

## Rythme de suivi recommandé

| Échéance | Action |
|---|---|
| J+0 | Soumettre le sitemap + inspecter/indexer les 3 pages maîtres |
| J+3 à J+7 | Vérifier le statut canonique des pages secondaires (inspection d'URL) |
| J+14 | 1ère lecture du rapport « Pages » → noter les « Page en double… » |
| J+30 | 2ᵉ lecture : la cannibalisation résiduelle doit diminuer ; valider les corrections |
| Mensuel | Contrôle de routine (sitemap, doublons, redirections) |

---

## Journal de suivi

| Date | Action réalisée | Résultat / statut GSC | À refaire |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

---

_Rappel : ne pas demander d'indexation en masse (quota limité). Prioriser les pages maîtres et les pages dont le canonical vient d'être corrigé._
