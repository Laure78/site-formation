# Tuto : contrôler une situation de travaux avec l'IA en 5 étapes

Meta Title : Contrôler une situation de travaux avec l'IA (tuto)  *(51 car.)*
Meta Description : Tuto maître d'œuvre : contrôler une situation de travaux avec Claude ou ChatGPT — avancement, avenants, retenue de garantie, mail de correction.  *(144 car.)*
URL : /blog/tuto-controle-situation-travaux-ia
Mot-clé principal : contrôler une situation de travaux IA · Secondaires : situation de travaux maître d'œuvre, IA DET, vérifier situation entreprise
Schema : Article + HowTo + FAQPage

*Temps de lecture : 6 min · Mis à jour le 11 novembre 2026 · Par Laure Olivié, formatrice IA spécialisée BTP*

**En bref** : pour contrôler une situation de travaux avec l'IA, on lui fournit le marché (CCAP, DPGF, avenants), la situation précédente et la nouvelle, puis on lui demande un tableau d'écarts poste par poste avec l'article du CCAP appliqué. L'IA repère les incohérences et rédige la demande de correction ; le maître d'œuvre vérifie les calculs dans Excel et valide.

---

## Ce que vous allez obtenir
- Un tableau d'écarts : poste | avancement déclaré | avancement constaté | écart | règle CCAP.
- Un contrôle des avenants intégrés, de la retenue de garantie et du cumul.
- Un projet de mail de demande de correction à l'entreprise.

## Étape 1 — Rassembler les bonnes pièces
- CCAP (modalités de paiement, retenue de garantie, révision des prix)
- DPGF ou décomposition du marché, **en Excel de préférence**
- Avenants signés
- Situation n-1 et situation n (bordereau pour acompte, demande de règlement)
- Vos constats d'avancement (compte rendu de visite)

## Étape 2 — Créer un Projet par opération
Dans Claude (Projets) ou ChatGPT (Projets ou GPT personnalisé), déposez le CCAP et la DPGF une fois pour toutes. Ajoutez en instructions : « Tu es assistant d'opération en maîtrise d'œuvre d'exécution. Tu n'inventes aucune donnée. Tu cites l'article du CCAP pour chaque règle. »

## Étape 3 — Lancer le contrôle

```
Contexte : situation n° [x] du lot [n°] — entreprise [nom]. Pièces : situation n-1,
situation n, avenants n° [..], mon constat d'avancement du [date].
Rôle : assistant d'opération rigoureux.
Action : 1) compare l'avancement déclaré à mon constat, poste par poste ;
2) vérifie que les avenants signés sont intégrés et qu'aucun avenant non signé ne l'est ;
3) contrôle la retenue de garantie (ou la caution) selon le CCAP ;
4) vérifie le cumul par rapport à la situation n-1.
Format : tableau (poste | déclaré | constaté | écart € | écart % | article CCAP),
puis liste des anomalies par ordre d'importance.
Ton : factuel. Écris [À VÉRIFIER] dès qu'une donnée manque.
```

## Étape 4 — Vérifier les calculs dans Excel
L'IA peut se tromper sur une addition. Demandez-lui les formules Excel du tableau, collez-les, et contrôlez totaux et cumuls. C'est non négociable avant toute validation.

> **Vous voulez que votre équipe fasse ça sur ses propres trames ?** [Réservez votre visio découverte gratuite](/prendre-rdv?src=tuto-situation)

## Étape 5 — Rédiger la demande de correction

```
À partir des anomalies validées ci-dessus, rédige un mail à l'entreprise [nom]
demandant une situation rectifiée. Rappelle les articles du CCAP concernés,
liste chaque correction attendue, fixe un délai de retour de [x] jours.
Ton courtois et ferme. Pas plus de 15 lignes.
```

## Exemple (fictif)
Lot menuiseries extérieures, situation n° 4 : l'entreprise déclare 80 % sur la pose alors que le constat de visite indique 60 %, et intègre un avenant n° 2 non encore signé. L'IA signale les deux écarts, rappelle la règle de retenue de garantie du CCAP et propose le mail. Le maître d'œuvre vérifie dans Excel, ajuste un montant et envoie.

## Les pièges à éviter
- Travailler sur un PDF scanné de mauvaise qualité : chiffres mal lus.
- Mélanger plusieurs opérations dans la même conversation.
- Valider sans recontrôle Excel.
- Oublier que la retenue de garantie est plafonnée à 5 % en marché privé (loi n° 71-584 du 16 juillet 1971) : vérifiez ce que dit votre CCAP.

## Aller plus loin : en faire un Skill
Une fois le prompt stabilisé, transformez-le en Skill Claude réutilisable par toute l'équipe : voir [créer un Skill Claude pour la maîtrise d'œuvre](/blog/tuto-skill-claude-maitrise-oeuvre).

## FAQ
**L'IA peut-elle valider une situation ?**
Non. Elle prépare le contrôle ; la validation et la signature restent celles du maître d'œuvre.

**Faut-il un abonnement payant ?**
Pour des pièces de marché, un espace professionnel est recommandé pour la confidentialité.

**Est-ce enseigné en formation ?**
Oui, dans le Niveau 1 de la [formation IA maîtrise d'œuvre](/formations/ia-maitrise-oeuvre), en présentiel en Île-de-France.

---
**À propos de l'auteure** : Laure Olivié, fondatrice de l'organisme de formation OFC Création d'Entreprise (certifié Qualiopi), 7 ans dans le BTP comme ex-dirigeante d'ALIA BTP, instructrice LinkedIn Learning. Formations IA pour les PME du BTP, en présentiel en Île-de-France.
👉 [Réservez votre visio découverte gratuite](/prendre-rdv?src=tuto-situation)
