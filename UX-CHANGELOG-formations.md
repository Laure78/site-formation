# UX — Refonte page `/formations` (laureolivie.fr)

Date : 24 octobre 2026  
Objectif : trouver la bonne formation en moins de 30 s, un seul catalogue, ordre de page logique, mobile-first.

## 1. Hero compact + recherche au premier écran

| Changement | Raison |
|------------|--------|
| Hero réduit : H1 + sous-titre (`CATALOGUE_HERO_SUBTITLE`), image masquée &lt; lg | Recherche visible sans scroll |
| Barre de recherche + filtres immédiatement sous le hero (`FormationsCatalogueSearchHeader`) | Audit : ~1 830 px avant recherche |
| Ligne réassurance : Qualiopi · IDF · note satisfaction (source `formatNoteSatisfactionSur5()`) · OPCO/Constructys | Réassurance au bon endroit |
| Pills : Débutant, Appels d’offres, Chantier, Administratif, Claude, Assistants | Raccourcis métier |

**Fichiers** : `FormationsCatalogue2027Hero.tsx`, `FormationsCatalogueSearchHeader.tsx`, `FormationsCatalogueReassuranceLine.tsx`, `FormationsCatalogueQuickPills.tsx`

## 2. Catalogue unifié

| Changement | Raison |
|------------|--------|
| Fusion formations IA + modules métier dans `FormationsCatalogueFilteredGrid` | Fin des 2 catalogues / 2 recherches |
| Segment `Formations IA` \| `Modules métier` \| `Tout` (URL `?vue=`) | Clarifier le choix |
| Filtres : niveau, thématique, métier, domaine, durée, disponibilité (URL) | Partage et retour arrière |
| Suppression du rendu liste `FormationsModulesCatalogue` | Doublon retiré |
| Ancre `#catalogue-modules` → `#catalogue-formations` (`CatalogModulesLegacyAnchor`) | Compatibilité liens existants |
| Pagination client « Voir plus » (12 par page) | Performance / longueur perçue |

**Fichiers** : `FormationsCatalogueFilteredGrid.tsx`, `CatalogueSearchFilters.tsx`, `lib/catalogue-filter-url.ts`, `FormationsModulesCatalogue.tsx`, `FormationsCatalogueModuleGridCard.tsx`

## 3. Questionnaire d’orientation remonté

| Changement | Raison |
|------------|--------|
| Bloc replié « Je ne sais pas quoi choisir → répondre à 3 questions » sous la recherche | Aide avant scroll long |
| À la fin : application des filtres URL (`orientationAnswersToCatalogueFilters`) + scroll catalogue | Lien questionnaire → liste |

**Fichiers** : `FormationsCatalogueOrientationCollapsible.tsx`, `lib/orientation-to-catalogue-filters.ts`, `FormationsOrientationWizard.tsx`  
**Retiré de la page** : `FormationsCatalogueChoixSection` (composant conservé).

## 4. Cartes plus scannables

| Changement | Raison |
|------------|--------|
| Ordre : badge · meta (durée · tarif · présentiel) · titre · description (2 lignes) · public · CTA | Tarif/durée remontés |
| Code module / ref NIV en petit gris | Moins de jargon en titre |
| Carte entière cliquable + `aria-label` explicite | Accessibilité |
| Badges en gris / bleu charte (plus d’accent emerald/indigo sur cartes IA) | Charte `#377CF3` / `#F2F2F2` |
| Mention « HT · prise en charge possible » | Financement près du prix |

**Fichiers** : `FormationsCatalogueGridCard.tsx`, `FormationsCatalogueModuleGridCard.tsx`

## 5. Ordre de page

Nouvel ordre : Hero → Recherche → Orientation → Catalogue → Bandeau parcours 2027 → Parcours → Intra → Financement → Devis → FAQ → Contact direct → Maillage.

**Fichier** : `app/formations/page.tsx`  
**Retiré** : `FormationsInfosPratiques2027` (FAQ extraite ; modalités dans encadré financement).

## 6. Encadré financement

| Changement | Raison |
|------------|--------|
| Encadré `#F2F2F2` « Qui paie ? » après section équipe | Visibilité OPCO / intra-inter |

**Fichier** : `FormationsCatalogueFinancementEncadre.tsx`

## 7. Formulaire de devis allégé

| Changement | Raison |
|------------|--------|
| Prop `steppedCatalogue` : étape 1 (nom, email, téléphone, entreprise) puis étape 2 (détails facultatifs) | Réduire friction milieu de page |
| Objet par défaut devis ; message par défaut si étape 2 | Validation serveur conservée |
| Champs anti-spam `website` et `formationHint` conservés | Sécurité |

**Fichiers** : `ContactForm.tsx`, `FormationsContact2027.tsx`

## 8. Navigation flottante

| Changement | Raison |
|------------|--------|
| Sommaire sticky desktop (`FormationsCataloguePageNav`) | Repères dans page longue |
| Barre mobile dédiée Appeler + Demander un devis ; `/formations` exclu du bandeau Calendly global | Éviter chevauchement avec retour haut |
| `scroll-mt` via `--site-header-height` | Ancres sous header compact |

**Fichiers** : `FormationsCataloguePageNav.tsx`, `FormationsCatalogueMobileBar.tsx`, `lib/sticky-mobile-calendly-path.ts`

## Redirections d’ancres

| Ancienne ancre | Nouvelle cible |
|----------------|----------------|
| `#catalogue-modules` | `#catalogue-formations` (replaceState + scroll) |
| `#quelle-formation-choisir` | Conservée (orientation repliée) |

## TODO / arbitrages

- [ ] **Captures avant/après** 375 / 768 / 1440 px + hauteur totale — à produire manuellement (audit initial ~23 800 px).
- [ ] **Doublons modules** : vérifier manuellement les liens `href` identiques dans `MODULES_CATALOGUE_2027` (non traité automatiquement).
- [ ] **Cartes complémentaires** (`FormationsCatalogueComplementaryCard`) : même compactage que les cartes IA (non refondues dans ce lot).
- [ ] **Questionnaire** : 4 questions en UI (existant) vs libellé marketing « 3 questions » — aligner copy ou réduire une étape.
- [ ] **Commits par chantier** : regrouper en commits séparés si push Git demandé.

## Vérifications tarifs / légal (non modifiés à la source)

- NIV-01 : 120 € HT/participant (4 h) — `lib/tarifs-catalogue-participant.ts`
- Autres sessions catalogue : 310 € HT/participant (7 h) — idem
- Note satisfaction : `formatNoteSatisfactionSur5()` / indicateurs Qualiopi
- OPCO : « Prise en charge OPCO/Constructys selon éligibilité »
- Contact : 06 95 66 18 18 · contact@laureolivie.fr
