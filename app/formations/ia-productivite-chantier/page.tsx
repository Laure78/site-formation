import Link from 'next/link';
import Image from 'next/image';
import {
  Check,
  Mail,
  Clock,
  FileSearch,
  MessageCircle,
  Scale,
  Wrench,
  Smartphone,
  Target,
} from 'lucide-react';
import { LinkedInLearningEmbed } from '@/components/LinkedInLearningEmbed';
import { FormationCarousel } from '@/components/formations/FormationCarousel';
import { FAQSection } from '@/components/landing/FAQSection';
import { FormationPhotos } from '@/components/formations/FormationPhotos';
import { createPageMetadata, getCourseSchema, getBreadcrumbSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { FAQ_PRODUCTIVITE_CHANTIER } from '@/lib/faq';

export const metadata = createPageMetadata({
  title: 'Formation IA Productivité Chantier : Gagnez 5h/semaine',
  description:
    'IA pour chantier : devis, emails, CR automatisés. Formats flexibles. 100% finançable. Pour artisans BTP. Certification Qualiopi.',
  path: '/formations/ia-productivite-chantier',
  keywords: [
    'productivité chantier IA',
    'IA chantier BTP',
    'automatisation chantier',
    'devis automatique IA',
    'compte rendu chantier IA',
    'formation IA artisan',
    'ChatGPT chantier',
    'gain temps chantier IA',
  ],
});

const courseSchema = getCourseSchema({
  name: 'Formation IA BTP : Productivité de chantier',
  description: "Programme opérationnel pour automatiser devis, factures et emails avec ChatGPT. Atelier Action, micro-learning ou coaching. 100% finançable Constructys.",
  path: '/formations/ia-productivite-chantier',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['France', 'Île-de-France'],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  { name: 'Formation IA BTP productivité chantier', path: '/formations/ia-productivite-chantier' },
]);

const faqSchema = getFAQSchema(FAQ_PRODUCTIVITE_CHANTIER);

const AVANTAGES = [
  {
    icon: Clock,
    title: 'Optimisation du temps',
    desc: 'Rédaction de devis et descriptifs techniques en quelques secondes, à partir de vos propres données métier.',
  },
  {
    icon: FileSearch,
    title: 'Réponse aux appels d\'offres',
    desc: 'Analyse rapide des dossiers DCE et extraction des exigences clés pour préparer vos offres sans perdre de temps.',
  },
  {
    icon: MessageCircle,
    title: 'Relation client',
    desc: 'Professionnalisez vos échanges mails et votre présence en ligne sans y passer des heures chaque semaine.',
  },
  {
    icon: Scale,
    title: 'Sécurité et conformité',
    desc: 'Veille réglementaire simplifiée : DTU, normes de sécurité, obligations légales — l\'IA trie et synthétise pour vous.',
  },
];

const FORMATS = [
  {
    icon: Wrench,
    titre: 'Atelier "Action" — Présentiel',
    badge: 'RECOMMANDÉ',
    duree: '1 journée',
    avantages: 'Mise en pratique immédiate sur vos vrais dossiers – devis, emails, comptes-rendus. Zéro théorie superflue.',
  },
  {
    icon: Smartphone,
    titre: 'Micro-learning Vidéo',
    badge: null,
    duree: '10 min / jour',
    avantages: 'Idéal pour les chefs de chantier mobiles. Consultable sur smartphone entre deux visites de site.',
  },
  {
    icon: Target,
    titre: 'Accompagnement individuel',
    badge: null,
    duree: '4 x 2h',
    avantages: 'Coaching sur-mesure pour intégrer l\'IA dans vos processus : sous-traitance, métrés, appels d\'offres.',
  },
];

const FINANCEMENT = [
  {
    titre: 'Constructys',
    desc: 'OPCO dédié au secteur de la construction. Prise en charge pour TPE, artisans et PME du BTP.',
  },
  {
    titre: 'CPF',
    desc: 'Vérifiez votre éligibilité sur moncompteformation.gouv.fr — utilisable par les salariés et indépendants.',
  },
  {
    titre: 'Plan de compétences',
    desc: 'Pour les entreprises de +11 salariés. Financement OPCO sur dossier avant le démarrage.',
  },
  {
    titre: 'FFB / CAPEB',
    desc: 'Adhérents des fédérations : renseignez-vous auprès de votre délégation régionale.',
  },
];

export default function FormationIAProductiviteChantierPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <FormationPhotos variant="productivite" />
          
          <div className="mt-12">
            <FormationCarousel
              title="Formation IA productivité chantier — Laure Olivié"
              slides={[
                {
                  src: '/images/laure-olivie-ia-rentabilite-chantier.png',
                  alt: 'Formation IA BTP animée par Laure Olivié pour améliorer la rentabilité et productivité des chantiers',
                },
                {
                  src: '/images/laure-olivie-ia-administratif-batiment.png',
                  alt: 'Formation ChatGPT entreprise pour automatiser l\'administratif et gagner du temps dans le bâtiment',
                },
                {
                  src: '/images/rencontres-artisans-ia-ffb-btp.png',
                  alt: 'Formation IA pour artisans lors des Rencontres FFB : utiliser l\'intelligence artificielle dans le BTP',
                },
                {
                  src: '/images/laure-olivie-portrait-pro.png',
                  alt: 'Laure Olivié experte en formation intelligence artificielle appliquée aux entreprises du bâtiment',
                },
              ]}
            />
          </div>
        </div>
      </section>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <Link
                href="/formations"
                className="text-sm text-[var(--accent)] hover:underline"
              >
                ← Retour au catalogue
              </Link>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                Formation IA BTP : <span className="text-[var(--accent)]">productivité</span> entreprise bâtiment
              </h1>
              <p className="mt-6 max-w-xl text-slate-600">
                Programme court et opérationnel pour automatiser vos devis,
                factures et emails grâce à ChatGPT. Résultats concrets dès la
                première semaine. Finançable Constructys.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/prendre-rdv"
                  className="rounded-xl bg-[var(--accent)] px-8 py-4 text-center font-semibold text-white hover:bg-blue-600"
                >
                  Démarrer ma formation
                </Link>
                <a
                  href="#formats"
                  className="rounded-xl border-2 border-[var(--accent)] px-8 py-4 text-center font-semibold text-slate-900 hover:bg-[var(--accent-soft)]"
                >
                  Voir le programme
                </a>
              </div>
              <div className="mt-12 flex gap-6">
                {[
                  { val: '4h', label: 'FORMATION EXPRESS' },
                  { val: '100%', label: 'PRISE EN CHARGE OPCO' },
                  { val: '70%', label: 'PRATIQUE TERRAIN' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-slate-50 px-5 py-3">
                    <p className="text-xl font-bold text-[var(--accent)]">{stat.val}</p>
                    <p className="text-xs text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full shrink-0 lg:w-[380px]">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="h-1 w-16 rounded-full bg-[var(--accent)]" />
                <h2 className="mt-4 font-display text-xl font-bold text-slate-900">
                  Ce que vous allez maîtriser
                </h2>
                <ul className="mt-6 space-y-3">
                  {[
                    'Créer des devis professionnels en 15 minutes',
                    'Automatiser vos emails et relances clients',
                    'Générer du contenu pour vos réseaux sociaux',
                    'Optimiser votre chiffrage et vos marges',
                    "Gérer l'administratif 3x plus vite",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]">
                        <Check size={14} strokeWidth={1.5} className="text-white" />
                      </span>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi se former */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Pourquoi se former à l&apos;IA quand on est{' '}
            <span className="text-[var(--accent)]">artisan ou entrepreneur BTP</span> ?
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            L&apos;IA ne remplace pas votre expertise terrain. Elle prend en charge
            ce qui vous coûte du temps au bureau — pour que vous restiez concentré
            sur ce que vous faites le mieux.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AVANTAGES.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignage Laure */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm md:p-12">
            <span className="absolute left-6 top-6 text-4xl font-serif text-[var(--accent)]/30">&ldquo;</span>
            <blockquote className="relative pl-8 text-lg italic text-slate-700">
              Un chef d&apos;entreprise BTP m&apos;a appelée un vendredi soir. Trois
              devis à rendre le lundi matin, pas les bons mots, pas le temps. On a
              ouvert ChatGPT ensemble. Une heure trente plus tard : trois devis
              rédigés, relus, mis en forme. L&apos;IA n&apos;a pas remplacé son
              expertise — elle a juste pris en charge la partie qui lui coûtait de
              l&apos;énergie.
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] font-display text-sm font-bold text-white">
                LO
              </div>
              <div>
                <p className="font-semibold text-slate-900">Laure Olivié</p>
                <p className="text-sm text-slate-600">
                  Formatrice IA & ChatGPT — OFC Création d&apos;Entreprise (Qualiopi) — +10 ans
                  en travaux publics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Les 3 formats de formation */}
      <section id="formats" className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Les 3 formats de formation
          </h2>
          <p className="mt-2 font-medium text-slate-600">
            les plus adaptés au secteur BTP
          </p>
          <p className="mt-4 max-w-2xl text-slate-600">
            Chaque entreprise du bâtiment a ses contraintes de planning et de
            mobilité. Ces formats sont pensés pour s&apos;adapter à la réalité terrain
            des artisans et dirigeants PME.
          </p>
          <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="border-b border-slate-200 bg-[var(--accent)] px-6 py-4 text-center text-sm font-semibold text-white md:border-b-0 md:border-r">
                FORMAT
              </div>
              <div className="border-b border-slate-200 bg-[var(--accent)] px-6 py-4 text-center text-sm font-semibold text-white md:border-b-0 md:border-r">
                DURÉE
              </div>
              <div className="border-b border-slate-200 bg-[var(--accent)] px-6 py-4 text-center text-sm font-semibold text-white">
                AVANTAGES CLÉS
              </div>
            </div>
            {FORMATS.map((f) => (
              <div
                key={f.titre}
                className="grid grid-cols-1 border-t border-slate-200 bg-slate-50/50 md:grid-cols-3"
              >
                <div className="flex flex-col gap-2 border-b border-slate-200 p-6 md:border-b-0 md:border-r">
                  <div className="flex items-center gap-2">
                    <f.icon size={24} strokeWidth={1.5} className="text-[var(--accent)]" />
                    <span className="font-semibold text-slate-900">{f.titre}</span>
                  </div>
                  {f.badge && (
                    <span className="inline-flex w-fit rounded bg-[var(--accent)] px-2 py-1 text-xs font-medium text-white">
                      {f.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center border-b border-slate-200 p-6 md:border-b-0 md:border-r">
                  <span className="font-medium text-slate-800">{f.duree}</span>
                </div>
                <div className="flex items-center p-6">
                  <p className="text-slate-600">{f.avantages}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financement */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Financement :{' '}
            <span className="text-orange-600">0 € à avancer</span> grâce aux dispositifs
            de prise en charge
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            En tant qu&apos;organisme certifié Qualiopi, OFC Création d&apos;Entreprise
            vous accompagne dans le montage de vos dossiers de financement.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FINANCEMENT.map((item) => (
              <div
                key={item.titre}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{item.titre}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <FAQSection
            items={FAQ_PRODUCTIVITE_CHANTIER}
            title="Questions fréquentes — Formation IA productivité chantier"
          />
        </div>
      </section>

      {/* Formation LinkedIn — solutions chantiers */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Ma formation LinkedIn : L&apos;IA pour le BTP, des solutions concrètes pour vos chantiers
          </h2>
          <p className="mt-3 text-slate-600">
            Découvrez mon approche terrain en vidéo — Laure Olivié, formatrice LinkedIn Learning.
          </p>
          <div className="mt-8">
            <LinkedInLearningEmbed course="chantiers" />
          </div>
          <a
            href="https://www.linkedin.com/learning/l-ia-pour-le-btp-des-solutions-concretes-pour-vos-chantiers"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Voir la formation complète sur LinkedIn Learning →
          </a>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Prêt à gagner{' '}
            <span className="text-[var(--accent)]">5h par semaine</span> sur votre paperasse ?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Discutons de votre situation concrète — votre métier, vos contraintes,
            vos objectifs. Je vous propose un programme adapté, finançable,
            opérationnel dès le premier jour.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-8 py-4 font-semibold text-slate-800 hover:bg-slate-50"
            >
              <Mail size={20} strokeWidth={1.5} />
              Me contacter
            </Link>
            <Link
              href="/formations"
              className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:bg-blue-700"
            >
              Voir tous les programmes
            </Link>
          </div>
          <p className="mt-8 text-sm text-slate-500">
            OFC Création d&apos;Entreprise · Certifié Qualiopi · Formation inter et intra
            entreprise
          </p>
        </div>
      </section>
    </div>
  );
}
