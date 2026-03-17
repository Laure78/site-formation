# 🎯 Guide Rapide : Activer les Avis Google

## ✅ Ce qui a été fait

J'ai installé tout le système pour afficher vos avis Google automatiquement sur votre site.

Les fichiers créés :
- ✅ `lib/google-reviews.ts` - Récupère les avis depuis l'API Google
- ✅ `components/landing/GoogleReviewsSection.tsx` - Affiche les avis sur le site
- ✅ `scripts/find-place-id.js` - Script pour trouver votre Place ID Google
- ✅ Page d'accueil mise à jour avec la nouvelle section

## 🚀 Ce qu'il vous reste à faire (3 étapes simples)

### ÉTAPE 1 : Obtenir une clé API Google (15 minutes)

1. **Aller sur Google Cloud Console**
   - URL : https://console.cloud.google.com/
   - Se connecter avec votre compte Google

2. **Créer un projet**
   - Cliquer "Nouveau projet"
   - Nom : "Site Formation IA BTP"
   - Cliquer "Créer"

3. **Activer l'API Places**
   - Menu gauche → "API et services" → "Bibliothèque"
   - Chercher "Places API"
   - Cliquer dessus et "Activer"

4. **Créer une clé API**
   - Menu gauche → "API et services" → "Identifiants"
   - Cliquer "+ Créer des identifiants"
   - Sélectionner "Clé API"
   - **Copier la clé** (format : AIzaSy...)

5. **Sécuriser la clé (IMPORTANT)**
   - Cliquer sur "Restreindre la clé"
   - Dans "Restrictions d'API" → Sélectionner "Restreindre la clé"
   - Cocher uniquement "Places API"
   - Cliquer "Enregistrer"



**Option A : Avec le script automatique (recommandé)**

1. Ouvrir le fichier `scripts/find-place-id.js`
2. Ligne 11 : Remplacer `'VOTRE_CLE_API'` par votre clé obtenue à l'étape 1
3. Dans le terminal :
```bash
cd /Users/laure/Documents/site-formation
node scripts/find-place-id.js
```
4. Le script affichera votre Place ID (commence par `ChIJ...`)

**Option B : Manuellement**

1. Aller sur Google Maps : https://www.google.com/maps
2. Chercher : "Formation IA BTP Laure Olivié Montigny-le-Bretonneux"
3. Cliquer sur votre fiche
4. Dans l'URL, copier la partie qui commence par `ChIJ...`

### ÉTAPE 3 : Configurer le site (2 minutes)

1. **Créer le fichier de configuration**
```bash
cd /Users/laure/Documents/site-formation
cp .env.local.example .env.local
```

2. **Éditer `.env.local`**
```bash
nano .env.local
```

Remplacer par vos vraies valeurs :
```bash
GOOGLE_PLACE_ID="ChIJ..."  # Votre Place ID de l'étape 2
GOOGLE_PLACES_API_KEY="AIza..."  # Votre clé API de l'étape 1
```

Sauvegarder : `Ctrl+O` puis `Entrée`, puis `Ctrl+X`

3. **Tester en local**
```bash
npm run dev
```

Ouvrir http://localhost:3000 et vérifier que les avis s'affichent.

## 🌐 Déploiement en production

Pour que ça fonctionne sur votre site en ligne (laureolivie.fr) :

### Sur O2switch (votre hébergeur)

1. Se connecter à votre espace O2switch
2. Aller dans la gestion de votre site
3. Chercher "Variables d'environnement" ou créer un fichier `.env.local` via FTP
4. Ajouter les 2 mêmes variables :
   ```
   GOOGLE_PLACE_ID=ChIJ...
   GOOGLE_PLACES_API_KEY=AIza...
   ```

## 📊 Résultat attendu

Une fois configuré, votre page d'accueil affichera :

✅ Votre note Google (ex: 4,9/5)  
✅ Le nombre total d'avis  
✅ Les 6 derniers avis avec :
   - Photo du client
   - Nom
   - Note en étoiles
   - Texte de l'avis
   - Lien vers Google

Les avis se mettent à jour automatiquement toutes les 24h.

## ❓ En cas de problème

### Les avis ne s'affichent pas ?

1. Vérifier que le fichier `.env.local` existe et contient les bonnes valeurs
2. Vérifier dans les logs du serveur (console) s'il y a des erreurs
3. Vérifier que l'API Places est bien activée sur Google Cloud
4. Vérifier que votre fiche Google Business a bien des avis

### Message "REQUEST_DENIED" ?

- L'API Places n'est pas activée → Retour étape 1.3
- La clé API n'a pas les bonnes permissions → Retour étape 1.5

## 💰 Coûts

**GRATUIT** pour votre usage :
- Quota gratuit : 200 000 requêtes/mois
- Avec le cache de 24h : ~30 requêtes/mois maximum
- Vous ne paierez rien

## 📞 Support

Si vous avez besoin d'aide :
1. Lire le guide détaillé : `GUIDE_GOOGLE_REVIEWS.md`
2. Vérifier la console Google Cloud : https://console.cloud.google.com/
3. Me contacter si nécessaire

## ⏱️ Temps total estimé

- Étape 1 : 15 minutes
- Étape 2 : 5 minutes
- Étape 3 : 2 minutes
- **TOTAL : ~20-25 minutes**

Bonne configuration ! 🚀
