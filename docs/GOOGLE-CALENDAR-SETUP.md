# Configuration Google Calendar — RDV dans ton agenda

Guide pas à pas pour débutantes.

---

## Objectif

Quand un prospect réserve un créneau sur le site, l’événement est créé automatiquement dans **ton Google Agenda**. Le client reçoit aussi une invitation (avec lien Meet si visio).

---

## Vue d’ensemble (5 étapes)

1. Activer l’API Google Calendar
2. Créer un Service Account et télécharger le JSON
3. Partager ton calendrier avec l’email du service account
4. Copier l’ID du calendrier
5. Ajouter les variables dans `.env.local`

---

## Étape 1 : Activer l’API Google Calendar

1. Va sur **https://console.cloud.google.com**
2. En haut, vérifie que le bon projet est sélectionné (ex. « My Project 11225 » ou crée-en un avec **Nouveau projet**)
3. Dans le menu de gauche : **API et services** → **Bibliothèque**
4. Dans la barre de recherche, tape **Google Calendar API**
5. Clique sur **Google Calendar API**
6. Clique sur le bouton bleu **Activer**
7. Tu verras une page de confirmation — c’est bon.

---

## Étape 2 : Créer un Service Account et télécharger le JSON

Tu es probablement sur la page **Identifiants** (comme sur ta capture). Si tu viens de l’étape 1, clique sur **Identifiants** dans le menu de gauche.

### 2.1 Créer le Service Account

- Clique sur le bouton bleu **+ Créer des identifiants** (en haut)
- Dans le menu qui s’ouvre, choisis **Compte de service**
- **Nom du compte de service** : tape par ex. `site-formation-calendar`
- Clique sur **Créer et continuer**
- Étape 2/3 : tu peux ignorer (ne rien sélectionner) → **Continuer**
- Étape 3/3 : **Terminer**

Tu verras maintenant ton compte de service dans la liste « Comptes de service ».

### 2.2 Créer la clé JSON

1. Clique sur le **nom** du compte de service que tu viens de créer (celui qui commence par `site-formation-calendar` ou similaire)
2. Va dans l’onglet **Clés** (ou **Keys** si l’interface est en anglais)
3. Clique sur **Ajouter une clé** (ou **Add Key**) → **Créer une clé** (ou **Create new key**)
4. Choisis **JSON**
5. Clique sur **Créer**

Un fichier JSON se télécharge automatiquement. **Conserve-le** : tu en auras besoin à l’étape 5. Ne le partage jamais (il contient une clé secrète).

---

## Étape 3 : Partager ton calendrier Google avec le service account

1. Ouvre le fichier JSON téléchargé (avec un éditeur de texte)
2. Trouve le champ `"client_email"` — par exemple :  
   `site-formation-calendar@mon-projet-123456.iam.gserviceaccount.com`  
   Copie cette adresse complète.
3. Va sur **https://calendar.google.com**
4. Dans la liste de tes calendriers (à gauche), clique sur les **3 points** (⋮) à côté du calendrier où tu veux les RDV → **Paramètres et partage** (ou « Settings and sharing » en anglais)
5. Descends jusqu’à **Partager avec des personnes et des groupes** → **Ajouter des personnes**
6. Colle l’adresse email du service account (celle du `client_email`)
7. À droite du nom : choisis **Peut modifier les créneaux** (ou « Make changes to events »)
8. Clique sur **Envoyer** (ou « Send »)

---

## Étape 4 : Récupérer l’ID de ton calendrier

1. Toujours dans **Paramètres** de ton calendrier Google (étape 3)
2. Descends jusqu’à **Intégrer le calendrier** (ou « Integrate calendar »)
3. Copie **ID du calendrier** (ou « Calendar ID »)  
   - Exemple : `laureolivie@gmail.com` (calendrier principal)  
   - Ou : `xxxxxx@group.calendar.google.com` (calendrier secondaire)

---

## Étape 5 : Ajouter les variables dans `.env.local`

1. Ouvre le fichier JSON du service account
2. **Copie tout le contenu** du fichier (tout le JSON, de `{` à `}`)
3. Dans `.env.local`, ajoute :

```
# Google Calendar — RDV dans ton agenda
GOOGLE_CALENDAR_CREDENTIALS_JSON='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...@....iam.gserviceaccount.com","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
GOOGLE_CALENDAR_ID=laureolivie@gmail.com
```

**Important :**
- `GOOGLE_CALENDAR_CREDENTIALS_JSON` = le JSON **complet** sur **une seule ligne**, entouré de **guillemets simples** `'...'` pour éviter les erreurs de parsing. Exemple : `GOOGLE_CALENDAR_CREDENTIALS_JSON='{"type":"service_account",...}'`
- Astuce pour la mise sur une ligne : [jsonformatter.org](https://jsonformatter.org/json-minify) → colle le JSON → Minify → copie le résultat
- `GOOGLE_CALENDAR_ID` = l’ID du calendrier (celui que tu veux utiliser pour les RDV)

---

## Étape 6 : En production (Vercel / Railway / O2switch)

Si ton site est hébergé (Vercel, Railway, etc.) :

1. Va dans les **Variables d’environnement** du projet
2. Ajoute `GOOGLE_CALENDAR_CREDENTIALS_JSON` et `GOOGLE_CALENDAR_ID`
3. Pour le JSON : colle le contenu en une seule ligne (comme en local)
4. Redéploie le site

---

## Vérification

1. Redémarre le serveur local (`npm run dev`) pour recharger les variables
2. Fais un RDV de test sur le site
3. Ouvre ton Google Agenda — l’événement doit apparaître
4. Si c’est un RDV visio, le client reçoit une invitation Google Calendar avec le lien Meet

---

## En cas d’erreur

- **« Configuration Google Calendar manquante »** : les variables ne sont pas définies ou mal formatées
- **« Access denied »** : le calendrier n’est pas partagé avec l’email du service account
- **« 404 Not Found »** : mauvais `GOOGLE_CALENDAR_ID` (vérifie l’orthographe)

Pour diagnostiquer : regarde les logs du serveur (terminal en local ou logs de l’hébergement) au moment de la prise de RDV.
