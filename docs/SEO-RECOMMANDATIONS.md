# SEO — Synthèse des optimisations

## ✅ Déjà en place

- **Meta tags** : title template, description, keywords, canonicals
- **Open Graph** : images absolues 1200×630, locale fr_FR, type article sur le blog
- **Twitter Cards** : summary_large_image, images
- **Schémas JSON-LD** : Organization, LocalBusiness, Person, Course, Article, FAQPage, BreadcrumbList, WebSite, HowTo
- **Person schema** : image, jobTitle, knowsAbout (EEAT)
- **Organization** : logo, image, adresse complète
- **Article (blog)** : image par défaut, publisher logo, breadcrumbs
- **robots.txt** : sitemap, disallow admin/auth/merci
- **Sitemap** : toutes les pages importantes, blog, formations
- **noindex** : pages merci-rdv, merci-devis (évite double contenu)
- **Geo meta** : geo.region FR-IDF, geo.placename Guyancourt

## 🔧 À faire manuellement

### Google Search Console
1. Créer une propriété pour `https://www.laureolivie.fr`
2. Vérifier le domaine (méthode DNS ou balise HTML)
3. Soumettre le sitemap : `https://www.laureolivie.fr/sitemap.xml`

### Bing Webmaster Tools
1. Ajouter le site
2. Soumettre le sitemap

### Google Business Profile
- Mettre à jour avec les mêmes infos NAP que le site (voir `docs/OPTIMISATION-GOOGLE-BUSINESS-PROFILE.md`)

### Image OG par défaut
- Vérifier que `/images/laure-olivie-formatrice.png` existe et fait **1200×630 px** pour un rendu optimal sur les réseaux sociaux

## 📈 Contenu et liens

- **H1 unique** par page, avec mots-clés
- **Liens internes** : formations → contact, blog → formations, etc.
- **Descriptions** : 150–160 caractères, uniques, avec intent
- **FAQ** : sur les pages clés pour rich results (déjà en place)
