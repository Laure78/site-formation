import { SITE } from '@/lib/site-config';
import { SCHEMA_CONTACT, SCHEMA_GEO } from '@/lib/schema-constants';

/** Pied de page planning anonymisé candidats (texte réglementaire fixe). */
export function recruitmentPdfFooterLine(): string {
  const siret = SCHEMA_CONTACT.siretFormatted ?? '905 244 281 00010';
  const addr = `${SCHEMA_GEO.streetAddress}, ${SCHEMA_GEO.postalCode} ${SCHEMA_GEO.addressLocality}`;
  return `${SITE.raisonSociale} · SIRET ${siret} · NDA ${SCHEMA_CONTACT.nda} · ${addr} · ${SITE.contact.tel} · ${SITE.contact.email}`;
}
