# Dépannage — Formulaire « Prendre rendez-vous »

---

## Erreur : « Une erreur est survenue. Veuillez réessayer ou nous contacter… »

Cette erreur apparaît quand l’insertion en base Supabase échoue. Causes possibles :

---

## 1. Table `appointments` absente

La table doit exister dans Supabase.

1. Supabase → **SQL Editor** → **New query**
2. Copier le contenu de `supabase/migrations/002_appointments.sql`
3. Exécuter (Run)

---

## 2. Variables Supabase manquantes sur Railway

Dans Railway → projet → **Variables**, vérifier :

- `NEXT_PUBLIC_SUPABASE_URL` (ex. `https://xxx.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (clé publique « anon »)

Sans ces variables, la connexion à Supabase ne fonctionne pas.

---

## 3. RLS (Row Level Security)

La migration 002 définit une policy qui autorise l’insertion en anonyme :

```sql
create policy "Insertion rendez-vous (anonyme)" on public.appointments for insert with check (true);
```

Si la migration est correctement appliquée, aucune configuration supplémentaire n’est nécessaire.

---

## 4. Voir l’erreur exacte

1. Railway → projet → **Deployments** → dernier déploiement
2. Ouvrir les **logs**
3. Rechercher `[createAppointment]` pour voir le message d’erreur Supabase

---

## Checklist

- [ ] Migration 002 appliquée sur Supabase
- [ ] `NEXT_PUBLIC_SUPABASE_URL` défini sur Railway
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` défini sur Railway
- [ ] Redéploiement après modification des variables
