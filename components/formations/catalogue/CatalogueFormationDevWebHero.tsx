import Link from 'next/link';
import { Check, Clock, MapPin, Users, Wrench } from 'lucide-react';
import { DevWebIaPrixLancementCard } from '@/components/formations/DevWebIaPrixLancementCard';
import { FormationHeroOutilsNote } from '@/components/formations/FormationHeroOutilsNote';
import { OfcYouTubeEmbed } from '@/components/ui/OfcYouTubeEmbed';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getFormationByCode, libelleEffectifFormation } from '@/data/formations';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_EYEBROW, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { VIDEOS } from '@/lib/videos';
import {
  DEV_WEB_IA_BADGE_NOUVELLE,
  DEV_WEB_IA_CTA_PRIMARY_LABEL,
  DEV_WEB_IA_CTA_SECONDARY_LABEL,
  DEV_WEB_IA_DUREE_COURTE,
  DEV_WEB_IA_HERO_REASSURANCES,
  DEV_WEB_IA_INTRO,
  DEV_WEB_IA_SUBTITLE,
  devWebIaProgrammeHref,
  devWebIaProjectFormHref,
} from '@/lib/formation-developpement-web-ia-content';
import { LINKS } from '@/lib/internal-links';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-10');
const FORMATION = getFormationByCode('NIV-10')!;
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-10');
const HERO_VIDEO = VIDEOS.formationDevWebIaSansCoder2026;
const EFFECTIF_LIBELLE = libelleEffectifFormation(FORMATION);

/** Hero NIV-10 — créer son ERP BTP sur mesure et évolutif avec l’IA. */
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
              <p className={OFC_EYEBROW}>Niveau 3 — Création · ERP BTP avec l’IA</p>
              <span className="rounded-full bg-[#377CF3] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">
                {DEV_WEB_IA_BADGE_NOUVELLE}
              </span>
            </div>
            <h1
              id="dev-web-ia-h1"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
            >
              {CATALOGUE_SEO.h1}
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-700">{DEV_WEB_IA_SUBTITLE}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">{DEV_WEB_IA_INTRO}</p>

            <ul className="mt-5 space-y-2.5">
              {DEV_WEB_IA_HERO_REASSURANCES.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm font-medium text-slate-800 md:text-base">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={devWebIaProjectFormHref()}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-5 py-3`}
              >
                {DEV_WEB_IA_CTA_PRIMARY_LABEL}
              </Link>
              <Link
                href={devWebIaProgrammeHref()}
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-5 py-3`}
              >
                {DEV_WEB_IA_CTA_SECONDARY_LABEL}
              </Link>
            </div>

            <DevWebIaPrixLancementCard className="mt-6" formationTitle={FORMATION.titre} showCtas={false} />

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600">
              Pas un ERP complet prêt à l&apos;exploitation : une première version testable, une méthode de
              travail et une feuille de route pour faire évoluer l&apos;outil.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-800">
              <li className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#377CF3]" aria-hidden />
                {DEV_WEB_IA_DUREE_COURTE} · 9h00 – 17h00
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#377CF3]" aria-hidden />
                Présentiel Île-de-France uniquement
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
            <p className="text-sm">
              <a href="#informations-pratiques" className={OFC_LINK}>
                Informations réglementaires Qualiopi
              </a>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
