# Corrections d’indexation — 2026-10-07

Source GSC (synthèse) : 144× 404 · 81× redirections · 16× noindex · 116× explorées non indexées · sitemap en erreur 500 en production.

## Corrections code

1. **Middleware** — sortie immédiate pour `/sitemap.xml` et `/robots.txt` (évite latence / 5xx côté crawl).
2. **Chaînes de redirection éliminées** (Paris / BeWork) — destinations finales directes :
   - `*-paris-2026`, `*-paris-75`, `/formations/ia-btp-paris`, `/formation-ia/btp-paris`, `/formation-ia-entreprise-batiment-paris` → `/formation-ia-paris`
   - `/bework/plateforme` couvert par `/bework/:path*` → NIV-10 (plus de hop via `/bework`)
3. **Doorways → 308** (page + next.config + hors sitemap) :
   - Morangis / Longjumeau → Essonne 91
   - Solier → `/formation-ia`
   - Conducteur d’engins → `/formation-ia-travaux-publics`
   - `/formation-ia-btp-paris` → `/formation-ia-paris`
4. **Hubs thin `/formation-ia/[slug]`** (ex-noindex) → 308 vers `/formation-ia` (seuls les hubs riches restent indexables).
5. **Alias** `/indicateurs-de-resultats` → `/indicateurs-resultats`.

## Après déploiement

1. Vérifier `https://www.laureolivie.fr/sitemap.xml` → **200** (plus 500).
2. Dans GSC : **Valider la correction** sur « Introuvable (404) » et « Page avec redirection ».
3. Demander l’indexation des URL stratégiques : `/`, `/formation-ia-btp`, `/formations`, `/a-propos`.
4. Les 81 « Page avec redirection » et une partie des 144 « 404 » baisseront progressivement après crawl (comportement normal post-consolidation).

## Non corrigé ici (attendu / hors code)

- « Explorée, actuellement non indexée » (116) : signal qualité / budget de crawl — se résout avec consolidation + contenu fort, pas avec des pages supplémentaires.
- « Autre page avec balise canonique correcte » (14) : comportement souhaité (canonical respecté).
