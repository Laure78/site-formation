# UX — Refonte page d’accueil (laureolivie.fr)

Date : 24 octobre 2026  
Objectif : clarifier le parcours mobile, réduire le header sticky, unifier le choix formation/parcours, remonter la preuve sociale et le financement.

## 1. Header compact

| Changement | Raison |
|------------|--------|
| Bandeau promo **hors** du bloc sticky, refermable (croix + `localStorage` avec try/catch) | Libérer ~90 px en scroll ; respect audit 964 px |
| Barre utilitaire masquée &lt; 1024 px (reste dans le drawer mobile) | Réduire la hauteur sticky |
| Suppression de la ligne pleine largeur « Échanger sur mon besoin » sous le logo mobile | CTA déplacé en barre basse |
| Header **rétracté** au scroll bas, **réaffiché** au scroll haut | Plus de surface contenu |
| Mesure dynamique → `--site-header-height` et `--header-h` | Corriger ancres vs header réel |
| Fallback CSS 4,5 rem (72 px) | Éviter `scroll-margin-top: 80px` incohérent |

**Fichiers** : `components/Header.tsx`, `components/PromoOffreFormations2027Banner.tsx`, `hooks/useSiteHeaderBehavior.ts`, `app/globals.css`

## 2. Hero clarifié

| Changement | Raison |
|------------|--------|
| CTA primaire : visio 30 min (`PRENDRE_RDV_DUREE_MINUTES`) | Alignement objectif business |
| CTA secondaire : `#accueil-offre-choix` | Accès direct formations |
| Intra-entreprise en lien texte discret | Moins de concurrence visuelle |
| Ligne réassurance (Qualiopi, IDF, OPCO/Constructys, note satisfaction via `formatNoteSatisfactionSur5()`) | Réponse aux objections immédiates |
| `id="accueil-hero"` pour la barre CTA mobile | Déclenchement après le hero |

**Fichiers** : `components/landing/AccueilHeroSection.tsx`, `components/landing/accueil/AccueilHeroReassurance.tsx`

## 3. Un seul parcours de choix

| Changement | Raison |
|------------|--------|
| Fusion « niveau » + « parcours métier » → onglets `Par niveau` \| `Par métier` | Réduire la paralysie du choix |
| Tarifs « À partir de … » via `getAccueilFormationTarifApartir()` (catalogue) | Visibilité prix / financement |
| CTA formations et parcours avec `aria-label` explicites | Accessibilité |

**Fichiers** : `components/landing/accueil/AccueilFormationsParcoursSection.tsx`, `AccueilFormationsParcoursTabs.tsx`, `lib/accueil-config.ts`, `components/ui/TrainingCard.tsx`  
**Retiré de la page** : `AccueilFormationsDisponiblesSection`, `AccueilParcoursMetiersSection` (composants conservés pour réutilisation).

## 4. Preuve sociale remontée

| Changement | Raison |
|------------|--------|
| Bandeau logos défilant horizontalement sur mobile | Scannable entre deux chantiers |
| Qualiopi condensé : une ligne + « Voir le certificat » | Moins de densité texte |
| Indicateurs (note, Qualiopi, IDF) en ligne courte | Reprendre les valeurs existantes |

**TODO** : 2–3 avis clients sur l’accueil — `data/googleReviews.ts` est vide ; renseigner des citations **réelles** (voir commentaires TODO dans `AccueilPreuvesConfianceSection.tsx`).

**Fichiers** : `components/landing/accueil/AccueilPreuvesConfianceSection.tsx`

## 5. Section financement courte

| Changement | Raison |
|------------|--------|
| Encadré `#F2F2F2` « Combien ça coûte et qui paie ? » avant les formateurs | 1re question dirigeant BTP |
| Formulation OPCO/Constructys selon éligibilité (sans garantie) | Conformité `.cursorrules` |

**Fichiers** : `components/landing/accueil/AccueilFinancementCourtSection.tsx`, `app/page.tsx`

## 6. Exemples en formation

| Changement | Raison |
|------------|--------|
| Cartes Avant / Avec l’IA, Poppins, icône métier | Fin du bloc monospace peu scannable |
| CTA nommé « Voir la formation — … » | Liens explicites |

**Fichiers** : `components/landing/accueil/AccueilCasExercicesSection.tsx`

## 7. Navigation dans la page

| Changement | Raison |
|------------|--------|
| Sommaire sticky pills (desktop) + `IntersectionObserver` | Repères sans scroll infini |
| Ressources regroupées + méthode en `<details>` | Alléger la page |

**Fichiers** : `components/landing/accueil/AccueilPageNav.tsx`, `AccueilRessourcesEvenementSection.tsx`

## 8. FAQ et fin de page

| Changement | Raison |
|------------|--------|
| FAQ : toutes fermées par défaut | Moins de bruit |
| CTA final : téléphone + email (`CONTACT`) | Contact direct |
| Retour haut : après 2× viewport, au-dessus barre mobile 56 px | Éviter chevauchement FAQ |

**Fichiers** : `components/landing/HomeFaqDetailsList.tsx`, `AccueilCtaFinalSection.tsx`, `ScrollToTopButton.tsx`, `StickyMobileCalendlyCta.tsx`

## 9. Accessibilité & performance

| Changement | Raison |
|------------|--------|
| Cibles ≥ 44 px (CTA, onglets, barre mobile) | WCAG touch |
| `prefers-reduced-motion` sur transitions header / barres | Motion safe |
| Pas de modification des chiffres Qualiopi / tarifs catalogue | Source unique respectée |

**Non fait dans cette passe** : audit Lighthouse chiffré (à lancer en preview prod).

## Vérifications éditoriales

- Téléphone : **06 95 66 18 18** (`CONTACT.phoneDisplay`)
- Email : **contact@laureolivie.fr**
- Satisfaction : **`formatNoteSatisfactionSur5()`** / `PREUVES` (inchangé)
- OPCO : « prise en charge OPCO/Constructys selon éligibilité » — pas de « 100 % finançable »

## Captures avant / après

| Viewport | Fichier (après refonte) |
|----------|-------------------------|
| 375 px | `docs/ux-accueil/after-375.png` (à générer en local) |
| 768 px | `docs/ux-accueil/after-768.png` |
| 1440 px | `docs/ux-accueil/after-1440.png` |

Les captures **avant** correspondent au commit parent (header 271 px, sections formations/parcours séparées).
