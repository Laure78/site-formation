# Format JSON attendu par scripts/generer_cr.py

Tous les champs sont optionnels sauf `chantier` et `date`. Une rubrique absente ou vide est imprimée « Néant ».

```json
{
  "charte": {
    "entreprise": "Bâti Concept",
    "adresse": "12 rue des Artisans, 91300 Massy · SIRET 000 000 000 00000",
    "couleur": "#1F3A5F",
    "police": "Arial",
    "logo": "assets/logo.png",
    "delai_observations": "8 jours"
  },
  "chantier": "Résidence Les Tilleuls",
  "adresse_chantier": "4 allée des Tilleuls, 91300 Massy",
  "numero": 12,
  "type": "Réunion de chantier",
  "date": "29/10/2026",
  "heure": "9h00",
  "meteo": "Pluie fine le matin",
  "redacteur": "Marc DURAND, conducteur de travaux",
  "presents": ["Marc DURAND (Bâti Concept)", "Mme LEROY (architecte)"],
  "absents_excuses": ["BET Structure"],
  "diffusion": ["MOA", "Architecte", "Lots 02 à 08"],

  "avancement": [
    {"lot": "Lot 02 – Gros œuvre", "texte": "Dalle R+2 coulée. Voiles R+3 en cours."}
  ],
  "bloquants": [
    {"titre": "Plans de réservations CVC", "texte": "Non reçus. Bloque le coffrage des voiles R+3."}
  ],
  "planning": ["Décalage annoncé de 1 semaine sur le clos-couvert."],
  "sous_traitants": ["Ent. Martin (plâtrerie) : absente."],
  "securite": ["Garde-corps manquant trémie escalier R+2, côté nord."],
  "livraisons": ["Menuiseries extérieures livrées : 18 sur 24."],
  "decisions": ["Validation de l'échantillon de carrelage ref. A."],
  "actions": [
    {"action": "Transmettre plans de réservations CVC", "responsable": "Lot 07", "echeance": "05/11/2026", "statut": "En retard"}
  ],
  "prochaine_visite": "05/11/2026 à 9h00",
  "a_confirmer": [
    {"point": "Nom de l'entreprise de menuiserie", "extrait": "« le menuisier euh Lebrun ou Lebon »"}
  ],
  "photos": [
    {"fichier": "photo1.jpg", "legende": "Trémie escalier R+2 sans garde-corps"}
  ]
}
```

Règles :
- `bloquants[].titre` est imprimé en gras en début de paragraphe.
- `statut` libre ; « En retard » est coloré en rouge, « Soldée » en vert.
- `photos[].fichier` : chemin vers une image accessible ; ignorée si introuvable (signalé en console).
