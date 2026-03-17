# ✅ Règle Cursor : Prompts métier blog BTP

**Date :** 17 mars 2026  
**Statut :** ✅ ACTIVÉE

---

## 🎯 RÈGLE CRÉÉE

**Fichier :** `.cursor/rules/prompts-blog-btp.md`

Cette règle Cursor s'applique automatiquement lors de la création ou modification d'articles de blog sur laureolivie.fr.

---

## 📋 RÉSUMÉ DE LA RÈGLE

### Contexte
Les prompts ChatGPT métier BTP sont utilisés **UNIQUEMENT dans les articles de blog**.
Pas dans les pages formations, ni dans les pages statiques.

### 4 règles essentielles

1. ❌ **Jamais en début d'article**
   - Minimum 2 H2 développés avant le premier prompt
   - Le lecteur doit comprendre le contexte d'abord

2. ✅ **Maximum 2 prompts par article**
   - 1 prompt = standard
   - 2 prompts = seulement si 2 cas d'usage distincts
   - 3+ prompts = interdit

3. ✅ **Toujours précédé d'une explication**
   - 2-3 phrases avant chaque prompt
   - Expliquer : quand l'utiliser + ce qu'il produit

4. ✅ **Format visuel cohérent**
   - Composant `<EncadrePrompt />` ou bloc markdown
   - Format actionnable (copier-coller direct)

---

## 📊 MAPPING CATÉGORIES → NOMBRE DE PROMPTS

| Catégorie | Nb prompts | Position |
|-----------|------------|----------|
| **Devis & chiffrage** | 1 | Après H2 n°2 |
| **Appels d'offres** | 2 | H2 n°2 + H2 n°3 |
| **ChatGPT & bonnes pratiques** | 2 | H2 n°2 + H2 n°3 |
| **IA par métier** | 1 | Après H2 n°2 |
| **RH & recrutement** | 1 | Après H2 n°2 |
| **Productivité & emails** | 2 | H2 n°2 + H2 n°3 |
| **Financement OPCO** | 0 | Article informatif |
| **Formations par région** | 0 | Article local |
| **Formateurs & prospection** | 0 | Article B2B |

---

## 🔧 STRUCTURE D'UN PROMPT BTP

**Format obligatoire :**

```
Tu es [rôle BTP précis].
[Contexte situation — 1-2 phrases].
[Instruction précise].
[Format de sortie — liste, tableau, email].
[Contraintes métier — vocabulaire BTP, ton].
```

**Exemple :**

```
Tu es artisan maçon indépendant en Île-de-France.
Un client particulier te demande un devis pour la construction
d'une extension de 25m² en parpaing avec dalle béton.
Rédige un devis professionnel incluant : description des travaux,
fournitures, main d'œuvre, délai d'exécution et conditions de paiement.
Utilise un ton professionnel. Prix en euros HT avec TVA à 10%.
```

---

## 🚀 COMMENT UTILISER CETTE RÈGLE

### 1. Créer un nouvel article avec prompt

**Commande Cursor :**

```
Génère un article de blog catégorie "Devis & chiffrage".
Titre : "Comment rédiger un devis BTP avec ChatGPT"
Public : artisans du bâtiment
Inclure 1 prompt ChatGPT selon la règle prompts-blog-btp.md
```

Cursor appliquera automatiquement :
- ✅ Placement après le 2e H2
- ✅ Explication avant le prompt
- ✅ Format `<EncadrePrompt />`
- ✅ Structure prompt BTP (rôle + contexte + instruction)

---

### 2. Vérifier un article existant

**Commande Cursor :**

```
Lis l'article /app/blog/[slug]/page.tsx et vérifie
la conformité à la règle prompts-blog-btp.md :
1. Prompt placé après 2 H2 minimum ?
2. Explication 2-3 phrases avant ?
3. Format <EncadrePrompt /> correct ?
Corrige si besoin.
```

---

### 3. Ajouter un prompt à un article existant

**Commande Cursor :**

```
Dans l'article /app/blog/devis-btp-chatgpt/page.tsx,
ajoute 1 prompt ChatGPT pour artisans plombiers.
Respecte la règle prompts-blog-btp.md :
- Place après le 2e H2
- Ajoute explication avant
- Format : <EncadrePrompt />
```

---

## ✅ CHECKLIST AVANT PUBLICATION

Avant de publier un article, vérifier :

- [ ] **Placement :** Prompt après 2 H2 minimum
- [ ] **Explication :** 2-3 phrases avant le prompt
- [ ] **Nombre :** Respecte le mapping catégorie (1 ou 2 prompts max)
- [ ] **Structure prompt :** Rôle + Contexte + Instruction + Format + Contraintes
- [ ] **Format visuel :** `<EncadrePrompt />` correctement formaté
- [ ] **Actionnable :** Le lecteur peut copier-coller tel quel
- [ ] **Section adaptation :** "Comment adapter ce prompt" si pertinent
- [ ] **CTA final :** Lien vers formation correspondante

---

## 📐 STRUCTURE TYPE D'UN ARTICLE

```
1. [H1 Titre]

2. [Introduction — 100-150 mots]
   → Problème terrain BTP

3. [H2 — Partie 1]
   → Développement contexte

4. [H2 — Partie 2]
   → Développement explication
   → Explication du prompt (2-3 phrases)
   → ▶ PROMPT #1 ◀

5. [H2 — Partie 3]
   → Comment adapter le prompt
   → (Optionnel) ▶ PROMPT #2 ◀

6. [H2 — Conclusion]
   → Synthèse + conseil

7. [FAQ — 3 questions]

8. [CTA — Formation]
```

---

## 🎓 EXEMPLE COMPLET

Voir le fichier `.cursor/rules/prompts-blog-btp.md` section "EXEMPLE COMPLET D'ARTICLE AVEC PROMPT" pour un exemple détaillé d'article avec :
- Structure complète
- Prompt formaté
- Section adaptation
- FAQ
- CTA

---

## 📂 FICHIERS CONCERNÉS

Cette règle s'applique automatiquement à :

- `/content/blog/*.mdx` (si blog MDX)
- `/app/blog/*/page.tsx` (si blog Next.js)
- `/app/ressources/*/page.tsx` (articles ressources)

---

## 🔄 MISE À JOUR DE LA RÈGLE

Pour modifier cette règle :

1. Éditer `.cursor/rules/prompts-blog-btp.md`
2. Cursor appliquera automatiquement les changements
3. Pas besoin de redémarrer Cursor

---

## ❓ QUESTIONS FRÉQUENTES

**Q : Puis-je mettre 3 prompts dans un article très long ?**
R : Non, maximum 2 prompts. Si le sujet nécessite plus, créer 2 articles distincts.

**Q : Le prompt peut-il être en début d'article si c'est le sujet principal ?**
R : Non, jamais. Le lecteur doit d'abord comprendre le contexte (minimum 2 H2).

**Q : Dois-je mettre des prompts dans les pages formations ?**
R : Non, uniquement dans les articles de blog. Les pages formations ont des CTA vers formations.

**Q : Comment savoir combien de prompts mettre selon la catégorie ?**
R : Consulter le tableau de mapping dans `.cursor/rules/prompts-blog-btp.md`

---

## 🎉 AVANTAGES

✅ **Cohérence éditoriale** : Tous les articles suivent la même structure
✅ **Valeur ajoutée** : Prompts actionnables pour les lecteurs BTP
✅ **SEO** : Contenu riche et structuré
✅ **Gain de temps** : Cursor génère automatiquement le format correct
✅ **Qualité** : Structure prompt BTP professionnelle

---

**La règle est maintenant active dans Cursor !**

Tous vos futurs articles de blog respecteront automatiquement ces standards.
