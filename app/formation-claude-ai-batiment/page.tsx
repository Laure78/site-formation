import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { createPageMetadata, getBreadcrumbSchema } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import { OFC_SEC, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

export const revalidate = 3600;

const PATH = '/formation-claude-ai-batiment';
const TITLE = 'Formation Claude AI bâtiment — devis, CR, DOE';
const DESCRIPTION =
  'Formation Claude AI pour le bâtiment : devis, comptes rendus de chantier et DOE sur vos documents. Présentiel Île-de-France, Qualiopi. Visio découverte.';

export const metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
});

const EXAMPLES = [
  {
    title: 'Devis et descriptifs',
    text: 'Structurer un devis second œuvre ou rénovation à partir d’un brief chantier, puis relire les libellés avant chiffrage.',
  },
  {
    title: 'Comptes rendus de chantier',
    text: 'Passer de notes brutes à un CR clair (actions, responsables, délais) sans perdre le contexte terrain.',
  },
  {
    title: 'DOE et fin de chantier',
    text: 'Organiser les pièces du dossier des ouvrages exécutés et accélérer la mise en forme avant remise client.',
  },
] as const;

export default function FormationClaudeAiBatimentPage() {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Accueil', path: '/' },
    { name: 'Formations', path: LINKS.formations },
    { name: 'Formation Claude AI bâtiment', path: PATH },
  ]);

  return (
    <main>
      <JsonLd id="breadcrumb-claude-batiment" data={breadcrumb} />
      <header className={`${OFC_SEC.white} border-b border-slate-100`}>
        <div className={`${OFC_SECTION_INNER} max-w-3xl py-12 md:py-16`}>
          <p className="text-sm font-medium text-[var(--accent)]">Bâtiment · présentiel IDF</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Formation Claude AI pour le bâtiment
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Cas concrets bâtiment : devis, CR de chantier et DOE — distincts des usages travaux publics
            (DCE, CCTP, PPSPS).
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
            <RdvLink origin="formation-claude-ai-batiment" />
          </div>
        </div>
      </header>
      <section className={OFC_SEC.muted} aria-labelledby="exemples-batiment">
        <div className={`${OFC_SECTION_INNER} max-w-3xl py-12 md:py-16`}>
          <h2 id="exemples-batiment" className="font-display text-2xl font-bold text-slate-900">
            Exemples métier bâtiment
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
