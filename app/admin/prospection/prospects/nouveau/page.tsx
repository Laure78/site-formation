import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { ProspectForm } from '@/components/admin/prospection/ProspectForm';

export default function NouveauProspectPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Link
        href={LINKS.adminProspectionProspects}
        className="text-sm font-medium text-[#377CF3] hover:underline"
      >
        ← Prospects
      </Link>
      <h2 className="font-display text-lg font-semibold text-slate-900">Nouveau prospect</h2>
      <ProspectForm />
    </div>
  );
}
