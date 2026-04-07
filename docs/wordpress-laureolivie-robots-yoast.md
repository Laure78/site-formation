# laureolivie.fr — robots.txt (WordPress + Elementor)

À placer à la racine du site (`/robots.txt`) **ou** laisser Yoast / Rank Math le générer en collant le contenu dans **Réglages → Lecture** (selon l’hébergeur) / éditeur de fichier du thème enfant / FTP.

> **Important :** une seule URL canonique pour le domaine. Si le site est en **https://laureolivie.fr** (sans www), utilisez cette base partout dans le `Sitemap:` et les `Disallow` relatifs. Si vous êtes en **www**, remplacez par `https://www.laureolivie.fr`.

---

## Fichier `robots.txt` proposé

```
# laureolivie.fr — WordPress + Elementor
# Dernière révision : avril 2026

User-agent: *
Allow: /

# Back-office (autoriser admin-ajax pour le front)
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php

# WordPress — flux / API sensibles au crawl inutile (optionnel, à ajuster si besoin réel)
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /xmlrpc.php

# Templately — bloquer le crawl des URLs avec paramètre (noindex : voir section dédiée ci-dessous)
Disallow: /*?templately_library=*

# Hello world (slug court + permalien daté) + catégorie Non classé
Disallow: /hello-world/
Disallow: /2024/08/06/hello-world/
Disallow: /category/uncategorized/

# Elementor — bibliothèque + prévisualisations (compléter par noindex CPT, voir ci-dessous)
Disallow: /elementor_library/
Disallow: /*?post_type=elementor_library*
Disallow: /*?elementor-preview=*
Disallow: /*?preview_id=*
Disallow: /*?preview=*
Disallow: /*?ver=*

# Crawlers IA (optionnel — autoriser ou restreindre selon votre politique)
# User-agent: GPTBot
# Disallow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

# Sitemap — Yoast : souvent sitemap_index.xml | WordPress natif : wp-sitemap.xml
Sitemap: https://laureolivie.fr/sitemap_index.xml
Sitemap: https://laureolivie.fr/wp-sitemap.xml
```

### Notes techniques

1. **Ne pas dupliquer** deux `Sitemap:` si un seul plugin gère les sitemaps : gardez **soit** la ligne Yoast (`sitemap_index.xml`) **soit** la ligne WordPress natif (`wp-sitemap.xml`). Si Yoast est actif, désactivez les sitemaps natifs WP pour éviter les doublons (voir ci-dessous).
2. **`Disallow: /wp-content/plugins/`** : certains sites préfèrent **ne pas** bloquer les assets (CSS/JS) servis depuis `plugins` pour le rendu ; si le rapport Google Search Console signale des ressources bloquées, retirez cette ligne ou affinez-la.
3. **`/?templately_library=*`** : le `Disallow` dans `robots.txt` **réduit le crawl** mais **n’envoie pas** un signal `noindex` HTTP. Pour un **noindex explicite** sur les URLs contenant ce paramètre, utiliser une des options ci-dessous (idéalement en complément du `Disallow`).

---

## Templately — noindex pour `?templately_library=*`

Le fichier `robots.txt` ci-dessus contient déjà `Disallow: /*?templately_library=*`. Pour aligner avec une **directive noindex** :

1. **Apache (.htaccess)** — en-tête `X-Robots-Tag` si la requête contient le paramètre (à tester sur préproduction ; certains hébergeurs désactivent `Header` sans `mod_headers`) :

```apache
<IfModule mod_rewrite.c>
  RewriteCond %{QUERY_STRING} templately_library [NC]
  RewriteRule ^ - [E=NOINDEX_TEMPLATELY:1]
</IfModule>
<IfModule mod_headers.c>
  Header set X-Robots-Tag "noindex, nofollow" env=NOINDEX_TEMPLATELY
</IfModule>
```

2. **WordPress (thème enfant)** — filtre `wp_headers` ou sortie dans `functions.php` pour ajouter le même en-tête lorsque `isset($_GET['templately_library'])` (faire valider par un dev si vous n’êtes pas à l’aise avec le PHP).

3. **Google Search Console** : si des URLs avec `?templately_library=` sont **déjà indexées**, utiliser **Suppression** (temporaire) puis laisser le `Disallow` + noindex faire le travail, ou **suppression par préfixe d’URL** selon les cas.

4. **Ne pas** indexer ces URLs dans le sitemap (Yoast / Rank Math : vérifier qu’aucun modèle Templately n’y injecte des liens avec ce paramètre).

---

## Actions immédiates (impact Google)

1. **Déployer** le `robots.txt` ci-dessus à la racine de **laureolivie.fr** (FTP, fichier thème enfant, ou champ dédié Yoast/Rank Math / hébergeur).
2. **`/hello-world/`** et **`/2024/08/06/hello-world/`** (ou toute variante de permalien daté) : **301** vers la page d’accueil ou **corbeille** + **noindex** sur l’article ; ajouter une règle de redirection pour **chaque** URL encore accessible (WordPress peut exposer plusieurs formes selon les réglages de permaliens).
3. **`/category/uncategorized/`** : **noindex** sur cette archive (Yoast/Rank Math, catégorie *Non classé*) ; **ne pas** lister cette archive dans le sitemap ; idéalement **aucun** article dans *Non classé* (recatégoriser). Option : **301** vers `/blog` ou une catégorie utile si pertinent.
4. **Templates Elementor** : **noindex sur le type de contenu** `elementor_library` (voir sections Yoast / Rank Math ci-dessous). Le `Disallow` seul ne supprime pas les pages déjà indexées : demander **suppression d’URL** dans Search Console si besoin.
5. **Ancienne URL Elementor** `/elementor-2487/` : si cette page existe encore sur WordPress, créer une **redirection 301** vers **`https://www.laureolivie.fr/formation-ia-artisans-btp/`** (plugin *Redirection*, Rank Math ou règle `.htaccess`). Le site Next.js déploie la même logique côté app ; sur WP il faut la règle au niveau serveur pour ne pas servir deux contenus.

---

## Yoast SEO

### Sitemap XML

1. **SEO → Général → Fonctionnalités** : activer **Plans de site XML**.
2. Vérifier l’URL : `https://votredomaine.fr/sitemap_index.xml`.
3. **Réglages WordPress** : si Yoast gère le sitemap, désactiver les sitemaps WP natifs : **SEO → Général → Plans de site** → option du type « désactiver les sitemaps WordPress » (libellé selon version), ou filtre `wp_sitemaps_enabled` à `false` (développeur).

### Noindex `/hello-world/`

1. **Articles → Tous les articles** → ouvrir « Hello world ».
2. Dans la **métabox Yoast** (aperçu Google), régler **Autoriser les moteurs de recherche à afficher cet article dans les résultats ?** sur **Non**.
3. Ou : **SEO → Réglages de l’aperçu des résultats de recherche pour le contenu** (selon version) / onglet article → **noindex**.
4. **Supprimer ou rediriger** l’article vers la page d’accueil si ce n’est qu’un brouillon de démo (301 recommandé si des liens pointent encore vers lui).

### Noindex `/category/uncategorized/`

1. **Articles → Catégories** → **Non classé** (Uncategorized).
2. Lien « Modifier » → en bas / Yoast : **noindex** pour cette archive de catégorie.
3. Ou **SEO → Réglages de recherche → Taxonomies** → **Catégories** → **Afficher les catégories dans les résultats de recherche ?** : **Non** pour les archives vides ou inutiles (attention : cela peut affecter toutes les catégories selon l’option — préférer le noindex **par catégorie** pour `uncategorized` uniquement).

### Noindex les modèles Elementor (`elementor_library`)

1. **SEO → Apparence dans les résultats de recherche** (libellé selon version) → **Types de contenu** : repérer **Bibliothèque Elementor** / **Elementor Library** / entrée liée aux **templates**.
2. Régler **Afficher les [éléments] dans les résultats de recherche ?** sur **Non** (équivaut **noindex** sur les URLs de templates).
3. Si l’entrée n’apparaît pas : **Fonctions SEO** → types de contenu personnalisés, ou extension **Yoast SEO** mise à jour ; en secours, **noindex** sur chaque template listé dans **Elementor → Modèles** (métabox Yoast par article).
4. Vérifier que ces URLs **ne figurent pas** dans le sitemap Yoast (exclure le CPT `elementor_library` du plan de site si option disponible).

### Redirection www ↔ non-www

1. **Réglages → Général** : **Adresse web WordPress** et **Adresse du site** doivent être **identiques** (toutes deux avec ou toutes deux sans `www`).
2. **Yoast SEO → Général → Aperçu du site** (ou **Réglages du site**) : vérifier l’URL canonique.
3. La redirection HTTP(S) **www → non-www** (ou l’inverse) se fait en priorité :
   - **niveau hébergeur / Cloudflare** (règle de redirection 301), ou
   - **`.htaccess`** (O2switch / Apache), ou
   - plugin **Redirection** / **Really Simple SSL** si applicable.

Exemple **`.htaccess`** (non-www canonique) :

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.laureolivie\.fr [NC]
RewriteRule ^(.*)$ https://laureolivie.fr/$1 [L,R=301]
```

(Inversez si le canonique est **www**.)

---

## Rank Math SEO

### Sitemap

1. **Rank Math → Tableau de bord (ou Modules)** : module **Sitemap** activé.
2. **Rank Math → Sitemap Settings** : vérifier l’URL du sitemap (souvent `/sitemap_index.xml` ou URL indiquée dans l’interface).
3. Dans `robots.txt`, ne mettre qu’**une** ligne `Sitemap:` correspondant au sitemap réellement servi par Rank Math.

### Noindex `hello-world` et `uncategorized`

1. **Articles** → éditer **Hello world** → **Rank Math** dans l’éditeur → **Meta** → **Robots Meta** : cocher **noindex** (ou « Index » sur Non).
2. **Articles → Catégories** → **Non classé** → même chose au niveau taxonomie (noindex sur l’archive), selon les options Rank Math **Taxonomies → Categories**.

### Noindex les modèles Elementor (CPT `elementor_library`)

1. **Rank Math → Titles & Meta → Post Types** (ou **Types de publication**) : repérer **Elementor Library** / **Bibliothèque Elementor**.
2. **Robots Meta** : **noindex** (et **nofollow** si vous ne voulez pas suivre les liens internes depuis ces pages).
3. **Rank Math → Sitemap Settings** : exclure le type **elementor_library** du sitemap si l’option existe.
4. En complément : plugin **Redirection** ou module redirections de Rank Math pour des **301** au cas par cas si des URLs de templates restent indexées.

### Redirection www

Même logique que Yoast : **Réglages → Général** cohérent + **301** côté serveur ou plugin **Redirection**.

---

## Rappel

- Le **robots.txt** ne remplace pas le **noindex** : pour les pages que vous ne voulez pas indexer, utilisez **noindex** + idéalement **non listées** dans le sitemap.
- **Elementor** : les pages en mode brouillon / preview ne doivent pas être indexées ; le noindex sur les brouillons et les `Disallow` sur les paramètres de preview réduisent le bruit.
