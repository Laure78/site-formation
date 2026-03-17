# Guide : Afficher les avis Google sur votre site

Ce guide vous explique comment activer l'affichage automatique de vos avis Google Business Profile sur votre site web.

## 📋 Prérequis

- Avoir une fiche Google Business Profile active
- Avoir au moins quelques avis sur votre fiche Google
- Disposer d'une carte bancaire (pour activer l'API Google, mais utilisation gratuite jusqu'à un certain quota)

## 🚀 Étapes d'installation

### Étape 1 : Créer un projet Google Cloud

1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Se connecter avec votre compte Google (idéalement le même que celui de votre fiche Google Business)
3. Cliquer sur "Sélectionner un projet" en haut
4. Cliquer sur "Nouveau projet"
5. Nommer votre projet : "Site Formation IA BTP"
6. Cliquer sur "Créer"

### Étape 2 : Activer l'API Places

1. Dans le menu de gauche, cliquer sur "API et services" > "Bibliothèque"
2. Rechercher "Places API"
3. Cliquer sur "Places API" (ou "Places API (New)")
4. Cliquer sur "Activer"

### Étape 3 : Créer une clé API

1. Dans le menu de gauche, cliquer sur "API et services" > "Identifiants"
2. Cliquer sur "+ Créer des identifiants" en haut
3. Sélectionner "Clé API"
4. Une clé API est générée (format : `AIzaSy...`)
5. **Important** : Cliquer sur "Restreindre la clé" pour la sécuriser

#### Configurer les restrictions de clé (Recommandé)

**Restrictions d'application :**
- Pour le développement local : "Adresses IP" → Ajouter votre IP
- Pour la production : "Références HTTP (sites web)" → Ajouter :
  - `https://laureolivie.fr/*`
  - `https://www.laureolivie.fr/*`

**Restrictions d'API :**
- Sélectionner "Restreindre la clé"
- Cocher uniquement "Places API"
- Cliquer sur "Enregistrer"

### Étape 4 : Trouver votre Place ID

Deux méthodes possibles :

#### Méthode A : Via le script automatique (Recommandé)

1. Ouvrir le fichier `scripts/find-place-id.js`
2. Remplacer `'VOTRE_CLE_API'` par votre clé API obtenue à l'étape 3
3. Dans le terminal :
```bash
node scripts/find-place-id.js
```

Le script affichera votre Place ID.

#### Méthode B : Manuellement

1. Aller sur [Google Maps](https://www.google.com/maps)
2. Rechercher votre établissement : "Formation IA BTP Laure Olivié Montigny-le-Bretonneux"
3. Cliquer sur votre fiche
4. Regarder l'URL, elle contient quelque chose comme :
   ```
   https://www.google.com/maps/place/.../@48.123,2.456,17z/data=!4m5!3m4!1s0x...
   ```
5. Le Place ID est dans cette URL (commence généralement par `ChIJ...`)

Ou utiliser cet outil : [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)

### Étape 5 : Configurer les variables d'environnement

1. Copier le fichier `.env.local.example` vers `.env.local` :
```bash
cp .env.local.example .env.local
```

2. Éditer `.env.local` et ajouter vos identifiants :
```bash
GOOGLE_PLACE_ID="ChIJ..." # Votre Place ID
GOOGLE_PLACES_API_KEY="AIza..." # Votre clé API
```

3. **Important** : Ne jamais commiter le fichier `.env.local` (il est déjà dans `.gitignore`)

### Étape 6 : Déployer sur votre serveur

Pour que les avis s'affichent en production :

1. Connectez-vous à votre hébergement (O2switch)
2. Ajoutez les variables d'environnement dans votre configuration :
   - Via le panneau de configuration si disponible
   - Ou via SSH en créant un fichier `.env.local` dans le dossier du site

## 🧪 Tester localement

1. Lancer le serveur de développement :
```bash
npm run dev
```

2. Ouvrir http://localhost:3000
3. Les avis Google devraient s'afficher dans la section "Cas concrets d'entreprises du BTP formées"

## 💰 Coûts

L'API Google Places est **gratuite jusqu'à :**
- 200 000 requêtes par mois
- Avec cache de 24h, vous ne ferez qu'environ 30 requêtes/mois

Au-delà : ~0,017$/requête (négligeable pour votre usage)

## 🔒 Sécurité

✅ **Ce qui est fait :**
- Clés API stockées dans `.env.local` (non versionnées)
- Restrictions d'API activées
- Cache de 24h pour limiter les requêtes
- Appel API côté serveur uniquement (pas exposé au client)

⚠️ **À faire impérativement :**
- Activer les restrictions de domaine en production
- Ne jamais exposer les clés API dans le code client
- Surveiller l'utilisation de l'API sur Google Cloud Console

## 🐛 Dépannage

### Les avis ne s'affichent pas

1. Vérifier que les variables d'environnement sont bien définies :
```bash
echo $GOOGLE_PLACE_ID
echo $GOOGLE_PLACES_API_KEY
```

2. Regarder les logs du serveur (console)
3. Vérifier que l'API Places est bien activée sur Google Cloud
4. Vérifier les restrictions de clé API

### "REQUEST_DENIED"

- Vérifier que l'API Places est activée
- Vérifier que la clé API a les bonnes permissions
- Vérifier les restrictions de domaine

### Avis en double ou en anglais

- Ajouter `&language=fr` dans l'URL de l'API (déjà fait)
- Les avis Google sont parfois traduits automatiquement

## 📞 Support

Pour toute question :
- Vérifier la [documentation Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
- Consulter la [console Google Cloud](https://console.cloud.google.com/)

## ✨ Prochaines améliorations possibles

- [ ] Widget "Laisser un avis" avec lien direct
- [ ] Afficher la photo de l'établissement
- [ ] Filtrer les avis par note
- [ ] Répondre aux avis depuis le site
- [ ] Analytics des avis (évolution dans le temps)
