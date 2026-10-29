---
name: cr-chantier-batiment
description: Transforme une dictée vocale transcrite, des notes ou des photos de visite / réunion de chantier en compte rendu de chantier Word au format de l'entreprise de bâtiment, plus le mail d'envoi, sans rien inventer et avec suivi des actions du CR précédent. Déclencher dès que l'utilisateur écrit « fais le CR », « compte rendu de chantier », « CR de visite », « CR de réunion », « réunion de chantier », « voici ma dictée chantier », « mets en forme mes notes de chantier », ou colle une transcription ou des notes de visite.
---

# Compte rendu de chantier — dictée → CR Word + mail

Le conducteur de travaux ne rédige plus son CR, il le **valide**. Entrée : transcription vocale brute, notes, photos, et si possible le CR précédent. Sortie : un CR Word au format de l'entreprise + un mail d'envoi. Objectif : 5 min de relecture au lieu de 30 à 45 min de rédaction.

---

## 0. Paramétrage entreprise (à remplir une seule fois)

Si un champ reste entre crochets, appliquer le défaut et le signaler en une ligne dans la réponse.

```yaml
entreprise: "[Raison sociale]"            # défaut : "[Entreprise]"
adresse: "[Adresse · SIRET]"              # défaut : vide
activite: "[gros œuvre / TCE / rénovation / second œuvre…]"
redacteur: "[Prénom NOM, fonction]"
couleur: "[#HEX]"                         # défaut : #1F3A5F
police: "[Arial / Calibri]"               # défaut : Arial
logo: "assets/logo.png"                   # utilisé seulement si le fichier existe
delai_observations: "[ex. 8 jours]"       # défaut : aucune mention
destinataires: "[MOA, MOE/architecte, BET, CSPS, bureau de contrôle, dirigeant, sous-traitants]"
vocabulaire:                              # ≈10 termes : abréviations, sous-traitants récurrents
  - "[GO = gros œuvre]"
  - "[le plaquiste = Ent. Martin]"
mots_interdits: ["approfondir", "synergies", "feedback", "impactant", "optimal"]
```

Si d'anciens CR (PDF / Word) sont joints : les lire d'abord et calquer structure, ton, formulations. Si l'entreprise a sa propre trame, elle **remplace** la section 3.

---

## 1. Règle d'or : ne jamais combler les trous

- Le CR contient **uniquement** ce qui figure dans la dictée, les notes ou les photos. Aucune déduction présentée comme un fait.
- Sous-traitant, date, montant, quantité ou responsable non dicté → on n'en parle pas.
- Toute ambiguïté devient un **⚠ Point à confirmer**, listé à part avec l'extrait de dictée — jamais fondu dans une phrase.
- Vigilance prioritaire (là où la dictée dérape) : **noms propres, dates, montants, quantités, n° de lots, niveaux et repères (R+1, axe B, cage 2…)**.
- Une photo n'atteste que ce qu'elle montre ; sa légende reprend la dictée, pas une interprétation.

---

## 2. Traitement

1. **Identifier le type** : visite de chantier (conducteur seul) ou réunion de chantier (MOE, plusieurs entreprises). En réunion, rattacher chaque point à l'intervenant / au lot concerné.
2. **Nettoyer** : hésitations, redites, faux départs.
3. **Corriger** un mot déformé seulement si le vocabulaire maison ou le contexte rend la correction certaine ; sinon → ⚠.
4. **Reformuler** en français écrit pro : phrases courtes, factuelles, vocabulaire chantier (avancement, blocage, retard, calage, réserve, levée, réception). Pas de « nous », pas de superlatifs.
5. **Reclasser** chaque info dans la bonne rubrique (la dictée n'est pas dans l'ordre).
6. **Dates** JJ/MM/AAAA. **Montants** en € HT sauf mention contraire. Une date relative (« jeudi prochain ») est convertie seulement si la date de visite est connue ; sinon → ⚠.
7. **Numéro de CR** : n° précédent + 1 si le CR précédent est fourni ; sinon le demander ou mettre « [n°] » et le signaler.

### Suivi du CR précédent (si fourni)
Reprendre chaque action non soldée dans le tableau d'actions avec son statut mis à jour **d'après la dictée** : *Soldée* / *En cours* / *En retard* / *Non évoquée* (jamais « soldée » par défaut).

---

## 3. Trame du CR (défaut)

1. **En-tête** : chantier, adresse, n° CR, type (visite / réunion), date et heure, rédacteur, météo si dictée, présents, absents excusés, diffusion
2. **Avancement des travaux** — par lot, avec % ou étape si dicté
3. **Points bloquants et alertes** — chaque point commence par un libellé en **gras**
4. **Planning** — retards, décalages, jalons (réception, OPR) si dictés
5. **Sous-traitants** — présence, effectif, qualité, respect du planning
6. **Sécurité, propreté, incidents**
7. **Approvisionnements et livraisons**
8. **Décisions prises**
9. **Actions à mener** — tableau : N° · Action · Responsable · Échéance · Statut
10. **Prochaine visite / réunion** (date, heure)
11. **⚠ Points à confirmer** — liste numérotée, avec l'extrait de dictée
12. **Annexe photos** (si photos jointes) — une légende courte par photo

Rubrique sans contenu : « Néant » (ne pas supprimer, ne pas inventer).

---

## 4. Livrables

### a) Word (.docx) — via le script
1. Construire le JSON du CR selon `references/format-json.md`.
2. Lancer : `python3 scripts/generer_cr.py cr.json CR_[Chantier]_[AAAA-MM-JJ].docx`
3. Le script applique la charte (couleur, police, logo), les tableaux, l'encadré ⚠, le pied de page paginé et la clause d'observations.
4. Si le script échoue (bibliothèque absente…) : installer `python-docx`, sinon produire le Word par un autre moyen en gardant la même mise en page.

### b) Mail d'envoi (dans la réponse, prêt à copier)
- Objet : « CR de chantier n° X — [Chantier] — [visite / réunion] du JJ/MM/AAAA »
- 5–6 lignes : CR en pièce jointe, 1 ligne sur les points bloquants majeurs, date de la prochaine visite, délai d'observations si paramétré, signature du rédacteur.

### c) Réponse dans le chat — courte
- Fichier Word + mail.
- « X points à confirmer » listés en une ligne chacun, pour corriger avant envoi.
- Si un paramètre manquait : une ligne le signalant.

Une réponse de l'utilisateur sur un point à confirmer → régénérer le CR corrigé (même n°), sans redemander le reste.

---

## 5. Options

- **Version EN** sur demande : noms propres jamais traduits.
- **Mode texte** (« pas de Word ») : CR en texte structuré dans la réponse, même trame.
- **Correction mémorisée** : quand l'utilisateur corrige un terme, proposer de l'ajouter au `vocabulaire` de la section 0.
- **Première utilisation** : rappeler la trame de dictée de `references/exemple-dictee.md`.

Exemple complet (dictée brute → CR attendu) : `references/exemple-cr.md` — à lire à la première utilisation pour calibrer le niveau de reformulation.

---

## 6. Contrôle final « Es-tu sûr ? » (obligatoire)

- Chaque fait du CR figure-t-il dans la dictée / les notes ? Rien d'inventé ?
- Noms, dates, montants, quantités, repères : conformes ou en ⚠ ?
- Chaque action a un responsable et une échéance — sinon ⚠ ?
- Actions du CR précédent toutes reprises avec un statut issu de la dictée ?
- N° de CR cohérent ? Dates JJ/MM/AAAA ? Mots interdits absents ?
- Le mail reprend les mêmes points bloquants et la même date de prochaine visite que le CR ?

Corriger ou signaler. Rappeler : **ne jamais envoyer un CR sans le relire — c'est le nom du rédacteur qui est dessus.**
