# Seed — Maîtriser Claude AI pour le BTP (PDF BTP)

Crée la formation LMS **PDF BTP** sur la plateforme (`/admin/formations` + `/espace-apprenant`).

## Contenu

| Élément | Valeur |
|--------|--------|
| **Slug** | `pdf-btp-claude-skills` |
| **Titre** | Maîtriser Claude AI pour le BTP — Chat, Cowork & Code — PDF BTP |
| **Durée** | 4 h |
| **Support PDF** | `/formations/pdf-btp-claude-skills/Support_Claude_IA_PDF_BTP_Chat_Cowork_Code.pdf` |

**Modules :** Programme & ressources · M1 Démarrer & installer · M2 Bureau d'études · M3 Équipe travaux · M4 Direction juridique

## Exécution

1. Ouvrez **Supabase** → **SQL Editor** → **New query**
2. Copiez tout le fichier `supabase/seed_pdf_btp_claude_skills.sql`
3. Cliquez **Run**
4. Vérifiez dans **https://www.laureolivie.fr/admin/formations** (ou localhost)

Le script est **idempotent** : il met à jour le cours s'il existe déjà (par slug), puis recrée modules et leçons.

## Accès apprenant

Après seed : `/espace-apprenant/cours/pdf-btp-claude-skills` (inscription / invitation requise).
