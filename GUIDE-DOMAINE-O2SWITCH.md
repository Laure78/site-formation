# Guide étape par étape : Basculer laureolivie.fr vers le nouveau site (Railway)

Une seule action à la fois. Ne passez à l’étape suivante que quand la précédente est terminée.

---

## AVANT DE COMMENCER

**Notez ces informations** (vous en aurez besoin plus tard) :

- **Railway** : l’URL ou l’IP de votre site (ex. `site-formation-production-xxxx.up.railway.app` ou une IP fournie par Railway).
- **O2switch** : identifiant et mot de passe de votre hébergement.

---

# ÉTAPE 1 : Récupérer les infos Railway

1. Ouvrez votre navigateur.
2. Allez sur **https://railway.app**.
3. Connectez-vous (avec GitHub si besoin).
4. Cliquez sur votre projet **site-formation**.
5. Cliquez sur le **service** (la carte de l’application).
6. Dans le panneau de droite, cherchez **Settings** ou **Paramètres**.
7. Ouvrez **Networking** (Réseau).
8. Si vous avez déjà un domaine Railway généré : notez l’URL (ex. `site-formation-production-xxxx.up.railway.app`).
9. Cliquez sur **Custom Domain** (Domaine personnalisé) ou **Generate Domain**.
10. Ajoutez ou notez l’URL fournie par Railway.
11. Railway peut afficher une **adresse IP** ou demander de pointer vers l’URL. **Notez précisément ce qu’il indique** (IP ou URL).

---

# ÉTAPE 2 : Se connecter à O2switch

1. Ouvrez un nouvel onglet dans votre navigateur.
2. Allez sur **https://o2switch.net** (ou l’URL de connexion que vous utilisez habituellement).
3. Entrez votre **identifiant** (email ou nom d’utilisateur).
4. Entrez votre **mot de passe**.
5. Cliquez sur **Connexion** ou **Login**.

---

# ÉTAPE 3 : Ouvrir le panneau cPanel

1. Une fois connectée à O2switch, cherchez le lien ou le bouton qui ouvre **cPanel**.
2. C’est souvent : « Accéder à cPanel », « Panel », ou un lien direct.
3. Cliquez dessus.
4. Attendez que cPanel se charge complètement.

---

# ÉTAPE 4 : Trouver la Zone DNS

1. Dans cPanel, utilisez la barre de recherche en haut si elle existe.
2. Tapez : **Zone** ou **Zone Editor** ou **Éditeur de zone**.
3. Cliquez sur l’icône **Zone Editor** (ou « Éditeur de zone DNS »).
4. Vous arrivez sur une page qui liste vos domaines.

---

# ÉTAPE 5 : Ouvrir la zone de laureolivie.fr

1. Dans la liste des domaines, repérez **laureolivie.fr**.
2. À droite de ce domaine, cliquez sur le lien **Gérer** (ou **Manage**).
3. Une nouvelle page s’ouvre avec tous les enregistrements DNS du domaine.
4. Vous voyez un tableau avec des colonnes : **Nom**, **Type**, **Valeur** (ou similaire).

---

# ÉTAPE 6 : Repérer les enregistrements à modifier

1. Utilisez le filtre par type si possible : choisissez **A** pour afficher uniquement les enregistrements de type A.
2. Repérez les lignes dont le **Nom** est :
   - `laureolivie.fr` ou `@` (domaine principal)
   - `www` (pour www.laureolivie.fr)
3. Notez l’**adresse IP** actuelle (colonne Valeur) — c’est l’IP O2switch que vous allez remplacer.
4. Ne touchez **pas** aux enregistrements **MX** (emails) si vous gardez vos emails chez O2switch.

---

# ÉTAPE 7 : Modifier l’enregistrement du domaine principal (@ ou laureolivie.fr)

1. Trouvez la ligne dont le nom est `laureolivie.fr` ou `@` et le type est **A**.
2. Cliquez sur **Modifier** (icône crayon) à droite de cette ligne.
3. Dans le champ **Points to** ou **Valeur** ou **Adresse**, vous voyez une IP (ex. 109.234.160.xxx).
4. **Supprimez** cette IP.
5. **Collez** l’adresse IP ou l’hôte fourni par Railway (étape 1).
   - Si Railway donne une URL (ex. `xxx.up.railway.app`), certaines configurations demandent un CNAME. Si le type est A et qu’on vous demande une IP, utilisez l’IP affichée par Railway dans la section Custom Domain.
6. Cliquez sur **Enregistrer** ou **Save**.

---

# ÉTAPE 8 : Modifier l’enregistrement www

1. Trouvez la ligne dont le nom est `www` et le type est **A**.
2. Cliquez sur **Modifier** (icône crayon).
3. Remplacez l’IP actuelle par la même valeur que pour l’étape 7 (IP ou CNAME selon ce que Railway indique).
4. Cliquez sur **Enregistrer** ou **Save**.

---

# ÉTAPE 9 : Vérifier dans Railway

1. Retournez sur **railway.app** → votre projet.
2. Section **Custom Domain** : ajoutez `laureolivie.fr` et `www.laureolivie.fr` si ce n’est pas déjà fait.
3. Railway peut demander une vérification DNS. Suivez ses instructions si une étape supplémentaire est indiquée.

---

# ÉTAPE 10 : Mettre à jour la variable du site

1. Dans Railway → projet → service → **Variables**.
2. Vérifiez ou ajoutez :  
   `NEXT_PUBLIC_SITE_URL` = `https://www.laureolivie.fr`
3. Si Railway redéploie automatiquement, attendez la fin du déploiement.

---

# ÉTAPE 11 : Attendre la propagation DNS

1. La propagation DNS peut prendre entre **15 minutes** et **48 heures**.
2. Pour tester : allez sur **https://www.laureolivie.fr** dans votre navigateur.
3. Si l’ancien site s’affiche encore : attendez ou videz le cache (Ctrl+F5 ou Cmd+Shift+R).
4. Utilisez https://dnschecker.org pour voir si le domaine pointe bien vers Railway dans le monde entier.

---

## Rappels importants

| À faire | À éviter |
|---------|----------|
| **Modifier** les enregistrements A existants | Utiliser « Ajouter un enregistrement A » (doublerait les pointages) |
| Garder les MX si vous voulez garder vos emails O2switch | Supprimer ou modifier les MX sans savoir où vont vos emails |
| Noter l’IP/URL Railway avant de modifier le DNS | Modifier le DNS sans avoir les bonnes valeurs |

---

*Si une étape n’est pas claire ou si l’interface O2switch a changé, consultez la FAQ O2switch : https://faq.o2switch.fr*
