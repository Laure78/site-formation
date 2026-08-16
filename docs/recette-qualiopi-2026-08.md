# Recette conformité Qualiopi — août 2026

**Date :** 2026-08-12  
**Organisme :** OFC Création d'Entreprise — certificat n° 520911-1 (CERTIFOPAC)  
**Méthode :** `npm run build` + analyse HTML généré (`.next/server/app`) + grep dépôt — **aucune modification de code applicatif** (seul ce rapport est produit).

---

## 1. Build et routes publiques

- Build : **OK** (`Compiled successfully`, artefacts présents dans `.next/`).
- Pages HTML générées (total) : **204**.
- Routes publiques retenues (hors `/admin`, `/api`, `/espace-apprenant`, `/auth`, invitation/questionnaire/messages/achat) : **198**.
- Inventaire complet : **annexe A**.

---

## 2. Périmètre « page action de formation »

Critères retenus (au moins un) :

1. Schema JSON-LD `Course`, **ou**
2. H1 contenant « formation », **ou**
3. Affichage durée + tarif, **ou**
4. Section programme.

**Périmètre tableau :** landings `/formation-ia*`, `/formation-claude-ai*`, fiches `/formations/ia-*` et `/formations/maitriser-claude-ai-btp` (offres OFC Qualiopi).

**Exclus du tableau** (hors action catalogue OFC ou hors offre session) : blog, BeWork, guides ressources, financement (guide OPCO), FAQ hub, listing `/formations`, LinkedIn Learning, plateforme LMS, pages légales, outils.

**Pages action analysées :** 80  
- `CatalogueInfosQualiopi` : 5  
- `RenvoiFicheCatalogue` : 47  
- **aucun** bloc : 28

Légende cohérence :

- **OUI** — H1 = titre officiel catalogue (fiches NIV).
- **OUI*** — landing géo/métier avec `RenvoiFicheCatalogue` (titre local ≠ titre catalogue **par design** ; action de référence explicite).
- **N/A** — pas de bloc réglementaire (ligne à traiter).

---

## 3. Tableau — pages action de formation

| URL | Bloc réglementaire | Action | Titre affiché (H1) | Cohérence |
|---|---|---|---|---|
| 🔴 `/formation-claude-ai-batiment` | aucun | NIV-01 | Formation Claude AI bâtiment — gros œuvre, second œuvre, étanchéité | N/A |
| 🔴 `/formation-claude-ai-btp` | aucun | NIV-01 | Formation Claude AI BTP — Maîtrisez l'IA d'Anthropic pour le bâtiment | N/A |
| 🔴 `/formation-claude-ai-travaux-publics` | aucun | NIV-01 | Formation Claude AI travaux publics — TP, génie civil, VRD | N/A |
| 🔴 `/formation-ia-artisans-btp` | aucun | NIV-01 | Formation IA pour entreprises BTP : ChatGPT pour devis, emails et comptes rendus | N/A |
| 🔴 `/formation-ia-assistante-administrative-btp` | aucun | NIV-01 | Formation IA assistante administrative BTP — courriers, mails et suivi chantier | N/A |
| 🔴 `/formation-ia-assistante-gestion-btp` | aucun | NIV-01 | Formation IA assistante de gestion BTP — facturation, relances impayés et DGD | N/A |
| 🔴 `/formation-ia-assistante-travaux` | aucun | NIV-01 | Formation IA pour assistantes travaux en Île-de-France | N/A |
| 🔴 `/formation-ia-btp` | aucun | NIV-01 | Formation IA appliquée au bâtiment — ChatGPT pour le Bâtiment en Île-de-France | N/A |
| `/formation-ia-btp-essonne-91` | RenvoiFicheCatalogue | NIV-01 | Formation IA BTP Essonne (91) — présentiel dans vos locaux | OUI* |
| `/formation-ia-btp-hauts-de-seine-92` | RenvoiFicheCatalogue | NIV-01 | Formation IA BTP Hauts-de-Seine (92) — présentiel dans vos locaux | OUI* |
| 🔴 `/formation-ia-btp-ile-de-france` | aucun | NIV-01 | Formation IA pour le bâtiment et la construction en Île-de-France | N/A |
| `/formation-ia-btp-paris` | RenvoiFicheCatalogue | NIV-01 | Formation IA BTP Paris (75) — présentiel dans vos locaux | OUI* |
| `/formation-ia-btp-seine-et-marne-77` | RenvoiFicheCatalogue | NIV-01 | Formation IA BTP Seine-et-Marne (77) — présentiel dans vos locaux | OUI* |
| `/formation-ia-btp-seine-saint-denis-93` | RenvoiFicheCatalogue | NIV-01 | Formation IA BTP Seine-Saint-Denis (93) — présentiel dans vos locaux | OUI* |
| `/formation-ia-btp-val-de-marne-94` | RenvoiFicheCatalogue | NIV-01 | Formation IA BTP Val-de-Marne (94) — présentiel dans vos locaux | OUI* |
| `/formation-ia-btp-val-doise-95` | RenvoiFicheCatalogue | NIV-01 | Formation IA BTP Val-d'Oise (95) — présentiel dans vos locaux | OUI* |
| `/formation-ia-btp-yvelines-78` | RenvoiFicheCatalogue | NIV-01 | Formation IA BTP Yvelines (78) — présentiel dans vos locaux | OUI* |
| 🔴 `/formation-ia-canalisateur-tp` | aucun | NIV-01 | Formation IA pour canalisateurs TP — gagnez du temps sur devis et dossiers techniques | N/A |
| `/formation-ia-carreleur-btp` | RenvoiFicheCatalogue | NIV-01 | Formation IA carreleur — pose collée, DTU 52 & Qualiopi | OUI* |
| 🔴 `/formation-ia-charge-affaires-btp` | aucun | NIV-02 | Formation IA pour les chargés d'affaires du BTP en Île-de-France | N/A |
| `/formation-ia-charpentier-btp` | RenvoiFicheCatalogue | NIV-01 | Formation IA charpentier — bois, DTU 31 & Qualiopi | OUI* |
| `/formation-ia-charpentier-menuisier-btp` | RenvoiFicheCatalogue | NIV-01 | Formation IA charpentier & menuisier bois — Île-de-France | OUI* |
| 🔴 `/formation-ia-chef-chantier-tp` | aucun | NIV-01 | Formation IA pour chefs de chantier TP | N/A |
| 🔴 `/formation-ia-cloturiste-btp` | aucun | NIV-01 | Formation IA pour clôturistes et poseurs de portails — gagnez du temps sur les devis et le… | N/A |
| 🔴 `/formation-ia-conducteur-de-travaux-btp` | aucun | NIV-03 | Formation IA pour conducteurs de travaux dans le BTP | N/A |
| `/formation-ia-conducteur-engins-tp` | RenvoiFicheCatalogue | NIV-01 | Formation IA pour conducteur d'engins TP — gagnez 5h par semaine sur l’administratif | OUI* |
| 🔴 `/formation-ia-conducteur-travaux` | aucun | NIV-01 | Formation IA pour conducteurs de travaux BTP — Gagnez 5h/semaine | N/A |
| 🔴 `/formation-ia-construction` | aucun | NIV-01 | Formation IA pour les Entreprises de Construction en Île-de-France | N/A |
| 🔴 `/formation-ia-couvreur-btp` | aucun | NIV-01 | Formation IA pour couvreurs-zingueurs en Île-de-France | N/A |
| `/formation-ia-dirigeant-btp` | RenvoiFicheCatalogue | NIV-01 | Formation IA pilotage stratégique — dirigeants et comités de direction BTP | OUI* |
| 🔴 `/formation-ia-dirigeant-pme-btp` | aucun | NIV-01 | Formation IA pour chefs d'entreprise TPE BTP — devis, relances et prospection au quotidien | N/A |
| `/formation-ia-electricien-btp` | RenvoiFicheCatalogue | NIV-01 | Formation IA électricien BTP — ChatGPT, NF C 15-100 & Qualiopi | OUI* |
| 🔴 `/formation-ia-etancheur` | aucun | NIV-01 | Formation IA pour Étancheur — gagnez 5 h par semaine sur l'administratif | N/A |
| `/formation-ia-etancheur-btp` | RenvoiFicheCatalogue | NIV-01 | Formation IA étancheur BTP — ChatGPT, CSFE & Qualiopi | OUI* |
| 🔴 `/formation-ia-ferrailleur-btp` | aucun | NIV-01 | Formation IA pour ferrailleurs / armaturiers — gagnez environ 6 h par semaine | N/A |
| 🔴 `/formation-ia-geometre-tp` | aucun | NIV-01 | Formation IA pour géomètres (TP) — gagnez du temps sur rapports, devis et documentation | N/A |
| `/formation-ia-gros-oeuvre-btp` | RenvoiFicheCatalogue | NIV-01 | Formation IA pour le gros œuvre en Île-de-France — devis, DCE et suivi de chantier | OUI* |
| `/formation-ia-macon-btp` | RenvoiFicheCatalogue | NIV-01 | Formation IA maçon & maçonnerie — Île-de-France | OUI* |
| 🔴 `/formation-ia-macon-paysagiste-btp` | aucun | NIV-01 | Formation IA pour maçons paysagistes — gagnez du temps sur la paperasse et les dossiers | N/A |
| `/formation-ia-marche-public-etancheite` | RenvoiFicheCatalogue | NIV-02 | Formation IA marché public étanchéité — DCE, mémoire et DTU 43 (présentiel Île-de-France) | OUI* |
| `/formation-ia-marche-public-travaux` | RenvoiFicheCatalogue | NIV-02 | Formation IA marché public de travaux — répondre et gérer avec l'IA (présentiel Île-de-Fra… | OUI* |
| `/formation-ia-menuisier-btp` | RenvoiFicheCatalogue | NIV-01 | Formation IA menuisier bâtiment — DTU 36, pose & Qualiopi | OUI* |
| 🔴 `/formation-ia-paris` | aucun | NIV-01 | Formation IA à Paris : maîtrisez ChatGPT sur vos dossiers de chantier | N/A |
| 🔴 `/formation-ia-paysagiste-btp` | aucun | NIV-01 | Formation IA pour paysagistes — gagnez du temps sur la conception et les devis | N/A |
| `/formation-ia-peintre-btp` | RenvoiFicheCatalogue | NIV-01 | Formation IA peintre bâtiment — finitions, DTU 59 & Qualiopi | OUI* |
| 🔴 `/formation-ia-pisciniste-btp` | aucun | NIV-01 | Formation IA pour piscinistes — gagnez du temps sur devis et suivi | N/A |
| `/formation-ia-plaquiste-btp` | RenvoiFicheCatalogue | NIV-01 | Formation IA plaquiste plâtrier — cloisons, DTU 25 & Qualiopi | OUI* |
| `/formation-ia-plombier-btp` | RenvoiFicheCatalogue | NIV-01 | Formation IA plombier chauffagiste — ChatGPT, DTU 60.11 & Qualiopi | OUI* |
| 🔴 `/formation-ia-responsable-administratif-btp` | aucun | NIV-01 | Formation IA pour responsables administratifs dans le BTP | N/A |
| `/formation-ia-solier-revetements` | RenvoiFicheCatalogue | NIV-01 | Formation IA pour solier / poseur de revêtements — gagnez 5h par semaine sur l’administrat… | OUI* |
| 🔴 `/formation-ia-travaux-publics` | aucun | NIV-01 | Formation IA & ChatGPT pour les Travaux Publics — Routes, VRD, génie civil | N/A |
| 🔴 `/formation-ia-vitrier-btp` | aucun | NIV-01 | Formation IA pour vitriers miroitiers — gagnez environ 3 h par semaine | N/A |
| `/formation-ia/ascenseurs-monte-charges` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Ascenseurs et monte-charges | OUI* |
| `/formation-ia/bardage-facades` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Bardage et façades | OUI* |
| `/formation-ia/beton-fondations` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Béton armé et fondations | OUI* |
| `/formation-ia/chauffage-climatisation-cvc` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Chauffage, ventilation, climatisation (CVC) | OUI* |
| `/formation-ia/demolition-desamiantage` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Démolition et désamiantage | OUI* |
| `/formation-ia/domotique-gtb` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Domotique et GTB/GTC | OUI* |
| `/formation-ia/entreprise-generale-batiment` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Entreprise générale et TCE | OUI* |
| `/formation-ia/espaces-verts-paysagisme` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Espaces verts et paysagisme | OUI* |
| `/formation-ia/metallerie-serrurerie` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Métallerie et serrurerie | OUI* |
| `/formation-ia/photovoltaique-irve` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Photovoltaïque et bornes IRVE | OUI* |
| `/formation-ia/platrerie-cloisons-faux-plafonds` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Plâtrerie, cloisons et faux plafonds | OUI* |
| `/formation-ia/ravalement-facade-ite` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Ravalement de façade et ITE | OUI* |
| `/formation-ia/renovation-energetique` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Rénovation énergétique et performance | OUI* |
| `/formation-ia/renovation-interieure` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Rénovation intérieure | OUI* |
| `/formation-ia/securite-incendie-ssi` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Sécurité incendie et SSI | OUI* |
| `/formation-ia/sols-souples-parquet` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Sols souples, parquet et stratifiés | OUI* |
| `/formation-ia/terrassement` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Terrassement et mouvement de terres | OUI* |
| `/formation-ia/travaux-publics-genie-civil` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — Travaux publics et génie civil | OUI* |
| `/formation-ia/vrd-pavage` | RenvoiFicheCatalogue | NIV-01 | Formation IA, ChatGPT et Claude AI — VRD, réseaux et pavage | OUI* |
| `/formations/ia-appels-offre-btp` | CatalogueInfosQualiopi | NIV-02 | L'IA appliquée aux appels d'offres BTP | OUI |
| `/formations/ia-batiment-travaux-publics` | CatalogueInfosQualiopi | NIV-01 | L'IA au service des pros du bâtiment et des travaux publics | OUI |
| `/formations/ia-btp-longjumeau` | RenvoiFicheCatalogue | NIV-01 | Formation IA pour les entreprises du BTP à Longjumeau | OUI* |
| `/formations/ia-btp-morangis` | RenvoiFicheCatalogue | NIV-01 | Formation IA pour les entreprises du BTP à Morangis | OUI* |
| `/formations/ia-btp-saint-quentin-en-yvelines` | RenvoiFicheCatalogue | NIV-01 | Formation IA pour les pros du BTP Saint-Quentin-en-Yvelines (78) — ChatGPT pour PME et équ… | OUI* |
| `/formations/ia-conduite-travaux-suivi-chantier` | CatalogueInfosQualiopi | NIV-03 | L'IA appliquée à la conduite de travaux | OUI |
| `/formations/ia-maitrise-oeuvre` | CatalogueInfosQualiopi | NIV-05 | L'IA au service des maîtres d'œuvre | OUI |
| `/formations/ia-pme-btp` | RenvoiFicheCatalogue | NIV-01 | Formation IA pour PME du BTP | OUI* |
| `/formations/maitriser-claude-ai-btp` | CatalogueInfosQualiopi | NIV-04 | Maîtriser Claude AI pour le BTP — Chat, Cowork & Code | OUI |

### Titres officiels catalogue (`data/formations.ts`)

- **NIV-01** — L'IA au service des pros du bâtiment et des travaux publics
- **NIV-02** — L'IA appliquée aux appels d'offres BTP
- **NIV-03** — L'IA appliquée à la conduite de travaux
- **NIV-04** — Maîtriser Claude AI pour le BTP — Chat, Cowork & Code
- **NIV-05** — L'IA au service des maîtres d'œuvre

---

## 4. Lignes 🔴 (non-conformité / risque indicateur 1)

Toute page ci-dessous **présente une offre de formation** (H1 / Course / durée) **sans** `CatalogueInfosQualiopi` ni `RenvoiFicheCatalogue`.

**Total : 28 pages.**

- 🔴 `/formation-claude-ai-batiment` — H1 : « Formation Claude AI bâtiment — gros œuvre, second œuvre, étanchéité » — hint schéma/ref : NIV-01
- 🔴 `/formation-claude-ai-btp` — H1 : « Formation Claude AI BTP — Maîtrisez l'IA d'Anthropic pour le bâtiment » — hint schéma/ref : NIV-01
- 🔴 `/formation-claude-ai-travaux-publics` — H1 : « Formation Claude AI travaux publics — TP, génie civil, VRD » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-artisans-btp` — H1 : « Formation IA pour entreprises BTP : ChatGPT pour devis, emails et comptes rendus » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-assistante-administrative-btp` — H1 : « Formation IA assistante administrative BTP — courriers, mails et suivi chantier » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-assistante-gestion-btp` — H1 : « Formation IA assistante de gestion BTP — facturation, relances impayés et DGD » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-assistante-travaux` — H1 : « Formation IA pour assistantes travaux en Île-de-France » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-btp` — H1 : « Formation IA appliquée au bâtiment — ChatGPT pour le Bâtiment en Île-de-France » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-btp-ile-de-france` — H1 : « Formation IA pour le bâtiment et la construction en Île-de-France » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-canalisateur-tp` — H1 : « Formation IA pour canalisateurs TP — gagnez du temps sur devis et dossiers techniques » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-charge-affaires-btp` — H1 : « Formation IA pour les chargés d'affaires du BTP en Île-de-France » — hint schéma/ref : NIV-02
- 🔴 `/formation-ia-chef-chantier-tp` — H1 : « Formation IA pour chefs de chantier TP » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-cloturiste-btp` — H1 : « Formation IA pour clôturistes et poseurs de portails — gagnez du temps sur les devis et le suivi cli » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-conducteur-de-travaux-btp` — H1 : « Formation IA pour conducteurs de travaux dans le BTP » — hint schéma/ref : NIV-03
- 🔴 `/formation-ia-conducteur-travaux` — H1 : « Formation IA pour conducteurs de travaux BTP — Gagnez 5h/semaine » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-construction` — H1 : « Formation IA pour les Entreprises de Construction en Île-de-France » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-couvreur-btp` — H1 : « Formation IA pour couvreurs-zingueurs en Île-de-France » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-dirigeant-pme-btp` — H1 : « Formation IA pour chefs d'entreprise TPE BTP — devis, relances et prospection au quotidien » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-etancheur` — H1 : « Formation IA pour Étancheur — gagnez 5 h par semaine sur l'administratif » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-ferrailleur-btp` — H1 : « Formation IA pour ferrailleurs / armaturiers — gagnez environ 6 h par semaine » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-geometre-tp` — H1 : « Formation IA pour géomètres (TP) — gagnez du temps sur rapports, devis et documentation » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-macon-paysagiste-btp` — H1 : « Formation IA pour maçons paysagistes — gagnez du temps sur la paperasse et les dossiers » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-paris` — H1 : « Formation IA à Paris : maîtrisez ChatGPT sur vos dossiers de chantier » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-paysagiste-btp` — H1 : « Formation IA pour paysagistes — gagnez du temps sur la conception et les devis » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-pisciniste-btp` — H1 : « Formation IA pour piscinistes — gagnez du temps sur devis et suivi » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-responsable-administratif-btp` — H1 : « Formation IA pour responsables administratifs dans le BTP » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-travaux-publics` — H1 : « Formation IA & ChatGPT pour les Travaux Publics — Routes, VRD, génie civil » — hint schéma/ref : NIV-01
- 🔴 `/formation-ia-vitrier-btp` — H1 : « Formation IA pour vitriers miroitiers — gagnez environ 3 h par semaine » — hint schéma/ref : NIV-01

**Fiches catalogue (5/5) :** aucune ligne rouge — H1 alignés sur NIV-01…NIV-05 + `CatalogueInfosQualiopi`.

**Landings avec Renvoi :** aucune ligne rouge (cohérence OUI* via encart de renvoi).

---

## 5. Contrôles transverses

### 5.1 Forme juridique

| Source | Valeur |
|---|---|
| `lib/ofc-identite.ts` | **SASU** / Société par Actions Simplifiée Unipersonnelle (SASU) |
| Mentions légales / CGV | via `OFC_IDENTITE.formeJuridiqueLongue` |
| `lib/qualiopi-info.ts`, `lib/schema-constants.ts`, à-propos, profil Laure | SASU |

**Verdict :** une seule forme juridique OFC dans le code runtime : **SASU**.  
(Occurrences « SAS » hors OFC : éventuels contenus clients/skills — hors identité OFC.)

### 5.2 Ancien domaine `ofc-creation-entreprise.fr`

**Aucune occurrence live** dans le dépôt (seule mention historique dans `audit-qualiopi-2026-08.md`).

### 5.3 Modalités — distanciel / à distance / e-learning

| Contexte | Statut |
|---|---|
| FAQ / landings qui **refusent** le distanciel pour les sessions OFC | OK (présentiel IDF) |
| « Visio découverte » (RDV commercial) | OK (hors modalité de formation) |
| Plateforme « e-learning » LMS stagiaires (`/formations/plateforme`) | Hors actions de formation présentielle — libellé LMS |
| Parcours Laure CNFPT « plateforme e-learning » (bio) | OK (historique perso) |
| `lib/tutos/tuto-skill-diuo-ofc.ts` : « présentiel … **ou distanciel** » | ⚠️ **Risque** — formule qui peut être lue comme modalité de formation OFC |

**Verdict :** pas de promesse de session catalogue en distanciel sur les fiches NIV ; **1 formulation à risque** dans un tuto skill DIUO.

### 5.4 Certificat PDF

| Contrôle | Résultat |
|---|---|
| Fichier `public/documents/certificat-qualiopi-ofc.pdf` | **Présent** (≈ 151 Ko) |
| Référencé | `QUALIOPI_LEGAL.certificatPdfHref`, `LINKS.certificatQualiopi`, notice Qualiopi / footer |

### 5.5 N° certificat et dates

| Champ | Valeur source | Cohérence |
|---|---|---|
| Numéro | `520911-1` (`QUALIOPI_LEGAL`) | OK partout (SEO, mentions, notice) |
| Validité | du **16/01/2025** au **15/01/2028** | OK ; ISO JSON-LD `2025-01-16` / `2028-01-15` |
| Mentions légales | n° + dates en dur (mêmes valeurs) | OK valeurs ; source non unique |

---

## 6. Points à vérifier **humainement** en ligne

1. Ouvrir `https://www.laureolivie.fr/documents/certificat-qualiopi-ofc.pdf` — lisibilité, n° **520911-1**, dates **16/01/2025–15/01/2028**, catégorie **actions de formation**.
2. Parcourir **chaque URL 🔴** en production : confirmer si la page se présente encore comme une **action de formation** commercialisable (ou simple SEO) et décider Renvoi NIV-xx / 301 vers fiche / reformulation.
3. Contrôler Search Console : aucune indexation sous `ofc-creation-entreprise.fr` ; redirections serveur hors Next si besoin.
4. Rich Results Test sur les 5 fiches catalogue + 2–3 landings Renvoi (Course name = titre catalogue).
5. Page `/indicateurs-resultats` : placeholders éventuels (abandon / heures-stagiaires) — **ne pas présenter à l’auditeur tant que non renseignés**.
6. Barèmes Constructys 24 € / 19 € : cohérence page financement vs FAQ (divergence connue, hors scope de cette recette).
7. Kbis : confirmer **SASU** face à l’extrait officiel.
8. Échantillon mobile : encart « Action de formation de référence » visible et lien unique vers la fiche NIV.
9. Vérifier que le tuto DIUO (`tuto-skill-diuo-ofc`) n’est pas interprétable comme offre OFC en distanciel.
10. Tester en live une URL legacy `/formations/formation-claude-ia-btp` → redirection permanente vers NIV-04.

---

## Annexe A — Routes publiques (build)

```
/
/a-propos
/accessibilite-handicap
/annuaire-handicap
/bework
/bework/plateforme
/blog/5-assistants-ia-btp-chatgpt-productivite
/blog/5-cas-usage-chatgpt-artisans-btp
/blog/7-cas-usage-ia-btp-chiffrage-chantier-appels-offres
/blog/adoption-ia-btp-2026-chiffres-freins-leviers
/blog/analyse-dce-notebooklm-claude-btp
/blog/analyser-ccap-ia-btp
/blog/analyser-cctp-ia-methode-complete-20-minutes
/blog/categorie/appels-offres
/blog/categorie/appels-offres/2
/blog/categorie/chatgpt-bonnes-pratiques
/blog/categorie/devis-chiffrage
/blog/categorie/financement-opco
/blog/categorie/ia-par-metier
/blog/categorie/productivite-emails
/blog/categorie/rh-recrutement
/blog/chatgpt-btp-7-leviers-productivite-2026
/blog/chatgpt-devis-btp-methode-2026
/blog/chiffrage-cctp-bpu-appels-offres-btp
/blog/comment-ia-gagne-5h-conducteurs-travaux
/blog/comparatif-chatgpt-claude-gemini-btp
/blog/compte-rendu-chantier-ia-automatiser-gagner-temps
/blog/cours-gratuits-claude-ai-conducteur-travaux-pme-btp
/blog/devis-btp-chatgpt-20-minutes
/blog/doe-pv-reception-ia-btp
/blog/financer-formation-ia-btp-constructys
/blog/formation-ia-artisans-batiment-programme-objectifs-livrables
/blog/formation-ia-btp-guide-complet-2026
/blog/formation-ia-cctp-analyse-dce-btp
/blog/formation-ia-paris-choisir
/blog/go-no-go-rentabilite-appels-offres-btp
/blog/guide-claude-ia-btp-code-projects-skills-mcp
/blog/guide-skill-ia-conducteur-travaux-btp
/blog/ia-devis-batiment-chiffrage-automatise
/blog/ia-memoire-technique-appel-offres-guide-2026
/blog/ia-pour-le-btp-cours-linkedin-learning
/blog/mcp-claude-model-context-protocol-btp
/blog/memoire-reclamation-btp-ia
/blog/memoire-technique-btp-exemple
/blog/memoire-technique-claude-projet-btp
/blog/page/2
/blog/page/3
/blog/page/4
/blog/prompts-linkedin-btp-carrousel-idees
/blog/repondre-appel-offre-travaux
/blog/securite-donnees-chatgpt-btp
/blog/situation-travaux-ia-btp
/blog/subrogation-constructys-financement-formation-ia-btp-2026
/cgv
/checklist-ia-btp
/claude-ai-btp
/communaute-formateurs
/contact
/diagnostic-ia-btp
/etudes-de-cas/ffb-csfe
/expert-ia-btp
/financement-constructys-formation-ia-btp
/formateur-ia-btp
/formation-claude-ai-batiment
/formation-claude-ai-btp
/formation-claude-ai-travaux-publics
/formation-ia
/formation-ia-[metier]-btp
/formation-ia-artisans-btp
/formation-ia-assistante-administrative-btp
/formation-ia-assistante-gestion-btp
/formation-ia-assistante-travaux
/formation-ia-btp
/formation-ia-btp-essonne-91
/formation-ia-btp-hauts-de-seine-92
/formation-ia-btp-ile-de-france
/formation-ia-btp-paris
/formation-ia-btp-seine-et-marne-77
/formation-ia-btp-seine-saint-denis-93
/formation-ia-btp-val-de-marne-94
/formation-ia-btp-val-doise-95
/formation-ia-btp-yvelines-78
/formation-ia-canalisateur-tp
/formation-ia-carreleur-btp
/formation-ia-charge-affaires-btp
/formation-ia-charpentier-btp
/formation-ia-charpentier-menuisier-btp
/formation-ia-chef-chantier-tp
/formation-ia-cloturiste-btp
/formation-ia-conducteur-de-travaux-btp
/formation-ia-conducteur-engins-tp
/formation-ia-conducteur-travaux
/formation-ia-construction
/formation-ia-couvreur-btp
/formation-ia-dirigeant-btp
/formation-ia-dirigeant-pme-btp
/formation-ia-electricien-btp
/formation-ia-etancheur
/formation-ia-etancheur-btp
/formation-ia-ferrailleur-btp
/formation-ia-geometre-tp
/formation-ia-gros-oeuvre-btp
/formation-ia-macon-btp
/formation-ia-macon-paysagiste-btp
/formation-ia-marche-public-etancheite
/formation-ia-marche-public-travaux
/formation-ia-menuisier-btp
/formation-ia-paris
/formation-ia-paysagiste-btp
/formation-ia-peintre-btp
/formation-ia-pisciniste-btp
/formation-ia-plaquiste-btp
/formation-ia-plombier-btp
/formation-ia-responsable-administratif-btp
/formation-ia-solier-revetements
/formation-ia-travaux-publics
/formation-ia-vitrier-btp
/formation-ia/ascenseurs-monte-charges
/formation-ia/bardage-facades
/formation-ia/beton-fondations
/formation-ia/chauffage-climatisation-cvc
/formation-ia/demolition-desamiantage
/formation-ia/domotique-gtb
/formation-ia/entreprise-generale-batiment
/formation-ia/espaces-verts-paysagisme
/formation-ia/faq
/formation-ia/metallerie-serrurerie
/formation-ia/photovoltaique-irve
/formation-ia/platrerie-cloisons-faux-plafonds
/formation-ia/ravalement-facade-ite
/formation-ia/renovation-energetique
/formation-ia/renovation-interieure
/formation-ia/securite-incendie-ssi
/formation-ia/sols-souples-parquet
/formation-ia/terrassement
/formation-ia/travaux-publics-genie-civil
/formation-ia/vrd-pavage
/formations
/formations-linkedin-learning
/formations/ia-appels-offre-btp
/formations/ia-batiment-travaux-publics
/formations/ia-btp-longjumeau
/formations/ia-btp-morangis
/formations/ia-btp-saint-quentin-en-yvelines
/formations/ia-conduite-travaux-suivi-chantier
/formations/ia-maitrise-oeuvre
/formations/ia-pme-btp
/formations/maitriser-claude-ai-btp
/formations/plateforme
/guide-skill-ia-conducteur-travaux
/ia-analyse-dce-btp
/ia-compte-rendu-chantier
/ia-conducteur-travaux
/ia-devis-batiment
/ia-memoire-technique-btp
/indicateurs-resultats
/install-pwa
/mentions-legales
/outils-ia-btp
/outils/cas-usage-ia-btp
/outils/verification-dtu-bework
/partenaires
/politique-confidentialite
/prendre-rdv
/prendre-rendez-vous
/qualiopi
/reclamations
/reglement-interieur
/ressources
/ressources/bibliotheque-prompts-btp-par-metier
/ressources/bibliotheque-skills
/ressources/guide-assistants-travaux-ofc
/ressources/guide-charge-affaires-ofc
/ressources/guide-chef-de-chantier-ofc
/ressources/guide-claude-btp-ofc
/ressources/guide-conducteur-de-travaux
/ressources/guide-conducteur-de-travaux/merci
/ressources/guide-dirigeant-btp-ofc
/ressources/guide-maitrise-oeuvre-ia
/ressources/guide-repondre-ao-btp-ofc-2026
/ressources/guide-rh-btp-ia-ofc
/ressources/ia-btp
/ressources/ia-btp/10-cas-usage-concrets
/ressources/tuto-analyse-dce
/ressources/tuto-constat-retard
/ressources/tuto-cr-chantier
/ressources/tuto-dispatch-btp
/ressources/tuto-doe-dossier-ouvrages-executes
/ressources/tuto-duerp
/ressources/tuto-memoire-technique
/ressources/tuto-ppsps
/ressources/tuto-pv-levee-reserves
/ressources/tuto-skill-diuo-ofc
/ressources/tuto-skill-livret-integration-ofc
/ressources/tuto-skill-memoire-reclamation-bework
/ressources/tuto-tri-dce-claude-chrome
/ressources/tutos
/video/formations-ia-btp
```

---

*Fin de recette — lecture seule, aucun fichier applicatif modifié hors ce rapport.*
