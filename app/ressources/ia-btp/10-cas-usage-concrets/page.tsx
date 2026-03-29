import Link from 'next/link';
import { Check, ArrowRight, Lightbulb, TrendingUp, Clock, Euro } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { createPageMetadata, getArticleSchema, getBreadcrumbSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'IA dans le BTP : 10 cas d\'usage concrets (2026)',
  description:
    "Dix cas d'usage IA dans le BTP avec exemples et ROI : devis, appels d'offres, chantier. Guide 2026 pour décideurs. Lisez et priorisez vos actions.",
  path: '/ressources/ia-btp/10-cas-usage-concrets',
  keywords: [
    'IA dans le BTP',
    'cas d\'usage IA BTP',
    'intelligence artificielle bâtiment',
    'ChatGPT BTP',
    'automatisation BTP',
    'exemples IA construction',
    'IA chantier',
    'digital BTP',
  ],
});

const articleSchema = getArticleSchema({
  headline: 'IA dans le BTP : 10 cas d\'usage concrets (2026)',
  description: 'Découvrez 10 applications pratiques de l\'intelligence artificielle dans le secteur du BTP. Exemples réels, gains de temps, et retour sur investissement.',
  path: '/ressources/ia-btp/10-cas-usage-concrets',
  datePublished: '2026-03-17',
  dateModified: '2026-03-17',
  authorName: 'Laure Olivié',
  image: '/images/ia-btp-cas-usage.png',
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Ressources IA BTP', path: '/ressources/ia-btp' },
  { name: '10 cas d\'usage concrets', path: '/ressources/ia-btp/10-cas-usage-concrets' },
]);

const FAQ = [
  {
    q: "L'IA peut-elle vraiment faire gagner du temps dans le BTP ?",
    a: "Oui, nos clients gagnent en moyenne 3 à 5 heures par semaine. Les gains les plus importants concernent la rédaction de devis (divisé par 3), l'analyse d'appels d'offres (divisé par 5) et la gestion administrative (emails, comptes rendus). Un conducteur de travaux peut rédiger un compte-rendu de chantier en 5 minutes au lieu de 30 minutes.",
  },
  {
    q: "Faut-il être expert en informatique pour utiliser l'IA dans le BTP ?",
    a: "Non, absolument pas. Les outils d'IA comme ChatGPT s'utilisent en langage naturel. Vous écrivez votre demande en français, l'IA génère le document. Nos formations de 4h suffisent pour maîtriser les bases et gagner immédiatement en productivité.",
  },
  {
    q: "Combien coûte l'intégration de l'IA dans une entreprise BTP ?",
    a: "L'investissement de départ est très faible. ChatGPT coûte 24€/mois par utilisateur. La formation est 100% finançable par l'OPCO Constructys (aucun reste à charge). Le retour sur investissement est atteint en moins d'1 mois grâce au temps gagné.",
  },
  {
    q: "L'IA peut-elle analyser les documents techniques BTP (CCTP, DCE) ?",
    a: "Oui, l'IA excelle dans l'analyse de documents longs et complexes. Elle peut lire un CCTP de 300 pages en quelques secondes, extraire les points clés, identifier les exigences techniques, et même suggérer un plan de réponse. C'est l'un des usages les plus efficaces pour les entreprises qui répondent aux appels d'offres.",
  },
  {
    q: "Quels sont les secteurs BTP qui bénéficient le plus de l'IA ?",
    a: "Tous les métiers du BTP bénéficient de l'IA, mais particulièrement : les entreprises générales du bâtiment (devis, chiffrage), les conducteurs de travaux (rapports, CR), les chargés d'affaires (appels d'offres), les artisans (gestion administrative), et les fonctions RH (recrutement, annonces).",
  },
];

const faqSchema = getFAQSchema(FAQ);

const CAS_USAGE = [
  {
    numero: '1',
    titre: 'Automatisation des devis bâtiment',
    description: 'Générez des devis professionnels en 15 minutes au lieu de 2 heures.',
    exemple: 'Un électricien dicte les prestations (installation électrique complète maison 120m²). ChatGPT structure le descriptif technique, calcule les quantités de matériel, et génère un devis professionnel avec conditions générales.',
    gain: '80% de temps économisé',
    secteurs: ['Tous corps d\'état', 'Artisans', 'PME bâtiment'],
  },
  {
    numero: '2',
    titre: 'Analyse d\'appels d\'offres (DCE, CCTP)',
    description: 'Lisez et comprenez un DCE de 300 pages en 10 minutes au lieu de 3 heures.',
    exemple: 'Un conducteur de travaux soumet le CCTP d\'un marché public à l\'IA. En quelques secondes, l\'IA extrait : exigences techniques, normes imposées, délais, pénalités, points de vigilance, et génère un tableau de synthèse Excel.',
    gain: '5x plus rapide',
    secteurs: ['Travaux publics', 'Entreprises générales', 'Génie civil'],
  },
  {
    numero: '3',
    titre: 'Rédaction de mémoires techniques',
    description: 'Créez des mémoires techniques structurés et convaincants en moins d\'une heure.',
    exemple: 'Un chargé d\'affaires fournit les informations clés (moyens humains, matériels, planning, références). L\'IA rédige un mémoire technique de 40 pages conforme aux attentes des acheteurs publics.',
    gain: 'Divise par 3 le temps de rédaction',
    secteurs: ['Marchés publics', 'Appels d\'offres privés'],
  },
  {
    numero: '4',
    titre: 'Comptes rendus de chantier instantanés',
    description: 'Rédigez des CR professionnels en 5 minutes à partir de notes vocales.',
    exemple: 'Sur chantier, un conducteur dicte vocalement ses observations (avancement, incidents, décisions). De retour au bureau, il copie la transcription dans ChatGPT qui structure un CR formel, prêt à envoyer au client.',
    gain: '80% de temps gagné',
    secteurs: ['Tous secteurs BTP'],
  },
  {
    numero: '5',
    titre: 'Gestion des emails clients et fournisseurs',
    description: 'Répondez aux emails 3x plus vite avec un ton professionnel adapté.',
    exemple: 'Un artisan reçoit une réclamation client. Il indique la situation à ChatGPT qui génère une réponse professionnelle, empathique, avec proposition de solution. L\'artisan corrige éventuellement et envoie.',
    gain: '70% de temps économisé',
    secteurs: ['Artisans', 'Petites entreprises'],
  },
  {
    numero: '6',
    titre: 'Création d\'annonces de recrutement efficaces',
    description: 'Recrutez plus vite avec des annonces attractives et conformes.',
    exemple: 'Un chef d\'entreprise BTP demande à l\'IA de rédiger une annonce pour un maçon qualifié. L\'IA génère une annonce optimisée SEO (Pôle Emploi, Indeed), avec description attractive du poste, avantages, et questions de pré-sélection.',
    gain: '+40% de candidatures qualifiées',
    secteurs: ['Fonction RH BTP'],
  },
  {
    numero: '7',
    titre: 'Pré-sélection de CV et candidatures',
    description: 'Analysez 50 CV en 10 minutes et identifiez les meilleurs profils.',
    exemple: 'Un DRH copie 50 CV reçus pour un poste de conducteur de travaux. L\'IA analyse les profils, extrait les compétences, expériences, et génère un tableau comparatif avec recommandation des 5 meilleurs candidats.',
    gain: '90% de temps gagné',
    secteurs: ['Fonction RH', 'Grandes entreprises BTP'],
  },
  {
    numero: '8',
    titre: 'Planification et ordonnancement de chantier',
    description: 'Optimisez vos plannings chantier avec l\'IA.',
    exemple: 'Un conducteur de travaux fournit la liste des tâches, durées estimées, dépendances. L\'IA génère un planning Gantt optimisé, identifie le chemin critique, et propose des alternatives en cas de retard.',
    gain: 'Réduit les retards de chantier',
    secteurs: ['Gestion de projet BTP'],
  },
  {
    numero: '9',
    titre: 'Veille réglementaire et normative BTP',
    description: 'Restez à jour sur les normes et réglementations sans effort.',
    exemple: 'Un bureau d\'études demande à l\'IA un résumé des évolutions de la RE2020 applicables en 2026. L\'IA liste les changements, impacts sur les projets en cours, et recommandations.',
    gain: 'Conformité garantie',
    secteurs: ['Bureaux d\'études', 'Maîtrise d\'œuvre'],
  },
  {
    numero: '10',
    titre: 'Formation et montée en compétence des équipes',
    description: 'Créez des supports de formation sur mesure pour vos équipes.',
    exemple: 'Un dirigeant BTP veut former ses équipes sur la nouvelle réglementation amiante. L\'IA génère un support de formation PDF (15 pages), un quiz d\'évaluation, et un mémo de synthèse.',
    gain: 'Formation interne simplifiée',
    secteurs: ['Formation professionnelle BTP'],
  },
];

export default function CasUsageIABTPPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Article */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-[var(--accent)] to-blue-800 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-blue-100">
            <span className="rounded-full bg-white/20 px-4 py-1 backdrop-blur-sm">Guide 2026</span>
            <span>Par Laure Olivié</span>
            <span>•</span>
            <span>17 mars 2026</span>
            <span>•</span>
            <span>Lecture : 12 min</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
            IA dans le BTP : 10 cas d'usage concrets (2026)
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-blue-50">
            Découvrez 10 applications pratiques et rentables de l'intelligence artificielle 
            dans les entreprises du bâtiment, de l'artisanat et des travaux publics. 
            Exemples réels, gains de temps mesurés, ROI immédiat.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Pourquoi l'IA change la donne dans le BTP en 2026
          </h2>
          <p className="text-slate-700">
            L'intelligence artificielle n'est plus réservée aux grandes entreprises tech. 
            En 2026, les entreprises du BTP qui intègrent l'IA gagnent <strong>3 à 5 heures par semaine</strong> et collaborateur, 
            réduisent leurs coûts administratifs de <strong>30 à 40%</strong>, et remportent plus d'appels d'offres grâce à des réponses plus rapides et mieux structurées.
          </p>

          <div className="not-prose my-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
              <Clock size={40} className="mx-auto text-[var(--accent)]" strokeWidth={1.5} />
              <p className="mt-4 text-3xl font-bold text-slate-900">3-5h</p>
              <p className="text-sm text-slate-600">gagnées par semaine</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
              <TrendingUp size={40} className="mx-auto text-[var(--accent)]" strokeWidth={1.5} />
              <p className="mt-4 text-3xl font-bold text-slate-900">-30%</p>
              <p className="text-sm text-slate-600">de coûts administratifs</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
              <Euro size={40} className="mx-auto text-[var(--accent)]" strokeWidth={1.5} />
              <p className="mt-4 text-3xl font-bold text-slate-900">&lt;1 mois</p>
              <p className="text-sm text-slate-600">de retour sur investissement</p>
            </div>
          </div>

          <p className="text-slate-700">
            Pourtant, <strong>78% des artisans et PME du BTP</strong> n'ont jamais testé l'IA, 
            par manque de temps ou par méconnaissance des usages concrets.
          </p>
          <p className="text-slate-700">
            Ce guide présente 10 cas d'usage opérationnels, testés et approuvés par +1500 professionnels du BTP formés depuis 2023. 
            Chaque cas inclut un exemple réel, le gain de temps mesuré, et les secteurs concernés.
          </p>
        </div>
      </section>

      {/* 10 Cas d'usage */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-bold text-slate-900 md:text-4xl">
            10 cas d'usage IA pour le BTP
          </h2>
          <p className="mt-4 text-center text-slate-600">
            Applications concrètes, testées sur le terrain
          </p>

          <div className="mt-12 space-y-8">
            {CAS_USAGE.map((cas) => (
              <div
                key={cas.numero}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="flex items-start gap-6">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-2xl font-bold text-white">
                    {cas.numero}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900">{cas.titre}</h3>
                    <p className="mt-2 text-lg font-medium text-[var(--accent)]">{cas.description}</p>
                    
                    <div className="mt-4 rounded-xl bg-blue-50 p-4">
                      <p className="flex items-start gap-2 text-sm text-slate-700">
                        <Lightbulb size={20} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                        <span><strong>Exemple concret :</strong> {cas.exemple}</span>
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="rounded-lg bg-green-100 px-4 py-2">
                        <p className="text-sm font-semibold text-green-800">{cas.gain}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cas.secteurs.map((secteur) => (
                          <span
                            key={secteur}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700"
                          >
                            {secteur}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment démarrer */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="prose prose-lg mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Comment démarrer avec l'IA dans votre entreprise BTP
          </h2>
          
          <h3 className="text-2xl font-semibold text-slate-900">1. Choisir le bon outil</h3>
          <p className="text-slate-700">
            Pour 90% des cas d'usage BTP, <strong>ChatGPT</strong> (version payante, 24€/mois) est la solution idéale. 
            Simple, en français, et immédiatement opérationnel.
          </p>

          <h3 className="text-2xl font-semibold text-slate-900">2. Se former (4h suffisent)</h3>
          <p className="text-slate-700">
            Une formation courte et pratique permet de maîtriser les bases et de créer vos premiers prompts BTP. 
            Nos formations de 4h sont <strong>100% finançables par l'OPCO Constructys</strong> (aucun reste à charge).
          </p>

          <h3 className="text-2xl font-semibold text-slate-900">3. Commencer par 1 ou 2 cas d'usage</h3>
          <p className="text-slate-700">
            Ne cherchez pas à tout faire en même temps. Identifiez la tâche qui vous fait perdre le plus de temps 
            (souvent : devis ou emails), et automatisez-la d'abord. Une fois à l'aise, étendez progressivement.
          </p>

          <h3 className="text-2xl font-semibold text-slate-900">4. Créer une bibliothèque de prompts</h3>
          <p className="text-slate-700">
            Sauvegardez vos meilleurs prompts (instructions pour l'IA) dans un document partagé. 
            Cela permet à toute l'équipe de gagner du temps immédiatement.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-center text-3xl font-bold text-slate-900">
            Questions fréquentes
          </h2>
          <div className="mt-12 space-y-6">
            {FAQ.map((item, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-semibold text-slate-900">
                  <span>{item.q}</span>
                  <ArrowRight
                    size={20}
                    className="shrink-0 transition-transform group-open:rotate-90"
                  />
                </summary>
                <p className="mt-4 text-slate-700">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Ressources liées */}
      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Ressources utiles
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Link
              href="/formations"
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-[var(--accent)] hover:shadow-md"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-[var(--accent)]">
                Formations IA BTP
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Catalogue complet des formations IA pour le bâtiment
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                Voir les formations <ArrowRight size={16} />
              </span>
            </Link>

            <Link
              href="/chatgpt-artisans-btp"
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-[var(--accent)] hover:shadow-md"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-[var(--accent)]">
                ChatGPT pour artisans
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Guide complet ChatGPT pour artisans du BTP
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                Lire le guide <ArrowRight size={16} />
              </span>
            </Link>

            <Link
              href="/formations/ia-appels-offre-btp"
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-[var(--accent)] hover:shadow-md"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-[var(--accent)]">
                IA pour appels d'offres
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Formation spécialisée appels d'offres BTP
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                En savoir plus <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-br from-[var(--accent)] to-blue-800 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold text-white">
            Prêt à passer à l'action ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-50">
            Découvrez combien d'heures vous pourriez gagner chaque semaine avec l'IA. 
            Diagnostic gratuit et personnalisé en 2 minutes.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/diagnostic-ia-btp"
              className="rounded-xl bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              Faire le diagnostic gratuit
            </Link>
            <Link
              href="/formations"
              className="rounded-xl border-2 border-white px-8 py-4 font-semibold text-white hover:bg-white/10"
            >
              Voir les formations
            </Link>
          </div>
        </div>
      </section>

      <AllerPlusLoin />
    </div>
  );
}
