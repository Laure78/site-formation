import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAppointmentByManageToken } from '@/app/actions/rdv-manage';
import { RdvManageClient } from '@/components/booking/RdvManageClient';
import { createPageMetadata } from '@/lib/seo';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

export const metadata: Metadata = createPageMetadata({
  title: 'Gérer mon rendez-vous',
  description: 'Modifier ou annuler votre rendez-vous avec Laure Olivié — formation IA pour le BTP.',
  path: '/rdv',
  robots: { index: false, follow: false },
});

export default async function RdvManagePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ action?: string }>;
}) {
  const { token } = await params;
  const { action } = await searchParams;
  const appointment = await getAppointmentByManageToken(token);
  if (!appointment) notFound();

  const initialAction =
    action === 'annuler' || action === 'modifier' ? action : null;

  return (
    <div className="min-h-[70vh]">
      <section className={OFC_SEC.whiteMesh}>
        <div className={`${OFC_SECTION_INNER} max-w-3xl`}>
          <RdvManageClient
            token={token}
            appointment={appointment}
            initialAction={initialAction}
          />
        </div>
      </section>
    </div>
  );
}
