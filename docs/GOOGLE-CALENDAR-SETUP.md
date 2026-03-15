# Configuration Google Calendar — RDV dans ton agenda

---

## Objectif

Quand un prospect réserve un créneau sur le site, l’événement est créé automatiquement dans **ton Google Agenda**. Le client reçoit aussi une invitation (avec lien Meet si visio).

---

## Pourquoi tu ne vois rien ?

Si les RDV ne s’affichent pas dans ton agenda, c’est que les variables d’environnement Google Calendar ne sont pas configurées. Suis les étapes ci‑dessous.

---

## Étape 1 : Google Cloud Console

1. Va sur **https://console.cloud.google.com**
2. Crée un projet ou choisis un existant (ex. `site-formation`)
3. Menu **APIs & Services** → **Library**
4. Cherche **Google Calendar API** → **Enable**

---

## Étape 2 : Créer un Service Account

1. **APIs & Services** → **Credentials**
2. **Create Credentials** → **Service account**
3. Nom : `site-formation-calendar` (ou autre)
4. **Create and Continue** (étape 2/3 : skip)
5. **Done**
6. Clique sur le service account créé
7. Onglet **Keys** → **Add Key** → **Create new key** → **JSON**
8. Un fichier JSON est téléchargé — **garde-le en sécurité** (il contient une clé privée)

---

## Étape 3 : Partager ton calendrier Google avec le service account

1. Ouvre le fichier JSON téléchargé
2. Trouve le champ `"client_email"` — par exemple :  
   `site-formation-calendar@mon-projet-123456.iam.gserviceaccount.com`
3. Va sur **https://calendar.google.com**
4. Clique sur ton calendrier (celui où tu veux les RDV) → **Settings and sharing**
5. Section **Share with specific people** → **Add people**
6. Colle l’adresse email du service account (celle du `client_email`)
7. Droits : **Make changes to events**
8. **Send**

---

## Étape 4 : Récupérer l’ID de ton calendrier

1. Dans **Settings** de ton calendrier Google
2. Descends jusqu’à **Integrate calendar**
3. Copie **Calendar ID**  
   - Exemple : `laureolivie@gmail.com` (calendrier principal)  
   - Ou : `xxxxxx@group.calendar.google.com` (calendrier secondaire)

---

## Étape 5 : Ajouter les variables dans `.env.local`

1. Ouvre le fichier JSON du service account
2. **Copie tout le contenu** du fichier (tout le JSON, de `{` à `}`)
3. Dans `.env.local`, ajoute :

```
# Google Calendar — RDV dans ton agenda
GOOGLE_CALENDAR_CREDENTIALS_JSON={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...@....iam.gserviceaccount.com","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
GOOGLE_CALENDAR_ID=laureolivie@gmail.com
```

**Important :**
- `GOOGLE_CALENDAR_CREDENTIALS_JSON` = le JSON **complet** sur **une seule ligne** (sans retours à la ligne)
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
