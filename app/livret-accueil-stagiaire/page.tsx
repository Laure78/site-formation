import Link from 'next/link';
import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import { FileDown } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import {
  QUALIOPI_MENTION_PERIMETRE,
  QUALIOPI_NDA_MENTION_REGLEMENTAIRE,
  QUALIOPI_DELAI_ACCES_EXACT,
} from '@/config/qualiopi';
import { CONTACT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { OFC_IDENTITE } from '@/lib/ofc-identite';
import {
  QUALIOPI_CERTIFICAT_REALISATION,
  QUALIOPI_EVALUATION_STANDARD,
  QUALIOPI_METHODES_STANDARD,
  QUALIOPI_RECLAMATIONS,
} from '@/lib/qualiopi-info';
import {
  buildBreadcrumbListJsonLd,
  createPageMetadata,
  siteAbsoluteUrl,
} from '@/lib/seo';
import {
  MODALITE_FORMATIONS_PRESENTIEL,
  SESSION_DUREE_LIBELLE,
} from '@/lib/tarifs-sessions';
import { SCHEMA_CONTACT, SCHEMA_GEO, SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { EFFECTIF_CATALOGUE_MAX } from '@/data/formations';

export const revalidate = 3600;

const PAGE_PATH = LINKS.livretAccueilStagiaire;
const PAGE_URL = siteAbsoluteUrl(PAGE_PATH);
const PAGE_TITLE = "Livret d'accueil du stagiaire | Laure Olivié";
const PAGE_DESCRIPTION =
  "Livret d'accueil du stagiaire : formation IA BTP en présentiel en Île-de-France. Déroulement de la formation, évaluation, accessibilité et contacts OFC Création d'Entreprise.";

export const metadata = createPageMetadata({
  title: PAGE_TITLE,
  titleAbsolute: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  descriptionFinal: true,
  path: PAGE_PATH,
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const SOMMAIRE = [
  { id: 'bienvenue', label: 'Bienvenue' },
  { id: 'organisme', label: "L'organisme" },
  { id: 'vos-formations', label: 'Vos formations' },
  { id: 'avant-la-formation', label: 'Avant la formation' },
  { id: 'le-jour-de-la-formation', label: 'Le jour de la formation' },
  { id: 'comment-se-deroule-la-formation', label: 'Comment se déroule la formation' },
  { id: 'comment-vous-etes-evalue', label: 'Comment vous êtes évalué' },
  { id: 'situation-de-handicap', label: 'Situation de handicap' },
  { id: 'vos-donnees-personnelles', label: 'Vos données personnelles' },
  { id: 'une-remarque-une-difficulte', label: 'Une remarque, une difficulté ?' },
  { id: 'vos-contacts', label: 'Vos contacts' },
] as const;

/** Délai d'accès — extrait canonique (2 à 4 semaines). */
const DELAI_ACCES_COURT =
  "Délai d'accès : entrée en formation sous 2 à 4 semaines après signature de la convention.";

const RECLAMATIONS_RESUME =
  `Accusé de réception sous ${QUALIOPI_RECLAMATIONS.delaiAccuseReception}, réponse de fond sous ${QUALIOPI_RECLAMATIONS.delaiReponse}.`;

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: "Livret d'accueil du stagiaire",
      description: PAGE_DESCRIPTION,
      inLanguage: 'fr-FR',
      isPartOf: { '@id': `${SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '')}/#website` },
      publisher: { '@id': `${SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '')}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '')}/#organization`,
      name: OFC_IDENTITE.raisonSociale,
      url: SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, ''),
      telephone: SCHEMA_CONTACT.telephoneJsonLd,
      email: SCHEMA_CONTACT.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SCHEMA_GEO.streetAddress,
        addressLocality: SCHEMA_GEO.addressLocality,
        postalCode: SCHEMA_GEO.postalCode,
        addressRegion: SCHEMA_GEO.addressRegion,
        addressCountry: SCHEMA_GEO.addressCountry,
      },
    },
    buildBreadcrumbListJsonLd([
      { name: 'Accueil', url: siteAbsoluteUrl('/') },
      { name: 'Informations réglementaires', url: siteAbsoluteUrl(LINKS.informationsReglementaires) },
      { name: "Livret d'accueil du stagiaire", url: PAGE_URL },
    ]),
  ],
};

function Encadre({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg border-l-[6px] border-[#377CF3] bg-[#F2F2F2] p-4 text-[#1A1A1A] ${className}`}
    >
      {children}
    </div>
  );
}

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-xl font-bold text-[#377CF3] md:text-2xl">
      {children}
    </h2>
  );
}

export default function LivretAccueilStagiairePage() {
  return (
    <div className={`mx-auto max-w-4xl px-4 py-14 md:py-16 ${poppins.className} text-[#1A1A1A]`}>
      <JsonLd id="schema-livret-accueil-stagiaire" schema={pageJsonLd} />

      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
          {OFC_IDENTITE.raisonSociale} — actions de formation
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[#377CF3] md:text-4xl">
          Livret d&apos;accueil du stagiaire
        </h1>
        <p className="mt-4 leading-relaxed text-[#1A1A1A]/90">
          Tout ce qu&apos;il faut savoir avant, pendant et après votre formation.
        </p>
      </header>

      <nav
        aria-label="Sommaire du livret d'accueil"
        className="mt-10 rounded-lg border-l-[6px] border-[#377CF3] bg-[#F2F2F2] p-5"
      >
        <p className="text-sm font-semibold text-[#377CF3]">Sommaire</p>
        <ol className="mt-3 columns-1 gap-x-8 text-sm leading-relaxed sm:columns-2">
          {SOMMAIRE.map((item, index) => (
            <li key={item.id} className="mb-1.5 break-inside-avoid">
              <a href={`#${item.id}`} className="text-[#377CF3] hover:underline">
                {index + 1}. {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <article className="mt-12 space-y-12">
        {/* 1. Bienvenue */}
        <section aria-labelledby="bienvenue">
          <H2 id="bienvenue">Bienvenue</H2>
          <div className="mt-4 space-y-4 leading-relaxed">
            <p>
              Je suis Laure Olivié, formatrice. J&apos;anime vos sessions en présentiel, sur vos vrais
              documents de chantier ou de bureau — pas des exemples génériques.
            </p>
            <p>
              OFC Création d&apos;Entreprise propose des formations à l&apos;intelligence artificielle
              appliquées aux métiers du bâtiment et des travaux publics : devis, administratif, appels
              d&apos;offres, comptes rendus, selon le parcours choisi. Mon objectif : que vous repartiez
              avec des usages concrets, testés le jour même, que vous pourrez réutiliser dès la semaine
              suivante.
            </p>
          </div>
        </section>

        {/* 2. L'organisme */}
        <section aria-labelledby="organisme">
          <H2 id="organisme">L&apos;organisme</H2>
          <div className="mt-4 space-y-3 leading-relaxed">
            <p>
              <strong>{OFC_IDENTITE.raisonSociale}</strong> · SIRET {OFC_IDENTITE.siret} ·{' '}
              {QUALIOPI_NDA_MENTION_REGLEMENTAIRE} · {CONTACT.address}.
            </p>
            <Encadre>
              <p>
                Organisme certifié Qualiopi. {QUALIOPI_MENTION_PERIMETRE}
              </p>
              <p className="mt-3">
                <a
                  href={LINKS.certificatQualiopi}
                  className="font-semibold text-[#377CF3] hover:underline"
                  download
                >
                  Télécharger le certificat Qualiopi (PDF)
                </a>
              </p>
            </Encadre>
          </div>
        </section>

        {/* 3. Vos formations */}
        <section aria-labelledby="vos-formations">
          <H2 id="vos-formations">Vos formations</H2>
          <div className="mt-4 space-y-4 leading-relaxed">
            <p>
              Modalité : {MODALITE_FORMATIONS_PRESENTIEL} Sessions en intra-entreprise (dans vos locaux)
              ou en inter-entreprises (lieu communiqué à la convocation —{' '}
              {/* TODO : nom(s) du ou des partenaires organisateurs inter — à compléter si affichage public souhaité */}
              <span className="rounded bg-[#F2F2F2] px-1 text-sm text-[#377CF3]">
                TODO : partenaire(s) organisateur(s) inter
              </span>
              ).
            </p>
            <p>
              Durée type du catalogue : <strong>{SESSION_DUREE_LIBELLE}</strong> (selon fiche formation).
              Effectif : de 1 à {EFFECTIF_CATALOGUE_MAX} participants selon le parcours — détail sur chaque
              fiche. Un poste informatique par participant, ou un binôme si vous préférez travailler à
              deux sur les mêmes exercices.
            </p>
            <p>
              <Link href={LINKS.formations} className="font-semibold text-[#377CF3] hover:underline">
                Consulter le catalogue des formations
              </Link>
            </p>
          </div>
        </section>

        {/* 4. Avant la formation */}
        <section aria-labelledby="avant-la-formation">
          <H2 id="avant-la-formation">Avant la formation</H2>
          <ul className="mt-4 list-disc space-y-4 pl-5 leading-relaxed">
            <li>
              <strong>Inscription :</strong> devis puis convention de formation signée.
            </li>
            <li>
              <strong>Délai d&apos;accès :</strong> {DELAI_ACCES_COURT}
              <span className="mt-1 block text-sm text-[#1A1A1A]/80">
                {QUALIOPI_DELAI_ACCES_EXACT.replace(DELAI_ACCES_COURT, '').trim()}
              </span>
            </li>
            <li>
              <strong>Convocation</strong> adressée par courriel, précisant la date, l&apos;horaire, le lieu
              et l&apos;accès.
            </li>
            <li>
              <strong>Ce qu&apos;il faut prévoir :</strong> un ordinateur portable ou l&apos;accès à un
              poste, une connexion internet, et si possible un document réel de votre entreprise pour les
              ateliers (devis, CCTP, compte rendu de chantier).
            </li>
            <li>
              <strong>Prérequis :</strong> indiqués sur chaque fiche formation ; savoir utiliser un
              ordinateur et naviguer sur internet suffit pour les formations de niveau 1.
            </li>
          </ul>
        </section>

        {/* 5. Le jour de la formation */}
        <section aria-labelledby="le-jour-de-la-formation">
          <H2 id="le-jour-de-la-formation">Le jour de la formation</H2>
          <div className="mt-4 space-y-4 leading-relaxed">
            <p>
              Accueil sur le lieu indiqué dans votre convocation. Les horaires précis (matin, après-midi,
              pauses) figurent dans cette convocation ; le{' '}
              <Link href={LINKS.reglementInterieur} className="font-medium text-[#377CF3] hover:underline">
                règlement intérieur
              </Link>{' '}
              rappelle les règles habituelles : émargement par demi-journée, pauses, déjeuner non pris en
              charge par l&apos;organisme (sauf mention contraire pour une session intra), consignes de
              sécurité du lieu d&apos;accueil.
            </p>
            <Encadre className="text-sm">
              {/* TODO : horaires types affichés sur le livret — varient selon parcours (ex. NIV-01 : 9h00–13h00) ; confirmer la formulation unique ou renvoyer uniquement à la convocation */}
              <p className="font-medium text-[#377CF3]">
                TODO : horaires types à afficher (selon parcours catalogue ou convocation seule)
              </p>
            </Encadre>
          </div>
        </section>

        {/* 6. Comment se déroule la formation */}
        <section aria-labelledby="comment-se-deroule-la-formation">
          <H2 id="comment-se-deroule-la-formation">Comment se déroule la formation</H2>
          <div className="mt-4 space-y-4 leading-relaxed">
            <p>
              <strong>Méthodes mobilisées :</strong> apports illustrés, démonstrations en direct, ateliers
              sur les documents réels des participants, exercices guidés.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              {QUALIOPI_METHODES_STANDARD.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p>
              <strong>Ressources remises :</strong> supports, fiches méthode, prompts prêts à l&apos;emploi.
              Assistance pédagogique assurée par la formatrice pendant toute la session.
            </p>
          </div>
        </section>

        {/* 7. Comment vous êtes évalué */}
        <section aria-labelledby="comment-vous-etes-evalue">
          <H2 id="comment-vous-etes-evalue">Comment vous êtes évalué</H2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
            {QUALIOPI_EVALUATION_STANDARD.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mt-4 leading-relaxed">
            {QUALIOPI_CERTIFICAT_REALISATION}
          </p>
          <p className="mt-4 leading-relaxed">
            Un questionnaire de satisfaction est adressé à l&apos;issue de la session et une relance est
            envoyée en cas de non-réponse — c&apos;est ce qui nous permet d&apos;améliorer nos formations.
          </p>
        </section>

        {/* 8. Situation de handicap */}
        <section aria-labelledby="situation-de-handicap">
          <H2 id="situation-de-handicap">Situation de handicap</H2>
          <p className="mt-4 leading-relaxed">
            Laure Olivié est la référente handicap de l&apos;organisme. Signalez votre besoin dès
            l&apos;inscription et au plus tard 15 jours avant la session, au{' '}
            <a href={`tel:${CONTACT.phone}`} className="font-medium text-[#377CF3] hover:underline">
              {CONTACT.phoneDisplay}
            </a>{' '}
            ou{' '}
            <a href={`mailto:${CONTACT.email}`} className="font-medium text-[#377CF3] hover:underline">
              {CONTACT.email}
            </a>
            , afin d&apos;étudier les adaptations possibles.{' '}
            <Link href={LINKS.accessibiliteHandicap} className="font-medium text-[#377CF3] hover:underline">
              Page Accessibilité &amp; handicap
            </Link>
            .
          </p>
        </section>

        {/* 9. Vos données personnelles */}
        <section aria-labelledby="vos-donnees-personnelles">
          <H2 id="vos-donnees-personnelles">Vos données personnelles</H2>
          <div className="mt-4 space-y-3 leading-relaxed">
            <p>
              <strong>Responsable de traitement :</strong> {OFC_IDENTITE.raisonSociale}.
            </p>
            <p>
              <strong>Finalités :</strong> gestion administrative et pédagogique de la formation,
              obligations légales de l&apos;organisme, suivi qualité.
            </p>
            <p>
              <strong>Base légale :</strong> exécution du contrat et obligation légale.
            </p>
            <p>
              <strong>Durée de conservation :</strong> la durée légale applicable aux documents de
              formation.
            </p>
            <p>
              <strong>Destinataires :</strong> l&apos;organisme, l&apos;employeur et le financeur pour les
              seules pièces justificatives.
            </p>
            <p>
              Droits d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition exerçables à{' '}
              <a href={`mailto:${CONTACT.email}`} className="font-medium text-[#377CF3] hover:underline">
                {CONTACT.email}
              </a>
              , et réclamation possible auprès de la CNIL.{' '}
              <Link
                href={LINKS.politiqueConfidentialite}
                className="font-medium text-[#377CF3] hover:underline"
              >
                Politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </section>

        {/* 10. Une remarque, une difficulté ? */}
        <section aria-labelledby="une-remarque-une-difficulte">
          <H2 id="une-remarque-une-difficulte">Une remarque, une difficulté ?</H2>
          <p className="mt-4 leading-relaxed">
            Consultez la page{' '}
            <Link href={LINKS.reclamations} className="font-semibold text-[#377CF3] hover:underline">
              Réclamations, difficultés et aléas
            </Link>{' '}
            : {RECLAMATIONS_RESUME}
          </p>
        </section>

        {/* 11. Vos contacts */}
        <section aria-labelledby="vos-contacts">
          <H2 id="vos-contacts">Vos contacts</H2>
          <Encadre className="mt-4">
            <p className="font-semibold">Laure Olivié</p>
            <p className="mt-1 text-sm">
              Formatrice · référente pédagogique · référente handicap · référente qualité
            </p>
            <p className="mt-3">
              <a href={`mailto:${CONTACT.email}`} className="font-medium text-[#377CF3] hover:underline">
                {CONTACT.email}
              </a>
              {' · '}
              <a href={`tel:${CONTACT.phone}`} className="font-medium text-[#377CF3] hover:underline">
                {CONTACT.phoneDisplay}
              </a>
            </p>
          </Encadre>
        </section>
      </article>

      <footer className="mt-16 border-t border-[#377CF3]/20 pt-8 text-center">
        <p className="text-sm text-[#1A1A1A]/80">
          Livret d&apos;accueil — version 1, mise à jour le 22/08/2026
        </p>
        <a
          href={LINKS.livretAccueilStagiairePdf}
          className="mt-4 inline-flex items-center gap-2 font-semibold text-[#377CF3] hover:underline"
          download
        >
          <FileDown className="h-5 w-5" aria-hidden />
          Télécharger le livret d&apos;accueil (PDF)
        </a>
      </footer>
    </div>
  );
}
