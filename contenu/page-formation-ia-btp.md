# Page WordPress — `/formation-ia-btp/` (slug : `formation-ia-btp`)

Source de vérité pour la création de la page dans **WordPress + Elementor** (thème OFC).  
Domaine canonique : `https://www.laureolivie.fr/formation-ia-btp/`

---

## Réglages WordPress (avant Elementor)

| Élément | Valeur |
|--------|--------|
| **Titre de page (admin)** | Formation IA pour le BTP — ChatGPT pour le Bâtiment en Île-de-France *(peut être raccourci en admin ; le **H1** Elementor prime pour l’affichage)* |
| **Slug** | `formation-ia-btp` |
| **Modèle** | Page large — full-width, **sans sidebar** |
| **Image à la une** | Photo d’ambiance formation BTP |
| **Alt image à la une** | `Formation IA pour les pros du BTP en Île-de-France par Laure Olivié` |

### Rank Math (ou équivalent)

- **Title SEO** : `Formation IA appliquée au bâtiment Île-de-France — ChatGPT 2026 | Laure Olivié`
- **Meta description** : `Formation IA pour le BTP en Île-de-France. ChatGPT pour devis, AO, chantier. 1 500+ pros formés. Qualiopi. Financement possible selon éligibilité. Visio gratuite.`
- **Schema FAQPage** : activer sur cette page pour le bloc FAQ (section 8) — *Rank Math → Schema → FAQ* ou module FAQ Elementor compatible Rank Math.

### Schémas structurés

- **Course** : injecté automatiquement par le hook PHP enfant `ofc_print_course_jsonld_schema` (slug `formation-ia-btp` déjà inclus dans la liste autorisée — fichier `docs/wordpress/ofc-child-theme-course-jsonld.php`).
- **FAQPage** : via Rank Math à partir des 6 questions / réponses ci-dessous.
- **Person** (section 9) : ajouter le schéma **Person** pour Laure Olivié dans Rank Math (données structurées) ou bloc dédié Elementor si votre gabarit OFC l’inclut.

### Liens internes (minimum 3 — à placer dans le corps de page)

Insérer au moins **trois** liens contextuels vers :

1. Page catalogue / hub : `/formation-ia-et-chatgpt/`
2. Page métier (exemple) : `/formation-ia-macon-btp/` ou `/formation-ia-conducteur-travaux-btp/`
3. Article blog (exemple) : `/blog/analyse-dce-notebooklm-claude-btp` ou `/blog/5-cas-usage-chatgpt-artisans-btp`

*(Adapter les ancres selon votre maillage prioritaire.)*

### CTA Calendly

- Remplacer par l’URL Calendly Laure Olivié (identique au site actuel).
- **Milieu de page** : encadré fond **#377CF3**, texte blanc, bouton CTA.
- **Fin de page** : section pleine largeur, fond bleu **#377CF3**, texte blanc.

---

## Structure Elementor (ordre des sections)

Ancres HTML suggérées pour le **sommaire** (identifiants uniques, sans accents) :

| Ancre | Section |
|-------|---------|
| `#hero` | (pas forcément dans le sommaire) |
| `#sommaire` | Sommaire |
| `#probleme` | Le problème |
| `#solution` | La solution |
| `#cta-milieu` | CTA Calendly milieu |
| `#methode` | Méthode pédagogique |
| `#resultats` | Résultats concrets |
| `#faq` | FAQ |
| `#laure` | Qui est Laure Olivié |
| `#cta-final` | CTA final |

---

## 1. Hero

### H1 (unique)

```text
Formation IA pour les pros du BTP — ChatGPT pour le Bâtiment en Île-de-France
```

### Chiffres clés (sous-titre ou ligne de badges)

- **plus de 1 500 professionnels formés** professionnels formés  
- **4,85/5** satisfaction  
- **Qualiopi** (certification OFC)

### Sous-texte court (optionnel)

OFC Création d’Entreprise · Île-de-France · Financement Constructys selon éligibilité

---

## 2. Sommaire cliquable

Liens vers les ancres :

1. [Le problème](#probleme)
2. [La solution — cas d’usage IA](#solution)
3. [Réserver une visio (milieu de page)](#cta-milieu)
4. [Méthode pédagogique](#methode)
5. [Résultats concrets](#resultats)
6. [FAQ](#faq)
7. [Qui est Laure Olivié ?](#laure)
8. [Réserver une visio (fin de page)](#cta-final)

---

## 3. Section « Le problème » {#probleme}

**Titre H2** : Pourquoi les PME du bâtiment perdent du temps sur l’administratif

Un conducteur de travaux passe en moyenne **12 heures par semaine** sur des tâches administratives répétitives : comptes rendus de chantier, relances clients, préparation de devis, lecture de CCTP pour répondre à des appels d’offres. Un chargé d’affaires dans une PME du bâtiment en Île-de-France peut consacrer jusqu’à **deux journées entières** à rédiger un mémoire technique — pour un seul marché.

Ces heures ne sont pas « perdues » au sens comptable : ce sont des heures que vous ne passez pas sur le terrain, à développer votre activité ou à vous recentrer sur l’essentiel.

L’intelligence artificielle — et **ChatGPT** en particulier — permet d’accélérer la mise en forme, la rédaction et la structuration des documents **sans remplacer** votre expertise technique ni votre jugement terrain.

Le problème : la plupart des formations IA généralistes **ne parlent pas** le vocabulaire BTP (DPGF, lots, DCE, CCTP, délais, sous-traitance). **Cette formation est conçue pour le secteur du bâtiment et des travaux publics.**

---

## 4. Section « La solution » — cas d’usage IA concrets {#solution}

**Titre H2** : Ce que vous allez maîtriser — cas d’usage concrets

La formation IA appliquée au bâtiment est une **formation pratique** : vous travaillez sur des situations réelles (devis, emails, appels d’offres, comptes rendus de chantier).

**Exemples de gains :**

- **Devis** : structurer un devis plus vite à partir de vos contraintes métier (prestations, quantités, conditions).
- **Appels d’offres** : extraire les points clés d’un CCTP volumineux et préparer votre mémoire technique plus efficacement.
- **Chantier** : transformer des notes brutes en comptes rendus exploitables pour le maître d’ouvrage ou les équipes.
- **Communication** : emails clients, relances, synthèses — avec un ton professionnel adapté au BTP.

> **Liens internes (exemples)** : pour un parcours catalogue complet, voir la page [Formations IA & ChatGPT pour le BTP](/formation-ia-et-chatgpt/) ; pour l’analyse de dossiers de consultation, l’article [Analyser un DCE avec l’IA](/blog/analyse-dce-notebooklm-claude-btp) détaille une méthode terrain.

---

## 5. CTA Calendly — milieu de page {#cta-milieu}

**Mise en forme** : bloc encadré, fond **#377CF3**, texte blanc, bouton contrasté (blanc sur bleu ou inverse selon charte OFC).

**Titre** : Pas sûr(e) d’être éligible Constructys ?

**Texte** : En 30 minutes de visio gratuite, vérifiez votre situation et ce que l’OPCO peut prendre en charge pour votre entreprise.

**Bouton** : Réservez votre visio découverte gratuite → *(lien Calendly)*

---

## 6. Section « Méthode pédagogique » {#methode}

**Titre H2** : Une pédagogie pensée pour le terrain

- **70 % de pratique** : exercices sur des cas BTP (vos documents en intra, des cas types en inter).
- **Prompts et trames BTP** : formulations prêtes à réutiliser pour devis, emails, synthèses, suivi de chantier.

**Financement** : formation certifiée **Qualiopi**, éligible **Constructys** (OPCO BTP) selon dossier — plafond pédagogique et délais à rappeler sur la page [financement Constructys](/financement-constructys-formation-ia-btp).

---

## 7. Section « Résultats concrets » {#resultats}

**Titre H2** : Résultats mesurés après la formation

### Tableau (exemple)

| Tâche | Avant | Après | Gain indicatif |
|-------|--------|--------|----------------|
| Rédaction d’un devis | 2 à 3 h | 20 à 30 min | ~2 h 30 |
| Compte rendu de chantier | 45 min | 10 min | ~35 min |
| Réponse à un appel d’offres | 2 à 3 jours | ~1 jour | ~1 jour |
| Email client difficile | 20 min | 3 min | ~17 min |
| Analyse d’un CCTP long | ~3 h | ~20 min | ~2 h 40 |
| **Total hebdomadaire estimé** | | | **3 à 5 h / semaine** |

### Témoignages (extraits)

> « J’ai utilisé ChatGPT pour analyser un CCTP de 95 pages. En 15 minutes, j’avais les points clés et les clauses à risque. Avant, j’aurais passé une demi-journée là-dessus. » — *Marc T., conducteur de travaux, PME BTP Île-de-France*

> « La partie sur les mémoires techniques a tout changé pour nous. On répond à deux fois plus d’AO qu’avant avec la même équipe. » — *Sophie R., chargée d’affaires, second œuvre (78)*

> « Je ne suis pas à l’aise avec l’informatique. En une journée, j’avais mes premiers devis rédigés avec l’IA. » — *Éric B., gérant, maçonnerie Grand Paris*

---

## 8. Section « FAQ » — 6 questions {#faq}

À copier dans le widget **FAQ** Elementor / Rank Math (schema FAQPage).

### 1. Faut-il être bon en informatique pour suivre cette formation ?

Non. La formation IA pour le BTP ne nécessite aucune compétence informatique particulière. ChatGPT fonctionne en français naturel — vous écrivez comme vous parleriez à un collègue compétent. Savoir utiliser un smartphone ou naviguer sur internet suffit.

### 2. Quelle est la durée de la formation ?

La formation catalogue est de **4 heures**, en **présentiel uniquement** — Paris et toute l'Île-de-France (75, 77, 78, 91, 92, 93, 94, 95). Le format est calé lors de l’entretien préalable (visio découverte 30 min).

### 3. Comment est financée la formation avec Constructys ?

Constructys, l’OPCO du BTP, peut prendre en charge les coûts pédagogiques selon éligibilité et barèmes en vigueur (plafond indicatif : **24 € HT** par heure et par participant). OFC s’occupe du montage du dossier. La demande doit être déposée **au moins 15 jours** avant le début de la formation.

### 4. La formation peut-elle se faire dans nos locaux ?

Oui. Les formations se déroulent exclusivement en présentiel. Les sessions **intra** ont lieu dans vos locaux en **Île-de-France** (Paris, Yvelines, Essonne, Seine-et-Marne, Val-d’Oise, Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne).

### 5. L’IA va-t-elle remplacer les conducteurs de travaux ou les artisans ?

Non. L’IA ne remplace pas l’expertise technique, le geste professionnel, la relation client ou le jugement terrain. Elle prend en charge les tâches administratives répétitives : mise en forme, rédaction, synthèse, structure.

### 6. La formation est-elle adaptée à tous les corps de métier BTP ?

Oui. La formation couvre les usages transversaux (devis, emails, AO, communication) qui s’appliquent à tous les métiers. En intra, les exercices sont adaptés à votre corps de métier.

---

## 9. Section « Qui est Laure Olivié » {#laure}

**Titre H2** : Qui est Laure Olivié ?

**Photo** : portrait professionnel (aligné sur la page [À propos](/a-propos/)).

**Texte court** :

Laure Olivié est **formatrice IA et ChatGPT pour le BTP**. Elle a créé **OFC Création d’Entreprise** (certifié Qualiopi) avec une conviction : l’IA peut transformer le quotidien des PME du bâtiment, à condition d’être enseignée avec le **bon vocabulaire** et les **bons cas d’usage**.

- Interventions : **Paris et toute l'Île-de-France (75, 77, 78, 91, 92, 93, 94, 95)**, intra / inter, exclusivement en présentiel.
- **Méthode** : 70 % de pratique, prompts réutilisables, zéro jargon inutile.

**Schema Person** : renseigner dans Rank Math le nom, l’URL, le logo / photo, `sameAs` (LinkedIn, etc.), `jobTitle` (ex. *Formatrice IA & ChatGPT — BTP*).

**Lien interne** : [Laure Olivié — formatrice IA pour le BTP](/a-propos/)

---

## 10. CTA Calendly — fin de page {#cta-final}

**Mise en forme** : section **pleine largeur**, fond **#377CF3**, texte blanc.

**Titre** : Prochaine étape — visio découverte gratuite (30 min)

**Liste** :

- Analyse de votre situation (taille d’entreprise, métier, besoins)
- Vérification de l’éligibilité Constructys
- Proposition de format adapté

**Bouton** : Je réserve ma visio gratuite → *(Calendly)*

**Contact** : e-mail et téléphone OFC (identiques au pied de page du site).

---

## Rappel technique

- Le fichier PHP du thème enfant **Course** couvre déjà `formation-ia-btp` — aucune modification de code nécessaire si le snippet est déjà déployé.
- Après publication : test **Rich Results** (FAQ + Course) et inspection d’URL dans la Search Console.
