# CLAUDE.md

Guide pour travailler dans ce dépôt. Écris et commente en **français**.

## Ce qu'est le projet

`site-formation` — le site et la plateforme de **laureolivie.fr** : site vitrine SEO/GEO + LMS (espace apprenant, admin/formateur) pour **OFC Création d'Entreprise**, l'organisme de formation IA/ChatGPT pour le BTP de Laure Olivié. Le site héberge aussi une section **BeWork** (plateformes internes intelligentes pour le BTP), un pipeline média/agent et une bibliothèque de skills.

## Stack & commandes

- **Next.js 16** (App Router) · **React 19** · **Tailwind CSS v4** · **TypeScript** · **Node ≥ 20**
- **Supabase** (auth + BDD, `@supabase/ssr`) · **Stripe** · **Resend** (email) · **OpenAI** · **docx**
- Déploiement : **Railway** (`railway.toml`) et **Vercel** (`vercel.json`, crons)

```bash
npm run dev              # serveur de dev
npm run build            # build les skills puis next build (max-old-space 4096)
npm run lint             # eslint
npm run validate:schema  # valide les JSON-LD (schema, Course, FAQ article)
npm run audit:qualiopi-liens   # audit des liens Qualiopi
```

Autres scripts utiles : `skills:build`, `media:trends`, `media:generate[:ai]`, `media:publish`, `agent:index`, `import:teachizy`. Voir `scripts/` et la section `scripts` de `package.json`.

Pas de suite de tests automatisés : la validation passe par `lint`, `validate:schema` et les scripts d'audit.

## Structure

- `app/` — App Router (103 entrées : ~pages formation/SEO géolocalisées, `blog/`, `bework/`, `espace-apprenant/`, `admin/`, `api/`, `cours/`, `diagnostic-ia-btp/`, etc.)
- `lib/` — cœur logique : contenus, SEO, schémas JSON-LD, liens internes, données formations. **Source de vérité** de la plupart des constantes (voir plus bas).
- `components/` · `src/` (composants + data) · `hooks/`
- `config/qualiopi.ts` — indicateurs de résultats Qualiopi (sourcés, datés)
- `supabase/` — migrations + seeds SQL
- `content/`, `contenu/`, `docs/` — contenus et documentation
- `.cursorrules` — **règles projet exhaustives** (charte, SEO, schema, Qualiopi). À lire avant toute modif de contenu ou de page.

## Conventions non négociables

Ces règles sont porteuses. Le détail complet est dans `.cursorrules` ; voici ce qu'il ne faut jamais casser.

⦿ **Sources uniques (jamais de valeurs en dur)**
- Identité OFC / Laure (SIRET, NDA, email, GPS, note agrégée) → `lib/schema-constants.ts` ; le SEO global (`SITE_CONFIG` dans `lib/seo.ts`) s'y aligne.
- Liens internes → `lib/internal-links.ts` (étendre le fichier, jamais d'URL en dur ailleurs).
- Tarifs/durées → `lib/tarifs-sessions.ts` · Qualiopi légal → `lib/qualiopi-info.ts` · indicateurs → `config/qualiopi.ts`.

⦿ **Netlinking interne** : jamais 2 liens vers la même URL sur une page ; max 5 liens/article de blog ; ancres descriptives ; jamais `/tarifs` ni `/financement-constructys` seuls (utiliser `/financement-constructys-formation-ia-btp`).

⦿ **Schema.org** : toute nouvelle page vérifie `JsonLd` ; formation → `Course` (`getFormationCoursePageJsonLd`) ; article blog → `BlogPosting` via `ArticleJsonLd` (+ `BlogArticleFaqJsonLd`, `Breadcrumb`). Tester sur Google Rich Results après ajout.

⦿ **SEO** : title `[Mot-clé] : [bénéfice] | Laure Olivié` (≤ 65 car.) ; meta description ≤ 160 car. contenant une des expressions clés (« formation IA pour le BTP », « ChatGPT BTP »…) ; 1 H1/page ; chaque nouvelle page reçoit ≥ 1 lien interne.

⦿ **Images (SEO + WCAG)** : alt factuel + 1 mot-clé, ≤ 125 car., sans « image de » ; décoratif → `alt=""` ; alts centralisés (`lib/photos.ts`, `lib/client-logos.ts`) ; 1 seule image/article de blog (hero).

⦿ **Qualiopi (juridique — ne jamais retirer)** : footer avec SIRET `905 244 281 00010` + NDA `11788515078` + « Cet enregistrement ne vaut pas agrément de l'État » + `<QualiopiBadge />` (jamais le logo seul). Fiches formation : les 9 sections réglementaires via `InfosQualiopi`/`CatalogueInfosQualiopi`, aucune supprimée. Jamais « financement garanti » → « financement OPCO possible selon éligibilité ». Toute promesse chiffrée → `<DisclaimerGains />`.

## Les deux marques (séparation stricte)

Un contenu = une seule marque. Ne jamais les mélanger sur une même page/section.

⦿ **OFC Création d'Entreprise** — formation IA/ChatGPT pour le BTP. Bleu `#377CF3`. Voix Laure, 1re personne. Qualiopi/Constructys/OPCO. Calendly : `https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation`. Île-de-France.

⦿ **BeWork** (bework.fr) — plateformes internes intelligentes pour le BTP, configurées pour chaque organisation et augmentées par l'IA. Bleu `#1D4ED8`. Voix collective nous/on. Positionnement : « Plateformes internes intelligentes pour le BTP ». **Service distinct, non éligible OPCO** : le logo Qualiopi et les mentions OPCO/OFC ne doivent JAMAIS apparaître dans la section BeWork. BeWork conçoit, déploie et fait évoluer la plateforme — ce sont les collaborateurs du client qui l'utilisent au quotidien.

## Skills

- `.cursor/skills/` — skills Cursor (ex. `verification-dtu-bework`, adossé à `lib/dtu-verification/` et `app/api/verification-dtu-bework/`).
- `.claude/skills/` — skills Claude Code (ex. `agent-linkedin-laure`, stratège LinkedIn).
- `lib/bibliotheque-skills/` + `scripts/build-bibliotheque-skills.mjs` — bibliothèque de skills exposée sur le site (buildée avant `next build`).

## Git

Développer sur la branche désignée, committer avec `Claude <noreply@anthropic.com>`. L'écriture GitHub peut être restreinte selon la session.
