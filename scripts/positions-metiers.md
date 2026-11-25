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
- **RDV** : croiser avec GA4 événements `clic_visio` / `generate_lead` et paramètre `src` (`landing-conducteur*`, `fiche-moe*`, `parcours-conducteur`, etc.) + dimension `metier` une fois configurée.

## Notes

- Date du dernier export GSC :
- Sitemap renvoyé oui/non :
- Inspection URL prioritaire (post-déploiement) : `/formation-ia-conducteur-de-travaux`, `/formations/ia-conduite-travaux-suivi-chantier`, `/formations/ia-maitrise-oeuvre`, `/formations/parcours/conducteur-de-travaux`, `/formations/parcours/maitre-oeuvre`