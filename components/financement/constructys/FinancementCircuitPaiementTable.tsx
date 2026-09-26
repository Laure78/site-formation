import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { CONSTRUCTYS_SOURCES } from '@/lib/financement-constructys-page-config';

const ROW = {
  contexte: 'Dossiers concernés par le dispositif transitoire (sans subrogation)',
  facture: 'Entreprise bénéficiaire',
  paiement: 'L’entreprise règle OFC',
  demarche: 'L’entreprise demande ensuite le remboursement dans eGestion',
} as const;

export function FinancementCircuitPaiementTable() {
  return (
    <section aria-labelledby="circuit-paiement-title" className="scroll-mt-24">
      <h2
        id="circuit-paiement-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Circuit de paiement transitoire
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
        Synthèse du parcours lorsque Constructys applique le dispositif transitoire. En cas de doute
        sur un dossier déjà engagé, contactez Constructys directement.
      </p>

      {/* Desktop : tableau */}
      <div className="mt-6 hidden overflow-hidden rounded-xl border border-[#E2E8F0] md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">
            Circuit de paiement des dossiers concernés par le dispositif transitoire Constructys
          </caption>
          <thead className="bg-[#F8FAFC]">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold text-[#0F172A]">
                Situation
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-[#0F172A]">
                Facture adressée à
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-[#0F172A]">
                Paiement
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-[#0F172A]">
                Démarche finale
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-[#E2E8F0]">
              <td className="px-4 py-4 align-top font-medium text-[#0F172A]">{ROW.contexte}</td>
              <td className="px-4 py-4 align-top text-[#475569]">{ROW.facture}</td>
              <td className="px-4 py-4 align-top text-[#475569]">{ROW.paiement}</td>
              <td className="px-4 py-4 align-top text-[#475569]">{ROW.demarche}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile : carte */}
      <article className="mt-6 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm md:hidden">
        <h3 className="font-semibold text-[#0F172A]">{ROW.contexte}</h3>
        <dl className="mt-3 space-y-2 text-sm">
          <div>
            <dt className="font-medium text-[#64748B]">Facture adressée à</dt>
            <dd className="text-[#475569]">{ROW.facture}</dd>
          </div>
          <div>
            <dt className="font-medium text-[#64748B]">Paiement</dt>
            <dd className="text-[#475569]">{ROW.paiement}</dd>
          </div>
          <div>
            <dt className="font-medium text-[#64748B]">Démarche finale</dt>
            <dd className="text-[#475569]">{ROW.demarche}</dd>
          </div>
        </dl>
      </article>

      <p className="mt-4 text-sm">
        <ExternalLinkAnchor
          href={CONSTRUCTYS_SOURCES.egestion.href}
          className="text-[#377CF3] underline"
        >
          Accéder à eGestion Constructys
        </ExternalLinkAnchor>
      </p>
    </section>
  );
}
