import Link from 'next/link';
import { Accessibility } from 'lucide-react';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_DELAI_ACCES_EXACT } from '@/config/qualiopi';
import { QUALIOPI_REFERENT_HANDICAP } from '@/lib/qualiopi-info';
import { FINANCEMENT_FORMULATION_COURTE } from '@/lib/financement-copy';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';
import {
  libelleTarifsCarteCatalogue,
  PERIMETRE_FORMATIONS_COURT,
  SESSION_DUREE_LIBELLE,
} from '@/lib/tarifs-sessions';
import { OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

/** Informations pratiques centralisées — une seule section. */
export function FormationsCataloguePracticalInfoSection() {
  const tarifs4h = libelleTarifsCarteCatalogue(4);

  return (
    <section className="mt-16 scroll-mt-24" aria-labelledby="catalogue-infos-pratiques">
      <h2 id="catalogue-infos-pratiques" className="font-display text-2xl font-bold text-ofc-ink md:text-3xl">
        Informations pratiques
      </h2>
      <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Format</dt>
          <dd className="mt-2 text-sm text-slate-700">
            {PERIMETRE_FORMATIONS_COURT} — sessions de {SESSION_DUREE_LIBELLE}.
          </dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Zone</dt>
          <dd className="mt-2 text-sm text-slate-700">{IDF_ZONE_INTERVENTION}</dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tarifs catalogue 4 h</dt>
          <dd className="mt-2 text-sm text-slate-700">
            Intra : {tarifs4h.intra}
            <MentionTvaAsterisque />
            {tarifs4h.inter ? (
              <>
                {' '}
                · Inter : {tarifs4h.inter}
                <MentionTvaAsterisque />
              </>
            ) : null}
          </dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:col-span-2 lg:col-span-3">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Délai d&apos;accès</dt>
          <dd className="mt-2 text-sm text-slate-700">{QUALIOPI_DELAI_ACCES_EXACT}</dd>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5 sm:col-span-2">
          <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <Accessibility className="h-4 w-4 text-ofc-accent" aria-hidden />
            Accessibilité handicap
          </dt>
          <dd className="mt-2 text-sm text-slate-700">
            Formations accessibles aux personnes en situation de handicap. Besoin d&apos;un aménagement
            ? Contactez la référente handicap :{' '}
            <a href={`mailto:${QUALIOPI_REFERENT_HANDICAP.email}`} className={OFC_LINK}>
              {QUALIOPI_REFERENT_HANDICAP.email}
            </a>
            .{' '}
            <Link href={LINKS.accessibiliteHandicap} className={OFC_LINK}>
              Informations détaillées
            </Link>
          </dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Financement</dt>
          <dd className="mt-2 text-sm text-slate-700">{FINANCEMENT_FORMULATION_COURTE}</dd>
          <Link href={LINKS.financement} className={`mt-3 inline-flex ${OFC_CTA_SECONDARY} px-4 py-2 text-xs`}>
            Voir les possibilités de financement
          </Link>
        </div>
      </dl>
    </section>
  );
}
