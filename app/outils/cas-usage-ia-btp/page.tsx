import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd } from '@/components/JsonLd';
import { SelecteurMetier } from '@/components/SelecteurMetier/SelecteurMetier';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata, getBreadcrumbSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

const PATH = LINKS.casUsageIaMetierBtp;

const INTRO_COPY =
  'Conducteur de travaux, chargé ou chargée d’affaires, dirigeant de PME du bâtiment ou des travaux publics : les usages de l’IA et de Claude AI ne sont pas les mêmes selon votre poste. Ce sélecteur gratuit présente cinq cas d’usage prioritaires, des exemples de documents et des gains de temps indicatifs issus de situations types observées en formation IA appliquée au bâtiment ; pour chaque métier, il propose aussi des tutoriels Skill correspondants — les mêmes que dans la rubrique Ressources du site (PDF et pages web sans inscription). Les livrables listés sont des brouillons à valider humainement : réglementation, prix et signatures restent votre responsabilité. Pour une mise en pratique encadrée, voir une formation IA pour le BTP certifiée Qualiopi et les programmes catalogue OFC.';

const FAQ_ITEMS = [
  {
    q: 'Quels documents BTP l’IA peut-elle générer ?',
    a:
      'Selon les cas : comptes rendus de chantier, ébauches de PPSPS ou synthèses DUERP (validation HSE obligatoire), pièces réponse marchés publics ou privés (mémoires techniques, synthèses DCE), emails ou plans commerciaux. L’outil propose une structure et un premier jet ; votre équipe vérifie la conformité technique, juridique et contractuelle avant diffusion.',
  },
  {
    q: 'L’IA remplace-t-elle un conducteur de travaux ?',
    a:
      'Non. Elle accélère la mise en forme et la structuration documentaire pendant que le métier décide, coordonne et sécurise le chantier. Les engagements contractuels, la coordination physique et les arbitrages terrain restent humains.',
  },
  {
    q: 'Combien de temps une PME BTP peut-elle gagner avec l’IA ?',
    a:
      'Les ordres de grandeur dépendent du volume administratif et de la discipline interne : des équipes formées avec OFC voient souvent plusieurs heures récupérées par semaine sur la rédaction et la préparation de dossiers — sous réserve de relecture métier et de règles de confidentialité.',
  },
  {
    q: 'Faut-il être à l’aise avec l’informatique pour utiliser l’IA dans le BTP ?',
    a:
      'Non comme prérequis dur : les formations OFC sont conçues pour des professionnels du BTP sans culture développeur. Il suffit de savoir naviguer sur le web et éditer des documents ; la méthode et les prompts sont fournis progressivement.',
  },
] as const;

export const metadata = createPageMetadata({
  title:
    "Cas d'usage IA pour le BTP : conducteur, chargé d'affaires, dirigeant | Laure Olivié",
  description:
    "Découvrez par métier les cas d'usage concrets de l'intelligence artificielle dans le BTP : documents générés, gains de temps indicatifs, exemples opérationnels. Formation IA pour les pro du BTP, Claude AI — Laure Olivié.",
  path: PATH,
  keywords: [
    'cas usage IA BTP',
    'IA conducteur de travaux',
    'IA chargé affaires',
    'mémoire technique IA',
    'formation IA appliquée au bâtiment',
    'ChatGPT BTP',
    'Claude AI BTP',
  ],
  appendAuthorSuffix: false,
  openGraphType: 'website',
});

const faqSchema = getFAQSchema(FAQ_ITEMS);

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');
const canonical = `${baseUrl}${PATH}`;

const breadcrumbJsonLd = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Outils IA BTP', path: LINKS.outilsIaBtp },
  { name: 'Cas d’usage IA par métier BTP', path: PATH },
]);

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${canonical}#webpage`,
  url: canonical,
  name: "Cas d'usage IA pour le BTP : conducteur, chargé d'affaires, dirigeant",
  description:
    'Sélecteur interactif des usages IA dans le BTP par métier — documents et gains de temps indicatifs.',
  inLanguage: 'fr-FR',
  isPartOf: {
    '@type': 'WebSite',
    url: baseUrl,
    name: SITE_CONFIG.name,
  },
};

export default function CasUsageIaMetierBtpPage() {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <JsonLd id="schema-cas-usage-webpage" schema={webPageJsonLd} />
      <JsonLd id="schema-cas-usage-breadcrumb" schema={breadcrumbJsonLd} />
      <JsonLd id="schema-cas-usage-faq" schema={faqSchema} />

      <div className="mx-auto max-w-6xl px-4 pt-8 md:pt-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Outils IA BTP', href: LINKS.outilsIaBtp },
            { label: 'Cas d’usage IA par métier', href: PATH },
          ]}
          showVisual
          omitJsonLd
          className="text-sm text-[#5A5A5A]"
        />
      </div>

      <header className="border-b border-slate-200/80 bg-white px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-[#1A1A1A] md:text-4xl">
            Que peut faire l&apos;IA pour votre métier dans le BTP ?
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#5A5A5A] md:text-lg">{INTRO_COPY}</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SelecteurMetier />

        <section className="mt-16 rounded-xl border border-slate-200 bg-white p-6 shadow-[0_4px_16px_rgba(55,124,243,0.08)] md:p-10" aria-labelledby="faq-cas-usage">
          <h2 id="faq-cas-usage" className="font-display text-xl font-bold text-[#1A1A1A] md:text-2xl">
            Questions fréquentes
          </h2>
          <ul className="mt-8 space-y-8">
            {FAQ_ITEMS.map((item) => (
              <li key={item.q} className="border-b border-[#F2F2F2] pb-8 last:border-0 last:pb-0">
                <p className="font-semibold text-[#1A1A1A]">{item.q}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#5A5A5A] md:text-base">{item.a}</p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-center text-sm text-[#5A5A5A]">
          <Link href={LINKS.formations} className="font-semibold text-[#377CF3] underline-offset-2 hover:underline">
            Catalogue formations IA pour les pro du BTP Qualiopi
          </Link>
          {' · '}
          <Link href={LINKS.contact} className="font-semibold text-[#377CF3] underline-offset-2 hover:underline">
            Contact et appel découverte
          </Link>
        </p>
      </main>
    </div>
  );
}
