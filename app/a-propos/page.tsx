import Link from 'next/link';
import { Award, Building2, Mail, MapPin, ShieldCheck, Star, Users } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';
import { FAQ_A_PROPOS, FAQ_CLIENTS_PARTENAIRES } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { getAProposUnifiedJsonLd } from '@/lib/schema-a-propos-unified-graph';
import { getAProposPersonJsonLd } from '@/lib/schema-a-propos-person-jsonld';
import { getAProposOrganizationJsonLd } from '@/lib/schema-a-propos-organization-jsonld';
import { SCHEMA_CONTACT, SCHEMA_GEO, SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF, formatPersonnesFormeesCount, getStatsFreshnessLabel, siteStats } from '@/lib/constants';
import { PHOTOS } from '@/lib/photos';
import {
  A_PROPOS_AUTORITE_PARAGRAPHS,
  A_PROPOS_CERTIFICATIONS_INTRO,
  A_PROPOS_CLIENTS_INTRO,
  A_PROPOS_CONTACT_INTRO,
  A_PROPOS_EEAT_INTRO,
  A_PROPOS_EXPERTISE_PARAGRAPHS,
  A_PROPOS_TRUST_PARAGRAPH,
} from '@/lib/a-propos-eeat-content';
import { COUNT_UP_PROS_PLUS, COUNT_UP_RATING } from '@/lib/readability-presets';
import { Timeline } from '@/components/a-propos/Timeline';
import { PartnersGrid } from '@/components/a-propos/PartnersGrid';
import { EeatRichText } from '@/components/a-propos/EeatRichText';
import { AProposStatsShowcase } from '@/components/a-propos/AProposStatsShowcase';
import { AProposSection } from '@/components/a-propos/AProposSection';
import { AProposMissionCards } from '@/components/a-propos/AProposMissionCards';
import { AProposCertificationCards } from '@/components/a-propos/AProposCertificationCards';
import { AProposLinkedInEmbeds } from '@/components/a-propos/AProposLinkedInEmbeds';
import { AProposAllerPlusLoin } from '@/components/a-propos/AProposAllerPlusLoin';
import { AProposClientsCategories } from '@/components/a-propos/AProposClientsCategories';
import { AProposAutoriteCourseLinks } from '@/components/a-propos/AProposAutoriteCourseLinks';
import { PillarPageHero } from '@/components/pillar/PillarPageHero';
import { PillarTableOfContents } from '@/components/pillar/PillarTableOfContents';
import { PillarStatGrid } from '@/components/pillar/PillarStatGrid';
import { PillarFaqAccordion } from '@/components/pillar/PillarFaqAccordion';
import { GoogleBusinessProfileCta } from '@/components/GoogleBusinessProfileCta';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { BeWorkHighlightSection } from '@/components/landing/BeWorkHighlightSection';
import { Reveal } from '@/components/motion/Reveal';
import { Partenaires } from '@/components/Partenaires';

const A_PROPOS_TOC = [
  { label: 'Introduction', anchor: 'introduction' },
  { label: 'Expertise', anchor: 'expertise' },
  { label: 'Expérience', anchor: 'experience' },
  { label: 'Autorité & références', anchor: 'autorite' },
  { label: 'Certifications', anchor: 'certifications' },
  { label: 'Mission & valeurs', anchor: 'mission-valeurs' },
  { label: 'Clients & partenaires', anchor: 'clients-partenaires' },
  { label: 'LinkedIn Learning', anchor: 'linkedin-learning' },
  { label: 'BeWork — relais admin BTP', anchor: 'bework' },
  { label: 'Contact & Calendly', anchor: 'contact-calendly' },
  { label: 'FAQ', anchor: 'faq' },
] as const;

const A_PROPOS_META_TITLE = `Laure Olivié — formatrice IA BTP — Qualiopi`;
const A_PROPOS_META_DESCRIPTION =
  'Laure Olivié, formatrice IA BTP : 10 ans de terrain (conductrice de travaux), Qualiopi, FFB, CSFE, CNAM, Lefebvre Dalloz. 1 592 pros formés, 4,85/5.';

export const metadata = createPageMetadata({
  title: A_PROPOS_META_TITLE,
  titleAbsolute: A_PROPOS_META_TITLE,
  description: A_PROPOS_META_DESCRIPTION,
  descriptionFinal: true,
  path: '/a-propos',
  keywords: null,
  appendAuthorSuffix: false,
  openGraphTitle: A_PROPOS_META_TITLE,
  openGraphDescription: A_PROPOS_META_DESCRIPTION,
  image: {
    url: '/og/a-propos-og.png',
    width: 1200,
    height: 630,
    alt: 'Laure Olivié — formatrice IA appliquée au bâtiment, Qualiopi, instructrice LinkedIn Learning',
  },
});

export default function AProposPage() {
  const unifiedSchema = getAProposUnifiedJsonLd();
  const personSchema = getAProposPersonJsonLd();
  const organizationSchema = getAProposOrganizationJsonLd();
  const faqItems = [...FAQ_CLIENTS_PARTENAIRES, ...FAQ_A_PROPOS];

  const allerPlusLoinLinks = [
    { href: LINKS.formations, label: 'Catalogue formations IA pour le BTP' },
    { href: LINKS.bework, label: 'BeWork — relais administratif BTP' },
    { href: LINKS.formationIaBtp, label: 'Formation IA pour le BTP — page pilier' },
    { href: LINKS.blog, label: 'Blog IA & ChatGPT BTP' },
    { href: LINKS.etudesCas, label: 'Étude de cas FFB & CSFE' },
    { href: LINKS.financement, label: 'Financement Constructys' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <JsonLd id="schema-a-propos-person" schema={personSchema} />
      <JsonLd id="schema-a-propos-organization" schema={organizationSchema} />
      <JsonLd id="schema-a-propos-unified-graph" schema={unifiedSchema} />

      <PillarPageHero
        variant="splitImage"
        layoutDensity="compact"
        surface="muted"
        entranceAnimation
        eyebrow="OFC Création d'Entreprise · Qualiopi · Guyancourt"
        title="Laure Olivié — Formatrice IA spécialisée BTP"
        titleId="a-propos-hero-title"
        subtitle={
          <p className="tldr-bio mt-3 text-sm leading-relaxed text-[#334155] md:text-[15px]">
            {A_PROPOS_EEAT_INTRO}
          </p>
        }
        tags={['Qualiopi', 'FFB', 'LinkedInLearning', 'BTP', 'Formation']}
        primaryCta={{
          href: LINKS.prendreRdv,
          label: 'Prendre RDV',
          external: false,
        }}
        secondaryCta={{ href: LINKS.formations, label: 'Voir le catalogue →', external: false }}
        credibilityLine={
          <>
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#0F172A]">
              <Award className="h-3.5 w-3.5 shrink-0 text-[#377CF3]" strokeWidth={2} aria-hidden />
              OFC Création d&apos;Entreprise
            </span>
            <span className="hidden text-slate-300 sm:inline" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#475569]">
              <Star className="h-3.5 w-3.5 shrink-0 text-[#377CF3]" aria-hidden />
              Qualiopi · {formatPersonnesFormeesCount()} formés · {SOCIAL_PROOF.AVERAGE_RATING}
            </span>
          </>
        }
        sideImage={{
          src: PHOTOS.aProposHero2026.src,
          alt: PHOTOS.aProposHero2026.alt,
          width: PHOTOS.aProposHero2026.width,
          height: PHOTOS.aProposHero2026.height,
          caption: 'Formatrice IA BTP Qualiopi — présentiel uniquement · Île-de-France uniquement.',
          objectFit: 'contain',
          qualiopiBadge: false,
          animated: true,
        }}
      />

      <AProposStatsShowcase />

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:pb-24 md:pt-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-8 xl:gap-10">
          <div className="mb-8 lg:mb-0">
            <PillarTableOfContents items={A_PROPOS_TOC} instanceId="a-propos" />
          </div>

          <article className="min-w-0 space-y-12 md:space-y-14">
            <AProposSection id="introduction" title="Introduction">
              <p className="mt-4 text-[16px] leading-relaxed text-[#334155]">{A_PROPOS_EEAT_INTRO}</p>
              <p className="mt-4 text-[16px] leading-relaxed text-[#334155]">
                Vous cherchez une formatrice qui connaît vos contraintes de chantier ? Consultez le{' '}
                <Link href={LINKS.formations} className="font-medium text-[#377CF3] hover:underline">
                  catalogue des formations IA pour les pros du BTP
                </Link>{' '}
                ou parcourez le{' '}
                <Link href={LINKS.blog} className="font-medium text-[#377CF3] hover:underline">
                  blog pratique IA &amp; ChatGPT BTP
                </Link>{' '}
                pour des cas d&apos;usage concrets.
              </p>
            </AProposSection>

            <AProposSection id="expertise" title="Expertise">
              <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-[#334155]">
                {A_PROPOS_EXPERTISE_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>
                    <EeatRichText text={paragraph} />
                  </p>
                ))}
              </div>
              <PillarStatGrid
                className="mt-8"
                titleId="expertise-chiffres"
                title="Repères clés"
                description={`Volume formé, satisfaction et certification — ${getStatsFreshnessLabel()}.`}
                columns={2}
                items={[
                  { label: 'Professionnels formés', value: COUNT_UP_PROS_PLUS, Icon: Users },
                  { label: 'Satisfaction Qualiopi', value: COUNT_UP_RATING, Icon: Star },
                  { label: 'Organisme', value: "OFC Création d'Entreprise", Icon: Building2 },
                  { label: 'Certification', value: 'Qualiopi (jan. 2028)', Icon: ShieldCheck },
                ]}
              />
            </AProposSection>

            <Timeline />

            <AProposSection id="autorite" title="Autorité &amp; références">
              <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-[#334155]">
                {A_PROPOS_AUTORITE_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>
                    <EeatRichText text={paragraph} />
                  </p>
                ))}
              </div>
              <AProposAutoriteCourseLinks />
            </AProposSection>

            <AProposSection id="certifications" title="Certifications &amp; labels">
              <p className="mt-4 text-[16px] leading-relaxed text-[#334155]">{A_PROPOS_CERTIFICATIONS_INTRO}</p>
              <p className="mt-4 text-[16px] leading-relaxed text-[#334155]">
                <EeatRichText text={A_PROPOS_TRUST_PARAGRAPH} />
              </p>
              <AProposCertificationCards />
            </AProposSection>

            <AProposSection id="mission-valeurs" title="Mission &amp; valeurs">
              <AProposMissionCards />
            </AProposSection>

            <AProposSection id="clients-partenaires" title="Clients &amp; partenaires">
                <p className="mt-4 text-[16px] leading-relaxed text-[#334155]">
                  <EeatRichText text={A_PROPOS_CLIENTS_INTRO} />
                </p>
                <AProposClientsCategories />
                <p className="mt-6 text-sm text-[#64748B]">
                  Retour d&apos;expérience détaillé :{' '}
                  <Link href={LINKS.etudesCas} className="font-medium text-[#377CF3] hover:underline">
                    étude de cas FFB &amp; CSFE
                  </Link>
                  .
                </p>
            </AProposSection>
            <Partenaires
              id="a-propos-partenaires"
              calendlyCampaign="a-propos-partenaires"
              className="!bg-transparent !py-10 md:!py-12"
            />
            <PartnersGrid />

            <AProposSection id="linkedin-learning" title="Formations LinkedIn Learning">
              <p className="mt-4 text-[16px] leading-relaxed text-[#334155]">
                Instructrice officielle LinkedIn Learning — cours publics vérifiables, complémentaires aux sessions OFC
                en présentiel en Île-de-France.
              </p>
              <AProposLinkedInEmbeds />
            </AProposSection>

            <BeWorkHighlightSection id="bework" surface="card" />

            <AProposSection id="contact-calendly" title="Contact &amp; Calendly">
              <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#334155]">
                {A_PROPOS_CONTACT_INTRO}
              </p>
              <ul className="mt-8 space-y-4 text-[#334155]">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                  <span>
                    <strong>Email :</strong>{' '}
                    <a href={`mailto:${SCHEMA_CONTACT.email}`} className="font-medium text-[#377CF3] hover:underline">
                      {SCHEMA_CONTACT.email}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                  <span>
                    <strong>Adresse :</strong> {SCHEMA_GEO.streetAddress}, {SCHEMA_GEO.postalCode}{' '}
                    {SCHEMA_GEO.addressLocality}
                  </span>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={SCHEMA_LINKEDIN_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border-2 border-[#0A66C2] px-5 py-2.5 text-sm font-semibold text-[#0A66C2] hover:bg-[#0A66C2]/5"
                >
                  LinkedIn — Laure Olivié
                </a>
                <GoogleBusinessProfileCta label="Fiche Google — avis & horaires" />
                <Link
                  href={LINKS.contact}
                  className="rounded-xl border-2 border-[#377CF3] px-5 py-2.5 text-sm font-semibold text-[#377CF3] hover:bg-[#EFF6FF]"
                >
                  Page contact
                </Link>
              </div>
              <div className="mt-10">
                <CalendlyEmbed
                  type="inline"
                  campaign="a-propos-contact"
                  ctaPosition="inline"
                  sectionTitle="Réserver un appel découverte"
                  sectionSubtitle="30 min · visio · sans engagement"
                  heightPx={680}
                />
              </div>
            </AProposSection>

            <PillarFaqAccordion
              id="faq"
              headingId="faq-a-propos-title"
              title="Questions fréquentes"
              subtitle="Qualiopi, parcours, partenariats, zone d'intervention."
              items={faqItems}
              titleAccent
            />

            <AProposAllerPlusLoin links={allerPlusLoinLinks} />

            <Reveal as="footer" className="text-center text-sm text-[#64748B]" distance={8}>
              Profil mis à jour le <time dateTime="2026-05-22">22 mai 2026</time> · OFC Création d&apos;Entreprise — SIRET{' '}
              {SCHEMA_CONTACT.siretFormatted} · NDA {SCHEMA_CONTACT.nda}
            </Reveal>
          </article>
        </div>
      </div>
    </div>
  );
}
