import Link from 'next/link';
import { Check, Phone, Calendar } from 'lucide-react';
import { LinkedInLearningEmbed } from '@/components/LinkedInLearningEmbed';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { FAQSection } from '@/components/landing/FAQSection';
import { createPageMetadata, getCourseSchema, getBreadcrumbSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { FAQ_IA_BTP_PARIS } from '@/lib/faq';

export const metadata = createPageMetadata({
  title: 'Formation IA BTP Paris : Devis & ChatGPT en 4h',
  description:
    "Formation IA BTP Paris et Île-de-France : devis, emails, ChatGPT en 4 h. Artisans et PME. Qualiopi, Constructys. Réservez une session près de Paris.",
  path: '/formations/ia-btp-paris',
  keywords: [
    'formation IA Paris',
    'formation BTP Paris',
    'formation IA Île-de-France',
    'formation ChatGPT BTP 75',
    'formation IA 92 93 94',
    'OPCO Constructys Paris',
    'formation IA bâtiment Paris',
  ],
});

const ZONES = [
  {
    num: '75',
    nom: 'Paris',
    contenu: 'Tous arrondissements • Sessions en présentiel ou distanciel • Accès facilité transports en commun',
  },
  {
    num: '92',
    nom: 'Hauts-de-Seine',
    contenu: 'Nanterre, Boulogne-Billancourt, Courbevoie, Levallois-Perret, Issy-les-Moulineaux, Neuilly-sur-Seine, Rueil-Malmaison...',
  },
  {
    num: '93',
    nom: 'Seine-Saint-Denis',
    contenu: 'Bobigny, Saint-Denis, Montreuil, Aubervilliers, Pantin, Noisy-le-Grand, Aulnay-sous-Bois, Saint-Ouen...',
  },
  {
    num: '94',
    nom: 'Val-de-Marne',
    contenu: 'Créteil, Vitry-sur-Seine, Champigny-sur-Marne, Saint-Maur-des-Fossés, Ivry-sur-Seine, Fontenay-sous-Bois...',
  },
  {
    num: '77',
    nom: 'Seine-et-Marne',
    contenu: 'Meaux, Chelles, Melun, Pontault-Combault, Savigny-le-Temple, Torcy, Champs-sur-Marne, Combs-la-Ville...',
  },
  {
    num: '78',
    nom: 'Yvelines',
    contenu: 'Versailles, Sartrouville, Mantes-la-Jolie, Saint-Germain-en-Laye, Poissy, Conflans-Sainte-Honorine, Montigny-le-Bretonneux...',
  },
  {
    num: '91',
    nom: 'Essonne',
    contenu: 'Évry, Corbeil-Essonnes, Massy, Sainte-Geneviève-des-Bois, Viry-Châtillon, Palaiseau, Athis-Mons...',
  },
  {
    num: '95',
    nom: "Val-d'Oise",
    contenu: 'Argenteuil, Sarcelles, Cergy, Garges-lès-Gonesse, Franconville, Goussainville, Pontoise, Ermont...',
  },
];

const courseSchema = getCourseSchema({
  name: 'Formation IA BTP à Paris',
  description: 'Formation de 4h pour professionnels du BTP en Île-de-France. Devis, chiffrages, ChatGPT. Paris (75) et 8 départements. Qualiopi · Constructys.',
  path: '/formations/ia-btp-paris',
  providerName: SITE_CONFIG.legalName,
  areaServed: ['Paris', 'Île-de-France', 'Hauts-de-Seine', 'Seine-Saint-Denis', 'Val-de-Marne', 'Seine-et-Marne', 'Yvelines', 'Essonne', "Val-d'Oise"],
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: '/formations' },
  { name: 'Formation IA BTP à Paris', path: '/formations/ia-btp-paris' },
]);

const faqSchema = getFAQSchema(FAQ_IA_BTP_PARIS);

export default function FormationIABTPParisPage() {
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
              <div className="mt-4 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
                Formation Paris & Île-de-France • Financement OPCO
              </div>
              <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                Formation IA bâtiment à{' '}
                <span className="text-[var(--accent)]">Paris</span> et Île-de-France
              </h1>
              <p className="mt-6 max-w-xl text-slate-600">
                Formation IA bâtiment adaptée aux TPE, PME et équipes du BTP en Île-de-France.
                Productivité entreprise bâtiment : ChatGPT pour devis, emails, relances clients.
                Intervention à Paris (75) et dans les 8 départements.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/prendre-rdv"
                  className="rounded-xl bg-[var(--accent)] px-8 py-4 text-center font-semibold text-white hover:bg-blue-600"
                >
                  Réserver ma formation
                </Link>
                <a
                  href="#zones"
                  className="rounded-xl border-2 border-[var(--accent)] px-8 py-4 text-center font-semibold text-slate-900 hover:bg-[var(--accent-soft)]"
                >
                  Zones d&apos;intervention
                </a>
              </div>
              <div className="mt-12 flex gap-6">
                {[
                  { val: '4h', label: 'Formation' },
                  { val: '100%', label: 'Finançable OPCO' },
                  { val: '70%', label: 'Gain de temps' },
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
                    'Créer des devis professionnels en 15 minutes avec ChatGPT',
                    'Automatiser vos emails et relances clients grâce à l\'IA',
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

      {/* Pourquoi cette formation est animée par une experte reconnue — EEAT */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Pourquoi cette formation est animée par une experte reconnue
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            Formatrice spécialisée dans l&apos;intégration de l&apos;IA générative dans les entreprises du BTP.
            Intervenante et créatrice de contenus pédagogiques sur l&apos;IA.
            <strong className="text-slate-900"> Formatrice LinkedIn Learning.</strong>
            {' '}Cette expérience garantit une approche pédagogique concrète adaptée aux entreprises du bâtiment.
          </p>
          <Link
            href="/auteur/laure-olivie"
            className="mt-6 inline-flex font-medium text-[var(--accent)] hover:underline"
          >
            Découvrir le profil de Laure Olivié →
          </Link>
        </div>
      </section>

      {/* Zones d'intervention */}
      <section id="zones" className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Nos zones d&apos;intervention en Île-de-France
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Formations disponibles à Paris et dans l&apos;ensemble des départements
            d&apos;Île-de-France. Sessions en présentiel dans vos locaux ou en
            distanciel selon vos besoins.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ZONES.map((zone) => (
              <div
                key={zone.num}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-lg font-bold text-white">
                    {zone.num}
                  </span>
                  <h3 className="font-display font-semibold text-slate-900">
                    {zone.nom}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-slate-600">{zone.contenu}</p>
              </div>
            ))}
          </div>

          {/* Votre ville n'apparaît pas ? */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="font-display text-xl font-bold text-slate-900">
              Votre ville n&apos;apparaît pas dans la liste ?
            </h3>
            <p className="mt-4 text-slate-600">
              Nous intervenons dans toute l&apos;Île-de-France, y compris dans les
              villes non mentionnées ci-dessus. Contactez-nous pour vérifier la
              disponibilité dans votre secteur.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/prendre-rdv"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-600"
              >
                <Calendar size={20} strokeWidth={1.5} />
                Prendre rendez-vous
              </Link>
              <a
                href="tel:+33695661818"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:bg-slate-50"
              >
                <Phone size={20} strokeWidth={1.5} />
                Appeler : 06 95 66 18 18
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Formation LinkedIn — solutions chantiers */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
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

      {/* FAQ */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <FAQSection
            items={FAQ_IA_BTP_PARIS}
            title="Questions fréquentes — Formation IA BTP Paris"
          />
        </div>
      </section>

      {/* Aller plus loin */}
      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <AllerPlusLoin
            links={[
              { href: '/formation-ia-btp-paris-2026', label: 'Formation IA BTP Paris 2026' },
              { href: '/formations', label: 'Catalogue formations' },
              { href: '/financement-constructys-100-ia-btp', label: 'Financement Constructys 100% IA BTP' },
              { href: '/chatgpt-artisans-btp', label: 'ChatGPT pour entreprises BTP' },
              { href: '/prendre-rdv', label: 'Prendre rendez-vous' },
            ]}
          />
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[var(--accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold">
            Prêt à automatiser votre BTP avec l&apos;IA ?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Réservez votre formation IA à Paris ou en Île-de-France. Devis
            personnalisé sous 24h. Financement OPCO Constructys 100% possible.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/prendre-rdv"
              className="flex items-center gap-2 rounded-xl border-2 border-white/60 bg-white px-8 py-4 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              <Calendar size={20} strokeWidth={1.5} />
              Réserver ma formation
            </Link>
            <a
              href="tel:+33695661818"
              className="flex items-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-4 font-semibold text-white hover:bg-white/10"
            >
              <Phone size={20} strokeWidth={1.5} />
              Appeler maintenant
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
