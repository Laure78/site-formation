import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { CopyPromptButton } from '@/components/CopyPromptButton';
import { JsonLd } from '@/components/JsonLd';
import { MaillageRessourceFromConfig } from '@/app/components/MaillageRessource';
import { getMaillageRessourceConfig } from '@/lib/maillage-ressources';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { buildTutoSkillPicJsonLd } from '@/lib/schema-tuto-skill-pic-jsonld';
import {
  TUTO_SKILL_PIC_CHECKLIST,
  TUTO_SKILL_PIC_EXEMPLE,
  TUTO_SKILL_PIC_FAQ,
  TUTO_SKILL_PIC_INTERNAL,
  TUTO_SKILL_PIC_META,
  TUTO_SKILL_PIC_PATH,
  TUTO_SKILL_PIC_PROMPTS,
  TUTO_SKILL_PIC_STEPS,
} from '@/lib/tuto-skill-pic-content';

const PATH = TUTO_SKILL_PIC_PATH;

export const metadata: Metadata = createPageMetadata({
  title: TUTO_SKILL_PIC_META.title,
  description: TUTO_SKILL_PIC_META.description,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'article',
  openGraphTitle: TUTO_SKILL_PIC_META.ogTitle,
  openGraphDescription: TUTO_SKILL_PIC_META.ogDescription,
  appendAuthorSuffix: false,
  article: {
    publishedTime: '2026-09-08',
    modifiedTime: '2026-09-08',
    author: SITE_CONFIG.name,
    section: 'Ressources IA BTP',
  },
});

const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-5 py-3 text-[0.95rem] font-semibold text-white shadow-sm transition-colors hover:bg-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';
const btnSecondary =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-[#377CF3] bg-white px-5 py-3 text-[0.95rem] font-semibold text-[#377CF3] transition-colors hover:bg-[#D4E3FC]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

export default function TutoSkillPicPage() {
  const graph = buildTutoSkillPicJsonLd();
  const maillage = getMaillageRessourceConfig(PATH);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd id="schema-tuto-skill-pic" data={graph} />

      {/* Introduction — fil d’Ariane via GlobalBreadcrumbs (layout) */}
      <header className="border-b border-slate-200 bg-[#F2F2F2]">
        <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#377CF3]">
            {TUTO_SKILL_PIC_META.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            {TUTO_SKILL_PIC_META.h1}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
            {TUTO_SKILL_PIC_META.intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#etape-1" className={btnPrimary}>
              Commencer le tutoriel
              <ArrowRight size={18} aria-hidden />
            </a>
            <Link href={TUTO_SKILL_PIC_INTERNAL.formation} className={btnSecondary}>
              {TUTO_SKILL_PIC_INTERNAL.formationLabel}
            </Link>
          </div>
          <p
            role="note"
            className="mt-6 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700"
          >
            {TUTO_SKILL_PIC_META.disclaimer}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        {/* Comprendre le principe */}
        <section aria-labelledby="principe-heading" className="scroll-mt-28">
          <h2
            id="principe-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
          >
            Comprendre le principe
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
            <p>
              Le plan d’installation de chantier (PIC) organise l’espace et la logistique du
              chantier : accès, stockage, base vie, circulation, zones de travail. C’est un
              document de préparation et de coordination, pas un texte généré « clé en main ».
            </p>
            <p>
              Un <strong className="font-semibold text-slate-900">skill</strong> Claude, c’est un
              ensemble d’instructions (et éventuellement de ressources) réutilisables. Une fois
              enregistré, Claude peut appliquer la même méthode sur chaque nouveau dossier, au
              lieu de tout reformuler à chaque conversation.
            </p>
            <p>
              Une demande ponctuelle (« aide-moi pour ce chantier ») donne une réponse isolée. Une
              méthode enregistrée fixe le rôle, le format de sortie et les règles de prudence — ce
              qui rend le travail comparable d’un chantier à l’autre.
            </p>
            <p>
              L’assistant ne voit pas le terrain : gabarits réels, état des voiries, consignes SPS
              du jour, décisions du conducteur. Il peut structurer l’information et signaler des
              manques ; il ne remplace pas la visite, le dessin technique ni la validation
              professionnelle. Un document texte n’est pas un plan exploitable à l’échelle.
            </p>
          </div>
        </section>

        {/* Préparer ses informations */}
        <section aria-labelledby="preparer-heading" className="mt-16 scroll-mt-28">
          <h2
            id="preparer-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
          >
            Préparer ses informations
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Avant de créer ou d’utiliser le skill, rassemblez une base claire. Distinguez les{' '}
            <strong className="font-semibold text-slate-900">modèles réutilisables</strong>{' '}
            (structure, rubriques, présentation) des{' '}
            <strong className="font-semibold text-slate-900">données propres à chaque chantier</strong>.
            Un ancien exemple ne constitue pas une règle pour le nouveau projet. Retirez les
            données confidentielles inutiles avant de joindre des fichiers.
          </p>
          <ul className="mt-6 space-y-3">
            {TUTO_SKILL_PIC_CHECKLIST.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm leading-relaxed text-slate-800 md:text-base"
              >
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#377CF3] text-[#377CF3]"
                  aria-hidden
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tutoriel pas à pas */}
        <section aria-labelledby="tutoriel-heading" className="mt-16 scroll-mt-28">
          <h2
            id="tutoriel-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
          >
            Tutoriel pas à pas
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Cinq étapes pour passer d’une intention à un skill testé. Pour l’installation dans
            Claude, suivez la{' '}
            <a
              href="https://support.claude.com/en/articles/12512198-how-to-create-custom-skills"
              className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              documentation officielle Anthropic
            </a>{' '}
            (structure SKILL.md, ZIP, activation dans Compétences / Skills). Les menus et
            prérequis évoluent : vérifiez l’interface de votre compte au moment de l’usage.
          </p>

          <ol className="mt-10 space-y-10">
            {TUTO_SKILL_PIC_STEPS.map((step) => (
              <li
                key={step.number}
                id={`etape-${step.number}`}
                className="scroll-mt-28 list-none"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#377CF3] font-display text-xl font-bold text-white">
                    {step.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl font-bold text-slate-900">{step.title}</h3>
                    <dl className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
                      <div>
                        <dt className="font-semibold text-[#377CF3]">Objectif</dt>
                        <dd className="mt-1">{step.objectif}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-[#377CF3]">Action</dt>
                        <dd className="mt-1">{step.action}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-[#377CF3]">Point de contrôle</dt>
                        <dd className="mt-1">{step.controle}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Trois prompts */}
        <section aria-labelledby="prompts-heading" className="mt-16 scroll-mt-28">
          <h2
            id="prompts-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
          >
            Trois prompts à copier
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Remplacez les champs entre crochets. Chaque prompt demande de séparer faits,
            hypothèses et manques, de citer les sources, et de faire vérifier les propositions
            techniques par un humain.
          </p>
          <div className="mt-8 space-y-6">
            {TUTO_SKILL_PIC_PROMPTS.map((prompt) => (
              <div
                key={prompt.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC] shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
                      {prompt.label}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-900">{prompt.title}</p>
                  </div>
                  <CopyPromptButton text={prompt.text} label="Copier le prompt" />
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap px-4 py-5 font-mono text-[0.8rem] leading-relaxed text-slate-800 md:px-5 md:text-[0.85rem]">
                  {prompt.text}
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* Exemple pédagogique */}
        <section aria-labelledby="exemple-heading" className="mt-16 scroll-mt-28">
          <h2
            id="exemple-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
          >
            Exemple pédagogique
          </h2>
          <p className="mt-4 text-base font-medium text-slate-900">{TUTO_SKILL_PIC_EXEMPLE.titre}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {TUTO_SKILL_PIC_EXEMPLE.avertissement}
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Tableau pédagogique : informations disponibles, manquantes et actions à prévoir
              </caption>
              <thead>
                <tr className="bg-[#377CF3] text-white">
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Information disponible
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Information manquante
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Action à prévoir
                  </th>
                </tr>
              </thead>
              <tbody>
                {TUTO_SKILL_PIC_EXEMPLE.rows.map((row) => (
                  <tr key={row.dispo} className="border-t border-slate-200 odd:bg-white even:bg-[#F8FAFC]">
                    <td className="px-4 py-3 align-top text-slate-800">{row.dispo}</td>
                    <td className="px-4 py-3 align-top text-slate-800">{row.manquant}</td>
                    <td className="px-4 py-3 align-top text-slate-800">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="mt-16 scroll-mt-28">
          <h2
            id="faq-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
          >
            Questions fréquentes
          </h2>
          <dl className="mt-8 space-y-6">
            {TUTO_SKILL_PIC_FAQ.map((item) => (
              <div key={item.q} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5">
                <dt className="font-display text-lg font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      {/* CTA final */}
      <section
        aria-labelledby="cta-final-heading"
        className="border-t border-slate-200 bg-[#F2F2F2]"
      >
        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <h2
            id="cta-final-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
          >
            Apprenez à utiliser l’IA sur vos documents chantier
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
            Je forme vos équipes à des usages concrets de l’IA : préparation documentaire, comptes
            rendus, analyse de pièces et assistants réutilisables.
          </p>
          <p className="mt-3 text-sm font-medium text-slate-800 md:text-base">
            En présentiel en Île-de-France. En groupe, en intra ou en interentreprises.
          </p>
          <Link href={TUTO_SKILL_PIC_INTERNAL.rdv} className={`${btnPrimary} mt-8`}>
            {TUTO_SKILL_PIC_INTERNAL.rdvLabel}
            <ArrowRight size={18} aria-hidden />
          </Link>
          <p className="mt-8 text-sm text-slate-600">
            Laure Olivié — Formatrice IA pour le BTP
          </p>
        </div>
      </section>

      {maillage ? (
        <MaillageRessourceFromConfig
          config={maillage}
          currentPath={PATH}
          excludeHrefs={[TUTO_SKILL_PIC_INTERNAL.formation, TUTO_SKILL_PIC_INTERNAL.rdv]}
          layout="narrow"
        />
      ) : null}
    </div>
  );
}
