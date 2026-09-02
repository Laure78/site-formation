import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { CONSTRUCTYS_SOURCES } from '@/lib/financement-constructys-page-config';

const ROWS = [
  {
    periode: 'Avant le 1er octobre 2026',
    facture: 'Selon le parcours applicable',
    paiement: 'Selon le parcours applicable',
    demarche: 'Dépôt des justificatifs dans eGestion',
  },
  {
    periode: 'Nouveaux dossiers concernés du 1er octobre au 31 décembre 2026',
    facture: 'Entreprise bénéficiaire',
    paiement: 'L’entreprise règle OFC',
    demarche: 'L’entreprise demande ensuite le remboursement dans eGestion',
  },
] as const;

export function FinancementAvantApresTable() {
  return (
    <section aria-labelledby="avant-apres-title" className="scroll-mt-24">
      <h2
        id="avant-apres-title"
        className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl"
      >
        Avant / après le 1<sup>er</sup> octobre 2026
      </h2>
      <p className="mt-3 text-sm text-[#64748B]">
        En cas de doute sur un dossier déjà engagé, contactez Constructys directement.
      </p>

      {/* Desktop : tableau */}
      <div className="mt-6 hidden overflow-hidden rounded-xl border border-[#E2E8F0] md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">
            Comparatif du circuit de paiement avant et après le 1er octobre 2026
          </caption>
          <thead className="bg-[#F8FAFC]">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold text-[#0F172A]">
                Période
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
            {ROWS.map((row) => (
              <tr key={row.periode} className="border-t border-[#E2E8F0]">
                <td className="px-4 py-4 align-top font-medium text-[#0F172A]">{row.periode}</td>
                <td className="px-4 py-4 align-top text-[#475569]">{row.facture}</td>
                <td className="px-4 py-4 align-top text-[#475569]">{row.paiement}</td>
                <td className="px-4 py-4 align-top text-[#475569]">{row.demarche}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile : cartes */}
      <div className="mt-6 space-y-4 md:hidden">
        {ROWS.map((row) => (
          <article
            key={row.periode}
            className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm"
          >
            <h3 className="font-semibold text-[#0F172A]">{row.periode}</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <dt className="font-medium text-[#64748B]">Facture adressée à</dt>
                <dd className="text-[#475569]">{row.facture}</dd>
              </div>
              <div>
                <dt className="font-medium text-[#64748B]">Paiement</dt>
                <dd className="text-[#475569]">{row.paiement}</dd>
              </div>
              <div>
                <dt className="font-medium text-[#64748B]">Démarche finale</dt>
                <dd className="text-[#475569]">{row.demarche}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

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
