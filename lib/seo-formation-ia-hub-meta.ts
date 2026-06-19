import type { FormationIaRawMetier, FormationIaRawVille } from '@/lib/seo-formation-ia-hub-data';
import { truncateForBrandedTitle } from '@/utils/metadata';

const BASE_KW = [
  'formation IA appliquée au bâtiment',
  'formation ChatGPT BTP',
  'formation Claude AI BTP',
  'formation intelligence artificielle bâtiment',
  'OFC Création d\'Entreprise',
  'Qualiopi',
  'OPCO Constructys',
];

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trim() + '…';
}

/** Libellés courts pour titres SEO (segment sans marque — suffixe via layout). */
const METIER_SEO_LABELS: Record<string, string> = {
  'chauffage-climatisation-cvc': 'CVC BTP',
  'platrerie-cloisons-faux-plafonds': 'plâtrerie & cloisons',
  'sols-souples-parquet': 'sols & parquet',
  'ravalement-facade-ite': 'ravalement & ITE',
  'entreprise-generale-batiment': 'entreprise générale TCE',
  'demolition-desamiantage': 'démolition & désamiantage',
  'ascenseurs-monte-charges': 'ascenseurs & monte-charges',
  'securite-incendie-ssi': 'sécurité incendie SSI',
  'photovoltaique-irve': 'photovoltaïque & IRVE',
  'travaux-publics-genie-civil': 'travaux publics & GC',
  'renovation-energetique': 'rénovation énergétique',
  'espaces-verts-paysagisme': 'espaces verts & paysage',
  'terrassement': 'terrassement & VRD',
  'beton-fondations': 'béton armé & fondations',
};

function metierSeoLabel(m: FormationIaRawMetier): string {
  return METIER_SEO_LABELS[m.slug] ?? m.label;
}

export function buildMetierMetadata(m: FormationIaRawMetier, _path: string) {
  const label = metierSeoLabel(m);
  const title = truncateForBrandedTitle(`Formation IA ${label} — ChatGPT BTP`);
  const description = truncate(
    `Formation IA ${m.label} : ChatGPT et Claude AI pour devis, dossiers et chantier. Qualiopi, Constructys. Visio découverte gratuite.`,
    155
  );
  const keywords = [
    `formation IA ${m.label}`,
    'formation ChatGPT BTP',
    'formation Claude AI bâtiment',
    `IA ${m.categorie}`,
    ...BASE_KW.slice(0, 6),
  ];
  return { title, description, keywords };
}

export function buildVilleMetadata(v: FormationIaRawVille, _path: string) {
  const isParis = v.slug === 'btp-paris';
  const title = truncateForBrandedTitle(
    isParis
      ? 'Formation IA BTP Paris — ChatGPT & Claude'
      : `Formation IA BTP ${v.label} (${v.dept}) — ChatGPT`,
  );
  const description = truncate(
    isParis
      ? `Formation IA, ChatGPT et Claude AI pour le BTP à Paris et Grand Paris : devis, administratif, mémoires. Qualiopi, Constructys. Visio découverte gratuite.`
      : `Formation IA pour le BTP à ${v.label} (${v.deptName}) : ChatGPT et Claude AI pour devis et chantier. Qualiopi, Constructys. Visio découverte gratuite.`,
    155
  );
  const keywords = [
    `formation IA pour le BTP ${v.label}`,
    'formation ChatGPT BTP',
    'formation Claude AI Île-de-France',
    `formation IA ${v.deptName}`,
    'Grand Paris',
    ...BASE_KW.slice(0, 5),
  ];
  return { title, description, keywords };
}
