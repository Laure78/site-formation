# Suivi Search Console — métiers conducteur & MOE

Tableau à compléter **chaque mois** (export GSC → Performances → Requêtes, fenêtre 28 jours).

| Requête | Page cible (URL) | Position | Impressions | Clics | RDV `src` (GA4) | Action mois suivant |
|---------|------------------|----------|-------------|-------|-----------------|---------------------|
| formation IA conducteur de travaux | | | | | | |
| IA conducteur de travaux | | | | | | |
| prompt conducteur de travaux | | | | | | |
| formation IA maîtrise d'œuvre | | | | | | |
| IA maîtrise d'œuvre | | | | | | |
| CCTP IA | | | | | | |
| IA MOEX | | | | | | |
| compte rendu de chantier IA | | | | | | |

## Règle de priorisation

- **Positions 5 à 15** : enrichir la page cible (FAQ, « En bref », preuves) + **2 liens internes** contextuels (fiche catalogue, guide ou article tuto) depuis une page sœur déjà bien positionnée.
- **Cannibalisation** : une requête = une URL money page (voir `.cursorrules` § conducteur / MOE).
- **RDV** : croiser avec GA4 événements `clic_visio` / `generate_lead` et paramètres `src` + `metier` (`conducteur` \| `moe` \| `autre`).

## Checklist post-déploiement (GSC + GA4)

### Search Console — inspection URL (une fois par lot)

**Pages money (priorité)**  
- `https://www.laureolivie.fr/formation-ia-conducteur-de-travaux`  
- `https://www.laureolivie.fr/formations/ia-conduite-travaux-suivi-chantier`  
- `https://www.laureolivie.fr/formations/ia-maitrise-oeuvre`  
- `https://www.laureolivie.fr/formations/parcours/conducteur-de-travaux`  
- `https://www.laureolivie.fr/formations/parcours/maitre-oeuvre`  

**Blog — 301 legacy « artisan » (vérifier redirection + URL canonique indexée)**  
- `/blog/chatgpt-pour-artisans-erreurs-a-eviter` → `/blog/chatgpt-pour-pme-btp-erreurs-a-eviter`  
- `/blog/chatgpt-artisans-btp-usages` → `/blog/chatgpt-usages-concrets-btp`  
- `/blog/chatgpt-prompts-artisans-btp` → `/blog/chatgpt-prompts-btp-metiers`  
- `/blog/ia-artisans-par-ou-commencer` → `/blog/ia-btp-par-ou-commencer`  

**Sitemap** : demander une nouvelle exploration après déploiement (`/sitemap.xml`).

### GA4 Admin (interface Google — hors repo)

1. **Admin → Définitions personnalisées** : dimensions d’événement `src` et `metier` (portée : événement) sur `clic_visio`, `generate_lead`, `cta_rdv_click`.
2. **Admin → Événements** : marquer `clic_visio` et `generate_lead` comme conversions si pas déjà fait.
3. **Explorations** : tableau croisé `metier` × `src` × `page_path` (fenêtre 28 j).

### Déploiement (Railway / Vercel)

- Build prod : `npm run build`  
- Contrôles locaux : `npm run validate:schema`, `npm run audit:generated-forbidden`, `npm run audit:cta-labels`, `npm run llms:sync` si faits site modifiés.

### Hors repo (manuel)

- **GBP** : posts locaux IDF si campagne en cours (non versionné ici).  
- **Malt / autres profils** : alignement libellés « PME du bâtiment », pas « artisans » comme cible principale.

## Notes

- Date du dernier export GSC :
- Sitemap renvoyé oui/non :
- Dernier déploiement prod (SHA / date) :