<?php
/**
 * OFC — Indexation : URLs orphelines, paramètres Templately, compte client (laureolivie.fr)
 *
 * À inclure depuis le functions.php du thème enfant :
 *   require_once get_stylesheet_directory() . '/ofc-child-theme-indexation-seo.php';
 *
 * -----------------------------------------------------------------------------
 * CHECKLIST MANUELLE (ne s’automatise pas dans ce fichier)
 * -----------------------------------------------------------------------------
 *
 * [ ] 1. Page /elementor-2487/ (WordPress Admin → Pages)
 *     - Confirmer statut (publiée / brouillon / modèle).
 *     - Si vous préférez le noindex à la place de la 301 : commentez le bloc
 *       OFC_REDIRECT_ELEMENTOR_2487 ci-dessous et décommentez OFC_NOINDEX_ELEMENTOR_2487.
 *     - Rank Math (page) : onglet « Avancé » → « Robots meta » → Non indexée (en complément).
 *
 * [ ] 3. Google Search Console — URLs obsolètes déjà indexées
 *     - Indexation → Suppressions → Nouvelle demande de suppression
 *     - Type « Supprimer temporairement l’URL » pour les URLs concernées
 *       (ex. /elementor-2487/, URLs avec ?templately_library=).
 *     - La suppression est temporaire ; la 301 + nettoyage des paramètres
 *       doivent faire converger l’index vers les bonnes URL.
 *
 * [ ] 4. /mon-compte/ en noindex (Rank Math)
 *     - Titres et métas → Types de contenu → Pages : règle d’exclusion si proposée,
 *       ou page par page : page « Mon compte » → Avancé → Non indexée.
 *     - Le code ci-dessous renforce côté HTTP (X-Robots-Tag + wp_robots).
 *
 * -----------------------------------------------------------------------------
 * Après déploiement : revérifier une URL dans l’inspecteur réseau (en-tête
 * X-Robots-Tag) et Rich Results / URL Inspection dans la GSC.
 *
 * @package OFC_Child_Theme
 */

if (! defined('ABSPATH')) {
    exit;
}

/**
 * Templately : supprime le paramètre ?templately_library= par redirection 301
 * vers l’URL canonique sans query string (évite les doublons d’indexation).
 */
add_action(
    'template_redirect',
    static function () {
        if (! isset($_GET['templately_library'])) {
            return;
        }

        $request_uri = isset($_SERVER['REQUEST_URI']) ? (string) $_SERVER['REQUEST_URI'] : '';
        $clean_path  = strtok($request_uri, '?');
        if ($clean_path === false) {
            $clean_path = '/';
        }

        wp_safe_redirect(home_url($clean_path), 301);
        exit;
    },
    10
);

/**
 * Landing conducteur de travaux : ancienne URL /ia-conducteur-travaux/ → canonique
 * /formation-ia-conducteur-travaux/ (aligné Next.js next.config.ts).
 */
add_action(
    'template_redirect',
    static function () {
        if (! is_page('ia-conducteur-travaux')) {
            return;
        }

        wp_safe_redirect(home_url('/formation-ia-conducteur-travaux/'), 301);
        exit;
    },
    4
);

/**
 * Ancienne URL Elementor /elementor-2487/ → canonique alignée sur le site Next.js
 * (voir next.config.ts : destination /formation-ia-artisans-btp).
 *
 * Désactiver ce bloc si la page sert encore de modèle et que vous choisissez
 * uniquement le noindex (voir constante OFC_NOINDEX_ELEMENTOR_2487).
 */
if (! defined('OFC_REDIRECT_ELEMENTOR_2487')) {
    define('OFC_REDIRECT_ELEMENTOR_2487', true);
}

if (OFC_REDIRECT_ELEMENTOR_2487) {
    add_action(
        'template_redirect',
        static function () {
            if (! is_page('elementor-2487') && ! is_page(2487)) {
                return;
            }

            wp_safe_redirect(home_url('/formation-ia-artisans-btp/'), 301);
            exit;
        },
        5
    );
}

/**
 * Variante noindex si la page 2487 est un template à conserver (sans 301).
 * Définir OFC_REDIRECT_ELEMENTOR_2487 à false et activer ce bloc si besoin.
 */
if (! defined('OFC_NOINDEX_ELEMENTOR_2487')) {
    define('OFC_NOINDEX_ELEMENTOR_2487', false);
}

if (OFC_NOINDEX_ELEMENTOR_2487 && ! OFC_REDIRECT_ELEMENTOR_2487) {
    add_action(
        'template_redirect',
        static function () {
            if (! is_page('elementor-2487') && ! is_page(2487)) {
                return;
            }
            header('X-Robots-Tag: noindex, nofollow', true);
        },
        1
    );
}

/**
 * Espace compte : noindex (complète Rank Math — Titres et métas → Pages).
 */
add_action(
    'template_redirect',
    static function () {
        if (! is_page('mon-compte')) {
            return;
        }
        header('X-Robots-Tag: noindex, nofollow', true);
    },
    1
);

add_filter(
    'wp_robots',
    static function (array $robots) {
        if (is_page('mon-compte')) {
            $robots['noindex']  = true;
            $robots['nofollow'] = true;
        }

        return $robots;
    },
    20
);
