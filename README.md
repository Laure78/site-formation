# Site Formation

Site vitrine + plateforme de formations en ligne.

## Fonctionnalités

- **Site vitrine** : Accueil, offres, tarifs
- **Catalogue** : Liste des formations, détail par cours
- **Authentification** : Inscription / connexion (email + mot de passe)
- **Espace apprenant** : Suivi de progression
- **Espace formateur / admin** : Création de cours (modules, leçons : vidéos, PDF, quiz, textes)

## Stack

- Next.js 16 (App Router)
- Tailwind CSS
- Supabase (auth, base de données)

## Démarrage

```bash
npm install
cp .env.example .env.local
# Remplir NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

## Supabase

1. Crée un projet sur [supabase.com](https://supabase.com)
2. Active l'authentification par email/mot de passe dans Auth > Providers
3. Colle les clés dans `.env.local`
4. Exécute les migrations dans l’onglet SQL du dashboard Supabase : `supabase/migrations/001_initial.sql`

## Structure

- `app/page.tsx` — Accueil
- `app/offres` — Nos offres
- `app/tarifs` — Tarifs
- `app/formations` — Catalogue
- `app/auth/connexion` — Connexion
- `app/auth/inscription` — Inscription
- `app/espace-apprenant` — Espace apprenant (connecté)
- `app/admin` — Espace formateur / admin (création de cours)

## SEO / GEO — `public/llms.txt`

Fichier servi en `text/plain` à `/llms.txt` (référencé en commentaire dans `/robots.txt`).

**Maintenance obligatoire** : mettre à jour `public/llms.txt` à chaque création de page pilier, page métier, ou changement de tarif.
