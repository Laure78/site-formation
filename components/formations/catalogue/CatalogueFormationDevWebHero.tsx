import Image from 'next/image';
import Link from 'next/link';
import { Clock, Download, Users, Wrench } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { DevWebIaPrixLancementCard } from '@/components/formations/DevWebIaPrixLancementCard';
import { FormationHeroOutilsNote } from '@/components/formations/FormationHeroOutilsNote';
import { OfcYouTubeEmbed } from '@/components/ui/OfcYouTubeEmbed';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import { trainingCategoryBadge } from '@/lib/training-page-helpers';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getFormationByCode, libelleEffectifFormation } from '@/data/formations';
import { OFC_CTA_SECONDARY, OFC_EYEBROW, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { MENTIONS_TVA_INTRA_COURTE, formatTarifHt } from '@/lib/tarifs-sessions';
import { FINANCEMENT_FORMULATION_COURTE } from '@/lib/financement-copy';
import { VIDEOS } from '@/lib/videos';
import {
  DEV_WEB_IA_BADGE_NOUVELLE,
  DEV_WEB_IA_DUREE_COURTE,
  DEV_WEB_IA_HOOK,
  DEV_WEB_IA_PDF_14H_HREF,
  DEV_WEB_IA_PDF_7H_HREF,
  DEV_WEB_IA_PRIX_LANCEMENT_LABEL,
  DEV_WEB_IA_SUBTITLE,
  TARIF_INTER_DEV_WEB_IA_14H_HT,
  TARIF_INTER_DEV_WEB_IA_HT,
} from '@/lib/formation-developpement-web-ia-content';
import { BEWORK_LOGO, BEWORK_SUBTAGLINE } from '@/lib/bework-brand';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';
import { LINKS } from '@/lib/internal-links';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-10');
const FORMATION = getFormationByCode('NIV-10')!;
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-10');
const HERO_VIDEO = VIDEOS.formationDevWebIaSansCoder2026;
const EFFECTIF_LIBELLE = libelleEffectifFormation(FORMATION);

/** Hero BeWork — aligné largeur / espacements fiche catalogue NIV-01. */
export function CatalogueFormationDevWebHero() {
  return (
    <section className="border-b border-slate-200 bg-white px-4 py-8 md:py-10" aria-labelledby="dev-web-ia-h1">
      <div className="mx-auto max-w-6xl">
        <Link href={LINKS.formations} className={`${OFC_LINK} text-sm`}>
          Catalogue des formations IA pour le BTP
        </Link>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(240px,360px)] lg:gap-8">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <ExternalLinkAnchor
                href={EXTERNAL_SITE_URLS.bework}
                title="BeWork — bework.fr (nouvel onglet)"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm"
              >
                <Image
                  src={BEWORK_LOGO.src}
                  alt={BEWORK_LOGO.alt}
                  width={BEWORK_LOGO.width}
                  height={BEWORK_LOGO.height}
                  className="h-6 w-auto max-w-[120px] object-contain"
                  priority
                />
              </ExternalLinkAnchor>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
                {trainingCategoryBadge('creation-ia')}
              </span>
              <p className={OFC_EYEBROW}>7 h ou 14 h</p>
              <span className="rounded-full bg-[#377CF3] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">
                {DEV_WEB_IA_BADGE_NOUVELLE}
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1D4ED8]">
              {BEWORK_SUBTAGLINE} · Parcours BeWork
            </p>
            <h1
              id="dev-web-ia-h1"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
            >
              {CATALOGUE_SEO.h1}
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-700">{DEV_WEB_IA_SUBTITLE}</p>

            <DevWebIaPrixLancementCard className="mt-6" formationTitle={FORMATION.titre} />

            <div className="mt-8 space-y-1 border-l-4 border-[#377CF3] pl-5">
              <p className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {DEV_WEB_IA_HOOK.line1}
              </p>
              <p className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {DEV_WEB_IA_HOOK.line2}
              </p>
              <p className="font-display text-2xl font-bold tracking-tight text-[#377CF3] md:text-3xl">
                {DEV_WEB_IA_HOOK.line3}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={DEV_WEB_IA_PDF_7H_HREF}
                download="programme-ofc-developpement-web-ia-7h.pdf"
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                Programme 7 h (PDF)
              </a>
              <a
                href={DEV_WEB_IA_PDF_14H_HREF}
                download="programme-ofc-developpement-web-ia-14h.pdf"
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3`}
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                Programme 14 h (PDF)
              </a>
              <Link href={LINKS.contact} className={`${OFC_LINK} inline-flex min-h-11 items-center text-sm`}>
                Voir les prochaines dates
              </Link>
            </div>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
              Pas un logiciel complet prêt pour la production : une première version fonctionnelle, une méthode de
              travail, des tests, des corrections et une feuille de route pour continuer.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-800">
              <li className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#377CF3]" aria-hidden />
                {DEV_WEB_IA_DUREE_COURTE} · 9h00 – 17h00
              </li>
              <li className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-[#377CF3]" aria-hidden />
                {EFFECTIF_LIBELLE}
              </li>
              <li className="inline-flex items-center gap-2">
                <Wrench className="h-4 w-4 text-[#377CF3]" aria-hidden />
                70 % pratique
              </li>
            </ul>

            <FormationHeroOutilsNote catalogueRef="NIV-10" className="mt-6" />
          </div>

          <aside className="min-w-0 space-y-5">
            <OfcYouTubeEmbed
              youtubeId={HERO_VIDEO.youtubeId}
              title={HERO_VIDEO.title}
              caption={HERO_VIDEO.caption}
              priority
              poster={{
                src: CATALOGUE_VISUEL.src,
                alt: CATALOGUE_VISUEL.alt,
                width: CATALOGUE_VISUEL.width,
                height: CATALOGUE_VISUEL.height,
                title:
                  'title' in CATALOGUE_VISUEL && typeof CATALOGUE_VISUEL.title === 'string'
                    ? CATALOGUE_VISUEL.title
                    : undefined,
              }}
            />
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">En résumé</p>
                <span className="rounded-full bg-[#377CF3]/10 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#377CF3]">
                  {DEV_WEB_IA_BADGE_NOUVELLE}
                </span>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
                {DEV_WEB_IA_PRIX_LANCEMENT_LABEL}
              </p>
              <p className="mt-1.5 font-display text-2xl font-bold text-slate-900">
                {formatTarifHt(TARIF_INTER_DEV_WEB_IA_HT)} € HT
                <span className="ml-1 text-base font-semibold text-slate-600">/ participant · 7 h</span>
                <MentionTvaAsterisque />
              </p>
              <p className="mt-2 font-display text-xl font-bold text-slate-900">
                {formatTarifHt(TARIF_INTER_DEV_WEB_IA_14H_HT)} € HT
                <span className="ml-1 text-base font-semibold text-slate-600">/ participant · 14 h</span>
                <MentionTvaAsterisque />
              </p>
              <p className="mt-1 text-sm text-slate-600">Interentreprises · Intra sur devis</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{MENTIONS_TVA_INTRA_COURTE}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{FINANCEMENT_FORMULATION_COURTE}</p>
              <p className="mt-4 text-sm">
                <a href="#informations-pratiques" className={OFC_LINK}>
                  Informations réglementaires Qualiopi
                </a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
