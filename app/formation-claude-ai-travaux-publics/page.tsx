import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { createPageMetadata, getBreadcrumbSchema } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

export const revalidate = 3600;

const PATH = '/formation-claude-ai-travaux-publics';
const TITLE = 'Formation Claude AI TP — DCE, CCTP, PPSPS';
const DESCRIPTION =
  'Formation Claude AI pour les travaux publics : DCE, CCTP de marché public, PPSPS et métrés. Présentiel Île-de-France, Qualiopi. Visio découverte.';

export const metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
});

const EXAMPLES = [
  {
    title: 'DCE et pièces de marché',
    text: 'Synthétiser un dossier de consultation, repérer les pièces critiques et préparer un Go / No-Go avant réponse.',
  },
  {
    title: 'CCTP de marché public',
    text: 'Extraire les prescriptions techniques utiles au chiffrage et à la rédaction du mémoire, sans inventer de normes.',
  },
  {
    title: 'PPSPS et métrés TP',
    text: 'Structurer un PPSPS et accélérer la mise en forme des métrés / quantitatifs avant validation terrain.',
  },
] as const;

export default function FormationClaudeAiTravauxPublicsPage() {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Accueil', path: '/' },
    { name: 'Formations', path: LINKS.formations },
    { name: 'Formation Claude AI travaux publics', path: PATH },
  ]);

  return (
    <main>
      <JsonLd id="breadcrumb-claude-tp" data={breadcrumb} />
      <header className={`${OFC_SEC.white} border-b border-slate-100`}>
        <div className={`${OFC_SECTION_INNER} max-w-3xl py-12 md:py-16`}>
          <p className="text-sm font-medium text-[var(--accent)]">Travaux publics · présentiel IDF</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Formation Claude AI pour les travaux publics
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Cas concrets TP : DCE, CCTP de marché public, PPSPS et métrés — distincts des usages bâtiment
            (devis, CR, DOE).
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Voir aussi la{' '}
            <Link href={LINKS.formationMaitriserClaudeAiBtp} className={OFC_LINK}>
              formation Claude AI BTP
            </Link>{' '}
            (fiche catalogue 4 h) et le{' '}
            <Link href={LINKS.claudeAiBtp} className={OFC_LINK}>
              guide Claude AI pour le BTP
            </Link>
            .
          </p>
          <div className="mt-8">
            <RdvLink origin="formation-claude-ai-travaux-publics" />
          </div>
        </div>
      </header>
      <section className={OFC_SEC.muted} aria-labelledby="exemples-tp">
        <div className={`${OFC_SECTION_INNER} max-w-3xl py-12 md:py-16`}>
          <h2 id="exemples-tp" className="font-display text-2xl font-bold text-slate-900">
            Exemples métier travaux publics
          </h2>
          <ul className="mt-8 space-y-6">
            {EXAMPLES.map((ex) => (
              <li key={ex.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-900">{ex.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{ex.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
