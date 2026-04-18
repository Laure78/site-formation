import { createPageMetadata } from '@/lib/seo';
import { FormationIaHubContent } from '@/components/formation-ia/FormationIaHubContent';

export const metadata = createPageMetadata({
  title: 'Formations IA & ChatGPT pour le BTP',
  description:
    'Catalogue des formations IA et ChatGPT spécialisées BTP. Inter et intra. Qualiopi. 1 592 professionnels formés. Visio découverte gratuite.',
  path: '/formation-ia-et-chatgpt',
  appendAuthorSuffix: false,
  keywords: [
    'formation IA BTP',
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

export default function FormationIaEtChatgptPage() {
  return <FormationIaHubContent hubPath="/formation-ia-et-chatgpt" />;
}
