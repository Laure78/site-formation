import Link from 'next/link';
import { FORMATION_IA_METIERS, FORMATION_IA_VILLES } from '@/lib/seo-formation-ia-hub-data';
import { LINKS } from '@/lib/internal-links';

type Props = { hubPath: '/formation-ia' };

export function FormationIaHubContent({ hubPath }: Props) {
  const paris = FORMATION_IA_VILLES.find((v) => v.slug === 'btp-paris');

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="prose prose-slate max-w-none">
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Formation IA BTP — hub métiers & Île-de-France
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            <Link href={LINKS.formationIaBtp} className="font-semibold text-[#377CF3] hover:underline">
              Page pilier : programme, financement, FAQ
            </Link>
          </p>
          <p className="lead text-lg text-slate-700">
            Pages par <strong>métier</strong> (ateliers ciblés) et par <strong>ville IDF</strong> (référencement
            local). ChatGPT et Claude AI pour rédiger et structurer — avec les bonnes pratiques BTP et Qualiopi.
          </p>

          {paris && (
            <p>
              <strong>Priorité locale : </strong>
              <Link href={`/formation-ia/${paris.slug}`} className="font-semibold text-[#377CF3] hover:underline">
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

          <h2 className="font-display text-xl font-semibold text-slate-900">Pages par ville (IDF)</h2>
          <ul className="columns-1 gap-x-8 sm:columns-2">
            {FORMATION_IA_VILLES.map((v) => (
              <li key={v.slug} className="break-inside-avoid">
                <Link href={`/formation-ia/${v.slug}`} className="text-[#377CF3] hover:underline">
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
            <Link href="/financement-constructys-formation-ia-btp" className="text-[#377CF3] hover:underline">
              Financement Constructys / OPCO
            </Link>
            {' · '}
            <Link href="/contact" className="text-[#377CF3] hover:underline">
              Contact
            </Link>
            {' · '}
            <Link href="/formations" className="text-[#377CF3] hover:underline">
              Catalogue formations
            </Link>
          </p>
        </article>
      </div>
    </div>
  );
}
