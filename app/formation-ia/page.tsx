import { createPageMetadata } from '@/lib/seo';
import { FormationIaHubContent } from '@/components/formation-ia/FormationIaHubContent';

export const revalidate = 3600;
export const metadata = createPageMetadata({
  title: 'Hub formation IA BTP — métiers & villes',
  description:
    'Hub formation IA pour le BTP : ChatGPT et Claude AI par métier et par ville en Île-de-France. Qualiopi, Constructys. Visio découverte gratuite.',
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
