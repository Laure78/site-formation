import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, FileText } from 'lucide-react';
import { CitationSentence } from '@/components/seo/CitationSentence';
import { Partenaires } from '@/components/Partenaires';
import { MentionFinancement } from '@/components/MentionFinancement';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import {
  OFC_LINK,
  OFC_CTA_PRIMARY_PILL,
  OFC_TYPE_HERO,
  OFC_TYPE_LEAD,
  OFC_TYPE_H2,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { LINKS } from '@/lib/internal-links';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';
import { getCatalogueFormationsCount } from '@/lib/formations-catalogue-display';
import {
  libelleTarifSessionForfaitaire,
  TARIF_SESSION_FORFAIT_HT,
} from '@/lib/tarifs-sessions';
import { Essentiel } from '@/components/readability/Essentiel';
import { Reveal } from '@/components/motion/Reveal';
import { ProofStats } from '@/components/ProofStats';
import { AccueilHeroAnimatedMesh } from '@/components/landing/AccueilHeroAnimatedMesh';
import { PHOTOS } from '@/lib/photos';

const HERO_CATALOGUE_VISUAL = PHOTOS.formationsCatalogueHero2026;

const CATALOGUE_QUICK_LINKS = [
  {
    href: LINKS.formationIaBtpNiveau1BatimentTp,
    title: "L'IA au service des pros du bâtiment et des travaux publics",
    label: 'IA bâtiment & travaux publics',
  },
  {
    href: LINKS.formationAO,
    title: "L'IA appliquée aux appels d'offres BTP",
    label: "IA appels d'offres BTP",
  },
  {
    href: LINKS.formationConduiteTravauxSuiviChantier,
    title: "L'IA appliquée à la conduite de travaux",
    label: 'IA conduite de travaux',
    code: 'NIV-03' as const,
  },
  {
    href: LINKS.formationMaitriserClaudeAiBtp,
    title: 'Maîtriser Claude AI pour le BTP — Chat, Cowork & Code',
    label: 'Maîtriser Claude AI pour le BTP',
  },
  {
    href: LINKS.formationIaMaitriseOeuvre,
    title: "L'IA au service des maîtres d'œuvre",
    label: 'IA maîtres d\'œuvre',
  },
] as const;

/** Hero accueil — fold option B + détails SEO sous le pli. */
export function AccueilHeroSection() {
  const catalogueCount = getCatalogueFormationsCount();
  const catalogueLinks = CATALOGUE_QUICK_LINKS.filter(
    (item) => !('code' in item) || getPublishedFormations().some((f) => f.code === item.code),
  );

  return (
    <section className={`${OFC_SEC.hero} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23377cf3\' fill-opacity=\'0.045\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-90" />
      <AccueilHeroAnimatedMesh />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="accueil-hero-fold">
          <div className="accueil-hero-content min-w-0">
            <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-ofc-accent/20 bg-white/95 px-3 py-1.5 text-xs font-medium text-ofc-accent shadow-ofc-sm backdrop-blur-sm ring-1 ring-white/80 sm:px-4 sm:py-2 sm:text-sm">
              <Sparkles size={14} strokeWidth={1.5} className="shrink-0 text-ofc-accent sm:h-4 sm:w-4" aria-hidden />
              <span>Formation IA BTP · organisme certifié Qualiopi · Constructys</span>
            </div>
            <h1 className={`${OFC_TYPE_HERO} mt-5`}>
              Formation IA pour le BTP — devis, chantier, appels d&apos;offres
            </h1>
            <p className={`${OFC_TYPE_LEAD} mt-4 font-medium text-ofc-ink`}>
              Gagnez du temps sur vos devis, comptes rendus et réponses aux appels d&apos;offres avec{' '}
              <span className="font-serif italic text-ofc-accent">Claude AI</span> et ChatGPT.
            </p>
            <div className="mt-6 sm:mt-7">
              <Link href={LINKS.accueilRdv} className={`${OFC_CTA_PRIMARY_PILL} w-full sm:w-auto`}>
                Prendre rendez-vous
              </Link>
            </div>
            <div className="mt-6 sm:mt-7">
              <ProofStats className="rounded-ofc-card border border-ofc-border-strong/80 shadow-ofc-sm" />
            </div>
          </div>

          <aside className="accueil-hero-aside mx-auto w-full max-w-[280px] shrink-0 lg:mx-0 lg:max-w-none xl:max-w-[360px]">
            <Link
              href={LINKS.formations}
              title={HERO_CATALOGUE_VISUAL.title}
              className="block overflow-hidden rounded-2xl bg-white/95 p-1 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/80 transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            >
              <Image
                src={HERO_CATALOGUE_VISUAL.src}
                alt={HERO_CATALOGUE_VISUAL.alt}
                title={HERO_CATALOGUE_VISUAL.title}
                width={HERO_CATALOGUE_VISUAL.width}
                height={HERO_CATALOGUE_VISUAL.height}
                priority
                className="h-auto w-full rounded-[0.85rem] object-cover"
                sizes="(max-width: 1024px) 280px, 360px"
                quality={75}
              />
            </Link>
          </aside>
        </div>

        <div className="accueil-hero-details mt-10 space-y-6 md:mt-12 md:space-y-7">
          <div className="ofc-read-width-wide space-y-2">
            <h2 className={`${OFC_TYPE_H2} text-xl md:text-2xl lg:text-[1.35rem] lg:leading-snug`}>
              Formation IA BTP en présentiel en Île-de-France — sessions de 4 h
            </h2>
            <p className="text-sm font-medium text-ofc-ink-muted md:text-base">
              Présentiel uniquement · Île-de-France uniquement
            </p>
          </div>
          <Partenaires
            id="accueil-partenaires"
            embedded
            showPageLink
            showGeoCitation
            rdvAnchor
            className="!mt-0"
          />

          <p
            className="citation-sentence rounded-ofc-card border border-ofc-border-strong/70 bg-white p-4 text-[0.9375rem] leading-relaxed text-slate-800 shadow-[inset_4px_0_0_0_var(--ofc-color-accent),var(--shadow-ofc-md)] md:p-5 md:text-lg"
            data-citation="true"
            itemProp="description"
          >
            <strong>Laure Olivié</strong> forme vos équipes BTP à utiliser l&apos;IA sur leurs vrais documents
            — devis, CR, DCE, mémoires techniques. Organisme <strong>OFC Création d&apos;Entreprise</strong>{' '}
            certifié Qualiopi.{' '}
            <MentionFinancement variant="court" />
          </p>

          <Essentiel
            idPrefix="accueil"
            items={[
              'Sessions 4 h en présentiel IDF : devis, comptes rendus, appels d’offres et mémoires techniques (Claude AI, ChatGPT).',
              <>
                OFC Création d’Entreprise certifié Qualiopi — <MentionFinancement variant="long" />
              </>,
              'intra-entreprise, dans vos locaux, présentiel uniquement · Île-de-France uniquement.',
              'Travail sur vos documents BTP réels : DCE, CCTP, relances clients et administratif chantier.',
              <>
                Catalogue {catalogueCount} formations dispensées par un organisme certifié Qualiopi — forfait unique{' '}
                {libelleTarifSessionForfaitaire(TARIF_SESSION_FORFAIT_HT)}
                <MentionTvaAsterisque /> (Claude AI = une fiche : Maîtriser Claude AI pour
                le BTP).
              </>,
            ]}
          />
          <p className="text-sm leading-relaxed text-slate-600">
            Volume formé et satisfaction :{' '}
            <Link href={LINKS.indicateursResultats} className={OFC_LINK}>
              indicateurs de résultats Qualiopi
            </Link>
            .
          </p>
          <p className="flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
            <Link href="#guide-conducteur-travaux" className={`${OFC_LINK} inline-flex items-center gap-2 font-semibold`}>
              <FileText className="h-4 w-4 shrink-0" aria-hidden />
              Guide conducteur de travaux (PDF gratuit)
            </Link>
            <Link href="#offre-formations" className={`${OFC_LINK} font-semibold`}>
              Voir le catalogue
            </Link>
          </p>
          <div className="rounded-ofc-lg border border-ofc-border-strong/90 bg-white/70 px-4 py-3 shadow-ofc-sm backdrop-blur-sm md:px-5">
            <p className="text-sm leading-relaxed text-slate-600">
              <span className="font-medium text-slate-700">
                Catalogue ({catalogueCount} formations) :
              </span>{' '}
              {catalogueLinks.map((item, index) => (
                <span key={item.href}>
                  {index > 0 ? ' · ' : null}
                  <Link href={item.href} className={OFC_LINK} title={item.title}>
                    {item.label}
                  </Link>
                </span>
              ))}
              {' · '}
              <Link
                href={LINKS.financement}
                className={OFC_LINK}
                title="Financement Constructys — formation IA pour le BTP"
              >
                financement Constructys
              </Link>
            </p>
          </div>
          <Reveal>
            <p
              className="text-sm text-slate-600 italic"
              data-citation="true"
            >
              <strong>Définition.</strong> Une « formation IA appliquée au bâtiment » est une formation professionnelle
              destinée aux entreprises du bâtiment et de la construction (gros œuvre, second œuvre, travaux publics).
              Elle apprend aux équipes à utiliser les outils d&apos;intelligence artificielle générative
              (Claude AI et ChatGPT) pour automatiser leurs tâches récurrentes : devis, analyse de DCE et CCTP,
              appels d&apos;offres et mémoires techniques, comptes rendus de chantier, relances clients et documents
              administratifs.
            </p>
          </Reveal>
          <CitationSentence text="La formation IA pour le BTP animée par Laure Olivié aide les professionnels du BTP et conducteurs de travaux à gagner du temps : automatisation des devis, de l'administratif et des dossiers d'appels d'offres avec l'IA adaptée au chantier (Claude AI)." />
        </div>
      </div>
    </section>
  );
}
