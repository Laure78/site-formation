# Tuto : créer un Skill Claude pour la maîtrise d'œuvre (lettre de commande)

Meta Title : Créer un Skill Claude pour la maîtrise d'œuvre (tuto)  *(53 car.)*
Meta Description : Tuto pas à pas : transformer votre trame de lettre de commande en Skill Claude réutilisable par toute l'équipe de maîtrise d'œuvre. Nom, instructions, test.  *(156 car.)*
URL : /blog/tuto-skill-claude-maitrise-oeuvre
Mot-clé principal : Skill Claude maîtrise d'œuvre · Secondaires : Claude AI maître d'œuvre, Claude Skills BTP, formation Claude AI maîtrise d'œuvre
Schema : Article + HowTo + FAQPage

*Temps de lecture : 6 min · Mis à jour le 11 novembre 2026 · Par Laure Olivié, formatrice IA spécialisée BTP*

**En bref** : un Skill Claude est un ensemble d'instructions, de trames et de règles que Claude applique automatiquement quand la demande correspond. Pour un maître d'œuvre, transformer la trame de lettre de commande en Skill permet à toute l'équipe d'obtenir le même résultat, avec les mêmes contrôles, sans réécrire le prompt à chaque fois.

---

## Prompt, Projet ou Skill : quelle différence ?
| | Prompt | Projet | Skill |
|---|---|---|---|
| Ce que c'est | Une consigne ponctuelle | Un espace avec des documents d'une opération | Une méthode réutilisable |
| Portée | Une conversation | Une opération | Toutes les opérations, toute l'équipe |
| Exemple | « Rédige cette LC » | Projet « Opération X » | Skill « Lettre de commande » |

## Étape 1 — Choisir une tâche répétitive et stable
Bon candidat : lettre de commande, avenant, OS, demande d'agrément, PV de levée des réserves. Mauvais candidat : une tâche qui change à chaque fois.

## Étape 2 — Écrire le nom et la description de déclenchement
- **Nom** : `lettre-de-commande-moe`
- **Description** : « Rédige une lettre de commande de travaux à partir du récapitulatif d'opération et du devis retenu. À utiliser dès que l'utilisateur demande une lettre de commande, une LC ou un bon de commande travaux. »

La description décide quand Claude utilise le Skill : soyez explicite.

## Étape 3 — Rédiger les instructions
```
1. Demande ou repère : opération, lot, entreprise, devis retenu, montant HT, délais.
2. Complète la trame jointe (avec ou sans CCAP selon le cas).
3. Liste les pièces contractuelles de CETTE opération uniquement
   (CCAP, CCTP du lot avec indice, études, PGCSPS, RICT).
4. Montant HT en chiffres et en toutes lettres.
5. Termine par un encadré « Contrôles » : pièces, montants, délais, paiement.
6. N'invente rien : [À COMPLÉTER] si une donnée manque.
```
Joignez votre trame Word au Skill.

> **Construire votre bibliothèque de Skills en équipe ?** [Réservez votre visio découverte gratuite](/prendre-rdv?src=tuto-skill)

## Étape 4 — Tester sur une affaire réelle
Lancez trois demandes différentes (lot avec CCAP, sans CCAP, donnée manquante). Corrigez les instructions à chaque écart. Un Skill se stabilise en quelques itérations.

## Étape 5 — Partager et gouverner
- Partager le Skill avec l'équipe (selon l'offre Claude Team et les réglages de l'administrateur)
- Désigner un référent Skills qui gère les versions
- Écrire les règles : confidentialité, relecture obligatoire

## Quels Skills pour un cabinet de maîtrise d'œuvre ?
- Administratif : lettre de commande, avenant, OS, agrément, contrôle de situation, courriers LRAR
- Consultation : analyse CCTP/CCAP, dépouillement des offres
- Chantier : visite de chantier, contrôle de complétude PPSPS, réception / DOE / PVLR

## FAQ
**Faut-il savoir coder ?**
Non. Un Skill s'écrit en français ; Claude peut même vous aider à le rédiger.

**Les Skills sont-ils disponibles dans toutes les offres Claude ?**
Les fonctionnalités évoluent ; vérifiez dans les réglages de votre espace. Le partage en équipe dépend de l'administrateur.

**Peut-on faire la même chose avec ChatGPT ?**
Un GPT personnalisé s'en approche, avec un fonctionnement différent.

**Où apprendre à créer ses Skills ?**
Dans le Niveau 2 de la [formation IA maîtrise d'œuvre](/formations/ia-maitrise-oeuvre) ou la formation [Maîtriser Claude AI dans le BTP](/formations/maitriser-claude-ai-btp), en présentiel en Île-de-France.

---
**À propos de l'auteure** : Laure Olivié, fondatrice de l'organisme de formation OFC Création d'Entreprise (certifié Qualiopi), 7 ans dans le BTP comme ex-dirigeante d'ALIA BTP, instructrice LinkedIn Learning. Formations IA pour les PME du BTP, en présentiel en Île-de-France.
👉 [Réservez votre visio découverte gratuite](/prendre-rdv?src=tuto-skill)
