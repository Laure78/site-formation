import Link from 'next/link';
import { CtaRdv } from '@/components/CtaRdv';
import { BarometreDataTable } from '@/components/barometre/BarometreDataTable';
import { EnBref } from '@/app/components/EnBref';
import { FAQSection } from '@/components/landing/FAQSection';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumb } from '@/components/Breadcrumb';
import { getBarometre2026, BAROMETRE_IA_BTP_IDF_PATH } from '@/lib/barometre-2026';
import { BAROMETRE_IA_BTP_FAQ } from '@/lib/barometre-2026-faq';
import {
  BAROMETRE_PAGE_DESCRIPTION,
  BAROMETRE_PAGE_TITLE,
  getBarometrePageJsonLd,
} from '@/lib/schema-barometre-page';
import { LINKS } from '@/lib/internal-links';
import { createPageMetadata, getBreadcrumbSchema } from '@/lib/seo';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { OFC_EDITORIAL, OFC_LINK } from '@/lib/ofc-interaction-classes';

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: 'Baromètre IA BTP Île-de-France 2026',
  titleAbsolute: BAROMETRE_PAGE_TITLE,
  description: BAROMETRE_PAGE_DESCRIPTION,
  descriptionFinal: true,
  path: BAROMETRE_IA_BTP_IDF_PATH,
  keywords: [
    'baromètre IA BTP',
    'IA bâtiment Île-de-France',
    'adoption IA construction',
    'ChatGPT BTP',
    'formation IA BTP',
  ],
});

function formatEnBref(data: ReturnType<typeof getBarometre2026>): string {
  const [a, b, c] = data.keyFigures;
  return `${a.count} répondants sur ${a.n} (${a.valuePercent} %) utilisent déjà un outil d’IA générative ; ${b.count} (${b.valuePercent} %) visent les devis en priorité ; ${c.count} (${c.valuePercent} %) citent le manque de temps comme frein principal. Période ${data.meta.periodLabel}, entreprises BTP en Île-de-France.`;
}

export default function BarometreIaBtpIdfPage() {
  const data = getBarometre2026();
  const { meta, keyFigures } = data;
  const n = meta.n;

  const breadcrumb = getBreadcrumbSchema([
    { name: 'Accueil', path: '/' },
    { name: 'Formation IA BTP', path: LINKS.formationIaBtp },
    { name: 'Baromètre IA BTP IDF 2026', path: BAROMETRE_IA_BTP_IDF_PATH },
  ]);

  return (
    <div className={`${OFC_EDITORIAL} px-4 py-10 sm:px-6 md:py-12 lg:px-8`}>
      <div className={OFC_SECTION_INNER}>
        <JsonLd id="schema-barometre-ia-btp-idf" schema={getBarometrePageJsonLd()} />
        <JsonLd id="schema-barometre-breadcrumb" schema={breadcrumb} />

        <Breadcrumb
          omitJsonLd
          items={[
            { label: 'Accueil', href: LINKS.home },
            { label: 'Formation IA BTP', href: LINKS.formationIaBtp },
            { label: 'Baromètre 2026', href: BAROMETRE_IA_BTP_IDF_PATH },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
            Données OFC · Île-de-France
          </p>
          <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Baromètre IA BTP Île-de-France 2026
          </h1>
          <EnBref text={formatEnBref(data)} className="mt-5" />
          <p className="mt-4 text-sm text-slate-600">
            Dernière mise à jour :{' '}
            <time dateTime={meta.lastUpdated}>
              {new Date(meta.lastUpdated).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            {meta.dataNote ? ` — ${meta.dataNote}` : null}
          </p>
        </header>

        <section className="mt-10" aria-labelledby="barometre-chiffres-cles">
          <h2 id="barometre-chiffres-cles" className="font-display text-xl font-bold text-slate-900">
            Trois chiffres clés
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {keyFigures.map((k) => (
              <li
                key={k.id}
                className="rounded-[8px] border border-slate-200 bg-[#F2F2F2] px-4 py-4"
              >
                <p className="text-2xl font-bold tabular-nums text-[#377CF3]">
                  {k.valuePercent}&nbsp;%
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">{k.label}</p>
                <p className="mt-2 text-xs text-slate-600">
                  {k.count} / {k.n} répondants
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="barometre-methode">
          <h2 id="barometre-methode" className="font-display text-xl font-bold text-slate-900">
            Méthodologie
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
              <dt className="text-xs font-semibold uppercase text-slate-500">Effectif (n)</dt>
              <dd className="mt-1 font-medium text-slate-900">{n} répondants</dd>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
              <dt className="text-xs font-semibold uppercase text-slate-500">Période</dt>
              <dd className="mt-1 font-medium text-slate-900">{meta.periodLabel}</dd>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 sm:col-span-2">
              <dt className="text-xs font-semibold uppercase text-slate-500">Collecte</dt>
              <dd className="mt-1 text-slate-800">{meta.collectionMethod}</dd>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 sm:col-span-2">
              <dt className="text-xs font-semibold uppercase text-slate-500">Périmètre géographique</dt>
              <dd className="mt-1 text-slate-800">{meta.geography}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-12 space-y-10" aria-labelledby="barometre-resultats">
          <h2 id="barometre-resultats" className="font-display text-xl font-bold text-slate-900">
            Résultats détaillés
          </h2>

          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">Outils déjà utilisés</h3>
            <p className="mt-2 text-sm text-slate-600">Réponses multiples possibles — effectifs sur n={n}.</p>
            <div className="mt-4">
              <BarometreDataTable caption="Outils IA déjà utilisés" rows={data.toolsAlreadyUsed} n={n} />
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">Tâches visées</h3>
            <div className="mt-4">
              <BarometreDataTable caption="Tâches BTP visées avec l'IA" rows={data.targetTasks} n={n} />
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">Freins cités</h3>
            <div className="mt-4">
              <BarometreDataTable caption="Freins à l'adoption de l'IA" rows={data.barriers} n={n} />
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">Profil des entreprises</h3>
            <div className="mt-4">
              <BarometreDataTable caption="Taille d'entreprise" rows={data.companyProfile} n={n} />
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">Fonctions des répondants</h3>
            <div className="mt-4">
              <BarometreDataTable caption="Rôle du répondant" rows={data.roles} n={n} />
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[8px] border border-[#377CF3]/20 bg-[#377CF3]/5 px-5 py-6">
          <h2 className="font-display text-lg font-bold text-slate-900">
            Passer de la lecture à l’action
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Les formations OFC partent de vos documents réels (devis, DCE, CR) en présentiel en
            Île-de-France.{' '}
            <Link href={LINKS.formationIaBtp} className={OFC_LINK}>
              Voir la formation IA pour le BTP
            </Link>{' '}
            ou{' '}
            <Link href={LINKS.blog} className={OFC_LINK}>
              parcourir le blog IA × BTP
            </Link>
            .
          </p>
          <div className="mt-4">
            <CtaRdv origin="barometre-ia-btp-idf" />
          </div>
        </section>

        <div className="mt-12">
          <FAQSection items={[...BAROMETRE_IA_BTP_FAQ]} title="FAQ — baromètre IA BTP" />
        </div>
      </div>
    </div>
  );
}
