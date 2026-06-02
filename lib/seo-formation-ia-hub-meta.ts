import type { FormationIaRawMetier, FormationIaRawVille } from '@/lib/seo-formation-ia-hub-data';

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

export function buildMetierMetadata(m: FormationIaRawMetier, _path: string) {
  const title = truncate(
    `Formation IA ${m.label} — ChatGPT, Claude AI | BTP`,
    60
  );
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
  const title = truncate(
    isParis
      ? `Formation IA pour le BTP Paris — ChatGPT & Claude AI | Qualiopi`
      : `Formation IA pour les pro du BTP ${v.label} (${v.dept}) — ChatGPT, Claude`,
    60
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
