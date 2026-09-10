import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/AdminSidebar';
import { requireAdminAccess } from '@/lib/admin-access';

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

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="min-h-screen pl-14 lg:pl-64">
        {children}
      </main>
    </div>
  );
}
