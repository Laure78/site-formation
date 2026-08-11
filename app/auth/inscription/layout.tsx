import type { Metadata } from 'next';

/** Pages auth hors connexion publique : non indexées. */
export const metadata: Metadata = {
  title: 'Inscription — espace formation',
  description: 'Création de compte réservée aux stagiaires OFC.',
  robots: { index: false, follow: false },
};

export default function InscriptionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
