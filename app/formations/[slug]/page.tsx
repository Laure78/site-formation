import Link from 'next/link';
import { notFound } from 'next/navigation';

const COURSES: Record<string, { title: string; description: string; price: number }> = {
  'excel-avance': {
    title: 'Excel avancé',
    description: 'Maîtrise les formules, les tableaux croisés dynamiques et les macros. Parcours progressif avec exercices.',
    price: 49,
  },
  'communication-pro': {
    title: 'Communication professionnelle',
    description: 'Écrire des emails percutants, animer une réunion, présenter à un jury. Exercices pratiques.',
    price: 49,
  },
  'gestion-projet': {
    title: 'Introduction à la gestion de projet',
    description: 'Méthodologies (agile, cycle en V), planning, suivi des livrables. Cas concrets.',
    price: 49,
  },
};

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = COURSES[slug];

  if (!course) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <Link href="/formations" className="text-sm text-[var(--accent)] hover:underline">
        ← Retour au catalogue
      </Link>

      <div className="mt-8">
        <div className="h-64 rounded-2xl bg-slate-200" />
        <h1 className="mt-6 font-display text-3xl font-bold md:text-4xl">{course.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{course.description}</p>
        <p className="mt-6 text-2xl font-bold text-[var(--accent)]">{course.price}€</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/auth/inscription"
            className="rounded-xl bg-[var(--accent)] px-8 py-4 text-center font-semibold text-white hover:bg-blue-700"
          >
            S&apos;inscrire et acheter
          </Link>
          <Link
            href="/formations"
            className="rounded-xl border border-slate-300 px-8 py-4 text-center font-semibold text-slate-800 hover:bg-slate-50"
          >
            Voir d&apos;autres formations
          </Link>
        </div>
      </div>
    </div>
  );
}
