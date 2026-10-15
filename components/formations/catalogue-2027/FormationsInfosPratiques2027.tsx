import Link from 'next/link';
import { CATALOGUE_2027_INFOS_PRATIQUES } from '@/data/catalogue-2027';
import { LINKS } from '@/lib/internal-links';
import { CONTACT } from '@/lib/constants';

const FAQ = [
  {
    q: 'Les formations sont-elles certifiantes ?',
    a: 'Non. Les formations délivrent une attestation de fin de formation et un certificat de réalisation. Aucun titre professionnel ni qualification métier n’est promis.',
  },
  {
    q: 'Le CPF est-il accepté ?',
    a: CATALOGUE_2027_INFOS_PRATIQUES.pasCpf,
  },
  {
    q: 'Comment fonctionne le financement OPCO ?',
    a: `${CATALOGUE_2027_INFOS_PRATIQUES.financement} ${CATALOGUE_2027_INFOS_PRATIQUES.subrogation}`,
  },
  {
    q: 'Où se déroulent les sessions ?',
    a: `${CATALOGUE_2027_INFOS_PRATIQUES.modalite}. ${CATALOGUE_2027_INFOS_PRATIQUES.interLieu}. ${CATALOGUE_2027_INFOS_PRATIQUES.intraLieu}.`,
  },
  {
    q: 'Quel est le délai minimum avant une session ?',
    a: CATALOGUE_2027_INFOS_PRATIQUES.delaiMinimum,
  },
] as const;

export function FormationsInfosPratiques2027() {
  const phone = CONTACT.phoneDisplay;
  const email = CONTACT.email;

  return (
    <section
      id="informations-pratiques"
      className="mt-16 scroll-mt-24 border-t border-[#E2E8F0] pt-14"
      aria-labelledby="infos-pratiques-title"
    >
      <h2 id="infos-pratiques-title" className="ofc-type-h2 text-ofc-ink">
        Informations pratiques et FAQ
      </h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="border border-[#E2E8F0] bg-white p-5">
          <h3 className="font-semibold text-ofc-ink">Modalités</h3>
          <ul className="mt-3 space-y-2 text-sm text-ofc-ink-muted">
            <li>{CATALOGUE_2027_INFOS_PRATIQUES.modalite}</li>
            <li>{CATALOGUE_2027_INFOS_PRATIQUES.interLieu}</li>
            <li>{CATALOGUE_2027_INFOS_PRATIQUES.intraLieu}</li>
            <li>Effectif habituel : {CATALOGUE_2027_INFOS_PRATIQUES.effectifHabituel}</li>
            <li>{CATALOGUE_2027_INFOS_PRATIQUES.effectifNum04}</li>
            <li>{CATALOGUE_2027_INFOS_PRATIQUES.effectifIntraMin}</li>
            <li>{CATALOGUE_2027_INFOS_PRATIQUES.delaiMinimum}</li>
            <li>{CATALOGUE_2027_INFOS_PRATIQUES.positionnement}</li>
            <li>{CATALOGUE_2027_INFOS_PRATIQUES.attestations}</li>
            <li>{CATALOGUE_2027_INFOS_PRATIQUES.intraTarif}</li>
            <li>{CATALOGUE_2027_INFOS_PRATIQUES.pasCpf}</li>
          </ul>
          <p className="mt-4 text-sm text-ofc-ink-muted">{CATALOGUE_2027_INFOS_PRATIQUES.financement}</p>
          <p className="mt-2 text-sm text-ofc-ink-muted">{CATALOGUE_2027_INFOS_PRATIQUES.subrogation}</p>
          <p className="mt-4 text-sm text-ofc-ink">
            Contact : Laure OLIVIÉ —{' '}
            <a href={`mailto:${email}`} className="text-[#377CF3] underline">
              {email}
            </a>{' '}
            —{' '}
            <a href={`tel:${CONTACT.phone ?? '+33695661818'}`} className="text-[#377CF3] underline">
              {phone}
            </a>
          </p>
          <p className="mt-2 text-sm">
            <Link href={LINKS.prendreRdv} className="font-medium text-[#377CF3] underline">
              Prendre rendez-vous
            </Link>
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-ofc-ink">Questions fréquentes</h3>
          <dl className="mt-3 space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="border-b border-[#E2E8F0] pb-4">
                <dt className="font-medium text-ofc-ink">{item.q}</dt>
                <dd className="mt-1 text-sm text-ofc-ink-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
