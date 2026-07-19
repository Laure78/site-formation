/**
 * Validation JSON-LD Schema.org — Person + Organization (layout global + /a-propos).
 * Aligné sur `lib/schema-constants.ts` (source unique).
 * Usage : node scripts/validate-schema-jsonld.mjs
 */
import { buildGlobalSiteJsonLdGraph } from '../lib/schema-global-site-graph.ts';
import { getAProposPersonJsonLd } from '../lib/schema-a-propos-person-jsonld.ts';
import { getAProposOrganizationJsonLd } from '../lib/schema-a-propos-organization-jsonld.ts';
import { getAProposUnifiedJsonLd } from '../lib/schema-a-propos-unified-graph.ts';
import {
  SCHEMA_CONTACT,
  SCHEMA_ORGANIZATION_SAME_AS,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PERSON_SAME_AS,
} from '../lib/schema-constants.ts';

const BLOCKS = [
  { name: 'global-site-graph', schema: buildGlobalSiteJsonLdGraph() },
  { name: 'a-propos-person', schema: getAProposPersonJsonLd() },
  { name: 'a-propos-organization', schema: getAProposOrganizationJsonLd() },
  { name: 'a-propos-unified-graph', schema: getAProposUnifiedGraph() },
];

function getAProposUnifiedGraph() {
  return getAProposUnifiedJsonLd();
}

function assertPerson(node, label) {
  if (node['@type'] !== 'Person' && !(Array.isArray(node['@type']) && node['@type'].includes('Person'))) {
    throw new Error(`${label}: @type Person attendu`);
  }
  if (node.name !== 'Laure Olivié') throw new Error(`${label}: name incorrect`);
  if (node.jobTitle !== SCHEMA_PERSON_LAURE.jobTitle) {
    throw new Error(`${label}: jobTitle incorrect (attendu « ${SCHEMA_PERSON_LAURE.jobTitle} »)`);
  }
  if (!node.worksFor) throw new Error(`${label}: worksFor manquant`);
  if (!node.affiliation || !Array.isArray(node.affiliation) || node.affiliation.length < 3) {
    throw new Error(`${label}: affiliation incomplète`);
  }
  const sameAs = node.sameAs ?? [];
  for (const url of SCHEMA_PERSON_SAME_AS) {
    if (!sameAs.includes(url)) throw new Error(`${label}: sameAs manque ${url}`);
  }
  const knows = node.knowsAbout ?? [];
  for (const topic of [
    'IA appliquée au BTP',
    'ChatGPT bâtiment',
    'Claude AI',
    'mémoire technique',
    'analyse de DCE/CCTP',
    'devis BTP',
  ]) {
    if (!knows.includes(topic)) throw new Error(`${label}: knowsAbout manque « ${topic} »`);
  }
}

function assertOrganization(node, label) {
  const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
  const isOrg =
    types.includes('Organization') ||
    types.includes('EducationalOrganization') ||
    types.includes('LocalBusiness');
  if (!isOrg) throw new Error(`${label}: @type Organization attendu`);
  if (node.name !== "OFC Création d'Entreprise") throw new Error(`${label}: name incorrect`);
  if (node.taxID !== SCHEMA_CONTACT.siretDigits) throw new Error(`${label}: taxID SIRET incorrect`);
  if (!node.hasCredential) throw new Error(`${label}: hasCredential Qualiopi manquant`);
  const area = node.areaServed;
  const areaName =
    typeof area === 'string'
      ? area
      : area && typeof area === 'object' && 'name' in area
        ? area.name
        : null;
  if (areaName !== 'Île-de-France') throw new Error(`${label}: areaServed incorrect`);
  if (node.certifications) throw new Error(`${label}: propriété non schema.org « certifications »`);
  // Champs NAP layout (#organization) — sameAs LinkedIn + GBP, téléphone JSON-LD
  if (node['@id']?.endsWith('#organization') && node.telephone) {
    if (node.telephone !== SCHEMA_CONTACT.telephoneJsonLd) {
      throw new Error(`${label}: telephone JSON-LD incorrect`);
    }
    const orgSameAs = node.sameAs ?? [];
    for (const url of SCHEMA_ORGANIZATION_SAME_AS) {
      if (!orgSameAs.includes(url)) throw new Error(`${label}: sameAs Org manque ${url}`);
    }
  }
}

function walkGraph(schema, blockName) {
  JSON.stringify(schema);
  if (schema['@context'] !== 'https://schema.org') {
    throw new Error(`${blockName}: @context schema.org requis`);
  }
  const nodes = schema['@graph'] ? schema['@graph'] : [schema];
  for (const node of nodes) {
    const type = node['@type'];
    const types = Array.isArray(type) ? type : [type];
    if (types.includes('Person')) assertPerson(node, `${blockName}/Person`);
    if (types.includes('Organization') || types.includes('EducationalOrganization')) {
      if (node['@id']?.endsWith('#organization')) {
        assertOrganization(node, `${blockName}/Organization`);
      }
    }
  }
}

let ok = true;
for (const { name, schema } of BLOCKS) {
  try {
    walkGraph(schema, name);
    console.log(`✓ ${name}`);
  } catch (err) {
    ok = false;
    console.error(`✗ ${name}:`, err.message);
  }
}

if (!ok) process.exit(1);
console.log('\nValidation JSON-LD OK — Person + Organization conformes.');
