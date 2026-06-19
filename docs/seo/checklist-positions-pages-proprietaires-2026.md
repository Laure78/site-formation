# Checklist — Positions Google pages propriétaires vs satellites

**Objectif :** confirmer, après consolidation SEO (juin 2026), que chaque **page propriétaire** capte les impressions/clics sur les requêtes transactionnelles ou métier cibles, et que les **anciennes satellites** ne les cannibalisent plus.

**Site :** `https://www.laureolivie.fr`  
**Search Console :** propriété `https://www.laureolivie.fr` (ou préfixe URL si configuré ainsi)  
**Fréquence recommandée :** relevé **hebdomadaire** pendant 8 semaines post-déploiement, puis **mensuel** jusqu’à stabilisation (3 mois).

---

## 0. Préparation (à faire une fois)

- [ ] Noter la **date de mise en prod** de la consolidation : `____ / ____ / 2026`
- [ ] Dans GSC → **Paramètres** → vérifier que le sitemap est à jour (`/sitemap.xml`)
- [ ] Exporter un **baseline** Performance (28 derniers jours) : onglet **Résultats de recherche** → Exporter
- [ ] Créer un onglet Google Sheets (ou copier les tableaux §2) avec colonnes : `Date | Requête | Page propriétaire (pos.) | Page satellite (pos.) | Impr. propriétaire | Impr. satellite | Statut`
- [ ] Pour chaque cluster, vérifier en navigation privée :
  - [ ] La page propriétaire répond en **200**
  - [ ] Les satellites redirigées répondent en **301/308** vers la bonne cible
  - [ ] Les satellites **informationnelles** (blog) restent en 200 mais pointent vers le pilier en maillage interne

### Critères « fin de cannibalisation » (cluster validé)

Un cluster est **résolu** quand, sur **4 semaines consécutives** :

1. La **page propriétaire** est la **seule URL du site** visible dans GSC (onglet **Pages**, filtre requête) pour les requêtes transactionnelles du cluster, **ou** affiche > **80 %** des impressions du site sur ces requêtes.
2. La position moyenne de la propriétaire est **stable ou en hausse** ; la satellite (si encore indexée) est **> 20 positions** en dessous **ou** à **0 impression** sur ces requêtes.
3. En recherche Google `site:laureolivie.fr [requête pilier]`, la propriétaire apparaît **avant** les satellites sur les requêtes cœur.

---

## 1. Cartographie propriétaire / satellites

### Cluster A — CCTP / DCE / appels d’offres

| Rôle | URL | Statut technique |
|------|-----|------------------|
| **Propriétaire (transactionnel)** | `/formations/ia-appels-offre-btp` | Canonique cible NIV-02 |
| Satellite legacy (fiche) | `/formations/formation-ia-cctp-analyse-dce-btp` | **Canonical → propriétaire** ; URL conservée pour backlinks |
| Satellites blog (informationnel) | `/blog/formation-ia-cctp-analyse-dce-btp` | 200 — angle guide |
| | `/blog/analyser-cctp-ia-methode-complete-20-minutes` | 200 — méthode 20 min |
| | `/blog/analyse-dce-notebooklm-claude-btp` | 200 — NotebookLM |
| | `/blog/chiffrage-cctp-bpu-appels-offres-btp` | 200 — chiffrage BPU |
| Anciennes URL redirigées | `/formation-ia-appels-offres-btp` | 308 → propriétaire |
| | `/formation-ia-analyse-cctp` | 308 → fiche legacy |
| | `/repondre-appels-offres-ia-btp` | 301 → propriétaire |
| Blog fusionnés (301) | `/blog/analyse-cctp-btp`, `/blog/analyse-cctp-chatgpt-btp` | → méthode 20 min |
| | `/blog/ia-btp-analyse-dce` | → NotebookLM |

### Cluster B — Paris (géo)

| Rôle | URL | Statut technique |
|------|-----|------------------|
| **Propriétaire** | `/formations/ia-btp-paris` | Canonique SEO local Paris |
| Anciennes URL redirigées | `/formation-ia-btp-paris` | 301 → propriétaire |
| | `/formation-ia-btp-paris-75` | Alias (vérifier redirect si trafic GSC) |
| | `/formation-ia-btp-paris-2026` | 301 → propriétaire |
| | `/formation-ia/btp-paris` | 301 → propriétaire |

### Cluster C — Conducteur de travaux

| Rôle | URL | Statut technique |
|------|-----|------------------|
| **Propriétaire (landing métier)** | `/formation-ia-conducteur-de-travaux-btp` | Canonique métier CDT |
| Anciennes URL redirigées | `/ia-conducteur-travaux` | 301 → propriétaire |
| | `/formation-ia-conducteur-travaux-btp` | 301 → propriétaire |
| | `/formation-ia-conducteur-travaux` | 301 → propriétaire |
| Ressources (lead magnet, pas conversion directe) | `/ressources/guide-conducteur-de-travaux` | 200 — maillage → propriétaire |
| | `/guide-skill-ia-conducteur-travaux` | Canonical → ressource |
| Articles blog (informationnel) | `/blog/guide-skill-ia-conducteur-travaux-btp` | 200 |
| | `/blog/ia-conducteur-travaux-usages` | 200 |
| | `/blog/comment-ia-gagne-5h-conducteurs-travaux` | 200 |
| **Page catalogue voisine (intent différent)** | `/formations/ia-conduite-travaux-suivi-chantier` | NIV-03 — ne pas confondre avec cannibalisation CDT |

### Cluster D — Dirigeant BTP

| Rôle | URL | Statut technique |
|------|-----|------------------|
| **Propriétaire (stratégie / CODIR)** | `/formation-ia-dirigeant-btp` | Pilotage stratégique, ROI, gouvernance |
| **Satellite complémentaire (TPE opérationnel)** | `/formation-ia-dirigeant-pme-btp` | Chef TPE — devis & admin ; **pas** de redirect (intention distincte) |
| Vigilance cannibalisation | Requêtes génériques « dirigeant BTP » | La propriétaire stratégique doit dominer ; la satellite ne doit capter que les requêtes **TPE / chef d’entreprise / devis** |

### Cluster E — Assistante BTP

| Rôle | URL | Statut technique |
|------|-----|------------------|
| **Propriétaire (administratif)** | `/formation-ia-assistante-administrative-btp` | Courriers, mails, suivi chantier |
| **Satellite complémentaire (gestion)** | `/formation-ia-assistante-gestion-btp` | Facturation, relances, DGD — intention distincte |
| Ancienne URL redirigée | `/formation-ia-assistante-btp` | 308 → propriétaire administrative |

---

## 2. Tableaux de suivi des positions (à remplir)

> **Position** = colonne « Position moyenne » dans GSC (plus le chiffre est bas, mieux c’est).  
> Laisser vide `—` si la page n’a **aucune impression** sur la requête sur la période.

### Cluster A — CCTP / DCE

**Propriétaire :** `https://www.laureolivie.fr/formations/ia-appels-offre-btp`  
**Satellite à surveiller :** `https://www.laureolivie.fr/formations/formation-ia-cctp-analyse-dce-btp`

| Date | Requête | Pos. propriétaire | Pos. satellite fiche | Pos. blog pilier* | Impr. propriétaire | Impr. satellite | Validé ? |
|------|---------|-------------------|----------------------|-------------------|--------------------|-----------------|----------|
| | formation ia appels d offres btp | | | | | | ☐ |
| | formation ia cctp dce btp | | | | | | ☐ |
| | formation analyse cctp ia | | | | | | ☐ |
| | mémoire technique ia btp | | | | | | ☐ |
| | claude cowork appels offres btp | | | | | | ☐ |

\* Blog pilier informationnel : `/blog/formation-ia-cctp-analyse-dce-btp` — doit rester **sous** la propriétaire sur les requêtes **formation / devis session**.

### Cluster B — Paris

**Propriétaire :** `https://www.laureolivie.fr/formations/ia-btp-paris`

| Date | Requête | Pos. propriétaire | Pos. /formations/ia-btp-paris (ancien chemin)* | Pos. formation-ia-btp-paris* | Impr. propriétaire | Impr. satellites | Validé ? |
|------|---------|-------------------|-----------------------------------------------|------------------------------|--------------------|------------------|----------|
| | formation ia paris | | | | | | ☐ |
| | formation ia btp paris | | | | | | ☐ |
| | formation chatgpt btp paris | | | | | | ☐ |
| | formation ia bâtiment paris | | | | | | ☐ |
| | formation ia ile de france | | | | | | ☐ |

\* Vérifier dans GSC l’onglet **Pages** si d’anciennes URL apparaissent encore (redirigées).

### Cluster C — Conducteur de travaux

**Propriétaire :** `https://www.laureolivie.fr/formation-ia-conducteur-de-travaux-btp`

| Date | Requête | Pos. propriétaire | Pos. /ia-conducteur-travaux* | Pos. ressource guide* | Pos. NIV-03* | Impr. propriétaire | Impr. satellites | Validé ? |
|------|---------|-------------------|------------------------------|----------------------|--------------|--------------------|------------------|----------|
| | formation ia conducteur de travaux | | | | | | | ☐ |
| | ia conducteur de travaux btp | | | | | | | ☐ |
| | chatgpt conducteur de travaux | | | | | | | ☐ |
| | compte rendu chantier ia | | | | | | | ☐ |
| | skill ia conducteur travaux | | | | | | | ☐ |

\* Satellites : `/ia-conducteur-travaux` (301), `/ressources/guide-conducteur-de-travaux`, `/formations/ia-conduite-travaux-suivi-chantier`.

### Cluster D — Dirigeant BTP

**Propriétaire :** `https://www.laureolivie.fr/formation-ia-dirigeant-btp`  
**Satellite complémentaire :** `https://www.laureolivie.fr/formation-ia-dirigeant-pme-btp`

| Date | Requête | Pos. propriétaire (stratégie) | Pos. satellite (TPE) | Impr. propriétaire | Impr. satellite | Validé ? |
|------|---------|------------------------------|----------------------|--------------------|-----------------|----------|
| | formation ia dirigeant btp | | | | | ☐ |
| | ia dirigeant btp | | | | | ☐ |
| | pilotage stratégique ia btp | | | | | ☐ |
| | formation ia chef entreprise btp | | | | | ☐ |
| | roi ia pme btp | | | | | ☐ |

**Règle :** sur « formation ia dirigeant btp », la propriétaire **stratégique** doit être devant la satellite TPE.

### Cluster E — Assistante BTP

**Propriétaire :** `https://www.laureolivie.fr/formation-ia-assistante-administrative-btp`  
**Satellite complémentaire :** `https://www.laureolivie.fr/formation-ia-assistante-gestion-btp`

| Date | Requête | Pos. propriétaire (admin) | Pos. satellite (gestion) | Impr. propriétaire | Impr. satellite | Validé ? |
|------|---------|---------------------------|-------------------------|--------------------|-----------------|----------|
| | formation ia assistante administrative btp | | | | | ☐ |
| | ia assistante btp | | | | | ☐ |
| | chatgpt secrétariat bâtiment | | | | | ☐ |
| | formation ia assistante gestion btp | | | | | ☐ |
| | relances impayés ia btp | | | | | ☐ |

**Règle :** sur « assistante administrative », la propriétaire admin doit dominer ; la satellite gestion ne doit gagner que sur requêtes **facturation / DGD / relances**.

---

## 3. Requêtes exactes à surveiller dans Search Console

### Méthode GSC (identique pour chaque requête)

1. **Performance** → **Résultats de recherche**
2. Période : **28 derniers jours** (comparer avec période précédente)
3. Onglet **Requêtes** → filtre **Requête exacte** (coller la chaîne ci-dessous)
4. Cliquer sur la requête → onglet **Pages** : noter URL, impressions, clics, **position moyenne**
5. Répéter pour la page propriétaire : onglet **Pages** → filtre URL contient le chemin propriétaire → onglet **Requêtes**

### Filtres « URL exacte » (onglet Pages)

Copier-coller dans le filtre **Pages** de GSC :

```
https://www.laureolivie.fr/formations/ia-appels-offre-btp
https://www.laureolivie.fr/formations/formation-ia-cctp-analyse-dce-btp
https://www.laureolivie.fr/formations/ia-btp-paris
https://www.laureolivie.fr/formation-ia-conducteur-de-travaux-btp
https://www.laureolivie.fr/formation-ia-dirigeant-btp
https://www.laureolivie.fr/formation-ia-dirigeant-pme-btp
https://www.laureolivie.fr/formation-ia-assistante-administrative-btp
https://www.laureolivie.fr/formation-ia-assistante-gestion-btp
```

### Requêtes exactes par cluster (coller dans filtre Requête)

#### A — CCTP / DCE

```
formation ia appels d offres btp
formation ia cctp
analyse dce ia btp
formation analyse cctp
mémoire technique ia btp
formation ia cctp analyse dce
claude appels offres btp
```

#### B — Paris

```
formation ia paris
formation ia btp paris
formation chatgpt btp paris
formation ia bâtiment paris
formation ia 75
formation ia ile de france
```

#### C — Conducteur de travaux

```
formation ia conducteur de travaux
formation ia conducteur de travaux btp
ia conducteur de travaux
chatgpt conducteur de travaux
compte rendu chantier ia
guide skill ia conducteur travaux
```

#### D — Dirigeant

```
formation ia dirigeant btp
ia dirigeant btp
formation ia chef entreprise btp
pilotage stratégique ia btp
roi ia pme btp
```

#### E — Assistante

```
formation ia assistante administrative btp
formation ia assistante btp
ia assistante btp
chatgpt secrétariat bâtiment
formation ia assistante gestion btp
```

### Requêtes regex GSC (filtre avancé — optionnel)

Si la propriété GSC autorise les **expressions régulières** sur les requêtes :

| Cluster | Regex (filtre Requête) |
|---------|-------------------------|
| A — AO/DCE | `formation.*(appel.*offre\|cctp\|dce\|mémoire technique).*(btp\|bâtiment)?` |
| B — Paris | `formation.*(ia\|chatgpt).*(paris\|75\|ile de france)` |
| C — CDT | `(formation\|guide\|skill).*(conducteur.*travaux\|compte rendu chantier).*(ia\|btp)?` |
| D — Dirigeant | `formation.*(dirigeant\|chef entreprise\|codir).*(ia\|btp)` |
| E — Assistante | `formation.*(assistante\|secrétariat\|gestion).*(ia\|btp\|bâtiment)` |

### Contrôle manuel complémentaire (1×/mois)

Recherches Google (navigation privée, France) :

```
site:laureolivie.fr formation ia appels offres btp
site:laureolivie.fr formation ia paris
site:laureolivie.fr formation ia conducteur de travaux
site:laureolivie.fr formation ia dirigeant btp
site:laureolivie.fr formation ia assistante administrative btp
```

Noter l’**ordre des URLs** laureolivie.fr dans les SERP (propriétaire attendue en premier).

---

## 4. Alertes — signes que la cannibalisation persiste

- [ ] Deux URLs du **même cluster transactionnel** ont chacune > **20 %** des impressions sur la **même requête exacte** pendant 2 semaines
- [ ] La satellite **legacy** (ex. fiche CCTP) a une **meilleure position** que le pilier NIV-02 sur « formation ia appels d’offres »
- [ ] `/ia-conducteur-travaux` ou variantes sans tiret réapparaissent dans GSC avec des impressions (redirect non prise en compte)
- [ ] `/formation-ia-btp-paris` ou `/formation-ia-btp-paris-2026` cumulent des impressions **au détriment** de `/formations/ia-btp-paris`
- [ ] Les deux pages **dirigeant** ou **assistante** se disputent la **même requête générique** sans distinction d’intention

### Actions correctives si alerte

1. Vérifier `canonical`, `301/308` (`next.config.ts`), lien interne le plus proche du H1 vers la propriétaire
2. Demander une réindexation de la propriétaire : GSC → **Inspection de l’URL** → Demander l’indexation
3. Réduire les ancres optimisées sur les satellites informationnelles (blog) si elles ciblent le mot-clé transactionnel

---

## 5. Journal des revues

| Semaine | Date relevé | Clusters validés (A–E) | Anomalies | Actions |
|---------|-------------|------------------------|-----------|---------|
| S+1 | | ☐ A ☐ B ☐ C ☐ D ☐ E | | |
| S+2 | | ☐ A ☐ B ☐ C ☐ D ☐ E | | |
| S+4 | | ☐ A ☐ B ☐ C ☐ D ☐ E | | |
| S+8 | | ☐ A ☐ B ☐ C ☐ D ☐ E | | |
| M+3 | | ☐ A ☐ B ☐ C ☐ D ☐ E | | |

---

## 6. Références projet

- Constantes URLs : `lib/internal-links.ts`
- Cluster AO/DCE : `lib/ao-dce-cluster-links.ts`
- Redirects : `next.config.ts`, `lib/gsc-redirects-2026.ts`
- Canonical fiche legacy CCTP : `app/formations/formation-ia-cctp-analyse-dce-btp/page.tsx`

---

*Document créé le 18 juin 2026 — suivi post-consolidation cannibalisation SEO.*
