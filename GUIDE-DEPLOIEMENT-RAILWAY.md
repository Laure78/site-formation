# Guide déploiement sur Railway — Pour débutantes

Mettre le site laureolivie.fr en ligne avec Railway. Suivez chaque étape dans l’ordre.

---

## Prérequis

- Un compte GitHub avec le code du site (dépôt `site-formation`)
- Un compte Railway (gratuit au début)

---

# ÉTAPE 1 : Créer un compte Railway

1. Ouvrez votre navigateur.
2. Allez sur **https://railway.app**
3. Cliquez sur **Login** (en haut à droite).
4. Choisissez **Continue with GitHub**.
5. Autorisez Railway à accéder à votre compte GitHub.
6. Vous arrivez sur le tableau de bord Railway (page vide au début).

---

# ÉTAPE 2 : Créer un nouveau projet

1. Sur le tableau de bord Railway, cliquez sur le bouton **+ New Project** (ou **Create Project**).
2. Une fenêtre s’ouvre avec plusieurs options.
3. Choisissez **Deploy from GitHub repo**.
4. Si c’est la première fois :
   - Cliquez sur **Configure GitHub App** ou **Configure**.
   - Sélectionnez votre compte GitHub.
   - Choisissez **All repositories** ou uniquement **site-formation**.
   - Cliquez sur **Install** / **Save**.
5. Revenez à Railway et vous devriez voir la liste de vos dépôts.
6. Trouvez **site-formation** et cliquez dessus.
7. Cliquez sur **Deploy Now** (ou un bouton similaire pour déployer).

---

# ÉTAPE 3 : Attendre le premier build

1. Railway lance automatiquement le build.
2. Vous voyez des logs défilants (installation des paquets, compilation).
3. Cela peut prendre **2 à 5 minutes**.
4. Si tout va bien, le déploiement se termine et vous voyez un message de succès.
5. Si une erreur apparaît en rouge, notez le message et passez à l’étape 7 (dépannage).

---

# ÉTAPE 4 : Configurer les variables d’environnement

1. Dans votre projet Railway, cliquez sur votre **service** (la carte qui représente votre site).
2. Cliquez sur l’onglet **Variables** (ou **Settings** puis **Variables**).
3. Cliquez sur **+ New Variable** ou **Add Variable**.
4. Ajoutez les variables une par une :

| Nom de la variable | Valeur | Où la trouver |
|--------------------|--------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xzwxtocaqffzwuylxvzl.supabase.co` | Déjà dans votre `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Votre clé anon Supabase | Supabase → Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Votre clé service_role | Supabase → Settings → API → service_role (cliquez « Reveal ») |
| `OPENAI_API_KEY` | `sk-proj-...` | platform.openai.com → API keys → Create new |
| `NEXT_PUBLIC_SITE_URL` | `https://votre-url.railway.app` | Vous la remplirez après (voir étape 5) |

5. Pour **chaque variable** :
   - Tapez le **nom** dans la colonne de gauche.
   - Tapez la **valeur** dans la colonne de droite (sans guillemets).
   - Ne partagez jamais ces valeurs publiquement.
6. Railway redéploie automatiquement après chaque modification de variable.

---

# ÉTAPE 5 : Obtenir l’URL de votre site

1. Toujours dans votre service, cliquez sur l’onglet **Settings**.
2. Descendez jusqu’à la section **Networking** ou **Domains**.
3. Cliquez sur **Generate Domain** (ou **Add domain**).
4. Railway vous donne une URL du type : `site-formation-production-xxxx.up.railway.app`
5. **Copiez cette URL**.
6. Retournez dans **Variables** et ajoutez ou modifiez :
   - `NEXT_PUBLIC_SITE_URL` = `https://votre-url-up.railway.app` (avec votre vraie URL)
7. Testez en ouvrant cette URL dans votre navigateur : votre site doit s’afficher.

---

# ÉTAPE 6 : Connecter votre domaine laureolivie.fr (optionnel)

Si vous voulez que le site soit accessible sur **laureolivie.fr** :

1. Dans Railway, onglet **Settings** → **Networking** → **Custom Domain**.
2. Cliquez sur **Add custom domain**.
3. Tapez : `laureolivie.fr` (ou `www.laureolivie.fr`).
4. Railway vous donne un **CNAME** ou des enregistrements DNS à configurer.
5. Allez chez votre hébergeur de domaine (O2switch, Cloudflare, etc.) :
   - Créez un enregistrement **CNAME** :
     - Nom : `www` (ou `@` selon le fournisseur)
     - Cible : la valeur fournie par Railway (ex. `xxx.up.railway.app`)
6. Attendez 5 à 30 minutes que la propagation DNS se fasse.
7. Railway fournit le certificat SSL automatiquement.

---

# ÉTAPE 7 : Dépannage courant

### Le build échoue avec une erreur

- Regardez les **logs** (onglet **Deployments** puis cliquez sur le déploiement).
- Erreur « OPENAI_API_KEY manquant » → ajoutez la variable (étape 4).
- Erreur « Module not found » → vérifiez que tout le code est bien poussé sur GitHub (`git push`).

### Le site affiche une erreur 500

- Vérifiez que **toutes** les variables d’environnement sont bien renseignées.
- Vérifiez que `SUPABASE_SERVICE_ROLE_KEY` et `OPENAI_API_KEY` sont corrects.

### Le chatbot ne répond pas

- Vérifiez `OPENAI_API_KEY`.
- Vérifiez que la migration Supabase `010_chat_agent.sql` a été appliquée.
- Lancez `npm run agent:index` en local pour remplir la base de connaissance, puis redéployez si besoin.

### Le cron de réindexation (agent IA)

Le fichier `vercel.json` configure un cron pour Vercel. Sur Railway, ce cron ne s’exécute pas automatiquement.

Pour mettre à jour la base de connaissance du chatbot, lancez en local (une fois de temps en temps) :
```
npm run agent:index
```
Ou utilisez un service externe (ex. cron-job.org) qui appelle `https://votre-site.railway.app/api/cron/reindex` avec le header `Authorization: Bearer VOTRE_CRON_SECRET`.

### Mettre à jour le site après des modifications

1. Dans Cursor : `git add -A` puis `git commit -m "Vos modifications"` puis `git push`.
2. Railway détecte le push et **redéploie automatiquement**.
3. Attendez 2 à 5 minutes.

---

# Résumé des étapes

1. Compte Railway + connexion GitHub  
2. New Project → Deploy from GitHub → choisir `site-formation`  
3. Attendre le build  
4. Variables : Supabase, OpenAI, `NEXT_PUBLIC_SITE_URL`  
5. Générer un domaine Railway  
6. (Optionnel) Domaine personnalisé laureolivie.fr  

---

*Guide créé pour Laure Olivié — site-formation*
