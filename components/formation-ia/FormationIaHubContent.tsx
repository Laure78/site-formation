import Link from 'next/link';
import { FORMATION_IA_METIERS } from '@/lib/seo-formation-ia-hub-data';
import { FORMATION_IA_GEO_CANONICAL } from '@/lib/seo-formation-ia-hub-links';
import { LINKS } from '@/lib/internal-links';
import { RelatedLinks } from '@/components/RelatedLinks';

type Props = { hubPath: '/formation-ia' };

export function FormationIaHubContent({ hubPath }: Props) {
  const paris = FORMATION_IA_GEO_CANONICAL.find((v) => v.id === 'paris');
  const geoLinks = FORMATION_IA_GEO_CANONICAL.filter((v) => v.id !== 'idf');

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="prose prose-slate max-w-none">
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Formation IA BTP — hub métiers & Île-de-France
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            <Link href={LINKS.formationIleDeFrance} className="font-semibold text-[#377CF3] hover:underline">
              Vue régionale Île-de-France : programme, zones, financement
            </Link>
          </p>
          <p className="lead text-lg text-slate-700">
            Pages par <strong>métier</strong> (ateliers ciblés) et par <strong>zone IDF</strong> (référencement
            local). ChatGPT et Claude AI pour rédiger et structurer — avec les bonnes pratiques BTP et Qualiopi.
          </p>

          {paris && (
            <p>
              <strong>Priorité locale : </strong>
              <Link href={paris.href} className="font-semibold text-[#377CF3] hover:underline">
                Formation IA pour les pros du BTP à Paris — page renforcée
              </Link>
            </p>
          )}

          <h2 className="font-display text-xl font-semibold text-slate-900">Pages par métier / lot</h2>
          <ul className="columns-1 gap-x-8 sm:columns-2">
            {FORMATION_IA_METIERS.map((m) => (
              <li key={m.slug} className="break-inside-avoid">
                <Link href={`/formation-ia/${m.slug}`} className="text-[#377CF3] hover:underline">
                  Formation IA — {m.label}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="font-display text-xl font-semibold text-slate-900">Pages par zone (IDF)</h2>
          <ul className="columns-1 gap-x-8 sm:columns-2">
            {geoLinks.map((v) => (
              <li key={v.href} className="break-inside-avoid">
                <Link href={v.href} className="text-[#377CF3] hover:underline">
                  Formation IA appliquée au bâtiment {v.label} ({v.deptName})
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="font-display text-xl font-semibold text-slate-900">Aller plus loin</h2>
          <p>
            <Link href="/formation-ia/faq" className="text-[#377CF3] hover:underline">
              FAQ formation IA pour le BTP (longue traîne)
            </Link>
            {' · '}
            <Link href={LINKS.financement} className="text-[#377CF3] hover:underline">
              Financement Constructys / OPCO
            </Link>
            {' · '}
            <Link href={LINKS.contact} className="text-[#377CF3] hover:underline">
              Contact
            </Link>
            {' · '}
            <Link href={LINKS.formations} className="text-[#377CF3] hover:underline">
              Catalogue formations
            </Link>
          </p>
        </article>

        <RelatedLinks path={hubPath} className="mt-12 !px-0" tone="transparent" />
      </div>
    </div>
  );
}
