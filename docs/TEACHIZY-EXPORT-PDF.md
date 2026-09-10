# Export PDF Teachizy → laureolivie.fr

Guide pour récupérer automatiquement les diaporamas PDF hébergés sur Teachizy, puis préparer leur import dans le LMS.

## Contexte projet

- **Espace Teachizy (apprenants)** : `https://formation-ia-chatgpt.teachizy.fr/` (`lib/external-site-urls.ts`)
- **Admin Teachizy** : `https://app.teachizy.fr/`
- **Import LMS existant** : `scripts/import-teachizy.ts` + `scripts/import-teachizy-config.ts` → PDF dans `public/formations/…`, ressources `lesson_resources` (RLS : inscrits / admin)

## API officielle : ce qui existe / ce qui n’existe pas

Documentation : [developer.teachizy.fr](https://developer.teachizy.fr/)

| Endpoint | Usage |
| --- | --- |
| `GET /externals/automations/trainings` | Liste des formations |
| `GET /externals/automations/trainings/{uuid}/items` | Arborescence chapitres / leçons |
| Export CSV / clients | Apprenants uniquement |

**Aucun endpoint officiel ne livre les fichiers PDF des leçons** (visionneuse PDF, fichiers à télécharger, annexes).  
L’export des supports passe donc par **Playwright** (navigateur visible + votre session).

Clé API optionnelle (structure seule) : générée dans app.teachizy.fr → intégrations, puis dans `.env.local` :

```bash
TEACHIZY_API_KEY=...
# optionnel
TEACHIZY_ADMIN_URL=https://app.teachizy.fr/
TEACHIZY_STORE_URL=https://formation-ia-chatgpt.teachizy.fr/
```

Ne mettez **jamais** votre mot de passe dans le code, `.env` ou le chat.

## Prérequis

```bash
npx playwright install chromium
```

## Commandes

```bash
# 1) Inventaire (recommandé en premier)
npm run teachizy:export -- --inventory

# 2) Télécharger UNE formation (filtre par titre)
npm run teachizy:export -- --formation "IA" --max-formations 1

# 3) Après validation, toutes les formations
npm run teachizy:export -- --all

# Forcer une nouvelle connexion
npm run teachizy:export -- --login

# Préparer l’import (simulation, aucune écriture BDD)
npm run teachizy:prepare-import

# Copier les PDF vers public/formations/<slug>/ sans écraser l’existant
npm run teachizy:prepare-import -- --apply-files
```

## Déroulement

1. Une fenêtre Chromium s’ouvre sur l’admin Teachizy.
2. **Vous vous connectez vous-même**.
3. Dans le terminal, appuyez sur **Entrée**.
4. Ouvrez la liste des formations puis le **Contenu** de la formation cible ; Entrée à nouveau.
5. Le script inventorie (réseau + page), puis télécharge les PDF accessibles avec votre session.
6. Reprise possible : empreintes dans `teachizy-export/fingerprints.json`.

## Résultat test — formation UMB-FFB

Formation : **L'IA au service des professionnels du BTP - Union des Métiers du Bois UMB-FFB**

Sur Teachizy, toutes les leçons ne sont **pas** des diaporamas PDF :
- PDF (resource / visionneuse) : Programme, Module 1, Tuto CapCut / vidéo avant-après
- Excel (.xlsx) : bases de prompts modules 2–4
- Liens externes : Tally, CapCut, Google Sheets, YouTube, etc.

L’export PDF ne récupère que les fichiers PDF réellement présents.

## Fichiers produits

```
teachizy-export/
  manifest.json          # inventaire + statuts (sans cookies / jetons)
  bilan.txt
  fingerprints.json      # dédoublonnage local
  import-prep/           # brouillon config + rapport simulation
  <nom-formation>/
    01-<module>/
      01-<lecon>/
        01-support.pdf

.teachizy-auth/
  storage-state.json     # session navigateur — LOCAL UNIQUEMENT (gitignored)
```

## Règles respectées

- Pas de captures d’écran de slides : uniquement les PDF sources accessibles.
- Vérification magique `%PDF-` (rejet des pages HTML de login).
- Noms de fichiers numérotés, collisions évitées, rate-limit + retries.
- Manifeste sans cookies / secrets d’URL.
- Import production **non lancé** à cette étape ; simulation uniquement.

## Suite vers le LMS

1. Valider `teachizy-export/manifest.json` et le classement des PDF.
2. Relire `teachizy-export/import-prep/config-draft.json`.
3. Aligner les titres de modules avec ceux du seed / BDD si besoin.
4. Adapter `scripts/import-teachizy-config.ts` (ou équivalent multi-formations).
5. Seulement ensuite : `npm run import:teachizy` (écrit en BDD — hors de cette étape).

Voir aussi `docs/IMPORT-TEACHIZY.md`.
