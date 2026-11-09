import { notFound } from 'next/navigation';
import { CandidatInterviewPrepPanel } from '@/components/admin/recrutement/CandidatInterviewPrepPanel';
import { EvaluationForm } from '@/components/admin/recrutement/EvaluationForm';
import { OrgCard, OrgPageHeader, orgPageBg } from '@/components/admin/mon-espace/ui';
import { EVALUATION_MAX_ETAPE_1 } from '@/lib/recruitment/evaluation-criteria';
import { getRecruitmentCandidat, getRecruitmentEvaluation } from '@/lib/recruitment/queries';

type Props = { params: Promise<{ id: string }> };

export default async function EvaluationEtape1Page({ params }: Props) {
  const { id } = await params;
  const candidat = await getRecruitmentCandidat(id);
  if (!candidat) notFound();
  const evaluation = await getRecruitmentEvaluation(id, 1);

  return (
    <div className={`min-h-screen ${orgPageBg} px-4 py-8 md:px-8`}>
      <div className="mx-auto max-w-3xl space-y-6">
        <OrgPageHeader
          eyebrow="Recrutement · Étape 1"
          title="Grille d’évaluation — entretien de présentation (30 min)"
          description={`8 critères notés de 1 à 4 — total sur ${EVALUATION_MAX_ETAPE_1}. ${candidat.first_name} ${candidat.last_name}.`}
        />
        <OrgCard>
          <CandidatInterviewPrepPanel candidat={candidat} />
        </OrgCard>
        <OrgCard>
          <EvaluationForm candidatId={id} stage={1} initial={evaluation} />
        </OrgCard>
      </div>
    </div>
  );
}
