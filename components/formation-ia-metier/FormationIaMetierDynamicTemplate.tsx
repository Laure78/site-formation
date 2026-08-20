import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';
import { getCourseSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import type { FormationIaMetierDynamicConfig } from '@/lib/formation-ia-metier-dynamic-types';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { LiensConnexes } from '@/components/LiensConnexes';
import { PreuveSociale } from '@/components/PreuveSociale';

function SectionCtaVisio({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <Link
        href={LINKS.prendreRdv}
        className="inline-flex items-center justify-center rounded-xl bg-[#377CF3] px-8 py-4 text-center text-base font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        Réservez votre visio découverte gratuite
      </Link>
    </div>
  );
}

export function FormationIaMetierDynamicTemplate({
  config,
}: {
  config: FormationIaMetierDynamicConfig;
}) {
  const courseJson = getCourseSchema({
    name: config.courseName,
    description: config.courseDescription,
    path: config.path,
    providerName: SITE_CONFIG.legalName,
    instructorName: SITE_CONFIG.name,
    teaches: config.courseTeaches,
    educationalLevel: 'Professionnel',
    timeRequired: 'PT4H',
    areaServed: ['Île-de-France', 'France'],
  });

  const faqSchema = getFAQSchema(config.faq);

  return (
    <div className="bg-white text-slate-900">
      <JsonLd id={`schema-course-metier-dyn-${config.slug}`} schema={courseJson} />
      <JsonLd id={`schema-faq-metier-dyn-${config.slug}`} schema={faqSchema} />

      {/* Hero */}
      <section className="border-b border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <MetierIdfPresentielLine className="mb-4" />
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem]">
            Formation IA pour {config.h1MetierPluriel} — Gagnez du temps sur devis, admin et chantier
          </h1>
          <PreuveSociale className="mt-6" />
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Sessions en présentiel en Île-de-France — {config.heroIntro}{' '}
            <strong className="font-semibold text-slate-800">
              Plus de {formatProfessionalsTrainedCount()} professionnels formés
            </strong>{' '}
            · satisfaction moyenne{' '}
            <strong className="font-semibold text-slate-800">{SOCIAL_PROOF.AVERAGE_RATING}</strong>
            · organisme certifié Qualiopi ({SITE_CONFIG.legalName}).
          </p>
          <SectionCtaVisio className="mt-10" />
        </div>
      </section>

      {/* Problème */}
      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-14 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            {config.probleme.titreH2}
          </h2>
          <div className="mt-8 space-y-5 text-slate-700 leading-relaxed">
            {config.probleme.paragraphes.map((p, i) => (
              <p key={`probleme-${i}`}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="border-b border-slate-200 bg-white px-4 py-14 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            {config.solution.titreH2}
          </h2>
          <p className="mt-8 text-slate-700 leading-relaxed">{config.solution.intro}</p>
          <ul className="mt-8 space-y-6">
            {config.solution.casUsage.map((c) => (
              <li
                key={c.slice(0, 48)}
                className="rounded-xl border border-slate-200 bg-[#F2F2F2] p-5 text-slate-700 leading-relaxed"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA milieu */}
      <section className="border-b border-slate-200 bg-[#377CF3] px-4 py-12 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-lg font-medium text-blue-100">
            30 minutes pour cadrer votre besoin — formation IA pour les pros du BTP, financement, calendrier.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href={LINKS.prendreRdv}
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#377CF3] shadow-sm transition hover:bg-blue-50"
            >
              Réservez votre visio découverte gratuite
            </Link>
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-14 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            {config.methode.titreH2}
          </h2>
          {config.methode.intro ? (
            <p className="mt-8 text-slate-700 leading-relaxed">{config.methode.intro}</p>
          ) : null}
          <ol className="mt-10 space-y-10">
            {config.methode.etapes.map((etape, index) => (
              <li
                key={etape.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-[#377CF3]">
                  Étape {index + 1} sur {config.methode.etapes.length}
                </p>
                <h3 className="font-display mt-2 text-xl font-bold text-slate-900">{etape.title}</h3>
                <p className="mt-1 text-sm font-medium text-slate-600">Prompt type</p>
                <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-800">
                  {etape.prompt}
                </pre>
                <p className="mt-4 text-sm font-medium text-slate-700">
                  Résultat attendu : {etape.resultat}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Résultats */}
      <section className="border-b border-slate-200 bg-white px-4 py-14 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            {config.resultats.titreH2}
          </h2>
          <p className="mt-8 text-slate-700 leading-relaxed">{config.resultats.intro}</p>
          <div className="mt-10 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-[#F2F2F2] text-slate-900">
                <tr>
                  <th className="px-4 py-3 font-semibold">Critère</th>
                  <th className="px-4 py-3 font-semibold">Avant</th>
                  <th className="px-4 py-3 font-semibold">Après méthode OFC</th>
                </tr>
              </thead>
              <tbody>
                {config.resultats.tableau.map((row) => (
                  <tr key={row.critere} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium">{row.critere}</td>
                    <td className="px-4 py-3">{row.avant}</td>
                    <td className="px-4 py-3">{row.apres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-12 space-y-8">
            {config.resultats.temoignages.map((t) => (
              <blockquote
                key={t.citation.slice(0, 40)}
                className="rounded-2xl border-l-4 border-[#377CF3] bg-[#F2F2F2] p-6"
              >
                <p className="text-slate-800 leading-relaxed italic">{t.citation}</p>
                <footer className="mt-3 text-sm text-slate-600">{t.attribution}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-14 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            FAQ — Questions des {config.metierPlurielLower} sur l&apos;IA
          </h2>
          <div className="mt-10 space-y-6">
            {config.faq.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-3 text-slate-700 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="border-b border-slate-200 bg-white px-4 py-14 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            {config.bio.titreH2}
          </h2>
          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="mx-auto w-full max-w-sm shrink-0 lg:mx-0">
              <ProfilePhoto alt={config.bioPhotoAlt} priority={false} />
            </div>
            <div className="min-w-0 flex-1 space-y-5 text-slate-700 leading-relaxed">
              {config.bio.paragraphes.map((p, i) => (
                <p key={`bio-${i}`}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#377CF3] px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Prochaine étape : visio découverte gratuite
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Choisissez un créneau sur la page rendez-vous : nous détaillons le programme, les formats intra /
            inter et le montage Constructys selon votre structure.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={LINKS.prendreRdv}
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#377CF3] shadow-sm transition hover:bg-blue-50"
            >
              Prendre rendez-vous — visio découverte
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 pb-14">
        <LiensConnexes currentPath={config.path} />
      </div>
    </div>
  );
}
