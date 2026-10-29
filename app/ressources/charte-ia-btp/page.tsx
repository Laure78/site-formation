import { JsonLd } from '@/components/JsonLd';
import { CharteIaBtpGuidePage } from '@/components/ressources/CharteIaBtpGuidePage';
import {
  CHARTE_IA_BTP_CONTENT_UPDATED_AT,
  CHARTE_IA_BTP_PAGE_PATH,
  CHARTE_IA_BTP_PDF_HREF,
  CHARTE_IA_BTP_PDF_PAGE_COUNT,
  getCharteIaBtpCanonicalUrl,
} from '@/lib/charte-ia-btp-ressource';
import { CHARTE_IA_BTP_LEGAL_REVIEW_PENDING } from '@/lib/charte-ia-btp-legal';
import { LINKS } from '@/lib/internal-links';
import { buildMetadata, getBreadcrumbSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

const META_TITLE = 'Charte IA BTP : modèle gratuit pour PME';
const META_DESCRIPTION =
  'Téléchargez un modèle de charte IA pour votre PME du bâtiment : confidentialité, contrôle humain et règles pratiques au bureau comme sur chantier.';

export const metadata = buildMetadata({
  title: META_TITLE,
  description: META_DESCRIPTION,
  descriptionFinal: true,
  path: CHARTE_IA_BTP_PAGE_PATH,
  openGraphType: 'article',
  openGraphTitle: META_TITLE,
  openGraphDescription: META_DESCRIPTION,
  keywords: [
    'charte IA BTP',
    'modèle charte IA entreprise',
    'charte utilisation intelligence artificielle',
    'charte IA PME bâtiment',
    'confidentialité IA chantier',
    'formation IA pour le BTP',
  ],
  article: {
    publishedTime: '2026-10-16',
    modifiedTime: CHARTE_IA_BTP_CONTENT_UPDATED_AT,
    author: SITE_CONFIG.name,
  },
  robots: CHARTE_IA_BTP_LEGAL_REVIEW_PENDING
    ? { index: false, follow: true }
    : undefined,
});

const FAQ = [
  {
    q: 'À quoi sert une charte IA dans le bâtiment ?',
    a: 'Elle fixe les outils autorisés, les données utilisables, les contrôles humains et la procédure d’alerte — pour aligner bureau et chantier.',
  },
  {
    q: 'Une charte IA est-elle obligatoire ?',
    a: 'Non pour le libellé « charte » en tant que tel. Des obligations peuvent toutefois s’appliquer selon les données traitées et les outils utilisés — à analyser avec vos conseils.',
  },
  {
    q: 'Peut-on transmettre un CCTP à ChatGPT ou à Claude ?',
    a: 'Cela dépend des droits sur le document, des obligations du marché et de l’outil autorisé. Vérifiez paramètres et contrat de la formule utilisée.',
  },
  {
    q: 'Qui doit vérifier les documents produits avec l’IA ?',
    a: 'La personne qui engage l’entreprise sur le fond — direction, conducteur, chargé d’affaires ou profil compétent en prévention selon le document.',
  },
  {
    q: 'Comment adapter ce modèle à son entreprise ?',
    a: 'Complétez le PDF, recensez les usages réels, nommez validateurs et référent, puis faites examiner les formalités sociales et juridiques avant diffusion.',
  },
] as const;

const CANONICAL = getCharteIaBtpCanonicalUrl(SITE_CONFIG.url);
const FILE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${CHARTE_IA_BTP_PDF_HREF}`;

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${CANONICAL}#article`,
  headline: 'Charte IA dans le BTP : un modèle gratuit pour votre PME',
  name: META_TITLE,
  description: META_DESCRIPTION,
  url: CANONICAL,
  inLanguage: 'fr-FR',
  datePublished: '2026-10-16',
  dateModified: CHARTE_IA_BTP_CONTENT_UPDATED_AT,
  author: {
    '@type': 'Person',
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.aPropos}`,
  },
  publisher: {
    '@type': 'Organization',
    name: 'OFC Création d’Entreprise',
    url: SITE_CONFIG.url,
  },
  image: `${SITE_CONFIG.url}/images/ressources/miniatures/charte-ia-pme-batiment-cover.jpg`,
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'Charte IA BTP' },
    { '@type': 'Thing', name: 'Gouvernance intelligence artificielle PME bâtiment' },
  ],
};

const learningResourceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  '@id': `${CANONICAL}#resource`,
  name: 'Charte d’utilisation de l’intelligence artificielle — PME bâtiment (OFC)',
  description: META_DESCRIPTION,
  url: CANONICAL,
  learningResourceType: 'Guide',
  isAccessibleForFree: true,
  inLanguage: 'fr-FR',
  author: articleJsonLd.author,
  publisher: articleJsonLd.publisher,
  associatedMedia: {
    '@type': 'MediaObject',
    contentUrl: FILE_URL,
    encodingFormat: 'application/pdf',
    name: 'charte-ia-pme-batiment.pdf',
    description: `Modèle PDF ${CHARTE_IA_BTP_PDF_PAGE_COUNT} pages`,
  },
};

const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: LINKS.home },
  { name: 'Ressources', path: LINKS.ressources },
  { name: 'Charte IA BTP', path: CHARTE_IA_BTP_PAGE_PATH },
]);

const faqSchema = getFAQSchema(FAQ);

export default function CharteIaBtpRessourcePage() {
  return (
    <>
      <JsonLd id="schema-charte-ia-btp-article" schema={articleJsonLd} />
      <JsonLd id="schema-charte-ia-btp-learning" schema={learningResourceJsonLd} />
      {breadcrumbSchema ? (
        <JsonLd id="schema-charte-ia-btp-breadcrumb" schema={breadcrumbSchema} />
      ) : null}
      {faqSchema ? <JsonLd id="schema-charte-ia-btp-faq" schema={faqSchema} /> : null}
      <CharteIaBtpGuidePage />
    </>
  );
}
