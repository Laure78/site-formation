# Régénération des PDF programmes catalogue IA BTP

## Commande

```bash
npm run programmes:ofc
```

Par défaut : **NIV-03**, **NIV-09**, **NIV-10** (formations impactées par la cohérence catalogue de nov. 2026).

Références au choix :

```bash
npx tsx scripts/generate-programmes-ofc-catalogue.ts NIV-01 NIV-02 NIV-03
```

## Sources de contenu

| Réf. | Source programme | Fichier de sortie |
|------|------------------|-------------------|
| NIV-01 … NIV-05 | `programmes-ofc-2026-10-17.json` | `data/formations.ts` → `pdfProgramme` |
| NIV-09 | `lib/formation-assistants-ia-personnalises-btp-content.ts` (4 h) | `public/formations/assistants-ia-personnalises-btp/…` |
| NIV-10 | `lib/dev-web-ia-programme-catalogue.ts` (14 h, 2 jours) | `public/formations/developpement-web-ia-sans-coder/…` |

Les blocs Qualiopi (évaluation, accès, handicap) viennent de `getInfosPratiquesForCatalogue()`.

## Avant régénération

1. Vérifier que `programmes-ofc-2026-10-17.json` est aligné sur les fiches (durée, tarif, modules, prérequis).
2. Pour **NIV-04 / NIV-05** : le JSON porte encore une structure « 7 h » — ne pas régénérer ces PDF via JSON tant que le fichier n’est pas passé en 4 h / 240 min.

## Après régénération

1. Contrôler visuellement les PDF (durée, effectif 6–12, tarifs 120 / 170 / 620 € HT).
2. `npm run audit:qualiopi-liens` — liens PDF des fiches.
3. Optionnel LMS : mettre à jour `content_url` Supabase si vous versionnez les PDF (`supabase/migrations/069_…`).
4. **NIV-09** : le nom de fichier reste `programme_OFC_Assistants_IA_BTP_7h_20261022.pdf` (historique) ; renommer et mettre à jour `data/formations.ts` + `lib/internal-links.ts` si vous souhaitez un libellé « 4 h » dans l’URL.

## Scripts voisins

- `npm run programmes:applications-metier` — NIV-06 à NIV-08 (hors catalogue public).
