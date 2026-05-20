import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import CalendlyButton from '@/components/CalendlyButton';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { JsonLd } from '@/components/JsonLd';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { FAQ_FORMATIONS } from '@/lib/faq';
import { PHOTOS } from '@/lib/photos';
import { LINKS } from '@/lib/internal-links';
import { Breadcrumb } from '@/components/Breadcrumb';
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
import { ENCART_TARIFS_COMMERCIAUX } from '@/lib/tarifs-sessions';
import { GAINS_TEMPS_MENTION_PRUDENCE } from '@/lib/gains-temps-copy';
import { FINANCEMENT_FORMULATION_COURTE } from '@/lib/financement-copy';

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '');

const OG_TITLE = 'Catalogue formation IA BTP — 2 formations Qualiopi 4 h';
const OG_DESCRIPTION =
  "2 formations IA BTP de 4 h (NIV-01 et NIV-02) : niveau 1 bâtiment & travaux publics, niveau 2 appels d'offre. Programmes PDF. Intra, inter, présentiel ou distanciel. Financement possible selon éligibilité.";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Formation IA BTP : catalogue 2 formations Qualiopi',
    description:
      "Catalogue 2 formations IA BTP : niveau 1 bâtiment & travaux publics, niveau 2 appels d'offre BTP. 4 h, forfait 1 000 ou 1 200 € HT/session (12 pers. max). Intra, inter, présentiel ou distanciel. Financement possible selon éligibilité.",
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
        'Catalogue formation IA BTP — 2 formations Qualiopi de 4 h pour entreprises du bâtiment et travaux publics',
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
          'Catalogue formation IA BTP — 2 formations Qualiopi de 4 h pour entreprises du bâtiment et travaux publics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description:
      "2 formations IA BTP Qualiopi (NIV-01 et NIV-02). Intra, inter, présentiel ou distanciel. Financement possible selon éligibilité.",
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
  return (
    <>
      <JsonLd id="schema-formations-page-graph" schema={buildFormationsPageUnifiedGraphJsonLd()} />
      <FormationsHero />
      <FormationsStatsBand />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-4 md:pt-5">
        <Breadcrumb
          jsonLdId="schema-breadcrumb-formations-catalogue"
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Formations', href: '/formations' },
          ]}
          className="mb-4 text-sm text-slate-600"
        />

        <div className="mt-4 md:mt-5">
          <FormationsCatalogueInteractive formations={FORMATIONS_CATALOGUE} />
        </div>

        <section className="mt-8 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 md:p-6">
          <p className="max-w-5xl text-sm leading-relaxed text-[#334155] md:text-base">
            Formations IA BTP pour <strong>artisans, TPE, PME</strong>, dirigeants, conducteurs de travaux, chargés
            d&apos;affaires et équipes administratives : intelligence artificielle bâtiment, formation IA travaux publics et{' '}
            <Link href={LINKS.chatgptArtisans} className="font-medium text-[#377CF3] hover:underline">
              ChatGPT pour entreprises BTP
            </Link>{' '}
            au service des devis, DCE, CCTP, appels d&apos;offres, mémoires techniques, comptes rendus de chantier,
            relances clients et documents administratifs. {ENCART_TARIFS_COMMERCIAUX}{' '}
            {FINANCEMENT_FORMULATION_COURTE}{' '}
            Méthode 100 % terrain, orientée
            productivité.{' '}
            <CalendlyButton variant="small" campaign="formations-intro-rdv" className="font-medium">
              Prenez rendez-vous
            </CalendlyButton>{' '}
            pour un diagnostic personnalisé.
          </p>
          <p className="mt-3 max-w-5xl text-sm leading-relaxed text-[#64748B]">{GAINS_TEMPS_MENTION_PRUDENCE}</p>
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
                Financement Constructys selon éligibilité
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
            { href: buildSiteCalendlyCtaUrl('formations-footer-rdv'), label: 'Prendre rendez-vous' },
          ]}
        />
      </div>
    </>
  );
}
