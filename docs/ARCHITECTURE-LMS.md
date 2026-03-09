# Architecture LMS — Laure Olivié Formation

## Vue d'ensemble

Plateforme EdTech modulaire inspirée de Teachable, Kajabi, Thinkific.

### Mise en route

1. **Exécuter les migrations Supabase**
   - Dans le SQL Editor Supabase, exécuter `001_initial.sql`, `002_appointments.sql`, `003_lms_extended.sql` dans cet ordre.

2. **Créer le premier admin**
   - Après inscription, dans Supabase : Table `profiles` → modifier le rôle de votre utilisateur en `admin` ou `formateur`.

3. **Configurer Google OAuth** (optionnel)
   - Supabase Dashboard → Authentication → Providers → Google → activer et renseigner Client ID / Secret.

4. **Stripe** (à venir)
   - Ajouter `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` pour activer les paiements.

```
┌─────────────────────────────────────────────────────────────────────┐
│                         SITE LAUREOLIVIE.FR                          │
├─────────────────────────────────────────────────────────────────────┤
│  Vitrine (public)     │  Auth          │  Admin    │  Apprenant      │
│  - Formations         │  - Inscription │  - Stats  │  - Mes cours    │
│  - Tarifs, RDV        │  - Connexion   │  - CRUD   │  - Lecteur      │
│  - Contact            │  - Google      │  - Users  │  - Progression  │
└─────────────────────────────────────────────────────────────────────┘
```

## Stack

| Composant | Techno |
|-----------|--------|
| Frontend | Next.js 16 (App Router), React 19, Tailwind |
| Backend | Supabase (Auth, DB, Storage) |
| Paiement | Stripe |
| Vidéo | Vimeo / Supabase Storage |
| ORM | Supabase Client (pas Prisma pour cohérence) |

## Structure projet

```
app/
├── (public)/              # Site vitrine
│   ├── page.tsx
│   ├── formations/
│   └── prendre-rdv/
├── auth/                  # Connexion, inscription, reset
├── admin/                 # Dashboard formateur
│   ├── page.tsx           # Stats
│   ├── formations/        # CRUD
│   ├── apprenants/        # Liste + progression
│   └── layout.tsx        # Sidebar admin
├── espace-apprenant/      # Dashboard élève
│   ├── page.tsx           # Vue d’ensemble
│   ├── mes-formations/
│   └── cours/[slug]/      # Lecteur
├── api/
│   ├── stripe/            # Webhooks
│   └── ...
├── actions/               # Server Actions
└── layout.tsx
```

## Base de données (Supabase)

Voir `supabase/migrations/` pour le schéma complet.

## Rôles

- **apprenant** : accès aux cours achetés, progression, certificats
- **admin** : tout (stats, CRUD formations, gestion apprenants)
- **formateur** : alias admin pour ce projet (un seul formateur)

## Flux paiement

1. Apprenant clique « Acheter » → Stripe Checkout
2. Stripe webhook → `payments` + `enrollments`
3. Accès immédiat au cours

---

*Document vivant — mis à jour au fil du développement.*
