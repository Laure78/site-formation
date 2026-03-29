# CURSOR RULE — Prompts métier dans les articles de blog
# Site : laureolivie.fr | Laure Olivié, formatrice IA BTP

---

## CONTEXTE

Les prompts métier sont utilisés UNIQUEMENT dans les articles de blog.
Pas dans les pages formation, pas dans les pages statiques.

Chaque article de blog contient des **prompts ChatGPT prêts à l'emploi**
destinés aux lecteurs BTP (artisans, conducteurs de travaux, chefs d'entreprise).
Ces prompts sont la valeur ajoutée pédagogique de l'article.

---

## STRUCTURE D'UN ARTICLE — OÙ PLACER LES PROMPTS

```
ARTICLE
│
├── [Titre H1]
├── [Introduction — 100-150 mots, problème terrain BTP]
│
├── [H2 — Partie 1]
│   └── [Développement]
│
├── [H2 — Partie 2]
│   └── [Développement]
│   └── ▶ PROMPT #1 ICI ◀ — après le 2e H2
│       → Le premier prompt arrive après que le lecteur
│         comprend le contexte. Pas avant.
│
├── [H2 — Partie 3]
│   └── [Développement]
│   └── ▶ PROMPT #2 ICI ◀ (optionnel, si sujet complexe)
│       → Seulement si le sujet justifie un 2e exemple
│
├── [H2 — Partie 4 ou Conclusion]
│   └── [Synthèse + conseil]
│
├── [FAQ — 3 questions/réponses]
│
└── [CTA — lien vers la formation correspondante]
```

---

## RÈGLES DE PLACEMENT

### Règle 1 — Jamais en premier
Le prompt ne s'affiche jamais en ouverture d'article.
Le lecteur doit d'abord comprendre POURQUOI ce prompt est utile.
Minimum : 2 H2 développés avant le premier prompt.

### Règle 2 — Maximum 2 prompts par article
- 1 prompt = standard pour la majorité des articles
- 2 prompts = uniquement si l'article couvre 2 cas d'usage distincts
- 3 prompts ou plus = interdit, l'article devient un simple dump de prompts

### Règle 3 — Le prompt suit son explication
Chaque prompt est précédé de 2-3 phrases qui expliquent :
- dans quelle situation utiliser ce prompt
- ce qu'il va produire concrètement

### Règle 4 — Format visuel du prompt dans l'article
Utiliser le composant MDX <EncadrePrompt /> ou un bloc code markdown :

```mdx
<EncadrePrompt
  titre="Prompt à copier dans ChatGPT"
  contenu="[texte du prompt]"
/>
```

Ou en markdown simple :

```
> **Prompt à copier dans ChatGPT**
>
> [texte du prompt]
```

---

## STRUCTURE D'UN PROMPT MÉTIER BTP

Chaque prompt intégré dans un article respecte ce format :

```
Tu es [rôle BTP précis — ex: conducteur de travaux spécialisé en gros œuvre].
[Contexte du chantier ou de la situation — 1-2 phrases].
[Instruction précise — ce que ChatGPT doit produire].
[Contrainte de format — ex: liste à puces, tableau, email formel].
[Contrainte métier — ex: respecter le vocabulaire BTP, rester factuel].
```

### Exemple concret (article catégorie "Devis & chiffrage") :
```
Tu es artisan maçon indépendant en Île-de-France.
Un client particulier te demande un devis pour la construction
d'une extension de 25m² en parpaing avec dalle béton.
Rédige un devis professionnel incluant : description des travaux,
fournitures, main d'œuvre, délai d'exécution et conditions de paiement.
Utilise un ton professionnel. Prix en euros HT avec TVA à 10%.
```

---

## MAPPING CATÉGORIE → NB DE PROMPTS → POSITION

```
| Catégorie                  | Nb prompts | Position dans l'article      |
|----------------------------|------------|------------------------------|
| Devis & chiffrage          | 1          | Après H2 n°2                 |
| Appels d'offres            | 2          | Après H2 n°2 + après H2 n°3  |
| Financement OPCO           | 0          | Pas de prompt (article info) |
| ChatGPT & bonnes pratiques | 2          | Après H2 n°2 + après H2 n°3  |
| IA par métier              | 1          | Après H2 n°2                 |
| RH & recrutement           | 1          | Après H2 n°2                 |
| Productivité & emails      | 2          | Après H2 n°2 + après H2 n°3  |
| Formations par région      | 0          | Pas de prompt (article local)|
| Formateurs & prospection   | 0          | Pas de prompt (article B2B)  |
```

---

## COMMANDES CURSOR — INTÉGRATION PROMPT DANS UN ARTICLE

### Générer le prompt pour un article existant :
```
Dans l'article /content/blog/[slug].mdx,
génère 1 prompt ChatGPT destiné aux [PUBLIC BTP] sur le sujet [SUJET].
Place-le après le 2e H2 dans un bloc <EncadrePrompt />.
Format du prompt : rôle BTP + contexte + instruction + format de sortie.
```

### Générer un article complet avec prompt intégré :
```
Génère l'article de blog catégorie "[CATÉGORIE]" pour laureolivie.fr.
Titre : [TITRE]
Public : [PROFIL BTP]
Inclure [1 ou 2] prompt(s) ChatGPT selon le tableau de mapping.
Placer le premier prompt après le 2e H2.
Format : MDX avec frontmatter + composant <EncadrePrompt />.
```

### Vérifier le placement dans un article existant :
```
Lis l'article /content/blog/[slug].mdx et vérifie :
1. Le prompt est-il placé après au moins 2 H2 ?
2. Le prompt est-il précédé d'une explication de 2-3 phrases ?
3. Le format <EncadrePrompt /> est-il correct ?
Sinon, corrige le placement.
```

---

## EXEMPLE COMPLET D'ARTICLE AVEC PROMPT

```mdx
---
title: "Comment rédiger un devis BTP professionnel avec ChatGPT"
category: "Devis & chiffrage"
date: "2026-03-17"
---

# Comment rédiger un devis BTP professionnel avec ChatGPT

La rédaction de devis représente 15 à 20% du temps administratif d'un artisan.
ChatGPT peut diviser ce temps par 3 tout en garantissant un niveau de professionnalisme élevé.

## Pourquoi les devis prennent du temps

Rédiger un devis nécessite de structurer plusieurs informations...
[développement 150 mots]

## Les éléments obligatoires d'un devis BTP

Un devis conforme doit contenir...
[développement 150 mots]

**Voici comment automatiser cette tâche avec ChatGPT.**

Copiez ce prompt dans ChatGPT pour générer un devis professionnel en quelques secondes :

<EncadrePrompt
  titre="Prompt à copier dans ChatGPT"
  contenu="Tu es artisan maçon indépendant en Île-de-France.
Un client particulier te demande un devis pour la construction d'une extension
de 25m² en parpaing avec dalle béton.
Rédige un devis professionnel incluant : description des travaux, fournitures,
main d'œuvre, délai d'exécution et conditions de paiement.
Utilise un ton professionnel. Prix en euros HT avec TVA à 10%."
/>

## Comment adapter ce prompt à votre situation

Pour obtenir un devis personnalisé...
[développement 100 mots]

## Conclusion

ChatGPT ne remplace pas votre expertise métier...
[synthèse 80 mots]

## FAQ

**Combien de temps faut-il pour générer un devis avec ChatGPT ?**
Entre 30 secondes et 2 minutes...

**Le devis généré est-il conforme aux obligations légales ?**
ChatGPT génère une structure professionnelle, mais vous devez vérifier...

**Puis-je utiliser ce prompt pour d'autres corps de métier ?**
Oui, remplacez simplement "maçon" par votre métier...

## Aller plus loin

Vous souhaitez maîtriser ChatGPT pour toutes vos tâches administratives ?
👉 [Découvrez le catalogue des formations IA BTP](/formations)
```

---

## CHECKLIST AVANT PUBLICATION D'UN ARTICLE

- [ ] Le prompt est placé **après le 2e H2 minimum**
- [ ] Le prompt est **précédé d'une explication** (2-3 phrases)
- [ ] Le nombre de prompts respecte le **mapping catégorie**
- [ ] Le format du prompt suit la **structure BTP** (rôle + contexte + instruction + format)
- [ ] Le prompt est **actionnable** (le lecteur peut le copier-coller tel quel)
- [ ] Le composant `<EncadrePrompt />` est **correctement formaté**
- [ ] L'article contient une **section "Comment adapter ce prompt"** si pertinent
- [ ] Le CTA final renvoie vers la **formation correspondante**

---

**Application automatique :** Cette règle s'applique automatiquement lors de la création ou modification d'articles dans `/content/blog/` ou `/app/blog/`.
