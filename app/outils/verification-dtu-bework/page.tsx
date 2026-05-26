import { VerificationDtuBeworkTool } from '@/components/dtu-verification/VerificationDtuBeworkTool';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd } from '@/components/JsonLd';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata, getBreadcrumbSchema, SITE_CONFIG } from '@/lib/seo';

const PATH = LINKS.verificationDtuBeworkTest;

export const metadata = createPageMetadata({
  title: 'Prototype test DTU × devis BeWork (non indexé)',
  description:
    'Espace de test interne sans indexation — rapprochement indicatif lignes de devis BTP et familles NF DTU. Formation IA pour le BTP Laure Olivié.',
  path: PATH,
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  appendAuthorSuffix: false,
  openGraphTitle: 'Prototype interne — DTU × devis',
  openGraphDescription:
    'Prototype noindex : aide au repérage DTU pour devis BTP. Ne remplace pas la consultation des documents officiels AFNOR/CSTB.',
});

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');
const canonical = `${baseUrl}${PATH}`;

const breadcrumbJsonLd = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Outils IA BTP', path: LINKS.outilsIaBtp },
  { name: 'Prototype test DTU BeWork', path: PATH },
]);

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${canonical}#webpage`,
  url: canonical,
  name: 'Prototype test — rapprochement devis / NF DTU (BeWork)',
  description:
    'Prototype interne noindex : tableau de rapprochement et export Word indicatif, sans reproduction de textes normatifs officiels.',
  inLanguage: 'fr-FR',
  isPartOf: {
    '@type': 'WebSite',
    url: baseUrl,
    name: SITE_CONFIG.name,
  },
} as const;

export default function VerificationDtuBeworkTestPage() {
  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <JsonLd id="schema-dtu-test-webpage" schema={webPageJsonLd} />
      <JsonLd id="schema-dtu-test-breadcrumb" schema={breadcrumbJsonLd} />

      <div className="mx-auto max-w-6xl px-4 pt-8 md:pt-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Outils IA BTP', href: LINKS.outilsIaBtp },
            { label: 'Prototype DTU BeWork', href: PATH },
          ]}
          showVisual
          omitJsonLd
          className="text-sm text-[#5A5A5A]"
        />

        <header className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
            Page de test · balise robots noindex
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-[#1A1A1A] md:text-4xl">
            Prototype — vérification DTU × devis (parcours BeWork)
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5A5A5A] md:text-lg">
            Outil hors production pour expérimenter le rapprochement ligne à ligne avec la base projet
            (reformulations maisons uniquement). Aucun texte officiel DTU reproduit ; l’export Word applique une charte de
            rapport proche du cahier BeWork (bleu #1D4ED8).
          </p>
        </header>
      </div>

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        <VerificationDtuBeworkTool />
      </main>
    </div>
  );
}
