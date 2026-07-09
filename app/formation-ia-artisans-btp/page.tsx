import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { Check, FileText, MessageSquare, ClipboardList, Shield, ArrowRight } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { FAQ_IA_BTP_METIERS_CHANTIER_SEO } from '@/lib/faq';
import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { TARIF_SESSION_DEBUTANT_HT, LIBELLE_EFFECTIF_GROUPE_COURT ,
  formatTarifHt,
} from '@/lib/tarifs-sessions';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { createMetierBtpPageMetadata } from '@/lib/formation-ia-metier-idf';

export const revalidate = 3600;
export const metadata = createMetierBtpPageMetadata('artisans', {
  title: 'Formation IA artisans BTP — ChatGPT',
  description:
    'Formation IA ChatGPT pour BTP : devis, emails, CR chantier en 4h. Qualiopi. Financement possible selon éligibilité. TPE, PME et professionnels du bâtiment.',
  path: '/formation-ia-artisans-btp',
  keywords: [
    'formation IA PME BTP',
    'formation IA appliquée au bâtiment',
    'ChatGPT entreprises BTP',
    'rédaction mémoire technique',
    'appel d\'offre BTP',
    'ChatGPT TPE PME bâtiment',
    'IA devis BTP',
    'ChatGPT travaux publics',
    'intelligence artificielle bâtiment',
    'formation IA PME BTP',
    'automatisation administrative BTP',
    'ChatGPT conducteur de travaux',
  ],
  image: {
    url: PHOTOS.btpFormationSalleIntervention2026.src,
    width: PHOTOS.btpFormationSalleIntervention2026.width,
    height: PHOTOS.btpFormationSalleIntervention2026.height,
    alt: PHOTOS.btpFormationSalleIntervention2026.alt,
  },
});

const DEFINITION = {
  titre: "Qu'est-ce que ChatGPT pour les entreprises du BTP ?",
  court: "ChatGPT pour entreprises BTP désigne l'utilisation de l'assistant OpenAI pour automatiser devis, emails, CR chantier et documents administratifs dans les TPE/PME du bâtiment et travaux publics.",
  long: "Conçu par OpenAI, ChatGPT analyse votre demande en langage naturel et génère un texte structuré en quelques secondes. Pour une entreprise du BTP, cela signifie : coller un brief chantier et obtenir un devis détaillé, décrire une situation et recevoir un email client professionnel, ou dicter des notes de chantier et générer un compte rendu prêt à envoyer. Sans compétence technique : vous écrivez ce que vous voulez, l'IA rédige à votre place.",
};

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${baseUrl}/formation-ia-artisans-btp#service`,
  serviceType: 'Formation IA ChatGPT pour entreprises BTP',
  provider: { '@id': `${baseUrl}/#organization` },
  areaServed: { '@type': 'State', name: 'Île-de-France' },
  description:
    'Formation ChatGPT 4h pour TPE/PME et professionnels du BTP : devis, emails, comptes rendus de chantier. Qualiopi. Financement possible selon éligibilité.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Formation IA pour le BTP',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@id': `${baseUrl}/formations/ia-batiment-travaux-publics#course` },
        price: '100',
        priceCurrency: 'EUR',
      },
    ],
  },
};

const CAS_USAGE = [
  {
    icon: FileText,
    titre: 'Devis et chiffrages',
    desc: 'Rédigez des devis professionnels en 15 minutes au lieu de 2 heures. Indiquez le type de chantier, les prestations et les quantités ; ChatGPT structure le descriptif, les prix et les conditions.',
  },
  {
    icon: MessageSquare,
    titre: 'Emails clients et fournisseurs',
    desc: 'Relances, réclamations, confirmations de rendez-vous : l\'IA adapte le ton et la structure. Plus de temps perdu à chercher les mots ; vous corrigez et envoyez.',
  },
  {
    icon: ClipboardList,
    titre: 'Comptes rendus de chantier',
    desc: 'Transformez vos notes vocales ou écrites en CR structurés. Avancement des travaux, points de vigilance, prochaines étapes : tout est formalisé en quelques clics.',
  },
];

const FAQ_ITEMS = [
  ...FAQ_IA_BTP_METIERS_CHANTIER_SEO,
  {
    q: 'Une entreprise du BTP peut-elle vraiment utiliser ChatGPT sans formation ?',
    a: "Oui pour des usages basiques (emails, idées de formulations). Pour les devis et documents techniques, une formation courte (4h) permet d'éviter les erreurs et d'obtenir des trames réutilisables. Laure Olivié forme les équipes avec des cas concrets adaptés au bâtiment et aux travaux publics.",
  },
  {
    q: 'ChatGPT est-il sécurisé pour les données de mon entreprise ?',
    a: "La version gratuite de ChatGPT ne garantit pas la confidentialité des données. Pour des informations clients ou chantier, utilisez ChatGPT Team ou Enterprise, ou ne collez jamais de données sensibles. La formation IA pour les pros du BTP vous apprend les bonnes pratiques (anonymisation, relecture, process interne).",
  },
  {
    q: 'Combien de temps économise-t-on avec ChatGPT dans le BTP ?',
    a: "En moyenne 3 à 5 heures par semaine : devis (gain majeur), emails, comptes rendus. Les équipes formées rapportent un ROI positif dès la première semaine. La formation inclut des prompts prêts à l'emploi par type de besoin.",
  },
  {
    q: 'La formation ChatGPT pour entreprises BTP est-elle finançable ?',
    a: "Oui. La formation IA Constructys est certifiée Qualiopi et éligible à une prise en charge par Constructys ou votre OPCO selon statut, branche et conditions en vigueur. Coût pédagogique couvert jusqu'à 24€ HT/heure/stagiaire.",
  },
];

export default function FormationIAArtisansBTPPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <JsonLd id="schema-service-artisans-btp" schema={serviceJsonLd} />
      <JsonLd id="schema-faq-page" schema={faqSchema} />

      <article>
        <MetierIdfPresentielLine className="mb-4" />
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour entreprises BTP : <span className="text-[var(--accent)]">ChatGPT</span>{' '}
          pour devis, emails et comptes rendus
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Sessions en présentiel en Île-de-France — guide pratique pour utiliser l&apos;intelligence artificielle dans votre TPE, PME BTP ou
          activité dans le bâtiment : devis, emails, comptes rendus. Notre{' '}
          <Link href={LINKS.formationIaBtp} className="text-[var(--accent)] font-medium hover:underline">
            formation IA pour entreprises du bâtiment
          </Link>
          {' '}est certifiée Qualiopi, financement possible selon éligibilité.
        </p>

        {/* En bref unique : gains + définition */}
        <section className="mt-12 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">En bref</h2>
          <p className="mt-4 text-slate-700">
            L&apos;IA permet aux entreprises du BTP de gagner 3 à 5 h par semaine sur les devis,
            emails et comptes rendus. Une formation de 4 h suffit pour être opérationnel.
          </p>
          <p className="mt-4 text-slate-700">{DEFINITION.court}</p>
        </section>

        {/* Définition détaillée */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            {DEFINITION.titre}
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">{DEFINITION.long}</p>
        </section>

        {/* Cas d&apos;usage concrets */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Cas d&apos;usage concrets de ChatGPT dans le BTP
          </h2>
          <p className="mt-3 text-slate-600">
            Les dirigeants et équipes utilisent ChatGPT principalement pour trois types
            de tâches. Voici des exemples concrets.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {CAS_USAGE.map(({ icon: Icon, titre, desc }) => (
              <div
                key={titre}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{titre}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Exemple pratique */}
        <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Exemple pratique : générer un devis plomberie avec ChatGPT
          </h2>
          <p className="mt-4 text-slate-600">
            Votre entreprise doit envoyer un devis pour une salle de bain.
            Au lieu de repartir d&apos;un ancien document, vous donnez à ChatGPT :
          </p>
          <blockquote className="mt-4 rounded-xl border-l-4 border-[var(--accent)] bg-white p-4 text-slate-700 italic">
            « Rédige un devis pour une rénovation complète de salle de bain : 12
            m², carrelage mural et sol, WC, lavabo, douche à l&apos;italienne,
            miroir. Entreprise de plomberie-chauffage en Île-de-France. Inclus
            fournitures et main d&apos;œuvre, TVA 10 %, validité 30 jours. »
          </blockquote>
          <p className="mt-4 text-slate-600">
            ChatGPT génère une structure professionnelle : descriptif des
            prestations, détail des fournitures, main d&apos;œuvre, total HT/TTC,
            conditions. Vous ajustez les prix selon vos marges et envoyez. Temps
            économisé : environ 1h30 par devis.
          </p>
        </section>

        {/* Sécurité */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Sécurité et bonnes pratiques
          </h2>
          <p className="mt-3 text-slate-600">
            Ne collez jamais de données clients réelles (adresses, noms, montants
            confidentiels) dans ChatGPT public. Utilisez ChatGPT Team ou Enterprise
            pour les données sensibles, ou anonymisez avant de demander une
            aide. La{' '}
            <Link href={LINKS.formations} className="text-[var(--accent)] font-medium hover:underline">
              formation IA appliquée au bâtiment
            </Link>
            {' '}vous apprend un process sécurisé.
          </p>
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <Shield size={24} className="text-amber-600" />
            <p className="text-sm text-amber-800">
              <strong>Recommandation :</strong> Toujours relire et vérifier les
              chiffres. L&apos;IA peut se tromper ; vous restez responsable du
              document final.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Gains de temps mesurés dans les entreprises BTP formées
          </h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-3 py-3 font-semibold text-slate-900">Tâche</th>
                  <th className="px-3 py-3 font-semibold text-slate-900">Sans IA</th>
                  <th className="px-3 py-3 font-semibold text-slate-900">Avec ChatGPT</th>
                  <th className="px-3 py-3 font-semibold text-[#16A34A]">Gain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="px-3 py-3 font-medium">Devis complet</td>
                  <td className="px-3 py-3">2 à 4 h</td>
                  <td className="px-3 py-3">15 min</td>
                  <td className="px-3 py-3 font-semibold text-[#16A34A]">−85 %</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Email client / fournisseur</td>
                  <td className="px-3 py-3">15 à 30 min</td>
                  <td className="px-3 py-3">2 à 3 min</td>
                  <td className="px-3 py-3 font-semibold text-[#16A34A]">−85 %</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">CR de chantier</td>
                  <td className="px-3 py-3">1h30 à 2h</td>
                  <td className="px-3 py-3">3 à 5 min</td>
                  <td className="px-3 py-3 font-semibold text-[#16A34A]">−85 %</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Relance client</td>
                  <td className="px-3 py-3">15 min</td>
                  <td className="px-3 py-3">1 min</td>
                  <td className="px-3 py-3 font-semibold text-[#16A34A]">−95 %</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm italic text-slate-500">
            Mesures réalisées en sessions OFC avec des dirigeants de TPE/PME BTP, entreprises
            d&apos;électricité, plomberie, maçonnerie et peinture. +{formatProfessionalsTrainedCount()} professionnels formés, note{' '}
            {SOCIAL_PROOF.AVERAGE_RATING}.
          </p>
        </section>

        {/* Formation CTA */}
        <section className="mt-16 rounded-2xl bg-[var(--accent)] p-8 md:p-10 text-white">
          <h2 className="font-display text-2xl font-bold">
            Formation ChatGPT pour entreprises BTP
          </h2>
          <p className="mt-4 text-blue-100">
            Laure Olivié forme les dirigeants et équipes du bâtiment et des travaux publics à ChatGPT depuis 2024.
            Formation 4 h, 100 % pratique : vous repartez avec des trames et
            des prompts prêts à l&apos;emploi. Financement possible selon éligibilité.
          </p>
          <p className="mt-3 text-sm text-blue-100">
            À partir de {formatTarifHt(TARIF_SESSION_DEBUTANT_HT)} € HT/session · Sessions de 4h · {LIBELLE_EFFECTIF_GROUPE_COURT}
          </p>
          <ul className="mt-6 space-y-2">
            {[
              'Travail sur vos vrais devis, emails et CR',
              'Prompts adaptés à vos métiers et chantiers',
              'Bonnes pratiques sécurité et confidentialité',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check size={20} strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={LINKS.formationParis}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              Voir la formation IA pour le BTP
              <ArrowRight size={20} strokeWidth={1.5} />
            </Link>
            <RdvLink className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10">
              Prendre rendez-vous
            </RdvLink>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-6">
          <p className="text-slate-800">
            Vous souhaitez découvrir comment l&apos;IA peut faire gagner du temps à votre entreprise du BTP ?{' '}
            <RdvLink className="font-semibold text-[var(--accent)] hover:underline">
              Prenez rendez-vous pour échanger sur votre projet.
            </RdvLink>
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Questions fréquentes sur ChatGPT pour entreprises BTP
          </h2>
          <div className="mt-8 space-y-6">
            {FAQ_ITEMS.map(({ q, a }) => (
              <div
                key={q}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-slate-600"><FAQAnswer content={a} /></p>
              </div>
            ))}
          </div>
        </section>

        <AllerPlusLoin
          links={[
            { href: LINKS.formationIaBtpNiveau1BatimentTp, label: 'Formation niveau 1 bâtiment & TP (4 h)' },
            { href: LINKS.iaDevis, label: 'IA devis bâtiment' },
            { href: LINKS.iaCDT, label: 'IA conducteur de travaux' },
            { href: LINKS.blog, label: 'Articles et guides' },
            { href: buildSiteCalendlyCtaUrl('formation-ia-artisans-btp-footer-rdv'), label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
