import { FormationMetierB1Page } from '@/components/landing/FormationMetierB1Page';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata } from '@/lib/seo';

export const revalidate = 3600;
const PATH = LINKS.formationIaDirigeantBtp;

export const metadata = createPageMetadata({
  title: "Formation IA direction d'entreprise BTP, IDF",
  description:
    'Formation IA pour le BTP : dirigeants et CODIR (20 salariés et plus), pilotage et déploiement IA. Présentiel IDF, Qualiopi. Prenez un rendez-vous découverte.',
  descriptionFinal: true,
  path: PATH,
  keywords: ['formation IA dirigeant BTP', 'ROI IA PME BTP', 'pilotage stratégique IA', 'formation équipe IA'],
  openGraphType: 'website',
});

export default function FormationIaDirigeantBtpPage() {
  return (
    <FormationMetierB1Page
      path={PATH}
      metierLabel="Direction d'entreprise BTP — 20 salariés et plus"
      h1="Formation IA pour direction et CODIR BTP — entreprises de 20 salariés et plus"
      heroParagraph="Vous pilotez une entreprise de bâtiment de 20 salariés et plus : structurez la feuille de route IA, priorisez les cas d'usage à fort ROI et déployez une gouvernance claire — pas l'administratif quotidien du chef de TPE."
      shortAnswer="Page orientée pilotage et déploiement : cadrage, priorisation des usages, plan de formation des équipes et mesure d'impact. Pour le chef de TPE qui fait encore ses devis, relances et prospection, utilisez l'encadré en tête de page."
      problemBullets={[
        "Difficulté à prioriser les bons cas d'usage IA à l'échelle de l'entreprise.",
        "Manque de méthode pour embarquer l'équipe et le CODIR.",
        'ROI IA difficile à objectiver.',
        'Risque de dispersion entre outils et initiatives.',
      ]}
      useCases={[
        { title: 'Pilotage stratégique IA', description: 'Roadmap pragmatique sur 90 jours.' },
        { title: "Plan de formation équipe", description: 'Progression par rôle : admin, travaux, direction.' },
        { title: 'Tableau de bord ROI', description: 'Temps gagné, qualité, conversion commerciale.' },
        { title: 'Gouvernance IA', description: 'Cadre simple de sécurité et validation.' },
      ]}
      steps={[
        { title: 'Étape 1 — Diagnostic', prompt: "Identifie les 5 processus admin/chantier à plus fort ROI IA pour cette entreprise BTP (20 salariés et plus) : [contexte]." },
        { title: 'Étape 2 — Priorisation', prompt: "Classe les usages IA selon impact/effort et propose un plan 90 jours : [liste d'usages]." },
        { title: 'Étape 3 — Déploiement équipe', prompt: "Crée un plan de formation IA par profil d'équipe : [profils]." },
        { title: 'Étape 4 — Mesure rentabilité', prompt: 'Définis les KPI de rentabilité IA et le format de suivi mensuel : [objectifs].' },
      ]}
      faqItems={[
        { question: "Comment piloter l'IA à l'échelle d'une entreprise BTP de 20 salariés et plus ?", answer: "En commençant par quelques cas d'usage prioritaires, des règles claires de validation et des indicateurs simples de suivi." },
        { question: 'Comment former efficacement les équipes ?', answer: 'Par des sessions courtes orientées métier, avec des cas réels et un accompagnement progressif.' },
        { question: "Comment calculer le ROI de l'IA ?", answer: "Le ROI se mesure d'abord par le temps gagné et la qualité documentaire, puis par les effets sur délais, marge et conversion." },
        { question: "L'IA est-elle réellement rentable pour une structure de cette taille ?", answer: "Oui si le déploiement est cadré : usages ciblés, routine d'équipe et suivi mensuel des gains." },
      ]}
      level="Intermediate"
      sisterEncart={{
        currentAudience:
          'Cette page s’adresse aux dirigeants et CODIR d’entreprises BTP de 20 salariés et plus (pilotage, déploiement IA).',
        href: LINKS.formationIaDirigeantPmeBtp,
        linkLabel: 'Formation IA chef de TPE du bâtiment (devis, relances, prospection)',
      }}
    />
  );
}
