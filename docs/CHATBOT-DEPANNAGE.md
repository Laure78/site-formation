# Dépannage du chatbot « Assistant Laure »

---

## Erreur : « Désolé, une erreur est survenue »

Le chatbot affiche ce message quand l’API `/api/chat` échoue. Vérifier les points suivants :

---

## 1. Variables d’environnement sur Railway

Dans Railway → votre projet → **Variables** :

| Variable | Obligatoire |
|----------|-------------|
| `OPENAI_API_KEY` | Oui |
| `SUPABASE_SERVICE_ROLE_KEY` | Oui |
| `NEXT_PUBLIC_SUPABASE_URL` | Oui |

- **SUPABASE_SERVICE_ROLE_KEY** : Supabase → Settings → API → `service_role` (Reveal)
- **OPENAI_API_KEY** : platform.openai.com → API keys

Après modification, Railway redéploie. Attendre 2–3 minutes.

---

## 2. Migration Supabase appliquée

Les tables et la fonction RAG doivent exister :

1. Supabase → **SQL Editor**
2. Nouvelle requête
3. Coller et exécuter le contenu de `supabase/migrations/010_chat_agent.sql`

Ou via CLI : `supabase db push`

---

## 3. Extension pgvector activée

1. Supabase → **Database** → **Extensions**
2. Chercher **vector**
3. Cliquer sur **Enable**

---

## 4. Base de connaissance indexée

Même avec les tables en place, la table `knowledge_chunks` peut être vide.

En local (avec les variables dans `.env.local`) :

```bash
npm run agent:index
```

Cela remplit la base. En production, les chunks sont dans Supabase, donc une indexation faite en local met à jour la même base si `NEXT_PUBLIC_SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` pointent vers le même projet.

---

## Résumé des vérifications

1. Railway : `OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
2. Supabase : migration 010 appliquée, extension vector activée
3. Indexation : `npm run agent:index` exécuté au moins une fois
