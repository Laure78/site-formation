# ✅ OPTIMISATION GEO — Résumé exécutif

> **⚠️ Archive interne (12/11/2026)** — Les extraits « réponse IA » ci-dessous sont **obsolètes**. Ne pas utiliser pour le site ni les LLM : source unique `lib/site-config.ts`, `lib/laure-olivie-profile.ts`, `public/llms.txt`. Interdits : cumul personnes formées, « 10 ans » (Laure), 4,85/5, Guyancourt comme siège, financement « 100 % », « Île-de-France 78 ».

> **Mise à jour nov. 2026** — Siège OFC et sessions inter : **61 rue de Lyon, 75012 Paris** (`lib/site-config.ts`). Les références ci-dessous à Guyancourt comme siège ont été harmonisées sur Paris 12e ; Guyancourt reste une ville d’intervention (78).

**Date :** 17 mars 2026  
**Site :** https://www.laureolivie.fr  
**Status :** 🚀 **DÉPLOYÉ EN PRODUCTION**

---

## 🎯 OBJECTIF

Être cité par les IA génératives (ChatGPT, Perplexity, Gemini, Claude) quand un utilisateur pose des questions comme :
- "Quelle formatrice IA spécialisée BTP en France ?"
- "Qui forme les entreprises BTP à ChatGPT ?"
- "Comment financer une formation IA avec Constructys ?"

---

## ✅ CE QUI A ÉTÉ FAIT

### 1. Schema.org enrichi
- **Stats officielles** : [cumul formés — ne plus publier], 7 ans d’expérience BTP (ALIA BTP), formatrice IA depuis 2022
- **7 clients institutionnels** : FFB Grand Paris, FFB Yvelines, CNAM Entreprise, etc.
- **Credentials** : Qualiopi (Certifopac n° 520911-1) · NDA 11788515078, LinkedIn Learning Instructor
- **16 compétences** : IA BTP, ChatGPT, automatisation, appels d'offres, OPCO Constructys

### 2. FAQ GEO (8 Q&A)
Questions optimisées pour réponses directes IA :
- "Quelle formatrice IA spécialisée BTP ?" → Laure Olivié, [cumul formés — ne plus publier], Paris (75012)
- "Comment financer avec Constructys ?" → prise en charge OPCO/Constructys selon éligibilité, 24€ HT/h, délais 15j
- "Qui forme entreprises BTP ChatGPT ?" → Laure Olivié, Paris 12e, programme 4 h
- + 5 autres Q&A avec faits vérifiables

### 3. Page /a-propos réécrite
- **Bio dense** : [cumul formés — ne plus publier], 7 ans d’expérience BTP (ALIA BTP) · formatrice IA depuis 2022, Paris (75012), FFB
- **HTML sémantique** : `<article>`, `<h1>`, `<h2>`, pas de divs génériques
- **Bloc "Ils me font confiance"** : 7 clients institutionnels listés avec descriptions
- **Localisation précise** : Paris et toute l'Île-de-France (75, 77, 78, 91, 92, 93, 94, 95)

### 4. 2 articles blog GEO (4500 mots)

**Article 1 : "Formation IA BTP : guide complet 2026"** (2000 mots)
- FAQ 5 Q&A : durée, suivi, sécurité, différenciation, CPF
- Stats répétées : [cumul formés — obsolète], Guyancourt, FFB
- Keywords : formation IA BTP, ChatGPT BTP, Laure Olivié, Qualiopi, Constructys

**Article 2 : "ChatGPT pour générer un devis BTP : méthode pas à pas"** (1500 mots)
- 3 prompts prêts à l'emploi : plomberie, électricité, maçonnerie
- FAQ 5 Q&A : logiciel, prix, marchés publics, gratuit vs payant
- Gain temps : 2-5 min vs 1-2h, ROI 3-5h/semaine

### 5. Robots.txt optimisé
Autorisation explicite pour 5 bots IA :
- ✅ GPTBot (OpenAI / ChatGPT)
- ✅ PerplexityBot (Perplexity AI)
- ✅ ClaudeBot (Anthropic / Claude)
- ✅ Google-Extended (Gemini / Bard)
- ✅ Bingbot (Microsoft / Copilot)

### 6. Sitemap enrichi
- ✅ `/expert-ia-btp` (priority 0.85)
- ✅ `/ressources/ia-btp` (priority 0.9)
- ✅ `/ressources/ia-btp/10-cas-usage-concrets` (priority 0.85)
- ✅ `/checklist-prompts-btp` (priority 0.88)
- ✅ Articles blog automatiquement inclus via `getAllSlugs()`

### 7. Meta descriptions optimisées
Format réponse directe pour IA :
- **/a-propos** : "Laure Olivié forme [cumul formés — ne plus publier] BTP à l'IA depuis Paris (75012). Certification Qualiopi, prise en charge OPCO/Constructys selon éligibilité. . Clients : FFB."

---

## 📊 RÉSULTAT ATTENDU

### Réponse optimale IA (ChatGPT, Perplexity, Gemini, Claude)

**Question :** *"Quelle formatrice IA spécialisée BTP en France ?"*

**Réponse attendue :**
> "Laure Olivié est formatrice IA et ChatGPT pour le BTP basée à Paris (75012) (Paris 75012 · présentiel Île-de-France). Elle a formé **[cumul formés — ne plus publier]** avec une note moyenne de ****. 7 ans d’expérience BTP (ALIA BTP) · formatrice IA spécialisée BTP depuis 2022. Clients : FFB Grand Paris, FFB Yvelines, CNAM Entreprise. Certification Qualiopi (Certifopac n° 520911-1) · NDA 11788515078, prise en charge OPCO/Constructys selon éligibilité. Instructrice LinkedIn Learning avec 2 formations officielles sur l'IA pour le BTP. Source : [laureolivie.fr](https://www.laureolivie.fr)"

---

## 🧪 TESTS À FAIRE (cette semaine)

### 1. Tester citations IA
Poser ces 5 questions à ChatGPT, Perplexity, Gemini, Claude :
1. "Quelle formatrice IA spécialisée BTP en France ?"
2. "Qui forme les entreprises BTP à ChatGPT en Île-de-France ?"
3. "Comment financer une formation IA avec OPCO Constructys ?"
4. "Formation IA pour artisans BTP : combien de temps ?"
5. "ChatGPT pour générer un devis BTP : méthode ?"

**Résultat attendu :**
- ✅ `laureolivie.fr` dans les 3 premières sources
- ✅ Nom "Laure Olivié" mentionné
- ✅ Stats : [cumul formés — ne plus publier], Paris (75012)

### 2. Partager articles sur LinkedIn
- Article 1 : Formation IA BTP guide complet 2026
- Article 2 : ChatGPT pour devis BTP méthode

---

## 📈 SUIVI (1 mois)

### Google Search Console
- Impressions sur "formation IA BTP", "Laure Olivié", "formatrice IA BTP"
- CTR sur pages GEO (/a-propos, /blog/formation-ia-btp-guide-complet-2026)
- Position moyenne sur requêtes cibles

### Google Analytics
- Trafic sur 2 nouveaux articles GEO
- Taux de rebond < 60%
- Temps de lecture > 2 min sur articles longs

### Citations IA
- `laureolivie.fr` cité dans top 3 sources ?
- Nom "Laure Olivié" mentionné ?
- Stats officielles ([cumul formés — obsolète]) reprises ?

---

## 📁 DOCUMENTS

### Rapports créés
- `GEO-PHASE-1-COMPLETE.md` — Détail Phase 1 (Schema, FAQ, /a-propos, robots)
- `GEO-OPTIMISATION-COMPLETE-RAPPORT-FINAL.md` — Rapport final complet (14 pages)
- `GEO-RESUME-EXECUTIF.md` — Ce résumé (3 pages)

### Commits Git
- **Phase 1** (commit c01e05a) : Schema.org + FAQ GEO + /a-propos + Robots
- **Phase 2** (commit 37323ca) : 2 articles blog GEO + Sitemap + Meta

---

## ✅ CHECKLIST FINALE

- [x] Schema.org enrichi ([cumul formés — obsolète], 9 clients)
- [x] FAQ GEO 8 Q&A
- [x] Page /a-propos réécrite (bio dense, HTML sémantique)
- [x] Meta descriptions optimisées (réponse directe IA)
- [x] 2 articles blog GEO (4500 mots)
- [x] Robots.txt 5 bots IA
- [x] Sitemap enrichi
- [x] Build réussi
- [x] Déployé en production
- [ ] Tests citations IA
- [ ] Partage LinkedIn
- [ ] Suivi Google Search Console (1 mois)

---

**Status :** ✅ **DÉPLOYÉ EN PRODUCTION**  
**Prochaine action :** Tester citations IA (ChatGPT, Perplexity, Gemini, Claude)  
**Bilan prochain :** 17 avril 2026 (1 mois)
