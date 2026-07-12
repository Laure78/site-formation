# Arborescence du site — laureolivie.fr

**Base URL** : https://www.laureolivie.fr

---

## Structure des pages

```
laureolivie.fr
│
├── /                          Accueil
│
├── FORMATIONS
│   ├── /formations            Catalogue formations IA BTP
│   ├── /formation-ia-btp-paris
│   ├── /formations/ia-travaux-publics
│   ├── /formations/ia-appels-offre-btp
│   ├── /formations/ia-rh-btp
│   ├── /formations/ia-pme-btp
│   └── /formations/ia-productivite-chantier
│
├── COURS EN LIGNE (LMS)
│   ├── /cours                 Catalogue cours en ligne
│   └── /cours/[slug]          Détail cours (dynamique)
│
├── GUIDES SEO
│   ├── /chatgpt-artisans-btp
│   ├── /ia-devis-batiment
│   └── /ia-conducteur-travaux
│
├── BLOG / RESSOURCES
│   ├── /blog                  Liste des articles
│   └── /blog/[slug]           Article
│       ├── /blog/financer-formation-ia-btp-constructys
│       ├── /blog/5-cas-usage-chatgpt-artisans-btp
│       └── /blog/ia-devis-gain-temps-pme-btp
│
├── ACTIONS
│   ├── /prendre-rdv           Prendre rendez-vous
│   ├── /offres                 Nos offres
│   ├── /tarifs                 Tarifs & financement
│   └── /financement-constructys
│
├── ENTREPRISE
│   ├── /a-propos              À propos
│   ├── /contact               Contact
│   └── /clients-partenaires   Clients & partenaires
│
├── ESPACE UTILISATEUR
│   ├── /messages              Messagerie (auth requis)
│   ├── /espace-apprenant      Dashboard apprenant (auth requis)
│   │   ├── /espace-apprenant/mes-formations
│   │   └── /espace-apprenant/cours/[slug]
│   └── /install-pwa           Installer l'app mobile
│
├── AUTHENTIFICATION
│   ├── /auth/connexion        Connexion
│   ├── /auth/inscription      Inscription
│   ├── /auth/reset-password   Réinitialisation mot de passe
│   └── /auth/callback         Callback OAuth (interne)
│
├── PAGES DE CONFIRMATION
│   ├── /merci-devis           Confirmation devis
│   ├── /merci-rdv             Confirmation RDV
│   └── /achat/succes          Confirmation achat
│
├── ADMIN (réservé admin/formateur)
│   ├── /admin                 Dashboard admin
│   ├── /admin/formations      Liste formations
│   ├── /admin/formations/nouveau
│   ├── /admin/formations/[id]
│   ├── /admin/formations/[id]/modules/[moduleId]
│   ├── /admin/formations/[id]/modules/[moduleId]/lecons/[lessonId]
│   ├── /admin/apprenants      Liste apprenants
│   └── /admin/cours/nouveau
│
├── PAGES LÉGALES
│   ├── /mentions-legales
│   ├── /politique-confidentialite
│   ├── /cgv                   Conditions générales
│   └── /reglement-interieur
│
├── DOCUMENTS
│   └── /annuaire-handicap     Annuaire handicap
│
└── FICHIERS TECHNIQUES
    ├── /sitemap.xml
    └── /robots.txt
```

---

## Récapitulatif par type

| Catégorie | Nombre | Indexation |
|-----------|--------|------------|
| Pages principales | 1 | Oui |
| Formations | 7 | Oui |
| Guides SEO | 3 | Oui |
| Blog | 4 (1 liste + 3 articles) | Oui |
| Cours LMS | 2+ (dynamique) | Oui |
| Actions / Conversion | 4 | Oui |
| Entreprise | 3 | Oui |
| Espace utilisateur | 4 | Oui (auth) |
| Auth | 4 | Partiel |
| Confirmation | 3 | Non (robots) |
| Admin | 10+ | Non (robots) |
| Légales | 4 | Oui |
| Documents | 1 | Oui |

---

## Fichiers source (app/)

```
app/
├── page.tsx                       /
├── a-propos/page.tsx
├── annuaire-handicap/page.tsx
├── blog/
│   ├── page.tsx                   /blog
│   └── [slug]/page.tsx            /blog/[slug]
├── chatgpt-artisans-btp/page.tsx
├── ia-devis-batiment/page.tsx
├── ia-conducteur-travaux/page.tsx
├── formations/
│   ├── page.tsx
│   ├── ia-btp-paris/page.tsx
│   ├── ia-travaux-publics/page.tsx
│   ├── ia-appels-offre-btp/page.tsx
│   ├── ia-rh-btp/page.tsx
│   ├── ia-pme-btp/page.tsx
│   ├── ia-productivite-chantier/page.tsx
│   └── [slug]/                    (supprimé)
├── cours/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── prendre-rdv/page.tsx
├── offres/page.tsx
├── tarifs/page.tsx
├── financement-constructys/page.tsx
├── contact/page.tsx
├── clients-partenaires/page.tsx
├── messages/page.tsx
├── espace-apprenant/
│   ├── page.tsx
│   ├── mes-formations/page.tsx
│   └── cours/[slug]/page.tsx
├── install-pwa/page.tsx
├── auth/
│   ├── connexion/page.tsx
│   ├── inscription/page.tsx
│   ├── reset-password/page.tsx
│   └── callback/route.ts
├── merci-devis/page.tsx
├── merci-rdv/page.tsx
├── achat/succes/page.tsx
├── admin/
│   ├── page.tsx
│   ├── formations/page.tsx
│   ├── formations/nouveau/page.tsx
│   ├── formations/[id]/page.tsx
│   ├── formations/[id]/modules/[moduleId]/page.tsx
│   ├── formations/[id]/modules/[moduleId]/lecons/[lessonId]/page.tsx
│   ├── formations/[id]/modules/[moduleId]/lecons/nouvelle/page.tsx
│   ├── formations/[id]/modules/nouveau/page.tsx
│   ├── apprenants/page.tsx
│   └── cours/nouveau/page.tsx
├── mentions-legales/page.tsx
├── politique-confidentialite/page.tsx
├── cgv/page.tsx
├── reglement-interieur/page.tsx
├── sitemap.ts
├── robots.ts
├── layout.tsx
└── not-found.tsx
```

---

*Dernière mise à jour : mars 2026*
