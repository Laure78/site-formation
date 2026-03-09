import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getProfile, isAdmin } from '@/lib/auth';
import { LayoutDashboard, BookOpen, Users } from 'lucide-react';

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

  const nav = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/formations', label: 'Formations', icon: BookOpen },
    { href: '/admin/apprenants', label: 'Apprenants', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white">
        <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-4">
          <Link href="/" className="font-display text-lg font-bold text-slate-900">LO</Link>
          <span className="text-xs text-slate-500">Admin</span>
        </div>
        <nav className="space-y-1 p-4">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <Icon size={20} strokeWidth={1.5} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link href="/" className="block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100">← Retour au site</Link>
        </div>
      </aside>
      <main className="pl-64">
        {children}
      </main>
    </div>
  );
}
