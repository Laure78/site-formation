# Guide détaillé : laureolivie.fr sur Railway avec Cloudflare (option SEO)

Ce guide explique **en détail** comment faire pointer **laureolivie.fr** vers votre application Formation hébergée sur Railway, tout en conservant vos emails et en optimisant le référencement.

---

## Table des matières

1. [Principe et objectif](#1-principe-et-objectif)
2. [Pourquoi Cloudflare ?](#2-pourquoi-cloudflare)
3. [Avant de commencer](#3-avant-de-commencer)
4. [Partie A : Configurer Cloudflare](#partie-a-configurer-cloudflare)
5. [Partie B : Configurer Railway](#partie-b-configurer-railway)
6. [Partie C : SEO et finalisation](#partie-c-seo-et-finalisation)
7. [Dépannage](#dépannage)

---

## 1. Principe et objectif

### Situation actuelle

| Élément | Actuellement |
|---------|--------------|
| **Domaine** | laureolivie.fr |
| **Hébergement** | O2switch |
| **Site web** | WordPress |
| **Emails** | @laureolivie.fr (probablement sur O2switch) |

### Objectif

| Élément | Après migration |
|--------|-----------------|
| **Domaine** | laureolivie.fr |
| **Gestion DNS** | Cloudflare |
| **Site web** | Application Formation (Next.js) sur Railway |
| **Emails** | @laureolivie.fr conservés (MX chez O2switch ou Cloudflare) |

### Résultat SEO

- **laureolivie.fr** reste l’URL principale → conservation de l’autorité du domaine
- Une seule URL canonique
- Certificat SSL automatique
- Sitemap et métadonnées déjà en place dans l’application

---

## 2. Pourquoi Cloudflare ?

### Le problème technique

- Railway demande un enregistrement **CNAME** pour pointer le domaine vers leur infrastructure.
- À la racine d’un domaine (laureolivie.fr), un CNAME entre en conflit avec les enregistrements **MX** (emails).
- O2switch n’autorise pas cette configuration.

### La solution : CNAME flattening

Cloudflare propose le **CNAME flattening** : il convertit le CNAME à la racine en enregistrements A automatiquement, tout en autorisant les MX. Il n’y a plus de conflit.

### Autres avantages Cloudflare

- CDN et protection DDoS
- Certificat SSL
- Redirections www → non-www (ou l’inverse) facilement configurables
- Gratuit pour un usage standard

---

## 3. Avant de commencer

### À préparer

1. **Compte Cloudflare** (gratuit) : https://dash.cloudflare.com/sign-up
2. **Accès au registrar du domaine** : celui où laureolivie.fr est enregistré (peut être O2switch, OVH, Gandi, etc.)
3. **Liste des enregistrements DNS actuels** : exportez ou notez les enregistrements MX et autres si vous les utilisez (emails, sous-domaines, etc.)

### Où est enregistré laureolivie.fr ?

Le **registrar** est l’organisme chez qui vous avez acheté le domaine. Pour le trouver :

- Si vous avez acheté le domaine via O2switch → c’est O2switch.
- Sinon : https://www.whois.com/whois/laureolivie.fr (section « Registrar »).

### Sauvegarde WordPress (optionnel)

Si vous voulez conserver une trace du contenu WordPress :

1. Export des articles : WordPress → Outils → Exporter.
2. Sauvegarde des médias : téléchargez le dossier `wp-content/uploads`.
3. Gardez une copie en lieu sûr (ordinateur, cloud).

---

## Partie A : Configurer Cloudflare

### ÉTAPE A1 : Créer un compte Cloudflare

1. Ouvrez **https://cloudflare.com**
2. Cliquez sur **S’inscrire** (ou **Sign up**)
3. Entrez votre email (ex. laureolivie@yahoo.fr) et un mot de passe
4. Validez le compte via l’email reçu
5. Connectez-vous sur **https://dash.cloudflare.com**

---

### ÉTAPE A2 : Ajouter le domaine laureolivie.fr

1. Sur le tableau de bord Cloudflare, cliquez sur **« Ajouter un site »** / **« Add a site »**
2. Dans le champ, tapez : **laureolivie.fr**
3. Cliquez sur **« Ajouter un site »**
4. Cloudflare analyse le domaine et affiche les enregistrements existants

---

### ÉTAPE A3 : Choisir le plan

1. Sélectionnez le plan **Gratuit** (Free)
2. Cliquez sur **« Continuer »** / **« Continue »**

---

### ÉTAPE A4 : Vérifier les enregistrements importés

Cloudflare importe les enregistrements DNS actuels. Vérifiez la liste et **gardez notamment** :

- Les enregistrements **MX** (emails @laureolivie.fr)
- Les enregistrements **TXT** éventuels (vérification, SPF, DKIM, etc.)
- Les sous-domaines utiles (ex. mail.laureolivie.fr si vous l’utilisez)

Vous pouvez **supprimer** les enregistrements A qui pointent vers O2switch (109.234.164.110) : ils seront remplacés par le CNAME vers Railway.

---

### ÉTAPE A5 : Changer les serveurs DNS du domaine

Cloudflare affiche deux serveurs de noms, par exemple :

- **ada.ns.cloudflare.com**
- **bob.ns.cloudflare.com**

(Vos noms seront différents.)

**Important** : il faut déclarer ces serveurs chez le **registrar** du domaine (O2switch, OVH, Gandi, etc.).

#### Si le domaine est chez O2switch

1. Connectez-vous à **o2switch.net**
2. Cherchez la section **Domaines** / **Gestion des domaines** / **Nameservers**
3. Repérez laureolivie.fr et modifiez les **serveurs de noms (nameservers)**
4. Remplacez les serveurs actuels par ceux fournis par Cloudflare (ada.ns.cloudflare.com et bob.ns.cloudflare.com)
5. Enregistrez les modifications

#### Si le domaine est chez un autre registrar

1. Connectez-vous au panneau du registrar (OVH, Gandi, etc.)
2. Trouvez **laureolivie.fr** dans la liste des domaines
3. Ouvrez la gestion des **serveurs DNS** / **nameservers**
4. Remplacez par les deux serveurs Cloudflare
5. Sauvegardez

La propagation peut prendre de **quelques minutes à 48 heures**. Cloudflare vous indiquera quand le domaine est actif.

---

### ÉTAPE A6 : Configurer les enregistrements DNS dans Cloudflare

Une fois Cloudflare actif pour laureolivie.fr :

1. Allez dans **Réseau** (ou **DNS**) → **Enregistrements** / **Records**
2. Vous voyez la liste des enregistrements

#### Modifier le domaine principal (laureolivie.fr)

1. Repérez l’enregistrement **A** pour `laureolivie.fr` (ou `@`) pointant vers 109.234.164.110
2. Cliquez sur **Modifier** (icône crayon)
3. Changez le **Type** en **CNAME**
4. Dans **Cible** / **Target**, mettez : **arfrn56y.up.railway.app**  
   (ou l’URL exacte indiquée par Railway)
5. Laissez **Proxy activé** (bouton orange) pour bénéficier du CDN et du SSL
6. Enregistrez

#### Ajouter l’enregistrement TXT de vérification Railway

1. Cliquez sur **« Ajouter un enregistrement »** / **« Add record »**
2. **Type** : TXT
3. **Nom** : `_railway-verify`
4. **Contenu** / **Content** : collez la valeur complète fournie par Railway (ex. `railway-verify=ae0af6c9e781103f039f2c47...`)
5. Enregistrez

#### Configurer www

1. Cherchez un enregistrement pour `www`
2. S’il existe en A, modifiez-le en **CNAME** vers `arfrn56y.up.railway.app`
3. S’il n’existe pas, créez un nouvel enregistrement :
   - Type : CNAME
   - Nom : www
   - Cible : arfrn56y.up.railway.app
4. Enregistrez

#### Conserver les MX (emails)

Ne modifiez pas les enregistrements MX si vos emails @laureolivie.fr fonctionnent. S’ils pointent vers O2switch et que vous gardez l’hébergement email chez O2switch, laissez-les tels quels.

---

### ÉTAPE A7 : Redirection non-www → www (URL canonique)

**Configuration retenue** : `https://www.laureolivie.fr` est l’URL canonique. Cette redirection évite l’erreur `ERR_ECH_FALLBACK_CERTIFICATE_INVALID` sur Chrome (conflit ECH / Cloudflare).

1. Dans Cloudflare, allez dans **Règles** / **Rules** → **Redirect Rules** (ou **Page Rules**)
2. Créez une règle de redirection :
   - **Si** : Hostname égal à `laureolivie.fr` (sans www)
   - **Alors** : Redirection 301 vers `https://www.laureolivie.fr` (conserver le chemin)
3. **Important** : si vous aviez une règle www → non-www, supprimez-la d’abord.

**Avec Page Rules** : URL `*laureolivie.fr/*` (sans www), Forwarding URL vers `https://www.laureolivie.fr/$1`, status 301.

---

## Partie B : Configurer Railway

### ÉTAPE B1 : Ajouter le domaine personnalisé

1. Allez sur **https://railway.app**
2. Ouvrez le projet **site-formation**
3. Cliquez sur le **service** (votre application)
4. **Settings** → **Networking** → **Custom Domain**
5. Cliquez sur **« Add Custom Domain »**
6. Entrez : **laureolivie.fr**
7. Entrez aussi : **www.laureolivie.fr** (ou laissez Railway le gérer si vous redirigez tout vers non-www)
8. Railway affiche les enregistrements à ajouter (CNAME, TXT) — vous les avez déjà configurés dans Cloudflare

---

### ÉTAPE B2 : Variable d’environnement pour l’URL canonique

1. Toujours dans le projet Railway, ouvrez **Variables** (onglet ou section)
2. Ajoutez ou modifiez :
   - **Clé** : `NEXT_PUBLIC_SITE_URL`
   - **Valeur** : `https://www.laureolivie.fr`
3. Enregistrez

Cela permet à l’application de générer correctement :
- Les URLs canoniques
- Le sitemap
- Les métadonnées Open Graph et Twitter

---

### ÉTAPE B3 : Vérifier le déploiement

1. Railway redéploie automatiquement après modification des variables
2. Attendez la fin du déploiement (quelques minutes)
3. Testez : **https://www.laureolivie.fr** et **https://laureolivie.fr** (doit rediriger vers www)

---

## Partie C : SEO et finalisation

### C1 : Google Search Console

1. Allez sur **https://search.google.com/search-console**
2. Cliquez sur **« Ajouter une propriété »**
3. Choisissez **« Préfixe d’URL »**
4. Entrez : **https://www.laureolivie.fr**
5. Pour la vérification, choisissez **« Balise HTML »** ou **« enregistrement DNS »**
6. Si balise HTML : récupérez le code, ajoutez-le dans `app/layout.tsx` dans `metadata.verification.google`
7. Si DNS : ajoutez l’enregistrement TXT proposé dans Cloudflare
8. Validez la propriété
9. Soumettez le sitemap : **https://www.laureolivie.fr/sitemap.xml**

### C2 : Contenu déjà optimisé dans l’application

L’application utilise déjà :

- `lib/seo.ts` : titre, description, mots-clés, Open Graph
- `app/sitemap.ts` : sitemap XML dynamique
- `app/robots.ts` : robots.txt
- Schémas structurés (Organization, LocalBusiness)

Il suffit que `NEXT_PUBLIC_SITE_URL` soit bien `https://www.laureolivie.fr`.

### C3 : Liens internes

Les liens et schémas utilisent déjà `https://www.laureolivie.fr` via `SITE_CONFIG.url`.

---

## Dépannage

### Le site ne s’affiche pas après 1 heure

- Vérifiez la propagation DNS : https://dnschecker.org
- Vérifiez dans Cloudflare que le CNAME et le TXT sont corrects
- Vérifiez dans Railway que le domaine est bien ajouté et vérifié

### Erreur de certificat SSL

- Cloudflare et Railway génèrent les certificats automatiquement
- Attendez 24h maximum
- Dans Cloudflare : SSL/TLS → « Complet » ou « Complet (strict) »

### Les emails ne fonctionnent plus

- Vérifiez que les enregistrements MX n’ont pas été modifiés
- Si vous avez tout réimporté depuis O2switch, les MX devraient être conservés

### Railway indique « Domain not verified »

- Vérifiez que l’enregistrement TXT `_railway-verify` est bien présent dans Cloudflare
- Utilisez la valeur exacte fournie par Railway, sans espace

### Chrome : ERR_ECH_FALLBACK_CERTIFICATE_INVALID (laureolivie.fr sans www)

Sur Chrome, `https://laureolivie.fr` peut afficher cette erreur (conflit ECH / Cloudflare). **Solution retenue** : URL canonique en **www**. Une redirection non-www → www (ÉTAPE A7) envoie tous les visiteurs vers `https://www.laureolivie.fr`, qui fonctionne dans tous les navigateurs.

---

## Récapitulatif des URLs importantes

| Usage | URL |
|-------|-----|
| Site principal | https://www.laureolivie.fr |
| Sitemap | https://www.laureolivie.fr/sitemap.xml |
| Robots | https://www.laureolivie.fr/robots.txt |
| Google Search Console | https://search.google.com/search-console |

---

---

## Partie D : Autoriser les bots IA (GEO — ChatGPT, Claude, Perplexity)

Pour que votre site soit référencé dans les réponses de ChatGPT, Claude, Perplexity et Google AI Overviews, les crawlers IA doivent pouvoir accéder à vos pages. Voici comment configurer Cloudflare pour **autoriser** ces bots.

### D1 : Vérifier le réglage global « Block AI bots »

1. Connectez-vous à **https://dash.cloudflare.com**
2. Sélectionnez **laureolivie.fr**
3. Allez dans **Sécurité** (Security) → **Paramètres** (Settings)
4. Repérez la section **« Block AI bots »** / **« Bloquer les bots IA »**
5. Choisissez **« Do not block (off) »** / **« Ne pas bloquer (désactivé) »**
6. Enregistrez

→ Si cette option était activée, les bots IA (GPTBot, ClaudeBot, etc.) étaient bloqués. La désactiver les autorise globalement.

### D2 : Contrôle individuel via AI Crawl Control

Pour gérer chaque crawler (Allow / Block) :

1. Dans le tableau de bord Cloudflare, sélectionnez **laureolivie.fr**
2. Allez dans **Paramètres** (Settings) → **AI Crawl Control**
   - Ou directement : **https://dash.cloudflare.com/** → votre compte → laureolivie.fr → **AI**
3. Onglet **Crawlers** : vous verrez la liste des bots IA détectés (GPTBot, ClaudeBot, Google-Extended, etc.)
4. Pour chaque crawler que vous souhaitez autoriser, dans la colonne **Action**, sélectionnez **Allow** (Autoriser)
5. Enregistrez

**Bots à autoriser pour le GEO :**
- **GPTBot** (OpenAI — ChatGPT)
- **ClaudeBot** (Anthropic — Claude)
- **Google-Extended** (Google AI / Bard)
- **PerplexityBot** (Perplexity)
- **Cohere AI** (si pertinent)

### D3 : Vérifier les règles WAF personnalisées

Si vous avez des règles de pare-feu personnalisées qui bloquent certains User-Agents :

1. Allez dans **Sécurité** → **Pare-feu WAF** (WAF)
2. Vérifiez les **règles personnalisées** (Custom rules)
3. Assurez-vous qu’aucune règle ne bloque les User-Agents : `GPTBot`, `ClaudeBot`, `Google-Extended`, `PerplexityBot`

→ Si une règle bloque ces bots, modifiez-la ou supprimez-la pour le domaine laureolivie.fr.

### D4 : robots.txt de votre site

Votre application génère déjà un `robots.txt` via `app/robots.ts`. Assurez-vous qu’il **n’interdit pas** explicitement les bots IA. Exemple à éviter :

```
User-agent: GPTBot
Disallow: /
```

Pour autoriser tous les crawlers sur tout le site, ne pas ajouter de règles `Disallow` pour ces User-Agents.

---

*Dernière mise à jour : mars 2026*
