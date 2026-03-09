# Créer toutes les formations dans l'admin

Ce guide permet de pré-remplir la plateforme avec les 7 formations IA BTP (objectifs, prérequis, programme, modules).

## Prérequis

1. **Migration 005** exécutée (colonnes `objectifs`, `prerequis`, `programme` sur `courses`)

   Dans Supabase → SQL Editor :

   ```sql
   alter table public.courses
     add column if not exists objectifs text,
     add column if not exists prerequis text,
     add column if not exists programme text;
   ```

2. Bucket **formations** créé dans Storage (optionnel, pour les uploads)

## Exécuter le seed

1. Ouvrez **Supabase** → **SQL Editor** → **New query**
2. Copiez tout le contenu du fichier `supabase/seed_formations.sql`
3. Collez dans l'éditeur et cliquez sur **Run**
4. Vérifiez le message **Success**

## Résultat

Après exécution, 7 formations apparaissent dans l'admin :

- L'IA au service du BTP
- Répondre aux appels d'offres BTP avec l'IA
- Formation IA pour la Fonction RH dans le BTP
- IA & Travaux Publics
- Formation IA BTP à Paris
- Formation IA BTP : Productivité chantier
- IA pour PME du BTP

Chaque formation contient :

- **Description**, **objectifs**, **prérequis**, **programme**
- **Modules** prêts à recevoir des leçons (vidéos, slides, texte)

Rendez-vous sur **http://localhost:3000/admin/formations** pour les voir.
