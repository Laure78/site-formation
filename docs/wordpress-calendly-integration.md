# WordPress — Calendly (plugin, shortcode, GA4)

Ce dépôt **Next.js** intègre Calendly dans `app/layout.tsx`. Si vous maintenez un site **WordPress** en parallèle (ou une migration), voici l’équivalent des consignes.

## 1. Plugin « Calendly for WordPress » (gratuit)

1. Extensions → Ajouter → rechercher **Calendly**.
2. Installer et activer **Calendly for WordPress**.
3. Réglages Calendly : coller l’URL de réservation de Laure (ex. `https://calendly.com/.../...`).

## 2. Shortcode réutilisable `[calendly-inline]`

Dans le thème enfant ou un petit plugin MU, enregistrer un shortcode :

```php
add_shortcode('calendly-inline', function () {
  $url = esc_url(get_option('calendly_default_url', '')); // ou URL fixe
  if ($url === '') {
    return '<p>Calendly : configurez l’URL dans les réglages.</p>';
  }
  ob_start();
  ?>
  <div
    class="calendly-inline-widget"
    data-url="<?php echo esc_attr($url); ?>"
    style="min-width:320px;height:680px;width:100%;"
  ></div>
  <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
  <?php
  return ob_get_clean();
});
```

Insérer le shortcode dans une section dédiée des pages formation (éditeur bloc : shortcode).

## 3. Bouton flottant et popup

- **Calendly** propose un **badge / bouton popup** dans le compte Calendly (Intégrations → Ajouter à votre site).
- Pour un bouton personnalisé (#377CF3, texte « Visio découverte gratuite »), utiliser le widget popup Calendly + CSS du thème enfant.

## 4. Intention de sortie (OptinMonster / Popup Maker)

- Créer une campagne **exit intent** (desktop).
- Déclencheurs : délai **30 s** et/ou **exit intent** (curseur vers le haut).
- Contenu aligné sur le site Next.js :
  - Titre : « Avant de partir… »
  - Texte : « Prenez 30 min avec Laure pour voir comment l'IA peut faire gagner 5h/semaine à votre équipe BTP. »
  - Bouton : lien Calendly.

## 5. Tracking GA4 (`click_calendly`)

Dans **`functions.php` du thème enfant** :

```php
add_action('wp_footer', function () {
  ?>
  <script>
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-calendly]') ||
        e.target.closest('.calendly-inline-widget')) {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click_calendly', {
          event_category: 'conversion',
          event_label: window.location.pathname,
          value: 1
        });
      }
    }
  });
  </script>
  <?php
});
```

Ajouter `data-calendly` sur les liens Calendly générés manuellement.

## Variable d’environnement Next.js (GA4)

Sur le site Next.js, définir `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` pour activer GA4 (`components/analytics/GoogleAnalytics.tsx`).
