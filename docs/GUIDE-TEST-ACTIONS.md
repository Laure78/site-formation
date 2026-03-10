# Guide pas à pas — Tester le workflow Actions

---

## Ce que vous allez faire

Lancer manuellement le workflow qui génère les articles, pour vérifier que tout fonctionne.

---

## Étape 1 : Aller sur GitHub

1. Ouvrez votre navigateur.
2. Allez sur : **https://github.com/Laure78/site-formation**
3. Connectez-vous si besoin.

---

## Étape 2 : Ouvrir l’onglet Actions

1. En haut de la page, vous voyez plusieurs onglets : **Code**, **Issues**, **Pull requests**, **Actions**…
2. Cliquez sur **Actions**.

---

## Étape 3 : Choisir le workflow

1. Dans la liste à gauche, vous voyez **Media Machine — Génération articles**.
2. Cliquez dessus.

---

## Étape 4 : Lancer le workflow

1. À droite, cliquez sur le bouton **Run workflow**.
2. Laissez **Branch: main**.
3. Cliquez sur le bouton vert **Run workflow** en bas du menu.

---

## Étape 5 : Attendre

1. Une ligne jaune/orange apparaît en haut : « generate in progress ».
2. Attendez **1 à 2 minutes**.

---

## Étape 6 : Vérifier le résultat

1. Quand c’est terminé, la ligne devient **verte** (✓).
2. Cliquez sur cette ligne.
3. Cliquez sur le job **generate** à gauche.
4. Vous voyez les étapes : chacune doit être verte (✓).
5. Si une étape est rouge (✗), cliquez dessus pour voir l’erreur.

---

## Étape 7 : Vérifier les articles générés

1. Cliquez sur l’onglet **Code** (en haut).
2. Ouvrez le dossier **content**.
3. Ouvrez le dossier **generated**.
4. Vous devez voir des fichiers **article-xxx.json** (date récente si le workflow a poussé).

---

## Si tout est vert

- Les articles ont été générés.
- Un commit a été fait et poussé.
- Votre site (Railway, etc.) va redéployer.
- Les nouveaux articles apparaîtront sur la page **/blog**.

---

## En cas de problème

- **Échec au push** : vérifiez que les Actions ont la permission « Read and write » (Settings → Actions → General).
- **Erreur sur une étape** : cliquez sur l’étape rouge pour lire le message d’erreur.
