import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Espace membre OFC',
  description: 'Connexion réservée aux participants OFC — espace formation Laure Olivié.',
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
