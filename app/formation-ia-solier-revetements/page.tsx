import { createPageMetadata } from '@/lib/seo';
import { FormationMetierB1Page } from '@/components/landing/FormationMetierB1Page';

export const revalidate = 3600;
const PATH = '/formation-ia-solier-revetements';

export const metadata = createPageMetadata({
  title: 'Formation IA solier revêtements — ChatGPT BTP',
  description:
    'Formation IA pour soliers : DTU 53, chiffrage PVC/lino/parquet, documents chantier. Qualiopi. Financement possible selon éligibilité.',
  path: PATH,
  openGraphType: 'website',
});

export default function FormationIaSolierRevetementsPage() {
  return (
    <FormationMetierB1Page
      path={PATH}
      metierLabel="Solier / poseur de revêtements"
      h1="Formation IA pour solier / poseur de revêtements — gagnez 5h par semaine sur l’administratif"
      heroParagraph="Spécial soliers : exploitez ChatGPT et Claude AI pour préparer vos devis, vérifier les points DTU 53 et structurer vos documents chantier."
      shortAnswer="La formation est orientée terrain : PVC, lino, parquet, préparation des supports et gestion des contraintes chantier."
      problemBullets={[
        'Calculs de quantités et chutes chronophages.',
        'Vérifications DTU 53 série sous délai court.',
        'Devis multi-matériaux difficiles à harmoniser.',
        'CR et relances chantier répétitives.',
      ]}
      useCases={[
        { title: 'Devis PVC/lino/parquet structurés', description: 'Postes détaillés avec variantes matériaux — moins d\'une heure vs demi-journée selon complexité.' },
        { title: 'Checklist DTU 53', description: 'Points de contrôle support, collage, joints, tolérances.' },
        { title: 'Synthèse fournisseurs', description: 'Comparatif de solutions selon usage et trafic.' },
        { title: 'CR chantier et levées de réserves', description: 'Rédaction propre à partir de notes terrain.' },
      ]}
      steps={[
        { title: 'Étape 1 — Chiffrage revêtements', prompt: 'Rédige un devis solier pour ce chantier (PVC/lino/parquet) : [données].' },
        { title: 'Étape 2 — Contrôle DTU', prompt: 'Établis une checklist DTU 53 des points à valider avant pose : [contexte].' },
        { title: 'Étape 3 — Choix technique', prompt: 'Compare ces trois systèmes de revêtements selon usage et contraintes : [fiches].' },
        { title: 'Étape 4 — Compte rendu', prompt: 'Rédige un CR de chantier avec actions et délais à partir de ces notes : [notes].' },
      ]}
      faqItems={[
        { question: 'Quels DTU 53 utiliser pour ce métier ?', answer: 'La série DTU 53 est la référence pour les revêtements de sol ; la formation vous apprend à cibler rapidement le bon texte selon le cas.' },
        { question: "L'IA sait-elle gérer les calculs PVC/lino/parquet ?", answer: "Elle accélère les pré-calculs et la structuration du devis, mais les métrés et ajustements finaux restent à valider en interne." },
        { question: 'Y a-t-il des cas concrets liés au réseau LSR ?', answer: "Oui, la méthode est présentée sur des cas terrain inspirés des besoins des professionnels du revêtement, y compris partenaires filière." },
      ]}
    />
  );
}
