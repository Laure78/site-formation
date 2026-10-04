import Link from 'next/link';
import { RdvLink } from '@/components/RdvLink';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { createPageMetadata } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import {
  ETUDES_DE_CAS_HUB_CARDS,
  ETUDES_DE_CAS_HUB_INTRO,
} from '@/lib/etudes-de-cas-hub';

const PAGE_META_DESCRIPTION =
  'Études de cas formation IA pour le BTP : FFB et CSFE, compte rendu vocal de chantier. Méthodes et résultats observés. Présentiel Île-de-France, Qualiopi.';

export const metadata = createPageMetadata({
  title: 'Études de cas formation IA BTP',
  description: PAGE_META_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.etudesCasHub,
  keywords: [
    'étude de cas formation IA BTP',
    'retour expérience formation BTP',
    'FFB formation IA',
    'compte rendu chantier IA',
  ],
});

export default function EtudesDeCasHubPage() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-gradient-to-b from-[#f8fbff] via-white to-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Études de cas — formation IA pour le BTP
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-700 md:text-lg">
            {ETUDES_DE_CAS_HUB_INTRO}
          </p>
          <div className="mt-8">
            <RdvLink className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-600" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {ETUDES_DE_CAS_HUB_CARDS.map((etude) => (
            <article
              key={etude.href}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="font-display text-xl font-bold text-slate-900">{etude.title}</h2>
              <dl className="mt-4 flex-1 space-y-3 text-sm leading-relaxed text-slate-700">
                <div>
                  <dt className="font-semibold text-slate-900">Contexte</dt>
                  <dd className="mt-1">{etude.contexte}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Problème</dt>
                  <dd className="mt-1">{etude.probleme}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Résultat chiffré</dt>
                  <dd className="mt-1">{etude.resultatChiffre}</dd>
                </div>
              </dl>
              <DisclaimerGains className="mt-4" />
              <p className="mt-5">
                <Link
                  href={etude.href}
                  className="text-sm font-semibold text-[#377CF3] underline hover:no-underline"
                >
                  {etude.linkLabel}
                </Link>
              </p>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-slate-500">
          <Link href={LINKS.formations} className="font-medium text-[#377CF3] hover:underline">
            Catalogue des formations IA pour le BTP
          </Link>
        </p>
      </div>
    </div>
  );
}
