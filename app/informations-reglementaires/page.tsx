import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { FileDown, ArrowRight } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { QUALIOPI_MENTION_PERIMETRE, QUALIOPI_NDA_MENTION_REGLEMENTAIRE } from '@/config/qualiopi';
import { CONTACT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { OFC_IDENTITE } from '@/lib/ofc-identite';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { buildBreadcrumbListJsonLd, createPageMetadata, siteAbsoluteUrl } from '@/lib/seo';

export const revalidate = 3600;

const PAGE_PATH = LINKS.informationsReglementaires;
const PAGE_URL = siteAbsoluteUrl(PAGE_PATH);
const PAGE_TITLE = 'Informations réglementaires | Laure Olivié';
const PAGE_DESCRIPTION =
  "Informations réglementaires OFC Création d'Entreprise, organisme de formation : livret d'accueil, règlement intérieur, réclamations, accessibilité, Qualiopi.";

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

const DOCUMENTS = [
  {
    title: "Livret d'accueil du stagiaire",
    description:
      "Tout ce qu'il faut savoir avant, pendant et après votre formation — consultable avant l'inscription.",
    href: LINKS.livretAccueilStagiaire,
    external: false,
  },
  {
    title: 'Règlement intérieur',
    description:
      'Règles de discipline, hygiène, sécurité et sanctions applicables aux stagiaires en session.',
    href: LINKS.reglementInterieur,
    external: false,
  },
  {
    title: 'Réclamations et médiation',
    description:
      'Procédure pour signaler une difficulté, une réclamation ou solliciter une médiation.',
    href: LINKS.reclamations,
    external: false,
  },
  {
    title: 'Accessibilité et handicap',
    description:
      'Référente handicap, adaptations possibles et processus d\'accueil des personnes en situation de handicap.',
    href: LINKS.accessibiliteHandicap,
    external: false,
  },
  {
    title: 'Certificat Qualiopi',
    description:
      "Certificat de l'organisme certificateur Certifopac — catégorie actions de formation.",
    href: LINKS.certificatQualiopi,
    external: true,
    download: true,
  },
  {
    title: 'Indicateurs de résultats',
    description:
      'Note de satisfaction à chaud et méthode de calcul — indicateur 2 Qualiopi.',
    href: LINKS.indicateursResultats,
    external: false,
  },
] as const;

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'Informations réglementaires et qualité',
      description: PAGE_DESCRIPTION,
      inLanguage: 'fr-FR',
      isPartOf: { '@id': `${SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '')}/#website` },
      publisher: { '@id': `${SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '')}/#organization` },
    },
    buildBreadcrumbListJsonLd([
      { name: 'Accueil', url: siteAbsoluteUrl('/') },
      { name: 'Informations réglementaires', url: PAGE_URL },
    ]),
  ],
};

export default function InformationsReglementairesPage() {
  return (
    <div className={`mx-auto max-w-4xl px-4 py-14 md:py-16 ${poppins.className} text-[#1A1A1A]`}>
      <JsonLd id="schema-informations-reglementaires" schema={pageJsonLd} />

      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
          {OFC_IDENTITE.raisonSociale} — actions de formation
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[#377CF3] md:text-4xl">
          Informations réglementaires et qualité
        </h1>
        <p className="mt-4 leading-relaxed text-[#1A1A1A]/90">
          Les documents qui encadrent nos formations, consultables et téléchargeables à tout moment.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {DOCUMENTS.map((doc) => {
          const linkClass =
            'mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#377CF3] hover:underline';
          return (
            <article
              key={doc.title}
              className="rounded-lg border-l-[6px] border-[#377CF3] bg-[#F2F2F2] p-5"
            >
              <h2 className="text-lg font-bold text-[#377CF3]">{doc.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]">{doc.description}</p>
              {'download' in doc && doc.download ? (
                <a href={doc.href} className={linkClass} download>
                  <FileDown className="h-4 w-4" aria-hidden />
                  Télécharger le PDF
                </a>
              ) : (
                <Link href={doc.href} className={linkClass}>
                  Consulter
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              )}
            </article>
          );
        })}
      </div>

      <aside className="mt-12 rounded-lg border-l-[6px] border-[#377CF3] bg-[#F2F2F2] p-5 text-sm leading-relaxed text-[#1A1A1A]">
        <p className="font-semibold text-[#377CF3]">{OFC_IDENTITE.raisonSociale}</p>
        <p className="mt-2">
          SIRET {OFC_IDENTITE.siret} · NDA {OFC_IDENTITE.nda}
        </p>
        <p className="mt-1">{CONTACT.address}</p>
        <p className="mt-1">
          <a href={`mailto:${CONTACT.email}`} className="font-medium text-[#377CF3] hover:underline">
            {CONTACT.email}
          </a>
          {' · '}
          <a href={`tel:${CONTACT.phone}`} className="font-medium text-[#377CF3] hover:underline">
            {CONTACT.phoneDisplay}
          </a>
        </p>
        <p className="mt-3">{QUALIOPI_NDA_MENTION_REGLEMENTAIRE}</p>
        <p className="mt-3 font-medium">{QUALIOPI_MENTION_PERIMETRE}</p>
      </aside>
    </div>
  );
}
