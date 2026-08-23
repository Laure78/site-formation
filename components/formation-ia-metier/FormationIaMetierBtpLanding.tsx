import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Citation } from '@/components/readability/Citation';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { FormationMetierJsonLd } from '@/components/seo/FormationMetierJsonLd';
import { LINKS } from '@/lib/internal-links';
import { ContextualLinksSection } from '@/components/layout/ContextualLinksSection';
import {
  getMetierLandingCoreLinks,
  getMetierRelatedLinks,
} from '@/lib/contextual-internal-links';
import { SITE_CONFIG } from '@/lib/seo';
import { SOCIAL_PROOF } from '@/lib/constants';
import { TARIF_FORFAIT_DEBUTANT_HT } from '@/lib/tarifs-sessions';
import type { FormationIaMetierBtpConfig } from '@/lib/formation-ia-metier-btp-types';
import { Essentiel } from '@/components/readability/Essentiel';
import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { RelatedLinks } from '@/components/RelatedLinks';
import { LiensConnexes } from '@/components/LiensConnexes';
import { getLiensConnexesHrefs } from '@/lib/liens-connexes';
import { getClusterRelatedHrefs } from '@/lib/maillage-clusters';
import { formatNoteSatisfactionSur5 , formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats'
import { PreuveSociale } from '@/components/PreuveSociale';

const OFC = "OFC Création d'Entreprise";

function sommaireForConfig(config: FormationIaMetierBtpConfig) {
  const base: { href: string; label: string }[] = [
    { href: '#probleme', label: 'Le problème : charge documentaire et normes' },
    { href: '#solution-ia', label: 'La solution IA : méthode et garde-fous' }, ...(config.casUsageConcrets && config.casUsageConcrets.length > 0
      ? [{ href: '#cas-usage', label: 'Cinq cas d’usage concrets' } as const]
      : []),
    { href: '#prompts', label: 'Prompts ChatGPT spécifiques métier' },
    { href: '#temoignage', label: 'Témoignage' },
    { href: '#faq', label: 'FAQ' },
    { href: '#liens-internes', label: 'Liens utiles' },
    { href: '#rdv-1', label: 'Calendly — rendez-vous découverte (1)' },
    { href: '#rdv-2', label: 'Calendly — visio & financement (2)' },
  ];
  if (config.showAuthorBio) {
    base.push(
      { href: '#rdv-3', label: 'Calendly — dernier rappel (3)' },
      { href: '#auteur', label: 'Laure Olivié — formatrice' },
    );
  }
  return base;
}

function CalendlyBlock({
  id,
  title,
  subtitle,
  metierId,
}: {
  id: string;
  title: string;
  subtitle: string;
  metierId: string;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-[#377CF3] px-6 py-10 text-white shadow-sm md:px-10"
    >
      <h2 className="font-display text-xl font-bold md:text-2xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-blue-100 md:text-base">{subtitle}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <CalendlyEmbed
          type="link"
          variant="on-accent"
          ctaPosition="middle"
          campaign={`formation-metier-${metierId}-${id}`}
          className="gap-2 font-bold shadow-sm"
        >
          Échanger sur vos besoins
          <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
        </CalendlyEmbed>
        <Link href={LINKS.financement} className="inline-flex items-center rounded-xl border-2 border-white/80 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/10">
          Voir les options de financement
        </Link>
      </div>
    </section>
  );
}

export function FormationIaMetierBtpLanding({ config }: { config: FormationIaMetierBtpConfig }) {
  const sommaire = sommaireForConfig(config);
  const relatedMetierLinks = getMetierRelatedLinks(config);
  const coreMetierLinks = getMetierLandingCoreLinks(config);

  const faqItems = config.faq.map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  return (
    <div className="bg-white text-slate-900">
      <FormationMetierJsonLd
        metierLabel={`${config.metierNomTitre} BTP`}
        path={config.path}
        courseName={config.courseName}
        courseDescription={config.courseDescription}
        duration="PT4H"
        price={TARIF_FORFAIT_DEBUTANT_HT}
        level="Professionnel"
        teaches={config.courseTeaches}
        faqItems={faqItems}
        scriptId={`schema-formation-metier-${config.id}`}
        catalogueProgrammeRef="NIV-01"
      />

      <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <article>
          <MetierIdfPresentielLine className="mb-3" />
          <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
            {config.normeRef.replace(/^le |^la /i, '').trim()} · organisme certifié Qualiopi · Île-de-France
          </p>
          <h1 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem]">
            {config.h1}
          </h1>
          <PreuveSociale className="mt-6" />
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            {OFC} — formation IA &amp; ChatGPT pour {config.metierNom} du BTP : devis, chantier, mémoires techniques.
            Sessions en présentiel en Île-de-France (4 h), dispensées par un organisme certifié Qualiopi. Financement possible selon éligibilité.{' '}
            <strong className="text-slate-800">{formatNoteSatisfactionAffichageComplet()}</strong>.
          </p>

          {config.essentielItems && config.essentielItems.length > 0 ? (
            <Essentiel
              className="mt-8"
              idPrefix={`metier-${config.id}`}
              items={config.essentielItems}
            />
          ) : null}

          <div className="mt-8">
            <ShortAnswerBlock>
              L&apos;IA aide à structurer brouillons et tableaux à partir de vos données ; elle ne remplace ni la
              validation des normes ({config.normeRef}) ni la responsabilité professionnelle sur le chantier.
            </ShortAnswerBlock>
          </div>

          {config.csfePartnership && (
            <p className="mt-6 rounded-xl border border-blue-100 bg-[#F2F2F2] px-4 py-3 text-sm text-slate-700">
              <strong className="text-slate-900">Autorité métier :</strong> {OFC} est partenaire de la Chambre syndicale
              française de l&apos;étanchéité (CSFE) pour la sensibilisation et la formation.{' '}
              <strong className="text-slate-900">Laure Olivié a formé les équipes de la CSFE</strong> à l&apos;usage
              responsable de l&apos;IA dans un contexte étanchéité — un repère fort pour les entreprises du secteur.
              L&apos;étude de cas FFB &amp; CSFE est liée dans « Liens utiles ».
            </p>
          )}

          {config.umbPartnership && (
            <p className="mt-6 rounded-xl border border-blue-100 bg-[#F2F2F2] px-4 py-3 text-sm text-slate-700">
              <strong className="text-slate-900">Autorité métier :</strong> {OFC} est partenaire de l&apos;Union des
              Métiers du Bois de la FFB (UMB-FFB) pour la sensibilisation et la formation IA des entreprises de
              charpente, ossature bois, agencement et menuiserie.{' '}
              <strong className="text-slate-900">Laure Olivié anime des sessions avec le réseau UMB-FFB</strong> —
              un repère pour les TPE et PME du bois en Île-de-France. La page partenaires est liée dans « Catalogue et
              ressources ».
            </p>
          )}

          <nav aria-label="Sommaire" className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
              {sommaire.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="text-[#377CF3] underline hover:no-underline">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <section id="probleme" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Le problème des {config.metierNom} : la charge documentaire et les normes
            </h2>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              {config.problemParagraphs.map((p, i) => (
                <p key={`pb-${i}`}>{p}</p>
              ))}
            </div>
          </section>

          <section id="solution-ia" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">La solution IA</h2>
            <p className="mt-6 text-slate-700 leading-relaxed">{config.solutionIntro}</p>
            <ul className="mt-6 space-y-3">
              {[
                'Ateliers sur vos documents réels (anonymisés si besoin)',
                'Relecture humaine systématique avant envoi client ou marché',
                'Rappels confidentialité : pas de données sensibles dans un outil grand public sans cadre',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {config.casUsageConcrets && config.casUsageConcrets.length > 0 ? (
            <section id="cas-usage" className="scroll-mt-24 mt-14">
              <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Cinq cas d&apos;usage concrets
              </h2>
              <p className="mt-4 text-slate-600">
                Exemples de tâches où les équipes gagnent du temps une fois les prompts et le cadre Qualiopi assimilés
                — toujours avec relecture humaine.
              </p>
              <ol className="mt-8 list-decimal space-y-4 pl-5 text-slate-700 leading-relaxed">
                {config.casUsageConcrets.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </section>
          ) : null}

          <div className="mt-12">
            <CalendlyBlock
              id="rdv-1"
              metierId={config.id}
              title="Premier rendez-vous — Calendly"
              subtitle="30 minutes pour cadrer votre besoin (intra-entreprise, dans vos locaux, en présentiel) et voir si la formation IA appliquée au bâtiment correspond à votre équipe."
            />
          </div>

          <section id="prompts" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Prompts ChatGPT — exemples pour {config.metierNomTitre} BTP
            </h2>
            <p className="mt-4 text-slate-600">
              À adapter à vos tarifs internes et à vos modèles. Toujours valider les sorties avec le référentiel
              technique ({config.normeRef}, notices, CCTP).
            </p>
            <div className="mt-8 space-y-10">
              {config.prompts.map((p, i) => (
                <div key={p.title} className="rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 md:p-6">
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    {i + 1}. {p.title}
                  </h3>
                  <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-800 shadow-sm">
                    {p.body}
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section id="temoignage" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              {config.csfePartnership
                ? 'Témoignage — partenariat CSFE'
                : config.umbPartnership
                  ? 'Témoignage — partenariat UMB-FFB'
                  : 'Témoignage'}
            </h2>
            <Citation
              className="mt-6"
              quote={config.testimonialQuote}
              role={config.testimonialAttribution}
              variant="client"
            />
          </section>

          <section id="faq" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">FAQ</h2>
            <div className="mt-8 space-y-5">
              {config.faq.map((item) => (
                <div key={item.q} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-slate-900">{item.q}</h3>
                  <div className="mt-2 text-slate-600 leading-relaxed">
                    <FAQAnswer content={item.a} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <RelatedLinks
            path={config.path}
            className="mt-14 !px-0"
            tone="transparent"
            excludeHrefs={getLiensConnexesHrefs(config.path)}
          />

          {relatedMetierLinks.length > 0 ? (
            <ContextualLinksSection
              id="liens-internes"
              title="Formations IA — métiers proches"
              subtitle={
                config.liensUtilesIntro ??
                `Autres métiers du BTP où la formation IA appliquée au bâtiment est adaptée au vocabulaire terrain.`
              }
              links={relatedMetierLinks.filter(
                (l) => !getClusterRelatedHrefs(config.path).includes(l.href),
              )}
              className="mt-14 !bg-transparent !py-0"
            />
          ) : null}

          <ContextualLinksSection
            id={relatedMetierLinks.length === 0 ? 'liens-internes' : undefined}
            title={relatedMetierLinks.length > 0 ? 'Catalogue et ressources' : 'Liens utiles'}
            subtitle={
              relatedMetierLinks.length > 0
                ? 'Programmes catalogue — organisme certifié Qualiopi, Claude AI, financement Constructys et articles de fond.'
                : config.liensUtilesIntro ??
                  'Catalogue des formations, financement Constructys, Claude AI BTP et articles pratiques.'
            }
            links={coreMetierLinks.filter(
              (l) =>
                !getClusterRelatedHrefs(config.path).includes(l.href) &&
                !getLiensConnexesHrefs(config.path).includes(l.href),
            )}
            tone="muted"
            className="mt-14"
          />

          <div className="mt-14">
            <CalendlyBlock
              id="rdv-2"
              metierId={config.id}
              title="Deuxième appel à l’action — Calendly"
              subtitle="Réservez un créneau pour une visio découverte gratuite : démonstration sur un cas type et questions financement (Constructys, OPCO)."
            />
          </div>

          <RenvoiFicheCatalogue
            programmeRef="NIV-01"
            contexte={`pour les ${config.metierNomTitre}`}
          />

          {config.showAuthorBio ? (
            <>
              <div className="mt-14">
                <CalendlyBlock
                  id="rdv-3"
                  metierId={config.id}
                  title="Troisième appel à l’action — Calendly"
                  subtitle="Une dernière occasion de réserver un créneau : appel découverte formation IA pour le BTP (30 min), même lien Calendly officiel."
                />
              </div>

              <section id="auteur" className="scroll-mt-24 mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
                <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
                  Laure Olivié — formatrice IA &amp; BTP
                </h2>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  <strong>{SITE_CONFIG.name}</strong> est formatrice organisme certifié Qualiopi pour {OFC}. Elle accompagne les
                  entreprises du bâtiment et des travaux publics sur ChatGPT, Claude et les usages responsables de
                  l&apos;IA (devis, mémoires techniques, comptes rendus). Instructrice LinkedIn Learning — satisfaction{' '}
                  {formatNoteSatisfactionAffichageComplet()}.{' '}
                  {config.authorBioClosingLine ??
                    'Basée en Île-de-France, elle intervient exclusivement en présentiel pour les entreprises du bâtiment et des travaux publics.'}
                </p>
                <p className="mt-4 text-sm text-slate-600">
                  <Link href={LINKS.aPropos} className={`font-medium ${OFC_LINK}`}>
                    À propos de la formatrice
                  </Link>
                  {' · '}
                  <a
                    href={SITE_CONFIG.linkedinProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium ${OFC_LINK}`}
                  >
                    LinkedIn
                  </a>
                </p>
              </section>
            </>
          ) : null}

          <LiensConnexes
            currentPath={config.path}
            excludeHrefs={getClusterRelatedHrefs(config.path)}
          />

          <section className="mt-14 border-t border-slate-200 pt-10 text-sm text-slate-600">
            <p>
              <strong>{SITE_CONFIG.legalName}</strong> — SIRET {SITE_CONFIG.siret} · NDA 11788515078 · Organisme certifié Qualiopi
              · {SITE_CONFIG.email} ·{' '}
              <a href={SITE_CONFIG.url} className={OFC_LINK}>
                www.laureolivie.fr
              </a>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
