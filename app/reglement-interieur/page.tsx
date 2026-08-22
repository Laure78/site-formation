import Link from 'next/link';
import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import { FileDown } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { LINKS } from '@/lib/internal-links';
import { OFC_IDENTITE } from '@/lib/ofc-identite';
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import { buildBreadcrumbListJsonLd, createPageMetadata, siteAbsoluteUrl } from '@/lib/seo';

export const revalidate = 3600;

const PAGE_PATH = LINKS.reglementInterieur;
const PAGE_URL = siteAbsoluteUrl(PAGE_PATH);
const PAGE_TITLE = 'Règlement intérieur | Laure Olivié';
const PAGE_DESCRIPTION =
  "Règlement intérieur applicable aux stagiaires d'OFC Création d'Entreprise, organisme de formation en présentiel Île-de-France : discipline, sécurité, IA et réclamations.";

export const metadata = createPageMetadata({
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

type Article = {
  id: string;
  number: number;
  title: string;
  body: ReactNode;
};

const ARTICLES: Article[] = [
  {
    id: 'article-1',
    number: 1,
    title: 'Objet et champ d\'application',
    body: (
      <p>
        Le présent règlement est établi conformément aux articles L. 6352-3 à L. 6352-5 et R. 6352-1 à
        R. 6352-15 du code du travail. Il définit les règles d&apos;hygiène et de sécurité, les règles
        générales et permanentes relatives à la discipline, ainsi que la nature et l&apos;échelle des
        sanctions applicables aux stagiaires et les garanties procédurales qui leur sont attachées.
      </p>
    ),
  },
  {
    id: 'article-2',
    number: 2,
    title: 'Personnes concernées',
    body: (
      <p>
        Il s&apos;applique à toute personne participant à une action de formation dispensée par{' '}
        {OFC_IDENTITE.raisonSociale}, pour toute la durée de la formation. Un exemplaire est remis à
        chaque stagiaire avant son entrée en formation et il est accessible en permanence sur
        www.laureolivie.fr.
      </p>
    ),
  },
  {
    id: 'article-3',
    number: 3,
    title: 'Hygiène et sécurité',
    body: (
      <p>
        Les formations se déroulent en présentiel, dans les locaux de l&apos;entreprise cliente (intra)
        ou dans des locaux mis à disposition par un partenaire organisateur (inter). Les règles
        d&apos;hygiène et de sécurité applicables sont celles en vigueur dans l&apos;établissement
        d&apos;accueil. Chaque stagiaire est tenu de prendre connaissance des consignes de sécurité, des
        issues de secours et des consignes d&apos;évacuation qui lui sont présentées en début de session,
        et de les respecter.
      </p>
    ),
  },
  {
    id: 'article-4',
    number: 4,
    title: 'Interdiction de fumer et de vapoter',
    body: (
      <p>
        Il est interdit de fumer et de vapoter dans les locaux de formation, conformément à la
        réglementation en vigueur et aux règles de l&apos;établissement d&apos;accueil.
      </p>
    ),
  },
  {
    id: 'article-5',
    number: 5,
    title: 'Boissons alcoolisées et substances',
    body: (
      <p>
        Il est interdit d&apos;introduire ou de consommer des boissons alcoolisées ou des substances
        illicites dans les locaux de formation, et de s&apos;y présenter en état d&apos;ébriété.
      </p>
    ),
  },
  {
    id: 'article-6',
    number: 6,
    title: 'Accident',
    body: (
      <p>
        Tout accident, même bénin, survenu pendant la formation ou pendant le trajet doit être
        immédiatement signalé à la formatrice ainsi qu&apos;au responsable de l&apos;établissement
        d&apos;accueil. La déclaration incombe à l&apos;employeur du stagiaire lorsque celui-ci est
        salarié.
      </p>
    ),
  },
  {
    id: 'article-7',
    number: 7,
    title: 'Horaires, assiduité et émargement',
    body: (
      <p>
        Les horaires sont indiqués sur la convocation. Les stagiaires sont tenus de suivre
        l&apos;intégralité de la formation et de signer la feuille d&apos;émargement par demi-journée. En
        cas d&apos;absence ou de retard, le stagiaire prévient la formatrice et son employeur dans les
        meilleurs délais. Les absences non justifiées sont signalées à l&apos;employeur et au financeur,
        et peuvent entraîner une réduction de la prise en charge.
      </p>
    ),
  },
  {
    id: 'article-8',
    number: 8,
    title: 'Accès aux locaux et usage du matériel',
    body: (
      <p>
        Les stagiaires utilisent le matériel mis à disposition avec soin et dans le seul cadre de la
        formation. Il est interdit d&apos;installer des logiciels sans autorisation ou de modifier les
        configurations des postes.
      </p>
    ),
  },
  {
    id: 'article-9',
    number: 9,
    title: 'Confidentialité et propriété intellectuelle',
    body: (
      <p>
        Les supports pédagogiques remis restent la propriété d&apos;{OFC_IDENTITE.raisonSociale}. Ils
        sont réservés à l&apos;usage personnel du stagiaire et ne peuvent être reproduits, diffusés ni
        exploités à des fins commerciales ou de formation sans autorisation écrite. Réciproquement, les
        documents d&apos;entreprise utilisés en atelier par les participants (devis, pièces de marché,
        comptes rendus de chantier) restent confidentiels : ils ne sont ni conservés ni diffusés par
        l&apos;organisme, et les participants s&apos;engagent à la même réserve entre eux.
      </p>
    ),
  },
  {
    id: 'article-10',
    number: 10,
    title: "Usage des outils d'intelligence artificielle",
    body: (
      <p>
        Les formations recourent à des outils d&apos;intelligence artificielle générative. Les stagiaires
        s&apos;engagent à ne saisir dans ces outils aucune donnée personnelle sensible, aucun
        identifiant, ni aucune information couverte par le secret des affaires ou par une clause de
        confidentialité de leur employeur. La formatrice rappelle ces règles en début de session et
        propose des jeux de données anonymisés pour les exercices lorsque c&apos;est nécessaire.
      </p>
    ),
  },
  {
    id: 'article-11',
    number: 11,
    title: 'Comportement',
    body: (
      <p>
        Chacun adopte un comportement respectueux envers les autres participants, la formatrice et le
        personnel de l&apos;établissement d&apos;accueil. Tout comportement contraire aux bonnes mœurs,
        toute forme de harcèlement ou de discrimination est proscrit.
      </p>
    ),
  },
  {
    id: 'article-12',
    number: 12,
    title: 'Sanctions',
    body: (
      <p>
        Tout manquement au présent règlement peut faire l&apos;objet, selon sa gravité, de l&apos;une des
        sanctions suivantes : avertissement écrit · blâme · exclusion temporaire de la formation ·
        exclusion définitive de la formation. L&apos;employeur et, le cas échéant, le financeur sont
        informés de toute sanction.
      </p>
    ),
  },
  {
    id: 'article-13',
    number: 13,
    title: 'Garanties disciplinaires',
    body: (
      <p>
        Aucune sanction ne peut être infligée sans que le stagiaire ait été informé au préalable des griefs
        retenus contre lui. Lorsque la sanction envisagée est autre qu&apos;un avertissement écrit, le
        stagiaire est convoqué à un entretien, peut se faire assister par une personne de son choix, et
        la sanction ne peut intervenir moins d&apos;un jour franc ni plus de quinze jours après cet
        entretien. La sanction fait l&apos;objet d&apos;une décision écrite et motivée, notifiée au
        stagiaire.
      </p>
    ),
  },
  {
    id: 'article-14',
    number: 14,
    title: 'Représentation des stagiaires',
    body: (
      <p>
        L&apos;élection de délégués des stagiaires est prévue pour les formations d&apos;une durée
        supérieure à 500 heures. Les formations dispensées par {OFC_IDENTITE.raisonSociale} étant
        d&apos;une durée inférieure, cette disposition n&apos;est pas applicable.
      </p>
    ),
  },
  {
    id: 'article-15',
    number: 15,
    title: 'Réclamations',
    body: (
      <p>
        Toute difficulté ou réclamation peut être adressée selon les modalités décrites sur la page{' '}
        <Link href={LINKS.reclamations} className="font-semibold text-[#377CF3] hover:underline">
          Réclamations, difficultés et aléas
        </Link>
        .
      </p>
    ),
  },
  {
    id: 'article-16',
    number: 16,
    title: 'Entrée en vigueur et publicité',
    body: (
      <p>
        Le présent règlement entre en vigueur le 22/08/2026. Il est publié sur www.laureolivie.fr, remis
        à chaque stagiaire avant son entrée en formation, et révisé au moins une fois par an.
      </p>
    ),
  },
];

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'Règlement intérieur',
      description: PAGE_DESCRIPTION,
      inLanguage: 'fr-FR',
      isPartOf: { '@id': `${SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '')}/#website` },
      publisher: { '@id': `${SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '')}/#organization` },
    },
    buildBreadcrumbListJsonLd([
      { name: 'Accueil', url: siteAbsoluteUrl('/') },
      { name: 'Informations réglementaires', url: siteAbsoluteUrl(LINKS.informationsReglementaires) },
      { name: 'Règlement intérieur', url: PAGE_URL },
    ]),
  ],
};

function ArticleBlock({ article }: { article: Article }) {
  return (
    <section
      id={article.id}
      aria-labelledby={`${article.id}-heading`}
      className="scroll-mt-24 rounded-lg border-l-[6px] border-[#377CF3] bg-[#F2F2F2] p-5"
    >
      <h2 id={`${article.id}-heading`} className="text-lg font-bold text-[#377CF3] md:text-xl">
        Article {article.number} — {article.title}
      </h2>
      <div className="mt-3 leading-relaxed text-[#1A1A1A]">{article.body}</div>
    </section>
  );
}

export default function ReglementInterieurPage() {
  return (
    <div className={`mx-auto max-w-4xl px-4 py-14 md:py-16 ${poppins.className} text-[#1A1A1A]`}>
      <JsonLd id="schema-reglement-interieur" schema={pageJsonLd} />

      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
          {OFC_IDENTITE.raisonSociale} — actions de formation
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[#377CF3] md:text-4xl">Règlement intérieur</h1>
        <p className="mt-4 leading-relaxed text-[#1A1A1A]/90">
          Applicable aux stagiaires des formations dispensées par {OFC_IDENTITE.raisonSociale} — version 1
          du 22/08/2026
        </p>
      </header>

      <nav
        aria-label="Sommaire du règlement intérieur"
        className="mt-10 rounded-lg border-l-[6px] border-[#377CF3] bg-[#F2F2F2] p-5"
      >
        <p className="text-sm font-semibold text-[#377CF3]">Sommaire</p>
        <ol className="mt-3 columns-1 gap-x-8 text-sm leading-relaxed sm:columns-2">
          {ARTICLES.map((article) => (
            <li key={article.id} className="mb-1.5 break-inside-avoid">
              <a href={`#${article.id}`} className="text-[#377CF3] hover:underline">
                Article {article.number} — {article.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <article className="mt-12 space-y-5">
        {ARTICLES.map((article) => (
          <ArticleBlock key={article.id} article={article} />
        ))}
      </article>

      <footer className="mt-16 border-t border-[#377CF3]/20 pt-8 text-center">
        <p className="text-sm text-[#1A1A1A]/80">
          Règlement intérieur — version 1 du 22/08/2026 · {OFC_IDENTITE.raisonSociale}
        </p>
        <a
          href={LINKS.reglementInterieurPdf}
          className="mt-4 inline-flex items-center gap-2 font-semibold text-[#377CF3] hover:underline"
          download
        >
          <FileDown className="h-5 w-5" aria-hidden />
          Télécharger le règlement intérieur (PDF)
        </a>
      </footer>
    </div>
  );
}
