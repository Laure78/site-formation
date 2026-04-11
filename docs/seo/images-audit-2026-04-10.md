# Audit images — alt, title, SEO BTP & WCAG (10 avril 2026)

## Synthèse par zone

| Page / zone | Nb images (approx.) | Alt vides (décoratif OK) | Alt manquants | Alt > 125 car. | Alt optimisés |
|-------------|---------------------|---------------------------|---------------|----------------|---------------|
| Accueil `/` | 4+ (hero, référence, marquee ×2, etc.) | Marquee clone B | 0 | 0 (textes raccourcis) | Oui |
| `/formations` | Cartes (rotation 3 visuels) | 0 | 0 | Vérifié via `lib/photos.ts` | Oui |
| Blog article | 3 illustrations + auteur | 0 | 0 | Tronquage `truncate125` | Oui |
| `/a-propos` | Partenaires + portrait + bannière FFB | 0 | 0 | 0 | Oui |
| Header / Footer | Portrait header + logo SVG | 0 | 0 | 0 | Oui |
| Avis Google (marquee) | Avatars dupliqués | Clone B | 0 | — | Oui |

## Corrections effectuées (extraits)

| Fichier | Image / composant | Ancien → nouveau (résumé) |
|---------|-------------------|----------------------------|
| `lib/photos.ts` | Hero accueil | Texte long → professionnels BTP, échange formation IA, devis/chantier/organisation (≤125 car.) |
| `lib/photos.ts` | Référence partenaires Laure | Texte long → Laure Olivié, IA BTP Qualiopi, OFC, Guyancourt 78 |
| `lib/photos.ts` | Ouvrier plan, architecte, ouvrier confiant, formation entreprise | Alignement libellés SEO BTP demandés |
| `lib/photos.ts` | `linkedinGraz` | Fichier → `laure-olivie-linkedin-graz.png` ; alt auteure articles |
| `lib/photos.ts` | `portraitPro2026` | Session formation IA BTP, Qualiopi, OFC, Guyancourt 78 |
| `lib/client-logos.ts` | Tous les logos marquee | Format « Logo … — partenaire formation IA BTP … » |
| `components/landing/ClientsLogosMarquee.tsx` | Rangée clone carrousel | `alt=""` sur les répétitions |
| `components/landing/GoogleReviewsMarquee.tsx` | Rangée clone avis | `alt=""` sur photos profil dupliquées |
| `components/Header.tsx` | Portrait header | Alt + `title` enrichis |
| `components/Footer.tsx` | `logo-lo.svg` | Alt + `title` (aligné marque / accueil) |
| `components/landing/FFBIAAccrocheSection.tsx` | FFB, CSFE | Alts logos + `title` complémentaires |
| `components/landing/ProfilePhoto.tsx` | Portrait pro | Props `alt`, `title`, `priority` (LCP maîtrisé) |
| `app/page.tsx` | Hero + bloc référence | `title` sur `Image` ; `ProfilePhoto` accueil ; script `ImageObject` |
| `app/a-propos/page.tsx` | Partenaires, bannière FFB | Alts logos descriptifs ; script `ImageObject` portrait |
| `components/blog/ArticleAuthor.tsx` / `AuthorBlock.tsx` | Photo auteure | `PHOTOS.linkedinGraz` + `title` LinkedIn |
| `lib/blog-article-illustrations.ts` | Illustrations articles | Alts dynamiques : titre + métier catégorie + « Laure Olivié » |
| `lib/schema-image-objects.ts` | JSON-LD | Nouveau — hero + portrait header (home) ; portrait pro (à propos) |

## Fichiers image — renommage recommandé (non appliqué)

Conserver les fichiers tels quels jusqu’à migration coordonnée (références + cache CDN).

| Ancien nom | Nouveau nom suggéré | Contexte |
|------------|---------------------|----------|
| `laure-olivie.png` | `laure-olivie-formatrice-ia-btp-2026.png` | Nom générique |
| `laure-linkedin-graz.png` | *(doublon de `laure-olivie-linkedin-graz.png`)* | Déprécier une fois références unifiées |
| `blog/.../slide-01.png` etc. | `guide-claude-btp-2026-slide-01.png` | Préfixer le dossier parent dans le nom si export statique |
| `partenaires/ifrb-78.jpg` | `logo-ifrb-77-institut-formation-batiment.jpg` | Cohérence libellé IFRB 77 vs fichier 78 |

## Priorités restantes

1. **`<img>` hors Next/Image** : `Footer` logo (`<img>` volontaire pour SVG) ; pages espace apprenant / cours — envisager `next/image` ou `unoptimized` selon sources dynamiques.
2. **Carrousels blog** (`/public/images/blog/carrousel-*`) : vérifier alts si utilisés dans contenus MDX/HTML.
3. **Keyword stuffing** : surveiller les métadonnées Open Graph lors de l’ajout d’articles (alts déjà plafonnés à 125 car. côté illustrations).

## Schéma ImageObject

- **Accueil** : `buildHomePageImageObjectsJsonLd()` — hero + portrait header.
- **À propos** : `buildAProposImageObjectJsonLd()` — portrait pro (`laure-portrait-pro-2026.png`).

## Liens internes vers la vérité terrain

- Photos centralisées : `lib/photos.ts`
- Logos banderole : `lib/client-logos.ts`
- JSON-LD images : `lib/schema-image-objects.ts`
