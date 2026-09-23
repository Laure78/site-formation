# 🚀 SEO : Plan d'Action Rapide

**Site :** laureolivie.fr  
**Date :** 17 mars 2026  
**Statut :** Phase 1-2-3 déployées ✅

---

## ✅ CE QUI EST FAIT

### Phase 1 : E-E-A-T & Configuration (✅ DÉPLOYÉ)
- ✅ 45+ mots-clés ajoutés (automobile, artisanat, géo)
- ✅ Schema Person enrichi (credentials, affiliations, awards)
- ✅ Page `/expert-ia-btp` créée (autorité)

### Phase 2 : Metadata (✅ DÉPLOYÉ)
- ✅ 11 pages optimisées (titles 50-60 car., meta 150-160 car.)
- ✅ Pages géo (Paris et Île-de-France (présentiel uniquement))
- ✅ Keywords étendus (8-10 par page)

### Phase 3 : Cluster SEO (✅ DÉPLOYÉ)
- ✅ Hub `/ressources/ia-btp/` créé
- ✅ Article pilier "10 cas d'usage IA BTP" (1800 mots)
- ✅ Schema Article + FAQ + Breadcrumb
- ✅ Maillage interne (6 liens formations)

---

## 🎯 PRIORITÉS IMMÉDIATES (Cette semaine)

### 1️⃣ Vérifier indexation Google (15 min)

```bash
# Google Search Console
1. Aller sur https://search.google.com/search-console
2. Sélectionner laureolivie.fr
3. Menu "Indexation > Pages"
4. Vérifier que les nouvelles pages sont indexées :
   - /expert-ia-btp
   - /ressources/ia-btp
   - /ressources/ia-btp/10-cas-usage-concrets
```

**Action si non indexé :**
- Demander l'indexation manuelle (bouton "Demander une indexation")

---

### 2️⃣ Créer 2 articles supplémentaires (6h)

**Article #2 : ChatGPT pour le bâtiment** [PRIORITÉ 1]

```bash
# Créer le fichier
touch app/ressources/ia-btp/chatgpt-batiment-guide-complet/page.tsx

# Contenu (1500 mots) :
- Qu'est-ce que ChatGPT ?
- Pourquoi ChatGPT est idéal pour le bâtiment
- 7 cas d'usage ChatGPT bâtiment (devis, emails, CR, etc.)
- Guide pas à pas : créer son premier prompt
- FAQ (5 questions)
- Maillage interne (5 liens)
```

**Article #3 : IA pour appels d'offres BTP** [PRIORITÉ 1]

```bash
# Créer le fichier
touch app/ressources/ia-btp/ia-appels-offres-5x-plus-vite/page.tsx

# Contenu (1500 mots) :
- Pourquoi les appels d'offres prennent du temps
- Comment l'IA analyse un DCE en 10 min
- Cas d'usage : analyser CCTP, extraire exigences, générer mémoire technique
- Témoignages clients (2-3)
- FAQ (5 questions)
- Maillage interne (5 liens)
```

**Template à suivre :**
- Utiliser la structure de `/ressources/ia-btp/10-cas-usage-concrets/page.tsx`
- Schema Article + FAQ + Breadcrumb
- Maillage interne vers formations
- CTAs conversion (diagnostic + formations)

---

### 3️⃣ Ajouter maillage interne (2h)

**Ajouter section "Ressources utiles" sur 8 pages formations :**

Fichiers à modifier :
1. `app/formations/ia-appels-offre-btp/page.tsx`
2. `app/formations/ia-rh-btp/page.tsx`
3. `app/formations/ia-travaux-publics/page.tsx`
4. `app/formations/ia-productivite-chantier/page.tsx`
5. `app/formation-ia-btp-paris/page.tsx`
6. `app/formations/ia-btp-lyon/page.tsx`
7. `app/formations/ia-btp-bordeaux/page.tsx`
8. `app/formations/ia-btp-lille/page.tsx`

**Code à ajouter** (avant le dernier `</div>` de la page) :

```tsx
{/* Ressources utiles — Maillage interne SEO */}
<section className="border-t border-slate-200 bg-slate-50 px-4 py-12">
  <div className="mx-auto max-w-5xl">
    <h2 className="font-display text-2xl font-bold text-slate-900">
      Ressources utiles
    </h2>
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      <Link
        href="/ressources/ia-btp/10-cas-usage-concrets"
        className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[var(--accent)] hover:shadow-md"
      >
        <h3 className="font-semibold text-slate-900 group-hover:text-[var(--accent)]">
          10 cas d'usage IA BTP
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Applications concrètes de l'IA dans le bâtiment
        </p>
        <span className="mt-4 inline-block text-sm font-medium text-[var(--accent)]">
          Lire l'article →
        </span>
      </Link>

      <Link
        href="/expert-ia-btp"
        className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[var(--accent)] hover:shadow-md"
      >
        <h3 className="font-semibold text-slate-900 group-hover:text-[var(--accent)]">
          Expert IA BTP
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Découvrez l'expertise de Laure Olivié
        </p>
        <span className="mt-4 inline-block text-sm font-medium text-[var(--accent)]">
          En savoir plus →
        </span>
      </Link>

      <Link
        href="/diagnostic-ia-btp"
        className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[var(--accent)] hover:shadow-md"
      >
        <h3 className="font-semibold text-slate-900 group-hover:text-[var(--accent)]">
          Diagnostic gratuit
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Calculez votre gain de temps potentiel
        </p>
        <span className="mt-4 inline-block text-sm font-medium text-[var(--accent)]">
          Faire le diagnostic →
        </span>
      </Link>
    </div>
  </div>
</section>
```

---

### 4️⃣ Optimiser ALT images (1h)

**Audit des images :**

```bash
# Lister les images sans ALT ou avec ALT vide
cd /Users/laure/Documents/site-formation
rg 'alt=""' app/ --count
rg 'alt="image"' app/ --count

# Lister toutes les images utilisées
rg '<Image' app/ -A 2 | grep -E '(src=|alt=)'
```

**Format ALT recommandé :**
```
"[Contexte métier] — [Action] — [Bénéfice] — Laure Olivié"
```

**Exemples :**
- ❌ Mauvais : `alt="photo"`
- ✅ Bon : `alt="Conducteur de travaux utilisant ChatGPT pour compte-rendu chantier — Formation IA BTP — Laure Olivié"`

**Top 10 images à optimiser en priorité :**
1. `/images/laure-olivie.png` (page expert)
2. `/images/laure-olivie-portrait-rond-fond-bleu-formation-ia-btp.png` (homepage)
3. `/images/laure-linkedin-graz.png`
4. `/images/formation-ia-btp-entreprise.png`
5. `/images/ouvrier-plan-chantier.png`
6. `/images/architecte-concentration.png`
7. `/images/linkedin-learning-recrutement-btp.png`
8. Banner formations (si existe)
9. Logo OFC
10. Photos profil pages formations

---

## 📊 SUIVI HEBDOMADAIRE (Tous les lundis)

### Checklist monitoring (30 min)

```bash
# 1. Google Search Console
- Aller sur https://search.google.com/search-console
- Noter impressions/clics/position (vs semaine dernière)
- Vérifier nouvelles pages indexées
- Checker erreurs 404

# 2. Google Analytics
- Trafic organique (semaine vs semaine)
- Pages les plus vues
- Taux de conversion (RDV, diagnostics)

# 3. Positions mots-clés (Google Search Console > Requêtes)
- formation IA BTP
- formation ChatGPT BTP
- IA pour le BTP
- formation IA artisan
- IA appels d'offres BTP
```

**Fichier tracking :** Créer un Google Sheet avec colonnes :
| Date | Impressions | Clics | CTR | Position moyenne | Conversions |
|------|-------------|-------|-----|------------------|-------------|
| 17/03/2026 | ... | ... | ... | ... | ... |

---

## 🎯 OBJECTIFS 30 JOURS

| Objectif | Mesure actuelle | Cible 30j | Action |
|----------|----------------|-----------|--------|
| **Articles cluster SEO** | 1 | 3 | Créer 2 articles supplémentaires |
| **Pages avec maillage interne** | 0 | 8 | Ajouter section "Ressources utiles" |
| **Images ALT optimisées** | ~30% | 80% | Audit + correction ALT |
| **Trafic organique** | Baseline | +15% | Monitoring hebdo |
| **Position "formation IA BTP"** | ? | Top 10 | Vérif. Search Console |

---

## 🔥 QUICK WINS (Gains rapides)

### 1. Ajouter liens vers `/expert-ia-btp` partout (30 min)

**Pages à modifier :**
- Homepage (section "Pourquoi Laure Olivié")
- Footer (lien "À propos")
- Page `/a-propos` (lien "En savoir plus")

**Anchor text optimisés :**
- "Expert IA BTP"
- "Formatrice IA certifiée"
- "LinkedIn Learning Instructor"

---

### 2. Demander indexation manuelle Google (10 min)

**Nouvelles pages à indexer :**
```bash
1. https://www.laureolivie.fr/expert-ia-btp
2. https://www.laureolivie.fr/ressources/ia-btp
3. https://www.laureolivie.fr/ressources/ia-btp/10-cas-usage-concrets
```

**Procédure :**
1. Google Search Console
2. Menu "Inspection de l'URL"
3. Coller l'URL
4. Cliquer "Demander une indexation"

---

### 3. Partager l'article pilier sur LinkedIn (15 min)

**Post LinkedIn suggéré :**

```
🚀 Nouveau guide : "IA dans le BTP : 10 cas d'usage concrets"

Découvrez comment l'intelligence artificielle transforme 
les entreprises du bâtiment en 2026 :

✅ Devis automatisés (80% de temps gagné)
✅ Appels d'offres analysés 5x plus vite
✅ Comptes rendus chantier en 5 min
✅ Et 7 autres cas d'usage opérationnels

📊 Chaque cas inclut :
→ Exemple concret
→ Gain de temps mesuré
→ ROI immédiat

Pour les artisans, PME BTP, conducteurs de travaux.

👉 Lire le guide complet : 
https://www.laureolivie.fr/ressources/ia-btp/10-cas-usage-concrets

#IABTP #BTP #Batiment #IntelligenceArtificielle #ChatGPT
```

---

## 📞 AIDE & SUPPORT

**Questions ?**

Consultez les documents :
- `RAPPORT-SEO-COMPLET.md` — Rapport détaillé des optimisations
- `SEO-OPTIMISATION-COMPLETE.md` — Guide complet initial
- `.cursor/CLAUDE.md` — Context professionnel

**Besoin d'assistance technique ?**
- Email : contact@laureolivie.fr
- Téléphone : 06 95 66 18 18

---

**🎉 Vous êtes sur la bonne voie ! Continuez avec les 3 actions prioritaires cette semaine.**
