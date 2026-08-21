# Template — page métier « Formation IA pour les pros du BTP » (WordPress + Elementor OFC)

Ce gabarit s’applique aux landings **par métier** (`/formation-ia-[metier]-btp/` ou exception `/formation-ia-conducteur-travaux/`).  
Longueur cible : **1 500 à 2 000 mots** de corps de page (hors menus, hors footer légal).

**Fichiers prêts à l’emploi (repo) :** répertoire `contenu/metiers/` — une page par fichier Markdown (électricien, plombier, maçon, couvreur, étancheur, peintre, conducteur de travaux, chargé d’affaires). Complétez avec vos **photos**, **témoignages clients réels** et **prompts internes** pour atteindre le plafond des 2 000 mots si besoin.

---

## Réglages WordPress

| Élément | Consigne |
|--------|----------|
| **Modèle** | Page large — full-width, sans sidebar |
| **H1** | Unique — intègre le métier + angle IA BTP + géo si pertinent (Île-de-France) |
| **Image à la une** | Photo métier / ambiance chantier — alt descriptif + « Laure Olivié » si portrait |
| **Rank Math — Title** | Mot-clé principal en tête · marque · Qualiopi ou géo si place |
| **Rank Math — Meta** | Bénéfice + preuve (chiffres) + financement + CTA court |
| **Schema FAQPage** | Activé sur le bloc FAQ (5 à 7 questions) |
| **Schema Course** | Via hook thème enfant `ofc_print_course_jsonld_schema` (pages dont le slug commence par `formation-`) |
| **Schema Person** | Bio Laure (option Rank Math ou bloc dédié) |

---

## Structure obligatoire (ordre Elementor)

### 1. Hero

- **H1** (voir fiche métier)
- Sous-texte : OFC · Qualiopi · Constructys · Île-de-France (une ligne)
- **Chiffres** (option) : ex. 1 500+ pros formés · 4,85/5 · Qualiopi
- **CTA Calendly #1** — bouton principal : « Réservez votre visio découverte gratuite »

### 2. Sommaire cliquable

Liens ancres vers : Problème · Solution · Méthode · Résultats · FAQ · Laure · CTA final.

### 3. Section « Le problème » (H2)

- 3 à 5 paragraphes avec **vocabulaire terrain** (corps d’état, normes, documents réels).
- Douleur : temps administratif, AO, devis, SAV, coordination, erreurs si IA « brute ».

### 4. Section « La solution » (H2)

- Cas d’usage IA **spécifiques au métier** (liste à puces ou cartes).
- Rappel : l’IA ne remplace pas la conformité ni la signature pro.

### 5. Section « Méthode pas à pas » (H2)

- **3 à 5 étapes** numérotées.
- Chaque étape : titre + paragraphe court + **prompt type** (encadré monospace ou citation).
- Adapter les prompts au métier (électricité, étanchéité, gros œuvre, etc.).

### 6. CTA Calendly — milieu de page (H2 ou encadré)

- Fond **#377CF3**, texte blanc, bouton Calendly.
- **CTA Calendly #2**

### 7. Section « Résultats concrets » (H2)

- **Tableau** : Tâche | Avant | Après | Gain indicatif (3 à 6 lignes).
- 1 à 2 **témoignages** fictifs ou anonymisés (cohérents métier).

### 8. Section « FAQ » (H2)

- **5 à 7 questions** métier (pas génériques seules).
- Rank Math : marquer la section en **FAQPage**.

### 9. Section « Qui est Laure Olivié ? » (H2)

- 2 paragraphes + lien vers `/a-propos/`
- Photo + alt

### 10. CTA Calendly — fin de page

- Pleine largeur, fond bleu **#377CF3**, texte blanc.
- **CTA Calendly #3**
- Rappel email / téléphone OFC

---

## Maillage interne (minimum 3 liens par page)

Exemples de cibles :

- Autres pages métier : `/formation-ia-plombier-btp/`, `/formation-ia-macon-btp/`, etc.
- Pilier : `/formation-ia-btp/`
- Blog : `/blog/analyse-dce-notebooklm-claude-btp`, `/blog/5-cas-usage-chatgpt-artisans-btp`
- Cas d’usage : `/ia-devis-batiment`, `/formations/ia-appels-offre-btp`

---

## Checklist avant publication

- [ ] H1 unique et aligné sur la requête principale
- [ ] Titres H2/H3 hiérarchiques
- [ ] 3 CTA Calendly visibles (hero, milieu, fin)
- [ ] FAQ schema + Course schema OK (tests Rich Results)
- [ ] Alt images renseignés
- [ ] Liens internes fonctionnels
