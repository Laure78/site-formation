import type { Metadata } from 'next';
import Link from 'next/link';
import { FormateurCard } from '@/components/formateurs/FormateurCard';
import { JsonLd } from '@/components/JsonLd';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { Section } from '@/components/ui/Section';
import { DOMAINES_CATALOGUE_2027 } from '@/data/catalogue-2027';
import {
  getFormateursForDomaine,
  getVisibleFormateurs,
  isFormateursDemoActive,
} from '@/lib/formateurs';
import { LINKS } from '@/lib/internal-links';
import {
  OFC_CTA_PRIMARY,
  OFC_TYPE_H2,
  OFC_TYPE_H3,
  OFC_TYPE_LEAD,
} from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';
import { SCHEMA_PERSON_LAURE } from '@/lib/schema-constants';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const PAGE_TITLE = 'Nos formateurs IA pour le BTP | Laure Olivié';
/** 155 car. — mot-clé en tête, fourchette SEO 150–160. */
const PAGE_DESCRIPTION =
  'Formateurs IA pour le BTP : Laure Olivié et l’équipe OFC. Sessions ChatGPT et Claude en présentiel en Île-de-France, Qualiopi, OPCO selon éligibilité.';

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Nos formateurs IA pour le BTP',
    titleAbsolute: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    descriptionFinal: true,
    path: LINKS.formateurs,
    appendAuthorSuffix: false,
    keywords: [
      'formateurs IA BTP',
      'formatrice IA BTP',
      'formation IA pour le BTP',
      'ChatGPT BTP',
    ],
  }),
  title: { absolute: PAGE_TITLE },
};

export default function FormateursPage() {
  const formateurs = getVisibleFormateurs();
  const demoActive = isFormateursDemoActive();
  const base = SITE_CONFIG.url.replace(/\/$/, '');

  /** JSON-LD — Person confirmée uniquement (jamais les profils démo). */
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${base}${LINKS.aPropos}#person`,
    name: SCHEMA_PERSON_LAURE.name,
    jobTitle: SCHEMA_PERSON_LAURE.jobTitle,
    description: SCHEMA_PERSON_LAURE.description,
    url: `${base}${LINKS.aPropos}`,
    worksFor: {
      '@type': 'Organization',
      name: 'OFC Création d’Entreprise',
      url: base,
    },
  };

  return (
    <div>
      <JsonLd id="schema-formateurs-person" schema={personSchema} />
      <BreadcrumbJsonLd
        id="schema-breadcrumb-formateurs"
        items={[
          { name: 'Accueil', url: `${base}/` },
          { name: 'À propos', url: `${base}${LINKS.aPropos}` },
          { name: 'Formateurs', url: `${base}${LINKS.formateurs}` },
        ]}
      />

      <section className={OFC_SEC.heroWhite}>
        <div className={OFC_SECTION_INNER}>
          <h1 className={OFC_TYPE_H2}>Nos formateurs</h1>
          <p className={`${OFC_TYPE_LEAD} mt-4 max-w-2xl text-base text-ofc-ink-muted md:text-lg`}>
            L’équipe OFC anime les formations IA pour le BTP en présentiel en
            Île-de-France. Chaque profil est relié aux formations du catalogue
            correspondant à son domaine.
          </p>
          <div className="mt-7">
            <Link
              href={LINKS.formations}
              className={`${OFC_CTA_PRIMARY} inline-flex min-h-11 items-center justify-center px-6 py-3`}
            >
              Voir le catalogue
            </Link>
          </div>
        </div>
      </section>

      <Section
        tone="canvas"
        aria-labelledby="formateurs-tous"
        className="scroll-mt-24"
      >
        <h2 id="formateurs-tous" className={OFC_TYPE_H3}>
          L’équipe pédagogique
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ofc-ink-muted md:text-base">
          {demoActive
            ? 'Maquette : profils confirmés et profils de démonstration (environnement privé local).'
            : 'Intervenants confirmés pour les sessions du catalogue.'}
        </p>
        <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {formateurs.map((f, index) => (
            <li
              key={f.id}
              id={f.slug}
              className="scroll-mt-28 min-w-0 motion-safe:animate-[ofc-hero-enter_0.45s_ease-out_both]"
              style={{ animationDelay: `${Math.min(index, 5) * 60}ms` }}
            >
              <FormateurCard formateur={f} />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" aria-labelledby="formateurs-par-domaine">
        <h2 id="formateurs-par-domaine" className={OFC_TYPE_H3}>
          Par domaine du catalogue
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-ofc-ink-muted md:text-base">
          Accès rapide aux formateurs associés à chaque domaine 2027 (ancres
          vers les cartes ci-dessus — un seul lien par profil).
        </p>
        <p className="mt-8 text-sm text-ofc-ink-muted">
          <a
            href="#laure-olivie"
            className="font-medium text-ofc-accent underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
          >
            Laure Olivié
          </a>{' '}
          intervient sur l’ensemble des domaines du catalogue.
        </p>
        <ul className="mt-8 space-y-8">
          {DOMAINES_CATALOGUE_2027.map((domaine) => {
            /**
             * Hors transversal ; un formateur n’apparaît que sous son domaine principal
             * (premier `domaineIds`) — un seul lien ancre par profil.
             */
            const list = getFormateursForDomaine(domaine.id).filter(
              (f) =>
                !f.animatesAllPublished && f.domaineIds[0] === domaine.id,
            );
            if (list.length === 0) return null;
            return (
              <li key={domaine.id} id={`domaine-${domaine.id}`} className="scroll-mt-28">
                <h3 className="font-display text-base font-bold text-ofc-ink md:text-lg">
                  {domaine.titre}
                </h3>
                <p className="mt-1 text-sm text-ofc-ink-muted">{domaine.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {list.map((f) => (
                    <li key={`${domaine.id}-${f.id}`}>
                      <a
                        href={`#${f.slug}`}
                        className="inline-flex min-h-11 items-center rounded-ofc-pill border border-ofc-border-strong bg-white px-4 py-2 text-sm font-medium text-ofc-ink transition-colors hover:border-ofc-accent hover:text-ofc-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
                      >
                        {f.prenom} {f.nom}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="muted" aria-labelledby="formateurs-cta">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="formateurs-cta" className={OFC_TYPE_H3}>
            Une question sur l’animation d’une session&nbsp;?
          </h2>
          <p className="mt-3 text-ofc-ink-muted">
            Échangeons sur votre besoin et le formateur le plus adapté à votre équipe.
          </p>
          <Link
            href={LINKS.prendreRdv}
            data-cta="rdv"
            className={`${OFC_CTA_PRIMARY} mt-8 inline-flex min-h-11 items-center justify-center px-6 py-3`}
          >
            Réservez votre visio découverte gratuite
          </Link>
        </div>
      </Section>
    </div>
  );
}
