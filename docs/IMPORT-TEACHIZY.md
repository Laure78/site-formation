# Import des contenus Teachizy

Guide pour migrer le contenu pédagogique Teachizy vers la plateforme de formation laureolivie.fr.

## Structure mise en place

### 1. Dossier des PDF
Les fichiers PDF sont stockés dans :
```
/public/formations/btp/
```

Placez vos slides PDF exportées depuis Teachizy dans ce dossier.

### 2. Configuration d'import

Éditez `scripts/import-teachizy-config.ts` pour définir les contenus par module :

```ts
{
  moduleTitle: 'Devis et chiffrages',
  pdfs: ['prompting-devis-btp.pdf', 'automatisation-devis.pdf'],
  links: [
    { url: 'https://chat.openai.com', title: 'ChatGPT' },
    { url: 'https://perplexity.ai', title: 'Perplexity' },
  ],
},
```

- **moduleTitle** : doit correspondre exactement au titre du module (seed_formations.sql)
- **pdfs** : noms des fichiers dans `/public/formations/btp/`
- **links** : tutoriels, outils IA, documentation (URL + titre optionnel)

### 3. Lancer l'import

1. Placez vos PDF dans `/public/formations/btp/`
2. Mettez à jour `scripts/import-teachizy-config.ts`
3. Exécutez :

```bash
npm run import:teachizy
```

**Prérequis** : `SUPABASE_SERVICE_ROLE_KEY` et `NEXT_PUBLIC_SUPABASE_URL` dans `.env.local`

## Fonctionnalités

- **Lecteur PDF** : affichage des slides dans la zone centrale
- **Onglets** : plusieurs PDF par leçon → sélecteur en haut
- **Ressources pédagogiques** : section avec liens vers tutoriels, outils IA, docs
- **Progression auto** : la leçon est marquée complétée après 5 s de consultation

## Modules de la formation IA BTP

- Devis et chiffrages
- Emails et relation client
- Comptes rendus et DOE
- Gestion administrative

---

## Formation « Répondre aux Appels d'Offres BTP avec l'IA »

**Dossier des slides** : `/public/formations/appels-offres/`

Placez vos PDF dans ce dossier, puis via **Admin → Formations → Répondre aux appels d'offres BTP avec l'IA** :

1. Module **Introduction** → Ajouter leçon → Type « Slides PDF » → URL `/formations/appels-offres/01-introduction.pdf`
2. **MODULE 1** — Analyse DCE avec NotebookLM → idem
3. **MODULE 2** — Décision Go/No Go + Rentabilité → idem
4. **MODULE 3** — Rédaction mémoire technique et relecture → idem
5. **MODULE 4** — Aide au chiffrage & contrôle de rentabilité → idem

Voir `public/formations/appels-offres/README.md` pour le détail.
