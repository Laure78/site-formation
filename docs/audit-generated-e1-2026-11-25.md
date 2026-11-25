# Audit E1 — `content/generated/` (25/11/2026)

## Périmètre

58 fichiers `article-*.json` fusionnés dans `lib/blog.ts` (hors slugs déjà en MDX statique).

## Termes bloquants (script)

`node scripts/audit-generated-forbidden.mjs` — critères : 4,85, 1 592, GERESO, Lefebvre Dalloz, Mon Compte Formation, conductrice de travaux, 100 % finançable, promesse distanciel catalogue.

**Résultat après correctifs : OK (0 occurrence).**

## Correctifs appliqués

| Fichier | Action |
|---------|--------|
| `article-ia-planning-chantier-btp.json` | Lefebvre Dalloz → Le Moniteur Formations |
| `article-formation-ia-intra-btp-constructys-2026.json` | idem |
| `article-chatgpt-artisans-btp-usages.json` | idem |

## Reforme slugs « artisan » (25/11/2026)

- **Purge** : `article-chatgpt-pour-artisans-erreurs-a-eviter.json` (doublon PME), `article-5-cas-usage-chatgpt-artisans-btp.json` (canonique déjà en `blog.ts`).
- **Slugs canoniques** : `chatgpt-usages-concrets-btp`, `chatgpt-prompts-btp-metiers`, `ia-btp-par-ou-commencer` — 301 via `lib/blog-artisan-legacy-redirects.ts`.
- Audit : rejet `slug` / nom de fichier contenant `artisan`.

## Commande CI (optionnelle)

```bash
node scripts/audit-generated-forbidden.mjs
```