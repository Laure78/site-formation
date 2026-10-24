# UX — refonte `/formateurs`

Date : 2026-10-24

## Objectif

Réduire la duplication, clarifier les CTA, renforcer la confiance (Qualiopi, satisfaction, logos) et permettre de filtrer l’équipe par domaine — sans modifier les contenus biographiques ou commerciaux validés.

## Changements principaux

| Chantier | Modification |
|----------|--------------|
| 1. Doublon supprimé | Retrait du bandeau « Aperçu des formateurs » + fiches longues en double. Une grille compacte + panneau `dialog` (focus piégé, Échap). |
| 2. Laure | Bloc héros « Référente pédagogique » au-dessus de la grille (hors carte standard). |
| 3. Filtres | Pills domaine, compteur `aria-live`, URL `?domaine=chantier` (clés : `ia-outils`, `appels-offres`, `chantier`, `management`, `administratif`, `securite`). |
| 4. Disponibilité | Badges « Disponible maintenant » / « Ouverture 2027 », tarifs NIV sur formations publiées, CTA alerte pour modules 2027. |
| 5. Confiance | Bandeau Qualiopi · note · IDF · BTP + logos clients (gris). Encart sélection formateurs (texte provisoire). |
| 6. CTA | Une action « Voir le profil » par carte ; libellés explicites dans le panneau ; footer avec téléphone, email, lien recrutement. |
| 7. Mobile / a11y | Grille responsive, barre sticky Appeler / Échanger, `scroll-margin-top` via `--site-header-height`, `prefers-reduced-motion` sur animations. |

## Ancres conservées

- `/formateurs#laure-olivie`, `#julien-morel`, `#thomas-garnier`, `#marc-delcourt`, `#nicolas-perrin`, `#claire-rousseau`, `#intervenante-assistance-travaux-btp`, `#formateur-coordination-sps`
- `#formateurs-profiles` (grille)

## Données structurées

- `ItemList` inchangé (URLs avec hash).
- `Person` ajouté par formateur visible (nom, `jobTitle`, description, image si photo).

## TODO éditorial / data

1. **`affichageHub`** (`actif` \| `a-confirmer`) sur chaque profil dans `lib/formateurs/confirmed-profiles.ts` et `lib/formateurs/catalogue-formateurs-profiles.ts` — défaut `actif` ; `a-confirmer` masque le profil en production.
2. **Encart « Comment nous choisissons nos formateurs »** — texte provisoire dans `FormateursSelectionEncart.tsx` (3 puces TODO).
3. **Lien recrutement** — pointe vers `/rejoindre-equipe` (existant).

## Fichiers clés

- `app/formateurs/page.tsx`
- `components/formateurs/FormateursCatalogueHub.tsx`
- `components/formateurs/FormateurDetailDialog.tsx`
- `components/formateurs/FormateurCompactCard.tsx`
- `components/formateurs/FormateursLaureHero.tsx`
- `lib/formateurs/hub-filtres.ts`, `hub-display.ts`, `get-formateurs.ts`

## Captures avant / après

Dossier de référence : `.playwright-check-formateurs/` (captures antérieures). Regénérer après déploiement local avec les viewports 375, 768 et 1440 px et mesurer la hauteur de document (objectif : forte réduction vs ~12 100 px).

## Vérifications effectuées (contenu)

- Note satisfaction : source `formatNoteSatisfactionSur5()` (4,45/5).
- Tarifs NIV : `120 € HT / participant` (NIV-01), `310 € HT / participant` (autres publiés) via `lib/tarifs-catalogue-participant.ts`.
- Financement : pas de « 100 % finançable » sur cette page.
- Laure : pas de « conductrice de travaux » ; 7 ans via `formatAnneesExperienceBTP()`.
- Coordonnées : `CONTACT` (`06 95 66 18 18`, `contact@laureolivie.fr`).
