import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { FAQ_FORMATIONS } from '@/lib/faq';
import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildFormationsPageUnifiedGraphJsonLd } from '@/lib/schema-formations-page-graph';
import { FORMATIONS_CATALOGUE } from '@/lib/formations-catalogue-display';
import { FormationsHero } from '@/components/formations/FormationsHero';
import { FormationsStatsBand } from '@/components/formations/FormationsStatsBand';
import { FormationsCatalogueInteractive } from '@/components/formations/FormationsCatalogueInteractive';
import { FormationsComparisonTable } from '@/components/formations/FormationsComparisonTable';
import { FormationsWhyMotifs } from '@/components/formations/FormationsWhyMotifs';
import { FormationsCatalogueMidCta } from '@/components/formations/FormationsCatalogueMidCta';
import { FormationsPartnersStrip } from '@/components/formations/FormationsPartnersStrip';
import { FormationsFaqSection } from '@/components/formations/FormationsFaqSection';
import { FAQSchema } from '@/components/seo/FAQSchema';

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');

const OG_TITLE = 'Catalogue formation IA BTP — 6 formations Qualiopi 4 h';
const OG_DESCRIPTION =
  "6 formations IA BTP de 4 h finançables Constructys : bâtiment, TP, appels d'offres, RH, architecture, sensibilisation. Inter Île-de-France ou intra dans vos locaux.";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Formation IA BTP : catalogue 6 formations Qualiopi',
    description:
      "Catalogue 6 formations IA BTP : ChatGPT bâtiment, travaux publics, appels d'offres, RH, architecture. 4 h, 100 ou 175 € HT/pers, finançable Constructys. Île-de-France.",
    path: '/formations',
    appendAuthorSuffix: false,
    openGraphTitle: OG_TITLE,
    openGraphDescription: OG_DESCRIPTION,
    keywords: [
      'catalogue formation IA BTP',
      'formation ChatGPT BTP',
      'formation IA bâtiment',
      'formation IA travaux publics',
      "formation IA appels d'offre BTP",
      'formation IA RH BTP',
      'formation IA architecte',
      'formation IA Qualiopi',
      'formation IA Constructys',
      'formation IA BTP Île-de-France',
    ],
    robots: { index: true, follow: true },
    image: {
      url: PHOTOS.formationIaBtpSalleInteractive2026.src,
      width: 1200,
      height: 630,
      alt:
        'Catalogue formation IA BTP — 6 formations Qualiopi de 4 h pour entreprises du bâtiment et travaux publics',
    },
  }),
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: `${baseUrl}/formations`,
    siteName: 'Laure Olivié — Formation IA BTP',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: `${baseUrl}${PHOTOS.formationIaBtpSalleInteractive2026.src}`,
        width: 1200,
        height: 630,
        alt:
          'Catalogue formation IA BTP — 6 formations Qualiopi de 4 h pour entreprises du bâtiment et travaux publics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description:
      "6 formations IA BTP finançables Constructys. Inter Île-de-France ou intra. Bâtiment, TP, appels d'offres, RH, architecture.",
    images: [`${baseUrl}${PHOTOS.formationIaBtpSalleInteractive2026.src}`],
  },
  alternates: {
    canonical: `${baseUrl}/formations`,
    languages: { 'fr-FR': `${baseUrl}/formations` },
  },
  other: {
    'geo.region': 'FR-IDF',
    'geo.placename': 'Guyancourt',
    'geo.position': '48.7713;2.0739',
    ICBM: '48.7713, 2.0739',
  },
};

const chipLinkClass =
  'inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] transition duration-200 hover:border-[#377CF3] hover:bg-[#EFF6FF] hover:text-[#377CF3]';

export default function FormationsPage() {
  const faqSchemaItems = FAQ_FORMATIONS.map((item) => ({ question: item.q, answer: item.a }));
  return (
    <>
      <JsonLd id="schema-formations-page-graph" schema={buildFormationsPageUnifiedGraphJsonLd()} />
      <FAQSchema id="schema-formations-faq" items={faqSchemaItems} />
      <FormationsHero />
      <FormationsStatsBand />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:pt-12">
        <Breadcrumbs items={[{ label: 'Formations', href: '/formations' }]} />

        <div className="mt-8">
          <p className="mb-5 max-w-4xl text-sm text-[#64748B]">
            Toutes nos formations couvrent ChatGPT et Claude AI. Voir aussi :{' '}
            <Link href={LINKS.formationClaudeAiBtp} className="font-medium text-[#377CF3] hover:underline">
              Formation Claude AI BTP dédiée
            </Link>{' '}
            |{' '}
            <Link href={LINKS.formationClaudeAiBatiment} className="font-medium text-[#377CF3] hover:underline">
              Formation Claude AI bâtiment
            </Link>{' '}
            |{' '}
            <Link href={LINKS.formationClaudeAiTravauxPublics} className="font-medium text-[#377CF3] hover:underline">
              Formation Claude AI travaux publics
            </Link>
          </p>
          <section
            className="rounded-2xl border-2 border-[#377CF3] bg-[#EFF6FF] p-5 md:p-6"
            aria-label="Réponse synthétique"
            itemScope
            itemType="https://schema.org/Answer"
          >
            <p
              className="citation-sentence text-lg font-medium leading-relaxed text-[#0F172A] md:text-xl"
              data-citation="catalogue-formations-ia-btp-2026"
              itemProp="text"
            >
              Le catalogue OFC propose 6 formations IA BTP de 4 heures, certifiées Qualiopi et
              finançables par Constructys : L&apos;IA au service du bâtiment (BTP-01), des travaux
              publics (BTP-04), pour la fonction RH (BTP-03), pour l&apos;architecte (BTP-06), pour
              répondre aux appels d&apos;offre (BTP-02) et la sensibilisation aux assistants IA
              personnalisés (BTP-05). Tarifs : 100 € HT par participant en niveau débutant, 175 € HT
              en niveau avancé. Sessions en inter en Île-de-France ou en intra dans vos locaux, 12
              participants maximum.
            </p>
          </section>
        </div>

        <p className="mt-6 max-w-3xl text-sm text-[#64748B]">
          Pilier complémentaire (analyse CCTP / DCE, marchés publics) :{' '}
          <Link href={LINKS.formationIaCctpAnalyseDceBtp} className="font-medium text-[#377CF3] hover:underline">
            formation IA analyse CCTP avec ChatGPT
          </Link>
          .
        </p>

        <div className="mt-12">
          <FormationsCatalogueInteractive formations={FORMATIONS_CATALOGUE} />
        </div>

        <section className="mt-8 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 md:p-6">
          <p className="max-w-5xl text-sm leading-relaxed text-[#334155] md:text-base">
            Formations IA BTP finançables pour dirigeants, <strong>professionnels du BTP</strong>, PME bâtiment et
            fonctions support : intelligence artificielle bâtiment, formation IA travaux publics et{' '}
            <Link href={LINKS.chatgptArtisans} className="font-medium text-[#377CF3] hover:underline">
              ChatGPT pour entreprises BTP
            </Link>{' '}
            au service des devis, emails, comptes rendus de chantier et appels d&apos;offres. Sessions en 4 h uniquement
            — forfait 100 € HT par participant (niveau débutant) ou 175 € HT par participant (niveau avancé). Groupe de
            12 participants maximum. Comptes gratuits IA possibles : Claude AI, ChatGPT, Gemini. Formations en présentiel
            uniquement (sessions inter en Île-de-France, intra dans vos locaux). Méthode 100 % terrain, orientée
            productivité.{' '}
            <a href={CALENDLY_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-[#377CF3] hover:underline">
              Prenez rendez-vous
            </a>{' '}
            pour un diagnostic personnalisé.
          </p>
        </section>

        <FormationsComparisonTable formations={FORMATIONS_CATALOGUE} />

        <FormationsWhyMotifs />

        <FormationsCatalogueMidCta />

        <FormationsPartnersStrip />

        <FormationsFaqSection
          items={FAQ_FORMATIONS}
          title="Questions fréquentes sur les formations IA BTP"
          subtitle="Vous avez des questions ? Voici les réponses aux interrogations les plus fréquentes."
        />

        <section className="mt-12 border-t border-[#E2E8F0] pt-12">
          <h2 className="font-display text-lg font-semibold text-[#0F172A]">
            Formations IA BTP par métier, sujet et géographie
          </h2>
          <p className="mt-3 text-sm text-[#64748B]">
            Vous cherchez une formation IA BTP ciblée sur un métier précis, un département
            francilien ou un cas d&apos;usage opérationnel ? Voici les pages dédiées.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            <li>
              <Link href={LINKS.formationParis} className={chipLinkClass}>
                Formation IA BTP Paris (75)
                <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
              </Link>
            </li>
            <li>
              <Link href={LINKS.formationYvelines} className={chipLinkClass}>
                Formation IA BTP Yvelines (78)
                <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
              </Link>
            </li>
            <li>
              <Link href={LINKS.formationSaintQuentinYvelines} className={chipLinkClass}>
                Formation IA BTP Saint-Quentin-en-Yvelines
                <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
              </Link>
            </li>
            <li>
              <Link href={LINKS.chatgptArtisans} className={chipLinkClass}>
                ChatGPT pour entreprises BTP
                <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
              </Link>
            </li>
            <li>
              <Link href={LINKS.iaDevis} className={chipLinkClass}>
                IA pour les devis bâtiment
                <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
              </Link>
            </li>
            <li>
              <Link href={LINKS.iaCDT} className={chipLinkClass}>
                IA pour conducteur de travaux
                <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
              </Link>
            </li>
            <li>
              <Link href={LINKS.claudeAiBtp} className={chipLinkClass}>
                Claude AI pour le BTP
                <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
              </Link>
            </li>
            <li>
              <Link href={LINKS.financement} className={chipLinkClass}>
                Financement Constructys 100 %
                <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
              </Link>
            </li>
            <li>
              <Link href={LINKS.etudesCas} className={chipLinkClass}>
                Étude de cas FFB &amp; CSFE
                <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
              </Link>
            </li>
            <li>
              <Link href={LINKS.casUsage} className={chipLinkClass}>
                10 cas d&apos;usage concrets IA BTP
                <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
              </Link>
            </li>
            <li>
              <Link href={LINKS.blog} className={chipLinkClass}>
                Articles et guides
                <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
              </Link>
            </li>
            <li>
              <Link href={LINKS.aPropos} className={chipLinkClass}>
                À propos de Laure Olivié
                <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
              </Link>
            </li>
          </ul>
        </section>

        <AllerPlusLoin
          variant="chips"
          links={[
            { href: LINKS.formationIaBtp, label: 'Formation IA BTP — page pilier' },
            { href: LINKS.diagnostic, label: 'Diagnostic IA BTP' },
            { href: LINKS.checklist, label: 'Checklist prompts ChatGPT BTP' },
            { href: LINKS.formationIleDeFrance, label: 'Formation IA BTP en Île-de-France' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </div>
    </>
  );
}
