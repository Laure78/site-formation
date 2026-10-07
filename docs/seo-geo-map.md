# Cartographie SEO + GEO — laureolivie.fr

> Inventaire au **2026-04-05** (routes `app/**/page.tsx`, `lib/internal-links.ts`, redirects `next.config.ts` / `lib/gsc-redirects-2026.ts`).
> Objectif : **une intention principale = une URL principale**. Aucun mot-clé principal attribué à deux URL indexables.

Base : https://www.laureolivie.fr

---

## Légende

| Colonne | Valeurs |
|---------|---------|
| **Type** | page pilier · formation · article · page auteur · page locale · page institutionnelle · landing page · méthode · lead · stub 301 · privé |
| **Intention** | Commerciale (C) · Informationnelle (I) · Hybride (H) |
| **Action** | conserver · optimiser · repositionner · fusionner · rediriger · noindex · créer uniquement si nécessaire |

---

## Architecture cible (pages piliers)

```
FORMATION IA BTP                          → /formation-ia-btp          (pilier)
Catalogue programmes                     → /formations               (liste)
Appels d’offres BTP                      → /formation-ia-appels-offres-btp → fiche /formations/ia-appels-offre-btp
Conduite de travaux                      → /formation-ia-conducteur-de-travaux → fiche /formations/ia-conduite-travaux-suivi-chantier
Claude AI BTP                            → /formations/maitriser-claude-ai-btp (C) + /claude-ai-btp (I)
Assistants IA                            → /formations/assistants-ia-personnalises-btp
Outils / applications métier             → /formations/application-metier-btp-niveau-1 (+ niv. 2/3, NIV-10)
ChatGPT BTP (outil)                      → /formation-chatgpt-btp
Géo IDF                                  → /formation-ia-btp-ile-de-france
Entité Laure Olivié                      → /a-propos
Formateur (requête « formateur »)        → /formateur-ia-btp
```

Articles / méthodes = satellites informationnels → CTA vers la formation du silo.

---

## Tableau — pages stratégiques

| URL | Type | Intention | Entité/Sujet principal | Mot-clé principal | Variantes (cluster, pas d’URL) | Page pilier | Risque cannibalisation | Action |
|-----|------|-----------|------------------------|-------------------|--------------------------------|-------------|------------------------|--------|
| `/` | page institutionnelle | C | Laure Olivié / OFC | formatrice IA BTP Île-de-France | — | — | Faible | conserver |
| `/formation-ia-btp` | page pilier | C | Formation IA BTP | **formation IA pour le BTP** | formation IA bâtiment ; IA PME BTP ; IA générative bâtiment ; ChatGPT BTP débutant | elle-même | — (canon) | **optimiser** (En bref, FAQ GEO) |
| `/formations` | formation (catalogue) | C | Catalogue programmes | catalogue formations IA BTP | programmes Qualiopi IDF | `/formation-ia-btp` | Moyen (si H1/title = « formation IA BTP ») | **repositionner** title/H1 sur « catalogue » |
| `/formation-ia` | landing page (hub) | H | Métiers & zones | formation IA BTP métiers IDF | — | `/formation-ia-btp` | Moyen | conserver (index maillage) |
| `/formation-chatgpt-btp` | landing page | C | ChatGPT × BTP | formation ChatGPT BTP | ChatGPT devis ; ChatGPT chantier | `/formation-ia-btp` | Moyen | conserver (outil ≠ catégorie) |
| `/formation-ia-appels-offres-btp` | landing page | C | AO / DCE / MT | **formation IA appels d’offres BTP** | AO travaux ; marché public ; DCE ; mémoire technique (commercial) | `/formation-ia-btp` | Élevé vs fiche NIV-02 | conserver (canon commercial AO) |
| `/formations/ia-appels-offre-btp` | formation | C | Programme NIV-02 | programme IA DCE mémoire technique | CCTP ; CCAP ; DPGF (fiche) | `/formation-ia-appels-offres-btp` | Élevé | conserver (fiche Qualiopi) |
| `/formations/ia-batiment-travaux-publics` | formation | C | Programme NIV-01 | formation IA BTP devis chantier | ChatGPT documents | `/formation-ia-btp` | Moyen | conserver |
| `/formation-ia-conducteur-de-travaux` | landing page | C | Conducteur de travaux | **formation IA conducteur de travaux** | CDT ; chef de chantier (commercial) | `/formation-ia-btp` | Élevé vs NIV-03 | conserver (canon métier) |
| `/formations/ia-conduite-travaux-suivi-chantier` | formation | C | Programme NIV-03 | programme IA suivi chantier CR DOE | PPSPS ; réserves | `/formation-ia-conducteur-de-travaux` | Moyen | conserver |
| `/formations/maitriser-claude-ai-btp` | formation | C | Claude AI BTP | **formation Claude AI BTP** | Projects ; Cowork ; Skills | `/formation-ia-btp` | Moyen vs guide | conserver (canon commercial Claude) |
| `/claude-ai-btp` | page pilier (info) | I | Claude AI pour le BTP | Claude AI BTP | interfaces Claude ; MCP | `/formations/maitriser-claude-ai-btp` | Moyen | conserver (guide ≠ formation) |
| `/formations/assistants-ia-personnalises-btp` | formation | C | Assistants IA | formation assistants IA BTP | GPT custom ; projets Claude | `/formation-ia-btp` | Moyen vs blog | conserver |
| `/formations/application-metier-btp-niveau-1` | formation | C | App métier niv. 1 | application métier BTP IA niveau 1 | prototype ; sans coder (intro) | `/formation-ia-btp` | Moyen vs NIV-10 | conserver |
| `/formations/application-metier-btp-niveau-2` | formation | C | App métier niv. 2 | application métier BTP connectée | CRM ; devis ; BDD | niv. 1 | Faible | conserver |
| `/formations/application-metier-btp-niveau-3` | formation | C | App métier niv. 3 | application métier BTP IA avancée | assistant DCE | niv. 1 | Faible | conserver |
| `/formations/developpement-web-ia-sans-coder` | formation | C | Création / déploiement | créer application BTP avec l’IA | sans coder ; BeWork | `/formation-ia-btp` | Moyen vs niv. 1 | conserver (différencier niveau) |
| `/formations/ia-maitrise-oeuvre` | formation | C | MOE | formation IA maîtrise d’œuvre | OS ; CR MOE | `/formation-ia-btp` | Faible | conserver |
| `/formations/ia-etudes-prix-chiffrage-btp` | landing page | C | Études de prix | études de prix chiffrage IA BTP | DPGF ; BPU ; métrés | AO | Moyen | conserver (niche chiffrage) |
| `/formations/ia-pme-btp` | landing page | C | PME BTP | formation IA PME BTP | TPE bâtiment | `/formation-ia-btp` | Moyen | **optimiser** (pas de head terms pilier) |
| `/ia-analyse-dce-btp` | méthode | I | Analyse DCE | analyser un DCE avec l’IA | RC ; pièces ; go/no-go | AO | Élevé | conserver → mailler AO |
| `/ia-memoire-technique-btp` | méthode | I | Mémoire technique | mémoire technique BTP avec l’IA | MT AO | AO | Élevé | conserver → mailler AO |
| `/ia-compte-rendu-chantier` | méthode | I | Compte rendu | compte rendu de chantier avec l’IA | CR réunion | CDT | Moyen | conserver → mailler CDT |
| `/ia-devis-batiment` | méthode | I | Devis | devis BTP avec l’IA | structurer devis | `/formation-chatgpt-btp` | Moyen | conserver |
| `/outils-ia-btp` | landing page | I | Outils | outils IA BTP ChatGPT Claude | comparatif outils | `/formation-ia-btp` | Moyen | conserver |
| `/formation-ia-btp-ile-de-france` | page locale | C | IDF | **formation IA BTP Île-de-France** | Paris région ; présentiel IDF | `/formation-ia-btp` | Moyen | conserver (pilier géo) |
| `/formation-ia-paris` | page locale | C | Paris | formation IA BTP Paris | 75 ; Grand Paris | hub IDF | Élevé | conserver (canon Paris) |
| `/formation-ia-btp-yvelines-78` | page locale | C | Yvelines | formation IA BTP Yvelines | Versailles ; Guyancourt ; SQY | hub IDF | Moyen | conserver |
| `/formation-ia-btp-essonne-91` | page locale | C | Essonne | formation IA BTP Essonne | Morangis ; Longjumeau | hub IDF | Moyen | conserver |
| `/formation-ia-btp-seine-et-marne-77` | page locale | C | 77 | formation IA BTP Seine-et-Marne | — | hub IDF | Moyen | conserver |
| `/formation-ia-btp-hauts-de-seine-92` | page locale | C | 92 | formation IA BTP Hauts-de-Seine | — | hub IDF | Moyen | conserver |
| `/formation-ia-btp-seine-saint-denis-93` | page locale | C | 93 | formation IA BTP Seine-Saint-Denis | — | hub IDF | Moyen | conserver |
| `/formation-ia-btp-val-de-marne-94` | page locale | C | 94 | formation IA BTP Val-de-Marne | — | hub IDF | Moyen | conserver |
| `/formation-ia-btp-val-doise-95` | page locale | C | 95 | formation IA BTP Val-d’Oise | — | hub IDF | Moyen | conserver |
| `/formations/ia-btp-morangis` | page locale | C | Morangis | formation IA BTP Morangis | — | Essonne | Moyen | conserver (longue traîne) |
| `/formations/ia-btp-longjumeau` | page locale | C | Longjumeau | formation IA BTP Longjumeau | — | Essonne | Moyen | conserver |
| `/formations/ia-btp-saint-quentin-en-yvelines` | page locale | C | SQY | formation IA BTP Saint-Quentin-en-Yvelines | — | Yvelines | Moyen | conserver |
| `/a-propos` | page auteur | I | Laure Olivié | **Laure Olivié formatrice IA BTP** | bio ; parcours ; OFC | — | Élevé vs formateur/expert | **optimiser** (entité canon) |
| `/formateur-ia-btp` | landing page | C | Formateur IA bâtiment | formateur IA bâtiment Île-de-France | formatrice IA BTP (requête) | `/a-propos` | Élevé | conserver (requête « formateur ») |
| `/expert-ia-btp` | stub 301 | — | — | — | — | `/a-propos` | Résolu | **rediriger** (déjà 301) — ne pas réindexer |
| `/financement-constructys-formation-ia-btp` | page institutionnelle | C | Financement OPCO | financement Constructys formation IA BTP | OPCO BTP | `/formation-ia-btp` | Faible | conserver |
| `/contact` | page institutionnelle | C | Contact | contact formation IA BTP | — | — | Faible | conserver |
| `/prendre-rdv` | landing page | C | RDV découverte | appel découverte formation IA BTP | Calendly | — | Faible | conserver |
| `/blog` | article (index) | I | Blog IA BTP | blog formation IA BTP | — | — | Faible | conserver |
| `/avis-clients` | page institutionnelle | I | Preuve sociale | avis clients formation IA BTP | — | `/a-propos` | Faible | conserver |
| `/partenaires` | page institutionnelle | I | Partenaires | partenaires FFB CSFE | — | `/a-propos` | Faible | conserver |
| `/qualiopi` | page institutionnelle | I | Qualiopi OFC | Qualiopi OFC formation | — | — | Faible | conserver |
| `/mentions-legales` | page institutionnelle | I | Mentions | mentions légales | — | — | — | conserver (noindex si besoin) |
| `/politique-confidentialite` | page institutionnelle | I | RGPD | politique confidentialité | — | — | — | conserver |
| `/bework` | stub 301 | — | — | — | — | NIV-10 | Résolu | rediriger (déjà) |

---

## Landings métiers (échantillon — même règle)

Chaque `/formation-ia-{métier}-btp` = **longue traîne métier**, mot-clé principal = `formation IA {métier} BTP`.  
Pilier parent = `/formation-ia-btp` (+ AO ou CDT selon métier).  
**Action** : conserver si contenu distinct ; sinon fusionner vers hub métier / pilier.  
**Interdit** : title/H1 générique « Formation IA BTP » sans le métier.

Exemples : charge d’affaires, dirigeant, assistante, métreur, électricien, plombier, maçon, TP (canalisateur, géomètre…), marchés publics.

---

## Articles blog / méthodes — rattachement silo (pas de cannibalisation commerciale)

| URL | Mot-clé principal | Silo / CTA | Action |
|-----|-------------------|------------|--------|
| `/blog/formation-ia-btp-guide-complet-2026` | guide formation IA BTP 2026 | → `/formation-ia-btp` | conserver |
| `/blog/ia-memoire-technique-appel-offres-guide-2026` | mémoire technique IA AO | → AO | conserver (pilier info MT) |
| `/blog/analyser-cctp-ia-methode-complete-20-minutes` | analyser CCTP IA | → AO | conserver |
| `/blog/analyser-ccap-ia-btp` | analyser CCAP IA | → AO | conserver |
| `/blog/analyse-dce-notebooklm-claude-btp` | analyse DCE Claude | → AO / Claude | conserver |
| `/blog/comparatif-chatgpt-claude-gemini-btp` | ChatGPT ou Claude BTP | → Claude + ChatGPT | conserver |
| `/blog/compte-rendu-chantier-ia-automatiser-gagner-temps` | CR chantier IA | → CDT | conserver |
| `/blog/chatgpt-devis-btp-methode-2026` | ChatGPT devis BTP | → ChatGPT / devis | conserver |
| `/blog/5-assistants-ia-btp-chatgpt-productivite` | 5 assistants IA BTP | → NIV-09 | conserver |
| `/blog/financer-formation-ia-btp-constructys` | financer formation IA Constructys | → financement | conserver |
| `/blog/formation-ia-paris-choisir` | choisir formation IA Paris | → Paris | conserver |

**Ne pas créer** (déjà couvert) : pages « formation IA générative BTP », « formation IA PME BTP » génériques, « formation ChatGPT BTP débutant » séparées du pilier, doorway villes hors contenu distinct.

---

## Redirects déjà en place (extraits)

| Source | Destination | Statut |
|--------|-------------|--------|
| `/formation-ia-construction` | `/formation-ia-btp` | 301 |
| `/formation-ia-btp-paris` (+ variantes) | `/formation-ia-paris` | 301 |
| `/formation-claude-*` | `/formations/maitriser-claude-ai-btp` | 301 |
| `/formation-ia-conducteur-de-travaux-btp`, `/ia-conducteur-travaux` | `/formation-ia-conducteur-de-travaux` | 301 |
| `/auteur/laure-olivie` | `/a-propos` | 301 |
| `/expert-ia-btp` | `/a-propos` | 301 |
| `/tarifs`, `/financement-constructys` | `/financement-constructys-formation-ia-btp` | 301 |
| `/bework` | NIV-10 | 301 |

---

## Règle d’attribution des mots-clés (anti-doublon)

| Mot-clé principal | URL unique |
|-------------------|------------|
| formation IA pour le BTP | `/formation-ia-btp` |
| formation ChatGPT BTP | `/formation-chatgpt-btp` |
| formation IA appels d’offres BTP | `/formation-ia-appels-offres-btp` |
| formation IA conducteur de travaux | `/formation-ia-conducteur-de-travaux` |
| formation Claude AI BTP | `/formations/maitriser-claude-ai-btp` |
| Claude AI BTP (guide) | `/claude-ai-btp` |
| formation assistants IA BTP | `/formations/assistants-ia-personnalises-btp` |
| créer application BTP avec l’IA | `/formations/developpement-web-ia-sans-coder` |
| formation IA BTP Île-de-France | `/formation-ia-btp-ile-de-france` |
| formation IA BTP Paris | `/formation-ia-paris` |
| Laure Olivié (entité) | `/a-propos` |
| formateur IA bâtiment | `/formateur-ia-btp` |
| analyser un DCE avec l’IA | `/ia-analyse-dce-btp` |
| mémoire technique avec l’IA | `/ia-memoire-technique-btp` |
| compte rendu chantier avec l’IA | `/ia-compte-rendu-chantier` |

---

## Docs obsolètes (ne plus suivre pour le maillage)

- `docs/ARBORESCENCE-SITE.md` — arborescence périmée
- `docs/ARCHITECTURE-SEO-GEO-MEDIA.md` — pillars fictifs / redirects contredits par le code

→ Remplacés par ce fichier + `docs/strategie-seo-geo-laureolivie.md`.
