'use client';

import Link from 'next/link';
import { CtaRdv } from '@/components/CtaRdv';
import Image from 'next/image';
import { Check, Clock, Users } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { CALENDLY_DEFAULT_BUTTON_TEXT } from '@/lib/calendly-embed-config';
import { RevealShell, RevealGroupShell } from '@/components/motion/RevealShell';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { OFC_CARD, OFC_CTA_PRIMARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import {
  getFormationsCatalogue,
  getCatalogueFormationsCount,
  cataloguePedagogicalLevelBadge,
  catalogueNiveauEtLevel,
} from '@/lib/formations-catalogue-display';
import { CataloguePriceBadge, CatalogueTarifStrip } from '@/components/formations/CataloguePriceBadge';
import { FormationCatalogueTitle } from '@/components/formations/FormationCatalogueTitle';
import { MentionFinancement } from '@/components/MentionFinancement';

/**
 * Accueil : catalogue OFC (5 formations) — ancre #offre-formations.
 */
export function BeworkEtFormationsOffreSection() {
  const formations = getFormationsCatalogue();
  const catalogueCount = getCatalogueFormationsCount();

  return (
    <section
      id="offre-bework-formations"
      aria-labelledby="offre-formations-title"
      className={OFC_SEC.mutedMesh}
    >
      <div className="mx-auto max-w-7xl">
        <div id="offre-formations" className="scroll-mt-28">
          <RevealShell>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
              <span>Formations IA pour le BTP</span>
            </div>
            <h2
              id="offre-formations-title"
              className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl"
            >
              Mes formations IA pour le BTP et la construction
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              Formations IA — organisme certifié Qualiopi / OPCO — intra-entreprise, dans vos locaux, en présentiel en Île-de-France, pour les équipes du
              bâtiment et de la construction.{' '}
              <MentionFinancement variant="court" withLink={false} />.
            </p>
            <CatalogueTarifStrip className="mt-5" />
          </RevealShell>

          <RevealGroupShell className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3" staggerMs={50}>
            {formations.map((cours) => (
              <article
                key={cours.ref}
                className={`${OFC_CARD} flex flex-col overflow-hidden`}
              >
                <div className="relative w-full shrink-0 border-b border-[#E2E8F0] bg-[#F1F5F9] px-4 py-4">
                  <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden sm:max-w-[220px] md:max-w-[240px]">
                    <Image
                      src={cours.visuel.src}
                      alt={cours.visuel.alt}
                      title={
                        'title' in cours.visuel && typeof cours.visuel.title === 'string'
                          ? cours.visuel.title
                          : undefined
                      }
                      fill
                      loading="lazy"
                      className="object-contain object-center"
                      sizes="(max-width: 640px) 200px, 240px"
                    
                      quality={70}/>
                    <CataloguePriceBadge level={cours.level} duree={cours.duree} variant="overlay" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm text-slate-500">
                      {catalogueNiveauEtLevel(cours.ref, cours.level)}
                    </span>
                    <span className="rounded-full border border-[var(--accent)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                      {cataloguePedagogicalLevelBadge(cours.ref)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-slate-900">
                    <FormationCatalogueTitle
                      entry={cours}
                      versionClassName="mt-1 block text-xs font-normal leading-snug text-slate-500"
                    />
                  </h3>
                  <CataloguePriceBadge level={cours.level} duree={cours.duree} variant="banner" className="mt-4" />
                  <div className="mt-3 flex flex-wrap gap-4 rounded-lg bg-slate-50 px-4 py-3">
                    <span className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                      <Clock size={16} strokeWidth={1.5} aria-hidden />
                      {cours.duree}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-slate-600">
                      <Users size={16} strokeWidth={1.5} aria-hidden />
                      {cours.effectif}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{cours.pitch}</p>
                  <p className="mt-4 font-semibold text-slate-900">OBJECTIFS PÉDAGOGIQUES</p>
                  <ul className="mt-2 flex-1 space-y-2">
                    {cours.objectifs.map((obj) => (
                      <li key={obj} className="flex gap-2 text-sm text-slate-600">
                        <Check
                          size={18}
                          strokeWidth={1.5}
                          className="shrink-0 text-[var(--accent)]"
                          aria-hidden
                        />
                        {obj}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={cours.href}
                    className={`${OFC_CTA_PRIMARY} mt-6 block w-full py-3`}
                    title={`Voir la fiche : ${cours.title}`}
                  >
                    Voir la fiche formation
                  </Link>
                  <a
                    href={cours.programmePdfHref}
                    download
                    className="mt-3 block w-full rounded-xl border-2 border-slate-200 py-3 text-center text-sm font-semibold text-slate-800 hover:border-[var(--accent)]"
                  >
                    Télécharger le programme (PDF)
                  </a>
                </div>
              </article>
            ))}
          </RevealGroupShell>

          <RevealShell className="mt-10 text-center">
            <p className="text-base font-semibold text-slate-700">
              Catalogue complet : {catalogueCount} formations IA pour le BTP
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <CtaRdv
                origin="accueil-bework-formations"
                variant="primary"
                className={`${OFC_CTA_PRIMARY} inline-flex items-center justify-center px-5 py-3 text-center text-sm font-semibold`}
              />
              <Link href={LINKS.financement} className={`${OFC_LINK} inline-flex items-center text-sm font-semibold`}>
                Financement OPCO&nbsp;: modalités Constructys
              </Link>
            </div>
          </RevealShell>
        </div>
      </div>
    </section>
  );
}
