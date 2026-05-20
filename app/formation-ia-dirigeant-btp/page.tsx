import { createPageMetadata } from '@/lib/seo';
import { FormationMetierB1Page } from '@/components/landing/FormationMetierB1Page';

const PATH = '/formation-ia-dirigeant-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA dirigeant BTP — ChatGPT PME',
  description:
    "Formation IA pour dirigeants BTP : pilotage stratégique, formation d'équipe, ROI et rentabilité IA. Qualiopi. Financement possible selon éligibilité.",
  path: PATH,
  keywords: ['formation IA dirigeant BTP', 'ROI IA PME BTP', "pilotage stratégique IA", "formation équipe IA"],
  openGraphType: 'article',
});

export default function FormationIaDirigeantBtpPage() {
  return (
    <FormationMetierB1Page
      path={PATH}
      metierLabel="Dirigeant BTP / chef d'entreprise"
      h1="Formation IA pour dirigeant BTP — pilotez la rentabilité IA de votre PME"
      heroParagraph="Vous dirigez une PME du bâtiment ou des travaux publics : structurez votre stratégie IA, formez vos équipes et mesurez le ROI réel sur les processus clés."
      shortAnswer="La formation est pensée pour les décideurs : cadrage, priorisation des usages, plan de déploiement et mesure d'impact opérationnel."
      problemBullets={[
        "Difficulté à prioriser les bons cas d'usage IA.",
        "Manque de méthode pour embarquer l'équipe.",
        'ROI IA difficile à objectiver.',
        'Risque de dispersion entre outils et initiatives.',
      ]}
      useCases={[
        { title: 'Pilotage stratégique IA', description: 'Roadmap pragmatique sur 90 jours.' },
        { title: "Plan de formation équipe", description: 'Progression par rôle : admin, travaux, direction.' },
        { title: 'Tableau de bord ROI', description: 'Temps gagné, qualité, conversion commerciale.' },
        { title: 'Gouvernance IA PME', description: 'Cadre simple de sécurité et validation.' },
      ]}
      steps={[
        { title: 'Étape 1 — Diagnostic', prompt: "Identifie les 5 processus admin/chantier à plus fort ROI IA pour cette PME BTP : [contexte]." },
        { title: 'Étape 2 — Priorisation', prompt: "Classe les usages IA selon impact/effort et propose un plan 90 jours : [liste d'usages]." },
        { title: 'Étape 3 — Déploiement équipe', prompt: "Crée un plan de formation IA par profil d'équipe : [profils]." },
        { title: 'Étape 4 — Mesure rentabilité', prompt: 'Définis les KPI de rentabilité IA et le format de suivi mensuel : [objectifs].' },
      ]}
      faqItems={[
        { question: "Comment piloter l'IA à l'échelle d'une PME BTP ?", answer: "En commençant par quelques cas d'usage prioritaires, des règles claires de validation et des indicateurs simples de suivi." },
        { question: 'Comment former efficacement les équipes ?', answer: 'Par des sessions courtes orientées métier, avec des cas réels et un accompagnement progressif.' },
        { question: "Comment calculer le ROI de l'IA ?", answer: "Le ROI se mesure d'abord par le temps gagné et la qualité documentaire, puis par les effets sur délais, marge et conversion." },
        { question: "L'IA est-elle réellement rentable pour une petite structure ?", answer: "Oui si le déploiement est cadré : usages ciblés, routine d'équipe et suivi mensuel des gains." },
      ]}
      level="Intermediate"
    />
  );
}
