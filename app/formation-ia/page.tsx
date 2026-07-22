import { createPageMetadata } from '@/lib/seo';
import { FormationIaHubContent } from '@/components/formation-ia/FormationIaHubContent';

export const revalidate = 3600;
export const metadata = createPageMetadata({
  title: 'Hub formation IA BTP — métiers & villes',
  description:
    'Formation IA pour le BTP : hub métiers et zones IDF, ChatGPT et Claude, présentiel Qualiopi. Constructys selon éligibilité. Visio découverte gratuite.',
  descriptionFinal: true,
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
