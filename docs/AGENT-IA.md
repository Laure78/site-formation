# Agent IA — Chatbot Laure Olivié

Chatbot intelligent pour laureolivie.fr : support visiteur + assistant commercial.

---

## Rôles

1. **Support** : répondre aux questions sur le site (formations, financement, contact…)
2. **Commercial** : qualifier les prospects, proposer formations, générer RDV

---

## Stack

- **LLM** : OpenAI GPT-4o-mini
- **Embeddings** : OpenAI text-embedding-3-small (1536 dim)
- **Vector DB** : Supabase pgvector
- **Frontend** : Widget chat React (bas droite)

---

## Configuration

Variables d'environnement (.env.local) :

```
OPENAI_API_KEY=sk-...              # Obligatoire pour chat + indexation
SUPABASE_SERVICE_ROLE_KEY=...      # Obligatoire (Settings > API > service_role)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...  # Déjà présent

# Optionnel : pour cron réindexation (Vercel)
CRON_SECRET=...                    # Définir dans Vercel > Settings > Environment
```

---

## Installation Supabase

1. Appliquer la migration `010_chat_agent.sql` (pgvector + tables)
2. Activer l’extension **vector** dans Supabase : Database → Extensions → vector

---

## Base de connaissance

**Sources indexées** :
- Articles blog (lib/blog.ts)
- Pages formations
- Pages statiques (accueil, contact, tarifs, etc.)
- FAQ extraites des articles

**Indexation** :

```bash
npm run agent:index
```

À lancer :
- une première fois après déploiement
- chaque nuit (cron) pour mettre à jour les nouveaux articles

---

## Widget chat

- Position : bas droite
- Questions suggérées au démarrage
- Mémoire de conversation (conversationId + visitorId)
- CTAs : Prendre RDV, Recevoir programme, Être recontacté

---

## Admin

- **/admin/agent** : conversations, prospects, chunks indexés
- **/admin/agent/conversations/[id]** : détail d'une conversation

---

## Mise à jour nocturne

Exemple cron (Vercel, GitHub Actions, ou serveur) :

```bash
0 3 * * * cd /path/to/site-formation && npm run agent:index
```

Ou via Vercel Cron : créer `app/api/cron/reindex/route.ts` protégé par CRON_SECRET.
