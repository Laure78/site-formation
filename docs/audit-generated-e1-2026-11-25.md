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

## Vigilance (non bloquant)

- **~40 articles** avec « artisan » dans le slug ou le corps (contenu legacy SEO métier). Hors interdits absolus `.cursorrules` ; revue éditoriale ou dépublication = décision produit distincte.
- Slugs `artisan` : pas de redirection automatique ; ne pas recannibaliser `/formation-ia-btp` sans plan 301 validé.

## Commande CI (optionnelle)

```bash
node scripts/audit-generated-forbidden.mjs
```