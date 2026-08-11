import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Réinitialiser le mot de passe',
  description: 'Réinitialisation du mot de passe — espace formation OFC.',
  robots: { index: false, follow: false },
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return children;
}
