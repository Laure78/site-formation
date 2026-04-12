/**
 * Sources de contenu pour la base de connaissance
 * Agrége blog, formations, pages statiques, sitemap
 */

import { SITE_CONFIG } from '@/lib/seo';
import {
  SESSION_DUREE_LIBELLE,
  TARIF_FORFAIT_DEBUTANT_HT,
  TARIF_FORFAIT_AVANCE_HT,
  MODALITE_FORMATIONS_PRESENTIEL,
  EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,
  COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT,
} from '@/lib/tarifs-sessions';
import { BLOG_ARTICLES } from '@/lib/blog';
import { CSFE_NOM_LIBRE } from '@/lib/csfe';

export interface ContentChunk {
  url: string;
  title: string;
  content: string;
  type: 'blog' | 'formation' | 'page' | 'faq';
}

const BASE_URL = SITE_CONFIG.url;

// Formations (données statiques du site)
const FORMATIONS_DATA = [
  { path: '/formations', title: 'Catalogue formations IA BTP', desc: `Sessions ${SESSION_DUREE_LIBELLE} : forfait ${TARIF_FORFAIT_DEBUTANT_HT} € HT/part. (débutant) ou ${TARIF_FORFAIT_AVANCE_HT} € HT/part. (avancé). ${MODALITE_FORMATIONS_PRESENTIEL} Qualiopi, Constructys selon éligibilité.` },
  {
    path: '/formations/ia-au-service-du-batiment',
    title: "L'IA au service du bâtiment",
    desc: `Formation BTP-01 : ${SESSION_DUREE_LIBELLE}, ${TARIF_FORFAIT_DEBUTANT_HT} € HT/part. ${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} Devis, emails, CR, administratif. Qualiopi, Constructys.`,
  },
  { path: '/formations/ia-btp-paris', title: 'Formation IA BTP à Paris', desc: `${SESSION_DUREE_LIBELLE}. ${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} Devis, emails. Paris + Île-de-France. Financement OPCO selon éligibilité.` },
  { path: '/formations/ia-travaux-publics', title: "L'IA au service des Travaux Publics", desc: `${SESSION_DUREE_LIBELLE}, ${TARIF_FORFAIT_DEBUTANT_HT} € HT/part. ${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} DCE, CCTP, comptes rendus chantier TP.` },
  { path: '/formations/ia-appels-offre-btp', title: 'IA appel d\'offres BTP — DCE, CCTP, mémoire technique', desc: `${SESSION_DUREE_LIBELLE}, ${TARIF_FORFAIT_AVANCE_HT} € HT/part. DCE, mémoires, marchés. ${EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE} Qualiopi, Constructys.` },
  { path: '/formations/ia-rh-btp', title: 'IA pour la fonction RH BTP', desc: `${SESSION_DUREE_LIBELLE}, ${TARIF_FORFAIT_AVANCE_HT} € HT/part. Recrutement, GEPP, RH. ${EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE}` },
  { path: '/formations/ia-pme-btp', title: 'IA pour PME du BTP', desc: 'Formation adaptée aux PME. Même grille de forfaits par participant.' },
  {
    path: '/formations/sensibilisation-ia-assistants-personnalises',
    title: "Sensibilisation à l'IA & Assistants IA personnalisés",
    desc: `${SESSION_DUREE_LIBELLE}, ${TARIF_FORFAIT_DEBUTANT_HT} € HT/part. ${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} Sensibilisation, prompts, assistants. Qualiopi, Constructys.`,
  },
  {
    path: '/formations/ia-architecture-claude-dpgf',
    title: 'Architecte augmenté — Claude AI, DPGF, chantier et documents',
    desc: `${SESSION_DUREE_LIBELLE}, ${TARIF_FORFAIT_AVANCE_HT} € HT/part. DPGF, métrés, documents. ${EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE} Claude AI + Google Workspace.`,
  },
];

// Pages clés + contenu synthétique
const PAGES_DATA: { path: string; title: string; content: string }[] = [
  { path: '/', title: 'Accueil — Laure Olivié', content: 'Formation IA pour le BTP. Gagnez 3 à 5h par semaine sur devis, chiffrages, emails et CR chantier. 100% finançable OPCO Constructys. Laure Olivié, formatrice IA, 10 ans d\'expérience travaux publics. Basée à Guyancourt (Yvelines), interventions en Île-de-France et partout en France.' },
  { path: '/a-propos', title: 'À propos', content: 'Laure Olivié — Formatrice IA spécialisée BTP. OFC Création d\'Entreprise, certification Qualiopi. Partenaires : FFB, CSFE, LinkedIn Learning, Constructys.' },
  {
    path: '/etudes-de-cas/ffb-csfe',
    title: 'Étude de cas FFB & CSFE — Étanchéité',
    content: `Interventions réseau FFB (Grand Paris, Île-de-France Est et Ouest) et ${CSFE_NOM_LIBRE}. Modules : prompts métier, mémoires techniques, CCTP/DCE, comptes rendus chantier, devis et mails. Objectifs : autonomie sur les prompts, RGPD, validation métier. Bénéfices : gain de temps, Constructys, Qualiopi.`,
  },
  { path: '/contact', title: 'Contact', content: `Contact : ${SITE_CONFIG.email} — ${SITE_CONFIG.phoneDisplay}. Laure Olivié, Guyancourt (Yvelines).` },
  { path: '/prendre-rdv', title: 'Prendre rendez-vous', content: 'Réservez un échange d\'environ 30 minutes pour une formation sur-mesure. Planning en ligne via Calendly (appel découverte).' },
  { path: '/financement-constructys-formation-ia-btp', title: 'Financement formation IA OPCO Constructys', content: `Sessions ${SESSION_DUREE_LIBELLE} : forfait ${TARIF_FORFAIT_DEBUTANT_HT} € HT/part. (débutant) ou ${TARIF_FORFAIT_AVANCE_HT} € HT/part. (avancé). Prise en charge OPCO Constructys selon barèmes. Qualiopi. eGestion, délais 15 jours.` },
  { path: '/financement-constructys-formation-ia-btp', title: 'Financement Constructys', content: 'OPCO Constructys finance les formations BTP. Plan de développement des compétences. Prise en charge jusqu\'à 100%. 24€ HT/heure/stagiaire.' },
  { path: '/formation-ia-artisans-btp', title: 'ChatGPT pour entreprises BTP', content: 'Formation ChatGPT pour dirigeants et équipes du bâtiment et des travaux publics. Devis, emails, CR chantier. 4h pratiques.' },
  { path: '/ia-devis-batiment', title: 'IA devis automatique bâtiment', content: 'IA devis automatique bâtiment : prompts, trames, formation finançable OPCO Constructys. Gain de temps sur chiffrages.' },
  {
    path: '/formation-chatgpt-artisan-electricien',
    title: 'ChatGPT artisan électricien BTP',
    content:
      'Formation IA et ChatGPT pour artisans électriciens et TPE électricité bâtiment : devis, appels d\'offres, emails, fiches techniques, posts réseaux. NF C 15-100, tableau, câblage. Qualiopi, finançable Constructys. Laure Olivié.',
  },
  {
    path: '/formation-ia-electricien-btp',
    title: 'Formation IA électricien BTP',
    content:
      'Landing SEO : gagner du temps sur l’administratif (devis, AO, emails) avec ChatGPT. Formation Qualiopi, Constructys. Visio découverte gratuite. Prompts devis, mémoire technique, relances.',
  },
  {
    path: '/formation-ia-charpentier-btp',
    title: 'Formation IA charpentier BTP Île-de-France',
    content:
      'Landing SEO : métrés charpente bois/acier, devis, variantes, bons de commande avec ChatGPT. Qualiopi, Constructys. Grand Paris, Île-de-France. Pas de substitution au BET pour le dimensionnement réglementaire.',
  },
  {
    path: '/formation-ia-ferrailleur-btp',
    title: 'Formation IA ferrailleur / armaturier BTP Île-de-France',
    content:
      'Landing SEO : quantitatifs ferraillage, tonnages HA/treillis, devis acier béton, bons de commande avec ChatGPT. Qualiopi, Constructys. Validation humaine des plans et Eurocodes. Grand Paris, Île-de-France.',
  },
  {
    path: '/formation-ia-etancheur-btp',
    title: 'Formation IA étancheur BTP Île-de-France',
    content:
      'Landing SEO : surfaces étanchéité, relevés, joints, devis membrane/bitume, variantes systèmes avec ChatGPT. Qualiopi, Constructys. Validation notices et DTU. Grand Paris, Île-de-France.',
  },
  {
    path: '/formation-ia-couvreur-btp',
    title: 'Formation IA couvreur / zingueur BTP Île-de-France',
    content:
      'Landing SEO : surfaces toiture pente, gouttières, devis tuiles/ardoise/zinc, variantes avec ChatGPT. Qualiopi, Constructys. Validation DTU et notices fabricants. Grand Paris, Île-de-France.',
  },
  {
    path: '/formation-ia-vitrier-btp',
    title: 'Formation IA vitrier miroitier BTP Île-de-France',
    content:
      'Landing SEO : devis vitrage, métrages, fiches techniques Uw/Rw, variantes, FAQ clients avec ChatGPT. Qualiopi, Constructys. Valeurs certifiées = données fabricant. Laure Olivié.',
  },
  {
    path: '/formation-ia-plombier-btp',
    title: 'Formation IA plombier chauffagiste BTP Île-de-France',
    content:
      'Landing SEO : devis plomberie chauffage, diagnostics, mails SAV, synthèse DCE et mémoires techniques avec ChatGPT. Qualiopi, Constructys. Responsabilité gaz et marchés publics = validation pro. Laure Olivié, OFC.',
  },
  {
    path: '/formation-ia-plaquiste-btp',
    title: 'Formation IA plaquiste plâtrier BTP Île-de-France',
    content:
      'Landing SEO : devis doublage BA13, métrages, variantes, briefs chantier, FAQ clients avec ChatGPT. Qualiopi, Constructys. Quantités et DTU = validation par le plaquiste. Laure Olivié.',
  },
  {
    path: '/formation-ia-peintre-btp',
    title: 'Formation IA peintre en bâtiment Île-de-France',
    content:
      'Landing SEO : devis peinture, métrages, fiches chantier, variantes gammes, FAQ clients avec ChatGPT. Qualiopi, Constructys. Supports et temps de séchage = validation par le peintre. Laure Olivié, OFC.',
  },
  {
    path: '/formation-ia-menuisier-btp',
    title: 'Formation IA menuisier BTP Île-de-France',
    content:
      'Landing SEO : devis menuiserie bois PVC alu, fiches techniques Uw/Rw depuis notices, variantes, briefs atelier avec ChatGPT. Qualiopi, Constructys. Cotes et prix = validation pro. Laure Olivié.',
  },
  {
    path: '/formation-ia-dirigeant-pme-btp',
    title: 'Formation IA chef entreprise BTP',
    content:
      'Landing SEO : dirigeants PME BTP, devis, prospection, relances, synthèses rentabilité avec ChatGPT. Île-de-France, Grand Paris. Qualiopi, Constructys. Validation humaine des engagements et des chiffres.',
  },
  {
    path: '/formation-ia-conducteur-travaux-btp',
    title: 'Formation IA conducteur de travaux BTP',
    content:
      'Landing SEO : rapports multi-lots, mails sous-traitants, variations, planning hebdo avec ChatGPT. Île-de-France, Grand Paris. Qualiopi, Constructys. Décisions et contrats restent au conducteur de travaux.',
  },
  {
    path: '/formation-ia-charge-affaires-btp',
    title: 'Formation IA chargé d’affaires métreur BTP',
    content:
      'Landing SEO : analyse DCE, métrés, chiffrage, mémoire technique avec ChatGPT. Île-de-France, Grand Paris. Qualiopi, Constructys. Validation humaine des quantités et des prix.',
  },
  {
    path: '/formation-ia-assistante-administrative-btp',
    title: 'Formation IA assistante administrative BTP',
    content:
      'Landing SEO : courriers, relances impayés, rapports chantier, tableaux de bord avec ChatGPT. Île-de-France, Grand Paris. Qualiopi, Constructys. Facturation et paie validées par les référents légaux.',
  },
  {
    path: '/formation-ia-pisciniste-btp',
    title: 'Formation IA pisciniste BTP',
    content:
      'Landing SEO : devis piscine, variantes, documentation entretien, suivi client avec ChatGPT. Île-de-France, Grand Paris. Qualiopi, Constructys. Dimensionnement et normes validés par le professionnel.',
  },
  {
    path: '/formation-ia-paysagiste-btp',
    title: 'Formation IA paysagiste BTP',
    content:
      'Landing SEO : briefs paysagers, métrés et devis, mails client avec ChatGPT. Île-de-France, Grand Paris. Qualiopi, Constructys. Choix végétaux, prix et faisabilité validés par le professionnel.',
  },
  {
    path: '/formation-ia-macon-paysagiste-btp',
    title: 'Formation IA maçon paysagiste BTP',
    content:
      'Landing SEO : devis dallage et terrasses, brouillons de mémoire technique AO, coordination chantier avec ChatGPT. Île-de-France, Grand Paris. Qualiopi, Constructys. Normes, quantités et engagements validés par le professionnel.',
  },
  {
    path: '/formation-ia-cloturiste-btp',
    title: 'Formation IA clôturiste BTP',
    content:
      'Landing SEO : devis clôtures, portails, grillages, variantes et modèles réutilisables avec ChatGPT. Île-de-France, Grand Paris. Qualiopi, Constructys. Prix, conformité locale et pose validés par le professionnel.',
  },
  {
    path: '/formation-ia-carreleur-btp',
    title: 'Formation IA carreleur faïencier BTP',
    content:
      'Landing SEO : devis carrelage, métrage, fiches techniques, variantes et FAQ client avec ChatGPT. Île-de-France. Qualiopi, Constructys. Barèmes, métrages définitifs et notices fabricants validés par le professionnel.',
  },
  {
    path: '/formation-ia-geometre-tp',
    title: 'Formation IA géomètre TP',
    content:
      'Landing SEO : rapports de levé topographique, devis, notes d’analyse, emails maître d’ouvrage avec ChatGPT. Île-de-France, Grand Paris. Qualiopi, Constructys. Coordonnées, cadastre et livrables officiels validés par le professionnel.',
  },
  {
    path: '/formation-ia-conducteur-engins-tp',
    title: 'Formation IA conducteur d’engins TP',
    content:
      'Landing SEO : fiches d’activité, rapports hebdomadaires, emails chef de chantier, légendes photos avec ChatGPT. Île-de-France, Grand Paris. Qualiopi, Constructys. Faits terrain et sécurité validés par le conducteur et la hiérarchie.',
  },
  {
    path: '/formation-ia-chef-chantier-tp',
    title: 'Formation IA chef de chantier TP',
    content:
      'Landing SEO : rapports d’avancement, coordination sous-traitants, variations CCTP, rappels sécurité avec ChatGPT. Île-de-France, Grand Paris. Qualiopi, Constructys. PPSPS et décisions contractuelles validées par les responsables habilités.',
  },
  {
    path: '/formation-ia-canalisateur-tp',
    title: 'Formation IA canalisateur TP',
    content:
      'Landing SEO : devis canalisations EU/EV/ANC, variantes, mémoire technique marchés publics, fiches techniques avec ChatGPT. Île-de-France, Grand Paris. Qualiopi, Constructys. Dimensionnement, DTU et essais validés par le professionnel.',
  },
  {
    path: '/formation-ia-macon-btp',
    title: 'Formation IA maçon BTP',
    content:
      'Landing SEO : devis maçonnerie, métré, mémoires techniques, emails avec ChatGPT. Île-de-France, Grand Paris. Qualiopi, Constructys. Quantités, DTU et conformité validés par le professionnel.',
  },
  {
    path: '/formation-ia-travaux-publics',
    title: 'Formation IA travaux publics',
    content:
      "Landing SEO : formation IA et ChatGPT pour routes, VRD, génie civil. Cas d'usage TP (planification, études de sol, marchés publics, rapports chantier). Qualiopi, OPCO Constructys. Fiche détaillée : /formations/ia-travaux-publics (21 h).",
  },
  { path: '/ia-conducteur-travaux', title: 'IA conducteur de travaux', content: 'L\'IA pour les conducteurs de travaux : CR, planning, DCE.' },
  { path: '/mentions-legales', title: 'Mentions légales', content: 'OFC Création d\'Entreprise, SIRET 905 244 281 00010. Hébergement O2switch.' },
];

/** Extraire le texte d'un article de blog */
function blogToChunks(): ContentChunk[] {
  return BLOG_ARTICLES.flatMap((a) => {
    const parts: string[] = [a.description];
    for (const s of a.sections) {
      if (typeof s.content === 'string') parts.push(s.content);
      else if (Array.isArray(s.content)) {
        const strings = s.content.filter((x): x is string => typeof x === 'string');
        parts.push(...strings);
      }
    }
    const content = [a.title, a.description, ...parts].join('\n\n');
    return [{
      url: `${BASE_URL}/blog/${a.slug}`,
      title: a.title,
      content,
      type: 'blog',
    }];
  });
}

/** Formations → chunks */
function formationsToChunks(): ContentChunk[] {
  return FORMATIONS_DATA.map((f) => ({
    url: `${BASE_URL}${f.path}`,
    title: f.title,
    content: `${f.title}. ${f.desc}`,
    type: 'formation',
  }));
}

/** Pages statiques → chunks */
function pagesToChunks(): ContentChunk[] {
  return PAGES_DATA.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    title: p.title,
    content: p.content,
    type: 'page',
  }));
}

/** FAQ global (extrait des articles) */
function faqToChunks(): ContentChunk[] {
  const faqs: ContentChunk[] = [];
  for (const a of BLOG_ARTICLES) {
    for (const s of a.sections) {
      if (s.type === 'faq' && Array.isArray(s.content)) {
        for (const qa of s.content) {
          const text = String(qa);
          if (text.includes(' — ')) {
            faqs.push({
              url: `${BASE_URL}/blog/${a.slug}`,
              title: `FAQ: ${a.title}`,
              content: text,
              type: 'faq',
            });
          }
        }
      }
    }
  }
  return faqs;
}

/** Toutes les sources agrégées */
export function getAllContentChunks(): ContentChunk[] {
  return [
    ...blogToChunks(),
    ...formationsToChunks(),
    ...pagesToChunks(),
    ...faqToChunks(),
  ];
}

/** Découper un long contenu en chunks ~500 tokens */
export function splitIntoChunks(chunk: ContentChunk, maxChars = 1500): ContentChunk[] {
  const text = chunk.content;
  if (text.length <= maxChars) return [chunk];

  const parts: ContentChunk[] = [];
  let rest = text;
  let offset = 0;
  while (rest.length > 0) {
    const slice = rest.slice(0, maxChars);
    const lastSpace = slice.lastIndexOf(' ');
    const cut = lastSpace > maxChars / 2 ? lastSpace : maxChars;
    const segment = rest.slice(0, cut);
    rest = rest.slice(cut).trim();
    parts.push({
      ...chunk,
      content: segment,
      title: chunk.title + (parts.length > 0 ? ` (suite ${parts.length + 1})` : ''),
    });
  }
  return parts;
}
