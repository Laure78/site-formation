import Link from 'next/link';
import { CtaRdv } from '@/components/CtaRdv';
import { Suspense } from 'react';
import Image from 'next/image';
import {
  Award,
  Clock,
  Zap,
  Target,
  Users,
  Check,
  Calendar,
  Mail,
  GraduationCap,
  Building2,
} from 'lucide-react';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';
import { GoogleReviewsSectionPlaceholder } from '@/components/landing/GoogleReviewsSectionPlaceholder';
import { HomeFaqDetailsList } from '@/components/landing/HomeFaqDetailsList';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { QualiopiBadge } from '@/components/QualiopiLogo';
import { QUALIOPI_FINANCEMENT_FORMULATION } from '@/config/qualiopi';
import { FAQ_ITEMS_HOME } from '@/lib/faq';
import { CSFE_NOM_COMPLET, CSFE_NOM_LIBRE } from '@/lib/csfe';
import { LINKS } from '@/lib/internal-links';
import { LOGO_LINKEDIN_LEARNING } from '@/lib/client-logos';
import {
  libelleTarifsCarteCatalogue,
  SESSION_DUREE_LIBELLE,
} from '@/lib/tarifs-sessions';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';
import { ConstructysResteAChargeBox } from '@/components/financement/ConstructysResteAChargeBox';
import { MentionFinancement } from '@/components/MentionFinancement';
import { OFC_LINK, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { SCHEMA_CONTACT, ANNUAIRE_ENTREPRISES_OFC_URL } from '@/lib/schema-constants';
import { Accordion } from '@/components/readability/Accordion';
import { Citation } from '@/components/readability/Citation';
import { RevealShell, RevealGroupShell } from '@/components/motion/RevealShell';
import { GoogleReviewsSection } from '@/components/landing/GoogleReviewsSection';
import { HomeDeferredLinkedInLearning } from '@/components/landing/HomeDeferredLinkedInLearning';
import { DeferredHomeFooterCalendly } from '@/components/landing/DeferredHomeFooterCalendly';

export function HomeProgrammeFaqSections() {
  return (
    <>
      <section id="programme" className={OFC_SEC.white}>
        <div className="mx-auto max-w-7xl">
          <RevealShell>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <span>THÉMATIQUES ABORDÉES</span>
          </div>
          <h3 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Programme détaillé des formations
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            catalogue &amp; programmes PDF — articles et guides IA BTP · Claude AI BTP · mémoire technique · IA
            conducteur de travaux
          </p>
          <p className="mt-3 max-w-none text-base leading-relaxed text-slate-600 md:text-lg">
            {getPublishedFormations().length} parcours officiels :{' '}
            {getPublishedFormations().map((f, i, list) => (
              <span key={f.code}>
                {i > 0 ? (i === list.length - 1 ? ' et ' : ' ; ') : null}
                <strong className="font-semibold text-slate-800">{f.niveauLabel}</strong>
                {' — '}
                {f.titre}
              </span>
            ))}
            . Les thèmes couverts incluent devis et chiffrage, réponses aux marchés, comptes rendus, DOE, emails et
            relation client — en{' '}
            <strong className="font-semibold text-slate-800">sessions de {SESSION_DUREE_LIBELLE}</strong>
            {' '}
            (intra {libelleTarifsCarteCatalogue(4).intra} ; inter {libelleTarifsCarteCatalogue(4).inter} — effectifs selon fiche). Téléchargez les{' '}
            <strong className="font-semibold text-slate-800">programmes PDF</strong> depuis chaque fiche ou ci-dessous
            sur la page catalogue.
          </p>
          </RevealShell>
          <Accordion id="programme-modules-detail" summaryLabel="Lire la suite — modules et ressources">
            <RevealGroupShell className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerMs={45}>
              {[
                {
                  n: 1,
                  title: 'Devis & chiffrage avec l\'IA',
                  items: [
                    'Structurez un premier devis en moins d\'une heure, contre une demi-journée en routine',
                    'Adaptez la trame à vos prix et vos marges — vous validez les montants',
                    'Préparez vos éléments de rentabilité pour vérification',
                    'Déclinez des variantes de libellés et d\'options plus rapidement',
                  ],
                },
                {
                  n: 2,
                  title: "Réponses aux appels d'offres",
                  items: [
                    'Analysez un DCE rapidement',
                    'Structurez votre mémoire technique',
                    'Rédigez une proposition convaincante',
                    'Sécurisez la confidentialité des données',
                  ],
                },
                {
                  n: 3,
                  title: 'Comptes rendus et DOE',
                  items: [
                    'Rédigez vos CR de chantier à partir de vos notes ou d\'une dictée, en relecture',
                    'Structurez vos DOE à partir des pièces existantes',
                    "Créez des rapports d'avancement",
                    'Documentez vos réunions de chantier',
                  ],
                },
                {
                  n: 4,
                  title: 'Gestion des emails & relation client',
                  items: [
                    'Rédigez vos emails professionnels',
                    'Créez des modèles de relances',
                    'Gérez les réclamations clients',
                    'Communiquez avec les fournisseurs',
                  ],
                },
              ].map((mod) => (
                <div
                  key={mod.n}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-bold text-white">
                    {mod.n}
                  </div>
                  <h4 className="mt-4 font-semibold text-slate-900">{mod.title}</h4>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {mod.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-[var(--accent)]">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </RevealGroupShell>

            <RevealShell className="mt-16 max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
              <Image
                src={LOGO_LINKEDIN_LEARNING.src}
                alt={LOGO_LINKEDIN_LEARNING.alt}
                width={LOGO_LINKEDIN_LEARNING.width}
                height={LOGO_LINKEDIN_LEARNING.height}
                className="h-8 w-auto max-w-[160px] object-contain"
                sizes="160px"
                loading="lazy"
                quality={70}
              />
              <p className="mt-3 text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
                LinkedIn Learning
              </p>
              <h4 className="mt-2 font-display text-xl font-bold text-slate-900 md:text-2xl">
                L&apos;IA pour recruter dans le BTP
              </h4>
              <p className="mt-3 text-slate-600">
                Pour les <strong>PME BTP et TPE</strong> du bâtiment : annonces, tri de CV, entretiens,
                fidélisation. Cours{' '}
                <strong>
                  L&apos;IA pour les TPE et PME&nbsp;: Recruter sa main-d&apos;œuvre efficacement
                </strong>{' '}
                — accédez à la vidéo et au programme sur{' '}
                <a
                  href="https://fr.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement/bienvenue-dans-l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={OFC_LINK}
                >
                  LinkedIn Learning
                </a>
                .
              </p>
            </RevealShell>
          </Accordion>
        </div>
      </section>

      {/* Pourquoi choisir Laure Olivié */}
      <section
        className={OFC_SEC.whiteMesh}
        aria-labelledby="pourquoi-laure-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
            <div className="shrink-0 w-full space-y-4 sm:w-80 lg:w-96">
              <ProfilePhoto title="Sessions présentiel Île-de-France — Qualiopi, Constructys" />
            </div>
            <div>
              <RevealShell>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                <span>VOTRE FORMATRICE</span>
              </div>
              <h2
                id="pourquoi-laure-heading"
                className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl"
              >
                Pourquoi choisir Laure Olivié ?
              </h2>
              </RevealShell>
              <RevealShell>
              <Citation
                className="mt-6"
                variant="formatrice"
                quote="Formatrice IA spécialisée BTP depuis fin 2021, après 10 ans de terrain BTP comme conductrice de travaux. Mon objectif : zéro théorie, 100 % pratique. Vous repartez avec des outils opérationnels dès le lendemain."
                author="Laure Olivié"
                role="Formatrice IA BTP — OFC Création d'Entreprise"
              />
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Vous cherchez un formateur IA pour le bâtiment ou la construction ? Découvrez{' '}
                <Link href={LINKS.formateurIaBtp} className={`${OFC_LINK} font-semibold`}>
                  une formatrice IA spécialisée construction
                </Link>
                .
              </p>
              </RevealShell>
              <RevealGroupShell className="mt-8 grid gap-4 sm:grid-cols-2" staggerMs={55}>
                {[
                  {
                    icon: GraduationCap,
                    title: '10 ans de terrain BTP',
                    desc: 'Spécialisation métiers du bâtiment, TP, génie civil.',
                  },
                  {
                    icon: Zap,
                    title: 'Méthode 100 % opérationnelle',
                    desc: "Pas de PowerPoint théorique. On travaille directement sur vos documents réels.",
                  },
                  {
                    icon: Check,
                    title: 'Organisme certifié Qualiopi',
                    desc: QUALIOPI_FINANCEMENT_FORMULATION,
                  },
                  {
                    icon: Users,
                    title: 'Supports fournis',
                    desc: 'Vous repartez avec les supports de la session et vos prompts adaptés à vos documents.',
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-slate-200 p-4 shadow-sm"
                  >
                    <Icon size={24} strokeWidth={1.5} className="text-[var(--accent)]" />
                    <h4 className="mt-2 font-semibold text-slate-900">{title}</h4>
                    <p className="mt-1 text-sm text-slate-600">{desc}</p>
                  </div>
                ))}
              </RevealGroupShell>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-[var(--accent-soft)] p-6 shadow-sm">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Building2 className="h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} aria-hidden />
                  Partenaires
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Interventions et actions de formation avec la FFB (Île-de-France) et
                  la {CSFE_NOM_LIBRE}.
                </p>
                <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {[
                    {
                      label: 'FFB Bâtiment',
                      href: 'https://www.ffbatiment.fr',
                      title: 'Fédération Française du Bâtiment',
                    },
                    {
                      label: 'FFB Île-de-France',
                      href: 'https://www.ffbatiment.fr/federations/ile-de-france',
                      title: 'FFB Île-de-France',
                    },
                    { label: 'CSFE', href: 'https://www.csfe.fr', title: CSFE_NOM_COMPLET },
                  ].map(({ label, href, title }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={title}
                        className="inline-flex rounded-xl border border-[var(--accent)]/25 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-slate-500">
                  <Link
                    href="/etudes-de-cas/ffb-csfe"
                    className={OFC_LINK}
                    title={CSFE_NOM_COMPLET}
                  >
                    Étude de cas FFB &amp; {CSFE_NOM_COMPLET}
                  </Link>
                  {' · '}
                  <Link href="/a-propos#clients-partenaires" className={OFC_LINK}>
                    Tous les partenaires
                  </Link>
                </p>
                <p className="mt-5 text-sm leading-relaxed text-slate-600">
                  <Link href={LINKS.formationsLinkedInLearning} className={`${OFC_LINK} font-semibold`}>
                    Instructrice LinkedIn Learning — découvrez mes 2 cours à la demande
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <HomeDeferredLinkedInLearning />

          <div className="mt-16 space-y-16 border-t border-slate-200 pt-16">
            <RevealShell>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                <span>FINANCEMENT</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-slate-900 md:text-3xl">
                Financement possible selon éligibilité
              </h3>
              <p className="mt-3 max-w-none text-base leading-relaxed text-slate-600 md:text-lg">
                <MentionFinancement variant="long" />
              </p>
              <Accordion id="financement-constructys-detail" summaryLabel="Lire la suite — barèmes et démarches">
                <RevealGroupShell className="grid gap-6 md:grid-cols-3" staggerMs={45}>
                  {[
                    {
                      icon: Award,
                      title: 'Prise en charge partielle',
                      desc: "Coût pédagogique : plafond indicatif 24 € HT/heure/stagiaire (96 € HT pour 4 h). Sessions intra : 840 € HT/jour maximum — selon barèmes Constructys et éligibilité.",
                    },
                    {
                      icon: Target,
                      title: 'Salaires remboursés',
                      desc: 'Pour les entreprises de moins de 11 salariés : 15€ HT/heure/stagiaire. Éligible si formation « gestion d\'entreprise ».',
                    },
                    {
                      icon: Check,
                      title: 'Organisme certifié Qualiopi',
                      desc: "Organisme certifié Qualiopi. Démarches administratives simplifiées. Accompagnement complet pour monter le dossier.",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <h4 className="mt-4 font-semibold text-slate-900">{title}</h4>
                      <p className="mt-2 text-sm text-slate-600">{desc}</p>
                    </div>
                  ))}
                </RevealGroupShell>
                <ConstructysResteAChargeBox />
                <div className="mt-10 text-center">
                  <Link
                    href={LINKS.financement}
                    className="inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                    title="Financement OPCO Constructys — formation IA pour les pros du BTP"
                  >
                    financement Constructys
                  </Link>
                </div>
              </Accordion>
            </div>
            </RevealShell>

            <RevealShell>
            <div className="mx-auto max-w-4xl">
              <div className="flex flex-col gap-8 rounded-2xl border border-slate-200 bg-slate-50 p-8 md:flex-row md:items-start">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:w-[28rem] md:shrink-0">
                  <Link href={LINKS.qualiopi} className="block hover:opacity-95">
                    <QualiopiBadge size="lg" />
                  </Link>
                  <ExternalLinkAnchor
                    href={ANNUAIRE_ENTREPRISES_OFC_URL}
                    title="Consulter la fiche OFC Création d'Entreprise sur l'Annuaire des Entreprises (data.gouv.fr)"
                    className={`mt-4 inline-flex text-xs ${OFC_LINK}`}
                  >
                    Vérifier l&apos;organisme sur annuaire-entreprises.data.gouv.fr →
                  </ExternalLinkAnchor>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-bold text-slate-900">
                    Organisme de formation certifié Qualiopi
                  </h3>
                  <p className="mt-3 text-slate-600">
                    OFC CRÉATION D&apos;ENTREPRISE est certifié Qualiopi, dans le cadre du
                    plan de développement des compétences de votre entreprise.{' '}
                    <MentionFinancement variant="court" withLink={false} />.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <ExternalLinkAnchor
                      href={ANNUAIRE_ENTREPRISES_OFC_URL}
                      title="Vérifier l'organisme certifié Qualiopi — fiche entreprise officielle"
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)] hover:bg-blue-100"
                    >
                      Vérifier la certification (annuaire des entreprises) →
                    </ExternalLinkAnchor>
                  </div>
                </div>
              </div>
            </div>
            </RevealShell>
          </div>
        </div>
      </section>

      <Suspense fallback={<GoogleReviewsSectionPlaceholder />}>
        <GoogleReviewsSection />
      </Suspense>

      {/* FAQ */}
      <section className={OFC_SEC.muted}>
        <div className="mx-auto max-w-7xl">
          <RevealShell>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white">
            <span>FAQ</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold text-slate-900">
            Questions fréquentes sur la formation IA appliquée au bâtiment et à la construction
          </h2>
          <p className="mt-3 text-slate-600">
            Vous avez des questions ? Voici les réponses aux interrogations les plus
            fréquentes.
          </p>
          </RevealShell>
          <RevealShell className="mt-8">
            <HomeFaqDetailsList items={FAQ_ITEMS_HOME} />
          </RevealShell>
        </div>
      </section>

      {/* Une autre question ? Contact CTA */}
      <section className={OFC_SEC.white}>
        <RevealShell className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-[var(--accent-soft)] p-10 text-center">
            <h3 className="font-display text-2xl font-bold text-slate-900">
              Une autre question ?
            </h3>
            <p className="mt-3 text-slate-600">
              Écrivez-moi ou prenez rendez-vous pour un échange de 30 minutes gratuit.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={`mailto:${SCHEMA_CONTACT.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                <Mail size={20} strokeWidth={1.5} />
                {SCHEMA_CONTACT.email}
              </a>
              <CtaRdv
                origin="accueil-faq-contact"
                variant="secondary"
                className={`${OFC_CTA_SECONDARY} inline-flex items-center justify-center gap-2 px-6 py-3`}
              />
            </div>
          </div>
        </RevealShell>
      </section>

      {/* Prise de RDV — bloc Calendly unique (#rdv) */}
      <section
        id="rdv"
        aria-labelledby="rdv-creneau-heading"
        className={OFC_SEC.muted}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
                <Calendar size={16} strokeWidth={1.5} />
                <span>PRENDRE RDV</span>
              </div>
              <h3
                id="rdv-creneau-heading"
                className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl"
              >
                Réservez un créneau de visio découverte
              </h3>
              <p className="mt-3 text-slate-600">
                Choisissez le jour et l&apos;heure qui vous conviennent pour un échange
                de 30 minutes. Devis personnalisé sous 24h après l&apos;échange.
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Email :{' '}
                <a
                  href={`mailto:${SCHEMA_CONTACT.email}`}
                  className={OFC_LINK}
                >
                  {SCHEMA_CONTACT.email}
                </a>
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Écrivez-moi ou prenez rendez-vous — coordonnées à droite.
              </p>
              <div className="mt-8 space-y-6">
                {[
                  {
                    icon: Clock,
                    title: 'Réponse rapide',
                    desc: 'Devis détaillé sous 24h avec programme personnalisé',
                  },
                  {
                    icon: Check,
                    title: 'Financement OPCO selon éligibilité',
                    desc: 'Financement possible selon éligibilité — détail Constructys sur devis après analyse de votre dossier.',
                  },
                  {
                    icon: Mail,
                    title: 'Besoin d\'échanger ?',
                    desc: SCHEMA_CONTACT.email,
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{title}</p>
                      <p className="text-sm text-slate-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="accueil-rdv-calendly min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 md:p-6">
              <DeferredHomeFooterCalendly />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
