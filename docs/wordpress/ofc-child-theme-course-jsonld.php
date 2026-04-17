<?php
/**
 * OFC — JSON-LD Course (schema.org) conditionnel pour laureolivie.fr
 *
 * À copier-coller à la fin du functions.php du thème enfant WordPress,
 * ou à charger avec : require_once get_stylesheet_directory() . '/ofc-child-theme-course-jsonld.php';
 *
 * Après déploiement : valider avec Google Rich Results Test
 * https://search.google.com/test/rich-results
 *
 * @package OFC_Child_Theme
 */

if (! defined('ABSPATH')) {
    exit;
}

/**
 * Pages concernées : slug commençant par "formation-" OU URI dans la liste autorisée.
 */
function ofc_should_output_course_jsonld_schema() {
    if (! is_singular('page')) {
        return false;
    }

    global $post;
    if (! $post instanceof WP_Post) {
        return false;
    }

    $slug = $post->post_name;
    if (strpos($slug, 'formation-') === 0) {
        return true;
    }

    $uri = trim(get_page_uri($post->ID), '/');

    $allowed_uris = [
        'formation-ia-btp',
        'formations/ia-btp-paris',
        'formation-ia-et-chatgpt',
        'formation-ia-pour-pme-du-btp',
        'ia-devis-batiment',
        'ia-conducteur-travaux',
    ];

    return in_array($uri, $allowed_uris, true);
}

/**
 * Meta description SEO (Rank Math, Yoast, puis repli).
 *
 * @param int $post_id ID de la page.
 */
function ofc_get_course_jsonld_description($post_id) {
    $desc = (string) get_post_meta($post_id, 'rank_math_description', true);
    if ($desc !== '') {
        return wp_strip_all_tags($desc);
    }

    $desc = (string) get_post_meta($post_id, '_yoast_wpseo_metadesc', true);
    if ($desc !== '') {
        return wp_strip_all_tags($desc);
    }

    $excerpt = get_post_field('post_excerpt', $post_id);
    if (is_string($excerpt) && $excerpt !== '') {
        return wp_strip_all_tags($excerpt);
    }

    return '';
}

/**
 * Nom du cours : équivalent sémantique au H1 (titre WordPress de la page).
 *
 * @param int $post_id ID de la page.
 */
function ofc_get_course_jsonld_name($post_id) {
    $title = get_the_title($post_id);

    return wp_strip_all_tags((string) $title);
}

/**
 * Affiche le script JSON-LD Course dans le <head> (priorité 6).
 */
function ofc_print_course_jsonld_schema() {
    if (is_feed() || is_404() || wp_is_json_request()) {
        return;
    }

    if (! ofc_should_output_course_jsonld_schema()) {
        return;
    }

    $post_id = (int) get_queried_object_id();
    if ($post_id <= 0) {
        return;
    }

    $name = ofc_get_course_jsonld_name($post_id);
    if ($name === '') {
        return;
    }

    $description = ofc_get_course_jsonld_description($post_id);
    if ($description === '') {
        $description = $name;
    }

    $name        = apply_filters('ofc_course_jsonld_name', $name, $post_id);
    $description = apply_filters('ofc_course_jsonld_description', $description, $post_id);

    $schema = [
        '@context'    => 'https://schema.org',
        '@type'       => 'Course',
        'name'        => $name,
        'description' => $description,
        'provider'    => [
            '@type'   => 'Organization',
            'name'    => "OFC Création d'Entreprise",
            'sameAs'  => 'https://www.laureolivie.fr',
        ],
        'hasCourseInstance' => [
            '@type'      => 'CourseInstance',
            'courseMode' => 'onsite',
            'inLanguage' => 'fr',
            'location'   => [
                '@type'   => 'Place',
                'name'    => 'Île-de-France',
                'address' => [
                    '@type'         => 'PostalAddress',
                    'addressRegion' => 'Île-de-France',
                    'addressCountry'=> 'FR',
                ],
            ],
        ],
        'educationalCredentialAwarded' => 'Attestation de formation Qualiopi',
        'offers'                       => [
            '@type'        => 'Offer',
            'category'     => 'Formation professionnelle BTP',
            'availability' => 'https://schema.org/InStock',
        ],
    ];

    $schema = apply_filters('ofc_course_jsonld_schema', $schema, $post_id);

    $json = wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        return;
    }

    echo '<script type="application/ld+json">' . $json . '</script>' . "\n";
}

add_action('wp_head', 'ofc_print_course_jsonld_schema', 6);
