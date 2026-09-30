import Link from 'next/link';
import { MentionTvaAsterisque } from '@/components/MentionTVA';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_DELAI_ACCES_EXACT } from '@/config/qualiopi';
import { QUALIOPI_REFERENT_HANDICAP } from '@/lib/qualiopi-info';
import { getCataloguePageFinancementLine } from '@/lib/formations-catalogue-page-config';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';
import { PERIMETRE_FORMATIONS_COURT } from '@/lib/tarifs-sessions';
import { SESSION_CONVOQUEE_MIN_PARTICIPANTS } from '@/lib/tarifs-catalogue-participant';
import {
  FEDERATION_PARCOURS_TROIS_NIVEAUX,
  libelleTarifFederationParParticipant,
} from '@/lib/parcours-federation-trois-niveaux';
import { OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';

/** Tarifs et modalités — une seule section centralisée. */
export function FormationsCataloguePracticalInfoSection() {
  return (
    <section className="mt-16 scroll-mt-24" aria-labelledby="catalogue-infos-pratiques">
      <h2 id="catalogue-infos-pratiques" className="font-display text-2xl font-bold text-ofc-ink md:text-3xl">
        Tarifs et modalités
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
        {PERIMETRE_FORMATIONS_COURT} — zone {IDF_ZONE_INTERVENTION}. Tarifs HT par participant
        (sessions convoquées, intra ou inter). Minimum {SESSION_CONVOQUEE_MIN_PARTICIPANTS}{' '}
        participants pour une session convoquée par un réseau. Sur mesure sur devis.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">
            Grille tarifaire HT par participant — parcours en 3 niveaux
          </caption>
          <thead>
            <tr className="bg-ofc-accent text-white">
              <th scope="col" className="px-4 py-3 font-semibold">
                Parcours
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Format
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Tarif HT / participant
              </th>
            </tr>
          </thead>
          <tbody>
            {FEDERATION_PARCOURS_TROIS_NIVEAUX.map((niveau, i) => (
              <tr key={niveau.niveau} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <th scope="row" className="px-4 py-3 font-medium text-ofc-ink">
                  Niveau {niveau.niveau}
                </th>
                <td className="px-4 py-3 text-slate-700">{niveau.formatLabel}</td>
                <td className="px-4 py-3 text-slate-700">
                  {libelleTarifFederationParParticipant(
                    niveau.tarifHtParParticipant,
                    niveau.tarifSuffix,
                  )}
                  <MentionTvaAsterisque />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-slate-600">
        Détail pour les fédérations et réseaux :{' '}
        <Link href={LINKS.partenaires} className={OFC_LINK}>
          parcours en 3 niveaux sur la page Partenaires
        </Link>
        . Les autres fiches du catalogue affichent le tarif par participant sur chaque programme.
      </p>

      <dl className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Délai d&apos;accès</dt>
          <dd className="mt-2 text-sm text-slate-700">{QUALIOPI_DELAI_ACCES_EXACT}</dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Financement</dt>
          <dd className="mt-2 text-sm text-slate-700">{getCataloguePageFinancementLine()}</dd>
          <Link href={LINKS.financement} className={`mt-3 inline-flex ${OFC_CTA_SECONDARY} px-4 py-2 text-xs`}>
            Voir les possibilités de financement
          </Link>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5 sm:col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Accessibilité handicap
          </dt>
          <dd className="mt-2 text-sm text-slate-700">
            Chaque besoin d&apos;aménagement est étudié au cas par cas. Contactez la référente handicap :{' '}
            <a href={`mailto:${QUALIOPI_REFERENT_HANDICAP.email}`} className={OFC_LINK}>
              {QUALIOPI_REFERENT_HANDICAP.email}
            </a>
            .{' '}
            <Link href={LINKS.accessibiliteHandicap} className={OFC_LINK}>
              Parcours d&apos;aménagement et contact
            </Link>
          </dd>
        </div>
      </dl>
    </section>
  );
}
