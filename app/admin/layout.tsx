import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/AdminSidebar';
import { canAccessOrganisation, requireAdminAccess } from '@/lib/admin-access';

export default async function AdminLayout({
  children,
}: { children: React.ReactNode }) {
  const access = await requireAdminAccess();
  if (!access.ok) {
    if (access.reason === 'unauthenticated') {
      redirect('/auth/connexion?next=/admin');
    }
    redirect('/espace-apprenant?admin=denied');
  }

  const showOrganisation = canAccessOrganisation(access.profile, access.email);

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <AdminSidebar showOrganisation={showOrganisation} />
      <main className="min-h-screen pl-14 lg:pl-[280px]">
        {children}
      </main>
    </div>
  );
}
