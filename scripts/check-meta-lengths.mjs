#!/usr/bin/env node
/**
 * Valide la longueur des title (≤ 60 car.) et meta descriptions (150–160 car.)
 * des pages clés du site.
 *
 * Usage : node scripts/check-meta-lengths.mjs
 * Échoue (exit 1) si une valeur sort des bornes.
 */

const BRAND_SUFFIX = ' | Laure Olivié';

/** Pages clés — segment title (sans suffixe) + description. */
const PAGES = [
  {
    path: '/',
    titleSegment: 'Formation IA BTP Île-de-France : devis, DCE',
    description:
      'Formation IA pour le BTP : devis, DCE, comptes rendus et mémoires techniques avec ChatGPT et Claude. Présentiel Île-de-France, Qualiopi, OPCO selon éligibilité.',
  },
  {
    path: '/formation-ia-btp',
    titleSegment: 'Formation IA pour le BTP : IA bâtiment',
    description:
      'Formation IA pour le BTP et formation IA bâtiment : Claude et ChatGPT sur devis, DCE et chantier. Présentiel IDF, Qualiopi. Financement OPCO selon éligibilité.',
  },
  {
    path: '/formations',
    titleSegment: 'Catalogue des formations IA BTP en Île-de-France',
    titleAbsolute: true,
    description:
      'Catalogue formations IA BTP en Île-de-France : devis, appels d\'offres, chantier et Claude. Programmes Qualiopi, présentiel, financement OPCO selon éligibilité.',
  },
  {
    path: '/formations/ia-batiment-travaux-publics',
    titleSegment: 'Formation IA BTP : devis et chantier',
    description:
      'Formation IA pour le BTP en 4 h : devis, emails, comptes rendus et DOE avec ChatGPT et Claude. Présentiel IDF, Qualiopi, financement OPCO selon éligibilité.',
  },
  {
    path: '/formations/ia-appels-offre-btp',
    titleSegment: 'Formation IA appels d\u2019offres BTP | DCE',
    description:
      'Formation IA appels d\u2019offres BTP : analyser un DCE, préparer le chiffrage et rédiger un mémoire technique avec l\u2019IA. 4 h présentiel Île-de-France, Qualiopi.',
  },
  {
    path: '/formations/ia-conduite-travaux-suivi-chantier',
    titleSegment: 'Formation IA suivi de chantier : CR, CCTP',
    description:
      'Formation IA suivi de chantier : CR, CCTP et DOE avec Claude sur vos documents BTP. 4 h présentiel Île-de-France, Qualiopi, financement OPCO selon éligibilité.',
  },
  {
    path: '/formations/maitriser-claude-ai-btp',
    titleSegment: 'Formation Claude AI BTP | Projects & Cowork',
    description:
      'Formation Claude AI BTP : Projects, Cowork, Skills et connecteurs sur vos dossiers chantier. 4 h présentiel IDF, Qualiopi, financement OPCO selon éligibilité.',
  },
  {
    path: '/formation-ia-btp-ile-de-france',
    titleSegment: 'Formation IA BTP Île-de-France',
    description:
      'Formation IA pour le BTP en Île-de-France : devis, DCE et CR en présentiel. Qualiopi, financement OPCO possible selon éligibilité. Visio découverte 30 min.',
  },
  {
    path: '/ia-analyse-dce-btp',
    titleSegment: 'IA et analyse de DCE dans le BTP',
    description:
      'Analysez un DCE (CCTP, CCAP, RC) plus vite avec l\u2019IA : méthode pas à pas, points de vigilance et confidentialité. Formation présentiel IDF. RDV gratuit.',
  },
  {
    path: '/ia-memoire-technique-btp',
    titleSegment: 'Mémoire technique BTP avec l\u2019IA',
    description:
      'Rédigez un mémoire technique BTP gagnant avec l\u2019IA : plan, méthodologie, moyens et références structurés. Vous validez le contenu. Présentiel IDF. RDV gratuit.',
  },
  {
    path: '/ia-compte-rendu-chantier',
    titleSegment: 'Compte rendu de chantier avec l\u2019IA',
    description:
      'Rédigez vos comptes rendus de chantier avec l\u2019IA à partir de notes ou d\u2019une dictée : méthode et prompts BTP. Vous validez. Présentiel IDF. RDV gratuit.',
  },
  {
    path: '/ia-devis-batiment',
    titleSegment: 'Formation IA devis BTP — session présentiel',
    description:
      'Formation IA pour le BTP : automatisez vos devis bâtiment avec ChatGPT. Session présentiel IDF et templates. Financement OPCO possible selon éligibilité.',
  },
  {
    path: '/financement-constructys-formation-ia-btp',
    titleSegment: 'Formation IA BTP : financement Constructys',
    description:
      'Financer votre formation IA BTP avec Constructys : conditions, plafonds et démarches pas à pas. Prise en charge selon éligibilité, organisme certifié Qualiopi.',
  },
  {
    path: '/a-propos',
    titleSegment: 'Laure Olivié | Formatrice IA spécialisée BTP',
    titleAbsolute: true,
    description:
      'Laure Olivié, formatrice IA spécialisée BTP : formation IA pour le BTP et formation IA bâtiment sur devis, chantiers et AO. Qualiopi, présentiel Île-de-France.',
  },
  {
    path: '/blog',
    titleSegment: 'Blog IA pour le BTP — guides et cas d\u2019usage',
    description:
      'Articles IA pour le BTP : devis, CCTP/DCE, appels d\u2019offres, ChatGPT, Constructys. 34 guides pratiques par Laure Olivié, Qualiopi, présentiel Île-de-France.',
  },
  {
    path: '/ressources',
    titleSegment: 'Ressources IA BTP : guides et tutos',
    description:
      'Guides, tutoriels et prompts IA gratuits pour le BTP : analyser un DCE, mémoire technique, devis, chantier et DOE. Ressources OFC Qualiopi Île-de-France.',
  },
  {
    path: '/formations/developpement-web-ia-sans-coder',
    titleSegment: 'Formation développement web IA sans coder',
    description:
      'Formation développement web avec l\u2019IA sans coder : créez votre site ou application. Parcours 7 h (300 € HT) ou 14 h, présentiel Île-de-France, Qualiopi.',
  },
];

const TITLE_MAX = 60;
const DESC_MIN = 150;
const DESC_MAX = 160;

let failures = 0;

for (const page of PAGES) {
  const fullTitle = page.titleAbsolute
    ? page.titleSegment
    : `${page.titleSegment}${BRAND_SUFFIX}`;
  const titleLen = fullTitle.length;
  const descLen = page.description.length;

  const titleOk = titleLen <= TITLE_MAX;
  const descOk = descLen >= DESC_MIN && descLen <= DESC_MAX;

  if (!titleOk) {
    console.error(`❌ ${page.path} — title ${titleLen} car. (max ${TITLE_MAX}) : ${fullTitle}`);
    failures++;
  }
  if (!descOk) {
    const issue = descLen < DESC_MIN ? `< ${DESC_MIN}` : `> ${DESC_MAX}`;
    console.error(`❌ ${page.path} — description ${descLen} car. (${issue}) : ${page.description}`);
    failures++;
  }
  if (titleOk && descOk) {
    console.log(`✅ ${page.path} — T=${titleLen} D=${descLen}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} erreur(s) détectée(s).`);
  process.exit(1);
} else {
  console.log(`\n✅ Toutes les pages OK (title ≤ ${TITLE_MAX}, description ${DESC_MIN}–${DESC_MAX}).`);
}
