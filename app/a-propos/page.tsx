import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { ArrowUpRight, Award, Building2, Mail, MapPin, Phone, ShieldCheck, Star, Users } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';
import { FAQ_A_PROPOS, FAQ_CLIENTS_PARTENAIRES } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { getAProposUnifiedJsonLd } from '@/lib/schema-a-propos-unified-graph';
import { SCHEMA_CONTACT, SCHEMA_GEO, SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKEDIN_LEARNING_A_PROPOS_EMBEDS } from '@/lib/linkedin-learning-a-propos-embeds';
import { PHOTOS } from '@/lib/photos';
import {
  A_PROPOS_AUTORITE_PARAGRAPHS,
  A_PROPOS_CERTIFICATIONS,
  A_PROPOS_CERTIFICATIONS_INTRO,
  A_PROPOS_CLIENTS_CATEGORIES,
  A_PROPOS_CLIENTS_INTRO,
  A_PROPOS_CONTACT_INTRO,
  A_PROPOS_EEAT_INTRO,
  A_PROPOS_EXPERTISE_PARAGRAPHS,
  A_PROPOS_MISSION,
  A_PROPOS_TRUST_PARAGRAPH,
} from '@/lib/a-propos-eeat-content';
import { Timeline } from '@/components/a-propos/Timeline';
import { PartnersGrid } from '@/components/a-propos/PartnersGrid';
import { EeatRichText } from '@/components/a-propos/EeatRichText';
import { PillarPageHero } from '@/components/pillar/PillarPageHero';
import { PillarTableOfContents } from '@/components/pillar/PillarTableOfContents';
import { PillarStatGrid } from '@/components/pillar/PillarStatGrid';
import { PillarFaqAccordion } from '@/components/pillar/PillarFaqAccordion';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { BeWorkHighlightSection } from '@/components/landing/BeWorkHighlightSection';

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

const A_PROPOS_META_TITLE = 'Laure Olivié - formatrice IA pour le BTP - 1 592 pros, Qualiopi';
const A_PROPOS_META_DESCRIPTION =
  'Formatrice IA pour le BTP (Qualiopi) et relais BeWork. 1 592 pros formés, 4,85/5. FFB, LinkedIn Learning. RDV gratuit.';

export const metadata = createPageMetadata({
  title: A_PROPOS_META_TITLE,
  titleAbsolute: A_PROPOS_META_TITLE,
  description: A_PROPOS_META_DESCRIPTION,
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

function EeatSection({
  id,
  title,
  children,
  className = '',
}: {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8 ${className}`}
    >
      <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

export default function AProposPage() {
  const unifiedSchema = getAProposUnifiedJsonLd();
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
      <JsonLd id="schema-a-propos-unified-graph" schema={unifiedSchema} />

      <PillarPageHero
        variant="splitImage"
        layoutDensity="compact"
        surface="muted"
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
              Qualiopi · {formatProfessionalsTrainedCount()} formés · {SOCIAL_PROOF.AVERAGE_RATING}
            </span>
          </>
        }
        sideImage={{
          src: PHOTOS.portraitPro2026.src,
          alt: PHOTOS.portraitPro2026.alt,
          width: PHOTOS.portraitPro2026.width,
          height: PHOTOS.portraitPro2026.height,
          caption: 'Laure Olivié — formatrice certifiée Qualiopi, sessions IA BTP en présentiel en Île-de-France.',
        }}
      />

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:pb-24 md:pt-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-8 xl:gap-10">
          <div className="mb-8 lg:mb-0">
            <PillarTableOfContents items={A_PROPOS_TOC} instanceId="a-propos" />
          </div>

          <article className="min-w-0 space-y-12 md:space-y-14">
            <EeatSection id="introduction" title="Introduction">
              <p className="mt-4 text-[16px] leading-relaxed text-[#334155]">{A_PROPOS_EEAT_INTRO}</p>
              <p className="mt-4 text-[16px] leading-relaxed text-[#334155]">
                Vous cherchez une formatrice qui connaît vos contraintes de chantier ? Consultez le{' '}
                <Link href={LINKS.formations} className="font-medium text-[#377CF3] hover:underline">
                  catalogue des formations IA pour les pro du BTP
                </Link>{' '}
                ou parcourez le{' '}
                <Link href={LINKS.blog} className="font-medium text-[#377CF3] hover:underline">
                  blog pratique IA &amp; ChatGPT BTP
                </Link>{' '}
                pour des cas d&apos;usage concrets.
              </p>
            </EeatSection>

            <EeatSection id="expertise" title="Expertise">
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
                description="Volume formé, satisfaction et certification — données au 17 avril 2026."
                columns={2}
                items={[
                  { label: 'Professionnels formés', value: formatProfessionalsTrainedCount(), Icon: Users },
                  { label: 'Satisfaction Qualiopi', value: SOCIAL_PROOF.AVERAGE_RATING, Icon: Star },
                  { label: 'Organisme', value: "OFC Création d'Entreprise", Icon: Building2 },
                  { label: 'Certification', value: 'Qualiopi (jan. 2028)', Icon: ShieldCheck },
                ]}
              />
            </EeatSection>

            <Timeline />

            <EeatSection id="autorite" title="Autorité &amp; références">
              <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-[#334155]">
                {A_PROPOS_AUTORITE_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>
                    <EeatRichText text={paragraph} />
                  </p>
                ))}
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {LINKEDIN_LEARNING_A_PROPOS_EMBEDS.map((course) => (
                  <li key={course.courseHref}>
                    <a
                      href={course.courseHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-[#377CF3] hover:underline"
                    >
                      {course.courseLabel}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </EeatSection>

            <EeatSection id="certifications" title="Certifications &amp; labels">
              <p className="mt-4 text-[16px] leading-relaxed text-[#334155]">{A_PROPOS_CERTIFICATIONS_INTRO}</p>
              <p className="mt-4 text-[16px] leading-relaxed text-[#334155]">
                <EeatRichText text={A_PROPOS_TRUST_PARAGRAPH} />
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {A_PROPOS_CERTIFICATIONS.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-xl border border-[#E2E8F0] bg-[#F8F8F8] p-5"
                  >
                    <p className="font-semibold text-[#0F172A]">{item.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#475569]">{item.detail}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-8 rounded-xl border border-[#E2E8F0] bg-[#F8F8F8] p-6">
                <Image
                  src={PHOTOS.qualiopiLogoOfficiel.src}
                  alt={PHOTOS.qualiopiLogoOfficiel.alt}
                  width={180}
                  height={100}
                  className="max-h-20 w-auto object-contain"
                />
                <div className="text-center sm:text-left">
                  <p className="text-sm font-bold uppercase tracking-wide text-[#377CF3]">LinkedIn Learning</p>
                  <p className="mt-1 text-sm text-[#475569]">Instructrice officielle — cours IA BTP</p>
                </div>
              </div>
            </EeatSection>

            <EeatSection id="mission-valeurs" title="Mission &amp; valeurs">
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  { label: 'Mission', value: A_PROPOS_MISSION.mission },
                  { label: 'Approche', value: A_PROPOS_MISSION.approach },
                  { label: 'Philosophie', value: A_PROPOS_MISSION.philosophy },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-[#D4E3FC] bg-[#EFF6FF] p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#377CF3]">{item.label}</p>
                    <p className="mt-2 text-[15px] font-semibold leading-snug text-[#0F172A]">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-[#334155]">
                {A_PROPOS_MISSION.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>
                    <EeatRichText text={paragraph} />
                  </p>
                ))}
              </div>
            </EeatSection>

            <section id="clients-partenaires" className="scroll-mt-24 space-y-8">
              <EeatSection title="Clients &amp; partenaires" className="shadow-none">
                <p className="mt-4 text-[16px] leading-relaxed text-[#334155]">
                  <EeatRichText text={A_PROPOS_CLIENTS_INTRO} />
                </p>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {A_PROPOS_CLIENTS_CATEGORIES.map((category) => (
                    <div key={category.title}>
                      <h3 className="font-semibold text-[#0F172A]">{category.title}</h3>
                      <ul className="mt-3 space-y-2 text-sm text-[#475569]">
                        {category.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-[#377CF3]" aria-hidden>
                              ▸
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-[#64748B]">
                  Retour d&apos;expérience détaillé :{' '}
                  <Link href={LINKS.etudesCas} className="font-medium text-[#377CF3] hover:underline">
                    étude de cas FFB &amp; CSFE
                  </Link>
                  .
                </p>
              </EeatSection>
              <PartnersGrid />
            </section>

            <EeatSection id="linkedin-learning" title="Formations LinkedIn Learning">
              <p className="mt-4 text-[16px] leading-relaxed text-[#334155]">
                Instructrice officielle LinkedIn Learning — cours publics vérifiables, complémentaires aux sessions OFC
                en présentiel en Île-de-France.
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {LINKEDIN_LEARNING_A_PROPOS_EMBEDS.map((course) => (
                  <div
                    key={course.courseHref}
                    className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]"
                  >
                    <div className="aspect-video w-full bg-[#0F172A]">
                      <iframe
                        title={course.iframeTitle}
                        src={course.embedSrc}
                        className="h-full w-full"
                        allowFullScreen
                      />
                    </div>
                    <p className="border-t border-[#E2E8F0] px-4 py-3 text-sm font-medium text-[#0F172A]">
                      {course.courseLabel}
                    </p>
                  </div>
                ))}
              </div>
            </EeatSection>

            <BeWorkHighlightSection id="bework" surface="card" />

            <section
              id="contact-calendly"
              className="scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-10 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
                Contact &amp; Calendly
              </h2>
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
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                  <span>
                    <strong>Téléphone :</strong>{' '}
                    <a href={`tel:${SCHEMA_CONTACT.phone}`} className="font-medium text-[#377CF3] hover:underline">
                      {SCHEMA_CONTACT.phoneDisplay}
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
            </section>

            <PillarFaqAccordion
              id="faq"
              headingId="faq-a-propos-title"
              title="Questions fréquentes"
              subtitle="Qualiopi, parcours, partenariats, zone d'intervention."
              items={faqItems}
            />

            <section aria-labelledby="aller-plus-loin-title" className="scroll-mt-24">
              <h2 id="aller-plus-loin-title" className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
                Aller plus loin
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {allerPlusLoinLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_6px_24px_rgba(15,23,42,0.05)] transition hover:border-[#BFDBFE] hover:shadow-[0_14px_44px_rgba(15,23,42,0.08)]"
                  >
                    <span className="font-display text-base font-bold text-[#0F172A] group-hover:text-[#377CF3]">
                      {item.label}
                    </span>
                    <span className="mt-6 flex items-center gap-1 text-sm font-medium text-[#377CF3]">
                      Ouvrir
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <footer className="text-center text-sm text-[#64748B]">
              Profil mis à jour le <time dateTime="2026-05-22">22 mai 2026</time> · OFC Création d&apos;Entreprise — SIRET{' '}
              {SCHEMA_CONTACT.siretFormatted} · NDA {SCHEMA_CONTACT.nda}
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
}
