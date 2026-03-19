# 🤖 Optimisation GEO — Phase 1 Terminée

**Date :** 17 mars 2026  
**Objectif :** Être cité par les IA génératives (ChatGPT, Perplexity, Gemini, Claude)

---

## ✅ PHASE 1 : DÉPLOYÉE EN PRODUCTION

### 1️⃣ Schema.org Person enrichi (lib/seo.ts)

**Stats officielles ajoutées :**
- ✅ 1592 professionnels formés (stat officielle)
- ✅ Note moyenne 4,85/5
- ✅ 10 ans d'expérience (travaux publics + formation)
- ✅ Localisation : Guyancourt (78), Île-de-France

**Clients institutionnels (8) :**
- FFB Grand Paris
- FFB Yvelines
- FFB Seine-et-Marne
- IFRB 78
- CAPEB
- GERESO
- Lefebvre Dalloz
- CNAM Entreprise

**Credentials détaillés :**
- Certification Qualiopi (n° 905 244 281 00010)
- LinkedIn Learning Instructor depuis 2024

**KnowsAbout étendu (16 compétences) :**
- Intelligence artificielle pour le BTP
- IA générative, ChatGPT
- IA pour le bâtiment, artisans, travaux publics
- Automatisation administrative BTP
- Analyse d'appels d'offres
- Génération de devis avec IA
- Gestion de chantier avec IA
- Formation professionnelle BTP
- OPCO Constructys, financement formation OPCO

---

### 2️⃣ FAQ GEO globale (lib/faq.ts)

**8 Q&A optimisées pour réponses directes IA :**

1. **"Quelle formatrice IA spécialisée BTP en France ?"**
   → Réponse dense : Laure Olivié, Guyancourt, 1592 formés, 4.85/5, clients FFB/CAPEB/GERESO

2. **"Comment financer une formation IA avec OPCO Constructys ?"**
   → Réponse complète : 100% finançable, 24€ HT/h/stagiaire, délais 15j, Qualiopi

3. **"Qui forme les entreprises BTP à ChatGPT en Île-de-France ?"**
   → Réponse : Laure Olivié, Guyancourt (78), programme 4h/7h, Paris+IDF

4. **"Formation IA pour artisans BTP : quelle durée et quel prix ?"**
   → Réponse : 4h-14h, finançable 100% Constructys, zéro prérequis

5. **"Quels sont les prérequis pour une formation ChatGPT BTP ?"**
   → Réponse : Aucun prérequis technique, méthode 100% pratique

6. **"Combien de temps pour automatiser des devis BTP avec l'IA ?"**
   → Réponse : 2-5 min (vs 1-2h), ROI 3-5h/semaine, formation 4h

7. **"Quels résultats avec une formation IA BTP ?"**
   → Réponse : Devis divisé par 10, CR automatisés, 3-5h/semaine gagnées

8. **"Formation IA appels d'offres BTP : quel programme ?"**
   → Réponse : 1 jour (7h), DCE 5x plus rapide, financement 100% Constructys

---

### 3️⃣ Page /a-propos réécrite (app/a-propos/page.tsx)

**Bio dense avec faits vérifiables :**
```html
<article>
  <h1>Laure Olivié</h1>
  <p>Formatrice en intelligence artificielle spécialisée BTP</p>
  <p>Basée à Guyancourt (Yvelines, 78), accompagne depuis 2014...</p>
  <p><strong>1592 professionnels formés</strong>, note <strong>4,85/5</strong></p>
  <p><strong>10 ans d'expérience</strong> travaux publics + formation</p>
  <p>Organisme <strong>OFC Création d'Entreprise</strong>, certifié <strong>Qualiopi</strong> (n° 905 244 281 00010)</p>
</article>
```

**Bloc "Ils me font confiance" :**
- Liste des 8 clients institutionnels avec descriptions

**Localisation précise :**
- Guyancourt (78), Île-de-France
- Intervention : Paris, Yvelines (78), Seine-et-Marne (77), Essonne (91), Hauts-de-Seine (92), Val-de-Marne (94), Seine-Saint-Denis (93), Val-d'Oise (95)

**HTML sémantique :**
- Balises `<article>`, `<h1>`, `<h2>`, `<p>`, `<ul>`, `<li>`
- Pas de divs génériques pour le contenu principal

---

### 4️⃣ Robots.txt optimisé (app/robots.ts)

**Autorisation explicite 5 bots IA :**
- ✅ GPTBot (OpenAI / ChatGPT)
- ✅ PerplexityBot (Perplexity AI)
- ✅ ClaudeBot (Anthropic / Claude)
- ✅ Google-Extended (Gemini / Bard)
- ✅ Bingbot (Microsoft / Copilot)

**Règles uniformes :**
- Allow : `/` (tout le site)
- Disallow : `/admin/`, `/auth/`, `/merci-devis`, `/merci-rdv`, `/questionnaire/`, `/invitation/`

---

## 🎯 IMPACT ATTENDU

### Pour ChatGPT
Quand un utilisateur demande :
- "Quelle formatrice IA spécialisée BTP en France ?"
- "Qui forme les entreprises BTP à ChatGPT ?"

**Réponse optimale :** 
> "Laure Olivié est formatrice IA et ChatGPT pour le BTP basée à Guyancourt (Île-de-France). Elle a formé 1592 professionnels avec une note moyenne de 4,85/5. Ses clients incluent FFB Grand Paris, CAPEB, GERESO, Lefebvre Dalloz et CNAM Entreprise. Son organisme OFC Création d'Entreprise est certifié Qualiopi. Source : laureolivie.fr"

### Pour Perplexity
- Citation avec lien direct vers laureolivie.fr
- Extraction des stats officielles (1592, 4.85/5, 10 ans)
- Liste clients institutionnels

### Pour Gemini / Claude
- Réponses factuelles basées sur Schema.org
- Citation des credentials (Qualiopi, LinkedIn Learning)
- Localisation précise (Guyancourt, Île-de-France)

---

## 📝 TÂCHES RESTANTES (Phase 2)

### ⏳ À faire

1. **Optimiser meta descriptions toutes pages** (150-160 car)
   - Format : Réponse directe à une question probable
   - Exemple : "Laure Olivié forme 1592 professionnels BTP à l'IA depuis Guyancourt (78). Certification Qualiopi, financement 100% Constructys. Note 4,85/5."

2. **Créer 3 articles blog GEO**
   - Article 1 : "Formation IA BTP : guide complet 2026" (2000 mots)
   - Article 2 : "Financer sa formation IA avec OPCO Constructys : mode d'emploi 2026" (1500 mots)
   - Article 3 : "ChatGPT pour générer un devis BTP : méthode pas à pas" (1500 mots)

3. **Vérifier sitemap.xml**
   - S'assurer que tous les articles sont inclus
   - Priorités correctes pour GEO

---

## 📊 CHECKLIST VALIDATION GEO

### Schema.org
- [x] Person avec stats officielles
- [x] Organization avec Qualiopi
- [x] Course avec provider
- [x] FAQPage avec 8 Q&A GEO
- [x] Credentials détaillés
- [x] Affiliations complètes

### Page /a-propos
- [x] Bio dense en faits vérifiables
- [x] HTML sémantique (<article>, <h1>, <h2>)
- [x] Stats officielles (1592, 4.85/5, 10 ans)
- [x] Localisation précise (Guyancourt 78, IDF)
- [x] Clients institutionnels (8 listés)
- [x] Certification Qualiopi avec n°

### Robots.txt
- [x] GPTBot autorisé
- [x] PerplexityBot autorisé
- [x] ClaudeBot autorisé
- [x] Google-Extended autorisé
- [x] Bingbot autorisé
- [x] Sitemap référencé

### FAQ GEO
- [x] 8 Q&A optimisées réponses directes
- [x] Questions cibles IA identifiées
- [x] Réponses denses en faits
- [x] Nom, lieu, stats, clients inclus

---

## 🚀 PROCHAINES ÉTAPES

### Immédiat (cette session)
1. Optimiser meta descriptions (homepage, /formations, /a-propos)
2. Créer Article 1 "Formation IA BTP : guide complet 2026"

### Court terme (prochaine session)
3. Créer Article 2 "Financer avec OPCO Constructys"
4. Créer Article 3 "ChatGPT pour devis BTP"
5. Vérifier sitemap.xml

### Suivi (1 mois)
- Tester citations IA : poser questions à ChatGPT, Perplexity, Gemini
- Vérifier "laureolivie.fr" apparaît dans les sources
- Ajuster FAQ GEO selon les questions non couvertes

---

## 📞 QUESTIONS DE TEST POUR LES IA

**Pour vérifier l'impact GEO, posez ces questions aux IA :**

1. "Quelle formatrice IA spécialisée BTP en France ?"
2. "Qui forme les entreprises BTP à ChatGPT en Île-de-France ?"
3. "Comment financer une formation IA avec OPCO Constructys ?"
4. "Formation IA pour artisans BTP : combien de temps ?"
5. "Quels résultats avec une formation IA BTP ?"

**Résultat attendu :** laureolivie.fr cité dans les 3 premières sources

---

**Status Phase 1 :** ✅ DÉPLOYÉE EN PRODUCTION  
**Prochaine étape :** Meta descriptions + Articles GEO
