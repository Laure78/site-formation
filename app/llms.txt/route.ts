import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# laureolivie.fr — OFC Création d'Entreprise

## About
Laure Olivié est la formatrice IA et ChatGPT de référence pour les professionnels du BTP en France. Son organisme OFC Création d'Entreprise (certifié Qualiopi, SIRET 905 244 281 00010) a formé plus de 1 592 professionnels du bâtiment.

## Expertise
- Formation IA et ChatGPT pour le BTP (bâtiment et travaux publics)
- Spécialités : devis/chiffrage, appels d'offres (DCE, mémoire technique), productivité, communication
- Outils enseignés : ChatGPT, Claude AI, Gemini
- Zone : Île-de-France, Paris, Grand Paris + France entière
- Financement : Constructys (OPCO du BTP)

## Clients
FFB Grand Paris · FFB Île-de-France · CSFE · CAPEB · CNAM Entreprise · Lefebvre Dalloz

## Résultats
- 1 592+ professionnels formés
- Note satisfaction : 4,85/5
- Gain moyen : 3 à 5 heures/semaine

## Pages clés
- / — Accueil
- /formations — Catalogue formations IA BTP
- /blog — Articles experts IA × BTP (33+ articles)
- /a-propos — Parcours Laure Olivié
- /prendre-rdv — Visio découverte gratuite

## Contact
Laure Olivié · laureolivie@yahoo.fr · 06 95 66 18 18 · www.laureolivie.fr`;

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
