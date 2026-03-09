# Guide pas à pas : Mettre le site en ligne

Pour débutantes. Suivez chaque étape dans l’ordre. Une seule action à la fois.

---

# ÉTAPE 1 : Créer un compte GitHub

1. Ouvrez votre navigateur (Chrome, Safari, Firefox…).
2. Allez sur : **https://github.com**
3. En haut à droite, cliquez sur le bouton vert **Sign up**.
4. Remplissez : email, mot de passe, nom d’utilisateur.
5. Validez votre email si on vous le demande.
6. Connectez-vous avec votre identifiant et mot de passe.

---

# ÉTAPE 2 : Créer un dépôt (un espace pour votre code)

1. Une fois connectée sur GitHub, en haut à droite, cliquez sur le **+** (icône plus).
2. Dans le menu, cliquez sur **New repository**.
3. Dans **Repository name**, tapez : `site-formation`.
4. Choisissez **Private** (privé) ou **Public** (public), selon ce que vous préférez.
5. **Important** : ne cochez surtout pas « Add a README file » (laisser vide).
6. Cliquez sur le bouton vert **Create repository**.
7. Vous voyez une page avec des instructions. **Gardez cette page ouverte** : vous aurez besoin de l’URL (exemple : `https://github.com/laureolivie/site-formation`).

---

# ÉTAPE 3 : Ouvrir le Terminal

1. Dans Cursor, en bas de l’écran, cliquez sur l’onglet **Terminal** (à côté de « Output », « Problems »…).
2. Si vous ne voyez pas le Terminal : menu **Terminal** → **New Terminal** (ou raccourci Ctrl+`).
3. Une fenêtre noire ou grise apparaît avec du texte : c’est le Terminal.

---

# ÉTAPE 4 : Aller dans le dossier du projet

1. Dans le Terminal, tapez exactement :
   ```
   cd /Users/laure/Documents/site-formation
   ```
2. Appuyez sur **Entrée**.
3. Vérifiez que la ligne commence maintenant par quelque chose comme : `…site-formation` — cela veut dire que vous êtes au bon endroit.

---

# ÉTAPE 5 : Connecter le projet à GitHub

1. Regardez l’URL de votre dépôt GitHub (étape 2). Elle ressemble à :
   `https://github.com/VOTRE_PSEUDO/site-formation`
2. Remplacez `VOTRE_PSEUDO` par votre vrai nom d’utilisateur GitHub. Exemple : si votre pseudo est `laureolivie`, l’URL est : `https://github.com/laureolivie/site-formation`
3. Dans le Terminal, tapez (en adaptant l’URL avec votre pseudo) :
   ```
   git remote add origin https://github.com/VOTRE_PSEUDO/site-formation.git
   ```
   Exemple concret :
   ```
   git remote add origin https://github.com/laureolivie/site-formation.git
   ```
4. Appuyez sur **Entrée**.
5. Si aucun message d’erreur n’apparaît, c’est bon.

---

# ÉTAPE 6 : Envoyer le code sur GitHub (push)

1. Dans le Terminal, tapez :
   ```
   git push -u origin main
   ```
2. Appuyez sur **Entrée**.
3. Une fenêtre ou une page peut s’ouvrir pour vous demander de vous connecter à GitHub : connectez-vous.
4. Si on vous demande un mot de passe : GitHub peut demander un **token** au lieu du mot de passe habituel. Pour en créer un :
   - Allez sur https://github.com/settings/tokens
   - **Generate new token** → **Generate new token (classic)**
   - Donnez un nom (ex : "Vercel")
   - Cochez au moins **repo**
   - Générez et **copiez le token**
   - Collez ce token à la place du mot de passe quand on vous le demande
5. Une fois le push terminé, rafraîchissez la page de votre dépôt sur GitHub : vous devez voir tous vos fichiers. ✅

---

# ÉTAPE 7 : Mettre à jour Supabase (table des rendez-vous)

1. Allez sur **https://supabase.com** et connectez-vous.
2. Cliquez sur votre projet (le site formation).
3. Dans le menu de gauche, cliquez sur **SQL Editor** (icône de requête).
4. Cliquez sur **New query** (nouvelle requête).
5. Une zone de texte blanche apparaît.
6. Copiez tout le bloc ci-dessous (du `--` jusqu’à la dernière ligne) :

```
-- Table des rendez-vous (comme Calendly)
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  start_at timestamptz not null,
  end_at timestamptz not null,
  client_name text not null,
  client_email text not null,
  client_phone text,
  client_message text,
  status text default 'demande' check (status in ('demande', 'confirme', 'annule')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.appointments enable row level security;

create policy "Lecture des rendez-vous" on public.appointments for select using (true);
create policy "Insertion rendez-vous (anonyme)" on public.appointments for insert with check (true);

create index if not exists idx_appointments_start_at on public.appointments(start_at);
create index if not exists idx_appointments_status on public.appointments(status);
```

7. Collez ce texte dans la zone blanche du SQL Editor.
8. Cliquez sur le bouton **Run** (ou utilisez Ctrl+Entrée).
9. En bas, vous devez voir un message du type **Success** ou « Query executed successfully ». ✅

---

# ÉTAPE 8 : Créer un compte Railway

1. Allez sur **https://railway.app**
2. Cliquez sur **Login** ou **Start a New Project**.
3. Choisissez **Login with GitHub** (Se connecter avec GitHub).
4. Autorisez Railway à accéder à votre compte GitHub (Accept, Authorize…).
5. Vous arrivez sur le tableau de bord Railway.

---

# ÉTAPE 9 : Importer le projet sur Railway

1. Sur Railway, cliquez sur **New Project** (ou **+ New Project**).
2. Dans la fenêtre qui s’ouvre, choisissez **Deploy from GitHub repo** (Déployer depuis un dépôt GitHub).
3. Si on vous demande de connecter GitHub, cliquez sur **Configure GitHub App** et autorisez l’accès à vos dépôts.
4. Une liste de vos dépôts GitHub s’affiche.
5. Dans la barre de recherche, tapez : `site-formation`.
6. Cliquez sur **site-formation** dans la liste (une seule fois suffit).
7. Deux options apparaissent :
   - **Deploy Now** : lance le déploiement tout de suite (vous ajouterez les variables après).
   - **Add variables** : pour ajouter d’abord les variables Supabase, puis déployer.
8. **Choisissez « Add variables »** pour configurer Supabase avant le premier déploiement (étape 10).

---

# ÉTAPE 10 : Ajouter les variables Supabase dans Railway

1. Après avoir cliqué sur **Add variables**, vous arrivez sur le **Project Canvas** (écran principal du projet).
2. Cliquez sur votre service (la carte qui représente votre application, par ex. « site-formation »).
3. Dans le panneau de droite, cherchez **Variables** (ou onglet **Variables**).
4. Cliquez sur **Add Variable** ou **New Variable**.
5. Récupérez vos infos Supabase :
   - Allez sur **https://supabase.com** (onglet Supabase).
   - Cliquez sur votre projet → **Project Settings** (engrenage) → **API**.
   - Notez :
     - **Project URL** (ex : `https://abcdef.supabase.co`)
     - **anon public** (longue clé qui commence par `eyJ…`)
6. Retournez sur Railway.
7. **Première variable** :
   - **Name** : `NEXT_PUBLIC_SUPABASE_URL`
   - **Value** : collez votre Project URL de Supabase
   - Validez (Add ou Enter).
8. **Deuxième variable** :
   - **Name** : `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value** : collez la clé « anon public » de Supabase
   - Validez.
9. Vérifiez qu’il y a bien 2 variables listées.

---

# ÉTAPE 11 : Lancer le déploiement sur Railway

1. En haut du Project Canvas, cherchez le bouton **Deploy** (ou **Redeploy**).
2. Cliquez dessus pour lancer le déploiement.
3. Un indicateur de progression apparaît : « Building », « Deploying »…
4. Attendez 2 à 4 minutes.
5. Quand c’est terminé (statut vert ou « Success »), cliquez sur votre service.
6. Dans le panneau de droite, cherchez **Settings** → **Networking** (ou **Generate Domain**).
7. Cliquez sur **Generate Domain** pour obtenir une URL publique (ex : `site-formation-production-xxxx.up.railway.app`).
8. Cliquez sur ce lien : **votre site est en ligne.** ✅

---

# ÉTAPE 12 (optionnel) : Mettre à jour le site plus tard

Quand vous modifiez votre site dans Cursor et voulez que le site en ligne soit à jour :

1. Ouvrez le Terminal dans Cursor.
2. Tapez : `cd /Users/laure/Documents/site-formation` puis Entrée.
3. Tapez : `git add -A` puis Entrée.
4. Tapez : `git commit -m "Ma mise à jour"` puis Entrée.
5. Tapez : `git push` puis Entrée.
6. Railway redéploie automatiquement le site en quelques minutes.

---

## Aide rapide

| Problème | Solution |
|----------|----------|
| « remote origin already exists » | Votre projet est déjà relié. Passez à l’étape 6 (push). |
| « authentication failed » au push | Utilisez un token GitHub (voir étape 6, point 4) à la place du mot de passe. |
| Le calendrier de RDV ne marche pas en ligne | Vérifiez que l’étape 7 (Supabase) est bien faite et que les 2 variables de l’étape 10 sont correctes dans Railway. |

---

*Dernière mise à jour : mars 2026*
