import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { getCourseJsonLdFromFormationsData } from '@/lib/schema-course-formations';
import { formationsData } from '@/src/data/formations';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Route dynamique pour les slugs présents dans `formationsData` sans dossier statique
 * dédié sous `app/formations/<slug>/`. Les fiches BTP-01…BTP-06 ont chacune une page
 * statique qui prend le dessus sur la même URL ; le JSON-LD Course est alors injecté
 * via `getFormationCoursePageJsonLd` sur ces pages.
 */
export default async function FormationBySlugPage({ params }: Props) {
  const { slug } = await params;
  const entry = formationsData[slug as keyof typeof formationsData];
  if (!entry) notFound();
  const schema = getCourseJsonLdFromFormationsData(slug)!;

  return (
    <>
      <JsonLd id="schema-formation-course" schema={schema} />
      <article className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-3xl font-bold text-slate-900">{entry.name}</h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">{entry.description}</p>
        <p className="mt-10 text-sm text-slate-500">
          <Link href="/formations" className="font-medium text-[var(--accent)] hover:underline">
            Retour au catalogue des formations
          </Link>
        </p>
      </article>
    </>
  );
}
