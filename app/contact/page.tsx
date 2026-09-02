import Link from 'next/link';
import { CTA_RDV_LABEL } from '@/components/CtaRdv';
import { Suspense } from 'react';
import { CheckCircle, Building2, Clock, Award, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';
import { ContactDirect } from '@/components/landing/ContactDirect';
import { ContactFormationHint } from '@/components/landing/ContactFormationHint';
import { FAQSection } from '@/components/landing/FAQSection';
import { DisclaimerGains } from '@/components/formation/DisclaimerGains';
import { LINKS } from '@/lib/internal-links';
import { CONTACT } from '@/lib/constants';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { FAQ_CONTACT } from '@/lib/faq';
import { JsonLd } from '@/components/JsonLd';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER, OFC_SECTION_INNER_WIDE } from '@/lib/ofc-section-classes';
export const revalidate = 3600;

const TITLE = 'Formation IA pour les pros du BTP — Contact';
const DESCRIPTION =
  'Contact Laure Olivié : formation IA pour le BTP (organisme certifié Qualiopi) ou solutions IA BeWork. RDV gratuit, Constructys. Île-de-France.';

export const metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/contact',
});

const faqSchema = getFAQSchema(FAQ_CONTACT);

export default function ContactPage() {
  return (
    <div>
      <JsonLd id="schema-faq-page" schema={faqSchema} />
      {/* Hero */}
      <section className={OFC_SEC.heroWhite}>
        <div className={OFC_SECTION_INNER_WIDE}>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            <div>
          <h1 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
            Contact
          </h1>
          <p className="mt-2 text-slate-600">
            Formation IA pour le BTP — Réponse sous 24h
          </p>
          <h2 className="mt-8 font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Formations IA pour les{' '}
            <span className="text-[var(--accent)]">entreprises du BTP</span>
          </h2>
          <p className="mt-6 max-w-xl text-slate-600">
            Dirigeants, conducteurs de travaux, équipes support : intégrez l&apos;IA dans vos tâches quotidiennes et{' '}
            <span className="font-semibold text-slate-900">récupérez 3 à 5 h par semaine</span>.
          </p>
          <DisclaimerGains className="mt-3 max-w-xl" />
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              '10+ ans en formation',
              'Spécialisation BTP',
              '100% pratique',
              'Présentiel IDF uniquement',
              'Qualiopi & OPCO',
            ].map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]"
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Échanger sur vos besoins
            </Link>
            <CalendlyEmbed
              type="link"
              variant="secondary"
              campaign="contact-hero"
              ctaPosition="hero"
              className="px-8 py-3"
            />
          </div>
            </div>
            <div className="shrink-0 lg:w-96">
              <ProfilePhoto />
            </div>
          </div>
        </div>
      </section>

      {/* Contact — sans formulaire : email, RDV */}
      <section id="contact" className={`${OFC_SEC.softWave} scroll-mt-24`}>
        <div className={OFC_SECTION_INNER}>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Votre projet formation IA BTP
          </h2>
          <p className="mt-3 text-slate-600">
            Email, téléphone ou créneau Calendly — réponse sous 24 h.
          </p>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-6">
              <Suspense fallback={null}>
                <ContactFormationHint />
              </Suspense>
              <ContactDirect />
            </div>
          </div>
        </div>
      </section>

      {/* Widget Calendly complet */}
      <section className={OFC_SEC.white}>
        <div className={OFC_SECTION_INNER}>
          <CalendlyEmbed
            type="inline"
            campaign="contact-inline"
            ctaPosition="inline"
            sectionTitle="Prendre rendez-vous"
            sectionSubtitle="30 minutes pour cadrer votre projet de formation IA pour le BTP — créneau au choix, confirmation immédiate."
            heightPx={720}
          />
        </div>
      </section>

      {/* 4 cartes caractéristiques */}
      <section className={OFC_SEC.mutedMesh}>
        <div className={OFC_SECTION_INNER_WIDE}>
          <h2 className="sr-only">Pourquoi choisir Laure Olivié</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: CheckCircle,
                title: "10+ ans d'expérience",
                desc: "Animation de formations professionnelles auprès de TPE, PME et équipes du BTP",
              },
              {
                icon: Building2,
                title: 'Expertise terrain',
                desc: "IA appliquée sur vos vrais chantiers : devis, chiffrage, mails clients",
              },
              {
                icon: Clock,
                title: 'Méthode 100% pratique',
                desc: "Cas réels, modèles prêts à l'emploi, autonomie garantie",
              },
              {
                icon: Award,
                title: 'Financement OPCO',
                desc: 'Formations OFC (organisme certifié Qualiopi) — finançables par Constructys selon éligibilité',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className={`${OFC_CARD} p-6`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-lg shadow-blue-500/20">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mon approche */}
      <section className={OFC_SEC.white}>
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Mon approche
          </h2>
          <div className="mt-8 space-y-6 text-slate-600">
            <p>
              Formatrice IA spécialisée BTP depuis 2022, avec 10 ans de terrain BTP
              (conductrice de travaux), j&apos;accompagne les entreprises du bâtiment
              et des travaux publics vers l&apos;intelligence artificielle. Mon
              objectif n&apos;est pas de parler théorie, mais de vous montrer
              concrètement comment l&apos;IA peut transformer votre quotidien.
            </p>
            <p>
              Que vous soyez dirigeant, chef de chantier ou responsable administratif, je
              vous accompagne sur vos cas réels : préparation de devis, réponses
              clients, relances d&apos;impayés, comptes rendus de chantier,
              communication sécurité, préparation de documents pour assurances et
              maîtres d&apos;ouvrage.
            </p>
            <blockquote className="border-l-4 border-[var(--accent)] bg-[var(--accent-soft)] py-4 pl-6 pr-6 italic text-[var(--accent)]">
              « Mon rôle, ce n&apos;est pas de faire du blabla sur l&apos;IA.
              C&apos;est de vous montrer en direct comment l&apos;IA fait gagner 2 à
              3 heures par semaine sur vos devis, vos comptes rendus chantier et vos
              relances clients. »
            </blockquote>
            <p>
              Mes <Link href="/formations" className="text-[var(--accent)] font-medium hover:underline">formations IA pour le BTP</Link> sont dispensées par un organisme certifié Qualiopi et peuvent être prises en
              prise en charge par votre OPCO selon éligibilité (Constructys, etc.). Je vous
              accompagne également dans les démarches administratives pour
              faciliter le financement de votre formation.
            </p>
          </div>
        </div>
      </section>

      {/* Comment je travaille avec vous */}
      <section className={OFC_SEC.mutedMesh}>
        <div className={OFC_SECTION_INNER_WIDE}>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Comment je travaille avec vous
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: 1,
                title: 'Diagnostic de vos besoins',
                desc: "Analyse rapide de votre activité et de vos documents existants (devis, mails, CR de chantier) pour identifier les opportunités de gain de temps.",
              },
              {
                n: 2,
                title: 'Création de modèles personnalisés',
                desc: "Développement de modèles IA adaptés à votre métier : pose de pavés, terrassement, maçonnerie, couverture, plomberie, électricité...",
              },
              {
                n: 3,
                title: 'Mise en pratique sur vos cas réels',
                desc: "Formation en direct sur vos propres documents pour que vous repartiez immédiatement avec des modèles prêts à réutiliser.",
              },
              {
                n: 4,
                title: 'Suivi et autonomie',
                desc: "Accompagnement après la formation + kit récapitulatif complet pour continuer en toute autonomie.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-bold text-white">
                  {step.n}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/formations"
              className="inline-block rounded-xl border-2 border-[var(--accent)] px-8 py-3 font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft)]"
            >
              Voir le catalogue formations
            </Link>
            <CalendlyEmbed
              type="link"
              variant="primary"
              campaign="contact-mid"
              ctaPosition="middle"
              className="px-8 py-3"
            />
          </div>
        </div>
      </section>

      {/* Réclamations */}
      <section id="reclamations" className={`${OFC_SEC.white} scroll-mt-28`}>
        <div className={OFC_SECTION_INNER}>
          <h2 className="font-display text-2xl font-bold text-slate-900">Réclamations</h2>
          <p className="mt-4 max-w-3xl text-slate-700">
            Réclamations : toute réclamation relative à une prestation de formation peut être adressée par email à
            laureolivie@yahoo.fr (objet : Réclamation) ou par courrier à OFC Création d&apos;Entreprise, 6 rue Henri
            Dunant, 78280 Guyancourt. Un accusé de réception vous est envoyé sous 48 h ouvrées et une réponse vous est
            apportée sous 15 jours ouvrés. Chaque réclamation est enregistrée et analysée dans le cadre de notre
            démarche d&apos;amélioration continue Qualiopi.
          </p>
          <p className="mt-3">
            <Link href={LINKS.reclamations} className="font-medium text-[#377CF3] hover:underline">
              Procédure détaillée →
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className={OFC_SEC.white}>
        <div className={OFC_SECTION_INNER}>
          <FAQSection
            items={FAQ_CONTACT}
            title="Questions fréquentes — Contact"
          />
        </div>
      </section>

      {/* CTA final */}
      <section className={OFC_SEC.accentLoose}>
        <div className={`${OFC_SECTION_INNER} max-w-2xl text-center text-white`}>
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Prêt à gagner 3 à 5 heures par semaine ?
          </h2>
          <p className="mt-4 text-blue-100">
            Contactez-moi pour discuter de votre projet de formation IA pour les pros du BTP et des
            modalités de financement.
          </p>
          <DisclaimerGains className="mx-auto mt-4 max-w-xl text-blue-100/85" />
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/formations"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50"
            >
              Formation IA appliquée au bâtiment
            </Link>
            <CalendlyEmbed
              type="link"
              variant="on-accent"
              campaign="contact-footer"
              ctaPosition="footer"
              className="gap-2 px-6 py-3"
            />
            <a
              href={`tel:${CONTACT.phone}`}
              aria-label={`Appeler Laure Olivié au ${CONTACT.phoneDisplay}`}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              <Phone size={18} strokeWidth={1.75} aria-hidden />
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
          <div className="mt-12 border-t border-white/30 pt-8">
            <div className="rounded-xl bg-white/10 p-6">
              <AllerPlusLoin
                links={[
                  { href: '/formations', label: 'Formation IA pour le BTP' },
                  { href: '/formation-ia-artisans-btp', label: 'ChatGPT et IA pour votre entreprise BTP' },
                  { href: LINKS.prendreRdv, label: CTA_RDV_LABEL },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
