import Link from 'next/link';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_CHECKLIST_PROMPTS } from '@/lib/faq';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';

export const metadata = createPageMetadata({
  title: '10 Prompts ChatGPT artisans BTP — Devis, emails',
  description:
    "Dix prompts ChatGPT pour artisans BTP : devis bâtiment, emails, comptes rendus. Gagnez du temps tout de suite. Enchaînez avec une formation Constructys.",
  path: '/checklist-prompts-btp',
  keywords: ['checklist ChatGPT BTP', 'prompts IA BTP', 'ChatGPT artisans'],
});

const PROMPTS = [
  {
    titre: 'Rédiger un email client',
    prompt:
      'Rédige un email professionnel pour [VOTRE MÉTIER] à envoyer à mon client [NOM]. Contexte : [DÉCRIRE LA SITUATION : relance, réponse à une réclamation, proposition, etc.]. Ton courtois et adapté au BTP.',
    usage: 'Remplacer les parties entre crochets par vos informations. Idéal pour relances, devis, réclamations.',
  },
  {
    titre: "Répondre à un avis Google",
    prompt:
      'Rédige une réponse professionnelle à cet avis Google laissé par un client : "[COLLER L\'AVIS]". Je suis [VOTRE MÉTIER / ENTREPRISE]. Réponse courtoise, remerciement si positif, proposition de solution si négatif. Maximum 3 phrases.',
    usage: "Copier-coller l'avis, adapter le ton. Répondre aux avis améliore votre référencement local.",
  },
  {
    titre: "Créer un devis ou une proposition",
    prompt:
      "Rédige une proposition commerciale / lettre d'engagement pour un [TYPE DE TRAVAUX]. Client : [NOM]. Prestations : [LISTER LES PRESTATIONS]. Délai : [DÉLAI]. Prix : [PRIX ou À DÉFINIR]. Inclure les conditions de paiement usuelles du BTP.",
    usage: 'Structure la base de votre devis. À compléter avec vos prix et conditions.',
  },
  {
    titre: 'Publication LinkedIn entreprise',
    prompt:
      "Rédige un post LinkedIn pour une entreprise de [VOTRE MÉTIER] annonçant [SUJET : chantier terminé, recrutement, innovation, témoignage client, etc.]. Ton professionnel, 3 à 5 phrases, avec une phrase d'accroche et un call-to-action. Pas d'emoji.",
    usage: 'Adapter le sujet. Publier régulièrement renforce votre présence sur LinkedIn.',
  },
  {
    titre: 'Compte rendu de chantier',
    prompt:
      "Rédige un compte rendu de chantier type CR de réunion pour [DATE] sur le chantier [LIEU / PROJET]. Points abordés : [LISTER]. Suite à donner : [LISTER]. Format structuré, professionnel.",
    usage: 'Remplir les points abordés. Essentiel pour tracer les décisions et engagements.',
  },
  {
    titre: 'Email de prospection',
    prompt:
      "Rédige un email de prospection pour [VOTRE MÉTIER] adressé à un [TYPE DE PROSPECT : maître d'œuvre, promoteur, particulier, etc.]. Objectif : [PRÉSENTER VOTRE ACTIVITÉ / DEMANDER UN RDV]. Courtois, pas trop long, avec une proposition claire.",
    usage: 'Personnaliser pour chaque cible. Idéal pour développer votre carnet de commandes.',
  },
  {
    titre: 'Fiche descriptive de prestation',
    prompt:
      "Rédige une fiche descriptive technique pour [PRESTATION : ex. pose de carrelage, rénovation électrique]. Inclure : périmètre des travaux, étapes, matériaux/types d'équipements concernés, points de vigilance. Format professionnel pour devis ou CCTP.",
    usage: "Préciser la prestation. Utile pour les appels d'offres et devis détaillés.",
  },
  {
    titre: 'Relance client ou fournisseur',
    prompt:
      "Rédige un email de relance courtoise concernant [OBJET : facture impayée, livraison en retard, délai de réponse, etc.]. Destinataire : [CLIENT / FOURNISSEUR]. Reste professionnel, factuel, avec une date de réponse attendue si pertinent.",
    usage: "Adapter l'objet et le destinataire. Évite les relances agressives.",
  },
  {
    titre: 'Annonce de recrutement',
    prompt:
      "Rédige une annonce de recrutement pour un poste de [POSTE] dans une entreprise de [VOTRE MÉTIER]. Contrat : [CDI / CDD / alternance]. Localisation : [VILLE]. Compétences recherchées : [LISTER]. Ton attractif, mettre en avant les avantages du métier.",
    usage: 'Compléter les informations. À publier sur Pôle emploi, LinkedIn, sites métiers.',
  },
  {
    titre: 'Réponse à une réclamation',
    prompt:
      "Rédige une réponse à une réclamation client. Contexte : [DÉCRIRE LA RÉCLAMATION]. Je suis [VOTRE MÉTIER / ENTREPRISE]. Ton empathique, professionnel, proposer une solution concrète. Éviter les formulations défensives.",
    usage: 'Décrire la situation. Une bonne gestion des réclamations préserve la relation client.',
  },
];

export default function ChecklistDocumentPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[700px] px-4 py-12 sm:px-6">
        <header className="mb-8 border-b-2 border-[#166534] pb-6 text-center">
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            10 Prompts ChatGPT indispensables pour les entreprises du BTP
          </h1>
          <p className="mt-2 text-slate-600">
            Gagnez plusieurs heures par semaine sur vos tâches administratives et commerciales
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Laure Olivié — Formatrice IA pour les entreprises du BTP · Qualiopi
          </p>
        </header>

        <div className="space-y-8">
          {PROMPTS.map((p, i) => (
            <section key={i}>
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[#166534]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#166534] text-xs font-bold text-white">
                  {i + 1}
                </span>
                {p.titre}
              </h2>
              <div className="mt-2 border-l-4 border-[#166534] bg-slate-50 py-3 pl-4 pr-4 italic text-slate-700">
                {p.prompt}
              </div>
              <p className="mt-2 text-sm text-slate-500">{p.usage}</p>
            </section>
          ))}
        </div>

        <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          <p className="font-semibold text-[#166534]">Formation IA pour le BTP</p>
          <p>100% finançable OPCO Constructys</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/formations" className="font-medium text-[#166534] hover:underline">
              Formation IA BTP
            </Link>
            <Link href="/prendre-rdv" className="font-medium text-[#166534] hover:underline">
              Prendre rendez-vous
            </Link>
            <Link href="/chatgpt-artisans-btp" className="font-medium text-[#166534] hover:underline">
              IA pour artisans et PME bâtiment
            </Link>
          </div>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <FAQSection
              items={FAQ_CHECKLIST_PROMPTS}
              title="Questions fréquentes — Prompts ChatGPT BTP"
            />
          </div>
          <div className="mt-8 text-left">
            <AllerPlusLoin variant="compact" />
          </div>
          <p className="mt-6">laureolivie.fr · 06 95 66 18 18</p>
          <p className="mt-4 text-xs">
            Document offert par Laure Olivié. Téléchargez cette checklist sur{' '}
            <Link href="/checklist-ia-btp" className="text-[#166534] hover:underline">
              laureolivie.fr/checklist-ia-btp
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
