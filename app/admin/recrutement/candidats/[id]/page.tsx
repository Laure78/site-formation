import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CandidatEditForm } from '@/components/admin/recrutement/CandidatEditForm';
import { CandidatProfileSummary } from '@/components/admin/recrutement/CandidatProfileSummary';
import { CandidatInterviewPrepPanel } from '@/components/admin/recrutement/CandidatInterviewPrepPanel';
import { DeleteCandidatDialog } from '@/components/admin/recrutement/DeleteCandidatDialog';
import { NotesTimeline } from '@/components/admin/recrutement/NotesTimeline';
import { RgpdStaleBanner } from '@/components/admin/recrutement/RgpdStaleBanner';
import { OrgCard, OrgPageHeader, orgPageBg } from '@/components/admin/mon-espace/ui';
import { adminRecrutementEvaluation } from '@/lib/internal-links';
import {
  getRecruitmentCandidat,
  listRecruitmentNotes,
} from '@/lib/recruitment/queries';
import { isStaleNonRetenu } from '@/lib/recruitment/rgpd';

type Props = { params: Promise<{ id: string }> };

export default async function AdminRecrutementCandidatPage({ params }: Props) {
  const { id } = await params;
  const candidat = await getRecruitmentCandidat(id);
  if (!candidat) notFound();

  const notes = await listRecruitmentNotes(id);
  const stale = isStaleNonRetenu(candidat) ? [candidat] : [];

  return (
    <div className={`min-h-screen ${orgPageBg} px-4 py-8 md:px-8`}>
      <div className="mx-auto max-w-3xl space-y-6">
        <OrgPageHeader
          eyebrow="Recrutement · Fiche candidat"
          title={`${candidat.first_name} ${candidat.last_name}${candidat.is_example ? ' (Exemple)' : ''}`}
        />
        <RgpdStaleBanner candidats={stale} />

        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href={adminRecrutementEvaluation(id, 1)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium text-slate-700 hover:bg-slate-50"
          >
            Grille étape 1
          </Link>
          <Link
            href={adminRecrutementEvaluation(id, 2)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium text-slate-700 hover:bg-slate-50"
          >
            Grille étape 2
          </Link>
        </div>

        <OrgCard>
          <CandidatInterviewPrepPanel candidat={candidat} />
        </OrgCard>

        <OrgCard>
          <h2 className="font-display text-lg font-bold text-slate-900">Synthèse profil</h2>
          <div className="mt-4">
            <CandidatProfileSummary candidat={candidat} />
          </div>
        </OrgCard>

        <OrgCard>
          <h2 className="mb-4 font-display text-lg font-bold text-slate-900">Modifier la fiche</h2>
          <CandidatEditForm candidat={candidat} />
        </OrgCard>

        <OrgCard>
          <h2 className="font-display text-lg font-bold text-slate-900">Historique des notes</h2>
          <div className="mt-4">
            <NotesTimeline candidatId={id} notes={notes} />
          </div>
        </OrgCard>

        <OrgCard>
          <DeleteCandidatDialog
            candidatId={id}
            candidatLabel={`${candidat.first_name} ${candidat.last_name}`}
          />
        </OrgCard>
      </div>
    </div>
  );
}
