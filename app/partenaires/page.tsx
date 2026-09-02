import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import { Temoignage } from '@/components/Temoignage';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import {
  PARTENAIRES_CTA_INTRO,
  PARTENAIRES_CTA_LABEL,
  PARTENAIRES_PAGE_META_DESCRIPTION,
  PARTENAIRES_PAGE_META_TITLE,
  PARTENAIRES_SECTION_TITLE,
} from '@/lib/partenaires-content';
import {
  PARTENAIRES_PAGE_CLOSING,
  PARTENAIRES_PAGE_INTRO,
  PARTENAIRES_PAGE_SECTIONS,
  type PartenairePageSection,
} from '@/lib/partenaires-page-sections';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: PARTENAIRES_PAGE_META_TITLE,
  titleAbsolute: PARTENAIRES_PAGE_META_TITLE,
  description: PARTENAIRES_PAGE_META_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.partenaires,
  keywords: [
    'partenaires formation IA BTP',
    'FFB Grand Paris formation IA',
    'CSFE formation IA',
    'UMB-FFB métiers du bois',
    'Laure Olivié partenaires BTP',
    'LinkedIn Learning IA BTP',
  ],
  appendAuthorSuffix: false,
  openGraphTitle: PARTENAIRES_PAGE_META_TITLE,
  openGraphDescription: PARTENAIRES_PAGE_META_DESCRIPTION,
  openGraphType: 'article',
});

function CtaVisio({
  campaign,
  ctaPosition,
}: {
  campaign: string;
  ctaPosition: 'middle' | 'footer';
}) {
  return (
    <section className={ctaPosition === 'middle' ? OFC_SEC.mutedCompact : OFC_SEC.whiteCompact}>
      <div className={`${OFC_SECTION_INNER} flex max-w-3xl flex-col items-center text-center`}>
        <p className="text-sm leading-relaxed text-slate-600 md:text-base">{PARTENAIRES_CTA_INTRO}</p>
        <CalendlyEmbed
          type="link"
          variant="primary"
          ctaPosition={ctaPosition}
          campaign={campaign}
          className="mt-4 min-w-[min(100%,280px)]"
         />
      </div>
    </section>
  );
}

function PartenaireSection({
  section,
  tone,
}: {
  section: PartenairePageSection;
  tone: 'white' | 'muted';
}) {
  return (
    <section
      id={section.id}
      className={`${tone === 'white' ? OFC_SEC.white : OFC_SEC.muted} scroll-mt-24`}
      aria-labelledby={`${section.id}-heading`}
    >
      <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
        {section.logo ? (
          <div className="mb-6 flex h-16 items-center md:h-[4.5rem]">
            <Image
              src={section.logo.src}
              alt={section.logo.alt}
              width={section.logo.width}
              height={section.logo.height}
              className="max-h-14 w-auto object-contain object-left"
              sizes="180px"
              loading="lazy"
              quality={70}
            />
          </div>
        ) : null}
        <h2
          id={`${section.id}-heading`}
          className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
        >
          {section.h2}
        </h2>
        {section.subtitle ? (
          <p className="mt-1 text-sm font-medium text-slate-500">{section.subtitle}</p>
        ) : null}
        <div className="mt-4 space-y-3 text-base leading-relaxed text-slate-600 md:text-lg">
          {section.paragraphs.map((paragraph, index) => (
            <p key={`${section.id}-p-${index}`}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-4">
          <ExternalLinkAnchor href={section.officialHref} className={OFC_LINK}>
            {section.officialLabel}
          </ExternalLinkAnchor>
        </p>
        {/* À compléter par Laure */}
        <Temoignage auteur="" role="" texte="" />
      </div>
    </section>
  );
}

export default function PartenairesPage() {
  const avantCta = PARTENAIRES_PAGE_SECTIONS.slice(0, 4);
  const apresCta = PARTENAIRES_PAGE_SECTIONS.slice(4);

  return (
    <div>
      <section className={OFC_SEC.heroWhite} aria-labelledby="partenaires-page-heading">
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h1
            id="partenaires-page-heading"
            className="font-display text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
          >
            {PARTENAIRES_SECTION_TITLE}
          </h1>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 md:text-lg">
            {PARTENAIRES_PAGE_INTRO.map((paragraph, index) => (
              <p key={`intro-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {avantCta.map((section, index) => (
        <PartenaireSection
          key={section.id}
          section={section}
          tone={index % 2 === 0 ? 'muted' : 'white'}
        />
      ))}

      <CtaVisio campaign="partenaires-page-middle" ctaPosition="middle" />

      {apresCta.map((section, index) => (
        <PartenaireSection
          key={section.id}
          section={section}
          tone={index % 2 === 0 ? 'white' : 'muted'}
        />
      ))}

      <section className={OFC_SEC.mutedCompact}>
        <div className={`${OFC_SECTION_INNER} max-w-3xl space-y-3 text-base leading-relaxed text-slate-600 md:text-lg`}>
          {PARTENAIRES_PAGE_CLOSING.map((paragraph, index) => (
            <p key={`closing-${index}`}>{paragraph}</p>
          ))}
        </div>
      </section>

      <CtaVisio campaign="partenaires-page-footer" ctaPosition="footer" />

      <ContextualLinksSection
        title="Continuer votre navigation"
        tone="muted"
        links={[
          {
            href: LINKS.financement,
            title: 'Financement Constructys — formation IA BTP',
            description: 'OPCO Constructys : éligibilité, plafonds et constitution du dossier.',
          },
          {
            href: LINKS.formationIleDeFrance,
            title: 'Formation IA BTP en Île-de-France',
            description: 'Présentiel francilien : Paris et départements, sessions — organisme certifié Qualiopi.',
          },
          {
            href: LINKS.contact,
            title: 'Contacter Laure Olivié',
            description: 'Question sur une session déléguée ou un intra en Île-de-France.',
          },
        ]}
      />
    </div>
  );
}
