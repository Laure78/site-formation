import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getProfile, isAdmin } from '@/lib/auth';
import { AdminSidebar } from '@/components/AdminSidebar';

export default async function AdminLayout({
  children,
}: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth/connexion');

  const profile = await getProfile(user.id);
  if (!profile || !isAdmin(profile.role)) {
    redirect('/espace-apprenant');
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
