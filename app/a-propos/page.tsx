import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Award, Building2, GraduationCap, HardHat, ShieldCheck, Star, Target, Users } from 'lucide-react';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { FAQ_A_PROPOS, FAQ_CLIENTS_PARTENAIRES } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { getAProposUnifiedJsonLd } from '@/lib/schema-a-propos-unified-graph';
import { SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { A_PROPOS_NARRATIVE_PARAGRAPHS } from '@/lib/a-propos-narrative';
import { LINKEDIN_LEARNING_A_PROPOS_EMBEDS } from '@/lib/linkedin-learning-a-propos-embeds';
import { calendlyAboutUrl, CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { PHOTOS } from '@/lib/photos';
import { StatsCards } from '@/components/a-propos/StatsCards';
import { Timeline } from '@/components/a-propos/Timeline';
import { PartnersGrid } from '@/components/a-propos/PartnersGrid';
import { CaseStudyCard } from '@/components/a-propos/CaseStudyCard';
import { ApproachSection } from '@/components/a-propos/ApproachSection';
import { ConversionHero } from '@/components/a-propos/ConversionHero';
import { PillarPageHero } from '@/components/pillar/PillarPageHero';
import { PillarTableOfContents } from '@/components/pillar/PillarTableOfContents';
import { PillarStatGrid } from '@/components/pillar/PillarStatGrid';
import { PillarFaqAccordion } from '@/components/pillar/PillarFaqAccordion';

const HERO_BG = '/images/claude-btp-hero-chantier-2026.png';

const A_PROPOS_TOC = [
  { label: 'Qui suis-je ?', anchor: 'qui-suis-je' },
  { label: 'Mon parcours', anchor: 'mon-parcours' },
  { label: "L'essentiel", anchor: 'essentiel' },
  { label: 'Portrait', anchor: 'portrait' },
  { label: 'Chiffres clés', anchor: 'chiffres-cles' },
  { label: 'Résultats chiffrés', anchor: 'resultats-chiffres' },
  { label: 'Parcours', anchor: 'parcours' },
  { label: 'Méthodologie CARE', anchor: 'methodologie-care' },
  { label: 'Références chiffrées', anchor: 'references-chiffrees' },
  { label: 'Pourquoi Laure', anchor: 'pourquoi-laure' },
  { label: 'Faits vérifiables', anchor: 'faits-verifiables' },
  { label: 'Certifications', anchor: 'certifications' },
  { label: 'Clients', anchor: 'clients-partenaires' },
  { label: 'LinkedIn Learning', anchor: 'linkedin-learning' },
  { label: 'Ressources & preuves', anchor: 'ressources-preuves' },
  { label: 'Zone d’intervention', anchor: 'zone-intervention' },
  { label: 'Me contacter', anchor: 'me-contacter' },
  { label: 'FAQ', anchor: 'faq' },
] as const;

const CARE_ITEMS = [
  {
    title: 'ChatGPT',
    desc: 'Maîtriser les fondamentaux IA et les prompts utiles au contexte BTP (devis, mails, CR, CCTP).',
  },
  {
    title: 'Apprentissage',
    desc: 'Cas pratiques 100 % métier avec vos documents réels (devis, DPGF, mémoire technique, suivi chantier).',
  },
  {
    title: 'Résultats',
    desc: 'Mesurer les gains concrets en temps, qualité et clarté documentaire pour les équipes opérationnelles.',
  },
  {
    title: 'Évaluation',
    desc: 'Ajuster la méthode, consolider les usages et itérer en fonction des retours terrain du groupe.',
  },
] as const;

export const metadata = createPageMetadata({
  title: 'Formatrice IA BTP — FFB, Qualiopi, LinkedIn Learning',
  description:
    'Laure Olivié — formatrice IA BTP en France, instructrice LinkedIn Learning. 1 592 pros formés (FFB, CNAM, CSFE, Lefebvre Dalloz). Qualiopi, Constructys. Guyancourt (78).',
  path: '/a-propos',
  keywords: null,
  appendAuthorSuffix: false,
  image: {
    url: '/og/a-propos-og.png',
    width: 1200,
    height: 630,
    alt: 'Laure Olivié — formatrice IA BTP, Qualiopi, instructrice LinkedIn Learning',
  },
});

export default function AProposPage() {
  const unifiedSchema = getAProposUnifiedJsonLd();
  const faqItems = [...FAQ_CLIENTS_PARTENAIRES, ...FAQ_A_PROPOS];
  const aboutHeroUrl = calendlyAboutUrl('hero');
  const aboutApproachUrl = calendlyAboutUrl('approach');
  const aboutBottomUrl = calendlyAboutUrl('bottom-cta');
  const lead = `${formatProfessionalsTrainedCount()} professionnels du bâtiment et des travaux publics formés (au 17 avril 2026). Note ${SOCIAL_PROOF.AVERAGE_RATING} sur les évaluations fin de formation. Fondatrice et présidente d'OFC Création d'Entreprise (Qualiopi), instructrice LinkedIn Learning. Ancienne fondatrice et conductrice de travaux chez ALIA BTP (Guyancourt).`;
  const qualiopiText = "Numéro de déclaration d'activité (NDA) : 11788515078 — organisme conforme au référentiel national qualité des actions de formation.";

  const allerPlusLoinLinks = [
    { href: LINKS.formationIaBtp, label: 'Formation IA BTP (page pilier)' },
    { href: LINKS.chatgptArtisans, label: 'ChatGPT pour PME BTP' },
    { href: LINKS.iaDevis, label: 'IA devis bâtiment' },
    { href: LINKS.blog, label: 'Blog' },
    { href: LINKS.diagnostic, label: 'Diagnostic IA BTP gratuit' },
    { href: CALENDLY_BOOKING_URL, label: 'Calendly — prendre rendez-vous' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <JsonLd id="schema-a-propos-unified-graph" schema={unifiedSchema} />

      <PillarPageHero
        variant="splitImage"
        backgroundImageSrc={HERO_BG}
        backgroundImageAlt=""
        eyebrow="Formatrice IA BTP · Guyancourt · Depuis 2014"
        title="À Propos de Laure Olivié — Formatrice IA BTP"
        titleId="a-propos-hero-title"
        subtitle={
          <>
            <p className="text-lg font-normal text-white/95 md:text-xl">Formatrice IA et ChatGPT pour les entreprises du BTP</p>
            <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">{lead}</p>
          </>
        }
        tags={['Qualiopi', 'FFB', 'LinkedInLearning', 'BTP', 'Formation']}
        primaryCta={{ href: aboutHeroUrl, label: 'Prendre RDV' }}
        secondaryCta={{ href: LINKS.formations, label: 'Voir le catalogue →', external: false }}
        credibilityLine={
          <>
            <span className="inline-flex items-center gap-1.5 font-medium text-white/85">
              <Award className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
              OFC Création d&apos;Entreprise
            </span>
            <span className="hidden sm:inline text-white/35" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Qualiopi · Constructys · {formatProfessionalsTrainedCount()} formés · {SOCIAL_PROOF.AVERAGE_RATING}
            </span>
          </>
        }
        sideImage={{
          src: PHOTOS.portraitPro2026.src,
          alt: PHOTOS.portraitPro2026.alt,
          width: PHOTOS.portraitPro2026.width,
          height: PHOTOS.portraitPro2026.height,
          caption: 'Laure Olivié — formatrice certifiée Qualiopi, sessions IA BTP en présentiel et distanciel.',
        }}
      />

      <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 md:pb-32 md:pt-12">
        <div className="lg:grid lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-10 xl:gap-12">
          <div className="mb-8 lg:mb-0">
            <PillarTableOfContents items={A_PROPOS_TOC} instanceId="a-propos" />
          </div>

          <article className="min-w-0 space-y-20 md:space-y-28">
            <section id="qui-suis-je" className="scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">Qui suis-je ?</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[#334155]">
                Je suis <strong>Laure Olivié</strong>, formatrice et consultante IA spécialisée dans la formation des
                professionnels du bâtiment et des travaux publics à <strong>ChatGPT</strong>, <strong>Claude AI</strong>{' '}
                et <strong>Gemini</strong>.
              </p>
              <p className="mt-3 text-[16px] leading-relaxed text-[#334155]">
                Depuis 2023, j&apos;ai formé plus de <strong>{formatProfessionalsTrainedCount()}</strong> artisans, chefs
                d&apos;entreprise et conducteurs de travaux.
              </p>
              <p className="mt-3 text-[16px] leading-relaxed text-[#334155]">
                Mes formations combinent fondamentaux IA, méthodologie CARE et cas pratiques 100 % BTP sur vos documents
                réels.
              </p>
            </section>

            <section id="mon-parcours" className="scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">Mon parcours</h2>
              <ul className="mt-6 space-y-3 text-[#334155]">
                <li>
                  <strong>2014</strong> : immersion opérationnelle en conduite de chantier et coordination travaux.
                </li>
                <li>
                  <strong>2021</strong> : structuration d&apos;OFC Création d&apos;Entreprise (SASU).
                </li>
                <li>
                  <strong>2023</strong> : lancement des premières formations IA appliquées au BTP.
                </li>
                <li>
                  <strong>2024</strong> : certification Qualiopi (NDA 11788515078) et déploiement des parcours inter/intra.
                </li>
                <li>
                  <strong>2025-2026</strong> : montée en puissance des modules ChatGPT, Claude AI, Gemini et interventions
                  partenaires (FFB, CSFE, CNAM, Lefebvre Dalloz).
                </li>
              </ul>
            </section>

            <section id="essentiel" className="scroll-mt-24">
              <div id="essentiel-retour" className="scroll-mt-24" aria-hidden />
              <PillarStatGrid
                titleId="essentiel-title"
                title={"L'essentiel à retenir"}
                description="Repères vérifiables — organisme, volume formé et certification."
                columns={2}
                items={[
                  { label: 'Organisme', value: "OFC Création d'Entreprise (Qualiopi)", Icon: Building2 },
                  { label: 'Professionnels formés', value: formatProfessionalsTrainedCount(), Icon: Users },
                  { label: 'Satisfaction', value: SOCIAL_PROOF.AVERAGE_RATING, Icon: Star },
                  { label: 'LinkedIn Learning', value: 'Instructrice', Icon: GraduationCap },
                ]}
              />
              <p className="mt-6 rounded-xl border border-[#E2E8F0] bg-white px-5 py-4 text-[15px] leading-relaxed text-[#334155] shadow-sm">
                {qualiopiText}
              </p>
            </section>

            <section id="portrait" className="scroll-mt-24">
              <div id="portrait-narratif" className="scroll-mt-24" aria-hidden />
              <div className="rounded-2xl border border-[#E2E8F0] bg-white px-6 py-10 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#377CF3]">Biographie</p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">Portrait</h2>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-[#D4E3FC] via-[#E2E8F0] to-transparent" aria-hidden />
                <div className="tldr-bio mt-8 max-w-3xl space-y-6 text-[17px] leading-[1.9] text-[#334155] md:text-lg">
                  {A_PROPOS_NARRATIVE_PARAGRAPHS.map((paragraph, index) => (
                    <p
                      key={`${index}-${paragraph}`}
                      className={index === A_PROPOS_NARRATIVE_PARAGRAPHS.length - 1 ? 'pt-2 font-semibold text-[#475569]' : ''}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            <StatsCards />

            <section id="resultats-chiffres" className="scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">Résultats chiffrés</h2>
              <ul className="mt-6 space-y-3 text-[#334155]">
                <li>
                  <strong>{formatProfessionalsTrainedCount()} professionnels formés</strong> dans le bâtiment et les travaux publics.
                </li>
                <li>
                  <strong>Note de satisfaction : {SOCIAL_PROOF.AVERAGE_RATING}</strong>.
                </li>
                <li>
                  <strong>Taux de recommandation</strong> : suivi en consolidation sur les cohortes 2026.
                </li>
                <li>
                  <strong>Taux de conversion RDV → achat</strong> : pilotage interne, publication agrégée annuelle.
                </li>
              </ul>
            </section>

            <Timeline />

            <section id="methodologie-care" className="scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">Ma méthodologie CARE</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {CARE_ITEMS.map((item) => (
                  <article key={item.title} className="rounded-xl border border-[#E2E8F0] bg-[#F8F8F8] p-5">
                    <h3 className="font-semibold text-[#0F172A]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#475569]">{item.desc}</p>
                  </article>
                ))}
              </div>
              <details className="mt-6 rounded-xl border border-[#E2E8F0] bg-[#F8F8F8] p-4">
                <summary className="cursor-pointer text-sm font-semibold text-[#0F172A]">
                  Voir le détail opérationnel de la méthode CARE
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  Chaque session alterne démonstration, pratique guidée et adaptation à vos cas réels. Les participants
                  repartent avec des prompts validés, un protocole de relecture et un plan d&apos;usage sur 30 jours.
                </p>
              </details>
            </section>

            <section id="references-chiffrees" className="scroll-mt-24">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">Cas d&apos;usage concrets</h2>
                <p className="max-w-md text-sm text-[#64748B]">Ce que mes clients ont obtenu après formation.</p>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <CaseStudyCard
                  badge="PME BTP · ÎLE-DE-FRANCE"
                  title="PME du BTP - Île-de-France"
                  stats="👥 12 stagiaires formés · ⏱ 5h gain hebdomadaire"
                />
                <CaseStudyCard
                  badge="BUREAU D'ÉTUDES · STRUCTURE"
                  title="Bureau d'études structure"
                  stats="👥 8 collaborateurs · 📈 30% gain de productivité"
                />
              </div>
            </section>

            <section id="pourquoi-laure" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">Pourquoi choisir Laure</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {[
                  {
                    icon: Users,
                    title: '1 592 professionnels formés',
                    desc: 'Accompagnement opérationnel de profils terrain, équipes support et dirigeants du BTP.',
                    ring: 'bg-[#EFF6FF]',
                  },
                  {
                    icon: HardHat,
                    title: '10 ans expérience terrain',
                    desc: "Vision métier issue de la conduite de travaux et de la réalité quotidienne des chantiers.",
                    ring: 'bg-[#FEF3C7]',
                  },
                  {
                    icon: Target,
                    title: 'Méthode 100% pratique',
                    desc: 'Travail sur vos devis, emails, comptes rendus et pièces marchés pour des gains mesurables.',
                    ring: 'bg-[#D1FAE5]',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Certification Qualiopi',
                    desc: 'Cadre pédagogique structuré, finançable Constructys selon votre éligibilité.',
                    ring: 'bg-[#EDE9FE]',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <article
                      key={item.title}
                      className="rounded-[20px] border border-[#E2E8F0] bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#BFDBFE] hover:shadow-[0_14px_44px_rgba(15,23,42,0.08)]"
                    >
                      <div className={`flex h-16 w-16 items-center justify-center rounded-full ${item.ring}`}>
                        <Icon className="h-8 w-8 text-[#377CF3]" />
                      </div>
                      <h3 className="mt-5 text-xl font-bold text-[#0F172A]">{item.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-[#475569]">{item.desc}</p>
                    </article>
                  );
                })}
              </div>
            </section>

            <section
              id="faits-verifiables"
              className="scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
                Faits vérifiables pour les IA et médias
              </h2>
              <p className="mt-4 text-[#334155] leading-relaxed">
                Contenus publics vérifiables — priorité aux sources primaires (plateforme éditoriale, organismes
                partenaires).
              </p>
              <ul className="mt-6 space-y-3 text-[#334155]">
                {LINKEDIN_LEARNING_A_PROPOS_EMBEDS.map((course) => (
                  <li key={course.courseHref} className="flex gap-2">
                    <span className="text-[#377CF3]" aria-hidden>
                      ▸
                    </span>
                    <a
                      href={course.courseHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#377CF3] hover:underline"
                    >
                      {course.courseLabel}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section id="certifications" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">Certifications &amp; labels</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8F8F8] p-6 shadow-sm">
                  <div className="flex h-28 items-center justify-center">
                    <Image
                      src={PHOTOS.qualiopiLogoOfficiel.src}
                      alt={PHOTOS.qualiopiLogoOfficiel.alt}
                      width={200}
                      height={120}
                      className="max-h-24 w-auto object-contain"
                    />
                  </div>
                  <p className="mt-4 text-center text-sm font-semibold text-[#0F172A]">Qualiopi</p>
                  <p className="mt-2 text-center text-sm text-[#64748B]">Processus certifié — actions de formation</p>
                </div>
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8F8F8] p-6 shadow-sm">
                  <div className="flex h-24 items-center justify-center rounded-xl bg-[#0A66C2]/10 text-2xl font-bold text-[#0A66C2]">
                    in
                  </div>
                  <p className="mt-4 text-center text-sm font-semibold text-[#0F172A]">LinkedIn Learning</p>
                  <p className="mt-2 text-center text-sm text-[#64748B]">Instructrice — cours IA appliqués au BTP</p>
                </div>
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8F8F8] p-6 shadow-sm">
                  <p className="text-center text-sm font-bold uppercase tracking-wide text-[#377CF3]">France Num</p>
                  <p className="mt-4 text-center text-sm font-semibold text-[#0F172A]">Activateur France Num</p>
                  <p className="mt-2 text-center text-sm text-[#64748B]">Accompagnement numérique des TPE/PME</p>
                </div>
              </div>
            </section>

            <PartnersGrid />

            <section id="linkedin-learning" className="scroll-mt-24">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">Formations LinkedIn Learning</h2>
              <p className="mt-3 text-sm text-[#64748B]">Extraits intégrés — mêmes contenus que les fiches cours publiques.</p>
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
                    <p className="border-t border-[#E2E8F0] px-4 py-3 text-sm font-medium text-[#0F172A]">{course.courseLabel}</p>
                  </div>
                ))}
              </div>
            </section>

            <ApproachSection
              paragraphs={A_PROPOS_NARRATIVE_PARAGRAPHS.slice(4, 7)}
              quote="« Mon rôle, ce n'est pas de faire du blabla sur l'IA. C'est de vous montrer en direct comment ChatGPT fait gagner 3 à 5 heures par semaine sur vos devis, vos comptes rendus chantier et vos relances clients. »"
              calendlyHref={aboutApproachUrl}
              formationsHref={LINKS.formations}
            />

            <section
              id="ressources-preuves"
              className="scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-10 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">Ressources &amp; preuves</h2>
              <p className="mt-3 text-[#64748B]">Profils publics, contenus et références vérifiables.</p>
              <ul className="mt-6 space-y-3 text-[#334155]">
                <li>
                  <a href={SCHEMA_LINKEDIN_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-[#377CF3] hover:underline">
                    Mon LinkedIn
                  </a>
                </li>
                <li>
                  <Link href={LINKS.blog} className="font-medium text-[#377CF3] hover:underline">
                    Mes articles de blog
                  </Link>
                </li>
                <li>
                  <Link href={LINKS.formations} className="font-medium text-[#377CF3] hover:underline">
                    Formations disponibles
                  </Link>
                </li>
                <li>
                  <Link href={LINKS.etudesCas} className="font-medium text-[#377CF3] hover:underline">
                    Témoignages clients (étude de cas)
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/learning/instructors/laure-olivie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#377CF3] hover:underline"
                  >
                    Podcasts / interviews / cours publics
                  </a>
                </li>
              </ul>
            </section>

            <section
              id="zone-intervention"
              className="scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-10 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">Zone d&apos;intervention</h2>
              <p className="mt-4 text-[#475569]">
                Basée à Guyancourt (78), interventions en présentiel en{' '}
                <Link href="/formation-ia-btp-ile-de-france" className="font-medium text-[#377CF3] hover:underline">
                  Île-de-France
                </Link>{' '}
                : sessions inter ou intra sur site.
              </p>
              <p className="mt-4 text-sm text-[#64748B]">
                <a
                  href="https://maps.google.com/?q=6+Rue+Henri+Dunant+78280+Guyancourt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
                >
                  Voir sur Google Maps — Guyancourt
                </a>
              </p>
            </section>

            <section className="scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-10 text-center shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">Retrouvez Laure en ligne</h2>
              <p className="mt-3 text-[#64748B]">Profils publics — actualités et missions</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={SCHEMA_LINKEDIN_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border-2 border-[#0A66C2] px-6 py-3 font-semibold text-[#0A66C2]"
                >
                  LinkedIn — Laure Olivié
                </a>
                <a
                  href="https://www.malt.fr/profile/laureoli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border-2 border-[#0F172A] px-6 py-3 font-semibold text-[#0F172A]"
                >
                  Malt — profil expert
                </a>
              </div>
            </section>

            <section
              id="me-contacter"
              className="scroll-mt-24 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-10 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">Me contacter</h2>
              <ul className="mt-6 space-y-3 text-[#334155]">
                <li>
                  <strong>Email :</strong>{' '}
                  <a href="mailto:laureolivie@yahoo.fr" className="font-medium text-[#377CF3] hover:underline">
                    laureolivie@yahoo.fr
                  </a>
                </li>
                <li>
                  <strong>Téléphone :</strong>{' '}
                  <a href="tel:+33695661818" className="font-medium text-[#377CF3] hover:underline">
                    06 95 66 18 18
                  </a>
                </li>
                <li>
                  <strong>Adresse :</strong> 6 rue Henri Dunant, 78280 Guyancourt
                </li>
              </ul>
              <div className="mt-8">
                <a
                  href={aboutBottomUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#377CF3] px-6 py-3 font-semibold text-white hover:bg-blue-600"
                >
                  Prendre rendez-vous
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </section>

            <PillarFaqAccordion
              id="faq"
              headingId="faq-a-propos-title"
              title="Questions fréquentes"
              subtitle="Qualiopi, parcours, partenariats, zone d’intervention."
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
                    <span className="font-display text-base font-bold text-[#0F172A] group-hover:text-[#377CF3]">{item.label}</span>
                    <span className="mt-6 flex items-center gap-1 text-sm font-medium text-[#377CF3]">
                      Ouvrir
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <ConversionHero
              calendlyHref={aboutBottomUrl}
              phoneDisplay={SITE_CONFIG.phoneDisplay}
              phoneHref={`tel:${SITE_CONFIG.phone}`}
            />

            <footer className="text-center text-sm text-[#64748B]">
              Profil mis à jour le <time dateTime="2026-04-17">17 avril 2026</time> · Version 3.0
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
}
