import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { EnBref } from '@/app/components/EnBref';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { PreuveSociale } from '@/components/PreuveSociale';
import { LiensConnexes } from '@/components/LiensConnexes';
import { getLiensConnexesHrefs } from '@/lib/liens-connexes';
import { VoirAussi, type VoirAussiLink } from '@/components/VoirAussi';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { FormationMetierJsonLd } from '@/components/seo/FormationMetierJsonLd';
import { CALENDLY_DEFAULT_BUTTON_TEXT } from '@/lib/calendly-embed-config';
import { QUALIOPI_FINANCEMENT_FORMULATION } from '@/config/qualiopi';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { breadcrumbItemsFromPaths } from '@/lib/seo';
import { TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';

export type PageMetierBtpCasUsage =
  | string
  | { titre: string; description?: string };

export type PageMetierBtpEtape = {
  titre: string;
  prompt: string;
};

export type PageMetierBtpGain = {
  tache: string;
  sansIa: string;
  avecIa: string;
};

export type PageMetierBtpFaqItem = {
  q: string;
  r: string;
};

export type PageMetierBTPProps = {
  metier: string;
  /** DTU, NF ou référentiel métier (ex. « NF C 15-100 », « DTU 20.1 »). */
  norme: string;
  problemes: readonly string[];
  casUsage: readonly PageMetierBtpCasUsage[];
  etapesMethode: readonly PageMetierBtpEtape[];
  gains: readonly PageMetierBtpGain[];
  /** Au moins 3 questions pour émettre le nœud Schema.org FAQPage. */
  faq: readonly PageMetierBtpFaqItem[];
  /** Chemin canonique, ex. `/formation-ia-electricien-btp`. */
  path: string;
  h1?: string;
  /** Liens internes uniques (hors NIV-01, /a-propos, financement déjà dans le gabarit). */
  maillage?: readonly VoirAussiLink[];
};

const GARDE_FOU =
  "L’IA structure brouillons et tableaux ; elle ne remplace ni le métré ni la conformité normative.";

function slugFromPath(path: string): string {
  return path.replace(/^\/+|\/+$/g, '').replace(/\//g, '-') || 'metier-btp';
}

function casUsageTitre(item: PageMetierBtpCasUsage, index: number): string {
  return typeof item === 'string' ? item : item.titre || `Cas ${index + 1}`;
}

function casUsageDescription(item: PageMetierBtpCasUsage): string | undefined {
  return typeof item === 'string' ? undefined : item.description;
}

/**
 * Gabarit landing métier BTP — ordre fixe :
 * En bref → Le problème → La solution IA → Méthode (prompts ChatGPT) →
 * Résultats → FAQ → Qui est Laure Olivié → CTA visio Calendly.
 *
 * @example
 * ```tsx
 * <PageMetierBTP
 *   metier="électricien"
 *   norme="NF C 15-100"
 *   path="/formation-ia-electricien-btp"
 *   problemes={['Tableautage et CCTP le soir…']}
 *   casUsage={['Structurer un devis de tableau', 'Plan de rapport type CONSUEL']}
 *   etapesMethode={[{ titre: 'Devis tableau', prompt: 'Tu es électricien…' }]}
 *   gains={[{ tache: 'Compte rendu de visite', sansIa: '45 min', avecIa: '5–10 min' }]}
 *   faq={[{ q: 'L’IA applique-t-elle la NF C 15-100 ?', r: 'Non : elle structure…' }]}
 * />
 * ```
 */
export function PageMetierBTP({
  metier,
  norme,
  problemes,
  casUsage,
  etapesMethode,
  gains,
  faq,
  path,
  h1,
  maillage,
}: PageMetierBTPProps) {
  const titre = h1 ?? `Formation IA ${metier} BTP — ChatGPT`;
  const slug = slugFromPath(path);
  const faqItems = faq.map((item) => ({ question: item.q, answer: item.r }));
  const breadcrumbItems = breadcrumbItemsFromPaths([
    { name: 'Accueil', path: '/' },
    { name: 'Formations IA pour le BTP', path: LINKS.formations },
    { name: titre, path },
  ]);

  return (
    <div className="bg-white text-slate-900">
      <FormationMetierJsonLd
        metierLabel={metier}
        path={path}
        courseName={`Formation IA ${metier} BTP`}
        courseDescription={`Formation IA et ChatGPT pour ${metier} du BTP : brouillons, tableaux, documents de chantier. Présentiel Île-de-France — organisme certifié Qualiopi. Référentiel : ${norme}.`}
        duration="PT4H"
        price={TARIF_FORFAIT_DEBUTANT_HT}
        level="Professionnel"
        teaches={[`ChatGPT pour ${metier} BTP`, norme, 'Brouillons et tableaux (relecture humaine)']}
        faqItems={faqItems}
        scriptId={`schema-page-metier-${slug}`}
        catalogueProgrammeRef="NIV-01"
      />
      <BreadcrumbJsonLd id={`schema-breadcrumb-page-metier-${slug}`} items={breadcrumbItems} />

      <article className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <MetierIdfPresentielLine className="mb-3" />
        <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
          {norme} · organisme certifié Qualiopi · Île-de-France
        </p>
        <h1 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem]">
          {titre}
        </h1>
        <PreuveSociale className="mt-6" />

        <EnBref className="mt-8">
          <p>
            Formation IA pour {metier} du BTP, en présentiel en Île-de-France uniquement.
            Référentiel {norme}. {QUALIOPI_FINANCEMENT_FORMULATION}
          </p>
          <p>
            {GARDE_FOU} Programme catalogue :{' '}
            <Link href={LINKS.formationIaBtpNiveau1BatimentTp} className={OFC_LINK}>
              L&apos;IA au service des pros du bâtiment et des travaux publics
            </Link>
            .
          </p>
        </EnBref>

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Le problème — vocabulaire terrain ({metier})
          </h2>
          <ul className="mt-6 space-y-3">
            {problemes.map((item, index) => (
              <li key={`probleme-${index}`} className="flex gap-3 text-slate-700 leading-relaxed">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#377CF3]"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="la-solution-ia" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            La solution IA
          </h2>
          <p className="mt-6 text-slate-700 leading-relaxed">
            Ateliers en présentiel en Île-de-France, sur vos documents réels (anonymisés si
            besoin). ChatGPT sert à classer, titrer et reformuler. {GARDE_FOU} Référentiel{' '}
            {norme}. Relecture humaine avant tout envoi client ou marché.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {casUsage.map((item, index) => {
              const description = casUsageDescription(item);
              return (
                <li
                  key={`cas-${index}`}
                  className="rounded-xl border border-slate-200 bg-[#F2F2F2] p-5"
                >
                  <p className="font-display font-semibold text-slate-900">
                    {casUsageTitre(item, index)}
                  </p>
                  {description ? (
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Méthode pas à pas avec prompts ChatGPT
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            À adapter à vos tarifs internes et à vos modèles. Toujours croiser la sortie avec{' '}
            {norme} et vos notices.
          </p>
          <div className="mt-8 space-y-10">
            {etapesMethode.map((etape, index) => (
              <div key={etape.titre} className="rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 md:p-6">
                <h3 className="font-display text-lg font-semibold text-slate-900">
                  {index + 1}. {etape.titre}
                </h3>
                <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-800 shadow-sm">
                  {etape.prompt}
                </pre>
              </div>
            ))}
          </div>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Résultats concrets
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Temps indicatif avant / après usage de l’IA — {metier} BTP
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-[#F2F2F2]">
                  <th className="p-3 font-semibold text-slate-900">Tâche</th>
                  <th className="p-3 font-semibold text-slate-900">Sans IA</th>
                  <th className="p-3 font-semibold text-slate-900">Avec IA</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {gains.map((row) => (
                  <tr key={row.tache} className="border-b border-slate-100">
                    <td className="p-3">{row.tache}</td>
                    <td className="p-3">{row.sansIa}</td>
                    <td className="p-3">{row.avecIa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DisclaimerGains className="mt-4" />
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">FAQ</h2>
          <div className="mt-8 space-y-5">
            {faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900">{item.q}</h3>
                <div className="mt-2 text-slate-600 leading-relaxed">
                  <FAQAnswer content={item.r} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <LiensConnexes currentPath={path} />

        {maillage && maillage.length > 0 ? (
          <VoirAussi
            hubHref={maillage[0].href}
            hubLabel={maillage[0].label}
            links={maillage.slice(1)}
            currentPath={path}
            excludeHrefs={[
              LINKS.formationIaBtpNiveau1BatimentTp,
              LINKS.aPropos,
              LINKS.financement,
              ...getLiensConnexesHrefs(path),
            ]}
          />
        ) : null}

        <RenvoiFicheCatalogue programmeRef="NIV-01" contexte={`pour les ${metier}s`} />

        <LaureOlivieFormationPortrait
          id="qui-est-laure-olivie"
          contextLine="Sessions en présentiel en Île-de-France uniquement."
        />

        <section
          id="rdv"
          className="scroll-mt-24 mt-14 rounded-2xl bg-[#377CF3] px-6 py-10 text-white shadow-sm md:px-10"
        >
          <h2 className="font-display text-xl font-bold md:text-2xl">
            {CALENDLY_DEFAULT_BUTTON_TEXT}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-blue-100 md:text-base">
            30 minutes pour cadrer une session {metier} en présentiel en Île-de-France — sur un
            cas type (devis, CR, mémoire).{' '}
            <Link href={LINKS.financement} className="font-semibold underline hover:no-underline">
              Financement Constructys — formation IA BTP
            </Link>
            , selon éligibilité.
          </p>
          <div className="mt-6">
            <CalendlyEmbed
              type="link"
              variant="on-accent"
              ctaPosition="footer"
              campaign={`page-metier-${slug}-visio`}
              className="gap-2 font-bold shadow-sm"
            >
              {CALENDLY_DEFAULT_BUTTON_TEXT}
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
            </CalendlyEmbed>
          </div>
        </section>
      </article>
    </div>
  );
}
