import { createPageMetadata } from '@/lib/seo';
import { FormationMetierB1Page } from '@/components/landing/FormationMetierB1Page';

const PATH = '/formation-ia-conducteur-engins-tp';

export const metadata = createPageMetadata({
  title: 'Formation IA conducteur engins TP — ChatGPT',
  description:
    "Formation IA pour conducteurs d'engins TP : rapports terrassement, suivi cubature, sécurité chantier. Qualiopi, finançable Constructys.",
  path: PATH,
  keywords: [
    'formation IA conducteur engins TP',
    'ChatGPT rapports terrassement',
    'suivi cubature IA',
    'sécurité chantier TP IA',
  ],
  openGraphType: 'article',
});

export default function FormationIaConducteurEnginsTpPage() {
  return (
    <FormationMetierB1Page
      path={PATH}
      metierLabel="Conducteur d'engins TP"
      h1="Formation IA pour conducteur d'engins TP — gagnez 5h par semaine sur l’administratif"
      heroParagraph="Rapports de terrassement, suivi cubature et sécurité chantier : ChatGPT et Claude AI permettent de structurer vos documents en quelques minutes."
      shortAnswer="L'IA accélère la rédaction des rapports et communications terrain, sans remplacer les décisions techniques ni sécurité."
      problemBullets={[
        "Rapports terrassement longs à formaliser en fin de journée.",
        'Suivi cubature et avancement à consolider rapidement.',
        "Rédaction des comptes rendus d'équipe répétitive.",
        'Messages sécurité chantier à standardiser.',
      ]}
      useCases={[
        { title: 'Rapport journalier prêt en 5 min', description: 'Transforme les notes brutes en fiche propre.' },
        { title: 'Suivi cubature hebdo', description: 'Synthèse claire pour chef de chantier et direction.' },
        { title: 'Message sécurité opérationnel', description: 'Rappels concis avant prise de poste.' },
        { title: 'Email de suivi chantier', description: 'Communication structurée avec les parties prenantes.' },
      ]}
      steps={[
        { title: 'Étape 1 — Rapport de poste', prompt: "Rédige une fiche d'activité engin TP avec ces notes brutes : [notes]." },
        { title: 'Étape 2 — Suivi cubature', prompt: 'Consolide ces données journalières en suivi cubature hebdomadaire : [données].' },
        { title: 'Étape 3 — Sécurité chantier', prompt: "Prépare un briefing sécurité de 5 points pour la prise de poste de demain : [contexte]." },
        { title: 'Étape 4 — Compte rendu', prompt: 'Crée un compte rendu de chantier clair pour le chef de chantier : [notes].' },
      ]}
      faqItems={[
        { question: 'Comment générer des rapports terrassement fiables ?', answer: "L'IA structure vos notes rapidement ; la validation des volumes et points techniques doit rester humaine." },
        { question: "Peut-on suivre la cubature avec ChatGPT ?", answer: 'Oui pour consolider et présenter les données. Les mesures terrain restent la source de vérité.' },
        { question: "L'IA peut-elle gérer la sécurité chantier ?", answer: "Elle aide à formaliser les messages sécurité, mais ne remplace ni les procédures ni la responsabilité opérationnelle." },
      ]}
    />
  );
}
