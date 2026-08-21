# Projet WordPress — laureolivie.fr

# OFC Création d'Entreprise — Formation IA BTP

# Laure Olivié, formatrice IA & ChatGPT spécialisée BTP

> **Usage Cursor :** placer ce fichier à la racine du dépôt WordPress ouvert dans Cursor pour que chaque prompt hérite du contexte OFC (charte, SEO, financement, clients) sans tout réexpliquer.

---

## Contexte business

- Site vitrine + blog pour vendre des formations IA BTP
- Objectif UNIQUE : transformer le trafic organique en RDV visio Calendly
- Audience : dirigeants PME BTP, conducteurs de travaux, chargés d'affaires, fonctions support bâtiment
- NE PAS cibler : artisans (terme non utilisé), GERESO, tarif journalier
- 1 500+ professionnels formés · note 4,85/5 · Qualiopi · Constructys

## Clients de référence (à mentionner naturellement)

FFB Grand Paris · FFB Île-de-France · CSFE · CNAM Entreprise · Lefebvre Dalloz

## CTA de conversion (UNIQUE)

- Texte : « Réservez votre visio découverte gratuite »
- Action : lien Calendly de Laure Olivié
- Présent sur chaque page : en haut, au milieu, en bas
- Ne jamais mettre d'autre CTA ou lien concurrent

## Charte graphique OFC

- Bleu principal : `#377CF3`
- Blanc : `#FFFFFF`
- Gris fond : `#F2F2F2`
- Typo : Poppins (fallback Century Gothic, Georgia)
- Logo OFC en haut à gauche
- Bouton CTA : fond `#377CF3`, texte blanc, border-radius 8px

## Mentions légales (à inclure dans le footer)

OFC Création d'Entreprise · SIRET 905 244 281 00010 · NDA 11788515078  
6 rue Henri Dunant · 78280 Guyancourt · laureolivie@yahoo.fr · 06 95 66 18 18

## Conventions SEO (OBLIGATOIRES)

- H1 unique par page contenant le mot-clé principal
- Structure hiérarchique H1 > H2 > H3 (jamais de H2 avant H1)
- Title tag : `[Mot-clé] [Géo] — [Auteure ou marque]` (max 60 car.)
- Meta description : `[Bénéfice concret + chiffre]. [CTA court].` (max 155 car.)
- Alt text sur toutes les images (descriptif + mot-clé quand naturel)
- Minimum 3 liens internes par page
- Mentionner « Île-de-France » ou une ville IDF sur chaque page formation
- CTA Calendly dans le corps de la page (pas seulement sidebar ou footer)

## Mots-clés prioritaires à cibler

- **P1 (défendre) :** formation IA BTP · formation ChatGPT BTP · ChatGPT devis bâtiment
- **P2 (conquérir) :** IA artisans BTP · ChatGPT conducteur de travaux · formation IA IDF
- **P3 (longue traîne) :** ChatGPT [métier] BTP · prompts ChatGPT bâtiment · Constructys formation IA

## Schema markup (OBLIGATOIRE sur chaque page)

- **Organization** : toutes les pages (OFC Création d'Entreprise)
- **Person** : pages formation + articles (Laure Olivié)
- **Course** : pages formation
- **FAQPage** : articles de blog + pages avec FAQ
- **LocalBusiness** : page d'accueil
- **BreadcrumbList** : toutes les pages sauf homepage

Format : JSON-LD dans `<script type="application/ld+json">`

## GEO (Generative Engine Optimization)

- Fichier `llms.txt` à la racine du site (déjà créé côté Next.js / à reproduire sur WordPress si besoin)
- `robots.txt` autorise GPTBot, Claude-Web, PerplexityBot, Google-Extended
- Chaque FAQ commence par une réponse directe courte (Featured Snippet + IA)
- Bio auteure structurée en bas de chaque article
- Open Graph tags complets sur toutes les pages

## Conventions WordPress

- Ne jamais modifier les fichiers du thème directement → utiliser child theme
- CSS custom : `style.css` du child theme
- PHP custom : `functions.php` du child theme
- Hooks standards : `wp_head`, `wp_footer`, `the_content`, `get_template_part`
- Pas de jQuery si possible — JavaScript vanilla ou React (selon thème)

## Structure des URLs (SEO-friendly)

- Pages formation : `/formation-ia-[metier]-btp/`
- Articles blog : `/blog/[mot-cle-principal]/`
- Pages géo : `/formation-ia-btp-[ville]/`
- Pas de dates dans les URLs
- Tirets uniquement (pas d'underscores)

## Financement (à mentionner sur toutes les pages formation)

- Organisme : Constructys (OPCO du BTP)
- Plafond pédagogique : 24 € HT/heure/participant
- Éligible : entreprises de moins de 50 salariés
- Dispositif : Plan de Développement des Compétences (PDC) + FNE-Formation
- Délai : dossier à soumettre 15 jours avant la formation
- TVA exonérée (article 261-4-4° du CGI pour formations intra)

## Langue

- 100 % français uniquement
- Vocabulaire BTP terrain : chantier, DPGF, lot, DCE, CCTP, AO, maître d'ouvrage, PPSPS
- Jamais de jargon tech abstrait — toujours en termes de résultats métier concrets
