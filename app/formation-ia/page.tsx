import { createPageMetadata } from '@/lib/seo';
import { FormationIaHubContent } from '@/components/formation-ia/FormationIaHubContent';

export const metadata = createPageMetadata({
  title: 'Formation IA pour le BTP — Hub métiers & villes (ChatGPT, Claude AI)',
  description:
    'Hub formation IA pour les pro du BTP : ChatGPT & Claude AI par métier et par ville (Île-de-France). Qualiopi, Constructys. Visio découverte gratuite — Laure Olivié, OFC.',
  path: '/formation-ia',
  keywords: [
    'formation IA appliquée au bâtiment',
    'formation ChatGPT BTP',
    'formation Claude AI bâtiment',
    'formation intelligence artificielle bâtiment',
    'formation IA Île-de-France',
    'formation IA Paris',
    'Qualiopi',
    'OPCO Constructys',
    "OFC Création d'Entreprise",
  ],
});

export default function FormationIaHubPage() {
  return <FormationIaHubContent hubPath="/formation-ia" />;
}
