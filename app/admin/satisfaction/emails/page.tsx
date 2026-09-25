import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { listEmailTemplates } from '@/lib/training-ops/satisfaction/settings';
import { OrgCard, OrgPageHeader, orgPageBg } from '@/components/admin/mon-espace/ui';
import { EmailTemplateEditor } from '@/components/admin/satisfaction/EmailTemplateEditor';

export default async function SatisfactionEmailsPage() {
  const templates = await listEmailTemplates().catch(() => []);

  return (
    <div className={`min-h-screen ${orgPageBg} px-4 py-8 md:px-8`}>
      <div className="mx-auto max-w-3xl space-y-6">
        <OrgPageHeader
          title="Emails · Satisfaction & Avis"
          description="Quatre modèles : questionnaire, relance questionnaire, demande Google, relance Google. Variables : {{prenom}}, {{nom}}, {{formation}}, {{date_formation}}, {{formateur}}, {{organisme}}, {{lien_questionnaire}}, {{lien_google}}, {{email_contact}}."
          actions={
            <Link href={LINKS.adminSatisfaction} className="text-sm text-[#377CF3] hover:underline">
              Retour
            </Link>
          }
        />
        {templates.map((tpl) => (
          <OrgCard key={tpl.template_key}>
            <EmailTemplateEditor template={tpl} />
          </OrgCard>
        ))}
        {templates.length === 0 ? (
          <p className="text-sm text-slate-500">Migration 065 requise pour charger les modèles.</p>
        ) : null}
      </div>
    </div>
  );
}
