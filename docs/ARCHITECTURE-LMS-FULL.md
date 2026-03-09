# LMS SaaS — Architecture complète

Plateforme EdTech type Skool / Kajabi / Teachable pour formations IA BTP.

## Stack

| Composant | Techno |
|-----------|--------|
| Frontend | Next.js 16, React 19, Tailwind 4 |
| Backend | Supabase (Auth, DB, Storage) |
| Paiement | Stripe |
| Vidéo | Vimeo / Supabase Storage |
| PDF | jsPDF ou API |

## Modules

```
┌─────────────────────────────────────────────────────────────────┐
│                     LMS SaaS Platform                             │
├─────────────────────────────────────────────────────────────────┤
│ Auth        │ Courses      │ Community  │ Payments   │ Analytics │
│ - Email     │ - Builder    │ - Posts    │ - Stripe   │ - Charts  │
│ - Google    │ - Modules    │ - Comments │ - Webhook  │ - Stats   │
│ - Reset     │ - Lessons    │ - Likes    │ - Checkout │           │
│ - Avatar    │ - Quiz       │ - Pin      │            │           │
├─────────────┼──────────────┼────────────┼────────────┼───────────┤
│ Progress    │ Certificates │ Gamification │ AI Assistant       │
│ - Tracking  │ - PDF        │ - Points     │ - OpenAI           │
│ - Resume    │ - Download   │ - Badges     │ - Course context    │
└─────────────┴──────────────┴──────────────┴────────────┴───────────┘
```

## Rôles

- **apprenant** : cours, community, progression
- **moderator** : modération community, pin posts
- **formateur** : CRUD cours, analytics
- **admin** : tout

## Tables (004)

- `community_posts`, `community_comments`, `community_likes`
- `badges`, `user_badges`
- `certificates`
- `quiz_attempts`
- `profiles.points`, `profiles.avatar_url`
- Rôle `moderator`

## Déploiement

Vercel + variables : Supabase, Stripe, OpenAI (optionnel).
