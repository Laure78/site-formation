# Audit maillage interne — laureolivie.fr (10 avril 2026)

## 1. Fichier source unique

- **`lib/internal-links.ts`** : constantes `LINKS` (URLs canoniques tier 1–2 + utilitaires).
- **`lib/seo-links.ts`** : `INTERNAL_LINKS` réutilise les chemins via `LINKS` pour éviter la dérive.

## 2. URLs non canoniques corrigées

| Problème | Action |
|----------|--------|
| `/financement-constructys` dans **40 fichiers** `content/generated/*.json` | Remplacé par `/financement-constructys-formation-ia-btp` (cohérent avec la redirect Next.js existante). |
| `/formation-ia-btp-paris-2026` utilisée en liens internes | Remplacée par **`/formation-ia-btp-paris`** (canonique SEO). Redirect **301** dans `next.config.ts`. Page source **supprimée** (juil. 2026) — seule la redirection demeure. |
| Doublons **même URL** sur une même page | Réductions ciblées (voir §3). |

**Note :** `/tarifs` et `/financement-constructys` sans suffixe étaient déjà redirigés côté `next.config.ts` ; les liens internes ne doivent plus les citer.

## 3. Doublons de liens corrigés (extraits)

| Zone | Correction |
|------|------------|
| **Accueil `/`** | Suppression du second lien « Voir tout le catalogue » vers `/formations` ; un seul CTA catalogue + liens contextuels (programme BTP-01, blog, IA devis, IA CDT, RDV) avec ancres différenciées. Suppression du second lien vers la page financement dans le bloc Qualiopi (doublon avec la section financement). |
| **Article blog `[slug]`** | Section « Guides pratiques » allégée (plus de doublon `/formations` + `/financement-constructys-100-ia-btp` + Paris 2026). Pied d’article : une seule occurrence logique par cible ; CTA secondaire pointe vers `LINKS.formationBatiment` au lieu d’un second `/formations`. |
| **`getCommercialLinksForArticle` (rh)** | Suppression du **double lien vers `/formations`** (base + cas RH) ; conservation de `formation RH` + diagnostic. |
| **Footer** | Suppression des entrées redondantes « Paris 2026 » et « Financement 100 % » en doublon de Paris + financement principal. |
| **Pages financement & Paris** | Aller plus loin : liens uniques, Paris canonique, pas de double ligne « financement » identique. |

## 4. Liens brisés (audit statique)

- Les `href` internes commençant par `/` ont été vérifiés pour les fichiers modifiés ; **aucune cible inventée** (uniquement des routes existantes du projet ou redirects déclarées).
- Les pages **hors liste « tier »** (ex. `/formations/ia-btp-yvelines-78`, hub `formation-ia/*`) restent valides ; elles ne sont pas dans `LINKS` minimal mais existent dans `app/`.

## 5. Pages les plus linkées en interne (indicatif)

Les URL les plus récurrentes dans les composants transverses (footer, blog, `AllerPlusLoin`, FAQ) :

1. `/formations`
2. `/financement-constructys-formation-ia-btp`
3. `/formation-ia-artisans-btp`
4. `/blog`
5. `/formation-ia-btp-paris` (canonique géo Paris)
6. `/prendre-rdv` / Calendly (CTA)

## 6. Pages « orphelines » ou peu linkées

- Nombreuses **fiches métier** `formation-ia/*` et pages **admin** : peu ou pas de liens entrants depuis le footer global — **normal** pour le back-office.
- **Priorité manuelle suggérée** : ajouter 1 lien contextuel depuis `/formations` ou `/blog` vers les landings stratégiques (ex. Yvelines 78, `repondre-appels-offres-ia-btp`) si elles doivent gagner en autorité.

## 7. Recommandations — 3 liens internes à ajouter en priorité

1. **Vers `/formations/ia-btp-yvelines-78`** depuis le bloc Île-de-France (déjà amorcé) + une mention dans **1 article blog** local SEO.
2. **Vers `/etudes-de-cas/ffb-csfe`** depuis **1 fiche formation catalogue** (crédibilité + EEAT).
3. **Vers `/ressources/ia-btp/10-cas-usage-concrets`** depuis la **fiche `/ia-devis-batiment`** (renforcer le silo productivité).

## 8. Chiffres (ordre de grandeur)

| Métrique | Valeur |
|----------|--------|
| Fichiers JSON générés corrigés (financement) | **40** |
| Redirect 301 nouvelle (Paris 2026) | **1** |
| Fichiers TSX/TS touchés (maillage + constantes) | **~15** |
| Doublons majeurs supprimés (même page source) | **10+** zones |

---

*Document généré dans le cadre de l’audit SEO technique Next.js — avril 2026.*
