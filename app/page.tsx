import Link from 'next/link';
import { preload } from 'react-dom';
import { AccueilHeroSection } from '@/components/landing/AccueilHeroSection';
import {
  AccueilPreuveSocialeSection,
  AccueilCasUsageIaVisuels,
  HomePrincipalSections,
  BeworkEtFormationsOffreSection,
  AccueilBeworkAccordionSection,
  HomeGuideConducteurTravauxSection,
  AccueilFormationsIaMetiersSection,
  SelecteurMetier,
  PourQuiSection,
  HomeBeneficesSections,
  HomeProgrammeFaqSections,
} from '@/components/landing/HomeBelowFoldSections';
import { buildMetadata } from '@/lib/seo';
import { buildHomeFAQPageJsonLd } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { PHOTOS } from '@/lib/photos';
import { ArticlesFormationLies } from '@/components/landing/ArticlesFormationLies';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { buildHomeUnifiedGraphJsonLd } from '@/lib/schema-home-unified-graph';
import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';
import { RevealShell } from '@/components/motion/RevealShell';
import { DeferredRevealScrollObserver } from '@/components/motion/DeferredRevealScrollObserver';

/** Segment sans suffixe — `buildMetadata` ajoute « | Laure Olivié » (total ≤ 60). */
const HOME_META_TITLE = 'Formation IA pour le BTP en Île-de-France';
const HOME_META_DESCRIPTION = `Formation IA pour le BTP en présentiel IDF : devis, DCE et CR. Qualiopi, Constructys selon éligibilité. Laure Olivié — ${formatNoteSatisfactionAffichageComplet()}. Visio découverte.`;

const HOME_FAQ_PAGE_JSON_LD = buildHomeFAQPageJsonLd();

preload(PHOTOS.formationsCatalogueHero2026.src, { as: 'image', fetchPriority: 'high' });

// ISR : HTML mis en cache au edge et revalidé toutes les heures (3600 s)

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: HOME_META_TITLE,
  description: HOME_META_DESCRIPTION,
  descriptionFinal: true,
  path: '/',
  keywords: [
    'formation IA appliquée au bâtiment',
    'formation ChatGPT BTP',
    'formation IA bâtiment',
    'formation IA construction',
    'formation IA travaux publics',
    'formation Claude AI BTP',
    'intelligence artificielle bâtiment',
    'formation IA Île-de-France',
    'formation IA Paris',
    'formation IA Yvelines',
    'Qualiopi IA BTP',
    'Constructys IA',
    'ChatGPT devis BTP',
    'IA conducteur de travaux',
    'IA appel d\'offres BTP',
  ],
  category: 'education',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  image: {
    url: PHOTOS.heroAccueilFormationIABtpEchange2026.src,
    width: PHOTOS.heroAccueilFormationIABtpEchange2026.width,
    height: PHOTOS.heroAccueilFormationIABtpEchange2026.height,
    alt: PHOTOS.heroAccueilFormationIABtpEchange2026.alt,
  },
});

export default function HomePage() {
  return (
    <div>
      <DeferredRevealScrollObserver />
      <AccueilHeroSection />

      <AccueilPreuveSocialeSection />

      <section
        aria-labelledby="home-selecteur-cas-usage-ia"
        className={OFC_SEC.muted}
      >
        <div className="mx-auto max-w-6xl">
          <RevealShell className="text-center">
            <h2
              id="home-selecteur-cas-usage-ia"
              className="font-display text-2xl font-bold tracking-tight text-[#1A1A1A] md:text-3xl"
            >
              Que peut faire l&apos;IA pour votre métier ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5A5A5A] md:text-[17px]">
              Choisissez votre profil. Exemples concrets, documents concernés et formation adaptée — toujours avec
              validation métier de votre côté.
            </p>
          </RevealShell>
          <RevealShell className="mt-10">
            <SelecteurMetier showDedicatedPageLink />
          </RevealShell>
        </div>
      </section>

      <AccueilCasUsageIaVisuels />

      <HomePrincipalSections />

      <BeworkEtFormationsOffreSection />

      <section
        className={`${OFC_SEC.whiteCompact} scroll-mt-24`}
        aria-labelledby="couverture-geo"
      >
        <div className="mx-auto max-w-7xl">
          <RevealShell>
            <h2
              id="couverture-geo"
              className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
            >
              Formations IA en présentiel — Île-de-France
            </h2>
            <p
              className="mt-3 max-w-none text-base leading-relaxed text-slate-600 md:text-lg"
              data-citation="true"
            >
              Basée à Guyancourt (78), Laure Olivié anime des formations{' '}
              <strong>présentiel uniquement · Île-de-France uniquement</strong> (Paris, 77, 78, 91, 92, 93, 94, 95) — intra-entreprise, dans vos locaux, pour les entreprises de construction et du BTP. On travaille sur vos
              documents réels. Découvrez la{' '}
              <Link href={LINKS.formationIleDeFrance} className={`${OFC_LINK} font-semibold`}>
                formation IA BTP en Île-de-France
              </Link>
              .
            </p>
          </RevealShell>
        </div>
      </section>

      <HomeBeneficesSections />

      <HomeGuideConducteurTravauxSection />

      <AccueilFormationsIaMetiersSection />

      <PourQuiSection />

      <HomeProgrammeFaqSections />

      <ArticlesFormationLies />

      <AccueilBeworkAccordionSection />

      <JsonLd id="schema-home-unified-graph" schema={buildHomeUnifiedGraphJsonLd()} />
      <JsonLd id="faq-schema-home" schema={HOME_FAQ_PAGE_JSON_LD} />
    </div>
  );
}
