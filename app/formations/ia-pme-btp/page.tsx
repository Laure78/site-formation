import Link from 'next/link';

export const metadata = {
  title: 'Formation IA pour PME du BTP — Laure Olivié',
  description: 'Formation IA adaptée aux PME du bâtiment : devis, administrative, productivité.',
};

export default function FormationIAPMEBTPPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-slate-900">
        Formation IA pour PME du BTP
      </h1>
      <p className="mt-6 text-slate-600">
        Programme sur-mesure pour les PME du bâtiment. Devis, chiffrages, emails,
        comptes rendus : optimisez votre temps avec l&apos;IA sans embaucher.
      </p>
      <Link
        href="/prendre-rdv"
        className="mt-10 inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Prendre RDV
      </Link>
    </div>
  );
}
