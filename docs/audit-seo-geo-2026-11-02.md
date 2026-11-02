# Audit SEO / GEO — laureolivie.fr

**Date** : 2026-11-02  
**Périmètre** : code local (`main`, sans commit/push) + échantillon production `https://www.laureolivie.fr`  
**Objectif** : fiabilité, indexabilité et pertinence éditoriale pour les moteurs de recherche et les assistants (mention / recommandation / citation avec lien — sans garantie de résultat).

---

## 1. Diagnostic confirmé (avec preuves)

| ID | Priorité | Statut | Constat | Preuve | Conséquence probable | Correction |
|----|----------|--------|---------|--------|----------------------|------------|
| D1 | **P1** | Confirmé (prod) | JSON-LD `Course` sur `/formation-ia-conducteur-de-travaux` indiquait **4 h** et **120 €** alors que la page renvoie au programme **NIV-03 (7 h, 310 € HT/participant)** | `curl -s https://www.laureolivie.fr/formation-ia-conducteur-de-travaux \| rg 'courseWorkload\|"price"'` → `PT4H`, `"120"` (2026-11-02) ; code : `app/formation-ia-conducteur-de-travaux/page.tsx` (offre héritée NIV-01) | Données structurées fausses pour les crawlers IA / Google ; risque de réponses incohérentes sur durée/tarif CDT | Alignement sur `formationTimeRequiredIso('NIV-03')` + `TARIF_PARTICIPANT_NIV03_HT` via `buildFormationFicheCourseNode` |
| D2 | **P1** | Confirmé (écarts code/prod) | `robots.txt` production bloque `/admin/` et `/acces-admin` ; le dépôt local n’avait que `/api/`, `/auth/`, `/espace-apprenant/` | Prod : `curl -s https://www.laureolivie.fr/robots.txt` ; local avant fix : `lib/robots-txt.ts` | Régression au prochain déploiement : zones admin re-crawlables | Ajout `/admin/`, `/acces-admin` dans `PRIVATE_DISALLOW` + assert |
| D3 | **P2** | Confirmé (code) | Formulations « Laure Olivié, organisme certifié Qualiopi » (personne = organisme) sur fichiers GEO à fort signal | `lib/llms-txt-content.ts`, `lib/formation-ia-conducteur-de-travaux-landing.ts`, `lib/a-propos-page-config.ts` | Confusion entité Person / Organization pour les modèles | Reformulation « OFC Création d'Entreprise (marque Laure Olivié) » |
| D4 | **P2** | Confirmé (intentionnel) | Deux URL complémentaires conducteur : landing métier vs fiche catalogue | `.cursorrules` ; prod : canonicals distinctes 200 ; sitemap contient les deux | Cannibalisation **hypothèse** (pas de GSC dans cet audit) | Conserver les deux ; maillage `catalogueHref` + `llms.txt` déjà en place |
| D5 | **P2** | Confirmé | Anciens rapports GEO racine (`GEO-*.md`) citent encore 1 500 formés, 10 ans, Guyancourt siège, 4,85/5 | Fichiers `GEO-OPTIMISATION-COMPLETE-RAPPORT-FINAL.md` etc. | **Non servis** au public ; ne pas utiliser comme source commerciale | Référence unique : `lib/site-config.ts` + `public/llms.txt` |
| D6 | **Hypothèse** | Non vérifiable ici | Cloudflare « AI bots disallow » mentionné dans `AUDIT-SEO-GEO.md` (2025) | Pas d’accès dashboard CF ; `robots.txt` prod autorise GPTBot, ClaudeBot, etc. | Un blocage edge resterait invisible depuis le HTML | Contrôle manuel Cloudflare → Security → Bots ; comparer avec [OpenAI crawlers](https://platform.openai.com/docs/gptbot) (consulté 2026-11-02) |

### Architecture conducteur de travaux (vérifiée)

| URL | Rôle | H1 (prod 2026-11-02) | Canonical |
|-----|------|----------------------|-----------|
| `/formation-ia-conducteur-de-travaux` | Landing métier / guide SEO | Formation IA pour Conducteurs de Travaux | `https://www.laureolivie.fr/formation-ia-conducteur-de-travaux` |
| `/formations/ia-conduite-travaux-suivi-chantier` | Fiche catalogue Qualiopi NIV-03 | Programme Niveau 2 : suivi de chantier, CR et DOE avec l’IA (7 h) | `https://www.laureolivie.fr/formations/ia-conduite-travaux-suivi-chantier` |

**Durées/tarifs NIV-03** : `data/formations.ts` → 7 h, `TARIF_PARTICIPANT_NIV03_HT` = 310 € (via `lib/tarifs-catalogue-participant.ts`). **Pas de contradiction** entre fiche catalogue et `llms.txt`.

---

## 2. Tableau des contradictions factuelles (sources code)

| Information | Valeur A | Source A | Valeur B | Source B | Décision audit |
|-------------|----------|----------|----------|----------|----------------|
| Expérience BTP Laure | 7 ans | `lib/site-config.ts` | 10 ans | `lib/formateurs/catalogue-formateurs-profiles.ts` (profil tiers) | **Conserver 7 ans** pour Laure/OFC ; vérifier profils formateurs individuels |
| Siège / inter | Paris 12e, 61 rue de Lyon | `lib/site-config.ts` | Guyancourt = siège | Anciens docs GEO | **Paris 12e** uniquement ; Guyancourt = ville d’intervention (78) OK |
| Satisfaction | 4,45/5 (20 répondants) | `lib/site-config.ts` | 4,85/5 | Docs GEO obsolètes | **4,45/5** |
| Personnes formées (cumul) | Absent (supprimé) | `.cursorrules` | 1 500+ | Docs GEO obsolètes | **Ne pas republier** |
| JSON-LD CDT landing | 7 h / 310 € | Après correction | 4 h / 120 € | Prod avant déploiement | Corrigé localement |

---

## 3. Exploration & indexabilité (prod + code)

| Contrôle | Résultat | Statut |
|----------|----------|--------|
| `/robots.txt` | HTTP 200 ; Allow `/` pour Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc. | Confirmé prod |
| `/sitemap.xml` | HTTP 200 | Confirmé prod (contredit l’item « sitemap 500 » de l’ancien `AUDIT-SEO-GEO.md`) |
| Pages clés CDT | HTTP 200, `index, follow`, canonical auto-référencée | Confirmé prod |
| Contenu SSR | H1 présent dans HTML initial (curl) | Confirmé prod |
| `public/llms.txt` | Présent, sync depuis `lib/llms-txt-content.ts` | OK (`npm run test:llms-txt`) |

**Documentation robots consultée (2026-11-02)** :  
- OpenAI — GPTBot / OAI-SearchBot : https://platform.openai.com/docs/gptbot  
- Google — robots meta : https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag  
- Perplexity — PerplexityBot (politique publique référencée dans le projet via liste `AI_BOTS` dans `lib/robots-txt.ts`)

*Limitation* : un test `curl` avec User-Agent custom ne prouve pas le comportement d’un robot authentique derrière Cloudflare.

---

## 4. Cartographie des 7 intentions de recherche (sans nouvelle URL)

| Requête cible | Page(s) existante(s) | Action |
|---------------|----------------------|--------|
| 1. Quel organisme de formation IA BTP choisir en IDF ? | `/formation-ia-btp-ile-de-france`, `/a-propos`, `/formation-ia-btp` | Enrichir « En bref » + preuves Qualiopi ; lien depuis hub IDF |
| 2. Où former conducteurs de travaux à ChatGPT/Claude ? | `/formation-ia-conducteur-de-travaux`, `/formations/ia-conduite-travaux-suivi-chantier` | **Corrigé** JSON-LD + voix organisme ; comparatif outils déjà en FAQ landing |
| 3. Organismes IA pour PME du bâtiment | `/formation-ia-dirigeant-pme-btp`, `/formations`, `/formation-ia-btp` | Conserver ; maillage vers catalogue |
| 4. Formation IA appels d’offres BTP | `/formations/ia-appels-offre-btp`, `/ia-analyse-dce-btp`, `/ia-memoire-technique-btp` | Conserver cluster tâches |
| 5. Quel formateur IA construction ? | `/a-propos` (organisme), `/formateurs` | Éviter nouvelle page `/formateur-ia-btp` (règle projet) |
| 6. ChatGPT ou Claude pour analyser un DCE ? | `/ia-analyse-dce-btp`, blog `analyse-dce-ia-exemple-reel`, `/claude-ai-btp` | Préparer **protocole comparatif** (brouillon interne, pas de résultats inventés) |
| 7. Quelle formation Claude pour le BTP ? | `/formations/maitriser-claude-ai-btp`, `/claude-ai-btp` | Conserver ; pas de duplication |

---

## 5. Corrections réalisées (fichiers)

| Fichier | Modification |
|---------|--------------|
| `app/formation-ia-conducteur-de-travaux/page.tsx` | JSON-LD Course NIV-03 : PT7H, 310 €, `courseCode`, helper catalogue |
| `lib/robots-txt.ts` | Disallow `/admin/`, `/acces-admin` |
| `scripts/assert-robots-txt.ts` | Assert aligné |
| `lib/llms-txt-content.ts` | Voix organisme + date 2026-11-02 |
| `public/llms.txt` | Sync (`npm run llms:sync`) |
| `lib/formation-ia-conducteur-de-travaux-landing.ts` | Intro organisme |
| `lib/a-propos-page-config.ts` | Bloc « En bref » organisme |

---

## 6. Contrôles exécutés

| Script | Résultat |
|--------|----------|
| `npm run test:robots-txt` | OK |
| `npm run test:llms-txt` | OK |
| `npm run validate:schema` | OK (Person, Organization, Course catalogue NIV-01→10, FAQ blog) |
| `eslint` (fichiers touchés) | OK (warnings préexistants mineurs sur la page conducteur) |
| `npm run build` | **Non exécuté** (coût/temps ; changements localisés) |

---

## 7. Données à confirmer côté métier

- Tarifs intra et devis spécifiques (affichage « sur devis » OK).  
- Profils formateurs avec « 10 ans » dans `catalogue-formateurs-profiles.ts` : validation humaine par profil.  
- Chiffre LinkedIn « 15 000 » abonnés (`lib/site-config.ts`) : mise à jour manuelle périodique.

---

## 8. Actions manuelles (services externes)

1. **Cloudflare** : vérifier qu’aucune règle « Block AI bots » ne contredit `robots.txt` (Allow GPTBot, ClaudeBot, etc.).  
2. **Google Search Console** : exporter requêtes « conducteur de travaux » / « formation IA BTP » pour trancher cannibalisation landing vs NIV-03.  
3. **France Num / annuaires** : contrôler cohérence adresse Paris 12e sur https://www.francenum.gouv.fr/activateurs/ofc-creation-dentreprise  
4. **Déploiement** : pousser les correctifs pour corriger le JSON-LD CDT en production.

---

## 9. Protocole de mesure GEO (sans résultats préfabriqués)

Pour chaque vague (ex. mensuelle), noter séparément **mention** | **recommandation organisme** | **citation URL** :

1. Requêtes fixes (ex. les 7 du §4).  
2. Session neuve, même région (FR), recherche Web activée si disponible.  
3. Noter : date, plateforme, modèle affiché, compte (gratuit/plus).  
4. Capturer screenshot ou export ; URL citée si présente.  
5. Colonnes : « Non testé » ≠ « Absent ».

**Ne pas** utiliser les réponses de l’assistant Cursor comme preuve de visibilité publique.

---

## 10. Trois prochaines actions éditoriales prioritaires

1. **Guide de choix** « Comment choisir une formation IA BTP en Île-de-France » — section sur `/formation-ia-btp-ile-de-france` (critères : Qualiopi, présentiel, programme, financement prudent).  
2. **Méthode DCE** — enrichir `/ia-analyse-dce-btp` avec protocole contrôle humain + liens NIV-02 (sans comparatif chiffré inventé).  
3. **Harmonisation voix organisme** — campagne ciblée sur les ~30 landings métier encore en « Laure Olivié, organisme… » (grep `Laure Olivié, organisme`).

---

*Aucune de ces actions ne garantit citation ou classement dans ChatGPT, Claude, Gemini ou Perplexity.*
